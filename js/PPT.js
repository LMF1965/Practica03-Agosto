let userPPT={
    user:"",
    partidaA:""
};
let userAvatar = document.getElementById("userAvatar")
const modal=document.getElementById("modal")
const Podium=document.getElementById("Podium")
const btnVolverPodium=document.getElementById("btnVolverPodium")
const btnVolverJugar=document.getElementById("btnVolverJugar")
const ganadorImg = document.getElementById("ganadorImg")
const ganadorNom = document.getElementById("ganadorNom")
const btnLogin=document.getElementById("btnLogin")
const formIsValid={
    usuario : false
}
const user=document.getElementById("user")
const partidas=document.getElementById("partidas")
const avisoError=document.getElementById("avisoError")
const btnVolverIndex=document.getElementById("btnVolverIndex")

const queSacaIzq = document.getElementById("queSacaIzq")
const queSacaDer = document.getElementById("queSacaDer")

const btnPiedra = document.getElementById("btnPiedra")
const btnPapel = document.getElementById("btnPapel")
const btnTijera = document.getElementById("btnTijera")

const resultadoHumano = document.getElementById("resultadoHumano")
const resultadoMaquina = document.getElementById("resultadoMaquina")

const tiempoAgotadoIzq = document.getElementById("tiempoAgotadoIzq")
const tiempoAgotadoDer = document.getElementById("tiempoAgotadoDer")
let tiempoAgotado=false

const tiempoJugada = document.getElementById("tiempoJugada")
const tiempoJugadaProgreso=document.getElementById("tiempoJugadaProgreso")
const btnJugar=document.getElementById("btnJugar")

const valoresJugada =["Piedra","Papel","Tijera"]

let botonesBloqueados=true
let sacoHumano=""
let sacoMaquina=""
let marcadorHumano=0
let marcadorMaquina=0

let x =0
let i=0
let seGanaCon=0

let controlarFinDeTransicion=false

const validateUsername = (username) => {
    //Alphanumeric string that may include _ and – having a length of 3 to 16 characters –
    const usernameRegex = /^[A-Za-z0-9_-]{3,16}$/
    if(usernameRegex.test(username)) return true;
    else return false;
}

// :::::::::::::::: FUNCIONES :::::::::::::::::::::::::::::::::::
function quitaClasesAqueSaca(){
    queSacaIzq.classList.remove("sacaPiedraIzq","sacaPapelIzq","sacaTijeraIzq")
    queSacaDer.classList.remove("sacaPiedraDer","sacaPapelDer","sacaTijeraDer")
}


