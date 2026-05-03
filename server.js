const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

// Endpoint que chama o OpenCode
app.post("/run", (req, res) => {
  const command = req.body.command || "opencode --help";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ output: stdout });
  });
});

app.listen(3000, () => {
  console.log("OpenCode API rodando na porta 3000");
});