<template>
  <div>
    <Search
      :destinations="airports.destination"
      :origins="airports.origin"
      :flights="flights"
      @searched="onSearch"
    />
    <div class="rows-per-page-section">
      <label for="rowsPerPage">Select Rows Per Page:</label>
      <select
        v-model="pages.rowsPerPage"
        @change="onRowsDropDownChange"
        id="rowsPerPage"
      >
        <option
          :selected="item == pages.rowsPerPage"
          :value="item"
          v-for="(item, index) in rowsPerPage"
          :key="index"
        >
          {{ item }}
        </option>
      </select>
    </div>
    <template v-if="filteredflights.length">
      <table>
        <tr>
          <th colspan="4">From</th>
          <th colspan="4">To</th>
        </tr>
        <tr>
          <th>Airport Name</th>
          <th>Airort Code</th>
          <th>Country Code</th>
          <th>Currency</th>
          <th>Airport Name</th>
          <th>Airort Code</th>
          <th>Country Code</th>
          <th>Currency</th>
        </tr>
        <tr v-for="(item, index) in filteredflights" :key="index">
          <td>{{ item.fromAirportName }}</td>
          <td>{{ item.fromAirportCode }}</td>
          <td>{{ item.fromCountryCode }}</td>
          <td>{{ item.fromCurrency }}</td>
          <td>{{ item.ToAirportName }}</td>
          <td>{{ item.ToAirportCode }}</td>
          <td>{{ item.ToCountryCode }}</td>
          <td>{{ item.ToCurrency }}</td>
        </tr>
      </table>
      <div class="pagination">
        <a href="#" v-on:click="changePage($event, 0)">&laquo;</a>
        <a
          href="#"
          v-on:click="changePage($event, index)"
          :class="{ active: index == pages.current }"
          v-for="(item, index) in pages.dispPages"
          :key="index"
          >{{ index + 1 }}</a
        >
        <a href="#" v-on:click="changePage($event, pages.dispPages.length - 1)">&raquo;</a>
      </div>
    </template>
    <div v-else>No flights found.</div>
  </div>
</template>

<script>
import Constant from "./Constant.js";
import Search from "./SearchComponent.vue";

export default {
  name: "ECommerceComponent",
  components: {
    Search,
  },
  data() {
    return {
      version: 1,
      region: "en-us",
      flights: [],
      filteredflights: [],
      searchedFlights: [],
      searched: false,
      pages: {
        dispPages: [],
        current: 0,
        rowsPerPage: 10,
      },
      rowsPerPage: [10, 15, 20],
      airports: {
        destination: new Set(),
        origin: new Set(),
      },
    };
  },
  methods: {
    getConnections() {
      this.$http
        .get(
          `/api/v${this.version}/Airport/OriginsWithConnections/${this.region}`
        )
        .then((response) => {
          this.mapData(response.data.airports || []);
          //this.$store.commit("setFlights", response.data.airports || [])
        });
    },
    mapData(airports) {
      const origin = new Set([Constant["default-origin"]]);
      const destination = new Set([Constant["default-destination"]]);
      this.flights = airports.reduce((previousValue, item) => {
        const from = {
          fromCountryCode: item.countryCode,
          fromAirportName: item.name,
          fromCurrency: item.currency,
          fromAirportCode: item.code,
        };
        origin.add(item.name);
        const items = item.connections.map((con) => {
          destination.add(con.name);
          return {
            ...from,
            ToCountryCode: con.countryCode,
            ToAirportName: con.name,
            ToCurrency: con.currency,
            ToAirportCode: con.code,
          };
        });
        previousValue.push(...items);
        return previousValue;
      }, []);
      this.airports.origin = origin;
      this.airports.destination = destination;
      this.filterFlights(this.pages.current);
    },
    filterFlights(page) {
      let flights = this.searched ? this.searchedFlights : this.flights;
      this.pages.dispPages = Array(Math.ceil(flights.length/this.pages.rowsPerPage));
      const items = flights.slice(
        this.pages.rowsPerPage * page,
        (page + 1) * this.pages.rowsPerPage
      );
      this.filteredflights = [...items]
    },
    changePage(event, index) {
      event.preventDefault();
      this.pages.current = index;
      this.filterFlights(this.pages.current);
    },
    onRowsDropDownChange() {
      this.pages.current = 0;
      this.filterFlights(this.pages.current);
    },
    onSearch(event) {
      if(event.searched) {
        this.searchedFlights = event.data;
      } 
      this.searched = event.searched;
      this.filterFlights(this.pages.current);
    },
  },
  created() {
    this.getConnections();
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  text-align: center;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4caf50;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}

.rows-per-page-section {
  text-align: left;
  margin-bottom: 10px;
}
</style>

<style>
select,
option {
  width: 70px;
  height: 33px;
  background-color: #a0bddb;
}

option {
  overflow: hidden;
  white-sapce: no-wrap;
  text-overflow: ellipsis;
}

.round-trip {
  top: 0;
  margin: auto 0;
}
</style>
