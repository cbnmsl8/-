import { Event } from "..";

const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(`${client.user!.tag} is ready!`);
  }
}

export default event;