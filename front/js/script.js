/* Variable article contient api c'est DATA */

/* Récupéret les articles depuis mon API */
function fetchApi() {
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => (canapDisplay(data)));
}

/* Afficher mes cards */

function canapDisplay(articles) {
    let items = document.getElementById("items");

    for (let i = 0; i < articles.length; i++) {
        let link = document.createElement("a");
        let card_item = document.createElement("article");
        let card_item_img = document.createElement("img");
        let card_item_h3 = document.createElement("h3");
        let card_item_p = document.createElement("p");

        items.appendChild(link);
        link.appendChild(card_item);
        card_item.append(card_item_img, card_item_h3, card_item_p);

        link.href = `./product.html?id=${articles[i]._id}`;
        card_item_img.alt = articles[i].altTxt;
        card_item_img.src = articles[i].imageUrl;
        card_item_h3.classList.add("productName");
        card_item_h3.textContent = articles[i].name;
        card_item_p.classList.add("productDescription")
        card_item_p.textContent = articles[i].description;
    }
}

fetchApi();