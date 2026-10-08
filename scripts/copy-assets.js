const fs = require('fs');
const path = require('path');

const filesToCopy = [
  'myimage.JPG',
  'profile.jpeg',
  'gbolahan.jpg',
  'gbolahan.JPG',
  'Gbolahan.jpg',
  'siwes-screenshot.png',
  'inventory-screenshot.png',
  'fashion-screenshot.png',
  'vscode.jpeg',
  'git.jpeg',
  'github.jpeg',
  'resume.docx',
];

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

filesToCopy.forEach((file) => {
  const srcPath = path.join(rootDir, file);
  const destPath = path.join(publicDir, file);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`[Asset Sync] Copied ${file} -> public/${file}`);
  }
});
