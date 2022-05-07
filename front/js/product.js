/*récupérer l'id*/

window.onload = () => {

    //-------------- Récuperation de l'url et stockage ----------------

    const getIdFromUrl = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const product_id = urlParams.get("id");
        return product_id;
    };

    const product_id = getIdFromUrl();

}

let productID = window.location.search.replace("?id=", "");
let image = document.querySelector("item__img");
let price = document.getElementById("price");
let description = document.getElementById("description");
let colorSelector = document.getElementById("colors");
let quantitySelector = document.getElementById("quantity");
let validateButton = document.getElementById("addToCart");
quantitySelector.value = "";
let product = [];
let userCart = {
    name = "",
    price = "",
    id = "",
    color = "",
    quantity = "",
    srcImg = "",
    altText = "",
};

const fetchApiProduct = async() => {
    fetch("http://localhost:3000/api/products/${productId}")
        .then((res) => res.json())
        .then((data) => (product = data));
};

const productAddInfos = async() => {
    fetchApiProduct();
    //Titre document
    document.title = product.name;


}