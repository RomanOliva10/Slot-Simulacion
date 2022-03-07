const fichas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
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
const premios = {
    0: {
        3: 0,
        4: 1,
        5: 1,
    },
    1: {
        3: 1,
        4: 2,
        5: 3,
    },
    2: {
        3: 4,
        4: 5,
        5: 6,
    },
    3: {
        3: 5,
        4: 6,
        5: 7,
    },
    4: {
        3: 6,
        4: 7,
        5: 8,
    },
    5: {
        3: 8,
        4: 9,
        5: 10,
    },
    6: {
        3: 12,
        4: 13,
        5: 15,
    },
    7: {
        3: 18,
        4: 19,
        5: 20,
    },
    8: {
        3: 20,
        4: 25,
        5: 30,
    },
};
const probabilidad = 0;
let bonus = false;
const randomNumber = () => {
    let num = Math.floor(Math.random() * (bonus ? 9 : 10) - probabilidad);
    if (num < 0) {
        return fichas[0];
    } else {
        if (num > 9 && !bonus) {
            return fichas[9];
        } else {
            if (num >= 9 && bonus) {
                return fichas[8];
            } else {
                return fichas[num];
            }
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
    for (let i = 0; i < logitudFilas; i++) {
        for (let j = 0; j < logitudFilas; j++) {
            if (tablero[lineas[linea][i]][i] === tablero[lineas[linea][j]][j]) {
                cont++;
                fichaRepetida = tablero[lineas[linea][j]][j];
            }
        }
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
                    bonus = true;
                    return 0;
                    break;
                default:
                    return 0;
                    break;
            }
        }
        cont = 0;
    }
    return 0;
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
    // tablero.forEach((e) => console.log(e));
    let tiradaBonus = 0
    let acumuladoTotal = apuesta(cantidadDeLineas);
    if (acumuladoTotal > 0) {
        vecesQueGano++;
    }
    if (bonus) {
        contadorBonus++;
        for (let i = 0; i < 3; i++) {
            crearTablero();
            // tablero.forEach((e) => console.log(e));
            tiradaBonus += apuesta(cantidadDeLineas)
        }
        bonus = false
    }
    return (acumuladoTotal + tiradaBonus) * cantidadApostada;
};
let ganancias = 0;
let apuestasAcumuladas = 0;
for (let i = 0; i < 10000000; i++) {
    const lineasApostadas = 9;
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
    `Veces que hubo bonus: ${new Intl.NumberFormat("de-DE").format(contadorBonus)}`
);
console.log(`Diferencia: ${(100 / apuestasAcumuladas) * ganancias}`);

/*-0.3, 4.1 */