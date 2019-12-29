const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Events } = require("../helpers/functions");
exports.index = (req, res) => {
  events
    .findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${req.query.title}%`
            }
          },
          {
            startTime: {
              [Op.like]: `%${req.query.start_time}%`
            }
          }
        ]
      },
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
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(Events(data));
      } else {
        res.status(200).json({
          message: "event not founds"
        });
      }
    });
};
exports.all = (req, res) => {
  events
    .findAll({
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
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(Events(data));
      } else {
        res.status(200).json({
          message: "event not founds"
        });
      }
    });
};

exports.detail = (req, res) => {
  events
    .findOne({
      where: {
        id: req.params.id
      },
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
    })
    .then(data => {
      if (data === null) {
        res.status(200).json({
          message: "event not found"
        });
      } else {
        res.status(200).json({
          id: data.id,
          title: data.title,
          category_name: data.category.name,
          category: {
            id: data.category.id,
            name: data.category.name
          },
          startTime: data.startTime,
          endTime: data.endTime,
          price: data.price,
          description: data.description,
          address: data.address,
          urlMaps: data.urlMap,
          img: data.image,
          createdBy: {
            id: data.user.id,
            name: data.user.name,
            phoneNumber: data.user.phone,
            email: data.user.email,
            img: data.user.image
          }
        });
      }
    });
};

exports.post = (req, res) => {
  let storeTitle;
  const {
    title,
    category_id,
    startTime,
    endTime,
    price,
    description,
    address,
    urlMap,
    image
  } = req.body;
  storeTitle = title.trim();
  events
    .findAll({
      where: {
        title: storeTitle
      }
    })
    .then(eventsData => {
      if (eventsData.length > 0) {
        res.status(200).json({
          message: "title has been used"
        });
      } else {
        events
          .create({
            title: storeTitle,
            category_id: category_id,
            startTime: startTime,
            endTime: endTime,
            price: price,
            description: description,
            address: address,
            urlMap: urlMap,
            image: image,
            createdBy: req.user_id
          })
          .then(data => {
            categories
              .findOne({
                where: {
                  id: data.category_id
                }
              })
              .then(category => {
                users
                  .findOne({
                    where: {
                      id: data.createdBy
                    }
                  })
                  .then(user => {
                    res.status(200).json({
                      id: data.id,
                      title: data.title,
                      category: {
                        id: category.id,
                        name: category.name
                      },
                      startTime: data.startTime,
                      endTime: data.endTime,
                      price: data.price,
                      description: data.description,
                      address: data.address,
                      urlMaps: data.urlMap,
                      img: data.image,
                      createdBy: {
                        id: user.id,
                        name: user.name,
                        phoneNumber: user.phone,
                        email: user.email,
                        img: user.image
                      }
                    });
                  });
              });
          });
      }
    });
};

exports.patch = (req, res) => {
  events
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(event => {
      if (event != null) {
        if (event.createdBy != req.user_id) {
          res.status(403).json({
            message: "you are not authorized to update this event"
          });
        } else {
          events
            .update(req.body, {
              where: {
                id: req.params.id
              }
            })
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  message: "failed to update this event"
                });
              } else {
                res.status(200).json({
                  message: "success update this event"
                });
              }
            });
        }
      } else {
        res.status(200).json({
          message: "event is not found"
        });
      }
    });
};

exports.delete = (req, res) => {
  events
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(event => {
      if (event === null) {
        res.status(200).json({
          message: "event is not found"
        });
      } else {
        if (event.createdBy != req.user_id) {
          res.status(403).json({
            message: "you are not authorized to delete this event"
          });
        } else {
          events
            .destroy({
              where: {
                id: req.params.id
              }
            })
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  success: false,
                  message: "Failed to delete this event"
                });
              } else {
                res.status(200).json({
                  success: true,
                  message: "success delete this event"
                });
              }
            });
        }
      }
    });
};
