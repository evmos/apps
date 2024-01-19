// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { has, isString } from "../assertions";

function matchByCode<TCode>(
  error: unknown,
  code: TCode
): error is {
  code: TCode;
} {
  if (!has(error, "code")) return false;
  return error.code === code;
}

function matchByName<TName>(
  error: unknown,
  name: TName
): error is {
  name: TName;
} {
  if (!has(error, "name")) return false;
  return error.name === name;
}

function matchByMessage(
  error: unknown,
  message: string
): error is {
  message: string;
} {
  if (!has(error, "message")) return false;
  return error.message === message;
}

function matchByPattern(error: unknown, pattern: RegExp) {
  if (!has(error, "message")) return false;
  if (!isString(error.message)) return false;
  return pattern.test(error.message);
}
function matchByClass<TClass>(
  error: unknown,
  Class: new (...args: any[]) => TClass
): error is TClass {
  return error instanceof Class;
}
export const matchError = {
  byCode: matchByCode,
  byName: matchByName,
  byMessage: matchByMessage,
  byPattern: matchByPattern,
  byClass: matchByClass,
};
