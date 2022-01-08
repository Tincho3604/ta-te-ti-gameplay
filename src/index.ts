
const valors = document.querySelector('.grid-container') as HTMLElement;
const win = document.querySelector('.count-wins') as HTMLElement;
const lose = document.querySelector('.count-loses') as HTMLElement;

let WINS = 0;
let LOSES = 0;
let DRAWS = 0;
let winsStorage:any =  localStorage.getItem("winRounds")
let losesStorage:any =  localStorage.getItem("loseRounds")
let drawsStorage:any =  localStorage.getItem("drawRounds")

if(winsStorage === 'null') winsStorage = 0
if(losesStorage === 'null') losesStorage = 0
if(drawsStorage === 'null') drawsStorage = 0

let selectSquares:number[] = [];


win.innerHTML += winsStorage
lose.innerHTML += losesStorage

const squares = [1,2,3,4,5,6,7,8,9]

class gameStatus {
    private GMstatus:string | undefined;
    constructor() {
        this.GMstatus = '';

    }
}

function removeSquare ( arr:number[], item:number ) {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
}

function searchElement( ar:number[], val:number ){
    if(ar.find(element => element === val))
    return false
    else 
    return true
}

function searchDiagonals(diagonals:number[]){
    if(diagonals.every(num => num === 0)) return 0
    else if (diagonals.every(num => num === -1)) return -1
        else return null
}

function countPoints(wins:number, element:HTMLElement){
    element.innerHTML = ''
    element.innerHTML += wins
}



// Esta funcion retorna -1 o 0
function checkWinner(mat:number[][]) {
    let vertical = 0
    let horizontal = 0
    let valueVertical
    let valueHorizontal
    let diagonals1 = []
    let diagonals2 = []
    
    for(let i = 0; i < mat.length; i++ ) {
        diagonals1.push(mat[i][i])
        diagonals2.push(mat[i][2-i]) 

        for(let j = 0; j < mat.length-1; j++) {
        
            if(mat[i][j] === mat[i][j+1]){
                horizontal++
                valueHorizontal = mat[i][j]
            }
            
                if(mat[j][i] === mat[j+1][i]){
                valueVertical = mat[j][i];
                vertical++ 
            }
            if(vertical === 2) return valueVertical
            if(horizontal === 2) return valueHorizontal
        }
        vertical = 0
        horizontal = 0
    }

        if(searchDiagonals(diagonals1) !== null) return searchDiagonals(diagonals1)  
        if(searchDiagonals(diagonals2) !== null) return searchDiagonals(diagonals2)  
}


function process(ref:any, res:string,) {

    let checkValue:boolean = true; 
    // Array de nodos.
    const nodes = [...ref.parentElement.children]
    
    if(res === "Restart"){
        location.reload()
    } else {

    // Valor seleccionado. 
    const index = nodes.indexOf(ref);
    // Valor detectar mismo valor.
    
    if(squares[index] > 0){

    // Recorro todos los nodos.
    for (let i = 0; i < nodes.length; i++) {
        if (i === index) {
            nodes[i].classList.add("cross");
            nodes[i].classList.remove("square");
        }
    }
    // Guardando en el array los seleccionados.
    selectSquares.push(index)
    
    // El bucle que determina el movimiento del circulo
    while (checkValue) {
        // Guardo el numero random.
        let opposite = attack();
        // 
        if (selectSquares.length > 7) {
            checkValue = false
        } else {
        if (searchElement(selectSquares,opposite)) {
            selectSquares.push(opposite)
            nodes[opposite].classList.add("circle");
            nodes[opposite].classList.remove("square");
            checkValue = false;
            squares[opposite] = -1;
                    }
                }
            }
            squares[index] = 0;
        }
        let matriz = [squares.slice(0,3), squares.slice(3,6), squares.slice(6,9)]

        if(checkWinner(matriz) === 0){ 
            if(winsStorage === '0' || winsStorage === null){
                WINS++
                localStorage.setItem("winRounds", JSON.stringify(WINS));
                countPoints(WINS, win)
            } else {
                WINS++
                winsStorage = parseInt(winsStorage, 10) + WINS
                localStorage.setItem("winRounds", JSON.stringify(winsStorage));
                countPoints(winsStorage, win)
            }
            alert("Ganaste")

            setTimeout(function(){ 
                location.reload()
            }, 
        1000); 
        }
        else if (checkWinner(matriz) === -1) {

            if(losesStorage === '0' || losesStorage === null){
                LOSES++
                localStorage.setItem("loseRounds", JSON.stringify(LOSES));
                countPoints(LOSES, lose)
            }else{
                LOSES++
                losesStorage = parseInt(losesStorage, 10) + LOSES
                localStorage.setItem("loseRounds", JSON.stringify(losesStorage));
                countPoints(losesStorage, lose)
            }
            alert("PERDISTE") 
            
            setTimeout(function(){ 
                location.reload()
            }, 
        1000);   
    
    }
        
        if (selectSquares.length === 9 ) {
            if(typeof checkWinner(matriz) === "undefined") {
                alert("Empate");

                setTimeout(function(){ 
                    location.reload()
                }, 
            1000); 
            }
        }
        }
    }




function attack () {
    return Math.floor((Math.random() * (8 - 1 + 1)) + 1);
}




squares.forEach((item) => {
    valors.innerHTML += `
    <div class="square" ref=${item} onclick="process(this)"></div>
`
})



function restartMatch (ref:any) {
    process(ref, "Restart")
}


function restartGlobalScore (ref:any) {
    localStorage.setItem("loseRounds", JSON.stringify(null));
    localStorage.setItem("winRounds", JSON.stringify(null));
    setTimeout(function(){ 
        location.reload()
    }, 
1000); 
}



