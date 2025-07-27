// 데모 사용자 데이터 시드
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        userId: 1,
        oauthProvider: 'google',
        oauthId: 'google-1234567890',
        email: 'googleuser@example.com',
        nickName: '유유유',
        profImg: 'https://randomuser.me/api/portraits/men/1.jpg',
        gender: 'male',
        age: 25
      },
      {
        userId: 2,
        oauthProvider: 'naver',
        oauthId: 'naver-abcdefg',
        email: 'naveruser@naver.com',
        nickName: '야야야',
        profImg: 'https://randomuser.me/api/portraits/women/2.jpg',
        gender: 'female',
        age: 30
      },
      {
        userId: 3,
        oauthProvider: 'kakao',
        oauthId: 'kakao-xyz123',
        email: 'kakaouser@kakao.com',
        nickName: '요요요',
        profImg: 'https://randomuser.me/api/portraits/men/3.jpg',
        gender: 'male',
        age: 28
      }
    ], {});
  },

  // 롤백 시 데이터 삭제
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};