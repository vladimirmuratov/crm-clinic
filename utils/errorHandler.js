module.exports = function (res, error) {
    res.status(500).json({
        message: error.message ? error.message : error,
        success: false
    })
}
