/**
 * ============================================================
 * neuronAnimator.js
 * ------------------------------------------------------------
 * Módulo responsable de actualizar la interfaz y ejecutar
 * la animación paso a paso del flujo de cálculo.
 * ============================================================
 */

import {
  computeNeuronForward,
  formatNumber,
  generateExplanation,
} from './neuronMath.js';

// Referencias al DOM (adaptadas al nuevo diseño HTML)
const elements = {
  cards: {
    input: document.querySelector('.stage-card[data-step="input"]'),
    multiply: document.querySelector('.stage-card[data-step="multiply"]'),
    sum: document.querySelector('.stage-card[data-step="sum"]'),
    activation: document.querySelector('.stage-card[data-step="activation"]'),
    output: document.querySelector('.stage-card[data-step="output"]'),
  },
  values: {
    input: document.querySelector('[data-value="input"]'),
    multiply: document.querySelector('[data-value="multiply"]'),
    sum: document.querySelector('[data-value="sum"]'),
    activation: document.querySelector('[data-value="activation"]'),
    output: document.querySelector('[data-value="output"]'),
  },
  connectors: {
    1: document.querySelector('[data-connector="1"]'),
    2: document.querySelector('[data-connector="2"]'),
    3: document.querySelector('[data-connector="3"]'),
    4: document.querySelector('[data-connector="4"]'),
  },
  formulaSymbolic: document.querySelector('[data-formula="symbolic"]'),
  formulaNumeric: document.querySelector('[data-formula="numeric"]'),
  interpretation: document.querySelector('[data-interpretation]'),
  expSteps: {
    input: document.querySelector('.explanation-step[data-step="input"]'),
    multiply: document.querySelector('.explanation-step[data-step="multiply"]'),
    sum: document.querySelector('.explanation-step[data-step="sum"]'),
    activation: document.querySelector('.explanation-step[data-step="activation"]'),
    output: document.querySelector('.explanation-step[data-step="output"]'),
  },
  neuronCore: document.getElementById('neuronCore'),
};

const STEP_DURATION_MS = 900;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resetVisualState() {
  Object.values(elements.cards).forEach((card) => {
    if (card) {
      card.classList.remove('active', 'complete');
      const val = card.querySelector('.stage-value');
      if (val) val.classList.remove('updating');
    }
  });
  Object.values(elements.connectors).forEach((connector) => {
    if (connector) connector.classList.remove('active');
  });
  Object.values(elements.expSteps).forEach((step) => {
    if (step) step.classList.remove('active');
  });
  if (elements.neuronCore) {
    elements.neuronCore.classList.remove('active');
  }
}

function activateNode(stepName) {
  if (elements.cards[stepName]) {
    elements.cards[stepName].classList.add('active');
    const valEl = elements.cards[stepName].querySelector('.stage-value');
    if (valEl) {
      valEl.classList.remove('updating');
      void valEl.offsetWidth; // Forzar reflow para reiniciar animación CSS
      valEl.classList.add('updating');
    }
  }
  if (elements.expSteps[stepName]) {
    elements.expSteps[stepName].classList.add('active');
  }
  if (stepName === 'activation' && elements.neuronCore) {
    elements.neuronCore.classList.add('active');
  }
}

function completeNode(stepName) {
  if (elements.cards[stepName]) {
    elements.cards[stepName].classList.remove('active');
    elements.cards[stepName].classList.add('complete');
  }
}

function activateConnector(connectorIndex) {
  if (elements.connectors[connectorIndex]) {
    elements.connectors[connectorIndex].classList.add('active');
  }
}

function updateNodeValue(valueKey, value) {
  const formatted = formatNumber(value);
  if (elements.values[valueKey]) {
    elements.values[valueKey].textContent = formatted;
  }
  // Actualizar también el valor grande de la tarjeta
  const card = Object.values(elements.cards).find(c => c && c.querySelector(`[data-value="${valueKey}"]`));
  if (card) {
    const stageVal = card.querySelector('.stage-value');
    if (stageVal) stageVal.textContent = formatted;
  }
}

function updateNumericFormula(text) {
  if (elements.formulaNumeric) {
    elements.formulaNumeric.textContent = text;
  }
}

function updateInterpretation(text) {
  if (elements.interpretation) {
    elements.interpretation.textContent = text;
  }
}

