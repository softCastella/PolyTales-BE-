import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios'; //추가
import '../style/home.css';
import Lilyshappyday from '../style/img/home/Lilyshappyday.png';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const levelLabelsKo = {
  A1: '초급',
  A2: '초중급',
  B1: '중급',
  B2: '중고급',
  C1: '고급',
  C2: '최고급',
};

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [stories, setStories] = useState([]);  //추가
  const [loading, setLoading] = useState(true); //추가

  // API에서 스토리 데이터 가져오기 추가
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/stories');
        setStories(response.data.data);
      } catch (error) {
        console.error('스토리 데이터 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleSelect = (level) => {
    setSelected(prev => (prev === level ? null : level));
  };

  const filteredImages = selected
    ? stories.filter(item => item.langLevel === selected)
    : stories;

  return (
    <div className="recommend-section">
      <h2>언어레벨에 따라 언어를 공부해보세요!</h2>

      <div className="level-buttons">
        {levels.map((level) => {
          const isSelected = selected === level;
          return (
            <button
              key={level}
              onClick={() => handleSelect(level)}
              className={`level-btn ${level} ${isSelected ? 'selected' : ''}`}
            >
              <strong>{level}</strong><br />
              <span>{levelLabelsKo[level]}</span>
            </button>
          );
        })}
      </div>

      <div className="image-grid">
        {filteredImages.map(({ id, title }) => (
          <div key={id} className="image-box">
            <img src={Lilyshappyday} alt={title} />
            <p className="image-title">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
