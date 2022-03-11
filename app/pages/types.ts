import { AppViews, Languages } from "app/lang/available"

export type Lang = {
  get: (view: AppViews) => any
  update: () => void
  currentLang: Languages
}
