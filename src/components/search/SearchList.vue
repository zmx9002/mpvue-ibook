<template>
  <div class="search-list">
    <SearchItem
      icon="apps-o"
      :title="category"
      sub-title="Category"
      @onClick="showList(category,'category')"
      v-if="category"
    />
    <SearchItem
      icon="user-o"
      :title="author"
      sub-title="Author"
      @onClick="showList(author,'author')"
      v-if="author"
    />
    <SearchItem
      icon="newspaper-o"
      :title="publisher"
      sub-title="Publisher"
      @onClick="showList(publisher,'publisher')"
      v-if="publisher"
    />
    
    <SearchTable 
      :data="data.book"
      @onClick="onBookClick"
    />
  </div>
</template>

<script>
  import SearchItem from '../search/SearchItem'
  import SearchTable from '../search/SearchTable'

  export default {
    components: {
      SearchItem,
      SearchTable
    },
    props: {
      data: Object
    },
    computed:{
      category(){
        if(this.data && this.data.category && this.data.category.length > 0){
          return this.data.category[0].categoryText
        }else{
          return null
        }
      },
      author(){
        if(this.data && this.data.author && this.data.author.length > 0){
          return this.data.author[0].author
        }else{
          return null
        }
      },
      publisher(){
        if(this.data && this.data.publisher && this.data.publisher.length > 0){
          return this.data.publisher[0].publisher
        }else{
          return null
        }
      }
    },
    methods: {
      showList(text,key){
        console.log(text,key)
      },
      onBookClick(){
        console.log()
      }
    }
  }
</script>

<style lang="scss">
  .search-list {
    padding: 15px 0;
  }
</style>
