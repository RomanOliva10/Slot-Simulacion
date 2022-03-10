/*hay 2 fichas pero tienen 3 variaciones. verde, multicolor y bronce
son 7 en total
hay un bonus que se activa con 3 y en cualquier posicion
da 12 tiros gratis,
hacen match con:
misma ficha,
misma ficha y variacion.
misma ficha pero con cada variacion,
misma variacion pero distinta ficha
 */
const fichas = {
  0: {
    color: "G",
    type: "A",
  },
  1: {
    color: "R",
    type: "A",
  },
  2: {
    color: "GO",
    type: "A",
  },
  3: {
    color: "G",
    type: "B",
  },
  4: {
    color: "R",
    type: "B",
  },
  5: {
    color: "GO",
    type: "B",
  },
  6: {
    color: "C",
    type: "C",
  },
};
const tablero = [];
const lineas = [
  [0, 0, 0],
  [2, 2, 2],
  [1, 1, 1],
  [0, 2, 0],
  [2, 1, 2],
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 2],
  [1, 2, 1],
  [2, 1, 0],
];
const tipos = {
  AAA: "A",
  BBB: "B",
};
const colores = {
  GRGO: "M",
  GGG: "G",
  RRR: "R",
  GOGOGO: "GO",
};
const premios = {
  AM: 2,
  AG: 1.9,
  AR: 1.8,
  AGO: 1.7,
  Aundefined: 1.6,
  BM: 1.5,
  BGO: 1.4,
  BR: 1.3,
  BG: 1.2,
  Bundefined: 1.1,
  undefinedM: 1,
  undefinedG: 0.9,
  undefinedR: 0.5,
  undefinedGO: 0.4,
};
const bonus = fichas[6];
const probabilidad = 0.8;
let bonusCheck = false;
const randomNumber = () => {
  const max = bonusCheck ? 6 : 7;
  let num = Math.floor(Math.random() * (max - 0) - probabilidad) + 0;
  if (num < 0) {
    return fichas[0];
  } else {
    if (num > 6 && !bonusCheck) {
      return fichas[6];
    } else {
      if (num >= 6 && bonusCheck) {
        return fichas[5];
      }
      return fichas[num];
    }
  }
};
const crearTablero = () => {
  for (let i = 0; i < 3; i++) {
    tablero[i] = new Array();
    for (let j = 0; j < 3; j++) {
      tablero[i][j] = randomNumber();
    }
  }
};
const juego = (linea) => {
  const logitudFilas = tablero[0].length;
  let checkColor = [];
  let checkTipo = [];
  for (let i = 0; i < logitudFilas; i++) {
    checkColor.push(tablero[lineas[linea][i]][i].color);
    checkTipo.push(tablero[lineas[linea][i]][i].type);
  }
  const color = colores[checkColor.join("")];
  const tipo = tipos[checkTipo.join("")];
  if (color || tipo) {
    return premios[tipo + color];
  } else {
    return 0;
  }
};
const apuesta = (cantidadDeLineas) => {
  let acumulado = 0;
  let cont = 0;
  const logitudFilas = tablero[0].length;
  const longitudColumnas = tablero.length;
  for (let i = 0; i < longitudColumnas; i++) {
    for (let j = 0; j < logitudFilas; j++) {
      if (tablero[i][j] === bonus) {
        cont++;
      }
    }
  }
  if (cont >= 3) {
    bonusCheck = true;
  }
  for (let i = 0; i < cantidadDeLineas; i++) {
    acumulado += juego(i);
  }
  return acumulado;
};
let vecesQueGano = 0;
let contadorBonus = 0;
const simularJuego = (cantidadDeLineas, cantidadApostada) => {
  crearTablero();
  // console.log("******************");
  // tablero.forEach((e) => console.log(JSON.stringify(e)));
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
      // tablero.forEach((e) => console.log(JSON.stringify(e)));
      tiradaBonus += apuesta(cantidadDeLineas);
    }
    bonusCheck = false;
  }
  return (acumuladoTotal + tiradaBonus) * cantidadApostada;
};
let ganancias = 0;
let apuestasAcumuladas = 0;
for (let i = 0; i < 1000000; i++) {
  const lineasApostadas = 10;
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

/*-0,2 ,0.8*/