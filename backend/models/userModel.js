import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Method qui sera exécutée avant de "save" le user grâce à la method "pre" de mongoose
userSchema.pre("save", async function (next) {
  // Si le mdp n'a pas été modifié, on sort de la méthode sinon le hash du mdp sera modifié lors d'un simple changement de nom d'utilisateur par exemple et on ne pourra plus récupérer le bon hash, donc plus moyen de se connecter
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema)

export default User