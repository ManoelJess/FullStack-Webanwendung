import { DataTypes, Sequelize } from "sequelize";
import {dbConfig} from "../db.config";


const newSequilize =  new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : 'postgres'
})

const db:any = {}

db.sequelize = newSequilize;


const part = newSequilize.define("PART",{
    P_PARTKEY : {
        type : DataTypes.INTEGER,
        allowNull:false,
        unique : true
    },
    P_NAME: {
        type : DataTypes.CHAR(55),
        allowNull : false
    },
    P_MFGR : {
        type : DataTypes.CHAR(55),
        allowNull: false
    },
    P_BRAND : {
        type : DataTypes.CHAR(10),
        allowNull: false
    },
    P_TYPE : {
        type : DataTypes.CHAR(35),
        allowNull: false
    },
    P_SIZE : {
        type : DataTypes.INTEGER,
        allowNull:false,
    },
    P_CONTAINER : {
        type : DataTypes.CHAR(10),
        allowNull: false
    },
    P_RETAILPRICE : {
        type : DataTypes.FLOAT,
        allowNull: false
    },
    P_COMMENT : {
        type : DataTypes.CHAR(23),
        allowNull: true
    },
})

const region = newSequilize.define("REGION",{
    R_REGIONKEY : {
        type : DataTypes.INTEGER,
        allowNull: false,
        unique : true
    },
    R_NAME : {
        type : DataTypes.CHAR(25),
        allowNull: false
    },
    R_COMMENT : {
        type : DataTypes.CHAR(152)
    }
})

const nation = newSequilize.define("NATION",{
    N_NATIONKEY : {
        type : DataTypes.INTEGER,
        allowNull:false,
        unique: true
    },
    N_NAME : {
        type : DataTypes.CHAR(25),
        allowNull: false
    },
    N_REGIONKEY : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    N_COMMENT : {
        type : DataTypes.CHAR(152),
        allowNull:false,
    },
})
nation.belongsTo(region)

const customer = newSequilize.define("CUSTOMER",{
    C_CUSTKEY : {
        type : DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    C_NAME : {
        type :DataTypes.CHAR(25),
        allowNull : false
    },
    C_ADDRESS : {
        type :DataTypes.CHAR(40),
        allowNull : false
    },
    C_NATIONKEY : {
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    C_PHONE : {
        type :DataTypes.CHAR(15),
        allowNull : false
    },
    C_ACCTBAL : {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    C_MKTSEGMENT : {
        type:DataTypes.CHAR(10),
        allowNull:false
    },
    C_COMMENT:{
        type:DataTypes.CHAR(117),
        allowNull : true
    }
})
customer.belongsTo(nation)

const orders = newSequilize.define("ORDERS",{
    O_ORDERKEY : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
    },
    O_CUSTKEY:{
        type : DataTypes.INTEGER,
        allowNull:false
    },
    O_ORDERSTATUS:{
        type : DataTypes.CHAR(1),
        allowNull:false
    },
    O_TOTALPRICE:{
        type : DataTypes.FLOAT,
        allowNull:false
    },
    O_ORDERDATE:{
        type: DataTypes.DATE,
        allowNull:false
    },
    O_ORDERPRIORITY:{
        type:DataTypes.CHAR(15),
        allowNull:false
    },
    O_CLERK:{
        type:DataTypes.CHAR(15),
        allowNull:false,
    },
    O_SHIPPRIORITY:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    O_COMMENT:{
        type:DataTypes.CHAR(79),
        allowNull:true
    }
})
orders.belongsTo(customer)

const supplier = newSequilize.define("SUPPLIER",{
    S_SUPPKEY : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
    },
    S_NAME:{
        type : DataTypes.CHAR(25),
        allowNull:false
    },
    S_ADDRESS:{
        type : DataTypes.CHAR(40),
        allowNull:false
    },
    S_NATIONKEY:{
        type : DataTypes.INTEGER,
        allowNull:false
    },
    S_PHONE:{
        type: DataTypes.CHAR(15),
        allowNull:false
    },
    S_ACCTBAL:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    S_COMMENT:{
        type:DataTypes.CHAR(101),
        allowNull:true
    }
})
supplier.belongsTo(nation)

const partsupp = newSequilize.define("PARTSUPP",{
    PS_PARTKEY : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
    },
    PS_SUPPKEY:{
        type : DataTypes.INTEGER,
        allowNull:false
    },
    PS_AVAILQTY:{
        type : DataTypes.INTEGER,
        allowNull:false
    },
    PS_SUPPLYCOST:{
        type : DataTypes.FLOAT,
        allowNull:false
    },
    PS_COMMENT:{
        type:DataTypes.CHAR(199),
        allowNull:true
    }
})
partsupp.belongsTo(part)
partsupp.belongsTo(supplier)

const lineItem = newSequilize.define("LINEITEM",{
    L_ORDERKEY : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
    },
    L_PARTKEY:{
        type : DataTypes.INTEGER,
        allowNull:false
    },
    L_SUPPKEY:{
        type : DataTypes.CHAR(1),
        allowNull:false
    },
    L_LINENUMBER:{
        type : DataTypes.INTEGER,
        allowNull:false
    },
    L_QUANTITY:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    L_EXTENDPRICE:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    L_DISCOUNT:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    L_TAX:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    L_RETURNFLAG:{
        type:DataTypes.CHAR(1),
        allowNull:false
    },
    L_LINESTATUS:{
        type:DataTypes.CHAR(1),
        allowNull:false
    },
    L_SHIPDATE:{
        type:DataTypes.DATE,
        allowNull:false
    },
    L_COMMITDATE:{
        type:DataTypes.DATE,
        allowNull:false
    },
    L_RECEIPDATE:{
        type:DataTypes.DATE,
        allowNull:false
    },
    L_SHIPINSTRUCT:{
        type:DataTypes.CHAR(25),
        allowNull:false
    },
    L_SHIPMODE:{
        type:DataTypes.CHAR(10),
        allowNull:false
    },
    O_COMMENT:{
        type:DataTypes.CHAR(44),
        allowNull:true
    }
})
lineItem.belongsTo(orders)
lineItem.belongsTo(partsupp)

module.exports = {
    part,
    region,
    nation,
    customer,
    orders,
    supplier,
    partsupp,
    lineItem
}