import { pluginToTemplateProtocol } from "@src/configs/protocol.js";
import type GeneratorAPI from "@src/models/GeneratorAPI.js";

export default (generatorAPI: GeneratorAPI) => {
  generatorAPI.extendPackage({
    dependencies: {
      pinia: "^2.2.2",
    },
  });

  generatorAPI.protocolGenerate({
    [pluginToTemplateProtocol.INSERT_IMPORT_PROTOCOL]: {
      params: {
        imports: [
          {
            dir: "src/main",
            modules: [
              {
                name: "pinia",
                from: "./store",
              },
            ],
          },
        ],
        astOptions: {
          parserOptions: { sourceType: "module", plugins: ["typescript"] },
        },
      },
    },
    [pluginToTemplateProtocol.SLOT_CONTENT_PROTOCOL]: {
      params: {
        slotConfig: [
          {
            url: "src/main",
            slotName: "use-pinia-slot",
            slotContent: "app.use(pinia);",
          },
        ],
      },
    },
  });
};
