import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import albumsData from '../../data/albums.json';
import styles from './styles.module.css';

export default function GalleryPage() {
  // 当前正在浏览的相册对象（null 表示在相册集封面方格列表页）
  const [currentAlbum, setCurrentAlbum] = useState(null);
  // 当前全屏预览图片的索引（null 表示未打开 Lightbox 灯箱）
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // 快捷键支持：大图预览时左右箭头切图，Esc 关闭
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null || !currentAlbum) return;
      const photoList = currentAlbum.photos;
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % photoList.length);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev === 0 ? photoList.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, currentAlbum]);

  return (
    <Layout title="光影相册" description="经典相册陈列，定格光影印记">
      <main className={styles.galleryContainer}>
        {/* ============================================================
            场景一：相册首页 —— QQ 空间经典方格陈列（一行 4~6 个自适应）
           ============================================================ */}
        {!currentAlbum ? (
          <div>
            {/* 顶部标题区 */}
            <header className={styles.header}>
              <div className={styles.badge}>PHOTO ALBUMS</div>
              <h1 className={styles.title}>我的相册</h1>
              <p className={styles.subtitle}>
                共 {albumsData.length} 个相册集 · 点击任意相册封面进入翻阅
              </p>
            </header>

            {/* 相册方格网格（一行 4 到 6 个自适应） */}
            <div className={styles.albumGrid}>
              {albumsData.map((album) => (
                <div
                  key={album.id}
                  className={styles.squareAlbumCard}
                  onClick={() => setCurrentAlbum(album)}
                >
                  {/* 上部：固定正方比例相册封面 */}
                  <div className={styles.coverBox}>
                    <img
                      src={album.cover}
                      alt={album.title}
                      className={styles.coverImg}
                      loading="lazy"
                    />
                    {/* 照片张数角标 */}
                    <span className={styles.countTag}>
                      {album.photos.length} 张
                    </span>
                    {/* 悬停光晕遮罩 */}
                    <div className={styles.hoverShade}>
                      <span className={styles.openHint}>打开相册</span>
                    </div>
                  </div>

                  {/* 下部：相册标题与拍摄信息 */}
                  <div className={styles.albumTitleBox}>
                    <h3 className={styles.albumName} title={album.title}>
                      {album.title}
                    </h3>
                    <div className={styles.albumSubInfo}>
                      <span>{album.location}</span>
                      <span>{album.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ============================================================
             场景二：相册详情内页（展示当前相册内的所有照片）
             ============================================================ */
          <div>
            {/* 顶部返回导航栏 */}
            <div className={styles.albumNavHeader}>
              <button
                className={styles.backButton}
                onClick={() => {
                  setCurrentAlbum(null);
                  setActivePhotoIndex(null);
                }}
              >
                ‹ 返回所有相册
              </button>
            </div>

            {/* 当前相册介绍 */}
            <header className={styles.albumDetailHeader}>
              <div className={styles.detailMeta}>
                <span>📍 {currentAlbum.location}</span>
                <span>📅 {currentAlbum.date}</span>
                <span>📷 共 {currentAlbum.photos.length} 张照片</span>
              </div>
              <h1 className={styles.detailTitle}>{currentAlbum.title}</h1>
              <p className={styles.detailDesc}>{currentAlbum.description}</p>
            </header>

            {/* 相册内照片平铺列表 */}
            <div className={styles.photoGrid}>
              {currentAlbum.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={styles.photoCard}
                  onClick={() => setActivePhotoIndex(index)}
                >
                  <div className={styles.photoWrapper}>
                    <img
                      src={photo.thumb}
                      alt={photo.title}
                      loading="lazy"
                      className={styles.photoImage}
                    />
                    <div className={styles.overlayHover}>
                      <span className={styles.zoomHint}>🔍 查看大图</span>
                    </div>
                  </div>

                  <div className={styles.photoMeta}>
                    <h4 className={styles.photoItemTitle}>{photo.title}</h4>
                    <div className={styles.cameraParam}>{photo.camera}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 全屏大图 Lightbox 灯箱预览 */}
            {activePhotoIndex !== null && (
              <div
                className={styles.lightboxBackdrop}
                onClick={() => setActivePhotoIndex(null)}
              >
                <div
                  className={styles.lightboxContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.closeBtn}
                    onClick={() => setActivePhotoIndex(null)}
                    title="关闭 (Esc)"
                  >
                    ✕
                  </button>

                  <button
                    className={clsx(styles.navBtn, styles.prevBtn)}
                    onClick={() =>
                      setActivePhotoIndex((prev) =>
                        prev === 0 ? currentAlbum.photos.length - 1 : prev - 1
                      )
                    }
                    title="上一张 (←)"
                  >
                    ‹
                  </button>

                  <div className={styles.lightboxMedia}>
                    <img
                      src={currentAlbum.photos[activePhotoIndex].src}
                      alt={currentAlbum.photos[activePhotoIndex].title}
                      className={styles.lightboxImage}
                    />
                  </div>

                  <button
                    className={clsx(styles.navBtn, styles.nextBtn)}
                    onClick={() =>
                      setActivePhotoIndex(
                        (prev) => (prev + 1) % currentAlbum.photos.length
                      )
                    }
                    title="下一张 (→)"
                  >
                    ›
                  </button>

                  <div className={styles.lightboxFooter}>
                    <div className={styles.footerRow}>
                      <h4 className={styles.footerPhotoTitle}>
                        {currentAlbum.photos[activePhotoIndex].title}
                      </h4>
                      <span className={styles.counterText}>
                        {activePhotoIndex + 1} / {currentAlbum.photos.length}
                      </span>
                    </div>
                    <div className={styles.footerCamera}>
                      📷 {currentAlbum.photos[activePhotoIndex].camera}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </Layout>
  );
}
