import React, { Component } from 'react';
import ChooseTags  from "./ChooseTag";

class AddNote extends Component {

  render() {
    //console.log("rendering addnote");
    //console.log("title", this.props.newTitle)
    //console.log('this.props.newTag', this.props.newTag)
    return(
      <div className="add-note">
        <form action="" className="add-note_form"  onSubmit={this.props.onSubmitForm} >
          <div className="add-note_form-group">
            <input type="text" className="add-note_input-title" placeholder = "Title" value ={this.props.newTitle}  onChange={this.props.onChangeTitle}/>
            <textarea className="add-note_input-text" placeholder = "Take a note..." value ={this.props.newText}  onChange={this.props.onChangeText}/>
            <div className="add-note_tags-block">
              {this.props.newTags.length == 0 ? null : "Tags:"} {this.props.newTags.map(tag =>
              <span className="add-note_newtags-block">  {tag.tagName}  </span>)}
            </div>
             <button type="button" className="add-tag_btn" onClick = {this.props.tagAddClick}> + tags </button>
             <button type="submit" className="btn add-note_btn">add note</button>
              <div className = {this.props.showChooseTag}>
                <ChooseTags onChangeOneTag = {this.props.onChangeOneTag} newTag = {this.props.newTag} tags = {this.props.tags}
                                          onChangeTagCheckbox = {this.props.onChangeTagCheckbox}
                                          addNewTag =  {this.props.addNewTag}  tagsForChoose = {this.props.tagsForChoose}
                                          />
              </div>
          </div>
        </form>
      </div>

    )}
  }

  export default AddNote
