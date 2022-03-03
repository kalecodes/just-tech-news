// import all models
const Post = require("./Post");
const User = require("./User");
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// reverse association to go along with above association
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});


// associate User and Post to one another 
// when we query Post, we can see a total of how many votes a user creates
// when we query a User, we can see all of the posts they have voted on 
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});


Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Vote.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});
  
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// Comment Model associations
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Vote, Comment };