// add pontuaçao e hanking
window.onload = function() {
  const bouttons = document.querySelectorAll('button')

  const stage = document.querySelector('#stage')
  if (stage.getContext) {
    var ctx = stage.getContext('2d');
  }  
  document.addEventListener('keydown', keyPush)
  setInterval(game, 50); // taxa de att do game()
  const vel = 0.5
  var vx = 0 // vel x
  var vy = -0.5 // vel y
  var px = 10 // pos x
  var py = 10 // pos y
  var pr = 14
  var tp = 20 // tamanho peças (tabuleiro)
  var qp = 20 // quantidade de peças (tabuleiro)
  var ax = 10 // apple xy
  var ay = 19 // apple xy
  var trail = [] // = rastro
  tail = 5 // tamanho da cauda

  function game() {
    px += vx
    py += vy
    if (px < 0) {// se pos x for menor que zero
      px = qp-1// entao atravessa o tabuleiro
    }
    if (px > qp-1) { // se cabeçao estiver em uyma pos > que o tamanho do tabuleiro
      px = 0
    }
    if (py < 0) {
      py = qp-1
    }
    if (py > qp-1) {
      py = 0
    }

    ctx.fillStyle = 'black'// fundo
    ctx.fillRect(0,0, stage.width , stage.height)

    ctx.fillStyle =  ' rgb(255, 255, 255)' // maçã 
    ctx.fillRect(ax*tp , ay*tp, tp, tp)
    var eat = new Image();
    eat.src = "../img.eat.png";
    eat.onload = function() {
      ctx.drawImage(eat, ax*tp-8 , ay*tp-6, 35, 35);
    }  


    for (var i = 0; i < trail.length; i++) {// iterar o rastro

      ctx.beginPath()
      ctx.arc(trail[i].x*tp+10 , trail[i].y*tp+10, pr, 0, 2*Math.PI)
      ctx.fillStyle = 'rgb(224, 148, 49)'
      ctx.fill()
      ctx.stroke()
      ctx.fillRect(trail[i].x*tp , trail[i].y*tp, tp, tp) 

      var imagem = new Image();
      imagem.src = "../img/imagem.png";
      // imagem.onload = function() {
      //   ctx.drawImage(imagem, trail[trail.length-1].x*tp-5 , trail[trail.length-1].y*tp-5, 30, 30);
      // }      
      
      // ctx.beginPath();// ROSTINHO DESENHADO
      // ctx.arc(trail[trail.length-1].x*tp+10 , trail[trail.length-1].y*tp+10, 10, 0, Math.PI * 2, true); // Círculo exterior
      // ctx.moveTo(trail[trail.length-1].x*tp+17 , trail[trail.length-1].y*tp+10);
      // ctx.arc(trail[trail.length-1].x*tp+10 , trail[trail.length-1].y*tp+10, 7, 0, Math.PI, false);  // Boca (sentido horário)
      // ctx.moveTo(trail[trail.length-1].x*tp+7 , trail[trail.length-1].y*tp+7);
      // ctx.arc(trail[trail.length-1].x*tp+6 , trail[trail.length-1].y*tp+7, 2, 0, Math.PI * 2, true);  // Olho esquerdo
      // ctx.moveTo(trail[trail.length-1].x*tp+16 , trail[trail.length-1].y*tp+7);      
      // ctx.arc(trail[trail.length-1].x*tp+15 , trail[trail.length-1].y*tp+7, 2, 0, Math.PI * 2, true);  // Olho direito
      // ctx.stroke()

      //MORREU
      if (trail[i].x == px && trail[i].y == py && tail != 5) {
        alert('POOOOXA!! VOCÊ MORREU... tente mais uma vez')
        vx = vy = 0
        px = py = 10
        tail = 5
      }      
    }

    trail.push( { x:px , y:py } )// CAMINHAR
    while (trail.length > tail) {
      trail.shift()// remove ultima casa do rastro
    }

    if (// se a comida e a cobra estiverem na mesma pos
      ax==px && ay==py ||
      ax==px && ay==py+0.5 ||// meio passo a direita
      ax==px && ay==py-0.5 ||// meio passo a esquerda
      ax==px-0.5 && ay==py ||// meio passo acima
      ax==px+0.5 && ay==py ||// meio passo abaixo

      ax==px && ay==py+1 ||// um passo a direita
      ax==px && ay==py-1 ||// um passo a esquerda
      ax==px-1 && ay==py ||// um passo acima
      ax==px+1 && ay==py// um passo abaixo
      ){ // se comer
      tail+= 2
      const x = y = Math.floor(Math.random()* qp)
      ax = x
      ay = y
    }
  }
// TORNAR UMA FUNCAO PURA  HEHEHE
  function keyPush(event) {
    switch (event.keyCode) {// →↓↑←
      case 37||65: //left
        if(vx == 0) {  
          vx = -vel
          vy = 0
        }
        break;
      case 38||87: //up
        if(vy == 0) {  
          vx = 0
          vy = -vel
        }
        break;
      case 39||68: //right
        if(vx == 0) {  
          vx = vel
          vy = 0
        }
        break;
      case 40||83: //down
        if(vy == 0) {  
          vx = 0
          vy = vel
        }
        break;
    
      default:
        break;
    }
    switch (event.keyCode) {// WASD
      case 65: //left
        if(vx == 0) {  
          vx = -vel
          vy = 0
        }
        break;
      case 87: //up
        if(vy == 0) {  
          vx = 0
          vy = -vel
        }
        break;
      case 68: //right
        if(vx == 0) {  
          vx = vel
          vy = 0
        }
        break;
      case 83: //down
        if(vy == 0) {  
          vx = 0
          vy = vel
        }
        break;
    
      default:
        break;
    }
  }

  bouttons.forEach(btn => {
    btn.addEventListener('click', ()=> {
      switch (btn.innerHTML) {// WASD
        case '←': //left
          if(vx == 0) {  
            vx = -vel
            vy = 0
          }
          break;
        case '↑': //up
          if(vy == 0) {  
            vx = 0
            vy = -vel
          }
          break;
        case '→': //right
          if(vx == 0) {  
            vx = vel
            vy = 0
          }
          break;
        case '↓': //down
          if(vy == 0) {  
            vx = 0
            vy = vel
          }
          break;
      
        default:
          break;
      }
    })
  })










}