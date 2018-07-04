module.exports = handler = {
  set: async (obj, key, value) => {
    const file = value.args[0],
      stats = value.args[1];

    await obj[value.action](file, stats);
  }
};
