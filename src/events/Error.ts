import { Event } from "..";

const event: Event = {
  name: "error",
  run: (client, error: Error) => {
    console.log(error);
  }
}

export default event;