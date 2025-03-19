/**
 * 包含默认值的查找第一个可用端口模块
 */

import findFirstAvailablePort from './findFirst'

// 默认端口列表
const DEFAULT_PORTS = [
  7070,
  7071,
  8080,
  8081,
]

/**
 * 查找第一个可用端口
 * @param {Array} ports 端口列表
 * @param {Object} options 探测配置
 * @returns {Object} 返回查找结果
 */
const findFirstAvailablePortByDefaultPorts = async options => await findFirstAvailablePort(DEFAULT_PORTS, options)

// 导出模块
export {
  DEFAULT_PORTS,
  findFirstAvailablePortByDefaultPorts,
}
