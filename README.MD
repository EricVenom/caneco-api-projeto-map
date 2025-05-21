docker-compose down -v  # Isso remove os containers e volumes, limpando tudo
docker-compose up --build  # Isso reinicia o container e executa o script novamente

docker-compose up -d # ligar o container

# Preencher categorias
insert into tb_category (name)
values  
('bebidas'), ('diversos'), ('hortifruti'), ('padaria'), ('kids'), ('limpeza');

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


# O sistema precisa:
- logar adm/operador
- mostrar saldo no caixa do adm/operador
- adicionar/subtrair do caixa
- mostrar historico de vendas
- fechar registro diario (GERAR NOTA FISCAL - talvez mandar por email pro adm/operador - BRIDGE)

- [x] listar categorias
- [x] listar produtos por categoria (ex: categoria bebidas mostraria todas as bebidas)
- AO FECHAR O CARRINHO, SALVAR REGISTRO EM tb_checkout para gerar UUID:
   - registrar venda de cada batch de produtos em tb_sale (vai precisar do UUID)
- salvar status do método de pagamento
- não deixar finalizar compra se não pagar tudo (PENSAR EM ALGUMA LOGICA)
