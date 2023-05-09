// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/** @type {import('eslint').Linter} */
module.exports = {
    extends: ["turbo", "prettier", "eslint:recommended", "plugin:prettier/recommended"],
    rules: {
        "prettier/prettier": "error",
        "no-unused-vars": "off"
    }
};
