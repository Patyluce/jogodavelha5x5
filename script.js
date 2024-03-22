const listaLi = document.querySelectorAll('.box .itens');
const mensagem = document.querySelector('.vencedor');
let jogador = "X";
let finalizar = false;
let jogadas = 0;

listaLi.forEach((li, i) => {
    li.addEventListener("click", function () {
        if (finalizar || li.innerHTML !== "") {
            return
        }

        li.innerHTML = jogador;

        li.style.color = jogador === "X" ? "red" : "blue"
        li.style.fontSize = "50px"
        li.style.fontFamily = "'Montserrat', sans-serif, Open Sans"
        li.style.backgroundColor = "rgb(143, 247, 143)"
        atualizarBlocos(i, jogador)
        jogador = jogador === "X" ? "O" : "X"
        mudarTamanho()
       // vencedor()
        jogadas++
         jogador = jogador === "O" ? "O" : "X"
 
         if (jogadas === 25) {
             mensagem.innerHTML = "Empate!";
         } else {
             let vencedorJogo = vencedor();
             if (vencedorJogo !== '') {
                 mensagem.innerHTML = `O jogador <span style="color: ${vencedorJogo === 'X' ? 'red' : 'blue'};">${vencedorJogo}</span> venceu!`;
                 finalizar = true;
             }

        else if (jogador === "X") {
            mensagem.innerHTML = `Vez do jogador <span style="color: red;">X</span>`;
            mensagem.style.color = "black";
        }
        else if (jogador === "O") {
            mensagem.innerHTML = `Vez do jogador <span style="color: blue;">O</span>`;
            mensagem.style.color = "black";
        }
    }
    });
});

// Reiniciar partida
const bt = document.querySelector('.bt input')
bt.addEventListener("click", function () {
    listaLi.forEach((listaLi, i) => {
        listaLi.innerHTML = ""
        listaLi.style.backgroundColor = ""
        atualizarBlocos(i, "")
        mensagem.innerHTML = ""
        jogadas = 0
        finalizar = false // Reseta a variável ao reiniciar o jogo
    })
})

let blocos = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

function atualizarBlocos(i, valor) {
    const linha = Math.floor(i / 5)
    const coluna = i % 5
    blocos[linha][coluna] = valor
}

// Verificar o vencedor da partida
function vencedor() {
    // Verificar linhas
    for (let i = 0; i < 5; i++) {
        if (blocos[i][0] !== '' &&
            blocos[i][0] === blocos[i][1] &&
            blocos[i][0] === blocos[i][2] &&
            blocos[i][0] === blocos[i][3] &&
            blocos[i][0] === blocos[i][4]) {
            return   blocos[i][0] // Retorna o símbolo do vencedor
        }
    }

    // Verificar colunas
    for (let j = 0; j < 5; j++) {
        if (blocos[0][j] !== '' &&
            blocos[0][j] === blocos[1][j] &&
            blocos[0][j] === blocos[2][j] &&
            blocos[0][j] === blocos[3][j] &&
            blocos[0][j] === blocos[4][j]) {
            return  blocos[0][j] // Retorna o símbolo do vencedor
        }
    }

    // Verificar diagonal principal
    if (blocos[0][0] !== '' &&
        blocos[0][0] === blocos[1][1] &&
        blocos[0][0] === blocos[2][2] &&
        blocos[0][0] === blocos[3][3] &&
        blocos[0][0] === blocos[4][4]) {
        return blocos[0][0] // Retorna o símbolo do vencedor
        }
    // Verificar diagonal secundária
    if (blocos[0][4] !== '' &&
        blocos[0][4] === blocos[1][3] &&
        blocos[0][4] === blocos[2][2] &&
        blocos[0][4] === blocos[3][1] &&
        blocos[0][4] === blocos[4][0]) {
        return blocos[0][4] // Retorna o símbolo do vencedor
    }

    // Se não houver vencedor
    return '' // Retorna vazio se não houver vencedor
}

// Muda o tamanho da fonte do li quando a tela for menor
function mudarTamanho() {
    listaLi.forEach((li) => {
        if (window.matchMedia("(max-width: 800px)").matches) {
            li.style.fontSize = "40px"
        } else {
            li.style.fontSize = "50px"
        }
    })
}

window.addEventListener("resize", mudarTamanho)
