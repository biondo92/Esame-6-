export class Address {
  public id?: number
  public cityId?: number
  public userId?: number
  public address?: string
  public postalCode?: string
  public state?: string

  constructor() { 
    this.cityId = 0;
    this.state = "italia"
   }
}