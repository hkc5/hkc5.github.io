'use client'

import React, { useRef, useEffect } from 'react'

// ─── GLSL Shaders ────────────────────────────────────────────────────────────

const baseVertexShader = `
precision highp float;

attribute vec2 aPosition;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;

void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const copyShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
uniform sampler2D uTexture;

void main () {
    gl_FragColor = texture2D(uTexture, vUv);
}
`

const clearShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;

void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
}
`

const displayShaderSource = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uTexture;
uniform sampler2D uBloom;
uniform vec2 texelSize;

vec3 linearToGamma (vec3 color) {
    color = max(color, vec3(0));
    return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
}

void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;

#ifdef SHADING
    vec3 lc = texture2D(uTexture, vL).rgb;
    vec3 rc = texture2D(uTexture, vR).rgb;
    vec3 tc = texture2D(uTexture, vT).rgb;
    vec3 bc = texture2D(uTexture, vB).rgb;

    float dx = length(rc) - length(lc);
    float dy = length(tc) - length(bc);

    vec3 n = normalize(vec3(dx, dy, length(texelSize)));
    vec3 l = vec3(0.0, 0.0, 1.0);

    float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
    c *= diffuse;
#endif

#ifdef BLOOM
    vec3 bloom = texture2D(uBloom, vUv).rgb;
    bloom = linearToGamma(bloom);
    c += bloom;
#endif

    float a = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c, a);
}
`

const bloomPrefilterShader = `
precision mediump float;
precision mediump sampler2D;

varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec3 curve;
uniform float threshold;

void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    float br = max(c.r, max(c.g, c.b));
    float rq = clamp(br - curve.x, 0.0, curve.y);
    rq = curve.z * rq * rq;
    c *= max(rq, br - threshold) / max(br, 0.0001);
    gl_FragColor = vec4(c, 0.0);
}
`

const bloomBlurShader = `
precision mediump float;
precision mediump sampler2D;

varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uTexture;

void main () {
    vec4 sum = vec4(0.0);
    sum += texture2D(uTexture, vL);
    sum += texture2D(uTexture, vR);
    sum += texture2D(uTexture, vT);
    sum += texture2D(uTexture, vB);
    sum *= 0.25;
    gl_FragColor = sum;
}
`

const bloomFinalShader = `
precision mediump float;
precision mediump sampler2D;

varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uTexture;
uniform float intensity;

void main () {
    vec4 sum = vec4(0.0);
    sum += texture2D(uTexture, vL);
    sum += texture2D(uTexture, vR);
    sum += texture2D(uTexture, vT);
    sum += texture2D(uTexture, vB);
    sum *= 0.25;
    gl_FragColor = sum * intensity;
}
`

const splatShader = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;

void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
}
`

const advectionShader = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform vec2 dyeTexelSize;
uniform float dt;
uniform float dissipation;

vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
    vec2 st = uv / tsize - 0.5;
    vec2 iuv = floor(st);
    vec2 fuv = fract(st);
    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}

void main () {
#ifdef MANUAL_FILTERING
    vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
    vec4 result = bilerp(uSource, coord, dyeTexelSize);
#else
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec4 result = texture2D(uSource, coord);
#endif
    float decay = 1.0 + dissipation * dt;
    gl_FragColor = result / decay;
}
`

const divergenceShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`

const curlShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`

const vorticityShader = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;

