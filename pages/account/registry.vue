<template>
  <div>
    <h1> Registry 註冊</h1 >  
    <label> 信箱 email </label><input type="text" id="email"/> <br/>
    <label> 帳號 username </label><input type="text" id="username"/> <br/>
    <label> 密碼 password </label><input type="password" id="pwd"/> <br/>
    <label> 確認密碼 check password </label><input type="password" id="checkpwd"> <br/>
    <label> 姓名 name </label><input type="text" id="name"/> <br/>
    <label> 學院 college </label> <select id="college" v-model="selected"> 
      <option v-bind:value="'AN'"> 不分系 </option>
      <option v-bind:value="'LA'"> 文學院 </option>
      <option v-bind:value="'SC'"> 理學院 </option>
      <option v-bind:value="'MA'"> 管理學院 </option>
      <option v-bind:value="'EN'"> 工學院 </option>
      <option v-bind:value="'EE'"> 電機資訊學院 </option>
      <option v-bind:value="'SO'"> 社會科學院 </option>
      <option v-bind:value="'PD'"> 規劃與設計學院 </option>
      <option v-bind:value="'LS'"> 生命科學學院 </option>
      <option v-bind:value="'ME'"> 醫學院 </option>
    </select> <br/>
    <section v-if="this.selected !== 'AN'"> 
      <label> 學系 department </label> 
      <select id="department" v-if="this.selected === 'LA'">
        <option v-bind:value="'B1'"> 中國文學系 B1 </option>
        <option v-bind:value="'B2'"> 外國語文學系 B2 </option>
        <option v-bind:value="'B3'"> 歷史學系 B3 </option>
        <option v-bind:value="'B5'"> 台灣文學系 B5 </option>
      </select> 
      <select id="department" v-if="this.selected === 'SC'">
        <option v-bind:value="'C1'"> 數學系 C1 </option>
        <option v-bind:value="'C2'"> 物理學系 C2 </option>
        <option v-bind:value="'C3'"> 化學系 C3 </option>
        <option v-bind:value="'C4'"> 地球科學系 C4 </option>
        <option v-bind:value="'F8'"> 光電科學與工程學系 F8 </option>
      </select> 
      <select id="department" v-if="this.selected === 'MA'">
        <option v-bind:value="'H1'"> 會計學系 H1 </option>
        <option v-bind:value="'H2'"> 統計學系 H2 </option>
        <option v-bind:value="'H3'"> 工業資訊管理學系 H3 </option>
        <option v-bind:value="'H4'"> 企業管理學系 H4 </option>
        <option v-bind:value="'H5'"> 交通管理科學系 H5 </option>
      </select> 
      <select id="department" v-if="this.selected === 'EN'">
        <option v-bind:value="'E1'"> 機械工程學系 E1 </option>
        <option v-bind:value="'E3'"> 化學工程學系 E3 </option>
        <option v-bind:value="'E4'"> 資源工程學系 E4 </option>
        <option v-bind:value="'E5'"> 材料科學與工程學系 E5 </option>
        <option v-bind:value="'E6'"> 土木工程學系 E6 </option>
        <option v-bind:value="'E8'"> 水利及海洋工程學系 E8 </option>
        <option v-bind:value="'E9'"> 工程科學系 E9 </option>
        <option v-bind:value="'F0'"> 能源國際學士學位學程 F0 </option>
        <option v-bind:value="'F1'"> 系統及船舶機電工程學系 F1 </option>
        <option v-bind:value="'F4'"> 航空太空工程學系 F4 </option>
        <option v-bind:value="'F5'"> 環境工程學系 F5 </option>
        <option v-bind:value="'F6'"> 測量及空間資訊學系 F6 </option>
        <option v-bind:value="'F9'"> 生物醫學工程學系 F9 </option>
      </select> 
      <select id="department" v-if="this.selected === 'EE'">
        <option v-bind:value="'E2'"> 電機工程學系 E2 </option>
        <option v-bind:value="'F7'"> 資訊工程學系 F7 </option>
      </select> 
      <select id="department" v-if="this.selected === 'SO'">
        <option v-bind:value="'D2'"> 法律學系 D2 </option>
        <option v-bind:value="'D4'"> 政治學系 D4 </option>
        <option v-bind:value="'D5'"> 經濟學系 D5 </option>
        <option v-bind:value="'D8'"> 心理學系 D8 </option>
      </select> 
      <select id="department" v-if="this.selected === 'PD'">
        <option v-bind:value="'E7'"> 建築學系 E7 </option>
        <option v-bind:value="'F2'"> 都市計劃學系 F2 </option>
        <option v-bind:value="'F3'"> 工業設計學系 F3 </option>
      </select> 
      <select id="department" v-if="this.selected === 'LS'">
        <option v-bind:value="'C5'"> 生命科學系 C5 </option>
        <option v-bind:value="'C6'"> 生物科技與產業科學系 C6 </option>
      </select> 
      <select id="department" v-if="this.selected === 'ME'">
        <option v-bind:value="'I2'"> 護理學系 I2 </option>
        <option v-bind:value="'I3'"> 醫學檢驗生物技術學系 I3 </option>
        <option v-bind:value="'I5'"> 醫學系 I5 </option>
        <option v-bind:value="'I6'"> 物理治療學系 I6 </option>
        <option v-bind:value="'I7'"> 職能治療學系 I7 </option>
        <option v-bind:value="'I8'"> 藥學系 I8 </option>
      </select> 
    </section>
    <label> 年級 grade </label> <select id="grade"> 
      <option v-bind:value="'1'"> 一年級 Freshman </option>
      <option v-bind:value="'2'"> 二年級 Sophomore </option>
      <option v-bind:value="'3'"> 三年級 Junior </option>
      <option v-bind:value="'4'"> 四年級 Senior </option>
    </select>
    <br/>
    <button type="button" v-on:click="registry"> 註冊 Registry </button>
    <button type="button"> 取消 Cancel </button>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import qs from 'qs'

  export default {
    data () {
      return {
        selected: 'AN'
      }
    },
    methods: {
      registry: function () {
        const pwd = document.getElementById('pwd').value
        const checkpwd = document.getElementById('checkpwd').value
        if (pwd === checkpwd) {
          console.log('equal!!')
          // check password value validation.
          if (!this.valValidation(pwd)) {
            console.log('value format error')
            // TODO: error action.
            return
          }
          // check password length validation
          if (!this.lengthValidation(pwd)) {
            console.log('length error')
            // TODO: error action.
            return
          }
          const params = {
            username: document.getElementById('username').value,
            password: pwd,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            college: document.getElementById('college').value,
            department: document.getElementById('department').value,
            grade: document.getElementById('grade').value
          }
          axios.post('/api/registry', qs.stringify(params)
          ).then((val) => {
            console.log(val)
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      valValidation: function (str) {
        const regExp = /^[\d|a-zA-Z]+$/
        return regExp.test(str)
      },
      lengthValidation: function (str) {
        return str.length >= 8 && str.length <= 20
      }
    }
  }
</script>

<style>

</style>

