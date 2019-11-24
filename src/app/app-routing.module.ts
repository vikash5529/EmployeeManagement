import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeDialogComponent } from './dialog/edit-employee-dialog/edit-employee-dialog.component';

const routes: Routes = [
  { path: 'viewEmployee', component: ViewEmployeeComponent },
  { path: 'addEmployee', component: CreateEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const dialogComponents = [EditEmployeeDialogComponent];
export const routingComponents = [ViewEmployeeComponent, CreateEmployeeComponent];
export const viewComponents = [HeaderComponent, FooterComponent];
