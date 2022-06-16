var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSoldier = require('role.soldier');
var roleTowerLoader = require('role.LoadTower');
var DefenceSystem = require('function.Defence');
var roleRepairer= require('role.Repairer');
var random_int = Math.floor(Math.random()*(2-1+1)+1);
var tower = Game.getObjectById('62a2c0a0aeb2d81b3c1295b1')


module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var energyAvailable = 0;
    energyAvailable += Game.spawns.Spawn1.energy;
    _.filter(Game.structures, function(structure){
    if (structure.structureType == STRUCTURE_EXTENSION){
    energyAvailable += structure.energy;
    }
    if (structure.structureType == STRUCTURE_CONTAINER){
    energyAvailable += structure.energy;
    }})
    
    // Shows energy available to Spawn1 plus extensions
    console.log('Available energy:', energyAvailable);

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);
    var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    console.log('Soldiers: ' + soldiers.length);
    var TowerLoaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerLoader');
    console.log('Tower Loaders: ' + TowerLoaders.length);
    
  

    if(builders.length < 2 && harvesters.length > 1) {
        if(energyAvailable > 750) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, CARRY, MOVE], undefined, {role: 'builder'});
            var newName = 'Builder_Normal' + Game.time;
            console.log('Spawning new normal_builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK, MOVE], newName,
                {memory: {role: 'builder', building: false}});
        } else {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
            var newName = 'Builder_Basic' + Game.time;
            
            console.log('Spawning new basic_builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'builder', building: false}});            
            }
        }
        
    if(repairers.length < 2 && harvesters.length > 1) {
        if(energyAvailable > 750) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, CARRY, MOVE], undefined, {role: 'builder'});
            var newName = 'Repairer' + Game.time;
            console.log('Spawning new Repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK, MOVE], newName,
                {memory: {role: 'builder', building: false}});
        } else {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
            var newName = 'Repairer' + Game.time;
            
            console.log('Spawning new repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'repairer', building: false}});            
            }
        }
        
    if(upgraders.length < 3) {
        if(energyAvailable > 700){
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE, WORK, MOVE, MOVE, WORK, CARRY, WORK, MOVE], undefined, {role: 'upgrader'});
            var newName = 'Upgrader_Normal' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE, WORK, MOVE, MOVE, WORK, CARRY, WORK, MOVE], newName,
                {memory: {role: 'upgrader'}});
        
        } else {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        var newName = 'Upgrader_Basic' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});            
        }
    }
    if(harvesters.length < 3) {
        if(energyAvailable > 700) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE, WORK, MOVE, MOVE, WORK, CARRY, WORK, MOVE], undefined, {role: 'harvester'});
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE, WORK, MOVE, MOVE, WORK, CARRY, WORK, MOVE], newName,
                {memory: {role: 'harvester'}});
        } else {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        }
    
    }

    if(TowerLoaders.length < 2 && harvesters.length > 1) {
        if(energyAvailable > 500) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE, WORK, MOVE, MOVE, WORK], undefined, {role: 'towerLoader'});
            var newName = 'Tower Loader Normal' + Game.time;
            console.log('Spawning new Tower Loader Normal: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK], newName,
                {memory: {role: 'towerLoader'}});
        } else {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE, WORK], undefined, {role: 'towerLoader'});
            var newName = 'Tower Loader Basic' + Game.time;
            console.log('Spawning new Tower Loader Basic: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK], newName,
                {memory: {role: 'towerLoader'}});
        }
            
        }
    
    if(soldiers.length < 1) {
        if(energyAvailable > 500){
            var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK], undefined, {role: 'soldier'});
            var newName = 'Soldier_Normal' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK], newName,
                {memory: {role: 'soldier'}});
        
        } else {
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH, MOVE, RANGED_ATTACK], undefined, {role: 'soldier'});
        var newName = 'Soldier_Basic' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH, MOVE, RANGED_ATTACK], newName, {memory: {role: 'soldier'}});            
        }
    }
    
    DefenceSystem.defendMyRoom('E58N13');
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        }
        if(creep.memory.role == 'towerLoader') {
            roleTowerLoader.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
    console.log('CPU Bucket:', Game.cpu.bucket);
    //console.log('Pixels', Game.PIXEL.amount);
    if (Game.cpu.bucket >= 10000)
    {
        Game.cpu.generatePixel();
    }
}

