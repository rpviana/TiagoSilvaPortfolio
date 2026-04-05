# Exemplos de Uso do Prisma

## Importar o Cliente

```typescript
import { prisma } from './lib/prisma'
// ou
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

## Exemplos de Queries

### 1. EVENTOS

#### Criar Evento com Traduções
```typescript
const newEvent = await prisma.event.create({
  data: {
    date: new Date('2025-12-25T19:00:00'),
    time: '7:00 PM',
    venue: 'Royal Albert Hall, London',
    isPast: false,
    bookingLink: 'https://example.com/book',
    programLink: 'https://example.com/program',
    translations: {
      create: [
        {
          languageCode: 'pt',
          title: 'Concerto de Natal',
          description: 'Um concerto especial de Natal',
        },
        {
          languageCode: 'en',
          title: 'Christmas Concert',
          description: 'A special Christmas concert',
        },
      ],
    },
  },
  include: {
    translations: true,
  },
})
```

#### Listar Eventos com Traduções
```typescript
const events = await prisma.event.findMany({
  where: {
    isPast: false, // Apenas eventos futuros
  },
  include: {
    translations: true,
  },
  orderBy: {
    date: 'asc',
  },
})
```

#### Atualizar Evento
```typescript
const updatedEvent = await prisma.event.update({
  where: { id: 1 },
  data: {
    venue: 'New Venue Name',
    translations: {
      updateMany: {
        where: { languageCode: 'pt' },
        data: { title: 'Novo Título' },
      },
    },
  },
  include: {
    translations: true,
  },
})
```

#### Eliminar Evento
```typescript
await prisma.event.delete({
  where: { id: 1 },
})
// As traduções são eliminadas automaticamente (CASCADE)
```

### 2. DISCOGRAFIA

#### Criar Disco com Reviews
```typescript
const album = await prisma.discography.create({
  data: {
    title: 'Bach: Sonatas & Partitas',
    year: 2024,
    label: 'Deutsche Grammophon',
    coverImage: '/images/bach-album.jpg',
    spotifyUrl: 'https://spotify.com/...',
    reviews: {
      create: [
        {
          source: 'The Guardian',
          translations: {
            create: [
              {
                languageCode: 'en',
                reviewerName: 'John Doe',
                reviewText: 'An exceptional recording!',
              },
            ],
          },
        },
      ],
    },
  },
  include: {
    reviews: {
      include: {
        translations: true,
      },
    },
  },
})
```

### 3. REPERTÓRIO

#### Criar Categoria com Traduções
```typescript
const category = await prisma.repertoireCategory.create({
  data: {
    slug: 'baroque',
    translations: {
      create: [
        { languageCode: 'pt', name: 'Barroco' },
        { languageCode: 'en', name: 'Baroque' },
      ],
    },
  },
  include: {
    translations: true,
  },
})
```

#### Adicionar Peça ao Repertório
```typescript
const piece = await prisma.repertoire.create({
  data: {
    composer: 'J.S. Bach',
    categoryId: 1,
    translations: {
      create: [
        {
          languageCode: 'pt',
          piece: 'Sonata No. 1 em Sol menor, BWV 1001',
        },
        {
          languageCode: 'en',
          piece: 'Sonata No. 1 in G minor, BWV 1001',
        },
      ],
    },
  },
  include: {
    translations: true,
    category: {
      include: {
        translations: true,
      },
    },
  },
})
```

#### Listar Repertório por Categoria
```typescript
const repertoire = await prisma.repertoire.findMany({
  where: {
    category: {
      slug: 'baroque',
    },
  },
  include: {
    translations: true,
    category: {
      include: {
        translations: true,
      },
    },
  },
  orderBy: {
    composer: 'asc',
  },
})
```

### 4. UTILIZADORES

#### Criar Utilizador
```typescript
import bcrypt from 'bcryptjs'

const hashedPassword = await bcrypt.hash('password123', 10)

const user = await prisma.user.create({
  data: {
    email: 'admin@example.com',
    password: hashedPassword,
    firstName: 'John',
    lastName: 'Doe',
    isAdmin: true,
  },
})
```

#### Login
```typescript
const user = await prisma.user.findUnique({
  where: {
    email: 'admin@example.com',
  },
})

if (user && await bcrypt.compare('password123', user.password)) {
  // Login successful
}
```

### 5. MENSAGENS DE CONTACTO

#### Criar Mensagem
```typescript
const message = await prisma.message.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Booking Inquiry',
    message: 'I would like to book you for...',
  },
})
```

#### Listar Mensagens (mais recentes primeiro)
```typescript
const messages = await prisma.message.findMany({
  orderBy: {
    createdAt: 'desc',
  },
  take: 10, // Últimas 10 mensagens
})
```

### 6. CONTEÚDO DO SITE

#### Atualizar/Criar Conteúdo
```typescript
const content = await prisma.siteContent.upsert({
  where: { key: 'home_hero_title' },
  update: {
    valuePt: 'Bem-vindo',
    valueEn: 'Welcome',
  },
  create: {
    key: 'home_hero_title',
    valuePt: 'Bem-vindo',
    valueEn: 'Welcome',
    type: 'text',
  },
})
```

#### Obter Todo o Conteúdo
```typescript
const allContent = await prisma.siteContent.findMany()
```

## Queries Avançadas

### Buscar com Filtros Complexos
```typescript
const results = await prisma.event.findMany({
  where: {
    AND: [
      { isPast: false },
      { date: { gte: new Date() } },
      {
        translations: {
          some: {
            languageCode: 'pt',
            title: {
              contains: 'Bach',
              mode: 'insensitive', // Case-insensitive
            },
          },
        },
      },
    ],
  },
  include: {
    translations: true,
  },
})
```

### Contar Registos
```typescript
const eventCount = await prisma.event.count({
  where: {
    isPast: false,
  },
})
```

### Paginação
```typescript
const page = 1
const perPage = 10

const events = await prisma.event.findMany({
  skip: (page - 1) * perPage,
  take: perPage,
  include: {
    translations: true,
  },
})
```

### Transações
```typescript
const result = await prisma.$transaction(async (tx) => {
  // Criar evento
  const event = await tx.event.create({
    data: { /* ... */ },
  })

  // Criar traduções
  await tx.eventTranslation.createMany({
    data: [
      { eventId: event.id, languageCode: 'pt', /* ... */ },
      { eventId: event.id, languageCode: 'en', /* ... */ },
    ],
  })

  return event
})
```

## Prisma Studio

Para abrir uma interface visual da database:

```bash
npm run prisma:studio
```

Abre automaticamente no browser em `http://localhost:5555`
