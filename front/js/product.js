/*récupérer l'id*/
const str = window.location.href;
var url = new URL(str);
let id = url.searchParams.get("id");

let UrlProduct = "http://localhost:3000/api/products/" + id;

fetch(UrlProduct) /*je récupére les infos*/
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

        let prix = document.querySelector("#price");
        prix.innerText = data.price;

        let description = document.querySelector("#description");
        description.innerText = data.description;

        let canapColors = document.querySelector("#colors");
        data.colors.forEach(element => {
            var item = document.createElement("option");
            item.innerText = element;
            item.setAttribute("value", element)
            canapColors.appendChild(item);
        });


        const button = document.querySelector("#addToCart");
        button.addEventListener("click", function() {
            console.log("eventButton");
            let ProduitsSelectionnes = {
                imageChoisie: data.imageUrl,
                titreChoisi: data.name,
                prixChoisi: data.price,
                altTxtChoisi: data.altTxt,
                idChoisie: id,
                colorChoisie: document.querySelector("#colors").value,
                quantityChoisie: parseInt(document.querySelector("#quantity").value),
            };
            let ProduitInLocoalStorage = [];
            if (ProduitsSelectionnes.colorChoisie == "") {
                alert("Choisissez une couleur");
            } else if (ProduitsSelectionnes.quantity < 1) {
                alert("Sélectionnez une quantité entre 1 et 100");
            } else if (ProduitsSelectionnes.quantity > 100) {
                alert("Sélectionnez une quantité entre 1 et 100");
            } else if (window.localStorage.getItem("Produits")) {
                ProduitInLocoalStorage = JSON.parse(
                    window.localStorage.getItem("Produits")
                );
                const DejaPresent = ProduitInLocoalStorage.filter(
                    (product) =>
                    product.colorChoisie === ProduitsSelectionnes.colorChoisie &&
                    product.idChoisie === ProduitsSelectionnes.idChoisie
                );
                console.log(DejaPresent);
                if (DejaPresent.lenght) {
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
    });