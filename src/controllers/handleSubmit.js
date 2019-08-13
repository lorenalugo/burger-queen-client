const handleSubmit = async ({ email, password }) => {
  const data = { email, password };
  const queryString = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');

  try {
    const response = await fetch('http://165.22.175.69:8080/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: queryString,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export default handleSubmit;
