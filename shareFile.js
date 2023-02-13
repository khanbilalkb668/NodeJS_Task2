const { google } = require("googleapis");

const shareFile = async (fileId, email) => {
  // Authenticate with the Google Drive API using an OAuth2 client
  const oAuth2Client = new google.auth.OAuth2(
    "546087421563-r8oom39pgqdf0usv8c2ee7tvkc3h21e2.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/oauth2callback"
  );
  oAuth2Client.setCredentials({
    access_token: "https://oauth2.googleapis.com/token",
    refresh_token: "1//0gnmroqQNj-qiCgYIARAAGBASNwF-L9IrALQXQYtBIG_FhPK1U2bXseq0J-Cm_C8088b9_O2fR9E5wqtjmNboCvj_5xa9sjp3PH8",
  });

  // Use the authenticated client to create a Google Drive API client
  const drive = google.drive({ version: "v3", auth: oAuth2Client });

  // Share the file with the specified email
  const response = await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "user",
      emailAddress: email,
    },
  });

  console.log(`Shared file with email: ${email}`);
  console.log(response.data);
};
