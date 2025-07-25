//시퀄라이즈 컨벤션 : 엔터티: 대문자시작/테이블명: 복수형 소문자 카멜
module.exports = (sequelize, DataTypes) => {
    const Tutor = sequelize.define(
        "Tutor",
        {
            chatId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            storyId: {
                type: DataTypes.INTEGER,
            },
            message: {
                type: DataTypes.TEXT,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
        },
        {
            tableName: "tutors",
            timestamps: false,
        }
    );

    Tutor.associate = function (models) {
        // Tutor belongs to User
        Tutor.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user"
        });

        // Tutor belongs to Story
        Tutor.belongsTo(models.Story, {
            foreignKey: "storyId",
            as: "story"
        });
    };
    return Tutor;
};

