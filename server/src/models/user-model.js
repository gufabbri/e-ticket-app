const bcrypt = require("bcrypt");
const userDao = require("../dao/user-dao");
const { InvalidArgumentError } = require("../../errors/errors");
const validations = require("../validations");

class User {

   constructor(user) {
      this.uid = user.uid;
      this.name = user.name;
      this.email = user.email;
      this.age = user.age;
      this.type = user.type;
      this.senhaHash = user.senhaHash;

      this.valida();
   }

   async addUser() {
      if (await User.searchByEmail(this.email)) {
         throw new InvalidArgumentError("O usuário já existe!")
      }

      return userDao.addUser(this)
   }

   static async searchByEmail(email) {
      const user = await userDao.searchByEmail(email);
      if (!user) {
         return null;
      }
   }

   static async searchById(id) {
      const user = await userDao.searchById(id);
      if (!user) {
         return null;
      }

      return new User(user)
   }

   static listUser() {
      return userDao.listUser();
   }
   
   async deleteUser() {
      return userDao.deleteUser(this);
   }   

   valida() {
      validations.campoStringNaoNulo(this.name, "name");
      validations.campoStringNaoNulo(this.email, "email");
      validations.campoStringNaoNulo(this.age, "age");
   }

   async addPassword(password) {
      validations.campoStringNaoNulo(password, "senha");
      validations.campoTamanhoMinimo(password, "senha", 8);
      validations.campoTamanhoMaximo(password, "senha", 64);

      this.senhaHash = gerarSenhaHash(password);
   }

   static gerarSenhaHash(senha) {
      const custoHash = 12;
      return bcrypt.hash(senha, custoHash)
   }
}

module.exports = User;