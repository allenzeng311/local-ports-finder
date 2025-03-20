const i = async (t, r) => {
  const s = new AbortController(), { signal: o } = s, e = new Promise((l, c) => {
    setTimeout(() => {
      s.abort(), c(new Error(`Timeout exceeded for port ${t}.`));
    }, r);
  }), a = fetch(`http://localhost:${t}`, {
    method: "GET",
    signal: o
  });
  if (!(await Promise.race([a, e]).catch((l) => {
    throw l;
  })).ok)
    throw new Error(`Failed to connect to port ${t}.`);
  return t;
}, u = async (t, r, s) => {
  for (const o of t) {
    const e = {
      port: o,
      status: !1,
      message: ""
    }, a = await i(o, s).catch((n) => {
      e.message = n.message;
    });
    if (a !== void 0 && (e.status = !0), r && r(e), e.status)
      return a;
  }
  return null;
}, f = async (t, r) => {
  let s = r == null ? void 0 : r.logger;
  (!s || s && typeof s != "function") && (s = null);
  let o = r == null ? void 0 : r.timeout;
  o || (o = 2e3);
  const e = {
    status: !1,
    port: null,
    message: ""
  };
  if (!t || t.length === 0 || isNaN(t[0]))
    return e.message = "No ports provided.", e;
  try {
    const a = await u(t, s, o);
    return a === null ? (e.message = "No available port found.", e) : (e.status = !0, e.port = a, e);
  } catch (a) {
    return e.message = a.message, e;
  }
}, m = [
  7070,
  7071,
  8080,
  8081
], d = async (t) => await f(m, t);
export {
  m as DEFAULT_PORTS,
  f as findFirst,
  d as findFirstDefault
};
