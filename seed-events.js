import { storage } from './server/storage.js';

async function seedEvents() {
  console.log('Seeding events...');

  try {
    // Evento 1 - Futuro
    await storage.createEvent(
      {
        date: new Date("2023-10-15T19:30:00"),
        time: "7:30 PM",
        venue: "Wigmore Hall, London, UK",
        isPast: false,
        bookingLink: "https://wigmore-hall.org.uk",
        programLink: null
      },
      [
        {
          languageCode: 'en',
          title: "Bach & Contemporary Reflections",
          description: "A solo recital exploring J.S. Bach's Partita No. 2 alongside contemporary works inspired by Bach's musical language, featuring compositions by Sofia Gubaidulina and Thomas Adès."
        },
        {
          languageCode: 'pt',
          title: "Bach & Reflexões Contemporâneas",
          description: "Um recital a solo explorando a Partita No. 2 de J.S. Bach ao lado de obras contemporâneas inspiradas na linguagem musical de Bach, apresentando composições de Sofia Gubaidulina e Thomas Adès."
        }
      ]
    );

    // Evento 2 - Futuro
    await storage.createEvent(
      {
        date: new Date("2023-11-03T20:00:00"),
        time: "8:00 PM",
        venue: "Kings Place, London, UK",
        isPast: false,
        bookingLink: "https://kingsplace.co.uk",
        programLink: null
      },
      [
        {
          languageCode: 'en',
          title: "Brett Dean's \"Eclipse\" with 97 Ensemble",
          description: "Performing Brett Dean's String Quartet No. 1 \"Eclipse\" alongside works by Beethoven and Shostakovich in a program exploring musical dialogues across centuries."
        },
        {
          languageCode: 'pt',
          title: "\"Eclipse\" de Brett Dean com o 97 Ensemble",
          description: "Apresentação do Quarteto de Cordas No. 1 \"Eclipse\" de Brett Dean ao lado de obras de Beethoven e Shostakovich em um programa explorando diálogos musicais através dos séculos."
        }
      ]
    );

    // Evento 3 - Passado
    await storage.createEvent(
      {
        date: new Date("2023-05-10T19:00:00"),
        time: "7:00 PM",
        venue: "Royal Academy of Music, London, UK",
        isPast: true,
        bookingLink: null,
        programLink: null
      },
      [
        {
          languageCode: 'en',
          title: "Tiago Soares Silva: Solo Recital",
          description: "A solo program featuring works by Bach, Ysaÿe, and contemporary composers."
        },
        {
          languageCode: 'pt',
          title: "Tiago Soares Silva: Recital a Solo",
          description: "Um programa a solo apresentando obras de Bach, Ysaÿe e compositores contemporâneos."
        }
      ]
    );

    console.log('Events added successfully.');
  } catch (error) {
    console.error('Error seeding events:', error);
  }
}

seedEvents();
