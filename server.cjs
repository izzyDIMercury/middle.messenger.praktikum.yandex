const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));

app.get("/", (req, res) => {
    res.status(200);
    res.send("Random text");
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
