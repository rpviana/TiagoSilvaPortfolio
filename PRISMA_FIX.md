# 🔧 CORREÇÃO RÁPIDA - Prisma 7.6.0

## ❌ Erro Atual
```
Module '@prisma/client' has no exported member 'PrismaClient'
```

## ✅ Solução (3 Passos)

### 1️⃣ Gerar o Prisma Client
```bash
npx prisma generate
```

Este comando cria o `PrismaClient` baseado no teu `schema.prisma`.

### 2️⃣ Popular a Tabela de Idiomas
```bash
npm run prisma:seed
```

Ou manualmente:
```bash
npx tsx prisma/seed.ts
```

### 3️⃣ (Opcional) Ver a Database
```bash
npm run prisma:studio
```

---

## 🎯 Explicação

O erro acontece porque:
- ✅ Instalaste o Prisma (`@prisma/client` e `prisma`)
- ✅ Criaste o `schema.prisma`
- ❌ **Mas não geraste o Client ainda!**

O `npx prisma generate` lê o `schema.prisma` e gera o código TypeScript do `PrismaClient` em `node_modules/.prisma/client/`.

---

## 📝 Depois de Gerar

O erro vai desaparecer e poderás:

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Usar normalmente
const languages = await prisma.language.findMany()
```

---

## ⚡ Comando Completo

Se quiseres fazer tudo de uma vez:

```bash
npx prisma generate && npm run prisma:seed
```

Isto:
1. Gera o Client
2. Popula os idiomas (pt, en)
3. Resolve o erro de foreign key nos eventos!

---

## 🔄 Quando Precisas Gerar de Novo?

Executa `npx prisma generate` sempre que:
- Mudares o `schema.prisma`
- Adicionares novos models
- Mudares relações

**Dica:** Adiciona ao teu workflow:
```bash
npx prisma generate && npm run dev
```
