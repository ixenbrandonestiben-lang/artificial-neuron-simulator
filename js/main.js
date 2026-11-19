/**
 * ============================================================
 * main.js
 * ------------------------------------------------------------
 * Punto de entrada de la aplicación.
 * Conecta los eventos del usuario con neuronMath y neuronAnimator.
 * ============================================================
 */

import {
  renderLiveComputation,
  animateCalculationStepByStep,
} from './neuronAnimator.js';

// --- Referencias a los controles ---
const controls = {
  inputSlider: document.getElementById('inputValueSlider'),
  inputNumber: document.getElementById('inputValueNumber'),
  weightSlider: document.getElementById('weightSlider'),
  weightNumber: document.getElementById('weightNumber'),
  biasSlider: document.getElementById('biasSlider'),
  biasNumber: document.getElementById('biasNumber'),
  activationFunction: document.getElementById('activationFunction'),
  liveModeToggle: document.getElementById('liveModeToggle'),
  animateButton: document.getElementById('animateButton'), // ID corregido
};

function readCurrentParameters() {
  return {
    inputValue: parseFloat(controls.inputNumber.value),
    weight: parseFloat(controls.weightNumber.value),
    bias: parseFloat(controls.biasNumber.value),
    activationFunction: controls.activationFunction.value,
    liveMode: controls.liveModeToggle.checked,
  };
}

function syncSliderAndNumber(slider, numberInput) {
  slider.addEventListener('input', () => {
    numberInput.value = slider.value;
    handleParametersChanged();
  });
  numberInput.addEventListener('input', () => {
    slider.value = numberInput.value;
    handleParametersChanged();
  });
}

function handleParametersChanged() {
  const params = readCurrentParameters();
  if (params.liveMode) {
    renderLiveComputation(
      params.inputValue,
      params.weight,
      params.bias,
      params.activationFunction
    );
  }
}

async function handleAnimateButtonClick() {
  const params = readCurrentParameters();
  setControlsEnabled(false);

  await animateCalculationStepByStep(
    params.inputValue,
    params.weight,
    params.bias,
    params.activationFunction
  );

  setControlsEnabled(true);
}

function setControlsEnabled(enabled) {
  controls.animateButton.disabled = !enabled;
  controls.inputSlider.disabled = !enabled;
  controls.inputNumber.disabled = !enabled;
  controls.weightSlider.disabled = !enabled;
  controls.weightNumber.disabled = !enabled;
  controls.biasSlider.disabled = !enabled;
  controls.biasNumber.disabled = !enabled;
  controls.activationFunction.disabled = !enabled;
}

function initializeApp() {
  syncSliderAndNumber(controls.inputSlider, controls.inputNumber);
  syncSliderAndNumber(controls.weightSlider, controls.weightNumber);
  syncSliderAndNumber(controls.biasSlider, controls.biasNumber);

  controls.activationFunction.addEventListener('change', handleParametersChanged);
  controls.liveModeToggle.addEventListener('change', handleParametersChanged);
  controls.animateButton.addEventListener('click', handleAnimateButtonClick);

  // Render inicial
  handleParametersChanged();
}

// Arranque
initializeApp();