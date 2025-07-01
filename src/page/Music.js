import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Music.module.css'; // Music.module.css 임포트

function Music() {
  const navigate = useNavigate();

  const handleClick = () => {
    // '/loading' 경로는 App.js의 라우팅 구조에 정의되어 있어야 합니다.
    // 만약 정의되어 있지 않다면 App.js에 <Route path="/loading" element={<Loading />} /> 등을 추가해야 합니다.
    navigate('/loading');
  };

  return (
    // Music.module.css의 .musicContainer 클래스 사용
    <div className={styles.musicContainer}>
      {/* Home.jsx에 있던 nav 부분은 Music.js에서는 필요 없을 수 있습니다.
          만약 필요하다면 App.js의 Header 컴포넌트나 Main 페이지에 통합하는 것을 고려하세요.
      <header className={styles.nav}>
        <div className={styles.logo}>MOODI-TREE</div>
        <nav>
          <ul>
            <li>ABOUT</li>
            <li>MOOD CHECK</li>
            <li>MY MOOD</li>
            <li>CONTACT</li>
            <li><button className={styles.login}>LOGIN</button></li>
          </ul>
        </nav>
      </header>
      */}

      <main className={styles.mainContent}>
        <div className={styles.left}>
          {/* 이미지 경로는 public 폴더 기준으로 설정됩니다. */}
          <img src="/assets/earphones.png" alt="earphones" className={styles.earphones} />
          {/* Music.module.css에서 색상이 변경된 recommendButton 클래스 사용 */}
          <button className={styles.recommendButton} onClick={handleClick}>
            음악 추천받기 →
          </button>
          <p className={styles.description}>
            AI가 현재 감정을 분석해,<br />
            기쁨, 위로, 집중 등 상황에 맞는 음악을 추천해드립니다.<br />
            나만을 위한 사운드트랙을 만나보세요.
          </p>
        </div>

        <div className={styles.right}>
          {/* Music.module.css에서 색상이 변경된 h1, h2 클래스 사용 */}
          <h1>Would you like to<br />listen to music?</h1>
          <h2>“당신의 감정에 딱 맞는 음악,<br />들어볼래요?”</h2>
        </div>
      </main>
    </div>
  );
}

export default Music;