/**
 * 通用方法
 */

/**
 * 探测一个端口是否可用
 * @param {Number} port 端口号
 * @param {Number} timeout 超时时间
 * @returns {Number} 返回可用端口号，如果查找失败则抛出异常
 */
export const probePort = async(port, timeout) => {
  const controller = new AbortController()
  const { signal } = controller

  // 设置单个fetch的超时逻辑
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      // 中止fetch请求
      controller.abort()
      reject(new Error(`Timeout exceeded for port ${port}.`))
    }, timeout)
  })

  // 发起一个fetch请求
  const responsePromise = fetch(`http://localhost:${port}`, {
    method: 'GET',
    signal,
  })

  // 等待fetch请求结果和超时结果，谁先返回就使用谁
  const response = await Promise.race([responsePromise, timeoutPromise]).catch(error => {
    throw error
  })

  // 如果fetch请求返回状态码不是200，则抛出异常
  if (!response.ok) {
    throw new Error(`Failed to connect to port ${port}.`)
  }

  // 返回可用端口号
  return port
}
