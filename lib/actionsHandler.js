module.exports = handler = {
  set: async (obj, prop, value) => {
    if (value.action === 'ready') await obj.connect();
    else {
      const [file, dir, stats] = value.args;
      value.action === 'delete'
        ? await obj.remove(file, dir)
        : await obj.upload(file, dir, stats);
    }
  }
};
