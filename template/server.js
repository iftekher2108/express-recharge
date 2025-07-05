require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
  console.log(`HTTP link: http://localhost:${port}`);
});
