import { Season } from "./Season"

export class Serie {
  public id?: number
  public categoryId?: number
  public title?: string
  public rating?: number
  public seasons?: Season[]

  constructor() { }
}