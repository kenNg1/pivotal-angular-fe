module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		nickname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: false,
				isEmail: {
					args: true,
					msg: "Your Email is not valid, do you even know what Email is?"
				}
			}
		},
		site: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: false
			}
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: {
				args: false,
				msg: "NUll? Hey dude. You are better than this, you know!"
			},
			validate: {
				notEmpty: {
					args: true,
					msg: "Empty message? Come one, just tell us what you think!"
				}
			}
		}
	}, {
		classMethods: {
			associate: (models) => {
				Comment.belongsTo(Comment, { foreignKey: 'parent_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
				Comment.hasMany(Comment, { as: 'Children', foreignKey: 'parent_id', useJunctionTable: false });
				Comment.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
				Comment.belongsTo(models.Post, { foreignKey: 'post_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
			}
		}
	});

	Comment.beforeCreate( (comment, options, done) => {
		if(!comment.nickname)
			comment.nickname = "anonim";

		return done(null, comment);
	});

	return Comment;
}