const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
//const User = db.MentorUsers;
const mentorUser = db.MentorUsers;
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ userName, password }) {
    
    const mentorruser = await mentorUser.findOne({ userName });
    
    if (mentorruser && bcrypt.compareSync(password, mentorruser.hash)) {
        const token = jwt.sign({ sub: mentorruser.id }, config.secret, { expiresIn: '7d' });
       // throw 'Username "' + mentorruser + '" is already takaaen';
        return {
            ...mentorruser.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await mentorUser.find();
}

async function getById(id) {
    return await mentorUser.findById(id);
}

async function create(userParam) {
    // validate
    debugger;
    if (await mentorUser.findOne({ username: userParam.userName })) {
        throw 'Username "' + userParam.userType + '" is already takaaen';
    }

    const user = new mentorUser(userParam);

    // hash password
    if (userParam.password) {
        debugger;
        user.hash = bcrypt.hashSync(userParam.password, 10);
        user.userID = Math.floor(100000 + Math.random() * 900000);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await mentorUser.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.userName !== userParam.userName && await mentorUser.findOne({ username: userParam.userName })) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await mentorUser.findByIdAndRemove(id);
}