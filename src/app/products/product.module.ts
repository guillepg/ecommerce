import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './product.service';

import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
      ProductListComponent,
      ProductDetailComponent,
      ConvertToSpacesPipe
    ],
  providers: [
      ProductService
  ],
  imports: [
    SharedModule,
      RouterModule.forChild([
        {path: 'products', component: ProductListComponent},
        {path: 'products/:id', component: ProductDetailComponent}
      ])
  ]
})
export class ProductModule { }
