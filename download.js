const express = require('express');
const { google } = require('googleapis');
const app = express();

// Replace <YOUR_CLIENT_ID> and <YOUR_CLIENT_SECRET> with your own client ID and secret obtained from Google API Console
const clientId = '89859045983-8te8d2j5ej4b0kt0v7ajiut3l9od0cet.apps.googleusercontent.com';
const clientSecret = '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';

// Replace <YOUR_REDIRECT_URI> with your own redirect URI
const redirectUri = 'http://localhost:3000/oauth2callback';

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

// Generates a URL that can be used to authenticate with Google and grant access to Google Drive
const generateAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive'],
  });
};

// Downloads a file from Google Drive and returns the file contents as a response
const downloadFile = async (drive, fileId) => {
  const response = await drive.files.get({
    fileId: fileId,
    alt: 'media',
  });

  return response.data;
};

app.get('/auth', (req, res) => {
  res.redirect(generateAuthUrl());
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  const drive = google.drive({
    version: 'v3',
    auth: oAuth2Client,
  });

  // Example file ID to download
  const fileId = 'https://drive.google.com/file/d/1RyUgmVzNn2HqWiaChbQjzE4emNgPRQ3P/view?usp=share_link';

  try {
    const contents = await downloadFile(drive, fileId);
    res.status(200).send(contents);
  } catch (error) {
    res.status(500).send({ error: 'Unable to download file' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
