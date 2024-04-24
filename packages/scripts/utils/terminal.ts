// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import stringWidth from "string-width";

export const clearPrevline = () => process.stdout.write("\x1b[1A\x1b[2K");

export const frame = (str: string, [xPadding, yPadding] = [4, 1]) => {
  const lines = str.split("\n").map((line) => line.trim());
  const maxLength = Math.max(...lines.map((line) => stringWidth(line)));
  const padding = " ".repeat(xPadding);
  const line = "─".repeat(maxLength + padding.length * 2);
  let out = `┌${line}┐\n`;

  for (let i = 0; i < yPadding; i++) {
    out += `│${" ".repeat(maxLength + padding.length * 2)}│\n`;
  }

  for (const line of lines) {
    const offset = maxLength - stringWidth(line);
    const leading = Math.floor(offset / 2);
    const trailing = offset - leading;
    out += `│${padding}${" ".repeat(leading)}${line}${" ".repeat(
      trailing,
    )}${padding}│\n`;
  }

  for (let i = 0; i < yPadding; i++) {
    out += `│${" ".repeat(maxLength + padding.length * 2)}│\n`;
  }
  out += `└${line}┘\n`;

  return out;
};
