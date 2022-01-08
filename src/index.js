var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var valors = document.querySelector('.grid-container');
var win = document.querySelector('.count-wins');
var lose = document.querySelector('.count-loses');
var WINS = 0;
var LOSES = 0;
var winsStorage = localStorage.getItem("winRounds");
var losesStorage = localStorage.getItem("loseRounds");
if (winsStorage === 'null')
    winsStorage = 0;
if (losesStorage === 'null')
    losesStorage = 0;
var selectSquares = [];
win.innerHTML += winsStorage;
lose.innerHTML += losesStorage;
var squares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var gameStatus = /** @class */ (function () {
    function gameStatus() {
        this.GMstatus = '';
    }
    return gameStatus;
}());
function removeSquare(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);
}
function searchElement(ar, val) {
    if (ar.find(function (element) { return element === val; }))
        return false;
    else
        return true;
}
function searchDiagonals(diagonals) {
    if (diagonals.every(function (num) { return num === 0; }))
        return 0;
    else if (diagonals.every(function (num) { return num === -1; }))
        return -1;
    else
        return null;
}
function countPoints(wins, element) {
    element.innerHTML = '';
    element.innerHTML += wins;
}
// Esta funcion retorna -1 o 0
function checkWinner(mat) {
    var vertical = 0;
    var horizontal = 0;
    var valueVertical;
    var valueHorizontal;
    var diagonals1 = [];
    var diagonals2 = [];
    for (var i = 0; i < mat.length; i++) {
        diagonals1.push(mat[i][i]);
        diagonals2.push(mat[i][2 - i]);
        for (var j = 0; j < mat.length - 1; j++) {
            if (mat[i][j] === mat[i][j + 1]) {
                horizontal++;
                valueHorizontal = mat[i][j];
            }
            if (mat[j][i] === mat[j + 1][i]) {
                valueVertical = mat[j][i];
                vertical++;
            }
            if (vertical === 2)
                return valueVertical;
            if (horizontal === 2)
                return valueHorizontal;
        }
        vertical = 0;
        horizontal = 0;
    }
    if (searchDiagonals(diagonals1) !== null)
        return searchDiagonals(diagonals1);
    if (searchDiagonals(diagonals2) !== null)
        return searchDiagonals(diagonals2);
}
function process(ref, res) {
    var checkValue = true;
    // Array de nodos.
    var nodes = __spreadArray([], ref.parentElement.children, true);
    if (res === "Restart") {
        location.reload();
    }
    else {
        // Valor seleccionado. 
        var index = nodes.indexOf(ref);
        // Valor detectar mismo valor.
        if (squares[index] > 0) {
            // Recorro todos los nodos.
            for (var i = 0; i < nodes.length; i++) {
                if (i === index) {
                    nodes[i].classList.add("cross");
                    nodes[i].classList.remove("square");
                }
            }
            // Guardando en el array los seleccionados.
            selectSquares.push(index);
            // El bucle que determina el movimiento del circulo
            while (checkValue) {
                // Guardo el numero random.
                var opposite = attack();
                // 
                if (selectSquares.length > 7) {
                    checkValue = false;
                }
                else {
                    if (searchElement(selectSquares, opposite)) {
                        selectSquares.push(opposite);
                        nodes[opposite].classList.add("circle");
                        nodes[opposite].classList.remove("square");
                        checkValue = false;
                        squares[opposite] = -1;
                    }
                }
            }
            squares[index] = 0;
        }
        var matriz = [squares.slice(0, 3), squares.slice(3, 6), squares.slice(6, 9)];
        if (checkWinner(matriz) === 0) {
            if (winsStorage === '0' || winsStorage === null) {
                WINS++;
                localStorage.setItem("winRounds", JSON.stringify(WINS));
                countPoints(WINS, win);
            }
            else {
                WINS++;
                winsStorage = parseInt(winsStorage, 10) + WINS;
                localStorage.setItem("winRounds", JSON.stringify(winsStorage));
                countPoints(winsStorage, win);
            }
            alert("Ganaste");
            setTimeout(function () {
                location.reload();
            }, 1000);
        }
        else if (checkWinner(matriz) === -1) {
            if (losesStorage === '0' || losesStorage === null) {
                LOSES++;
                localStorage.setItem("loseRounds", JSON.stringify(LOSES));
                countPoints(LOSES, lose);
            }
            else {
                LOSES++;
                losesStorage = parseInt(losesStorage, 10) + LOSES;
                localStorage.setItem("loseRounds", JSON.stringify(losesStorage));
                countPoints(losesStorage, lose);
            }
            alert("PERDISTE");
            setTimeout(function () {
                location.reload();
            }, 1000);
        }
        if (selectSquares.length === 9) {
            if (typeof checkWinner(matriz) === "undefined") {
                alert("Empate");
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }
        }
    }
}
function attack() {
    return Math.floor((Math.random() * (8 - 1 + 1)) + 1);
}
squares.map(function (item, index) {
    valors.innerHTML += "\n    <div class=\"square\" ref=".concat(index, " onclick=\"process(this)\"></div>\n");
});
function restartMatch(ref) {
    process(ref, "Restart");
}
function restartGlobalScore(ref) {
    localStorage.setItem("loseRounds", JSON.stringify(null));
    localStorage.setItem("winRounds", JSON.stringify(null));
    setTimeout(function () {
        location.reload();
    }, 1000);
}
