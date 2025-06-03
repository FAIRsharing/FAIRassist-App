<template>
  <p>
    FAIRassist signposts and tracks the evolution of
    <strong
      >resources for the assessment and/or evaluation of digital objects</strong
    >
    against the
    <a href="https://doi.org/10.1038/sdata.2016.18" target="_blank"
      >FAIR principles</a
    >, which are aspirational.
  </p>
  <p>
    These resources include <u>manual</u> <i>questionnaires</i>,
    <i>checklists</i> and <u>automated</u> <i>tests</i> that help users
    understand how to achieve a state of "FAIRness", and how this can be
    measured and improved. However, when using these tools,
    <b
      >be aware that the same assessment and/or evaluation by different tools
      often exhibits widely different results</b
    >; this is due to the flexibility in the interpretation of the FAIR
    Principles. This challange is being tackled by the EOSC FAIR Metrics (and
    Data Quality) Task Force, and
    <a href=" https://doi.org/10.5281/zenodo.7463421" target="_blank">here</a>
    you can read about the progresses on the work (via the hands-on
    "Apples-to-Apples” hackathons) set to define a set of common "tests" that
    can be used by any tool to deliver consistent and trustworthy results.
  </p>
  <p>
    If your resource is missing, you can submit it via the "Register resource"
    button below.
  </p>
  <RegisterResource />
  <ResourceTable />
</template>

<script>
import ResourceTable from "../../components/Registry/ResourceTable.vue";
import RegisterResource from "../../components/Registry/RegisterResource.vue";

export default {
  name: "RegistryView",
  components: { ResourceTable, RegisterResource },
};
</script>
