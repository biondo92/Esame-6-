import { Component, Input, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Episode } from 'src/app/models/Episode';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  protected modalTitle?: string
  protected modal?: Modal
  protected model?: Episode = new Episode
  @Input()
  public episodes?: Episode[]
  @Input()
  public seasonId?: number



  constructor(private episodesService: EpisodesService) {


  }
  async ngOnInit(): Promise<void> {
    var selector = '#collapse-season-' + this.seasonId + ' #modal-episode'
    this.modal = Modal.getOrCreateInstance(selector)
  }

  public openModal(modalTitle: string, Id: number = 0): void {
    this.modalTitle = modalTitle

    if (Id == 0) {
      this.model = new Episode()
      this.model!.seasonId = this.seasonId
    }
    else {
      this.model = this.episodes!.find(fil => {
        return fil.id == Id
      })
    }
    this.modal?.show()
  }

  public async removeEpisode(id: number = 0): Promise<void> {
    this.episodesService.delete(id)
      .then(res => {
        this.episodes = this.episodes?.filter(add => add.id !== id)
        alert("Episodio rimosso con successo")
      })
  }

  public async AddOrUpdate(): Promise<void> {
    if (this.model?.id == 0 || this.model!.id == undefined) {
      this.episodesService.add(this.model!)
        .then(res => {
          this.episodes?.push(res)
          this.modal?.hide()
          alert("Episodio aggiunto con successo")
        })
    }
    else {
      this.episodesService.update(this.model!)
        .then(res => {
          this.episodes = this.episodes?.filter(add => add.id !== res.id)
          this.episodes?.push(res)

          this.modal?.hide()
          alert("Episodio aggiornato con successo")
        })
    }
  }

}
