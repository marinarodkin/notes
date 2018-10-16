import React, { Component } from 'react';

class TagFilter extends Component {
  render(){
    return(
      <div className = "tagsFilter">
        <ul className = "tagsFilter_list">
          {this.props.tags.map(tag =>
            <li className = "tagsFilter" key = {tag.tagName}>
              <input type = "checkbox" id={tag.tagName} className = "tagsFilter_checkbox " onChange = {this.props.onChange} checked = {tag.filter} />
              <label htmlFor = {tag.tagName} className = "tagsFilter_label">{tag.tagName}</label>
            </li>
            )}
        </ul>
      </div>
    )
  }
}

export default TagFilter
