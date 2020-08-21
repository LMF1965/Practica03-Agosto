let userSIMON={
    user:""
};
let recordUSER={
    record:""
};
const equivalenciaColores=["btnAmarillo","btnVerde","btnRojo","btnAzul"]
let arraySalonFama=[]
let arraySimonDice=[] 

let intervalId=0

let n=0;

const modal=document.getElementById("modal")
const finPartida=document.getElementById("finPartida")
const btnLogin=document.getElementById("btnLogin")
const formIsValid={
    usuario : false
}
const avisoError=document.getElementById("avisoError")
const user=document.getElementById("user")
const btnVolver=document.getElementById("btnVolver")
const btnVolverFin=document.getElementById("btnVolverFin")
const btnVolverIndex=document.getElementById("btnVolverIndex")
const jugarOtraVez=document.getElementById("jugarOtraVez")

const identificado=document.getElementById("identificado")
const nomUser=document.getElementById("nomUser")
const btnLogout = document.getElementById("btnLogout")

const saludo=document.getElementById("saludo")
const progreso=document.getElementById("progreso")

const maquinaSimon=document.getElementById("maquinaSimon")
const btnRojo=document.getElementById("btnRojo")
const btnAzul=document.getElementById("btnAzul")
const btnAmarillo=document.getElementById("btnAmarillo")
const btnVerde=document.getElementById("btnVerde")
const elVerde={"fillNormal":"url(#gradVerde)","stroke":"#00ff00","fillPresionado":"#0beb0b"}
const elRojo={"fillNormal":"url(#gradRojo)","stroke":"#e34618","fillPresionado":"#f00"}
const elAzul={"fillNormal":"url(#gradAzul)","stroke":"#0045d2","fillPresionado":"#00f"}
const elAmarillo={"fillNormal":"url(#gradAmarillo)","stroke":"#f5d913","fillPresionado":"#ff0"}
let=strokePresionado="#fff"
let=fillPresionado="#eee"
const contador=document.getElementById("contador-Ronda")
const quienDice=document.getElementById("quienDice")
const subirRonda=document.getElementById("subirRonda")
const bajarRonda=document.getElementById("bajarRonda")
let audio=""
let elSwitch=""
let pulsoEnBotonSimon=false
let elbtn=""
let strokeTenia=""
let fillTenia=""
let timeoutID=0 
let timeoutIDUsuarioDice=0 
const btnEmpezarRonda=document.getElementById("btnEmpezarRonda")
let SimonEstaHablando=false
let usuarioEstaRepitiendo=false
let terminarusuarioEstaRepitiendo=false
let usuarioColorTocado=0
const tiempoJugadaProgreso = document.getElementById("tiempoJugadaProgreso")

let maxPuntuacionUsuario=0

let progresoACambiar=""
let ronda=1
let usuarioDiceRonda=1
const barraTiempo=document.getElementById("barraTiempo")
let controlarFinDeTransicion=false
let errorUsuarioDice=false

const validateUsername = (username) => {
    //Alphanumeric string that may include _ and – having a length of 3 to 16 characters –
    const usernameRegex = /^[A-Za-z0-9_-]{3,16}$/
    if(usernameRegex.test(username)) return true;
    else return false;
}

function mostrarLogin(){
    modal.classList.add('show')
}
function verUsuarioLogeado(){
    let userLS = JSON.parse(localStorage.getItem('userSIMON'));
    console.log(userLS)
    //console.log('objeto localStorage:'+ userLS.user);
    if(userLS!=null){
        nomUser.innerHTML=userLS.user
    }else{
        mostrarLogin()
    }
}
function compare(a, b) {
    // comparamos los elementos en los índices indicados
    return (a[1] <= b[1]) ? 1 : -1;
  }


