import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    loadChildren: () => import('./coronavirus/coronavirus.module')
      .then(m => m.CoronavirusModule),
    path: ''
  },
  {
    loadChildren: () => import('./info/info.module')
      .then(m => m.InfoModule),
    path: 'infos'
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
})
export class AppRoutingModule { }
