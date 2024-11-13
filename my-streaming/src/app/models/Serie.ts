import { Season } from "./Season"

export class Serie {
  public id?: number
  public categoryId?: number
  public title?: string
  public rating?: number
  public image?: string
  public seasons?: Season[]

  constructor() { }
}