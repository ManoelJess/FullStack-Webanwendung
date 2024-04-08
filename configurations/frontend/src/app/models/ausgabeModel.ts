import { Customer } from "./customerModel";
import { Order } from "./orderModel";

export class Ausgabe{
    constructor(
        public increase : number,
        public actualYearRevenue: number,
        public nextYearRevenue: number,
        public revenuelastyear? : number,
        public revenuelastmonth? : number,
        public revenuNmonth? : number,
        public revenuNyear? : number,
        public totalrevenue? : number,
        public customer? : Customer,
        public order? :Order
    ){}
}