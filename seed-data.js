import { storage } from './server/storage.js';

async function seedData() {
  console.log('Seeding database with sample data...');

  try {
    // Add events
    await storage.createEvent({
      title: "Bach & Contemporary Reflections",
      date: new Date("2023-10-15T19:30:00"),
      time: "7:30 PM",
      venue: "Wigmore Hall, London, UK",
      description: "A solo recital exploring J.S. Bach's Partita No. 2 alongside contemporary works inspired by Bach's musical language, featuring compositions by Sofia Gubaidulina and Thomas Adès.",
      isPast: false,
      bookingLink: "#",
      programLink: "#"
    });
    
    await storage.createEvent({
      title: "Brett Dean's \"Eclipse\" with 97 Ensemble",
      date: new Date("2023-11-03T20:00:00"),
      time: "8:00 PM",
      venue: "Kings Place, London, UK",
      description: "Performing Brett Dean's String Quartet No. 1 \"Eclipse\" alongside works by Beethoven and Shostakovich in a program exploring musical dialogues across centuries.",
      isPast: false,
      bookingLink: "#",
      programLink: "#"
    });
    
    await storage.createEvent({
      title: "Winter Solstice: Music and Light",
      date: new Date("2023-12-22T19:00:00"),
      time: "7:00 PM",
      venue: "St. Martin-in-the-Fields, London, UK",
      description: "A special collaborative performance with Constelação 15, combining violin music with visual projections and lighting design to create an immersive solstice celebration.",
      isPast: false,
      bookingLink: "#",
      programLink: "#"
    });
    
    // Add repertoire items
    await storage.createRepertoire({
      composer: "J.S. Bach",
      title: "Sonatas and Partitas for Solo Violin",
      category: "Solo Performances"
    });
    
    await storage.createRepertoire({
      composer: "Niccolò Paganini",
      title: "24 Caprices, Op. 1",
      category: "Solo Performances"
    });
    
    await storage.createRepertoire({
      composer: "Ludwig van Beethoven",
      title: "Violin Concerto in D major, Op. 61",
      category: "Violin Concertos"
    });
    
    await storage.createRepertoire({
      composer: "Maurice Ravel",
      title: "String Quartet in F major",
      category: "Chamber Music"
    });
    
    await storage.createRepertoire({
      composer: "Kaija Saariaho",
      title: "Nocturne for Solo Violin",
      category: "Contemporary Works"
    });

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedData();
