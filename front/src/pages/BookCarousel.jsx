import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../style/BookCarousel.css";
import Lilyshappyday from "../style/img/home/Lilyshappyday.png";
import ProfImg from "../style/img/login/ProfImg.png";

export default function Mypage() {
  const navigate = useNavigate();
  const { user, onLogout } = useContext(AuthContext);

  // 예시 데이터
  const readBooks = [
    { id: 1, title: "Lily's happy dayLily's happy day", img: Lilyshappyday },
    { id: 2, title: "Red Ridinghood", img: Lilyshappyday },
    { id: 3, title: "My diary", img: Lilyshappyday },
    { id: 4, title: "The Little Prince", img: Lilyshappyday },
    { id: 5, title: "Fighters", img: Lilyshappyday },
    { id: 6, title: "Another Book", img: Lilyshappyday },
  ];

  const likedBooks = [
    { id: 4, title: "Lily's happy day", img: Lilyshappyday },
    { id: 5, title: "Red Ridinghood", img: Lilyshappyday },
    { id: 6, title: "My diary", img: Lilyshappyday },
    { id: 7, title: "The Little Prince", img: Lilyshappyday },
    { id: 8, title: "Fighters", img: Lilyshappyday },
  ];

  const handleWithdraw = async () => {
    if (!window.confirm("정말로 회원 탈퇴하시겠습니까?")) 
      return;
    alert("탈퇴 기능이 준비 중입니다. 로그아웃 처리합니다.");
    onLogout();
  };

  return (
    <div className="main-content">
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
              src={user?.profImg || ProfImg}
              alt="profile-image"
              className="profile-img-big"
            />
            <div className="plan-badge">Premium</div>
            <div className="profile-name">
              <b>{user?.nickName || "사용자"}님</b>
            </div>
            <div className="profile-email">{user?.email}</div>
            <div className="button-container">
              <button className="report-btn" onClick={() => navigate("/report")}>학습 정보</button>
              <button className="plan-btn" onClick={() => navigate("/plan")}>구독 이력</button>
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
              {/* 캐러셀로 변경 */}
              <div className="book-carousel">
                {readBooks.map((book) => (
                  <div key={book.id} className="book-card">
                    <div className="book-cover-wrapper">
                      <img className="book-cover-img" src={book.img} alt={book.title} />
                    <div className="book-title">{book.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="book-marked">
              <div className="bookmark-header">
                <h2 className="bookmark-title">내가 찜한 책들</h2>
                <button className="more-btn" onClick={() => navigate("/bookmark")}>더보기</button>
              </div>
              <hr />
              {/* 캐러셀로 변경 */}
              <div className="book-carousel">
                {likedBooks.map((book) => (
                  <div key={book.id} className="book-card">
                    <div className="book-cover-wrapper">
                      <img className="book-cover-img" src={book.img} alt={book.title} />
                    </div>
                    <div className="book-title">{book.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
