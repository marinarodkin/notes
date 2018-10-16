import React, { Component } from 'react';

class ChooseTags extends Component {
  render() {
    //console.log('rendering choosetag')
    //console.log('this.props.tagsForChoose', this.props.tagsForChoose)
    return(
      <div className="choose-tags">
        <h3 className="choose-tags_title">Note Tags:</h3>
        <input type="text" className="choose-tags_input-newtag" placeholder = "Type tag here:" value ={this.props.newTag}  onChange={this.props.onChangeOneTag}/>
        <div className="choose-tags_newtag-plus" onClick = {this.props.addNewTag}>+ Add {this.props.newTag}</div>
        <div className="choose-tags_checkboxes">
          {this.props.tags.map(tag =>
            <li className = "choose-tags_list" key = {"choose-tags"+tag.tagName}>
              <input type = "checkbox" id={tag.tagName} className = "choose-tags_checkbox " onChange = {this.props.onChangeTagCheckbox} checked = {tag.active} />
              <label htmlFor = {tag.tagName} className = "choose-tags_label">{tag.tagName}</label>
            </li>
            )}
        </div>
      </div>
)
}
}


export default ChooseTags
