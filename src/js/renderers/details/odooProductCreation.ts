export function renderOdooProductCreationDetail(): string {
    return `
    <article class="pd-card pd-card-product-data pd-card-supplier-sync" style="--pd-accent:#0f766e">
      <header class="pd-head">
        <p class="pd-kicker">08.1 · Supplier Data Clean</p>
        <h2 class="pd-title">Đồng bộ &amp; clean 16.000 sản phẩm Bonario</h2>
        <p class="pd-subtitle">Làm sạch dữ liệu Bonario từ nguồn thô của Arte, Acacia và các nhà cung cấp khác. Từ dữ liệu ban đầu chỉ có code và giá bán, workflow chuẩn hóa lại tên gốc, khổ vải, cách tính giá và pricelist để sản phẩm dùng được trên Odoo.</p>
      </header>

      <div class="pd-stats">
        <div class="pd-stat"><strong>2 tuần</strong><span>tạo, đồng bộ và clean dữ liệu chuẩn</span></div>
        <div class="pd-stat"><strong>~16.000</strong><span>sản phẩm Bonario được xử lý từ dữ liệu thô</span></div>
        <div class="pd-stat"><strong>~40tr</strong><span>lợi ích ròng từ khoảng 4 tháng được rút ngắn</span></div>
      </div>

      <div class="pd-body">
        <section>
          <div class="pd-supplier-head">
            <p class="pd-section-label">Nội dung xử lý</p>
            <h3>Từ dữ liệu thô của nhà cung cấp thành dữ liệu sản phẩm có thể vận hành trên Odoo.</h3>
            <p>Trong vòng 2 tuần, workflow đã tạo và đồng bộ dữ liệu chuẩn cho khoảng 16.000 sản phẩm từ nguồn thô ban đầu chỉ có code và giá bán do nhà cung cấp đưa ra. Phần việc này không chỉ upload sản phẩm, mà còn phải tìm lại tên gốc, kích thước/khổ vải và các thông tin cần thiết để sản phẩm trên Odoo dùng được cho tính giá và vận hành.</p>
          </div>
          <div class="pd-supplier-stats">
            <div><strong>4,5 tháng</strong><span>ước tính nếu làm thủ công với năng lực phổ thông</span></div>
            <div><strong>4 tháng</strong><span>thời gian được rút ngắn so với làm thủ công</span></div>
            <div><strong>2.25 / 2.55</strong><span>hệ số giá cho 2 trường hợp dịch vụ</span></div>
            <div><strong>2 pricelist</strong><span>chỉ áp dụng cho sản phẩm Arte trên Odoo</span></div>
          </div>
          <div class="pd-two-col">
            <div class="pd-box">
              <p class="pd-section-label">Cách xử lý dữ liệu</p>
              <ul class="pd-list">
                <li>Tìm và chạy lệnh trên website nhà cung cấp để tra tên gốc của sản phẩm.</li>
                <li>Tìm kích thước/khổ vải để có dữ liệu đầu vào cho việc tính giá hàng loạt.</li>
                <li>Chuẩn hóa tên sản phẩm trên Odoo thay vì chỉ dùng code và giá bán thô.</li>
                <li>Tạo dữ liệu cho sản phẩm C (Thành phẩm Rèm) theo phương pháp tính giá của công ty.</li>
              </ul>
            </div>
            <div class="pd-box">
              <p class="pd-section-label">Giá và pricelist</p>
              <ul class="pd-list">
                <li>Tính giá hệ số cho trường hợp chưa có dịch vụ và có dịch vụ.</li>
                <li>Áp dụng hệ số 2.25 và 2.55 theo cách tính của công ty.</li>
                <li>Tạo 2 pricelist riêng biệt cho sản phẩm Arte để hiển thị giá chính xác và nhanh trên Odoo.</li>
                <li>Giảm thao tác tra cứu/tính lại thủ công khi cần báo giá hoặc kiểm tra sản phẩm.</li>
              </ul>
            </div>
          </div>
          <div class="pd-wide-box">
            <p class="pd-section-label">Tác động</p>
            <h3>Rút ngắn một khối lượng công việc ước tính 4,5 tháng xuống còn 2 tuần.</h3>
            <p>Nếu một người làm thủ công, không có nhiều kiến thức IT và không đủ kỹ năng xử lý các rào cản anti-bot từ website nhà cung cấp, toàn bộ công việc ước tính mất khoảng <strong>4,5 tháng</strong>. Workflow đã rút ngắn được khoảng <strong>4 tháng</strong>, với lợi ích ròng ước tính khoảng <strong>40 triệu VND</strong>.</p>
          </div>
        </section>
      </div>
    </article>`;
}
