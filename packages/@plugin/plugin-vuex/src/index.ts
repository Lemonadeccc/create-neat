import PluginConfig from "./config/index.js";

const pluginVuex = (buildTool: string) => {
  return PluginConfig[buildTool] ?? console.warn(`Unsupported build tool: ${buildTool}`);
};

export default pluginVuex;
