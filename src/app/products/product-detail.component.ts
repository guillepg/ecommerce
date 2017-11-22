import { Component, OnInit } from '@angular/core';
import { IProduct } from './product.interface';
import { ActivatedRoute, Router } from '@angular/router/';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Detalle de producto';
  product: IProduct;
  
  constructor(private _route:ActivatedRoute, private _router: Router, private _productService: ProductService) { }

  ngOnInit() {
    //GET de la clave :id
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += " " + id;
    /*this._productService.getProduct(id).subscribe((p) => {
      this.product = p;
      console.log("Producto recibido: " + p.name);
    });*/
    this._productService.getProduct2(id).then((p) => {
      console.log("Producto recibido: " + p.name);
      this.product = p;
    });
  }

  back(){
    this._router.navigate(['/products']);
  }


}
