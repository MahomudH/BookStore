import { Component, OnInit } from '@angular/core';
import { StaticPage } from 'src/app/Interfaces/StaticPage';
import { StaticPageService } from 'src/app/_services/static-page.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutUs:StaticPage;

  constructor(private _staticPageService:StaticPageService) { }

  ngOnInit(): void {
this.getStaticPage();
  }

  getStaticPage(){
    this._staticPageService.getStaticPageById(3).subscribe({
      next:response =>{
        this.aboutUs= response;
      }
    })
  }

}
