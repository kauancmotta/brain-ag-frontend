# Brain Agriculture

Frontend web para gerenciamento de produtores rurais, propriedades, safras e culturas plantadas.

A aplicação organiza o domínio em uma hierarquia de negócio clara:

```text
Customer (Produtor)
  |
  +-- CustomerEntity
        |
        +-- Entity (Fazenda)
              |
              +-- CropSeason (Safra)
                    |
                    +-- CropSeasonCrop
                          |
                          +-- Crop (Cultura)
```

O frontend foi desenvolvido para consumir a API REST do backend e oferecer uma experiência dividida por responsabilidades: cadastro da fazenda, gerenciamento de safras e gerenciamento das culturas de cada safra.

## Funcionalidades

- Cadastro de produtores rurais.
- Validação de CPF e CNPJ.
- Listagem e exclusão de produtores.
- Cadastro de fazendas com endereço aninhado.
- Associação de uma fazenda a um produtor.
- Validação da regra:

  ```text
  agricultureArea + vegetationArea <= totalArea
  ```

- Visualização dos detalhes da fazenda.
- Listagem de safras por fazenda.
- Cadastro de safras por ano no formato `YYYY`.
- Restrição de uma safra por ano para cada fazenda, conforme a regra do backend.
- Listagem das culturas e áreas plantadas de cada safra.
- Adição, edição e exclusão de culturas da safra.
- Dashboard com:
  - total de fazendas;
  - área total cadastrada;
  - quantidade de fazendas por estado;
  - área plantada por cultura;
  - uso do solo entre agricultura e vegetação;
  - filtro opcional por ano da safra.

## Stack

### Aplicação

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- React Redux
- Redux Persist
- Axios

### Interface e visualização

- Emotion (`@emotion/react` e `@emotion/styled`)
- Lucide React
- Recharts
- Inter via `@fontsource/inter`

### Formulários e validação

- React Hook Form
- Zod
- `@hookform/resolvers`

### Qualidade e testes

- Vitest
- Testing Library
- Jest DOM
- ESLint 9
- TypeScript ESLint
- Prettier

## Pré-requisitos

- Node.js 22 ou superior.
- Yarn 1.x.
- Backend da aplicação em execução.
- API acessível a partir da URL configurada em `VITE_API_URL`.

## Instalação

Clone o projeto e instale as dependências:

```bash
git clone <url-do-repositorio>
cd frontend
yarn install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Configure a URL da API:

```env
VITE_API_URL=http://localhost:3333/api
```

O valor depende da configuração do backend. O frontend acrescenta os caminhos dos recursos sobre essa base, por exemplo:

```text
VITE_API_URL=http://localhost:3333/api
GET /entities
=> http://localhost:3333/api/entities
```

## Scripts

```bash
# Inicia o servidor de desenvolvimento
yarn dev

# Executa o ESLint
yarn lint

# Executa os testes em modo watch
yarn test

# Executa todos os testes uma vez
yarn vitest run

# Executa os testes com interface visual
yarn test:ui

# Executa os testes e gera cobertura
yarn test:coverage

# Gera o build de produção
yarn build

# Pré-visualiza o build de produção
yarn preview

