import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { AddressesService } from 'src/app/services/addresses.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input()
  protected user?: User
  /**
   *
   */
  constructor(private auth: AuthService,private userService:UserService,private addresses:AddressesService) {
    this.user = this.auth.getUser();
   this.addresses.getList(this.user.id).then(res=> this.user!.addresses=res)
   console.log(this.user)
  }

  public async onSubmit(): Promise<void>{
   this.userService.update(this.user!).then(res=>{
    if(res===true){
      alert("Profilo utente aggiornato con successo")
    }else{
      alert("Si è verificato un errore durante l'aggiornamento del profilo utente")
    }
   })
  }

}
