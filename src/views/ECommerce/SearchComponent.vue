<template>
  <div>
    <div class="switch-section">
      <div class="search-inner-section round-trip">
        <div>
          <label class="switch">
            <input type="checkbox" v-model="sliderChecked" @change="onSliderChange" />
            <span class="slider round"></span>
          </label>
          <span class="slider-text">{{ sliderText }}</span>
        </div>
      </div>
    </div>
    <div class="search-section">
      <div class="search-inner-section">
        <label for="originAirport">Origin:</label>
        <select v-model="selectedAirport.origin" id="originAirport">
          <option :selected="item == selectedAirport.origin" :value="item" v-for="(item, index) in origins"
            :key="index">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="search-inner-section">
        <label for="destinationAirport">Destination:</label>
        <select v-model="selectedAirport.destination" id="destinationAirport">
          <option :selected="item == destination" :value="item" v-for="(item, index) in destinations" :key="index">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="search-inner-section">
        <label for="start">Start date:</label>
        <input type="date" id="start" name="trip-start" v-model="startDate" ref="startDate" @click="onDateClick(true)"
          :min="now" />
      </div>
      <div class="search-inner-section" v-if="sliderChecked">
        <label for="end">End date:</label>
        <input type="date" id="end" name="trip-end" v-model="startDate" ref="endDate" @click="onDateClick(false)"
          :min="now" />
      </div>
      <div class="search-inner-section round-trip">
        <button class="btn" type="button" @click="searchFlights">Search</button>
        <button class="btn" type="button" @click="resetFlights">Reset</button>
      </div>
    </div>
    <div class="search-section">
      <div class="search-inner-section passenger-filed">
        <label for="infants">Infants:</label>
        <input type="text" id="infants" name="infants" v-model="passengers.infants" disabled />
        <button class="btn" :disabled="passengers.infants == 5" type="button"
          @click="updatePassengers('infants', true)">
          +
        </button>
        <button class="btn" :disabled="passengers.infants == 0" type="button"
          @click="updatePassengers('infants', false)">
          -
        </button>
      </div>
      <div class="search-inner-section passenger-filed">
        <label for="children">Children:</label>
        <input type="text" id="children" name="children" v-model="passengers.children" disabled />
        <button class="btn" :disabled="passengers.children == 5" type="button"
          @click="updatePassengers('children', true)">
          +
        </button>
        <button class="btn" :disabled="passengers.children == 0" type="button"
          @click="updatePassengers('children', false)">
          -
        </button>
      </div>
      <div class="search-inner-section passenger-filed">
        <label for="adults">Adults:</label>
        <input type="text" id="adults" name="adults" v-model="passengers.adults" disabled />
        <button class="btn" :disabled="passengers.adults == 5" type="button" @click="updatePassengers('adults', true)">
          +
        </button>
        <button class="btn" :disabled="passengers.adults == 0" type="button" @click="updatePassengers('adults', false)">
          -
        </button>
      </div>
      <div class="search-inner-section passenger-text">
        <span>You have selected {{ passengers.adults }} adults,{{
            passengers.children
        }}
          children and {{ passengers.infants }} infants.</span>
      </div>
    </div>
  </div>
</template>

<script>
import Constant from "./Constant.js";

export default {
  name: "Search",
  props: {
    destinations: {
      type: Set,
      default: new Set([Constant["default-destination"]]),
    },
    origins: {
      type: Set,
      default: new Set([Constant["default-origin"]]),
    },
    flights: {
      type: Object,
    },
  },
  data() {
    return {
      sliderChecked: true,
      sliderText: "Round-Trip",
      passengers: {
        infants: 0,
        children: 0,
        adults: 0,
      },
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      now: new Date().toISOString().slice(0, 10),
      selectedAirport: {
        origin: Constant["default-origin"],
        destination: Constant["default-destination"],
      },
      searchedFlights: [],
      searched: false,
    };
  },
  watch: {
    origins() {
      const [origin] = this.origins;
      this.selectedAirport.origin = origin;
    },
    destinations() {
      const [destination] = this.destinations;
      this.selectedAirport.destination = destination;
    },
  },
  methods: {
    onSliderChange() {
      this.sliderText = this.sliderChecked ? "Round-Trip" : "One-Way";
    },
    updatePassengers(type, isAdd) {
      if (isAdd) {
        this.passengers[type]++;
      } else {
        this.passengers[type]--;
      }
    },
    onDateClick(isStartDate) {
      console.log(isStartDate);
    },
    getFlights() {
      this.searched = true;
      if (
        this.selectedAirport.origin != Constant["default-origin"] &&
        this.selectedAirport.destination != Constant["default-destination"]
      ) {
        this.searchedFlights = this.flights.filter((item) => {
          if (
            item.fromAirportName == this.selectedAirport.origin &&
            item.ToAirportName == this.selectedAirport.destination
          )
            return item;
        });
        return;
      }
      if (this.selectedAirport.origin != Constant["default-origin"]) {
        this.searchedFlights = this.flights.filter((item) => {
          if (item.fromAirportName == this.selectedAirport.origin) return item;
        });
        return;
      }
      if (this.selectedAirport.destination != Constant["default-destination"]) {
        this.searchedFlights = this.flights.filter((item) => {
          if (item.ToAirportName == this.selectedAirport.destination)
            return item;
        });
        return;
      }
      this.searched = false;
      return;
    },
    resetFlights() {
      this.selectedAirport.origin = Constant["default-origin"];
      this.selectedAirport.destination = Constant["default-destination"];
      this.$emit("searched", {
        searched: false,
      });
    },
    searchFlights() {
      this.getFlights();
      this.$emit("searched", {
        searched: this.searched,
        data: this.searchedFlights,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-section {
  margin-bottom: 10px;
  display: flex;
  justify-content: initial;
  overflow: hidden;
  padding: 15px 2px;
}

.search-inner-section {
  min-width: 180px;
  padding-right: 20px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 3px;
  }

  /* Rounded sliders */
  &.round {
    border-radius: 34px;

    &:before {
      border-radius: 50%;
    }
  }
}
</style>

<style scoped>
input:checked+.slider {
  background-color: #2196f3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked+.slider:before {
  -webkit-transform: translateX(15px);
  -ms-transform: translateX(15px);
  transform: translateX(15px);
}

.slider-text {
  padding-left: 5px;
}

.search-inner-section select {
  min-width: 180px;
}

.btn {
  background-color: #e7e7e7;
  color: black;
  border: none;
  padding: 5px 8px;
  text-align: center;
  transition-duration: 0.4s;
  margin: auto 5px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  top: 0;
}

.switch-section {
  display: flex;
  padding: 15px 0px;
  text-align: left;
}

.passenger-filed input {
  width: 40px;
}

.passenger-filed {
  text-align: left;
}

.passenger-filed button {
  padding: revert;
}

.passenger-text {
  margin-left: auto;
}
</style>
