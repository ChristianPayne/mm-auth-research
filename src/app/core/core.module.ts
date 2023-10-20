import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomFieldsService } from './custom-fields.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent],
  providers: [CustomFieldsService],
})
export class CoreModule {
  constructor() {
    console.log('Core Module was loaded.');
  }
}
