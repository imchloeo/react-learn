import React from 'react';

/**
 * propsChildren 可以作为容器组件，通过 this.props.children 来接收其他组件传来的内容，内容可以是 jsx
 */
export default class PropsChildren  extends React.Component{

    componentDidMount() {
        console.log(this.props.children);
    }


    render() {
        return (
            <div className={`propsChildren`}>
                {this.props.children}
            </div>
        )
    }
}
