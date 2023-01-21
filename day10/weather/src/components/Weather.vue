<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
const API_KEY = process.env.API_KEY

const cityWeather = ref(null) //для вывода погоды
const addCity = ref('Київ') // для добавления города
const arrCity = reactive({name:[]}) // массив добавленых городов
const selectedCity = ref('') // вибраный город для поиска погоды
let userLocation = {} // координаты юзера

const getCityWeather = function() {
	axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.value}&appid=${API_KEY}&units=metric`)
	.then(data => {
    cityWeather.value = data.data; 
    console.log(cityWeather.value)
  })
}

const getCoordsWeather = function(){
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=metric`)
  .then(data => cityWeather.value = data.data)
}

async function showPosition(position) {
  userLocation = await position.coords
  getCoordsWeather()
}

const addUserCity = function(city){
  arrCity.name.push(city)
  localStorage.setItem ('cityName', JSON.stringify(arrCity.name))
  console.log(localStorage)
}

onMounted(()=>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("err");
  }
  arrCity.name = JSON.parse(localStorage.getItem('cityName'))
  console.log(arrCity.name)
})

</script>

<template>
  <section>
    <div class="city">
      <form
        class="addCity"
        @submit.prevent="addUserCity(addCity)"
      >
        <label class="addLabel">Введіть місто:</label>
        <input class="addInput" v-model="addCity" type="text" />
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
</template>

<style src="../assets/style.css" lang="css"></style>
