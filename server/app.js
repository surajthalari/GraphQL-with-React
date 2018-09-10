const express = require('express');
const schema = require('./schema/schema');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
})
);

mongoose.connect('mongodb://Shawn:test123@ds249992.mlab.com:49992/gqlninja');
mongoose.connection.once('open', () => {
    console.log("connected");
})

app.listen(4001, () => {
    console.log("Listnening");
})
