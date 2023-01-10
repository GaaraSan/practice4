<script setup>
import { computed, ref, reactive, VueElement } from 'vue'
import example from "./assets/example.vue"

const students = reactive([
  {
    id: "1",
    surname: "Sladkova",
    name: "Olga",
    group: "RPZ 19 2/9",
    birthday: "2004",
    handedPractece: true
  },
  {
    id: "2",
    surname: "Dragan",
    name: "Olga",
    group: "RPZ 18 2/9",
    birthday: "2002",
    handedPractece: true
  },
  {
    id: "3",
    surname: "Buro",
    name: "Olga",
    group: "RPZ 19 1/9",
    birthday: "2003",
    handedPractece: false
  },
  {
    id: "4",
    surname: "Neolga",
    name: "Olga",
    group: "RPZ 18 1/9",
    birthday: "2003",
    handedPractece: false
  },
])

const search = ref("")

const onClick = function(id){
  const index = students.findIndex(student => student.id === id)
	students.splice(index, 1)
}

const age = ref(0)
const messageLazy = ref('')
const messageTrim = ref('')

const addStudents = reactive({
	surname: '',
	name: '',
	group: 'RPZ 19 2/9',
	birthday: '2022',
	handedPractece: false
})

function addStudent() {
	students.push(JSON.parse(JSON.stringify(addStudents)))

	addStudents.surname = ''
	addStudents.name = ''
	addStudents.group = 'RPZ 19 2/9'
	addStudents.birthday = '2022'
	addStudents.handedPractece = false
}

</script>

<template>
  <h1>Day 4</h1>
  <div :class="$style.task">
    <h2><b> 1 Програма-приклад, Modifiers- trim, number, andlazy.</b></h2>
    <div :class="$style.container">
		<div :class="$style.item">
			<span :class="$style.item-title">EnterAge(age):    {{ age }}</span>
			<input
        :class="$style.item-input"
				v-model.number="age"
				type="number"
			/>
		</div>
		<div :class="$style.item">
			<span :class="$style.item-title">EnterMessage(lazy):    {{ messageLazy }}</span>
			<input
        :class="$style.item-input"
				v-model.lazy="messageLazy"
			/>
		</div>
		<div :class="$style.item">
			<span :class="$style.item-title">EnterMessage(message):    {{ messageTrim }}</span>
			<input
        :class="$style.item-input"
				v-model.trim="messageTrim"
			/>
		</div>
	</div>
  </div><hr>
  
  <example /><hr>

  <div :class="$style.task">
    <h2><b> В завдання з таблицею “Студенти” додати код, який дозволить додавати елементи в масив. Додати форму для введення нового студента і при натисненні на кнопку заповненний щойно “Студент” потрапляє в таблицю.
    </b></h2>
    <input
      type="text"
      v-model="search"
	  />
    <div :class="$style.parent" v-for="student in students">
      <div :class="[
					$style.div1,
					search !== '' &&
						`${student.surname} ${student.name}`.indexOf(search) >=
							0 &&
              $style.divColor1
				]">{{ `${student.surname} ${student.name} `}}</div>
      <div :class="$style.div2">{{ student.birthday }}</div>
      <div :class="$style.div3">{{ student.group }}</div>
      <div :class="$style.div4">
        <input
          type="checkbox"
          v-model="student.handedPractece"
        >
      </div>
      <div :class="$style.div5"><a :class="$style.delete" @click="onClick(student.id)">Видалити</a></div>
    </div>
  </div>
  <form
		:class="$style.addStudent"
		@submit.prevent="addStudent"
	>
		<label :class="$style.addStudentLabel">
			Прізвище
			<input
				type="text"
				v-model="addStudents.surname"
			/>
		</label>

		<label :class="$style.addStudentLabel">
			Ім'я
			<input
				type="text"
				v-model="addStudents.name"
			/>
		</label>

		<label :class="$style.addStudentLabel">
			Група
			<input
				type="text"
				v-model="addStudents.group"
			/>
		</label>

		<label :class="$style.addStudentLabel">
			Рік народження
			<input
				type="birthday"
				v-model="addStudents.birthday"
			/>
		</label>

		<label :class="$style.addStudentLabel">
			Виконання роботи
			<input
				v-model="addStudents.handedPractece"
				type="checkbox"
			/>
		</label>

		<button :class="$style.addStudentButton">Додати</button>
	</form>
</template>

<style src="./assets/style.css" lang="css" module></style>
