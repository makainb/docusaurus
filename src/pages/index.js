import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
// 1. 引入打字机组件
import Typewriter from 'typewriter-effect';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
        <div className="home-page-custom-style">

    <Layout description="Welcome to my world">
      <main className={styles.heroBanner}>
        <div className={styles.content}>
          <img src="/img/logo.png" className={styles.avatar} alt="Avatar" />
          <h1 className={styles.title}>{siteConfig.title}</h1>
          {/* 2. 替换原有的 p 标签内容 */}
            <div className={styles.subtitle}>
              <Typewriter
                options={{
                  strings: [
                    siteConfig.tagline,
                    "身为年迈的剑客不得不承认世界将属于年轻人，但鄙人的剑也未尝不利！",
                    "江湖路远, 有缘再见！",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 100,      // 打字速度
                  deleteSpeed: 50, // 删除速度
                }}
              />
            </div>
          {/* 这里可以添加社交链接图标 */}
        </div>
      </main>
    </Layout>
    </div>
  );
}
