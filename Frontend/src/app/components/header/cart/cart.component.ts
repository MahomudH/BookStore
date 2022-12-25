import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/_services/sales.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  numberOfSales = 10;

  constructor(private _salesService: SalesService) {}

  ngOnInit(): void {}

}
