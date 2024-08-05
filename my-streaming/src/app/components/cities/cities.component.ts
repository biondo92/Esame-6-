import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { City } from 'src/app/models/City';
import { Role } from 'src/app/models/Role';
import { AuthService } from 'src/app/services/auth.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  protected modalTitle?: string
  protected modal?: Modal
  protected model?: City = new City
  protected cities?: City[]




  constructor(private auth: AuthService, private citService: CitiesService) {


  }


  async ngOnInit(): Promise<void> {
    this.cities = await this.citService.getList()
    this.modal = Modal.getOrCreateInstance('#modal-city')
  }

  public openModal(modalTitle: string, cityId: number = 0): void {
    this.modalTitle = modalTitle

    if (cityId == 0) {
      this.model = new City()
    }
    else {
      this.model = this.cities!.find(cit => {
        return cit.id == cityId
      })
    }
    this.modal?.show()
  }

  public async removeCity(id: number = 0): Promise<void> {
    this.citService.delete(id)
      .then(res => {
        this.cities = this.cities?.filter(add => add.id !== id)
        alert("Citta rimossa con successo")
      })
  }

  public async AddOrUpdate(): Promise<void> {
    if (this.model?.id == 0 || this.model!.id == undefined) {
      this.citService.add(this.model!)
        .then(res => {
          this.cities?.push(res)
          this.modal?.hide()
          alert("Città aggiunta con successo")
        })
    }
    else {
      this.citService.update(this.model!)
        .then(res => {
          this.cities = this.cities?.filter(add => add.id !== res.id)
          this.cities?.push(res)

          this.modal?.hide()
          alert("Città aggiornata con successo")
        })
    }
  }

}
