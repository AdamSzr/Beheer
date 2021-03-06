import { GMAIL } from "app/config"
import { Randomfrom, RandomInt } from "app/utils/base"
import { DateAddDays } from "app/utils/time"
import faker from "faker"

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
  execution: ExecutionData
  createdAt: number
  name?: string

  static validate(obj: any) {
    if (!obj.name || !obj.uuid || !ExecutionData.validate(obj.execution) || !obj.name) return false

    return true
  }

  static random(feature: Feature, flagValue?: boolean) {
    let x = new PostExecutionData()
    x.uuid = feature.uuid
    x.value = flagValue ?? feature.value
    x.execution = ExecutionData.random(x.value)
    x.createdAt = DateAddDays(new Date(), RandomInt(-90, 0)).getTime()

    return x
  }
}

export class FeatureInfo {
  name: string
  value: boolean
  constructor(name: string, value: boolean) {
    this.name = name
    this.value = value
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
    x.time = RandomInt(1, 1_000)
    x.status = Randomfrom(["SUCCESS", "ERROR"])
    if (x.status === "ERROR") x.errors = faker.git.commitMessage()

    return x
  }
  static validate(obj: any) {
    if (!obj || !obj.status || !obj.time || !obj.isMain) return false

    return true
  }
}

export interface IChartDataAdapter {
  prepareChartData: (fromData: PostExecutionData[]) => ChartData
}

export class ChartDataAdapter implements IChartDataAdapter {
  public data: PostExecutionData[]
  public last30Days: PostExecutionData[]
  public last60Days: PostExecutionData[]
  public chartData: ChartData

  constructor(data: PostExecutionData[]) {
    this.data = this.sortByDate(data)
    this.last30Days = this.getFromLastNDays(30)
    this.last60Days = this.getFromLastNDays(60)
  }

  protected sortByDate(items: PostExecutionData[]) {
    return items.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
  }

  protected getFromLastNDays(Ndays: number) {
    const now = new Date()
    const daySince = DateAddDays(now, -1 * Ndays).getTime()

    const x = this.data.filter((item) => item.createdAt > daySince)
    return x
  }

  public prepareChartData(fromData: PostExecutionData[]): ChartData {
    const chartData = new ChartData()

    // Policzenie ilo??ci uruchomie??
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

    this.chartData = chartData
    return chartData
  }
}

class ChartData {
  data = [] as ChartEntity[]
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

export interface IDataAdapter {
  getTotalCountOfExecution(): number
  newCodeExecCount(): number
  oldCodeExecCount(): number
  countOfSuccesfullyRunned(): number
  getMostIntenseDay(): string
  getMostLazyDay(): string
  getAvgTime(): string
  countOfErrorRunned(): number
}

export class TableDataAdapter extends ChartDataAdapter implements IDataAdapter {
  private newCodeCountExecution
  private oldCodeCountExecution
  private succesfullyRunnedCode
  private mostIntenseDay
  private mostLazyDay
  private avgTime
  private errorRunnedCode

  constructor(data: PostExecutionData[]) {
    super(data)
    // console.log({ data: data[0] })
  }

  public getTotalCountOfExecution() {
    return this.data.length
  }

  public newCodeExecCount = () => {
    if (!this.newCodeCountExecution) {
      this.newCodeCountExecution = 0

      this.data.forEach((i) => {
        if (i.value == true) this.newCodeCountExecution++
      })
    }

    return this.newCodeCountExecution
  }

  public oldCodeExecCount = () => {
    if (!this.oldCodeCountExecution) {
      this.oldCodeCountExecution = 0

      this.data.forEach((i) => {
        if (i.value == false) this.oldCodeCountExecution++
      })
    }

    return this.oldCodeCountExecution
  }

  public countOfSuccesfullyRunned = () => {
    if (!this.succesfullyRunnedCode) {
      this.succesfullyRunnedCode = 0
      this.data.forEach((i) => {
        if ((i as any).executions.status == "SUCCESS") this.succesfullyRunnedCode++
      })
    }

    return this.succesfullyRunnedCode
  }

  public getMostIntenseDay() {
    if (!this.mostIntenseDay) {
      const items = this.prepareChartData(this.data)
      this.mostIntenseDay = items.data[0]

      items.data.forEach((i) => {
        if (i.countOfExecutions > this.mostIntenseDay.countOfExecutions) this.mostIntenseDay = i
      })
    }

    // console.log({ intense: this.mostIntenseDay })
    return this.mostIntenseDay.label + " (" + this.mostIntenseDay.countOfExecutions + ")"
  }

  public getMostLazyDay() {
    if (!this.mostLazyDay) {
      const items = this.prepareChartData(this.data)
      this.mostLazyDay = items.data[0]

      items.data.forEach((i) => {
        if (i.countOfExecutions < this.mostLazyDay.countOfExecutions) this.mostLazyDay = i
      })
    }

    // console.log({ intense: this.mostIntenseDay })
    return this.mostLazyDay.label + " (" + this.mostLazyDay.countOfExecutions + ")"
  }

  public getAvgTime() {
    if (!this.avgTime) {
      const items = this.data
      let value = 0

      items.forEach((i) => (value += Number((i as any).executions.time)))
      this.avgTime = value
    }
    return Math.round(this.avgTime / this.data.length) + "ms"
  }

  public countOfErrorRunned = () => {
    if (!this.errorRunnedCode) {
      this.errorRunnedCode = 0
      this.data.forEach((i) => {
        if ((i as any).executions.status == "ERROR") this.errorRunnedCode++
      })
    }

    return this.errorRunnedCode
  }
}

export class MailOptions {
  subject: string
  html: string
  from: string
  to: string

  featureName: string

  constructor(to: string, featureName: string) {
    this.featureName = featureName
    this.to = to
    this.from = GMAIL.ADRES_EMAIL
    this.subject = this.generateSubject()
    this.html = this.generateHTML()
  }

  private generateSubject() {
    return `Beheer - ${this.featureName} flaga zosta??a wy????czona.`
  }

  private generateHTML() {
    return `
    <h2>Projekt Beheer</h2>
    <p>Przechwycili??my b????d wykonania kodu. Aby zapewni?? bezpiecze??stwo i dalsze dzia??anie Twojej aplikacji prze????czyli??my automatycznie flag??.</p>
    <p>Wy????czono flag??: <b style="font-size:large"> ${this.featureName} </b> </p>
    `
  }
}
