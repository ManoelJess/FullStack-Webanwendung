import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../models/product-model";



@Injectable({
  providedIn: 'root'
})
export class ProduktService {
  private apiUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(this.apiUrl) ;
  }
}
