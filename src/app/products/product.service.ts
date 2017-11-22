import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { IProduct } from './product.interface';

@Injectable()
export class ProductService {

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>('./api/products/products.json')
              .catch(this.handleError);
  }
  
  getProduct(id: number): Observable<IProduct> {
    /*
    let filtered: IProduct[];
    this.getProducts().subscribe((products) => {
      filtered = products.filter((prod) => {return prod.id === id});
      return Observable.of(filtered[0]);
    });
    return null;*/
    return this.getProducts().map( (items) => {
      return items.find( (item) => item.id == id)
    });
  }
  
  getProduct2(id: number): Promise<IProduct> {
    console.log(id);
    return new Promise((resolve, reject) => {
      this.getProducts().subscribe((products) => {
        let prod_found = products.find((prod) => prod.id === id);
        if(prod_found !== null){
          resolve(prod_found);
        } else {
          console.log("resolve NULL");
          resolve(null); //Podriamos considerarlo como reject también. Depende de nosotros.
        }
      }, (error) => {
        console.log("REJECT");
        reject("Excepcion obteniendo producto.");
      });
    })
  }

  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
