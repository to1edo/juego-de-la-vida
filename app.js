let filas = 20
let columnas = 20
let interval
let gridPrevia

const grid = document.getElementById('grid')
const resetBtn = document.querySelector('.reset')
const iniciarBtn = document.querySelector('.iniciar')
const filasInput = document.getElementById('filas')
const columnasInput = document.getElementById('columnas')

filasInput.value = filas
columnasInput.value = columnas

// eventListener
grid.addEventListener('mousedown', (e)=>{
  if(e.target.localName === 'li'){
    e.target.classList.add('viva')
    document.addEventListener('mousemove', onMouseMove);
  }
})

resetBtn.addEventListener('click', ()=>{
  reiniciarJuego()
})

iniciarBtn.addEventListener('click', ()=>{
  iniciarBtn.disabled = true
  celdaVivas()

  interval = setInterval(() => {
    cambiarEstado()
  }, 100);

})

filasInput.addEventListener('input',(e)=>{
  filas = parseInt(e.target.value)
  reiniciarJuego()
})

columnasInput.addEventListener('input',(e)=>{
  columnas = parseInt(e.target.value)
  reiniciarJuego()
})



// funciones
function crearGrid(){
  for (let i = 0; i < filas; i++) {
    const row = document.createElement('ul')
    row.className = 'fila'
    for (let j = 0; j < columnas; j++) {
      const celda = document.createElement('li')
      celda.id = `[${i},${j}]`
      celda.className = 'celda'
      row.appendChild(celda)
    }
    grid.appendChild(row)
  }
}  
crearGrid()

function celdaVivas(){
  gridPrevia = []
  for (let i = 0; i < filas; i++) {
    gridPrevia.push([])
    for (let j = 0; j < columnas; j++) {
      gridPrevia[i][j] = document.getElementById(`[${i},${j}]`).classList.contains('viva')
    }
  }
}

function contarVecinosVivos(x,y) {
  let vecinosVivos = 0
  //revisar vecinos de la celda actual
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      
      if (i== 0 && j==0) {
        continue
      }

      try {
        if(gridPrevia[x+i][y+j]) vecinosVivos++
      } catch (error) {
      }
      
    }
  }
  return vecinosVivos
}

function cambiarEstado(){
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const vecinos = contarVecinosVivos(i,j)

      if(vecinos<2 || vecinos >3){
        document.getElementById(`[${i},${j}]`).classList.remove('viva')
      }


      if(document.getElementById(`[${i},${j}]`).classList.contains('viva')){
        if(vecinos>=2 && vecinos <=3){
          document.getElementById(`[${i},${j}]`).classList.add('viva')
        }
      }else{
        if(vecinos === 3){
          document.getElementById(`[${i},${j}]`).classList.add('viva')
        }
      }
    }
  }
  celdaVivas()
}

function reiniciarJuego(){
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  crearGrid()
  celdaVivas()

  if(interval)clearInterval(interval);
  iniciarBtn.disabled = false
}

function onMouseMove(e) {
  if (e.buttons === 1) {
    e.target.classList.add('viva')
  } else {
    document.removeEventListener('mousemove', onMouseMove);
  }
}