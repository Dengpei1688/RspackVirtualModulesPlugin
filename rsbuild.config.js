import { defineConfig } from "@rsbuild/core";
import { pluginVue2 } from "@rsbuild/plugin-vue2";
import { pluginSass } from "@rsbuild/plugin-sass";
import path from "path";
const RspackVirtualModulesPlugin = require("./RspackVirtualModulesPlugin");

export default defineConfig({
  plugins: [
    // new RspackVirtualModulesPlugin({
    //   [`node_modules/main-modules.js`]: `module.exports = {a=1};`,
    //   [`src/main-modules.js`]: `module.exports = {a=1};`,
    //   // [`node_modules/main-modules.js`]: `module.exports = require("@modules/main");`,
    //   // [`src/home-main-modules.js`]: `module.exports = require("@modules/${theme}");`,
    // }),
    pluginVue2(),
    pluginSass({
      // sassLoaderOptions(config) {
      //   // config.additionalData = `$theme-global: ${process.env["VUE_APP_THEME"]};`;
      //   //
      //   config.additionalData = async (content, loaderContext) => {
      //       return `$theme-global: ${process.env["VUE_APP_THEME"]};`;
      //   };
      //   config.includePaths = ["src/style"];
      //   console.log("config --> ", config);
      // },
    }),
  ],
  source: {
    // 指定入口文件
    entry: {
      index: "./src/main.js",
    },
    alias: {
      "@": path.resolve(__dirname, "src"), // './src',
    },
    extensions: [".js", ".json", ".wasm", ".vue", ".jsx", ".tsx"],
  },
  html: {
    template: "./public/index.html",
  },
  tools: {
    bundlerChain: (chain, { env, isProd, target, CHAIN_ID }) => {},
    rspack: {
      // 
      plugins: [
        new RspackVirtualModulesPlugin({ 
        //  [`node_modules/main-modules.js`]: `module.exports = {a=1};`,
        //  [`src/main-modules.js`]: `module.exports = {a=1};`,
        'main-modules.js': 'export const message = "Hello from virtual module!";',
        'node_modules/main-modules.js': 'export const message = "Hello from virtual module!";',
        'src/main-modules.js': 'export const message = "Hello from virtual module!";',
      })]
    }
    // rspack: (config, { rspack, HtmlPlugin }) => {
    //   config.plugins.push(
    //     new RspackVirtualModulesPlugin({
    //       [`node_modules/main-modules.js`]: `module.exports = {a=1};`,
    //       [`src/main-modules.js`]: `module.exports = {a=1};`,
    //       // [`node_modules/main-modules.js`]: `module.exports = require("@modules/main");`,
    //       // [`src/home-main-modules.js`]: `module.exports = require("@modules/${theme}");`,
    //     })
    //   );
    //   return config
    // },
  },
});
