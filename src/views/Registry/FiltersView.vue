<template>
  <v-row class="mt-6">
    <!-- ObjectTypeFilter -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <ObjectTypeFilter />
    </v-col>
    <!-- MetricsToolFilter -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <MetricsToolFilter />
    </v-col>
    <!-- SubjectFilter -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <SubjectFilter />
    </v-col>
    <!-- OrganisationsFilter -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <OrganisationsFilter />
    </v-col>
    <!-- MetricsNameFilter -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <MetricsNameFilter />
    </v-col>
  </v-row>
</template>
<script>
import {
  MetricsNameFilter,
  MetricsToolFilter,
  ObjectTypeFilter,
  OrganisationsFilter,
  SubjectFilter,
} from "@/components/Registry/FilterComponents";

export default {
  name: "FiltersView",
  components: {
    MetricsNameFilter,
    MetricsToolFilter,
    ObjectTypeFilter,
    OrganisationsFilter,
    SubjectFilter,
  },
};
</script>
