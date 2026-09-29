class ApiError extends Error {
    constructor(
        statusCode,
        massage,
        errors = [],
        stack=""
    )
    {
        super(massage)
        this.statusCode = statusCode,
        this.massage = massage,
        this.success = false,
        this.data = null
        this.errors = errors

          if(stack) {
        this.stack = stack

    }else{
     Error.captureStackTrace(this,this.constructor)
    }
    }

  
}

export {ApiError}