CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de empregados
CREATE TABLE IF NOT EXISTS tb_cashier (
    cpf VARCHAR(14) PRIMARY KEY UNIQUE,
    password text,
    first_name VARCHAR(45),
    total_checkout DOUBLE PRECISION
);

-- Tabela de histórico de adição/remoção de dinheiro do caixa
CREATE TABLE IF NOT EXISTS tb_record (
    id_record UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cpf VARCHAR(14),
    type_transaction VARCHAR(14), --WITHDRAW, DEPOSIT
    day VARCHAR(2),
    month VARCHAR(2),
    year VARCHAR(4),
    hour VARCHAR(2),
    minute VARCHAR(2), 
    FOREIGN KEY (cpf) REFERENCES tb_cashier(cpf)
);


