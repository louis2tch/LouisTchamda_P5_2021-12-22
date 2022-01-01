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
                articleP.setAttribute("class","");
                actionne();
              }

            });
             


             inputP.addEventListener('change', function(e){//ajouter/reduire les articles 
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
                stockC += '{"id":"'+aa[i].dataset.id+'","quantity":"'+qq[i].value+'","color":"'+aa[i].dataset.color+'"}';
                if(i<(qq.length-1)) stockC +=',';
              }           
              document.querySelector("#totalQuantity").textContent = s; 
              document.querySelector("#totalPrice").textContent  = p;           
              stockC = '['+stockC+']'; 
              localStorage.setItem("stockincart",stockC);            
            }

  })
  .catch(function(err) {
      alert("Une Erreur est survenue");
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
  showall();

 

  function send(e) {
    e.preventDefault(); 
    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value
    };
    let objLinea = localStorage.getItem("stockincart");
    alert(objLinea);
    alert(JSON.stringify(contact));

    /*fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: document.getElementById("value").value})
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        document
          .getElementById("result")
          .innerText = value.postData.text;
    });*/
  }
  //
  
  document.getElementById("order").addEventListener("click", send);
   