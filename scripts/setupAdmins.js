import { ConnectDB } from '../lib/config/db.js'
import AdminModel from '../lib/model/AdminModel.js'
import bcrypt from 'bcryptjs'

const setupAdmins = async () => {
    try {
        await ConnectDB()
        
        // Check if any admin exists
        const existingAdmins = await AdminModel.find()
        
        if (existingAdmins.length > 0) {
            console.log('Admins already exist:', existingAdmins.map(a => a.email))
            process.exit(0)
        }

        // Create two admin accounts
        const admins = [
            {
                name: 'Owner',
                email: 'owner@example.com',
                password: 'Owner@12345' // CHANGE THIS
            },
            {
                name: 'Admin',
                email: 'admin@example.com',
                password: 'Admin@12345' // CHANGE THIS
            }
        ]

        for (const adminData of admins) {
            // Hash password before creating admin
            const hashedPassword = await bcrypt.hash(adminData.password, 10)
            const admin = new AdminModel({
                ...adminData,
                password: hashedPassword
            })
            await admin.save()
            console.log(`✓ Created admin: ${adminData.email}`)
        }

        console.log('\n✓ Setup complete! Update the passwords in your environment or directly in MongoDB')
        process.exit(0)
    } catch (error) {
        console.error('Setup error:', error)
        process.exit(1)
    }
}

setupAdmins()
