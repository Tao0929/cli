
/**
 * 选择ui框架
 */
const inquirer = require('inquirer');
const { UIMap } = require('../commonEnum');

/**
 * 
 * @param {*} answers | frame(vue | react)
 * @returns 
 */
const chooseUiFramework = (answers) => {
    return new Promise((resolve, reject) => {
        const { frame } = answers;
        inquirer.prompt([
            {
                type: 'list',
                message: '使用什么UI组件库开发',
                choices: Object.keys(UIMap[frame]),
                name: 'library',
            }
        ]).then(answers1 => {
            resolve({
                ...answers,
                ...answers1,
            })
        }).catch(error => {
            reject(error)
        })
    })
}


exports.chooseUiFramework = chooseUiFramework;