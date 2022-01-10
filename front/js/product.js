var productURL = window.location.href;
var url = new URL(productURL);
let id = url.searchParams.get("id");
//localStorage.clear();

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
        document.querySelector("#colors").setAttribute("required","required");
        document.querySelector("#colors > option").setAttribute("disabled","disabled");
                
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

    if(localStorage.getItem('stockincart')=="") //detruit le storage du panier s'il est vide
    localStorage.removeItem("stockincart");

    const addProduct = document.querySelector("#addToCart");
    addProduct.addEventListener("click", function(e){
        e.preventDefault; 
        if(document.querySelector("#colors").value==""){//faire de la couleur un champ obligatoire
        alert("SVP Choisissez une couleur");
        //document.getElementsByTagName("label")[0].style.color = "red";
        document.querySelector("#colors").focus(); 
        document.querySelector("#colors").style.border = "2px solid red";
        }
        else{
            document.querySelector("#colors").style = "";
            stockProduct = {
                id : id,
                quantity : document.querySelector("#quantity").value,
                color : document.querySelector("#colors").value
            };
            let  addId = true; let long=0;
            if (localStorage.hasOwnProperty('stockincart')===false ) {
                localStorage.setItem("stockincart",JSON.stringify([stockProduct]));
                long ++;
            }
            else{
                let allcartproduct = localStorage.getItem("stockincart");
                let allcartProducts = JSON.parse(allcartproduct); 
                for (let  oProduct  of allcartProducts){
                    if(oProduct.id == stockProduct.id && oProduct.color == stockProduct.color){
                        oProduct.quantity  =  (parseInt(oProduct.quantity) + 
                        parseInt(document.querySelector("#quantity").value)).toString();
                        addId = false; 
                        long ++;
                    }
                }
            
                let  allcartProducts2;
                if(addId == true){
                    let p = JSON.stringify(allcartProducts);
                    p= p.replace(/\[/g, ''); p= p.replace(/\]/g, ''); 
                    let p2 = JSON.stringify(stockProduct);
                    allcartProducts2 = "["+p+","+p2+"]";
                    localStorage.setItem("stockincart",allcartProducts2);
                }
                else{     
                    //allcartProducts2 = allcartProducts;
                    localStorage.setItem("stockincart",JSON.stringify(allcartProducts));
                }
            }
            // localStorage.removeItem("stockincart");
            let objLinea = localStorage.getItem("stockincart");
            //alert(objLinea);
            let qty =0;
            let acPs = JSON.parse(objLinea); 
            for (let  ps  of acPs){ // la quantite d'article dans le panier
                qty  +=  parseInt(ps.quantity);             
            }
            let panier = document.getElementsByTagName("li"); 
            panier[4].innerHTML = "Panier <strong title='Article(s)'>[" + qty+ "]</strong>";
            localStorage.setItem("stockQty", qty );
        
        } 
        
    });
    let sQty = localStorage.getItem("stockQty");
    if(parseInt(sQty)>0 && sQty.length>0){
        let panier = document.getElementsByTagName("li");
        panier[4].innerHTML = "Panier <strong title='Article(s)'>[" + sQty+ "]</strong>";
    }    