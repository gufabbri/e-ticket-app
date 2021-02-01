const User = require('../models/user-model');
const { InvalidArgumentError, InternalServerError } = require('../../errors/errors');

module.exports = {
  addUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = new User({
        name,
        email
      });

      await user.adicionaSenha(password);

      await user.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  login: (req, res) => {
    res.status(204).send();
  },

  list: async (req, res) => {
    const users = await User.listUser();
    res.json(users);
  },

  delete: async (req, res) => {
    const user = await User.searchByEmail(req.params.id);
    try {
      await user.deleteUser();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
  
};
