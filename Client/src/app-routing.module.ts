import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ques1Component } from './q1.component';
import { Ques2Component } from './q2.component';
import { Ques3Component } from './q3.component';

const routes: Routes = [
  { path: '', redirectTo: '/q1', pathMatch: 'full' },
  { path: 'q1',     component: Ques1Component },
  { path: 'q2',     component: Ques2Component },
  { path: 'q3',     component: Ques3Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
