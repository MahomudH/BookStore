import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './components/admin/author/author.component';
import { BookComponent } from './components/admin/book/book.component';
import { CategoryComponent } from './components/admin/Category/category/category.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PublisherComponent } from './components/admin/publisher/publisher.component';
import { TranslatorComponent } from './components/admin/translator/translator.component';
import { HomeComponent } from './components/home/home.component';
import { ZoneComponent } from './components/admin/zone/zone.component';
import { ShowBookDetailsComponent } from './components/show-book-details/show-book-details.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { StaticPageComponent } from './components/admin/static-page/static-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { PunchasesComponent } from './components/user/punchases/punchases.component';
import { MainComponent } from './components/admin/main/main.component';
import { SalesComponent } from './components/admin/sales/sales.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate:[AdminGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: MainComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'author', component: AuthorComponent },
      { path: 'translator', component: TranslatorComponent },
      { path: 'publisher', component: PublisherComponent },
      { path: 'book', component: BookComponent },
      { path: 'zone', component: ZoneComponent },
      { path: 'staticPage', component: StaticPageComponent },
      { path: 'sales', component: SalesComponent },
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'purchases', component: PunchasesComponent },
      
    ],
  },
  { path: 'allBooks', component: AllBooksComponent },
  { path: 'book/:id', component: ShowBookDetailsComponent },
  {path: 'auth/login',  component: LoginComponent},
  { path: 'auth/register', component: RegisterComponent},
  {path: 'auth/forbidden', component: ForbiddenComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path:'**',component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
