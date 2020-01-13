function successMessage(message) {
    this.$notify({
        icon: 'fa fa-thumbs-up',
        message: message,
        type: 'success'
    })
}

function warningMessage(message) {
    this.$notify({
        icon: 'fa fa-lock',
        message: message,
        type: 'warning'
    })
}


module.exports = {
    successMessage,
    warningMessage
}