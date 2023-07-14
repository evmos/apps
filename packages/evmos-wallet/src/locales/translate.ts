import { createTranslator } from "schummar-translate/react";
import en from "./en";

export const { t, useTranslator, getTranslator } = createTranslator({
  sourceDictionary: en,
  sourceLocale: "en",
  dicts: { en },
});
