const currentUrl = new URL(window.location.href);
const orderId = currentUrl.searchParams.get("order_id");
const orderIdElem = document.getElementById("orderId");

orderIdElem.innerText = orderId;
