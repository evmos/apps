// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const config = async () =>
  (await import("@evmosapps/config/eslint/base.js")).default;
module.exports = config();
