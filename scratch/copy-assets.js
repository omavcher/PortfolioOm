const fs = require('fs');
const path = require('path');

const apkSrc = 'C:\\Users\\Om Awchar\\Documents\\Pocket Mind\\build\\app\\outputs\\flutter-apk\\app-release.apk';
const apkDst = 'c:\\Users\\Om Awchar\\Documents\\Portfolio\\client\\public\\pocketmind.apk';
const projectsDir = 'c:\\Users\\Om Awchar\\Documents\\Portfolio\\client\\public\\projects';

console.log('Checking APK source path: ' + apkSrc);
if (fs.existsSync(apkSrc)) {
  fs.copyFileSync(apkSrc, apkDst);
  console.log('APK copied successfully.');
} else {
  console.log('APK source not found: ' + apkSrc);
}

console.log('Copying screenshots...');
const brainDir = 'C:\\Users\\Om Awchar\\.gemini\\antigravity-ide\\brain\\baad0f66-6610-4fe6-9c53-8a39a5c4714b';
fs.copyFileSync(path.join(brainDir, 'media__1781200523798.jpg'), path.join(projectsDir, 'pocketmind-1.jpg'));
fs.copyFileSync(path.join(brainDir, 'media__1781200523816.jpg'), path.join(projectsDir, 'pocketmind-2.jpg'));
fs.copyFileSync(path.join(brainDir, 'media__1781200523663.jpg'), path.join(projectsDir, 'pocketmind-3.jpg'));
fs.copyFileSync(path.join(brainDir, 'media__1781200523772.jpg'), path.join(projectsDir, 'pocketmind-4.jpg'));
console.log('Screenshots copied successfully.');
