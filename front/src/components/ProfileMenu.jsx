import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/ProfileMenu.css";
import ProfImg from "../style/img/login/ProfImg.png";

export default function ProfileMenu({
  username,
  userId,
  onLogout,
  userProfileImg,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate(); // 추가

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    // 프로필 전체 래퍼 (왼쪽으로 이동)
    <div ref={menuRef} className="profile-menu-wrap">
      {/* 프로필 버튼 (이미지+이름) */}
      <div className="profile-btn" onClick={() => setOpen((v) => !v)}>
        {/* 데모 프로필 이미지 */}
        <img
          src={userProfileImg || ProfImg} //구글 이미지 > 기본이미지
          alt="profile-image"
          className="profile-img"
        />
        {/* 사용자 이름 */}
        <div className="profile-username">{`${username}님`}</div>
      </div>
      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="profile-dropdown">
          <button className="close-btn" onClick={() => setOpen(false)}>
            ×
          </button>
          <img
            src={userProfileImg || ProfImg}
            alt="profile-image"
            className="dropdown-profile-img"
          />
          <div className="dropdown-greeting">안녕하세요, <b>{username}</b>님</div>
          <div className="button-container">
            <button className="mypage-btn" onClick={() => {navigate("/mypage"); setOpen(false);}}>
              마이페이지
            </button>
            <button className="logout-btn" onClick={onLogout}>로그아웃</button>
          </div>
        </div>
      )}
    </div>
  );
}


