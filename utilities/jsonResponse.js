
/**
 * @param { Response } res
 * @param { number } statusCode 
 * @param { string } message 
 * @param { {<T>} | Array<T>}  data 
 */
exports.jsonResponse = (res, statusCode,status, message, data) =>{
    res.status(statusCode).json({
        status,
        message,
        data,

    })
}