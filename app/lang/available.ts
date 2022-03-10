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

pl.views[AppViews.menu] = {
  features: { name: "Funkcjonalności" },
  settings: { name: "Ustawienia" },
  about: { name: "O Stronie" },
  logout: { name: "Wyloguj" },
}

const en = new Language()
en.code2 = "en"
en.lang = Lang.EN
en.name = "english"

en.views[AppViews.menu] = {
  features: { name: "Features" },
  settings: { name: "Settings" },
  about: { name: "About" },
  logout: { name: "Logout" },
}

export const AppDefaultLanguages = { PL: pl, EN: en }