void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;

    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;

    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = min(max(velocity, -1000.0), 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`

const pressureShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;

void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`

const gradientSubtractShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;

void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`

// ─── Collection type for key-based map ───────────────────────────────────────
interface UniformMap {
  [key: string]: WebGLUniformLocation | null
}

// ─── Material class (keyword-shader variants) ────────────────────────────────
class Material {
  vertexShader: WebGLShader
  fragmentShaderSource: string
  programs: WebGLProgram[] = []
  activeProgram: WebGLProgram | null = null
  uniforms: UniformMap = {}
  private gl: WebGLRenderingContext

  constructor(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShaderSource: string) {
    this.gl = gl
    this.vertexShader = vertexShader
    this.fragmentShaderSource = fragmentShaderSource
  }

  setKeywords(keywords: string[]) {
    const gl = this.gl
    let hash = 0
    for (const k of keywords) hash += hashCode(k)

    let program = this.programs[hash]
    if (program == null) {
      const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords)
      program = createProgram(gl, this.vertexShader, fragmentShader)
      this.programs[hash] = program
    }
    if (program === this.activeProgram) return
    this.uniforms = getUniforms(gl, program)
    this.activeProgram = program
  }

  bind() {
    if (this.activeProgram) this.gl.useProgram(this.activeProgram)
  }
}

class Program {
  uniforms: UniformMap = {}
  program: WebGLProgram
  private gl: WebGLRenderingContext

  constructor(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    this.gl = gl
    this.program = createProgram(gl, vertexShader, fragmentShader)
    this.uniforms = getUniforms(gl, this.program)
  }

  bind() {
    this.gl.useProgram(this.program)
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function createProgram(gl: WebGLRenderingContext, vertex: WebGLShader, fragment: WebGLShader): WebGLProgram {
  const program = gl.createProgram()!
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
  }
  return program
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram): UniformMap {
  const uniforms: UniformMap = {}
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(program, i)!.name
    uniforms[name] = gl.getUniformLocation(program, name)
  }
  return uniforms
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string, keywords: string[] = []): WebGLShader {
  let finalSource = source
  for (const kw of keywords) {
    finalSource = `#define ${kw}\n` + finalSource
  }
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, finalSource)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
  }
  return shader
}

function hashCode(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i)
    hash |= 0
  }
  return hash
}

// ─── FBO types ───────────────────────────────────────────────────────────────

interface FBO {
  texture: WebGLTexture
  fbo: WebGLFramebuffer
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  attach: (id: number) => number
}

interface DoubleFBO {
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  read: FBO
  write: FBO
  swap: () => void
}

interface Pointer {
  id: number
  texcoordX: number
  texcoordY: number
  prevTexcoordX: number
  prevTexcoordY: number
  deltaX: number
  deltaY: number
  down: boolean
  moved: boolean
  color: [number, number, number]
}

function createFBO(
  gl: WebGLRenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
): FBO {
  gl.activeTexture(gl.TEXTURE0)
  const texture = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)

  const fbo = gl.createFramebuffer()!
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.viewport(0, 0, w, h)
  gl.clear(gl.COLOR_BUFFER_BIT)

  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX: 1.0 / w,
    texelSizeY: 1.0 / h,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      return id
    }
  }
}

function createDoubleFBO(
  gl: WebGLRenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
): DoubleFBO {
  let fbo1 = createFBO(gl, w, h, internalFormat, format, type, param)
  let fbo2 = createFBO(gl, w, h, internalFormat, format, type, param)
  return {
    width: w,
    height: h,
    texelSizeX: fbo1.texelSizeX,
    texelSizeY: fbo1.texelSizeY,
    get read() { return fbo1 },
    set read(v) { fbo1 = v },
    get write() { return fbo2 },
    set write(v) { fbo2 = v },
    swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t }
  }
}

// ─── Configuration ───────────────────────────────────────────────────────────

interface FluidConfig {
  SIM_RESOLUTION: number
  DYE_RESOLUTION: number
  DENSITY_DISSIPATION: number
  VELOCITY_DISSIPATION: number
  PRESSURE: number
  PRESSURE_ITERATIONS: number
  CURL: number
  SPLAT_RADIUS: number
  SPLAT_FORCE: number
  SHADING: boolean
  COLORFUL: boolean
  COLOR_UPDATE_SPEED: number
  BLOOM: boolean
  BLOOM_ITERATIONS: number
  BLOOM_RESOLUTION: number
  BLOOM_INTENSITY: number
  BLOOM_THRESHOLD: number
  BLOOM_SOFT_KNEE: number
  PAUSED: boolean
  AUTO_SPLAT_INTERVAL: number
}

interface WebGLFluidProps {
  config?: Partial<FluidConfig>
  className?: string
}

const DEFAULT_CONFIG: FluidConfig = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 768,
  DENSITY_DISSIPATION: 1,
  VELOCITY_DISSIPATION: 0.3,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 4,
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 3000,
  SHADING: true,
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  BLOOM: true,
  BLOOM_ITERATIONS: 6,
  BLOOM_RESOLUTION: 192,
  BLOOM_INTENSITY: 0.6,
  BLOOM_THRESHOLD: 0.6,
  BLOOM_SOFT_KNEE: 0.7,
  PAUSED: false,
  AUTO_SPLAT_INTERVAL: 3000,
}

