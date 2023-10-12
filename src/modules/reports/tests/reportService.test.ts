import { getNonParentSpecification } from "../reportService";
import { setupReportHandlers } from "./handlers";

describe("Get non parent specification should return specifications that: ", () => {
    beforeEach(() => {
        setupReportHandlers();
    });

    it("are parent", async () => {
        const result: unknown[] = await getNonParentSpecification();
        console.log(result.length);
        expect(result).toBeDefined();
    });
    // it("are categorised by validation types", () => {});
    // it("", () => {});
});
