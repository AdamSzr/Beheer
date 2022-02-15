import { Feature } from "app/core/models/model"

export const sortFeaturesByDateFromLatestToOldest = (listOfFeatures: Feature[]): Feature[] => {
  const sorted = listOfFeatures.sort((item1, item2) => {
    if (item1.createdAt < item2.createdAt) return 1
    else if (item1.createdAt == item2.createdAt) return 0
    else return -1
  })

  return sorted
}
