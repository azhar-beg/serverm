const createNext = handlers => {
  let index = -1;
  const callNextHandler = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, () => callNextHandler(req, res));
    }
  };
  return callNextHandler;
};

const createRouter = (...handlers) => {
  return (req, res) => {
    req.url = new URL(req.url, `http://${req.headers.host}`)
    const next = createNext(handlers);
    next(req, res);
  };
};

module.exports = { createRouter };
