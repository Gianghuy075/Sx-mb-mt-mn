/**
 * Error State
 */

'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="main-wrapper">
      <main className="main-content">
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            background: 'var(--white)',
            border: '1px solid var(--border-light)',
            borderRadius: '4px',
          }}
        >
          <h2 style={{ color: 'var(--primary-red)', marginBottom: '10px' }}>
            Có lỗi xảy ra
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            {error.message || 'Không thể tải dữ liệu'}
          </p>
          <button
            onClick={reset}
            style={{
              background: 'var(--primary-red)',
              color: 'var(--white)',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Thử lại
          </button>
        </div>
      </main>
    </div>
  );
}
