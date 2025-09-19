// Función para simular entrega de pedidos
function entregarPedido(pedido, tiempo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✅ ${pedido} servido`);
    }, tiempo);
  });
}

// Mostrar menú al presionar el botón
document.getElementById("verMenuBtn").addEventListener("click", () => {
  document.getElementById("menu").classList.remove("oculto");
});

// Realizar pedido
document.getElementById("realizarPedidoBtn").addEventListener("click", () => {
  const bebida = document.querySelector('input[name="bebida"]:checked');
  const comida = document.querySelector('input[name="comida"]:checked');
  const postre = document.querySelector('input[name="postre"]:checked');
  const resultado = document.getElementById("resultado");

  if (!bebida || !comida || !postre) {
    resultado.innerHTML = "⚠️ Por favor selecciona una bebida, comida y postre.";
    return;
  }

  resultado.innerHTML = "⏳ Preparando tu pedido...";

  entregarPedido(`Bebida: ${bebida.value}`, 2000)
    .then((res) => {
      resultado.innerHTML = res;
      return entregarPedido(`Comida: ${comida.value}`, 3000);
    })
    .then((res) => {
      resultado.innerHTML += `<br>${res}`;
      return entregarPedido(`Postre: ${postre.value}`, 1500);
    })
    .then((res) => {
      resultado.innerHTML += `<br>${res}`;
      resultado.innerHTML += `<br>🎉 ¡Todos tus pedidos han sido entregados!`;
    });
});