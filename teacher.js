var person = require('./person.js');

function teacher(name) {
    person.apply(this, [name]);
    this.teacher = function() {
        console.log(this.name + 'teaching')
    }
}
module.exports = teacher;