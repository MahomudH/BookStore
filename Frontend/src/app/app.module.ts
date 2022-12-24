import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/header/cart/cart.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { SearchBarComponent } from './components/header/search-bar/search-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderComponent } from './components/header/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MostOrderBooksComponent } from './components/most-order-books/most-order-books.component';
import { AdsBookComponent } from './components/ads-book/ads-book.component';
import { CategoryComponent } from './components/admin/Category/category/category.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './components/admin/author/author.component';
import { TranslatorComponent } from './components/admin/translator/translator.component';
import { PublisherComponent } from './components/admin/publisher/publisher.component';
import { BookComponent } from './components/admin/book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateOrEditCategoryComponent } from './components/admin/Category/create-or-edit-category/create-or-edit-category.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateOrEditAuthorComponent } from './components/admin/author/create-or-edit-author/create-or-edit-author.component';
import { CreateOrEditPublisherComponent } from './components/admin/publisher/create-or-edit-publisher/create-or-edit-publisher.component';
import { CreateOrEditTranslatorComponent } from './components/admin/translator/create-or-edit-translator/create-or-edit-translator.component';
import { CreateOrEditBookComponent } from './components/admin/book/create-or-edit-book/create-or-edit-book.component';
import { ZoneComponent } from './components/admin/zone/zone.component';
import { CreateOrEditZoneComponent } from './components/admin/zone/create-or-edit-zone/create-or-edit-zone.component';
import { ShowBookDetailsComponent } from './components/show-book-details/show-book-details.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { NewBooksComponent } from './components/new-books/new-books.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { JwtInterceptor } from './_services/jwt.interceptor';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { StaticPageComponent } from './components/admin/static-page/static-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { PunchasesComponent } from './components/user/punchases/punchases.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    MenuComponent,
    SearchBarComponent,
    HeroComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    MostOrderBooksComponent,
    AdsBookComponent,
    CategoryComponent,
    DashboardComponent,
    AuthorComponent,
    TranslatorComponent,
    PublisherComponent,
    BookComponent,
    CreateOrEditCategoryComponent,
    CreateOrEditAuthorComponent,
    CreateOrEditPublisherComponent,
    CreateOrEditTranslatorComponent,
    CreateOrEditBookComponent,
    ZoneComponent,
    CreateOrEditZoneComponent,
    ShowBookDetailsComponent,
    AllBooksComponent,
    NewBooksComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    StaticPageComponent,
    AboutUsComponent,
    UserProfileComponent,
    UserDashboardComponent,
    PunchasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-top-left'
    }),
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
