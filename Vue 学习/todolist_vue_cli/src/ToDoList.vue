<template>
    <div>
      <div>
        <input v-model="inputValue" />
        <button @click="handleSubmit">提交</button>
      </div>
      <ul>
          <todo-item
            v-for="(item, index) in list"
            :key="index"
            :content="item"
            :index="index"
            @delete="handleDelete"
          >
          </todo-item>
      </ul>
  </div>
</template>

<script>
import ToDoItem from './components/ToDoItem'

export default {
    components: {
        'todo-item': ToDoItem,
    },
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
        },
        handleDelete: function(index) {
            this.list.splice(index, 1)
        },
    },
}
</script>

<style>
</style>
