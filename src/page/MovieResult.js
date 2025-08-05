import React, { useEffect, useState } from "react";

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function MovieResult() {
  const [movies, setMovies] = useState([]);
  const [todayLabel, setTodayLabel] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(API_BASE + `/api/emotion?email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.emotions)) {
          const todayStr = new Date().toISOString().slice(0, 10);
          const today = data.emotions.find(e => e.date && e.date.slice(0,10) === todayStr);
          // 💡 반드시 today.recommendations.movie 확인!
          if (today && Array.isArray(today.recommendations?.movie)) {
            setTodayLabel(today.label);
            
            // 영화 데이터에 유튜브 링크가 없는 경우 자동으로 검색 링크 생성
            const moviesWithTrailers = today.recommendations.movie.map(movie => {
              if (!movie.trailerLink) {
                // 영화 제목과 감독으로 유튜브 검색 링크 생성
                const searchQuery = encodeURIComponent(`${movie.title} ${movie.director} 예고편 trailer`);
                movie.trailerLink = `https://www.youtube.com/results?search_query=${searchQuery}`;
              }
              return movie;
            });
            
            setMovies(getRandomItems(moviesWithTrailers, 3));
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩중...</div>;

  return (
    <main className="result-main">
      <h1 className="result-title">
        {todayLabel
          ? `오늘 감정(${todayLabel})에 어울리는 영화 추천`
          : "오늘 진단한 감정에 어울리는 영화 추천"}
      </h1>
      {movies.length > 0 ? (
        <div className="result-list">
          {movies.map((movie, idx) => (
            <div key={idx} className="result-item">
              <div className="image-wrapper">
                {/* 영화 포스터 이미지에 예고편 링크 추가 */}
                <a 
                  href={movie.trailerLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={`${movie.title} 예고편 보기`}
                >
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="result-image" 
                  />
                </a>
              </div>
              <div className="song-info">
                <p className="singer">{movie.director}</p>
                <p className="title">{movie.title}</p>
                {movie.year && <p className="year">({movie.year})</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>오늘 감정 진단을 먼저 해주세요!</p>
      )}
    </main>
  );
}

export default MovieResult;