CREATE DATABASE IF NOT EXISTS  db_caneco
DEFAULT CHARACTER SET utf8;

USE db_caneco;

CREATE TABLE IF NOT EXISTS db_caneco.tb_checkout (
    checkout_code VARCHAR(45) NOT NULL UNIQUE,
    description TEXT,
    PRIMARY KEY (checkout_code)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS db_caneco.tb_customer (
    cpf VARCHAR(14) NOT NULL UNIQUE,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    PRIMARY KEY (cpf)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS db_caneco.tb_product (
    id_product INT NOT NULL UNIQUE,
    name VARCHAR(45),
    category VARCHAR(45),
    price DOUBLE,
    PRIMARY KEY (id_product)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS db_caneco.tb_sale (
    id_sale INT NOT NULL UNIQUE,
    sale_day VARCHAR(2),
    sale_month VARCHAR(2),
    sale_year VARCHAR(4),
    sale_hour VARCHAR(2),
    sale_minute VARCHAR(2),
    quantity INT,
    id_product INT NOT NULL,
    cpf_costumer VARCHAR(14),
    checkout_code VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_sale),
    FOREIGN KEY
        (id_product) 
    REFERENCES 
        tb_product(id_product),
    FOREIGN KEY    
        (cpf_costumer)
    REFERENCES
        tb_customer(cpf),
	FOREIGN KEY
		(checkout_code)
	REFERENCES
		tb_checkout(checkout_code)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS db_caneco.tb_payment (
    id_payment INT NOT NULL UNIQUE,
    payment_method VARCHAR(10),
    payment_amount DOUBLE,
    remaining_amount DOUBLE,
    checkout_code VARCHAR(45),
    PRIMARY KEY (id_payment),
	FOREIGN KEY
		(checkout_code)
	REFERENCES
		tb_checkout(checkout_code)
) ENGINE=InnoDB;