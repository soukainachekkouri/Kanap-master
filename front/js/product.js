let product;
let path = window.location.search;
let id = new URLSearchParams(path).get("id");

function getCurent() {
    fetch("http://localhost:3000/api/products/" + id)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                product = data;
                getCanapInfo(product.imageUrl, product.altTxt, product.price, product.description, product.colors);
            }
        )

}

function getCanapInfo(pathImage, altImage, prix, canapDescription, colors) {
    /*Afficher les élements de la page */
    let divImg = document.getElementsByClassName("item__img")[0];
    let image = document.createElement("img");
    image.setAttribute("src", pathImage);
    image.setAttribute("alt", altImage);
    divImg.appendChild(image);
    let price = document.getElementById("price");
    price.innerText = prix + "";
    let description = document.getElementById("description");
    description.innerText = canapDescription;
    /*Recupérer la couleur */
    let couleur = document.getElementById("colors");
    for (let color of colors) {
        let option = document.createElement("option");
        option.setAttribute("value", color);
        option.innerText = color;
        couleur.appendChild(option);
    }
}

function addToCart(id) {
    let quantite = document.getElementById("quantity").value;
    let couleur = document.getElementById("colors").value;
    if (quantite > 100 || quantite < 1) {
        alert("Vous devez choisir entre 1 et 100 articles");
        return
    }
    if (couleur == "") {
        alert("Vous devez sélectionner une couleur");
        return
    }
    let cards = JSON.parse(window.localStorage.getItem("produits"));
    /*! = négation */
    if (!cards) {
        cards = [];
    }
    /*créer un objet qui contient l'élément que user veut ajouter à son panier */
    let item = {
        "idChoisie": id,
        "quantityChoisie": quantite,
        "colorChoisie": couleur,
    }

    /*Est ce que le produit ajouté existe déjà ? */
    let exist = cards.find(element => element.idChoisie == item.idChoisie && element.colorChoisie == item.colorChoisie);
    if (exist) {
        exist.quantityChoisie = parseInt(exist.quantityChoisie) + parseInt(item.quantityChoisie)
    } else {
        cards.push(item)
    }
    /*On met le localstorage à jour */
    window.localStorage.setItem("produits", JSON.stringify(cards))

    /*Afficher un message */
    alert("Votre produit a été ajouté au panier");
}


getCurent();
document.getElementById("addToCart").addEventListener("click", function() {
    addToCart(id)
});