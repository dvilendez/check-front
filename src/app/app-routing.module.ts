import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { SendComponent } from './send/send.component';

const routes: Routes = [
  { path: 'new-address', component: NewAddressComponent },
  { path: 'send', component: SendComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
