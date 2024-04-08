<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" width="100%"/>

# Sistema de Vendas de Veículos

Sistema simples para venda de veículos, com funcionalidades separadas para vendedores e clientes.

## Configuração do Docker 🐋

Este projeto vem com uma configuração do Docker para subir um banco mysql. Siga estas etapas:

1. Certifique-se de que o Docker esteja instalado no seu sistema.
2. Execute o seguinte comando para iniciar os contêineres do Docker:

```bash
docker-compose up -d
```

## Configuração do Node 🐢

1. Certifique-se de que o Node esteja instalado no seu sistema na versão v20.11.0 ou superior.
2. Execute o seguinte comando para iniciar a api:

```bash
yarn dev
```

3. 🐋 OBS: Para iniciar a api o contêineres do Docker do banco tem que está rodando, para saber se está rodando use:

```bash
docker ps
```

## REGRAS:

### Funcionalidades do Vendedor:

- [x] FAZER LOGIN 
- [x] CRIAR UMA CONTA
- [x] APAGAR CONTA
- [x] COLOCAR UM OU MAIS VEICULOS A VENDA
- [x] REMOVER VEICULO COLOCADO A VENDA

### Funcionalidades do Cliente:

- [x] VER TODOS VEICULO A VENDA
- [x] VER UM VEICULO ESPECIFICO QUE ESTÁ A VENDA 
- [x] PESQUISAR UM VEICULO ESPECIFICO QUE ESTÁ A VENDA 

## Estrutura de Dados:

- [x] VENDEDOR:
    - ID
    - NOME
    - SENHA
    - USERNAME (PARA FAZER LOGIN)
    - TELEFONE
    - LISTA DE VEICULOS Á VENDA => VEICULOS[]
    - DATA QUE FOI PUBLICADO
    - DATA QUE FOI ATUALIZADO
    
- [x] VEICULOS: 
    - ID
    - ID-VENDEDO
    - VENDEDOR VENDENDOR[FIELS: ID-VENDEDO, REFERENCES: ID]
    - NOME 
    - MARCA
    - DESCRIÇÃO
    - PREÇO DO VEICULO A VENDA
    - LISTA DE IMAGENS DO VEICULO => IMAGENS[]
    - KM DO VEICULO
    - ANO DO VEICULO
    - CIDADE DO VEICULO
    - CÂMBIO DO VEICULO (AUTOMÁTICO OU MANUAL)
    - DATA QUE FOI PUBLICADO
    - DATA QUE FOI ATUALIZADO

- [x] IMAGENS:
    - ID
    - NOME DA IMAGE
    - ID-VEICULO
    - VEICULO VEICULO[FIELS: ID-VEICULO, REFERENCES: ID]
    - IMAGE
    - DATA QUE FOI PUBLICADO
    - DATA QUE FOI ATUALIZADO

- [x] SE POSSIVEL FAZER UM CRIPTOGRAFIA DE SENHA COM BCRYPT

**Projeto voltado exclusivamente para fins educacionais e de aprendizado. esté codigp não deve ser usado em produção, apenas como base** 🐢🐋 