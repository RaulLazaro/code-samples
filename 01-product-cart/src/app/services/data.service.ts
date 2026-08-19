import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })

export class DataService {
    private _productListSource: BehaviorSubject<Product[]> = new BehaviorSubject([]);
    dataList: Observable<Product[]> = this._productListSource.asObservable()

    constructor(private httpService: HttpClient) {
        if (localStorage.getItem("cartData") === null) {
            this.httpService.get<Product[]>("assets/cartData.json").subscribe(res => {
                this._productListSource.next(res);
                localStorage.setItem("cartData", JSON.stringify(this._productListSource.value));
            });
        }
        else {
            this._productListSource.next(JSON.parse(localStorage.getItem("cartData")));
        }
    }

    saveData() {
        localStorage.setItem("cartData", JSON.stringify(this._productListSource.value));
    }

    addProduct(product: Product) {
        let added = false;
        for (let p of this._productListSource.value) {
            if (p.code === product.code) {
                p.quantity += 1;
                added = true;
                break;
            }
        }
        if (!added) {
            product.quantity = 1;
            this._productListSource.value.push(product);
        }
        this._productListSource.next(this._productListSource.value);
        this.saveData();
    }

    decreaseProduct(product: Product) {
        this._productListSource.value.forEach((p, index) => {
            if (p.code === product.code) {
                p.quantity -= 1;
                if (p.quantity == 0) {
                    this._productListSource.value.splice(index, 1);
                }
            }
        });
        this._productListSource.next(this._productListSource.value);
        this.saveData();
    }

    setQuantityProduct(product: Product) {
        for (let p of this._productListSource.value) {
            if (p.code === product.code)
                p.quantity = product.quantity;
        }
        this._productListSource.next(this._productListSource.value);
        this.saveData();
    }
}
