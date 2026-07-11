function fmt(n) {
  if (!isFinite(n)) return "—";
  const rounded = Math.round((n + Number.EPSILON) * 10000) / 10000;
  return rounded.toString();
}

function readValue(id) {
  const el = document.getElementById(id);
  if (!el) return NaN;
  return parseFloat(el.value);
}

function showOutput(outputId, text, isError) {
  const el = document.getElementById(outputId);
  if (!el) return;
  el.classList.toggle("error", !!isError);
  el.innerHTML = text;
}

function bindCalc({ btnId, inputIds, outputId, formula, label, unit }) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  function run() {
    const values = inputIds.map(readValue);
    const missing = values.some((v) => Number.isNaN(v));
    if (missing) {
      showOutput(outputId, "Enter a number in every field.", true);
      return;
    }
    const negative = values.some((v) => v < 0);
    if (negative) {
      showOutput(outputId, "Measurements can't be negative.", true);
      return;
    }
    let result;
    try {
      result = formula(...values);
    } catch (e) {
      showOutput(outputId, "Couldn't calculate that.", true);
      return;
    }
    if (!isFinite(result)) {
      showOutput(outputId, "Couldn't calculate that.", true);
      return;
    }
    showOutput(
      outputId,
      `${label}: <span class="value">${fmt(result)}${unit ? " " + unit : ""}</span>`,
      false
    );
  }

  btn.addEventListener("click", run);
  inputIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          run();
        }
      });
    }
  });
}

const PI = Math.PI;

// Diameter page
bindCalc({ btnId: "diameter-solve", inputIds: ["diameter-radius"], outputId: "diameter-output", formula: (r) => 2 * r, label: "Diameter" });
bindCalc({ btnId: "radius-solve", inputIds: ["radius-diameter"], outputId: "radius-output", formula: (d) => d / 2, label: "Radius" });
bindCalc({ btnId: "circumference-solve", inputIds: ["circumference-radius"], outputId: "circumference-output", formula: (r) => 2 * PI * r, label: "Circumference" });

// Area page
bindCalc({ btnId: "rect-area-solve", inputIds: ["rect-area-l", "rect-area-w"], outputId: "rect-area-output", formula: (l, w) => l * w, label: "Area" });
bindCalc({ btnId: "square-area-solve", inputIds: ["square-area-s"], outputId: "square-area-output", formula: (s) => s * s, label: "Area" });
bindCalc({ btnId: "triangle-area-solve", inputIds: ["triangle-area-b", "triangle-area-h"], outputId: "triangle-area-output", formula: (b, h) => 0.5 * b * h, label: "Area" });
bindCalc({ btnId: "circle-area-solve", inputIds: ["circle-area-r"], outputId: "circle-area-output", formula: (r) => PI * r * r, label: "Area" });
bindCalc({ btnId: "parallelogram-area-solve", inputIds: ["parallelogram-area-b", "parallelogram-area-h"], outputId: "parallelogram-area-output", formula: (b, h) => b * h, label: "Area" });
bindCalc({ btnId: "trapezoid-area-solve", inputIds: ["trapezoid-area-a", "trapezoid-area-b", "trapezoid-area-h"], outputId: "trapezoid-area-output", formula: (a, b, h) => 0.5 * (a + b) * h, label: "Area" });

// Volume page
bindCalc({ btnId: "cube-volume-solve", inputIds: ["cube-volume-s"], outputId: "cube-volume-output", formula: (s) => s ** 3, label: "Volume" });
bindCalc({ btnId: "cylinder-volume-solve", inputIds: ["cylinder-volume-r", "cylinder-volume-h"], outputId: "cylinder-volume-output", formula: (r, h) => PI * r * r * h, label: "Volume" });
bindCalc({ btnId: "cone-volume-solve", inputIds: ["cone-volume-r", "cone-volume-h"], outputId: "cone-volume-output", formula: (r, h) => (1 / 3) * PI * r * r * h, label: "Volume" });
bindCalc({ btnId: "sphere-volume-solve", inputIds: ["sphere-volume-r"], outputId: "sphere-volume-output", formula: (r) => (4 / 3) * PI * r ** 3, label: "Volume" });
bindCalc({ btnId: "prism-volume-solve", inputIds: ["prism-volume-l", "prism-volume-w", "prism-volume-h"], outputId: "prism-volume-output", formula: (l, w, h) => l * w * h, label: "Volume" });

