import { sqlOrders } from "../SqlStatement/order";
import client from "../dataBase";
import addResponse from "../subFunktion/addRequest";

export const getOrders = (
  req: any,
  res: any,
): Promise<Array<Object> | String> => {
  let response: Array<Object> | String;

  return new Promise((resolve: any, reject: any) => {
    client.query(sqlOrders.selectOrders, (err, resp) => {
      response = addResponse(err, res, resp, "ErrorG");

      if (typeof response === "string") {
        reject(response);
      }
      resolve(response);
    });
  });
};

export const getOrder = (
  req: any,
  res: any,
): Promise<Array<Object> | String> => {
  const id = req.params.orderId; //query params

  let response: Array<Object> | String;

  return new Promise((resolve: any, reject: any) => {
    client.query(sqlOrders.selectOrder(id), (err, resp) => {
      response = addResponse(err, res, resp, "Error");

      if (typeof response === "string") {
        reject(response);
      }
      resolve(response);
    });
  });
};

export const totalRevenue = (
  req: any,
  res: any,
): Promise<Array<Object> | String> => {
  let response: Array<Object> | String;

  return new Promise((resolve: any, reject: any) => {
    client.query(sqlOrders.getTotalRevenue, (err, resp) => {
      response = addResponse(err, res, resp, "Error");

      if (typeof response === "string") {
        reject(response);
      }
      resolve(response);
    });
  });
};

export const monthRevenue = (
  req: any,
  res: any
): Promise<Array<Object> | String> => {
  const month = req.query.month_s; //query parameter

  let response: Array<Object> | String;

  return new Promise((resolve: any, reject: any) => {
    client.query(sqlOrders.getMonthRevenue(month), (err, resp) => {
      response = addResponse(
        err,
        res,
        resp,
        `No Revenue on the ${month} month`
      );

      if (typeof response === "string") {
        reject(response);
      }
      resolve(response);
    });
  });
};

export const yearRevenue = (
  req: any,
  res: any,
): Promise<Array<Object> | String> => {
  const year = req.query.year_s; //query parameters

  let response: Array<Object> | String;

  return new Promise((resolve: any, reject: any) => {
    client.query(sqlOrders.getYearRevenue(year), (err, resp) => {
      response = addResponse(err, res, resp, `No Revenue on the ${year} year`);

      if (typeof response === "string") {
        reject(response);
      }
      resolve(response);
    });
  });
};

export const nextYearRevenue = async (
  req: any,
  res: any
): Promise<number> => {
  const actualYearRevenueF = (
    req: any,
    res: any
  ): Promise<number> => {
    return new Promise((resolve: any, reject: any) => {
      let result = 1;

      client.query(sqlOrders.actuelYearRevenue, (err, resp) => {
        console.log("Error", err);
        result = !err ? resp.rows[0].actualyearrevenue : 1;

        resolve(result);
      });
      console.log("resultactual", result);
    });
  };

  const lastYearRevenueF = (req: any, res: any): Promise<number> => {
    return new Promise((resolve: any, reject: any) => {
      let result = 1;

      client.query(sqlOrders.lastYearRevenue, (err, resp) => {
        console.log("Error", err);
        result = !err ? resp.rows[0].lastyearrevenue : 0;

        resolve(result);
      });
      console.log("resultactual", result);
    });
  };

  const lastYearRevenue = await lastYearRevenueF(req, res);
  const actualYearRevenue = await actualYearRevenueF(req, res);

  const increase =
    lastYearRevenue !== null ? lastYearRevenue / actualYearRevenue : 0;

  const nextYearRevenue = increase!=0 ? actualYearRevenue * increase : 0;

  res.status(200).json({
    increase: `${increase}`,
    lastYearRevenue: `${lastYearRevenue}`,
    actualYearRevenue: `${actualYearRevenue}`,
    nextYearRevenue: `${nextYearRevenue}`,
  });

  return nextYearRevenue;
};
