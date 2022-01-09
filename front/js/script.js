fetch("http://localhost:3000/api/products/")
              .then(function(res) {
                if (res.ok) {
                  return res.json();
                }
              })
              .then(function(objetProduct) { 
                for (let infoProduct of objetProduct){
                  const aProduct = document.createElement("a");
                    aProduct.setAttribute("href","./product.html?id="+infoProduct._id);
                  const tagArticle = document.createElement("article");
                  const imgProduct = document.createElement("img");
                    imgProduct.setAttribute("src",infoProduct.imageUrl);
                    imgProduct.setAttribute("alt",infoProduct.altTxt);
                  const h3nameProduct = document.createElement("h3");
                    h3nameProduct.setAttribute("class","productName");
                    h3nameProduct.innerHTML = infoProduct.name;
                  const pDescription = document.createElement("p");
                    pDescription.setAttribute("class","productDescription");
                    pDescription.innerHTML = infoProduct.description;
                  
                  tagArticle.appendChild(imgProduct);
                  tagArticle.appendChild(h3nameProduct);
                  tagArticle.appendChild(pDescription);
                  aProduct.appendChild(tagArticle);
                  document.getElementById("items").appendChild(aProduct);
                }
                //console.log(objetProduct[0].colors);
              })
              .catch(function(err) {
                 alert("Une Erreur est survenue" +err);
              });