# Formata arquivos TypeScript e TSX
yarn format
```

## Rotas da aplicação

| Rota | Tela | Responsabilidade |
| --- | --- | --- |
| `/` | Dashboard | Métricas e gráficos agregados |
| `/producers` | Produtores | Cadastro e listagem de produtores |
| `/entities` | Fazendas | Cadastro e listagem de fazendas |
| `/entities/:entityId` | Detalhes da fazenda | Dados da propriedade e safras |
| `/entities/:entityId/crop-seasons/new` | Nova safra | Cadastro do ano da safra |
| `/entities/:entityId/crop-seasons/:cropSeasonId` | Detalhes da safra | Culturas e áreas plantadas |
| `/crop-seasons/:cropSeasonId` | Compatibilidade | Acesso legado aos detalhes da safra |

## Fluxo principal

### 1. Cadastro da fazenda

A primeira etapa cadastra somente os dados da propriedade:

- nome;
- produtor responsável;
- endereço;
- área total;
- área agricultável;
- área de vegetação.

Culturas não pertencem diretamente à fazenda e não são cadastradas nesta etapa.

Após o sucesso, o usuário é direcionado para:

```text
/entities/:entityId
```

### 2. Gerenciamento da fazenda

A página de detalhes apresenta:

- localização;
- áreas da propriedade;
- safras existentes;
- culturas e áreas plantadas de cada safra;
- ação para adicionar uma nova safra.

### 3. Cadastro da safra

A safra recebe um ano no formato `YYYY`:

```json
{
  "year": "2026",
  "entityId": "63e1e186-3fd4-4002-a274-4faa6fbf8d58"
}
```

### 4. Gerenciamento das culturas

Dentro de uma safra, é possível adicionar uma cultura e sua área plantada:

```json
{
  "cropId": "aaaf739d-cad0-4416-b7e0-efa40b155f6c",
  "plantedArea": 300,
  "cropSeasonId": "a8734a8b-dc1b-43ea-b523-7d67c88a06c1"
}
```

Na edição, o backend espera somente a área plantada no corpo:

```json
{
  "plantedArea": 200
}
```

A cultura e a safra são identificadas pela URL.

## Contratos principais da API

Os serviços aceitam respostas diretas e respostas envelopadas no formato `{ data, success, message }`, conforme o endpoint.

### Customers

```text
GET    /customers
GET    /customers/:customerId
POST   /customers
PUT    /customers/:customerId
DELETE /customers/:customerId
```

O frontend carrega os customers ao inicializar o hook de produtores e mantém os dados no Redux Persist como cache local.

### Entities / Fazendas

```text
GET    /entities
GET    /entities/:entityId
POST   /entities
PUT    /entities/:entityId
DELETE /entities/:entityId
```

Exemplo de resposta normalizada pela camada de serviço:

```json
{
  "id": "98667b8b-1182-40c4-82bf-a1d56ae4dcf2",
  "name": "Fazenda Boqueirão",
  "address": {
    "street": "Da sede",
    "number": "26",
    "city": "Lages",
    "state": "SC",
    "zipCode": "88516120"
  },
  "customer": {
    "id": "3e0f01d8-0a1a-4950-ac16-a66c2fd4b8f7",
    "name": "Produtor João da Silva"
  },
  "totalArea": "900",
  "agricultureArea": "700",
  "vegetationArea": "200"
}
```

As áreas retornadas como strings são convertidas para `number` no serviço de entidades.

### Crop Seasons / Safras

```text
GET  /entities/:entityId/crop-seasons
GET  /entities/:entityId/crop-seasons/:cropSeasonId
POST /entities/:entityId/crop-seasons
```

A resposta de detalhes pode conter a entidade e as culturas aninhadas:

```json
{
  "id": "a8734a8b-dc1b-43ea-b523-7d67c88a06c1",
  "entity": {
    "id": "98667b8b-1182-40c4-82bf-a1d56ae4dcf2",
    "name": "Fazenda Boqueirão"
  },
  "year": "2026",
  "cropSeasonCrops": []
}
```

O serviço deriva `entityId` de `entity.id` quando necessário.

### Crop Season Crops / Culturas da safra

```text
GET    /entities/:entityId/crop-seasons/:cropSeasonId/crop-season-crops
POST   /entities/:entityId/crop-seasons/:cropSeasonId/crop-season-crops
PUT    /entities/:entityId/crop-seasons/:cropSeasonId/crop-season-crops/:cropSeasonCropId
DELETE /entities/:entityId/crop-seasons/:cropSeasonId/crop-season-crops/:cropSeasonCropId
```

Criação:

```json
{
  "cropId": "aaaf739d-cad0-4416-b7e0-efa40b155f6c",
  "plantedArea": 300,
  "cropSeasonId": "a8734a8b-dc1b-43ea-b523-7d67c88a06c1"
}
```

Edição:

```json
{
  "plantedArea": 200
}
```

A API pode retornar `plantedArea` como string e `crop` como objeto aninhado. O frontend normaliza esses dados para uso nos componentes.

### Crops / Culturas

```text
GET /crops
```

A lista de culturas é mantida em cache em memória durante a sessão para evitar chamadas repetidas. Chamadas simultâneas compartilham a mesma requisição.

### Dashboard

```text
GET /dashboard
GET /dashboard?year=2026
```

Exemplo de resposta:

```json
{
  "totalEntities": 1,
  "totalArea": 900,
  "byState": [
    {
      "state": "SC",
      "total": 1
    }
  ],
  "byCrop": [
    {
      "crop": "Soja",
      "plantedArea": 400
    }
  ],
  "landUse": {
    "agriculture": 700,
    "vegetation": 200
  }
}
```

A camada de serviço normaliza os campos da API para o modelo utilizado pelos gráficos.

## Arquitetura do frontend

A estrutura segue uma organização inspirada em Atomic Design:

```text
src/
  components/
    atoms/          # Botões, inputs, labels, badges e spinner
    molecules/      # Campos compostos, cards e campos de seleção
    organisms/      # Formulários, tabelas, header, sidebar e gráficos
    templates/      # Layouts de dashboard e páginas de formulário
  hooks/            # Orquestração de estado e carregamento de dados
  pages/            # Telas associadas às rotas
  providers/        # Redux, persistência e tema
  router/           # Rotas da aplicação
  schemas/          # Validações Zod
  services/         # Comunicação com a API
  store/            # Redux Toolkit e slices
  styles/           # Tema global e estilos compartilhados
  types/            # Contratos TypeScript do domínio
  utils/            # Formatadores e regras reutilizáveis
