function getCanap() {
    const items = JSON.parse(window.localStorage.getItem("produits"));
    console.log(items);

    let somme = 0;
    let quant = items.length
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
                art.className = "cart__item"
                art.setAttribute("data-id", item.idChoisie)
                art.setAttribute("data-color", item.colorChoisie)
                console.log(art);

                let div_art = document.createElement("div");
                div_art.className = "cart__item__img"

                let image = document.createElement("img")
                image.setAttribute("src", data.imageUrl)
                image.setAttribute("alt", data.altTxt)
                div_art.appendChild(image)
                art.appendChild(div_art)
                    /*console.log(image);*/

                let selection = document.getElementById("cart__items")
                selection.appendChild(art)
                    /*console.log(image);*/


                let cart__item__content = document.createElement("div")
                cart__item__content.className = "cart__item__content"

                let cart__item__content_description = document.createElement("div")
                cart__item__content_description.className = "cart__item__content_description"
                cart__item__content.appendChild(cart__item__content_description)

                let canapname = document.createElement("h2")
                canapname.innerText = data.name
                cart__item__content_description.appendChild(canapname)
                console.log(cart__item__content);

                let canapColor = document.createElement("p")
                canapColor.innerText = item.colorChoisie
                cart__item__content_description.appendChild(canapColor)
                console.log(cart__item__content);

                let canapPrice = document.createElement("p")
                canapPrice.innerText = data.price
                cart__item__content_description.appendChild(canapPrice)
                art.appendChild(cart__item__content)
                selection.appendChild(art)
                console.log(cart__item__content);

                let art__item__content__settings = document.createElement("div")
                art__item__content__settings.className = "cart__item__content__settings"


                let cart__item__content__settings__quantity = document.createElement("div")
                cart__item__content__settings__quantity.className = "cart__item__content__settings__quantity"
                art__item__content__settings.appendChild(cart__item__content__settings__quantity)

                let quant = document.createElement("p")
                quant.innerText = "Qte"
                cart__item__content__settings__quantity.appendChild(quant)
                console.log(cart__item__content);

                let quantSelect = document.createElement("input")
                quantSelect.setAttribute("type", "number")
                quantSelect.setAttribute("name", "itemQuantity")
                quantSelect.setAttribute("class", "itemQuantity")
                quantSelect.setAttribute("min", 1)
                quantSelect.setAttribute("max", 100)
                quantSelect.setAttribute("value", item.quantityChoisie)


                cart__item__content__settings__quantity.appendChild(quantSelect)
                quantSelect.addEventListener("change", function() {
                    let oldPrice = parseInt(item.quantityChoisie) * parseInt(data.price)

                    somme -= oldPrice
                    console.log(somme);

                    let newQuantity = parseInt(quantSelect.value)

                    let newPrice = parseInt(newQuantity) * parseInt(data.price)
                    console.log(newPrice);

                    somme += newPrice
                    item.quantityChoisie = newQuantity

                    let index = items.indexOf(item)
                    if (index > -1) {
                        items.splice(index, 1)
                        items.push(item)
                        window.localStorage.setItem("produits", JSON.stringify(items))
                    }

                    console.log(somme);
                    total.innerText = somme + ""


                })
                cart__item__content.appendChild(art__item__content__settings)

                let cart__item__content__settings__delete = document.createElement("div");
                cart__item__content__settings__delete.className = "cart__item__content__settings__delete"
                art__item__content__settings.appendChild(cart__item__content__settings__delete)

                let deleteItem = document.createElement("p")
                deleteItem.innerText = "Supprimer"
                deleteItem.className = "deleteItem"
                cart__item__content__settings__delete.appendChild(deleteItem)

                deleteItem.addEventListener("click", function() {
                    let newQuantity = parseInt(quantSelect.value)
                    let newPrice = parseInt(newQuantity) * parseInt(data.price)

                    somme -= newPrice
                    total.innerText = somme + ""
                    selection.removeChild(art)

                    let index = items.indexOf(item)
                    if (index > -1) {
                        items.splice(index, 1)
                        window.localStorage.setItem("produits", JSON.stringify(items))
                    }

                    quant = items.length
                    document.getElementById("totalQuantity").innerText = quant + "";
                })

            })


    }


}

getCanap();

function getForm() {

    // Form regex à dégager de cette fonction

    let prenom = document.getElementById("firstname");
    let nom = document.getElementById("lastName");
    let ville = document.getElementById("city");
    let adresse = document.getElementById("address");
    let mail = document.getElementById("email").value;
    let valide = true

    let emailErrorMsg = document.getElementById("emailErrorMsg");

    /* ! = notvalideemail*/
    if (!validateEmail(mail)) {

        emailErrorMsg.innerText = "Veuillez entrez une adresse mail valide"

        valide = false
    }

    // simple RegEx for names : accepted characters by RegEx

    let regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;

    // first name
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

    function validateFirstName(prenom) {
        if (regexName.test(prenom) == false) {
            return false;
        } else {
            firstNameErrorMsg.innerHTML = null;
            return true;
        }
    }

    // last name
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

    function validateLastName(nom) {
        if (regexName.test(nom) == false) {
            return false;
        } else {
            lastNameErrorMsg.innerHTML = null;
            return true;
        }
    }

    // city
    let cityErrorMsg = document.getElementById("cityErrorMsg");

    function validateCity(ville) {
        if (regexName.test(ville) == false) {
            return false;
        } else {
            cityErrorMsg.innerHTML = "veuillez entrez une adresse mail valide";
            return true;
        }
    }

    function makeJsonData() {
        let contact = {
            firstName: prenom.value,
            lastName: nom.value,
            address: adresse.value,
            city: ville.value,
            email: mail.value,
        };
        let items = getCart();
        let products = [];

        for (i = 0; i < items.length; i++) {
            if (products.find((e) => e == items[i][0])) {
                console.log("not found");
            } else {
                products.push(items[i][0]);
            }
        }
        let jsonData = JSON.stringify({ contact, products });
        return jsonData;
    }

    return valide;
}

function validateEmail(mail) {
    let regexMail =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexMail.test(mail) == false) {
        return false;
    } else {
        emailErrorMsg.innerHTML = null;
        return true;
    }
}

document.getElementById("order").addEventListener("click", function() {
    event.preventDefault()
    let valide = getForm()
    if (valide) {
        // intégrer le post ici 
    }
    // une fois que j'ai testé si la valeur de l'eamil est diff de vide, prénom, nom... alors les critères sont correctes et je peux faire ma requête ici
})