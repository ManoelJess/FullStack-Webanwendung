import {Component, OnInit} from '@angular/core';
import {ProduktService} from "../../services/produkt.service";
import { ProductModel } from 'src/app/models/product-model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [];
  dataSizePrice: any;
  dateContainerCounts: any;


  constructor(private productService: ProduktService) {

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.createChartSizePrice(res, true);
        this.createChartContainer(res);
      },
      error: (error) => {
        console.log(error.message);
      }
    });

  }

  createChartContainer(data: ProductModel[]){                       
    const containerCounts: {[key: string]: number} = {};
    this.products.forEach(product =>{
      const container = product.p_container.trim();

      if(containerCounts[container]===undefined){
        containerCounts[container]=0;
      }else{
        containerCounts[container]+=1;
      }
    });
    this.dateContainerCounts = {
      labels: Object.keys(containerCounts),
      datasets: [
        {
          data: Object.values(containerCounts),
          backgroundColor: this.generateRandomColors(Object.values(containerCounts).length, false)
        }
      ]
    }
  }

  createChartSizePrice(data: ProductModel[], isPrice: boolean) {
    this.dataSizePrice = {
      labels: data.map(d => d.p_name),
      innerHeight: 2,
      datasets: [
        {
          label: isPrice?'Preis': 'Größe',
          data: data.map(d => isPrice? d.p_retailprice: d.p_size),
          backgroundColor: this.generateRandomColors(data.length, true)
        }
      ]
    };
  }

  filterProducts(criteria: string) {
    if(criteria==='price'){
      this.createChartSizePrice(this.products, true);
    }else if(criteria === 'size'){
      this.createChartSizePrice(this.products, false);
    }
  }

  generateRandomColors(count: number, isOneColor: boolean): string[] {
    const Colors: string[] = [];
    if (!isOneColor) {
      for (let i = 0; i < count; i++) {
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        Colors.push(color)
      }
      return Colors;

    } else {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      for (let i = 0; i < count; i++) {
        Colors.push(color)
      }
      return Colors;

    }
  
  }

  status: boolean  = false;

  dropdownbtn(){
    this.status = !this.status;
  }

}