```

### Estado

- Redux Toolkit mantém customers e fazendas compartilhados.
- Redux Persist persiste esses slices no armazenamento local do navegador.
- A API continua sendo a fonte de verdade: customers e fazendas são carregados da API ao inicializar os hooks.
- O cache de culturas é mantido em memória no serviço, sem persistência permanente.
- React Hook Form controla o estado dos formulários.
- Zod valida os dados antes do envio.

### Normalização de API

Os serviços funcionam como uma fronteira entre os DTOs do backend e os componentes. Nessa camada são tratados:

- respostas diretas ou envelopadas;
- áreas numéricas retornadas como strings;
- relacionamentos aninhados, como `customer` e `crop`;
- derivação de IDs necessários para edição e navegação;
- payloads diferentes entre criação e atualização.

## Regras de negócio no frontend

A principal regra de validação da fazenda é:

```text
agricultureArea + vegetationArea <= totalArea
```

Outras regras implementadas:

- nome da fazenda com tamanho mínimo e máximo;
- áreas não negativas;
- área total maior que zero;
- ano da safra com quatro dígitos;
- cultura obrigatória ao adicionar vínculo;
- área plantada maior que zero;
- CPF/CNPJ validado antes do cadastro do produtor;
- culturas pertencem à safra, nunca diretamente à fazenda.

As regras críticas também devem permanecer garantidas no backend e no banco de dados.

## Autenticação

O cliente Axios procura um token em:

```text
auth_token
```

Quando encontrado, ele é enviado como:

```http
Authorization: Bearer <token>
```

Em respostas `401`, o token é removido e o navegador é direcionado para `/login`. Caso o backend ainda não utilize autenticação no ambiente local, nenhuma configuração adicional é necessária.

## Qualidade e validação

Antes de abrir um pull request, execute:

```bash
yarn lint
yarn vitest run
yarn build
```

A suíte atual cobre, entre outros pontos:

- comportamento do botão e estados de loading;
- validação de fazendas;
- métricas do dashboard;
- formatação de áreas;
- validação e formatação de CPF/CNPJ.

## Troubleshooting

### A API não é chamada

Verifique se:

1. o backend está em execução;
2. `VITE_API_URL` está configurada no `.env`;
3. a URL inclui o prefixo correto, como `/api`;
4. o navegador não está bloqueando a requisição por CORS.

Depois de alterar `.env`, reinicie o Vite.

### O customer não aparece no formulário ou na tabela

O frontend carrega customers via `GET /customers`. Verifique a resposta da API e se ela retorna uma lista direta ou um envelope válido.

### A tela de safra não carrega

Verifique se a URL contém os dois IDs:

```text
/entities/:entityId/crop-seasons/:cropSeasonId
```

A tela precisa de `entityId` para consumir o endpoint aninhado.

### Erro de validação ao criar cultura

Na criação, o payload precisa conter `cropId`, `plantedArea` e `cropSeasonId`. Na edição, o payload deve conter apenas `plantedArea`; os identificadores são enviados pela URL.

## Desenvolvimento

Para desenvolver uma funcionalidade nova:

1. confirme o contrato do endpoint;
2. atualize os tipos em `src/types`;
3. faça a normalização no serviço;
4. atualize o hook ou o estado compartilhado;
5. conecte a página e os componentes;
6. adicione ou atualize os testes;
7. execute lint, testes e build.

A arquitetura deve preservar a relação de domínio:

```text
Entity -> CropSeason -> CropSeasonCrop -> Crop
```

Não adicione `cropIds` diretamente em `Entity`.

## Status do projeto

O frontend possui os fluxos principais implementados:

- dashboard integrado à API;
- cadastro de produtores;
- cadastro de fazendas;
- detalhes e safras;
- gerenciamento de culturas por safra;
- normalização dos DTOs reais do backend;
- cache de culturas;
- carregamento de customers e fazendas via API.

O projeto pode evoluir com melhorias de UX, cobertura de testes de serviços, confirmação antes de exclusões e code splitting do bundle de produção.
