import React, { Component } from 'react';

class CreateTag extends Component {
  render() {

    return(
      <div className="create-tag">
        <h3 className="create-tag_title">Edit Tags:</h3>
        <div className="create-tag_input-new">
          <input type="text" className="create-tag_input-newtag" placeholder = "Type tag here:" value ={this.props.newTag}  onChange={this.props.onChangeOneTag}/>
          <span className = "create-tag_add-text" onClick = {this.props.addNewTag}> Add  </span>
        </div>
         <form onSubmit={this.props.onSumbmitCreateTag} className="create-tag_form-">
      <ul className="create-tag_list">
        {this.props.tags.map(tag =>
          <li className = "create-tag_list-item" key = {"create-tag"+tag.tagName}>
            <input type = "text" id={"create-"+tag.tagName} className = "create-tag_input " placeholder = {tag.tagName} value={this.newTag}  onFocus = {this.props.OnFocusTag}  onChange={this.props.editTag}/>
            <button className = "add-btn create-tag_btn" type = "submit" onSubmit = {this.props.onSumbmitCreateTag}>Add</button>
          </li>
          )}
      </ul>
    </form>
      <div className="create-tag_footer">
        <button className="create-tag_btn text_btn" onClick = {this.props.showCreateTag}>done</button>
      </div>
      </div>
    )
    }
  }

export default CreateTag;
