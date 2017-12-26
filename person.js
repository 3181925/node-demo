function person(name) {
    this.name = name;
    this.say = function() {
        console.log('my name is ' + this.name)
    }
}
module.exports = person;