-- EXTENSÃO PARA USAR UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de cliente
CREATE TABLE IF NOT EXISTS tb_costumer (
    cpf VARCHAR(14) PRIMARY KEY,
    first_name VARCHAR(45),
    last_name VARCHAR(45)
);

-- Tabela de checkout
CREATE TABLE IF NOT EXISTS tb_checkout (
    checkout_code UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    costumer_cpf VARCHAR(14),
    sale_day VARCHAR(2),
    sale_month VARCHAR(2),
    sale_year VARCHAR(4),
    sale_hour VARCHAR(2),
    sale_minute VARCHAR(2),
    total_price DOUBLE PRECISION,
    FOREIGN KEY (costumer_cpf) REFERENCES tb_costumer(cpf)
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
    checkout_code UUID NOT NULL,
    FOREIGN KEY (id_product) REFERENCES tb_product(id_product),
    FOREIGN KEY (checkout_code) REFERENCES tb_checkout(checkout_code)
);

-- Tabela de pagamento
CREATE TABLE IF NOT EXISTS tb_payment (
    id_payment SERIAL PRIMARY KEY,
    payment_method VARCHAR(10),
    payment_amount DOUBLE PRECISION,
    payment_status VARCHAR(15), -- Ex.: 'EM ANDAMENTO', 'CANCELADO', 'FINALIZADO'
    checkout_code UUID,
    FOREIGN KEY (checkout_code) REFERENCES tb_checkout(checkout_code)
);

-- Inserir categorias
INSERT INTO tb_category (name)
VALUES  
('bebidas'), 
('diversos'),
('hortifruti'), 
('padaria'), 
('kids'), 
('limpeza');

-- Bebidas (1)
INSERT INTO tb_product (name, category, price) VALUES
('Água Mineral', 1, 2.50),
('Refrigerante Cola', 1, 6.90),
('Suco de Laranja', 1, 7.50),
('Cerveja Pilsen', 1, 4.80),
('Energético', 1, 9.90),
('Vinho Tinto', 1, 35.00),
('Café Solúvel', 1, 8.20),
('Chá Verde', 1, 5.50),
('Refrigerante Guaraná', 1, 6.50),
('Suco de Uva', 1, 7.90);

-- Diversos (2)
INSERT INTO tb_product (name, category, price) VALUES
('Papel Higiênico', 2, 12.90),
('Pilhas AA', 2, 9.50),
('Isqueiro', 2, 4.00),
('Fita Adesiva', 2, 3.50),
('Guarda-chuva', 2, 19.90),
('Caneta Esferográfica', 2, 2.00),
('Caderno Universitário', 2, 14.50),
('Caixa Organizadora', 2, 24.90),
('Fones de Ouvido', 2, 39.90),
('Carregador Portátil', 2, 79.90);

-- Hortifruti (3)
INSERT INTO tb_product (name, category, price) VALUES
('Banana', 3, 3.50),
('Maçã', 3, 4.20),
('Tomate', 3, 5.00),
('Alface', 3, 2.80),
('Cenoura', 3, 3.90),
('Batata', 3, 4.50),
('Cebola', 3, 3.70),
('Abacate', 3, 6.20),
('Manga', 3, 4.80),
('Melancia', 3, 7.50);

-- Padaria (4)
INSERT INTO tb_product (name, category, price) VALUES
('Pão Francês', 4, 0.60),
('Pão de Forma', 4, 7.90),
('Bolo de Chocolate', 4, 15.00),
('Croissant', 4, 5.50),
('Pão de Queijo', 4, 4.80),
('Torta de Frango', 4, 18.90),
('Baguete', 4, 4.50),
('Pão Integral', 4, 8.50),
('Biscoito Artesanal', 4, 6.20),
('Pão Doce', 4, 2.50);

-- Kids (5)
INSERT INTO tb_product (name, category, price) VALUES
('Chocolate Infantil', 5, 3.50),
('Biscoito Recheado', 5, 2.90),
('Suco em Caixinha', 5, 2.50),
('Iogurte Infantil', 5, 3.80),
('Brinquedo Pequeno', 5, 15.00),
('Bala de Goma', 5, 1.50),
('Pirulito', 5, 0.90),
('Bolacha de Leite', 5, 3.20),
('Mini Cereal', 5, 5.50),
('Achocolatado', 5, 3.80);

-- Limpeza (6)
INSERT INTO tb_product (name, category, price) VALUES
('Detergente', 6, 2.50),
('Sabão em Pó', 6, 12.90),
('Desinfetante', 6, 7.80),
('Álcool 70%', 6, 5.50),
('Esponja de Aço', 6, 3.20),
('Lustra Móveis', 6, 9.50),
('Saco de Lixo 50L', 6, 8.90),
('Sabão em Barra', 6, 4.30),
('Amaciante', 6, 10.50),
('Pano de Chão', 6, 3.00);