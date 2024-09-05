import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Address } from 'src/app/models/Address';
import { City } from 'src/app/models/City';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { AddressesService } from 'src/app/services/addresses.service';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {



  protected modalTitle?: string
  protected modal?: Modal
  protected addressModal?: Modal
  protected addressModalTitle?: string
  protected model?: User = new User
  protected users?: User[]
  protected roles?: Role[]
  protected address?: Address = new Address
  protected cities?: City[]

  constructor(private auth: AuthService, private useService: UserService, private rolService: RolesService, private addServices: AddressesService) {


  }
  async ngOnInit(): Promise<void> {
    let data = await this.useService.getList()
    this.users = data.filter(add => add.id !== this.auth.getUser().id)
    this.roles = await this.rolService.getList()
    this.modal = Modal.getOrCreateInstance('#modal-user')
    this.addressModal = Modal.getOrCreateInstance('#modal-address')
    this.addServices.getCities().then(res => this.cities = res)
    console.log(this.users)
  }
  public getFullName(user: User): string {
    return user.name + ' ' + user.lastName
  }
  public openModal(modalTitle: string, userId: number = 0): void {
    this.modalTitle = modalTitle

    if (userId == 0) {
      this.model = new User()
    }
    else {
      this.model = this.users!.find(use => {
        return use.id == userId
      })
    }
    this.modal?.show()
  }

  public async removeUser(id: number = 0): Promise<void> {
    this.useService.delete(id)
      .then(res => {
        this.users = this.users?.filter(add => add.id !== id)
        alert("Utente rimosso con successo")
      })
  }

  public cityName(id: number = 0): string {
    return this.cities?.find(city => {
      return city.id == id
    })?.name ?? ""
  }

  public async AddOrUpdateAddress(): Promise<void> {
    if (this.address?.id == 0 || this.address!.id == undefined) {
      this.addServices.addAddress(this.address!)
        .then(res => {
          this.model?.addresses?.push(res)
          this.addressModal?.hide()
          alert("Indirizzo aggiunto con successo")
        })
    }
    else {
      this.addServices.updateAddress(this.address!)
        .then(res => {
          this.model!.addresses = this.model?.addresses?.filter(add => add.id !== res.id)
          this.model!.addresses?.push(res)
          this.addressModal?.hide()
          alert("Indirizzo aggiornato con successo")
        })
    }
  }

  public async AddOrUpdate(): Promise<void> {
    if (this.model?.id == 0 || this.model!.id == undefined) {
      this.useService.add(this.model!)
        .then(res => {
          this.users?.push(res)
          this.modal?.hide()
          alert("Utente aggiunto con successo")
        })
    }
    else {
      this.useService.update(this.model!)
        .then(res => {
          this.users = this.users?.filter(add => add.id !== res.id)
          this.users?.push(res)

          this.modal?.hide()
          alert("Utente aggiornato con successo")
        })
    }
  }
  public openAddressModal(modalTitle: string, addressId: number = 0): void {
    this.addressModalTitle = modalTitle

    if (addressId == 0) {
      this.address = new Address()
      this.address.userId = this.model?.id
    }
    else {
      this.address = this.model?.addresses?.find(address => {
        return address.id == addressId
      })
    }
    this.addressModal?.show()
  }

  public async removeAddress(id: number = 0): Promise<void> {
    this.addServices.deleteAddress(id)
      .then(res => {
        this.model!.addresses = this.model?.addresses?.filter(add => add.id !== id)
        alert("Indirizzo rimosso con successo")
      })
  }

}
