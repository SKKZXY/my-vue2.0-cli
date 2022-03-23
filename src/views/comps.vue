<template>
  <div>
    <div v-for="(item,index) in comps" :key="index">
      <component :is="item.name" v-bind="{...item.props}"></component>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
     comps:[
       {name:'w-input',label:'输入框',props:{title:'输入框'}},
       {name:'w-select',label:'选择框'}
     ]
    }
  }
}
</script>

<style>

</style>