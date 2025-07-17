import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import Client from "@/lib/GraphClient/GraphClient.js";
import query from "./getRecords.json";

const sinon = require("sinon");
const axios = require("axios");

describe("GraphQL Client", function () {
  let client;
  const searchFairsharingRecords = { records: [{}] };
  let postStub = sinon.stub(axios, "post");
  const stubQuery = {};
  let localQuery = {};

  beforeEach(() => {
    localQuery = Object.assign(stubQuery, query);
  });

  beforeAll(() => {
    client = new Client();
    postStub.withArgs(sinon.match.any).returns({
      data: {
        data: {
          searchFairsharingRecords,
        },
      },
    });
  });

  afterAll(() => {
    postStub.restore();
  });

  it("can be instantiated as a singleton", function () {
    import.meta.env.VITE_CLIENT_ID = undefined;
    const instance2 = new Client();
    expect(client).toBe(instance2.constructor["_instance"]);
  });

  it("can execute a query", async function () {
    let stub = sinon.stub(Client.prototype, "getData");
    stub.withArgs(sinon.match.any).returns({
      data: {
        data: {
          searchFairsharingRecords,
        },
      },
    });

    localQuery.queryParam = {};
    localQuery.queryParam["fairsharingRegistry"] = "Standard";
    localQuery.queryParam["isRecommended"] = true;
    localQuery.queryParam["isRecommended"] = ["Standard", "Database", 1];
    let output = await client.executeQuery(localQuery);
    expect(JSON.stringify(output)).toBe(
      JSON.stringify({
        searchFairsharingRecords: {
          records: [{}],
        },
      }),
    );

    let output2 = await client.getData(localQuery);
    expect(JSON.stringify(output2.data)).toBe(
      JSON.stringify({
        data: {
          searchFairsharingRecords: {
            records: [{}],
          },
        },
      }),
    );
    stub.restore();
  });

  it("can check either function returns errors or correct response ", async function () {
    let stub = sinon.stub(Client.prototype, "getData");
    localQuery.queryParam = {};
    localQuery.queryParam["fairsharingRegistry"] = "Standard";
    localQuery.queryParam["isRecommended"] = true;

    stub.withArgs(sinon.match.any).returns({
      data: {
        errors: [{ message: "Im an error" }],
      },
    });
    await expect(client.executeQuery(localQuery)).rejects;
    stub.withArgs(sinon.match.any).returns({
      data: {
        data: {
          searchFairsharingRecords,
        },
      },
    });

    await expect(client.executeQuery(localQuery)).resolves.toStrictEqual({
      searchFairsharingRecords: {
        records: [{}],
      },
    });
    Client.prototype.getData.restore();
  });

  it("can check setHeader method", function () {
    let header = client.headers;
    client.setHeader("abc");
    expect(header["Authorization"]).toBe("Bearer abc");
  });
});
