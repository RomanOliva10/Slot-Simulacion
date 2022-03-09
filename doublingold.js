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
// const tipos = {
//   'AAA': "A",
//   'BBB': "B",
// };
// const colores = {
//   'GRGO': "M",
//   'GGG': "G",
//   'RRR': "R",
//   'GOGOGO': "GO",
// };
// const premios = {
//   "AM": 200,
//   "AG": 150,
//   "AR": 125,
//   "AGO": 100,
//   "Aundefined": 75,
//   "BM": 50,
//   "BGO": 30,
//   "BR": 20,
//   "undefinedM": 15,
//   "BG": 10,
//   "Bundefined": 5,
//   "undefinedG": 3,
//   "undefinedR": 2,
//   "undefinedGO": 1
// };
const bonus = fichas[6];
const probabilidad = 0;
let bonusCheck = false;
const randomNumber = () => {
  const max = bonusCheck ? 5 : 6;
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
  for (let i = 0; i < 3; i++) {
    tablero[i] = new Array();
    for (let j = 0; j < 3; j++) {
      tablero[i][j] = randomNumber();
    }
  }
};

const juego = (linea) => {
  const logitudFilas = tablero[0].length;
  let cont = 0;
  let color
  for (let i = 0; i < logitudFilas; i++) {
    color=+tablero[lineas[linea][i]][i].color;
  }
  console.log(color)
  //   return 0;
};

crearTablero();
tablero.forEach((e) => console.log(JSON.stringify(e)));
juego(0);
