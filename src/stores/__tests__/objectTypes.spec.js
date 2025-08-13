import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useObjectTypesStore } from "@/stores/objectTypes.js";
import GraphClient from "@/lib/GraphClient/GraphClient.js";
import ObjectTypeData from "./fixtures/getObjectTypes.json";
import sinon from "sinon";

describe("SubjectSearch store methods", () => {
  const returnedVal = ObjectTypeData;
  let stub, store;

  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
    store = useObjectTypesStore();
  });

  beforeAll(() => {
    stub = sinon.stub(GraphClient.prototype, "executeQuery");
    stub.returns(returnedVal);
  });

  afterAll(() => {
    stub.restore();
  });

  it("can check fetchObjectTypes actions", async () => {
    let output = ["Object1", "Object2"];
    await store.fetchObjectTypes();
    expect(store.objectTypes).toStrictEqual(output);
  });

  it("can check getObjectTypes getters", () => {
    store.objectTypes = ["test", "test1", "test2"];
    expect(store.getObjectTypes).toStrictEqual(["test", "test1", "test2"]);
  });

  it("can check getLoadingStatus getters", () => {
    store.loadingStatus = true;
    expect(store.getLoadingStatus).toBe(true);
  });
});
