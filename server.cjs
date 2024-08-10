const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));

// { "dotfiles": "allow" }

app.get("/", (req, res) => {
    res.status(200);
    res.send("Random text");
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
