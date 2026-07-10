import prisma from "../../config/prisma.js"


export const authRepository={
    create:async(data:{
        name:string,
        email:string,
        password:string
    })=>{
        return await prisma.user.create({data})
    },
    findById:async(id:string)=>{
        return await prisma.user.findUnique({
            where:{
                id
            }
        })
    },
    findByEmail: async (email: string) => {
        return await prisma.user.findUnique({ where: { email } });
  },
}