require("dotenv").config();
const http = require("http");

const app = require("./app");
const { connectDB } = require("./db");

const server = http.createServer(app);

const main = async () => {
  try {
    await connectDB();
    server.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

main();
