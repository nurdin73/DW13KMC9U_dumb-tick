const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;
const payments = models.payments;

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

const newPayments = data => {
  const newPayment = data.map(item => {
    let newItem = {
      id: item.id,
      event: {
        id: item.event.id,
        title: item.event.title,
        category: {
          id: item.event.category.id,
          name: item.event.category.name
        },
        startTime: item.event.startTime,
        endTime: item.event.endTime,
        price: item.event.price,
        description: item.event.description,
        address: item.event.address,
        urlMap: item.event.urlMap,
        image: item.event.image,
        createdBy: {
          id: item.event.user.id,
          name: item.event.user.name,
          phone: item.event.user.phone,
          email: item.event.user.email,
          image: item.event.user.image
        }
      },
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      status: item.status,
      attachment: item.attachment
    };
    return newItem;
  });
  return newPayment;
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
// {
//   id: data.id,
//   event: {
//     id: data.event.id,
//     title: data.event.title,
//     category: {
//       id: data.event.category.id,
//       name: data.event.category.name
//     },
//     startTime: data.event.startTime,
//     endTime: data.event.endTime,
//     price: data.event.price,
//     description: data.event.description,
//     address: data.event.address,
//     urlMap: data.event.urlMap,
//     image: data.event.image,
//     createdBy: {
//       id: data.event.user.id,
//       name: data.event.user.name,
//       phone: data.event.user.phone,
//       email: data.event.user.email,
//       image: data.event.user.image
//     }
//   },
//   quantity: data.quantity,
//   totalPrice: data.totalPrice,
//   status: data.status,
//   attachment: data.attachment
// }
