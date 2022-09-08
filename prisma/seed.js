const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {
    getHashPassword
} = require('server/utils/hashing');
async function seed() {
    const createAdmin = await prisma.user.create({
        data: {
            username: 'myadmin',
            password: getHashPassword('1234'),
            role:'ADMIN',
            movie:{
                title:'A cat in the hood',
                description:'Hollywood',
                runtimeMins:60
            }
        }
    });
    console.log({ createAdmin });
    const createUser = await prisma.user.create({
        data: {
            username: 'gybgivee',
            password: getHashPassword('1234'),
            role:'USER'
        }
    });
    console.log({ createUser });



    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
