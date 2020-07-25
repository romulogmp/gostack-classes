const { Router } = require('express');
const { uuid, isUuid } = require('uuidv4')

const routes = Router();
const projects = [];

function logRequest(request, response, next){
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}], ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next){
  const{ id } = request.params;
  if(isUuid(id)){ return next() }
  return response.status(400).json({error: "Invalid Id"})
}
//Aplicando middlewares
routes.use(logRequest);
//Aplicando middlewares baseado no parâmetro recebido
routes.use("/projects/:id", validateProjectId);

routes.get('/projects', (request, response)=>{
  const { title } = request.query;
  const results = title 
  ? projects.filter(project => project.title.includes(title))
  : projects;
  return response.json(results);
});

routes.post('/projects', (request, response)=>{
  const { title, owner } = request.body
  const project = { id: uuid(), title, owner};
  projects.push(project);
  return response.json(project);
});

routes.put('/projects/:id', (request, response)=>{
  const { id } = request.params;
  const {title, owner} = request.body;
  const projectIndex = projects.findIndex(project => project.id === id);
  if(projectIndex < 0){ 
    return response.status(404).json({error : "Project not found."})
  }
  const project = {
    id,
    title,
    owner,
  };
  projects[projectIndex] = project;
  return response.json(project);
});

routes.delete('/projects/:id', (request, response)=>{
  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);
  if(projectIndex < 0){ 
    return response.status(404).json({error : "Project not found."})
  }
  projects.splice(projectIndex, 1);
  return response.status(204).json();
});

module.exports = routes;