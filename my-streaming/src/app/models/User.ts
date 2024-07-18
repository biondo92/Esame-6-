import { last } from "rxjs"
import { Role } from "./Role"

export class User {
    public id?: number
    public name?: string
    public lastName?: string
    public fullname?: string
    public email?: string
    public roleId?: number
    public credits?:number
    public emailVerified?:boolean
    public role?:Role
  

    constructor() { }
  }