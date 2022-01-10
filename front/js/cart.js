var productURL = window.location.href;
var url = new URL(productURL);
let orderId = url.searchParams.get("orderId");

function lisarticle(id,color,quantity,qs){
  fetch("http://localhost:3000/api/products/"+id)
  .then(function(res) {
  if (res.ok) {   
      return res.json();
  }
  })
  .then(function(objetProduct) {
    let imageUrl = objetProduct.imageUrl;
    let altTxt = objetProduct.altTxt;
    let name = objetProduct.name;
    let price = objetProduct.price;
    let prices = price*quantity;
    let description = objetProduct.description;
    
    const articleP = document.createElement("article");
        articleP.setAttribute("data-id",id);
        articleP.setAttribute("data-color",color);
        articleP.setAttribute("class","cart__item");
    const divP1 = document.createElement("div");
        divP1.setAttribute("class","cart__item__img");
    const imgP = document.createElement("img");
        imgP.setAttribute("src",imageUrl);
        imgP.setAttribute("alt",altTxt);
    const divP2 = document.createElement("div");
        divP2.setAttribute("class","cart__item__content");
    const divP3 = document.createElement("div");
        divP3.setAttribute("class","cart__item__content__description");
    const h2P = document.createElement("h2");
        h2P.innerText = name;
    const pP1 = document.createElement("p");
        pP1.innerText = color; 
    const pP2 = document.createElement("p");
       // pP2.innerText = prices;
        pP2.setAttribute("class","prices");
    const sP = document.createElement("span"); 
        sP.setAttribute("class","prix");
        sP.innerText = prices;
    const sP1 = document.createElement("span"); 
        sP1.innerText = " €";



    const divP4 = document.createElement("div");
        divP4.setAttribute("class","cart__item__content__settings");
    const divP5 = document.createElement("div");
        divP5.setAttribute("class","cart__item__content__settings__quantity");
    const pP3 = document.createElement("p"); 
        pP3.innerText = "Qté : ";
    const inputP = document.createElement("input");
        inputP.setAttribute("type","number");
        inputP.setAttribute("class","itemQuantity");
        inputP.setAttribute("name","itemQuantity");
        inputP.setAttribute("min","1");
        inputP.setAttribute("max","100");
        inputP.setAttribute("value",quantity);
        //inputP.setAttribute("readonly","readonly");
    const divP6= document.createElement("div");
        divP6.setAttribute("class","cart__item__content__settings__delete");
    const pP4 = document.createElement("p"); 
        pP4.setAttribute("class","deleteItem");
        pP4.innerText = "Supprimer";
    
      articleP.appendChild(divP1);
        divP1.appendChild(imgP);
      articleP.appendChild(divP2);
        divP2.appendChild(divP3);
          divP3.appendChild(h2P);
          divP3.appendChild(pP1);
          divP3.appendChild(pP2);
            pP2.appendChild(sP);
            pP2.appendChild(sP1);
        divP2.appendChild(divP4);
         divP4.appendChild(divP5);
           divP5.appendChild(pP3);
           divP5.appendChild(inputP);
        divP2.appendChild(divP6);  
          divP6.appendChild(pP4); 

   
             document.querySelector("#cart__items").appendChild(articleP);
             document.querySelector("#totalQuantity").textContent  = qs;

             ps = parseInt(localStorage.getItem("price")) + prices;
             document.querySelector("#totalPrice").textContent  = ps;
             localStorage.setItem("price", ps);

            pP4.addEventListener('click', function(e){ //supprimer un article
              e.preventDefault;
              if(confirm('suprimer cet article?')){
                articleP.innerHTML='';
               // articleP.setAttribute("class","");
                articleP.removeAttribute("class");
                actionne();
              }

            });
             
             inputP.addEventListener('change', function(e){//ajouter/reduire des articles 
                e.preventDefault;
                if(inputP.value <=0) inputP.value =1; 
                if(inputP.value >100) inputP.value =100; 
                actionne();
                
                //alert(inputP.value+" :: "+id+ " :: "+color);
             
            });
            function actionne(){
              sP.innerText = price*inputP.value; //- place le nouveau montant fonction de la Q-ty
              let aa = document.getElementsByClassName("cart__item");
              let stockC = "";
              let el = document.getElementsByTagName("p");
              let qq = document.getElementsByClassName("itemQuantity");
              let pp = document.getElementsByClassName("prix"); 
              let s=0; let i=0; let p = 0;
              for(let i=0; i<qq.length; i++){
                s += parseInt(qq[i].value);
                p += parseInt(pp[i].innerText);
                stockC += '{"id":"'+aa[i].dataset.id+'","quantity":"'+qq[i].value+'","color":"'+aa[i].dataset.color+'"}'; //
                if(i<(qq.length-1)) stockC +=',';
              }           
              document.querySelector("#totalQuantity").textContent = s; 
              document.querySelector("#totalPrice").textContent  = p;   
              if(stockC != "")        
              stockC = '['+stockC+']'; 
              else localStorage.removeItem("stockincart"); // detruit le storage du panier s'il n'y en a plus d'article
             
              localStorage.setItem("stockincart",stockC); //met a jour le storage du panier apres chaque operation fonction du contenu stockC


              let panier = document.getElementsByTagName("li");
              panier[4].innerHTML = (s>0)?"Panier <strong title='Article(s)'>[" + s+ "]</strong>":"Panier"; 
              localStorage.setItem("stockQty",s);
            }

  })
  .catch(function(err) {
      alert("Une Erreur est survenue1");
  });
}
  function showall(){  
    let qs = 0;
    let allcartproduct = localStorage.getItem("stockincart");
    let allcartProducts = JSON.parse(allcartproduct); 
    for (let  oProduct  of allcartProducts){
        localStorage.setItem("price", 0);
        let color =  oProduct.color;
        let quantity = parseInt(oProduct.quantity);
        let id = oProduct.id; 
        qs += quantity;
        
        lisarticle(id,color,quantity,qs); 
        
    }
  }
  //vider les localstorages si l'identifiant de la commande existe
  if(orderId == null)  showall();
  else{
    //localStorage.clear();
    localStorage.removeItem("stockincart");
    localStorage.removeItem("stockQty");
    document.querySelector("#orderId").innerHTML = "<strong>"+orderId+"</strong>";
  }  


 

  function send(e) {
    e.preventDefault(); 
    let form = document.querySelector(".cart__order__form");
    
    document.getElementById("firstNameErrorMsg").innerHTML = 
    (/^$/.test(document.getElementById("firstName").value))?"Champs obligatoire":"";
    
    document.getElementById("lastNameErrorMsg").innerHTML = 
    (/^$/.test(document.getElementById("lastName").value) )?"Champs obligatoire":"";

    document.getElementById("addressErrorMsg").innerHTML = 
    (/^$/.test(document.getElementById("address").value) )?"Champs obligatoire":"";
    
    document.getElementById("cityErrorMsg").innerHTML = 
    (/^$/.test(document.getElementById("city").value) )?"Champs obligatoire":"";

    document.getElementById("emailErrorMsg").innerHTML = 
    (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value) )?"":"Incorrect email, '@' ";
    
    let stop = false;
    if(/^$/.test(document.getElementById("firstName").value) ||
    /^$/.test(document.getElementById("lastName").value) ||
    /^$/.test(document.getElementById("address").value) || 
    /^$/.test(document.getElementById("city").value) ||
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value) == false ){
     stop=true; 
    }
   
    let contacts = {contact:{
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value
    }};
    let stock = localStorage.getItem("stockincart");
    stock = JSON.parse(stock);
    let products = [];
    for(let st of stock){
      products.push(st.id);
    }
    products=JSON.stringify(products);
    stock = "{\"products\":"+ products+"}";
    stock = JSON.parse(stock);
    //alert(JSON.stringify(stock));
    let z = {};
    z = Object.assign(z,contacts,stock); 
    //alert(JSON.stringify(z));
   
   //form.submit();
   
   if(stop === false)
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(z)
    })
    .then(function(res) {
      if (res.ok) { 
        return res.json();
      } 
    })
    .then(function(value) {
      window.open("./confirmation.html?orderId="+value.orderId,"_self");
    })
    .catch(function(err) {
      alert("Une Erreur est survenue 2: "+err);
    });
  }
  //
  
let form = document.getElementsByClassName("cart__order__form");
form[0].removeAttribute("method");
form[0].setAttribute("method","post");

document.getElementById("order").addEventListener("click", send);

let sQty = localStorage.getItem("stockQty");
if(parseInt(sQty)>0 && sQty.length>0){
    let panier = document.getElementsByTagName("li");
    panier[4].innerHTML = "Panier <strong title='Article(s)'>[" + sQty+ "]</strong>";
}

  
  /*
  '{"contact":{"firstName":"Louis","lastName":"Tchamda",
  "address":"34188 Euclid Avenue Apt J2","city":"Willoughby",
  "email":"tclo2@mail.ru"},
  "products":["415b7cacb65d43b2b5c1ff70f3393ad1"]}'
  94ad95a0-6d09-11ec-b7bc-55771d632ee3
  */ 