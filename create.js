const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Replace with your client ID and secret
const clientId = '546087421563-r8oom39pgqdf0usv8c2ee7tvkc3h21e2.apps.googleusercontent.com';
const clientSecret = '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';

// Replace with the path to your credentials file
const credentialsPath = 'credentials.json';

async function createFile(fileName, fileType, fileData) {
  // Authenticate with Google using your credentials file
  const auth = await google.auth.fromJSON(
    JSON.parse(fs.readFileSync(credentialsPath))
  );
  auth.scopes = ['https://www.googleapis.com/auth/drive'];
  const drive = google.drive({ version: 'v3', auth });

  // Create the file on Google Drive
  const fileMetadata = {
    name: "me",
    mimeType: "png"
  };
  const media = {
    body: "rjfrnjk"
  };
  const createdFile = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  });

  console.log(`File created with ID: ${createdFile.data.id}`);
}

// // Example usage
// const filePath = 'path/to/file.txt';
// const fileName = path.basename(filePath);
// const fileType = 'text/plain';
