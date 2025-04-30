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
  /** 文件/目录的绝对路径 */
  path: string;
  /** 文件描述信息 */
  describe: FileDescribe;
  /** 子节点（目录时有效） */
  children?: FileData[];
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
 * @param template 框架模板类型（'vue' | 'react'）
 * @param contentCallback 内容处理回调函数
 */
function processStyleFiles(
  plugin: keyof typeof StyleReg,
  fileData: FileData,
  template: string,
  contentCallback: (fileData: FileData, template: string) => FileData,
): FileData {
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
          if (typeof styleFile.describe.fileContent === "string") {
            fileData = contentCallback(fileData, template);
          }
        }
      }
    }
  }

  return fileData;
}

/**
 * 处理 SCSS 文件内容
 */
function processScss(fileData: FileData, template: string): FileData {
  for (const srcDir of fileData.children) {
    if (path.basename(srcDir.path) === "src") {
      const mainFile = srcDir.children[0];

      if (template === "vue") {
        mainFile.describe.fileContent = mainFile.describe.fileContent
          .replace(`<style scoped>`, `<style scoped lang="scss">`)
          .replace(`.css';`, `.scss';`);
      } else if (template === "react") {
        mainFile.describe.fileContent = mainFile.describe.fileContent.replace(`.css'`, `.scss'`);
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

  // 生成协议配置
  generatorAPI.protocolGenerate({
    [pluginToTemplateProtocol.ENTRY_FILE]: {
      params: {
        content: "import './styles/main.scss'",
        priority: 1,
      },
    },
    [pluginToTemplateProtocol.PROCESS_STYLE_PLUGIN]: {
      params: {
        content: {
          processStyleFiles,
          processScss,
        },
      },
    },
  });
};
