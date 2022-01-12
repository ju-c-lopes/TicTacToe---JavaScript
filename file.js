var imgImpar = `<img id="imgx" src="x.webp" alt="X" width="100" height="100" />`;
var imgPar = `<img id="img0" src="0.webp" alt="0" width="100" height="100" />`;

var quadros = [
        {'0': false, j: 0},
        {'1': false, j: 0},
        {'2': false, j: 0},
        {'3': false, j: 0},
        {'4': false, j: 0},
        {'5': false, j: 0},
        {'6': false, j: 0},
        {'7': false, j: 0},
        {'8': false, j: 0}
    ];

var vitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

var ganhouP = 0;
var ganhouI = 0;
var casas = [];
var conta = 0;


function jogada(ident) {
    var n = ident.split("")[1] - 1;
    
    quadros[n][`${n}`] = true;
    
    for (q of quadros) {
        if (q[`${n}`] === true){
            conta++;
        }
    }

    var campo = document.getElementById(ident);
    
    if (conta % 2 === 0) {
        quadros[n][`j`] = 2;
        campo.innerHTML = imgPar;
        campo.removeAttribute('onclick');
    }
    else {
        quadros[n][`j`] = 1;
        campo.innerHTML = imgImpar;
        campo.removeAttribute('onclick');
    }
    verCasas(conta);
}


function verCasas(n) {
    if (n % 2 === 0) {
        jogadaPar();
    }
    else {
        jogadaImpar();
    }
}


function jogadaPar() {
    var att = '0.webp'
    for (var i = 0; i < vitoria.length; i++) {
        for (var j = 0; j < vitoria[i].length; j++){
            if ((quadros[vitoria[i][j]][`${vitoria[i][j]}`] === true) && (quadros[vitoria[i][j]][`j`] % 2 === 0)) {
                ganhouP++;
            }
        }
        casas.push(vitoria[i]);
        if (ganhouP === 3) {
            for (var v = 0; v < casas.length; v++) {
                for (var x = 0; x < casas[v].length; x++) {
                    if (document.querySelector(`#img0`).getAttribute('src') === att) {
                        document.getElementById(`d${casas[v][x] + 1}`).style.backgroundColor = '#303030';
                    }
                }
            }
            document.getElementById('msg').innerHTML = 
                `<p style="font-size: 30px;">Jogador <img src="0.webp" style="width: 30px"> ganhou!!!</p><br />
                <button style="background: #c0c0c0;padding: 5px" onclick="carregar()">Again</button>`;
            for (var c = 1; c < 10; c++) {
                document.getElementById(`d${c}`).removeAttribute('onclick');
            }
            ganhouI = 0;
            casas = [];
            break;
        } else {
            if (conta >= 9) {
                document.getElementById('msg').innerHTML = 
                    `<button style="background: #c0c0c0; width: 80px; padding: 5px" onclick="carregar()">Again</button>`;
            }
        }
        ganhouP = 0;
        casas = [];
    }
}


function jogadaImpar() {
    var att = 'x.webp'
    for (var i = 0; i < vitoria.length; i++) {
        for (var j = 0; j < vitoria[i].length; j++){
            if ((quadros[vitoria[i][j]][`${vitoria[i][j]}`] === true) && (quadros[vitoria[i][j]][`j`] % 2 !== 0)) {
                ganhouI++;
            }
        }
        casas.push(vitoria[i]);
        if (ganhouI === 3) {
            for (var v = 0; v < casas.length; v++) {
                for (var x = 0; x < casas[v].length; x++) {
                    if (document.querySelector(`#imgx`).getAttribute('src') === att) {
                        document.getElementById(`d${casas[v][x] + 1}`).style.backgroundColor = '#303030';
                    }
                }
            }
            document.getElementById('msg').innerHTML =
                `<p style="font-size: 30px;">Jogador <img src="x.webp" style="width: 30px"> ganhou!!!</p><br />
                <button style="background: #c0c0c0; padding: 5px" onclick="carregar()">Again</button>`;
            for (var c = 1; c < 10; c++) {
                document.getElementById(`d${c}`).removeAttribute('onclick');
            }
            ganhouI = 0;
            casas = [];
            break;
        } else {
            if (conta >= 9) {
                document.getElementById('msg').innerHTML = 
                    `<button style="background: #c0c0c0; width: 80px; padding: 5px" onclick="carregar()">Again</button>`;
            }
        }
        ganhouI = 0;
        casas = [];
    }
}


var ini = `
    <!--  JOGO DA VELHA -->
    <div class="game">
        <div id="d1" onclick="jogada('d1')" style="background-color: 'darkkhaki'"></div>
        <div id="d2" onclick="jogada('d2')" style="background-color: 'darkkhaki'"></div>
        <div id="d3" onclick="jogada('d3')" style="background-color: 'darkkhaki'"></div>
        <div id="d4" onclick="jogada('d4')" style="background-color: 'darkkhaki'"></div>
        <div id="d5" onclick="jogada('d5')" style="background-color: 'darkkhaki'"></div>
        <div id="d6" onclick="jogada('d6')" style="background-color: 'darkkhaki'"></div>
        <div id="d7" onclick="jogada('d7')" style="background-color: 'darkkhaki'"></div>
        <div id="d8" onclick="jogada('d8')" style="background-color: 'darkkhaki'"></div>
        <div id="d9" onclick="jogada('d9')" style="background-color: 'darkkhaki'"></div>
    </div><br /><br />
    <div id="msg"></div>
    <script src="file.js" async></script>
`;


function carregar() {
    document.getElementsByTagName('body')[0].innerHTML = ini;
    for (var c = 0; c < 9; c++) {
        quadros[c][`${c}`] = false;
        document.getElementById(`d${c + 1}`).removeAttribute('style');
    }
    ganhouP = 0;
    ganhouI = 0;
    conta = 0;
}
