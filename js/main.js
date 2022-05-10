window.addEventListener('load', makeDropdown)
document.querySelector('#wildShapeButton').addEventListener('click', checkWildShape)

// Updates Dropdown options on Page Load
function makeDropdown() {
    let dropdown = document.querySelector('#monsterInput')

    fetch('https://api.open5e.com/monsters/?limit=150&type=beast')
        .then(res => res.json())
        .then(data => {
            data.results.map(item => dropdown.appendChild(new Option(item.name, item.slug)).cloneNode(true))
        })
}


async function checkWildShape() {
    let charName = document.querySelector('#characterName').value 
    let charSubclass = document.querySelector('#subclass').value 
    let charLevel = document.querySelector('#level').value 
    let character
    
    if (charSubclass !== 'moon') {
        character = new Druid(charName, charSubclass, charLevel)
    } else {
        character = new MoonDruid(charName, charSubclass, charLevel)
    }

    let selectedMonster = await makeMonster()
    console.log(selectedMonster)
    let response = character.canWildShape(selectedMonster)

    document.querySelector('#canWildShapeAnswer').innerText = response

}

function makeMonster() {
    let monsterInput = document.querySelector('#monsterInput').value
        monsterInput = monsterInput.split('-').join(' ') 
    let monName = 'name'
    let monType = 'beast'
    let monCR = 0
    let monSpeeds = []
    let url = `https://api.open5e.com/monsters/?search=${monsterInput}`
    
    return fetch(url) 
        .then(res => res.json())
        .then(data => {
            console.log(data)
            monName = data.results[0].name
            monType = data.results[0].type
            monCR = Number(data.results[0].challenge_rating)
            monSpeeds = data.results[0].speed

            console.log(monName, monType, monCR, monSpeeds)
            return new Monster(monName, monType, monCR, monSpeeds)
            }
        )

}

// Creates a druid for each input
class Druid {
    constructor(name, subclass, level) {
        this.name = name
        this.subclass = subclass
        this.level = level
        this.wildShape = true
        this.reason = []
    }

    canWildShape(selectedMonster) {
        let challengeRating = selectedMonster.challengeRating
        let monSpeeds = selectedMonster.monsterSpeed
        let monName = selectedMonster.name
        this.canCR(challengeRating)
        this.canSwimOrFly(monSpeeds)

        if (this.wildShape == true) {
            return `Yes, ${this.name} can wildshape into a ${selectedMonster.name}` 
        } else {
            let reasonList = this.reason.join(',')
            return `No, ${this.name} cannot wild shape into a ${monName}. ${reasonList}`
        }
    }

    canCR(monsterCR) {
        if (this.level <= 1) {
            this.wildShape = false
            this.reason.push('Your level is too low to Wild Shape.') 
        } else if ((this.level < 4 && monsterCR > 1/4) || (this.level < 8 && monsterCR > 1/2) || (this.level >= 8 && monsterCR > 1)) {
            this.wildShape = false
            this.reason.push(`The beast's CR is too high to Wild Shape`) 
        } 
    }

    canSwimOrFly(monsterSpeed) {
        if((this.level > 1 && level < 4) && (monsterSpeed.hasOwnProperty('swim'))) {
            this.wildShape = false
            this.reason.push('Your level is too low to wildshape into a beast with a swim speed.')
        } else if ((this.level < 1 && this.level > 4) && (monsterSpeed.hasOwnProperty('fly'))) {
            this.wildShape = false
            this.reason.push('Your level is too low to wildshape into a beast with a fly speed.')
        } else if ((this.level >=4 && this.level < 8) && (monsterSpeed.hasOwnProperty('fly'))) {
            this.wildShape = false
            this.reason.push('Your level is too low to wildshape into a beast with a fly speed.')
        } else {
            return
        }
    }
}

class MoonDruid extends Druid{
    constructor(name, subclass, level) {
        super(name, subclass, level)
    }
    canCR(monsterCR) {
        if (this.level <= 1) {
            this.wildShape = false
            this.reason.push('Your level is too low to Wild Shape.') 
        } else if ((this.level <= 4 && monsterCR > 1) || (monsterCR > (Math.floor(this.level / 3)))) {
            this.wildShape = false
            this.reason.push(`The beast's CR is too high to Wild Shape`) 
        }
    }
}

// Creates a monster for each input
class Monster {
    constructor(name, type, challengeRating, monsterSpeed) {
        this.name = name
        this.type = type
        this.challengeRating = challengeRating
        this.monsterSpeed = monsterSpeed
    }

}