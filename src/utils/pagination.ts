export const pagination=(
    query:{
        page?:number
        limit?:number
    }
)=>{
    const page=query.page || 1

    const limit=query.limit || 10

    const skip=(page-1)*limit

    return {
        page,
        limit,
        skip
    }

}