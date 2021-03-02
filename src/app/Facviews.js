function createViewFromDto(entity){
    console.log(entity)
    return {entityId: entity.entityId, content: entity.content }
}

function createViewsFromDtos(entities){
    const views = [];
    
    entities.forEach((entity)=>{
        views.push({entityId: entity.entityId, content: entity.content });
    })

    return views
}


module.exports = { createViewFromDto, createViewsFromDtos}