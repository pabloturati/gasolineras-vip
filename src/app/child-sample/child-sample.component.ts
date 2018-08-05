// import { Component, OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-child-sample',
  templateUrl: './child-sample.component.html',
  styleUrls: ['./child-sample.component.css']
})
export class ChildSampleComponent implements OnChanges {

  @Input() dynamicdata: string;  
  @Input() staticdata: string;

  @Output() talk: EventEmitter<string> = new EventEmitter<string>();

  talkBack(say: string) {
    this.talk.emit(say);
  }

  ngOnChanges(change){
    //alert("change happened")
    console.log(change)
  }

  somethingElse(){
    console.log("algo mas")
  }

  //quité implements OnInit porque es un child
  constructor() {}

  // ngOnInit() {
  // }

}
