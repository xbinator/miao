import { ProxyOptions } from 'vite';
import proxyTargetList from './constant';

const httpsRE = /^https:\/\//;

const createProxyConfig = (target: string) => ({
  target,
  ws: true,
  changeOrigin: true,
  ...(httpsRE.test(target) ? { secure: false } : {})
});

export default () => {
  const result: Record<string, ProxyOptions> = {};

  Object.entries(proxyTargetList).forEach(([target, prefixs]) => {
    if (Array.isArray(prefixs)) {
      prefixs.forEach((prefix) => (result[prefix] = createProxyConfig(target)));
    } else {
      result[prefixs] = createProxyConfig(target);
    }
  });

  return result;
};
