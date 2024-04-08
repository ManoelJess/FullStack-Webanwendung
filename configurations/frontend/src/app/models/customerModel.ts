export class Customer {
	
    constructor(
        public c_custkey: number,
        public c_name: string,
        public c_address: string,
        public c_nationkey: number,
        public c_phone: string,
        public o_custKey?: number,
        public c_acctbal?: number,
        public c_mktsegment?: String,
        public c_comment?: string,
        public totalRevnue?: number,
		public total?: number,
		public quantity?: number,
        public L_QUANTITY?: number
    ){}
}