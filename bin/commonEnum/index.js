// vue ui 库
const VueLibraryMap = {
  'iView': 'view-ui-plus',
  'Ant Design Vue': 'ant-design-vue',
  'Element': 'element-plus',
}
  
// react ui 库
const ReactLibraryMap = {
  'Ant Design': 'antd',
}

const UIMap = {
  'vue': VueLibraryMap,
  'react': ReactLibraryMap
}


const confDirName = {
  'react': 'reactConf',
  'vue': 'vueConf',
}



exports.VueLibraryMap = VueLibraryMap
exports.ReactLibraryMap = ReactLibraryMap
exports.UIMap = UIMap
exports.confDirName = confDirName