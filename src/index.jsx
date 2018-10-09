import React, { Component } from 'react'
import { ArGL } from 'argl'

class ReArGL extends Component {
  //props:
  // options
  // init(argl) { }
  // draw(time) { }
  // width and height
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    if (this.canvasRef.current) {
      this.argl = new ArGL(this.canvasRef.current, this.props.options)
      this.props.init(this.argl)
      this.argl.draw = this.props.draw
      this.argl.start()
    }
  }

  render() {
    return (
      <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height} />
    )
  }
}

export default ReArGL
