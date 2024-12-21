const errorHandler=(err,req,res,next)=>{
const constant=require("../constants")
    const statusCode= res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            res.json(
                {
                    title:"Validation Field",
                    message: err.message,
                    stacktrace: err.stack
                })
                case constant.NOT_FOUND:
                    res.json({
                        title: "Not Found",
                        message: err.message,
                        stacktrace: err.stack
                    })
                    break
                    case constant.FORBIDDEN:
                    res.json({
                        title: "Forbidden",
                        message: err.message,
                        stacktrace: err.stack
                    })
                    break
                    case constant.UNAUTHoRIZED:
                        res.json({
                            title: "Unautharoized",
                            message: err.message,
                            stacktrace: err.stack
                        })
                        break
                    case constant.SERVER_ERROR:
                    res.json({
                        title: "Server error",
                        message: err.message,
                        stacktrace: err.stack
                    })
                    default:
                    console.log('No Error , all good !')
                    break;
    }
    res.json({message: err.message, stacktrace: err.stack})


}

module.exports=errorHandler