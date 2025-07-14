import type GeneratorAPI from "@src/models/GeneratorAPI.js";

export default (generatorAPI: GeneratorAPI) => {
  generatorAPI.extendPackage({
    dependencies: {
      vuex: "^4.1.0",
    },
  });
};
