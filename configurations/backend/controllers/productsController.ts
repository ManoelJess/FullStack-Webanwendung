import { sqlProduct } from "../SqlStatement/product";
import client from "../dataBase";
import addResponse from "../subFunktion/addRequest";

export const getProducts = (
    req: any,
    res: any,
): Promise<String | Array<object>> => {
    let response: String | Array<Object>;

    return new Promise((resolve: any, reject:any) => {
        client.query(
            sqlProduct.selectProducts,
            (err, resp)=> {
                response = addResponse(
                    err,
                    res,
                    resp,
                    "Not Product field in the table"
                );
                if (typeof response === "string") {
                    reject(response);
                }
                resolve(response);
            }
        );
    });
};

export const getProduct = (
    req: any,
    res: any,
): Promise<String | Array<object>> => {
    const id = req.params.productId; 
    let response: String | Array<Object>;

    return new Promise((resolve: any, reject:any) => {
        client.query(
            sqlProduct.selectProduct(id),
            (err, resp)=> {
                response = addResponse(
                    err,
                    res,
                    resp,
                    "Not Product field in the table"
                );
                if (typeof response === "string") {
                    reject(response);
                }
                resolve(response);
            }
        );
    });
};