let addCarrinho = [];
let modalQuant = 1;
let modalKey = 0;

const p = (e)=>document.querySelector(e);
const pi =(el)=>document.querySelectorAll(el);

//Listagem das pizzas

pizzaJson.map((item, index)=>{
    let pizzaItem = p('.models .pizza-item').cloneNode(true);
   
    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

//Evento de clique

    pizzaItem.querySelector('a').addEventListener("click", (e)=>{
        e.preventDefault();

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQuant = 1;
        modalKey = key;
        
        p('.pizzaBig img').src = pizzaJson[key].img;
            
        p('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        p('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;               
        p('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        p('.pizzaInfo--size.selected').classList.remove('selected');
        pi('.pizzaInfo--size').forEach((size, sizesIndex)=>{
            if(sizesIndex == 2){
                size.classList.add('selected');
            };            
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizesIndex];
        });
        p('.pizzaInfo--qt').innerHTML = modalQuant;

        p('.pizzaWindowArea').style.opacity = 0;
        p('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            p('.pizzaWindowArea').style.opacity = 1;
        }, 200);

    });
    

    //preencher as informações em pizzaItem
    p('.pizza-area').append(pizzaItem);
});

//Eventos do MODAL

function closeModal() {
    p('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        p('.pizzaWindowArea').style.display = 'none';
    }, 500);
};

pi('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(item=>{
    item.addEventListener('click', closeModal);
});

p('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQuant > 1){
        modalQuant--;
        p('.pizzaInfo--qt').innerHTML = modalQuant;
    }
});

p('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQuant++;
    p('.pizzaInfo--qt').innerHTML = modalQuant;
});

pi('.pizzaInfo--size').forEach((size, sizesIndex)=>{
    size.addEventListener('click', (e)=>{
        p('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });       
});

p('.pizzaInfo--addButton').addEventListener('click',()=>{
      let tamanho = parseInt(p('.pizzaInfo--size.selected').getAttribute('data-key'));
      let identificador = pizzaJson[modalKey].id+'&'+tamanho;
      let key = addCarrinho.findIndex((item)=>item.identificador == identificador);
      if(key > -1){
          addCarrinho[key].qt +=modalQuant
      } else {
      addCarrinho.push({
          identificador,
          id:pizzaJson[modalKey].id,
          tamanho,
          qt:modalQuant
      });
    };
    atualizarCarrinho();
    closeModal();
});

p('.menu-openner').addEventListener('click',()=>{
    if(addCarrinho.length > 0){
        p('aside').style.left = '0';
    }
});

p('.menu-closer').addEventListener('click', ()=>{
    p('aside').style.left = '100vw';
});

function atualizarCarrinho(){

    p('.menu-openner span').innerHTML = addCarrinho.length;


    if(addCarrinho.length > 0){
        p('aside').classList.add('show');
        p('.cart').innerHTML = "";

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in addCarrinho){
            let pizzaItem = pizzaJson.find((item)=>item.id == addCarrinho[i].id);
            subTotal += pizzaItem.price * addCarrinho[i].qt;
            let carrinhoItem = p('.models .cart--item').cloneNode(true);

            let pizzaNomeTamanho;
            switch(addCarrinho[i].tamanho){
                case 0:
                    pizzaNomeTamanho = "pequena";
                    break;

                case 1:
                    pizzaNomeTamanho = "média";
                    break;

                case 2:
                    pizzaNomeTamanho = "grande";
                    break;
            }
            
            let pizzaName = `${pizzaItem.name} (${pizzaNomeTamanho})`

            carrinhoItem.querySelector('img').src = pizzaItem.img;
            carrinhoItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            carrinhoItem.querySelector('.cart--item--qt').innerHTML = addCarrinho[i].qt;
            carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(addCarrinho[i].qt > 1){
                    addCarrinho[i].qt--;
                } else {
                    addCarrinho.splice(i,1);
                };
                atualizarCarrinho();


            });
            carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                addCarrinho[i].qt++;
                atualizarCarrinho();                
            });
            p('.cart').append(carrinhoItem);
        }
        desconto = subTotal * 0.1;
        total = subTotal - desconto; 
        
        p('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        p('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        p('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        p('aside').classList.remove('show');
        p('aside').style.left = '100vw';
    };
};










