--Creation of part table
CREATE TABLE IF NOT EXISTS PART (
  P_PARTKEY INT NOT NULL  /*SF*200.000 are popular*/,
  P_NAME varchar(55) NOT NULL,
  P_MFGR char(55) NOT NULL,
  P_BRAND char(10) NOT NULL,
  P_TYPE varchar(35) NOT NULL,
  P_SIZE INT NOT NULL,
  P_CONTAINER char(10),
  P_RETAILPRICE float NOT NULL,
  P_COMMENT varchar(23),
  PRIMARY KEY (P_PARTKEY)
);

--Creation of region table
  CREATE TABLE IF NOT EXISTS REGION (
  R_REGIONKEY INT NOT NULL ,
  R_NAME char(25) NOT NULL,
  R_COMMENT varchar(152), 
  PRIMARY KEY (R_REGIONKEY)
);

--Creation of nation table
CREATE TABLE IF NOT EXISTS NATION (
  N_NATIONKEY INT NOT NULL ,
  N_NAME char(25) NOT NULL,
  N_REGIONKEY INT NOT NULL ,
  N_COMMENT varchar(152),
  PRIMARY KEY (N_NATIONKEY),
  FOREIGN KEY (N_REGIONKEY) REFERENCES REGION(R_REGIONKEY)
);

--Creation of customer table
CREATE TABLE IF NOT EXISTS CUSTOMER (
  C_CUSTKEY INT NOT NULL ,
  C_NAME varchar(25) NOT NULL,
  C_ADDRESS varchar(40) NOT NULL,
  C_NATIONKEY INT NOT NULL ,
  C_PHONE char(15) NOT NULL,
  C_ACCTBAL float NOT NULL,
  C_MKTSEGMENT char(10) NOT NULL,
  C_COMMENT varchar(117),
  PRIMARY KEY (C_CUSTKEY),
  FOREIGN KEY (C_NATIONKEY) REFERENCES NATION(N_NATIONKEY)
);

--Creation of orders table
CREATE TABLE IF NOT EXISTS ORDERS (
  O_ORDERKEY INT NOT NULL ,
  O_CUSTKEY INT NOT NULL ,
  O_ORDERSTATUS char(1)NOT NULL,
  O_TOTALPRICE float NOT NULL,
  O_ORDERDATE date NOT NULL,
  O_ORDERPRIORITY char(15) NOT NULL,
  O_CLERK char(15) NOT NULL,
  O_SHIPPRIORITY INT NOT NULL,
  O_COMMENT varchar(79),
  PRIMARY KEY (O_ORDERKEY),
  FOREIGN KEY (O_CUSTKEY) REFERENCES CUSTOMER(C_CUSTKEY) 
);

--Creation of supplier table
CREATE TABLE IF NOT EXISTS SUPPLIER (
  S_SUPPKEY INT NOT NULL ,
  S_NAME char(25) NOT NULL,
  S_ADDRESS varchar(40) NOT NULL,
  S_NATIONKEY INT NOT NULL,
  S_PHONE char(15) NOT NULL,
  S_ACCTBAL float NOT NULL,
  S_COMMENT varchar(101),
  PRIMARY KEY (S_SUPPKEY),
  FOREIGN KEY (S_NATIONKEY) REFERENCES NATION(N_NATIONKEY)
);

--Creation of partsupp table
CREATE TABLE IF NOT EXISTS PARTSUPP (
  PS_PARTKEY INT NOT NULL ,
  PS_SUPPKEY INT NOT NULL ,
  PS_AVAILQTY INT NOT NULL,
  PS_SUPPLYCOST float NOT NULL,
  PS_COMMENT varchar(199),
  PRIMARY KEY (PS_PARTKEY,PS_SUPPKEY),
  FOREIGN KEY (PS_PARTKEY) REFERENCES PART(P_PARTKEY),
  FOREIGN KEY (PS_SUPPKEY) REFERENCES SUPPLIER(S_SUPPKEY)
);

--Creation of lineitem table
CREATE TABLE IF NOT EXISTS LINEITEM (
  L_ORDERKEY INT NOT NULL ,
  L_PARTKEY INT NOT NULL ,
  L_SUPPKEY INT NOT NULL ,
  L_LINENUMBER INT NOT NULL,
  L_QUANTITY float NOT NULL,
  L_EXTENDEDPRICE float NOT NULL,
  L_DISCOUNT float NOT NULL,
  L_TAX float NOT NULL,
  L_RETURNFLAG char(1) NOT NULL,
  L_LINESTATUS char(1) NOT NULL,
  L_SHIPDATE date NOT NULL,
  L_COMMITDATE date NOT NULL,
  L_RECEIPTDATE date NOT NULL,
  L_SHIPINSTRUCT char(25) NOT NULL,
  L_SHIPMODE char(10) NOT NULL,
  L_COMMENT varchar(44),
  PRIMARY KEY (L_ORDERKEY, L_LINENUMBER),
  FOREIGN KEY (L_ORDERKEY) REFERENCES ORDERS(O_ORDERKEY),
  FOREIGN KEY (L_PARTKEY,L_SUPPKEY) REFERENCES PARTSUPP(PS_PARTKEY,PS_SUPPKEY)
);

