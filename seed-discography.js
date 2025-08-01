import { storage } from './server/storage.js';

async function seedDiscography() {
  console.log('Seeding discography...');

  try {
    // Primeiro, vamos adicionar alguns álbuns usando SQL direto
    const { db } = await import('./server/db.js');
    const { discography } = await import('./shared/schema.js');

    const albums = [
      {
        title: "Brett Dean: Eclipse (String Quartet No. 1)",
        year: 2023,
        label: "Luminate Records",
        coverImage: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        spotifyUrl: "https://open.spotify.com/album/example",
        appleMusicUrl: "https://music.apple.com/album/example",
        amazonUrl: "https://amazon.com/music/album/example"
      },
      {
        title: "Justin Connolly: Music for Strings (plus...)",
        year: 2022,
        label: "Divine Art Records",
        coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        spotifyUrl: "https://open.spotify.com/album/example2",
        appleMusicUrl: "https://music.apple.com/album/example2"
      }
    ];

    // Inserir álbuns
    for (const album of albums) {
      await db.insert(discography).values(album);
    }

    console.log('Discography added successfully.');
  } catch (error) {
    console.error('Error seeding discography:', error);
  }
}

seedDiscography();