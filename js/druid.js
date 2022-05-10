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
        canCR(selectedMonster.monsterCR)
        canSwimOrFly(selectedMonster.monsterSpeed)

        if (wildShape == true) {
            return `Yes, ${this.name} can wildshape into a ${selectedMonster.name}` 
        } else {
            let reasonList = reason.split(' ')
            return `No, ${this.name} cannot wild shape into a ${selectedMonster.name}. ${reasonList}`
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
        if((this.level > 1 && level < 4) && (monsterSpeed.includes('swim'))) {
            this.wildShape = false
            this.reason.push('Your level is too low to wildshape into a beast with a swim speed.')
        } else if ((this.level < 1 && this.level > 4) && (monsterSpeed.includes('fly'))) {
            this.wildShape = false
            this.reason.push('Your level is too low to wildshape into a beast with a fly speed.')
        } else if ((this.level >=4 && this.level < 8) && (monsterSpeed.includes('fly'))) {
            this.wildShape = false
            this.reason.push('Your level is too low to wildshape into a beast with a fly speed.')
        }
    }
}

class MoonDruid extends Druid{
    constructor(name, subclass, level) {
        super(name, subclass, level, wildShape, reason)
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