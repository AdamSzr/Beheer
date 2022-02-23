import { RandomInt } from "./base"

export function ms2ns(milisec: number) {
  return milisec * 1_000_000
}

export function sec2ms(secounds: number) {
  return secounds * 1000
}

export function min2sec(minutes: number) {
  return minutes * 60
}

export function hour2min(hours: number) {
  return hours * 60
}

export function day2hours(days: number) {
  return days * 24
}

export function randomDate(start: Date, end?: Date): Date {
  if (!end) end = new Date()

  const diff = end.getTime() - start.getTime()
  const newD = new Date(start.getTime() + RandomInt(0, diff))
  return newD
}

export function DateAddDays(startDate: number | Date, days) {
  var date = new Date(startDate.valueOf())
  date.setDate(date.getDate() + days)
  return date
}
