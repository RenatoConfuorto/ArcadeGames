const winningCombinations_column = [];
const winningCombinations_row = [];

const width = 7;
const height = 6;
// combinazioni sulle colonne
for(let i = 0; i < width; i++){
    const row = [
        i,
        i + width,
        i + (width * 2),
        i + (width * 3),
        i + (width * 4),
        i + (width * 5),
    ]

    const a1 = row[0];
    const b1 = row[1];
    const c1 = row[2];
    const d1 = row[3];
    const comb_1 = [a1, b1, c1, d1];
    winningCombinations_column.push(comb_1);

    const a2 = row[1];
    const b2 = row[2];
    const c2 = row[3];
    const d2 = row[4];
    const comb_2 = [a2, b2, c2, d2];
    winningCombinations_column.push(comb_2);

    const a3 = row[2];
    const b3 = row[3];
    const c3 = row[4];
    const d3 = row[5];
    const comb_3 = [a3, b3, c3, d3];
    winningCombinations_column.push(comb_3);
}

//combinazioni sulle colonne
for(let i = 0; i < height; i++){
    const a1 = (width * i);
    const b1 = (width * i) + 1;
    const c1 = (width * i) + 2;
    const d1 = (width * i) + 3;
    const comb_1 = [a1, b1, c1, d1];
    winningCombinations_row.push(comb_1);

    const a2 = (width * i) + 1;
    const b2 = (width * i) + 2;
    const c2 = (width * i) + 3;
    const d2 = (width * i) + 4;
    const comb_2 = [a2, b2, c2, d2];
    winningCombinations_row.push(comb_2);

    const a3 = (width * i) + 2;
    const b3 = (width * i) + 3;
    const c3 = (width * i) + 4;
    const d3 = (width * i) + 5;
    const comb_3 = [a3, b3, c3, d3];
    winningCombinations_row.push(comb_3);

    const a4 = (width * i) + 3;
    const b4 = (width * i) + 4;
    const c4 = (width * i) + 5;
    const d4 = (width * i) + 6;
    const comb_4 = [a4, b4, c4, d4];
    winningCombinations_row.push(comb_4);
}

//combianzioni su diagonale
const winningCombinations_D = [
    [14, 22, 30, 38],
    [7, 15, 23, 31],
    [15, 23, 31, 39],
    [0, 8, 16, 24],
    [8, 16, 24, 32],
    [16, 24, 32, 40],
    [1, 9, 17, 25],
    [9, 17, 25, 33],
    [17, 25, 33, 41],
    [2, 10, 18, 26],
    [10, 18, 26, 34],
    [3, 11, 19, 27],
    [3, 9, 15, 21],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [18, 24, 30, 36],
    [13, 19, 25, 31],
    [19, 25, 31, 37],
    [20, 26, 32, 38]
]

const winningCombinationsAll = [
    ...winningCombinations_column,
    ...winningCombinations_row,
    ...winningCombinations_D
]
function checkVictory(){

    for(let i = 0; i < winningCombinationsAll.length; i++){
        const combination = winningCombinationsAll[i];

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];
        const d = combination[3];

        if(
            cellColors[a] &&
            cellColors[a] === cellColors[b] &&
            cellColors[b] === cellColors[c] &&
            cellColors[c] === cellColors[d]
        ){
            console.log('combinazione vincente', a, b, c, d);
            return true;
        }
    }
    return false;
}


//console.table(winningCombinationsAll);