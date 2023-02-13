const { google } = require('googleapis');

//path module
const path = require('path');

//file system module
const fs = require('fs');
const CLIENT_ID = '89859045983-8te8d2j5ej4b0kt0v7ajiut3l9od0cet.apps.googleusercontent.com'

//client secret
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

//refresh token
const REFRESH_TOKEN = '1//04zW-GVULYVT5CgYIARAAGAQSNwF-L9IrGMwwkL9TSPQlMvyetqem8WCpQs2E1p2iSFjLTx6lqeUNLGgOaJpof2mkYqkmZgwQlCM'
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
//initialize google drive
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});
const filePath = path.join(__dirname, 'download.png');
async function uploadFile() {
    try{
      const response = await drive.files.create({
            requestBody: {
                name: 'download.png', //file name
                mimeType: 'image/png',
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath),
            },
        });  
        // report the response from the request
        console.log(response.data);
    }catch (error) {
        //report the error message
        console.log(error.message);
    }
}  
uploadFile();

// async function generatePublicUrl() {
//     try {
//         const fileId = '11FnOfSbM7i5WUbP4GyT_5xu94LYi9szC';
//         //change file permisions to public.
//         await drive.permissions.create({
//             fileId: fileId,
//             requestBody: {
//             role: 'reader',
//             type: 'anyone',
//             },
//         });

//         //obtain the webview and webcontent links
//         const result = await drive.files.get({
//             fileId: fileId,
//             fields: 'webViewLink, webContentLink',
//         });
//       console.log(result.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
//   generatePublicUrl();