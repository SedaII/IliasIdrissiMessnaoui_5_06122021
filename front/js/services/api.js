const baseUrl = "http://localhost:3000/api/products";

export const getAllProducts = () => {
  const url = baseUrl + "/";

  return fetch(url, { method: "GET" })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        console.log("erreur: ", resp.status, resp.statusText);
      }
    })
    .then((data) => {
      if (data) {
        return data;
      }
    })
    .catch((error) => console.log("error" + error));
};

export const getProductById = (id) => {
  const url = baseUrl + "/" + id;

  return fetch(url, { method: "GET" })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        console.log("erreur: ", resp.status, resp.statusText);
      }
    })
    .then((data) => {
      if (data) {
        return data;
      }
    })
    .catch((error) => console.log("error" + error));
};

export const orderProducts = (data) => {
  const url = baseUrl + "/order";

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        console.log("erreur: ", resp.status, resp.statusText);
      }
    })
    .then((data) => {
      if (data) {
        return data;
      }
    })
    .catch((error) => console.log("error" + error));
};