function leerSalonFama(){
    arraySalonFama=[]
   
    for (i=0; i<localStorage.length; i++){
      let laClave=localStorage.key(i);

      if(laClave.substr(0,10)=="salonFama-"){ //Solo las claves que empiecen por "salonFama-"
        let elFamoso=laClave.substr(10)

        //Divide el objeto localStorage en campos
        let unFamoso=JSON.parse(localStorage.getItem(localStorage.key(i)));
        let elRecord=unFamoso.record
        console.log("elRecord:"+elRecord)
        if(nomUser.innerHTML==elFamoso){
            saludo.innerHTML=`Hola ${elFamoso}`
            if(elRecord>"0") saludo.innerHTML+=`, tu máxima ronda fué la ${elRecord}ª`
            maxPuntuacionUsuario=elRecord
        }
        let aNumero=parseInt(elRecord)
           if(aNumero>5) arraySalonFama.push([elFamoso, parseInt(elRecord)])
      }
    }
}   
function OrdenarImprimirSalonFama(){
    arraySalonFama.sort(compare)

    const SalonFamaTabla=document.getElementById('SalonFamaTabla')
    SalonFamaTabla.innerHTML=""
    SalonFamaTabla.innerHTML+='<div class="salon__cabecera salon__cabeceraUsuario bold">Nombre</div>'
    SalonFamaTabla.innerHTML+='<div class="salon__cabecera bold">Rondas</div>'

    let filas=arraySalonFama.length

    arraySalonFama.forEach(function(fila, indice) {
        let filas=arraySalonFama.length
        let sinBorderBottom=""
        let fondoClaro=""

        if(filas==indice+1) sinBorderBottom="sinBorderBottom"
        if(indice%2==0) fondoClaro=" fondoClaro "
        
        SalonFamaTabla.innerHTML+='<div class="salon__cabecera salon__cabeceraUsuario '+ fondoClaro + sinBorderBottom+'">'+arraySalonFama[indice][0]+'</div>'
        SalonFamaTabla.innerHTML+='<div class="salon__cabecera '+ fondoClaro + sinBorderBottom+'">'+arraySalonFama[indice][1]+'</div>'

        if(nomUser.innerHTML==arraySalonFama[indice][0]){
            saludo.innerHTML=`Hola ${arraySalonFama[indice][0]}`
            if(arraySalonFama[indice][1]>"0") saludo.innerHTML+=`, tu máxima ronda fué la ${arraySalonFama[indice][1]}ª`
        }
    });
    if(filas==0){
        SalonFamaTabla.innerHTML=""
        SalonFamaTabla.innerHTML+='<div class="sinSalonFama"><img src="img/Vacio.png"></div>'
    }
}

function pintarProgreso(){
    progreso.innerHTML=''
    //console.log("rondaaaaa:"+ronda)
    for (let i = 1; i <= ronda; i++){
        progreso.innerHTML+='<div class="progreso__marca radius5 sombra" id="progreso-'+i+'"></div>'
    }
    contador.innerHTML=ronda
    btnEmpezarRonda.value="Empezar Ronda "+ronda
}
function llenarArraySimon(){ //Lleno el array a reproducir con 75 valores
    for (let i = 1; i <= 75; i++){
        let aleatorio = Math.round(Math.random()*3);
        arraySimonDice.push(aleatorio)
    }
    barraTiempo.classList.add("oculto")
}
function actualizaRonda(){
    quitarMarcos()
    //quienDice.innerHTML="&nbsp;"
    ronda++
    btnEmpezarRonda.value="Empezar Ronda "+ronda
    barraTiempo.classList.add("oculto")
    btnEmpezarRonda.classList.remove("oculto")
    pintarProgreso()
}
function quitarMarcos(){
    btnRojo.style.stroke = elRojo.stroke
    btnRojo.style.fill = elRojo.fillNormal

    btnVerde.style.stroke = elVerde.stroke
    btnVerde.style.fill = elVerde.fillNormal

    btnAmarillo.style.stroke = elAmarillo.stroke
    btnAmarillo.style.fill = elAmarillo.fillNormal
    console.log("elAmarillo.fillNormal:"+elAmarillo.fillNormal)

    btnAzul.style.stroke = elAzul.stroke
    btnAzul.style.fill = elAzul.fillNormal
}
function simonDice(cuantasToco) {
    let tocandoNota=1
    SimonEstaHablando=true

    
    intervalId = setInterval(function() {
        tocarSonido(equivalenciaColores[arraySimonDice[tocandoNota-1]])

        audio.play()
        quitarMarcos()
        
        elbtn=document.getElementById(equivalenciaColores[arraySimonDice[tocandoNota-1]])

        elbtn.style.stroke=strokePresionado
        elbtn.style.fill=fillPresionado
          
        if(tocandoNota==cuantasToco){           
             clearInterval(intervalId)      
             SimonEstaHablando=false          
             let time2 = setTimeout(()=>{
                quitarMarcos()
                usuarioDice()}
             , 2000)
        } 
        progresoACambiar=`progreso-${tocandoNota}`
        document.getElementById(progresoACambiar).classList.add("progreso__marca--tocadoSimon")
        tocandoNota++
    }, 1000);
}

