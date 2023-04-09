const {gql} = require('apollo-server');

module.exports= gql`

type User {
    username: String!
    email: String!
    password: String!
}

input UserInput{
    username: String
    email: String
    password: String
}

type Employee {
    _id: String
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Int
}

type Query{
    login(
        username: String
        password: String):Boolean
    getAllEmployees: [Employee]
    getEmployee (_id: String!): Employee
}

type Mutation {
    signup( 
        username: String
        email: String
        password: String): User
    addEmployee(
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: Int): Employee
    updateEmployee(
        _id : String! 
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: Int): Boolean
    deleteEmployee(_id : String!): Boolean
}

`