import type GeneratorAPI from "@src/models/GeneratorAPI.js";

export default (generatorAPI: GeneratorAPI) => {
  generatorAPI.extendPackage({
    dependencies: {
      antd: "^5.0.0",
    },
  });
};
