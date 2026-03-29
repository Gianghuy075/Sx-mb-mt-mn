/**
 * Loading State
 */

export default function Loading() {
  return (
    <div className="main-wrapper">
      <main className="main-content">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid var(--primary-red)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
            Đang tải kết quả...
          </p>
        </div>
      </main>
    </div>
  );
}
