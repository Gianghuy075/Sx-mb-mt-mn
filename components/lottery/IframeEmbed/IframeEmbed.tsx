/**
 * Iframe Embed Component
 * Nhúng kết quả từ website bên ngoài
 */

'use client';

import { useState } from 'react';
import styles from './IframeEmbed.module.css';

interface IframeEmbedProps {
  src: string;
  title: string;
  height?: string;
  responsive?: boolean;
}

export default function IframeEmbed({
  src,
  title,
  height = '800px',
  responsive = false,
}: IframeEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (responsive) {
    return (
      <div className={styles.responsiveWrapper}>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải kết quả...</p>
          </div>
        )}
        {error && (
          <div className={styles.error}>
            <p>❌ Không thể tải iframe từ nguồn này</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>
              Website có thể đã chặn embed qua iframe.
            </p>
          </div>
        )}
        <iframe
          src={src}
          title={title}
          className={styles.responsiveIframe}
          onLoad={handleLoad}
          onError={handleError}
          allow="fullscreen"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Đang tải kết quả...</p>
        </div>
      )}
      {error && (
        <div className={styles.error}>
          <p>❌ Không thể tải iframe từ nguồn này</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Website có thể đã chặn embed qua iframe.
          </p>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        className={styles.iframe}
        onLoad={handleLoad}
        onError={handleError}
        allow="fullscreen"
        loading="lazy"
      />
    </div>
  );
}