function iniciaTirada(){
    // tiempoJugadaProgreso.classList.remove("vacio")
     tiempoJugadaProgreso.classList.add("lleno")
    //tiempoJugadaProgreso.style.width=100%
    //console.log("iniciaTirada()    tiempoJugadaProgreso.style.width:"+tiempoJugadaProgreso.style.width)
    x = setInterval(function() {
        i++
        if(i==3) i=0
        let j=i+1
        if(j==3) j=0
        quitaClasesAqueSaca()

        queSacaIzq.src="img/"+valoresJugada[i]+"_Izq.jpg"
        queSacaDer.src="img/"+valoresJugada[j]+"_Der.jpg"
        // queSacaIzq.classList.add(`saca${valoresJugada[i]}Izq`)
        // queSacaDer.classList.add(`saca${valoresJugada[j]}Der`)
        //console.log(i)
        

    },100); 
}
function verQuienGana(){
    console.log(sacoHumano+"-:-"+sacoMaquina)
    if(!tiempoAgotado){
        if(sacoHumano==sacoMaquina){
            console.log(sacoHumano+"-::-"+sacoMaquina)
            resultadoHumano.src="img/igual.png"
            resultadoMaquina.src="img/igual.png"
            resultadoHumano.style.display="block"
            resultadoMaquina.style.display="block"
        }
        if((sacoHumano=="Piedra" && sacoMaquina=="Tijera")||(sacoHumano=="Papel" && sacoMaquina=="Piedra")||(sacoHumano=="Tijera" && sacoMaquina=="Papel")){
            resultadoHumano.src="img/gana.png"
            resultadoHumano.style.display="block"
            marcadorHumano++
            document.getElementById(`marcadorIzq-${marcadorHumano}`).classList.add("marcador__marca--ganado")
        }
        if((sacoMaquina=="Piedra" && sacoHumano=="Tijera")||(sacoMaquina=="Papel" && sacoHumano=="Piedra")||(sacoMaquina=="Tijera" && sacoHumano=="Papel")){
            resultadoMaquina.src="img/gana.png"
            resultadoMaquina.style.display="block"
            marcadorMaquina++
            document.getElementById(`marcadorDer-${marcadorMaquina}`).classList.add("marcador__marca--ganado")
        }

    }else{
        tiempoAgotado = false
        resultadoMaquina.src="img/gana.png"
        resultadoMaquina.style.display="block"
        marcadorMaquina++
        document.getElementById(`marcadorDer-${marcadorMaquina}`).classList.add("marcador__marca--ganado")
    }


    if(marcadorHumano==seGanaCon || marcadorMaquina==seGanaCon){
        if(marcadorHumano==seGanaCon){
        //    ganadorImg.innerHTML='<span class="icon-user sombraTexto"></span>'
           ganadorImg.innerHTML='<img class="sombraPng" src="img/usuario.png" alt=""/>'
           ganadorNom.innerHTML=userAvatar.innerHTML
        }else{
            ganadorImg.innerHTML='<img class="sombraPng" src="img/hal-9000.png" alt=""/>'
            ganadorNom.innerHTML="Hal 9000"
        }
         podium.classList.add('show')
    }
}
function paraAleatorios(){

        controlarFinDeTransicion=false
        console.log("botonesBloqueados:"+botonesBloqueados)

        let aleatorioDer = Math.round(Math.random()*2);
        queSacaDer.src="img/"+valoresJugada[aleatorioDer]+"_Der.jpg"
        sacoMaquina=valoresJugada[aleatorioDer]
        clearInterval(x)
        
        btnJugar.classList.remove("oculto")
        tiempoJugadaProgreso.classList.remove("lleno")
        tiempoJugadaProgreso.classList.add("vacio")

        // let computedStyle = window.getComputedStyle(tiempoJugadaProgreso)
        // let actualWithDeProgreso = computedStyle.getPropertyValue('width')
        // tiempoJugadaProgreso.style.width = actualWithDeProgreso

        verQuienGana()
    
}
function pintarMarcador(){
    

    marcadorIzq.innerHTML=''
    marcadorDer.innerHTML=''
    resultadoHumano.style.display="none"
    resultadoMaquina.style.display="none"

    
    queSacaIzq.src="img/FondoPPT.jpg"
    queSacaDer.src="img/FondoPPT.jpg"

    marcadorHumano=0
    marcadorMaquina=0
    //console.log("rondaaaaa:"+ronda)
    for (let j = 1; j <= seGanaCon; j++){
        marcadorIzq.innerHTML+=`<div class="marcador__marca radius5 sombra" id="marcadorIzq-${j}"></div>`
        marcadorDer.innerHTML+=`<div class="marcador__marca radius5 sombra" id="marcadorDer-${j}"></div>`
    }

}
function volverAIndex(){
    window.location.href="index.html";
}
function mostrarLogin(){
    modal.classList.add('show')
}
function verUsuarioLogeado(){
    let userPPT = JSON.parse(localStorage.getItem('userPPT'));
    console.log(userPPT)
    //console.log('objeto localStorage:'+ userLS.user);
    if(userPPT!=null){
        nomUser.innerHTML=userPPT.user
        userAvatar.innerHTML=userPPT.user
        seGanaCon=userPPT.partidaA
    }else{
        mostrarLogin()
    }
}
function inicializarImagenesTirada(){
    btnTijera.classList.remove("noSeleccionado")
    btnPiedra.classList.remove("noSeleccionado")
    btnPapel.classList.remove("noSeleccionado")
}
// :::::::::::::::: LOGICA DE PROGRAMA :::::::::::::::::::::::::::::::::::
verUsuarioLogeado()
pintarMarcador()
// :::::::::::::::: DEFINICION DE EVENTOS ::::::::::::::::::::::::::::::::
btnVolverIndex.addEventListener('click', ()=>{
    volverAIndex()
})
btnVolver.addEventListener('click', ()=>{
    volverAIndex()
})
btnLogout.addEventListener('click', ()=>{
    // identificado.classList.remove('show')
    // identificado.classList.add('oculto')
    nomUser.innerHTML=""
    user.value=""
    localStorage.removeItem('userPPT')
    modal.classList.remove('oculto')
    modal.classList.add('show')
})

