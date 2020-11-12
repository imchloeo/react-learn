import React from 'react';
import './commentList.scss';
import Comment from "./comment";

export default class CommentList extends React.Component {

    render() {
        return (
            <div className='commentList'>
                {this.props.comments.map((comment, i) => <Comment comment={comment} key={i}/>)}
            </div>
        )
    }
}
