import { Component, OnInit } from '@angular/core';
import { ShowSalesForUserDto } from 'src/app/Interfaces/Slae';
import { SalesService } from 'src/app/_services/sales.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-punchases',
  templateUrl: './punchases.component.html',
  styleUrls: ['./punchases.component.css'],
})
export class PunchasesComponent implements OnInit {
  sales: ShowSalesForUserDto[] ;

  constructor(private _saleService: SalesService) {}

  ngOnInit(): void {
    this.getAllSales();
  }

  getAllSales() {
    this._saleService.getAllSalesForUser().subscribe({
      next: (response) => {
        this.sales=response.map(item =>{
          return{
            ...item,
            bookImage : environment.baseUrlWithoutApi + 'Images/' +item.bookImage
          }
        });
      },
    });
  }
}
