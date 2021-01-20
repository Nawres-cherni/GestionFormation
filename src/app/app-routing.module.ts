import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { FormateurComponent } from './formateur/formateur.component';

const routes: Routes = [
  {path:'admin',component:AdminComponent},
  {path:'home',component:AdminhomeComponent},
  {path:'formateur',component:FormateurComponent},
  {path: '',   redirectTo: '/admin', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
