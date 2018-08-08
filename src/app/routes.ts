import { Routes } from '@angular/router'
import { AppComponent } from './app.component';
// import { SignupFormComponent } from './signup-form/signup-form.component';
// import { ProductPageComponent } from './product-page/product-page.component';
// import {EditProductComponent} from './edit-product/edit-product.component'
// import { NewProductComponent } from './new-product/new-product.component';
import { LoginComponent } from './login/login.component'
import { IndexComponent } from './index/index.component'
import { LearnMoreComponent} from './learn-more/learn-more.component'
import { ProfileComponent } from './profile/profile.component'
import { NewOrderComponent } from './new-order/new-order.component'
import { RoadAssistanceComponent} from './road-assistance/road-assistance.component'
import { EventDetailComponent } from './event-detail/event-detail.component';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent},
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: IndexComponent },
    { path: 'learn',  component: LearnMoreComponent },
    { path: 'logout',  redirectTo: 'home', pathMatch: 'full' },
    { path: 'newOrder',  component: NewOrderComponent },
    { path: 'roadAssistance',  component: RoadAssistanceComponent },
    // { path: 'gasEmergency',  component: GasEmergencyComponent }
    // { 
    //   path:'products', 
    //   component: ProductPageComponent,
    //   children:[
    //     {
    //       path: 'new',
    //       component: NewProductComponent
    //     }
    //   ]
    // },
    // {
    //   path: 'new',
    //   component: NewProductComponent
    // },
    // {
    //   path: 'signup',
    //   component: SignupFormComponent
    // },
    {
      path: 'detail/:id',
      component: EventDetailComponent,
      children:[
          // {
          //     path:'edit',
          //     component:EditProductComponent
          // }
      ]
    }
  ]

