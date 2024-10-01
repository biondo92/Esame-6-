import { Episode } from "./Episode"

export class Season {
  public id?: number
  public serieId?: number
  public title?: string
  public episodes?: Episode[]



  constructor() { }
}