const User = require("./user.model");
const Ticket = require("./ticket.model");
const Comment = require("./comment.model");
const Attachment = require("./attachment.model");

// relation
User.hasMany(Ticket, {
  foreignKey: "userId",
});

Ticket.belongsTo(User, {
  foreignKey: "userId",
});

Ticket.belongsTo(User, {
  foreignKey: "assignedTo",
  as: "assignedAgent",
});

Ticket.hasMany(Comment, {
  foreignKey: "ticketId",
});

Comment.belongsTo(Ticket, {
  foreignKey: "ticketId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

Ticket.hasMany(Attachment, {
  foreignKey: "ticketId",
});

Attachment.belongsTo(Ticket, {
  foreignKey: "ticketId",
});

User.hasMany(Attachment, {
  foreignKey: "userId",
});

Attachment.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  User,
  Ticket,
  Comment,
  Attachment,
};