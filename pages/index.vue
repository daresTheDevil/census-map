<template>
  <div id="map-wrap relative" style="height: 100vh">
    <div class="absolute top-0 left-0 p-4 z-overlay">
      <div class="bg-white p-4 w-screen max-w-md flex shadow sm:rounded-lg">
        <div class="grid grid-cols-1 gap-4 w-full">
          <div>
            <label
              for="location"
              class="block text-sm leading-5 font-medium text-gray-700"
              >{{ markers.length }} Providers for:</label
            >
            <select
              id="location"
              v-model="selectedTile"
              class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            >
              <option :value="0">All</option>
              <option :value="1">Terrestrial</option>
              <option :value="2">Wired</option>
            </select>
          </div>
          <!-- <div class="flex w-full flex-col">
            <div>
              <label for="full_name" class="sr-only">Full name</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  id="full_name"
                  class="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
                  placeholder="Full name"
                />
              </div>
            </div>
          </div> -->
          <div class="flex flex-col w-full">
            <label
              for="location"
              class="block text-sm leading-5 font-medium text-gray-700"
              >Number of providers:</label
            >
            <div
              class="relative mt-1 flex shadow-md rounded-md overflow-hidden"
            >
              <div
                class="flex items-center w-full justify-center px-4 py-2 text-gray-800 font-bold"
                :style="'background: ' + colors[0]"
              >
                0
              </div>
              <div
                class="flex items-center w-full justify-center px-4 py-2 text-gray-800 font-bold"
                :style="'background: ' + colors[1]"
              >
                1
              </div>
              <div
                class="flex items-center w-full justify-center px-4 py-2 text-gray-800 font-bold"
                :style="'background: ' + colors[2]"
              >
                2
              </div>
              <div
                class="flex items-center w-full justify-center px-4 py-2 text-white font-bold"
                :style="'background: ' + colors[3]"
              >
                3
              </div>
              <div
                class="flex items-center w-full justify-center px-4 py-2 text-white font-bold"
                :style="'background: ' + colors[4]"
              >
                4
              </div>
              <div
                class="flex items-center w-full justify-center px-4 py-2 text-white font-bold"
                :style="'background: ' + colors[5]"
              >
                6
              </div>
              <div
                class="flex items-center w-full justify-center px-4 py-2 text-white leading-none font-bold"
                :style="'background: ' + colors[6]"
              >
                12+
              </div>
            </div>
          </div>
          <div class="w-full">
            <div>
              <label
                for="location"
                class="block text-sm leading-5 font-medium text-gray-700"
                >Overlay opacity:</label
              >
              <div class="flex items-center">
                <input
                  v-model="tileOpacity"
                  class="form-range flex-grow"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <no-ssr>
      <l-map :zoom="7" :zoom-snap="0.1" :center="[32.7542, -89.493]">
        <l-tile-layer class="z-40" :url="mapTiles"></l-tile-layer>
        <l-tile-layer
          :transparency="true"
          :opacity="tileOpacity"
          class="z-50"
          :url="tileType"
        ></l-tile-layer>
        <v-marker-cluster v-if="markers">
          <v-marker v-for="(c, i) in markers" :lat-lng="c.latlng" :key="i">
            <v-popup :content="c.PERMADDR1"></v-popup>
          </v-marker>
        </v-marker-cluster>
      </l-map>
    </no-ssr>
  </div>
</template>

<style>
@import '~/node_modules/leaflet.markercluster/dist/MarkerCluster.css';
@import '~/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
</style>

<script>
import axios from 'axios'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'

export default {
  asyncData({ params }) {
    return axios
      .get(
        'https://raw.githubusercontent.com/davidbkay/census-data/master/merged.json'
      )
      .then((res) => {
        return { markers: res.data }
      })
  },
  components: {
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  data() {
    return {
      markers: null,
      showMapTiles: false,
      tileOpacity: 0.8,
      colors: [
        '#ffc',
        '#a1dab4',
        '#41b6c4',
        '#225ea8',
        '#253494',
        '#081d58',
        '#000'
      ],
      allTiles:
        'https://api.mapbox.com/styles/v1/fcc/ck7kj023b30oq1iqp3rtc8235/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmNjIiwiYSI6ImNqY2h2MnAxbDJhZjIycXBnN3cxb3FnYzAifQ.-JIKXvGZ-ZI2m7L8f92Lew',
      terrestrialTiles:
        'https://api.mapbox.com/styles/v1/fcc/ck7kj5bgm2t561iobw912lhkz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmNjIiwiYSI6ImNqY2h2MnAxbDJhZjIycXBnN3cxb3FnYzAifQ.-JIKXvGZ-ZI2m7L8f92Lew',
      wiredTiles:
        'https://api.mapbox.com/styles/v1/fcc/ck7kj7z1y4duh1jlbswbpnf17/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmNjIiwiYSI6ImNqY2h2MnAxbDJhZjIycXBnN3cxb3FnYzAifQ.-JIKXvGZ-ZI2m7L8f92Lew',
      selectedTile: 0,
      showCensusTiles: true,
      mapTiles: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
  },
  computed: {
    tileType() {
      if (this.selectedTile === 0) return this.allTiles
      if (this.selectedTile === 1) return this.terrestrialTiles
      if (this.selectedTile === 2) return this.wiredTiles
      return this.allTiles
    }
  }
}
</script>
