import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Setting } from 'src/app/models/Setting';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {





  protected modalTitle?: string
  protected modal?: Modal
  protected model?: Setting = new Setting
  protected settings?: Setting[]


  constructor(private auth: AuthService, private setService: SettingsService) {


  }


  async ngOnInit(): Promise<void> {
    this.settings = await this.setService.getList()
    this.modal = Modal.getOrCreateInstance('#modal-setting')
  }

  public openModal(modalTitle: string, settingId: number = 0): void {
    this.modalTitle = modalTitle

    if (settingId == 0) {
      this.model = new Setting()
    }
    else {
      this.model = this.settings!.find(set => {
        return set.id == settingId
      })
    }
    this.modal?.show()
  }

  public async removeSetting(id: number = 0): Promise<void> {
    this.setService.delete(id)
      .then(res => {
        this.settings = this.settings?.filter(add => add.id !== id)
        alert("Impostazione rimossa con successo")
      })
  }
  public async AddOrUpdate(): Promise<void> {
    if (this.model?.id == 0 || this.model!.id == undefined) {
      this.setService.add(this.model!)
        .then(res => {
          this.settings?.push(res)
          this.modal?.hide()
          alert("Impostazione aggiunta con successo")
        })
    }
    else {
      this.setService.update(this.model!)
        .then(res => {
          this.settings = this.settings?.filter(add => add.id !== res.id)
          this.settings?.push(res)

          this.modal?.hide()
          alert("Impostazioni aggiornata con successo")
        })
    }
  }

}
