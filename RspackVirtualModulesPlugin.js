class RspackVirtualModulesPlugin {
  constructor(modules) {
    this.modules = modules || {};
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync(
      "RspackVirtualModulesPlugin",
      (params, callback) => {
        const fs = compiler.inputFileSystem;
        Object.keys(this.modules).forEach((modulePath) => {
          // 如果虚拟模块已经存在，则更新它
          if (fs._virtualFiles) {
            fs._virtualFiles[modulePath] = this.modules[modulePath];
          } else {
            // 创建一个虚拟文件系统并添加虚拟模块
            fs._virtualFiles = { ...this.modules };
          }
        });
        callback();
      }
    );
  }
}

export default RspackVirtualModulesPlugin