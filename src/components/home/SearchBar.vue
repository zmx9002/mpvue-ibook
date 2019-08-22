<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click="onSearchBarClick">
      <div class="search">
        <van-icon
          name="search"
          color="#858C96"
          size="16px"
        />
      </div>
      <input
        class="search-bar-input"
        :placeholder="hotSearch"
        placeholder-style="color: #ADB4BE; font-size:15px"
        :disabled="disabled"
        :focus="focus"
        confirm-type="search"
        v-model="searchWord"
        @input="onChange"
        @confirm="onConfirm"
      >
      <div class="clear" v-if="searchWord.length > 0" @click="onClearClick">
        <van-icon
          name="clear"
          color="#ccc"
          size="16px"
        ></van-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      focus: {
        type: Boolean,
        default: true
      },
      limit: {
        type: Number,
        default: 50
      },
      hotSearch: {
        type: String,
        default: '搜索'
      }
    },
    data() {
      return {
        searchWord: ''
      }
    },
    methods: {
      onSearchBarClick() {
        this.$emit('onClick')
      },
      onClearClick() {
        this.searchWord = ''
        this.$emit('onClear')
      },
      onChange(v) {
        let value = v.mp.detail.value
        if (value.length > this.limit) {
          value = value.slice(0, this.limit)
          this.searchWord = this.searchWord.slice(0, this.limit)
        }
        this.$emit('onChange', value)
      },
      onConfirm(v) {
        this.$emit('onConfirm', v.mp.detail.value)
      },
      setValue(v) {
        this.searchWord = v
      },
      getValue() {
        return this.searchWord
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-bar {
    padding: 10px 15px;
    height: 40px;

    .search-bar-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      background: #F5F7F9;
      border-radius: 20px;
      padding: 2px 15px;
      box-sizing: border-box;

      .search {
        display: flex;
        align-items: center;
        height: 100%;
      }

      .search-bar-input {
        flex: 1;
        height: 100%;
        color: #333;
        font-size: 14px;
        margin-left: 5px;
        background: transparent;
      }

      .clear {
        display: flex;
        align-items: center;
        height: 100%;

        &:active {
          opacity: .7;
        }
      }
    }
  }
</style>
