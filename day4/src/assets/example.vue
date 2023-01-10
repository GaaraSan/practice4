<script>
export default {
	data() {
		return {
			num1: 100,
			num2: 200,
			total: '',
			styleobj: {
				width: '100px',
				height: '100px',
				backgroundColor: 'red'
			}
		}
	},
	methods: {
		changeBgColor: function () {
			this.styleobj.backgroundColor = 'green'
		},
		originalColor: function () {
			this.styleobj.backgroundColor = 'red'
		}
	}
}
</script>

<template>
	<h2><b>2 Створити блок червоного кольору, при наведенні курсору миші змінюємо колір блока на зелений, при отведенні курсора миші - знову червоний</b></h2>

	<div class="container">
		<div
			v-bind:style="styleobj"
			v-on:mouseover="changeBgColor"
			v-on:mouseout="originalColor"
		></div>
	</div>
</template>

<style lang="css" scoped>
.title {
	font-size: 25px;
	margin-bottom: 15px;
}

.container {
	margin-bottom: 50px;
}
</style>
