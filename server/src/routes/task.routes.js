module.exports = app => {
    const tasks = require('../controllers/task.controller.js');
    const { authJwt } = require('../middleware')

    var router = require('express').Router();
  
    router.post('/', [authJwt.verifyToken], tasks.create);
    router.get('/', [authJwt.verifyToken], tasks.findAll);
    router.get('/completed', [authJwt.verifyToken], tasks.findAllCompleted);
    router.get('/favourites', [authJwt.verifyToken], tasks.findAllImportant);
    router.get('/:id', [authJwt.verifyToken], tasks.findOne);
    router.put('/:id', [authJwt.verifyToken], tasks.update);
    router.delete('/:id', [authJwt.verifyToken], tasks.delete);
    router.delete('/', [authJwt.verifyToken], tasks.deleteAll);
  
    app.use('/api/v1/tasks', router);
  };