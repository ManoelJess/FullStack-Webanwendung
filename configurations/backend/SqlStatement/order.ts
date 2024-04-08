const selectOrders = 'select * from ORDERS'

const selectOrder = (id:any):string=>{return `select * from ORDERS where O_ORDERKEY=${id}`}

const getTotalRevenue = 'SELECT SUM(O_TOTALPRICE) as totalRevenue FROM ORDERS'

const getMonthRevenue = (month:string):string=>{
    if(month == "last"){
        return `
        select sum(o.o_totalprice) as revenue${month}Month 
        from orders o 
        where date_part('month',o.o_orderdate) = 
        case when date_part('month',current_date) = 1 then 12
        else date_part('month',(current_date))-1
        end
        and
        date_part('year',o.o_orderdate) = 
        case when date_part('month',current_date) = 1 then date_part('year',(current_date))-1
        else date_part('year',current_date) 
        end;
        `
    }
    const intMonth = parseInt(month);

    return `
        SELECT  SUM(O_TOTALPRICE) as revenue${month}Month
        FROM ORDERS
        WHERE DATE_PART('month',O_ORDERDATE) = ${intMonth}
    `
}

const getYearRevenue = (year:string):string=>{
    if(year == "last"){
        return `
            SELECT  SUM(O_TOTALPRICE) as revenue${year}Year
            FROM ORDERS
            WHERE DATE_PART('year',O_ORDERDATE) = (DATE_PART('year',CURRENT_DATE)-1)
        `
    }
    const intMonth = parseInt(year);

    return `
        SELECT  SUM(O_TOTALPRICE) as revenue${year}Month
        FROM ORDERS
        WHERE DATE_PART('year',O_ORDERDATE) = ${intMonth}
    `
}

const actuelYearRevenue = `
    SELECT SUM(O_TOTALPRICE) as actualYearRevenue
    FROM ORDERS
    WHERE DATE_PART('year',O_ORDERDATE) = (DATE_PART('year',CURRENT_DATE))
`

const lastYearRevenue = `
    SELECT SUM(O_TOTALPRICE) as lastYearRevenue
    FROM ORDERS
    WHERE DATE_PART('year',O_ORDERDATE) = (DATE_PART('year',CURRENT_DATE)-1)
`
   


export const sqlOrders = {
    selectOrders,
    selectOrder,
    getTotalRevenue,
    getMonthRevenue,
    getYearRevenue,
    actuelYearRevenue,
    lastYearRevenue
}
