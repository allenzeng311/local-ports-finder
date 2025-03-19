/**
 * 查找第一个可用端口模块
 */

import { probePort } from './common'

/**
 * 查找端口
 * @param {Array} ports 端口列表
 * @param {Function} logger 日志记录器
 * @param {Number} timeout 超时时间
 * @returns {Object} 返回查找结果，如果找到可用端口则返回端口号，否则返回null
 */
const probePorts = async(ports, logger, timeout) => {
  // 遍历端口列表
  for (const port of ports) {
    // 格式化查找结果
    const result = {
      port,
      status: false,
      message: '',
    }

    // 尝试查找一个端口
    const availablePort = await probePort(port, timeout).catch(error => {
      // 如果发生异常，则记录错误信息
      result.message = error.message
    })

    // 如果找到可用端口，即返回结果不为undefined，则标识查找状态为成功
    if (availablePort !== undefined) {
      result.status = true
    }

    // 如果提供了日志记录器，则记录查找结果
    if (logger) {
      logger(result)
    }

    // 如果找到可用端口，则返回端口号结束循环，否则继续查找下一个端口
    if (result.status) {
      return availablePort
    }
  }

  // 如果循环遍历了传递的所有端口号，没有找到可用端口，则返回null
  return null
}

/**
 * 查找第一个可用端口
 * @param {Array} ports 端口列表
 * @param {Object} options 探测配置
 * @returns {Object} 返回查找结果
 */
const findFirstAvailablePort = async(ports, options) => {
  // 解构探测配置
  let logger = options?.logger
  if (!logger || (!!logger && typeof logger !== 'function')) {
    logger = null
  }
  let timeout = options?.timeout
  if (!timeout) {
    // 如果没有传递超时时间，则默认为2000ms
    timeout = 2000
  }

  // 格式化查找结果
  const result = {
    status: false,
    port: null,
    message: '',
  }

  if (!ports || ports.length === 0 || isNaN(ports[0])) {
    // 如果没有传递端口列表，则返回错误状态和错误信息
    result.message = 'No ports provided.'
    return result
  }

  // 尝试查找可用端口
  try {
    const availablePort = await probePorts(ports, logger, timeout)
    // 如果没有找到可用端口，返回错误状态和错误信息
    if (availablePort === null) {
      result.message = 'No available port found.'
      return result
    }

    // 返回正确查找状态和可用端口
    result.status = true
    result.port = availablePort
    return result
  }
  catch (error) {
    // 发生异常，则返回错误状态和错误信息
    result.message = error.message
    return result
  }
}

// 导出模块
export default findFirstAvailablePort
