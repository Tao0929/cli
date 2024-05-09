const path = require('path');
const { exec } = require('child_process');
const ora = require("ora");
const { UIMap } = require('./commonEnum');

/**
 * 
 * @param {*} cmdPath 
 * @param {*} options 
 * @returns 
 */
async function install(cmdPath, options, isChoose) {
  const { name=`my-${frame}-app`, frame, library } = options;
  
  // 项目初始化
  const initProj = () => {
    const vueCommand = isChoose=='全部'?`npm -v`:`npm init vite@latest ${name} -- --template vue-ts`
    const reactCommand = isChoose=='全部'?`npm -v`:`npm init vite@latest ${name} -- --template react-ts`

    const initComand = {
      'vue': vueCommand,
      'react': reactCommand
    }
    return new Promise(function (resolve, reject) {
      const spinner = ora();
      spinner.start(`正在初始化项目，请稍等...`);
      exec(
        initComand[frame],
        {
          cwd: path.resolve(cmdPath),
        },
        function (error) {
          if (error) {
            spinner.fail(`初始化失败`);
            return reject(error);;
          }
          spinner.succeed(`初始化成功!`);
          return resolve()
        }
      )
    })
  }
  // 项目初始化完成
  return initProj().then(() => {
    // CMD 安装命令
    const command = isChoose=='全部'?`npm i`:`npm i && npm add ${UIMap[frame][library]}`
    return new Promise(function (resolve, reject) {
      const spinner = ora();
      spinner.start(`正在安装依赖，请稍等...`);
      const projPath = path.resolve(cmdPath,`./${name}`)
      exec(
        command,
        {
          cwd: path.resolve(projPath), // 安装到项目下
        },
        function (error) {
          if (error) {
            spinner.fail(`依赖安装失败!`);
            return reject(error);
          }
          spinner.succeed(`依赖安装成功!`);
          return resolve()
        }
      )
    })
  })
}

exports.install = install;