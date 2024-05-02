registerUser = (req, res) => {
    res.json({message: "user registered"})
}

fetchUser = (req, res) => {
    res.json({message: "user fetched"})
}

removeUser = (req, res) => {
    res.json({message: "user removed"})
}

updateUser = (req, res) => {
    res.json({message: "user updated"})
}

module.exports = {
    registerUser,
    fetchUser,
    removeUser,
    updateUser
}