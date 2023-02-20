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
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
}



input EmployeeInput{
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
}

type Query{
    login(
        username: String
        password: String):Boolean
    getAllEmployees: [Employee]
    getEmployee (ID: ID!): Employee
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
        salary: Float): Employee
    updateEmployee(
        ID : ID! 
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: Float): Boolean
    deleteEmployee(ID : ID!): Boolean
}

`