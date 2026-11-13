import express, { json } from "express"
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import { userModel } from "./database/user.model.js";
import userRouter from "./src/module/user.router.js";
import cors from 'cors'
import bcrypt from "bcrypt";  

export const hostIP=(process.env.IP_ADDRESS)
export const host=(process.env.DATA_BASE_HOST)
export const port=(process.env.PORT_USER)
export const secret_key=(process.env.SECRET_KEY)
export const mail_mail=(process.env.NODE_MAILER_MAIL)
export const mail_pass=(process.env.NODE_MAILER_KEY)
export const expiration = Number(process.env.SESSION_TIME_MINUTES) || 1440;

const seedAdminUser = async () => {
    try {
        const existingAdmin = await userModel.findOne({ email: "admin@admin.com" });
        
        if (!existingAdmin) {
            // Hash the password explicitly using your exact pattern
            const hashedPassword = bcrypt.hashSync(process.env.ADMIN_USER_PASSWORD, 8);

            await userModel.create({
                name: "Admin",
                email: "admin@admin.com",
                password: hashedPassword, // Store the securely hashed password
                emailConfirmed: true,
                role: "admin"
            });
            console.log("Default admin user created successfully.");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error seeding admin user:", error.message);
    }
};


dbConnection(host)
seedAdminUser();
const app=express()
app.use(cors())
app.use(express.json())
app.use(userRouter)

app.use((err,req,res,next)=>{
 
    res.status(500).json({error:err.message})
})
app.listen(port,()=>{
    console.log("user services are ON",host,"port:",port)
})
 