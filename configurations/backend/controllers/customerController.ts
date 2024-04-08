import { sqlCustomer } from "../SqlStatement/customer";
import client from "../dataBase";
import addResponse from "../subFunktion/addRequest";

export const getAllCustomers = (
  req: any,
  res: any
): Promise<string | Array<Object>> => {
  let response: string | Array<Object>;

  return new Promise((resolve: any, reject: any) => {
    client.query(sqlCustomer.selectCustomers, (err, resp) => {
      response = addResponse(
        err,
        res,
        resp,
        "Not customers field in the table"
      );

      if (typeof response !== "string") {
        resolve(response);
      }
      reject(response);
    });
  });
};

export const getCustomer = (
  req: any,
  res: any
): Promise<string | Array<Object>> => {
  const id = req.params.customerId; // query params

  let response: string | Array<Object>;

  return new Promise((resolve: any, reject: any) => {
    client.query(
      `SELECT * from CUSTOMER WHERE c_custkey = ${id}`,
      (err, resp) => {
        response = addResponse(
          err,
          res,
          resp,
          "Not customers field in the table"
        );

        if (typeof response === "string") {
          reject(response);
        }
        resolve(response);
      }
    );
  });
};

export const getNRCustomer = (
  req: any,
  res: any
): Promise<String | Array<Object>> => {
  const anzahl = parseInt(req.query.an_zahl); //query params
  const period = req.query?.period; // query params

  let response: String | Array<Object>;

  return new Promise((resolve: any, reject: any) => {
    client.query(
      sqlCustomer.selectBestNRCustomer(anzahl, period),
      (err, resp) => {
        response = addResponse(
          err,
          res,
          resp,
          "Not customers field in the table"
        );

        if (typeof response === "string") {
          reject(response);
        }
        resolve(response);
      }
    );
  });
};

export const getCustomerRevenue = (
  req: any,
  res: any
): Promise<String | Array<Object>> => {
  const period: String | undefined = req.query?.period; // optional query params
  let response: String | Array<Object>;

  return new Promise((resolve: any, reject: any) => {
    client.query(sqlCustomer.selectCustomerRevnue(period), (err, resp) => {
      response = addResponse(
        err,
        res,
        resp,
        "Not customers field in the table"
      );

      if (typeof response === "string") {
        reject(response);
      }
      resolve(response);
    });
  });
};

export const getMOCustomer = (
  req: any,
  res: any
): Promise<String | Array<Object>> => {
  const anzahl = parseInt(req.query.an_zahl); // query params
  const period = req.query?.period; //optional query params
  let response: String | Array<Object>;

  return new Promise((resolve: any, reject: any) => {
    client.query(
      sqlCustomer.selectMostOCustomer(anzahl, period),
      (err, resp) => {
        response = addResponse(
          err,
          res,
          resp,
          "Not customers field in the table"
        );

        if (typeof response === "string") {
          reject(response);
        }
        resolve(response);
      }
    );
  });
};
