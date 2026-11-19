/**
 * ============================================================
 * neuronMath.js
 * ------------------------------------------------------------
 * Módulo puro con toda la lógica matemática de la neurona.
 * NO manipula el DOM: solo recibe valores y devuelve resultados.
 * ============================================================
 */

/**
 * Multiplica la entrada por el peso.
 * @param {number} inputValue - Valor de entrada (x).
 * @param {number} weight - Peso sináptico (w).
 * @returns {number} Producto x · w.
 */
export function multiplyInputByWeight(inputValue, weight) {
  return inputValue * weight;
}

/**
 * Calcula la suma ponderada incluyendo el sesgo.
 * Fórmula: z = (x · w) + b
 * @param {number} weightedInput - Resultado de x · w.
 * @param {number} bias - Sesgo (b).
 * @returns {number} Valor pre-activación (z).
 */
export function calculateWeightedSum(weightedInput, bias) {
  return weightedInput + bias;
}

/**
 * Función de activación ReLU.
 * f(z) = max(0, z)
 * @param {number} z - Valor pre-activación.
 * @returns {number} Salida activada.
 */
export function applyReLU(z) {
  return Math.max(0, z);
}

/**
 * Función de activación Sigmoide.
 * f(z) = 1 / (1 + e^(-z))
 * @param {number} z - Valor pre-activación.
 * @returns {number} Salida en rango (0, 1).
 */
export function applySigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

/**
 * Aplica la función de activación seleccionada.
 * @param {number} z - Valor pre-activación.
 * @param {'relu'|'sigmoid'} functionName - Nombre de la función.
 * @returns {number} Salida de la neurona.
 */
export function applyActivationFunction(z, functionName) {
  switch (functionName) {
    case 'relu':
      return applyReLU(z);
    case 'sigmoid':
      return applySigmoid(z);
    default:
      throw new Error(`Función de activación desconocida: ${functionName}`);
  }
}

/**
 * Ejecuta el cálculo completo de la neurona en un solo paso.
 * @param {number} inputValue - Entrada x.
 * @param {number} weight - Peso w.
 * @param {number} bias - Sesgo b.
 * @param {'relu'|'sigmoid'} activationFunction - Función de activación.
 * @returns {{ weightedInput: number, z: number, output: number }}
 */
export function computeNeuronForward(inputValue, weight, bias, activationFunction) {
  const weightedInput = multiplyInputByWeight(inputValue, weight);
  const z = calculateWeightedSum(weightedInput, bias);
  const output = applyActivationFunction(z, activationFunction);
  return { weightedInput, z, output };
}

/**
 * Formatea un número para mostrarlo en la UI.
 * @param {number} value - Valor a formatear.
 * @param {number} [decimals=3] - Cantidad de decimales.
 * @returns {string} Texto formateado.
 */
export function formatNumber(value, decimals = 3) {
  if (!Number.isFinite(value)) return '—';
  return Number(value.toFixed(decimals)).toString();
}

/**
 * Genera una explicación didáctica en lenguaje natural
 * sobre lo que está ocurriendo con los valores actuales.
 * @param {number} inputValue
 * @param {number} weight
 * @param {number} bias
 * @param {'relu'|'sigmoid'} activationFunction
 * @param {{ weightedInput: number, z: number, output: number }} result
 * @returns {string} Texto explicativo.
 */
export function generateExplanation(inputValue, weight, bias, activationFunction, result) {
  const parts = [];

  // --- Análisis del peso ---
  if (weight < 0) {
    parts.push(`El peso negativo (${formatNumber(weight)}) invierte el signo de la entrada.`);
  } else if (weight === 0) {
    parts.push('El peso es cero: la entrada queda anulada, la neurona ignora la señal.');
  } else if (weight > 1) {
    parts.push(`El peso (${formatNumber(weight)}) amplifica la entrada.`);
  } else if (weight > 0 && weight < 1) {
    parts.push(`El peso (${formatNumber(weight)}) atenúa la entrada.`);
  } else {
    parts.push('El peso es 1: la entrada pasa sin modificarse.');
  }

  // --- Análisis del sesgo ---
  if (bias > 0) {
    parts.push(`El sesgo positivo (${formatNumber(bias)}) empuja la señal hacia arriba, facilitando la activación.`);
  } else if (bias < 0) {
    parts.push(`El sesgo negativo (${formatNumber(bias)}) reduce la señal, exigiendo una entrada mayor para activar.`);
  } else {
    parts.push('El sesgo es cero: no hay desplazamiento adicional.');
  }

  // --- Análisis de la activación ---
  if (activationFunction === 'relu') {
    if (result.z < 0) {
      parts.push(`Como z = ${formatNumber(result.z)} es negativo, ReLU silencia la neurona (salida = 0).`);
    } else {
      parts.push(`ReLU deja pasar el valor positivo: la neurona se activa con salida ${formatNumber(result.output)}.`);
    }
  } else if (activationFunction === 'sigmoid') {
    if (result.output > 0.9) {
      parts.push(`La sigmoide devuelve ${formatNumber(result.output)}, muy cerca de 1: la neurona está fuertemente activada.`);
    } else if (result.output < 0.1) {
      parts.push(`La sigmoide devuelve ${formatNumber(result.output)}, muy cerca de 0: la neurona está prácticamente apagada.`);
    } else {
      parts.push(`La sigmoide comprime el valor en el rango (0, 1), obteniendo ${formatNumber(result.output)}.`);
    }
  }

  return parts.join(' ');
}