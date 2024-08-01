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
   this.categories= await this.catService.getList()
   this.modal = Modal.getOrCreateInstance('#modal-category')
  }


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

  public async removeCategory(id: number = 0): Promise<void> {
    this.catService.delete(id)
    .then(res => {
      this.categories= this.categories?.filter(add => add.id !== id)
      alert("Categoria rimossa con successo")
    })
  }

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
