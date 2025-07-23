// back/src/database/seedStories.js
const models = require("../models");

const testStories = [
    { storyTitle: "Lily's happy day", langLevel: 'A1', langLevelKo: '초급', nation: 'en', topic: 'daily life' },
    { storyTitle: 'Red', langLevel: 'A1', langLevelKo: '초급', nation: 'en', topic: 'colors' },
    { storyTitle: 'Diary', langLevel: 'A2', langLevelKo: '초중급', nation: 'en', topic: 'writing' },
    { storyTitle: 'Friendship', langLevel: 'A2', langLevelKo: '초중급', nation: 'en', topic: 'relationship' },
    { storyTitle: 'Prince', langLevel: 'B1', langLevelKo: '중급', nation: 'en', topic: 'fantasy' },
    { storyTitle: 'Fighters', langLevel: 'B1', langLevelKo: '중급', nation: 'en', topic: 'action' },
    { storyTitle: 'Pizza', langLevel: 'B2', langLevelKo: '중고급', nation: 'en', topic: 'food' },
    { storyTitle: 'Museum', langLevel: 'B2', langLevelKo: '중고급', nation: 'en', topic: 'culture' },
    { storyTitle: 'Library', langLevel: 'C1', langLevelKo: '고급', nation: 'en', topic: 'education' },
    { storyTitle: 'Ocean', langLevel: 'C1', langLevelKo: '고급', nation: 'en', topic: 'nature' },
    { storyTitle: 'Dream', langLevel: 'C2', langLevelKo: '최고급', nation: 'en', topic: 'philosophy' },
    { storyTitle: 'Galaxy', langLevel: 'C2', langLevelKo: '최고급', nation: 'en', topic: 'science' }
];

const seedStories = async () => {
    try {
        console.log('🌱 스토리 테스트 데이터 삽입 시작...');

        await models.Story.bulkCreate(testStories);

        console.log('✅ 스토리 테스트 데이터 삽입 완료!');
        console.log(`📊 총 ${testStories.length}개의 스토리가 추가되었습니다.`);
    } catch (error) {
        console.error('❌ 스토리 데이터 삽입 오류:', error);
    }
};

const testUser = {
    id: 1,
    nickName: "테스트유저",
    email: "test@example.com",
    password: "test1234",
    oauthProvider: "naver", // 필수
    oauthId: "naver_test_1"      // 필수
};

const seedUser = async () => {
    try {
        console.log('🌱 사용자 테스트 데이터 삽입 시작...');
        // await models.User.create(testUser);
        console.log('✅ 사용자 테스트 데이터 삽입 완료!');
    } catch (error) {
        console.error('❌ 사용자 데이터 삽입 오류:', error);
    }
};

if (require.main === module) {
    seedUser().then(() => {
        console.log('🏁 시드 데이터 작업 완료');
        process.exit(0);
    });
}


module.exports = { seedStories, seedUser };

// 직접 실행할 경우
if (require.main === module) {
    seedStories().then(() => {
        console.log('🏁 시드 데이터 작업 완료');
        process.exit(0);
    });
}
