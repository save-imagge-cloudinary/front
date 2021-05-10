import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImagesComponent} from './images/images.component';
import {AddNewComponent} from './add-new/add-new.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ImagesComponent
  },
  {
    path: 'add',
    component: AddNewComponent,
  },
  {
    path: 'detail',
    component: DetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
