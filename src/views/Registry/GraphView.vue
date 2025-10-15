<template>
  <v-container
    fluid
    v-if="graphData.nodes && graphData.nodes.length > 0"
  >
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
        class="pt-0 mt-2"
      >
        <v-card height="100%">
          <v-card-title class="blue white--text">
            Legend and configuration
          </v-card-title>
          <v-card-text class="pt-3">
            <v-container fluid>
              <v-row no-gutters>
                <v-col cols="12">
                  Click on any point to re-draw the graph with that point as the centre.
                  Click on the centre to view the record in FAIRsharing. Hover over to view direct connections.
                  Use the mouse/trackpad to scroll and zoom.
                </v-col>
                <v-col cols="12">
                  For more information, please see the
                  <a
                    href="https://fairsharing.gitbook.io/fairsharing/about-our-records/network-graphs"
                    target="_blank"
                  >
                    documentation
                  </a>.
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  Relations between records are coloured as follows:
                </v-col>
                <v-col cols="12">
                  <v-list dense>
                    <v-list-item
                      v-for="legendItem in networkGraph['legend']"
                      :key="legendItem['name']"
                    >
                      <!--
                      <v-list-item-icon>
                        <v-icon :color="legendItem['color']">
                          fa fa-long-arrow-alt-right
                        </v-icon>
                      </v-list-item-icon>
                      -->
                      <v-list-item-title class="font-weight-regular text-body-2">
                        {{ legendItem['name'] }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
              <v-divider />
              <!-- Color definition meaning in NetworkGraph -->
              <div>
                <h3 class="mb-4">
                  Registry
                </h3>
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                    xs="12"
                    sm="3"
                    md="12"
                    lg="12"
                    xl="12"
                    fluid
                    class="d-flex justify-center"
                  >
                    <v-btn
                      v-for="registryItem in networkGraph['registry']"
                      :key="registryItem['name']"
                      class="status_style mx-3 mb-2"
                      :color="registryItem['active'] ? registryItem['color'] : 'gray' "
                      :class="[
                          registryItem['active'] ? 'white--text ' : 'black--text '
                        ]"
                      :disabled="!buttonsActive"
                      @click="toggleClick(registryItem)"
                    >
                      {{ registryItem['name'] }}
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <v-divider />
              <div>
                <!-- Color definition meaning in NetworkGraph -->
                <h3 class="mb-4">
                  Status (shown on mouseover)
                </h3>
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                    xs="12"
                    sm="3"
                    md="12"
                    lg="12"
                    xl="12"
                    fluid
                    class="d-flex justify-center"
                  >
                    <v-btn
                      v-for="status in networkGraph['status']"
                      :key="status['name']"
                      class="status_style mx-3 mb-2"
                      :color="status['active'] ? status['color'] : 'gray' "
                      :class="[
                          status['active'] ? 'white--text ' : 'black--text '
                        ]"
                      :disabled="!buttonsActive"
                      @click="toggleClick(status)"
                    >
                      {{ status['name'] }}
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <v-divider />
              <div>
                <!-- buttons here -->
                <h3 class="mb-4">
                  Distance from centre
                </h3>
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                    xs="12"
                    sm="3"
                    md="12"
                    lg="12"
                    xl="12"
                    fluid
                    class="d-flex justify-center"
                  >
                    <v-btn
                      v-for="distance in networkGraph['distance']"
                      :id="`distance_${distance['hops']}`"
                      :key="distance['name']"
                      class="status_style mx-3 mb-2"
                      :color="getLengthColour(distance['hops'])"
                      :class="[
                          distance['active'] ? 'white--text ' : 'black--text '
                        ]"
                      :disabled="!buttonsActive"
                      @click="lengthLimit(distance)"
                    >
                      {{ distance['name'] }}
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="9"
        lg="9"
        xl="9"
        class="pt-0 mt-2"
      >
        <!--
        <v-btn
          class="ml-2 my-2 white"
          :to="`/${$route.params.id}`"
        >
          <v-icon :class="`primary--text`">
            fa-arrow-left
          </v-icon>
          <span :class="`primary--text ml-3`"> Go to Record </span>
        </v-btn>
        -->
        <div v-if="graphData.nodes && graphData.nodes.length === 0">
          <v-card-title class="blue white--text">
            No graph found!
          </v-card-title>
        </div>
        <div v-else>
          <v-card-title
            v-if="!loading"
            class="blue white--text"
          >
            {{ graphData.name }} ({{ graphData.id }})
          </v-card-title>
          <v-card-subtitle
            v-if="!loading"
            class="blue white--text"
          >
            {{ registry }}/{{ type }}
          </v-card-subtitle>
        </div>

        <v-card
          height="100%"
        >
          <div
            v-if="graphData.nodes.length === 0"
            height="100%"
          >
            <v-card-text class="pt-3">
              <v-container fluid>
                <v-row no-gutters>
                  <v-col cols="12">
                    <p>No data were found showing links between this record and others. This could be because:</p>
                    <ul style="list-style-type: square;">
                      <li>The record has just been created and the graph data are still being generated.</li>
                      <li>This record has no links to other records.</li>
                      <li>Something went wrong.</li>
                    </ul>
                    <br>
                    <p>If you need assistance, please <a href="mailto:contact@fairsharing.org">contact us</a>.</p>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </div>
          <div
            ref="sigmacontainer"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import Graph from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import FA2Layout from "graphology-layout-forceatlas2/worker";
