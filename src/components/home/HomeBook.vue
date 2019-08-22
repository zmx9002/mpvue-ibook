<template>
  <div class="home-book">
    <div class="home-book-header">{{title}}</div>
    <div class="home-book-content">
      <div class="home-book-row" v-for="(item,index) in bookData" :key="index">
        <div class="home-book-col" 
          v-for="(book,bookIndex) in item" 
          :key="bookIndex"
          :style="{flex:'0 0' + (100/col) + '%'}"
        >
          <!-- 分类 -->
          <div class="category-wrapper" v-if="mode === HOMEBOOK_MODE.CATEGORY">
            <div class="category-text">{{book.text}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <ImageView :src="book.cover"></ImageView>
              </div>
              <div class="category-img2">
                <ImageView :src="book.cover2"></ImageView>
              </div>
            </div>
          </div>

          <!-- 图书 -->
          <div class="book-wrapper"
            :style="{flexDirection:mode === HOMEBOOK_MODE.COL ? 'column' : 'row'}"
            @click="onBookClick"
            v-else
          >
            <ImageView :src="book.cover"/>
            <div class="book-title-wrapper book-title-col" v-if="mode === HOMEBOOK_MODE.COL">
              <div class="book-title">{{book.title}}</div>
            </div>
            <div class="book-title-wrapper book-title-row" v-else>
              <div class="book-title">{{book.title}}</div>
              <div class="book-title-author-wrapper">
                <div class="book-title book-author">{{book.author}}</div>
                <div class="book-title book-author">{{book.categoryText}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-book-footer" v-if="showBtn" @click="onMoreClick">
      <van-button round custom-class="home-book-btn">{{btnText}}</van-button>
    </div>
  </div>
</template>
<script>
import { HOMEBOOK_MODE, CATEGORY } from '../../utils/const'
import ImageView from '../base/ImageView'

export default {
  components:{ImageView},
  mounted(){

  },
  props:{
    title:String,
    data:{
      type:Array,
      default:[]
    },
    btnText:String,
    row:{
      type:Number,
      default:0
    },
    col:{
      type:Number,
      default:1
    },
    mode:{
      type:String,
      default: HOMEBOOK_MODE.COL
    },
    showTitle:{
      type:Boolean,
      default:true
    },
    showBtn:{
      type:Boolean,
      default:true
    },
    linearBg:{
      type:Boolean,
      default:false
    }
  },
  computed:{
    HOMEBOOK_MODE(){
      return HOMEBOOK_MODE
    },
    bookData(){
      const {data,row,col} = this
      if(data && data.length > 0){
        data.forEach(book => {
          book.text = CATEGORY[book.categoryText.toLowerCase()]
        });
        const number = row * col // 总共显示几本书
        const _bookData = data.slice(0, number) //截断超出部分
        const _bookDataRow = []
        let _row = 0;
        while(_row < row){
          _bookDataRow.push(_bookData.slice(_row * col, _row * col + col)) //截取每一行数据
          _row++
        }
        return _bookDataRow
      }else{
        return []
      }
    }
  },
  methods:{
    onMoreClick(){
      this.$emit('onMoreClick')
    },
    onBookClick(){
      this.$emit('onBookClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.home-book{
  .home-book-header{
    padding:13px 0 0 20.5px;
  }
  .home-book-content{
    padding:0 20px;
    margin-top:22.5px;
    .home-book-row{
      display:flex;
      flex-flow:row nowrap;
      margin-top:12px;
      .home-book-col{
        padding:0 8px;
        box-sizing: border-box;
        .book-wrapper{
          display: flex;
          .book-title-wrapper{
            &.book-title-col{
              .book-title{
                font-size: 12px;
                color:#212731;
                line-height: 16.5px;
                max-height: 33px;
                font-weight: 500;
                overflow: hidden;
                word-break: break-word;
              }
            }
            &.book-title-row{
              flex:0 0 50%;
              padding:10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .book-title{
                font-size: 14px;
                color:#1f1f1f;
                line-height: 18px;
                max-height: 36px;
                overflow: hidden;
                word-break: break-word;
              }
              .book-author{
                font-size: 12px;
                color:#868686;
                line-height: 14px;
                max-height: 14px;
              }
            }
          }
        }
        .category-wrapper{
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background:#f8f9fb;
          border-radius: 10px;
          height: 96px;
          padding:13px 0 14.5px 16px;
          box-sizing: border-box;
          .category-text{
            width: 150px;
            height: 22.5px;
            overflow: hidden;
            text-overflow: ellipsis;
            color:#212832;
            font-size: 16px;
            line-height: 22.5px;
          }
          .category-num{
            font-size: 12px;
            color:868686;
            line-height: 16.5px;
          }
          .category-img-wrapper{
            position: absolute;
            right:0;
            bottom:0;
            .category-img1{
              position: absolute;
              right:0;
              bottom:-5px;
              z-index:100;
              width: 48px;
              border-radius:0 0 10px 0;
            }
            .category-img2{
              position: absolute;
              right:30px;
              bottom:0;
              z-index:90;
              width: 36px;
            }
          }
        }
      }
    }
  }
  .home-book-footer{
    padding:12px 20px 20px;
  }
}

</style>
<style lang="scss">
.home-book-footer{
  .home-book-btn{
    width: 100%;
    font-size: 14px;
    color:#3696EF;
    border:1px solid #edeeee
  }
}
.category-img1{
  border-radius:0 0 10px 0;
}
</style>