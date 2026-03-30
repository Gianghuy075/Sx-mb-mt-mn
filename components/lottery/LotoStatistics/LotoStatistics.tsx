/**
 * Loto Statistics Component
 * Displays loto table from API head-tail data
 */

type HeadTailLegacyShape = Record<string, Record<string, string[]>>; // { head: { "0": [...] }, tail: { "0": [...] } }

type HeadTailArrayShape = {
  heads?: { digit: number; numbers?: string[]; count?: number }[];
  tails?: { digit: number; numbers?: string[]; count?: number }[];
};

interface HeadTailResponse {
  success: boolean;
  data?: HeadTailLegacyShape & HeadTailArrayShape;
}

interface LotoStatisticsProps {
  headTailData?: HeadTailResponse | null;
  hotNumbers?: any;
  gapNumbers?: any;
  frequencyData?: any;
}

/**
 * Normalize API response to the legacy object-of-arrays shape the UI expects.
 * Supports both documented shape (head/tail objects) and current API shape (heads/tails arrays with digit/count).
 */
function normalizeHeadTail(data?: HeadTailResponse | null): { head: Record<string, string[]>; tail: Record<string, string[]> } {
  const head = data?.data?.head ?? {};
  const tail = data?.data?.tail ?? {};

  // If legacy shape exists, return it directly
  if (Object.keys(head).length > 0 || Object.keys(tail).length > 0) {
    return { head, tail };
  }

  // Handle array shape: heads/tails arrays with digit + optional numbers/count
  const arrHead = (data?.data as HeadTailArrayShape | undefined)?.heads ?? [];
  const arrTail = (data?.data as HeadTailArrayShape | undefined)?.tails ?? [];

  const normalizedHead: Record<string, string[]> = {};
  const normalizedTail: Record<string, string[]> = {};

  for (const item of arrHead) {
    const key = String(item.digit ?? '');
    if (!key) continue;
    const numbers = item.numbers ?? (typeof item.count === 'number' ? [`${item.count}`] : []);
    normalizedHead[key] = numbers;
  }

  for (const item of arrTail) {
    const key = String(item.digit ?? '');
    if (!key) continue;
    const numbers = item.numbers ?? (typeof item.count === 'number' ? [`${item.count}`] : []);
    normalizedTail[key] = numbers;
  }

  return { head: normalizedHead, tail: normalizedTail };
}

function buildLotoRows(data?: HeadTailResponse | null) {
  const normalized = normalizeHeadTail(data);
  const head = normalized.head;
  const tail = normalized.tail;

  return Array.from({ length: 10 }, (_, i) => {
    const key = String(i);
    const headNums = head[key] ?? [];
    const tailNums = tail[key] ?? [];
    const tailStr = headNums.join(',');
    const headEndStr = tailNums.join(',');
    return { head: i, tail: tailStr, headEnd: headEndStr, tailEnd: i };
  });
}

export default function LotoStatistics({ headTailData, hotNumbers, gapNumbers, frequencyData }: LotoStatisticsProps) {
  console.log('[LotoStatistics] headTailData:', headTailData);
  const lotoData = buildLotoRows(headTailData);
  const hasStats = Boolean(
    (hotNumbers?.success && (hotNumbers.data ?? []).length) ||
    (gapNumbers?.success && (gapNumbers.data ?? []).length) ||
    (frequencyData?.success && (frequencyData.data ?? []).length)
  );

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
                <td className="number-label">
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

      {hasStats && (
        <div className="loto-stats-grid">
          {hotNumbers?.success && (
            <div className="loto-stat-card">
              <h4>🔥 Top số nóng</h4>
              <p className="loto-stat-desc">Về nhiều nhất 30 ngày gần đây</p>
              <div className="loto-chip-list">
                {(hotNumbers.data || []).slice(0, 5).map((item: any, idx: number) => (
                  <div key={idx} className="loto-chip">
                    <span className="chip-number">{item.number}</span>
                    <span className="chip-meta">{item.count} lần</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {gapNumbers?.success && (
            <div className="loto-stat-card">
              <h4>🧊 Lô gan</h4>
              <p className="loto-stat-desc">Số lâu chưa về (tính theo ngày)</p>
              <div className="loto-chip-list">
                {(gapNumbers.data || []).slice(0, 5).map((item: any, idx: number) => (
                  <div key={idx} className="loto-chip">
                    <span className="chip-number">{item.number}</span>
                    <span className="chip-meta">{item.days} ngày</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {frequencyData?.success && (
            <div className="loto-stat-card">
              <h4>📊 Tần suất</h4>
              <p className="loto-stat-desc">Số xuất hiện nhiều nhất 100 kỳ</p>
              <div className="loto-chip-list">
                {(frequencyData.data || []).slice(0, 5).map((item: any, idx: number) => (
                  <div key={idx} className="loto-chip">
                    <span className="chip-number">{item.number}</span>
                    <span className="chip-meta">
                      {(item.frequency ?? item.count ?? item.percentage ?? '').toString()} lần
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
