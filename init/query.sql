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
('limpeza'),
('refrigerantes'),
('alcoolicas'),
('sucos'),
('achocolatados')
('energeticos')
('diversos');

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

-- Refrigerantes (7)
INSERT INTO tb_product (name, category, price) VALUES
('Refrigerante Cola', 7, 6.90),
('Refrigerante Guaraná', 7, 6.50),
('Refrigerante Laranja', 7, 6.80),
('Refrigerante Uva', 7, 7.20),
('Refrigerante Limão', 7, 6.70),
('Refrigerante Abacaxi', 7, 6.90),
('Refrigerante Morango', 7, 7.00),
('Refrigerante Maracujá', 7, 6.80),
('Refrigerante Pêssego', 7, 6.90),
('Refrigerante Frutas Vermelhas', 7, 7.10);

-- Alcoólicas (8)
INSERT INTO tb_product (name, category, price) VALUES
('Cerveja Pilsen', 8, 4.80),
('Vinho Tinto', 8, 35.00),
('Vodka', 8, 25.00),
('Whisky', 8, 120.00),
('Cachaça', 8, 15.00),
('Rum', 8, 30.00),
('Tequila', 8, 50.00),
('Licor', 8, 20.00),
('Champanhe', 8, 80.00),
('Gin', 8, 40.00);

-- Sucos (9)
INSERT INTO tb_product (name, category, price) VALUES
('Suco de Laranja', 9, 7.50),
('Suco de Uva', 9, 7.90),
('Suco de Abacaxi', 9, 6.80),
('Suco de Maracujá', 9, 6.90),
('Suco de Morango', 9, 7.20),
('Suco de Limão', 9, 6.70),
('Suco de Manga', 9, 7.00),
('Suco de Melancia', 9, 7.50),
('Suco de Acerola', 9, 6.80),
('Suco de Caju', 9, 7.10);

-- Achocolatados (10)
INSERT INTO tb_product (name, category, price) VALUES
('Achocolatado em Pó', 10, 3.80),
('Achocolatado Líquido', 10, 4.50),
('Achocolatado Zero Açúcar', 10, 4.20),
('Achocolatado com Café', 10, 5.00),
('Achocolatado com Baunilha', 10, 4.80),
('Achocolatado com Caramelo', 10, 5.20),
('Achocolatado com Avelã', 10, 5.50),
('Achocolatado com Coco', 10, 4.90),
('Achocolatado com Amêndoas', 10, 5.30),
('Achocolatado com Castanha de Caju', 10, 5.60);

-- Energéticos (11)
INSERT INTO tb_product (name, category, price) VALUES
('Energético', 11, 9.90),
('Energético Zero Açúcar', 11, 10.50),
('Energético com Guaraná', 11, 9.80),
('Energético com Taurina', 11, 10.20),
('Energético com Cafeína', 11, 9.70),
('Energético com Ginseng', 11, 10.00),
('Energético com Vitaminas', 11, 9.90),
('Energético com Açúcar Mascavo', 11, 10.30),
('Energético com Mel', 11, 9.80),
('Energético com Açaí', 11, 10.40);

--Diversos bebidas (12)
INSERT INTO tb_product (name, category, price) VALUES
('Água Mineral', 12, 2.50),
('Refrigerante Cola', 12, 6.90),
('Suco de Laranja', 12, 7.50),
('Cerveja Pilsen', 12, 4.80),
('Energético', 12, 9.90),
('Vinho Tinto', 12, 35.00),
('Café Solúvel', 12, 8.20),
('Chá Verde', 12, 5.50),
('Refrigerante Guaraná', 12, 6.50),
('Suco de Uva', 12, 7.90);