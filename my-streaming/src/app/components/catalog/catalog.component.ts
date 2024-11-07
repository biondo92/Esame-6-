import { Component } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Film } from 'src/app/models/Film';
import { Serie } from 'src/app/models/Serie';
import { CategoriesService } from 'src/app/services/categories.service';
import { FilmsService } from 'src/app/services/films.service';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {


  protected categories?: Category[]
  protected films?: Film[]
  protected series?: Serie[]
  protected catalog?: CategoryDisplay[] = []

  constructor(private catService: CategoriesService, private filmsService: FilmsService, private seriesService: SeriesService) {


  }


  async ngOnInit(): Promise<void> {
    this.categories = await this.catService.getList()
    var films = await this.filmsService.getList()
    var series = await this.seriesService.getList()

    for (var cat of this.categories) {
      var c = new CategoryDisplay(cat, films.filter(f => f.categoryId === cat.id), series.filter(s => s.categoryId === cat.id))
      this.catalog?.push(c)
    }

  }
}

class CategoryDisplay {
  public category: Category
  public films: Film[]
  public series: Serie[]

  constructor(cat: Category, films: Film[], series: Serie[]) {
    this.category = cat
    this.films = films
    this.series = series
  }
}