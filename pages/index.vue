<template>
  <div id="map-wrap relative" style="height: 100vh">
    <div class="absolute top-0 left-0 p-4 z-overlay">
      <div class="flex w-screen max-w-md p-4 bg-white shadow sm:rounded-lg">
        <div class="grid w-full grid-cols-1 gap-4">
          <div>
            <label
              for="location"
              class="block text-sm font-medium leading-5 text-gray-700"
              >{{ markersOne.length }} Providers for:</label
            >
            <select
              id="location"
              v-model="selectedTile"
              class="block w-full py-2 pl-3 pr-10 mt-1 text-base leading-6 border-gray-300 form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            >
              <option :value="0">All</option>
              <option :value="1">Terrestrial</option>
              <option :value="2">Wired</option>
            </select>
          </div>
          <div>
            <label
              for="location"
              class="block text-sm font-medium leading-5 text-gray-700"
              >Marker set:</label
            >
            <select
              id="location"
              v-model="selectedMarkers"
              class="block w-full py-2 pl-3 pr-10 mt-1 text-base leading-6 border-gray-300 form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            >
              <option :value="0">None</option>
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
            </select>
          </div>
          <!-- <div class="flex flex-col w-full">
            <div>
              <label for="full_name" class="sr-only">Full name</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  id="full_name"
                  class="block w-full px-4 py-3 placeholder-gray-500 transition duration-150 ease-in-out form-input"
                  placeholder="Full name"
                />
              </div>
            </div>
          </div> -->
          <div class="flex flex-col w-full">
            <label
              for="location"
              class="block text-sm font-medium leading-5 text-gray-700"
              >Number of providers:</label
            >
            <div
              class="relative flex mt-1 overflow-hidden rounded-md shadow-md"
            >
              <div
                class="flex items-center justify-center w-full px-4 py-2 font-bold text-gray-800"
                :style="'background: ' + colors[0]"
              >
                0
              </div>
              <div
                class="flex items-center justify-center w-full px-4 py-2 font-bold text-gray-800"
                :style="'background: ' + colors[1]"
              >
                1
              </div>
              <div
                class="flex items-center justify-center w-full px-4 py-2 font-bold text-gray-800"
                :style="'background: ' + colors[2]"
              >
                2
              </div>
              <div
                class="flex items-center justify-center w-full px-4 py-2 font-bold text-white"
                :style="'background: ' + colors[3]"
              >
                3
              </div>
              <div
                class="flex items-center justify-center w-full px-4 py-2 font-bold text-white"
                :style="'background: ' + colors[4]"
              >
                4
              </div>
              <div
                class="flex items-center justify-center w-full px-4 py-2 font-bold text-white"
                :style="'background: ' + colors[5]"
              >
                6
              </div>
              <div
                class="flex items-center justify-center w-full px-4 py-2 font-bold leading-none text-white"
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
                class="block text-sm font-medium leading-5 text-gray-700"
                >Overlay opacity:</label
              >
              <div class="flex items-center">
                <input
                  v-model="tileOpacity"
                  class="flex-grow form-range"
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
        <l-marker-cluster class="z-overlay" v-if="selectedMarkers == 1">
          <l-marker
            v-for="(c, i) in markersOne"
            :lat-lng="handleLatLng(c.latlng)"
            :key="i"
          >
            <l-popup :content="c.PERMADDR1"></l-popup>
          </l-marker>
        </l-marker-cluster>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
import axios from 'axios'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

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
    'l-marker-cluster': Vue2LeafletMarkerCluster
  },
  data() {
    return {
      selectedMarkers: 0,
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
  methods: {
    handleLatLng(l) {
      const latlng = []
      latlng.push(parseFloat(l.split(',')[1]))
      latlng.push(parseFloat(l.split(',')[0]))
      // console.log('l', latlng)
      return latlng
    }
  },
  computed: {
    markersOne() {
      return this.markers.slice(0, 50000)
    },
    tileType() {
      if (this.selectedTile === 0) return this.allTiles
      if (this.selectedTile === 1) return this.terrestrialTiles
      if (this.selectedTile === 2) return this.wiredTiles
      return this.allTiles
    }
  }
}
</script>
