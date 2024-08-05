import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Role } from 'src/app/models/Role';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  protected modalTitle?: string
  protected modal?: Modal
  protected model?: Role = new Role
  protected roles?: Role[]



  constructor(private auth: AuthService, private rolService: RolesService) {

  }
  async ngOnInit(): Promise<void> {
    this.roles = await this.rolService.getList()
    this.modal = Modal.getOrCreateInstance('#modal-role')
  }



  public openModal(modalTitle: string, roleId: number = 0): void {
    this.modalTitle = modalTitle

    if (roleId == 0) {
      this.model = new Role()
    }
    else {
      this.model = this.roles!.find(rol => {
        return rol.id == roleId
      })
    }
    this.modal?.show()
  }

  public async removeRole(id: number = 0): Promise<void> {
    this.rolService.delete(id)
      .then(res => {
        this.roles = this.roles?.filter(add => add.id !== id)
        alert("Ruolo rimosso con successo")
      })
  }

  public async AddOrUpdate(): Promise<void> {
    if (this.model?.id == 0 || this.model!.id == undefined) {
      this.rolService.add(this.model!)
        .then(res => {
          this.roles?.push(res)
          this.modal?.hide()
          alert("Ruolo aggiunto con successo")
        })
    }
    else {
      this.rolService.update(this.model!)
        .then(res => {
          this.roles = this.roles?.filter(add => add.id !== res.id)
          this.roles?.push(res)

          this.modal?.hide()
          alert("Ruolo aggiornato con successo")
        })
    }
  }
}


