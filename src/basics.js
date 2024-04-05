import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import imageSource from '../static/textures/door/color.jpg'

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('on start')
}

loadingManager.onLoad = () => {
  console.log('on load')
}

loadingManager.onProgress = () => {
  console.log('on progress')
}

loadingManager.onError = () => {
  console.log('on error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const ambientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const roughTexture = textureLoader.load('/textures/door/roughness.jpg')

colorTexture.repeat.x = 2
colorTexture.repeat.y = 2
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping

colorTexture.offset.x = 0.5
colorTexture.offset.y = 0.5

colorTexture.center.x = 0.5

colorTexture.rotation = Math.PI / 4
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)

// const count = 5
// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4
// }
// const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0])
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
