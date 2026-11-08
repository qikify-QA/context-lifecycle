// Findings contain category/location only. Never echo credential values or prefixes.
import {createHash} from "node:crypto";
const patterns=[
 ['credential-assignment',/(?<![\w-])(?:password|passwd|secret|api[_-]?key|access[_-]?token|refresh[_-]?token|[A-Z][A-Z0-9_]*(?:PASSWORD|SECRET|TOKEN|API_KEY))\b["']?[ \t]*[:=][ \t]*["']?([^\s"',}]+)/gi],
 ['bearer-token',/\bbearer\s+([A-Za-z0-9._-]{12,})/gi],
 ['provider-token',/\b(?:tlmcp_|sk-|ghp_|github_pat_|xox[bp]-|shpat_|shpca_)[A-Za-z0-9_-]{12,}/g],
 ['private-key',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
 ['signed-url',/[?&](?:X-Amz-Signature|X-Amz-Credential|x-checkout-one-session-token)=([^&\s"']+)/gi],
 ['checkout-header-pair',/["']name["']\s*:\s*["']x-checkout-one-session-token["']\s*,\s*["']value["']\s*:\s*["']([^"']+)/gi],
 ['checkout-token',/["']?x-checkout-one-session-token["']?\s*[:=]\s*["']?([^\s"',}]+)/gi],
 ['credential-url',/\b[a-z][\w+.-]*:\/\/[^\s/:@]+:[^\s/@]+@/gi]
];
const placeholder=value=>!value||/^(?:\[?REDACTED\]?|MASKED|REMOVED|null|undefined|true|false|YOUR_API_KEY$|process\.env\.|\$|<|\*\*|\.\.\.)/i.test(value)||/^\{/.test(value);
export function secretFindings(text,{envFile=false}={}){
 const findings=[];
 for(const [kind,pattern] of patterns){pattern.lastIndex=0;for(const match of text.matchAll(pattern)){
  const value=(match[1]??match[0]).replace(/^`|`$/g,'');
  // Explanatory Vietnamese prose is not a credential assignment. Keep generic
  // secret patterns and quoted/env assignments active; do not ignore whole files.
  if(kind==='credential-assignment'){
   const quotedKey=/^[^:=]*["']\s*[:=]/.test(match[0]);
   if(!quotedKey&&(/^(?:đã|chưa|mọi|về|các|gọi|lấy|đọc)$/i.test(value)||/^\d+\s+trigger/.test(text.slice(match.index+match[0].indexOf(':')+1).trim())))continue;
   if(/^`[A-Z][A-Z0-9_-]+`[.;,]?$/.test(match[1]??''))continue;
   if(!quotedKey&&/^(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)$/.test(value)&&/^\s+được\b/u.test(text.slice(match.index+match[0].length)))continue;
  }
  if(placeholder(value))continue;
  findings.push({kind,line:text.slice(0,match.index).split('\n').length,fingerprint:createHash("sha256").update(match[0]).digest("hex")});
 }}
 if(envFile)for(const [i,line] of text.split('\n').entries())if(/^\s*(?:export\s+)?[A-Z][A-Z0-9_]*\s*=/.test(line)){
  const value=line.slice(line.indexOf('=')+1).trim();
  if(value&&!value.startsWith('#')&&!/^(['"])\1$/.test(value))findings.push({kind:'env-example-value',line:i+1,fingerprint:createHash('sha256').update(line).digest('hex')});
 }
 return findings;
}
