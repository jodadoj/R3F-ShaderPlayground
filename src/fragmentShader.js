const fragmentShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  float distort = 2.0 * vDisplacement * u_intensity;

  vec3 color = vec3(abs(vUv - 0.5) * 2.0  * (1.0 - distort), 1.0);
  
  gl_FragColor = vec4(color ,1.0);
}

`;

export default fragmentShader;

/*
const fragmentShader = `
varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

void main() {
  // "Normalizing" with an arbitrary value
  // We'll see a cleaner technique later :)   
  vec2 normalizedPixel = gl_FragCoord.xy/1600.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(color,1.0);
}
  `;

  
  The role of the Fragment Shader is to set the color of each 
  visible pixel of a geometry. This function sets the color in 
  RGBA format, which we're already familiar with thanks to CSS 
  (The only difference is that the values range from 0 to 1 
    instead of 0 to 255: 
    1.0, 1.0, 1.0 is white and 
    0.0, 0.0, 0.0 is black).
  
  */
