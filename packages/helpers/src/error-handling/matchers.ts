import { has, isString } from "../assertions";

export function matchByCode<TCode>(
  error: unknown,
  code: TCode
): error is {
  code: TCode;
} {
  if (!has(error, "code")) return false;
  return error.code === code;
}

export function matchByName<TName>(
  error: unknown,
  name: TName
): error is {
  name: TName;
} {
  if (!has(error, "name")) return false;
  return error.name === name;
}

export function matchByMessage(
  error: unknown,
  message: string
): error is {
  message: string;
} {
  if (!has(error, "message")) return false;
  return error.message === message;
}

export function matchByPattern(
  error: unknown,
  pattern: RegExp
): error is {
  message: string;
} {
  if (!has(error, "message")) return false;
  if (!isString(error.message)) return false;
  return pattern.test(error.message);
}
export function matchByClass<TClass>(
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
