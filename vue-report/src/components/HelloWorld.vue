<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>本周工作小结</h2>
    <form novalidate>

            <table class="report-table">
                    <tr>
                    <th>内容</th>  <th>计划日期</th>  <th>百分比</th>  <th>完成日期</th> <th>备注</th> <th>操作</th> 
                    </tr>
                    <tr>
                    <td> <input type="text" name="" id="" value="" /> </td>  
                    <td><input type="text" name="" id="" value="" /> </td>  
                    <td><input type="text" name="" id="" value="" /> </td> 
                        <td><input type="text" name="" id="" value="" /> </td>
                        <td><input type="text" name="" id="" value="" /> </td>
                        <td><input type="text" name="" id="" value="" /> </td> 
                    </tr>
            </table>

      <input v-model="message" placeholder="edit me">
      <p>Message is: {{ message }}</p>
            
    </form>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.report-table {
width:1000px;
margin:0 auto;
}
</style>
