import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecureComponent } from './secure/secure.component';
import {PublicModule} from './public/public.module';
import {RouterModule} from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SecureComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
