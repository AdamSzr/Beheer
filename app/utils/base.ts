export function CreateArray(itemCount: number, fill?: () => any): any[] {
  const array = [] as any[]
  for (let x = 0; x < itemCount; x++) {
    if (fill != undefined) array.push(fill())
    else array.push(RandomInt(0, 100))
  }
  return array
}

export function Range(start: number, count: number) {
  const arr = [] as any[]
  for (var z = 0; z < count; z++) {
    arr.push(start + z)
  }
  return arr
}

export function GenerateRandomString(length = 8, countOfSpecChars = 1, countOfNumbers = 1) {
  const alphabet = `abcdefghijklmnouprstwxyz`
  const ALPHABET = alphabet.toUpperCase()
  const specChars = `!@#$%^&*-+<>`

  const alp_len = length - countOfSpecChars - countOfNumbers

  const randomBoolean = () => (Math.random() >= 0.5 ? true : false)
  const randomChar = (alph) => alph.charAt(Math.floor(Math.random() * alph.length))
  const randomSpecChar = () => specChars.charAt(Math.floor(Math.random() * specChars.length))
  const randomPosition = (password) => Math.floor(Math.random() * password.length)
  const insertCharIntoString = (char, string, startPos) =>
    string.substring(0, startPos) + char + string.substr(startPos)
  const randomNumber = () => Math.floor(Math.random() * 10)

  let password = ``

  for (let i = 0; i < alp_len / 2; i++) {
    password = insertCharIntoString(randomChar(ALPHABET), password, randomPosition(password))

    password = insertCharIntoString(randomChar(alphabet), password, randomPosition(password))
  }

  for (let i = 0; i < countOfSpecChars; i++) {
    password = insertCharIntoString(randomChar(specChars), password, randomPosition(password))
  }
  for (let index = 0; index < countOfNumbers; index++) {
    password = insertCharIntoString(randomNumber(), password, randomPosition(password))
  }

  return password
}

export function RandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export function RandomDoubleWithNegativ(min, max) {
  if (min > max) {
    throw new Error("Minimum value should be smaller than maximum value.")
  }
  var range = max - min
  return min + range * Math.random()
}

export function Randomfrom(array: any[]) {
  return array[RandomInt(0, array.length)]
}

export function StringHaveLowerCase(text: string): boolean {
  const alphabet = "abcdefghijklmnouprstwxyz"
  return text.split("").some((char) => alphabet.split("").some((item) => char === item))
}