import Sigma from "sigma";
import { NodeImageProgram } from "@sigma/node-image";
import {reactive, ref, watch, computed, onMounted} from "vue";

import relationColors from "@/data/RelationsColors.json"
import networkGraphData from "@/data/networkGraph.json"
import axios from "axios";
import {mapState, storeToRefs} from "pinia";
/*
import Loaders from "@/components/Navigation/Loaders";
import GraphClient from '@/lib/GraphClient/GraphClient.js'
import graphQuery from '@/lib/GraphClient/queries/getGraphRelations.json'
 */

const graph = new Graph();
let renderer;

export default {
  name: "GraphView",
  components: {},
  data () {
    return {
      error: false,
      loading: false,
      initialized: false,
      depth: [1, 2, 3],
      registry: "unknown",
      type: "unknown",
      relations: null,
      relations_colors: relationColors,

      typesFound: [],
      chart: null,
      cancelCurrentAnimation: null,
      //networkGraph: networkGraphData // TODO: What's the composition API equivalent?
    }
  },
  async setup() {
    const store = useAdvancedSearchStore();
    const sigmacontainer = ref(null);

    onMounted(() => {
      console.log(sigmacontainer.value);
    });

    let networkGraph = reactive(networkGraphData);
    let graphData = reactive([]);
    let loading = ref(false);
    let legend = reactive({
      relations: {},
      types: {
        circle: false,
        square: false,
        triangle: false,
        diamond: false
      }
    });
    let sensibleSettings = reactive({});
    let fa2Layout = ref(null);
    let graphState = reactive({});
    let buttonsActive = ref(false);
    let selectedLengths =  reactive({
      1: true,
      2: false,
      3: false
    });
    let active = reactive({
      database: true,
      collection: true,
      standard: true,
      policy: true,
      fairassist: true,
      ready: true,
      in_development: true,
      uncertain: true,
      deprecated: true
    });
    let highlighted = ref(0);

    /*
    let layoutRendering = computed(() => {
      if (fa2Layout === undefined || fa2Layout === null) {
        return false
      }
      return fa2Layout.isRunning();
    })
     */

    // Get graph data from the API based on the IDs from the advancedsearchresponse.
    async function getData(ids){
      loading = true;
      legend.types = {
        circle: false,
        square: false,
        triangle: false,
        diamond: false
      }
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          "/search_utils/link_fairassist/" + ids;
        const data = await axios.get(url);
        loading = false;
        return data;
      } catch (error) {
        if (error) {
          loading = false;
          return [];
        }
      }
    }

    async function plotGraph() {
      graph.clear();
      graph.import(graphData);

      console.log("got container: " + JSON.stringify(sigmacontainer));

      // Graphology implementation of Force Atlas 2 in a web worker
      sensibleSettings = forceAtlas2.inferSettings(graph);
      fa2Layout = new FA2Layout(graph, {
        iterations: 50,
        settings: sensibleSettings,
      });

      // eslint-disable-next-line no-unused-vars
      renderer = new Sigma(
        graph,
        sigmacontainer,
        {
          allowInvalidContainer: true,
          nodeProgramClasses: {
            image: NodeImageProgram // Breaks the page now...
          }
        });
      fa2Layout.start();

      // Attempt to highlight nodes on hover...
      renderer.on("enterNode", ({ node }) => {
        graphState.hoveredNode = node;
        graphState.hoveredNeighbors = new Set(graph.neighbors(node));
        renderer.refresh();
      });
      renderer.on("leaveNode", () => {
        graphState.hoveredNode = undefined;
        graphState.hoveredNeighbors = undefined;
        renderer.refresh();
      });
      renderer.setSetting("nodeReducer", (node, data) => {
        const res = { ...data };

        // This is for hiding everything except the node being hovered over.
        if (
          graphState.hoveredNeighbors &&
          !graphState.hoveredNeighbors.has(node) &&
          graphState.hoveredNode !== node
        ) {
            res.hidden = true;
        }

        if (graphState.selectedNode === node) {
          res.highlighted = true;
        }

        // Hide nodes which are further away than the path length.
        if (selectedLengths[res.length] === false)
        {
          res.hidden = true;
        }

        // Hide nodes when their registry is not selected
        if (!active[res.registry])
        {
          res.hidden = true;
        }

        // Hide nodes when their status is not selected
        if (!active[res.status])
        {
          res.hidden = true;
        }

        return res;
      });

      // This is for hiding everything except the node being hovered over.
      renderer.setSetting("edgeReducer", (edge, data) => {
        const res = { ...data };
        if (graphState.hoveredNode && !graph.hasExtremity(edge, graphState.hoveredNode)) {
          res.hidden = true;
        }
        return res;
      });

      renderer.refresh();

      await new Promise(r => setTimeout(r, 10000));
      fa2Layout.stop();
      buttonsActive = true;
    }

    // Watched so that the graph can be re-plotted when search results change.
    watch(() => store.getAdvancedSearchResponse, async () => {
      let ids = store.getAdvancedSearchResponse.map((x) => x.id).join(',');
      if (ids.length > 0) {
        graphData = await getData(ids);
        plotGraph(graphData)
      }
      console.log(JSON.stringify(graphData));
    });

    return { store, loading, graphData, networkGraph, sigmacontainer };
  },
  /*
  watch: {
    active: {
      async handler() {
        let _module = this;
        if (!_module.fa2Layout.isRunning()) {
          _module.fa2Layout.start();
          await new Promise(r => setTimeout(r, 2000));
          _module.fa2Layout.stop();
        }
        else {
          await new Promise(r => setTimeout(r, 2000));
          _module.fa2Layout.stop();
        }
      },
      deep: true
    },
    selectedLengths: {
      async handler() {
        let _module = this;
        if (!_module.fa2Layout.isRunning()) {
          _module.fa2Layout.start();
          await new Promise(r => setTimeout(r, 2000));
          _module.fa2Layout.stop();
        }
        else {
          await new Promise(r => setTimeout(r, 2000));
          _module.fa2Layout.stop();
        }
      },
      deep: true,
    }
  },
   */
  methods: {

    lengthLimit(item) {
      const itemLength = item.hops
      this.selectedLengths[itemLength] = !this.selectedLengths[itemLength];
      item.active = !item.active
    },
    getLengthColour(len) {
      if (this.selectedLengths[len] === true) {
        return "#27aae1"
      }
      else {
        return "gray"
      }
    },
    toggleClick(item) {
      let itemName = item.name.toLowerCase()
      if (itemName === 'in development')  itemName = "in_development"
      this.active[itemName] = !this.active[itemName];
      item.active = !item.active
    }
  }
};
</script>

<style scoped lang="scss">
#sigmacontainer {
  width: 100%;
  height: 100%;
  min-height: 1000px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.button-filters {
  width: 150px;
}
</style>
