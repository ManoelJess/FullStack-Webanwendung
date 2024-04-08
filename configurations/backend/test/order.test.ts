import {
  getOrders,
  getOrder,
  totalRevenue
} from "../controllers/orderController";
import client from "../dataBase";

describe("Test of controller for Orders", () => {
  describe("Function getOrders", () => {
    const req = {};
    const res = {};

    it("The function is called with the correct SQL-Statement", () => {
      const result = "select * from ORDERS";
      let expectSql = "";

      jest.spyOn(client, "query").mockImplementation((Sql: string) => {
        expectSql = Sql;
      });

      getOrders(req, res);

      expect(expectSql).toBe(result);
    });

    it("Function with error => Thrown Error", async () => {
      let expectedError: string | undefined | Object;

      jest
        .spyOn(client, "query")
        .mockImplementation((Sql: string, callback: any) => {
          callback(Error("Have Error"), null);
        });

      await getOrders(req, res).catch((_error: Error) => {
        expectedError = _error.message;
      });

      expect(expectedError).toBe("res.status is not a function");
    });
  });

  describe("Function for get a precise Order", () => {
    const req = { params: { orderId: 1 } };
    const res = {};

    it("The function is called with the correct SQL-Statement and correct id", () => {
      const result = "select * from ORDERS where O_ORDERKEY=1";
      let expectSql = "";

      jest.spyOn(client, "query").mockImplementation((Sql: string) => {
        expectSql = Sql;
      });

      getOrder(req, res);

      expect(expectSql).toBe(result);
    });
  });

  describe("Function totalRevenue", () => {
    const req = {};
    const res = {};

    it("The function is called with the correct SQL-Statement", () => {
      const result = "SELECT SUM(O_TOTALPRICE) as totalRevenue FROM ORDERS";
      let expectSql = "";

      jest.spyOn(client, "query").mockImplementation((Sql: string) => {
        expectSql = Sql;
      });

      totalRevenue(req, res);

      expect(expectSql).toBe(result);
    });

    it("Function with error => Thrown Error", async () => {
      let expectedError: string | undefined | Object;

      jest
        .spyOn(client, "query")
        .mockImplementation((Sql: string, callback: any) => {
          callback(Error("Have Error"), null);
        });

      await totalRevenue(req, res).catch((_error: Error) => {
        expectedError = _error.message;
      });

      expect(expectedError).toBe("res.status is not a function");
    });
  });
});
