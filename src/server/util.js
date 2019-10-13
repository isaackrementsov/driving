module.exports = {
    errorMsg: (message, code) => {return {error: message, code}},
    successMsg: () => {return {success: true}}
}
