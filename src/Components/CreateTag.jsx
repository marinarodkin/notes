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
      <ul className="create-tag_list">
        {this.props.tags.map(tag =>
          <li className = "create-tag_list-item" key = {"create-tag"+tag.tagName}>
          <input type="text" className="create-tag_input-newtag" placeholder = "Type tag here:" value ={this.props.newTag}  onChange={this.props.onChangeOneTag}/>
          </li>
          )}
      </ul>
      <div className="create-tag_footer">
        <button className="create-tag_btn text_btn" onClick = {this.props.showCreateTag}>done</button>
      </div>
      </div>
    )
    }
  }

export default CreateTag;


/*
<input type = "text" id={"create-"+tag.tagName} className = "create-tag_input " placeholder = {tag.tagName} value={this.props.newTag} onChange={this.props.onChangeOneTag}/>


*/
