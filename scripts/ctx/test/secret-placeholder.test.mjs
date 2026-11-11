import {test} from 'node:test';
import assert from 'node:assert/strict';
import {secretFindings} from '../../lib/secret-scan.mjs';
const assignment=(key,value)=>[key,value].join(': ');
test('credential values are not exempt just because they start like placeholders',()=>{
 const values=['truelove99','falsealarm123','nullpointer12345','undefinedButReal123','REDACTEDabc123secret','[REDACTED]suffix','MASKEDactual123','REMOVEDactual123','<actual-secret-123','<TOKEN>suffix','$actualSecret123','${API_KEY}suffix','**actualSecret123','...actualSecret123','{actualSecret123','process.env.API_KEY.suffix'];
 for(const key of ['password','API_KEY','token'])for(const value of values){
  const hits=secretFindings(assignment(key,value));
  assert.ok(hits.some(hit=>hit.kind==='credential-assignment'),`${key}: prefix fixture must be detected`);
  assert.ok(!JSON.stringify(hits).includes(value),'findings must not expose the value');
  assert.ok(secretFindings(JSON.stringify({[key]:value})).length,'quoted keys must be checked too');
 }
});
test('prose exemptions do not exempt quoted values or arbitrary uppercase backtick credentials',()=>{
 for(const value of ['"về"',"'đọc'",'`TRUELOVE99`'])assert.ok(secretFindings(assignment('password',value)).length);
});
test('only complete redaction markers and supported variable references are exempt',()=>{
 for(const value of ['REDACTED','[REDACTED]','MASKED','REMOVED','null','undefined','true','false','YOUR_API_KEY','...','**','********','<REDACTED>','<PASSWORD>','<SECRET>','<TOKEN>','<API_KEY>','<ACCESS_TOKEN>','<REFRESH_TOKEN>','<YOUR_API_KEY>','process.env.API_KEY','$API_KEY','${API_KEY}']){
  assert.deepEqual(secretFindings(assignment('password',value)),[],`complete marker ${value}`);
 }
});
test('placeholder-looking prefixes cannot bypass bearer, signed URL or checkout header scanning',()=>{
 for(const value of ['truelove99abcdefghijkl','nullpointer123456789','REDACTEDabc123secret']){
  for(const text of ['Bearer '+value,'https://example.test/?X-Amz-Signature='+value,JSON.stringify({name:'x-checkout-one-session-token',value})]){
   const hits=secretFindings(text);assert.ok(hits.length);assert.ok(!JSON.stringify(hits).includes(value));
  }
 }
});
test('env examples still require empty values even for an exact placeholder',()=>{
 for(const value of ['REDACTED','null','$API_KEY','${API_KEY}'])assert.ok(secretFindings(['AUTH_TOKEN',value].join('='),{envFile:true}).some(h=>h.kind==='env-example-value'));
});
