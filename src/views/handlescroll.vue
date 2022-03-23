<template>
  <div class="handlescroll">
    <div class="head"></div>
    <!-- tab必须嵌套一个外层div添加ref，给内层的tab本身添加固定定位    不嵌套的话会造成向上滚动时tab已固定（距离页面顶部为0），取不到tab元素距离页面顶部的距离 -->
    <!-- 且外层div需添加样式，让高度与内层tab高度相同，固定定位时不会失去高度    -->
    <div class="addpadding" ref="fixedTab">
      <div class="tab" :class="{tabfixed:isFixed}">
        <div v-for="(item,index) in tabList" :key="index" class="tab-item" :class="{active:item.code==activeTab}" @click="changeTab(item.code)">{{item.name}}</div>
      </div>
    </div>
    <div ref="one" class="module one">
      模块一内容
    </div>
    <div ref="two" class="module two">
      模块二内容
    </div>
    <div ref="three" class="module three">
      模块三内容
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name:'handlescroll',
  data(){
    return{
      isFixed:false,
      tabList:[
        {
          name:'模块一',
          code:'one'
        },
        {
          name:'模块二',
          code:'two'
        },
        {
          name:'模块三',
          code:'three'
        },
      ],
      activeTab:'one'
    }
  },
  mounted(){
    console.log('handlescroll')
    document.removeEventListener('scroll', this.handleE, false)
    document.addEventListener('scroll', this.handleE, false)
  },
  destroyed(){
    document.removeEventListener('scroll', this.handleE, false)
  },
  methods:{
    handleE(e){
    let  h = e.target.scrollingElement.scrollTop
    this.handleScroll(h)
    },
    handleScroll(scrollTop){
      const tab = this.$refs.fixedTab
      const srcollH = scrollTop // 页面滚动的高度
      const tabH = tab.offsetHeight // tab自身高度
      const tabOffsetTop = tab.offsetTop  //tab距离html页面顶部的高度
      srcollH > tabOffsetTop ? (this.isFixed = true) : (this.isFixed = false)
      if (srcollH === 0 && tabOffsetTop == 0) {
        return
      }
      console.log('页面滚动高度',srcollH)
      this.tabList.forEach(item => {
        const el = this.$refs[item.code]
        const offsetTop = el.offsetTop
        if (srcollH >= offsetTop - tabH) {
          this.activeTab = item.code
        }
      })
    },
    changeTab (value) {
      const dom = this.$refs[value]
      dom.scrollIntoView()
      this.activeTab = value
      //let timer = null
      //clearTimeout(timer)
      //timer = setTimeout(() => {
        const scrollBox = document.scrollingElement
        const tab = this.$refs.fixedTab
        console.log("skk",tab.offsetHeight)
        scrollBox.scrollTop = scrollBox.scrollTop - tab.offsetHeight
      //}, 10)
    },
  }
}
</script>

<style lang="scss">
  .handlescroll {
    height: 100%;
    background: rgb(240,240,240);
    .head {
      height: 600px;
      background: rgb(243, 228, 228);
    }
    .addpadding{
      height: 38px;
    }
    .tab {
      height: 38px;
      padding: 10px;
      background: orange;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tab-item {
        background: rgba(111, 111, 251,0.3);
      }
      .active{
        border-bottom:solid 1px red;
        color: yellowgreen;
      }
    }
    .tabfixed{
      position: fixed;
      width: 100%;
      top: 0;
    }
    .module {
      height: 600px;
    }
    .one {
    }
    .two {
    }
    .footer{
      height: 600px;
    }
  }
</style>