const path = require('path')
const CracoLessPlugin = require('craco-less');

const resolve = pathname => path.resolve(__dirname, pathname)

// craco这种都是通过Node来加载的,所以要用commonjs导出一个对象
module.exports = {
  // less
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: { //这是针对AntDesign增加的东西,我们暂时用不到,可以先删掉. 后面如果用到需要修改主题颜色再用
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {  },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  // webpack
  webpack: {
    alias: {
      "@":resolve("src"),
      "components": resolve("src/components"),
      "utils": resolve("src/utils"),
      // '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  }
}