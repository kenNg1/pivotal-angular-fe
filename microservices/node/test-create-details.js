module.exports = {
	up: (queryInterface, Sequelize)	=>
		queryInterface.createTable('Details', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false,
				}
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			tier: {
				type: Sequelize.STRING,
				defaultValue: 'user',
				validate: {
					isIn: [['user', 'admin', 'super admin']]
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			user_id: {
				type      : Sequelize.INTEGER,
				onDelete  : 'RESTRICT',
				onUpdate  : 'CASCADE',
				references: {
					model : 'Users',
					key   : 'id',
					as	  : 'user_id'
				}
			}
		}),
	down: (queryInterface) => queryInterface.dropTable('Details')
}