<template>
  <div>
    <v-data-table
      :headers="headersList"
      :items="itemList"
      :items-per-page-options="perPageOptions"
      disable-sort
      items-per-page="5"
      mobile-breakpoint="sm"
    >
      <template #item.name="{ item }">
        <a
          :href="fairsharingURL + item.id"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ item.name }}
        </a>
      </template>
      <template #item.type="{ item }">
        {{ capitalize(cleanString(item.type)) }}
      </template>
      <template #item.status="{ item }">
        {{ capitalize(cleanString(item.status)) }}
      </template>
      <template #no-data>
        <div>No data found</div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import stringUtils from "@/utils/stringUtils.js";
import { capitalize } from "lodash";

export default {
  name: "TableComponent",
  mixins: [stringUtils],
  props: {
    itemList: {
      type: Array,
      default: () => [],
    },
    hideType: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fairsharingURL: import.meta.env.VITE_FAIRSHARING_URL,
      headers: [
        {
          title: "Name",
          value: "name",
          align: "center",
          key: "name",
        },
        {
          title: "Type",
          value: "type",
          align: "center",
          key: "type",
        },
        {
          title: "Status",
          value: "status",
          align: "center",
          key: "status",
        },
      ],
      loading: false,
      perPageOptions: [
        { value: 5, title: "5" },
        { value: 10, title: "10" },
        { value: 25, title: "25" },
        { value: 50, title: "50" },
        { value: 100, title: "100" },
        { value: -1, title: "$vuetify.dataFooter.itemsPerPageAll" },
      ],
    };
  },
  computed: {
    headersList() {
      //Remove type in principles, metrics, benchmarks
      if (this.hideType) {
        return this.headers.filter(
          (item) =>
            item.title !== "Type" &&
            item.title !== "Id" &&
            item.title !== "Registry",
        );
      } else {
        //remove Id and Registry which are added by default in v-data-table
        return this.headers.filter(
          (item) => item.title !== "Id" && item.title !== "Registry",
        );
      }
    },
  },

  methods: { capitalize },
};
</script>

<style lang="scss" scoped>
:deep {
  table {
    thead tr th {
      background-color: #8dbdd8;
      border-right: 1px solid white;
      font-size: 1.3em;
      color: white;
      line-height: 1.2em;

      &:last-child {
        border-right: none;
      }
    }

    tbody tr {
      &:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.05);
      }

      td {
        padding: 16px !important;
        border-right: 1px solid white;

        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
