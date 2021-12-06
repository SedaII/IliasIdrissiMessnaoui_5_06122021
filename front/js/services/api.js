const baseUrl = "http://localhost:3000/api/products";

export const getAllProducts = async () => {
  const url = baseUrl + "/";

  return fetch(url, {method: "GET"})
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("erreur: ", resp.status, resp.statusText);
    }
  })
  .then((data) => {
    if(data) {
      return data;
    }
  })
  .catch((error) => console.log("error" + error));
}

export const getProductById = (id) => {
  const url = baseUrl + "/" + id;

  return fetch(url, {method: "GET"})
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("erreur: ", resp.status, resp.statusText);
    }
  })
  .then((data) => {
    if(data) {
      return data;
    }
  })
  .catch((error) => console.log("error" + error));
}

export const orderProducts = (data) => {
  const url = baseUrl + "/order";

  fetch(url, {method: "POST", body: data})
  .then((resp) => {
    console.log(resp);
  })
  .catch(console.log);
}

