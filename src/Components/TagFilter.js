import React, { Component } from 'react';

class TagFilter extends Component {
  compareTags = (a, b) => {
    if (a.tagName > b.tagName) return 1;
    if (a.tagName < b.tagName) return -1;
  }
  classForTag = (tag) => {
    console.log("activeTag ", this.props.activeTag, "tag.tagname ", tag.tagname)
    if (tag.tagName == this.props.activeTag) {
      return "tagsFilter_item tagsFilter_item--active"
    } else  {
      return "tagsFilter_item";
    }
  }
  classForTagAll = () => {
    if (this.props.activeTag == "all"){
      return "tagsFilter_item tagsFilter_item--all tagsFilter_item--active"
    } else  {
      return "tagsFilter_item tagsFilter_item--all";
    }
  }
  render(){
    console.log("classForTag ", this.classForTagAll())

    const tags = this.props.tags.sort(this.compareTags)
    return(
      <div className = "tagsFilter">
        <ul className = "tagsFilter_list">
        <li className = {this.classForTagAll()} id = "all" onClick = {this.props.onClickTagFilter} >
          All tags
        </li>
          {tags.map(tag =>
            <li className = {this.classForTag(tag)} key = {tag.tagName} id={tag.tagName} onClick = {this.props.onClickTagFilter}  >
            {tag.tagName}
            </li>

            )}
          <div className = "tagsFilter_btn">
            <button className = "add-btn tagsFilter_add-btn"  type="button" onClick = {this.props.showCreateTag}> +  Create new tag </button>
          </div>
        </ul>
      </div>
    )
  }
}

export default TagFilter
/*
<li className = "tagsFilter_item" key = {tag.tagName}>
  <input type = "checkbox" id={tag.tagName} onChange = {this.props.onClickTagFilter} className = "tagsFilter_checkbox "  checked = {tag.filter} />
  <label htmlFor = {tag.tagName} className = "tagsFilter_label">{tag.tagName}</label>
</li>
*/
