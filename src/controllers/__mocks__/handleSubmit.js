const handleSubmit = jest.fn(({ x, y }) => new Promise((resolve, reject) => {
  const response = {
    status: 400,
    json: jest.fn(() => Promise.resolve('xxxxx')),
  };
  resolve(response);
  if (!x || !y) {
    const errorResponse = {
      status: 500,
    };
    reject(errorResponse);
  }
}));

export default handleSubmit;
