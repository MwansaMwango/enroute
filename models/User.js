const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email  : { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  pointsBalance: { type: Number },
},
{
  timestamps: true
});


/**
 * Password hash middleware.
 */
UserSchema.pre("save", async function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    await bcrypt
        .genSalt(10)
        .then((salt) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((err) => {
            return next(err);
        });
});

/**
 * Helper method for validating user's password.
 */
UserSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};



const User = mongoose.model("User", UserSchema);

module.exports = User;
