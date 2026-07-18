# Automação de testes ServeRest com Cypress

Projeto de automação desenvolvido em JavaScript com Cypress para validar o frontend e a API pública do [ServeRest](https://serverest.dev/).

## Aplicações testadas

- Frontend: <https://front.serverest.dev/>
- API e Swagger: <https://serverest.dev/>

## Tecnologias

- Node.js 22
- Cypress 15
- JavaScript
- Faker para geração de massa de dados
- GitHub Actions para integração contínua

## Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) 22 ou superior
- npm, incluído na instalação do Node.js
- Git

Confirme as versões instaladas:

```bash
node --version
npm --version
git --version
```

## Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/victorlance93/cypress-test-ambev.git
cd cypress-test-ambev
```

Instale exatamente as versões registradas no `package-lock.json`:

```bash
npm ci
```

O projeto não depende de credenciais privadas. Os usuários necessários são gerados durante os próprios testes na API pública do ServeRest.

## Execução

Abrir a interface do Cypress:

```bash
npm run cy:open
```

Executar toda a suíte em modo headless:

```bash
npm test
```

Executar somente os testes de frontend:

```bash
npm run test:e2e
```

Executar somente os testes de API:

```bash
npm run test:api
```

Executar um único arquivo:

```bash
npx cypress run --spec cypress/e2e/api/users.cy.js
```

No Windows, se o Cypress apresentar `bad option: --smoke-test`, remova a variável apenas do terminal atual antes da execução:

```powershell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
```

## Cenários automatizados

O desafio solicita três cenários de frontend e três de API. A suíte mantém cobertura adicional de casos positivos e negativos.

### Frontend

| Arquivo | Cenário | Tipo |
| --- | --- | --- |
| `register.cy.js` | Cadastrar um usuário com dados aleatórios | Positivo |
| `login.cy.js` | Entrar como administrador e acessar a lista de usuários | Positivo |
| `login.cy.js` | Impedir login com credenciais inválidas | Negativo |
| `product.cy.js` | Cadastrar produto com dados aleatórios e imagem | Positivo |
| `product.cy.js` | Exibir erros ao enviar produto sem campos obrigatórios | Negativo |

### API

| Arquivo | Cenário | Tipo |
| --- | --- | --- |
| `users.cy.js` | Autenticar e listar todos os usuários | Positivo |
| `users.cy.js` | Buscar um usuário inexistente | Negativo |
| `carts.cy.js` | Criar um carrinho e concluir a compra | Positivo |
| `products.cy.js` | Alterar o preço de um produto e confirmar o novo valor | Positivo |

## Arquitetura

```text
cypress/
├── e2e/
│   ├── api/               # Testes dos endpoints REST
│   └── frontend/          # Testes pela interface do usuário
├── fixtures/
│   └── images/            # Arquivos usados em uploads
├── pagesObjects/          # Ações e seletores das páginas
├── support/               # Configuração e comandos globais
└── utils/                 # Factories de usuários e produtos
```

### Page Objects

Os testes de frontend delegam seletores e ações para classes em `pagesObjects`. Dessa forma, uma alteração de seletor fica concentrada em um único arquivo e os cenários permanecem legíveis.

### Factories

As factories em `utils` geram usuários e produtos únicos com Faker. Isso reduz colisões de e-mail e nome entre execuções e evita manter dados pessoais ou credenciais privadas no repositório.

### Testes de API

Os cenários utilizam `cy.request()` e validam status HTTP, mensagens de negócio e campos relevantes do contrato. A preparação de usuários ocorre pela API para que os testes não dependam de uma conta fixa.

### Comandos customizados

Os fluxos repetidos de API foram centralizados em `cypress/support/commands.js`:

- `cy.createApiUser(administrator, overrides)` cria usuários comuns ou administradores com massa dinâmica.
- `cy.loginByApi(user)` autentica um usuário criado durante o teste e retorna o token JWT.

Essa abordagem reduz duplicação entre os specs, melhora a legibilidade dos cenários e facilita manutenção futura.

## Decisões técnicas

- Seletores `data-testid` foram priorizados por serem mais estáveis que classes CSS.
- Dados aleatórios evitam falhas por registros duplicados.
- Comandos customizados encapsulam setup recorrente de autenticação e criação de usuários.
- As assertions verificam resultado de negócio, não apenas a conclusão da requisição.
- O cadastro de produto confirma a URL e a presença do nome criado na listagem.
- O cenário negativo de login confirma a permanência na rota e a mensagem apresentada.
- O ambiente público do ServeRest reinicia seus dados periodicamente; por isso não há rotina manual de limpeza.

## Integração contínua

O workflow `.github/workflows/cypress.yml` executa a suíte em pushes para `main` ou `master` e em pull requests. O fluxo:

1. Baixa o código.
2. Configura o Node.js.
3. Instala dependências com `npm ci`.
4. Executa todos os testes.
5. Publica screenshots como artefato quando houver falha.

## Evidências de falha

Screenshots são gravados automaticamente em `cypress/screenshots` quando um teste falha. Vídeos estão desativados na configuração padrão do Cypress. Essas pastas não são versionadas.

## Boas práticas de segurança

- Não versionar `.env` ou `cypress.env.json`.
- Não colocar credenciais pessoais nos testes.
- Não enviar a pasta `node_modules` no arquivo ZIP.
- Revisar o histórico do Git antes de publicar o repositório.

## Limitações conhecidas

Os testes dependem da disponibilidade dos ambientes públicos do ServeRest. IDs de produtos usados nos cenários de carrinho e atualização precisam continuar disponíveis no ambiente.

## Checklist de entrega

- Projeto versionado sem credenciais ou dados sensíveis.
- Execução documentada para suíte completa, frontend e API.
- CI configurado para validar a suíte em push e pull request.
- Envio do `.zip` sem a pasta `node_modules`.

## Autor

Victor Lance
