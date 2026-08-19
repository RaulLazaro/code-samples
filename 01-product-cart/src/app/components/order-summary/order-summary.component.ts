import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { ModalService } from '../../services/modal.service';
import { Product } from '../../models/product.model';

@Component({
  selector: '[order-summary]',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  public products: Product[];
  totalQuantity: number
  totalCost: number

  constructor(private dataService: DataService, private modalService: ModalService) { }

  ngOnInit() {
    this.dataService.dataList.subscribe(result => {
      this.totalQuantity = 0;
      this.totalCost = 0;
      for (let p of result) {
        this.totalQuantity += p.quantity;
        this.totalCost += p.quantity * p.price;
      }
    });
  }

  openModal(id: string) {
    this.modalService.open(id)
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
