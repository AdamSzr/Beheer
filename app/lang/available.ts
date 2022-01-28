import { App } from "blitz"

export class Language {
  lang: Lang
  name: string
  code2: string
  views

  constructor() {
    this.views = {}
    // console.log(this.views)
    getListFromEnum().forEach((v, idx, arr) => {
      this.views[v] = {}
    })
  }
}

export enum Lang {
  PL = "PL",
  EN = "EN",
}

export enum AppViews {
  join = "join",
  home = "home",
  login = "login",
  signUp = "signUp",
  register = "register",
  about = "about",
  menu = "menu",
  features = "feaures",
  featureDetails = "featureDetails",
  settings = "settings",
}

function getListFromEnum() {
  return Object.keys(AppViews).filter((i) => isNaN(Number(i)))
}

const pl = new Language()
pl.code2 = "pl"
pl.lang = Lang.PL
pl.name = "polish"
pl.views[AppViews.join] = {
  login: "Zaloguj",
  register: "Zarejestruj",
}
pl.views[AppViews.settings] = {
  topic: "Czy chcesz coś zmienić",
  inputEmail: { description: "E-mail" },
  inputPassw: { description: "Hasło" },
  submit: { text: "Zapisz" },
}
pl.views[AppViews.features] = {
  inputSearch: { placeholder: "Szukaj" },
  inputCreate: { placeholder: "Wpisz nazwę, aby utwórz funcjonalność" },
}
pl.views[AppViews.menu] = {
  features: { name: "Funkcjonalności" },
  settings: { name: "Ustawienia" },
  about: { name: "O Stronie" },
  logout: { name: "Wyloguj" },
}
pl.views[AppViews.login] = {
  text: "Zaloguj się",
  inputEmail: { placeholder: "E-mail" },
  inputPassw: { placeholder: "Hasło" },
}
pl.views[AppViews.signUp] = {
  text: "Zarejestruj się",
  inputEmail: { placeholder: "E-mail" },
  inputPassw: { placeholder: "Hasło" },
}
pl.views[AppViews.home] = {
  welcome: { text: "" },
  explanation: {
    text: `
    Wyjaśnienie pojęć:
    success -> funkcjonalność działa poprawnie jak oczekiwano
    replaced --> pojawił się wyjątek w sekcji nowego kodu, użyto starego kodu
    failed --> funkcjonalność jest wadliwa, obie ścieżki kodu rzuciły wyjątek
  `,
  },
}

// console.log(pl)

const en = new Language()
en.code2 = "en"
en.lang = Lang.EN
en.name = "english"
en.views[AppViews.settings] = {
  topic: "Do you wanna change something?",
  inputEmail: { description: "E-mail" },
  inputPassw: { description: "Password" },
  submit: { text: "Save" },
}
en.views[AppViews.features] = {
  inputSearch: { placeholder: "Search" },
  inputCreate: { placeholder: "Input name to create an feature." },
}
en.views[AppViews.menu] = {
  features: { name: "Features" },
  settings: { name: "Settings" },
  about: { name: "About" },
  logout: { name: "Logout" },
}
en.views[AppViews.login] = {
  text: "Login",
  inputEmail: { placeholder: "E-mail" },
  inputPassw: { placeholder: "Password" },
}
en.views[AppViews.signUp] = {
  text: "Register",
  inputEmail: { placeholder: "E-mail" },
  inputPassw: { placeholder: "Password" },
}
en.views[AppViews.join] = {
  login: "Login",
  register: "Register",
}
en.views[AppViews.home] = {
  welcome: {
    text: "Welcome to my site. There will be some app presentation video.",
  },
  explanation: {
    text: `
    success -> works ok using new code as expected <br/>
    replaced --> error as new code, but properly executed replace <br/>
    failed --> new and old code has errors
    `,
  },
}

export const AppDefaultLanguages = { PL: pl, EN: en }
