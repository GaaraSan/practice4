<script>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

export default {
	data() {
        return {
            convertFrom: "",
            convertTo: "",
            amount: "",
            rate: "",
        };
    },
	methods: {
        getCurrency() {
            axios.get("https://api.apilayer.com/exchangerates_data/convert?to=" + this.convertTo + "&from=" + this.convertFrom + "&amount=1",{
                    headers: {
                        apikey: "0sjTljESXiA3z56QG2VZ0P0Rjp7wGkfg",
                    },
                })
                .then((data) => {
                    console.log(data.data.info.rate);
                    this.rate = this.amount + " " + this.convertFrom + " equals " + (data.data.info.rate * this.amount).toFixed(3) + " " + this.convertTo;
                });
        }
    }
}

</script>

<template>
    <div class="exchange">
        <h2>Конвертер валют</h2>
        <div class="enterAmount">
          <label class="enterAmountLabel" for="amount">Введіть кількість валюти:</label>
          <input class="enterAmountInput" type="number" name="amount" v-model="amount" />
        </div>
        <div class="convert">
          <label class="enterAmountLabel">Конвертувати з:</label>
          <select class="selectConvert" name="from" v-model="convertFrom">
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <label class="enterAmountLabel">Конвертувати у:</label>
          <select class="selectConvert" name="to" v-model="convertTo">
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <button @click="getCurrency">Конвертувати</button>
        <h3>{{rate}}</h3>
    </div>
</template>

<style>
    button{
        padding: 5px 8px;
    }
    .enterAmountLabel, .enterAmountInput, .selectConvert{
        margin: 10px 10px;
    }
</style>
