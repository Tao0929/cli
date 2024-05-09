
/**
 * 赠送礼包
 */
const inquirer = require('inquirer');

const giftPkg = () => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
          {
            type: 'list',
            message: '是否需要工具大礼包？',
            choices: ['全部', '部分', '不需要'],
            name: 'isChoose',
          }
        ]).then(answers1 => {
          const {isChoose} = answers1
            resolve(isChoose)
        }).catch(error => {
            reject(error)
        })
    })
}

exports.giftPkg = giftPkg;