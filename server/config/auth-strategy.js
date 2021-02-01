const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require('../models/user-model');

function verificaUsuario(user) {
   if(!user) 
      throw new Error();
}

async function verificaSenha(senha, senhaHash) {
   const senhaValida = await bcrypt.compare(senha, senhaHash);
   if(!senha) {
      throw new Error();
   }
}

passport.use(
   new LocalStrategy({
      usernameField: "email",
      passwordField: "senha",
      session: false
   },async  (email, senha, done) => {
      try {
         const user = await User.buscarPorEmail(email);
         verificaUsuario(user);
         await verificaSenha(senha, user.senhaHash);         
         done(null, user);

      } catch (err) {
         done(err);
      }
   })
)

module.exports = AuthStrategy;