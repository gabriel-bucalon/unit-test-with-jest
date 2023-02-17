import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSignComponent } from './pages/form-sign/form-sign.component';
import { HomeComponent } from './pages/home/home.component';
import { ListEmployeeComponent } from './pages/list-employee/list-employee.component';

const routes: Routes = [
  {
    path:  "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "sign",
    component: FormSignComponent
  },
  {
    path: "list-employee",
    component: ListEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
