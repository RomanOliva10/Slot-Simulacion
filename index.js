const fichas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const tablero = [];
const lineas = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
  [1, 2, 2, 2, 1],
  [1, 0, 0, 0, 1],
  [2, 2, 1, 0, 0],
  [0, 0, 1, 2, 2],
];
const randomNumber = () => {
  let num = Math.floor(Math.random() * (100 - 0 + 1) + 0);
  if (num < 10) {
    return fichas[0];
  } else if (num < 20) {
    return fichas[1];
  } else if (num < 30) {
    return fichas[2];
  } else if (num < 40) {
    return fichas[3];
  } else if (num < 50) {
    return fichas[4];
  } else if (num < 60) {
    return fichas[5];
  } else if (num < 70) {
    return fichas[6];
  } else if (num < 80) {
    return fichas[7];
  } else if (num < 90) {
    return fichas[8];
  } else if (num <= 100) {
    return fichas[9];
  }
};
const juego = (linea) => {
  const logitudFilas = tablero[0].length;
  let cont = 0;
  let fichaRepetida;
  /*El parametro linea seria la linea que se verificara*/
  for (let i = 0; i < logitudFilas; i++) {
    /*Hago un 2do for para recorrer letra por letra para contar las que se repiten*/
    for (let j = 0; j < logitudFilas; j++) {
      if (tablero[lineas[linea][i]][i] === tablero[lineas[linea][j]][j]) {
        /*Si se repite la ficha el contador sube y la variable auxiliar fichaRepetida alacena la ficha en cuestion*/
        cont++;
        fichaRepetida = tablero[lineas[linea][j]][j];
      }
    }
    /*Si el contador llega a ser mayor o igual a 3 es por que hubo una linea.
    Y a partir del valor de la variable auxiliar se hace un switch
    que retorna un premio de acuerdo al valor de la ficha en cuestion*/
    if (cont >= 3) {
      switch (fichaRepetida) {
        case fichas[0]:
          return 10;
          break;
        case fichas[1]:
          return 9;
          break;
        case fichas[2]:
          return 8;
          break;
        case fichas[3]:
          return 7;
          break;
        case fichas[4]:
          return 6;
          break;
        case fichas[5]:
          return 5;
          break;
        case fichas[6]:
          return 4;
          break;
        case fichas[7]:
          return 3;
          break;
        case fichas[8]:
          return 2;
          break;
        case fichas[9]:
          return 1;
          break;
        default:
          return 0;
          break;
      }
    }
    /*Si la condicion no se cumple el contador vuelve a ser 0 
    para volver a verificar si hay una linea con la letra 
    que siga en el proximo ciclo del for*/
    cont = 0;
  }
  /*Si el ciclo se termina y no hay ninguna linea devuelve un 0 haciendo alucion a que no se gano nada*/
  return 0;
};
const crearTablero = () => {
  for (let i = 0; i < 3; i++) {
    tablero[i] = new Array();
    for (let j = 0; j < 5; j++) {
      tablero[i][j] = randomNumber();
    }
  }
};
const apuesta = (cantidadDeLineas) => {
  /*A partir de la cantidad de lineas a apostar se hace un for con las lineas en cuestion.
  La funcion va retornar el acumulado de ganacias que hubo en la tirada*/
  let acumulado = 0;
  for (let i = 0; i < cantidadDeLineas; i++) {
    acumulado += juego(i);
  }
  return acumulado;
};
let vecesQueGano = 0;
const simularJuego = (cantidadDeLineas, cantidadApostada) => {
  /*En esta funcion como dice se simula el juego, 
  se ejecuta a partir de la catidad de lineas apostadas
  y el monto apostado*/
  let acumuladoTotal = 0;
  /*Se crea el tablero */
  crearTablero();
  // tablero.forEach((e) => console.log(e));
  /*Se almacena el acumulado de ganancias*/
  acumuladoTotal += apuesta(cantidadDeLineas);
  /*Si el acumulado es mayor a 0 es por que gano 
  entonces en la variable auxiliar 
  vecesQueGano se cuentan las veces gue gano*/
  if (acumuladoTotal > 0) {
    vecesQueGano++;
  }
  /*Se retorna el total acumulado multilicado por la catidad de lineas que se aposto*/
  return acumuladoTotal * cantidadApostada;
};
/*Aca se hace la simulacion para controlar la probabilidad */
let ganancias = 0;
let apuestasAcumuladas = 0;
for (let i = 0; i < 100; i++) {
  /*Aca se pueden elegir la catidad de lineas a apostar de 1 a 9*/
  const lineasApostadas = 9;
  /*Aca ingresa el monto apostado */
  const cantidadApostada = 100;
  /*Se acumulan las ganacias de las partidas simuladas */
  ganancias += simularJuego(lineasApostadas, cantidadApostada)
  /*Se acumulan los montos apostados */
  apuestasAcumuladas += cantidadApostada;
}
/*Por ultimo, se pueden ver los resultados de la simulacion */
console.log(`Total ganado: ${ganancias}`)
console.log(`Total apostado: ${apuestasAcumuladas}`)
console.log(`Veces que gano: ${vecesQueGano}`)
console.log(`Diferencia: ${ganancias - apuestasAcumuladas}`)