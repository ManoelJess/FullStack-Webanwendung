import { Component, Input } from '@angular/core';
import { CustomerServices } from 'src/app/services/customerServices';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth  = 0; 

  constructor(public customerservice: CustomerServices){}

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}