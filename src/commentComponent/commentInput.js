import React from 'react';
import './commentInput.scss';

export default class CommentInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            content: '',
            createTime: ''
        }
    }

    handleUserNameChange = event => {
        this.setState({
            username: event.target.value,
        })
    }

    handleContentChange = event => {
        this.setState({
            content: event.target.value,
        });
    }

    /***
    提交评论
     */
    handleCommit = () => {
        // 通过父组件的回调函数 onSubmit 将数据传到父组件，再通过父组件传给当前组件的同级组件
        if (this.props.onSubmit) {
            this.setState({
                createTime: (+new Date())
            }, () => {
                const {username, content, createTime} = this.state;
                console.log(username, '\n', content, '\n', createTime);
                this.props.onSubmit({username, content, createTime});
                // 提交时保存用户名到本地
                window.localStorage.setItem('username', this.state.username);
                // 回传完数据清空输入框
                this.setState({content: ''});
            });
        }
    }

    // 任何不涉及 DOM 操作的组件启动操作都可以放在 componentWillMount 里面
    componentDidMount() {
        this.input.focus();
        // 持久化用户名，下一次登录可以直接使用,始终保存最后一个用户名
        let lastUserName = window.localStorage.getItem('username');
        if (lastUserName) {
            this.setState({
                username: lastUserName
            })
        }
    }

    render() {
        return (
            <div className='commentInput'>
                <div className='inputUserName'>
                    <span>用户名：</span>
                    <input value={this.state.username}
                           onChange={this.handleUserNameChange.bind(this)}
                           ref={(input) => this.input = input}/>
                </div>
                <div className='commentContent'>
                    <span>评论内容：</span>
                    <textarea rows='6' value={this.state.content}
                              onChange={this.handleContentChange.bind(this)}/>
                </div>
                <div className='commit'>
                    <button type='button' onClick={this.handleCommit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}
