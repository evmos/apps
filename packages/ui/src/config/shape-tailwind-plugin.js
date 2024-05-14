// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import plugin from "tailwindcss/plugin";

const stepHeight = 20;
const stepWidth = 20;
const cornerRadius = 10;
/**
 * @return {[number, number]}
 */
const rounded = (turn = 0, radius = 1) => {
  const radian = Math.PI * turn * 2 - Math.PI / 2;
  return [Math.cos(radian) * radius, Math.sin(radian) * radius];
};
const bindingShapePoints = [
  "0 0",
  "100% 0",
  `100% calc(100% - ${stepHeight * 2}px)`,
];

/**
 * @param {{
 *  from: number;
 *  to: number;
 *  center: [string, string];
 *  step?: number;
 *  radius?: number;
 * }} options
 */
const turn = ({ from, to, center, step = 0.05, radius = 1 }) => {
  if (from > to) {
    step = -step;
  }

  const steps = Math.abs((to - from) / step);
  for (let i = 0; i < steps; i++) {
    const turn = from + step * i;
    const [x, y] = rounded(turn, radius);

    bindingShapePoints.push(
      `calc(${center[0]} + ${x.toFixed(2)}px) calc(${center[1]} + ${y.toFixed(2)}px)`,
    );
  }
  const [x, y] = rounded(to, radius);
  bindingShapePoints.push(
    `calc(${center[0]} + ${x.toFixed(2)}px) calc(${center[1]} + ${y.toFixed()}px)`,
  );
};
turn({
  from: 0.25,
  to: 0.25 + 0.125,
  center: [
    `calc(100% - ${cornerRadius}px)`,
    `calc(100% - ${stepHeight * 2}px)`,
  ],
  radius: cornerRadius,
});

turn({
  from: 0.25 + 0.125,
  to: 0.5,
  center: [
    `100% - ${stepWidth}px`,
    `calc(100% - ${stepHeight + cornerRadius}px)`,
  ],
  radius: cornerRadius,
});

turn({
  from: 0,
  to: -0.125,
  center: [
    `50% + ${stepWidth + cornerRadius}px`,
    `calc(100% - ${stepHeight - cornerRadius}px)`,
  ],
  radius: cornerRadius,
});

turn({
  from: 0.25 + 0.125,
  to: 0.5,
  center: [`50%`, `calc(100% - ${cornerRadius}px)`],
  radius: cornerRadius,
});
bindingShapePoints.push(`0 100%`);

const bindingShape = `polygon(${bindingShapePoints.join(",\n ")})`;

export const shapeTailwindPlugin = plugin(function({ addUtilities }) {
  addUtilities({
    ".shape-binding": {
      clipPath: bindingShape,
    },
  });
});
