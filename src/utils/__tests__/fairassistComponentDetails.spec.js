import sinon from "sinon";
import axios from "axios";
import fairassistComponentDetailsData from "@/utils/__tests__/data/fairassistComponentDetailsData.json";
import fairassistComponentDetails from "@/utils/fairassistComponentDetails.js";

describe("fairassistComponentDetails.js", () => {
  let getStub = sinon.stub(axios, "get");
  getStub.withArgs(sinon.match.any).returns(fairassistComponentDetailsData);

  it("can check if fairassistComponentDetails method gives the response in try block' ", async () => {
    expect(
      await fairassistComponentDetails(1236, ["metric_ids"]),
    ).toStrictEqual([1, 2]);
  });

  it("can check if fairassistComponentDetails method gives the error in catch block' ", async () => {
    getStub.withArgs(sinon.match.any).returns({
      status: 404,
    });
    expect(await fairassistComponentDetails(1236, ["metric_ids"])).toBe(
      "No data available",
    );
  });
});
