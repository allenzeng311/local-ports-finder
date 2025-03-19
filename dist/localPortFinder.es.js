const probePort = async (port, timeout) => {
  const controller = new AbortController();
  const { signal } = controller;
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error(`Timeout exceeded for port ${port}.`));
    }, timeout);
  });
  const responsePromise = fetch(`http://localhost:${port}`, {
    method: "GET",
    signal
  });
  const response = await Promise.race([responsePromise, timeoutPromise]).catch((error) => {
    throw error;
  });
  if (!response.ok) {
    throw new Error(`Failed to connect to port ${port}.`);
  }
  return port;
};
const probePorts = async (ports, logger, timeout) => {
  for (const port of ports) {
    const result = {
      port,
      status: false,
      message: ""
    };
    const availablePort = await probePort(port, timeout).catch((error) => {
      result.message = error.message;
    });
    if (availablePort !== void 0) {
      result.status = true;
    }
    if (logger) {
      logger(result);
    }
    if (result.status) {
      return availablePort;
    }
  }
  return null;
};
const findFirstAvailablePort = async (ports, options) => {
  let logger = options == null ? void 0 : options.logger;
  if (!logger || !!logger && typeof logger !== "function") {
    logger = null;
  }
  let timeout = options == null ? void 0 : options.timeout;
  if (!timeout) {
    timeout = 2e3;
  }
  const result = {
    status: false,
    port: null,
    message: ""
  };
  if (!ports || ports.length === 0 || isNaN(ports[0])) {
    result.message = "No ports provided.";
    return result;
  }
  try {
    const availablePort = await probePorts(ports, logger, timeout);
    if (availablePort === null) {
      result.message = "No available port found.";
      return result;
    }
    result.status = true;
    result.port = availablePort;
    return result;
  } catch (error) {
    result.message = error.message;
    return result;
  }
};
const DEFAULT_PORTS = [
  7070,
  7071,
  8080,
  8081
];
const findFirstAvailablePortByDefaultPorts = async (options) => await findFirstAvailablePort(DEFAULT_PORTS, options);
export {
  DEFAULT_PORTS,
  findFirstAvailablePort as findFirst,
  findFirstAvailablePortByDefaultPorts as findFirstDefault
};
