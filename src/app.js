const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  response.json(repository);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) return response.sendStatus(400);

  repositories[repositoryIndex].title = title ? title : repositories[repositoryIndex].title;
  repositories[repositoryIndex].url = url ? url : repositories[repositoryIndex].url;
  repositories[repositoryIndex].techs = techs ? techs : repositories[repositoryIndex].techs;

  response.json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) return response.sendStatus(400);

  repositories.splice(repositoryIndex, 1);

  response.sendStatus(204);

});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) response.sendStatus(400);

  repositories[repositoryIndex].likes++;

  response.json(repositories[repositoryIndex]);

});

module.exports = app;
