// add pontuaçao e hanking
window.onload = function() {
  const bouttons = document.querySelectorAll('button')

  const stage = document.querySelector('#stage')
  const ctx = stage.getContext('2d')//dentro do ctx é gerada toda a parte grafica
  document.addEventListener('keydown', keyPush)
 
  setInterval(game, 100); // taxa de att do game()
  const vel = 1

  var vx = vy = 0 // vel xy
  var px = 10 // pos x
  var py = 15 // pos y
  var tp = 20 // tamanho peças (tabuleiro)
  var qp = 20 // quantidade de peças (tabuleiro)
  var ax = ay = 15 // apple xy
  
  var trail = [] // = rastro
  tail = 5 // tamanho da cauda



  function game() {
    px += vx
    py += vy

    if (px < 0) {
      px = qp-1
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

    // ctx.fillStyle = 'green'
    // ctx.fillRect(px*py)
    


    ctx.fillStyle = 'black'// fundo
    ctx.fillRect(0,0, stage.width , stage.height)

    ctx.fillStyle =  ' rgb(7, 252, 7)' // maçã 
    ctx.fillRect(ax*tp , ay*tp, tp, tp)

    for (var i = 0; i < trail.length; i++) {      
      ctx.fillStyle = 'rgb(224, 148, 49)'// snake
      ctx.fillRect(trail[i].x*tp , trail[i].y*tp, tp, tp)  
      ctx.fillStyle = 'rgb(160, 100, 39)'// snake   
      ctx.fillRect(trail[trail.length-1].x*tp , trail[trail.length-1].y*tp, tp, tp)
   

      if (trail[0].x == px && trail[0].y == py)
      {
        vx = vy = 0
        tail = 5
      }      
    }
    trail.push( { x:px , y:py } )
    while (trail.length > tail) {
      trail.shift()
    }

    if (ax==px && ay==py){
      tail++
      ax = Math.floor(Math.random()* qp)
      ay = Math.floor(Math.random()* qp)
    }
  }


  function keyPush(event) {
    switch (event.keyCode) {// →↓↑←
      case 37||65: //left
        vx = -vel
        vy = 0
        break;
      case 38||87: //up
        vx = 0
        vy = -vel
        break;
      case 39||68: //right
        vx = vel
        vy = 0
        break;
      case 40||83: //down
        vx = 0
        vy = vel
        break;
    
      default:
        break;
    }
    switch (event.keyCode) {// WASD
      case 65: //left
        vx = -vel
        vy = 0
        break;
      case 87: //up
        vx = 0
        vy = -vel
        break;
      case 68: //right
        vx = vel
        vy = 0
        break;
      case 83: //down
        vx = 0
        vy = vel
        break;
    
      default:
        break;
    }
  }

  bouttons.forEach(btn => {
    btn.addEventListener('click', ()=> {
      switch (btn.innerHTML) {// WASD
        case '←': //left
          vx = -vel
          vy = 0
          break;
        case '↑': //up
          vx = 0
          vy = -vel
          break;
        case '→': //right
          vx = vel
          vy = 0
          break;
        case '↓': //down
          vx = 0
          vy = vel
          break;
      
        default:
          break;
      }
    })
  })










}