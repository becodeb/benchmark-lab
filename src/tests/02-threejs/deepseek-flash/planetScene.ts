import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type PlanetSceneHandle = {
  setPaused: (paused: boolean) => void
  dispose: () => void
}

type MoonSpec = {
  radius: number
  size: number
  speed: number
  color: number
  inclination: number
  phase: number
  shape: 'sphere' | 'rock'
}

const PLANET_RADIUS = 1.7

const MOONS: MoonSpec[] = [
  { radius: 3.6, size: 0.17, speed: 0.95, color: 0xf97316, inclination: 0.16, phase: 0.6, shape: 'sphere' },
  { radius: 4.3, size: 0.24, speed: 0.62, color: 0x93c5fd, inclination: -0.3, phase: 2.2, shape: 'sphere' },
  { radius: 5.0, size: 0.32, speed: 0.44, color: 0x34d399, inclination: 0.52, phase: 3.9, shape: 'rock' },
  { radius: 5.8, size: 0.26, speed: 0.32, color: 0xc084fc, inclination: -0.68, phase: 5.3, shape: 'sphere' },
  { radius: 6.6, size: 0.15, speed: 0.24, color: 0xfacc15, inclination: 0.92, phase: 1.4, shape: 'rock' },
]

function createPlanetTexture(): THREE.CanvasTexture {
  const width = 1024
  const height = 512
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  const base = ctx.createLinearGradient(0, 0, 0, height)
  base.addColorStop(0, '#111a3a')
  base.addColorStop(0.42, '#1e2a6e')
  base.addColorStop(0.55, '#2a3f96')
  base.addColorStop(1, '#0d1330')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, width, height)

  for (let i = 0; i < 340; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const rx = 30 + Math.random() * 170
    const ry = 4 + Math.random() * 18
    const hue = 185 + Math.random() * 95
    const light = 45 + Math.random() * 30
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.6, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${hue}, 85%, ${light}%, ${(0.04 + Math.random() * 0.12).toFixed(3)})`
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  return texture
}

function createRingTexture(): THREE.CanvasTexture {
  const width = 1024
  const height = 64
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createLinearGradient(0, 0, width, 0)
  gradient.addColorStop(0, 'rgba(196, 181, 253, 0)')
  gradient.addColorStop(0.08, 'rgba(196, 181, 253, 0.16)')
  gradient.addColorStop(0.2, 'rgba(129, 140, 248, 0.78)')
  gradient.addColorStop(0.32, 'rgba(224, 231, 255, 0.12)')
  gradient.addColorStop(0.44, 'rgba(165, 180, 252, 0.85)')
  gradient.addColorStop(0.52, 'rgba(238, 242, 255, 0.95)')
  gradient.addColorStop(0.62, 'rgba(147, 197, 253, 0.55)')
  gradient.addColorStop(0.74, 'rgba(196, 181, 253, 0.1)')
  gradient.addColorStop(0.86, 'rgba(129, 140, 248, 0.48)')
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  for (let i = 0; i < 260; i++) {
    const x = Math.random() * width
    ctx.fillStyle = `rgba(255, 255, 255, ${(Math.random() * 0.06).toFixed(3)})`
    ctx.fillRect(x, 0, 1 + Math.random() * 3, height)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  return texture
}

function createRingGeometry(inner: number, outer: number): THREE.RingGeometry {
  const geometry = new THREE.RingGeometry(inner, outer, 180, 1)
  const positions = geometry.attributes.position
  const uvs = geometry.attributes.uv
  const vertex = new THREE.Vector3()

  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i)
    const u = (vertex.length() - inner) / (outer - inner)
    uvs.setXY(i, u, 0.5)
  }
  uvs.needsUpdate = true
  return geometry
}

function createCircleGeometry(radius: number, segments = 160): THREE.BufferGeometry {
  const points: THREE.Vector3[] = []
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
  }
  return new THREE.BufferGeometry().setFromPoints(points)
}

function createStarField(): THREE.Points {
  const count = 1800
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const distance = 45 + Math.random() * 70
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = distance * Math.cos(phi)
    positions[i * 3 + 2] = distance * Math.sin(phi) * Math.sin(theta)

    color.setHSL(0.55 + Math.random() * 0.14, 0.55, 0.72 + Math.random() * 0.28)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.7,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  })

  return new THREE.Points(geometry, material)
}

function disposeNode(node: THREE.Object3D): void {
  const holder = node as THREE.Mesh & { material?: THREE.Material | THREE.Material[] }
  if (holder.geometry) holder.geometry.dispose()

  const material = holder.material
  if (!material) return

  const materials = Array.isArray(material) ? material : [material]
  for (const item of materials) {
    for (const value of Object.values(item as unknown as Record<string, unknown>)) {
      if (value instanceof THREE.Texture) value.dispose()
    }
    item.dispose()
  }
}

export function createPlanetScene(container: HTMLElement): PlanetSceneHandle {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x05060f)

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400)
  camera.position.set(2.4, 3.8, 8.4)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15

  const canvas = renderer.domElement
  canvas.style.display = 'block'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  container.appendChild(canvas)

  const ambientLight = new THREE.AmbientLight(0x93a5ff, 0.5)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xfff2d6, 2.6)
  keyLight.position.set(6, 7, 4)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.set(1024, 1024)
  keyLight.shadow.camera.near = 1
  keyLight.shadow.camera.far = 40
  keyLight.shadow.camera.left = -9
  keyLight.shadow.camera.right = 9
  keyLight.shadow.camera.top = 9
  keyLight.shadow.camera.bottom = -9
  keyLight.shadow.bias = -0.0005
  scene.add(keyLight)

  const rimLight = new THREE.DirectionalLight(0x6d7dff, 0.9)
  rimLight.position.set(-7, -3, -6)
  scene.add(rimLight)

  const planetGroup = new THREE.Group()
  planetGroup.rotation.z = THREE.MathUtils.degToRad(18)
  scene.add(planetGroup)

  const planetTexture = createPlanetTexture()
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_RADIUS, 64, 64),
    new THREE.MeshStandardMaterial({
      map: planetTexture,
      emissiveMap: planetTexture,
      emissive: new THREE.Color(0x2b3f9e),
      emissiveIntensity: 0.22,
      roughness: 0.72,
      metalness: 0.08,
    }),
  )
  planet.castShadow = true
  planet.receiveShadow = true
  planetGroup.add(planet)

  const ring = new THREE.Mesh(
    createRingGeometry(PLANET_RADIUS * 1.35, PLANET_RADIUS * 2),
    new THREE.MeshBasicMaterial({
      map: createRingTexture(),
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  )
  ring.rotation.x = -Math.PI / 2
  planetGroup.add(ring)

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_RADIUS * 1.16, 64, 64),
    new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x5b8cff) },
        uIntensity: { value: 0.9 },
      },
      vertexShader: `
        varying vec3 vNormalView;
        varying vec3 vViewDirection;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vNormalView = normalize(normalMatrix * normal);
          vViewDirection = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIntensity;
        varying vec3 vNormalView;
        varying vec3 vViewDirection;
        void main() {
          vec3 viewDirection = normalize(vViewDirection);
          float fresnel = pow(1.0 - abs(dot(vNormalView, viewDirection)), 3.0);
          gl_FragColor = vec4(uColor, fresnel * uIntensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  )
  planetGroup.add(atmosphere)

  const moons: Array<{ pivot: THREE.Group; mesh: THREE.Mesh; speed: number; phase: number }> = []

  for (const spec of MOONS) {
    const orbit = new THREE.Group()
    orbit.rotation.z = spec.inclination

    const pivot = new THREE.Group()
    pivot.rotation.y = spec.phase

    const geometry =
      spec.shape === 'rock'
        ? new THREE.IcosahedronGeometry(spec.size, 1)
        : new THREE.SphereGeometry(spec.size, 24, 24)

    const moon = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: spec.color,
        emissive: new THREE.Color(spec.color),
        emissiveIntensity: 0.18,
        roughness: 0.65,
        metalness: 0.15,
        flatShading: spec.shape === 'rock',
      }),
    )
    moon.position.x = spec.radius
    moon.castShadow = true
    moon.receiveShadow = true
    pivot.add(moon)

    const orbitLine = new THREE.LineLoop(
      createCircleGeometry(spec.radius),
      new THREE.LineBasicMaterial({ color: spec.color, transparent: true, opacity: 0.16 }),
    )

    orbit.add(orbitLine)
    orbit.add(pivot)
    scene.add(orbit)

    moons.push({ pivot, mesh: moon, speed: spec.speed, phase: spec.phase })
  }

  const stars = createStarField()
  scene.add(stars)

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.rotateSpeed = 0.65
  controls.zoomSpeed = 0.8
  controls.minDistance = 3.2
  controls.maxDistance = 22
  controls.enablePan = false
  controls.target.set(0, 0, 0)
  controls.update()

  const handleResize = () => {
    const width = container.clientWidth || window.innerWidth || 1
    const height = container.clientHeight || window.innerHeight || 1
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }
  handleResize()
  window.addEventListener('resize', handleResize)

  let paused = false
  let elapsed = 0
  let previous = performance.now()
  let rafId = 0

  const animate = (now: number) => {
    rafId = requestAnimationFrame(animate)

    const delta = Math.min((now - previous) / 1000, 0.05)
    previous = now

    if (!paused) {
      elapsed += delta
      planet.rotation.y += delta * 0.12
      stars.rotation.y += delta * 0.008

      for (const moon of moons) {
        moon.pivot.rotation.y = moon.phase + elapsed * moon.speed
        moon.mesh.rotation.y += delta * 0.6
      }
    }

    controls.update()
    renderer.render(scene, camera)
  }
  rafId = requestAnimationFrame(animate)

  return {
    setPaused(next: boolean) {
      paused = next
    },
    dispose() {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      scene.traverse(disposeNode)
      renderer.dispose()
      if (canvas.parentElement === container) container.removeChild(canvas)
    },
  }
}
