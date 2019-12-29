const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;
const favorites = models.favorites;

exports.favorites = (req, res) => {
  favorites
    .findAll({
      where: {
        user_id: req.params.user_id
      },
      include: [
        {
          model: events,
          as: "event"
        },
        {
          model: users,
          as: "user"
        }
      ]
    })
    .then(result => {
      res.status(200).json(result);
    });
};
