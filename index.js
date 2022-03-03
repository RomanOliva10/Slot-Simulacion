const fichas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const tablero = [];
const premios = {
  0: {
    3: 20,
    4: 50,
    5: 100,
  },
  1: {
    3: 15,
    4: 25,
    5: 50,
  },
  2: {
    3: 25,
    4: 30,
    5: 40,
  },
  3: {
    3: 15,
    4: 20,
    5: 30,
  },
  4: {
    3: 5,
    4: 10,
    5: 20,
  },
  5: {
    3: 4,
    4: 5,
    5: 10,
  },
  6: {
    3: 3,
    4: 4,
    5: 5,
  },
  7: {
    3: 2,
    4: 3,
    5: 4,
  },
  8: {
    3: 1,
    4: 2,
    5: 3,
  },
  9: {
    3: 0,
    4: 1,
    5: 2,
  },
};
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
const probabilidad = 1;
const randomNumber = () => {
  let num = Math.floor(Math.random() * 10 + probabilidad);
  if (num > 9) {
    return fichas[9];
  } else {
    if (num < 0) {
      return fichas[0];
    } else {
      return fichas[num];
    }
  }
};
const crearTablero = () => {
  for (let i = 0; i < 3; i++) {
    tablero[i] = new Array();
    for (let j = 0; j < 5; j++) {
      tablero[i][j] = randomNumber();
    }
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
          // console.log('A')
          // console.log(linea);
          // console.log(cont);
          return premios[0][cont];
          break;
        case fichas[1]:
          // console.log('B')
          // console.log(linea);
          // console.log(cont);
          return premios[1][cont];
          break;
        case fichas[2]:
          // console.log('C')
          // console.log(linea);
          // console.log(cont);
          return premios[2][cont];
          break;
        case fichas[3]:
          // console.log('D')
          // console.log(linea);
          // console.log(cont);
          return premios[3][cont];
          break;
        case fichas[4]:
          // console.log('E')
          // console.log(linea);
          // console.log(cont);
          return premios[4][cont];
          break;
        case fichas[5]:
          // console.log('F')
          // console.log(linea);
          // console.log(cont);
          return premios[5][cont];
          break;
        case fichas[6]:
          // console.log('G')
          // console.log(linea);
          // console.log(cont);
          return premios[6][cont];
          break;
        case fichas[7]:
          // console.log('H')
          // console.log(linea);
          // console.log(cont);
          return premios[7][cont];
          break;
        case fichas[8]:
          // console.log('I')
          // console.log(linea);
          // console.log(cont);
          return premios[8][cont];
          break;
        case fichas[9]:
          // console.log('J')
          // console.log(linea);
          // console.log(cont);
          return premios[9][cont];
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
  /*Se crea el tablero */
  crearTablero();
  // tablero.forEach((e) => console.log(e));
  /*Se almacena el acumulado de ganancias*/
  let acumuladoTotal = apuesta(cantidadDeLineas);
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
for (let i = 0; i < 10000000; i++) {
  /*Aca se pueden elegir la catidad de lineas a apostar de 1 a 9*/
  const lineasApostadas = 9;
  /*Aca ingresa el monto apostado */
  const cantidadApostada = 1;
  const apuestaTotal = cantidadApostada * lineasApostadas;
  /*Se acumulan las ganacias de las partidas simuladas */
  ganancias += simularJuego(lineasApostadas, cantidadApostada);
  /*Se acumulan los montos apostados */
  apuestasAcumuladas += apuestaTotal;
}
/*Por ultimo, se pueden ver los resultados de la simulacion */
console.log(
  `Total ganado: ${new Intl.NumberFormat("de-DE").format(ganancias)}`
);
console.log(
  `Total apostado: ${new Intl.NumberFormat("de-DE").format(apuestasAcumuladas)}`
);
console.log(
  `Veces que gano: ${new Intl.NumberFormat("de-DE").format(vecesQueGano)}`
);
console.log(`Diferencia: ${(100 / apuestasAcumuladas) * ganancias}`);
