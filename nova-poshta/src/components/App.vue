<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const API_KEY = process.env.API_KEY;
const VIDDILENIA_KEY = process.env.VIDDILENIA_KEY;

const refCity = reactive({ ref: "" });
const getCities = function () {
  axios
    .post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {
        Page: "1",
        FindByString: city.value,
        Limit: "20",
      },
    })
    .then((data) => (refCity.ref = data.data.data[0].Ref));
};

const warehouses = reactive({ info: [] });
const getWarehouses = function () {
  axios
    .post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: refCity.ref,
        Page: "1",
        Limit: "100",
        Language: "UA",
		TypeOfWarehouseRef: VIDDILENIA_KEY
      },
    })
    .then((data) => {
      warehouses.info = data.data.data;
      console.log(warehouses.info);
    });
};

const city = ref("");

</script>

<template>
  <form :class="$style.poshta" @submit.prevent="getCities">
    <span>Населений пункт</span>
    <input
      v-model="city"
      :class="$style.cities"
      type="text"
      @blur="getCities"
    />
    <span>Поштове відділення</span>
    <select :class="$style.warehouses" name="warehous" @click="getWarehouses">
      <option value="warehous" v-for="warehous in warehouses.info">
        {{ warehous.Description }}
      </option>
    </select>
  </form>
</template>

<style src="../assets/style.css" lang="css" module></style>
