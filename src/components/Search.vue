<template>
  <div class="search">
    <el-autocomplete
      class="search-input"
      popper-class="search-complete"
      v-model="data"
      :fetch-suggestions="querySearch"
      :placeholder="'Riven.IM '+version"
      @select="handleSelect">
      <i
        class="el-icon-search el-input__icon"
        slot="suffix"
        @click="handleIconClick">
      </i>
      <template slot-scope="{ item }">
        <HighlightedSearchResult :data="item"/>
      </template>
    </el-autocomplete>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";

import { SearchEngine, SearchResult, IndexedSearchResult } from "@/search";
import { version } from "@/version";
import { WeaponDatabase } from "@/warframe/codex";
import HighlightedSearchResult from "./HighlightedSearchResult";

@Component({ components: { HighlightedSearchResult } })
export default class Search extends Vue {
  data = "";
  engine = new SearchEngine();
  querySearch(query: string, cb: (rs: any) => void) {
    const results = this.engine.search(query);
    // 调用 callback 返回建议列表的数据
    cb(results);
  }
  handleSelect(item: SearchResult) {
    if (!item) {
      console.error("handle null when serach");
      return;
    }
    console.log(item);
    switch (item.type) {
      case "search.weapon":
        const weapon = WeaponDatabase.getWeaponByName(item.id);
        this.$router.push("/info/" + weapon.url);
        break;
    }
  }
  handleIconClick() {}

  get version() {
    return version;
  }
}
</script>

<style lang="less">
@import "../less/common.less";
.search-complete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      padding: 2px 0;
      text-overflow: ellipsis;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    .desc {
      font-size: 0.7em;
      color: #b4b4b4;
    }

    .highlighted .desc {
      color: #ddd;
    }
  }
  span.highlight {
    background: #ecebff;
  }
  .search-tag {
    font-size: 0.9em;
    vertical-align: text-bottom;
    display: inline-block;
    margin: 0 0;
    padding: 2px 8px;
    border: 1px solid #e3e4ea;
    border-radius: 2px;
    box-shadow: 1px 1px 2px @shadow;
  }
  .search-title {
    margin-left: 4px;
  }
  .el-autocomplete-suggestion__wrap {
    padding: 8px 0;
  }
  .tags {
    .tag {
      color: @text_halfgrey;
      font-size: 0.86em;
      border-bottom: 1px solid @text_sliver;
    }
    .tag + .tag {
      margin-left: 8px;
    }
  }
}
.search {
  .el-input__inner {
    border: 0;
    border-radius: 2px;
    width: 240px;
  }
}
</style>
