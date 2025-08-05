<template>
  <div>
    <v-data-table
      :headers="headersList"
      :items="itemList"
      disable-sort
      mobile-breakpoint="sm"
    >
      <template #item.name="{ item }">
        <div class="d-flex">
          <v-avatar size="30">
            <Icon :height="30" :item="item.type" />
          </v-avatar>
          <a
            :href="fairsharingURL + item.id"
            class="ml-3 text-left"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ item.name }}
          </a>
        </div>
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
import Icon from "@/components/Icon/icon";
import customIcons from "@/plugins/icons.js";

export default {
  name: "TableComponent",
  components: { Icon },
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
      customIcons: customIcons,
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
      height: 40px !important;

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
