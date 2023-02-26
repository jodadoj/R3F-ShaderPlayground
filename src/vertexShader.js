const vertexShader = `
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * 4.0) * 0.2;
  modelPosition.y += sin(modelPosition.z * 4.0) * 0.2;
  modelPosition.x += sin(modelPosition.y * 4.0) * 0.2;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

export default vertexShader;

// default example

/*

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
  }

// The role of the vertex shader is to position each vertex of a geometry. 
// In simpler terms, this shader function allows you to programmatically 
// alter the shape of your geometry and, potentially, "make things move".

// In this case, this function runs for every vertex and sets a property called 
// gl_Position that contains the x,y,z coordinates of a given vertex on the screen.

*/
