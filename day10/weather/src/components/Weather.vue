<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
const API_KEY = process.env.API_KEY

const cityWeather = ref(null) //для вывода погоды
const addCity = ref('Київ') // для добавления города
const arrCity = reactive({name:[]}) // массив добавленых городов
const selectedCity = ref('') // вибраный город для поиска погоды
const dropDownArr = ref({}) // массив городов для выпадающего списка
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
})



let typingTimer;               
let doneTypingInterval = 500;  

const timerFunc = function(){
  dropDown = true
  clearTimeout(typingTimer);
  typingTimer = setTimeout(getCityName, doneTypingInterval);
}

</script>

<template>
  <section>
    <div class="city">
      <form
        class="addCity"
        @submit.prevent="addUserCity(addCity)"
      >
        <label class="addLabel">Введіть місто:</label>
        <input class="addInput" v-model="addCity" type="text" id="myInput" @keyup="timerFunc"/>

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

      
      <div class="selectCity">
        <label class="selectLabel">Оберіть місто: </label>
        <select class="selectSelect" v-model="selectedCity">
          <option v-for="city in arrCity.name">
            {{ city }}
          </option>
        </select>
        <button class="selectButton" @click="getCityWeather">Погода</button>
      </div>
    </div>

    <div class="" v-if="cityWeather!==null">
      <table>
        <tr>
          <td>{{ cityWeather.name }}</td>
          <td>{{ cityWeather.sys.country }}</td>
          <td>{{ "["+cityWeather.coord.lon+";"+cityWeather.coord.lat+"]" }}</td>
        </tr>
        <tr>
          <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIHfkdUcQrBCcMhtrzisFCZIKR0JDMCaF98g&usqp=CAU" class="humidity"></td>
          <td>humidity</td>
          <td>{{ cityWeather.main.humidity }}</td>
        </tr>
        <tr>
          <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCRRWb-zS9dIDFjf43vXTgvH-_6I9YbzXGwQ&usqp=CAU" class="temp"></td>
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
  <button @click="getCityName">test</button>
</template>

<style src="../assets/style.css" lang="css"></style>
