const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt , GraphQLList} = graphql;

// var books = [
//     { name: "1Wind", genre: "1Fantasy", id: "1", authortype: "1" },
//     { name: "2Wind", genre: "2Fantasy", id: "2", authortype: "2" },
//     { name: "3Wind", genre: "3Fantasy", id: "3", authortype: "3" },
//     { name: "4Wind", genre: "2Fantasy", id: "2", authortype: "1" },
//     { name: "5Wind", genre: "3Fantasy", id: "3", authortype: "2" },
//     { name: "6Wind", genre: "2Fantasy", id: "2", authortype: "2" },
//     { name: "7Wind", genre: "3Fantasy", id: "3", authortype: "3" }
// ]


// var authors = [
//     { name: "Patrick", age: 44, id: '1' },
//     { name: "Richard", age: 59, id: '2' },
//     { name: "john", age: 64, id: '3' }
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authortype: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, { id: parent.authortype });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authortype: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id });
            }            
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return books
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
