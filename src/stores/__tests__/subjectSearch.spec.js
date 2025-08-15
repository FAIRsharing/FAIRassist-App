import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSubjectSearchStore } from "@/stores/subjectSearch.js";
import GraphClient from "@/lib/GraphClient/GraphClient.js";
import SubjectSearchData from "./fixtures/getSubjectSearch.json";
import sinon from "sinon";

describe("SubjectSearch store methods", () => {
  const returnedVal = SubjectSearchData;
  let stub, store;

  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
    store = useSubjectSearchStore();
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
      "Genetics",
      "Immunogenetics",
      "Phylogenetics",
      "Microbial Genetics",
      "Quantitative Genetics",
      "Human Genetics",
      "Molecular Genetics",
      "Population Genetics",
      "Plant Genetics",
      "Neurogenetics",
      "Epigenetics",
    ];
    await store.fetchSearchSubjects("subject");
    expect(store.searchSubjects).toStrictEqual(output);
  });

  it("can check getSearchSubjects getters", () => {
    store.searchSubjects = ["test", "test1", "test2"];
    expect(store.getSearchSubjects).toStrictEqual(["test", "test1", "test2"]);
  });

  it("can check getLoadingStatus getters", () => {
    store.loadingStatus = true;
    expect(store.getLoadingStatus).toBe(true);
  });
});
