import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "../app-config/app-config.module";
import { Inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Customer } from "../models/customerModel";

@Injectable()
export class CustomerServices {
    
    private query : String | undefined;
    private apiUrl: string;

    public customers: Customer[] = [];
    public best_customers: Customer[] = [];
    public mostOrd_customers: Customer[] = [];
    public best_Allcustomers: Customer[] = [];
    public best_AllFilltercustomers: Customer[] = [];

    

    constructor(private http: HttpClient, @Inject(APP_CONFIG) private config:AppConfig){
        this.apiUrl = "http://localhost:3000";
    }
    public getAllCustomers(): void {
        const apiUrl = `${this.config.apiEndPoint}/customers`;
        console.log("API URL:", apiUrl);

        this.http.get<any>(apiUrl).subscribe(
            data => {
                console.log("API Response:", data);
                console.log("-----------customers------------", data);
                this.customers = data? data : [];
                console.log("this-customer: ", this.customers);
            },
            error => {
                console.error("API Error:", error);
            }
        );
    }

    public getBestOrdCustomersFilter(anzahl: number, startDate: string, endDate:string): Observable<Customer[]> {
        const apiUrl = `${this.config.apiEndPoint}/customers/mostOrder?an_zahl=${anzahl}&period=${startDate}:${endDate}`;
        return this.http.get<Customer[]>(apiUrl);
    }

    public getBestRevCustomersFilter(anzahl: number, startDate: string, endDate:string): Observable<Customer[]> {
        const apiUrl = `${this.config.apiEndPoint}/customers/best?an_zahl=${anzahl}&period=${startDate}:${endDate}`;
        console.log("-----My Filter::of Period::::: ",this.http.get<Customer[]>(apiUrl));
        return this.http.get<Customer[]>(apiUrl);
    }

    public getBestCustomers(anzahl: number): Observable<Customer[]> {
        const apiUrl = `${this.config.apiEndPoint}/customers/best?an_zahl=${anzahl}`;
        return this.http.get<Customer[]>(apiUrl);
      }
    
      public getMostOrdCustomers(anzahl: number): Observable<Customer[]> {
        const apiUrl = `${this.config.apiEndPoint}/customers/mostOrder?an_zahl=${anzahl}`;
        return this.http.get<Customer[]>(apiUrl);
      }
    
      public getAllBestCustomers(): Observable<Customer[]> {
        const apiUrl = `${this.config.apiEndPoint}/customers/customerRevenue`;
        return this.http.get<Customer[]>(apiUrl);
      }
    




}


