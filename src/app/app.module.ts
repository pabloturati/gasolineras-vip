import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {FormsModule} from '@angular/forms'
import { RouterModule } from "@angular/router";
import {HttpModule} from '@angular/http'

// import { SignupFormComponent } from './signup-form/signup-form.component';
// import { ProductPageComponent } from './product-page/product-page.component';
// import { CardProductComponent } from './card-product/card-product.component';
// import { DetailComponent } from './detail/detail.component';

//routes
import {routes} from './routes'

//services
import {AuthService} from './services/auth.service'
// import {ProductListService} from './product-list.service';
// import { EditProductComponent } from './edit-product/edit-product.component'
// import {PhoneService} from './services/phones.service';
// import { NewProductComponent } from './new-product/new-product.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NavComponent } from './nav/nav.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';
import { ProfileComponent } from './profile/profile.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { RoadAssistanceComponent } from './road-assistance/road-assistance.component';
import { GasEmergencyComponent } from './gas-emergency/gas-emergency.component';
// import { PrivateComponent } from './private/private.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    NavComponent,
    LearnMoreComponent,
    ProfileComponent,
    NewOrderComponent,
    RoadAssistanceComponent,
    GasEmergencyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
