import { storage } from './server/storage.js';

async function seedRepertoire() {
  console.log('Seeding repertoire...');

  try {
    // Obter IDs das categorias
    const categories = await storage.getRepertoireCategories();
    const categoryMap = {};
    
    categories.forEach(category => {
      categoryMap[category.slug] = category.id;
    });

    // Categoria: Solo Performances
    await storage.createRepertoire(
      {
        composer: "J.S. Bach",
        categoryId: categoryMap['solo']
      },
      [
        {
          languageCode: 'en',
          title: "Sonatas and Partitas for Solo Violin"
        },
        {
          languageCode: 'pt',
          title: "Sonatas e Partitas para Violino Solo"
        }
      ]
    );

    await storage.createRepertoire(
      {
        composer: "Niccolò Paganini",
        categoryId: categoryMap['solo']
      },
      [
        {
          languageCode: 'en',
          title: "24 Caprices, Op. 1"
        },
        {
          languageCode: 'pt',
          title: "24 Caprichos, Op. 1"
        }
      ]
    );

    // Categoria: Concertos
    await storage.createRepertoire(
      {
        composer: "Ludwig van Beethoven",
        categoryId: categoryMap['concertos']
      },
      [
        {
          languageCode: 'en',
          title: "Violin Concerto in D major, Op. 61"
        },
        {
          languageCode: 'pt',
          title: "Concerto para Violino em Ré maior, Op. 61"
        }
      ]
    );

    await storage.createRepertoire(
      {
        composer: "Sergei Prokofiev",
        categoryId: categoryMap['concertos']
      },
      [
        {
          languageCode: 'en',
          title: "Violin Concertos No. 1 & 2"
        },
        {
          languageCode: 'pt',
          title: "Concertos para Violino Nº 1 e 2"
        }
      ]
    );

    // Categoria: Chamber Music
    await storage.createRepertoire(
      {
        composer: "Ludwig van Beethoven",
        categoryId: categoryMap['chamber']
      },
      [
        {
          languageCode: 'en',
          title: "Complete String Quartets"
        },
        {
          languageCode: 'pt',
          title: "Quartetos de Cordas Completos"
        }
      ]
    );

    await storage.createRepertoire(
      {
        composer: "Maurice Ravel",
        categoryId: categoryMap['chamber']
      },
      [
        {
          languageCode: 'en',
          title: "String Quartet in F major"
        },
        {
          languageCode: 'pt',
          title: "Quarteto de Cordas em Fá maior"
        }
      ]
    );

    // Categoria: Contemporary Works
    await storage.createRepertoire(
      {
        composer: "Kaija Saariaho",
        categoryId: categoryMap['contemporary']
      },
      [
        {
          languageCode: 'en',
          title: "Nocturne for Solo Violin"
        },
        {
          languageCode: 'pt',
          title: "Nocturne para Violino Solo"
        }
      ]
    );

    await storage.createRepertoire(
      {
        composer: "Thomas Adès",
        categoryId: categoryMap['contemporary']
      },
      [
        {
          languageCode: 'en',
          title: "Arcadiana (String Quartet)"
        },
        {
          languageCode: 'pt',
          title: "Arcadiana (Quarteto de Cordas)"
        }
      ]
    );

    console.log('Repertoire added successfully.');
  } catch (error) {
    console.error('Error seeding repertoire:', error);
  }
}

seedRepertoire();
