

const ResponseFormat = {
    build: (object, message, statusCode, statusType, token) => {
        return {
            data: object,
            statusCode: statusCode,
            message: message,
            statusType: statusType,
            token: token
        }
    },
    error: (object, message, statusCode, statusType) => {
        return {
            error: object,
            statusCode: statusCode,
            message: message,
            statusType: statusType
        }
    }
}

module.exports = ResponseFormat