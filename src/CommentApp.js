import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import wrapWithLoadData from './wrapWithLoadData'

class CommentApp extends Component {

  static propTypes = {
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
  }

  state = {
    comments: this.props.data || []
  }

  UNSAFE_componentWillMount () {
    // this._loadComments()
  }
  // //从本地存储读取评论内容
  // _loadComments () {
  //   let comments = localStorage.getItem('comments')
  //   if (comments) {
  //     comments = JSON.parse(comments)
  //     this.setState({comments})
  //   }
  // }
     //保存评论内容到本地存储
  // _saveComments = (comments) => {
  //   localStorage.setItem('comments',JSON.stringify(comments))
  // }

  handleSubmitComment = (comment) => {
    if(!comment){return}
    if(!comment.username)return alert('请输入用户名')
    if(!comment.content)return alert('请输入评论内容')
    const comments = this.state.comments
    comments.push(comment)
    this.setState({
      comments:this.state.comments
    })
    // this._saveComments(comments)
    this.props.saveData(comments)
  }

  handleDeleteComment = (index) => {
    const comments = this.state.comments
    comments.splice(index,1)
    this.setState({comments})
    // this._saveComments(comments)
    this.props.saveData(comments)
  }

  render () {
    const { comments } = this.state
    return(
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmitComment}/>
        <CommentList
          comments={comments}
          onDeleteComment={this.handleDeleteComment}/>
      </div>
    )
  }
}

CommentApp = wrapWithLoadData(CommentApp,'comments')
export default CommentApp
