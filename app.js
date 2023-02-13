const path = require('path');
const os = require('os');
const fs = require('fs');

const folder = process.argv[2];
const workingDir = path.join(os.homedir(), 'desktop', folder);
console.log(workingDir);
if(!folder || !fs.existsSync(workingDir)){
  console.error('Please enter folder name in blog');
  return;
}

const videoDir = path.join(workingDir, 'video');
const imgDir = path.join(workingDir, 'image');
const keynoteDir = path.join(workingDir, 'keynote');

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(imgDir) && fs.mkdirSync(imgDir);
!fs.existsSync(keynoteDir) && fs.mkdirSync(keynoteDir);

fs.promises
  .readdir(workingDir) //
  .then((file) => processFiles(file))
  .catch(console.log);

function processFiles(files){
  files.forEach((file) => {
    if(isVideoFile(file)){
      move(file, videoDir);
    } else if(isImgFile(file)){
      move(file, imgDir);
    } else if(isKeynoteFile(file)){
      move(file, keynoteDir);
    }
  })
}

function isVideoFile(file){
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match
}

function isImgFile(file){
  const regExp = /(png|jpeg|svg|pdf)$/;
  const match = file.match(regExp);
  return !!match
}

function isKeynoteFile(file){
  const regExp = /key$/gm;
  const match = file.match(regExp);
  return !!match
}

function move(file, targetDir){
  console.info(`move ${file} to ${path.basename(targetDir)}`);
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);
  fs.promises
    .rename(oldPath, newPath) // 
    .catch(console.error);
}