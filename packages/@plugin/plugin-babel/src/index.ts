import getConfig from "./config/index.js";

const pluginBabel = (buildTool: string, template: string) => {
  return getConfig(template)[buildTool] ?? console.warn(`Unsupported build tool: ${buildTool}`);
};

export default pluginBabel;
