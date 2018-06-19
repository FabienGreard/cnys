const proxy = (defaultTarget, handlers) => {
  this.proxy = new Proxy(defaultTarget, handlers);
  return {
    notify: (action, args) => {
      this.proxy[0] = { action, args };
    }
  };
};

module.exports = createProxy = (defaultTarget, handlers = {}) =>
  proxy(defaultTarget, handlers);
