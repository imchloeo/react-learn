import React from 'react';
import './comment.scss';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {createTime: ''}
    }

    componentDidMount() {
        console.log(this.props);
        this.upDateTime();
    }

    upDateTime = () => {
        const comment = this.props.comment;
        const duration = Math.floor((+new Date() - comment.createTime) / 1000);
        const _time = function () {
            // if (duration < 60) {
            //     return `${Math.round(Math.max(duration, 1))} 秒前`;
            // }
            // if (duration >= 60 && (Math.round(duration / 60) < 24)) {
            //     return `${Math.round(duration / 60)} 分钟前`
            // }
            // if (Math.round(duration / 60) >= 24) {
            //     return `${Math.round(Math.floor(duration / 60 / 24))} 天前`
            // }

            // let _createYear = (new Date(duration)).getFullYear();

            if (duration < 1) {
                return '刚刚'
            }
            // minute
            if (Math.floor(duration / 60) < 60) {
                return `${Math.floor(duration / 60)} 分钟`
                // hour or day
            } else if (Math.floor(duration / 60) >= 60) {

                if (Math.floor(duration / 60 / 60) < 24) {
                    return `${Math.floor(duration / 60 / 60)} 小时`
                } else {
                    return `${Math.floor(duration / 60 / 60)} 天`
                }
            }
        };
        this.setState({
            createTime: _time()
        })
    }

    render() {
        return (
            <div className='comment'>
                <span>{this.props.comment.username}:&nbsp;&nbsp;</span>
                <p>{this.props.comment.content}</p>
                <span className={'createTime'}>{this.state.createTime}</span>
                <p className={'deleteComment'}>删除</p>
            </div>
        )
    }
}
