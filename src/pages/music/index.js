import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import musicData from '../../data/music.json';
import styles from './styles.module.css';

export default function MusicPage() {
  // 当前选中的音乐分类索引（默认为第 0 个分类：说唱精选）
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  // 当前在当前分类下的歌曲索引
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // 播放器状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  // 获取当前分类与当前正在播放的曲目
  const currentCategory = musicData[currentCategoryIndex];
  const trackList = currentCategory.tracks;
  const currentTrack = trackList[currentTrackIndex] || trackList[0];

  // 格式化时间为 mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 切换歌单分类
  const handleCategoryChange = (index) => {
    setCurrentCategoryIndex(index);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
  };

  // 播放/暂停切换
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('播放失败或需要用户首次交互:', err);
        });
    }
  };

  // 切换上一曲
  const handlePrev = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? trackList.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  // 切换下一曲
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % trackList.length);
    setIsPlaying(true);
  };

  // 点播当前分类中的某首歌曲
  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  // 播放进度更新
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // 音频元数据加载完成
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // 歌曲播放完毕自动下一首
  const handleEnded = () => {
    handleNext();
  };

  // 拖动进度条
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // 调节音量
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  // 切换曲目时重新载入音频
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex, currentCategoryIndex]);

  return (
    <Layout title="音乐电台" description="多分类歌单与沉浸式黑胶唱片机">
      <main className={styles.musicContainer}>
        {/* 顶部标题区 */}
        <header className={styles.header}>
          <div className={styles.badge}>MUSIC STATION</div>
          <h1 className={styles.title}>音乐 · 分类电台</h1>
          <p className={styles.subtitle}>
            精选不同心境下的音乐分类，让律动陪伴您的阅读与代码时光。
          </p>
        </header>

        {/* 隐藏的 HTML5 音频核心 */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />

        {/* 歌单分类 Tab 切换栏 */}
        <div className={styles.categoryNav}>
          {musicData.map((cat, idx) => (
            <button
              key={cat.category}
              className={clsx(styles.categoryTab, {
                [styles.categoryTabActive]: currentCategoryIndex === idx,
              })}
              onClick={() => handleCategoryChange(idx)}
            >
              {cat.catName}
            </button>
          ))}
        </div>

        {/* 主播放界面（左侧黑胶唱片 + 右侧分类歌单） */}
        <div className={styles.playerWrapper}>
          {/* 左侧：黑胶唱片与控制面板 */}
          <div className={styles.turntableCard}>
            {/* 黑胶唱片展示 */}
            <div className={styles.vinylContainer}>
              <div
                className={clsx(styles.vinylDisc, {
                  [styles.vinylSpinning]: isPlaying,
                })}
              >
                <div
                  className={styles.vinylCover}
                  style={{ backgroundImage: `url(${currentTrack.cover})` }}
                />
                <div className={styles.vinylCenterHole} />
              </div>
            </div>

            {/* 歌曲信息 */}
            <div className={styles.trackInfo}>
              <div className={styles.catBadge}>
                {currentCategory.category}
              </div>
              <h2 className={styles.trackTitle}>{currentTrack.title}</h2>
              <p className={styles.trackArtist}>
                {currentTrack.artist} — 《{currentTrack.album}》
              </p>
            </div>

            {/* 进度条与播放时间 */}
            <div className={styles.progressSection}>
              <input
                type="range"
                className={styles.progressBar}
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
              />
              <div className={styles.timeLabels}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* 播放核心控制按钮 */}
            <div className={styles.controls}>
              <button
                className={styles.controlBtn}
                onClick={handlePrev}
                title="上一曲"
              >
                ⏮
              </button>
              <button
                className={clsx(styles.controlBtn, styles.playMainBtn)}
                onClick={togglePlay}
                title={isPlaying ? '暂停' : '播放'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                className={styles.controlBtn}
                onClick={handleNext}
                title="下一曲"
              >
                ⏭
              </button>
            </div>

            {/* 音量控制 */}
            <div className={styles.volumeBar}>
              <span className={styles.volIcon}>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeRange}
              />
              <span className={styles.volValue}>
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* 右侧：当前分类歌曲列表与分类说明 */}
          <div className={styles.rightPanel}>
            <div className={styles.playlistCard}>
              {/* 分类介绍栏 */}
              <div className={styles.catHeader}>
                <h3 className={styles.catTitle}>{currentCategory.catName}</h3>
                <p className={styles.catDesc}>{currentCategory.catDesc}</p>
              </div>

              {/* 歌曲列表 */}
              <div className={styles.trackList}>
                {trackList.map((track, idx) => {
                  const isCurrent = idx === currentTrackIndex;
                  return (
                    <div
                      key={track.id}
                      className={clsx(styles.trackRow, {
                        [styles.trackRowActive]: isCurrent,
                      })}
                      onClick={() => handleSelectTrack(idx)}
                    >
                      <div className={styles.rowCoverWrapper}>
                        <img
                          src={track.cover}
                          alt={track.title}
                          className={styles.rowCover}
                        />
                        {isCurrent && isPlaying && (
                          <div className={styles.playingWave}>
                            <span />
                            <span />
                            <span />
                          </div>
                        )}
                      </div>

                      <div className={styles.rowMeta}>
                        <div className={styles.rowTitle}>{track.title}</div>
                        <div className={styles.rowArtist}>{track.artist}</div>
                      </div>

                      <div className={styles.rowDuration}>{track.duration}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 静态歌单管理提示 */}
            <div className={styles.guideCard}>
              <h4>💡 静态歌单扩展指南</h4>
              <p>
                音乐数据全部独立存放于 <code>src/data/music.json</code> 中。
                您可以自由添加新分类（如按流派、歌手或季节）或向现有分类中追加新歌曲 MP3 链接，无须修改任何页面组件。
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
