const copydir = require('copy-dir');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

function mkdirGuard(target) {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdirp(target)
    function mkdirp(dir) {
      if (fs.existsSync(dir)) { return true }
      const dirname = path.dirname(dir);
      mkdirp(dirname);
      fs.mkdirSync(dir);
    }
  }
}

function copyDir(form, to, options) {
  mkdirGuard(to);
  copydir.sync(form, to, options);
}

// 源文件夹路径
// 目标文件夹路径
function copyAllDir (sourceDir, targetDir, name='文件夹') {
  return new Promise((resolve, reject) => {
    copydir(sourceDir, targetDir, {
      ignore: ['.git', '.svn'], // 忽略的文件或文件夹，可选
      utimes: true, // 保持修改时间戳，可选
      mode: true, // 保持文件模式，可选
    }, (err, files) => {
      if (err) {
        console.error('文件夹写入失败！');
        return reject();
      }
      console.log(name + '写入完成！');
      return resolve()
    });
  })
}

function checkMkdirExists(path) {
  return fs.existsSync(path)
};

function copyFile(from, to) {
    const buffer = fs.readFileSync(from);
    const parentPath = path.dirname(to);
  
    mkdirGuard(parentPath)
  
    fs.writeFileSync(to, buffer);
}

function asyncCopyFile(from, to, name='文件') {
    const buffer = fs.readFileSync(from);
    const parentPath = path.dirname(to);
    mkdirGuard(parentPath)
    return new Promise((resolve, reject) => {
      fs.writeFile(to, buffer, (err) => {
        if (err) {
          console.error('写入文件时出错:', err);
          return reject(err);
        }
        console.log(name + '写入完成!');
        return resolve()
      });
    })
}

function readTemplate(path, data = {}) {
  const str = fs.readFileSync(path, { encoding: 'utf8' })
  return Mustache.render(str, data);
}

function copyTemplate(from, to, data = {}) {
    if (path.extname(from) !== '.tpl') {
      return copyFile(from, to);
    }
    const parentToPath = path.dirname(to);
    mkdirGuard(parentToPath);
    fs.writeFileSync(to, readTemplate(from, data));
}


exports.checkMkdirExists = checkMkdirExists;
exports.mkdirGuard = mkdirGuard;
exports.copyAllDir = copyAllDir;
exports.copyDir = copyDir;
exports.copyFile = copyFile;
exports.asyncCopyFile = asyncCopyFile;
exports.readTemplate = readTemplate;
exports.copyTemplate = copyTemplate;