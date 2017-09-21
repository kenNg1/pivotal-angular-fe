module.exports = {
	up: (queryInterface, Sequelize) => 
		queryInterface.createTable('Users', {
			id: {
				allowNull: false,
		        autoIncrement: true,
		        primaryKey: true,
		        type: Sequelize.INTEGER
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isLowercase: true,
					notEmpty: true,
					isEmail: true
				}
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isLowercase: true,
					notEmpty: true,
					min: 3
				}
			},
			salt: {
				type: Sequelize.STRING,
				allowNull: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			sign_in_count: {
				allowNull: true,
		        type: Sequelize.INTEGER
			},
			current_sign_in_at:{
				allowNull: true,
				type: Sequelize.DATE
			},
			last_sign_in_at:{
				allowNull: true,
				type: Sequelize.DATE
			},
			current_sign_in_ip:{
				allowNull: true,
				type: Sequelize.STRING
			},
			last_sign_in_ip:{
				allowNull: true,
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		}/*, {
			schema: 'admin'
		}*/),
	down: (queryInterface) => queryInterface.dropTable('Users')
};