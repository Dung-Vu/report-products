window.impactProjects = [
    {
        id: "bonario-product-hub",
        name: "Bonario Product Hub",
        chapter: "Product Data / Odoo",
        hook: "Kết nối vào Odoo, quét 6,677 sản phẩm và 3,540 BOM mỗi ngày — thay vì phải mở Odoo check tay.",
        problem:
            "Có 6,677 sản phẩm và 3,539 BOM trong Odoo nhưng không có tool nào biết cái nào đang thiếu thiết lập, không có lịch sử ai chỉnh gì, kiểm tra hàng loạt phụ thuộc người nhớ.",
        built: "Flask + React hub kết nối Odoo — có Product Checker, BOM Automation, Pricelist Tools, workflow scheduler và audit log. Daily scan chạy tự động, lịch sử 50 lần không hỏng.",
        verifiedMetrics: [
            "6,677 sản phẩm và 3,540 công thức sản xuất trong Odoo — kiểm tra 15/05/2026",
            "Tự động hóa chạy 50 lần liên tiếp không hỏng — từ 07/05 đến 15/05",
            "→ Giám sát tồn kho: 42 lần, theo dõi 20 mặt hàng biến động",
            "→ Rà soát sản phẩm hàng ngày: 8 lần, mỗi lần phát hiện ~800 mục cần xem lại và gửi báo cáo",
            "104 thao tác được ghi lại — 34 cập nhật giá vốn, 32 xử lý BOM, 32 bảng giá, 4 AI chat",
        ],
    },
    {
        id: "ord-price-lookup",
        name: "ORD Price Lookup",
        chapter: "Sales Support",
        hook: "478 lượt tra giá từ tháng 12 — Sales dùng 103 lần, AI chat dùng 375 lần.",
        problem:
            "Sales cần tra giá nhanh nhưng data ở Excel, không ai chắc bản nào mới nhất. Không phân role được, không tracking được ai tra cái gì.",
        built: "React + Flask + PostgreSQL — search giá, phân quyền sale/sc/admin, import/export và audit. PostgreSQL thay dần Excel.",
        verifiedMetrics: [
            "478 lượt tra giá (103 từ Sales + 375 từ AI chat) — lịch sử hệ thống",
            "Giai đoạn: 30/12/2025 → 08/05/2026",
            "481 sản phẩm quản trị, 789 sản phẩm bảng giá Sales",
            "Toàn bộ hệ thống đang hoạt động bình thường",
        ],
    },
    {
        id: "bonario-stock-management",
        name: "Bonario Stock Management",
        chapter: "Warehouse / Stock",
        hook: "Nền tảng tra cứu tồn kho và kiểm kho — phân quyền, nhật ký thao tác, cập nhật trực tiếp — sẵn sàng khi cần kiểm kho thực tế.",
        problem:
            "Kho cần tra cứu và kiểm kho theo quy trình — phân quyền admin/counter, audit log, nhiều người check cùng lúc. Không có tool thì tất cả đều làm tay.",
        built: "Frontend + Express + PostgreSQL — auth, audit log, WebSocket live, mobile app. Nền đã sẵn cho kiểm kho đồng thời.",
        verifiedMetrics: [
            "43 hành động ghi lại (đăng nhập, quản lý tài khoản — tháng 3/2026)",
            "Ứng dụng đang hoạt động bình thường",
        ],
    },
    {
        id: "in-label-pdf",
        name: "In Label PDF",
        chapter: "Warehouse / QC",
        hook: "In label và QC batch nhập kho kết nối Odoo — lưu lịch sử, xuất báo cáo — 7+ batch trong session này.",
        problem:
            "In label và QC nhập kho cần lấy từ Odoo — làm tay mất nhiều bước, không lưu lịch sử, không xuất báo cáo được.",
        built: "React + Express + kết nối Odoo + SQLite — label PDF, QC batch, xuất báo cáo. 7+ đợt đã xử lý, ứng dụng đang chạy.",
        verifiedMetrics: [
            "7+ đợt QC hoàn chỉnh từ lần khởi động gần nhất",
            "10 sản phẩm trong đợt QC cuối (đợt #7)",
            "Ứng dụng đang hoạt động bình thường",
        ],
    },
    {
        id: "auto-workflow",
        name: "Auto Workflow",
        chapter: "Automation",
        hook: "9 kênh tự động đang hoạt động, hàng ngày tự chạy — gom hết tự động hóa vào một chỗ.",
        problem:
            "Shopify, Odoo, Zalo ZNS, Telegram và task định kỳ — mỗi cái một chỗ thì khó debug, không biết cái nào đang chạy, cái nào đang lỗi.",
        built: "Flask hub — 9 webhook live, scheduler daily, Zalo ZNS tự refresh, Telegram gửi thông báo. Đang chạy ổn định.",
        verifiedMetrics: [
            "9 kênh nhận lệnh tự động đang hoạt động (Shopify, FSM, ZNS, Telegram...)",
            "Tự động hóa chạy 50 lần liên tiếp không hỏng — từ 07/05 đến 15/05",
            "→ Giám sát tồn kho: 42 lần, theo dõi 20 mặt hàng biến động",
            "→ Rà soát sản phẩm hàng ngày: 8 lần, mỗi lần phát hiện ~800 mục cần xem lại và gửi báo cáo",
            "ZNS tự làm mới token hàng ngày cho cả 2 dự án — kiểm tra 15/05/2026",
            "2 cuộc họp tự động được ghi nhận hoàn tất",
            "Ứng dụng đang chạy bình thường",
        ],
    },
    {
        id: "op-round-robin",
        name: "OP Round Robin",
        chapter: "Back Office Automation",
        hook: "Python worker kết nối Odoo — gán OP, xử lý bill/VAT, lưu PDF. 983 file trong kho chứng từ, xem được qua web.",
        problem:
            "Gán OP, xử lý bill và lưu PDF cuối tháng — làm tay mất thời gian, dễ sai tên file, không có chỗ lưu tập trung.",
        built: "Tiến trình tự động kết nối Odoo — gán OP luân phiên, xử lý bill/VAT, đọc và lưu PDF. 2,720 hóa đơn, 983 PDF đang lưu trữ.",
        verifiedMetrics: [
            "2,720 hóa đơn nhà cung cấp trong Odoo từ 22/09/2025 — kiểm tra 16/05/2026",
            "983 PDF + 13 ảnh trong kho chứng từ (~201MB)",
            "Chứng từ mỗi tháng: T1/2026: 312, T2: 156, T3: 222, T4: 266",
            "Tự động gán OP đang chạy — 1 lần gán xác nhận trong lịch sử",
        ],
    },
    {
        id: "bills-server",
        name: "Bills Archive Server",
        chapter: "Document Access",
        hook: "983 PDF chứng từ truy cập được qua trình duyệt — không cần mở folder local nữa.",
        problem:
            "Chứng từ trong folder local thì dùng được nhưng không chia sẻ được, không gắn vào pipeline tự động.",
        built: "Web nội bộ phục vụ 983 PDF chứng từ từ tháng 12/2025 — truy cập qua trình duyệt, gắn với tunnel.",
        verifiedMetrics: [
            "983 PDF, 13 ảnh — kho lưu trữ (201MB)",
            "Giai đoạn: tháng 12/2025 → tháng 5/2026",
            "Web xem chứng từ hoạt động bình thường — phục vụ từ tháng 12/2025",
        ],
    },
    {
        id: "calculate-curtain-size",
        name: "Curtain Size Calculator",
        chapter: "Production Tools",
        hook: "Web app tính vải và kích thước rèm — team SC dùng từ Q4 2025, xử lý được file Excel/PDF sản xuất và xuất layout BON.",
        problem:
            "Công thức tính rèm, lượng vải, chuyển Excel/PDF sản xuất có nhiều biến — làm tay dễ sai, khó kiểm tra lại, mỗi người một cách.",
        built: "Flask web + FastAPI + pandas/openpyxl/PyMuPDF — form, upload Excel/PDF, xuất layout BON. 5 lần xử lý file sản xuất gần nhất (14-15/05/2026).",
        verifiedMetrics: [
            "5 lần xử lý file sản xuất thật (14-15/05/2026)",
            "Xuất file: Báo giá, mẫu BON, các biến thể đã xử lý",
            "Công cụ tính toán đang hoạt động bình thường",
        ],
    },
    {
        id: "visual-brief-builder",
        name: "Visual Brief Builder",
        chapter: "Marketing / Creative",
        hook: "Chuẩn hóa brief AI image — model, ratio, rule, reference — không cần biết prompt vẫn dùng được.",
        problem:
            "AI image dễ lệch brand nếu mỗi người tự viết prompt theo cách riêng — không có quy trình chung, khó lặp lại.",
        built: "Static app + Nginx — brief builder, model selection, ratio logic, reference, refinement preset. Quy trình: brief → generate → refine.",
        verifiedMetrics: [
            "Công cụ brief AI đang hoạt động bình thường — đang theo dõi mức độ sử dụng.",
        ],
    },
    {
        id: "tunnel-master",
        name: "Tunnel Master",
        chapter: "Infrastructure",
        hook: "Cloudflare Tunnel tập trung — 6+ service nội bộ ra ngoài qua subdomain, không mở port.",
        problem:
            "Mỗi app một cấu hình tunnel riêng thì rối, khó debug khi có sự cố, và không có chỗ xem tổng thể.",
        built: "Cloudflare Tunnel với cấu hình tập trung — tất cả subdomain chạy qua 1 điểm quản lý. Vận hành ổn định từ Q4 2025, toàn bộ hoạt động bình thường.",
        verifiedMetrics: ["Hệ thống kết nối internet vận hành ổn định — kiểm tra 15/05 toàn bộ hoạt động bình thường"],
    },
    {
        id: "action-local-bridge",
        name: "Action Local Bridge",
        chapter: "Infrastructure",
        hook: "Cầu nối kết nối nội bộ — định tuyến sạch, không đụng vào backend.",
        problem:
            "Cần đưa action-product ra ngoài qua tunnel riêng mà không thêm logic vào backend chính.",
        built: "Cầu nối nhẹ chuyển tiếp kết nối trong mạng nội bộ — không có database, không có giao diện riêng. Vận hành ổn định cùng hệ thống.",
        verifiedMetrics: [
            "Cầu nối kết nối đang hoạt động bình thường",
            "Chuyển tiếp kết nối nội bộ đang hoạt động",
        ],
    },
];

window.futureProjects = [
    {
        id: "create-account-odoo",
        name: "Odoo Account Provisioning",
        department: "HR / Admin / IT",
        status: "đang triển khai",
        why: "Dự án này đang phân tích role/job/group thật trên Odoo để chuẩn hóa tạo user, employee, partner và reset password theo cấu hình.",
        caution:
            "Chưa đưa vào thành tích hoàn tất. Chỉ dùng trong phần roadmap năng lực tiếp theo cho HR và quản trị tài khoản.",
    },
];
