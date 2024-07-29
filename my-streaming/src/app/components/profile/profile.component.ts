import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/City';
import { User } from 'src/app/models/User';
import { AddressesService } from 'src/app/services/addresses.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
// import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input()
  protected user?: User
  protected addressFormTitle?: string
  protected cities?: City[]
  // protected modal?: bootstrap.Modal
  /**
   *
   */
  constructor(private auth: AuthService, private userService: UserService, private addresses: AddressesService) {
    this.user = this.auth.getUser();
    this.addresses.getList(this.user.id).then(res => this.user!.addresses = res)
    this.addresses.getCities().then(res => this.cities = res)

    // this.modal = new bootstrap.Modal('#address-form', {})
  }

  public async onSubmit(): Promise<void> {
    this.userService.update(this.user!).then(res => {
      if (res === true) {
        alert("Profilo utente aggiornato con successo")
      } else {
        alert("Si è verificato un errore durante l'aggiornamento del profilo utente")
      }
    })
  }

  public addAddress(): void {
    this.addressFormTitle = "Add Address"
    // this.modal?.show()
  }

  public async onSubmitAddress(): Promise<void> {

  }



}
