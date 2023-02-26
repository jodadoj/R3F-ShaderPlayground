const fragmentShader = `
void main() {

    gl_FragColor = vec4(0.9, 1.0, 1.0, 1.0);
  
  }
  `;

  export default fragmentShader;

  /*
  
  The role of the Fragment Shader is to set the color of each 
  visible pixel of a geometry. This function sets the color in 
  RGBA format, which we're already familiar with thanks to CSS 
  (The only difference is that the values range from 0 to 1 
    instead of 0 to 255: 
    1.0, 1.0, 1.0 is white and 
    0.0, 0.0, 0.0 is black).
  
  */