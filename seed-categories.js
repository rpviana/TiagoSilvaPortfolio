import { storage } from './server/storage.js';

async function seedCategories() {
  console.log('Seeding repertoire categories...');

  try {
    // Solo Performances
    await storage.createRepertoireCategory(
      { slug: 'solo' },
      [
        { languageCode: 'en', name: 'Solo Performances' },
        { languageCode: 'pt', name: 'Performances a Solo' }
      ]
    );

    // Violin Concertos
    await storage.createRepertoireCategory(
      { slug: 'concertos' },
      [
        { languageCode: 'en', name: 'Violin Concertos' },
        { languageCode: 'pt', name: 'Concertos para Violino' }
      ]
    );

    // Chamber Music
    await storage.createRepertoireCategory(
      { slug: 'chamber' },
      [
        { languageCode: 'en', name: 'Chamber Music' },
        { languageCode: 'pt', name: 'Música de Câmara' }
      ]
    );

    // Contemporary Works
    await storage.createRepertoireCategory(
      { slug: 'contemporary' },
      [
        { languageCode: 'en', name: 'Contemporary Works' },
        { languageCode: 'pt', name: 'Obras Contemporâneas' }
      ]
    );

    console.log('Repertoire categories added successfully.');
  } catch (error) {
    console.error('Error seeding repertoire categories:', error);
  }
}

seedCategories();
