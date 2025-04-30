import PluginConfig from "./generator/index.js";

export const pluginPinia = (buildTool: string) => {
  return PluginConfig[buildTool] ?? console.warn(`Unsupported build tool: ${buildTool}`);
};
