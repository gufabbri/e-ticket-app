const pool = require("../../infra/db");
const { InternalServerError } = require("../../errors/errors");

module.exports = {

   addUser: user => {
      return new Promise((resolve, reject) => {
         pool.query(`INSERT INTO user (
               name,
               email,
               senhaHash
            ) VALUES (?, ?, ?)`,
            [user.name, user.email, user.senhaHash],
            err => {
               if (err) {
                  reject(new InternalServerError("Erro ao adicionar o usuário!"));
               }

               return resolve();
            }
         );
      });
   },

   searchById: id => {
      return new Promise((resolve, reject) => {
         pool.query(`SELECT * 
                     FROM user 
                     WHERE uid = ?`,
            [id],
            (err, user) => {
               if (err) {
                  return reject("Não foi possível encontrar o usuário!");
               }

               return resolve(user);
            });
      });
   },

   searchByEmail: email => {
      return new Promise((resolve, reject) => {
         pool.query(`SELECT *
                     FROM user 
                     WHERE email = ?`,
            [email], (err, user) => {
               if (err) {
                  return reject("Não foi possível encontrar o usuário!");
               }

               return resolve(user);
            });
      });

   },

   listUser: () => {
      return new Promise((resolve, reject) => {
         pool.query(`SELECT * 
                     FROM user`,
            (err, user) => {
               if (err) {
                  return reject("Erro ao listar usuário!");
               }

               return resolve(user);
            });
      });
   },

   deleteUser: user => {
      return new Promise((resolve, reject) => {
         pool.query(`DELETE 
                     FROM user 
                     WHERE id = ?`,
            [user.uid], (err, user) => {
               if (err) {
                  return reject("Erro ao deletar usuário!");
               }

               return resolve(user);
            });
      });
   }
};