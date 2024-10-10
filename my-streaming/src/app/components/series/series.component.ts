import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Category } from 'src/app/models/Category';
import { Serie } from 'src/app/models/Serie';
import { CategoriesService } from 'src/app/services/categories.service';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  protected modalTitle?: string
  protected modal?: Modal
  protected model?: Serie = new Serie
  protected categories?: Category[]
  protected series?: Serie[]

  constructor(private catService: CategoriesService, private seriesService: SeriesService) {


  }
  async ngOnInit(): Promise<void> {
    this.categories = await this.catService.getList()
    this.modal = Modal.getOrCreateInstance('#modal-serie')
    this.series = await this.seriesService.getList()
  }

  public openModal(modalTitle: string, Id: number = 0): void {
    this.modalTitle = modalTitle

    if (Id == 0) {
      this.model = new Serie()
    }
    else {
      this.model = this.series!.find(fil => {
        return fil.id == Id
      })
    }
    this.modal?.show()
  }

  public async removeSerie(id: number = 0): Promise<void> {
    this.seriesService.delete(id)
      .then(res => {
        this.series = this.series?.filter(add => add.id !== id)
        alert("Serie rimossa con successo")
      })
  }
  public categoryName(id: number = 0): string {
    return this.categories?.find(c => {
      return c.id == id
    })?.description ?? ""
  }

  public async AddOrUpdate(): Promise<void> {
    if (this.model?.id == 0 || this.model!.id == undefined) {
      this.seriesService.add(this.model!)
        .then(res => {
          this.series?.push(res)
          this.modal?.hide()
          alert("Serie aggiunta con successo")
        })
    }
    else {
      this.seriesService.update(this.model!)
        .then(res => {
          this.series = this.series?.filter(add => add.id !== res.id)
          this.series?.push(res)

          this.modal?.hide()
          alert("Serie aggiornata con successo")
        })
    }
  }

  public OnCollapse() {
    var trigger = document.querySelector("#collapse-trigger-series")
    for (var i = 0; i < trigger!.children.length; i++) {
      if (trigger?.children[i].classList.contains("d-none")) {
        trigger.children[i].classList.remove("d-none")
      } else {
        trigger?.children[i].classList.add("d-none")
      }
    }

  }

}
