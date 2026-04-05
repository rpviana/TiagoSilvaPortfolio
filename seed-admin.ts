import { db } from "./server/db";
import { users } from "./shared/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seedAdmin() {
  console.log("A preparar a criação do administrador...");
  
  const email = "teste@exemplo.com";
  const password = "RPViana2005"; // Podes mudar isto e depois correr o script!
  
  try {
    // 1. Verificar se o admin já existe
    const existingAdmins = await db.select().from(users).where(eq(users.email, email));
    
    if (existingAdmins.length > 0) {
      console.log(`❌ O utilizador ${email} já existe na base de dados!`);
      return;
    }

    // 2. Hash da password (muito importante para segurança)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Inserir na base de dados
    await db.insert(users).values({
      email,
      password: hashedPassword,
      isAdmin: true,
      firstName: "Tiago",
      lastName: "Silva",
    });

    console.log("✅ Administrador criado com sucesso!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("Nota: Não te esqueças de alterar esta password no ficheiro seed-admin.ts para algo mais seguro antes de o correr!");
    
  } catch (error) {
    console.error("❌ Erro ao criar o administrador:", error);
  } finally {
    process.exit(0);
  }
}

seedAdmin();