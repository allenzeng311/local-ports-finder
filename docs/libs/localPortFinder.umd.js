(function(n,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(n=typeof globalThis<"u"?globalThis:n||self,i(n.localPortFinder={}))})(this,function(n){"use strict";const i=async(t,r)=>{const s=new AbortController,{signal:a}=s,e=new Promise((f,P)=>{setTimeout(()=>{s.abort(),P(new Error(`Timeout exceeded for port ${t}.`))},r)}),o=fetch(`http://localhost:${t}`,{method:"GET",signal:a});if(!(await Promise.race([o,e]).catch(f=>{throw f})).ok)throw new Error(`Failed to connect to port ${t}.`);return t},d=async(t,r,s)=>{for(const a of t){const e={port:a,status:!1,message:""},o=await i(a,s).catch(c=>{e.message=c.message});if(o!==void 0&&(e.status=!0),r&&r(e),e.status)return o}return null},l=async(t,r)=>{let s=r==null?void 0:r.logger;(!s||s&&typeof s!="function")&&(s=null);let a=r==null?void 0:r.timeout;a||(a=2e3);const e={status:!1,port:null,message:""};if(!t||t.length===0||isNaN(t[0]))return e.message="No ports provided.",e;try{const o=await d(t,s,a);return o===null?(e.message="No available port found.",e):(e.status=!0,e.port=o,e)}catch(o){return e.message=o.message,e}},u=[7070,7071,8080,8081],m=async t=>await l(u,t);n.DEFAULT_PORTS=u,n.findFirst=l,n.findFirstDefault=m,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
