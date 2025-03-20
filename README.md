# 🚀 Projeto NestJS com RabbitMQ, OpenTelemetry, Prometheus e PostgreSQL

Este projeto segue o padrão **Clean Architecture** e utiliza **NestJS** com **RabbitMQ**, **PostgreSQL**, **OpenTelemetry**, **Prometheus** e **Grafana**, tudo rodando com **Docker**.

---

## 📌 Funcionalidades

✅ **CRUD de Clientes** (`/clients`)

✅ **CRUD de Clientes Selecionados** (`/selected-clients`)

✅ **Mensageria com RabbitMQ** (`/notifications`)

✅ **Observabilidade com OpenTelemetry, Prometheus e Grafana**

✅ **Banco de Dados PostgreSQL**

✅ **Documentação Swagger** (`/api`)

---

## 🚀 **1. Como Rodar o Projeto**

### **1.1 Requisitos**

- **Docker** e **Docker Compose** instalados
- **Node.js 18+** e **Yarn/NPM** instalados (opcional, caso não use Docker)

### **1.2 Rodando com Docker**

```sh
docker-compose up --build -d
```

Isso iniciará os seguintes serviços:

- **API NestJS** (`http://localhost:3000`)
- **RabbitMQ** (`http://localhost:15672`)
- **PostgreSQL** (`localhost:5432`)
- **Prometheus** (`http://localhost:9090`)
- **Grafana** (`http://localhost:3001`)
- **Jaeger (Tracing)** (`http://localhost:16686`)

### **1.3 Rodando Sem Docker (Modo Local)**

Se quiser rodar sem Docker, instale as dependências e inicie a API manualmente:

```sh
yarn install
npm run start:dev
```

---

## 📞 **2. APIs Disponíveis**

### 📌 **2.1 Documentação Swagger**

Acesse: [`http://localhost:3000/api`](http://localhost:3000/api)

### 📌 **2.2 Clientes (`/clients`)**

| Método   | Rota           | Descrição            |
| -------- | -------------- | -------------------- |
| `GET`    | `/clients`     | Listar clientes      |
| `POST`   | `/clients`     | Criar um cliente     |
| `PUT`    | `/clients/:id` | Atualizar um cliente |
| `DELETE` | `/clients/:id` | Deletar um cliente   |

---

## 🛠 **3. Tecnologias Utilizadas**

- **NestJS** (Framework Backend)
- **PostgreSQL** (Banco de Dados Relacional)
- **RabbitMQ** (Mensageria Assíncrona)
- **OpenTelemetry + Jaeger** (Tracing)
- **Prometheus + Grafana** (Métricas e Logs)
- **Swagger** (Documentação da API)
- **Docker & Docker Compose** (Gerenciamento de Contêineres)

---

## 📊 **4. Monitoramento e Observabilidade**

### **4.1 Tracing com Jaeger**

- **Acesse:** [`http://localhost:16686`](http://localhost:16686)

### **4.2 Métricas com Prometheus**

- **Acesse:** [`http://localhost:9090`](http://localhost:9090)

### **4.3 Logs e Dashboards no Grafana**

- **Acesse:** [`http://localhost:3001`](http://localhost:3001)
- **Login:** `admin / admin`

---

## 🏃 **5. Rodando Testes**

Para rodar os testes automatizados, use:

```sh
npm test
```

Para verificar a cobertura de código:

```sh
npm run test:cov
```

---

## 📝 **6. Estrutura do Projeto**

```
src/
├── modules/
│   ├── clients/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── repositories/
│   │   │   │   └── user.repository.ts
│   │   │   └── services/
│   │   │       └── user.service.ts
│   │   ├── application/
│   │   │   ├── dto/
│   │   │   │   └── create-user.dto.ts
│   │   │   ├── interfaces/
│   │   │   │   └── user.interface.ts
│   │   │   └── use-cases/
│   │   │       └── create-user.use-case.ts
│   │   ├── infrastructure/
│   │   │   └── persistence/
│   │   │       └── user.persistence.module.ts
│   │   └── presentation/
│   │       ├── controllers/
│   │       │   └── user.controller.ts
│   │       ├── dtos/
│   │       │   └── user.dto.ts
│   │       └── view-models/
│   │           └── user.view-model.ts
```

---

👉 **Feito por:** Iury Nascimento
