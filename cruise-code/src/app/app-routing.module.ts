import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourDetailsComponent } from './features/components/tour-details/tour-details.component';
import { HomeComponent } from './features/components/home/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'tour/:id', component: TourDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
