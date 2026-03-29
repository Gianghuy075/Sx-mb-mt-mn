/**
 * Minh Ngoc Embedded Page
 * Full-screen iframe, no header/footer
 */

'use client';

export default function MinhNgocPage() {
  return (
    <iframe
      src="https://www.minhngoc.net.vn/free/index.php"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0
      }}
      title="Minh Ngọc - Kết quả Xổ số"
      id="iframe_xosominhngoc"
      name="iframe_xosominhngoc"
      frameBorder="0"
      scrolling="auto"
    />
  );
}
