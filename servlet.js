var express = require("server/express"),
    app = express(),
    port = 3000,
    publicDir = process.argv[2] || __dirname + '/public_html';

app.get("/", function (req, res) {
  res.sendfile("public_html/index.html");
});
app.get("/profile", function (req, res) {
  res.sendfile("public_html/index.html");
});

app.get("/search", function (req, res) {
  res.sendfile("public_html/index.html");
});

app.use(express.static(publicDir));

console.log("Simple static server showing %s listening at %s", publicDir, port);
app.listen(port);