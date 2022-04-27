export * from "./Client";
export * from "./modules";
export * from "./utils";

import { Client } from ".";

const client = new Client();

client.start();