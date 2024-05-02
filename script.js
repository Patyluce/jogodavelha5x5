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
        finalizar = false
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
        for(let j = 0; j<3 ; j++){
        if (blocos[i][j] !== '' &&
            blocos[i][j] === blocos[i][j+1] &&
            blocos[i][j] === blocos[i][j+2]){
            return   blocos[i][j] // Retorna o símbolo do vencedor
        }
    }
    }
 
    // Verificar colunas
    for (let j = 0; j < 5; j++) {
        for(let i = 0; i<3; i++){
        if (blocos[i][j] !== '' &&
            blocos[i][j] === blocos[i+1][j] &&
            blocos[i][j] === blocos[i + 2][j] ) {
            return  blocos[i][j]
        }
    }
    }
 
    // Verificar diagonal principal
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if (blocos[i][j] !== '' &&
                blocos[i][j] === blocos[i + 1][j + 1] &&
                blocos[i][j] === blocos[i + 2][j + 2] ) {
                return blocos[i][j]
                }
            }
    }
    // Verificar diagonal secundária
    for(let j = 0; j<3; j++){
        for( let i = 0; i<3; i++){
    if (blocos[j][4-i] !== '' &&
        blocos[j][4-i] === blocos[j+1][3-i] &&
        blocos[j][4-i] === blocos[j+2][2-i]) {
        return blocos[j][4-i]
    }
}
    }
 
    return ''
}
 
// Muda o tamanho da fonte do li quando a tela for menor
function mudarTamanho() {
    listaLi.forEach((li) => {
        if (window.matchMedia("(max-width: 800px)").matches) {
            li.style.fontSize = "30px"
            li.style.display="flex"
            li.style.justifyContent="center"
            li.style.alignItems="center"
        } else {
            li.style.fontSize = "40px"
            li.style.display="flex"
            li.style.justifyContent="center"
            li.style.alignItems="center"
        }
    })
}
 
window.addEventListener("resize", mudarTamanho)
