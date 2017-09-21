module.exports = {
	up: (queryInterface, Sequelize)	=>
		queryInterface.createTable('Events', {
			id: {
        		allowNull: false,
        		autoIncrement: true,
        		primaryKey: true,
        		type: Sequelize.INTEGER
      		},
      		name: {
		    	type: Sequelize.STRING,
				allowNull: false
		    },
			description: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			level: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			intensity: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			terrain: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			min_ppl: {
				type: Sequelize.INTEGER,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			max_ppl: {
				type: Sequelize.INTEGER,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			sportswear: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			gear: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			org_description: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			org_website: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			imageUpload: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			videoUpload: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			date: {
				type: Sequelize.DATE,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			time: {
				type: Sequelize.TIME,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			address: {
				type: Sequelize.STRING,
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
			},
		    district_id: {
				type      : Sequelize.INTEGER,
				onDelete  : 'RESTRICT',
				onUpdate  : 'CASCADE',
				references: {
					model : 'Districts',
					key   : 'id',
					as	  : 'district_id'
				}
			},
		    sport_id: {
				type      : Sequelize.INTEGER,
				onDelete  : 'RESTRICT',
				onUpdate  : 'CASCADE',
				references: {
					model : 'Sports',
					key   : 'id',
					as	  : 'sport_id'
				}
			}
		}),
	down: (queryInterface) => queryInterface.dropTable('Events')
};