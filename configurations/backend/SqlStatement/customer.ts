const selectCustomers = `SELECT * from CUSTOMER`;

const selectCustomer = (id: any): string => {
  return `SELECT * from CUSTOMER WHERE c_custkey = ${id}`;
};

const selectBestNRCustomer = (anzahl: number, period?: String): string => {
  if (period != undefined) {
    const anfangDatum: String = period?.split(":")[0];
    const endeDatum: String = period?.split(":")[1];

    return `
        SELECT c_name,c_address,n_name as nation,c_phone,sum(O_TOTALPRICE) as total
        FROM CUSTOMER 
        JOIN ORDERS ON C_CUSTKEY = O_CUSTKEY
        JOIN NATION ON N_NATIONKEY = C_NATIONKEY
        WHERE O_ORDERDATE >= '${anfangDatum}'::date AND O_ORDERDATE < ('${endeDatum}'::date + '1 day'::interval)
        GROUP BY c_name,c_address,n_name,c_phone
        ORDER BY total DESC   
        LIMIT ${anzahl}
        `;
  }

  return `
    SELECT c_name,c_address,n_name as nation,c_phone,sum(O_TOTALPRICE) as total
    FROM CUSTOMER 
    JOIN ORDERS ON C_CUSTKEY = O_CUSTKEY
    JOIN NATION ON N_NATIONKEY = C_NATIONKEY
    GROUP BY c_name,c_address,n_name,c_phone
    ORDER BY total DESC   
    LIMIT ${anzahl}
    `;
};

const selectCustomerRevnue = (period: String | undefined): string => {
  if (period != undefined) {
    const anfangDatum: String = period?.split(":")[0];
    const endeDatum: String = period?.split(":")[1];

    return `
        SELECT c_name,c_address,n_name as nation,c_phone,sum(O_TOTALPRICE) as total
        FROM CUSTOMER 
        JOIN ORDERS ON C_CUSTKEY = O_CUSTKEY
        JOIN NATION ON N_NATIONKEY = C_NATIONKEY
        WHERE O_ORDERDATE >= '${anfangDatum}'::date AND O_ORDERDATE < ('${endeDatum}'::date + '1 day'::interval)
        GROUP BY c_name,c_address,n_name,c_phone
        `;
  }

  return `
    SELECT c_name,c_address,n_name as nation,c_phone,sum(O_TOTALPRICE) as total
    FROM CUSTOMER 
    JOIN ORDERS ON C_CUSTKEY = O_CUSTKEY
    JOIN NATION ON N_NATIONKEY = C_NATIONKEY
    GROUP BY c_name,c_address,n_name,c_phone   
    `;
};

const selectMostOCustomer = (anzahl: number, period?: String): string => {
  if (period != undefined) {
    const anfangDatum: String = period?.split(":")[0];
    const endeDatum: String = period?.split(":")[1];

    return `
        SELECT O_CUSTKEY,c_name,c_address,n_name as nation,c_phone, L_QUANTITY as quantity
        FROM ORDERS
        JOIN CUSTOMER ON C_CUSTKEY = O_CUSTKEY
        JOIN LINEITEM ON L_ORDERKEY = O_ORDERKEY
        JOIN NATION ON N_NATIONKEY = C_NATIONKEY
        WHERE O_ORDERDATE >= '${anfangDatum}'::date AND O_ORDERDATE < ('${endeDatum}'::date + '1 day'::interval)
        GROUP BY O_CUSTKEY,c_name,c_address,n_name,c_phone,L_QUANTITY
        ORDER BY L_QUANTITY DESC
        LIMIT ${anzahl}
        `;
  }

  return `
        SELECT O_CUSTKEY,c_name,c_address,n_name as nation,c_phone, L_QUANTITY as quantity
        FROM ORDERS
        JOIN CUSTOMER ON C_CUSTKEY = O_CUSTKEY
        JOIN LINEITEM ON L_ORDERKEY = O_ORDERKEY
        JOIN NATION ON N_NATIONKEY = C_NATIONKEY
        GROUP BY O_CUSTKEY,c_name,c_address,n_name,c_phone, L_QUANTITY 
        ORDER BY L_QUANTITY DESC
        LIMIT ${anzahl}
    `;
};

export const sqlCustomer = {
  selectCustomer,
  selectCustomers,
  selectBestNRCustomer,
  selectCustomerRevnue,
  selectMostOCustomer,
};
