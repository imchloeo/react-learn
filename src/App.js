import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import CommentInput from "./commentComponent/commentInput";
import CommentList from "./commentComponent/commentList";

import PropsChildren from "./commentComponent/propsChildren";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            date: new Date(),
            showTime: true
        }
        this.timer = ''
    }

    // 回调函数，用来接收子组件（InputComponent）回传的数据
    handleSubmitComment = comment => {
        console.log('新的评论：', comment);
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        this.state.comments.push(comment);
        /***
         *  持久化评论数据 localStorage
         * */
        let _comments = JSON.stringify(this.state.comments);
        if (window.localStorage.getItem('reactComments')) {
            window.localStorage.removeItem('reactComments');
        }
        window.localStorage.setItem('reactComments', _comments);
        console.log(this.state.comments);
        // 保存数据，在组件中将数据传给 commentList 去渲染
        this.setState({
            comments: this.state.comments
        })
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000);
        // 组件挂载之后读取 localStorage 获取之前的评论
        let _comments = JSON.parse(window.localStorage.getItem('reactComments'));
        if (_comments) {
            this.setState({
                comments: _comments
            })
        }
    }

    componentWillUnmount() {
        // 卸载前清除定时器
        this.timer = null
    }

    showTime = () => {
        this.setState({
            showTime: !this.state.showTime
        })
    }

    render() {
        return (
            <div className='App'>
                <p>
                    <span className='showtime' onClick={this.showTime.bind(this)}>显示现在时间</span>
                </p>
                {this.state.showTime ? <p>现在时间是：{this.state.date.toLocaleTimeString()}</p> : null}
                {/* onSubmit 回调函数，传给子组件，用来接收子组件传来的数据*/}
                <CommentInput onSubmit={this.handleSubmitComment}/>
                <CommentList comments={this.state.comments}/>
                {/*组件内直接写 jsx，子组件通过 props.children 接收内容*/}
                <PropsChildren>
                    {/*<span>propsChildren</span>*/}
                    {/*<p>测试</p>*/}
                </PropsChildren>
            </div>
        )
    }
}

