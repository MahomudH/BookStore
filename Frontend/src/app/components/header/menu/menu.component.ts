import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/Category';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this._categoryService.getCategories();
  }

  get categories(): Category[] {
    return this._categoryService.categories;
  }
}
