var roleRepairer = {
    run: function(creep) {
        
        if(creep.memory.building == true && creep.carry.energy == 0) {
            creep.memory.building = false;
            
        }
        else if (creep.memory.building == false && creep.carry.energy == creep.carryCapacity || creep.memory.building == true) {
            creep.memory.building = true;
            
            const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
            });
    
            targets.sort((a,b) => a.hits - b.hits);
    
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    creep.say("Repairing");
                }
            }
        }
        
        
        if(creep.memory.building == false) {
            const Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > 0
        })
        
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            }
            
            
            if(Container == null) {
                if(creep.store.getFreeCapacity() > 0) {
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.say('🔄 harvest');
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        
        }
            }
            creep.memory.building = true;
        }
        else {
            var EnergyStructures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                || s.structureType == STRUCTURE_EXTENSION)
                                && s.energy < s.energyCapacity
        })
            if(creep.transfer(EnergyStructures) == ERR_NOT_IN_RANGE) {
                creep.moveTo(EnergyStructures)
            }
        }
    }
};

module.exports = roleRepairer;
