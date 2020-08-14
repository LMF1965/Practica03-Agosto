// constantes
const container=document.getElementById('container');
let sobreQueAplicacion=""


//     A D D   L I S T E N E R S 
container.addEventListener('click',(e)=>{
    console.log(e)
    //console.log(e.target.id)
    sobreQueAplicacion=e.target.id
    if(e.target.id==""){

         sobreQueAplicacion=e.path[1].id
         
    }
    sobreQueAplicacion=`${sobreQueAplicacion}.html` 
    console.log(sobreQueAplicacion)
    window.location.href=sobreQueAplicacion
})
 
