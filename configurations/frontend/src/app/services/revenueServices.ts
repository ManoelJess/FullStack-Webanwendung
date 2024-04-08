import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "../app-config/app-config.module";
import { Inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Customer } from "../models/customerModel";
import { Ausgabe } from "../models/ausgabeModel";

@Injectable()
export class RevenueServices { 
    
    private apiUrl: string;
    

    constructor(private http: HttpClient, @Inject(APP_CONFIG) private config:AppConfig){
        this.apiUrl = "http://localhost:3000";
    }

    public getOveralRevenue(): Observable<Ausgabe[]> {
        const apiUrl = `${this.config.apiEndPoint}/revenues`;
        return this.http.get<Ausgabe[]>(apiUrl);
    } 

    public getLastMonthRevenue(): Observable<Ausgabe[]> {
        const apiUrl = `${this.config.apiEndPoint}/revenues/month?month_s=last`;
        return this.http.get<Ausgabe[]>(apiUrl);
    } 

    public getLastYearRevenue(): Observable<Ausgabe[]> {
        const apiUrl = `${this.config.apiEndPoint}/revenues/year?year_s=last`;
        return this.http.get<Ausgabe[]>(apiUrl);
    } 

    public getNextYearRevenue(): Observable<Ausgabe> {
        const apiUrl = `${this.config.apiEndPoint}/revenues/year/next`;
        return this.http.get<Ausgabe>(apiUrl);
    } 

}


