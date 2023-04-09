import e from"axios";function n(n){const o=e.create(n?.clientOptions);return o.interceptors.request.use((e=>(n?.onLoadingStart?.(),"function"==typeof n?.onRequest?n?.onRequest?.(e):e))),o.interceptors.response.use((e=>(n?.onLoadingEnd?.(),"function"==typeof n?.onResponse?n?.onResponse?.(e):e))),o}export{n as ApiClient};
//# sourceMappingURL=index.js.map
