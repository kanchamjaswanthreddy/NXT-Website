/**
 * Depth parallax for photographs, in WebGL.
 *
 * Each photograph comes with a depth map (white = near). Shifting every pixel by an amount that
 * depends on its depth makes a still photograph behave like a slow camera move: the foreground
 * slides further than the background. Two photographs can be held at once and dissolved into one
 * another, nearer parts of the incoming picture arriving first.
 *
 * Nothing here touches React. Callers own the canvas, the loop and the fallback image.
 */
export interface DepthSource { src: string; depth: string }

export interface DepthFrame {
  /** Index of the outgoing and incoming layers. */
  a: number
  b: number
  /** 0 shows `a`, 1 shows `b`. */
  mix: number
  /** Camera shift, roughly -1 to 1 on each axis. */
  x: number
  y: number
  /** 1 fills the canvas; above 1 pushes in. */
  zoom: number
}

const VERT = `attribute vec2 p; varying vec2 v; void main(){ v = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`

const FRAG = `precision mediump float;
varying vec2 v;
uniform sampler2D ia, da, ib, db;
uniform vec2 ca, cb, off;
uniform float mixv, zoom;
vec2 fit(vec2 uv, vec2 cover, float z){ return (uv - .5) * cover / z + .5; }
vec4 layer(sampler2D img, sampler2D dep, vec2 p){
  float d = texture2D(dep, p).r;
  vec2 q = p + off * (d - .45);
  d = texture2D(dep, q).r;
  q = p + off * (d - .45);
  return texture2D(img, clamp(q, .001, .999));
}
void main(){
  vec2 pa = fit(v, ca, zoom);
  vec2 pb = fit(v, cb, zoom * (1.06 - .06 * mixv));
  vec4 a = layer(ia, da, pa);
  if (mixv <= 0.) { gl_FragColor = a; return; }
  vec4 b = layer(ib, db, pb);
  float near = texture2D(db, pb).r;
  float m = smoothstep(0., 1., clamp(mixv * 1.7 - (1. - near) * .7, 0., 1.));
  gl_FragColor = mix(a, b, m);
}`

interface Layer { img: WebGLTexture; depth: WebGLTexture; aspect: number; ready: boolean }

export interface DepthRenderer {
  /** True once the layer's photograph and depth map are both on the GPU. */
  ready(i: number): boolean
  draw(f: DepthFrame): void
  resize(): void
  dispose(): void
}

function load(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const im = new Image()
    im.decoding = 'async'
    im.onload = () => resolve(im)
    im.onerror = () => reject(new Error(`could not load ${src}`))
    im.src = src
  })
}

/** Returns null when WebGL is unavailable; the caller keeps showing its plain image. */
export function createDepthRenderer(canvas: HTMLCanvasElement, sources: DepthSource[], onReady?: (i: number) => void): DepthRenderer | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
  if (!gl) return null

  const compile = (type: number, text: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, text)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
  gl.useProgram(prog)

  const quad = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quad)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const u = (name: string) => gl.getUniformLocation(prog, name)
  const uni = { ia: u('ia'), da: u('da'), ib: u('ib'), db: u('db'), ca: u('ca'), cb: u('cb'), off: u('off'), mixv: u('mixv'), zoom: u('zoom') }
  gl.uniform1i(uni.ia, 0); gl.uniform1i(uni.da, 1); gl.uniform1i(uni.ib, 2); gl.uniform1i(uni.db, 3)

  let dead = false
  const texture = (im: HTMLImageElement) => {
    const t = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return t
  }

  const layers: (Layer | null)[] = sources.map(() => null)
  sources.forEach((s, i) => {
    Promise.all([load(s.src), load(s.depth)]).then(([im, dm]) => {
      if (dead) return
      layers[i] = { img: texture(im), depth: texture(dm), aspect: im.naturalWidth / im.naturalHeight, ready: true }
      onReady?.(i)
    }).catch(() => { /* the plain image stays */ })
  })

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
    gl.viewport(0, 0, w, h)
  }

  // Scale that makes a picture of the given shape cover the canvas, as object-fit: cover does.
  const cover = (aspect: number): [number, number] => {
    const view = canvas.width / Math.max(1, canvas.height)
    return view > aspect ? [1, aspect / view] : [view / aspect, 1]
  }

  const bind = (unit: number, t: WebGLTexture) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t) }

  return {
    ready: (i) => Boolean(layers[i]?.ready),
    resize,
    draw(f) {
      const A = layers[f.a]
      if (!A || dead) return
      const B = layers[f.b] ?? A
      const mix = layers[f.b] ? f.mix : 0
      bind(0, A.img); bind(1, A.depth); bind(2, B.img); bind(3, B.depth)
      gl.uniform2fv(uni.ca, cover(A.aspect))
      gl.uniform2fv(uni.cb, cover(B.aspect))
      gl.uniform2f(uni.off, f.x * 0.016, f.y * 0.016)
      gl.uniform1f(uni.mixv, mix)
      gl.uniform1f(uni.zoom, f.zoom)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },
    dispose() {
      dead = true
      layers.forEach((l) => { if (l) { gl.deleteTexture(l.img); gl.deleteTexture(l.depth) } })
    },
  }
}
