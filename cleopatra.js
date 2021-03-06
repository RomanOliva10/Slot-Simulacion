const fichas = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];
const tablero = [];
const premios = {
  0: {
    2: 0.1,
    3: 0.2,
    4: 0.3,
    5: 0.4,
  },
  1: {
    3: 0,
    4: 0,
    5: 0.1,
  },
  2: {
    3: 0.1,
    4: 0.2,
    5: 0.3,
  },
  3: {
    3: 0.4,
    4: 0.5,
    5: 0.6,
  },
  4: {
    3: 0.7,
    4: 0.8,
    5: 0.9,
  },
  5: {
    3: 1,
    4: 1.1,
    5: 1.2,
  },
  6: {
    3: 0,
    4: 0,
    5: 2,
  },
  7: {
    3: 1.3,
    4: 1.4,
    5: 1.5,
  },
  8: {
    3: 1.6,
    4: 1.7,
    5: 1.8,
  },
  9: {
    3: 1.9,
    4: 2,
    5: 2.1,
  },
  10: {
    3: 2.2,
    4: 2.3,
    5: 2.4,
  },
  11: {
    3: 2.5,
    4: 2.6,
    5: 2.7,
  },
  12: {
    3: 2.8,
    4: 2.9,
    5: 3,
  },
};
const lineas = [
  [2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1],
  [1, 2, 2, 2, 1],
  [2, 1, 0, 1, 2],
  [0, 1, 2, 1, 0],
  [0, 0, 1, 2, 2],
  [2, 2, 1, 0, 0],
  [0, 0, 0, 1, 2],
  [2, 2, 1, 0, 1],
  [0, 0, 1, 2, 1],
  [1, 1, 2, 1, 0],
  [1, 1, 0, 1, 2],
  [1, 2, 2, 1, 0],
  [1, 0, 0, 1, 2],
  [0, 1, 1, 1, 2],
  [2, 1, 1, 1, 0],
  [1, 2, 1, 0, 1],
  [1, 0, 1, 2, 1],
];
//--------------------------------
const comodin = fichas[6];
const bonus = fichas[0];
const probabilidad = 0;
let bonusCheck = false;
let checkComodin = false;
//--------------------------------
const randomNumber = () => {
  const min = bonusCheck ? 1 : 0;
  let num = Math.floor(Math.random() * (12 - min) - probabilidad) + min;
  if (num < min) {
    return fichas[min];
  } else {
    if (num > 12) {
      return fichas[12];
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
  const longitudFilas = tablero[0].length;
  let fichaRepetida;
  let cont = 0;
  for (let i = 0; i < longitudFilas; i++) {
    // console.log("===================");
    let comparador = tablero[lineas[linea][i]][i];
    for (let j = 0; j < longitudFilas; j++) {
      let comparado = tablero[lineas[linea][j]][j];
      // console.log(
      //   [lineas[linea][j], j],
      //   comparador,
      //   comparado,
      //   comparador === comparado,
      //   comparado === comodin,
      //   comparador === comodin && comparado !== comodin,
      //   comparador,
      //   cont,
      //   cont < 3
      // );
      if (comparador === comparado) {
        cont++;
        fichaRepetida = comparador;
      } else {
        if (comparado === comodin) {
          checkComodin = true;
          cont++;
        } else {
          if (comparador === comodin && comparado !== comodin) {
            cont++;
            comparador = comparado;
            fichaRepetida = comparado;
            checkComodin = true;
          } else {
            if (cont < 3) {
              cont = 0;
            } else {
              break;
            }
          }
        }
      }
    }
    if (cont >= 3) {
      // console.log(fichaRepetida, linea, cont, checkComodin);
      switch (fichaRepetida) {
        case fichas[1]:
          return checkComodin ? premios[1][cont] * 2 : premios[1][cont];
          break;
        case fichas[2]:
          return checkComodin ? premios[2][cont] * 2 : premios[2][cont];
          break;
        case fichas[3]:
          return checkComodin ? premios[3][cont] * 2 : premios[3][cont];
          break;
        case fichas[4]:
          return checkComodin ? premios[5][cont] * 2 : premios[5][cont];
          break;
        case fichas[5]:
          return checkComodin ? premios[5][cont] * 2 : premios[5][cont];
          break;
        case fichas[6]:
          return premios[6][cont] * 2;
          break;
        case fichas[7]:
          return checkComodin ? premios[7][cont] * 2 : premios[7][cont];
          break;
        case fichas[8]:
          return checkComodin ? premios[8][cont] * 2 : premios[8][cont];
          break;
        case fichas[9]:
          return checkComodin ? premios[9][cont] * 2 : premios[9][cont];
          break;
        case fichas[10]:
          return checkComodin ? premios[10][cont] * 2 : premios[10][cont];
          break;
        case fichas[11]:
          return checkComodin ? premios[11][cont] * 2 : premios[11][cont];
          break;
        case fichas[12]:
          return checkComodin ? premios[12][cont] * 2 : premios[12][cont];
          break;
        default:
          return 0;
          break;
      }
    } else {
      cont = 0;
    }
  }
  return 0;
};

// // crearTablero();
// tablero.forEach((e) => console.log(e));
// console.log(juego(1));
// if (bonusCheck) {
//   // contadorBonus++;
//   for (let i = 0; i < 15; i++) {
//     crearTablero();
//     console.log("===================");
//     tablero.forEach((e) => console.log(e));
//     console.log(juego(0));
//     // tiradaBonus += apuesta(cantidadDeLineas);
//   }
//   bonusCheck = false;
// }

const apuesta = (cantidadDeLineas) => {
  let acumulado = 0;
  let bonusPlus = 0;
  let cont = 0;
  const longitudFilas = tablero[0].length;
  const longitudColumnas = tablero.length;
  for (let i = 0; i < longitudColumnas; i++) {
    for (let j = 0; j < longitudFilas; j++) {
      if (tablero[i][j] === bonus) {
        cont++;
      }
    }
  }
  if (cont > 5) {
    bonusCheck = true;
    bonusPlus = premios[0][5];
  } else {
    if (cont === 2) {
      bonusPlus = premios[0][cont];
    } else {
      if (cont > 2) {
        bonusCheck = true;
        bonusPlus = premios[0][cont];
      }
    }
  }
  for (let i = 0; i < cantidadDeLineas; i++) {
    acumulado += juego(i);
  }
  return acumulado + bonusPlus;
};
let vecesQueGano = 0;
let contadorBonus = 0;
const simularJuego = (cantidadDeLineas, cantidadApostada) => {
  crearTablero();
  // tablero.forEach((e) => console.log(e));
  let tiradaBonus = 0;
  let acumuladoTotal = apuesta(cantidadDeLineas);
  if (acumuladoTotal > 0) {
    vecesQueGano++;
  }
  if (bonusCheck) {
    contadorBonus++;
    for (let i = 0; i < 15; i++) {
      crearTablero();
      // console.log("===================");
      // tablero.forEach((e) => console.log(e));
      tiradaBonus += apuesta(cantidadDeLineas);
    }
    bonusCheck = false;
  }
  return (acumuladoTotal + tiradaBonus) * cantidadApostada;
};
let ganancias = 0;
let apuestasAcumuladas = 0;
for (let i = 0; i < 1000000; i++) {
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
/*-1 ,0.2*/
