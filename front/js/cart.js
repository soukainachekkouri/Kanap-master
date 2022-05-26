function getCanap() {
    const items = JSON.parse(window.localStorage.getItem("produits"));
    console.log(items);

    let somme = 0;
    let quant = items.length
    console.log(quant);
    document.getElementById("totalQuantity").innerText = quant + "";
    for (let item of items) {
        console.log(item);
        fetch("http://localhost:3000/api/products/" + item.idChoisie)
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                somme += parseInt(data.price) * parseInt(item.quantityChoisie);

                let total = document.getElementById("totalPrice")
                total.innerText = somme + ""

                let art = document.createElement("article");
                art.className = "cart__items"
                art.setAttribute("data-id", data._idChoisie)
                art.setAttribute("data-color", item.couleur)

                let div_art = document.createElement("div");
                div_art.className = "cart__item__img"

                let image = document.createElement("image")
                image.setAttribute("src", data.imageUrl)
                image.setAttribute("alt", data.altTxt)
                div_art.appendChild(image)

                let cart__item__content = document.createElement("div")
                cart__item__content.className = "cart__item__content"



            })


    }



    /*il faut que */

    /*

    let UrlProduct = "http://localhost:3000/api/products/";

    const displayCard = document.getElementById("cart__items");
    const displayQuantity = document.getElementById("itemQuantity");

    let totalQuantity = [];

    async function dejaPresent(product) {

    }

                function addCanap(Produits) {
                    let produitsValide = getCanap();
                    produitsValide.push(Produits);
                    saveCanap(Produits);
                }*/



    /*
    let addproduct = [];

    let price = document.querySelector("#price");

    let priceCart = 0;*/
}

getCanap();