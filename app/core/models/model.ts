import { Randomfrom } from "app/utils/base"

export class Feature {
  id: number
  userId: number
  name: string
  value: boolean
  createdAt: Date
  updatedAt: Date

  constructor(userId: number, name: string, value: boolean) {
    this.userId = userId
    this.name = name
    this.value = value
  }
}

export class PostExec {
  FlagKey: string
  FlagValue: string
  ReplaceExecution: ExecuteDetails
  WithExecution: ExecuteDetails
}

export class PostExecDTO {
  id: string
  key: string
  createdAt: Date
  argument: string
  executedWithStatus: string
  old: ExecuteDetails
  replacment: ExecuteDetails

  constructor() {
    this.old = new ExecuteDetails()
    this.replacment = new ExecuteDetails()
  }
}

export class ExecuteDetails {
  Time: number
  Errors: string[]
  ExecutionId: number
  IsNewCode: Boolean
  Status: Boolean
  constructor() {
    this.Errors = []
  }
}

export class ExecutedWithStatus {
  static FULL_SUCCESS = "FULL_SUCCESS"
  static SUCCESS = "SUCCESS"
  static PARTLY_FAILED = "PARTLY_FAILED"
  static FAILED = "FAILED"

  public static getElementByIdx(idx) {
    return Object.keys(ExecutedWithStatus)[idx]
  }
  public static getIdByElement(element) {
    return Object.keys(ExecutedWithStatus).indexOf(element)
  }
  public static getRandom() {
    return Randomfrom(Object.keys(ExecutedWithStatus))
  }
}