function usuarioDice(){
    quienDice.innerHTML="Tú dices"
   // barraTiempo.classList.remove("invisible")
    usuarioEstaRepitiendo=true
    controlarFinDeTransicion=true
    tiempoJugadaProgreso.classList.add("lleno")
    console.log("llego a UsuarioDice")
    usuarioDiceRonda=0
}

function quitarRemarcado(){
    console.log(`elbtn y strokeTenia: ${elbtn} y ${strokeTenia}`)
    elbtn.style.stroke=strokeTenia
    elbtn.style.fill=fillTenia
    //elbtn.setAttribute("stroke", strokeTenia)
}

function tocarSonido(cual){
    console.log("tocarSonido:"+cual+"-----------")
    switch (cual) {
        case "btnAmarillo":
            audio = new Audio('assets/audio/do.m4a'); 
            fillPresionado = elAmarillo.fillPresionado
            pulsoEnBotonSimon=true
            usuarioColorTocado=0
            break
        case "btnVerde":
            audio = new Audio('assets/audio/re.m4a');
            fillPresionado = elVerde.fillPresionado
            pulsoEnBotonSimon=true  
            usuarioColorTocado=1
            break
        case "btnRojo":
            audio = new Audio('assets/audio/mi.m4a');
            fillPresionado = elRojo.fillPresionado
            pulsoEnBotonSimon=true  
            usuarioColorTocado=2
            break 
        case "btnAzul":
            audio = new Audio('assets/audio/fa.m4a');
            fillPresionado = elAzul.fillPresionado
            pulsoEnBotonSimon=true 
            usuarioColorTocado=3 
            break
        default:
            break    
    }
}

//////////////// LOGICA DE PROGRAMA ////////////////////////////////
verUsuarioLogeado()
leerSalonFama()
OrdenarImprimirSalonFama()
pintarProgreso()
llenarArraySimon()

//////////////// ESCUCHA DE EVENTOS ////////////////////////////////
btnEmpezarRonda.addEventListener('click',(e)=>{
    //impide que se toque una ronda hasta que termina de tocar la que esta en curso
    if(!SimonEstaHablando) {
       quienDice.innerHTML="Simón Dice"
        simonDice(ronda)
        btnEmpezarRonda.classList.add("oculto")
        barraTiempo.classList.remove("oculto")
    }    
})

maquinaSimon.addEventListener('click',(e)=>{
    if(!SimonEstaHablando){ //Si Se esta reproduciendo una ronda no se activan los botones
        tiempoJugadaProgreso.classList.remove("lleno")
        tiempoJugadaProgreso.classList.add("vacio")
         
        let anima =window.setTimeout(()=>{
            if(usuarioEstaRepitiendo){
                tiempoJugadaProgreso.classList.remove("vacio")
                tiempoJugadaProgreso.classList.add("lleno")
            }
        }, 400)

        console.log("Quitar animacionBarra")
        elSwitch=e.target.id
        pulsoEnBotonSimon=false
    
        tocarSonido(elSwitch)
    
        if(pulsoEnBotonSimon) { // verifica si pulso en algun boton o sobre la imagen
            quitarMarcos()
            console.log("timeoutID:"+timeoutID)
            if(timeoutID>0)clearTimeout(timeoutID)


            elbtn=document.getElementById(elSwitch)

            strokeTenia=elbtn.style.stroke
            fillTenia=elbtn.style.fill

            elbtn.style.stroke = "#fff"
            elbtn.style.fill=fillPresionado
            audio.play()

            timeoutID=window.setTimeout(quitarRemarcado, 800)
      
            if(usuarioEstaRepitiendo){
                usuarioDiceRonda++
                progresoACambiar=`progreso-${usuarioDiceRonda}`
                if(usuarioColorTocado==arraySimonDice[usuarioDiceRonda-1]){                  
                    document.getElementById(progresoACambiar).classList.add("progreso__marca--tocadoUsuario")

                    // tiempoJugadaProgreso.classList.remove("vacio")
                    // tiempoJugadaProgreso.classList.add("lleno")
                } else{
                    controlarFinDeTransicion=false
                    errorUsuarioDice=true
                    tiempoJugadaProgreso.classList.remove("lleno")
                    tiempoJugadaProgreso.classList.add("vacio")
                    quienDice.innerHTML="ERROR!"
                    barraTiempo.classList.add('oculto')
                    
                    document.getElementById(progresoACambiar).classList.add("progreso__marca--Error")
                    audio = new Audio('assets/audio/error.mp3');
                    audio.play()
                    terminoPartida()
                }
                if(!errorUsuarioDice && usuarioDiceRonda==ronda){
                    usuarioEstaRepitiendo=false
                    quienDice.innerHTML="Bien!"
                    let time1 = setTimeout(actualizaRonda, 2000);
                }
            }
        }    
    }
})