// Perimeter page
bindCalc({ btnId: "rect-perimeter-solve", inputIds: ["rect-perimeter-l", "rect-perimeter-w"], outputId: "rect-perimeter-output", formula: (l, w) => 2 * (l + w), label: "Perimeter" });
bindCalc({ btnId: "square-perimeter-solve", inputIds: ["square-perimeter-s"], outputId: "square-perimeter-output", formula: (s) => 4 * s, label: "Perimeter" });
bindCalc({ btnId: "triangle-perimeter-solve", inputIds: ["triangle-perimeter-a", "triangle-perimeter-b", "triangle-perimeter-c"], outputId: "triangle-perimeter-output", formula: (a, b, c) => a + b + c, label: "Perimeter" });
bindCalc({ btnId: "circle-perimeter-solve", inputIds: ["circle-perimeter-r"], outputId: "circle-perimeter-output", formula: (r) => 2 * PI * r, label: "Circumference" });
bindCalc({ btnId: "parallelogram-perimeter-solve", inputIds: ["parallelogram-perimeter-a", "parallelogram-perimeter-b"], outputId: "parallelogram-perimeter-output", formula: (a, b) => 2 * (a + b), label: "Perimeter" });

// Scientific calculator (calculator.html)
(function scientificCalculator() {
  const displayEl = document.getElementById("sci-display");
  const exprEl = document.getElementById("sci-expr");
  const keys = document.getElementById("sci-keys");
  if (!displayEl || !keys) return;

  let expression = "";

  function render() {
    displayEl.textContent = expression === "" ? "0" : expression;
  }

  function safeEvaluate(expr) {
    const cleaned = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    if (!/^[0-9+\-*/%.()\s]+$/.test(cleaned)) {
      throw new Error("Invalid characters");
    }
    const result = Function(`"use strict"; return (${cleaned})`)();
    if (typeof result !== "number" || !isFinite(result)) {
      throw new Error("Invalid result");
    }
    return result;
  }

  keys.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (value !== undefined) {
      expression += value;
      render();
      return;
    }

    switch (action) {
      case "clear":
        expression = "";
        exprEl.textContent = "";
        render();
        break;
      case "back":
        expression = expression.slice(0, -1);
        render();
        break;
      case "sqrt":
        try {
          const val = safeEvaluate(expression || "0");
          if (val < 0) throw new Error("negative");
          expression = fmt(Math.sqrt(val)).toString();
        } catch {
          expression = "";
          exprEl.textContent = "Error";
        }
        render();
        break;
      case "percent":
        try {
          const val = safeEvaluate(expression || "0");
          expression = fmt(val / 100).toString();
        } catch {
          expression = "";
          exprEl.textContent = "Error";
        }
        render();
        break;
      case "pow":
        expression += "**";
        render();
        break;
      case "equals":
        try {
          exprEl.textContent = expression + " =";
          const result = safeEvaluate(expression);
          expression = fmt(result).toString();
        } catch {
          expression = "";
          exprEl.textContent = "Error";
        }
        render();
        break;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("sci-display")) return;
    if (/[0-9+\-*/.%()]/.test(e.key)) {
      expression += e.key;
      render();
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      keys.querySelector('[data-action="equals"]').click();
    } else if (e.key === "Backspace") {
      expression = expression.slice(0, -1);
      render();
    } else if (e.key === "Escape") {
      expression = "";
      exprEl.textContent = "";
      render();
    }
  });

  render();
})();

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
