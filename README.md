# **Projeto Labook**

O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.

Aplicação back-end de servidor express com banco de dados sqlite3.

## Índice
- <a href="#métodos">Métodos disponíveis na API</a>
- <a href="#respostas">Respostas esperadas</a>
- <a href="#documentação">Documentação</a>
- <a href="#abordados">Conteúdos abordados</a>
- <a href="#pessoa">Pessoa autora</a>
- <a href="#próximos">Próximos passos</a>


## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |

## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `201` | Recurso criado com sucesso (success).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `404` | Registro pesquisado não encontrado (Not found).|
| `409` | Registro pesquisado já existente.|

## Banco de dados

![projeto-labook ](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

## Documentação
[Link Documentação](https://documenter.getpostman.com/view/24424903/2s93CLttxF)

## Tecnologias utilizadas e conteúdos abordados

1. [Node.js](https://nodejs.org/en/)
2. [Typescript](https://www.typescriptlang.org/)
3. [Express](https://expressjs.com/pt-br/)
4. [Cors](https://www.npmjs.com/package/cors)
5. [Knex](https://knexjs.org/)
6. [Sqlite3](https://www.sqlitetutorial.net/)
7. [Programação orientada a objetos]()
8. [Arquitetura em camadas]()
9. [Geração de UUID](https://www.npmjs.com/package/uuid)
10. [Geração de hashes](https://www.npmjs.com/package/bcrypt)
11. [Autenticação e autorização](https://www.npmjs.com/package/jsonwebtoken)
12. [Roteamento](https://expressjs.com/pt-br/api.html#router)
13. [Postman](https://www.postman.com/)

## Pessoas Autoras

<img style="width:200px" src="https://github.com/Casenrique.png" alt="Imagem do desenvolvedor">

[Linkedin](https://www.linkedin.com/in/carlos-henrique-de-souza-1767311a/)

## Próximos passos

- [ ] Refatoração de código para código mais limpo.




