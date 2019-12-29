const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;
const payments = models.payments;
const { newPayments } = require("../helpers/functions");

exports.post = (req, res) => {
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
    .then(event => {
      if (event === null) {
        res.status(200).json({
          message: "event not found"
        });
      } else {
        const { quantity, status, attachment } = req.body;
        payments
          .create({
            quantity: quantity,
            totalPrice: quantity * event.price,
            status: status,
            attachment: attachment,
            event_id: req.params.id,
            buyer_id: req.user_id
          })
          .then(data => {
            if (data === 0) {
              res.status(500).json({
                message: "add payment failed"
              });
            } else {
              res.status(200).json({
                id: data.id,
                event: {
                  id: event.id,
                  title: event.title,
                  category: {
                    id: event.category.id,
                    name: event.category.name
                  },
                  startTime: event.startTime,
                  endTime: event.endTime,
                  price: event.price,
                  description: event.description,
                  address: event.address,
                  urlMaps: event.urlMap,
                  img: event.image,
                  createdBy: {
                    id: event.user.id,
                    name: event.user.name,
                    phoneNumber: event.user.phone,
                    email: event.user.email,
                    img: event.user.image
                  }
                },
                quantity: data.quantity,
                totalPrice: data.totalPrice,
                attachment: data.attachment,
                status: data.status
              });
            }
          });
      }
    });
};

exports.confirm = (req, res) => {
  payments
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(payment => {
      if (payment === null) {
        res.status(200).json({
          message: "payment not found"
        });
      } else {
        if (payment.buyer_id != req.user_id) {
          res.status(403).json({
            message: "you not autorized in this order"
          });
        } else {
          payments
            .update(
              {
                status: req.body.status
              },
              {
                where: {
                  id: req.params.id
                }
              }
            )
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  message: "update error"
                });
              } else {
                events
                  .findOne({
                    where: {
                      id: payment.event_id
                    },
                    include: [
                      {
                        model: users,
                        as: "user"
                      },
                      {
                        model: categories,
                        as: "category"
                      }
                    ]
                  })
                  .then(event => {
                    res.status(200).json({
                      id: payment.id,
                      event: {
                        id: event.id,
                        title: event.title,
                        category: {
                          id: event.category.id,
                          name: event.category.name
                        },
                        startTime: event.startTime,
                        endTime: event.endTime,
                        price: event.price,
                        description: event.description,
                        address: event.address,
                        urlMaps: event.urlMap,
                        img: event.image,
                        createdBy: {
                          id: event.user.id,
                          name: event.user.name,
                          phoneNumber: event.user.phone,
                          email: event.user.email,
                          img: event.user.image
                        }
                      },
                      quantity: payment.quantity,
                      totalPrice: payment.totalPrice,
                      attachment: payment.attachment,
                      status: req.body.status
                    });
                  });
              }
            });
        }
      }
    });
};

exports.approved = (req, res) => {
  payments
    .findAll({
      where: {
        status: req.query.status,
        buyer_id: req.user_id
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
        }
      ]
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(newPayments(data));
      } else {
        res.status(200).json({
          message: "data payment is not found"
        });
      }
    });
};
