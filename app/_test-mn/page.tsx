/**
 * Test Iframe - MinhNgoc.net
 */

'use client';

import { useState } from 'react';

export default function TestMinhNgocPage() {
  const [url, setUrl] = useState('https://www.minhngoc.net/xo-so-truc-tiep/mien-bac.html');

  const urls = [
    { label: 'XSMB Trực tiếp', value: 'https://www.minhngoc.net/xo-so-truc-tiep/mien-bac.html' },
    { label: 'XSMB Kết quả', value: 'https://www.minhngoc.net/ket-qua-xo-so/mien-bac.html' },
    { label: 'XSMT Trực tiếp', value: 'https://www.minhngoc.net/xo-so-truc-tiep/mien-trung.html' },
    { label: 'XSMN Trực tiếp', value: 'https://www.minhngoc.net/xo-so-truc-tiep/mien-nam.html' },
    { label: 'Trang chủ', value: 'https://www.minhngoc.net/' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#c0392b', marginBottom: '20px' }}>
        🎯 Test Iframe - MinhNgoc.net
      </h1>

      {/* URL Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
          Chọn trang để test:
        </label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {urls.map((item) => (
            <button
              key={item.value}
              onClick={() => setUrl(item.value)}
              style={{
                padding: '10px 16px',
                backgroundColor: url === item.value ? '#c0392b' : 'white',
                color: url === item.value ? 'white' : '#333',
                border: '2px solid #c0392b',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom URL */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
          Hoặc nhập URL tùy chỉnh:
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
          <button
            onClick={() => window.open(url, '_blank')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            🔗 Mở tab mới
          </button>
        </div>
      </div>

      {/* Current URL display */}
      <div
        style={{
          padding: '12px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px',
          wordBreak: 'break-all',
        }}
      >
        <strong>Đang test:</strong> {url}
      </div>

      {/* Iframe Tests */}
      <div style={{ display: 'grid', gap: '40px' }}>
        {/* Test 1 */}
        <section>
          <h2 style={{ marginBottom: '12px', fontSize: '18px', color: '#333' }}>
            1️⃣ Iframe 800px
          </h2>
          <div
            style={{
              border: '2px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
            }}
          >
            <iframe
              src={url}
              width="100%"
              height="800"
              style={{ border: 'none', display: 'block' }}
              title="Test 800px"
            />
          </div>
        </section>

        {/* Test 2 */}
        <section>
          <h2 style={{ marginBottom: '12px', fontSize: '18px', color: '#333' }}>
            2️⃣ Iframe 1200px
          </h2>
          <div
            style={{
              border: '2px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
            }}
          >
            <iframe
              src={url}
              width="100%"
              height="1200"
              style={{ border: 'none', display: 'block' }}
              title="Test 1200px"
            />
          </div>
        </section>

        {/* Test 3 */}
        <section>
          <h2 style={{ marginBottom: '12px', fontSize: '18px', color: '#333' }}>
            3️⃣ Iframe Responsive (16:9)
          </h2>
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              border: '2px solid #ddd',
              borderRadius: '8px',
              backgroundColor: 'white',
            }}
          >
            <iframe
              src={url}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Test Responsive"
            />
          </div>
        </section>
      </div>

      {/* Info */}
      <div
        style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e8f5e9',
          border: '2px solid #4caf50',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginBottom: '12px', color: '#2e7d32' }}>✅ Kiểm tra:</h3>
        <ul style={{ marginLeft: '20px', color: '#2e7d32', lineHeight: 1.8 }}>
          <li>Iframe có hiển thị nội dung không?</li>
          <li>Nhấn <strong>F12</strong> → Console → Có lỗi không?</li>
          <li>Có thể scroll trong iframe không?</li>
          <li>Link trong iframe hoạt động không?</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#e3f2fd',
          border: '2px solid #2196f3',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginBottom: '12px', color: '#1565c0' }}>
          🔍 Nếu thấy lỗi X-Frame-Options:
        </h3>
        <pre
          style={{
            backgroundColor: '#263238',
            color: '#ff5252',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '13px',
            overflow: 'auto',
          }}
        >
{`Refused to display '...' in a frame because
it set 'X-Frame-Options' to 'SAMEORIGIN'.`}
        </pre>
        <p style={{ color: '#1565c0', marginTop: '10px' }}>
          → Website đã chặn embed, không thể dùng iframe
        </p>
      </div>
    </div>
  );
}
