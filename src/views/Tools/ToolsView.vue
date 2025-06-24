<template>
  <p>
    This FAIRassist component signposts and tracks the evolution of resources
    for the assessment and/or evaluation of digital objects against the
    <a href="https://doi.org/10.1038/sdata.2016.18" target="_blank"
      >FAIR principles</a
    >, which are aspirational.
  </p>
  <p>
    These resources include <u>manual</u> questionnaires, checklists and
    <u>automated</u> tests that help users understand how to achieve a state of
    "FAIRness", and how this can be measured and improved. However, when using
    these tools, be aware that the same assessment and/or evaluation by
    different tools often exhibits widely different results; this is due to the
    flexibility in the interpretation of the FAIR Principles.
  </p>
  <p>
    This challenge has been tackled by the EOSC FAIR Metrics (and Data Quality)
    Task Force, and
    <a href="https://doi.org/10.5281/zenodo.7463421" target="_blank">here</a>
    you can read the final report on this work (via the hands-on
    "Apples-to-Apples” hackathons) recommending the definition of a common set
    of metrics and that can be used by any tool to deliver consistent and
    trustworthy results. The work continues in the new EOSC FAIR Metrics and
    Digital Objects Task Force, and through a
    <a href="https://fairassist.org/registry" target="_blank"
      >discovery and registration service</a
    >
    for metrics and benchmarks.
  </p>
  <p>
    If your resource is missing, you can submit it via the "Register resource"
    button below.
  </p>
  <RegisterResource />
  <ResourceTable />
</template>

<script>
import ResourceTable from "@/components/Tools/ResourceTable.vue";
import RegisterResource from "@/components/Tools/RegisterResource.vue";

export default {
  name: "ToolsView",
  components: { ResourceTable, RegisterResource },
};
</script>
