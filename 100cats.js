/*3 o mas y consecutivos,
 tiene comodin,
  tiene bonus,
   el bonus tienen que ser 5 y en cualquier posicion,
    regala 10 tiradas,
    tiene 11 fichas*/
const fichas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const tablero = [];
const premios = {
  0: {
    3: 5,
    4: 20,
    5: 100,
  },
  1: {
    3: 25,
    4: 100,
    5: 750,
  },
  2: {
    3: 10,
    4: 75,
    5: 250,
  },

  3: {
    3: 10,
    4: 50,
    5: 125,
  },
  4: {
    3: 5,
    4: 25,
    5: 100,
  },
  5: {
    3: 5,
    4: 25,
    5: 100,
  },
  6: {
    2: 10,
    3: 200,
    4: 2000,
    5: 10000,
  },
  7: {
    3: 25,
    4: 100,
    5: 750,
  },
  8: {
    3: 15,
    4: 100,
    5: 400,
  },
  9: {
    3: 10,
    4: 50,
    5: 250,
  },
  10: {
    3: 5,
    4: 25,
    5: 100,
  },
  11: {
    2: 2,
    3: 5,
    4: 25,
    5: 100,
  },
};
const lineas = [
  [1, 1, 0, 1, 1],
  [2, 2, 3, 2, 2],
  [3, 3, 2, 3, 3],
  [0, 0, 1, 0, 0],
  [3, 1, 3, 1, 3],
  [0, 2, 0, 2, 0],
  [2, 0, 2, 0, 2],
  [1, 3, 1, 3, 1],
  [3, 2, 3, 2, 3],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [2, 3, 2, 3, 2],
  [3, 2, 2, 2, 3],
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [2, 3, 3, 3, 2],
  [3, 3, 3, 3, 3],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1],
];
const probabilidad = 0;
let bonusCheck = false;
const randomNumber = () => {
  const max = bonusCheck ? 11 : 12;
  let num = Math.floor(Math.random() * max - probabilidad);
  if (num < 0) {
    return fichas[0];
  } else {
    if (num > max) {
      return fichas[max];
    } else {
      return fichas[num];
    }
  }
};
const crearTablero = () => {
  for (let i = 0; i < 4; i++) {
    tablero[i] = new Array();
    for (let j = 0; j < 5; j++) {
      tablero[i][j] = randomNumber();
    }
  }
};
const juego = (linea) => {
  const logitudFilas = tablero[0].length;
  const longitudColumnas = tablero.length;
  const comodin = fichas[10];
  const bonus = fichas[11];
  let cont = 0;
  let bonusPlus = 0;
  let checkComodin = false;
  let fichaRepetida;
  for (let i = 0; i < longitudColumnas; i++) {
    for (let j = 0; j < logitudFilas; j++) {
      if (tablero[i][j] === bonus) {
        cont++;
      }
    }
  }
  if (cont > 5) {
    bonusCheck = true;
    bonusPlus = premios[11][5];
  } else {
    if (cont === 2) {
      bonusPlus = premios[11][2];
    } else {
      if (cont > 2) {
        bonusPlus = premios[11][cont];
      }
    }
  }
  cont = 0;
  for (let i = 0; i < logitudFilas; i++) {
    for (let j = 0; j < logitudFilas; j++) {
      //       console.log(
      //         [lineas[linea][i], j],
      //         tablero[lineas[linea][i]][i],
      //         tablero[lineas[linea][j]][j],
      //         tablero[lineas[linea][i]][i] === tablero[lineas[linea][j]][j],
      //         tablero[lineas[linea][j]][j] === comodin,
      //         cont
      //       );
      if (tablero[lineas[linea][i]][i] === tablero[lineas[linea][j]][j]) {
        cont++;
        fichaRepetida = tablero[lineas[linea][j]][j];
      } else {
        if (tablero[lineas[linea][j]][j] === comodin) {
          checkComodin = true;
          cont++;
        } else {
          cont = 0;
        }
      }
    }
    if (cont >= 3) {
      console.log(
        fichaRepetida,
        "linea: ",
        linea,
        "cont: ",
        cont,
        checkComodin,
        "bonusPlus: ",
        bonusPlus
      );
      switch (fichaRepetida) {
        case fichas[0]:
          return (
            (checkComodin ? premios[0][cont] * 2 : premios[0][cont]) + bonusPlus
          );
          break;
        case fichas[1]:
          return (
            (checkComodin ? premios[1][cont] * 2 : premios[1][cont]) + bonusPlus
          );
          break;
        case fichas[2]:
          return (
            (checkComodin ? premios[2][cont] * 2 : premios[2][cont]) + bonusPlus
          );
          break;
        case fichas[3]:
          return (
            (checkComodin ? premios[3][cont] * 2 : premios[3][cont]) + bonusPlus
          );
          break;
        case fichas[4]:
          return (
            (checkComodin ? premios[4][cont] * 2 : premios[4][cont]) + bonusPlus
          );
          break;
        case fichas[5]:
          return (
            (checkComodin ? premios[5][cont] * 2 : premios[5][cont]) + bonusPlus
          );
          break;
        case fichas[6]:
          return (
            (checkComodin ? premios[6][cont] * 2 : premios[6][cont]) + bonusPlus
          );
          break;
        case fichas[7]:
          return (
            (checkComodin ? premios[7][cont] * 2 : premios[7][cont]) + bonusPlus
          );
          break;
        case fichas[8]:
          return (
            (checkComodin ? premios[8][cont] * 2 : premios[8][cont]) + bonusPlus
          );
          break;
        case fichas[9]:
          return (
            (checkComodin ? premios[9][cont] * 2 : premios[9][cont]) + bonusPlus
          );
          break;
        case fichas[10]:
          return premios[10][cont] + bonusPlus;
          break;
        case fichas[11]:
          return 0;
          break;
        default:
          return 0;
          break;
      }
    }
  }
  return 0 + bonusPlus;
};
const apuesta = (cantidadDeLineas) => {
  let acumulado = 0;
  for (let i = 0; i < cantidadDeLineas; i++) {
    acumulado += juego(i);
  }
  return acumulado;
};
let vecesQueGano = 0;
let contadorBonus = 0;
const simularJuego = (cantidadDeLineas, cantidadApostada) => {
  crearTablero();
  tablero.forEach((e) => console.log(e));
  let tiradaBonus = 0;
  let acumuladoTotal = apuesta(cantidadDeLineas);
  if (acumuladoTotal > 0) {
    vecesQueGano++;
  }
  if (bonusCheck) {
    contadorBonus++;
    for (let i = 0; i < 10; i++) {
      crearTablero();
      console.log("===================");
      tablero.forEach((e) => console.log(e));
      tiradaBonus += apuesta(cantidadDeLineas);
      if(tiradaBonus===NaN){
              console.log('aca');
      }
    }
    bonusCheck = false;
  }
  return (acumuladoTotal + tiradaBonus) * cantidadApostada;
};
let ganancias = 0;
let apuestasAcumuladas = 0;
for (let i = 0; i < 5; i++) {
  const lineasApostadas = 20;
  const cantidadApostada = 1;
  const apuestaTotal = cantidadApostada * lineasApostadas;
  ganancias += simularJuego(lineasApostadas, cantidadApostada);
  apuestasAcumuladas += apuestaTotal;
}
console.log(
  `Total ganado: ${new Intl.NumberFormat("de-DE").format(ganancias)}`
);
console.log(
  `Total apostado: ${new Intl.NumberFormat("de-DE").format(apuestasAcumuladas)}`
);
console.log(
  `Veces que gano: ${new Intl.NumberFormat("de-DE").format(vecesQueGano)}`
);
console.log(
  `Veces que hubo bonus: ${new Intl.NumberFormat("de-DE").format(
    contadorBonus
  )}`
);
console.log(`Diferencia: ${(100 / apuestasAcumuladas) * ganancias}`);
