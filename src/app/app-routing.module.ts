import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSignComponent } from './pages/form-sign/form-sign.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:  "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "sign",
    component: FormSignComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
