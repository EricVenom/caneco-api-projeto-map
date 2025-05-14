-- Não use CREATE DATABASE aqui — o banco já é criado pelo docker-compose com o nome db_caneco

-- Criação das tabelas
CREATE TABLE IF NOT EXISTS tb_checkout (
    checkout_code VARCHAR(45) PRIMARY KEY,
    description TEXT
);

CREATE TABLE IF NOT EXISTS tb_customer (
    cpf VARCHAR(14) PRIMARY KEY,
    first_name VARCHAR(45),
    last_name VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS tb_product (
    id_product INT PRIMARY KEY,
    name VARCHAR(45),
    category VARCHAR(45),
    price DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS tb_sale (
    id_sale INT PRIMARY KEY,
    sale_day VARCHAR(2),
    sale_month VARCHAR(2),
    sale_year VARCHAR(4),
    sale_hour VARCHAR(2),
    sale_minute VARCHAR(2),
    quantity INT,
    id_product INT NOT NULL,
    cpf_costumer VARCHAR(14),
    checkout_code VARCHAR(45) NOT NULL,
    FOREIGN KEY (id_product) REFERENCES tb_product(id_product),
    FOREIGN KEY (cpf_costumer) REFERENCES tb_customer(cpf),
    FOREIGN KEY (checkout_code) REFERENCES tb_checkout(checkout_code)
);

CREATE TABLE IF NOT EXISTS tb_payment (
    id_payment INT PRIMARY KEY,
    payment_method VARCHAR(10),
    payment_amount DOUBLE PRECISION,
    remaining_amount DOUBLE PRECISION,
    checkout_code VARCHAR(45),
    FOREIGN KEY (checkout_code) REFERENCES tb_checkout(checkout_code)
);
