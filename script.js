const listaLi = document.querySelectorAll('.box .itens');
const mensagem = document.querySelector('.vencedor');
let jogador = "X";
let finalizar = false;
let jogadas = 0


listaLi.forEach((li, i) => {
  li.addEventListener("click", function () {
    if (finalizar || li.innerHTML !== "") {
      return;
    }

    li.innerHTML = jogador;

    li.style.color = jogador === "X" ? "red" : "blue";
    li.style.fontSize = "50px";
    li.style.fontFamily = "'Montserrat', sans-serif, Open Sans";
    li.style.backgroundColor = "rgb(143, 247, 143)";
    atualizarBlocos(i, jogador);
    jogador = jogador === "X" ? "O" : "X";
    vencedor();
    jogadas++
    if(jogador === "X"){
      mensagem.innerHTML = `Vez do jogador  <span style="color: red;">X</span>`
      mensagem.style.color= "black"
      
      
    }
    if(jogador === "O"){
      mensagem.innerHTML = 'Vez do jogador  <span style="color: blue;">O</span>'
      mensagem.style.color= "black"
    }
    if (jogadas === 15) {
      mensagem.innerHTML = "Empate!";
      mensagem.style.color= "black"
    }
  });
});

//reiniciar partida
const bt = document.querySelector('.bt input');
bt.addEventListener("click", function () {
  listaLi.forEach((listaLi, i) => {
    listaLi.innerHTML = "";
    listaLi.style.backgroundColor = "";
    atualizarBlocos(i, "");
    mensagem.innerHTML = "";
    jogadas = 0
    finalizar = false; // Reseta a variável ao reiniciar o jogo
  });
});

let blocos = [
  ['', '', '' , '' , '' ],
  ['', '', '' , '' , '' ],
  ['', '', '' , '' , '' ],
  ['', '', '' , '' , '' ],
  ['', '', '' , '' , '' ]
];

function atualizarBlocos(i, valor) {
  const linha = Math.floor(i / 3);
  const coluna = i % 3;
  blocos[linha][coluna] = valor;
}

//verificar o vencedor da partida
//ajustar
function vencedor(){

  const combinacaoes = [

    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ]
  
  for ( let comb of combinacaoes){
    const [a,b,c , d , e] = comb

    if (
      blocos[a[0]][a[1]] !== '' &&
      blocos[a[0]][a[1]] === blocos[b[0]][b[1]] &&
      blocos[a[0]][a[1]] === blocos[c[0]][c[1]]
    ) {
      setTimeout(() => {
       mensagem.innerHTML = `${ blocos[a[0]][a[1]]} --- ganhou!\u{1F603} 	\u{1F389}`
       finalizar=true
        
      
       if(blocos[a[0]][a[1]] === "X")(
         mensagem.style.color="red"
         
       )
       else{
        mensagem.style.color = "blue"
       }
      }, 300);
      
      break
    }
  }
  }







