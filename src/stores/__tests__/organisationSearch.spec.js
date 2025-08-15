import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useOrganisationSearchStore } from "@/stores/organisationSearch.js";
import GraphClient from "@/lib/GraphClient/GraphClient.js";
import OrganisationSearchData from "./fixtures/getOrganisationsSearch.json";
import sinon from "sinon";

describe("OrganisationSearch store methods", () => {
  const returnedVal = OrganisationSearchData;
  let stub, store;

  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
    store = useOrganisationSearchStore();
  });

  beforeAll(() => {
    stub = sinon.stub(GraphClient.prototype, "executeQuery");
    stub.returns(returnedVal);
  });

  afterAll(() => {
    stub.restore();
  });

  it("can check fetchSearchSubjects actions", async () => {
    let output = [
      "University of Nottingham Privacy",
      "Copyright Queensland University of Technology",
    ];
    await store.fetchSearchOrganisations("University");
    expect(store.searchOrganisations).toStrictEqual(output);
  });

  it("can check getSearchOrganisations getters", () => {
    store.searchOrganisations = ["test", "test1", "test2"];
    expect(store.getSearchOrganisations).toStrictEqual([
      "test",
      "test1",
      "test2",
    ]);
  });

  it("can check getLoadingStatus getters", () => {
    store.loadingStatus = true;
    expect(store.getLoadingStatus).toBe(true);
  });
});
