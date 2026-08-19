import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../services/data.service";
import { Product } from '../../models/product.model';

@Component({
  selector: '[product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  add() {
    this.dataService.addProduct(this.product)
  }

  decrease() {
    this.dataService.decreaseProduct(this.product)
  }

  setQuantity(n: number, eRef) {
    if (n < 1)
      this.product.quantity = 1
    else
      this.product.quantity = n

    eRef.value = this.product.quantity
    this.dataService.setQuantityProduct(this.product)
  }
}
