import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CustomerServices } from 'src/app/services/customerServices';
import { Chart, ChartTypeRegistry } from 'chart.js/auto';
import { Customer } from 'src/app/models/customerModel';
import { catchError, defaultIfEmpty, forkJoin, Observable, of } from 'rxjs';
import { Ausgabe } from 'src/app/models/ausgabeModel';
import { RevenueServices } from 'src/app/services/revenueServices';
import { TranslocoService } from '@ngneat/transloco';

type ValidChartType = 'line' | 'bar' | 'pie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  isdisplay = false;
  overalrevenue: number | undefined;
  lastMonthRevenue: number | undefined;
  lastYearRevenue: number | undefined;
  nextYearRevenue: number | undefined;

  constructor(private translocoService: TranslocoService, public customerservice: CustomerServices, public revenueservice: RevenueServices, private el: ElementRef, private renderer: Renderer2){
    
  }

  isEnglish = false;

  changeLanguage(code: string): void{
    this.translocoService.setActiveLang(code);
    this.isEnglish = !this.isEnglish;
  }


  value:string = '3';
  value1:string = '3';
  currentChartBars: number = parseInt(this.value);
  currentChartBars1: number = parseInt(this.value1);

  startdate = "2018-07-22";
  enddate: string = '2023-12-16';

  startdateOrd: string = "2018-07-22";
  enddateOrd: string = '2023-12-16';

  selectedChartType: ValidChartType= 'line';
  bestCustomersChart: Chart | null = null;
  mostOrdCustomersChart: Chart | null = null;
  CustomersChart: Chart | null = null;

  //expand icon
  isExpanded: boolean = true;
  isOn: boolean = true;
  darkMode: boolean = false;

  ngOnInit(): void {
    this.fetchData();
    this.ordfetch();
    this.bestfetch();
    this.fetchRevenue()
    this.customerservice.getBestRevCustomersFilter(parseInt(this.value), this.startdate.split('-')[1], this.enddate)
  }

  fetchRevenue():void{
    let overalRevenueObservable: Observable<Ausgabe[]> = this.revenueservice.getOveralRevenue().pipe(
      catchError((error: any) => {
        console.error("Error fetching Overall revenue: ", error);
        return of ([] as Ausgabe[]);
      })
    );
    let lastMonthRevenueObservable: Observable<Ausgabe[]> = this.revenueservice.getLastMonthRevenue().pipe(
      catchError((error: any) => {
        console.error("Error fetching Overall revenue: ", error);
        return of ([] as Ausgabe[]);
      })
    );
    let lastYearRevenueObservable: Observable<Ausgabe[]> = this.revenueservice.getLastYearRevenue().pipe(
      catchError((error: any) => {
        console.error("Error fetching Overall revenue: ", error);
        return of ([] as Ausgabe[]);
      })
    );
    let nextYearRevenueObservable: Observable<Ausgabe> = this.revenueservice.getNextYearRevenue().pipe(
      catchError((error: any) => {
        console.error("Error fetching Overall revenue: ", error);
        return  of(new Ausgabe(0,0,0));
      })
    );

    forkJoin([
      overalRevenueObservable.pipe(defaultIfEmpty([])),
      lastMonthRevenueObservable.pipe(defaultIfEmpty([])),
      lastYearRevenueObservable.pipe(defaultIfEmpty([])),
      nextYearRevenueObservable.pipe(defaultIfEmpty([])),
    ]).subscribe(
      (data) => {
        console.log("Revenue data: :", data)
        this.overalrevenue = data[0][0].totalrevenue;
        this.lastMonthRevenue = data[1][0].revenuelastmonth;
        this.lastYearRevenue = data[2][0].revenuelastyear;
        const daten = data[3] as Ausgabe;
        this.nextYearRevenue = Math.round(daten.nextYearRevenue);
      }
    )
  }


  fetchData(): void{
    this.customerservice.getAllCustomers()  
  const allBestCustomersObservable: Observable<Customer[]> = this.customerservice.getAllBestCustomers().pipe(
    catchError((error: any) => {
      console.error("Error fetching all best customers:", error);
      return of([] as Customer[]);
    })
  );

  forkJoin([
    allBestCustomersObservable.pipe(defaultIfEmpty([])),
  ]).subscribe(
    (data) => {
      this.customerservice.best_Allcustomers = data[0];
  
      this.generateCharts();
    },
    (error: any) => {
      console.error("Error fetching data:", error);
    }
  );
  }

  bestfetch(): void{
    const bestCustomersObservable: Observable<Customer[]> = this.customerservice.getBestRevCustomersFilter(this.currentChartBars, this.startdate, this.enddate).pipe(
      catchError((error: any) => {
        console.error("Error fetching best customers:", error);
        return of([] as Customer[]); // Return an empty array in case of an error
      })
    );

    forkJoin([
    bestCustomersObservable.pipe(defaultIfEmpty([])),
  ]).subscribe(
    (data) => {
      this.customerservice.best_customers = data[0];
      console.log('::::::::', data[0]);
  
      this.generatebestcustomerchart();
    },
    (error: any) => {
      console.error("Error fetching data:", error);
    }
  );
  }

  ordfetch(): void{
    const mostOrdCustomersObservable: Observable<Customer[]> = this.customerservice.getBestOrdCustomersFilter(this.currentChartBars1, this.startdateOrd, this.enddateOrd).pipe(
      catchError((error: any) => {
        console.error("Error fetching most ordered customers:", error);
        return of([] as Customer[]);
      })
    );

    forkJoin([
    mostOrdCustomersObservable.pipe(defaultIfEmpty([])),
  ]).subscribe(
    (data) => {
      this.customerservice.mostOrd_customers = data[0];
  
      this.generatebestcustomeOrdrchart();
    },
    (error: any) => {
      console.error("Error fetching data:", error);
    }
  );
  }

  generatebestcustomerchart(){

    if(this.bestCustomersChart){
      this.bestCustomersChart.destroy();
    }

    let bestCustomersLabels: string[] = this.customerservice.best_customers
    .slice(0, this.currentChartBars)
    .map((customer) => customer.c_name as string);

    let bestCustomersData: number[] = this.customerservice.best_customers
      .slice(0, this.currentChartBars)
      .map((customer) => customer.total as number);
    
    this.bestCustomersChart = new Chart('bestCustomersChart', {
      type: 'bar',
      data: {
        labels: bestCustomersLabels,
        datasets: [
          {
            label: 'Best Customers',
            data: bestCustomersData,
            backgroundColor: this.generateRandomColors(this.customerservice.best_customers.length),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Customers Name',
              color: 'blue',
            },
            ticks: {
              color: this.darkMode? 'white' : 'black',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Revenue in €',
              color: 'green',
            },
            ticks: {
              color: this.darkMode? 'white' : 'black',
            }
          },
        },
        plugins: {
          legend: {
            labels: {
              color: this.darkMode? 'white': 'black',
              font: {
                size: 21,
              },
              padding:10,              
            }
          }
        }
      }
    });
  }

  generatebestcustomeOrdrchart(){
    if(this.mostOrdCustomersChart){
      this.mostOrdCustomersChart.destroy();
    }

    const mostOrdCustomersLabels: string[] = this.customerservice.mostOrd_customers
    .slice(0, this.currentChartBars1)
    .map((customer) => customer.c_name as string);

    const mostOrdCustomersData: number[] = this.customerservice.mostOrd_customers
      .slice(0, this.currentChartBars1)
      .map((customer) => customer.quantity as number);
    console.log('--!!!: ', mostOrdCustomersLabels);
    
      this.mostOrdCustomersChart = new Chart('mostOrdCustomersChart', {
        type: 'bar',
        data: {
          labels: mostOrdCustomersLabels,
          datasets: [
            {
              label: 'Most Ordered Customers',
              data: mostOrdCustomersData,
              backgroundColor: this.generateRandomColors(this.customerservice.mostOrd_customers.length),
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              //barPercentage: 0.5
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Customers Name',
                color: 'blue',
              },
              ticks: {
                color: this.darkMode? 'white' : 'black',
              }
            },
            y: {
              title: {
                display: true,
                text: 'Orders',
                color: 'green',
              },
              ticks: {
                color: this.darkMode? 'white': 'black',
              }
            },
          },
          plugins: {
            legend: {
              labels: {
                color: this.darkMode? 'white': 'black',
                font: {
                  size: 21,
                },
                padding:10,
              }
            }
          }
        }
      });
  }

  generateCharts(): void {
    
    if(this.CustomersChart){
      this.CustomersChart.destroy();
    }
    const CustomersLabels: string[] = this.customerservice.best_Allcustomers
    .map((customer) => customer.c_name as string);

    const CustomersData: number[] = this.customerservice.best_Allcustomers
      .map((customer) => customer.total as number);  

    this.CustomersChart = new Chart('CustomersChart', {
      type: this.selectedChartType as keyof ChartTypeRegistry,
      data: {
        labels: CustomersLabels,
        datasets: [
          {
            label: 'Customers',
            data: CustomersData,
            fill:true,
            pointRotation: 3,
            backgroundColor: this.generateRandomColors(this.customerservice.best_Allcustomers.length),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            tension: 0.1
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Customers Name',
              color: 'blue',
            },
            ticks: {
              color: this.darkMode? 'white': 'black',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Revenue in €',
              color: 'green',
            },
            ticks: {
              color: this.darkMode? 'white': 'black',
            }
          },
        },
        plugins: {
          legend: {
            labels: {
              color: this.darkMode? 'white': 'black',
              font: {
                size: 21,
              },
              padding:10,
            }
          }
        }
      }
    });
  }
  
  decrement(): void {
    const numericValue = parseInt(this.value);
    if (numericValue > 3) {
      this.value = (numericValue - 1).toString();
      this.currentChartBars = numericValue - 1;
    } else {
      this.value = '3';
      this.currentChartBars = parseInt(this.value);
    }
    this.generatebestcustomerchart();
    this.bestfetch();
  }

  increment(): void {
    let numericValue = parseInt(this.value);
    this.value = (numericValue + 1).toString();
    this.currentChartBars = numericValue + 1;

    this.generatebestcustomerchart();
    this.bestfetch();
  }

  decrement1(): void {
    let numericValue1 = parseInt(this.value1);
    if ( numericValue1 > 3) {

      this.value1 = (numericValue1 - 1).toString();
      this.currentChartBars1 = numericValue1 - 1;
    } else {
      this.value1 = '3';
      this.currentChartBars1 = parseInt(this.value1);
    }
    this.generatebestcustomeOrdrchart();
    this.ordfetch();
  }

  increment1(): void {
    let numericValue1 = parseInt(this.value1);
    this.value1 = (numericValue1 + 1).toString();
    this.currentChartBars1 = numericValue1 + 1;

    this.generatebestcustomeOrdrchart();
    this.ordfetch();
  }

  onStartDateChange(event: any) {
    this.startdate = event.target.value;
    console.log("::::StartDate: ", this.startdate);
    this.bestfetch();
  }

  onEndDateChange(event: any) {
    this.enddate = event.target.value;
    console.log("::::EndDate: ", this.enddate);
    this.bestfetch();
  }

  onStartDateChangeOrd(event: any) {
    this.startdateOrd = event.target.value;
    console.log("::::StartDateOrd: ", this.startdateOrd);
    this.ordfetch();
  }

  onEndDateChangeOrd(event: any) {
    this.enddateOrd = event.target.value;
    console.log("::::EndDateOrd: ", this.enddateOrd);
    this.ordfetch();
  }

  toggleIcon():void{
    this.isExpanded = !this.isExpanded;
  }
  
  toggleDarkMode(): void{
    this.darkMode  = !this.darkMode;

    this.generateCharts();
    this.generatebestcustomeOrdrchart();
    this.generatebestcustomerchart();
  }

  generateRandomColors(count: number): string[]{
    const Colors: string[] = [];
    for(let i = 0; i < count; i++){
      const color  =`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, .2)`;
      Colors.push(color)
    }

    return Colors;
  }

  isFullScreen = false;

  toggleFullScreen() {
    this.toggleIcon();
    const element = document.documentElement;

    if (!this.isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();  
      }
    }

    this.isFullScreen = !this.isFullScreen;
  }

  onChartTypeChange(event: any): void{
    const selectedType = event.target.value as ValidChartType;
    this.selectedChartType = selectedType;
    this.generateCharts();
  }

  generateChartColors(count: number, darkMode:boolean): string[]{
    const colors: string[] = [];

    for (let i = 0; i < count; i++){
      const color = darkMode
      ? `rgba(255, 255, 255, 0.2)`
      : `rgba(75, 192, 192, 0.2)`;
      colors.push(color)
    }
    return colors;
  }
}
