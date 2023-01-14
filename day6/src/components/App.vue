<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import converter from './converter.vue'

const getStudentsApi = reactive({ students: [] })

const getStudents = () => {
	return axios.get('http://34.82.81.113:3000/students')
}
const getStudentsFromApi = () => {
	getStudents().then(value=>{
		getStudentsApi.students = value.data
	})
}

onMounted(() => getStudentsFromApi())

const search = ref("")

const onClick = function(id){
	axios.delete(`http://34.82.81.113:3000/students/${id}`)
    	.then(() => getStudentsFromApi())
}

const edit = function(item){
	editedStudent._id = item._id
	editedStudent.name = item.name
	editedStudent.group = item.group
	editedStudent.isDonePr = item.isDonePr
}

const student = reactive({
	name: '',
	group: 'RPZ 19 2/9',
	isDonePr: false
})

const editedStudent = reactive({
	_id: '',
	name: '',
	group: '',
	isDonePr: false
})


function addStudent() {
	axios.post("http://34.82.81.113:3000/students", {...student}).then(()=>getStudentsFromApi())
}

function editStudent(id) {
	if (editedStudent._id !== ''){
		axios.put(`http://34.82.81.113:3000/students/${id}`, {...editedStudent}).then(()=>getStudentsFromApi());
		editedStudent._id = '';
		editedStudent.name = '';
		editedStudent.group = '';
		editedStudent.isDonePr = false;
	}
}

</script>

<template>
    <div :class="$style.task">
    <input
      type="text"
      v-model="search"
	  />
    <div :class="$style.parent" v-for="student in getStudentsApi.students">
      <div :class="[$style.div1, search !== '' && `${student.name}`.indexOf(search) >= 0 && $style.divColor1]">{{ `${student.name}`}}</div>
      <div :class="$style.div2">{{ student.group }}</div>
      <div :class="$style.div3">
        <input
          type="checkbox"
          v-model="student.isDonePr"
        >
      </div>
      <div :class="$style.div4"><a :class="$style.delete" @click="onClick(student._id)">Видалити</a></div>
	  <div :class="$style.div5">
        <img :class="$style.edit" :src="`../assets/edit.png`" alt="edit" @click="edit(student)">
      </div>
    </div>
  </div>
  <form
		:class="$style.addStudent"
		@submit.prevent="addStudent"
	>
		<label :class="$style.addStudentLabel">
			ФІО
			<input
				type="text"
				v-model="student.name"
			/>
		</label>

		<label :class="$style.addStudentLabel">
			Група
			<input
				type="text"
				v-model="student.group"
			/>
		</label>

		<label :class="$style.addStudentLabel">
			Виконання роботи
			<input
				v-model="student.isDonePr"
				type="checkbox"
			/>
		</label>

		<button :class="$style.addStudentButton">Додати</button>
	</form>
	<hr>

<!--  -->
	<form
		:class="$style.addStudent"
		@submit.prevent="editStudent(editedStudent._id)"
	>
		<label :class="$style.addStudentLabel">
			ФІО
			<input
				type="text"
				v-model="editedStudent.name"
			/>
		</label>

		<label :class="$style.addStudentLabel">
			Група
			<input
				type="text"
				v-model="editedStudent.group"
			/>
		</label>

		<label :class="$style.addStudentLabel">
			Виконання роботи
			<input
				v-model="editedStudent.isDonePr"
				type="checkbox"
			/>
		</label>

		<button :class="$style.addStudentButton">Редагувати</button>
	</form>
	<hr>

<!--  -->
	<converter />

</template>

<style src="../assets/style.css" lang="css" module></style>
