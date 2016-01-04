/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/problems              ->  index
 * POST    /api/problems             ->  create
 * GET     /api/problems/:id          ->  show
 * PUT     /api/problems/:id          ->  update
 * DELETE  /api/problems/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Problem = require('./problem.model');

function validationErrro(res, statusCode) {
  
}

function handleError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      //console.log('entity:' + JSON.stringify(entity));
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Problems
exports.index = function(req, res) {
  Problem.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Problem from the DB
exports.show = function(req, res) {
  Problem.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Problem in the DB
exports.create = function(req, res) {
  Problem.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Problem in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Problem.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Problem from the DB
exports.destroy = function(req, res) {
  Problem.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
