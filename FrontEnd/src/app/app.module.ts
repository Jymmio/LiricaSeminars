import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUiLoaderConfig, SPINNER, PB_DIRECTION, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PageHeadComponent } from './components/page-head/page-head.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { GlobalService } from './services/global.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Chargement...",
  textColor:"#FFFFFF",
  textPosition: "center-center",
  pbColor:"blue",
  bgsColor:"blue",
  fgsColor:"blue",
  fgsType: SPINNER.threeStrings,
  fgsSize:150,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness: 5
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    PageHeadComponent,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
