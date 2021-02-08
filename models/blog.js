const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//blog schema. the schema defines the structure of the model

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

//blog model. the model is based on schema. it surrounds the schema and provides an interface by which to communicate with database collection for that document type. It's usually capitalised.

//first argument: name of model. it will automatically look for the pluralised version of this collection in the database. second argument: the schema you want to use.

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;