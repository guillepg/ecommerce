import { Component, OnInit } from '@angular/core';
import { IProduct } from './product.interface';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductService } from './product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // ---------- ATRIBUTOS ----------
  _pageTitle: string = "Lista de productos";
  private _listFilter: string;
  filteredProducts: Array<IProduct> = [];
  _showImages: boolean = false;
  _products: Array<IProduct>; 


  constructor(private _productService: ProductService) {    

  }  
  
    // ---------- GETTERS / SETTERS ----------
  
  get pageTitle():string{
    return this._pageTitle;
  }
  set pageTitle(title:string){
    this._pageTitle = title;
  }

  get products():IProduct[]{
    return this._products;
  }
  set products(pr:IProduct[]){
    this._products = pr;
  }
  
  get showImages():boolean{
    return this._showImages;
  }
  set showImages(show:boolean){
    this._showImages = show;
  }
  
  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(filt:string){
    this._listFilter = filt;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  // ---------- MÉTODOS AUXILIARES ----------  
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    /*
    return this.products.filter(function(product: IProduct){
      return product.name.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
    */
    return this.products.filter((product: IProduct) =>{
      return (product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    });
  }

  toggleImages(){
    if(this._showImages)
      this._showImages = false;
    else
      this._showImages = true;
  }

  changeView(data){
    return(data);
  }
  
  // ---------- MÉTODOS DEL SISTEMA ----------
  ngOnInit() {
    this._productService.getProducts().subscribe((products) => {
        this.products = products;
        this.filteredProducts = this.products;
      }, (error) => {
        alert(error);
      });    
    }
}
