<template>
  <div class="search">
    <el-autocomplete
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
        <div class="name">
          <span class="search-tag type">
            {{ $t(item.type) }}
          </span>
          {{ item.name }}
        </div>
        <span class="desc" v-if="item.desc">{{ item.desc }}</span>
        <div class="tags" v-if="item.tags">
          <span class="tag" v-for="(tag, i) in item.tags" :key="i">{{ tag }}</span>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";

import { SearchEngine } from "@/search";
import { version } from "@/version";

@Component({ components: {} })
export default class Search extends Vue {
  data = "";
  engine = new SearchEngine();
  querySearch(query: string, cb: (rs: any) => void) {
    const results = this.engine.search(query);
    // 调用 callback 返回建议列表的数据
    cb(results);
  }
  handleSelect() {}
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
    }
    .desc {
      font-size: 0.7em;
      color: #b4b4b4;
    }

    .highlighted .desc {
      color: #ddd;
    }
  }
  .search-tag {
    font-size: 0.6em;
    vertical-align: text-bottom;
    display: inline-block;
    margin: 0 0;
    padding: 2px 8px;
    border: 1px solid #e3e4ea;
    border-radius: 2px;
    box-shadow: 1px 1px 2px @shadow;
  }
  .el-autocomplete-suggestion__wrap {
    padding: 8px 0;
  }
  .tags {
    .tag {
      font-size: 0.7em;
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
  }
}
</style>
