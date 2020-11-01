const fs = require('fs');
const path = require('path');
let found = [];
const findAllImages = (workpath) => {
    const content = fs.readdirSync(workpath);
    const _workpath = workpath;
    const _path = path;
    content.map((v, i) => {
        var p = path.resolve(workpath, v);
        if (fs.lstatSync(p).isDirectory()){
            findAllImages(p);
        }else if(p.endsWith("png") || p.endsWith("jpg") || p.endsWith("jpeg")){
            found.push(p);
            console.log(`found ${v}`);
        }
    });
}
const copyImages = (workpath)=>{
    found.map((v, i)=>{
        oldpath = v;
        newpath = path.resolve(workpath, '..', path.basename(v));
        if (!path.basename(v).startsWith('.')){
            fs.rename(oldpath,newpath, () => {});
        }
    });
}

console.log("START");
let workpath = path.resolve(__dirname, '..', 'Google Photos');
findAllImages(workpath);
copyImages(workpath);
console.log(found);

console.log("END")