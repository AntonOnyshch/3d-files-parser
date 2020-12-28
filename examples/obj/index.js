import '../../dist/volume-File.min.js';

window.readFile = async function(input) {
  if(input !== undefined && input.files.length === 1) {
    const objFile = volumeFile.default.getObjFile(input.files[0]);
    
    await objFile.read();

    const model = objFile.model;

    const modelCtnDiv = document.getElementById('obj-model-ctn');

    modelCtnDiv.children[0].children[1].textContent = model.vertices.length;
    modelCtnDiv.children[1].children[1].textContent = model.faces.length;
    modelCtnDiv.children[2].children[1].textContent = model.verticesNormals.length;
  }
}
