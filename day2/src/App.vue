<script setup>
import { computed, ref, reactive, VueElement } from 'vue'

// task 1
import image from "./assets/b.jpg"
const name = "Артем"
function onClick() {
	console.log(`1: ${name}`)
}
function onEnter() {
	console.log(`2: ${name}`)
}
function onLeave() {
	console.log(`3: ${name}`)
}

// task 2-4
var quotes = [
  {
    "quote": "This is just a Quote1",
    "source": "Christopher"
  },
  {
    "quote": "This is just a Quote22222222222222222222222222222222222222",
    "source": "Martin"
  },
  {
    "quote": "This is just a Quote3",
    "source": "Dennis"
  },
  {
    "quote": "This is just a Quote433333333333333333333333333333333333333",
    "source": ""
  }
]

const isAuthor = ref("")
const filteredQuotes = computed(()=>{
  return quotes.filter(element => {
    return Boolean(element.source) == Boolean(isAuthor.value)})
})

let sortedQuotes = reactive({sortQuotes: []})
const sortQuotes = function(){
  sortedQuotes.sortQuotes = quotes.sort((a,b)=>a.source > b.source ? 1: -1)
  console.log(sortedQuotes.sortQuotes)
}

</script>

<template>
  <h1>Day 2</h1>
  <div :class="$style.task">
    <h2><b>Реалізувати на 3 різні події вивід вашого імені</b></h2>
    <img
      :class="$style.image"
      :src="image"
      alt="image"
      @click="onClick"
      @mouseenter="onEnter"
		  @mouseleave="onLeave"
	/>
  </div><hr>
  <div :class="$style.task">
    <h2><b>v-for — відобразити список всіх цитат</b></h2>
    <div class="quotes" v-for="qoute in quotes">
      <p :class="$style.qoute">{{ qoute.quote }}</p>
      <p :class="$style.source">{{ qoute.source }}</p>
    </div>
  </div><hr>
  <div :class="$style.task">
    <h2><b>v-bind — цитати, які довше 40 символів відображати червоним кольором</b></h2>
    <div class="quotes" v-for="qoute in quotes">
      <p v-bind:class="qoute.quote.length > 40 ? $style.qouteRed : $style.qoute">{{ qoute.quote }}</p>
      <p :class="$style.source">{{ qoute.source }}</p>
    </div>
  </div><hr>
  <div :class="$style.task">
    <h2><b>Фільтрація по цитатам,які мають автора і не мають автора. За допомогою перемикача (radiobutton).</b></h2>
    <input type="radio" name="author" v-model="isAuthor" value="exist">Є автор
    <input type="radio" name="author" v-model="isAuthor" value="">Немає автора
    <div class="quotes" v-for="qoute in filteredQuotes">
      <p :class="$style.qoute">{{ qoute.quote }}</p>
      <p :class="$style.source">{{ qoute.source }}</p>
    </div>
  </div><hr>
  <div :class="$style.task">
    <h2><b>Сортування списку цитат по прізвищу автора за алфавітом. Сортувати в окремому списку, зберігаючи відображення первинного, не відсортованого списку.</b></h2>
    <button @click="sortQuotes">Сортувати</button>
    <div class="quotes" v-for="qoute in sortedQuotes.sortQuotes">
      <p :class="$style.qoute">{{ qoute.quote }}</p>
      <p :class="$style.source">{{ qoute.source }}</p>
    </div>
  </div>
</template>

<style src="./assets/style.css" lang="css" module></style>
