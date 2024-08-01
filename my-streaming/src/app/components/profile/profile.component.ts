import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/City';
import { User } from 'src/app/models/User';
import { AddressesService } from 'src/app/services/addresses.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Modal } from 'bootstrap';
import { Address } from 'src/app/models/Address';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()
  protected user?: User
  @Input()
  protected address?: Address = new Address()
  
  protected modalTitle?: string
  protected cities?: City[]
  protected modal?: Modal

  constructor(private auth: AuthService, private userService: UserService, private addressesService: AddressesService) {
    this.user = this.auth.getUser();
    this.addressesService.getList(this.user.id).then(res => this.user!.addresses = res)
    this.addressesService.getCities().then(res => this.cities = res)
  }

  ngOnInit(): void {
    this.modal = Modal.getOrCreateInstance('#modal-address')
  }

  public cityName(id: number = 0): string {
    return this.cities?.find(city => {
      return city.id == id
    })?.name ?? ""
  }

  public async UpdateUserProfile(): Promise<void> {
    this.userService.update(this.user!).then(res => {
      if (res === true) {
        alert("Profilo utente aggiornato con successo")
      } else {
        alert("Si è verificato un errore durante l'aggiornamento del profilo utente")
      }
    })
  }

  public openAddressModal(modalTitle: string, addressId: number = 0): void {
    this.modalTitle = modalTitle

    if(addressId == 0){
      this.address = new Address()
      this.address.userId = this.user?.id
    }
    else{
      this.address = this.user?.addresses?.find(address => {
        return address.id == addressId
      })
    }
    this.modal?.show()
  }

  public async AddOrUpdateAddress(): Promise<void> {
    if(this.address?.id == 0 || this.address!.id == undefined){
      this.addressesService.addAddress(this.address!)
      .then(res => { 
        this.user?.addresses?.push(res)
        this.modal?.hide()
        alert("Indirizzo aggiunto con successo")
      })
    }
    else{
      this.addressesService.updateAddress(this.address!)
      .then(res => {
        this.user!.addresses = this.user?.addresses?.filter(add => add.id !== res.id)
        this.user!.addresses?.push(res)
        this.modal?.hide()
        alert("Indirizzo aggiornato con successo")
      })
    }
  }

  public async removeAddress(id: number = 0): Promise<void> {
    this.addressesService.deleteAddress(id)
    .then(res => {
      this.user!.addresses = this.user?.addresses?.filter(add => add.id !== id)
      alert("Indirizzo rimosso con successo")
    })
  }
}
