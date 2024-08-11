const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");


app.use(express.static(path.join(__dirname, "dist")));

app.get('*', function(request, response, next) {
    response.sendfile(path.join(__dirname, "dist") + '/index.html');
});

app.get("/", (req, res) => {
    res.status(200);
    res.send("Random text");
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
