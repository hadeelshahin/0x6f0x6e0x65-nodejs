const fs = require("fs");

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>main-page</title></head>");
    res.write(`<body>
    <h1>Hello From Node.js Server</h1>
    <form action='/create-user' method='POST'>
    <input type='text' name='username' />
    <button type='submit'> Add User </button>
    </form>
    </body>`);
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>users-page</title></head>");
    res.write(
      "<body><ul><li>User-1</li><li>User-2</li><li>User-3</li></ul></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
        fs.writeFileSync("users.text", user, () => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
        });
      
    });
  }
}

module.exports = requestHandler;
