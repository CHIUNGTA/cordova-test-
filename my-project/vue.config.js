// import vue from '@vitejs/plugin-vue'
// import styleImport, { VantResolve } from 'vite-plugin-style-import';
const {
  defineConfig
} = require('@vue/cli-service');
// module.exports = defineConfig({
//   transpileDependencies: true,
// });


module.exports = {
  // plugins: [
  //   vue(),
  //   styleImport({
  //     resolves: [VantResolve()],
  //   }),
  // ],

  publicPath: './',
  outputDir: '../www',
  lintOnSave: false
}
