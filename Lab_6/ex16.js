const person = {
    name: "John",
    returnName: function() {
      return this.name;
    }
  };

console.log(person.returnName());
