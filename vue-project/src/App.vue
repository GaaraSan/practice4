<script setup>
import { ref, VueElement } from 'vue'
import firstFourImage from './assets/fourth/a.jpg'
import secondFourImage from './assets/fourth/b.jpg'
import thirdFourImage from './assets/fourth/c.jpg'
import fourthFourImage from './assets/fourth/d.jpg'
import eightImage from './assets/fourth/a.jpg'
import firstImage from './assets/fourth/a.jpg'
import secondImage from './assets/fourth/b.jpg'

/* second if else task */
const apartment = ref();
function getResult(){
  if (apartment.value >= 1 && apartment.value <= 20)
    alert("Перший під'їзд");
  else if (apartment.value >= 21 && apartment.value <= 48)
    alert("Другий під'їзд");
  else if (apartment.value >= 49 && apartment.value <= 90)
    alert("Третій під'їзд");
  else alert('Існують квартири з 1 по 90');
}

/* second if else task */
const login = ref('');
const password = ref('');
function loginButton(){
  if (login.value == 'toma' && password.value == '123')
    alert('Ласкаво просимо');
  else if (login.value == 'petya' && password.value == '777')
    alert('Ласкаво просимо');
  else if (login.value == 'olya' && password.value == '456')
    alert('Ласкаво просимо');
  else alert('Помилка входу');
}

/* second mouse task */
const folderOpened = ref(false)
function onDoubleClick() {
	folderOpened.value = !folderOpened.value
}

/* third mouse task */
const blocksCount = 333
const hoverId = ref(-1)
function onMouseEnter(id) {
	hoverId.value = id
}
function onMouseLeave() {
	hoverId.value = -1
}

/* fourth mouse task */
const items = [
	{ id: 0, imagePath: firstFourImage },
	{ id: 1, imagePath: secondFourImage },
	{ id: 2, imagePath: thirdFourImage },
	{ id: 3, imagePath: fourthFourImage }
]
const currentImageId = ref(-1)
function onItemClick(id) {
	currentImageId.value = id
}

/* fiveth mouse task */
const currentOffset = ref(0)
const onClick = () => {
	currentOffset.value += 100
}

/* seventh mouse task */
const currentTagName = ref('NONE')
const currentActiveId = ref(-1)
const onClickSeventh = (e, id) => {
	currentTagName.value = e.target.tagName
	currentActiveId.value = id
}

/* eighth mouse task */
function onClickEight(e) {
	const target = e.target
	const { width: currentWidht, height: currentHeight } =
		target.getBoundingClientRect()
	target.style.width = `${
		currentWidht >= 800 ? currentWidht - 100 : currentWidht + 50
	}px`
	target.style.height = `${
		currentHeight >= 500 ? currentHeight - 100 : currentHeight + 50
	}px`
}

/* sixteenth mouse task */
const currentImage = ref(1)
function onMouseEnterSixteenth() {
	currentImage.value = 2
}
function onMouseLeaveSixteenth() {
	currentImage.value = 1
}

</script>

