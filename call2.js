const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/share", async (req, res) => {
  const { fileId, email } = req.body;
  await shareFile(fileId, email);
  res.send({ message: `Shared file with email: ${email}` });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
