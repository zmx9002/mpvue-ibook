<template>
<div>
  <div class="home" v-if="isAuth">
    <SearchBar
      disabled
      :hotSearch="hotSearch"
      @onClick="onSearchBarClick"
    />
    <HomeCard 
    :data="homeCard"
    />
    <HomeBanner 
      img="http://www.youbaobao.xyz/book/res/bg.jpg" 
      title="mpvue2.0实战多端小程序课程上线啦" 
      subTitle="立即体验" 
      @onClick="onBannerClick"
    />
    <div :style="{marginTop:'23px'}">
      <HomeBook 
        title="为你推荐"
        :row="1"
        :col="3"
        mode="col"
        :data="recommend"
        btnText="换一批"
        @onMoreClick="recommendChange('recommend')"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div :style="{marginTop:'23px'}">
      <HomeBook 
        title="免费阅读"
        :row="2"
        :col="2"
        mode="row"
        :data="freeRead"
        btnText="换一批"
        @onMoreClick="recommendChange('freeRead')"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div :style="{marginTop:'23px'}">
      <HomeBook 
        title="当前最热"
        :row="1"
        :col="4"
        mode="col"
        :data="hotBook"
        btnText="换一批"
        @onMoreClick="recommendChange('hotBook')"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div :style="{marginTop:'23px'}">
      <HomeBook 
        title="分类"
        :row="2"
        :col="2"
        mode="category"
        :data="category"
        btnText="查看全部"
        @onMoreClick="onCategoryMoreClick"
        @onBookClick="onHomeBookClick"
      />
    </div>
  </div>
  <Auth v-if="!isAuth" @getUserInfo="init"/>
</div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import HomeCard from '../../components/home/HomeCard'
  import HomeBanner from '../../components/home/HomeBanner'
  import HomeBook from '../../components/home/HomeBook'
  import Auth from '../../components/Auth'
  import {getHomeData, recommend,freeRead,hotBook, register} from '../../api/index'
  import {getSetting,getUserInfo,setStorageSync,getStorageSync,getUserOpenId,showLoading,hideLoading} from '../../api/wechat'

  export default {
    components: {
      SearchBar,HomeCard,HomeBanner,HomeBook,Auth
    },
    data(){
      return{
        hotSearch:'',
        homeCard:{},
        banner:{},
        recommend:[],
        hotBook:[],
        freeRead:[],
        category:[],
        isAuth:false
      }
    },
    methods: {
      getHomeData(openId,userInfo){
        getHomeData({openId}).then(res=>{
          const {
            hotSearch:{keyword},
            shelf,banner,recommend,hotBook,freeRead,category,shelfCount
          } = res.data.data
          this.hotSearch = keyword
          this.banner = banner
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          
          this.homeCard = {
            bookList:shelf,
            num:shelfCount,
            userInfo
          }
          hideLoading()
        }).catch(err=>{
          hideLoading()
        })
      },
      recommendChange(key){
        switch(key){
          case 'recommend':
            recommend().then(res =>{
              this.recommend = res.data.data
            })
            break
          case 'freeRead':
            freeRead().then(res =>{
              this.freeRead = res.data.data
            })
            break
          case 'hotBook':
            hotBook().then(res =>{
              this.hotBook = res.data.data
            })
            break   
        }
      },
      getSetting(){
        getSetting('userInfo',(res)=>{
          this.isAuth = true
          showLoading('正在加载中')
          this.getUserInfo()
        },(err)=>{
          this.isAuth = false
        })
      },
      getUserInfo(){
        const onOpenIdComplete = (openId,userInfo) => {
          this.getHomeData(openId,userInfo)
          register(openId,userInfo)
        }
        getUserInfo((userInfo)=>{
          setStorageSync('userInfo',userInfo)
          const openId = getStorageSync('openId')
          if(!openId || openId.length === 0){
            getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
          }else{
            onOpenIdComplete(openId,userInfo)
          }
        },()=>{
          console.log('faild....')
        })
      },
      init(){
        this.getSetting()
      },
      onSearchBarClick(){
        this.$router.push({
          path:'/pages/search/main',
          query:{
            hotSearch:this.hotSearch
          }
        })
      }
    },
    mounted(){
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
.book-home{
  margin-top:23px;
}
</style>
