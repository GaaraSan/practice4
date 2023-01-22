<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
const API_KEY = process.env.API_KEY

const cityWeather = ref(null) //для вывода погоды
const addCity = ref('Київ') // для добавления города
const arrCity = reactive({name:[]}) // массив добавленых городов
const selectedCity = ref('') // вибраный город для поиска погоды
const dropDownArr = ref({}) // массив городов для выпадающего списка
const theme = ref('white') // тема юзера
let userLocation = {} // координаты юзера
let dropDown = false


const getCityWeather = function() {
	axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.value}&appid=${API_KEY}&units=metric`)
	.then(data => {
    cityWeather.value = data.data; 
  })
}

const getCoordsWeather = function(){
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=metric`)
  .then(data => cityWeather.value = data.data)
}

const getCityName = function(){
  const limit = 5
  axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${addCity.value}&limit=${limit}&appid=${API_KEY}`)
  .then(data => dropDownArr.value = data.data)
}

async function showPosition(position) {
  userLocation = await position.coords
  getCoordsWeather()
}

const addUserCity = function(city){
  arrCity.name.push(city)
  localStorage.setItem ('cityName', JSON.stringify(arrCity.name))
}

const showDropDown = function(city){
  selectedCity.value = `${city.name},${city.country}`
  addCity.value = `${city.name},${city.country}`
  dropDown = false
  getCityWeather()
}

onMounted(()=>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("err");
  }
  arrCity.name = JSON.parse(localStorage.getItem('cityName'))
  theme.value = localStorage.getItem('theme')
  
  loadTheme(theme.value)
})

let typingTimer;               
let doneTypingInterval = 500;  

const timerFunc = function(){
  dropDown = true
  clearTimeout(typingTimer);
  typingTimer = setTimeout(getCityName, doneTypingInterval);
}

let switchStyle1 = ref("bg-slate-500 ring-slate-900/5")
let switchStyle2 = ref("")

const switchStyle = function(){
  if(theme.value === "white"){
    switchStyle1.value = "bg-indigo-600 ring-black/20"
    switchStyle2.value = "translate-x-4"
    setThemeBlack()
  } else if(theme.value === "black"){
    switchStyle1.value = "bg-slate-500 ring-slate-900/5"
    switchStyle2.value = ""
    setThemeWhite()
  } else{
    console.log("error theme")
  }
}

const setThemeBlack = function(){
  theme.value = "black"
  localStorage.setItem("theme","black")
  document.documentElement.classList.add("dark")
}

const setThemeWhite = function(){
  theme.value = "white"
  localStorage.setItem("theme","white")
  document.documentElement.classList.remove("dark")
}

const loadTheme = function(theme){
  if(theme === "black"){
    switchStyle1.value = "bg-indigo-600 ring-black/20"
    switchStyle2.value = "translate-x-4"

    document.documentElement.classList.add("dark")
  } else if(theme === "white"){
    switchStyle1.value = "bg-slate-500 ring-slate-900/5"
    switchStyle2.value = ""
  } else{
    console.log("error theme")
  }
}


</script>

<template>
  <section>
    <div class="city">
      <form
        class="addCity"
        @submit.prevent="addUserCity(addCity)"
      >
        <label class="addLabel dark:text-white">Введіть місто:</label>
        <input class="addInput dark:bg-gray-500" v-model="addCity" type="text" id="myInput" @keyup="timerFunc"/>

        <div class="dropDown" v-if="dropDown">
          <button class="clickList" v-for="city in dropDownArr" @click="showDropDown(city)">
            <div>
              {{ city.name }}
            </div>
            <div>
              {{ city.country}}
            </div>
          </button>
        </div>

        <button class="addButton">Додати</button>
      </form>

      <div @click="switchStyle" :class="'pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out '+switchStyle1">
        <div :class="'h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out '+switchStyle2"></div>
      </div>

      <div class="selectCity">
        <label class="selectLabel dark:text-white">Оберіть місто: </label>
        <select class="selectSelect dark:bg-gray-500" v-model="selectedCity">
          <option v-for="city in arrCity.name">
            {{ city }}
          </option>
        </select>
        <button class="selectButton" @click="getCityWeather">Погода</button>
      </div>
    </div>

    <div class="dark:bg-gray-500 p-5 rounded-xl" v-if="cityWeather!==null">
      <table>
        <tr>
          <td>{{ cityWeather.name }}</td>
          <td>{{ cityWeather.sys.country }}</td>
          <td>{{ "["+cityWeather.coord.lon+";"+cityWeather.coord.lat+"]" }}</td>
        </tr>
        <tr>
          <td><img src="https://cdn-icons-png.flaticon.com/512/5243/5243174.png" class="humidity"></td>
          <td>humidity</td>
          <td>{{ cityWeather.main.humidity }}</td>
        </tr>
        <tr>
          <td><img src="https://e.unicode-table.com/orig/b9/e532c0c070b2bff5deb7ce6815c083.png" class="temp"></td>
          <td>temp</td>
          <td>{{ cityWeather.main.temp }}</td>
        </tr>
        <tr>
          <td><img src="https://openweathermap.org/img/wn/02d.png"></td>
          <td>main</td>
          <td>{{ cityWeather.weather[0].main }}</td>
        </tr>
        <tr>
          <td><img src="https://openweathermap.org/img/wn/50d.png"></td>
          <td>pressure</td>
          <td>{{ cityWeather.main.pressure }}</td>
        </tr>
        <tr>
          <td><img src="https://openweathermap.org/img/wn/02n.png"></td>
          <td>description</td>
          <td>{{ cityWeather.weather[0].description }}</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<style src="../assets/style.css" lang="css"></style>
