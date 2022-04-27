"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event = {
    name: "error",
    run: (client, error) => {
        console.log(error);
    }
};
exports.default = event;
