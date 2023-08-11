import { isObject } from "./isObject";

export const has = <T extends Record<string, unknown>>(
  obj: unknown,
  property: keyof T
): obj is {
  [key in keyof T]: unknown;
} => isObject(obj) && property in obj;
