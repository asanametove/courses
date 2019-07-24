export enum LanguageKey {
  en = 'en',
  ru = 'ru',
}

export class Language {
  constructor(
    public key: LanguageKey,
  ) { }

  get translationKey(): string {
    return `language.${this.key}`;
  }
}
