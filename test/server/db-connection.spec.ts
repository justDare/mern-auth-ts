import { expect } from "chai";
import mongoose from "mongoose";

describe("mongo db connection", () => {
  it("db connect function connects successfully", () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });
});
