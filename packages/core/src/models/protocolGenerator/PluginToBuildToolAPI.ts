import { createConfigByParseAst } from "../../utils/ast/parseAst.js";

import ProtocolGeneratorAPI from "./ProtocolGeneratorAPI.js";

/**
 * 插件对构建工具协议
 * @param protocols 协议内容
 */
class PluginToBuildToolAPI extends ProtocolGeneratorAPI {
  constructor(protocols = {}, props = {}, protocol = {}) {
    super(protocols, props, protocol);
  }
  generator() {
    for (const protocol in this.protocols) {
      this[protocol](this.protocols[protocol]);
    }
  }

  /**
   * 编译器类插件协议
   * @param params
   * @param params.compiler 编译器
   * @param params.template 模板
   * @param params.buildTool 构建工具选择
   */
  ADD_COMPILER_CONFIG(params) {
    const { compiler } = params;
    const { template, buildTool } = this.props.preset;
    const buildToolConfigAst = this.props.buildToolConfigAst;
    // 默认生成的单独配置文件
    const compilerConfigMap = {
      babel: "./babel.config.js",
      swc: "./.swcrc",
    };
    // 抽离出来的构建工具配置文件，需要传入 匹配文件格式test，和编译器compiler
    const buildToolConfigGenerators = {
      webpack: ({ test, compiler }) => {
        const baseRule = {
          test,
          include: [
            {
              __astType: "pathResolve",
              args: ["./src"],
            },
          ],
          exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
          use: [{ loader: `${compiler}-loader` }],
        };

        return {
          rules: [baseRule],
          plugins: [],
        };
      },
      vite: ({ test, compiler }) => ({
        plugins: [
          {
            name: `vite-plugin-${compiler}`,
            transform: (code, id) => {
              if (id.match(test)) {
                return require(`@${compiler}/core`).transformSync(code, {
                  configFile: compilerConfigMap[compiler],
                  filename: id,
                }).code;
              }
            },
          },
        ],
        rules: [],
      }),
      rollup: ({ compiler }) => ({
        plugins: [require(`@rollup/plugin-${compiler}`)],
        rules: [],
      }),
    };

    let test;
    if (template === "react") {
      test = /\.(ts|tsx|js|jsx)$/;
    } else if (template === "vue") {
      test = /\.(ts|js)$/;
    }
    const buildToolConfig = buildToolConfigGenerators[buildTool]({ test, compiler });
    if (!buildToolConfig) {
      throw new Error(`不支持的构建工具: ${buildTool}`);
    }
    createConfigByParseAst(buildTool, buildToolConfig, buildToolConfigAst);
  }
}

export default PluginToBuildToolAPI;
