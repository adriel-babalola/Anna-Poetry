import mongoose from 'mongoose'

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://boluwatife12700_db_user:qdNDICyOWuWDcGJ9@blog-db.bsl4haa.mongodb.net/appName=blog-db')
    console.log('DB Connected');
    
}