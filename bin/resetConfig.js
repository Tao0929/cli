/**
 * 大礼包 - 配置，工具库
 */
const inquirer = require('inquirer');
const path = require('path');
const { asyncCopyFile, copyAllDir } = require('./copy');
const { confDirName } = require('./commonEnum');

// isChoose 全部 部分
async function resetConfig(argv, isChoose) {
  const { name, frame } = argv;

  return new Promise(async (resolve, reject) => {
    inquirer.prompt(
      isChoose == '部分'?
      [
        {
          type: 'list',
          message: '是否替换 tsconf.json 文件?',
          choices: ['yes', 'no'],
          name: 'resetTsConf',
          default: 'yes',
        },
        {
          type: 'list',
          name: 'viteConf',
          message: '是否替换 vite.config.ts 文件?',
          choices: ['yes', 'no'],
          default: 'yes',
        },
        // 工具函数文件夹 utils
        {
          type: 'list',
          name: 'utils',
          message: '是否需要工具函数文件夹?',
          choices: ['yes', 'no'],
          default: 'yes',
        },
      ]:
      [
        // 全部
        {
          type: 'list',
          name: 'alls',
          message: '是否全部替换?',
          choices: ['yes', 'no'],
          default: 'no',
        },
      ]
    ).then(async (answers) => {
      try {
        const { resetTsConf, viteConf, utils, alls } = answers;
        const copyPromises = [];
        // ts 配置
        if (resetTsConf === 'yes') {
          const formPath = path.resolve(__dirname, `./${confDirName[frame]}/tsconfig.json`);
          const toPath = path.resolve(process.cwd(), `./${name}/tsconfig.json`);
          copyPromises.push(asyncCopyFile(formPath, toPath, 'tsconfig.json'));
        }
        // vite 配置
        if (viteConf === 'yes') {
          const formPath = path.resolve(__dirname, `./${confDirName[frame]}/vite.config.ts`);
          const toPath = path.resolve(process.cwd(), `./${name}/vite.config.ts`);
          copyPromises.push(asyncCopyFile(formPath, toPath, 'vite.config.ts'));
        }
        // 工具函数文件夹
        if (utils === 'yes') {
          const formPath = path.resolve(__dirname, `./utils`);
          const toPath = path.resolve(process.cwd(), `./${name}/src/utils`);
          copyPromises.push(copyAllDir(formPath, toPath, 'utils文件夹'));
        }
        // 全部文件
        if (alls === 'yes') {
          const formPath = path.resolve(__dirname, `./${confDirName[frame]}`);
          const toPath = path.resolve(process.cwd(), `./${name}`);
          copyPromises.push(copyAllDir(formPath, toPath, '全部文件'));
        }
        // 等待所有的复制操作完成
        await Promise.all(copyPromises);

        // 所有文件替换完成
        resolve({
          ...answers,
        });
      } catch (error) {
        reject(error);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

exports.resetConfig = resetConfig;