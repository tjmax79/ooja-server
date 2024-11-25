
import validator from  'validator';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        
    },
    userName:{
        type:String,
        required:true,
        unique:true

    },
    lastName:{
        type:String,
        required: true,
        
    },
    age: {
        type:String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        unique :true,
    },
    password:{
        type:String,
        required: true,
        minlength: 6
    },

});

userSchema.statics.signup = async function (firstName,userName, lastName, age,email, password){
    
    // check if all field are filled
    try{

    if(!firstName||!userName ||!lastName||!age || !email || !password){
        throw  Error('All fields are required');
    }
      // check if email is valid and not already in use
    const exists =await this.findOne({email});
    if(!validator.isEmail(email)){
        throw  Error ('Email is not valid');
    }
    if (exists) {
        throw Error('Email already in use')
    }
    
    // check if username is not already in use
    const usernameExists= await this.findOne({userName});
    if(usernameExists) {
        throw Error('Username is already in use')
    }

    // check if password is strong enough
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough, must be at least 8 characters long and contain at least one uppercase letter, onelowercase letter, one number and one special character")
    }

    // hash and salt password

    const salt=  bcrypt.genSaltSync(10);
    const hash=  bcrypt.hashSync(password, salt);

    const user = await this.create({firstName, userName, lastName,age,email: email.toLowerCase(), password:hash});

    return user;
} catch(error){
    console.log(error)
    throw error;
}

}

userSchema.statics.login= async function (email, password){
    try {
        // check if all fields are filled
        if (!email || !password){
            throw Error("All field must be filled")
        }
        //check if email is valid and not already in use
        const user = await this.findOne({email});
        if (!user) {
            throw Error('incorrect email')
        }

        // check if password is correct
        const match = await bcrypt.compare(password,user.password);
        if(!match) {
            throw Error("Incorrect Password");
        }
        return user;
    }catch (error){
        console.log(error)
        throw error;
    }
}

const User = mongoose.model('User', userSchema);

export default User;