export function renderLiveComputation(inputValue, weight, bias, activationFunction) {
  resetVisualState();

  const result = computeNeuronForward(inputValue, weight, bias, activationFunction);

  updateNodeValue('input', inputValue);
  updateNodeValue('multiply', result.weightedInput);
  updateNodeValue('sum', result.z);
  updateNodeValue('activation', result.output);
  updateNodeValue('output', result.output);

  const activationName = activationFunction === 'relu' ? 'ReLU' : 'Sigmoide';
  updateNumericFormula(
    `${activationName}(${formatNumber(inputValue)} · ${formatNumber(weight)} + ${formatNumber(bias)}) = ${formatNumber(result.output)}`
  );

  const explanation = generateExplanation(inputValue, weight, bias, activationFunction, result);
  updateInterpretation(explanation);
  
  // En modo vivo, marcar todo como completado para mostrar el flujo resuelto
  Object.values(elements.cards).forEach(card => {
    if (card) card.classList.add('complete');
  });
  Object.values(elements.connectors).forEach(conn => {
    if (conn) conn.classList.add('active');
  });
}

export async function animateCalculationStepByStep(inputValue, weight, bias, activationFunction) {
  resetVisualState();

  const result = computeNeuronForward(inputValue, weight, bias, activationFunction);
  const activationName = activationFunction === 'relu' ? 'ReLU' : 'Sigmoide';

  // --- Paso 1: Entrada ---
  activateNode('input');
  updateNodeValue('input', inputValue);
  updateNumericFormula(`x = ${formatNumber(inputValue)}`);
  updateInterpretation('Paso 1: la neurona recibe la señal de entrada x.');
  await wait(STEP_DURATION_MS);
  completeNode('input');
  activateConnector(1);

  // --- Paso 2: Multiplicación ---
  activateNode('multiply');
  updateNodeValue('multiply', result.weightedInput);
  updateNumericFormula(
    `x · w = ${formatNumber(inputValue)} · ${formatNumber(weight)} = ${formatNumber(result.weightedInput)}`
  );
  updateInterpretation(
    `Paso 2: la entrada se multiplica por el peso. El peso (${formatNumber(weight)}) ${
      weight < 0 ? 'invierte y escala' : 'escala'
    } la señal.`
  );
  await wait(STEP_DURATION_MS);
  completeNode('multiply');
  activateConnector(2);

  // --- Paso 3: Suma con sesgo ---
  activateNode('sum');
  updateNodeValue('sum', result.z);
  updateNumericFormula(
    `(x · w) + b = ${formatNumber(result.weightedInput)} + ${formatNumber(bias)} = ${formatNumber(result.z)}`
  );
  updateInterpretation(
    `Paso 3: sumamos el sesgo (${formatNumber(bias)}) para desplazar la señal. Obtenemos z = ${formatNumber(result.z)}.`
  );
  await wait(STEP_DURATION_MS);
  completeNode('sum');
  activateConnector(3);

  // --- Paso 4: Función de activación ---
  activateNode('activation');
  updateNodeValue('activation', result.output);
  updateNumericFormula(
    `${activationName}(${formatNumber(result.z)}) = ${formatNumber(result.output)}`
  );
  const activationExplanation =
    activationFunction === 'relu'
      ? `Paso 4: ReLU devuelve max(0, z). ${
          result.z < 0 ? 'Como z es negativo, la salida se silencia a 0.' : 'Como z es positivo, pasa tal cual.'
        }`
      : `Paso 4: la Sigmoide comprime z en el rango (0, 1), obteniendo ${formatNumber(result.output)}.`;
  updateInterpretation(activationExplanation);
  await wait(STEP_DURATION_MS);
  completeNode('activation');
  activateConnector(4);

  // --- Paso 5: Salida ---
  activateNode('output');
  updateNodeValue('output', result.output);
  updateNumericFormula(`y = ${formatNumber(result.output)}`);
  const finalExplanation = generateExplanation(inputValue, weight, bias, activationFunction, result);
  updateInterpretation(`Paso 5: la neurona emite su salida final. ${finalExplanation}`);
  await wait(STEP_DURATION_MS);
  completeNode('output');
  
  // Apagar el núcleo de la neurona al finalizar
  if (elements.neuronCore) elements.neuronCore.classList.remove('active');
}