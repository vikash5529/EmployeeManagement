import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';


const routes: Routes = [
  { path: 'viewEmployee', component: ViewEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [ViewEmployeeComponent];
export const viewComponents = [HeaderComponent, FooterComponent];
