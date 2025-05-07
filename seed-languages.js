import { storage } from './server/storage.js';

async function seedLanguages() {
  console.log('Seeding languages...');

  try {
    // Adicionar inglês (padrão)
    await storage.createLanguage({
      code: 'en',
      name: 'English',
      isDefault: true
    });

    // Adicionar português
    await storage.createLanguage({
      code: 'pt',
      name: 'Português',
      isDefault: false
    });

    console.log('Languages added successfully.');
  } catch (error) {
    console.error('Error seeding languages:', error);
  }
}

seedLanguages();
