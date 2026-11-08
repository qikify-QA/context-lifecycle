import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import path from 'node:path';
// Restore exactly the touched paths on ordinary I/O/validation failure. No other object is touched.
export async function withFileRollback(files,action,{newDirectories=[]}={}){
 const before=new Map();
 for(const file of new Set(files)){try{before.set(file,await readFile(file));}catch(e){if(e.code!=='ENOENT')throw e;before.set(file,null);}}
 try{return await action();}catch(error){
  for(const [file,value] of before){if(value===null)await rm(file,{force:true});else{await mkdir(path.dirname(file),{recursive:true});await writeFile(file,value);}}
  for(const dir of newDirectories)await rm(dir,{recursive:true,force:true});
  throw error;
 }
}
