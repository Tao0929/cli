/**
 * 创建项目
 */
const inquirer = require('inquirer');

function createProj(argv) {
  const { name } = argv;
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      // 创建项目
      {
        type: 'input',
        name: 'name',
        message: '项目名称',
        default: name,
        validate: function (val) {
          if (!/^[a-z\-]+$/.test(val)) {
            return "项目名称只能含有小写英文，可用‘-’隔开";
          }
          return true;
        },
      },
      // 使用框架 
      {
        type: 'list',
        message: '使用什么框架开发',
        choices: ['react', 'vue'],
        name: 'frame',
      },
    ]).then(answers => {
        // 选择ui框架
        resolve({
            ...answers,
        })
    }).catch(error => {
      reject(error)
    })
  })
}

exports.createProj = createProj;