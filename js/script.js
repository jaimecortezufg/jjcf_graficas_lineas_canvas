//LIENZO DEL CANVAS
const canvas = document.getElementById("lineChart");
const ctx = canvas.getContext("2d");

//DATOS QUE SE VAN A GRAFICAR
const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const sanSalvador = [30, 32, 34, 35, 36, 37, 36, 35, 34, 32, 31, 30];
const santaTecla = [25, 26, 28, 29, 31, 32, 32, 31, 30, 28, 27, 26];

//MÁRGENES DE BORDES IZQUIERDO Y DERECHO
const marginLeft = 50;
const marginRight = 50;

//FUNCIÓN PARA DIBUJAR LA LÍNEA CON ETIQUETAS
function drawLineWithLabels(data,color){
    ctx.beginPath();  //SE COLOCA EL PUNTERO EN EL LIENZO
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    for(let i=0; i<data.length; i++){
        //INICIAR Y FINALIZAR EN LOS BORDES ESTABLECIDOS DEL LIENZO (es decir, que no se saga de los bordes)
        const x = (i/(data.length - 1)) * (canvas.width - marginLeft - marginRight) + marginLeft;
        const y = canvas.height - (data[i] - 15) * 10; // ESCALADO VERTICAL
                                //arreglo - 15 pixeles * 10 pixeles

        //DIBUJAR LA LÍNEA
        if (i === 0){
            ctx.moveTo(x,y); //UBICAR POSICIÓN DEL PUNTERO 
        }else{
            ctx.lineTo(x,y); // TRAZAR LÍNEA A POSICIÓN CALCULADA EN "X" e "Y"
        }

        ctx.fillStyle = color; //ASIGNAR EL COLOR A LA LÍNEA
        ctx.font = "12px Arial"; // ESTILO DE TEXTO (por etiquetas que se mostrarán en la gráfica)
        ctx.fillText(data[i]+"°C", x+5, y-5); // (VALOR A MOSTRAR EN EQUIQUETA,  POSICIÓN EN EJE "X", POSICIÓN EN EJE "Y")
    }
    ctx.stroke(); //DIBUJAR
}

//FUNCIÓN PARA DIBUJAR LAS ETIQUETAS Y LOS EJES
function drawAxes(){
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;

    //EJE X
    ctx.moveTo(50,canvas.height-50); //UBICAR LA POSICIÓN DEL PUNTERO EN EJE "X" e "Y"
    ctx.lineTo(canvas.width-50,canvas.height-50); //TRAZAR LA LÍNEA A POSICIÓN ESPECÍFICA (800 - 50), (400-50) DE ACUERDO CON EL HTML

    //EJE Y
    ctx.moveTo(50,canvas.height-50);
    ctx.lineTo(50,50);

    //DIBUJAR
    ctx.stroke();


    //ETIQUETAS EN EJE X
    for (let i=0; i< labels.length; i++){ //SE RECORRE EL ARREGLO DE ETIQUETAS
        const x = (i/(labels.length - 1))*(canvas.width - 100) + 50; // LA ETIQUETA ESTARÁ EN LA MISMA POSICIÓN EL PUNTO GRAFICADO
        ctx.fillText(labels[i],x,canvas.height - 30); // MOSTRAR EL TEXTO DEL ARREGLO "labels" EN LA POSICIÓN CALCULADA EN X PERO 20px SUPERIOR
    }

    //ETIQUETAS EN EJE Y
    for(let i=20; i<=40; i+=5){ //EN EL EJE Y SE MOSTRARÁ UN RANGO DESDE LOS 20°C HASTA LOS 40° CON SALTOS DE 5°C
        const y = canvas.height - 50 - (i-20) * 10; // POSICIÓN DE CADA GRADO CENTÍGRADO, IRÁ DECREMENTANDO
        ctx.fillText(i+"°C",20, y+5); //DIBUJAR
    }
}


drawAxes(); //DIBUJAR LOS EJES X e Y
drawLineWithLabels(sanSalvador,'red'); //LÍNEA DE COLOR ROJO PARA LA GRÁFICA DE SAN SALVADOR
drawLineWithLabels(santaTecla,'blue'); //LÍNEA DE COLOR AZUL PARA LA GRÁFICA DE SANTA TECLA

//LEYENDA DE LA GRÁFICA
ctx.fillStyle = 'red';
ctx.fillRect(70,20,10,10); //DIBUJA UN RECTANGULO DE 70px DE ANCHO, 20px DE ALTO, POSICIÓN X=10, POSICIÓN Y=10
ctx.fillStyle = 'black';
ctx.fillText("San Salvador",85,30); //COLOCAR EL TEXTO:"SAN SALVADOR" EN LA POSICIÓN EJE X=85, EJE Y=30

ctx.fillStyle = 'blue';
ctx.fillRect(170,20,10,10); //DIBUJA UN RECTÁNGULO DE 170px DE ANCHO, 20px DE ALTO, POSICIÓN X=10, Y=10
ctx.fillStyle = 'black';
ctx.fillText("Santa Tecla",185,30); //COLOCAR EL TEXTO "SANTA TECLA" EN LA POSICIÓN EJE X=185, EJE Y=30