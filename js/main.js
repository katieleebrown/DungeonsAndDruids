document.querySelector('#wildShapeButton').addEventListener('click', checkMonster)

function checkMonster() {
    let charName = document.querySelector('#characterName').value 
    let charSubclass = document.querySelector('#subclass').value 
    let charLevel = document.querySelector('#level').value 
    let monsterInput = document.querySelector('#monsterInput').value
    monsterInput = monsterInput.split(' ').join(', ')

    // would it be easier to just have a moon druid true or false? Or maybe extend druid class? If druid = moon, create new MoonDruid instead?
    let character = new Druid(charName, charSubclass, charLevel)
    
    // TODO: Need API url and to double check monster naming conventions (current const removes spaces and makes one long word, may need plus?)
    let url = `${monsterInput}`

    fetch(url) 
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //TODO:  need to make lets for all monster input types

            let monster = new Monster()

            
            
            }
        )

    // TODO: Need logic for all reasons the monster would NOT work. 
    // Should this logic be a separate function? One for moon druid, one for all other druids?
    if (monster.checkBeast() == false) {
        
    }
}

// Creates a druid for each input
class Druid {
    constructor(name, subclass, level) {
        this.name = name
        this.subclass = subclass
        this.level = level
    }
    // TODO: create functions that compare druid info to monster info? Or vice versa? Should all of this just exist in the monster?
}

// Creates a monster for each input
class Monster {
    constructor(type, challengeRating, swim, fly) {
        this.type = type
        this.cr = challengeRating
        this.swim = swim
        this.fly = fly
    }
    // Returns true if monster is a beast, false if not
    isBeast() {
        return this.type === 'beast'
    }

    // TODO: Check to confirm how API handles monsters that do not have swim/fly speeds.
    hasSwimSpeed() {
        return this.swim !== 0
    }
    hasFlySpeed() {
        return this.fly !== 0
    }

}