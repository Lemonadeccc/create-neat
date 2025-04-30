import type GeneratorAPI from "@src/models/GeneratorAPI.js";

export default (generatorAPI: GeneratorAPI) => {
  generatorAPI.extendPackage({
    dependencies: {
      "element-plus": "^2.7.8",
    },
    devDependencies: {
      "unplugin-element-plus": "^0.8.0",
    },
  });
};
