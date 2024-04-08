import {
    getProduct,
    getProducts,
} from "../controllers/productsController";
  import client from "../dataBase";
  
  describe("Test of controller for Product with id", () => {
    describe("Function getProduct", () => {
      const req = { params: { productId:1}};
      const res = {};
  
      it("The function is called with the correct SQL-Statement", () => {
        const result = "select * from PART where p_partkey=1";
        let expectSql = "";
  
        jest.spyOn(client, "query").mockImplementation((Sql: string) => {
          expectSql = Sql;
        });
  
        getProduct(req, res);
  
        expect(expectSql).toBe(result);
      });
  
      it("Function with error => Thrown Error", async () => {
        let expectedError: string | undefined | Object;
  
        jest
          .spyOn(client, "query")
          .mockImplementation((Sql: string, callback: any) => {
            callback(Error("Have Error"), null);
          });
  
        await getProduct(req, res).catch((_error: Error) => {
          expectedError = _error.message;
        });
  
        expect(expectedError).toBe("res.status is not a function");
      });
    });
  
    describe("Test of controller for Products", () => {
      const req = {};
      const res = {};
  
      it("The function is called with the correct SQL-Statement", () => {
        const result = "select * from PART";
        let expectSql = "";
  
        jest.spyOn(client, "query").mockImplementation((Sql: string) => {
          expectSql = Sql;
        });
  
        getProducts(req, res);
  
        expect(expectSql).toBe(result);
      });

      it("Function with error => Thrown Error", async () => {
        let expectedError: string | undefined | Object;
  
        jest
          .spyOn(client, "query")
          .mockImplementation((Sql: string, callback: any) => {
            callback(Error("Have Error"), null);
          });
  
        await getProducts(req, res).catch((_error: Error) => {
          expectedError = _error.message;
        });
  
        expect(expectedError).toBe("res.status is not a function");
      });

    });
}); 