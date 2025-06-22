import {
  AVAILABLE_LOCALES,
  AvailableLocale,
  Locale,
} from "@/resources/locales";

const isValidLocale = (locale: string): locale is AvailableLocale => {
  return AVAILABLE_LOCALES.includes(locale as AvailableLocale);
};

export const getLocale = async (parameters: {
  locale: string;
}): Promise<AvailableLocale> => {
  const { locale } = parameters;

  const isValid = isValidLocale(locale);
  if (isValid) return locale;

  console.log("ONE", locale);

  return Locale.English;
};
