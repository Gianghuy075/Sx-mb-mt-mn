/**
 * Lottery News Page - Tin xổ số
 */

import Sidebar from '@/components/layout/Sidebar/Sidebar';

export default function NewsPage() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '24px'
    }}>
      <main style={{ minWidth: 0, background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc0000', marginBottom: '20px' }}>
          Tin Tức Xổ Số
        </h1>

        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <p style={{ fontSize: '16px', marginBottom: '12px' }}>Trang tin tức đang được phát triển</p>
          <p style={{ fontSize: '14px' }}>Cập nhật tin tức, sự kiện, thông báo về xổ số...</p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Các chuyên mục:</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ padding: '20px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                📰 Tin tức mới nhất
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Cập nhật tin tức hàng ngày về xổ số Việt Nam
              </p>
            </div>

            <div style={{ padding: '20px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                🎉 Người trúng thưởng
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Câu chuyện về những người may mắn trúng giải
              </p>
            </div>

            <div style={{ padding: '20px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                📋 Quy định - Thể lệ
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Quy định chơi xổ số, thể lệ nhận thưởng
              </p>
            </div>

            <div style={{ padding: '20px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                💡 Mẹo chơi xổ số
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Kinh nghiệm, mẹo hay khi tham gia xổ số
              </p>
            </div>
          </div>
        </div>
      </main>

      <Sidebar />
    </div>
  );
}

export const metadata = {
  title: 'Tin Tức Xổ Số - Cập Nhật Hàng Ngày',
  description: 'Tin tức xổ số mới nhất, người trúng thưởng, quy định thể lệ, mẹo chơi xổ số',
  keywords: 'tin xổ số, tin tức, người trúng thưởng, quy định xổ số',
};
