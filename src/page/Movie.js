import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Movie.module.css'; // Movie.module.css 임포트

function Movie() {
  const navigate = useNavigate();

  const handleClick = () => {
    // '/loading' 경로는 App.js의 라우팅 구조에 정의되어 있어야 합니다.
    // 만약 정의되어 있지 않다면 App.js에 <Route path="/loading" element={<Loading />} /> 등을 추가해야 합니다.
    navigate('/loading'); // 영화 추천 후 로딩 페이지로 이동 (필요에 따라 경로 변경)
  };

  return (
    // Movie.module.css의 .movieContainer 클래스 사용
    <div className={styles.movieContainer}>
      <main className={styles.mainContent}>
        <div className={styles.left}>
          {/* 이미지 경로는 public 폴더 기준으로 설정됩니다. */}
          {/* 영화 관련 이미지로 변경: 예시로 /assets/movie_poster.png 사용 */}
          <img src="/assets/movie.png" alt="movie poster" className={styles.movieImage} />
          {/* Movie.module.css에서 색상이 변경된 recommendButton 클래스 사용 */}
          <button className={styles.recommendButton} onClick={handleClick}>
            영화 추천받기 →
          </button>
          <p className={styles.description}>
            AI가 현재 감정을 분석해,<br />
            기쁨, 위로, 집중 등 상황에 맞는 영화를 추천해드립니다.<br />
            나만을 위한 스토리를 만나보세요.
          </p>
        </div>

        <div className={styles.right}>
          {/* Movie.module.css에서 색상이 변경된 h1, h2 클래스 사용 */}
          <h1>Would you like to<br />watch a movie?</h1>
          <h2>“당신의 감정에 딱 맞는 영화,<br />봐볼래요?”</h2>
        </div>
      </main>
    </div>
  );
}

export default Movie;