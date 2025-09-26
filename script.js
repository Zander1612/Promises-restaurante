// Botones y div de resultado
const verMenuBtn = document.getElementById('verMenuBtn');
const menu = document.getElementById('menu');
const realizarPedidoBtn = document.getElementById('realizarPedidoBtn');
const resultado = document.getElementById('resultado');

// Mostrar/ocultar menú
verMenuBtn.addEventListener('click', () => {
  menu.classList.toggle('oculto');
});

// Función que obtiene las selecciones del cliente
function obtenerPedido() {
  const bebida = document.querySelector('input[name="bebida"]:checked')?.value;
  const comida = document.querySelector('input[name="comida"]:checked')?.value;
  const postre = document.querySelector('input[name="postre"]:checked')?.value;

  if (!bebida || !comida || !postre) {
    return null;
  }

  return { bebida, comida, postre };
}

// Promesa para "ordenar" el pedido
function ordenarProducto(pedido) {
  return new Promise((resolve, reject) => {
    console.log(`Ordenando: ${pedido.bebida}, ${pedido.comida}, ${pedido.postre}`);
    setTimeout(() => {
      if (Math.random() < 0.7) { // 30% éxito
        resolve(`Pedido confirmado: Bebida - ${pedido.bebida}, Comida - ${pedido.comida}, Postre - ${pedido.postre}`);
      } else {
        reject('❌ Ocurrio un error, la orden fue cancelada.');
      }
    }, 2000);
  });
}

// Promesa para "procesar" el pedido
function procesarPedido(respuesta) {
  return new Promise((resolve) => {
    console.log('Procesando pedido...');
    console.log(`Detalles recibidos: ${respuesta}`);
    setTimeout(() => {
      resolve('✅ Gracias por tu compra. ¡Disfruta tu pedido!');
    }, 2000);
  });
}

// Función async que realiza el pedido completo
async function realizarPedido() {
  const pedido = obtenerPedido();
  if (!pedido) {
    resultado.textContent = '⚠️ Debes seleccionar bebida, comida y postre.';
    return;
  }

  resultado.textContent = '⏳ Procesando pedido...';
  try {
    const respuesta = await ordenarProducto(pedido);
    console.log('Respuesta recibida');
    const respuestaProcesada = await procesarPedido(respuesta);
    resultado.textContent = respuestaProcesada;
  } catch (error) {
    resultado.textContent = error;
  }
}

// Conectar botón con la función
realizarPedidoBtn.addEventListener('click', realizarPedido);