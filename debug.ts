import 'dotenv/config';
import { storage } from './server/storage';

async function test() {
  console.log(await storage.getAllSiteContent());
  process.exit(0);
}
test();