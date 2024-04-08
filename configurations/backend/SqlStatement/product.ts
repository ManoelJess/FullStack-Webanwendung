const selectProducts = 'select * from PART'

const selectProduct =(id:any):string=>{return `select * from PART where p_partkey=${id}`}



export const sqlProduct = {
    selectProducts,
    selectProduct
};