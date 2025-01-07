import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Category } from 'src/app/models/Category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  protected modalTitle?: string
  protected modal?: Modal
  protected model?:Category= new Category
  protected categories?:Category[]
  constructor(private auth:AuthService,private catService:CategoriesService) {
    
    
  }
  async ngOnInit(): Promise<void> {
    //recupera le categorie attualmente inserite
   this.categories= await this.catService.getList()
   //crea o recupera un istanza del modal di boostrap, utilizzato come contenitore per il form
   this.modal = Modal.getOrCreateInstance('#modal-category')
  }


  //riceve il modello da passare al form, ed utilizza le info relative al modello per determinare se si tratta un Add o Edit ed infine
  //mostra il modal
  public openModal(modalTitle: string, categoryId: number = 0): void {
    this.modalTitle = modalTitle

    if(categoryId == 0){
      this.model = new Category()
    }
    else{
      this.model = this.categories!.find(cat => {
        return cat.id == categoryId
      })
    }
    this.modal?.show()
  }

  //riceve in input l'Id di una categoria ed esegue una chiamata per eliminare la categoria dal DB
  public async removeCategory(id: number = 0): Promise<void> {
    this.catService.delete(id)
    .then(res => {
      this.categories= this.categories?.filter(add => add.id !== id)
      alert("Categoria rimossa con successo")
    })
  }

  //questa funzione invia il modello al API (post o put) in base alla presenza o meno del campo Id
  public async AddOrUpdate(): Promise<void> {
    if(this.model?.id == 0 || this.model!.id == undefined){
      this.catService.add(this.model!)
      .then(res => { 
        this.categories?.push(res)
        this.modal?.hide()
        alert("Categoria aggiunta con successo")
      })
    }
    else{
      this.catService.update(this.model!)
      .then(res => {
        this.categories = this.categories?.filter(add => add.id !== res.id)
        this.categories?.push(res)

        this.modal?.hide()
        alert("Categoria aggiornata con successo")
      })
    }
  }
}
