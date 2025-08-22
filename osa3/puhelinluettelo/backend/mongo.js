const mongoose = require('mongoose')

const argc = process.argv.length

if (argc < 3 || argc === 4 || argc > 5) {
    console.log(
    'invalid arguments.\n' +
    'examples:\n' +
    '  node mongo.js <password>\n' +
    '  node mongo.js <password> "name" "number"'
    )
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.8nhuoou.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (argc === 3) {
    Contact.find({}).then(contacts => {
        console.log('phonebook:')
        for (const contact of contacts) {
            console.log(`${contact.name} ${contact.number}`)
        }
        mongoose.connection.close()
    })
} else {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
    })
    contact.save().then(() => {
        console.log(`added: ${contact.name} number ${contact.number} to phonebook`)
        mongoose.connection.close()
    })
}






