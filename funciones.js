const resultado = document.querySelector(".resultado");
let valor_operacion = [undefined, undefined,false,false]; 
//un array con [ numero anterior (para desp operarlo con el contenido de resultado, operacion pendiente 
//, se apreto = (para realizar la operacion),true o false sugun hay una operacion o nopara evitardupliciones)]
const op = document.querySelector(".operacion");
let decimal = true; //true puede agregar decimal si es false no
//inicializando en 0
resultado.textContent="0";

//agrega cada boton que se aprete
const crear_operacion_visual=(simbolo,condicion)=>{
    if(["+", "-", "*", "/"].includes(simbolo)){
        if(op.textContent[op.textContent.length - 1] != simbolo && op.textContent!=""){
            op.textContent+=`${simbolo}`
            return
        }
        return
    }
    if (condicion){
        op.textContent+=`${simbolo}`
    }else{
        op.textContent=simbolo;
    }
    return
}

//añade la funcion a cada boton segun su valor
function añadir_funcion(event) {
    const clickedButton = event.target;
    const buttonValue = clickedButton.value;
    
    if (buttonValue == "=") {
        resultado.textContent = realizarOperacion();
        valor_operacion[0]=resultado.textContent; //guarda el resultado anterior para seguir oprando
        crear_operacion_visual("",false); //resetea la ope visual
        
    } else if (buttonValue == "CE") {
        crear_operacion_visual("",false);
        reiniciarCalculadora();

    } else if (["+", "-", "*", "/"].includes(buttonValue)) {
  
        crear_operacion_visual(buttonValue,true);
        manejarOperacion(buttonValue);
    } else if (buttonValue==".") {

        if(decimal){ 
         if(resultado.textContent=="0"){   
        manejarNumeros("0.");} //agrega el cero con solo apretar .

        else{
        crear_operacion_visual(buttonValue,true);
        decimal=false;
        manejarNumeros(buttonValue) }}

    } else {
        manejarNumeros(buttonValue);
        crear_operacion_visual(buttonValue,true);
    }
}

function manejarNumeros(numero) {
    
    if ( !valor_operacion[2]){ //si se apreto el igual
        if (resultado.textContent === "0") { //si es 0 remplazamos por el numero
            resultado.textContent = numero;
        } else {
            resultado.textContent += numero;//sino agregamos el numero
        }
                  }else{
       
        resultado.textContent = numero; 
        valor_operacion[2]=false;
        valor_operacion[3]=false; }  
  
}

function manejarOperacion(operador) {

   if(valor_operacion[1]!==undefined){//si hay una operaion pendiente la hacemos 
    
    if(!valor_operacion[3]){  //si el ultimo boton no fue un signo hace la operacion con los 2 numeros
        resultado.textContent=realizarOperacion();    
        }
    }
    valor_operacion = [resultado.textContent, operador,true,true];
    decimal=true;
    
}

function realizarOperacion(a) {
    const n1 = parseFloat(valor_operacion[0]);
    const n2 = parseFloat(resultado.textContent);
    const operacion = valor_operacion[1];
   
    valor_operacion[0]=undefined //reiniciamos una vez hecha la operacion
    valor_operacion[1]=undefined;
    valor_operacion[2]=true;//se apreto el igual
    decimal=true; //permite el ingreso de decimal despues

    if (operacion === "+") {
        return n1 + n2;
    } else if (operacion === "-") {
        return n1 - n2;
    } else if (operacion === "*") {
        return n1 * n2;
    } else if (operacion === "/") {
        return n2 !== 0 ? n1 / n2 : "Syntax error"; // Evitar división por cero
    } else if (valor_operacion[1]==undefined){
        return n2;
    }
}

function reiniciarCalculadora() {
    resultado.textContent = "0";
    valor_operacion = [undefined, undefined, false];
}

document.querySelectorAll(".item-grid").forEach(boton => {
    boton.addEventListener("click", añadir_funcion);//recorre y añade una escucha a cada elemento del array
    //que devuelve el queryselector y le pasamos la funcion para que segun el elemento le agregue una funcion o otra
});







