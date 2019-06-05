import { Vue, Component, Prop } from "vue-property-decorator";
import { IndexedSearchResult } from "@/search";

@Component({ components: {} })
export default class HighlightedSearchResult extends Vue {
  @Prop() data: IndexedSearchResult;

  render() {
    const type = this.$t(this.data.item.type);
    let title = {
      text: this.data.item.name,
      indexes: this.data.matches
        .filter(v => v.key === "name")
        .map(v => v.indices)
        .reduce((a, b) => a.concat(b), [])
    };
    let desc = this.data.item.desc && {
      text: this.data.item.desc,
      indexes: this.data.matches
        .filter(v => v.key === "desc")
        .map(v => v.indices)
        .reduce((a, b) => a.concat(b), [])
    };
    let alias: {
      text: string;
      indexes: [number, number][];
    };
    if (this.data.item.alias) {
      const match = this.data.matches.find(v => v.key === "alias");
      if (match) {
        alias = {
          text: match.value,
          indexes: match.indices
        };
      }
    }
    let tags =
      this.data.item.tags &&
      this.data.item.tags.map(tag => ({
        text: tag,
        indexes: this.data.matches
          .filter(v => v.key === "tags" && v.value === tag)
          .map(v => v.indices)
          .reduce((a, b) => a.concat(b), [])
      }));

    return (
      <div>
        <div class="name">
          <span class="search-tag type">{type}</span>
          <span class="search-title">
            {this.renderHighlightText(title.text, title.indexes)}
            {alias && <span class="alias"> ({this.renderHighlightText(alias.text, alias.indexes)})</span>}
          </span>
        </div>
        {desc && <span class="desc">{this.renderHighlightText(desc.text, desc.indexes)}</span>}
        {tags && (
          <div class="tags">
            {tags.map((tag, i) => (
              <span class="tag" key={i}>
                {this.renderHighlightText(tag.text, tag.indexes)}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  renderHighlightText(text: string, indexes: [number, number][]) {
    if (!indexes || !indexes.length) return text;
    let rst = [],
      lastIndex = 0;
    indexes.forEach(v => {
      if (v[0] > lastIndex) rst.push(text.substr(lastIndex, v[0] - lastIndex));
      rst.push(<span class="highlight">{text.substr(v[0], v[1] - v[0] + 1)}</span>);
      lastIndex = v[1] + 1;
    });
    if (text.length > lastIndex) rst.push(text.substr(lastIndex));
    return rst;
  }
}
