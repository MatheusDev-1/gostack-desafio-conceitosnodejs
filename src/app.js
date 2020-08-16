const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repository = { id: uuid(),
                       url,
                       title,
                       techs,
                       likes: 0 };

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  if(!repositories.find(repository => repository.id == id)){
   
    return response.status(400).json({error: "Repository not found"})
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  const repository = { 
    id,
    url,
    title,
    techs,
    likes: 0 };   

  repositories[repositoryIndex] = repository;


  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if(!repositories.find(repository => repository.id == id)){
    return response.status(400).json({error: "Repository not found"})
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if(!repositories.find(repository => repository.id == id)){
    return response.status(400).json({error: "Repository not found"})
  }

  const repository = repositories.find(repository => repository.id == id)

  repository.likes += 1

  return response.status(200).json(repository)
});

module.exports = app;
