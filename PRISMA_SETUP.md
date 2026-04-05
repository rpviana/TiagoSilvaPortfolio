# Instruções para Configurar o Prisma

## 1. Criar a pasta prisma e os ficheiros

Execute estes comandos no terminal:

```bash
# Criar pasta prisma
mkdir prisma

# Instalar o Prisma
npm install @prisma/client@4.16.2
npm install -D prisma@4.16.2

# Gerar o cliente Prisma
npx prisma generate
```

## 2. Ficheiros a criar manualmente

Depois de executar os comandos acima, cria estes ficheiros:

### prisma/schema.prisma
(Ver ficheiro PRISMA_SCHEMA.txt incluído)

### prisma/seed.ts  
(Ver ficheiro PRISMA_SEED.txt incluído)

### .env
Adiciona a tua connection string do PostgreSQL:
```
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 3. Sincronizar com a Database

```bash
# Fazer push do schema para a database (sem migrations)
npm run prisma:push

# Ou, inicializar o Prisma com a database existente
npx prisma db pull
npx prisma generate
```

## 4. Popular a tabela de idiomas

```bash
npm run prisma:seed
```

## 5. Abrir Prisma Studio (opcional)

```bash
npm run prisma:studio
```

Isso abre uma interface visual para gerir a tua database!
