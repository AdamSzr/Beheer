import { App } from "blitz"

export class Language {
  lang: Languages
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

export enum Languages {
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
pl.lang = Languages.PL
pl.name = "polish"

const en = new Language()
en.code2 = "en"
en.lang = Languages.EN
en.name = "english"

pl.views[AppViews.menu] = {
  features: { name: "Funkcjonalności" },
  settings: { name: "Ustawienia" },
  about: { name: "O Stronie" },
  logout: { name: "Wyloguj" },
  home: { name: "Strona Główna" },
}

en.views[AppViews.menu] = {
  features: { name: "Features" },
  settings: { name: "Settings" },
  about: { name: "About" },
  logout: { name: "Logout" },
  home: { name: "Home" },
}

export const AppDefaultLanguages = { PL: pl, EN: en }
