const Employee = require('../models/employeeModel');
const User = require('../models/userModel');

module.exports = {
    Query :{
    //login(username: String, password:String):Boolean
         async login(_, {username, password}){
            const user = await User.findOne({"username":username})
            if (user){
                const match = user.comparePassword(password)
                return match;
                } 
        },        
    
    //getAllEmployees(): [Employee]
        async getAllEmployees(){
            return await Employee.find()
        },
    

    //getEmployee (ID: ID!): Employee!
        async getEmployee(_, {ID}){
            return await Employee.findById(ID)
        },
    },
    Mutation: {
    //signup(user : User): Boolean
        async signup(_, {username, email, password}){
            const newUser = new User({
                username: username,
                email:email,
                password: password
            });

            const res = await newUser.save(); //MongoDb save
            return{
                id:res.id,
                ...res._doc
            }
        },

    //addEmployee(employee: Employee): Boolean
        async addEmployee(_, {first_name, last_name, email,
            gender, salary}){
                const newEmployee = new Employee({
                    first_name:first_name,
                    last_name:last_name,
                    email:email,
                    gender:gender,
                    salary:salary
                })
                const res= await newEmployee.save();
                return{
                id:res.id,
                ...res._doc
            }
        },
    

    //deleteEmployee(ID : ID!): Boolean
        async deleteEmployee(_,{ID}){
            const wasDeleted = (await Employee.deleteOne({_id:ID})).deletedCount;
            return wasDeleted;
        },
    //updateEmployee(ID : ID!, employee: Employee): Boolean
        async updateEmployee(_, {ID, first_name, last_name, email,
            gender, salary}){
                const wasEdited = (await Employee.updateOne({_id:ID}, {
                    first_name:first_name,
                    last_name:last_name,
                    email:email,
                    gender:gender,
                    salary:salary
                })).modifiedCount;

                return wasEdited;
        }

    }
}
