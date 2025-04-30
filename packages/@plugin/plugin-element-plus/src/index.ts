import PluginConfig from "./config/index.js";

const pluginElement = (buildTool: string) => {
  return PluginConfig[buildTool] ?? console.warn(`Unsupported build tool: ${buildTool}`);
};

export default pluginElement;
