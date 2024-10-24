const formulario = document.getElementById('formulario');
const alturaInput = document.getElementById('altura');
const pesoActualInput = document.getElementById('pesoActual');
const edadInput = document.getElementById('edad');
const sexoSelect = document.getElementById('sexo');
const nivelActividadSelect = document.getElementById('nivelActividad');
const calcularButton = document.getElementById('calcular');
const resultadoDiv = document.getElementById('resultado');

calcularButton.addEventListener('click', (e) => {
  e.preventDefault();
  const altura = parseFloat(alturaInput.value);
  const pesoActual = parseFloat(pesoActualInput.value);
  const edad = parseInt(edadInput.value);
  const sexo = sexoSelect.value;
  const nivelActividad = nivelActividadSelect.value;

  // Calcula peso ideal
  const pesoIdeal = calcularPesoIdeal(altura, sexo);

  // Calcula porcentaje de grasa corporal
  const porcentajeGrasa = calcularPorcentajeGrasa(pesoActual, altura);

  // Calcula tasa metabólica basal (TMB)
  const tmb = calcularTMB(edad, sexo, pesoActual, altura);

  // Calcula necesidad calorica
  const necesidadCalorica = calcularNecesidadCalorica(tmb, nivelActividad);

  resultadoDiv.innerHTML = `
    <h2>Resultados</h2>
    <p>Peso ideal: ${pesoIdeal.toFixed(2)} kg</p>
    <p>Porcentaje de grasa corporal: ${porcentajeGrasa.toFixed(2)}%</p>
    <p>Tasa metabólica basal (TMB): ${tmb.toFixed(2)} kcal/día</p>
    <p>Necesidad calorica diaria: ${necesidadCalorica.toFixed(2)} kcal/día</p>
  `;
});

// Función para calcular peso ideal
function calcularPesoIdeal(altura, sexo) {
  let pesoIdeal;
  if (sexo === 'hombre') {
    pesoIdeal = (altura - 100) - ((altura - 150) / 3);
  } else {
    pesoIdeal = (altura - 100) - ((altura - 150) / 3) + 0.9;
  }
  return pesoIdeal;
}

// Función para calcular porcentaje de grasa corporal
function calcularPorcentajeGrasa(pesoActual, altura) {
  const imc = pesoActual / (altura / 100) ** 2;
  let porcentajeGrasa;
  if (imc < 18.5) {
    porcentajeGrasa = 5;
  } else if (imc < 24.9) {
    porcentajeGrasa = 10;
  } else if (imc < 29.9) {
    porcentajeGrasa = 15;
  } else {
    porcentajeGrasa = 20;
  }
  return porcentajeGrasa;
}

// Función para calcular tasa metabólica basal (TMB)
function calcularTMB(edad, sexo, pesoActual, altura) {
  let tmb;
  if (sexo === 'hombre') {
    tmb = 66 + (13.7 * pesoActual) + (5 * altura) - (6.8 * edad);
  } else {
    tmb = 655 + (9.6 * pesoActual) + (1.8 * altura) - (4.7 * edad);
  }
  return tmb;
}

// Función para calcular necesidad calorica
function calcularNecesidadCalorica(tmb, nivelActividad) {
  let necesidadCalorica;
  switch (nivelActividad) {
    case 'sedentario':
      necesidadCalorica = tmb * 1.2;
      break;
    case 'ligero':
      necesidadCalorica = tmb * 1.375;
      break;
    case 'moderado':
      necesidadCalorica = tmb * 1.55;
      break;
    case 'alto':
      necesidadCalorica = tmb * 1.725;
      break;
  }
  return necesidadCalorica;
}