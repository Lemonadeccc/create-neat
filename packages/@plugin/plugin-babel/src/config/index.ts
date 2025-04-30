import vite from "./vite.js";
import reactWebpackConfig from "./webpack.react.js";
import vueWebpackConfig from "./webpack.vue.js";

const templateConfigs = {
  vue: {
    vite,
    webpack: vueWebpackConfig,
  },
  react: {
    vite,
    webpack: reactWebpackConfig,
  },
};

function getConfig(template: string) {
  return templateConfigs[template] || null;
}

export default getConfig;
