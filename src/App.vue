<template>
  <div id="app">
    <header-area 
      title="개역 개정 성경"
      :page="page"
      :is-menu-open="isMenuOpen"
      @toggleMenu="toggleMenu"
    />
    <menu-area
      :menus="bookMap"
      :is-menu-open="isMenuOpen"
    >
      <template #menu="{ menuId, category, items }">
        <drop-down
          :item-id="menuId"
          :category="category"
          :items="items"
          :is-open="category === categoryOpen"
          :current-category="currentBook"
          :current-item="currentChapter"
          @toggleCategory="toggleCategory"
          @goTo="goTo"
        />
      </template>
    </menu-area>
    <router-view
      :class="{'menu-open': isMenuOpen }"
    />
  </div>
</template>

<script>
import bible from 'src/assets/ko_rev.json'
import Header from 'src/components/Header'
import Menu from 'src/components/Menu'
import DropDown from 'src/components/DropDown'

import { ROUTE_NAMES } from 'src/constants'

export default {
  name: 'Root',
  components: {
    'header-area': Header,
    'menu-area': Menu,
    'drop-down': DropDown
  },
  data () {
    return {
      categoryOpen: null,
      currentBook: null,
      currentChapter: null,
      isMenuOpen: false,
      bookMap: {}
    }
  },
  computed: {
    page () {
      return (
        this.currentBook && this.currentChapter
          ? `${this.currentBook} ${this.currentChapter}장`
          : null
      )   
    }
  },
  created () {
    bible.forEach((book) => {
      this.bookMap[book.abbrev] = {
        category: book.name,
        chpaters: book.chapters,
        items: book.chapters.length
      }
    })
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
      console.log('toggleMenu( isMenuOpen: ', this.isMenuOpen, ' )')
    },
    toggleCategory (category) {
      this.categoryOpen = (this.categoryOpen === category) ? null : category
      console.log('toggleCategory( open: ', this.categoryOpen, ' )')
    },
    setCurrent (book, chapter) {
      this.currentBook = book
      this.currentChapter = chapter
      this.isMenuOpen = false
    },
    goTo (book, chapter) {
      let bible = this.bookMap[book].chpaters[chapter - 1]
      this.setCurrent(this.bookMap[book].category, chapter)
      this.$router.replace({
        name: ROUTE_NAMES.PAGE,
        params: { bible },
        query: { book, chapter }
      })
      console.log('goTo( book: ', book, ', chapter: ', chapter, ' )')
    }
  }

}
</script>

<style lang="scss">
@import "./styles/main";
</style>