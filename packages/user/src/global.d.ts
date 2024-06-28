// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// Needs to be `var` isnted of `let`
// otherwise type will not be assigned to `globalThis`
// see https://stackoverflow.com/questions/38906359/create-a-global-variable-in-typescript
// eslint-disable-next-line no-var
declare var dAppStorePrisma: unknown;
