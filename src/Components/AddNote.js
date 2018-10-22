import React, { Component } from 'react';
import ChooseTags  from "./ChooseTag";

class AddNote extends Component {


  render() {
    let buttonTagText;
    let buttonSubmitText;
    let editClass;

    if (this.props.noteStatus == "addNote"){
       buttonTagText = "add tags";
       buttonSubmitText = "ADD NOTE";


    } else {
      buttonTagText = "edit tags"
      buttonSubmitText = "CLOSE"
      editClass = "add-note_edit-mask"
    }



    return(
      <div className="add-note">
        <div className={editClass}></div>
        <form action="" className="add-note_form"  onSubmit={this.props.onSubmitForm} >
          <div className="add-note_form-group">
            <input type="text" className="add-note_input-title" placeholder = "Title"  value ={this.props.newTitle}  onChange={this.props.onChangeTitle}/>
            <textarea className="add-note_input-text" placeholder = "Take a note..." autoFocus={true} value ={this.props.newText}   onChange={this.props.onChangeText} autofocus/>
            <div className="add-note_tags-block">
              {this.props.newTags.length == 0 ? null : <b>Tags:</b>} {this.props.newTags.map(tag =>
              <span className="add-note_newtags-block">  {tag.tagName}  </span>)}
            </div>
            <div className="add-tag_btns">
               <button type="button" className="add-tag_btn" onClick = {this.props.tagAddClick}>{buttonTagText}</button>
               {this.props.noteStatus == "addNote" ? null : <button type="button" className="btn add-note_delete-btn" onClick = {this.props.deleteEditedNote}>Delete</button>}
               <button type="submit" className="btn add-note_btn">{buttonSubmitText}</button>
            </div>
              <div className = {this.props.showChooseTag}>
                <ChooseTags onChangeOneTag = {this.props.onChangeOneTag} newTag = {this.props.newTag} tags = {this.props.tags}
                                          onChangeTagCheckbox = {this.props.onChangeTagCheckbox}
                                          addNewTag =  {this.props.addNewTag}  tagsForChoose = {this.props.tagsForChoose}
                                          onClickHideChooseTag = {this.props.onClickHideChooseTag}
                                          />
              </div>

          </div>

        </form>
      <div className={editClass}></div>
      </div>

    )}
  }

  export default AddNote
