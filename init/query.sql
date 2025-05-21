-- EXTENSÃO PARA USAR UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de checkout
CREATE TABLE IF NOT EXISTS tb_checkout (
    checkout_code UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_day VARCHAR(2),
    sale_month VARCHAR(2),
    sale_year VARCHAR(4),
    sale_hour VARCHAR(2),
    sale_minute VARCHAR(2),
    description TEXT
);

-- Tabela de cliente
CREATE TABLE IF NOT EXISTS tb_customer (
    cpf VARCHAR(14) PRIMARY KEY,
    first_name VARCHAR(45),
    last_name VARCHAR(45)
);

-- Tabela de categoria
CREATE TABLE IF NOT EXISTS tb_category (
    id_category SERIAL PRIMARY KEY,
    name VARCHAR(45)
);

-- Tabela de produto
CREATE TABLE IF NOT EXISTS tb_product (
    id_product SERIAL PRIMARY KEY,
    name VARCHAR(45),
    category INT,
    price DOUBLE PRECISION,
    FOREIGN KEY (category) REFERENCES tb_category(id_category)
);

-- Tabela de venda
CREATE TABLE IF NOT EXISTS tb_sale (
    id_sale SERIAL PRIMARY KEY,
    quantity INT,
    id_product INT NOT NULL,
    cpf_costumer VARCHAR(14),
    checkout_code UUID NOT NULL,
    FOREIGN KEY (id_product) REFERENCES tb_product(id_product),
    FOREIGN KEY (cpf_costumer) REFERENCES tb_customer(cpf),
    FOREIGN KEY (checkout_code) REFERENCES tb_checkout(checkout_code)
);

-- Tabela de pagamento
CREATE TABLE IF NOT EXISTS tb_payment (
    id_payment SERIAL PRIMARY KEY,
    payment_method VARCHAR(10),
    payment_amount DOUBLE PRECISION,
    remaining_amount DOUBLE PRECISION,
    checkout_code UUID,
    FOREIGN KEY (checkout_code) REFERENCES tb_checkout(checkout_code)
);
