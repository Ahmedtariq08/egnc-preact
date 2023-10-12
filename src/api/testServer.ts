import { rest } from "msw";
// import "whatwg-fetch";
import { setupServer } from "msw/node";

// const XMLHttpRequest = require("xhr2");
// global.XMLHttpRequest = XMLHttpRequest;

const server = setupServer(
    rest.get("*", async (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`);
        return await res(ctx.status(500), ctx.json({ error: "You must add request handler." }));
    }),
);

beforeAll(() => {
    server.listen();
});
afterAll(() => {
    server.close();
});
afterEach(() => {
    server.resetHandlers();
});

export { server, rest };
