import { Component } from '@angular/core';
import { CustomerServices } from 'src/app/services/customerServices';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  constructor(public customer: CustomerServices){}
  

}
