<template>
  <div>
    <SearchBar 
      :focus="searchFous"
      :hot-search="hotSearchKeyWord"
      @onChange="onChange"
      @onClear="onClear"
      @onConfirm="onConfirm"
      ref="searchBar"
    />
    <TagGroup 
      header-text="热门搜索"
      btn-text="换一批"
      :value="hotSearchArray"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
      v-if="hotSearchArray.length > 0 && !showList"
    />
    <TagGroup 
      header-text="历史搜索"
      btn-text="清空"
      :value="historySearch"
      @onBtnClick="clearHistorySearch"
      @onTagClick="searchKeyWord"
      v-if="historySearch.length > 0 && !showList"
    />
    <SearchList 
      :data="searchList"
      @onClick="onBookClick"
      v-if="showList"
    />
  </div>
</template>
<script>
import SearchBar from '../../components/home/SearchBar'
import TagGroup from '../../components/base/TagGroup'
import SearchList from '../../components/search/SearchList'
import { getStorageSync, setStorageSync,showToast } from '../../api/wechat';
import { search,hotSearch } from '../../api/index';

export default {
  components:{
    SearchBar,TagGroup,SearchList
  },
  computed:{
    showList(){
      const keys = Object.keys(this.searchList)
      return keys.length > 0
    },
    hotSearchArray(){
      const _hotSearch = []
      this.hotSearch.forEach(o => _hotSearch.push(o.title));
      return _hotSearch
    }
  },
  data(){
    return{
      hotSearch:[],
      hotSearchKeyWord:'',
      historySearch:[],
      searchList:{},
      searchFous:true,
      openId:'',
      page:1
    }
  },
  methods:{
    onChange(keyword){
      if(!keyword || keyword.trim().length === 0){
        this.searchList = []
        return
      }
      this.page = 1
      this.onSearch(keyword)
    },
    onConfirm(keyword){
      if(!keyword || keyword.trim().length === 0){
        keyword = this.hotSearchKeyWord
        this.$refs.searchBar.setValue(keyword)
      }else{

      }
      this.onSearch(keyword)
      if(!this.historySearch.includes(keyword)){
        this.historySearch.push(keyword)
        setStorageSync('historySearch',this.historySearch)
      }
      this.searchFocus = false
    },
    onClear(){
      this.searchList = []
    },
    onSearch(keyword){
      search({
        keyword,
        openId:this.openId,
        page:this.page
      }).then(res =>{
        this.searchList = res.data.data
      })
    },
    changeHotSearch(){
      hotSearch().then(res => {
        this.hotSearch = res.data.data
      })
    },
    showBookDetail(text,index){
      console.log('showBookDetail')
    },
    clearHistorySearch(){
      this.historySearch = []
      setStorageSync('historySearch',[])
    },
    searchKeyWord(text){
      this.$refs.searchBar.setValue(text)
      this.onSearch(text)
    }
  },
  mounted(){
    this.openId = getStorageSync('openId')
    console.log('openId is:' + this.openId)
    hotSearch().then(res => {
      this.hotSearch = res.data.data
    })
    this.hotSearchKeyWord = this.$route.query.hotSearch
    this.historySearch = getStorageSync('historySearch') || []
    console.log('historySearch is:' + this.historySearch)
    this.page = 1
  },
  onPageScroll(){
    if(this.searchFous){
      this.searchFous = false
    }
  },
  onReachBottom(){
    if(this.showList){
      this.page++
      const searchWord = this.$refs.searchBar.getValue()
      search({
        keyword:searchWord,
        openId:this.openId,
        page:this.page
      }).then(res =>{
        const {book} = res.data.data
        if(book && book.length > 0){
          this.searchList.book.push(...book)
        }else{
          showToast('没有更多数据了')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>