btnPiedra.addEventListener('click', ()=>{
    if(!botonesBloqueados){
        botonesBloqueados=true
        sacoHumano="Piedra"
        quitaClasesAqueSaca()
        queSacaIzq.src="img/Piedra_Izq.jpg"
        paraAleatorios()
        btnTijera.classList.add("noSeleccionado")
        btnPapel.classList.add("noSeleccionado")
    }
})
btnPapel.addEventListener('click', ()=>{
    if(!botonesBloqueados){
        botonesBloqueados=true
        sacoHumano="Papel"
        quitaClasesAqueSaca()
        queSacaIzq.src="img/Papel_Izq.jpg"
        paraAleatorios()
        btnTijera.classList.add("noSeleccionado")
        btnPiedra.classList.add("noSeleccionado")
    }
})
btnTijera.addEventListener('click', ()=>{
    if(!botonesBloqueados){
        botonesBloqueados=true
        sacoHumano="Tijera"
        quitaClasesAqueSaca()
        queSacaIzq.src="img/Tijera_Izq.jpg"
        paraAleatorios()
        btnPiedra.classList.add("noSeleccionado")
        btnPapel.classList.add("noSeleccionado")
    }
})
btnJugar.addEventListener('click', ()=>{
    console.log("btnJugar")
    botonesBloqueados=false
    controlarFinDeTransicion=true
    tiempoJugada.classList.remove("oculto")
    btnJugar.classList.add("oculto")
    if(btnJugar.value == "Empezar"){
        iniciaTirada()
        btnJugar.value="Nueva Ronda"
        return
    }
    if(btnJugar.value == "Nueva Ronda"){

        resultadoHumano.style.display="none"
        resultadoMaquina.style.display="none"


        tiempoJugadaProgreso.classList.add("vacio")
        tiempoJugadaProgreso.classList.add("lleno")
       

        // tiempoJugadaProgreso.style.width=0
        console.log("tiempoJugadaProgreso.style.width:"+tiempoJugadaProgreso.style.width)
        //setTimeout(function(){ tiempoJugadaProgreso.style.transition="width 5s" }, 1000);
        sacoHumano=""
        sacoMaquina=""
        inicializarImagenesTirada()
        iniciaTirada()  
        // tiempoJugadaProgreso.classList.remove("sinTransicion")
    }
    
    console.log(btnJugar.value)
})
// quito el fondo rojo de aviso de error si lo tiene
user.addEventListener('focusin', ()=>{
    user.classList.remove('errorLogin');
    avisoError.classList.add("oculto")
}) 
btnLogin.addEventListener('click',(e)=>{
    formIsValid.usuario = validateUsername(user.value);
    if(formIsValid.usuario == false){
        user.classList.add('errorLogin'); 
        avisoError.classList.remove("oculto")
    }else{
        nomUser.innerHTML=user.value 
        userAvatar.innerHTML=user.value
        seGanaCon=partidas.value
        userPPT={
            user:""
        };          
        userPPT.user=user.value;        
        userPPT.partidaA=seGanaCon;        
        // Crea Usuario logeado en localStorage
        localStorage.setItem('userPPT',JSON.stringify(userPPT));
        modal.classList.remove('show')
        pintarMarcador()
    }

})
btnVolverPodium.addEventListener('click',()=>{
    volverAIndex()
})
btnVolverJugar.addEventListener('click',()=>{
    podium.classList.remove('show')
    btnJugar.value = "Empezar"
    inicializarImagenesTirada()
    pintarMarcador()
})
tiempoJugadaProgreso.addEventListener("transitionend",()=>{
    if(controlarFinDeTransicion) {
        audio = new Audio('assets/audio/error.mp3');
        audio.play()
        queSacaIzq.src="img/TiempoAgotado.jpg"
        queSacaDer.src="img/FondoPPT.jpg"

        tiempoAgotado=true
        controlarFinDeTransicion=false
        paraAleatorios()
    }
})