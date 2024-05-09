#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const { createProj } = require("./inquirerManage/createProj");
const { chooseUiFramework } = require("./inquirerManage/chooseUiFramework");
const { giftPkg } = require("./inquirerManage/giftPkg");
const { copyDir, checkMkdirExists, copyTemplate } = require("./copy");
const { install } = require('./install');
const { resetConfig } = require('./resetConfig');

yargs.command(
  ['create', 'c'],
  '新建一个项目',
  function (yargs) {
    return yargs.option('name', {
      alias: 'n',
      demand: true,
      describe: '项目名称',
      type: 'string'
    })
  },
  async function (argv) {
    // 创建项目技术框架和项目名
    let answers = await createProj(argv);
    const { name, } = answers;
    // 项目判重
    const isMkdirExists = checkMkdirExists(
      path.resolve(process.cwd(),`./${name}`)
    );
    if (isMkdirExists) {
      console.log(`${name}项目名已被占用！！`)
      // const isChoose = await giftPkg()
      // if (!isChoose) return;
      // // 重置默认配置
      // await resetConfig(answers)
    } else {
      const isChoose = await giftPkg()
      // 全部，部分，不需要
      if (isChoose) {
        // 重置默认配置
        await resetConfig(answers, isChoose)  
      }
      if (isChoose != '全部') {
        // 选择ui框架
        answers = await chooseUiFramework(answers)
      }
      // 安装依赖
      await install(process.cwd(), answers, isChoose)
    }
  }
).argv;

/**
 * 
 * 复制文件夹
  copyDir(
    path.resolve(__dirname, `./template/${type}`),
    path.resolve(process.cwd(), `./src/pages/${name}`)
  )
  复制文件
  copyFile(
      path.resolve(__dirname, `./template/${type}/index.js`),
      path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
      {
        name,
      }
  )
  复制模板
  copyTemplate(
      path.resolve(__dirname, `./template/${type}/index.tpl`),
      path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
      {
        name,
      }
  )
 */