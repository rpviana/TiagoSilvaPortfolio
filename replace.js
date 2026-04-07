const fs = require('fs');

try {
  // Remove old file
  fs.unlinkSync('client/src/pages/admin/ProjectsSettings.tsx');
  console.log('Old file removed');
  
  // Rename new file
  fs.renameSync('client/src/pages/admin/ProjectsSettings_NEW.tsx', 'client/src/pages/admin/ProjectsSettings.tsx');
  console.log('New file renamed successfully');
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
