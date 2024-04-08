import {
  getAllCustomers,
  getCustomer,
  getMOCustomer,
  getNRCustomer,
} from "../controllers/customerController";
import client from "../dataBase";

describe("Test of controller for Customers", () => {
  describe("Function getAllCustomer", () => {
    const req = {};
    const res = {};

    it("The function is called with the correct SQL-Statement", () => {
      const result = "SELECT * from CUSTOMER";
      let expectSql = "";

      jest.spyOn(client, "query").mockImplementation((Sql: string) => {
        expectSql = Sql;
      });

      getAllCustomers(req, res);

      expect(expectSql).toBe(result);
    });

    it("Function with error => Thrown Error", async () => {
      let expectedError: string | undefined | Object;

      jest
        .spyOn(client, "query")
        .mockImplementation((Sql: string, callback: any) => {
          callback(Error("Have Error"), null);
        });

      await getAllCustomers(req, res).catch((_error: Error) => {
        expectedError = _error.message;
      });

      expect(expectedError).toBe("res.status is not a function");
    });
  });

  describe("Function for get a precise Customer", () => {
    const req = { params: { customerId: 1 } };
    const res = {};

    it("The function is called with the correct SQL-Statement and correct id", () => {
      const result = "SELECT * from CUSTOMER WHERE c_custkey = 1";
      let expectSql = "";

      jest.spyOn(client, "query").mockImplementation((Sql: string) => {
        expectSql = Sql;
      });

      getCustomer(req, res);

      expect(expectSql).toBe(result);
    });
  });

  describe("Function for get customers with the most revenue", () => {
    let req:Object = { query: { an_zahl: 5 } };
    const res = {};

    it("The function use the correct SQL without the period", () => {
      const result = `
            SELECT c_name,c_address,n_name as nation,c_phone,sum(O_TOTALPRICE) as total
    FROM CUSTOMER 
    JOIN ORDERS ON C_CUSTKEY = O_CUSTKEY
    JOIN NATION ON N_NATIONKEY = C_NATIONKEY
    GROUP BY c_name,c_address,n_name,c_phone
    ORDER BY total DESC   
    LIMIT 5
            `.trim()
      let expectSql = "";

      jest.spyOn(client, "query").mockImplementation((Sql: string) => {
        expectSql = Sql.trim();
      });

      getNRCustomer(req, res);

      expect(expectSql).toBe(result);
    });

    it('The function use the correct SQL with the period',()=>{
        req ={query : {an_zahl :5,period:'2023-12-11:2025-11-10'}}

        const result = `
        SELECT c_name,c_address,n_name as nation,c_phone,sum(O_TOTALPRICE) as total
        FROM CUSTOMER 
        JOIN ORDERS ON C_CUSTKEY = O_CUSTKEY
        JOIN NATION ON N_NATIONKEY = C_NATIONKEY
        WHERE O_ORDERDATE >= '2023-12-11'::date AND O_ORDERDATE < ('2025-11-10'::date + '1 day'::interval)
        GROUP BY c_name,c_address,n_name,c_phone
        ORDER BY total DESC   
        LIMIT 5
        `;

        let expectSql = "";

        jest.spyOn(client, "query").mockImplementation((Sql: string) => {
            expectSql = Sql;
        });

        getNRCustomer(req, res);

        expect(expectSql).toBe(result);
    })
  });

  describe("Function for get customers with the most orders", () => {
    let req:Object = { query: { an_zahl: 5 } };
    const res = {};

    it("The function use the correct SQL without the period", () => {
      const result = `
        SELECT O_CUSTKEY,c_name,c_address,n_name as nation,c_phone, L_QUANTITY as quantity
        FROM ORDERS
        JOIN CUSTOMER ON C_CUSTKEY = O_CUSTKEY
        JOIN LINEITEM ON L_ORDERKEY = O_ORDERKEY
        JOIN NATION ON N_NATIONKEY = C_NATIONKEY
        GROUP BY O_CUSTKEY,c_name,c_address,n_name,c_phone, L_QUANTITY 
        ORDER BY L_QUANTITY DESC
        LIMIT 5
    `
      let expectSql = "";

      jest.spyOn(client, "query").mockImplementation((Sql: string) => {
        expectSql = Sql;
      });

      getMOCustomer(req, res);

      expect(expectSql).toBe(result);
    });

    it('The function use the correct SQL with the period',()=>{
        req ={query : {an_zahl :5,period:'2023-12-11:2025-11-10'}}

        const result = `
        SELECT O_CUSTKEY,c_name,c_address,n_name as nation,c_phone, L_QUANTITY as quantity
        FROM ORDERS
        JOIN CUSTOMER ON C_CUSTKEY = O_CUSTKEY
        JOIN LINEITEM ON L_ORDERKEY = O_ORDERKEY
        JOIN NATION ON N_NATIONKEY = C_NATIONKEY
        WHERE O_ORDERDATE >= '2023-12-11'::date AND O_ORDERDATE < ('2025-11-10'::date + '1 day'::interval)
        GROUP BY O_CUSTKEY,c_name,c_address,n_name,c_phone,L_QUANTITY
        ORDER BY L_QUANTITY DESC
        LIMIT 5
        `;

        let expectSql = "";

        jest.spyOn(client, "query").mockImplementation((Sql: string) => {
            expectSql = Sql;
        });

        getMOCustomer(req, res);

        expect(expectSql).toBe(result);
    })
  });
});
