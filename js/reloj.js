const meses=["Ene.","Feb.","Mar.","Abr.","May.","Jun.","Jul.","Ago.","Sep.","Oct","Nov","Dic."]

const dia=document.getElementById("dia")
const mes=document.getElementById("mes")
const manecillaSegundos=document.getElementById("manecillaSegundos")
const manecillaMinutos=document.getElementById("manecillaMinutos")
const manecillaHoras=document.getElementById("manecillaHoras")
const btnVolverIndex=document.getElementById("btnVolverIndex")

let gradosSegundero=0
let gradosMinutero=0
let gradosHora=0

let x = setInterval(function() {

    let ahora = new Date();
    let dd = ahora.getDate();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    let mm = ahora.getMonth(); 
    let yyyy = ahora.getFullYear();
    let sg=ahora.getSeconds();

    gradosSegundero=sg*6 //Cada segundo representa 6 grados en la esfera
    manecillaSegundos.style.transform = ` rotate(${gradosSegundero}deg)` 

    if(sg<10) 
    {
        sg='0'+sg;
    } 

    let mi=ahora.getMinutes();
    gradosMinutero=(mi*6)+parseFloat(((sg/10).toFixed(1)))  //calcula los grados de mas que tiene que pintar considerando los segundos que han pasado de ese minuto
    manecillaMinutos.style.transform = ` rotate(${gradosMinutero}deg)` 

    let decimalesHoras=((mi*2.5)/30)*6 //calcula los grados de mas que tiene que pintar considerando los minutos y los segundos que han pasado de esa hora
    if(mi<10) 
    {
        mi='0'+mi;
    } 

    let hh=ahora.getHours();
    if(hh>12)hh=hh-12
 
    gradosHora=(hh*5*6) + decimalesHoras
    manecillaHoras.style.transform = ` rotate(${gradosHora}deg)` 

    if(hh<10) 
    {
        hh='0'+hh;
    } 
    hoy = yyyy+'-'+meses[mm]+'-'+dd+"T"+hh+":"+mi+":"+sg;

    dia.innerHTML=dd
    mes.innerHTML=meses[mm]
}, 1000);
  
btnVolverIndex.addEventListener('click', ()=>{
    window.location.href="index.html";
})