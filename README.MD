### Isso remove os containers e volumes, limpando tudo
`docker-compose down -v` 
### Isso reinicia o container e executa o script novamente
`docker-compose up --build`  
### Isso vai ligar o container
`docker-compose up -d` 

# O sistema precisa:
- [x] cadastrar adm/operador
- [x] logar adm/operador

- [X] mostrar saldo no caixa do adm/operador
- [X] adicionar/subtrair do caixa
- [X] mostrar historico de vendas (20 ultimas)
- [X] exibir nota fiscal individual (cada venda)
- [ ] fechar registro diario (GERAR NOTA FISCAL - talvez mandar por email pro adm/operador - BRIDGE)
- [x] listar categorias
- [x] listar produtos por categoria (ex: categoria bebidas mostraria todas as bebidas)
- [X] salvar status do método de pagamento - EM ANDAMENTO...
- [x] AO FECHAR O CARRINHO, SALVAR REGISTRO EM tb_checkout para gerar UUID:
   - [x] registrar venda de cada batch de produtos em tb_sale (vai precisar do UUID)
- [X] não deixar finalizar compra se não pagar tudo
