const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getErrorCode } = require('../utils/errorCode');

const queryAllMovies = async() => {
    try {

        const movies = await prisma.movie.findMany();
        return {status:200,data:{movies}}

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "movie");
    }
}
const queryMoviesById = async(userId) => {
    try {

        const movies = await prisma.movie.findMany({
            where:{
                userId:Number(userId),
            }
        });
        return {status:200,data:{movies}}

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "movie");
    }
}
const createMovie = async(movie,userId)=>{
    const { title, description, runtimeMins } = movie;
    try{
        const movie = await prisma.movie.create({
            data:{
                title,
                description,
                runtimeMins,
                user:{
                    connect:{
                        id:Number(userId),
                    }
                }
            }
        });
        console.log({createMovie});
        return {status:201,data:{movie}};

    }catch(error){
        console.log({ error });
        return getErrorCode(error, "movie");
    }
}
module.exports = {
    queryAllMovies,
    createMovie,
    queryMoviesById
}