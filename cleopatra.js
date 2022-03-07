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
    2: 2,
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
    3: 5,
    4: 25,
    5: 100,
  },
  12: {
    3: 5,
    4: 25,
    5: 100,
  },
};
const lineas = [
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
  [0, 0, 1, 2, 2],
  [2, 2, 1, 0, 0],
  [1, 0, 0, 0, 1],
  [1, 2, 2, 2, 1],
  [2, 1, 0, 1, 2],
  [0, 1, 2, 1, 0],
  [2, 2, 2, 2, 2],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1],
];
const probabilidad = 0;
let bonusCheck = false;
const randomNumber = () => {
  const min = bonusCheck ? 1 : 0;
  let num = Math.floor(Math.random() * (12 - min)) + min;
  return fichas[num];
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
  let cont = 0;
  let fichaRepetida;
  let bonusPlus = 0;
  let checkComodin = false;
  let premio = 0;
  for (let i = 0; i < longitudColumnas; i++) {
    for (let j = 0; j < logitudFilas; j++) {
      if (tablero[i][j] === bonus) {
        cont++;
      }
    }
  }
  if (cont === 2) {
    bonusPlus = premios[0][cont];
  }
  if (cont > 2) {
    bonusCheck = true;
    bonusPlus = premios[0][cont];
  } else {
    if (cont > 5) {
      bonusPlus = premios[0][5];
    }
  }
  cont = 0;
  for (let i = 0; i < logitudFilas; i++) {
    for (let j = 0; j < logitudFilas; j++) {
      if (tablero[lineas[linea][i]][i] === tablero[lineas[linea][j]][j]) {
        cont++;
        fichaRepetida = tablero[lineas[linea][i]][i];
      } else {
        if (tablero[lineas[linea][j]][j] === comodin) {
          cont++;
          checkComodin = true;
        } else {
          if (cont >= 3) {
            switch (fichaRepetida) {
              case fichas[1]:
                //   console.log("B");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin ? premios[1][cont] * 2 : premios[1][cont];
                break;
              case fichas[2]:
                //   console.log("C");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin ? premios[2][cont] * 2 : premios[2][cont];
                break;
              case fichas[3]:
                //   console.log("D");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin ? premios[3][cont] * 2 : premios[4][cont];
                break;
              case fichas[4]:
                //   console.log("E");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin ? premios[5][cont] * 2 : premios[5][cont];
                break;
              case fichas[5]:
                //   console.log("F");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin ? premios[5][cont] * 2 : premios[5][cont];
                break;
              case fichas[6]:
                //   console.log("G");
                //   console.log(linea);
                //   console.log(cont);
                premio = premios[6][cont] * 2;
                break;
              case fichas[7]:
                //   console.log("H");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin ? premios[7][cont] * 2 : premios[7][cont];
                break;
              case fichas[8]:
                //   console.log("I");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin ? premios[8][cont] * 2 : premios[8][cont];
                break;
              case fichas[9]:
                //   console.log("J");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin ? premios[9][cont] * 2 : premios[9][cont];
                break;
              case fichas[10]:
                //   console.log("K");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin
                  ? premios[10][cont] * 2
                  : premios[10][cont];
                break;
              case fichas[11]:
                //   console.log("L");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin
                  ? premios[11][cont] * 2
                  : premios[11][cont];
                break;
              case fichas[12]:
                //   console.log("M");
                //   console.log(linea);
                //   console.log(cont);
                premio = checkComodin
                  ? premios[12][cont] * 2
                  : premios[12][cont];
                break;
              default:
                premio = 0;
                break;
            }
            return premio + bonusPlus;
          }
          cont = 0;
        }
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
    for (let i = 0; i < 15; i++) {
      crearTablero();
      console.log('===================');
      tablero.forEach((e) => console.log(e));
      tiradaBonus += apuesta(cantidadDeLineas);
    }
    bonusCheck = false;
  }
  return (acumuladoTotal + tiradaBonus) * cantidadApostada;
};
let ganancias = 0;
let apuestasAcumuladas = 0;
for (let i = 0; i < 10; i++) {
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
