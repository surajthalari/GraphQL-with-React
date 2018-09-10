const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

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
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authortype: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, { id: parent.authortype });
                return Author.findById(parent.id);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books,{authortype: parent.id})
                return Book.find({ authortype: parent.id });
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id });
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
                return Author.find({});
            }
        }
    }
});


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authortype: { type: GraphQLID }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authortype: args.authortype
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});
