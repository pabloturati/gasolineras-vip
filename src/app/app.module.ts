import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http'

// import { SignupFormComponent } from './signup-form/signup-form.component';
// import { ProductPageComponent } from './product-page/product-page.component';
// import { CardProductComponent } from './card-product/card-product.component';
// import { DetailComponent } from './detail/detail.component';

//routes
import {routes} from './routes'

//services
import { AuthService } from './services/auth.service'
import { EmergencyService } from './services/emergency.service'
import { FirebaseService } from './services/firebase.service'
import { SaleService } from './services/sale.service';


//Components
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NavComponent } from './nav/nav.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';
import { ProfileComponent } from './profile/profile.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { RoadAssistanceComponent } from './road-assistance/road-assistance.component';


//Child Sample
import { ChildSampleComponent } from './child-sample/child-sample.component';
import { MapApiComponent } from './map-api/map-api.component';
import { EventDetailComponent } from './event-detail/event-detail.component';


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
    ChildSampleComponent,
    MapApiComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [
    AuthService,
    EmergencyService,
    FirebaseService,
    SaleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
