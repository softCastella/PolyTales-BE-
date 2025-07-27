//시퀄라이즈 컨벤션 : 엔터티: 대문자시작/테이블명: 복수형 소문자 카멜
module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define(
        "Progress",
        {
            progressId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            storyId: {
                type: DataTypes.INTEGER,
            },
            currentPage: {
                type: DataTypes.INTEGER,
            },
            isFinished: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
        },
        {
            tableName: "Progresses",
            timestamps: false,
        }
    );

    Progress.associate = function (models) {
        // Progress belongs to User
        Progress.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user"
        });

        // Progress belongs to Story
        Progress.belongsTo(models.Story, {
            foreignKey: "storyId",
            as: "story"
        });
    };
    return Progress;
};

