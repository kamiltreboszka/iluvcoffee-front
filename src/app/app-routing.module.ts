import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeAddComponent } from './coffee/coffee-add/coffee-add.component';
import { CoffeeEditComponent } from './coffee/coffee-edit/coffee-edit.component';
import { CoffeeComponent } from './coffee/coffee.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "coffees",
    pathMatch: "full",
  },
  {
    path: "coffees",
    component: CoffeeComponent,
  },
  {
    path: "coffees/add",
    component: CoffeeAddComponent,
  },
  {
    path: "coffees/edit/:id",
    component: CoffeeEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
