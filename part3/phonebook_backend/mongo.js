const mongoose = require("mongoose")

const argumentCount = process.argv.length

switch (true) {
  case argumentCount < 3:
    console.log("Give Password as argument")
    process.exit(1)
    break;
  case argumentCount == 4:
    console.log("Please provide a number")
    process.exit(1)
    break;
  case argumentCount > 5:
    console.log("Too many arguments")
    process.exit(1)
    break;
}

const password = process.argv[2]

const url = `mongodb+srv://jonasbeck:${password}@cluster0.ehftotg.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (argumentCount == 3) {
  // Get all objects
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      // Print everything in table
      console.log(person.name, person.number)
    })
    // Close connection after succesfully displaying everything in table
    mongoose.connection.close()
  })
} else {
  // Create new person using CLI Arguments
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  // Save new object
  person.save().then(() => {
    // Close connection after succesfully saving to database
    mongoose.connection.close()
  })
}






