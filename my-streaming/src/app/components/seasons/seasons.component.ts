import { Component, Input, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Season } from 'src/app/models/Season';
import { SeasonsService } from 'src/app/services/seasons.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {

  protected modalTitle?: string
  protected modal?: Modal
  protected model?: Season = new Season
  @Input()
  public seasons?: Season[]
  @Input()
  public serieId?: number



  constructor(private seasonsService: SeasonsService) {


  }
  async ngOnInit(): Promise<void> {

    this.modal = Modal.getOrCreateInstance('#modal-season')
  }

  public openModal(modalTitle: string, Id: number = 0): void {
    this.modalTitle = modalTitle

    if (Id == 0) {
      this.model = new Season()
      this.model!.serieId = this.serieId
    }
    else {
      this.model = this.seasons!.find(fil => {
        return fil.id == Id
      })
    }
    this.modal?.show()
  }

  public async removeSeason(id: number = 0): Promise<void> {
    this.seasonsService.delete(id)
      .then(res => {
        this.seasons = this.seasons?.filter(add => add.id !== id)
        alert("Stagione rimossa con successo")
      })
  }

  public async AddOrUpdate(): Promise<void> {
    if (this.model?.id == 0 || this.model!.id == undefined) {
      this.seasonsService.add(this.model!)
        .then(res => {
          this.seasons?.push(res)
          this.modal?.hide()
          alert("Stagione aggiunta con successo")
        })
    }
    else {
      this.seasonsService.update(this.model!)
        .then(res => {
          this.seasons = this.seasons?.filter(add => add.id !== res.id)
          this.seasons?.push(res)

          this.modal?.hide()
          alert("Stagione aggiornata con successo")
        })
    }
  }

}