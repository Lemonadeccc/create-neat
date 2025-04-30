import { pluginToBuildToolProtocol } from "@src/configs/protocol.js"; // 推荐使用明确类型导出
import type GeneratorAPI from "@src/models/GeneratorAPI.js";

// 主插件逻辑
const swcPlugin = (generatorAPI: GeneratorAPI) => {
  const preset = generatorAPI.generator.getPreset();
  // 类型安全的配置对象
  const packageConfig = {
    swc: {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: preset.template === "react", // 根据模板自动启用 tsx
          jsx: preset.template === "react", // 根据模板自动启用 jsx
        },
        transform: {
          react: {
            runtime: "automatic",
          },
        },
      },
    },
    devDependencies: {
      "@swc/core": "^1.5.6",
      "@swc/helpers": "^0.5.11",
      "swc-loader": "^0.2.6",
    },
  };

  // 添加包配置
  generatorAPI.extendPackage(packageConfig);

  // 生成构建工具协议
  generatorAPI.protocolGenerate({
    [pluginToBuildToolProtocol.ADD_COMPILER_CONFIG]: {
      compiler: "swc",
      template: preset.template,
      buildTool: preset.buildTool,
    },
  });
};

export default swcPlugin;
