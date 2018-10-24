import React, { Component } from 'react';

class ChooseTags extends Component {
  compareTags = (a, b) => {
    if (a.tagName > b.tagName) return 1;
    if (a.tagName < b.tagName) return -1;
  }
  render() {
    const tags = this.props.tags.sort(this.compareTags)
    //console.log('rendering choosetag')
    //console.log('this.props.tagsForChoose', this.props.tagsForChoose)

    return(
      <div className="choose-tags">
        <h3 className="choose-tags_title">Note Tags:</h3>
        <input type="text" className="choose-tags_input-newtag" placeholder = "Type tag here:" value ={this.props.newTag}  onChange={this.props.onChangeOneTag}/>
        {this.props.newTag === "" ? null : <div className="choose-tags_newtag-plus" onClick = {this.props.addNewTag}><span className = "choose-tags_add-text">+ Add:  </span> {this.props.newTag}</div>}
        {this.props.newTag !== "" ? null :
        <ul className="choose-tags_checkboxes-list">
          {tags.map(tag =>
            <li className = "choose-tags_list-item" key = {"choose-tags"+tag.tagName}>
              <input type = "checkbox" id={"ct-"+tag.tagName} className = "choose-tags_checkbox " onChange = {this.props.onChangeTagCheckbox} checked = {tag.active} />
              <label htmlFor = {"ct-"+tag.tagName} className = "choose-tags_label">{tag.tagName}</label>
            </li>
            )}
        </ul>
        }
        <button className ="choose-tags_add-btn, add-btn"  onClick = {this.props.onClickHideChooseTag}>hide</button>
      </div>
)
}
}


export default ChooseTags
