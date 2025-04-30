import PluginConfig from "./generator/index.js";

export const pluginEslint = (buildTool: string) => {
  return PluginConfig[buildTool] ?? console.warn(`Unsupported build tool: ${buildTool}`);
};
