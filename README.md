# local-ports-finder  
**local-ports-finder** 是一个基于浏览器的工具，用于识别本地机器上的开放端口。非常适合直接在浏览器中进行快速网络诊断。  

## 安装与使用  
### 通过 UMD 加载  
将 `localPortFinder.umd.js` 文件引入到您的 HTML 中：  
```html  
<script src="../dist/localPortFinder.umd.js"></script>  
<script>  
  // 测试默认端口探测  
  localPortFinder.findFirstDefault().then(async result => {  
    console.log(`探测默认端口执行结果：${JSON.stringify(result)}`);  
  });  
</script>  
```  

或者，您可以通过 CDN 加载 UMD 文件：  
```html  
<script src="https://cdn.yourdomain.com/path/to/localPortFinder.umd.js"></script>  
<script>  
  // 测试默认端口探测  
  localPortFinder.findFirstDefault().then(async result => {  
    console.log(`探测默认端口执行结果：${JSON.stringify(result)}`);  
  });
</script>  
```  

### 通过 ES Module 加载  
将 `localPortFinder.es.js` 文件引入到您的 HTML 中：  
```html  
<script type="module">  
  import * as localPortFinder from './dist/localPortFinder.es.js';  
  // 测试指定端口探测  
  localPortFinder.findFirst([8080,7070], {
    logger: (logText) => console.log(logText),
    timeout: 100
  }).then(async result => {  
    console.log(`探测默认端口执行结果：${JSON.stringify(result)}`);  
  }); 
</script>  
```  

## 核心方法  
### 1. `findFirstDefault`  
从默认的端口列表中检测出第一个正在运行的端口，无需指定端口列表。  

### 2. `findFirst`  
从指定的端口列表中检测出第一个正在运行的端口，必须指定端口列表。  

## 参数配置  
### `options`  
- **logger**（非必传）：用于指定观测探测过程的自定义方法。如果不传递，则静默探测，不进行任何输出汇报。  
- **timeout**（非必传，默认 2000 毫秒）：指定每个探测的超时时间。如果超时，则主动中止该次探测，防止探测耗时过久。  

## 协议  
本项目遵循 **MIT** 协议。  

---  

# local-ports-finder  
**local-ports-finder** is a browser-based tool to identify open ports on your local machine. Perfect for quick network diagnostics directly within your web browser.  

## Installation and Usage  
### Load via UMD  
Include the `localPortFinder.umd.js` file in your HTML:  
```html  
<script src="../dist/localPortFinder.umd.js"></script>  
<script>  
  // Test default port detection  
  localPortFinder.findFirstDefault().then(async result => {  
    console.log(`Default port detection result: ${JSON.stringify(result)}`);
  });
</script>  
```  

Alternatively, you can load the UMD file via CDN:  
```html  
<script src="https://cdn.yourdomain.com/path/to/localPortFinder.umd.js"></script>  
<script>  
  // Test default port detection  
  localPortFinder.findFirstDefault().then(async result => {  
    console.log(`Default port detection result: ${JSON.stringify(result)}`);
  });
</script>  
```  

### Load via ES Module  
Include the `localPortFinder.es.js` file in your HTML:  
```html  
<script type="module">  
  import * as localPortFinder from './dist/localPortFinder.es.js';  
  // Test custom port detection  
  localPortFinder.findFirst([8080,7070], {
    logger: (logText) => console.log(logText),
    timeout: 100
  }).then(async result => {  
    console.log(`Custom port detection result：${JSON.stringify(result)}`);  
  });  
</script>  
```  

## Core Methods  
### 1. `findFirstDefault`  
Detects the first running port from a default port list. No need to specify a port list.  

### 2. `findFirst`  
Detects the first running port from a specified port list. A port list must be provided.  

## Configuration  
### `options`  
- **logger** (optional): A custom method to observe the detection process. If not provided, the detection will be silent with no output.  
- **timeout** (optional, default 2000ms): Specifies the timeout for each detection. If the timeout is reached, the detection will be aborted to prevent long delays.  

## License  
This project is licensed under the **MIT License**.  
