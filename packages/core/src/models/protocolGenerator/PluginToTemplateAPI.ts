import ProtocolGeneratorAPI from "./ProtocolGeneratorAPI.js";

/**
 * 样式插件参数
 * @interface
 * @param {Preset} preset - 用户预设
 * @param {FileTree} files - 文件树，包含了基础的 src 目录
 * @param {Record<'content', string>} params - 传入的 content，适用于一些需要添加字段的特殊情况。
 */

/**
 * 插件影响框架的协议处理器
 * @param protocols 协议内容
 */
class PluginToTemplateAPI extends ProtocolGeneratorAPI {
  constructor(protocols = {}, props = {}, protocol = {}) {
    super(protocols, props, protocol);
  }
}

export default PluginToTemplateAPI;
