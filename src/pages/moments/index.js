import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import momentsData from '../../data/moments.json';
import styles from './styles.module.css';

// 提取所有不重复的心情标签
const CATEGORIES = ['全部', ...Array.from(new Set(momentsData.map((m) => m.mood)))];

// 按天聚合分组函数
function groupMomentsByDay(momentsList) {
  const groups = [];
  const dateMap = new Map();

  momentsList.forEach((item) => {
    const [datePart, timePart] = item.date.trim().split(/\s+/);
    if (!dateMap.has(datePart)) {
      const [year, month, day] = datePart.split('-');
      const y = parseInt(year, 10);
      const m = parseInt(month, 10);
      const d = parseInt(day, 10);
      const dateObj = new Date(y, m - 1, d);
      const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const week = isNaN(dateObj.getDay()) ? '' : weekMap[dateObj.getDay()];

      const group = {
        dateKey: datePart,
        year: `${y}年`,
        monthDay: `${m}月${d}日`,
        week,
        items: [],
      };
      dateMap.set(datePart, group);
      groups.push(group);
    }

    dateMap.get(datePart).items.push({
      ...item,
      timeOnly: timePart || '',
    });
  });

  return groups;
}

export default function MomentsPage() {
  const [selectedMood, setSelectedMood] = useState('全部');
  const [likedIds, setLikedIds] = useState([]);

  // 点赞轻交互
  const handleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 1. 根据心情筛选
  const filteredMoments = useMemo(() => {
    return selectedMood === '全部'
      ? momentsData
      : momentsData.filter((m) => m.mood === selectedMood);
  }, [selectedMood]);

  // 2. 自动按天聚合：同一天发的多条合并在同一个日期分组下
  const dayGroups = useMemo(() => {
    return groupMomentsByDay(filteredMoments);
  }, [filteredMoments]);

  return (
    <Layout title="生活日志" description="按天聚合的专业级无框时间轴">
      <main className={styles.timelinePage}>
        {/* 顶部标题与分类 */}
        <header className={styles.headerSection}>
          <div className={styles.headerTag}>DAILY LOG & TIMELINE</div>
          <h1 className={styles.pageTitle}>生活日志 · 每日流</h1>
          <p className={styles.pageSubtitle}>
            按「天」自动归档合并：同一天无论发多少条，左侧日期仅显示一次；右侧沿时间线自然展开该天不同时刻的记录。
          </p>

          {/* 分类筛选胶囊 */}
          <div className={styles.filterBar}>
            {CATEGORIES.map((mood) => (
              <button
                key={mood}
                className={clsx(styles.filterBtn, {
                  [styles.filterBtnActive]: selectedMood === mood,
                })}
                onClick={() => setSelectedMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </header>

        {/* 核心时间轴：以天为一级聚合节点 */}
        <div className={styles.timelineContainer}>
          {dayGroups.map((group, groupIdx) => (
            <section key={group.dateKey} className={styles.daySection}>
              {/* ============================================================
                  1. 左侧：当天的年月日（同一天只显示一次，不重复占用视觉）
                 ============================================================ */}
              <div className={styles.dateCol}>
                <div className={styles.dateStickyBox}>
                  <div className={styles.monthDayText}>{group.monthDay}</div>
                  <div className={styles.yearWeekText}>
                    <span>{group.year}</span>
                    {group.week && (
                      <span className={styles.weekBadge}>{group.week}</span>
                    )}
                  </div>
                  {/* 若当天有多条记录，显示贴心计数 */}
                  {group.items.length > 1 && (
                    <div className={styles.dayCountTag}>
                      今日 {group.items.length} 记
                    </div>
                  )}
                </div>
              </div>

              {/* ============================================================
                  2. 中间：垂直主轴贯穿线
                 ============================================================ */}
              <div className={styles.axisCol}>
                {/* 当天的一级主锚点圆环 */}
                <div className={styles.dayMainDot} />
                {groupIdx !== dayGroups.length - 1 && (
                  <div className={styles.dayTrackLine} />
                )}
              </div>

              {/* ============================================================
                  3. 右侧：当天内按时刻串联的多条说说
                 ============================================================ */}
              <div className={styles.contentCol}>
                {/* 移动端日期头部 */}
                <div className={styles.mobileDayHeader}>
                  <span className={styles.mobileMonthDay}>{group.monthDay}</span>
                  <span className={styles.mobileYearWeek}>
                    {group.year} · {group.week}
                  </span>
                  {group.items.length > 1 && (
                    <span className={styles.mobileCountTag}>
                      ({group.items.length}条)
                    </span>
                  )}
                </div>

                {/* 属于当天的说说列表 */}
                <div className={styles.subStream}>
                  {group.items.map((item, itemIdx) => {
                    const isLiked = likedIds.includes(item.id);
                    const currentLikes = item.likes + (isLiked ? 1 : 0);

                    return (
                      <article key={item.id} className={styles.momentEntry}>
                        {/* 顶部：发布具体时刻 + 心情 + 设备 */}
                        <div className={styles.entryHeader}>
                          {item.timeOnly && (
                            <span className={styles.timeBadge}>
                              🕒 {item.timeOnly}
                            </span>
                          )}
                          <span className={styles.moodPill}>{item.mood}</span>
                          <span className={styles.tagPill}>#{item.tag}</span>
                          <span className={styles.deviceLabel}>via {item.device}</span>
                        </div>

                        {/* 正文文字（去框化，与背景无缝融合） */}
                        <div className={styles.textContent}>
                          {item.content.split('\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                        </div>

                        {/* 随拍配图 */}
                        {item.images && item.images.length > 0 && (
                          <div
                            className={clsx(styles.imageRow, {
                              [styles.singleImg]: item.images.length === 1,
                              [styles.multiImg]: item.images.length > 1,
                            })}
                          >
                            {item.images.map((imgUrl, i) => (
                              <div key={i} className={styles.imageThumb}>
                                <img
                                  src={imgUrl}
                                  alt={`moment-${item.id}-${i}`}
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 底部元信息与互动 */}
                        <div className={styles.entryFooter}>
                          <div className={styles.location}>
                            <span className={styles.locIcon}>📍</span>
                            <span>{item.location}</span>
                          </div>

                          <button
                            className={clsx(styles.actionLike, {
                              [styles.actionLiked]: isLiked,
                            })}
                            onClick={() => handleLike(item.id)}
                            title="喜欢"
                          >
                            <span>{isLiked ? '❤️' : '🤍'}</span>
                            <span className={styles.likeCount}>{currentLikes}</span>
                          </button>
                        </div>

                        {/* 同一天内多条记录之间的轻度细分割线 */}
                        {itemIdx !== group.items.length - 1 && (
                          <div className={styles.entryDivider} />
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
