<template>
    <div>
      <div>
        <input v-model="inputValue" />
        <button @click="handleSubmit">提交</button>
      </div>
      <ul>
        <li
            v-for="(item, index) in list"
            :key="index"
        >
            {{ item }}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            inputValue: '',
            list: [],
        }
    },
    methods: {
        handleSubmit: function() {
            // this.$data.list == this.list
            this.list.push(this.inputValue)
            this.inputValue = ''
        }
    },
}
</script>

<style>
</style>