// ─── Color helpers ───────────────────────────────────────────────────────────

function HSVtoRGB(h: number, s: number, v: number) {
  let r = 0, g = 0, b = 0
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
  }
  return { r, g, b }
}

function generateColor(): [number, number, number] {
  const c = HSVtoRGB(Math.random(), 1.0, 1.0)
  return [c.r * 0.15, c.g * 0.15, c.b * 0.15]
}

// ─── The React Component ─────────────────────────────────────────────────────

const WebGLFluid: React.FC<WebGLFluidProps> = ({ config: userConfig, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cfg = { ...DEFAULT_CONFIG, ...userConfig }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animationId = 0
    const canvasEl = canvas
    const pointers: Pointer[] = [{
      id: -1,
      texcoordX: 0, texcoordY: 0,
      prevTexcoordX: 0, prevTexcoordY: 0,
      deltaX: 0, deltaY: 0,
      down: false, moved: false,
      color: [30, 0, 300]
    }]
    let splatStack: number[] = []

    // ── WebGL init ──────────────────────────────────────────────────────────
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false }
    const glRaw = canvas.getContext('webgl2', params) || canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params)
    if (!glRaw) {
      console.error('WebGL not supported')
      return
    }
    const gl = glRaw as any
    const isWebGL2 = glRaw instanceof WebGL2RenderingContext

    let halfFloat: any
    let supportLinearFiltering: any
    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float')
      supportLinearFiltering = gl.getExtension('OES_texture_float_linear')
    } else {
      halfFloat = gl.getExtension('OES_texture_half_float')
      supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear')
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES
    let formatRGBA = getSupportedFormat(gl, isWebGL2 ? gl.RGBA16F : gl.RGBA, gl.RGBA, halfFloatTexType)
    let formatRG = getSupportedFormat(gl, isWebGL2 ? gl.RG16F : gl.RGBA, gl.RG, halfFloatTexType)
    let formatR = getSupportedFormat(gl, isWebGL2 ? gl.R16F : gl.RGBA, gl.RED, halfFloatTexType)

    function getSupportedFormat(gl: any, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if (internalFormat === (gl.R16F ?? gl.RGBA)) return getSupportedFormat(gl, gl.RG16F ?? gl.RGBA, gl.RG, type)
        if (internalFormat === (gl.RG16F ?? gl.RGBA)) return getSupportedFormat(gl, gl.RGBA16F ?? gl.RGBA, gl.RGBA, type)
        return null
      }
      return { internalFormat, format }
    }

    function supportRenderTextureFormat(gl: any, internalFormat: number, format: number, type: number) {
      const texture = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)
      const fbo = gl.createFramebuffer()!
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
      return status === gl.FRAMEBUFFER_COMPLETE
    }

    if (formatRGBA == null) {
      console.error('WebGL float textures not supported')
      return
    }

    const ext = { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering }

    // ── Compile base shaders ────────────────────────────────────────────────
    const compiledBaseVS = compileShader(gl, gl.VERTEX_SHADER, baseVertexShader)

    const copyProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, copyShader))
    const clearProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, clearShader))
    const bloomPrefilterProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, bloomPrefilterShader))
    const bloomBlurProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, bloomBlurShader))
    const bloomFinalProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, bloomFinalShader))
    const splatProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, splatShader))
    const advectionProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, advectionShader, ext.supportLinearFiltering ? [] : ['MANUAL_FILTERING']))
    const divergenceProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, divergenceShader))
    const curlProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, curlShader))
    const vorticityProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, vorticityShader))
    const pressureProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, pressureShader))
    const gradienSubtractProgram = new Program(gl, compiledBaseVS, compileShader(gl, gl.FRAGMENT_SHADER, gradientSubtractShader))

    const displayMaterial = new Material(gl, compiledBaseVS, displayShaderSource)
    updateKeywords()

    function updateKeywords() {
      const keywords: string[] = []
      if (cfg.SHADING) keywords.push('SHADING')
      if (cfg.BLOOM) keywords.push('BLOOM')
      displayMaterial.setKeywords(keywords)
    }

    // ── Blit helper ─────────────────────────────────────────────────────────
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()!)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()!)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(0)

    function blit(target: FBO | null, clear = false) {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      } else {
        gl.viewport(0, 0, target.width, target.height)
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
      }
      if (clear) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
    }

    // ── FBOs ────────────────────────────────────────────────────────────────
    let dye: DoubleFBO
    let velocity: DoubleFBO
    let divergence: FBO
    let curl: FBO
    let pressure: DoubleFBO
    let bloom: FBO
    let bloomFramebuffers: FBO[] = []

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio
      const min = Math.round(resolution)
      const max = Math.round(resolution * aspectRatio)
      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min }
      else
        return { width: min, height: max }
    }

    function initFramebuffers() {
      const simRes = getResolution(cfg.SIM_RESOLUTION)
      const dyeRes = getResolution(cfg.DYE_RESOLUTION)
      const texType = ext.halfFloatTexType
      const rgba = ext.formatRGBA!
      const rg = ext.formatRG!
      const r = ext.formatR!
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST

      gl.disable(gl.BLEND)

      if (dye == null)
        dye = createDoubleFBO(gl, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)
      else
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)

      if (velocity == null)
        velocity = createDoubleFBO(gl, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)
      else
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)

      divergence = createFBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
      curl = createFBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
      pressure = createDoubleFBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)

      initBloomFramebuffers()
    }

    function resizeDoubleFBO(target: DoubleFBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
      if (target.width === w && target.height === h) return target
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param)
      target.write = createFBO(gl, w, h, internalFormat, format, type, param)
      target.width = w
      target.height = h
      target.texelSizeX = 1.0 / w
      target.texelSizeY = 1.0 / h
      return target
    }

    function resizeFBO(target: FBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
      const newFBO = createFBO(gl, w, h, internalFormat, format, type, param)
      copyProgram.bind()
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0))
      blit(newFBO)
      return newFBO
    }

    function initBloomFramebuffers() {
      const res = getResolution(cfg.BLOOM_RESOLUTION)
      const texType = ext.halfFloatTexType
      const rgba = ext.formatRGBA!
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST

      bloom = createFBO(gl, res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering)
      bloomFramebuffers = []
      for (let i = 0; i < cfg.BLOOM_ITERATIONS; i++) {
        const w = res.width >> (i + 1)
        const h = res.height >> (i + 1)
        if (w < 2 || h < 2) break
        bloomFramebuffers.push(createFBO(gl, w, h, rgba.internalFormat, rgba.format, texType, filtering))
      }
    }

    // ── Simulation steps ────────────────────────────────────────────────────
    function step(dt: number) {
      gl.disable(gl.BLEND)

      curlProgram.bind()
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0))
      blit(curl)

      vorticityProgram.bind()
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1))
      gl.uniform1f(vorticityProgram.uniforms.curl, cfg.CURL)
      gl.uniform1f(vorticityProgram.uniforms.dt, dt)
      blit(velocity.write)
      velocity.swap()

      divergenceProgram.bind()
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0))
      blit(divergence)

      clearProgram.bind()
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0))
      gl.uniform1f(clearProgram.uniforms.value, cfg.PRESSURE)
      blit(pressure.write)
      pressure.swap()

      pressureProgram.bind()
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0))
      for (let i = 0; i < cfg.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1))
        blit(pressure.write)
        pressure.swap()
      }

      gradienSubtractProgram.bind()
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0))
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1))
      blit(velocity.write)
      velocity.swap()

      advectionProgram.bind()
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY)
      const velId = velocity.read.attach(0)
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velId)
      gl.uniform1i(advectionProgram.uniforms.uSource, velId)
      gl.uniform1f(advectionProgram.uniforms.dt, dt)
      gl.uniform1f(advectionProgram.uniforms.dissipation, cfg.VELOCITY_DISSIPATION)
      blit(velocity.write)
      velocity.swap()

      if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY)
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1))
      gl.uniform1f(advectionProgram.uniforms.dissipation, cfg.DENSITY_DISSIPATION)
      blit(dye.write)
      dye.swap()
    }

    // ── Rendering ───────────────────────────────────────────────────────────
    function render(target: FBO | null) {
      if (cfg.BLOOM) applyBloom(dye.read, bloom)

      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.enable(gl.BLEND)

      drawDisplay(target)
    }

    function drawDisplay(target: FBO | null) {
      const width = target == null ? gl.drawingBufferWidth : target.width
      const height = target == null ? gl.drawingBufferHeight : target.height

      displayMaterial.bind()
      if (cfg.SHADING)
        gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height)
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0))
      if (cfg.BLOOM) {
        gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1))
      }
      blit(target)
    }

    function applyBloom(source: FBO, destination: FBO) {
      if (bloomFramebuffers.length < 2) return
      let last = destination

      gl.disable(gl.BLEND)
      bloomPrefilterProgram.bind()
      const knee = cfg.BLOOM_THRESHOLD * cfg.BLOOM_SOFT_KNEE + 0.0001
      const curve0 = cfg.BLOOM_THRESHOLD - knee
      const curve1 = knee * 2
      const curve2 = 0.25 / knee
      gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2)
      gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, cfg.BLOOM_THRESHOLD)
      gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0))
      blit(last)

      bloomBlurProgram.bind()
      for (const dest of bloomFramebuffers) {
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY)
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0))
        blit(dest)
        last = dest
      }

      gl.blendFunc(gl.ONE, gl.ONE)
      gl.enable(gl.BLEND)

      for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
        const baseTex = bloomFramebuffers[i]
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY)
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0))
        gl.viewport(0, 0, baseTex.width, baseTex.height)
        blit(baseTex)
        last = baseTex
      }

      gl.disable(gl.BLEND)
      bloomFinalProgram.bind()
      gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY)
      gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0))
      gl.uniform1f(bloomFinalProgram.uniforms.intensity, cfg.BLOOM_INTENSITY)
      blit(destination)
    }

    // ── Splat functions ─────────────────────────────────────────────────────
    function splatPointer(pointer: Pointer) {
      const dx = pointer.deltaX * cfg.SPLAT_FORCE
      const dy = pointer.deltaY * cfg.SPLAT_FORCE
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color)
    }

    function multipleSplats(amount: number) {
      for (let i = 0; i < amount; i++) {
        const color = generateColor()
        const c: [number, number, number] = [color[0] * 10.0, color[1] * 10.0, color[2] * 10.0]
        const x = Math.random()
        const y = Math.random()
        const dx = 1000 * (Math.random() - 0.5)
        const dy = 1000 * (Math.random() - 0.5)
        splat(x, y, dx, dy, c)
      }
    }

    function splat(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
      splatProgram.bind()
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0))
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvasEl.width / canvasEl.height)
      gl.uniform2f(splatProgram.uniforms.point, x, y)
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0)
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(cfg.SPLAT_RADIUS / 100.0))
      blit(velocity.write)
      velocity.swap()

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0))
      gl.uniform3f(splatProgram.uniforms.color, color[0], color[1], color[2])
      blit(dye.write)
      dye.swap()
    }

    function correctRadius(radius: number) {
      const aspect = canvasEl.width / canvasEl.height
      return aspect > 1 ? radius * aspect : radius
    }

    // ── Pointer events ──────────────────────────────────────────────────────
    function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
      pointer.id = id
      pointer.down = true
      pointer.moved = false
      pointer.texcoordX = posX / canvasEl.width
      pointer.texcoordY = 1.0 - posY / canvasEl.height
      pointer.prevTexcoordX = pointer.texcoordX
      pointer.prevTexcoordY = pointer.texcoordY
      pointer.deltaX = 0
      pointer.deltaY = 0
      pointer.color = generateColor()
    }

    function updatePointerMoveData(pointer: Pointer, posX: number, posY: number) {
      pointer.prevTexcoordX = pointer.texcoordX
      pointer.prevTexcoordY = pointer.texcoordY
      pointer.texcoordX = posX / canvasEl.width
      pointer.texcoordY = 1.0 - posY / canvasEl.height
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX)
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY)
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0
    }

    function updatePointerUpData(pointer: Pointer) {
      pointer.down = false
    }

    function correctDeltaX(delta: number) {
      const aspect = canvasEl.width / canvasEl.height
      return aspect < 1 ? delta * aspect : delta
    }

    function correctDeltaY(delta: number) {
      const aspect = canvasEl.width / canvasEl.height
      return aspect > 1 ? delta / aspect : delta
    }

    function scaleByPixelRatio(input: number) {
      return Math.floor(input * (window.devicePixelRatio || 1))
    }

    function resizeCanvas() {
      const width = scaleByPixelRatio(canvasEl.clientWidth)
      const height = scaleByPixelRatio(canvasEl.clientHeight)
      if (canvasEl.width !== width || canvasEl.height !== height) {
        canvasEl.width = width
        canvasEl.height = height
        return true
      }
      return false
    }

    // ── Mouse / Touch listeners ─────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      const rect = canvasEl.getBoundingClientRect()
      const posX = scaleByPixelRatio(e.clientX - rect.left)
      const posY = scaleByPixelRatio(e.clientY - rect.top)
      const p = pointers.find(p => p.id === -1) || pointerPrototype()
      updatePointerDownData(p, -1, posX, posY)
    }

    const onMouseMove = (e: MouseEvent) => {
      const p = pointers[0]
      if (!p.down) return
      const rect = canvasEl.getBoundingClientRect()
      const posX = scaleByPixelRatio(e.clientX - rect.left)
      const posY = scaleByPixelRatio(e.clientY - rect.top)
      updatePointerMoveData(p, posX, posY)
    }

    const onMouseUp = () => updatePointerUpData(pointers[0])

    canvasEl.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // ── Touch events ────────────────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const touches = e.targetTouches
      while (touches.length >= pointers.length)
        pointers.push(pointerPrototype())
      const rect = canvasEl.getBoundingClientRect()
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX - rect.left)
        const posY = scaleByPixelRatio(touches[i].clientY - rect.top)
        updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY)
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touches = e.targetTouches
      const rect = canvasEl.getBoundingClientRect()
      for (let i = 0; i < touches.length; i++) {
        const p = pointers[i + 1]
        if (!p.down) continue
        const posX = scaleByPixelRatio(touches[i].clientX - rect.left)
        const posY = scaleByPixelRatio(touches[i].clientY - rect.top)
        updatePointerMoveData(p, posX, posY)
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      const touches = e.changedTouches
      for (let i = 0; i < touches.length; i++) {
        const p = pointers.find(p => p.id === touches[i].identifier)
        if (p == null) continue
        updatePointerUpData(p)
      }
    }

    canvasEl.addEventListener('touchstart', onTouchStart, { passive: false })
    canvasEl.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)

    // ── Keyboard ────────────────────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyP') cfg.PAUSED = !cfg.PAUSED
      if (e.key === ' ') splatStack.push(Math.floor(Math.random() * 20) + 5)
    }
    window.addEventListener('keydown', onKeyDown)

    // ── Main loop ───────────────────────────────────────────────────────────
    initFramebuffers()
    multipleSplats(Math.floor(Math.random() * 20) + 5)

    let lastUpdateTime = Date.now()
    let colorUpdateTimer = 0

    let autoSplatTimer = 0

    function update() {
      const now = Date.now()
      let dt = (now - lastUpdateTime) / 1000
      dt = Math.min(dt, 0.016666)
      lastUpdateTime = now

      if (resizeCanvas()) initFramebuffers()

      // Color update
      if (cfg.COLORFUL) {
        colorUpdateTimer += dt * cfg.COLOR_UPDATE_SPEED
        if (colorUpdateTimer >= 1) {
          colorUpdateTimer = wrap(colorUpdateTimer, 0, 1)
          pointers.forEach(p => { p.color = generateColor() })
        }
      }

      // Auto splats
      if (!cfg.PAUSED && cfg.AUTO_SPLAT_INTERVAL > 0) {
        autoSplatTimer += dt * 1000
        if (autoSplatTimer >= cfg.AUTO_SPLAT_INTERVAL) {
          autoSplatTimer = 0
          splatStack.push(Math.floor(Math.random() * 8) + 3)
        }
      }

      // Process splat stack
      while (splatStack.length > 0) {
        multipleSplats(splatStack.pop()!)
      }

      // Process pointer inputs
      pointers.forEach(p => {
        if (p.moved) {
          p.moved = false
          splatPointer(p)
        }
      })

      if (!cfg.PAUSED) step(dt)
      render(null)

      animationId = requestAnimationFrame(update)
    }

    animationId = requestAnimationFrame(update)

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId)
      canvasEl.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      canvasEl.removeEventListener('touchstart', onTouchStart)
      canvasEl.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [cfg.AUTO_SPLAT_INTERVAL])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}

function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0, texcoordY: 0,
    prevTexcoordX: 0, prevTexcoordY: 0,
    deltaX: 0, deltaY: 0,
    down: false, moved: false,
    color: [30, 0, 300]
  }
}

function wrap(value: number, min: number, max: number) {
  const range = max - min
  return range === 0 ? min : ((value - min) % range) + min
}

export default WebGLFluid
