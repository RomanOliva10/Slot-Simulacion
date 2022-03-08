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
    2: 1,
    3: 2,
    4: 3,
    5: 4,
  },
  1: {
    3: 0,
    4: 0,
    5: 1,
  },
  2: {
    3: 0,
    4: 1,
    5: 1,
  },
  3: {
    3: 0,
    4: 1,
    5: 2,
  },
  4: {
    3: 0,
    4: 1,
    5: 3,
  },
  5: {
    3: 0,
    4: 2,
    5: 4,
  },
  6: {
    3: 0,
    4: 0,
    5: 0,
  },
  7: {
    3: 0,
    4: 3,
    5: 6,
  },
  8: {
    3: 0,
    4: 4,
    5: 7,
  },
  9: {
    3: 0,
    4: 5,
    5: 8,
  },
  10: {
    3: 0,
    4: 6,
    5: 9,
  },
  11: {
    3: 5,
    4: 7,
    5: 10,
  },
  12: {
    3: 6,
    4: 8,
    5: 11,
  },
};
const lineas = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
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
const probabilidad = -0.9;
let bonusCheck = false;
const randomNumber = () => {
  const min = bonusCheck ? 1 : 0;
  let num = Math.floor(Math.random() * (12 - min)-probabilidad) + min;
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
  const logitudFilas = tablero[0].length;
  const longitudColumnas = tablero.length;
  const comodin = fichas[6];
  const bonus = fichas[0];
  let fichaComparadora = tablero[lineas[linea][0]][0];
  let cont = 0;
  let bonusPlus = 0;
  let checkComodin = false;
  for (let i = 0; i < longitudColumnas; i++) {
    for (let j = 0; j < logitudFilas; j++) {
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
  cont = 0;
  for (let i = 0; i < logitudFilas; i++) {
    // console.log(
    //   [lineas[linea][i], i],
    //   fichaComparadora,
    //   tablero[lineas[linea][i]][i],
    //   fichaComparadora === tablero[lineas[linea][i]][i]
    // );
    if (fichaComparadora === tablero[lineas[linea][i]][i]) {
      cont++;
    } else {
      if (tablero[lineas[linea][i]][i] === comodin) {
        cont++;
        checkComodin = true;
      } else {
        if (
          fichaComparadora === comodin &&
          tablero[lineas[linea][i]][i] !== comodin
        ) {
          checkComodin = true;
          cont++;
          fichaComparadora = tablero[lineas[linea][i]][i];
        } else {
          break;
        }
      }
    }
  }
  if (cont >= 3) {
    // console.log(fichaComparadora, linea, cont, checkComodin);
    switch (fichaComparadora) {
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
          (checkComodin ? premios[3][cont] * 2 : premios[4][cont]) + bonusPlus
        );
        break;
      case fichas[4]:
        return (
          (checkComodin ? premios[5][cont] * 2 : premios[5][cont]) + bonusPlus
        );
        break;
      case fichas[5]:
        return (
          (checkComodin ? premios[5][cont] * 2 : premios[5][cont]) + bonusPlus
        );
        break;
      case fichas[6]:
        return premios[6][cont] * 2 + bonusPlus;
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
        return (
          (checkComodin ? premios[10][cont] * 2 : premios[10][cont]) + bonusPlus
        );
        break;
      case fichas[11]:
        return (
          (checkComodin ? premios[11][cont] * 2 : premios[11][cont]) + bonusPlus
        );
        break;
      case fichas[12]:
        return (
          (checkComodin ? premios[12][cont] * 2 : premios[12][cont]) + bonusPlus
        );
        break;
      default:
        return 0;
        break;
    }
  }
  return 0 + bonusPlus;
};

// crearTablero();
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
  for (let i = 0; i < cantidadDeLineas; i++) {
    acumulado += juego(i);
  }
  return acumulado;
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
/*0.2, -0,9 */