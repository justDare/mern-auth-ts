import { connect, ConnectionOptions } from "mongoose";

export const connectDB = async () => {
  let db_uri: string;
  let node_env: string | undefined = process.env.NODE_ENV;

  switch (node_env) {
    case "test":
      db_uri = process.env.MONGO_TEST_URI || "";
      break;
    case "dev":
      db_uri = process.env.MONGO_DEV_URI || "";
      break;
    case "prod":
      db_uri = process.env.MONGO_PROD_URI || "";
      break;
    default:
      db_uri = "";
  }

  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };

    await connect(db_uri, options).then(() => {
      node_env === "test"
        ? null
        : console.log(`mongodb ${node_env} cluster connected`);
    });
  } catch (err) {
    console.log(err);
  }
};
