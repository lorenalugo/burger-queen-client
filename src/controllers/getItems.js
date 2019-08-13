const getItems = async (endPoint, method, token, bodyObj = null) => {
  let body;
  const headers = {
    authorization: `Bearer ${token}`,
  };
  if (bodyObj !== null) {
    body = JSON.stringify(bodyObj);
    headers['Content-Type'] = 'application/json';
  } else {
    body = null;
  }
  try {
    const response = await fetch(`http://165.22.175.69:8080/${endPoint}`, {
      method: method.toUpperCase(),
      headers,
      body,
    });

    const json = await response.json();
    return json;
  } catch (err) {
    return err;
  }
};

export default getItems;
