import type GeneratorAPI from "@src/models/GeneratorAPI.js";
import path from "path";

import { pluginToTemplateProtocol } from "../../../../core/dist/src/configs/protocol.js";

interface FileDescribe {
  /** 文件扩展名（如 'js'、'scss'） */
  fileExtension: string;
  /** 文件内容（支持字符串） */
  fileContent: string;
  /** 其他自定义元数据 */
  [key: string]: any;
}
interface FileData {
  path: string;
  type?: "dir" | "file";
  children: FileData[];
  describe: Partial<FileDescribe>;
}

// 样式文件类型正则表达式映射
const StyleReg: Record<string, RegExp> = {
  css: /\.css$/i,
  scss: /\.scss$/i,
  less: /\.less$/i,
};

/**
 * 处理样式文件
 * @param plugin 插件名称（'css' | 'scss' | 'less'）
 * @param fileData 文件树结构
 */
function processStyleFiles(plugin: keyof typeof StyleReg, fileData: FileData): FileData {
  const regex = StyleReg[plugin];

  // 遍历文件树
  for (const srcDir of fileData.children) {
    if (path.basename(srcDir.path) === "src") {
      for (const styleFile of srcDir.children) {
        const ext = path.extname(styleFile.path);

        if (regex.test(ext)) {
          // 更新文件扩展名
          const newExt = `.${plugin}`;
          styleFile.path = styleFile.path.replace(ext, newExt);
          styleFile.describe.fileExtension = plugin;

          // 处理文件内容
          // if (typeof styleFile.describe.fileContent === "string") {
          // }
        }
      }
    }
  }

  return fileData;
}

// 插件主入口
export default (generatorAPI: GeneratorAPI) => {
  // 添加依赖
  generatorAPI.extendPackage({
    devDependencies: {
      sass: "^1.81.0",
    },
  });
  const preset = generatorAPI.getPreset();
  const fileData = generatorAPI.generator.getFiles().getFileData();
  // 处理样式文件
  let styleType = "css";
  if (preset.plugins["scss"]) {
    styleType = "scss";
  } else if (preset.plugins["less"]) {
    styleType = "less";
  }
  processStyleFiles(styleType, fileData);
  // 生成协议配置
  generatorAPI.protocolGenerate({
    [pluginToTemplateProtocol.ENTRY_FILE]: {
      params: {
        content: "import './styles/main.scss'",
        priority: 1,
      },
    },
  });
};
