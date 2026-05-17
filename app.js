(function () {
    "use strict";

    const projects = window.impactProjects || [];
    const impactEvidence = window.impactEvidence || {};
    const companyScale = Array.isArray(impactEvidence.companyScale)
        ? impactEvidence.companyScale
        : [];
    const repoRelevantOdoo = Array.isArray(impactEvidence.repoRelevantOdoo)
        ? impactEvidence.repoRelevantOdoo
        : [];
    const adoptionEvidence = impactEvidence.adoption || {};
    const runtimeEvidence = Array.isArray(impactEvidence.runtime)
        ? impactEvidence.runtime
        : [];
    const reportPeriod = impactEvidence.period || {};

    const PROJECT_RUNTIME_ALIASES = {
        "bonario-product-hub": ["action-product"],
        "bonario-stock-management": ["bonario-stock"],
        "ord-price-lookup": ["ord-price-lookup"],
        "in-label-pdf": ["in-label-pdf"],
        "auto-workflow": ["auto-workflow"],
        "op-round-robin": ["op-round-robin"],
        "bills-server": ["bills-server"],
        "calculate-curtain-size": ["curtain-calculator"],
        "visual-brief-builder": ["visual-brief-builder"],
        "tunnel-master": ["tunnel-master"],
        "action-local-bridge": ["action-local-bridge"],
    };

    function easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function animateCounter(el, target, suffix, duration) {
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(easeOut(progress) * target);
            el.textContent =
                new Intl.NumberFormat("vi-VN").format(current) + (suffix || "");
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const SYSTEM_GROUPS = [
        {
            id: "stock-price-ord",
            label: "Stock onhand - Giá Product Ordinaire",
            eyebrow: "01 · Sales / Stock",
            summary: "Tra tồn kho và giá ORD từ một nguồn dữ liệu rõ ràng",
            projectIds: ["bonario-stock-management", "ord-price-lookup"],
            countLabel: "2 hệ thống liên quan",
            accent: "#0369a1",
        },
        {
            id: "bonario-hub",
            label: "Bonario Hub",
            eyebrow: "02 · Product Ops",
            summary:
                "Hub trung tâm cho dữ liệu sản phẩm Bonario: checker, BOM, bảng giá, mô tả, audit log và daily scan.",
            projectIds: ["bonario-product-hub"],
            countLabel: "1 hub vận hành",
            accent: "#0f766e",
        },
        {
            id: "curtain-tools",
            label: "Rèm",
            eyebrow: "03 · Production",
            summary:
                "Tính vải, kích thước rèm, xử lý Excel/PDF sản xuất và xuất layout cho xưởng.",
            projectIds: ["calculate-curtain-size"],
            countLabel: "1 công cụ sản xuất",
            accent: "#0891b2",
        },
        {
            id: "odoo-pdf-documents",
            label: "Phiếu in PDF từ Odoo",
            eyebrow: "04 · Documents",
            summary:
                "Báo giá, in label hệ thống, bộ hồ sơ chứng từ VAT; phần documents thủ công được gom về một luồng dễ kiểm soát.",
            projectIds: ["in-label-pdf", "op-round-robin", "bills-server"],
            countLabel: "3 luồng chứng từ",
            accent: "#7c3aed",
        },
        {
            id: "sc-op-in-charge",
            label: "Tối ưu quy trình hoạt động SC",
            eyebrow: "05 · SC Ops",
            summary:
                "Phân công OP in charge, giảm thao tác chia việc thủ công và giúp trách nhiệm xử lý rõ ràng hơn.",
            projectIds: ["op-round-robin"],
            countLabel: "1 automation",
            accent: "#be123c",
        },
        {
            id: "local-server-infra",
            label: "Build hạ tầng: biến máy tính thành server",
            eyebrow: "06 · Platform",
            summary:
                "Docker, tunnel, bridge và routing để đưa app nội bộ ra domain có kiểm soát, không mở port trực tiếp.",
            projectIds: ["tunnel-master", "action-local-bridge"],
            countLabel: "2 lớp hạ tầng",
            accent: "#334155",
        },
        {
            id: "marketing-image-gen",
            label: "MKT gen hình",
            eyebrow: "07 · Marketing AI",
            summary:
                "Chuẩn hóa brief tạo hình AI theo brand, model, ratio, reference và rule để marketing dùng nhất quán.",
            projectIds: ["visual-brief-builder"],
            countLabel: "1 creative tool",
            accent: "#c026d3",
        },
        {
            id: "odoo-product-creation",
            label: "Tạo sản phẩm Odoo",
            eyebrow: "08 · Product Data",
            summary:
                "Làm sạch dữ liệu, checklist, upload sản phẩm nhanh hơn: BOM, giá cost, giá bán và sales description.",
            projectIds: ["bonario-product-hub"],
            countLabel: "1 quy trình dữ liệu",
            accent: "#0f766e",
        },
        {
            id: "company-switch-bon-ord",
            label: "Chuyển công ty BON - ORD",
            eyebrow: "09 · Company Flow",
            summary:
                "Chuẩn hóa thao tác chuyển ngữ cảnh giữa BON và ORD để dữ liệu, giá và chứng từ không bị lẫn luồng.",
            projectIds: ["bonario-product-hub", "ord-price-lookup"],
            countLabel: "2 nguồn dữ liệu",
            accent: "#4f46e5",
        },
        {
            id: "internal-order-tracking",
            label: "Tracking order internal",
            eyebrow: "10 · Order Tracking",
            summary:
                "Theo dõi đơn nội bộ và trạng thái xử lý để các team biết việc đang nằm ở đâu, ai phụ trách, cần làm gì tiếp.",
            projectIds: ["auto-workflow"],
            countLabel: "1 luồng tracking",
            accent: "#ea580c",
        },
        {
            id: "rfid",
            label: "RFID",
            eyebrow: "11 · Warehouse",
            summary:
                "Định hướng đối soát RFID cho kho: ghi nhận, reconcile và giảm lệch tồn khi hàng di chuyển qua nhiều bước.",
            projectIds: ["auto-workflow", "bonario-stock-management"],
            countLabel: "1 hướng mở rộng",
            accent: "#0d9488",
        },
        {
            id: "stock-escalation",
            label: "Escalate thông báo hàng",
            eyebrow: "12 · Alerting",
            summary:
                "Cảnh báo hàng hết stock, discontinue và đẩy thông báo tới Teams để xử lý trước khi người dùng phải hỏi.",
            projectIds: ["auto-workflow", "bonario-product-hub"],
            countLabel: "1 luồng cảnh báo",
            accent: "#dc2626",
        },
    ];

    const PROJECT_DETAIL_PROFILES = {
        "bonario-stock-management": {
            title: "Stock Onhand Management",
            timeline: "Được xây dựng và hoàn thiện trong vòng 2 ngày.",
            people: {
                intro: "Hoàn thiện bởi 2 người:",
                items: [
                    "Dũng xây dựng repo và xử lý logic hoàn chỉnh.",
                    "Anh Hà cải thiện giao diện.",
                ],
            },
            pnl: "Cost nội bộ: 2 ngày công và chi phí AI, tổng chi phí hết 1,2 triệu VND. P&L không tạo doanh thu trực tiếp nhưng giảm sai sót lệch tồn, giảm thời gian hỏi kho và rút ngắn quy trình nhận thông tin.",
            marketCost:
                "Nếu thuê thị trường ngoài cho sản phẩm production-grade tương đương: Backend khoảng 8 tuần, Frontend khoảng 8 tuần, DevOps khoảng 2,5 tuần. Chi phí nhân công tham chiếu tại Việt Nam gồm Senior Full-stack Lead 4.000 USD, Frontend Developer Mid 2.400 USD, DevOps part-time/shared 1.125 USD, tổng 7.525 USD, tương đương khoảng 198.321.188 VND.",
            roi: "Trước app, kiểm kho mất 3 ngày với 2 nhân sự. Sau app, còn 2 ngày với 1 nhân sự, tiết kiệm 4 ngày công tương đương khoảng 2 triệu VND. Tra cứu tồn kho mỗi lần giảm khoảng 15 phút; 1.359 request từ lúc app hoạt động tương đương khoảng 14 ngày công, khoảng 7 triệu VND.App đã duy trì 3 tháng, phần kiểm kho tiết kiệm khoảng 12 ngày công, tương đương 6 triệu VND; cộng với 7 triệu VND tiết kiệm tra cứu, tổng lợi ích khoảng 13 triệu VND. ROI ước tính: 1.083,3%.",
            strengths: [
                "Dữ liệu real-time.",
                "Kiểm kho hàng tháng không phụ thuộc vào phòng BIS để xuất số lượng tồn.",
                "Check được sản phẩm đó có thực sự tồn hay đang dính đơn, điểm mà khi check Odoo thủ công nhân sự kho dễ bỏ sót.",
            ],
            weaknesses: [
                "Vẫn đang trong quá trình phát triển.",
                "Cần tiếp tục scale thêm để bao phủ nhiều tình huống vận hành hơn.",
            ],
            description:
                "Hệ thống tra cứu tồn kho và kiểm kho nội bộ, thay luồng hỏi đáp thủ công và file rời. Giúp tiết kiệm thời gian và nắm bắt thông tin nhanh chóng trong quá trình giao tiếp với khách hàng.",
        },
        "ord-price-lookup": {
            timeline:
                "30/12/2025 - 08/05/2026: triển khai tra cứu giá ORD, quản trị sản phẩm bảng giá, phân quyền và audit usage.",
            people: "Sales là nhóm dùng chính; SC/admin quản trị dữ liệu; AI chat sử dụng dữ liệu để hỗ trợ trả lời nhanh hơn.",
            pnl: "Cost chủ yếu là thời gian phát triển và PostgreSQL nội bộ. P&L nằm ở giảm thời gian tra Excel, giảm sai giá và giảm phụ thuộc vào một file giá duy nhất.",
            roi: "478 lượt tra giá đã ghi nhận; ROI đến từ tốc độ phản hồi Sales và việc dữ liệu giá có một nguồn tham chiếu ổn định.",
            strengths: [
                "Có số usage rõ: 103 lượt từ Sales và 375 từ AI chat.",
                "Dữ liệu giá chuyển dần khỏi Excel sang PostgreSQL.",
                "Có phân quyền sale/sc/admin và import/export.",
            ],
            weaknesses: [
                "Cần quy trình cập nhật dữ liệu đều để bảng giá không bị cũ.",
                "Chưa quy đổi được ROI thành VND nếu chưa có log thời gian tiết kiệm trên từng lượt tra.",
            ],
            description:
                "Công cụ tra cứu và quản trị giá Product Ordinaire, giúp Sales và SC tìm giá nhanh, có quyền truy cập rõ ràng và có lịch sử để kiểm chứng dữ liệu sử dụng.",
        },
        "bonario-product-hub": {
            timeline:
                "Từ Q4/2025 đến 05/2026: xây hub dữ liệu sản phẩm, daily scan, BOM automation, pricelist tools và audit log.",
            people: "Product Ops, SC và người phụ trách dữ liệu Odoo dùng trực tiếp; quản lý hưởng lợi từ báo cáo lỗi tự động.",
            pnl: "Cost là thời gian build hub và vận hành Odoo integration. P&L nằm ở giảm lỗi dữ liệu sản phẩm, giảm kiểm tra thủ công và giảm chi phí sửa sai sau khi đã bán/sản xuất.",
            roi: "6,677 sản phẩm, 3,540 BOM và 50 lần chạy tự động không hỏng là tín hiệu ROI chính: một hệ thống kiểm soát dữ liệu thay cho việc mở Odoo check tay.",
            strengths: [
                "Daily scan tự động, có lịch sử chạy.",
                "Bao phủ nhiều điểm dữ liệu: BOM, cost, pricelist, description.",
                "Có audit log cho thao tác dữ liệu quan trọng.",
            ],
            weaknesses: [
                "Phụ thuộc chất lượng dữ liệu Odoo gốc.",
                "Cần tiếp tục tách lỗi thật/sai cảnh báo để giảm noise cho người dùng.",
            ],
            description:
                "Bonario Product Hub là lớp vận hành dữ liệu sản phẩm trên Odoo, gom kiểm tra, sửa, theo dõi và tự động hóa các bước dữ liệu sản phẩm vào một hub nội bộ.",
        },
        "in-label-pdf": {
            timeline:
                "Q4/2025 - 05/2026: triển khai in label PDF, QC batch và báo cáo nhập kho kết nối dữ liệu Odoo.",
            people: "Warehouse/QC là nhóm dùng chính; admin vận hành hưởng lợi khi phiếu và batch có lịch sử rõ hơn.",
            pnl: "Cost phát triển thấp do dùng hạ tầng nội bộ. P&L đến từ giảm thao tác lấy dữ liệu Odoo, in label tay và tổng hợp QC thủ công.",
            roi: "7+ batch QC và 10 sản phẩm trong batch gần nhất cho thấy luồng đã xử lý nghiệp vụ thật, không chỉ demo.",
            strengths: [
                "Kết nối trực tiếp Odoo để giảm nhập lại dữ liệu.",
                "Có lịch sử batch và báo cáo.",
                "Phù hợp nghiệp vụ kho cần thao tác nhanh.",
            ],
            weaknesses: [
                "Cần thêm thống kê sử dụng theo ngày/tháng để chứng minh adoption mạnh hơn.",
                "Nếu format Odoo thay đổi, phần in PDF cần được kiểm tra lại.",
            ],
            description:
                "Công cụ in label và xử lý QC batch nhập kho, biến dữ liệu phiếu trong Odoo thành PDF/luồng thao tác dùng được cho kho.",
        },
        "auto-workflow": {
            timeline:
                "Tháng 11/2025 - 05/2026: gom webhook, scheduler, ZNS refresh, Telegram alert và các luồng tự động vào một hub Flask.",
            people: "Ops, Sales, CS và người quản trị automation hưởng lợi; hệ thống chạy nền thay cho thao tác nhắc việc thủ công.",
            pnl: "Cost chính là thời gian phát triển và maintenance. P&L nằm ở việc giảm lỗi quên chạy task, giảm chi phí dùng automation rời rạc và giảm thời gian debug.",
            roi: "9 webhook live, 50/50 scheduler thành công và ZNS tự refresh hằng ngày là ROI về độ ổn định vận hành.",
            strengths: [
                "Tập trung nhiều automation vào một hub dễ kiểm soát.",
                "Có scheduler và webhook chạy thật.",
                "Có tích hợp Telegram/ZNS cho thông báo và token refresh.",
            ],
            weaknesses: [
                "Cần dashboard health chi tiết hơn để người khác tự kiểm tra.",
                "Khi số workflow tăng, cần chuẩn hóa logging và retry policy.",
            ],
            description:
                "Auto Workflow là hub tự động hóa nội bộ, xử lý webhook, scheduler và thông báo để những tác vụ lặp lại không còn phụ thuộc vào trí nhớ của từng người.",
        },
        "op-round-robin": {
            timeline:
                "Từ cuối 2025 đến 05/2026: triển khai worker gán OP, xử lý bill/VAT và liên kết lưu PDF chứng từ.",
            people: "Back Office, OP và admin chứng từ là nhóm hưởng lợi trực tiếp.",
            pnl: "Cost là worker nội bộ và thời gian bảo trì. P&L đến từ giảm thao tác chia OP, đặt tên/lưu chứng từ và xử lý cuối tháng.",
            roi: "2,720 hóa đơn Odoo và 983 PDF trong kho chứng từ cho thấy automation chạm vào khối lượng chứng từ đáng kể.",
            strengths: [
                "Tự động hóa đúng phần việc lặp lại và dễ sai.",
                "Có liên kết với kho PDF để truy cập qua web.",
                "Giảm phụ thuộc thao tác cuối tháng.",
            ],
            weaknesses: [
                "Cần thêm log số lần gán OP để đo adoption rõ hơn.",
                "Phụ thuộc cấu trúc dữ liệu Odoo và quy ước lưu file.",
            ],
            description:
                "Worker tự động cho back office, tập trung vào phân bổ OP, xử lý bill/VAT và lưu chứng từ để giảm thao tác thủ công.",
        },
        "bills-server": {
            timeline:
                "Từ 12/2025 đến 05/2026: đưa kho chứng từ PDF lên web nội bộ để truy cập qua trình duyệt.",
            people: "Back Office, kế toán/admin và người cần tra chứng từ là nhóm dùng chính.",
            pnl: "Cost vận hành thấp vì dùng static file server/Nginx. P&L nằm ở giảm thời gian tìm file local và giảm rủi ro file chỉ nằm trên một máy.",
            roi: "983 PDF và 13 ảnh (~201MB) được phục vụ qua web là ROI về khả năng truy cập và chia sẻ chứng từ.",
            strengths: [
                "Đơn giản, nhẹ, dễ vận hành.",
                "Biến folder local thành điểm truy cập qua web.",
                "Phù hợp làm lớp nền cho automation chứng từ.",
            ],
            weaknesses: [
                "Cần kiểm soát quyền truy cập nếu mở rộng ra nhiều người.",
                "Chưa phải document management đầy đủ như search metadata sâu.",
            ],
            description:
                "Bills Server là lớp web phục vụ kho PDF chứng từ, giúp mở và chia sẻ tài liệu qua trình duyệt thay vì truy cập folder local.",
        },
        "calculate-curtain-size": {
            timeline:
                "Q4/2025 - 05/2026: xây web tính rèm, xử lý Excel/PDF sản xuất và xuất layout BON.",
            people: "SC và production là nhóm dùng chính; người xử lý file sản xuất giảm thao tác tính tay.",
            pnl: "Cost là thời gian build và thư viện xử lý file. P&L đến từ giảm lỗi tính vải/kích thước và giảm thời gian chuyển đổi file sản xuất.",
            roi: "250 lượt sử dụng và 5 file sản xuất xử lý gần nhất là tín hiệu ROI về adoption thực tế.",
            strengths: [
                "Giải quyết bài toán nghiệp vụ có công thức phức tạp.",
                "Xử lý cả form, Excel và PDF.",
                "Output phục vụ trực tiếp cho xưởng/sản xuất.",
            ],
            weaknesses: [
                "Cần test kỹ khi format file đầu vào thay đổi.",
                "ROI tiền mặt cần thêm dữ liệu thời gian tiết kiệm trên mỗi file.",
            ],
            description:
                "Công cụ tính kích thước rèm và lượng vải, hỗ trợ xử lý file sản xuất hàng loạt để giảm sai sót khi tính tay.",
        },
        "visual-brief-builder": {
            timeline:
                "Q1-Q2/2026: chuẩn hóa luồng tạo brief hình AI cho marketing, từ chọn model/ratio đến reference và refinement.",
            people: "Marketing/Creative là nhóm dùng chính; người không chuyên prompt vẫn có thể tạo brief theo chuẩn.",
            pnl: "Cost thấp vì là static app + Nginx. P&L đến từ giảm vòng lặp prompt sai, giảm lệch brand và tiết kiệm thời gian brief hình.",
            roi: "ROI hiện ở mức quy trình: chuẩn hóa cách tạo brief và giảm phụ thuộc vào kỹ năng prompt của từng người.",
            strengths: [
                "Dễ dùng cho người không chuyên kỹ thuật.",
                "Chuẩn hóa model, ratio, rule và reference.",
                "Phù hợp mở rộng thành workflow creative nội bộ.",
            ],
            weaknesses: [
                "Chưa có số usage định lượng mạnh.",
                "Chất lượng output vẫn phụ thuộc model tạo ảnh và reference đầu vào.",
            ],
            description:
                "Visual Brief Builder là công cụ chuẩn hóa brief AI image, giúp marketing tạo yêu cầu hình ảnh nhất quán hơn với brand rule.",
        },
        "tunnel-master": {
            timeline:
                "Q1/2026 - 05/2026: gom Cloudflare Tunnel và routing cho nhiều app nội bộ vào một cấu hình tập trung.",
            people: "Platform/Ops và người cần truy cập app nội bộ từ domain là nhóm hưởng lợi.",
            pnl: "Cost vận hành thấp so với mở server/cloud riêng. P&L nằm ở việc dùng máy hiện có làm server, không mở port router và giảm rủi ro cấu hình rời rạc.",
            roi: "6+ service nội bộ đi qua tunnel và 6,305 request qua subdomain cho thấy hạ tầng đã phục vụ traffic thật.",
            strengths: [
                "Không cần mở port trực tiếp.",
                "Tập trung hóa cấu hình tunnel.",
                "Cho phép app nội bộ có domain kiểm soát.",
            ],
            weaknesses: [
                "Phụ thuộc Cloudflare Tunnel và máy host nội bộ.",
                "Cần thêm monitoring/backup để tránh single point of failure.",
            ],
            description:
                "Tunnel Master là lớp hạ tầng đưa các service nội bộ ra ngoài qua Cloudflare Tunnel, giúp chia sẻ app an toàn hơn mà không mở port.",
        },
        "action-local-bridge": {
            timeline:
                "Q1/2026: triển khai bridge nhẹ để định tuyến action-product qua network/tunnel riêng.",
            people: "Platform/Ops và người vận hành service action-product hưởng lợi trực tiếp.",
            pnl: "Cost gần như chỉ là container nhẹ và thời gian cấu hình. P&L nằm ở giảm sửa backend chính và giảm rủi ro khi expose service.",
            roi: "ROI nằm ở việc tách routing khỏi code nghiệp vụ: thay đổi hạ tầng mà không phải chỉnh app chính.",
            strengths: [
                "Nhẹ, rõ trách nhiệm, không database.",
                "Tách hạ tầng bridge khỏi backend nghiệp vụ.",
                "Dễ triển khai cùng Docker network.",
            ],
            weaknesses: [
                "Ít giá trị nếu đứng một mình, chủ yếu là phần hạ tầng hỗ trợ.",
                "Cần tài liệu network rõ để người khác maintain.",
            ],
            description:
                "Action Local Bridge là container cầu nối để chuyển tiếp traffic trong mạng nội bộ, giúp expose service mà không đụng vào backend chính.",
        },
    };

    const COUNTERS = [
        {
            value: 983,
            suffix: "",
            label: "Chứng từ PDF đã xử lý",
            sub: "Xử lý tự động + web xem chứng từ · 201MB · từ tháng 12/2025",
            large: true,
        },
        {
            value: 6305,
            suffix: "",
            label: "Lượt truy cập 6 subdomain",
            sub: "Cloudflare Analytics · Sep 2025 – May 2026",
        },
        {
            value: 50,
            suffix: "/50",
            label: "Workflow chạy tự động, 0 thất bại",
            sub: "42 lần kiểm kho + 8 lần quét hàng ngày · 07–15/05/2026",
        },
        {
            value: 9,
            suffix: "",
            label: "Webhook routes đang hoạt động",
            sub: "Shopify · Odoo · Zalo · Telegram · action.bonstu.site: 4,570 req",
        },
    ];

    const TECH_STACK = [
        {
            cat: "Backend",
            items: [
                "Python · Flask · FastAPI",
                "Node.js · Express",
                "Odoo XML-RPC",
                "APScheduler",
            ],
        },
        { cat: "Frontend", items: ["React 18", "Vanilla JS", "Recharts"] },
        { cat: "Database", items: ["PostgreSQL", "SQLite", "Odoo ORM"] },
        {
            cat: "Infra",
            items: ["Docker · Compose", "Nginx", "Cloudflare Tunnel"],
        },
        {
            cat: "Xử lý file",
            items: ["pandas · openpyxl", "PyMuPDF · OCR"],
        },
        {
            cat: "Tích hợp",
            items: [
                "Shopify Webhook",
                "Zalo ZNS API",
                "Telegram Bot",
                "WebSocket",
            ],
        },
    ];

    const ROADMAP = [
        {
            num: "01",
            phase: "Đang triển khai",
            accent: "#0f766e",
            title: "HR Onboarding tự động — không qua IT",
            why: "Nhân viên mới chờ 2–3 ngày. Quyền bị sai do gán thủ công.",
            desc: "Hệ thống tự tạo account Odoo và gán phân quyền theo vị trí. Đã phân tích 46 user thực tế trên 3 công ty — HR thao tác, không cần IT can thiệp.",
            items: [
                "HR chọn vị trí → account tạo + phân quyền đúng trong vài giây — áp dụng cho Bonario, Ordinaire, Furny",
                "Role profile xây từ 46 user thực tế + kiểm tra chéo với phân quyền đang chạy trên hệ thống",
                "Audit log đầy đủ: ai được tạo, khi nào, quyền gì — truy vết được khi review nội bộ hoặc kiểm toán",
            ],
            effort: "Đang xây · ~3 tuần",
        },
        {
            num: "02",
            phase: "Tiếp theo",
            accent: "#2563eb",
            title: "Quan sát hệ thống — chủ động thay vì thụ động",
            why: "11 service đang chạy — biết có vấn đề khi user báo.",
            desc: "Chuyển từ vận hành thụ động sang full visibility. Alert tức thì, dashboard tổng quan, báo cáo vận hành tự động gửi cho quản lý.",
            items: [
                "Telegram alert trong 1 phút khi container down — không cần đăng nhập server để biết",
                "Health dashboard qua trình duyệt — trạng thái tất cả service trong 1 trang, không cần SSH",
                "Monthly ops digest tự động: uptime %, incident, scheduler health — quản lý nhận được không cần hỏi IT",
            ],
            effort: "3–5 ngày",
        },
        {
            num: "03",
            phase: "Không thể bỏ",
            accent: "#7c3aed",
            title: "Nền tảng vững để scale thêm người và service",
            why: "Server hỏng = mất hết. Chưa có backup, chưa có môi trường test.",
            desc: "Backup tự động, staging environment, deploy an toàn — ba thứ này không có thì mỗi lần cập nhật là một lần đánh cược với dữ liệu thật.",
            items: [
                "Backup tự động hàng ngày: PostgreSQL + SQLite + 983 PDF lên cloud — phục hồi được trong vài tiếng",
                "Staging environment để test trước khi đẩy production — tránh incident từ thay đổi code",
                "Auto-deploy từ Git: cập nhật service không cần SSH vào từng container thủ công",
            ],
            effort: "1 tuần",
        },
    ];

    const STORY_ARC = [
        {
            year: "2019–05/2024",
            label: "Kỹ sư CNTT, GPA 2.03",
            note: "5 năm học lý thuyết. GPA 2.03. Chưa một lần deploy thật.",
        },
        {
            year: "06/2024–08/2025",
            label: "Gap · chuẩn bị du học",
            note: "14 tháng dừng lại — không viết code, cân nhắc đi học tiếp.",
        },
        {
            year: "22/09/2025",
            label: "Vào Bonario · thử việc",
            note: "Anh Hà tận tình hướng dẫn hệ thống Odoo, tạo cơ hội phát triển và tiếp cận sâu AI.",
        },
        {
            year: "Tháng 10/2025",
            label: "Deploy đầu tiên",
            note: "Lần đầu code thật sự chạy trên production — ORD Price Lookup. React · Flask · PostgreSQL.",
        },
        {
            year: "Tháng 11–12/2025",
            label: "Automation stack",
            note: "Không ai giao — tự đề xuất, tự xây. Webhook, scheduler daily, Telegram bot.",
        },
        {
            year: "Tháng 1–3/2026",
            label: "Infrastructure layer",
            note: "Tự thiết kế từ đầu. Docker stack, Cloudflare Tunnel, archive chứng từ.",
        },
        {
            year: "Tháng 5/2026",
            label: "11 hệ thống production",
            note: "Odoo · Docker · PostgreSQL · Verified.",
            highlight: true,
        },
    ];

    function findRuntimeEntries(projectId) {
        const aliases = PROJECT_RUNTIME_ALIASES[projectId] || [];
        return runtimeEvidence.filter((entry) =>
            aliases.includes(entry.service),
        );
    }

    function buildEvidenceScale() {
        if (!companyScale.length && !repoRelevantOdoo.length) return "";
        const renderEvidenceCards = (items) =>
            items
                .map(
                    (item) => `
              <article class="evidence-card">
                <span class="evidence-card-label">${escapeHtml(item.label)}</span>
                <strong class="evidence-card-value">${escapeHtml(item.display)}</strong>
                <p class="evidence-card-desc">${escapeHtml(item.description)}</p>
                <small class="evidence-card-source">${escapeHtml(item.source)}</small>
              </article>`,
                )
                .join("");
        return `
      <section class="evidence-strip is-collapsed" id="evidence-strip" aria-label="Bằng chứng đã xác minh">
        <div class="evidence-strip-header">
          <p class="eyebrow-label">Dữ liệu có nguồn</p>
          <h3 class="evidence-strip-title">Tín hiệu sử dụng thực tế — từ hệ thống đang chạy.</h3>
          <p class="evidence-strip-note">Phân tách riêng khỏi số vận hành của công ty — lấy từ lịch sử truy cập, cơ sở dữ liệu và Odoo.</p>
        </div>
        <button class="evidence-strip-toggle" id="evidence-toggle" aria-expanded="false" aria-controls="evidence-body">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Xem usage signals (${companyScale.length + repoRelevantOdoo.length})
        </button>
        <div class="evidence-strip-body" id="evidence-body">
          <div class="evidence-strip-body-inner">
            ${
                companyScale.length
                    ? `<p class="evidence-subgroup-title">Từ log & database</p>
            <div class="evidence-grid">
              ${renderEvidenceCards(companyScale)}
            </div>`
                    : ""
            }
            ${
                repoRelevantOdoo.length
                    ? `<p class="evidence-subgroup-title">Từ Odoo aggregate</p>
            <div class="evidence-grid evidence-grid-secondary">
              ${renderEvidenceCards(repoRelevantOdoo)}
            </div>`
                    : ""
            }
          </div>
        </div>
      </section>`;
    }

    function buildHookScene() {
        return `
      <section class="scene scene-hook" id="scene-0" aria-label="Mở đầu">
        <div class="hook-inner">
          <div class="hook-text">
            <p class="hook-line1">Hai năm không chạm code.</p>
            <p class="hook-line2">Tám tháng tại Bonario — 11 hệ thống đang chạy.</p>
          </div>
          <p class="hook-sub">Từ ${escapeHtml(reportPeriod.personalStartLabel || "22/09/2025")} &nbsp;·&nbsp; Bonario</p>
          <div class="hook-stats">
            ${COUNTERS.map(
                (c) => `
            <div class="hook-stat">
              <strong class="hook-stat-num" data-hook-target="${c.value}" data-suffix="${escapeHtml(c.suffix || "")}">0</strong>
              <span class="hook-stat-label">${escapeHtml(c.label)}</span>
            </div>`,
            ).join("")}
          </div>
          <button class="scroll-cue" aria-label="Cuộn xuống" data-scroll-to="1">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M11 4v14M5 12l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </section>`;
    }

    function buildMonthlyChart() {
        const monthly = (impactEvidence.monthly || {}).customerInvoices;
        if (!monthly || !monthly.length) return "";
        const W = 900,
            TOP_PAD = 30,
            BAR_H = 140,
            LABEL_H = 28;
        const H = TOP_PAD + BAR_H + LABEL_H;
        const BAR_W = 64,
            STEP = 100,
            OFFSET_X = 18;
        const maxCount = Math.max(...monthly.map((m) => m[1]));
        const bars = monthly
            .map((m, i) => {
                const bh = Math.round((m[1] / maxCount) * BAR_H);
                const x = OFFSET_X + i * STEP;
                const y = TOP_PAD + (BAR_H - bh);
                const isPeak = m[1] === maxCount;
                const isPartial = i === monthly.length - 1;
                const lbl = m[0]
                    .replace(" 2025", " '25")
                    .replace(" 2026", " '26");
                const vnd = (m[2] / 1e9).toFixed(1);
                return `
    <g class="chart-bar-group" style="--bar-delay:${i * 55}ms">
      <rect class="chart-bar${isPeak ? " chart-bar--peak" : ""}${isPartial ? " chart-bar--partial" : ""}"
        x="${x}" y="${y}" width="${BAR_W}" height="${bh}" rx="3" />
      <text class="chart-count${isPeak ? " chart-count--peak" : ""}"
        x="${x + BAR_W / 2}" y="${y - 6}" text-anchor="middle">${m[1]}</text>
      <text class="chart-month"
        x="${x + BAR_W / 2}" y="${TOP_PAD + BAR_H + LABEL_H - 4}" text-anchor="middle">${lbl}</text>
      <title>${m[0]}: ${m[1]} hóa đơn — ${vnd}B VND</title>
    </g>`;
            })
            .join("");
        return `
  <div class="monthly-chart">
    <p class="monthly-chart-label">Invoice trend · Sep 2025 – May 2026 <span>· 997 tổng · Odoo 2026-05-15</span></p>
    <svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      ${bars}
    </svg>
  </div>`;
    }

    function buildCounterScene() {
        const cards = COUNTERS.map(
            (c) => `
      <article class="counter-card${c.large ? " counter-large" : ""}">
        <span class="counter-eyebrow">${escapeHtml(c.label)}</span>
        <strong class="counter-num" data-target="${c.value}" data-suffix="${escapeHtml(c.suffix || "")}">0</strong>
        <small class="counter-source">${escapeHtml(c.sub)}</small>
      </article>`,
        ).join("");
        return `
      <section class="scene scene-scale" id="scene-2" aria-label="Quy mô vận hành">
        <div class="scale-inner">
          <div class="counter-grid">${cards}</div>
          ${buildMonthlyChart()}
          <div class="scale-pills">
            <span>104 thao tác thật ghi trong audit log — cost, BOM, pricelist</span>
            <span>Daily scan chạy mỗi ngày — tự rà soát toàn bộ sản phẩm và gửi báo cáo qua Telegram, không cần ai nhớ check</span>
            <span>7+ đợt QC nhập kho đã xử lý trong Docker session này</span>
            <span>5 file sản xuất được tính và xuất layout trong 2 ngày gần nhất</span>
            <span>Bill ghi đều: 312 · 156 · 222 · 266 chứng từ mỗi tháng</span>
            <span>action 4,570 · stock 1,359 · curtain 250 · label 98 · price 17 · workflow 11 req</span>
          </div>
          <div class="value-callout">
            <p class="value-callout-label">Nếu tính ra giờ công</p>
            <div class="value-callout-items">
              <span><strong>~82h</strong> lưu bill thủ công/năm → automation xử lý toàn bộ</span>
              <span><strong>~2.7h</strong> kiểm tra thủ công/ngày</span>
              <span><strong>100%</strong> scheduler không thất bại — 50/50 lần chạy</span>
              <span><strong>6,305</strong> request qua 6 subdomain — Cloudflare Analytics Sep~May</span>
            </div>
          </div>
          ${buildEvidenceScale()}
        </div>
      </section>`;
    }

    function buildTechBar() {
        return `
      <div class="tech-bar">
        <span class="tech-bar-label">Stack kỹ thuật · ${TECH_STACK.reduce((a, c) => a + c.items.length, 0)} công nghệ</span>
        <div class="tech-cats">
          ${TECH_STACK.map(
              (cat) => `
            <div class="tech-row">
              <span class="tech-cat-label">${escapeHtml(cat.cat)}</span>
              <div class="tech-tags">${cat.items.map((item) => `<span class="tech-tag">${escapeHtml(item)}</span>`).join("")}</div>
            </div>`,
          ).join("")}
        </div>
      </div>`;
    }

    function buildNodeMap() {
        return SYSTEM_GROUPS.map(
            (g) => `
      <button class="node-btn" data-route-project="${escapeHtml(g.id)}"
        style="--node-accent:${escapeHtml(g.accent)}"
        aria-label="Xem mục ${escapeHtml(g.label)}" role="listitem">
        <span class="node-eyebrow">${escapeHtml(g.eyebrow)}</span>
        <strong class="node-label">${escapeHtml(g.label)}</strong>
        <p class="node-summary">${escapeHtml(g.summary)}</p>
        <small class="node-count">${escapeHtml(g.countLabel || `${g.projectIds.length} hệ thống`)}</small>
      </button>`,
        ).join("");
    }

    function buildSystemScene() {
        return `
      <section class="scene scene-system" id="scene-1" aria-label="Bản đồ hệ thống">
        <div class="system-inner">
          <header class="system-header">
            <p class="eyebrow-label">Project breakdown</p>
            <h2 class="system-title">12 Project đã được thực hiện trong 8 tháng qua.</h2>
            <p class="system-hint">Bấm vào từng mục để xem chi tiết →</p>
          </header>
          <div class="node-map" role="list">${buildNodeMap()}</div>
        </div>
      </section>`;
    }

    function buildRoadmap() {
        return `
      <div class="roadmap-block">
        <span class="roadmap-eyebrow">Kế hoạch tiếp theo</span>
        <h3 class="roadmap-title">3 bước cụ thể tiếp theo.</h3>
        <div class="roadmap-grid">
          ${ROADMAP.map(
              (r) => `
            <div class="rc" style="--rc-accent:${escapeHtml(r.accent)}">
              <div class="rc-top">
                <span class="rc-phase">${escapeHtml(r.phase)}</span>
                <span class="rc-num">${escapeHtml(r.num)}</span>
              </div>
              <h4 class="rc-title">${escapeHtml(r.title)}</h4>
              <div class="rc-why">${escapeHtml(r.why)}</div>
              <p class="rc-desc">${escapeHtml(r.desc)}</p>
              <hr class="rc-sep">
              <ul class="rc-items">
                ${r.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
              <div class="rc-footer">
                <span class="rc-effort">${escapeHtml(r.effort)}</span>
              </div>
            </div>`,
          ).join("")}
        </div>
      </div>`;
    }
    function buildCloseScene() {
        const arcItems = STORY_ARC.map(
            (item, i) => `
      <div class="arc-item${item.highlight ? " arc-highlight" : ""}" style="--arc-delay:${i * 80}ms">
        <span class="arc-year">${escapeHtml(item.year)}</span>
        <strong class="arc-label">${escapeHtml(item.label)}</strong>
        <p class="arc-note">${escapeHtml(item.note)}</p>
      </div>`,
        ).join("");
        const d = new Date();
        const monthYear = d.toLocaleDateString("vi-VN", {
            month: "long",
            year: "numeric",
        });
        return `
      <section class="scene scene-close" id="scene-3" aria-label="Kết">
        <div class="close-inner">
          <div class="arc-block">
            <p class="eyebrow-label">Hành trình đến đây</p>
            <div class="arc-track">${arcItems}</div>
          </div>
          <div class="close-statement">
            <h2 class="close-title">
              Không top trường.<br>
              Không background IT vững.<br>
              <span class="close-title-accent">Tám tháng — ${projects.length} hệ thống đang chạy.</span>
            </h2>
            <div class="close-contrast">
              <div class="close-contrast-row">
                <span class="close-contrast-before">GPA 2.03 · chưa chạm production</span>
                <span class="close-contrast-sep">→</span>
                <span class="close-contrast-after">${projects.length} hệ thống production · dữ liệu xác minh</span>
              </div>
              <div class="close-contrast-row">
                <span class="close-contrast-before">14 tháng không viết code</span>
                <span class="close-contrast-sep">→</span>
                <span class="close-contrast-after">8 tháng · stack đang chạy độc lập</span>
              </div>
              <div class="close-contrast-row">
                <span class="close-contrast-before">0 đội ops · 0 managed service</span>
                <span class="close-contrast-sep">→</span>
                <span class="close-contrast-after">983 PDF tự động · 50/50 scheduler</span>
              </div>
            </div>
            <ul class="close-points">
              <li>Mỗi con số trong báo cáo đều có nguồn — log, database hoặc Odoo. Không ước tính, không vẽ đẹp.</li>
              <li>${projects.length} repo chạy song song mà không có đội ops — Docker, Cloudflare Tunnel, scheduler tự vận hành.</li>
              <li>AI tích hợp vào quy trình để làm được nhiều hơn với ít người hơn — không phải để báo cáo đẹp hơn.</li>
            </ul>
            <p class="close-body">8 tháng tại Bonario. Số liệu lấy từ Odoo, Docker, SQLite, PostgreSQL — muốn verify thì hỏi.</p>
            <hr class="close-divider" aria-hidden="true" />
            <p class="close-question">Số liệu đã có. Stack đang chạy.
Em sẵn sàng cho giai đoạn tiếp theo — Sếp chỉ hướng là em chạy.</p>
            <div class="close-meta">
              <span>${escapeHtml(reportPeriod.personalStartLabel || "22/09/2025")} — ${monthYear}</span>
              <span>${projects.length} hệ thống production</span>
              <span>Dữ liệu đã xác minh</span>
            </div>
          </div>
          ${buildRoadmap()}
        </div>
      </section>`;
    }

    function buildDotNav() {
        const labels = ["Mở đầu", "Hệ thống", "Quy mô", "Kết"];
        return `
      <nav class="dot-nav" id="dot-nav" aria-label="Điều hướng các phần" aria-hidden="true">
        ${labels
            .map(
                (label, i) => `
          <button class="dot${i === 0 ? " dot-active" : ""}" data-scene="${i}"
            aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
          </button>`,
            )
            .join("")}
      </nav>`;
    }

    function getProjectDetailProfile(proj) {
        return (
            PROJECT_DETAIL_PROFILES[proj.id] || {
                timeline:
                    "Đã triển khai trong giai đoạn 8 tháng vận hành tại Bonario.",
                people: "Người dùng chính là team nghiệp vụ liên quan đến project này.",
                pnl: "Cost chính là thời gian phát triển và vận hành trên hạ tầng nội bộ. P&L cần đo thêm bằng thời gian tiết kiệm và lỗi giảm được.",
                roi: "ROI thể hiện qua việc project đã chạy thật và có dữ liệu xác minh từ hệ thống.",
                strengths: [
                    "Giải quyết một nghiệp vụ cụ thể bằng công cụ chạy thật.",
                    "Có dữ liệu hoặc log để kiểm chứng.",
                ],
                weaknesses: [
                    "Cần thêm số đo adoption dài hạn.",
                    "Cần tài liệu vận hành để người khác tiếp quản dễ hơn.",
                ],
                description: proj.hook || proj.built || proj.problem || "",
            }
        );
    }

    function renderTextSection(label, value, extraClass = "") {
        if (!value) return "";
        return `
          <section class="detail-info-card ${extraClass}">
            <p class="detail-section-label">${escapeHtml(label)}</p>
            <p>${escapeHtml(value)}</p>
          </section>`;
    }

    function renderPeopleSection(value) {
        if (!value) return "";
        if (typeof value === "string") {
            return renderTextSection("People", value);
        }
        return `
          <section class="detail-info-card">
            <p class="detail-section-label">People</p>
            ${value.intro ? `<p>${escapeHtml(value.intro)}</p>` : ""}
            ${
                value.items && value.items.length
                    ? `<ul class="detail-bullet-list">${value.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
                    : ""
            }
          </section>`;
    }

    function renderListSection(label, items, extraClass = "") {
        if (!items || !items.length) return "";
        return `
          <section class="detail-info-card ${extraClass}">
            <p class="detail-section-label">${escapeHtml(label)}</p>
            <ul class="detail-bullet-list">
              ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </section>`;
    }

    function renderStockOnhandDetail(proj, index) {
        return `
        <article class="stock-detail-card">
          <header class="stock-detail-head">
            <span class="stock-detail-index">${String(index + 1).padStart(2, "0")}</span>
            <div>
              <p class="stock-detail-kicker">${escapeHtml(proj.chapter)}</p>
              <h2 class="stock-detail-title">Stock Onhand Management</h2>
              <p class="stock-detail-subtitle">Hệ thống tra cứu tồn kho và kiểm kho nội bộ, thay luồng hỏi đáp thủ công và file rời. Giúp tiết kiệm thời gian và nắm bắt thông tin nhanh chóng khi giao tiếp với khách hàng.</p>
            </div>
          </header>

          <section class="stock-story-band">
            <div>
              <p class="stock-section-label">Timeline</p>
              <strong>2 ngày</strong>
              <span>Được xây dựng và hoàn thiện trong vòng 2 ngày.</span>
            </div>
            <div>
              <p class="stock-section-label">People</p>
              <strong>2 người</strong>
              <ul>
                <li>Dũng xây dựng repo và xử lý logic hoàn chỉnh.</li>
                <li>Anh Hà cải thiện giao diện.</li>
              </ul>
            </div>
          </section>

          <section class="stock-pnl-section">
            <div class="stock-pnl-main">
              <p class="stock-section-label">Cost P&L</p>
              <h3>Chi phí nội bộ thấp, tác động vận hành rõ.</h3>
              <p>Cost nội bộ gồm 2 ngày công và chi phí AI, tổng chi phí hết khoảng <strong>1,2 triệu VND</strong>. P&L không tạo doanh thu trực tiếp nhưng giảm sai sót lệch tồn, giảm thời gian hỏi kho và rút ngắn quy trình nhận thông tin.</p>
            </div>
            <aside class="stock-market-cost">
              <p class="stock-section-label">Chi phí thị trường công ty Tech</p>
              <div class="stock-cost-row"><span>Backend</span><strong>~4 tuần</strong></div>
              <div class="stock-cost-row"><span>Frontend</span><strong>~4 tuần</strong></div>
              <div class="stock-cost-row"><span>DevOps</span><strong>~2 tuần</strong></div>
              <hr>
              <div class="stock-cost-row"><span>Senior Full-stack Lead</span><strong>2.000 USD</strong></div>
              <div class="stock-cost-row"><span>Frontend Developer Mid</span><strong>1.200 USD</strong></div>
              <div class="stock-cost-row"><span>DevOps shared</span><strong>750 USD</strong></div>
              <div class="stock-cost-total"><span>Tổng</span><strong>3.950 USD</strong><small>~104.102.250 VND</small></div>
            </aside>
          </section>

          <section class="stock-roi-panel">
            <p class="stock-section-label">ROI</p>
            <div class="stock-roi-number">1.083,3%</div>
            <div class="stock-roi-grid">
              <div><strong>4 ngày công</strong><span>Kiểm kho giảm từ 3 ngày/2 người xuống 2 ngày/1 người, tương đương khoảng 2 triệu VND.</span></div>
              <div><strong>1.359 request</strong><span>Mỗi lần tra tồn giảm khoảng 15 phút, tương đương khoảng 14 ngày công, khoảng 7 triệu VND.</span></div>
              <div><strong>13 triệu VND</strong><span>App đã duy trì 3 tháng: 6 triệu VND từ kiểm kho + 7 triệu VND từ tra cứu tồn.</span></div>
            </div>
          </section>

          <section class="stock-analysis">
            <div class="stock-strength">
              <p class="stock-section-label">Điểm mạnh</p>
              <ul>
                <li>Dữ liệu real-time.</li>
                <li>Kiểm kho hàng tháng không phụ thuộc vào phòng BIS để xuất số lượng tồn.</li>
                <li>Check được sản phẩm có thực sự tồn hay đang dính đơn, điểm mà khi check Odoo thủ công nhân sự kho dễ bỏ sót.</li>
              </ul>
            </div>
            <div class="stock-weakness">
              <p class="stock-section-label">Điểm yếu</p>
              <ul>
                <li>Vẫn đang trong quá trình phát triển.</li>
                <li>Cần tiếp tục scale thêm để bao phủ nhiều tình huống vận hành hơn.</li>
              </ul>
            </div>
          </section>

          <section class="stock-site-preview" aria-label="Website Stock Onhand Management">
            <div class="stock-site-copy">
              <p class="stock-section-label">Website đang chạy</p>
              <h3>Bonario Stock</h3>
              <p>Giao diện tra cứu tồn kho real-time đang live tại stock.bonstu.site, có lọc công ty, nhóm sản phẩm, kho, trạng thái ngưng sản xuất và xuất Excel/PDF.</p>
              <a class="stock-site-link" href="https://stock.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
            </div>
            <a class="stock-site-shot" href="https://stock.bonstu.site/" target="_blank" rel="noopener noreferrer" aria-label="Mở website Bonario Stock">
              <img src="./assets/stock-onhand-management.png" alt="Giao diện website Bonario Stock đang hiển thị danh sách tồn kho theo kho ORDAP" loading="lazy">
            </a>
          </section>
        </article>`;
    }

    function renderOrdPriceLookupDetail(proj, index) {
        return `
        <article class="ord-detail-card">
          <header class="ord-detail-head">
            <div>
              <p class="ord-detail-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
              <h2>ORD Price Lookup</h2>
              <p>Công cụ tra cứu và tính giá Product Ordinaire, chuyển luồng hỏi giá từ Telegram và file Excel nhiều sheet lên website để Sales/SC phản hồi khách nhanh hơn.</p>
            </div>
            <div class="ord-score">
              <strong>10</strong>
              <span>ngày xây dựng và chuyển đổi luồng sử dụng</span>
            </div>
          </header>

          <section class="ord-usage-strip">
            <div><strong>15 phút</strong><span>thời gian search/tính giá trước đây cho một case</span></div>
            <div><strong>vài giây</strong><span>thời gian tra cứu sau khi đưa lên website</span></div>
            <div><strong>5 tháng</strong><span>thời gian project đã được triển khai</span></div>
          </section>

          <section class="ord-timeline">
            <p class="ord-section-label">Timeline</p>
            <div class="ord-timeline-grid">
              <div><strong>2 ngày</strong><span>Tìm hiểu và nghiên cứu cách xây dựng.</span></div>
              <div><strong>3 ngày</strong><span>Viết logic và xử lý code.</span></div>
              <div><strong>3 ngày</strong><span>Xử lý data từ file Excel của SC ra file data riêng của hệ thống.</span></div>
              <div><strong>2 ngày</strong><span>Chuyển đổi cổng giao tiếp từ Telegram lên website.</span></div>
            </div>
          </section>

          <section class="ord-flow">
            <div class="ord-flow-card">
              <p class="ord-section-label">People</p>
              <h3>Hoàn thiện bởi 1 người.</h3>
              <ul class="ord-mini-list">
                <li>Dũng xây dựng repo, data và xử lý logic hoàn chỉnh.</li>
              </ul>
            </div>
            <div class="ord-flow-card">
              <p class="ord-section-label">Cost P&L</p>
              <h3>Cost nội bộ: 3,5 triệu VND.</h3>
              <p>Chi phí build gồm 10 ngày công và AI, được tính thấp vì repo được thực hiện trong thời gian thử việc. P&L không tạo doanh thu trực tiếp, nhưng giảm thời gian SC tra file Excel nhiều sheet và giảm thao tác tính toán với sản phẩm chưa có sẵn màu vải/kích thước.</p>
            </div>
          </section>

          <section class="ord-market-cost">
            <div>
              <p class="ord-section-label">Chi phí thị trường công ty Tech</p>
              <h3>3.275 USD</h3>
              <span>~86.312.543 VND</span>
            </div>
            <dl>
              <div><dt>Backend</dt><dd>~4 tuần</dd></div>
              <div><dt>Frontend</dt><dd>~3 tuần</dd></div>
              <div><dt>DevOps</dt><dd>~1 tuần</dd></div>
              <div><dt>Senior Full-stack Lead</dt><dd>2.000 USD</dd></div>
              <div><dt>Frontend Developer Mid</dt><dd>900 USD</dd></div>
              <div><dt>DevOps shared</dt><dd>375 USD</dd></div>
            </dl>
          </section>

          <section class="ord-roi-band">
            <p class="ord-section-label">ROI</p>
            <div class="ord-roi-result">
              <strong>-32,86%</strong>
              <span>chưa thu hồi vốn sau 5 tháng triển khai</span>
            </div>
            <p>Project rút ngắn quy trình tra giá và tính toán cho SC/Sales, đồng thời tạo cách làm việc chuyên nghiệp hơn trước mặt khách hàng vì giảm chờ nhắn tin và tính giá thủ công. Thời gian search/tính giá giảm từ khoảng 15 phút xuống còn vài giây; mức tiết kiệm ước tính khoảng 45 phút mỗi ngày, tương đương 4,7 ngày công sau 5 tháng, khoảng 2,35 triệu VND.</p>
          </section>

          <section class="ord-checklist">
            <div>
              <p class="ord-section-label">Điểm mạnh</p>
              <ul>
                <li>Nhanh, tiện lợi và rút ngắn quy trình tra giá.</li>
                <li>Tính toán được giá với kích thước và màu vải ngẫu nhiên.</li>
                <li>Sales phản hồi khách thuận tiện hơn, không phải chờ SC tính giá trong những case chưa có giá sẵn.</li>
              </ul>
            </div>
            <div>
              <p class="ord-section-label">Điểm yếu</p>
              <ul>
                <li>Vì là repo đầu tay nên trình độ chuyên môn và cách xử lý chưa triệt để.</li>
                <li>Chưa đạt hiệu quả cao.</li>
                <li>Triển khai 5 tháng nhưng chưa thu hồi vốn.</li>
              </ul>
            </div>
          </section>

          <section class="ord-site-preview" aria-label="Website ORD Price Lookup">
            <div class="ord-site-copy">
              <p class="ord-section-label">Website đang chạy</p>
              <h3>ORD Price Lookup</h3>
              <p>Giao diện tra cứu giá ORD đang live tại price.bonstu.site, chuyển luồng tìm giá từ chat/Excel sang website có sidebar lịch sử, prompt gợi ý và ô search trung tâm.</p>
              <a class="ord-site-link" href="https://price.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
            </div>
            <a class="ord-site-shot" href="https://price.bonstu.site/" target="_blank" rel="noopener noreferrer" aria-label="Mở website ORD Price Lookup">
              <img src="./assets/ord-price-lookup.png" alt="Giao diện website ORD Price Lookup với sidebar tìm kiếm và ô nhập tên sản phẩm" loading="lazy">
            </a>
          </section>
        </article>`;
    }


    function renderBonarioHubDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#0f766e">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Bonario Product Hub</h2>
            <p class="pd-subtitle">Hub trung tâm vận hành sản phẩm: kiểm tra dữ liệu Odoo, tự động hóa BOM/giá/mô tả, daily scan và giám sát Docker — tất cả trong một giao diện nội bộ.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>6,677</strong><span>sản phẩm Odoo · xác minh 15/05/2026</span></div>
            <div class="pd-stat"><strong>3,540</strong><span>BOM trong hệ thống · xác minh 15/05/2026</span></div>
            <div class="pd-stat"><strong>50/50</strong><span>automation không thất bại · 07–15/05/2026</span></div>
            <div class="pd-stat"><strong>104</strong><span>thao tác ghi trong audit log</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Timeline</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Q4/2025</strong><span>Product Checker, BOM Automation, Pricelist Tools.</span></div>
                <div class="pd-timeline-item"><strong>Q1/2026</strong><span>Cambodia Manager, Description Workflow, daily scan.</span></div>
                <div class="pd-timeline-item"><strong>Q2/2026</strong><span>Docker Monitor, Grafana, Prometheus, passkey auth.</span></div>
                <div class="pd-timeline-item"><strong>05/2026</strong><span>50 lần chạy tự động liên tiếp không hỏng.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People</p>
                <h3>Hoàn thiện bởi 1 người.</h3>
                <ul class="pd-list">
                  <li>Dũng xây dựng repo, logic, integration và vận hành.</li>
                  <li>Anh Hà hỗ trợ hướng dẫn Odoo và quy trình nghiệp vụ.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Cost P&amp;L</p>
                <h3>Chi phí nội bộ — vận hành bằng hạ tầng sẵn có.</h3>
                <p>Cost chính là thời gian phát triển và Redis/Docker nội bộ. P&amp;L nằm ở giảm thao tác thủ công trên Odoo, chuẩn hóa dữ liệu sản phẩm và báo cáo tự động thay cho check thủ công hàng ngày.</p>
              </div>
            </div>

            <div class="pd-wide-box">
              <p class="pd-section-label">Audit log breakdown</p>
              <h3>104 thao tác đã ghi nhận.</h3>
              <p><strong>34</strong> cập nhật giá vốn &nbsp;·&nbsp; <strong>32</strong> xử lý BOM &nbsp;·&nbsp; <strong>32</strong> bảng giá &nbsp;·&nbsp; <strong>4</strong> AI chat &nbsp;·&nbsp; <strong>2</strong> giám sát tồn kho · từ log hệ thống đã xác minh.</p>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Daily scan tự động — phát hiện ~800 mục cần xem lại mỗi lần chạy.</li>
                  <li>Bao phủ nhiều điểm dữ liệu: BOM, cost, pricelist, description, Cambodia.</li>
                  <li>Audit log cho thao tác quan trọng, Docker Monitor ngay trong app.</li>
                  <li>Có test suite Pytest/Vitest/Playwright cho vận hành lâu dài.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Phụ thuộc chất lượng dữ liệu Odoo gốc — lỗi source thì báo cáo nhiễu.</li>
                  <li>Cần tiếp tục phân tách cảnh báo thật/giả để giảm noise cho người dùng.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="pd-site" style="--pd-accent:#0f766e">
            <div class="pd-site-copy">
              <p class="pd-section-label">Website đang chạy</p>
              <h3>action.bonstu.site</h3>
              <p>Hub vận hành sản phẩm Bonario — truy cập nội bộ qua Cloudflare Tunnel, port 5004.</p>
              <a class="pd-site-link" href="https://action.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
            </div>
            <div class="pd-site-shot" style="display:flex;align-items:center;justify-content:center;min-height:200px;background:linear-gradient(135deg,rgba(15,118,110,0.12),rgba(255,255,255,0.9))">
              <div style="text-align:center;padding:24px">
                <div style="font-size:40px;margin-bottom:12px">⚙️</div>
                <p style="margin:0;color:#0f766e;font-weight:900;font-size:14px">React 18 · Flask · Odoo · Docker</p>
                <p style="margin:4px 0 0;color:#53635e;font-size:12px">Redis · Prometheus · Grafana</p>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderAutoWorkflowDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#ea580c">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Auto Workflow</h2>
            <p class="pd-subtitle">Hub điều phối automation nội bộ — gom Shopify, Odoo, Zalo ZNS, Telegram và scheduler vào một service Flask duy nhất thay cho các webhook rời rạc.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>9</strong><span>webhook routes đang hoạt động</span></div>
            <div class="pd-stat"><strong>50/50</strong><span>lần scheduler không thất bại · 07–15/05/2026</span></div>
            <div class="pd-stat"><strong>2</strong><span>cuộc họp auto-conducted ghi nhận</span></div>
            <div class="pd-stat"><strong>Daily</strong><span>ZNS auto-refresh cho 2 project</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Timeline</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>11/2025</strong><span>Shopify webhook, Zalo ZNS, Telegram bot.</span></div>
                <div class="pd-timeline-item"><strong>12/2025</strong><span>Scheduler daily, delivery tracking.</span></div>
                <div class="pd-timeline-item"><strong>Q1/2026</strong><span>RFID reconciliation, auto-conducted flow.</span></div>
                <div class="pd-timeline-item"><strong>05/2026</strong><span>50 lần chạy liên tiếp không hỏng.</span></div>
              </div>
            </section>

            <div class="pd-wide-box">
              <p class="pd-section-label">Integrations đang hoạt động</p>
              <h3>9 kênh kết nối, 1 hub kiểm soát.</h3>
              <p>Shopify customer sync → Odoo · FSM delivery tracking · Zalo ZNS HDSD tiếng Anh/Việt · Rating ORD · OAuth Zalo callback · Auto-conducted scheduler · Telegram RFID reconciliation · Token auto-refresh hàng ngày.</p>
              <div class="pd-tags">
                <span class="pd-tag">Shopify Webhook</span>
                <span class="pd-tag">Odoo XML-RPC</span>
                <span class="pd-tag">Zalo ZNS</span>
                <span class="pd-tag">Telegram Bot</span>
                <span class="pd-tag">APScheduler</span>
                <span class="pd-tag">Flask</span>
              </div>
            </div>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People &amp; Cost</p>
                <h3>1 người · hạ tầng nội bộ.</h3>
                <p>Cost chính là thời gian build và volume Docker. Không thuê dịch vụ automation bên ngoài — toàn bộ logic nghiệp vụ nằm trong code kiểm soát được.</p>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Giá trị đo được</p>
                <h3>Không thất bại trong 9 ngày liên tiếp.</h3>
                <p>42 lần giám sát tồn kho theo dõi 20 mặt hàng biến động · 8 lần quét sản phẩm hàng ngày · ZNS refresh đúng giờ không cần can thiệp thủ công.</p>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Tập trung nhiều automation vào một hub — dễ debug và bảo trì.</li>
                  <li>Webhook và scheduler chạy thật, không chỉ demo.</li>
                  <li>ZNS tự refresh token hàng ngày cho cả 2 project.</li>
                  <li>Endpoint /health theo dõi trạng thái token, scheduler và route.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Cần dashboard health chi tiết hơn để người khác tự kiểm tra.</li>
                  <li>Khi số workflow tăng, cần chuẩn hóa logging và retry policy.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderInLabelPdfDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#7c3aed">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">In Label PDF</h2>
            <p class="pd-subtitle">App vận hành kho: tra cứu phiếu nhập từ Odoo, in label PDF, quản lý batch QC và báo cáo ABC doanh số — một app phục vụ nhiều khâu liên hoàn.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>7+</strong><span>batch QC hoàn chỉnh từ lần khởi động gần nhất</span></div>
            <div class="pd-stat"><strong>10</strong><span>sản phẩm trong batch QC cuối (batch #7)</span></div>
            <div class="pd-stat"><strong>98</strong><span>requests ghi nhận từ log hệ thống</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Luồng nghiệp vụ</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Tra cứu</strong><span>Nhập mã phiếu → backend gọi Odoo JSON-RPC lấy dữ liệu thật.</span></div>
                <div class="pd-timeline-item"><strong>In label</strong><span>Xuất PDF layout 4×12, 48 labels/trang, trích lot và variant.</span></div>
                <div class="pd-timeline-item"><strong>QC Batch</strong><span>Chọn sản phẩm → lưu SQLite → theo dõi pending/passed/failed.</span></div>
                <div class="pd-timeline-item"><strong>Báo cáo</strong><span>ABC doanh số theo ngày, tên sản phẩm và tag nội thất/vải.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People &amp; Cost</p>
                <h3>1 người · Q4/2025 → 5/2026.</h3>
                <p>Cost là thời gian build và container Docker. P&amp;L: giảm thao tác copy tay từ Odoo, lưu lịch sử QC cục bộ và đẩy nhanh xử lý kho trong cao điểm nhập hàng.</p>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Stack kỹ thuật</p>
                <h3>React + Express + Odoo + SQLite.</h3>
                <p>Frontend React 18/Vite, backend Express, Odoo JSON-RPC cho dữ liệu phiếu, SQLite lưu QC data, jsPDF/html2pdf.js xuất PDF, Framer Motion cho UX.</p>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Kết nối trực tiếp Odoo — không nhập lại dữ liệu thủ công.</li>
                  <li>Một app phục vụ nhiều nghiệp vụ: kho, QC, in ấn, báo cáo.</li>
                  <li>SQLite lưu lịch sử QC — dễ truy vết khi cần kiểm tra lại.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Cần thêm thống kê sử dụng theo ngày/tháng để đo adoption.</li>
                  <li>Nếu format Odoo thay đổi, phần in PDF cần kiểm tra lại.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderOpRoundRobinDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#be123c">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">OP Round Robin</h2>
            <p class="pd-subtitle">Worker tự động cho Odoo: gán OP round-robin cho báo giá và xử lý toàn bộ pipeline bill/VAT/PDF chứng từ cuối tháng.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>2,720</strong><span>vendor bills trong Odoo · xác minh 16/05/2026</span></div>
            <div class="pd-stat"><strong>983</strong><span>PDF chứng từ đã lưu trữ</span></div>
            <div class="pd-stat"><strong>~201MB</strong><span>kho chứng từ · 13 ảnh đi kèm</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Phân bổ chứng từ theo tháng</p>
              <div class="pd-monthly-grid">
                <div class="pd-monthly-item"><strong>312</strong><span>Tháng 1/2026</span></div>
                <div class="pd-monthly-item"><strong>156</strong><span>Tháng 2/2026</span></div>
                <div class="pd-monthly-item"><strong>222</strong><span>Tháng 3/2026</span></div>
                <div class="pd-monthly-item"><strong>266</strong><span>Tháng 4/2026</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">Luồng OP Round Robin</p>
                <h3>Gán OP tự động — không thủ công.</h3>
                <ul class="pd-list">
                  <li>Worker polling Odoo → tìm quotation draft chưa có OP.</li>
                  <li>Xác định công ty (Bonario / Ordinaire) → gán theo vòng xoay cố định.</li>
                  <li>Ghi log mỗi lần gán để truy vết lịch sử phân bổ.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Luồng Bill / VAT / PDF</p>
                <h3>Pipeline chứng từ tự động.</h3>
                <ul class="pd-list">
                  <li>Lấy bill vendor từ Odoo hoặc file VAT local.</li>
                  <li>OCR trích dữ liệu → sinh PHIEU_GIAO_NHAN và YEU_CAU_BAO_GIA.</li>
                  <li>Đổi tên chuẩn hóa → lưu vào C:\Bills theo tháng.</li>
                </ul>
              </div>
            </div>

            <div class="pd-wide-box">
              <p class="pd-section-label">Cost P&amp;L</p>
              <h3>Worker background · hạ tầng nội bộ.</h3>
              <p>Cost là thời gian build và máy chủ local. P&amp;L: giảm thao tác chia OP thủ công, chuẩn hóa lưu trữ chứng từ và giảm sai sót khi xử lý nhiều bill/chứng từ cùng lúc. Có batch end-of-month phù hợp closing nghiệp vụ.</p>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Tự động hóa đúng phần việc lặp lại và dễ sai nhất.</li>
                  <li>2,720 hóa đơn qua pipeline từ tháng 9/2025.</li>
                  <li>Kho chứng từ truy cập được qua web (bills-server).</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Cần thêm log số lần gán OP để đo adoption rõ hơn.</li>
                  <li>Phụ thuộc cấu trúc dữ liệu Odoo và quy ước lưu file.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderBillsServerDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#be123c">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Bills Archive Server</h2>
            <p class="pd-subtitle">Lớp web phục vụ kho chứng từ PDF — biến thư mục C:\\Bills thành archive truy cập được qua trình duyệt, không cần mở folder local.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>983</strong><span>PDF chứng từ trong kho lưu trữ</span></div>
            <div class="pd-stat"><strong>13</strong><span>ảnh đi kèm chứng từ</span></div>
            <div class="pd-stat"><strong>~201MB</strong><span>tổng dung lượng kho</span></div>
            <div class="pd-stat"><strong>6 tháng</strong><span>12/2025 → 5/2026</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Cấu trúc kho chứng từ theo tháng</p>
              <div class="pd-monthly-grid">
                <div class="pd-monthly-item"><strong>T12/25</strong><span>Khởi đầu</span></div>
                <div class="pd-monthly-item"><strong>312</strong><span>T1/2026</span></div>
                <div class="pd-monthly-item"><strong>156</strong><span>T2/2026</span></div>
                <div class="pd-monthly-item"><strong>222</strong><span>T3/2026</span></div>
                <div class="pd-monthly-item"><strong>266</strong><span>T4/2026</span></div>
                <div class="pd-monthly-item"><strong>T5/26</strong><span>Đang chạy</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">Kiến trúc</p>
                <h3>Nginx Alpine · Read-only mount.</h3>
                <ul class="pd-list">
                  <li>Container nginx:alpine serve thư mục bill qua HTTP nội bộ.</li>
                  <li>Mount C:\Bills ở chế độ read-only — không thể ghi đè qua web.</li>
                  <li>Gắn với pipeline op-round-robin để sinh và chuẩn hóa chứng từ.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Giá trị</p>
                <h3>Truy cập nhanh, không cần SSH.</h3>
                <p>Biến kho file local thành điểm truy cập web nội bộ. Tăng tốc tra cứu chứng từ, giảm thất lạc file và hỗ trợ quy trình cuối tháng. URL nội bộ: bills.bonstu.site.</p>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Đơn giản, nhẹ, dễ vận hành — Nginx Alpine không cần bảo trì nhiều.</li>
                  <li>Biến folder local thành web archive truy cập từ bất kỳ máy nội bộ.</li>
                  <li>Phù hợp làm lớp nền cho automation chứng từ.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Cần kiểm soát quyền truy cập nếu mở rộng ra nhiều người.</li>
                  <li>Chưa có search metadata sâu như document management đầy đủ.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderCurtainDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#0891b2">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Curtain Size Calculator</h2>
            <p class="pd-subtitle">Web app tính vải và kích thước rèm — hỗ trợ tính lẻ, xử lý Excel hàng loạt và chuyển PDF sản xuất sang layout Excel BON cho xưởng.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>250</strong><span>requests từ log hệ thống</span></div>
            <div class="pd-stat"><strong>5</strong><span>file sản xuất xử lý gần nhất · 14–15/05/2026</span></div>
            <div class="pd-stat"><strong>2</strong><span>service độc lập: web Flask + API FastAPI</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Luồng xử lý</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Form</strong><span>Nhập thông số rèm → auto-detect Cách Nối → tính vải cần.</span></div>
                <div class="pd-timeline-item"><strong>Excel</strong><span>Upload file hàng loạt → xử lý batch → download kết quả.</span></div>
                <div class="pd-timeline-item"><strong>PDF</strong><span>Upload PDF kích thước sản xuất → chuyển sang layout Excel BON.</span></div>
                <div class="pd-timeline-item"><strong>Output</strong><span>Số khoang, bi, chiều rộng vải, số cuộn, vải cần order.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People &amp; Cost</p>
                <h3>1 người · Q4/2025 → 5/2026.</h3>
                <p>Cost là thời gian build và container Docker. P&amp;L: giảm lỗi tính vải tay, giảm thời gian chuẩn bị file sản xuất và chuẩn hóa output cho xưởng.</p>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Stack kỹ thuật</p>
                <h3>Flask + FastAPI + pandas + PyMuPDF.</h3>
                <ul class="pd-list">
                  <li>Web app Flask cho người dùng không chuyên kỹ thuật.</li>
                  <li>API FastAPI có /docs cho tích hợp chương trình.</li>
                  <li>pandas/openpyxl xử lý Excel · PyMuPDF xử lý PDF sản xuất.</li>
                </ul>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Giải quyết bài toán nghiệp vụ có công thức phức tạp và nhiều biến.</li>
                  <li>Phục vụ cả form web, API và batch Excel — nhiều cách dùng.</li>
                  <li>Output layout BON phục vụ trực tiếp cho xưởng sản xuất.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Cần test kỹ khi format file đầu vào thay đổi.</li>
                  <li>ROI tiền mặt cần thêm dữ liệu thời gian tiết kiệm trên mỗi file.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderVisualBriefDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#c026d3">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Visual Brief Builder</h2>
            <p class="pd-subtitle">Công cụ tạo brief AI image theo brand — chọn category, model, ratio, reference và rule; hệ thống tự dựng prompt và gửi sang engine AI. Marketing dùng được mà không cần biết prompt.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>3</strong><span>model AI hỗ trợ: wan/2-7, nano-banana-2, gpt-image-2</span></div>
            <div class="pd-stat"><strong>Static</strong><span>HTML/CSS/JS · Nginx Alpine · không cần server riêng</span></div>
            <div class="pd-stat"><strong>Q1–Q2</strong><span>2026 · đang vận hành tại visual.bonstu.site</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Luồng brief → ảnh</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Brief</strong><span>Chọn category, use case, material, mood, ánh sáng và tỷ lệ.</span></div>
                <div class="pd-timeline-item"><strong>Generate</strong><span>Chọn model AI, gửi request, live watch panel theo dõi tiến trình.</span></div>
                <div class="pd-timeline-item"><strong>Refine</strong><span>Preset: warmer light, fewer props, cleaner background, crop safe.</span></div>
                <div class="pd-timeline-item"><strong>Compose</strong><span>Thêm wallpaper/curtain vào ảnh phòng đã chọn — bước xử lý tiếp.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People &amp; Cost</p>
                <h3>Marketing team · static app.</h3>
                <p>Cost vận hành gần bằng 0 — static site + Nginx. P&amp;L: chuẩn hóa brief AI image, giảm lệch brand tone và tăng tốc vòng lặp brief → tạo ảnh → chỉnh.</p>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Brand governance</p>
                <h3>Rulebook + template làm nền.</h3>
                <ul class="pd-list">
                  <li>brand-prompt-config.js — cấu hình prompt theo brand.</li>
                  <li>brand-visual-ruleset.md — quy tắc visual governance.</li>
                  <li>master-prompt-templates.md — template cho từng use case.</li>
                </ul>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Dễ dùng cho người không chuyên kỹ thuật — không cần biết prompt.</li>
                  <li>Chuẩn hóa model, ratio, rule và reference trong một quy trình.</li>
                  <li>Có refinement presets để chỉnh ảnh nhất quán theo brand.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Chưa có số usage định lượng mạnh — đang theo dõi adoption.</li>
                  <li>Chất lượng output phụ thuộc model AI và reference đầu vào.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="pd-site" style="--pd-accent:#c026d3">
            <div class="pd-site-copy">
              <p class="pd-section-label">Website đang chạy</p>
              <h3>visual.bonstu.site</h3>
              <p>Brief builder AI image cho marketing Ordinaire — truy cập nội bộ, port 9001.</p>
              <a class="pd-site-link" href="https://visual.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
            </div>
            <div class="pd-site-shot" style="display:flex;align-items:center;justify-content:center;min-height:200px;background:linear-gradient(135deg,rgba(192,38,211,0.1),rgba(255,255,255,0.9))">
              <div style="text-align:center;padding:24px">
                <div style="font-size:40px;margin-bottom:12px">🎨</div>
                <p style="margin:0;color:#c026d3;font-weight:900;font-size:14px">HTML · CSS · JS · Nginx</p>
                <p style="margin:4px 0 0;color:#53635e;font-size:12px">Kie.ai Image Generation API</p>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderTunnelMasterDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#334155">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Tunnel Master</h2>
            <p class="pd-subtitle">Cloudflare Tunnel tập trung — gom 6+ service nội bộ vào một gateway duy nhất, đưa app Docker local ra subdomain có kiểm soát mà không mở port trực tiếp.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>6+</strong><span>service nội bộ qua một tunnel</span></div>
            <div class="pd-stat"><strong>6,305</strong><span>requests qua 6 subdomain · Cloudflare Analytics Sep~May</span></div>
            <div class="pd-stat"><strong>0</strong><span>port mở trực tiếp trên router/firewall</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Subdomains đang route qua tunnel</p>
              <div class="pd-tags" style="margin-top:0">
                <span class="pd-tag">action.bonstu.site</span>
                <span class="pd-tag">stock.bonstu.site</span>
                <span class="pd-tag">price.bonstu.site</span>
                <span class="pd-tag">bills.bonstu.site</span>
                <span class="pd-tag">workflow.bonstu.site</span>
                <span class="pd-tag">visual.bonstu.site</span>
              </div>
            </section>

            <div class="pd-infra-route">
              <div class="pd-infra-node">
                <strong>Cloudflare Edge</strong>
                <span>HTTPS · bonstu.site subdomains</span>
              </div>
              <div class="pd-infra-arrow">→</div>
              <div class="pd-infra-node">
                <strong>cloudflared container</strong>
                <span>Docker · bonario-shared-tunnel network · route đến từng service local</span>
              </div>
            </div>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">Tính năng hạ tầng</p>
                <h3>Một tunnel · nhiều hostname.</h3>
                <ul class="pd-list">
                  <li>Gom nhiều hostname vào cùng tunnel — cấu hình tập trung.</li>
                  <li>Ép http2 thay QUIC/UDP để tránh lỗi mạng/firewall.</li>
                  <li>Dùng bonario-shared-tunnel network kết nối chéo stack.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Cost P&amp;L</p>
                <h3>Cost vận hành gần bằng 0.</h3>
                <p>Cloudflare Tunnel miễn phí · container nhẹ · không mở port router. P&amp;L: biến máy tính nội bộ thành server với subdomain thật — không thuê VPS, không cấu hình mạng phức tạp.</p>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Không mở port trực tiếp — an toàn hơn so với port forwarding.</li>
                  <li>Tập trung hóa cấu hình tunnel cho tất cả service.</li>
                  <li>Dễ mở rộng khi thêm service mới — chỉ cần thêm hostname vào config.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Phụ thuộc Cloudflare và máy host nội bộ — nếu máy tắt thì mất kết nối.</li>
                  <li>Cần thêm monitoring để phát hiện tunnel down sớm hơn.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderActionBridgeDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#334155">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Action Local Bridge</h2>
            <p class="pd-subtitle">Container hạ tầng dùng socat để chuyển tiếp TCP traffic từ port 5504 sang action-product:5004 trong Docker network — tách routing khỏi backend nghiệp vụ.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>alpine/socat</strong><span>image cực nhẹ · không có application code</span></div>
            <div class="pd-stat"><strong>5504→5004</strong><span>TCP forward · bonario-shared-tunnel network</span></div>
            <div class="pd-stat"><strong>0</strong><span>database · 0 persistent storage · 0 thay đổi backend</span></div>
          </div>

          <div class="pd-body">
            <div class="pd-infra-route">
              <div class="pd-infra-node">
                <strong>:5504</strong>
                <span>Port listen trên host</span>
              </div>
              <div class="pd-infra-arrow">→</div>
              <div class="pd-infra-node">
                <strong>action-product:5004</strong>
                <span>Service đích trong Docker network</span>
              </div>
            </div>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">Vai trò</p>
                <h3>Cầu nối nhẹ, không cần bảo trì.</h3>
                <ul class="pd-list">
                  <li>Expose action-product qua một đường tunnel/network path riêng.</li>
                  <li>Không cần chỉnh code backend — chỉ thêm container bridge.</li>
                  <li>Chạy trong bonario-shared-tunnel — kết nối chéo stack.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Tại sao cần?</p>
                <h3>Tách routing khỏi nghiệp vụ.</h3>
                <p>Khi cần thay đổi cách expose service hoặc test qua một đường riêng, chỉ cần thay đổi bridge container — không đụng vào code action-product. Giảm rủi ro khi thay đổi hạ tầng.</p>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Cực nhẹ, ít tài nguyên — phù hợp vai trò utility infrastructure.</li>
                  <li>Tách hạ tầng bridge khỏi backend nghiệp vụ hoàn toàn.</li>
                  <li>Dễ triển khai và thay thế khi cần thay đổi routing.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Ít giá trị khi đứng một mình — phụ thuộc vào action-product.</li>
                  <li>Cần tài liệu network rõ để người khác maintain dễ hơn.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>`;
    }

    const CUSTOM_PROJECT_RENDERERS = {
        "bonario-stock-management": renderStockOnhandDetail,
        "ord-price-lookup": renderOrdPriceLookupDetail,
        "bonario-product-hub": renderBonarioHubDetail,
        "auto-workflow": renderAutoWorkflowDetail,
        "in-label-pdf": renderInLabelPdfDetail,
        "op-round-robin": renderOpRoundRobinDetail,
        "bills-server": renderBillsServerDetail,
        "calculate-curtain-size": renderCurtainDetail,
        "visual-brief-builder": renderVisualBriefDetail,
        "tunnel-master": renderTunnelMasterDetail,
        "action-local-bridge": renderActionBridgeDetail,
    };

    function renderPanelContent(groupId) {
        const group = SYSTEM_GROUPS.find((g) => g.id === groupId);
        if (!group) return "";
        const groupProjects = group.projectIds
            .map((id) => projects.find((p) => p.id === id))
            .filter(Boolean);
        const projectBlocks = groupProjects
            .map((proj, index) => {
                const customRenderer = CUSTOM_PROJECT_RENDERERS[proj.id];
                if (customRenderer) return customRenderer(proj, index);
                const profile = getProjectDetailProfile(proj);
                return `
        <article class="detail-project-card">
          <header class="detail-project-head">
            <span class="detail-project-index">${String(index + 1).padStart(2, "0")}</span>
            <div>
              <p class="detail-project-kicker">${escapeHtml(proj.chapter)}</p>
              <h2 class="detail-project-title">${escapeHtml(profile.title || proj.name)}</h2>
              <p class="detail-project-hook">${escapeHtml(proj.hook)}</p>
            </div>
          </header>
          <div class="detail-project-body">
            ${renderTextSection("Mô tả project", profile.description, "detail-info-card-wide")}
            <div class="detail-info-grid">
              ${renderTextSection("Timeline", profile.timeline)}
              ${renderPeopleSection(profile.people)}
            </div>
            ${renderTextSection("Cost P&L", profile.pnl, "detail-info-card-wide")}
            ${renderTextSection("Chi phí thị trường tham chiếu", profile.marketCost, "detail-info-card-wide")}
            ${renderTextSection("ROI", profile.roi, "detail-info-card-wide")}
            <div class="detail-analysis-grid">
              ${renderListSection("Điểm mạnh", profile.strengths, "detail-info-card-strength")}
              ${renderListSection("Điểm yếu", profile.weaknesses, "detail-info-card-weakness")}
            </div>
          </div>
        </article>`;
            })
            .join("");
        return `
      <header class="detail-hero">
        <h1 class="detail-title">${escapeHtml(group.label)}</h1>
      </header>
      <div class="detail-project-list">${projectBlocks}</div>`;
    }

    function parseRoute() {
        const match = window.location.hash.match(/^#\/projects\/([^/?#]+)/);
        if (match) {
            return {
                name: "project",
                groupId: decodeURIComponent(match[1]),
            };
        }
        if (window.location.hash === "#/breakdown") {
            return { name: "home", scrollToScene: 1 };
        }
        return { name: "home" };
    }

    function buildProjectRoute(groupId) {
        const group = SYSTEM_GROUPS.find((g) => g.id === groupId);
        if (!group) {
            return `
      <main class="project-route" aria-label="Không tìm thấy project">
        <section class="project-route-shell">
          <button class="route-back" type="button" data-route-home>← Quay lại Project breakdown</button>
          <p class="eyebrow-label">Project breakdown</p>
          <h1 class="project-route-title">Không tìm thấy mục này.</h1>
          <p class="project-route-summary">Mục chi tiết không còn tồn tại hoặc URL đã bị sai.</p>
        </section>
      </main>`;
        }
        return `
      <main class="project-route" aria-label="Chi tiết ${escapeHtml(group.label)}">
        <section class="project-route-shell" style="--detail-accent:${escapeHtml(group.accent)}">
          <button class="route-back" type="button" data-route-home>← Quay lại Project breakdown</button>
          ${renderPanelContent(group.id)}
        </section>
      </main>`;
    }

    let countersStarted = false;
    let globalEventsBound = false;

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        document.querySelectorAll("[data-target]").forEach((el) => {
            animateCounter(
                el,
                parseInt(el.dataset.target, 10),
                el.dataset.suffix || "",
                1800,
            );
        });
    }

    function startHookCounters() {
        document.querySelectorAll("[data-hook-target]").forEach((el) => {
            animateCounter(
                el,
                parseInt(el.dataset.hookTarget, 10),
                el.dataset.suffix || "",
                1600,
            );
        });
    }

    function updateDots(sceneIndex) {
        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("dot-active", i === sceneIndex);
        });
    }

    function getCurrentSceneIndex() {
        // Return the scene index whose dot is currently active
        const active = document.querySelector(".dot.dot-active");
        if (active) return parseInt(active.dataset.scene, 10) || 0;
        return 0;
    }

    function scrollToScene(index) {
        const el = document.getElementById("scene-" + index);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    function openPanel(groupId) {
        const panel = document.getElementById("side-panel");
        const content = document.getElementById("panel-content");
        if (!panel || !content) return;
        content.innerHTML = renderPanelContent(groupId);
        panel.classList.add("panel-open");
        document
            .getElementById("panel-backdrop")
            ?.classList.add("backdrop-open");
        panel.removeAttribute("aria-hidden");
        document.querySelectorAll(".node-btn").forEach((btn) => {
            btn.classList.toggle("node-active", btn.dataset.group === groupId);
        });
        panel.querySelector("[data-close-panel]")?.focus();
    }

    function closePanel() {
        const panel = document.getElementById("side-panel");
        if (!panel) return;
        panel.classList.remove("panel-open");
        document
            .getElementById("panel-backdrop")
            ?.classList.remove("backdrop-open");
        panel.setAttribute("aria-hidden", "true");
        document
            .querySelectorAll(".node-btn")
            .forEach((btn) => btn.classList.remove("node-active"));
    }

    function setupObservers() {
        const dotNav = document.getElementById("dot-nav");
        const hook = document.getElementById("scene-0");
        if (hook && dotNav) {
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            dotNav.setAttribute("aria-hidden", "true");
                            dotNav.classList.remove("dot-nav-visible");
                        } else {
                            dotNav.removeAttribute("aria-hidden");
                            dotNav.classList.add("dot-nav-visible");
                        }
                    });
                },
                { threshold: 0.4 },
            ).observe(hook);
        }
        const scale = document.getElementById("scene-2");
        if (scale) {
            new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) startCounters();
                },
                { threshold: 0.3 },
            ).observe(scale);
        }
        document.querySelectorAll(".scene").forEach((scene) => {
            new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        const idx = parseInt(
                            scene.id.replace("scene-", ""),
                            10,
                        );
                        if (!isNaN(idx)) updateDots(idx);
                    }
                },
                { threshold: 0.5 },
            ).observe(scene);
        });
        // Entrance animations: add scene-in when scene enters viewport
        document.querySelectorAll(".scene").forEach((scene) => {
            new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting)
                        scene.classList.add("scene-in");
                },
                { threshold: 0.12 },
            ).observe(scene);
        });
    }

    function bindEvents() {
        document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
            btn.addEventListener("click", () =>
                scrollToScene(parseInt(btn.dataset.scrollTo, 10)),
            );
        });
        document.querySelectorAll(".dot[data-scene]").forEach((dot) => {
            dot.addEventListener("click", () =>
                scrollToScene(parseInt(dot.dataset.scene, 10)),
            );
        });
        document.querySelectorAll("[data-route-project]").forEach((btn) => {
            btn.addEventListener("click", () => {
                window.location.hash = `#/projects/${encodeURIComponent(btn.dataset.routeProject)}`;
            });
        });
        document.querySelectorAll("[data-route-home]").forEach((btn) => {
            btn.addEventListener("click", () => {
                window.location.hash = "#/breakdown";
            });
        });

        // ── Evidence strip toggle (mobile collapse) ──────────────────────────
        const evidenceToggle = document.getElementById("evidence-toggle");
        const evidenceStrip = document.getElementById("evidence-strip");
        if (evidenceToggle && evidenceStrip) {
            // Expanded by default on desktop; collapsed on mobile
            if (window.innerWidth > 480) {
                evidenceStrip.classList.remove("is-collapsed");
                evidenceToggle.setAttribute("aria-expanded", "true");
            }
            evidenceToggle.addEventListener("click", () => {
                const collapsed =
                    evidenceStrip.classList.toggle("is-collapsed");
                evidenceToggle.setAttribute(
                    "aria-expanded",
                    String(!collapsed),
                );
            });
        }

        // ── Keyboard: Arrow keys scroll scenes on the home route ─────────────
        if (!globalEventsBound) {
            globalEventsBound = true;
            document.addEventListener("keydown", (e) => {
                if (!document.querySelector(".scene")) return;
                if (e.key === "ArrowDown" || e.key === "PageDown") {
                    e.preventDefault();
                    const cur = getCurrentSceneIndex();
                    if (cur < 3) scrollToScene(cur + 1);
                } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                    e.preventDefault();
                    const cur = getCurrentSceneIndex();
                    if (cur > 0) scrollToScene(cur - 1);
                }
            });
        }
    }

    function renderHome(app, route) {
        countersStarted = false;
        app.innerHTML = `
      ${buildDotNav()}
      <main id="story-scroll" aria-label="Báo cáo tác động Bonario">
        ${buildHookScene()}
        ${buildSystemScene()}
        ${buildCounterScene()}
        ${buildCloseScene()}
      </main>`;
        setupObservers();
        bindEvents();
        requestAnimationFrame(() => {
            document.getElementById("scene-0")?.classList.add("scene-in");
            startHookCounters();
            if (route.scrollToScene !== undefined) {
                scrollToScene(route.scrollToScene);
            }
        });
    }

    function renderApp() {
        const app = document.getElementById("app");
        if (!app) return;
        const route = parseRoute();
        if (route.name === "project") {
            app.innerHTML = buildProjectRoute(route.groupId);
            window.scrollTo({ top: 0, behavior: "auto" });
            bindEvents();
            return;
        }
        renderHome(app, route);
    }

    function init() {
        renderApp();
        window.addEventListener("hashchange", renderApp);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
