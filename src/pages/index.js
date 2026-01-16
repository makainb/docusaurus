import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
        <div className="home-page-custom-style">

    <Layout description="Welcome to my world">
      <main className={styles.heroBanner}>
        <div className={styles.content}>
          <img src="/img/logo.png" className={styles.avatar} alt="Avatar" />
          <h1 className={styles.title}>{siteConfig.title}</h1>
          <p className={styles.subtitle}>{siteConfig.tagline}</p>
          {/* 这里可以添加社交链接图标 */}
        </div>
      </main>
    </Layout>
    </div>
  );
}
