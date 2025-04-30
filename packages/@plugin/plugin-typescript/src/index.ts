// 定义配置返回类型
type WebpackConfig = Record<string, any>;

type ViteConfig = Record<string, any>;

// 定义构建工具类型
type BuildTool = "webpack" | "vite" | string;

// 定义配置处理函数类型
type ConfigHandler = () => WebpackConfig | ViteConfig;

// 构建工具配置映射
const buildToolConfigs: Record<string, ConfigHandler> = {
  // 支持拓展loader和plugin
  webpack: (): WebpackConfig => {
    return {
      rules: [
        {
          test: /\.ts$/, // 匹配所有以 .ts 结尾的文件 (修正了正则表达式)
          exclude: /node_modules/, // 排除 node_modules 目录
          use: {
            loader: "ts-loader", // 指定 TS Loader
          },
        },
      ],
    };
  },
  vite: (): ViteConfig => {
    return {};
  },
  // 添加其他构建工具的配置...
};

export const pluginTypescript = (buildTool: BuildTool): WebpackConfig | ViteConfig | undefined => {
  const configHandler = buildToolConfigs[buildTool];

  if (configHandler) {
    return configHandler();
  } else {
    console.warn(`Unsupported build tool: ${buildTool}`);
  }

  // 其他独立于构建工具的配置
  // ……
};
