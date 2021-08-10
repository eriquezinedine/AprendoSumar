const total = document.querySelector('.text-area h1 span')
const efect = document.querySelector('.text-area h4 ')
const conjunto = document.querySelectorAll('.row div')
const numeros = document.querySelectorAll('.numero')
const cont = document.querySelectorAll('.row div figure')
const mostrar = document.getElementById('mostrar')
const valor = document.querySelectorAll('.valor');
const Usuario = document.querySelector('#btnUsuario')
const menu = document.querySelector('.menu');
const premio = document.querySelectorAll('.premio');

mostrar.addEventListener('click',elemetMostrar)
Usuario.addEventListener('click', usu)
var BDpunto = obtenerUsuariosLocalStorage();
var puntero;
var intentos = 0;
var sub_total = 0;
var posX;
var posY;
var posZ;
var valorX;
var valorY;
var valorZ;

    menu.addEventListener('click',(e)=>{
        let valor = e.target.classList.value
        if(valor === 'menu'|| valor ==='menu expandir'){
            estadoButton()
        }
    })
    function estadoButton(){
        let pCondition = menu.classList.toggle( 'expandir' );
    }

function usu(){
    Inicio().then(resultado =>{ puntero = resultado});;
}

function guardarUsuarioLocalStorage(usuario) {
    localStorage.setItem('usuarios', JSON.stringify(usuario) );
}

function obtenerUsuariosLocalStorage() {
    let baseDatos;

    // comprobamos si hay algo en localStorage
    if(localStorage.getItem('usuarios') === null) {
         baseDatos = [];
    } else {
         baseDatos = JSON.parse( localStorage.getItem('usuarios') );
    }
    return baseDatos;

}


async function  Inicio (){
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'Ashly': 'Ashly',
            'Mia': 'Mia',
            'Nahely': 'Nahely'
          })
        }, 0)
      })
      const { value: color } = await Swal.fire({
        title: 'Selecionar Participante',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return '¡Tienes que elegir algo!'
          }
        }
      })
      if (color) {
        Swal.fire({ html: `You selected: ${color}` })
      }
      return color
}

Inicio().then(resultado =>{ puntero = resultado});


let soluctionPuntero = {
    'Ashly':()=>{ valor[0].textContent = sumarPuntos(valor[0].textContent); Inicio() },
    'Mia': ()=>{ valor[1].textContent = sumarPuntos(valor[1].textContent); Inicio() },
    'Nahely': ()=>{valor[2].textContent = sumarPuntos(valor[2].textContent); Inicio() }
}


function sumarPuntos(puntos){
    let acum = parseFloat(puntos);
    acum++;
    return acum
}

function Posicion(){
    posX = getRan(0,8);
    posY = getRan(0,8);
    posZ = getRan(0,8);
    if(posX===posY|| posY===posZ || posX===posZ){
        Posicion()
    }
}

function pintarNumero(){
    numeros.forEach(elemt=>{
        elemt.textContent = getRan(1,11);
    })

    Posicion();
    valorX = numeros[posX].textContent
    valorY = numeros[posY].textContent
    valorZ = numeros[posZ].textContent

    total.textContent = eval( `${valorX} + ${valorY} + ${valorZ}`);
}


function getRan(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

conjunto.forEach((elemt)=>{
    elemt.addEventListener('click', myFunciton=(e)=>{
        let num=0;
        if(intentos<3){
            intentos++;
            elemt.children[0].style.opacity = '0';
            elemt.children[1].style.opacity = '0';
            elemt.children[0].style.transition='0.35s all ease-out';
            elemt.children[1].style.transition='0.35s all ease-out';
            setTimeout(()=>{
                elemt.children[0].style.display='none';
                elemt.children[1].style.display='flex';
                elemt.children[0].style.opacity = '1';
                elemt.children[1].style.opacity = '1';
            },350);
            num =elemt.children[1].textContent;
            sub_total = sub_total + parseFloat(num);
            if(intentos===3){
               setTimeout(() => {
                   intentos = 0;
                   sub_total=0;
                   efect.textContent =0;
                   pintar()
                }, 800);
            };
        }else{
            setTimeout(() => {
                pintar()
                sub_total=0;
                intentos =0;
            }, 350);
        }

        if(sub_total > parseFloat(total.textContent)){
            // Mostrar()
            setTimeout(() => {
                pintar()
                intentos =0;
            }, 1000);
            sub_total=0;
        }

        if(sub_total.toString() === total.textContent){
            soluctionPuntero[puntero]();
            Swal.fire(
                'Felicidades',
                'poco a poco logras dominarlo',
                'success'
            )
            ej();
            sumarPuntos(puntero);
            pintarNumero()
            sub_total = 0;
            guardarModificacionLocal();
        }

        efect.textContent = sub_total;
    })
})

function ej(){
    window.intentos = 0;
    elemetMostrar()
}

function guardarModificacionLocal(){
    let v1=valor[0].textContent
    let v2=valor[1].textContent
    let v3=valor[2].textContent
    BDpunto = [v1,v2,v3];
    guardarUsuarioLocalStorage(BDpunto);
}

function pintar(){
    numeros.forEach(elemt=>{
        elemt.style.display ='none';
    })
    cont.forEach(elemet =>{
        elemet.style.display='flex';
    })
}
function Mostrar(){
    numeros.forEach(elemt=>{
        elemt.style.display ='flex';
    })
    cont.forEach(elemet =>{
        elemet.style.display='none';
    })
}

function elemetMostrar(){
    Mostrar()
    setTimeout(()=>{pintar()},1500)
}

function pintarPuntos(){
    let i =0;
    BDpunto.forEach((elemt)=>{
        valor[i].textContent= elemt;
        i++;
    })
}

function cangear(){

    if(document.getElementById('radio1').checked){
        reducirPunto(puntero,0,'chaufa')
    }
    if(document.getElementById('radio2').checked){
        reducirPunto(puntero,1,'Pollo a la braza')
    }
    if(document.getElementById('radio3').checked){
        reducirPunto(puntero,2,'Pase de 100 soles')
    }
    guardarModificacionLocal();

}

function reclamarPremio(puntero,premio){
    window.open(`https://wa.me/+51972080020?text= ${enviar(puntero,premio)}`);
}

function enviar(radar,premio){
    return `Hola soy ${radar}, quiero reclamar mi ${premio}`
}

function reducirPunto(radar,idPremio,comida){
    let Premio = parseFloat(premio[idPremio].textContent);
    let oper= 0;
    switch (radar) {
        case 'Ashly':
            oper = parseFloat(valor[0].textContent) - Premio
            if(oper<0){
                noPuntos()
            }else{
                valor[0].textContent = oper;
                reclamarPremio(radar,comida);
            }
            break;
        case 'Mia':
            oper = parseFloat(valor[1].textContent) - Premio
            if(oper<0){
                noPuntos()
            }else{
                valor[1].textContent = oper;
                reclamarPremio(radar,comida);
            }
            break;
        case 'Nahely':
            oper = parseFloat(valor[2].textContent) - Premio
            if(oper<0){
                noPuntos()
            }else{
                valor[2].textContent = oper;
                reclamarPremio(radar,comida);
            }
            break;
    }
}

function noPuntos(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tienes suficientes puntos',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}

pintar();
pintarNumero();
pintarPuntos();
