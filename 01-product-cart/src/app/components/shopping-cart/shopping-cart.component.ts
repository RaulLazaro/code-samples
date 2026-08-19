import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { Product } from '../../models/product.model';

@Component({
  selector: '[shopping-cart]',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public products: Product[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dataList.subscribe(result => {
      this.products = result
    });
  }

}
