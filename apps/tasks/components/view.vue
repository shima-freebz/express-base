<template>
<div v-if="entity.id" class="view"> 
  <h2>View</h2>
  <h3>Id</h3>
  <div>{{entity.id}}</div>
  <h3>Title</h3>
  <div>{{entity.title}}</div>
  <h3>Priod</h3>
  <div>{{entity.priod}}</div>
  <h3>Created at</h3>
  <div>{{entity.created_at}}</div>
  <h3>Updated at</h3>
  <div>{{entity.updated_at}}</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {mapGetters,mapState} from 'vuex'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'asyncData',
  'fetch',
  'middleware',
  'layout',
  'transition',
  'scrollToTop'
])

@Component({
  name : "view",
  computed : {
    ...mapGetters([
      'domain' , 'token'
    ]),
    ...mapState("tasks" , {
      entity : ({entity}) =>  entity
    }),

  },
})

export default class view extends Vue {

  
  asyncData ({ store, route }) {
    return store.dispatch('tasks/fetchEntity' ,route)
  }


}
</script>
