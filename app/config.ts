import { Lang, Language } from "./lang/available"
import { z } from "zod"
import { StringHaveLowerCase } from "./utils/base"

export const MULTI_LANGUAGE = false
export const SIGNUP_PASSW_VALIDATION = false
export const DEFAULT_LANGUAGE = Lang.PL

export const PasswordValidator = (password: string) => {
  if (password.length < 8) return false
  if (password.length > 30) return false
  if (!StringHaveLowerCase(password)) return false

  return true
}

export const ENABLE_SAVING_CHART_DATA = false
export const VALIDATE_FEATURE_NAME = false
