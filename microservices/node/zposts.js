module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('Post', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: "Slug is not Avaliable, Try another slug"
			},
			validate: {
				notEmpty: true,
				isLowercase: true
			}
		},
		short_desc: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: false
			}
		},
		content_post: {
			type: DataTypes.TEXT,
			allowNull: true,
			validate: {
				notEmpty: false
			}
		},
		post_type: {
			type: DataTypes.STRING,
			defaultValue: 'post',
			validate: {
				isIn: {
					args: [['post', 'page']],
					msg: "Must be in post and page type"
				}
			}
		}
	}, {
		classMethods: {
			associate: (models) => {
				Post.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
				Post.hasMany(models.Comment, { foreignKey: 'post_id', as : 'PostComment' });
			}
		}
	});

	return Post;
};