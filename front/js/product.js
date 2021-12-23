var productURL = window.location.href;
var url = new URL(productURL);
let id = url.searchParams.get("id");

fetch("http://localhost:3000/api/products/"+id)
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(objetProduct) {
        const imgProduct = document.createElement("img");
            imgProduct.setAttribute("src",objetProduct.imageUrl);
            imgProduct.setAttribute("alt",objetProduct.altTxt);
        document.querySelector(".item__img").appendChild(imgProduct);
        document.getElementById("title").textContent = objetProduct.name;
        document.getElementById("price").textContent = objetProduct.price;
        document.getElementById("description").textContent = objetProduct.description;
        if(document.getElementById("quantity").value ==0)
        document.getElementById("quantity").setAttribute("value","1");
                
        let colorsProduct = objetProduct.colors;
        for(colorProduct of colorsProduct){
            const optionProduct = document.createElement("option");
            const optionText = document.createTextNode(colorProduct);
            optionProduct.appendChild(optionText);
            optionProduct.setAttribute('value',colorProduct);
            document.querySelector("#colors").appendChild(optionProduct);
        }
    })
    .catch(function(err) {
        alert("Une Erreur est survenue");
    });