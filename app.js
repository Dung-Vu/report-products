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
            accent: "#0369a1",
        },
        {
            id: "bonario-hub",
            label: "Bonario Hub",
            eyebrow: "02 · Product Ops",
            summary:
                "Hub trung tâm cho dữ liệu sản phẩm Bonario: checker, BOM, bảng giá, mô tả, audit log và daily scan. Bao gồm checklist tạo sản phẩm mới với đầy đủ BOM, cost, giá bán, vendor và description.",
            projectIds: ["bonario-product-hub"],
            accent: "#0f766e",
        },
        {
            id: "curtain-tools",
            label: "Công cụ tính toán cho Rèm Cửa",
            eyebrow: "03 · Production",
            summary:
                "Tính vải, kích thước rèm, xử lý Excel/PDF sản xuất và xuất layout cho xưởng tiết kiệm thời gian cho OP xử lý đơn hàng rèm.",
            projectIds: ["calculate-curtain-size"],
            accent: "#0891b2",
        },
        {
            id: "odoo-pdf-documents",
            label: "Công cụ in Label nhập xuất hàng hóa",
            eyebrow: "04 · Documents",
            summary:
                "In label PDF cho phiếu nhập kho, tra cứu phiếu và QC batch kết nối trực tiếp dữ liệu Odoo.",
            projectIds: ["bills-server", "in-label-pdf"],
            accent: "#7c3aed",
        },
        {
            id: "sc-op-in-charge",
            label: "Phân công OP Inchare tự động",
            eyebrow: "05 · SC Ops",
            summary:
                "Phân công OP in charge tự động, giảm thao tác chia việc thủ công và giúp trách nhiệm xử lý rõ ràng hơn.",
            projectIds: ["op-round-robin"],
            accent: "#be123c",
        },
        {
            id: "local-server-infra",
            label: "Build hạ tầng: biến máy tính thành server",
            eyebrow: "06 · Platform",
            summary:
                "Đưa các app nội bộ lên domain riêng bằng máy tính sẵn có, giúp truy cập ổn định hơn mà không cần thuê server ngoài.",
            projectIds: ["tunnel-master", "action-local-bridge"],
            countLabel: "2 lớp hạ tầng",
            accent: "#334155",
        },
        {
            id: "marketing-image-gen",
            label: "Công cụ gen hình ảnh cho MKT qua Codex",
            eyebrow: "07 · Marketing AI",
            summary:
                "Chuẩn hóa cách tạo brief hình AI để marketing ra ảnh nhanh hơn, đúng brand hơn và ít phụ thuộc vào kỹ năng prompt của từng người.",
            projectIds: ["visual-brief-builder"],
            accent: "#c026d3",
        },
        {
            id: "odoo-product-creation",
            label: "Đồng bộ & clean dữ liệu sản phẩm Bonario",
            eyebrow: "08 · Product Data",
            summary:
                "Làm sạch và chuẩn hóa ~16.000 sản phẩm Bonario từ dữ liệu thô của nhà cung cấp: tên gốc, khổ vải, bảng giá và pricelist cho Odoo.",
            projectIds: ["bonario-product-hub"],
            accent: "#0f766e",
        },
        {
            id: "internal-order-tracking",
            label: "Tracking order internal",
            eyebrow: "09 · Order Tracking",
            summary:
                "Theo dõi tiến độ đơn cho khách hàng và cho Sales, dựa trên Order State trong báo giá để biết đơn đang ở bước nào.",
            projectIds: ["auto-workflow"],
            accent: "#ea580c",
        },
        {
            id: "rfid",
            label: "RFID",
            eyebrow: "10 · Warehouse",
            summary:
                "Định hướng đối soát RFID cho kho: ghi nhận, reconcile và giảm lệch tồn khi hàng di chuyển qua nhiều bước.",
            projectIds: ["auto-workflow", "bonario-stock-management"],
            accent: "#0d9488",
        },
        {
            id: "stock-escalation",
            label: "Thông báo thông tin insight từ Odoo vào Teams",
            eyebrow: "11 · Alerting",
            summary:
                "Đẩy thông báo insight hàng tồn, discontinue và cảnh báo từ Odoo vào Teams để các phòng ban xử lý kịp thời.",
            projectIds: ["auto-workflow", "bonario-product-hub"],
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
                "1 buổi để triển khai toàn bộ script và setup automation.",
            people: "2 người: Uyên đưa ra ý tưởng triển khai; Dũng viết scripts và xử lý ổn định workflow automation.",
            pnl: "Cost khoảng 250k cho 1 buổi triển khai. P&L nằm ở việc giảm thao tác thủ công, đảm bảo tính chính xác và đúng format kế toán.",
            roi: "Xử lý 983 chứng từ VAT trong 4 tháng, rút ngắn khối lượng thao tác thủ công từ khoảng 1 tháng xuống còn 1 buổi chiều. ROI ước tính +4.700%.",
            strengths: [
                "Giảm mạnh thao tác thủ công khi xử lý chứng từ VAT.",
                "Đầu ra đúng format kế toán, dễ kiểm soát và đối chiếu.",
                "Chứng từ được gom thành folder hoàn chỉnh, thuận tiện cho triển khai thực tế.",
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
                "Q1-Q2/2026: xây dựng luồng tạo brief hình AI cho marketing, từ chọn mục đích hình, phong cách, tỷ lệ đến chỉnh lại yêu cầu.",
            people: "Anh Hà triển khai toàn bộ project. Dũng support build Docker, connect subdomain và bảo trì hệ thống.",
            pnl: "Cost thấp vì tận dụng hạ tầng hiện có. P&L đến từ giảm vòng lặp brief sai, giảm lệch brand tone và tiết kiệm thời gian chuẩn bị prompt.",
            roi: "ROI hiện nằm ở quy trình: marketing có cách làm thống nhất hơn, giảm phụ thuộc vào kỹ năng prompt cá nhân và giảm thời gian sửa brief.",
            strengths: [
                "Dễ dùng cho người không chuyên prompt.",
                "Chuẩn hóa mục đích hình, tone, tỷ lệ và reference trong cùng một form.",
                "Phù hợp mở rộng thành workflow creative nội bộ cho marketing.",
            ],
            weaknesses: [
                "Chưa có số usage định lượng mạnh.",
                "Chất lượng ảnh vẫn phụ thuộc reference đầu vào và engine tạo ảnh.",
            ],
            description:
                "Công cụ chuẩn hóa brief hình AI, giúp marketing tạo yêu cầu hình ảnh nhất quán hơn với brand và giảm thời gian thử prompt thủ công.",
        },
        "tunnel-master": {
            timeline:
                "Q1/2026 - 05/2026: đưa nhiều app nội bộ lên domain riêng để người dùng truy cập dễ hơn.",
            people: "Nhóm vận hành và các bộ phận dùng app nội bộ là người hưởng lợi trực tiếp.",
            pnl: "Cost vận hành thấp vì tận dụng máy tính sẵn có. P&L nằm ở việc giảm nhu cầu thuê server riêng và giảm rủi ro mở port trực tiếp.",
            roi: "6+ app nội bộ đã có domain và 6.305 lượt truy cập qua subdomain cho thấy hạ tầng đã phục vụ nhu cầu thật.",
            strengths: [
                "Không cần mở port trực tiếp trên mạng công ty.",
                "Các app nội bộ có domain dễ nhớ và dễ chia sẻ hơn.",
                "Dễ thêm app mới khi công ty cần mở rộng công cụ nội bộ.",
            ],
            weaknesses: [
                "Phụ thuộc vào máy chủ nội bộ, máy tắt thì app không truy cập được.",
                "Cần thêm cảnh báo sớm khi đường truy cập bị lỗi.",
            ],
            description:
                "Cổng truy cập app nội bộ giúp biến máy tính sẵn có thành nơi phục vụ nhiều app qua domain riêng, dễ dùng hơn cho các phòng ban.",
        },
        "action-local-bridge": {
            timeline:
                "Q1/2026: tạo cầu nối riêng để Action Product truy cập ổn định qua domain nội bộ.",
            people: "Người vận hành Action Product và người dùng app hưởng lợi trực tiếp.",
            pnl: "Cost gần như chỉ là thời gian setup. P&L nằm ở việc giảm rủi ro khi đưa app live mà không phải sửa app chính.",
            roi: "ROI nằm ở việc app có đường truy cập ổn định hơn, thay đổi hạ tầng không ảnh hưởng logic nghiệp vụ.",
            strengths: [
                "Giữ đường truy cập cho Action Product ổn định hơn.",
                "Không phải sửa logic app chính khi đổi cách truy cập.",
                "Dễ thay thế hoặc điều chỉnh khi hạ tầng thay đổi.",
            ],
            weaknesses: [
                "Giá trị chính là hỗ trợ app Action Product, không phải sản phẩm độc lập.",
                "Cần tài liệu vận hành rõ để người khác tiếp quản dễ hơn.",
            ],
            description:
                "Cầu nối cho Action Product giúp app chạy sau domain nội bộ ổn định hơn, giảm rủi ro khi thay đổi hạ tầng truy cập.",
        },
    };

    const HOOK_COUNTERS = [
        {
            value: 11,
            suffix: "",
            label: "Projects",
            sub: "Đã triển khai và đang hoạt động",
        },
        {
            value: 8,
            suffix: " tháng",
            label: "Timeline triển khai",
            sub: "Từ 22/09/2025 đến 05/2026",
        },
        {
            value: 6305,
            suffix: "",
            label: "Số lượt sử dụng các công cụ",
            sub: "Cloudflare Analytics · 6 subdomain · Sep 2025 – May 2026",
        },
    ];

    const SCALE_CARDS = [
        {
            value: 150,
            suffix: "tr+",
            label: "Tổng lợi nhuận ròng",
            sub: "Lợi nhuận từ 11 project đã và đang triển khai, chỉ tính các phần đã quy đổi được ra VND",
            large: true,
        },
        {
            value: 6305,
            suffix: "",
            label: "Lượt truy cập tổng domain",
            sub: "Cloudflare Analytics · 6 subdomain nội bộ · Sep 2025 – May 2026",
        },
        {
            value: 100,
            suffix: "%",
            label: "Tỉ lệ hoàn thành",
            sub: "50 workflow automation đã được triển khai và hoàn tất đúng kỳ vọng",
        },
        {
            value: 9,
            suffix: "",
            label: "Workflow đang chạy",
            sub: "Các workflow/webhook đang live và phục vụ vận hành hằng ngày",
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
            num: "30",
            phase: "0-30 ngày",
            accent: "#0f766e",
            title: "Ổn định hệ thống đang chạy",
            why: "11 project đã tạo giá trị, bước tiếp theo là vận hành ổn định và có người theo dõi rõ ràng.",
            desc: "Trong 30 ngày đầu, ưu tiên chuẩn hóa cách theo dõi các hệ thống đang live, gom lại checklist vận hành và xác định rõ project nào cần bảo trì, project nào cần nâng cấp.",
            items: [
                "Lập danh sách 11 project đang chạy, trạng thái hiện tại, người dùng chính và mức độ ưu tiên.",
                "Tạo checklist kiểm tra hằng tuần để phát hiện sớm lỗi trước khi phòng ban báo ngược lại.",
                "Viết tài liệu ngắn cho các project đang được dùng nhiều để người khác có thể nắm cách vận hành cơ bản.",
            ],
            effort: "Timeline: 0-30 ngày",
        },
        {
            num: "60",
            phase: "31-60 ngày",
            accent: "#2563eb",
            title: "Chuẩn hóa quy trình cho các phòng ban",
            why: "Giá trị lớn nhất không chỉ nằm ở app, mà nằm ở việc app thay đổi cách team làm việc mỗi ngày.",
            desc: "Giai đoạn này tập trung làm rõ quy trình trước và sau khi có công cụ, đo thời gian tiết kiệm được, gom feedback từ Sales, SC, kho, kế toán và marketing để cải tiến đúng việc cần.",
            items: [
                "Chọn 3-5 project có tác động lớn nhất để chuẩn hóa hướng dẫn sử dụng và quy trình bàn giao.",
                "Đo lại thời gian tiết kiệm thực tế theo từng nhóm nghiệp vụ, thay vì chỉ ước tính bằng cảm nhận.",
                "Chốt danh sách cải tiến nhỏ nhưng có tác động cao để giảm thao tác thủ công cho từng phòng ban.",
            ],
            effort: "Timeline: 31-60 ngày",
        },
        {
            num: "90",
            phase: "61-90 ngày",
            accent: "#7c3aed",
            title: "Mở rộng vai trò thành người phụ trách vận hành số",
            why: "Khi hệ thống đã chạy thật, công ty cần một người giữ nhịp phát triển, bảo trì và biến nhu cầu nghiệp vụ thành công cụ dùng được.",
            desc: "Trong 90 ngày, mục tiêu là chuyển từ người build từng app riêng lẻ thành người chịu trách nhiệm một lớp vận hành số: nhận yêu cầu, phân tích tác động, ưu tiên việc cần làm và theo dõi hiệu quả sau triển khai.",
            items: [
                "Thiết lập cách nhận yêu cầu mới từ các phòng ban: vấn đề là gì, tốn bao nhiêu thời gian, lợi ích dự kiến ra sao.",
                "Lập roadmap cải tiến theo quý, ưu tiên các việc giảm lỗi, giảm thời gian chờ và tăng khả năng kiểm soát dữ liệu.",
                "Báo cáo định kỳ kết quả sau triển khai: project nào đang dùng tốt, project nào cần sửa, project nào nên dừng hoặc gộp lại.",
            ],
            effort: "Timeline: 61-90 ngày",
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
          <p class="eyebrow-label">CÁC SỐ LIỆU ĐÁNG CHÚ Ý</p>
          <h3 class="evidence-strip-title">Những tín hiệu cho thấy hệ thống đang được dùng thật.</h3>
          <p class="evidence-strip-note">Các số này lấy từ log truy cập, database ứng dụng và dữ liệu Odoo. Đây là bằng chứng vận hành, tách riêng khỏi phần ước tính ROI.</p>
        </div>
        <button class="evidence-strip-toggle" id="evidence-toggle" aria-expanded="false" aria-controls="evidence-body">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Xem số liệu xác minh (${companyScale.length + repoRelevantOdoo.length})
        </button>
        <div class="evidence-strip-body" id="evidence-body">
          <div class="evidence-strip-body-inner">
            ${
                companyScale.length
                    ? `<p class="evidence-subgroup-title">Usage từ app nội bộ</p>
            <div class="evidence-grid">
              ${renderEvidenceCards(companyScale)}
            </div>`
                    : ""
            }
            ${
                repoRelevantOdoo.length
                    ? `<p class="evidence-subgroup-title">Dữ liệu từ project &amp; Odoo</p>
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
            <h1 class="hook-line1">Báo cáo phát triển</h1>
            <h1 class="hook-line2">sản phẩm / hệ thống</h1>
          </div>
          <p class="hook-sub" style="text-transform:none;letter-spacing:0;font-weight:500;font-size:clamp(14px,1.6vw,18px);max-width:680px;color:rgba(232,240,236,0.72);">11 projects đã triển khai và đang hoạt động. Giúp các phòng ban trong công ty hoạt động tốt hơn nhờ công nghệ, tiết kiệm giờ làm việc, quản lý hệ thống thông tin của công ty bên cạnh Odoo tốt hơn.</p>
          <div class="hook-stats">
            ${HOOK_COUNTERS.map(
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
        return `
      <section class="scene scene-scale" id="scene-2" aria-label="Quy mô vận hành">
        <div class="scale-inner">
          ${buildMonthlyChart()}
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

      </button>`,
        ).join("");
    }

    function buildSystemScene() {
        return `
      <section class="scene scene-system" id="scene-1" aria-label="Bản đồ hệ thống">
        <div class="system-inner">
          <header class="system-header">
            <p class="eyebrow-label">Project breakdown</p>
            <h2 class="system-title">11 Projects đã triển khai và đang hoạt động trong 8 tháng qua.</h2>
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
        <h3 class="roadmap-title">Lộ trình 90 ngày để chuyển từ build app sang phụ trách vận hành số.</h3>
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
              Không nền IT vững.<br>
              <span class="close-title-accent">8 tháng — ${projects.length} hệ thống production.</span>
            </h2>
            <div class="close-contrast">
              <div class="close-contrast-row">
                <span class="close-contrast-before">GPA 2.03</span>
                <span class="close-contrast-after">${projects.length} hệ thống production</span>
              </div>
              <div class="close-contrast-row">
                <span class="close-contrast-before">14 tháng không viết code</span>
                <span class="close-contrast-after">8 tháng stack chạy độc lập</span>
              </div>
              <div class="close-contrast-row">
                <span class="close-contrast-before">0 đội ops</span>
                <span class="close-contrast-after">Docker · Tunnel · scheduler tự vận hành</span>
              </div>
            </div>
            <p class="close-body">Số liệu lấy từ Odoo, Docker, SQLite, PostgreSQL, log và database ứng dụng. Có nguồn để verify, không viết cho đẹp báo cáo.</p>
            <hr class="close-divider" aria-hidden="true" />
            <p class="close-question">Điều em muốn tiếp tục không chỉ là build thêm app, mà là được nhận trách nhiệm rõ ràng hơn để biến những hệ thống này thành nền vận hành dài hạn cho công ty.</p>
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
        <article class="pd-card pd-card-hub" style="--pd-accent:#0f766e">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Bonario Product Hub</h2>
            <p class="pd-subtitle">Hub trung tâm vận hành dữ liệu sản phẩm trên Odoo: làm sạch BOM, pricelist, cost, description, report tự động, daily scan và workflow automation trong một giao diện nội bộ.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>10 ngày</strong><span>xây dựng và hoàn thiện project</span></div>
            <div class="pd-stat"><strong>+843,4%</strong><span>ROI ước tính sau 4 tháng triển khai</span></div>
            <div class="pd-stat"><strong>~50tr</strong><span>tổng lợi ích vận hành ước tính</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Timeline</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>10 ngày</strong><span>Được xây dựng và hoàn thiện trong vòng 10 ngày.</span></div>
                <div class="pd-timeline-item"><strong>4 tháng</strong><span>Đã triển khai vận hành production và tạo lợi ích đều theo ngày/tháng.</span></div>
                <div class="pd-timeline-item"><strong>26 modules</strong><span>End-to-end modules cho data, report, automation và monitoring.</span></div>
                <div class="pd-timeline-item"><strong>Enterprise</strong><span>Monitoring stack, scheduled jobs và multi-channel reporting.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People</p>
                <h3>Hoàn thiện bởi 1 người.</h3>
                <ul class="pd-list">
                  <li>Dũng xây dựng repo, logic, integration và vận hành.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Cost P&amp;L</p>
                <h3>Cost nội bộ: 5,3 triệu VND.</h3>
                <p>Chi phí build và hoàn thiện gồm 10 ngày công và AI. P&amp;L nằm ở giảm thao tác thủ công trên Odoo, chuẩn hóa dữ liệu sản phẩm, báo cáo tự động thay cho check thủ công hàng ngày và workflow automation.</p>
              </div>
            </div>

            <div class="pd-wide-box pd-roi-box">
              <p class="pd-section-label">ROI</p>
              <h3>+843,4% · tổng lợi ích ước tính khoảng 50 triệu VND.</h3>
              <p>Report tự động cho Sales/SC tiết kiệm khoảng <strong>2 ngày</strong> cho chu kỳ 14 ngày và 1 tháng, tương đương khoảng <strong>6 bản báo cáo/tháng</strong> (~1 triệu VND). Hệ thống xử lý <strong>3.540 BOM</strong>, <strong>3.769 pricelist</strong>, <strong>4.000 cost</strong> chi tiết cho product variants và tạo <strong>437 mô tả sản phẩm</strong> bằng tiếng Anh + tiếng Việt trong 2,5 ngày cho sản phẩm ORD, ước lượng tối ưu được 3,5 tháng (~42 triệu VND).</p>
              <p>Daily scan tiết kiệm khoảng <strong>1 giờ/ngày</strong> cho việc kiểm tra sản phẩm thiếu BOM, pricelist, description, cost, vendor; thêm khoảng <strong>30 phút/ngày</strong> để kiểm tra sức khỏe các project production. Sau 4 tháng vận hành, tổng lợi ích ước tính khoảng <strong>50 triệu VND</strong>.</p>
            </div>

            <div class="pd-market-estimate">
              <div class="pd-market-summary">
                <p class="pd-section-label">Ước lượng nếu không dùng AI hỗ trợ</p>
                <h3>Team 9 người × 9 tháng</h3>
                <span>Tổng chi phí nhân công tham chiếu: <strong>153.000 USD</strong></span>
                <p>Bonario Product Hub lớn hơn khoảng 4 lần so với Stock Onhand và ORD Price Lookup cộng lại về lượng code và độ phức tạp.</p>
              </div>
              <div class="pd-market-grid">
                <div><strong>1 Tech Lead / Architect</strong><span>Thiết kế tổng thể, Odoo integration, core infrastructure · $3.000/tháng</span></div>
                <div><strong>3 Senior Backend</strong><span>26 blueprints, service/domain layer, scheduler, tests · $2.000 × 3/tháng</span></div>
                <div><strong>3 Senior Frontend</strong><span>22 pages, 74+ components, 26 hooks, 11 stores, PWA, Three.js · $1.500 × 3/tháng</span></div>
                <div><strong>1 DevOps</strong><span>Docker 5 services, Prometheus, Grafana, CI/CD, Cloudflare · $2.000/tháng</span></div>
                <div><strong>1 QA Engineer</strong><span>47 backend tests, Vitest, 6 Playwright E2E · $1.500/tháng</span></div>
              </div>
              <p class="pd-market-note">Một mình Product Hub đã là sản phẩm enterprise cỡ vừa với monitoring stack, scheduled jobs, multi-channel reporting và 26 modules end-to-end.</p>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Daily scan tự động.</li>
                  <li>Bao phủ nhiều điểm dữ liệu: BOM, cost, pricelist, description, Cambodia, Statistics.</li>
                  <li>Rút ngắn quy trình thao tác và giảm thiểu vấn đề phát sinh từ bộ phận SC.</li>
                  <li>Kiểm soát dữ liệu chặt chẽ.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Scale quá rộng nên có vài chức năng chưa được dùng tới.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="pd-site" style="--pd-accent:#0f766e">
            <div class="pd-site-copy">
              <p class="pd-section-label">Website đang chạy</p>
              <h3>action.bonstu.site</h3>
              <p>Hub vận hành sản phẩm Bonario đang live tại action.bonstu.site, dùng cho dữ liệu sản phẩm, workflow automation, report và monitoring nội bộ.</p>
              <a class="pd-site-link" href="https://action.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
            </div>
            <a class="pd-site-shot" href="https://action.bonstu.site/" target="_blank" rel="noopener noreferrer" aria-label="Mở website Bonario Product Hub">
              <img src="./assets/bonario-product-hub.png" alt="Giao diện đăng nhập Bonario Product Hub trên action.bonstu.site" loading="lazy">
            </a>
          </div>
        </article>`;
    }

    function renderAutoWorkflowDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#ea580c">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
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
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">In Label PDF</h2>
            <p class="pd-subtitle">App vận hành kho: tra cứu phiếu nhập từ Odoo, in label PDF, quản lý batch QC và báo cáo doanh số sản phẩm được gắn tags FURNITURE STOCK,FABRICS STOCK</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>2 ngày</strong><span>timeline hoàn thiện app</span></div>
            <div class="pd-stat"><strong>~1tr2</strong><span>chi phí ước tính để xây dựng và hoàn thiện</span></div>
            <div class="pd-stat"><strong>P&amp;L</strong><span>hữu ích cho kho vận kiểm soát, vận chuyển và đối chiếu số lượng QC trên phiếu Odoo</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Luồng nghiệp vụ</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Tra cứu</strong><span>Nhập mã phiếu để lấy đúng dữ liệu phiếu nhập đang có trên Odoo.</span></div>
                <div class="pd-timeline-item"><strong>In label</strong><span>Xuất PDF layout 4×12, 48 labels/trang, trích lot và variant.</span></div>
                <div class="pd-timeline-item"><strong>QC Batch</strong><span>Gom sản phẩm theo batch để kho theo dõi trạng thái kiểm hàng.</span></div>
                <div class="pd-timeline-item"><strong>Báo cáo</strong><span>Xem nhanh nhóm sản phẩm nội thất/vải để hỗ trợ xử lý kho.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People</p>
                <h3>4 người đóng góp vào cách app được hình thành và vận hành.</h3>
                <ul class="pd-list">
                  <li>Vy đóng góp ý tưởng về việc QC để xử lý thuận tiện hơn.</li>
                  <li>Uyên đề xuất ý tưởng phát triển thống kê các hàng gắn tags FURNITURE STOCK, FABRICS STOCK.</li>
                  <li>Anh Hà đưa ra các đóng góp và nhận xét về triển khai in label.</li>
                  <li>Dũng build app, triển khai production và bảo trì app.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Giá trị vận hành</p>
                <h3>Kho/QC có một nơi để lấy phiếu và in label đúng form.</h3>
                <p>Nhân sự không cần tự gom dữ liệu, tự chỉnh file hoặc hỏi lại thông tin phiếu. Công cụ giúp phiếu, label và batch QC đi cùng một luồng rõ ràng hơn.</p>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Chủ động design phiếu label theo phong cách riêng dễ ràng và dễ chỉnh sửa không phù thuộc vào ngôn ngữ của Odoo</li>
                  <li>Một app phục vụ nhiều nghiệp vụ: kho, QC, in ấn, báo cáo.</li>
                  <li>Tách các sản phẩm và số lượng QC  trong 1 phiếu trên hệ thống  Odoo.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Cần thêm thống kê sử dụng theo ngày/tháng để đo Technology adoption.</li>
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
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">OP Round Robin</h2>
            <p class="pd-subtitle">Tự động phân công OP phụ trách báo giá theo vòng xoay, giúp việc chia người xử lý rõ ràng hơn và giảm thao tác phân công thủ công.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>1</strong><span>luồng phân công OP tự động</span></div>
            <div class="pd-stat"><strong>2</strong><span>công ty áp dụng: Bonario / Ordinaire</span></div>
            <div class="pd-stat"><strong>24/7</strong><span>kiểm tra quotation cần người phụ trách</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Luồng phân công</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Phát hiện</strong><span>Tìm các báo giá mới hoặc chưa có OP phụ trách.</span></div>
                <div class="pd-timeline-item"><strong>Chia lượt</strong><span>Phân công theo vòng xoay để tránh dồn việc về một người.</span></div>
                <div class="pd-timeline-item"><strong>Ghi nhận</strong><span>Lưu lại người được phân công để dễ kiểm tra trách nhiệm xử lý.</span></div>
                <div class="pd-timeline-item"><strong>Theo dõi</strong><span>Giúp SC/Sales biết báo giá đang thuộc về ai.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">Vấn đề giải quyết</p>
                <h3>Không cần chia OP bằng tay cho từng báo giá.</h3>
                <ul class="pd-list">
                  <li>Giảm tình trạng báo giá bị bỏ sót người phụ trách.</li>
                  <li>Giảm phụ thuộc vào một người phải ngồi chia việc thủ công.</li>
                  <li>Trách nhiệm xử lý rõ hơn trên từng báo giá.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Giá trị vận hành</p>
                <h3>Luồng phân công đều hơn, dễ kiểm soát hơn.</h3>
                <ul class="pd-list">
                  <li>OP nhận việc theo thứ tự rõ ràng.</li>
                  <li>SC/Sales dễ biết ai đang phụ trách quotation.</li>
                </ul>
              </div>
            </div>

            <div class="pd-wide-box">
              <p class="pd-section-label">Cost P&amp;L</p>
              <h3>Chi phí thấp, tác động nằm ở việc giảm thao tác phân công lặp lại.</h3>
              <p>Cost là thời gian xây dựng script và duy trì chạy ổn định. P&amp;L nằm ở việc giảm thời gian chia OP thủ công, giảm rủi ro bỏ sót báo giá và giúp trách nhiệm xử lý rõ ràng hơn.</p>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Tự động hóa đúng phần việc lặp lại và dễ sai nhất.</li>
                  <li>Giúp phân bổ việc đều hơn giữa các OP.</li>
                  <li>Làm rõ người phụ trách trên từng báo giá.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Cần thêm log số lần gán OP để đo adoption rõ hơn.</li>
                  <li>Cần rule rõ hơn cho trường hợp OP nghỉ, quá tải hoặc đổi người phụ trách.</li>
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
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Bills Archive Server</h2>
            <p class="pd-subtitle">Kho lưu trữ chứng từ PDF để back office mở, tra cứu và đối chiếu nhanh hơn, và bảo mật tuyệt đối chỉ truy cập được folder khi cùng mạng lan với máy chủ.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>983</strong><span>PDF chứng từ trong kho lưu trữ</span></div>
            <div class="pd-stat"><strong>1 buổi</strong><span>timeline triển khai script và setup automation</span></div>
            <div class="pd-stat"><strong>250k</strong><span>chi phí triển khai toàn bộ script</span></div>
            <div class="pd-stat pd-stat-positive"><strong>+4.700%</strong><span>ROI ước tính từ việc rút ngắn xử lý chứng từ VAT</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Tác động xử lý chứng từ VAT</p>
              <div class="pd-monthly-grid">
                <div class="pd-monthly-item"><strong>983</strong><span>chứng từ VAT đã xử lý trong 4 tháng</span></div>
                <div class="pd-monthly-item"><strong>1 tháng</strong><span>thao tác thủ công trước đây</span></div>
                <div class="pd-monthly-item"><strong>1 buổi</strong><span>thời gian xử lý sau automation</span></div>
                <div class="pd-monthly-item"><strong>20 phút</strong><span>thời gian xử lý thủ công mỗi phiếu</span></div>
                <div class="pd-monthly-item"><strong>5 giây</strong><span>để ra một folder hoàn chỉnh</span></div>
                <div class="pd-monthly-item"><strong>12tr</strong><span>ước tính tiết kiệm 1 tháng công</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People</p>
                <h3>2 người đóng góp vào ý tưởng và triển khai.</h3>
                <ul class="pd-list">
                  <li>Uyên đưa ra ý tưởng về việc triển khai.</li>
                  <li>Dũng viết scripts và xử lý ổn định workflow automation.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Cost P&amp;L</p>
                <h3>Chi phí triển khai khoảng 250k.</h3>
                <p>Cost là 1 buổi triển khai toàn bộ script và setup automation. P&amp;L nằm ở việc giảm một lượng lớn thời gian thao tác thủ công, đảm bảo tính chính xác và đúng format kế toán, giúp quá trình triển khai tiện lợi hơn.</p>
              </div>
            </div>

            <div class="pd-wide-box">
              <p class="pd-section-label">ROI</p>
              <h3>+4.700%</h3>
              <p>Trong 1 buổi chiều hệ thống đã xử lý 983 chứng từ VAT của 4 tháng đầu năm 2026. Nếu làm thủ công, khối lượng này ước tính mất khoảng 1 tháng công, tương đương 12 triệu VND. Từ tháng 5, automation workflow giúp không còn phải xử lý thủ công từ phiếu VAT; thời gian xử lý mỗi phiếu giảm từ khoảng 20 phút xuống còn khoảng 5 giây để ra một folder hoàn chỉnh.</p>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Giảm mạnh thao tác thủ công khi xử lý chứng từ VAT.</li>
                  <li>Đầu ra đúng format kế toán, dễ kiểm soát và đối chiếu.</li>
                  <li>Chứng từ được gom thành folder hoàn chỉnh, thuận tiện cho triển khai thực tế.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                <li>Vận hành workflow automation từ đầu tháng 5 cho nên chưa có dữ liệu dài hạn để đánh giá hiệu quả lâu dài.</li>
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
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Curtain Size Calculator</h2>
            <p class="pd-subtitle">Công cụ tính vải rèm từ file báo giá PDF, giúp SC rút ngắn thao tác tính thủ công, kiểm tra lại số liệu báo giá và xuất format chuẩn để gửi xưởng.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>2 tuần</strong><span>thời gian triển khai và build production</span></div>
            <div class="pd-stat"><strong>4 người</strong><span>tham gia mô tả nghiệp vụ, góp ý và triển khai</span></div>
            <div class="pd-stat pd-stat-positive"><strong>+350%</strong><span>ROI ước tính sau 4 tháng vận hành</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Mô tả project</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Nhận PDF</strong><span>Chỉ cần gửi file báo giá PDF vào app thay vì nhập lại từng dòng thủ công.</span></div>
                <div class="pd-timeline-item"><strong>Tính vải</strong><span>Tính số nối tổng, quy cách vải và mã vải cần bao nhiêu m2.</span></div>
                <div class="pd-timeline-item"><strong>Đối chiếu</strong><span>So sánh số liệu với JAK và rà soát báo giá Sales đã tính đúng thành tiền chưa.</span></div>
                <div class="pd-timeline-item"><strong>Xuất file</strong><span>Tạo 5 sheet xử lý để gửi xưởng, thay vì gom số liệu bằng tay.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People</p>
                <h3>Hoàn thiện bởi 4 người.</h3>
                <ul class="pd-list">
                  <li>Chị Yến mô tả cách tính vải xếp li và định vị.</li>
                  <li>Trang hỗ trợ trao đổi thêm thông tin về quá trình tính toán.</li>
                  <li>Uyên đề xuất các cải tiến nâng cao.</li>
                  <li>Dũng xây dựng toàn bộ hệ thống và bảo trì hệ thống.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Cost &amp; P&amp;L</p>
                <h3>Cost triển khai: khoảng 6tr.</h3>
                <ul class="pd-list">
                  <li>Chi phí gồm 2 tuần ngày công để triển khai project và build production.</li>
                  <li>P&amp;L nằm ở việc giảm thao tác tính thủ công, kiểm soát dữ liệu chính xác hơn và nắm rõ cách tính vải.</li>
                  <li>SC có file đầu ra chuẩn hơn để đối chiếu nội bộ và gửi xưởng.</li>
                </ul>
              </div>
            </div>

            <div class="pd-wide-box pd-roi-box">
              <p class="pd-section-label">ROI</p>
              <h3>+350% · ước tính lợi nhuận 27tr sau 4 tháng.</h3>
              <p>Trước khi có app, một đơn báo giá lớn cần tính số nối tổng, lượng vải theo từng quy cách, đối chiếu với JAK, rà lại thành tiền và chuẩn hóa format gửi xưởng. Người có kinh nghiệm như Trang có thể mất khoảng 2-3 tiếng cho một đơn lớn; người chưa đủ kinh nghiệm lâu như Mai Thu có thể mất cả một buổi chiều, khoảng 4-5 tiếng.</p>
              <p>Sau khi triển khai, quy trình rút xuống còn một thao tác gửi file PDF báo giá. App tính toán và tạo 5 sheet xử lý trong khoảng 10-20 giây. Ước tính mỗi tháng giảm khoảng 3 giờ/ngày thao tác thủ công. Sau 4 tháng vận hành, lợi ích ước tính khoảng 540 giờ, tương đương 27tr. Chưa tính phần tối ưu chi phí vải cho xưởng, vì mỗi 1m vải rút gọn được có thể tiết kiệm thêm khoảng 1-2tr.</p>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Rút ngắn rất nhiều thời gian thao tác thủ công.</li>
                  <li>Giảm áp lực công việc cho bộ phận SC.</li>
                  <li>Số liệu tính toán chính xác hơn và tránh sai sót từ báo giá của SC.</li>
                  <li>Đầu ra có format rõ ràng để gửi xưởng và đối chiếu lại khi cần.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Còn cần phát triển thêm công thức về nối ngang và công thức rèm roman.</li>
                  <li>Cần thiết kế tài liệu hướng dẫn để người mới dễ tiếp cận, sử dụng và hiểu app.</li>
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
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Công cụ brief hình AI cho Marketing</h2>
            <p class="pd-subtitle">Một form nội bộ giúp marketing tạo brief hình ảnh theo brand rõ ràng hơn. Thay vì mỗi người tự viết prompt theo kinh nghiệm riêng, app gom các lựa chọn quan trọng thành một quy trình dễ dùng và nhất quán.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>1</strong><span>workflow chuẩn cho việc tạo brief hình AI</span></div>
            <div class="pd-stat"><strong>3</strong><span>nhóm lựa chọn chính: mục đích hình, phong cách, tỷ lệ</span></div>
            <div class="pd-stat"><strong>Live</strong><span>đang chạy tại visual.bonstu.site</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Luồng marketing sử dụng</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Chọn mục đích</strong><span>Xác định hình dùng cho lifestyle, sản phẩm, moodboard hoặc campaign.</span></div>
                <div class="pd-timeline-item"><strong>Chọn phong cách</strong><span>Gom mood, ánh sáng, chất liệu, bố cục và reference vào cùng một form.</span></div>
                <div class="pd-timeline-item"><strong>Tạo brief</strong><span>App chuyển lựa chọn thành brief rõ ràng để gửi sang công cụ tạo ảnh.</span></div>
                <div class="pd-timeline-item"><strong>Chỉnh lại</strong><span>Marketing có thể refine yêu cầu theo hướng ít props hơn, background sạch hơn hoặc đúng brand hơn.</span></div>
              </div>
            </section>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">People</p>
                <h3>Toàn bộ project do Anh Hà triển khai.</h3>
                <ul class="pd-list">
                  <li>Anh Hà triển khai toàn bộ project và định hướng workflow sử dụng.</li>
                  <li>Dũng support build Docker, connect subdomain và bảo trì hệ thống.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Giá trị vận hành</p>
                <h3>Biến prompt cá nhân thành quy trình chung cho team.</h3>
                <ul class="pd-list">
                  <li>Người mới vẫn có thể tạo brief theo cùng một chuẩn.</li>
                  <li>Brief dễ kiểm soát hơn trước khi gửi tạo ảnh.</li>
                  <li>Giảm tình trạng mỗi người viết prompt một kiểu khác nhau.</li>
                </ul>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Dễ dùng cho người không chuyên prompt.</li>
                  <li>Chuẩn hóa mục đích hình, tone, tỷ lệ và reference trong một quy trình.</li>
                  <li>Giúp marketing giữ brand tone ổn định hơn khi dùng AI image.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Chưa có số usage định lượng mạnh — đang theo dõi adoption.</li>
                  <li>Chất lượng ảnh vẫn phụ thuộc reference đầu vào và engine tạo ảnh.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="pd-site" style="--pd-accent:#c026d3">
            <div class="pd-site-copy">
              <p class="pd-section-label">Website đang chạy</p>
              <h3>visual.bonstu.site</h3>
              <p>Công cụ brief hình AI cho marketing. Link dùng để mở workflow tạo brief và chuẩn hóa yêu cầu hình ảnh trước khi generate.</p>
              <a class="pd-site-link" href="https://visual.bonstu.site/" target="_blank" rel="noopener noreferrer">Mở website</a>
            </div>
            <a class="pd-site-shot" href="https://visual.bonstu.site/" target="_blank" rel="noopener noreferrer" aria-label="Mở website Visual Brief Builder">
              <img src="./assets/visual-brief-builder.png" alt="Giao diện Visual Brief Builder trên visual.bonstu.site" loading="lazy">
            </a>
          </div>
        </article>`;
    }

    function renderTunnelMasterDetail(proj, index) {
        return `
        <article class="pd-card" style="--pd-accent:#334155">
          <header class="pd-head">
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Cổng truy cập app nội bộ</h2>
            <p class="pd-subtitle">Biến máy tính nội bộ thành điểm chạy nhiều app có domain riêng như action, stock, price, bills. Người dùng chỉ cần mở link, không cần biết máy nào đang host app.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>6+</strong><span>app nội bộ đã có domain riêng</span></div>
            <div class="pd-stat"><strong>6.305</strong><span>lượt truy cập qua các subdomain đã ghi nhận</span></div>
            <div class="pd-stat"><strong>11</strong><span>port mở trực tiếp trên router công ty</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Các domain nội bộ đang dùng</p>
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
                <strong>Người dùng mở domain</strong>
                <span>Truy cập bằng link bonstu.site trên trình duyệt</span>
              </div>
              <div class="pd-infra-arrow">→</div>
              <div class="pd-infra-node">
                <strong>Máy chủ nội bộ Bonario</strong>
                <span>Máy tính local phục vụ app mà không cần thuê VPS riêng</span>
              </div>
            </div>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">Vấn đề giải quyết</p>
                <h3>App nội bộ không còn phụ thuộc vào IP, port hoặc máy cá nhân khó nhớ.</h3>
                <ul class="pd-list">
                  <li>Các phòng ban truy cập bằng domain rõ ràng.</li>
                  <li>Không cần mở port trực tiếp trên mạng công ty.</li>
                  <li>Dễ gom nhiều app nội bộ về một cách vận hành thống nhất.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Cost P&amp;L</p>
                <h3>Tận dụng máy tính sẵn có thay vì thuê server riêng.</h3>
                <p>Cost vận hành thấp. P&amp;L nằm ở việc nhiều app nội bộ có thể chạy bằng hạ tầng sẵn có, giảm chi phí thuê VPS và giảm rủi ro cấu hình mạng thủ công.</p>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Người dùng có link rõ ràng để mở app nội bộ.</li>
                  <li>Không cần thuê server ngoài cho từng app nhỏ.</li>
                  <li>Dễ mở rộng khi phát sinh thêm app vận hành mới.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Phụ thuộc máy chủ nội bộ, máy tắt thì các app cũng bị ảnh hưởng.</li>
                  <li>Cần thêm cảnh báo để phát hiện sớm khi domain hoặc máy chủ gặp lỗi.</li>
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
            <p class="pd-kicker">${String(index + 1).padStart(2, "0")} · ${escapeHtml(proj.chapter)}</p>
            <h2 class="pd-title">Cầu nối cho Action Product</h2>
            <p class="pd-subtitle">Một lớp trung gian giúp Action Product truy cập ổn định qua domain nội bộ mà không phải sửa logic app chính mỗi khi thay đổi cách host.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>1</strong><span>cầu nối riêng cho Action Product</span></div>
            <div class="pd-stat"><strong>0</strong><span>thay đổi logic app chính</span></div>
            <div class="pd-stat"><strong>Low cost</strong><span>chi phí duy trì gần như không đáng kể</span></div>
          </div>

          <div class="pd-body">
            <div class="pd-infra-route">
              <div class="pd-infra-node">
                <strong>Domain Action Product</strong>
                <span>Người dùng truy cập bằng link quen thuộc</span>
              </div>
              <div class="pd-infra-arrow">→</div>
              <div class="pd-infra-node">
                <strong>App chạy trên máy chủ local</strong>
                <span>Cầu nối giữ đường truy cập ổn định cho app</span>
              </div>
            </div>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">Vai trò</p>
                <h3>Giữ đường truy cập cho Action Product ổn định hơn.</h3>
                <ul class="pd-list">
                  <li>Tách phần truy cập domain khỏi logic app chính.</li>
                  <li>Khi đổi cách host, không cần sửa lại app nghiệp vụ.</li>
                  <li>Giảm rủi ro khi đưa app nội bộ ra môi trường dùng thật.</li>
                </ul>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">Giá trị vận hành</p>
                <h3>Thay đổi hạ tầng mà ít ảnh hưởng người dùng.</h3>
                <p>Project này không tạo tính năng mới cho người dùng cuối, nhưng giúp Action Product chạy ổn định hơn sau domain nội bộ và giảm rủi ro mỗi khi cần điều chỉnh hạ tầng.</p>
              </div>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Giảm rủi ro khi thay đổi cách truy cập Action Product.</li>
                  <li>Không làm phức tạp app chính.</li>
                  <li>Dễ thay thế nếu cần đổi cấu hình host sau này.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Giá trị chính là hỗ trợ Action Product, không phải một app độc lập.</li>
                  <li>Cần tài liệu vận hành rõ để người khác tiếp quản dễ hơn.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderLocalServerInfraDetail() {
        return `
        <section class="infra-page">
          <article class="infra-overview">
            <div class="infra-overview-copy">
              <p class="pd-kicker">06 · Platform</p>
              <h2>Biến máy tính nội bộ thành server vận hành</h2>
              <p>Hạ tầng này giúp các app nội bộ có domain rõ ràng, truy cập ổn định hơn và không cần thuê riêng một server cho từng công cụ nhỏ. Người dùng chỉ mở link, phần vận hành phía sau được gom về một lớp quản lý chung.</p>
            </div>
            <div class="infra-overview-stats" aria-label="Số liệu hạ tầng">
              <div><strong>6+</strong><span>app nội bộ có domain riêng</span></div>
              <div><strong>6.305</strong><span>lượt truy cập đã ghi nhận</span></div>
              <div><strong>11</strong><span>port mở trực tiếp trên router</span></div>
            </div>
          </article>

          <section class="infra-access-map" aria-label="Luồng truy cập app nội bộ">
            <div>
              <span>01</span>
              <strong>Người dùng mở link</strong>
              <p>Sales, SC, kho hoặc back office truy cập bằng domain bonstu.site.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Cổng truy cập chung</strong>
              <p>Domain được gom về một điểm điều phối thay vì mỗi app một cách mở riêng.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Máy chủ nội bộ</strong>
              <p>Máy tính local phục vụ app thật, tận dụng hạ tầng sẵn có.</p>
            </div>
            <div>
              <span>04</span>
              <strong>App vận hành</strong>
              <p>Action, Stock, Price, Bills, Workflow, Visual tiếp tục chạy cho từng nghiệp vụ.</p>
            </div>
          </section>

          <article class="infra-unit infra-unit-primary">
            <header>
              <p class="pd-kicker">01 · Internal Access</p>
              <h2>Cổng truy cập app nội bộ</h2>
              <p>Đưa nhiều app nội bộ lên domain riêng để các phòng ban mở nhanh bằng link, không phải nhớ IP, port hoặc máy nào đang chạy app.</p>
            </header>
            <div class="infra-domain-strip">
              <span>action.bonstu.site</span>
              <span>stock.bonstu.site</span>
              <span>price.bonstu.site</span>
              <span>curtain-calculator.bonstu.site</span>
              <span>label.bonstu.site</span>
              <span>visual.bonstu.site</span>
            </div>
            <div class="infra-unit-grid">
              <div>
                <p class="pd-section-label">Giá trị vận hành</p>
                <h3>Một cách truy cập thống nhất cho nhiều app.</h3>
                <ul class="pd-list">
                  <li>Các phòng ban có link rõ ràng để mở app nội bộ.</li>
                  <li>Không cần mở port trực tiếp trên mạng công ty.</li>
                  <li>Dễ thêm app mới khi phát sinh công cụ vận hành mới.</li>
                </ul>
              </div>
              <div>
                <p class="pd-section-label">Cost P&amp;L</p>
                <h3>Tận dụng máy tính sẵn có thay vì thuê server riêng.</h3>
                <p>Cost vận hành thấp. P&amp;L nằm ở việc nhiều app có thể chạy bằng hạ tầng nội bộ, giảm chi phí thuê VPS và giảm rủi ro cấu hình mạng thủ công.</p>
              </div>
            </div>
            <div class="infra-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Truy cập dễ hơn cho người dùng không rành kỹ thuật.</li>
                  <li>Không cần thuê server ngoài cho từng app nhỏ.</li>
                  <li>Giữ quyền kiểm soát app nội bộ trên máy của công ty.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Máy chủ nội bộ tắt thì các app cũng bị ảnh hưởng.</li>
                  <li>Cần thêm cảnh báo sớm khi domain hoặc máy chủ gặp lỗi.</li>
                </ul>
              </div>
            </div>
          </article>

          <article class="infra-unit infra-unit-secondary">
            <header>
              <p class="pd-kicker">02 · Action Product</p>
              <h2>Cầu nối cho Action Product</h2>
              <p>Một lớp hỗ trợ riêng để Action Product chạy ổn định sau domain nội bộ. Khi cần đổi cách host hoặc đường truy cập, app chính ít bị ảnh hưởng hơn.</p>
            </header>
            <div class="infra-mini-stats">
              <div><strong>1</strong><span>cầu nối riêng cho Action Product</span></div>
              <div><strong>0</strong><span>thay đổi logic app chính</span></div>
              <div><strong>Low cost</strong><span>chi phí duy trì gần như không đáng kể</span></div>
            </div>
            <div class="infra-unit-grid">
              <div>
                <p class="pd-section-label">Vai trò</p>
                <h3>Giữ đường truy cập ổn định mà không làm phức tạp app chính.</h3>
                <ul class="pd-list">
                  <li>Tách phần truy cập domain khỏi logic nghiệp vụ.</li>
                  <li>Khi đổi cách host, không cần sửa lại app chính.</li>
                  <li>Giảm rủi ro khi đưa app nội bộ ra môi trường dùng thật.</li>
                </ul>
              </div>
              <div>
                <p class="pd-section-label">Giá trị vận hành</p>
                <h3>Thay đổi hạ tầng mà ít ảnh hưởng người dùng.</h3>
                <p>Project này không tạo tính năng mới cho người dùng cuối, nhưng giúp Action Product chạy ổn định hơn và giảm rủi ro mỗi khi cần điều chỉnh hạ tầng.</p>
              </div>
            </div>
            <div class="infra-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Giảm rủi ro khi thay đổi cách truy cập Action Product.</li>
                  <li>Không làm phức tạp app chính.</li>
                  <li>Dễ thay thế nếu cần đổi cấu hình host sau này.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Giá trị chính là hỗ trợ Action Product, không phải một app độc lập.</li>
                  <li>Cần tài liệu vận hành rõ để người khác tiếp quản dễ hơn.</li>
                </ul>
              </div>
            </div>
          </article>
        </section>`;
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

    function renderStockEscalationDetail() {
        return `
        <article class="escalation-card" style="--pd-accent:#dc2626">
          <header class="escalation-head">
            <p class="pd-kicker">12 · Alerting / Automation</p>
            <h2>Escalate thông báo hàng</h2>
            <p>Workflow automation check real-time khi hàng tồn kho có tag Discontinued đã được bán và không còn tồn trên Odoo. Khi phát hiện case này, hệ thống gửi thông báo tới các phòng ban liên quan để dừng bán và archive sản phẩm đúng nơi.</p>
          </header>

          <section class="escalation-flow" aria-label="Luồng thông báo discontinued">
            <div><strong>Odoo</strong><span>Hàng có tag Discontinued và tồn kho về 0.</span></div>
            <div><strong>Automation</strong><span>Script kiểm tra real-time và trigger cảnh báo.</span></div>
            <div><strong>Marketing</strong><span>Archive sản phẩm trên website.</span></div>
            <div><strong>BIS</strong><span>Archive sản phẩm trên Odoo.</span></div>
            <div><strong>Sales / SC</strong><span>Thông báo và ngừng bán mặt hàng đó.</span></div>
          </section>

          <section class="escalation-grid">
            <div class="escalation-box">
              <p class="pd-section-label">Timeline</p>
              <h3>30 phút</h3>
              <p>Triển khai scripts automation cho luồng kiểm tra và thông báo hàng discontinued/out-of-stock.</p>
            </div>
            <div class="escalation-box">
              <p class="pd-section-label">People</p>
              <h3>1 người</h3>
              <ul class="pd-list">
                <li>Dũng xây dựng scripts để triển khai tự động hóa.</li>
              </ul>
            </div>
            <div class="escalation-box">
              <p class="pd-section-label">Cost P&amp;L</p>
              <h3>Chi phí build không đáng kể.</h3>
              <p>P&amp;L nằm ở giảm thao tác thủ công và đồng bộ thông tin đến toàn bộ các phòng ban liên quan.</p>
            </div>
            <div class="escalation-roi">
              <p class="pd-section-label">ROI</p>
              <strong>+5.900%</strong>
              <p>Tiết kiệm khoảng 30 phút mỗi ngày cho việc check tồn kho của sản phẩm gắn tag và thông báo đến các bộ phận. Đã triển khai 2 tháng, tiết kiệm khoảng 1.800 phút.</p>
            </div>
          </section>

          <section class="pd-analysis escalation-analysis">
            <div class="pd-strength">
              <p class="pd-section-label">Điểm mạnh</p>
              <ul class="pd-list">
                <li>Tối ưu thời gian thao tác thủ công.</li>
                <li>Không bỏ sót các sản phẩm không còn stock mà bị discontinued.</li>
              </ul>
            </div>
            <div class="pd-weakness">
              <p class="pd-section-label">Điểm yếu</p>
              <ul class="pd-list">
                <li>Chưa có kênh chat chung để thông báo một nơi.</li>
                <li>Đa số đang làm việc qua Zalo personal, không có webhook để can thiệp tự động.</li>
              </ul>
            </div>
          </section>
        </article>`;
    }

    function renderRfidDetail() {
        return `
        <article class="rfid-card" style="--pd-accent:#0d9488">
          <header class="rfid-head">
            <p class="pd-kicker">11 · Warehouse / RFID</p>
            <h2>RFID</h2>
            <p>Project dán từng tem barcode vào từng cuốn catalog. Hàng ngày quét RFID, xử lý logic để biết có bị miss hoặc mất CTL, sau đó báo cáo lên hệ thống Odoo với thông số chính xác.</p>
          </header>

          <section class="rfid-flow" aria-label="Luồng vận hành RFID">
            <div><strong>Dán barcode</strong><span>Mỗi cuốn catalog được gắn mã để định danh.</span></div>
            <div><strong>Quét RFID hằng ngày</strong><span>Đọc dữ liệu thực tế từ CTL đang có.</span></div>
            <div><strong>Xử lý logic</strong><span>Đối chiếu để phát hiện miss hoặc mất CTL.</span></div>
            <div><strong>Report Odoo</strong><span>Báo cáo thông số chính xác lên hệ thống.</span></div>
          </section>

          <section class="rfid-grid">
            <div class="rfid-box">
              <p class="pd-section-label">Timeline</p>
              <h3>Không xác định chính xác</h3>
              <p>Khi Dũng vào thử việc, Anh Hà đã chuẩn bị trang thiết bị và kế hoạch triển khai trước đó.</p>
            </div>
            <div class="rfid-box">
              <p class="pd-section-label">People</p>
              <h3>2 người</h3>
              <ul class="pd-list">
                <li>Anh Hà xây scripts automation lên n8n, triển khai kế hoạch và mua thiết bị liên quan.</li>
                <li>Dũng đưa script về máy chủ để tối ưu chi phí vận hành n8n, dán barcode và follow project trong quá trình vận hành.</li>
              </ul>
            </div>
          </section>

          <section class="rfid-pnl">
            <div>
              <p class="pd-section-label">Cost</p>
              <h3>Máy RFID, tem barcode và thời gian build script.</h3>
              <p>Chi phí nằm ở phần thiết bị đọc RFID, vật tư barcode và thời gian triển khai automation. Ngoài ra, trước đây script automation chạy trên n8n với chi phí hosting hàng tháng bên ngoài.</p>
            </div>
            <div>
              <p class="pd-section-label">P&amp;L — Loại bỏ chi phí n8n</p>
              <h3>Không còn chi phí vận hành n8n hàng tháng.</h3>
              <p>Script automation đã được chuyển từ n8n về chạy trực tiếp trên máy chủ nội bộ. Toàn bộ logic điều phối RFID, xử lý báo cáo và Telegram automation hiện tự vận hành trên server của công ty — không cần thuê host ngoài, không phụ thuộc vào platform third-party và không có phí duy trì hàng tháng.</p>
            </div>
          </section>

          <section class="pd-analysis rfid-analysis">
            <div class="pd-strength">
              <p class="pd-section-label">Điểm mạnh</p>
              <ul class="pd-list">
                <li>Tối ưu thời gian thao tác thủ công.</li>
                <li>Tỉ lệ CTL bị mất giảm đáng kể.</li>
                <li>Kiểm soát độ chính xác cao với CTL đang thực sự có.</li>
                <li>Tối ưu độ chính xác về số CTL Bonario đang sở hữu theo thời gian.</li>
              </ul>
            </div>
            <div class="pd-weakness">
              <p class="pd-section-label">Điểm yếu</p>
              <ul class="pd-list">
                <li>Mất khoảng 30 phút mỗi ngày để quét RFID, đưa lên Telegram xử lý logic và làm report thủ công.</li>
                <li>Vẫn còn thao tác thủ công khi báo cáo lên hệ thống Odoo.</li>
              </ul>
            </div>
          </section>
        </article>`;
    }

    function renderOdooProductCreationDetail() {
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

    function renderInternalOrderTrackingDetail() {
        return `
        <article class="pd-card pd-card-tracking-order" style="--pd-accent:#ea580c">
          <header class="pd-head">
            <p class="pd-kicker">09 · Order Tracking</p>
            <h2 class="pd-title">Tracking order internal</h2>
            <p class="pd-subtitle">Luồng theo dõi tiến độ đơn hàng dựa trên field Order State trong báo giá Odoo. Project tách thành 2 góc nhìn: khách hàng xem đơn đang được triển khai tới đâu, còn Sales kiểm tra sâu hơn về purchase và sản xuất khi đơn đang ở trạng thái In Progress.</p>
          </header>

          <div class="pd-stats">
            <div class="pd-stat"><strong>2</strong><span>website theo dõi: khách hàng và Sales nội bộ</span></div>
            <div class="pd-stat"><strong>Order State</strong><span>field chính để xác định tiến độ đơn trên báo giá</span></div>
            <div class="pd-stat"><strong>In Progress</strong><span>trạng thái cho phép Sales xem purchase và sản xuất</span></div>
          </div>

          <div class="pd-body">
            <section>
              <p class="pd-section-label">Luồng trạng thái đơn hàng</p>
              <div class="pd-timeline-grid">
                <div class="pd-timeline-item"><strong>Need process</strong><span>Đơn mới cần được tiếp nhận và bắt đầu xử lý.</span></div>
                <div class="pd-timeline-item"><strong>In Progress</strong><span>Đơn đang triển khai; Sales xem được mua hàng và sản xuất đã tới đâu.</span></div>
                <div class="pd-timeline-item"><strong>Done</strong><span>Đơn đã hoàn tất theo luồng xử lý nội bộ.</span></div>
                <div class="pd-timeline-item"><strong>Cancelled</strong><span>Đơn bị hủy, không tiếp tục theo dõi tiến độ triển khai.</span></div>
              </div>
            </section>

            <div class="tracking-split">
              <div class="tracking-view-card">
                <p class="pd-section-label">Website khách hàng</p>
                <h3>Khách biết đơn đang ở giai đoạn nào.</h3>
                <p>Trang dành cho khách hàng chỉ hiển thị tiến độ cần thiết: đơn đang chờ xử lý, đang triển khai, đã hoàn tất hay đã hủy. Mục tiêu là giảm việc khách phải hỏi lại Sales và giúp trải nghiệm sau báo giá rõ ràng hơn.</p>
                <ul class="pd-list">
                  <li>Hiển thị trạng thái đơn theo ngôn ngữ dễ hiểu.</li>
                  <li>Không lộ thông tin nội bộ như purchase, cost hoặc tiến độ chi tiết của xưởng.</li>
                  <li>Giúp khách có điểm tự kiểm tra thay vì nhắn hỏi từng lần.</li>
                </ul>
              </div>
              <div class="tracking-view-card tracking-view-card-sales">
                <p class="pd-section-label">Website Sales</p>
                <h3>Sales kiểm tra tiến độ theo Order State.</h3>
                <p>Trang dành cho Sales đọc field Order State trên đơn báo giá. Khi trạng thái là In Progress, Sales có thể biết đơn đó đã purchase bao nhiêu sản phẩm và sản xuất được bao nhiêu sản phẩm để phản hồi khách chính xác hơn.</p>
                <ul class="pd-list">
                  <li>Xem đơn đang nằm ở trạng thái nào trên báo giá.</li>
                  <li>Với In Progress: kiểm tra số lượng đã purchase.</li>
                  <li>Với In Progress: kiểm tra số lượng đã sản xuất.</li>
                </ul>
              </div>
            </div>

            <div class="pd-two-col">
              <div class="pd-box">
                <p class="pd-section-label">Vấn đề giải quyết</p>
                <h3>Sales và khách hàng không phải hỏi tiến độ thủ công nhiều lần.</h3>
                <p>Trước đây tiến độ thường nằm trong báo giá hoặc phải hỏi người phụ trách. Khi đưa Order State thành điểm theo dõi rõ ràng, mỗi nhóm nhìn đúng phần mình cần: khách xem trạng thái tổng quan, Sales xem chi tiết để tư vấn.</p>
              </div>
              <div class="pd-box">
                <p class="pd-section-label">People</p>
                <h3>Khách hàng, Sales, SC và production cùng hưởng lợi.</h3>
                <ul class="pd-list">
                  <li>Khách hàng tự xem được tiến độ tổng quan của đơn.</li>
                  <li>Sales có dữ liệu để phản hồi khách nhanh hơn.</li>
                  <li>SC/production giảm số lần bị hỏi lại về trạng thái đơn.</li>
                </ul>
              </div>
            </div>

            <div class="pd-wide-box pd-tracking-roi">
              <p class="pd-section-label">P&amp;L / ROI</p>
              <h3>ROI nằm ở việc giảm thời gian hỏi đáp và tăng độ minh bạch tiến độ.</h3>
              <p>Project giúp giảm vòng lặp hỏi tiến độ giữa khách hàng, Sales và các bộ phận vận hành. Khi Sales nhìn được đơn In Progress đã purchase/sản xuất tới đâu, việc phản hồi khách sẽ nhanh và chính xác hơn thay vì phải hỏi thủ công từng bộ phận.</p>
            </div>

            <div class="pd-analysis">
              <div class="pd-strength">
                <p class="pd-section-label">Điểm mạnh</p>
                <ul class="pd-list">
                  <li>Tách rõ thông tin cho khách hàng và thông tin nội bộ cho Sales.</li>
                  <li>Dựa trên Order State nên bám sát dữ liệu đang có trên báo giá Odoo.</li>
                  <li>Giúp Sales phản hồi khách chủ động hơn khi đơn đang In Progress.</li>
                </ul>
              </div>
              <div class="pd-weakness">
                <p class="pd-section-label">Điểm yếu</p>
                <ul class="pd-list">
                  <li>Độ chính xác phụ thuộc việc cập nhật Order State đúng và đều.</li>
                  <li>Cần thống nhất cách đặt tên trạng thái để khách hàng dễ hiểu hơn các label nội bộ.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="tracking-sites">
            <div class="tracking-site-card">
              <p class="pd-section-label">Website khách hàng</p>
              <h3>Tracking tiến độ đơn cho khách</h3>
              <p>Link dùng cho khách hàng kiểm tra đơn đang được triển khai ở giai đoạn nào.</p>
              <a class="pd-site-link" href="https://tracking.ordinaire.vn/" target="_blank" rel="noopener noreferrer">Mở tracking.ordinaire.vn</a>
            </div>
            <div class="tracking-site-card">
              <p class="pd-section-label">Website Sales</p>
              <h3>Tracking nội bộ cho Sales</h3>
              <p>Link dành cho Sales kiểm tra Order State, số lượng đã purchase và số lượng đã sản xuất.</p>
              <span>Chờ gắn URL website</span>
            </div>
          </div>
        </article>`;
    }

    function renderPanelContent(groupId) {
        const group = SYSTEM_GROUPS.find((g) => g.id === groupId);
        if (!group) return "";
        if (group.id === "rfid") {
            return `
      <header class="detail-hero">
        <h1 class="detail-title">${escapeHtml(group.label)}</h1>
      </header>
      <div class="detail-project-list">${renderRfidDetail()}</div>`;
        }
        if (group.id === "stock-escalation") {
            return `
      <header class="detail-hero">
        <h1 class="detail-title">${escapeHtml(group.label)}</h1>
      </header>
      <div class="detail-project-list">${renderStockEscalationDetail()}</div>`;
        }
        if (group.id === "local-server-infra") {
            return `
      <header class="detail-hero infra-route-hero">
        <h1 class="detail-title">${escapeHtml(group.label)}</h1>
      </header>
      ${renderLocalServerInfraDetail()}`;
        }
        if (group.id === "odoo-product-creation") {
            return `
      <header class="detail-hero">
        <h1 class="detail-title">${escapeHtml(group.label)}</h1>
      </header>
      <div class="detail-project-list">${renderOdooProductCreationDetail()}</div>`;
        }
        if (group.id === "internal-order-tracking") {
            return `
      <header class="detail-hero">
        <h1 class="detail-title">${escapeHtml(group.label)}</h1>
      </header>
      <div class="detail-project-list">${renderInternalOrderTrackingDetail()}</div>`;
        }
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
        // Start counters when scale scene enters viewport
        const scaleScene = document.getElementById("scene-2");
        if (scaleScene) {
            new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) startCounters();
                },
                { threshold: 0.3 },
            ).observe(scaleScene);
        }
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
        if (route.scrollToScene === undefined) {
            window.scrollTo({ top: 0, behavior: "auto" });
        }
        app.innerHTML = `
      ${buildDotNav()}
      <main id="story-scroll" aria-label="Báo cáo phát triển hệ thống">
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
            } else {
                window.scrollTo({ top: 0, behavior: "auto" });
            }
        });
    }

    let isInitialLoad = true;

    function renderApp() {
        const app = document.getElementById("app");
        if (!app) return;
        const route = parseRoute();
        // On fresh page load, if #/breakdown is in URL, clear it and start at hook
        if (isInitialLoad) {
            isInitialLoad = false;
            if (route.name === "home" && route.scrollToScene === 1) {
                history.replaceState(null, "", window.location.pathname);
                renderHome(app, { name: "home" });
                return;
            }
        }
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
