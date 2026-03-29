/**
 * Home Page - Minh Ngoc Embedded
 */

'use client';

export default function HomePage() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 120px)' }}>
      <iframe
        src="https://www.minhngoc.net.vn/free/index.php"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="Minh Ngọc - Kết quả Xổ số"
        id="iframe_xosominhngoc"
        name="iframe_xosominhngoc"
      />
    </div>
  );
}
