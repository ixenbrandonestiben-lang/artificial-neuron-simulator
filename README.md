#  Simulador Interactivo de Neurona Artificial

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

Una experiencia web interactiva diseñada para visualizar y comprender, paso a paso, el flujo de cálculo (*forward pass*) de una neurona artificial. Este proyecto traduce la fórmula matemática $y = f(x \cdot w + b)$ en una interfaz inmersiva, permitiendo a estudiantes, entusiastas y reclutadores observar cómo una entrada ($x$) se transforma en una salida ($y$) a través de la ponderación, el sesgo y la función de activación.

---

##  Características Principales

- **Controles interactivos en tiempo real:** Ajuste dinámico de la entrada ($x$), peso ($w$) y sesgo ($b$) mediante sliders e inputs numéricos perfectamente sincronizados.
- **Comparación de funciones de activación:** Selector intuitivo para alternar entre ReLU y Sigmoide, observando el impacto inmediato en el resultado.
- **Modo de animación guiada:** Secuencia paso a paso que ilumina el flujo de datos, actualiza las fórmulas numéricas y explica la operación en lenguaje sencillo y didáctico.
- **Arquitectura modular y limpia:** Código estrictamente separado por responsabilidades (lógica matemática, manipulación del DOM y control de eventos) utilizando JavaScript ES Modules nativos.
- **Diseño inmersivo y responsivo:** Interfaz oscura moderna, tipografía legible con números tabulares, animaciones CSS optimizadas (GPU-accelerated) y adaptación completa a dispositivos móviles.

----
## Estructura del Proyecto

El proyecto sigue una arquitectura escalable, evitando la mezcla de lógica y presentación. 

```text
simulador-neurona/
│
├── index.html              # Estructura semántica principal y puntos de anclaje del DOM (data-attributes).
├── styles.css              # Estilos globales, variables CSS (:root), layout (Grid/Flex) y keyframes.
│
├── js/
│   ├── main.js             # Punto de entrada. Orquesta eventos, sincroniza controles e inicializa la app.
│   ├── neuronAnimator.js   # Responsable de la manipulación del DOM, estados visuales y secuencias de animación.
│   └── neuronMath.js       # Lógica pura de negocio: cálculos matemáticos y generación de texto explicativo.
│                           <!-- Ajustar nombre si tu archivo de lógica matemática tiene otra denominación -->
│
└── README.md               # Documentación del proyecto (este archivo).
```

---

## Instalación

Este proyecto es 100% estático y **no requiere instalación de dependencias** (no hay `package.json`, ni `npm install`, ni frameworks pesados). 

Para obtener el código en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/simulador-neurona.git
   ```
2. Accede a la carpeta del proyecto:
   ```bash
   cd simulador-neurona
   ```
*(Alternativamente, puedes descargar el código directamente como archivo ZIP desde GitHub y extraerlo).*

---

## Ejecución y Pruebas

 **Importante:** Debido al uso de JavaScript ES Modules (`<script type="module">`), los navegadores modernos bloquearán la carga de los archivos `.js` por políticas de seguridad (CORS) si intentas abrir `index.html` directamente con doble clic (protocolo `file://`). **Es necesario servir los archivos a través de un servidor local.**

### Opción 1: Visual Studio Code (Recomendada)
1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

### Opción 2: Python (Si lo tienes instalado)
Abre tu terminal en la raíz del proyecto y ejecuta:
```bash
python -m http.server 8000
```
Luego, abre tu navegador en: `http://localhost:8000`

### Opción 3: Node.js (Sin instalación global)
Ejecuta este comando en la terminal dentro de la carpeta del proyecto:
```bash
npx http-server -p 8000
```
Luego, abre tu navegador en: `http://localhost:8000`

### Guía rápida de prueba
Una vez ejecutado, te sugiero probar el simulador en este orden:
1. **Modo en vivo:** Mueve el slider de "Peso" o "Sesgo" y observa cómo los valores y el panel inferior se actualizan instantáneamente.
2. **Cambio de contexto:** Alterna entre las funciones de activación "ReLU" y "Sigmoide" para ver cómo cambia drásticamente la salida con los mismos parámetros.
3. **Modo animación:** Desactiva la casilla "Actualización en vivo" (opcional), ajusta los valores a tu gusto y pulsa el botón **"Animar cálculo paso a paso"**. Observa cómo el flujo de datos se ilumina secuencialmente.

---

##  Alcance y Próximos Pasos

- **Alcance actual:** El proyecto se centra en la simulación precisa, visual y educativa de una **neurona artificial de entrada única**, priorizando la calidad del código frontend y la experiencia de usuario.
- **Próximos pasos (Roadmap):**
  - Implementar soporte para múltiples entradas ($x_1, x_2, ..., x_n$) y visualización de una capa densa (*dense layer*).
  - Añadir un gráfico interactivo (ej. con Canvas nativo o una librería ligera) que dibuje la curva de la función de activación y marque el punto de cálculo actual.
  - Incorporar pruebas unitarias (con Jest o Vitest) para el módulo `neuronMath.js`, garantizando la integridad de los cálculos matemáticos.

---

## Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de estudiarlo, modificarlo o utilizarlo como referencia para fines educativos y de portafolio.

---

> **Desarrollado con ❤️ como pieza de portafolio de ingeniería frontend.**  
> ¿Tienes preguntas, sugerencias o te gustaría discutir sobre la arquitectura del proyecto? ¡Conectemos!  
> [LinkedIn](#) | [GitHub](#) | [Portafolio Web](#)