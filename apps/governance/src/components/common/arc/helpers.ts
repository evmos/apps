// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

export function buildD(
  afterPercentage: number,
  percentage: number,
  strokeWidth = 6,
  range = 200
) {
  const percentageToRadius =
    Math.floor((range * percentage) / 100) - (strokeWidth / 2 + 1);
  const afterPercentageToRadius = Math.floor((range * afterPercentage) / 100);

  return describeArc(
    50,
    50,
    50 - strokeWidth / 2,
    afterPercentageToRadius - range / 2 + (strokeWidth / 2 + 1),
    afterPercentageToRadius + percentageToRadius - range / 2
  );
}
