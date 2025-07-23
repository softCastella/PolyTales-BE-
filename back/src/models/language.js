module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define(
        "Language",
        {
            vocaId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            word: {
                type: DataTypes.TEXT,
            },
            mean: {
                type: DataTypes.TEXT,
            },
            partSpeech: {
                type: DataTypes.TEXT,
            },
            vocaSentence: {
                type: DataTypes.TEXT,
            },
            nation: {
                type: DataTypes.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'),
            },
            storyId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: "languages",
            timestamps: false,
        }
    );

    Language.associate = function (models) {
        // Language belongs to Story
        Language.belongsTo(models.Story, {
            foreignKey: "storyId",
            as: "story"
        });
    };
    return Language;
};