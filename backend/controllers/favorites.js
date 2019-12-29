const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;
const favorites = models.favorites;
const { newFavorites } = require("../helpers/functions");

exports.favorites = (req, res) => {
  favorites
    .findAll({
      where: {
        user_id: req.params.user_id
      },
      include: [
        {
          model: events,
          as: "event",
          include: [
            {
              model: categories,
              as: "category"
            },
            {
              model: users,
              as: "user"
            }
          ]
        },
        {
          model: users,
          as: "user"
        }
      ]
    })
    .then(result => {
      res.status(200).json(newFavorites(result));
    });
};
