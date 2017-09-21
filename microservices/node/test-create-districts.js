module.exports = {
	up: (queryInterface, Sequelize)	=>
		queryInterface.createTable('Districts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false,
				}
			},
			lat: {
				type: Sequelize.FLOAT,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			lng: {
				type: Sequelize.FLOAT,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		}),
	down: (queryInterface) => queryInterface.dropTable('Districts')
}