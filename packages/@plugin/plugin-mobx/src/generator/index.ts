import type GeneratorAPI from "@src/models/GeneratorAPI.js";

const pluginToTemplateProtocol = {
  PROCESS_STYLE_PLUGIN: "PROCESS_STYLE_PLUGIN",
  ENTRY_FILE: "ENTRY_FILE",
  UPDATE_EXPORT_CONTENT_PROTOCOL: "UPDATE_EXPORT_CONTENT_PROTOCOL",
  INSERT_IMPORT_PROTOCOL: "INSERT_IMPORT_PROTOCOL",
  SLOT_CONTENT_PROTOCOL: "SLOT_CONTENT_PROTOCOL",
};

export default (generatorAPI: GeneratorAPI) => {
  // 1. 添加 MobX 核心依赖
  generatorAPI.extendPackage({
    devDependencies: {
      mobx: "^6.6.4",
      "mobx-react-lite": "^3.2.2",
    },
  });

  // 2. 协议化配置注入
  generatorAPI.protocolGenerate({
    // 导入声明协议
    [pluginToTemplateProtocol.INSERT_IMPORT_PROTOCOL]: {
      filePath: "src/App.tsx",
      imports: [
        {
          name: "{ observer }",
          source: "mobx-react-lite",
          isTypeOnly: false,
        },
        {
          name: "store",
          source: "@/stores/counter",
          isTypeOnly: false,
        },
      ],
    },

    // 导出包装协议
    [pluginToTemplateProtocol.UPDATE_EXPORT_CONTENT_PROTOCOL]: {
      filePath: "src/App.tsx",
      exportType: "named",
      exportName: "ObserverApp",
      wrapper: "observer",
    },

    // 插槽内容注入协议
    [pluginToTemplateProtocol.SLOT_CONTENT_PROTOCOL]: {
      filePath: "src/stores/counter.ts",
      slotMarker: "/* observable-properties */",
      content: "number = 0; // MobX observable value",
    },
  });
};
