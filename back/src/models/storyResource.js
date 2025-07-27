module.exports = (sequelize, DataTypes) => {
    const StoryResource = sequelize.define(
        "StoryResource",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            storyId: { type: DataTypes.INTEGER, allowNull: false },
            nation: { type: DataTypes.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'), allowNull: false },
            imgUrl: { type: DataTypes.STRING, allowNull: true },
            subtitleUrl: { type: DataTypes.STRING, allowNull: true },
            audioUrl: { type: DataTypes.STRING, allowNull: true }
        },
        {
            tableName: "storyResources",
            timestamps: true
        }
    );
    StoryResource.associate = function (models) {
        StoryResource.belongsTo(models.Story, { foreignKey: "storyId", as: "story" });
    };
    return StoryResource;
};