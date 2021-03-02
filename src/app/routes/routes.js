const express = require('express');
const Entity = require('../../domains/models/Entity');
const app = express.Router()
const service = require('./../../domains/core/service/service')
const factoryView = require('../Facviews')
const regex = new RegExp('/^[a-zA-Z]+$/');

app.get('/', async (req ,res ) => {
    try{
        const entities = await service.getEntities();
        
        const views = factoryView.createViewsFromDtos(entities);

        res.status(200).send(views);
    }catch(ex){
        console.error(ex);
        res.status(500).send('error');
    }
});


app.get('/:id', async (req, res ) => {
    const id = req.params['id'];
    if (regex.test(id))
    res.status(400).send("only characters accepted"); 

    const entity = await service.getEntityById(id);

    res.status(200).send(factoryView.createViewFromDto(entity));
});

app.post('/', async (req, res ) => {
    try{
        console.log(req.body)
        regex.test(req.body.id);
        if (regex.test(req.body.id))
            res.status(400).send("only characters accepted"); 
        
            const post = {
            id: req.body.id,
            content: req.body.content
        };
        const entity = await service.addEntity(post);
        res.status(201).send(factoryView.createViewFromDto(entity));
    }catch(ex){
        console.error(ex);
        res.status(500).send('error')
    }
});


app.delete('/:id',  async (req, res ) => {
    try{
        if (regex.test(req.body.id))
        res.send("only characters accepted"); 

        const id = req.params['id'];
        const entity = await service.deleteEntities(id);
        res.status(200).send(entity);
    }catch(ex){
        res.status(500).send('error')
    }
});

module.exports = app;
