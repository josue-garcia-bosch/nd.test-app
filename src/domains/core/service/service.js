const Entity = require('../../models/Entity')


async function addEntity(newEntity) {
    console.log(newEntity);
    const entityDto = new Entity({
        entityId : newEntity.id,
        content : newEntity.content
    });
    console.log(entityDto);

    const entity = await entityDto.save();
    
    entity.entityId = makeIdShortly(entity.entityId);
    return entity;
}


async function getEntityById(entityId){

    const translatedId = unMakeIdShortly(entityId);
    console.log(translatedId)
    
    const entity = await Entity.findOne({entityId: translatedId});
    entity.entityId = makeIdShortly(translatedId)

    return entity

}


async function getEntities(){

    const entity = await Entity.find();

    return entity.map((it) => { 
        it.id = makeIdShortly(entity.id)
        return entity
    })
}

async function deleteEntities(entityId){

    const translatedId = unMakeIdShortly(entityId);
    const deleted = await Entity.deleteOne({'entityId': translatedId});

    return deleted
}


//eleminar repetidos y cuando una letra aparesca mas de una vez, hacemos discriminacion. 
function makeIdShortly(id){
    const dic={}; 
    for(key in id){
        if(!dic[id[key]])
            dic[id[key]] = 1;
        else dic[id[key]]++;
    }

    let idResult = '';
    for(key in dic){
        if(dic[key]>1){
            const content = `${dic[key]}${key}`;
            idResult += content;
        }
        else{
            idResult += key;
        }
    }

    return idResult
}


function unMakeIdShortly(id){
   
    let idResult = '';
    for(key in id){
        const number = Number(id[key]) 
        if(!number)   
        {
            idResult += id[key];
        }else{
            for (i = 0; i < number-1; i++) {
                const letter = id[`${Number(key)+1}`];
                idResult += letter;
              } 
        }
    }

    return idResult
}



module.exports = {addEntity, getEntities,getEntityById,deleteEntities, makeIdShortly};