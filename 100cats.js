const fichas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const tablero = [];
const premios = {
  0: {
    3: 0,
    4: 0,
    5: 1,
  },
  1: {
    3: 0,
    4: 0,
    5: 1,
  },
  2: {
    3: 0,
    4: 0,
    5: 1,
  },
  3: {
    3: 0,
    4: 1,
    5: 1,
  },
  4: {
    3: 0,
    4: 1,
    5: 2,
  },
  5: {
    3: 1,
    4: 2,
    5: 3,
  },
  6: {
    3: 2,
    4: 3,
    5: 4,
  },
  7: {
    3: 3,
    4: 4,
    5: 5,
  },
  8: {
    3: 4,
    4: 5,
    5: 6,
  },
  9: {
    3: 5,
    4: 6,
    5: 7,
  },
  10: {
    3: 0,
    4: 0,
    5: 100,
  },
  11: {
    2: 9,
    3: 10,
    4: 11,
    5: 12,
  },
};
const lineas = [
  [0, 0, 0, 0, 0], //0
  [1, 1, 1, 1, 1], //1
  [2, 2, 2, 2, 2], //2
  [3, 3, 3, 3, 3], //3
  [3, 2, 2, 2, 3], //4
  [0, 1, 1, 1, 0], //5
  [1, 0, 0, 0, 1], //6
  [2, 3, 3, 3, 2], //7
  [1, 1, 0, 1, 1], //8
  [2, 2, 3, 2, 2], //9
  [3, 3, 2, 3, 3], //10
  [0, 0, 1, 0, 0], //11
  [3, 1, 3, 1, 3], //12
  [0, 2, 0, 2, 0], //13
  [2, 0, 2, 0, 2], //14
  [1, 3, 1, 3, 1], //15
  [3, 2, 3, 2, 3], //16
  [0, 1, 0, 1, 0], //17
  [1, 0, 1, 0, 1], //18
  [2, 3, 2, 3, 2], //19
];
//************************/
const comodin = fichas[10];
const bonus = fichas[11];
const probabilidad = -0.1;
let bonusCheck = false;
let checkComodin = false;
//************************/
const randomNumber = () => {
  const max = bonusCheck ? 11 : 12;
  let num = Math.floor(Math.random() * max - probabilidad);
  if (num < 0) {
    return fichas[0];
  } else {
    if (num > 11 && !bonusCheck) {
      return fichas[11];
    } else {
      if (num >= 11 && bonusCheck) {
        return fichas[10];
      }
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
        case fichas[0]:
          return checkComodin ? premios[0][cont] * 2 : premios[0][cont];
          break;
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
          return checkComodin ? premios[4][cont] * 2 : premios[4][cont];
          break;
        case fichas[5]:
          return checkComodin ? premios[5][cont] * 2 : premios[5][cont];
          break;
        case fichas[6]:
          return checkComodin ? premios[6][cont] * 2 : premios[6][cont];
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
          return premios[10][cont];
          break;
        case fichas[11]:
          return 0;
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
    bonusPlus = premios[11][5];
  } else {
    if (cont === 2) {
      bonusPlus = premios[11][2];
    } else {
      if (cont > 3) {
        bonusCheck = true;
        bonusPlus = premios[11][cont];
      }
    }
  }
  for (let i = 0; i < cantidadDeLineas; i++) {
    acumulado += juego(i);
  }
  // console.log(bonusPlus, cont);
  return acumulado + bonusPlus;
};
let vecesQueGano = 0;
let contadorBonus = 0;
const simularJuego = (cantidadDeLineas, cantidadApostada) => {
  crearTablero();
  // console.log("******************");
  // tablero.forEach((e) => console.log(e));
  let tiradaBonus = 0;
  let acumuladoTotal = apuesta(cantidadDeLineas);
  if (acumuladoTotal > 0) {
    vecesQueGano++;
  }
  if (bonusCheck) {
    contadorBonus++;
    for (let i = 0; i < 10; i++) {
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

/*-0.2 ,2*/
