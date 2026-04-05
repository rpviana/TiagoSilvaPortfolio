import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Seed Languages
  console.log('📝 Creating languages...')
  await prisma.language.upsert({
    where: { code: 'en' },
    update: {},
    create: {
      code: 'en',
      name: 'English',
      isDefault: true,
    },
  })

  await prisma.language.upsert({
    where: { code: 'pt' },
    update: {},
    create: {
      code: 'pt',
      name: 'Português',
      isDefault: false,
    },
  })

  console.log('✅ Languages created!')
  console.log('✨ Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
