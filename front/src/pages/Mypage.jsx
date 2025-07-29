import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 구글 로그인 정보 context
import "../style/Mypage.css";
import Lilyshappyday from "../style/img/home/Lilyshappyday.png";
import ProfImg from "../style/img/login/ProfImg.png";
// import RedRidinghood from "../style/img/home/RedRidinghood.png";
// import MyDiary from "../style/img/home/MyDiary.png";
// import LittlePrince from "../style/img/home/LittlePrince.png";
// import Fighters from "../style/img/home/Fighters.png";
// import Pizzaria from "../style/img/home/Pizzaria.png";

export default function Mypage() {
  const navigate = useNavigate();
  const { user, onLogout } = useContext(AuthContext);

  // 예시 데이터
  const readBooks = [
    { id: 1, title: "Lily's happy day", img: Lilyshappyday },
    { id: 2, title: "Lily's happy day", img: Lilyshappyday },
    { id: 3, title: "Lily's happy day", img: Lilyshappyday },
  ];
  const likedBooks = [
    { id: 4, title: "Lily's happy day", img: Lilyshappyday },
    { id: 5, title: "Lily's happy day", img: Lilyshappyday },
    { id: 6, title: "Lily's happy day", img: Lilyshappyday },
  ];

  // 회원탈퇴 예시 함수 (실제 구현에 맞게 수정)
  const handleWithdraw = async () => {
    if (!window.confirm("정말로 회원 탈퇴하시겠습니까?")) return;
    // ...API 호출 및 onLogout()
    alert("탈퇴 기능이 준비 중입니다. 로그아웃 처리합니다.");
    onLogout();
  };

  return (
    <div className="mypage-container">
      <div className="back-button-wrapper">
        <button className="back-button" onClick={() => navigate("/")}>
          🔙
        </button>
        <h1 className="page-title">마이페이지</h1>
      </div>

      <div className="mypage-wrapper">
        {/* 왼쪽: 프로필 */}
        <div className="profile-box">
          <p className="join-date">가입일 : {user?.joinDate || "2025-07-07"}</p>
          <img
            src={user?.profImg || ProfImg} // 구글 프로필 이미지 > 기본이미지
            alt="profile-image"
            className="profile-img-big"
          />
          <div className="plan-badge">Premium</div>
          <div className="profile-name">
            <b>{user?.nickName || "사용자"}님</b>
          </div>
          <div className="profile-email">{user?.email}</div>
          <div className="button-container">
            <button className="report-btn">학습 정보</button>
            <button className="plan-btn">구독 이력</button>
          </div>
          <button className="exit" onClick={handleWithdraw}>
            회원 탈퇴
          </button>
        </div>
        {/* 오른쪽: 책 리스트 */}
        <div className="contents-list-wrap">
          <div className="read-book">
            <div className="read-header">
              <h2 className="read-title">내가 읽은 책들</h2>
              <button className="more-btn" onClick={() => navigate("/history")}>더보기</button>
            </div>
            <hr />
            <div className="image-grid">
              {readBooks.map(({ id, title, img }) => (
                <div key={id} className="image-box">
                  <img src={img} alt={title} />
                  <p className="image-title">{title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="book-marked">
            <div className="bookmark-header">
              <h2 className="bookmark-title">내가 찜한 책들</h2>
              <button className="more-btn"onClick={() => navigate("/bookmark")}>더보기</button>
            </div>
            <hr />
            <div className="image-grid">
              {likedBooks.map(({ id, title, img }) => (
                <div key={id} className="image-box">
                  <img src={img} alt={title} />
                  <p className="image-title">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
