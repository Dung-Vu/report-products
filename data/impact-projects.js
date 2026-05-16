window.impactProjects = [
    {
        id: "bonario-product-hub",
        name: "Bonario Product Hub",
        chapter: "Product Data / Odoo",
        hook: "Hub vận hành trên Odoo quản trị 6,677 sản phẩm và 3,539 BOM không phụ thuộc thao tác rời rạc.",
        problem:
            "Odoo có 6,677 sản phẩm và 3,539 BOM nhưng thiếu lớp giám sát tập trung — kiểm tra, chỉnh sửa hàng loạt và cảnh báo vận hành phụ thuộc người nhớ làm. Không có lịch sử thay đổi tập trung và không có cách phát hiện sản phẩm thiếu thiết lập.",
        built: "Hub Flask + React kết nối Odoo với Product Checker, BOM Automation, Pricelist Tools, workflow scheduler và audit log. Daily scan ~800 issues/run, lịch sử 50/50 workflow success.",
        verifiedMetrics: [
            "6,677 sản phẩm, 3,539 BOM trong Odoo — Odoo 2026-05-15",
            "Scheduler chạy 50 lần liên tiếp, không lần nào thất bại (2026-05-07 → 05-15)",
            "→ Stock Monitor: 42 lần chạy, theo dõi 20 variant tồn kho bất thường",
            "→ Daily Product Scan: 8 lần chạy, mỗi lần phát hiện ~800 vấn đề cần xem",
            "104 actions trong audit.db — 34 cost update, 32 BOM, 32 pricelist, 4 ai.chat, 2 khác (query 2026-05-15)",
        ],
    },
    {
        id: "ord-price-lookup",
        name: "ORD Price Lookup",
        chapter: "Sales Support",
        hook: "Hệ thống tra cứu giá ghi lại 478 lượt từ 2025-12 — 103 lượt từ Sales, 375 lượt từ AI chat system.",
        problem:
            "Sales cần phản hồi giá nhanh nhưng dữ liệu rải rác giữa Excel, admin và nhiều người nắm khác nhau. Không có cách tra theo role và không có lịch sử thay đổi giá.",
        built: "React + Flask + PostgreSQL với search giá, role sale/sc/admin, import/export và search audit. Nền PostgreSQL thay thế dần Excel thủ công.",
        verifiedMetrics: [
            "478 searches (103 sale + 375 ai_chat) — PostgreSQL 2026-05-15",
            "Date range: 2025-12-30 → 2026-05-08",
            "481 admin products, 789 sale products tổng hợp",
            "Backend/frontend/database đang chạy healthy",
        ],
    },
    {
        id: "bonario-stock-management",
        name: "Bonario Stock Management",
        chapter: "Warehouse / Stock",
        hook: "Nền tảng tra cứu và kiểm kho cho kho vận hành nội bộ — nền sẵn, chưa có stocktake session.",
        problem:
            "Kho cần lớp công cụ để tra cứu tồn kho và kiểm kho theo quy trình chuẩn. Khó phân quyền admin/counter và truy vết thao tác nếu chỉ dựa vào flow rời rạc.",
        built: "Frontend + Express backend + PostgreSQL với auth, audit log, WebSocket live và mobile app. Nền sẵn cho kiểm kho nhiều người đồng thời.",
        verifiedMetrics: [
            "43 audit log (login/logout/user mgmt, 2026-03)",
            "Container đang chạy healthy trên port 5002",
        ],
    },
    {
        id: "in-label-pdf",
        name: "In Label PDF",
        chapter: "Warehouse / QC",
        hook: "Tool kết nối Odoo để in label và xử lý QC batch nhập kho thành workflow thay vì thao tác rời rạc.",
        problem:
            "In label nhập kho và QC cần lấy dữ liệu từ Odoo — làm tay mất nhiều bước và thiếu lịch sử QC tập trung. Không có cách xuất báo cáo chuẩn từ các phiếu nhập.",
        built: "React + Express + Odoo JSON-RPC + SQLite hỗ trợ label PDF, QC batch và xuất báo cáo. 7+ QC batches đã được lưu trong Docker, service đang chạy healthy.",
        verifiedMetrics: [
            "7+ QC batches trong container session hiện tại — Docker logs 2026-05-15 (persistence chưa xác nhận ngoài session)",
            "10 items trong batch cuối (batch #7)",
            "Service đang chạy healthy trên port 5003",
        ],
    },
    {
        id: "auto-workflow",
        name: "Auto Workflow",
        chapter: "Automation",
        hook: "Hub gom 9 webhook routes và scheduler định kỳ — tập trung hóa toàn bộ automation logic vào một service có thể giám sát.",
        problem:
            "Shopify, Odoo, Zalo ZNS, Telegram và các tác vụ định kỳ cần chạy ổn định — rải rác thành nhiều service riêng thì khó debug và khó thay đổi. Không có nơi xem tổng thể workflow nào đang chạy.",
        built: "Flask automation hub với 9 webhook routes live, scheduler daily, Zalo ZNS auto-refresh và Telegram integration. Container đang chạy healthy.",
        verifiedMetrics: [
            "9 webhook routes live (fsm, shopify, hdsd, rating, zns-done, conducted)",
            "Scheduler chạy 50 lần liên tiếp, không lần nào thất bại (2026-05-07 → 05-15)",
            "→ Stock Monitor: 42 lần chạy, theo dõi 20 variant tồn kho bất thường",
            "→ Daily Product Scan: 8 lần chạy, mỗi lần phát hiện ~800 vấn đề cần xem",
            "ZNS auto-refresh hàng ngày cho cả ORD và BON — health 2026-05-15",
            "2 meetings auto-ticked conducted — health: conducted.last_result.ticked",
            "Container đang chạy trên port 5050",
        ],
    },
    {
        id: "op-round-robin",
        name: "OP Round Robin",
        chapter: "Back Office Automation",
        hook: "Worker kết nối Odoo xử lý bill/VAT và phục vụ 983 chứng từ qua bills-server — 1 OP assignment xác nhận trong log.",
        problem:
            "Gán OP, xử lý bill và lưu PDF cuối tháng là các việc lặp lại, dễ sai tên file và tốn thời gian khi làm thủ công. Không có archive tập trung dễ truy cập và chia sẻ.",
        built: "Python worker kết nối Odoo XML-RPC, xử lý round-robin OP, bill/VAT, OCR/PDF và lưu vào thư mục bills. 2,709 vendor bills trong hệ thống, 983 PDF đang được serve.",
        verifiedMetrics: [
            "2,709 posted vendor bills trong Odoo từ 22/09/2025 — Odoo 2026-05-15",
            "983 PDF + 13 JPG trong kho chứng từ (~201MB)",
            "Bills monthly: Jan 312, Feb 156, Mar 222, Apr 266",
            "op-round-robin đang chạy, 1 OP assignment xác nhận trong log",
        ],
    },
    {
        id: "bills-server",
        name: "Bills Archive Server",
        chapter: "Document Access",
        hook: "Archive web serve 983 PDF chứng từ nội bộ qua trình duyệt thay vì đường dẫn local.",
        problem:
            "Chứng từ nằm trong thư mục local dùng được nhưng không có cách truy cập thống nhất và khó gắn vào pipeline tự động. Chia sẻ file phụ thuộc copy tay hoặc đường dẫn local.",
        built: "Nginx container serve thư mục bills read-only với 983 PDF, 13 JPG (201MB) từ 2025-12 đến nay. Kết nối với tunnel để chia sẻ nội bộ.",
        verifiedMetrics: [
            "983 PDF, 13 JPG — kho chứng từ (201MB)",
            "Date range: 2025-12 → 2026-05",
            "bills-server up 7 days, nginx:alpine serving read-only",
        ],
    },
    {
        id: "calculate-curtain-size",
        name: "Curtain Size Calculator",
        chapter: "Production Tools",
        hook: "Web app và API chuẩn hóa tính kích thước rèm và xử lý Excel/PDF sản xuất theo batch.",
        problem:
            "Công thức tính kích thước rèm, lượng vải và chuyển Excel/PDF sản xuất có nhiều biến — làm tay dễ sai và khó chuẩn hóa output. Không có nơi kiểm tra công thức chung giữa các người làm.",
        built: "Flask web + FastAPI + pandas/openpyxl/PyMuPDF với form, upload Excel/PDF và xuất layout BON. 5 POST /process_production_pdf có dấu hiệu dùng thật (2026-05-14 → 05-15, chưa đủ volume để claim production).",
        verifiedMetrics: [
            "5 POST /process_production_pdf requests (2026-05-14 → 05-15)",
            "Excel output: Baogia.xlsx, BON template, processed variants",
            "Web/API đang chạy healthy trên ports 5000/8000",
        ],
    },
    {
        id: "visual-brief-builder",
        name: "Visual Brief Builder",
        chapter: "Marketing / Creative",
        hook: "Tool brief AI image với rule, model, ratio và reference — giảm phụ thuộc vào kỹ năng prompt cá nhân.",
        problem:
            "Tạo hình lifestyle bằng AI dễ bị lệch brand và khó lặp lại nếu prompt do mỗi người tự viết theo cách riêng. Không có quy trình chuẩn từ brief → generate → refine.",
        built: "Static app + Nginx với brief builder, model selection, ratio logic, reference images và refinement presets. Workflow chuẩn hóa brief → generate → refine cho cả người không chuyên kỹ thuật.",
        verifiedMetrics: [
            "ordinaire-brief-builder đang chạy port 9001, service healthy — adoption chưa được đo",
        ],
    },
    {
        id: "tunnel-master",
        name: "Tunnel Master",
        chapter: "Infrastructure",
        hook: "Gateway tập trung publish 6+ service nội bộ qua Cloudflare domain không cần mở port.",
        problem:
            "Mỗi app cần truy cập riêng sẽ rối routing và tăng rủi ro nếu không có lớp quản lý tunnel chung. Cấu hình riêng từng service khó maintain và khó debug khi sự cố.",
        built: "Cloudflare Tunnel stack với config tập trung, route qua host.docker.internal. Container up 7 ngày liên tục, toàn bộ subdomain hoạt động.",
        verifiedMetrics: ["bonario-master-tunnel up 7 days healthy"],
    },
    {
        id: "action-local-bridge",
        name: "Action Local Bridge",
        chapter: "Infrastructure",
        hook: "TCP bridge tách routing khỏi app chính — forward 5504 → action-product:5004 trong Docker network.",
        problem:
            "Cần expose action-product qua tunnel riêng mà không gắn thêm routing logic vào backend chính. Thay đổi đường truy cập không được ảnh hưởng backend.",
        built: "alpine/socat container forward TCP trong Docker network. Không có database, không có source riêng — chỉ routing. Container up 7 ngày.",
        verifiedMetrics: [
            "action-local-bridge up 7 days",
            "port 5504 → action-product:5004",
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
