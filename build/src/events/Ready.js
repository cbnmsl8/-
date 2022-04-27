"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event = {
    name: "ready",
    run: (client) => {
        console.log(`${client.user.tag} is ready!`);
    }
};
exports.default = event;
