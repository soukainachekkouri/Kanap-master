let product;
let path = window.location.search;
let id = new URLSearchParams(path).get("id");

function getCurent() {
    console.log(id);
    fetch("http://localhost:3000/api/products/" + id)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                product = data;
                console.log(data);
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
    console.log(exist);
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







/*récupérer l'id
const str = window.location.href;
var url = new URL(str);
let id = url.searchParams.get("id");

let UrlProduct = "http://localhost:3000/api/products/" + id;

fetch(UrlProduct) /*je récupére les infos
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let photo = document.querySelector(".item__img");
        const baliseImg = document.createElement("img");
        baliseImg.src = data.imageUrl;
        baliseImg.alt = data.altTxt;
        photo.appendChild(baliseImg);

        let nom = document.querySelector("#title");
        nom.innerText = data.name;

        /*let prix = document.querySelector("#price");
        prix.innerText = data.price;

        let description = document.querySelector("#description");
        description.innerText = data.description;

        let canapColors = document.querySelector("#colors");
        data.colors.forEach(element => {
            var items = document.createElement("option");
            items.innerText = element;
            items.setAttribute("value", element)
            canapColors.appendChild(items);
        });



        const button = document.querySelector("#addToCart");
        button.addEventListener("click", function() {
            console.log("eventButton");
            let ProduitsSelectionnes = {
                idChoisie: id,
                colorChoisie: document.querySelector("#colors").value,
                quantityChoisie: parseInt(document.querySelector("#quantity").value),
            };
            let ProduitInLocoalStorage = [];
            if (ProduitsSelectionnes.colorChoisie == "") {
                alert("Choisissez une couleur");
            } else if (ProduitsSelectionnes.quantityChoisie < 1) {
                alert("Sélectionnez une quantité entre 1 et 100");
            } else if (ProduitsSelectionnes.quantityChoisie > 100) {
                alert("Sélectionnez une quantité entre 1 et 100");
            } else if (window.localStorage.getItem("produits")) {
                ProduitInLocoalStorage = JSON.parse(
                    window.localStorage.getItem("produits")
                );
                const DejaPresent = ProduitInLocoalStorage.filter(
                    (product) =>
                    product.colorChoisie === ProduitsSelectionnes.colorChoisie &&
                    product.idChoisie === ProduitsSelectionnes.idChoisie
                );
                console.log(DejaPresent); /* revoir cette fonction, si un object existe deja, il faut vérifier la couleur et à ce oment là implémenter juste la quantité */
/*if (DejaPresent.lenght) {
                    let total = ProduitsSelectionnes.quantityChoisie + DejaPresent[0].quantityChoisie;

                    console.log(
                        "Votre panier compte désormais : ", total
                    );

                    const indexDejaPresent = ProduitInLocoalStorage.indexOf(
                        DejaPresent[0]
                    );

                    ProduitInLocoalStorage[indexDejaPresent].quantityChoisie = total;
                }

                console.log("produit ajouté =>", ProduitsSelectionnes);
            } else {
                console.log("creationLocalStorage");
                ProduitInLocoalStorage.push(ProduitsSelectionnes);
                window.localStorage.setItem(
                    "produits",
                    JSON.stringify(ProduitInLocoalStorage)
                );
                console.log(ProduitInLocoalStorage);
                alert("Votre produit a été ajouté au panier");
            }
        })
    });*/


/*retirer le prix du local storage au moment je récupère les infos produit */