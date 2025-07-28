// Progress(진도) 모델 - 학습 진도/완주/프로그레스바 계산에 최적화
//currentPage: 사용자가 마지막으로 본 페이지(프레임) 번호
//totalPage: 전체 페이지 수(프론트에서 전달받거나, 스토리에서 참조)
//isFinished: 완주 여부(모든 페이지를 다 보면 true)
//updatedAt: 마지막 진도 저장 시각

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
                allowNull: false
            },
            storyId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            currentPage: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1 // 최소 1페이지부터 시작
            },
            totalPage: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isFinished: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: "progresses",
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
