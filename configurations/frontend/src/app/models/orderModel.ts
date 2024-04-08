export class Order{
    constructor(
		public o_custkey?: Number,
        public o_orderkey?: Number,
		public o_orderstatus?: String,
		public o_totalprice?: Number,
		public o_orderdate?: String,
		public o_orderpriority?: String,
		public o_clerk?: String,
		public o_shippriority?: Number,
		public o_comment?: String
    ){}
}