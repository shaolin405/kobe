import { merge } from 'nsfw/utils/utils'
import THREE from 'THREE'

const defaults = {
  width: window.innerWidth,
  height: window.innerHeight,
  renderer: {
    antialias: true,
    alpha: false,
    bgColor: 0xffffff,
    shadow: false,
    pixelRatio: window.devicePixelRatio
  },
  camera: {
    type: 'perspective',
    fov: 45,
    near: 1,
    far: 1000
  },
  wagner: false,
  orbits: false,
  verbose: false
}

/**
 * ThreeJS App
 *
 * v1.0
 */

class THREEApp {
  constructor(opts = {}) {
    const options = merge(defaults, opts)

    this.verbose = options.verbose

    if (this.verbose) console.log(`THREEApp options ::`, options)

    this.width = options.width
    this.height = options.height

    // renderer
    const optionsRenderer = {
      antialias: options.renderer.antialias,
      alpha: options.renderer.alpha
    }

    if (options.canvas) {
      optionsRenderer.canvas = options.canvas
    }

    this.renderer = new THREE.WebGLRenderer(optionsRenderer)
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(options.renderer.pixelRatio)

    if (options.container) {
      options.container.appendChild(this.renderer.domElement)
    }

    if (options.renderer.shadow) {
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.shadowMap.soft = true
    }

    // scene
    this.scene = new THREE.Scene()

    if (!options.renderer.alpha) {
      this.scene.background = new THREE.Color(options.renderer.bgColor)
    }

    // camera
    this.camera =
      options.camera.type === 'perspective'
        ? new THREE.PerspectiveCamera(
            options.camera.fov,
            this.width / this.height,
            options.camera.near,
            options.camera.far
          )
        : new THREE.OrthographicCamera(
            this.width * -0.5,
            this.width * 0.5,
            this.height * 0.5,
            this.height * -0.5,
            options.camera.near,
            options.camera.far
          )
    this.camera.lookAt(new THREE.Vector3())

    if (options.orbits) {
      const OrbitControls = require('three-orbit-controls')(THREE)
      this.controls = new OrbitControls(this.camera)
    }
  }

  resize(w, h) {
    if (this.verbose) console.log('THREEApp :: resize')

    this.width = w
    this.height = h

    if (this.camera.type === 'OrthographicCamera') {
      const wHalf = w * 0.5
      const hHalf = h * 0.5

      this.camera.left = -wHalf
      this.camera.right = wHalf
      this.camera.top = hHalf
      this.camera.bottom = -hHalf
    } else {
      this.camera.aspect = w / h
    }

    this.camera.updateProjectionMatrix()

    this.renderer.setSize(w, h)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.renderer.dispose()

    this.renderer = null
    this.scene = null
    this.camera = null
    this.verbose = null
    this.width = null
    this.height = null

    if (this.controls) {
      this.controls.dispose()
      this.controls = null
    }
  }
}

export default THREEApp
