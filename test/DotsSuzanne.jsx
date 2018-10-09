import React, { Component } from 'react'

import ReArGL from '../dist/argl-react'
import { Shader, OrbitCamera } from 'argl'

import * as glm from 'gl-matrix'
import * as OBJ from 'webgl-obj-loader'


import vs from './shader/ct.vs'
import fs from './shader/ct.fs'

import suzanneObj from './assets/suzanne.obj'

class DotsSuzanne extends Component {

  init(argl) {
    this.argl = argl
    let gl = argl.gl
    let camera = new OrbitCamera([3, 3, 3], [0, 0, 0])
    let shader = new Shader(gl, vs, fs)
    this.camera = camera
    this.shader = shader

    let suzanneMesh = new OBJ.Mesh(suzanneObj)
    OBJ.initMeshBuffers(gl, suzanneMesh)
    this.vertexCount = suzanneMesh.vertices.length / 3

    gl.enable(gl.DEPTH_TEST)

    let quadVertices = [
      0.5, 0.5, 0.0,
      -0.5, 0.5, 0.0,
      0.5, -0.5, 0.0,
      -0.5, -0.5, 0.0
    ]
    let quadIndices = [
      0, 1, 2,
      2, 1, 3
    ]
    let quadBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadVertices), gl.STATIC_DRAW)

    this.EBO = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(quadIndices), gl.STATIC_DRAW)

    this.VAO = gl.createVertexArray()
    gl.bindVertexArray(this.VAO)

    let a_quad_pos = gl.getAttribLocation(shader.program, 'a_quad_pos')
    let a_position = gl.getAttribLocation(shader.program, 'a_position')

    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
    gl.vertexAttribPointer(a_quad_pos, 3, gl.FLOAT, false, 12, 0)
    gl.enableVertexAttribArray(a_quad_pos)


    gl.bindBuffer(gl.ARRAY_BUFFER, suzanneMesh.vertexBuffer)
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 12, 0)
    gl.enableVertexAttribArray(a_position)

    gl.vertexAttribDivisor(a_position, 1)
    gl.bindVertexArray(null)

    gl.clearColor(0, 0, 0, 1)
  }

  draw(time) {
    let camera = this.camera
    let shader = this.shader
    let gl = this.argl.gl
    camera.desktopOrbitControl(this.argl)
    camera.mobileOrbitControl(this.argl)

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    let model = glm.mat4.create()
    let view = camera.getViewMatrix()
    let projection = glm.mat4.create()
    glm.mat4.perspective(projection, glm.glMatrix.toRadian(camera.zoom), gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100)

    shader.use()
    shader.setMat4('u_projection', projection)
    shader.setMat4('u_view', view)
    shader.setMat4('u_model', model)

    gl.bindVertexArray(this.VAO)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO)
    gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.vertexCount)
  }

  render() {
    return (
      <ReArGL
        className="DotsSuzanne"
        width={960}
        height={540}
        init={this.init.bind(this)}
        draw={this.draw.bind(this)}
        options={{
          desktopInput: {
            lockPointer: false
          }
        }}
        />
    )
  }
}

export default DotsSuzanne
