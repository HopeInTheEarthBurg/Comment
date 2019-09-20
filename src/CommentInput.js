import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import wrapWithLoadData from './wrapWithLoadData'

class CommentInput extends Component {

  static propTypes={
    onSubmit: PropTypes.func,
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
  }

  state = {
    username: this.props.data || '',
    content: ''
  }

  UNSAFE_componentWillMount () {
    // this._loadUsername()
  }

  componentDidMount () {
    this.textarea.focus()
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleContentChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  handleUsernameBlur = (e) => {
    // this._saveUsername(e.target.value)
    this.props.saveData(e.target.value)
  }

  // _loadUsername () {
  //   const username = localStorage.getItem('username')
  //   if (username) {
  //     this.setState({username})
  //   }
  // }

  // _saveUsername (username) {
  //   localStorage.setItem('username',username)
  // }

  handleSubmit = () => {
    if(this.props.onSubmit){
      const { username,content } = this.state
      this.props.onSubmit({username,content,createdTime: +new Date()})
    }
    this.setState({content: ''})
  }

  render () {
    const { username,content } = this.state
    return(
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              type="text"
              value={username}
              onBlur={this.handleUsernameBlur}
              onChange={this.handleUsernameChange}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              value={content}
              onChange={this.handleContentChange}
              ref={textarea => this.textarea = textarea}
            ></textarea>
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit}>发布</button>
        </div>
      </div>
    )
  }
}

CommentInput = wrapWithLoadData(CommentInput,'username')
export default CommentInput
