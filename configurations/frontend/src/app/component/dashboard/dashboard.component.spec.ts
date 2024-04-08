import { TestBed } from "@angular/core/testing"
import { DashboardComponent } from "./dashboard.component"
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { CustomerServices } from "src/app/services/customerServices";
import { RevenueServices } from "src/app/services/revenueServices";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APP_CONFIG, AppConfig } from "src/app/app-config/app-config.module";
import { Ausgabe } from "src/app/models/ausgabeModel";
import { Customer } from "src/app/models/customerModel";
import { of } from "rxjs";

describe('DashboardComponent', () =>{

    let cust_service: CustomerServices;
    let rev_service: RevenueServices;    

    beforeEach(() => {TestBed.configureTestingModule({
        declarations: [DashboardComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [HttpClientTestingModule],
        providers: [    
            CustomerServices, 
            RevenueServices,
            { provide: APP_CONFIG, useValue: AppConfig }
        ],
    })
    cust_service = TestBed.inject(CustomerServices);
    rev_service = TestBed.inject(RevenueServices);
    } );

    it('schould be created', ()=> {
        const fixture = TestBed.createComponent(DashboardComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    //mock example for a method that should read data from a database, where the number of entries is unknown
    it('should initialize all (mocked) database entries', () =>{
        let spy = spyOn<CustomerServices, any>(cust_service, 'getAllBestCustomers')
        .and.returnValue(of([
            new Customer(1, "julia", "123 Main St", 237, "457", 1 ),
            new Customer(2, "benois", "3 Man St", 49, "45758421", 6 ),
        ]));

        cust_service.getAllBestCustomers().subscribe(customers => {
            expect(customers.length).toEqual(2);
        })
    });

    it('schould return the overal revenue', ()=>{
        let spy = spyOn<RevenueServices, any>(rev_service, 'getOveralRevenue')
        .and.returnValue(of([
            new Ausgabe(0,23,42,54,232,23,3231,131.234)
        ]));
        
        rev_service.getOveralRevenue().subscribe( revenue =>{
            expect(revenue[0].totalrevenue).toEqual(131.234)
        })
    })

} );    