import faker from "faker"
import { DateAddDays, min2sec, randomDate, sec2ms } from "app/utils/time"
// import { ExecutedWithStatus, PostExecDTO, ExecuteDetails } from "./model"
import {
  GenerateRandomString,
  RandomDoubleWithNegativ,
  Randomfrom,
  RandomInt,
  Range,
} from "app/utils/base"
import { v4 as uuidv4 } from "uuid"
import { Feature } from "db"
import { any } from "zod"

const createKey = (key) => {
  return GenerateRandomString(8, 0, 0) + "#" + RandomInt(1_000_000, 10_000_000) + "# " + key
}

// let buffer: any[] = []

// export function CreatePostExecDTOBasedOnStaticData(countPerFeature): PostExecDTO[] {
//   if (buffer.length > 0) return buffer

//   const arr = [] as PostExecDTO[]
//   const features = GetStaticFeatures().slice(0, 1)

//   for (var z = 0; z < features.length; z++) {
//     for (var x = 0; x < countPerFeature; x++) {
//       let dto = new PostExecDTO()
//       dto.argument = Randomfrom(["true", "false"])
//       dto.createdAt = randomDate(DateAddDays(Date.now(), -60))
//       dto.uuid = uuidv4()
//       dto.executedWithStatus = ExecutedWithStatus.getRandom()
//       dto.old = randomExecDetails()
//       dto.replacment = randomExecDetails()

//       arr.push(dto)
//     }
//   }
//   buffer = arr
//   // return GetStaticFeatures()
//   return arr
// }

// function randomExecDetails() {
//   const x = new ExecuteDetails()

//   x.Time = RandomDoubleWithNegativ(0.01, 15)
//   if (faker.datatype.boolean() == true) {
//     x.Value = faker.animal.dog()
//   } else {
//     Range(0, RandomInt(1, 3)).forEach((i) => {
//       // x.Errors.push(faker.git.commitMessage())
//     })
//   }

//   return x
// }

// export function CreatePostExecDTO(key: string): PostExecDTO {
//   const obj = new PostExecDTO()
//   const now = new Date()

//   obj.createdAt = randomDate(DateAddDays(now, -365), now)
//   obj.uuid = createKey(key)
//   obj.argument = "" + faker.datatype.boolean()
//   obj.executedWithStatus = ExecutedWithStatus.getElementByIdx(RandomInt(0, 4)) as any

//   obj.old.Time = RandomInt(1000, 10000)
//   obj.old.Value = faker.internet.url()

//   obj.replacment.Time = RandomInt(1000, 10000)
//   obj.replacment.Value = faker.internet.url()

//   return obj
// }

// export function CreateNPostExecDTO(n: number, key?: string[]): PostExecDTO[] {
//   if (!key) {
//     key = [] as string[]

//     for (let x = 0; x < n; x++) {
//       key.push(faker.git.commitMessage())
//     }
//   }

//   if (n !== key.length) throw new Error("provided keys does not match length of n")

//   const data = [] as PostExecDTO[]

//   key.forEach((item) => {
//     data.push(CreatePostExecDTO(item))
//   })

//   return data
// }
