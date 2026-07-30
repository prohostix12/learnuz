import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables manually from .env file
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI\s*=\s*["']?([^"'\r\n]+)["']?/);
    if (match) {
      process.env.MONGODB_URI = match[1];
      console.log('Loaded MONGODB_URI from .env file successfully.');
    }
  }
} catch (e) {
  console.log('No .env file loaded or error parsing: ', e.message);
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/learnuz';

// Define schemas inline
const UniversitySchema = new mongoose.Schema({
  id: String,
  name: String,
  description: { type: String, default: '' }
}, { strict: false });

const ProgramSchema = new mongoose.Schema({
  title: String,
  description: { type: String, default: '' }
}, { strict: false });

const University = mongoose.models.University || mongoose.model('University', UniversitySchema);
const Program = mongoose.models.Program || mongoose.model('Program', ProgramSchema);

async function run() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully.');

    // Universities migration
    const unisToMigrate = await University.find({ description: { $exists: false } });
    console.log(`Found ${unisToMigrate.length} universities without description field.`);
    
    // Always run updateMany to ensure even existing documents have the field initialized
    console.log('Migrating universities...');
    const uniResult = await University.updateMany(
      { description: { $exists: false } },
      { $set: { description: '' } }
    );
    console.log('Universities migration result:', uniResult);

    // Programs migration
    const progsToMigrate = await Program.find({ description: { $exists: false } });
    console.log(`Found ${progsToMigrate.length} programs without description field.`);
    
    console.log('Migrating programs...');
    const progResult = await Program.updateMany(
      { description: { $exists: false } },
      { $set: { description: '' } }
    );
    console.log('Programs migration result:', progResult);

    console.log('Migration finished successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

run();