btnLogin.addEventListener('click',(e)=>{
    formIsValid.usuario = validateUsername(user.value);
    if(formIsValid.usuario == false){
        user.classList.add('errorLogin'); 
        avisoError.classList.remove("oculto")

    }else{
        nomUser.innerHTML=user.value       
        let userSIMON={
            user:""
        };          
        userSIMON.user=user.value;
        
        // Crea Usuario logeado en localStorage
        localStorage.setItem('userSIMON',JSON.stringify(userSIMON));
        modal.classList.remove('show')

        // Guardo usuario en localStorage
        let userLSRecord=`salonFama-${userSIMON.user}`

        let userLSExiste = JSON.parse(localStorage.getItem(userLSRecord));
        if(userLSExiste==null){
           recordUSER.record="0"
           localStorage.setItem(userLSRecord,JSON.stringify(recordUSER));
           console.log("no EXISTTTTTTE")
        }
        leerSalonFama()
    }
})

btnVolverIndex.addEventListener('click', ()=>{
    volverAIndex()
})
btnVolver.addEventListener('click', ()=>{
    volverAIndex()
})
btnVolverFin.addEventListener('click', ()=>{
    volverAIndex()
})
jugarOtraVez.addEventListener('click', ()=>{
    finPartida.classList.remove('show')
    finPartida.classList.add('oculto')
    tiempoJugadaProgreso.classList.remove("lleno")
    tiempoJugadaProgreso.classList.add("vacio")
    barraTiempo.classList.add('oculto')
    btnEmpezarRonda.classList.remove("oculto")

    ronda=1
    quienDice.innerHTML="&nbsp;"
    errorUsuarioDice=false
    btnEmpezarRonda.value="Empezar Ronda"
    leerSalonFama()
    OrdenarImprimirSalonFama()
    pintarProgreso()
})
function volverAIndex(){
    window.location.href="index.html";
}

// quito el fondo rojo de aviso de error si lo tiene
user.addEventListener('focusin', ()=>{
    user.classList.remove('errorLogin');
    avisoError.classList.add("oculto")
}) 
btnLogout.addEventListener('click', ()=>{
    // identificado.classList.remove('show')
    // identificado.classList.add('oculto')
    nomUser.innerHTML=""
    user.value=""
    localStorage.removeItem('userSIMON')
    modal.classList.remove('oculto')
    modal.classList.add('show')
})
bajarRonda.addEventListener('click', ()=>{
    if (ronda>1) {
        ronda--
        pintarProgreso()
    }
})
subirRonda.addEventListener('click', ()=>{
    ronda++
    pintarProgreso()
})
function terminoPartida(){
    document.getElementById("resultado").innerHTML=""
    if(ronda>1) document.getElementById("resultado").innerHTML=`Llegó hasta Ronda:${ronda-1}.</br>`
    
    document.getElementById("resultado").innerHTML += `Su record está en llegar a ronda ${maxPuntuacionUsuario}.` 
    if(maxPuntuacionUsuario<ronda-1){
        document.getElementById("resultado").innerHTML += `</br>Enhorabuena, ha superado su marca personal.`
        let userLSRecord="salonFama-"+nomUser.innerHTML
        recordUSER.record=ronda-1
   
        localStorage.setItem(userLSRecord,JSON.stringify(recordUSER));
    }

    finPartida.classList.remove('oculto')
    finPartida.classList.add('show')
    if(controlarFinDeTransicion) {
        controlarFinDeTransicion=false     
    }
}
tiempoJugadaProgreso.addEventListener("transitionend",()=>{
    audio = new Audio('assets/audio/error.mp3');
    quienDice.innerHTML="Time Out"
    audio.play()
    terminoPartida()
})