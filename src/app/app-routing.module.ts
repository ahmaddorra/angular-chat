import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicComponent} from './public/public.component';
import {SecureComponent} from './secure/secure.component';
import {HomeComponent} from './public/home/home.component';
import {LoginComponent} from './public/login/login.component';
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  {path: 'secure', component: SecureComponent},
  {path: 'chat/:id', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
