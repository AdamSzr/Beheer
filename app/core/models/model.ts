import { Randomfrom, RandomInt } from "app/utils/base"
import { DateAddDays } from "app/utils/time"
import faker from "faker"
// import { ExecutionResult } from "../mutations/createPostExecutionData"

export class Feature {
  id: number
  userId: number
  name: string
  uuid: string
  value: boolean
  createdAt: Date
  updatedAt: Date

  constructor(userId: number, name: string, value: boolean) {
    this.userId = userId
    this.name = name
    this.value = value
  }
}

export class PostExecutionData {
  uuid: string
  value: boolean
  main: ExecutionData
  replace: ExecutionData
  createdAt: number
  name?: string

  static random(feature: Feature) {
    let x = new PostExecutionData()
    x.uuid = feature.uuid
    x.value = feature.value
    if (x.value) x.main = ExecutionData.random(x.value)
    else x.replace = ExecutionData.random(x.value)

    x.createdAt = DateAddDays(new Date(), RandomInt(-90, 0)).getTime()

    return x
  }
}

export class ExecutionData {
  errors: string
  time: number
  status: "SUCCESS" | "FAILED" | "ERROR" | any
  isMain: boolean

  static random(featureValue: boolean) {
    let x = new ExecutionData()
    x.isMain = featureValue
    x.time = RandomInt(1, 50_000)
    x.status = Randomfrom(["SUCCESS", "ERROR"])
    if (x.status === "ERROR") x.errors = faker.git.commitMessage()

    return x
  }
}

export class ChartDataAdapter {
  public data: PostExecutionData[]
  public last30Days: PostExecutionData[]
  public last60Days: PostExecutionData[]

  constructor(data: PostExecutionData[]) {
    this.data = this.sortByDate(data)
    this.last30Days = this.getFromLastNDays(30)
    this.last60Days = this.getFromLastNDays(60)
  }

  sortByDate(items: PostExecutionData[]) {
    return items.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
  }

  getFromLastNDays(Ndays: number) {
    const now = new Date()
    const daySince = DateAddDays(now, -1 * Ndays).getTime()

    const x = this.data.filter((item) => item.createdAt > daySince)
    return x
  }

  public prepareChartData(fromData: PostExecutionData[]): ChartData {
    const chartData = new ChartData()

    // Policzenie ilości uruchomień
    fromData.forEach((item) => {
      const label = new Date(item.createdAt).toLocaleDateString()
      const indexOf = chartData.data.findIndex((i) => i.label == label)
      const entity =
        indexOf < 0 ? new ChartEntity(label, 1) : (chartData.data[indexOf] as ChartEntity)

      item.value ? entity.countOfTrueValue++ : entity.countOfFalseValue++

      entity.countOfExecutions++

      ;(item as any).executions.errors ? entity.countOfErrors++ : entity.countOfSuccess++

      if (indexOf < 0) chartData.data.push(entity)
    })

    console.log(JSON.stringify(chartData))
    return chartData
  }
}

class ChartEntity {
  label: string
  countOfExecutions: number
  countOfSuccess: number
  countOfErrors: number
  countOfTrueValue: number
  countOfFalseValue: number

  constructor(label?: string, numOfExecutions = 0) {
    if (label) this.label = label
    if (numOfExecutions) this.countOfExecutions = numOfExecutions

    this.countOfSuccess = 0
    this.countOfTrueValue = 0
    this.countOfErrors = 0
  }
}

class ChartData {
  data: ChartEntity[]

  constructor() {
    this.data = []
  }
}



export class MailOptions {
  from: string
  to: string
  subject: string
  html: string
  name: string

  constructor(to: string, flagnName?: string) {
    this.to = to
    this.from = "beheer.projekt@gmail.com"
    this.subject = `Beheer - ${flagnName ? flagnName : "Twoja"} flaga została wyłączona.`
    this.html = this.generateHTML()
  }
  private generateHTML() {
    return `
    <h2>Projekt Beheer</h2>
    <p>Przechwyciliśmy błąd wykonania głównego kodu. Aby zapewnić bezpieczeństwo i dalsze działanie Twojej aplikacji przełączyliśmy automatycznie flagę.</p>
    `
  }
}
