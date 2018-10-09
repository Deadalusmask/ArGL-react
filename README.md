# ArGL-react

[ArGL](https://github.com/deadalusmask/ArGL) react wrapper

## Install
`yarn add -D argl-react`

## Usage
```jsx
import React, { Component } from 'react'
import ReArGL from 'argl-react'

export default DotsSuzanne extends Component {
  init(argl) {
    // create shaders, camera and load models, textures here
  }
  draw(time) {
    // your draw func executes in render loop
  }
  render() {
    return (
      <ReArGL
        className="DotsSuzanne"
        width={960}
        height={540}
        init={this.init.bind(this)}
        draw={this.draw.bind(this)}
        options={
          // ArGL options here
        }/>
    )
  }
}
```
check `test` folder for a complete example.
