import { CHAR, FLOAT, INTEGER } from "sequelize";


const customer = {
    id: INTEGER,
    name: CHAR(25),
    address: CHAR(40),
    phone: CHAR(15),
    acctBal: FLOAT,
    mktSegment: CHAR(10),
    comment: CHAR(117)
}

export default customer;