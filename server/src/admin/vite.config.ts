
export default (config: { server: any; }) => {
  return {
    ...config,
    server: {
      ...config.server,
      allowedHosts: ['debhatasamityadmin.bmhbd.org'],
    },
  };
};
