/**
 * Loto Statistics Component
 * Displays loto table, comments, links, and SMS info
 */

export default function LotoStatistics() {
  // Sample loto data - in real app this would be generated from results
  const lotoData = [
    { head: 0, tail: '5,4', headEnd: '2,8,3,1', tailEnd: 0, isRed: true },
    { head: 1, tail: '8,4,6,0', headEnd: '9,2', tailEnd: 1 },
    { head: 2, tail: '0,1,5,4', headEnd: '3', tailEnd: 2 },
    { head: 3, tail: '2,3,8,8,8,0', headEnd: '3', tailEnd: 3 },
    { head: 4, tail: '9', headEnd: '8,7,1,2,0', tailEnd: 4 },
    { head: 5, tail: '7', headEnd: '6,0,2,6', tailEnd: 5 },
    { head: 6, tail: '5,5', headEnd: '9,7,8,1', tailEnd: 6 },
    { head: 7, tail: '6,4', headEnd: '5', tailEnd: 7 },
    { head: 8, tail: '4,0,6', headEnd: '1,3,3,3', tailEnd: 8 },
    { head: 9, tail: '1,6', headEnd: '4', tailEnd: 9 },
  ];

  const comments = [
    '49: Về liên tiếp 2 ngày',
    '96: Về liên tiếp 2 ngày',
    '18: Về liên tiếp 2 ngày',
    '86: Gan 9 ngày đã về',
    '38: Về 2 lần',
    '14: Về liên tiếp 2 ngày',
    '38: Về 3 lần',
    '10: Về liên tiếp 2 ngày',
    '65: Về 2 lần',
  ];

  return (
    <section className="loto-stats-section">
      <h3 className="loto-stats-title">Bảng LotoMB / Loto MB thứ 6</h3>

      <div className="loto-table-wrapper">
        <table className="loto-stats-table">
          <thead>
            <tr>
              <th className="col-head">Đầu</th>
              <th className="col-tail">Đuôi</th>
              <th className="col-head">Đầu</th>
              <th className="col-tail">Đuôi</th>
            </tr>
          </thead>
          <tbody>
            {lotoData.map((row, index) => (
              <tr key={index}>
                <td className={`number-label ${row.isRed ? 'red' : ''}`}>
                  {row.head}
                </td>
                <td className="number-value">{row.tail}</td>
                <td className="number-value">{row.headEnd}</td>
                <td className="number-label">{row.tailEnd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comments Section */}
      <div className="loto-comments">
        <h4 className="comments-title">● BÌNH LUẬN</h4>
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>

      {/* Related Links */}
      <div className="loto-links">
        <a href="#" className="loto-link">
          ‣ Loto gan Miền Bắc
        </a>
        <a href="#" className="loto-link">
          ‣ XSMB 30 ngày
        </a>
        <a href="#" className="loto-link">
          ‣ KQXS 3 miền Hôm nay
        </a>
        <a href="#" className="loto-link">
          ‣ Thống kê giải đặc biệt miền Bắc
        </a>
      </div>

      {/* SMS Info */}
      <div className="sms-info">
        <p>
          Nhắn <span className="highlight">KQXS</span> MB, soạn{' '}
          <span className="highlight">XS MB</span> gửi{' '}
          <span className="highlight">8136</span> (1.500đ/SMS)
        </p>
        <p>
          Nhắn kết quả tương thuật XS soạn{' '}
          <span className="highlight">XS MB</span> gửi{' '}
          <span className="highlight">8336</span> (3.000đ/SMS)
        </p>
      </div>
    </section>
  );
}
