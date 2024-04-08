export const errorHandler = (req:any,res:any, next:any)=>{
    const error = new Error('Not found!');
    next(error);

    res.status(404).json({
        "Error":error.message
    })
};