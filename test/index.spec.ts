require("dotenv").config(".env");
import mongoose from "mongoose";
import { connectDB } from "db";

before(async function () {
  this.timeout(0);
  await connectDB();
});

afterEach(function (done) {
  mongoose.connection.db.dropDatabase(function () {
    done();
  });
});

after(function (done) {
  mongoose.connection.close(function () {
    done();
  });
});
