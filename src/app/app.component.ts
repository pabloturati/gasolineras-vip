
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  changeActivation: boolean
  
  //Nav Update
  updateNav(){
    this.changeActivation = !this.changeActivation
  }

  componentAdded(e){
    this.updateNav();
  }

  // //Child Sample starts here
  // interval: any;
  // dynamicdata: string = 'This is dynamic data!'
  // chatItems: Array<string> = []

  // start() {
  //   this.interval = setInterval(() => {
  //     this.dynamicdata = new Date().toLocaleTimeString();
  //   }, 1000);
  // }

  // stop() {
  //   clearInterval(this.interval);
  // }

  // talkBack(e: string) {
  //   this.chatItems.push(e);
  // }

  // //Child Sample ends here
  
  logout(){
    localStorage.removeItem('user')
  }
}