<template>

  <h1 class="title">Day 1</h1>
  <div class="task">
    <p><b>Завдання 1 (1 бал)</b>
      В першому під`їзді квартири з 1 по 20. У другому з 21 по 48. У третьому з 49 по 90.
      Користувач вводить номер квартири. Програма повинна вказати в якому під`їзді
      знаходиться дана квартира.
      Програма повинна враховувати варіант введення чисел за межами діапазону 1..90.
    </p>
    <form @submit.prevent="getResult">
      <label>Квартира: <input type="text" v-model="apartment"></label>
      <button>Дізнатися під`їзд</button>
    </form>
  </div>
  <div class="task">
    <p><b>Завдання 2 (1 бал)</b>
      Користувач вводить логін і пароль. Якщо логін і пароль збігаються із зазначеними нижче,
      то виводиться «Ласкаво просимо». Якщо не збігаються - то «Помилка входу»
    </p>
    <form @submit.prevent="loginButton">
      <label>Login: <input type="text" v-model="login"></label>
      <label>Password: <input type="password" v-model="password"></label>
      <button>Login</button>
    </form>
  </div>
  <div class="task">
    <p><b>Завдання 2 (2 бали)</b>
      Створіть блок div, як зображення фону встановіть йому зображення закритої папки.
      Додайте подію, яка виконується при подвійному натисканні на блоці і замінює фон блоку
      на зображення відкритої папки
    </p>
    <div
      :class="[$style.blockSecond, folderOpened && $style.opened]"
      @dblclick="onDoubleClick"
	></div>
  </div>
  <div class="task">
    <p><b>Завдання 3 (2 бали)</b>
      Додайте в документ 300-400 блоків div квадратної форми з розмірами сторін 30px, і
      кольором фону. Додавання елементів виконайте за допомогою циклу. Додайте подія при
      наведенні миші, яке буде скруглять дані блоки за допомогою border-radius до кола.
      Для уповільнення ефекту заокруглення в CSS можна додати transition.
    </p>
    <div :class="$style.wrapper">
		<div
			:class="[$style.blockThird, hoverId === id && $style.hover]"
			v-for="id in blocksCount"
			:key="id"
			@mouseenter="onMouseEnter(id)"
			@mouseleave="onMouseLeave(id)"
		>
			{{ id }}
		</div>
	</div>
  </div>
  <div class="task">
    <p><b>Завдання 4 (2 бали)</b>
      Створіть div розмірами ширина - 100%, висота 250px. Нижче додайте 4-5 зображень з
      однаковими класами, різного розміру. Додайте подію, яка буде при кліку на зображення
      встановлювати його фоном блоку div з властивістю background-size: contain.
    </p>
    <div :class="$style.wrapper">
		<div
			:class="$style.mainImage"
			:style="`background-image: url('${
				items.find(item => item.id === currentImageId)?.imagePath || ''
			}');`"
		></div>
		<div :class="$style.choice">
			<div
				:class="$style.choiceItem"
				v-for="item in items"
				:key="item.id"
				:style="`background-image: url('${item.imagePath}');`"
				@click="onItemClick(item.id)"
			></div>
		</div>
	</div>
  </div>
  <div class="task">
    <p><b>Завдання 5 (2 бали)</b>
      Створіть блок розмірами 50x50px. Додайте подію кліка, так, що під час кожного кліка на
      блоці він відсувається на 100px вниз від попереднього положення. 
    </p>
    <div
      :class="$style.blockFiveth"
      :style="`margin-top: ${currentOffset}px;`"
      @click="onClick"
	></div>
  </div>
  <div class="task">
    <p><b>Завдання 7 (2 бали)</b>
      Створіть елементи div, p, button, a. Використовуючи target при натисканні виведіть
      інформацію про тип елемента на якому клікнули.
    </p>
    <div :class="$style.current">{{ currentTagName }}</div>
	<div :class="$style.wrapper">
		<div
			:class="[$style.item, currentActiveId === 0 && $style.active]"
			@click="e => onClickSeventh(e, 0)"
		>
			div
		</div>
		<p
			:class="[$style.item, currentActiveId === 1 && $style.active]"
			@click="e => onClickSeventh(e, 1)"
		>
			p
		</p>
		<button
			:class="[$style.item, currentActiveId === 2 && $style.active]"
			@click="e => onClickSeventh(e, 2)"
		>
			button
		</button>
		<a
			:class="[$style.item, currentActiveId === 3 && $style.active]"
			@click="e => onClickSeventh(e, 3)"
		>
			a
		</a>
	</div>
  </div>
  <div class="task">
    <p><b>Завдання 8 (2 бали)</b>
      Змінити розмір зображення при натисканні миші
    </p>
    <img
      :class="$style.image"
      :src="eightImage"
      alt="Eight image"
      @click="onClickEight"
	/>
  </div>
  <div class="task">
    <p><b>Завдання 16 (2 бали)</b>
      Додайте в html код зображення. Додайте скрипт, який буде виконувати такі дії: при
      наведенні миші на картинку, зображення буде замінюватися іншим зображенням. При
      виході миші за межі зображення, буде відновлюватися початкове зображення.
    </p>
    <div
		:class="$style.container"
		@mouseenter="onMouseEnterSixteenth"
		@mouseleave="onMouseLeaveSixteenth"
	  >
		<img
			:class="[
				$style.imageSixteenth,
				$style.firstImage,
				currentImage === 1 && $style.hidden
			]"
			:src="firstImage"
			alt="Sexteen image first"
		/>
		<img
			:class="[$style.imageSixteenth, $style.secondImage]"
			:src="secondImage"
			alt="Sexteen image second"
		/>
	</div>
  </div>
</template>

<style src="./style/style.css" lang="css" module></style>