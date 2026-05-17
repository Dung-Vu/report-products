window.reportProjects = [
    {
        id: "bonario-product-hub",
        name: "Bonario Product Hub",
        category: "Operations Platform",
        status: "healthy",
        quarter: "Ops Core",
        impact: "High",
        effort: "High",
        owner: "Product Operations",
        duration: "Docker / 5004",
        stack: ["React", "Flask", "Odoo", "Redis", "Prometheus"],
        summary:
            "Hub nội bộ để quản lý dữ liệu sản phẩm trên Odoo: kiểm tra sản phẩm, BOM, bảng giá, mô tả, Cambodia, tồn kho, CRM và báo cáo định kỳ.",
        outcomes: [
            "Giảm thao tác thủ công trên Odoo cho BOM, giá và mô tả sản phẩm",
            "Chuẩn hóa kiểm tra dữ liệu sản phẩm, audit log và workflow định kỳ",
            "Có Docker Monitor, metrics, alert và test suite phục vụ vận hành dài hạn",
        ],
        metrics: { delivery: 96, adoption: 88, quality: 94 },
    },
    {
        id: "bonario-stock-management",
        name: "Stock Onhand Management",
        category: "Warehouse System",
        status: "healthy",
        quarter: "Inventory",
        impact: "High",
        effort: "High",
        owner: "Warehouse Operations",
        duration: "Docker / 8080",
        stack: ["Vite", "Express", "PostgreSQL", "WebSocket", "React Native"],
        summary:
            "Hệ thống tra cứu tồn kho và kiểm kho hàng tháng. Dữ liệu phiên kiểm kho được lưu vào PostgreSQL và đồng bộ tồn kho qua backend proxy.",
        outcomes: [
            "Chuẩn hóa quy trình kiểm kho theo tháng và theo kho",
            "Giảm rủi ro thất lạc file Excel nhờ dữ liệu tập trung",
            "Có realtime, audit log, role admin/counter và mobile app cho kiểm kho",
        ],
        metrics: { delivery: 92, adoption: 84, quality: 89 },
    },
    {
        id: "ord-price-lookup",
        name: "ORD Price Lookup System",
        category: "Pricing Platform",
        status: "running",
        quarter: "Sales / SC",
        impact: "High",
        effort: "High",
        owner: "Sales Operations",
        duration: "Docker / 5173",
        stack: ["React 19", "Flask", "PostgreSQL", "SQLAlchemy", "Alembic"],
        summary:
            "Hệ thống tra cứu và quản trị giá sản phẩm nội thất ORD cho sales, admin và supply chain, giúp dữ liệu giá có một nguồn tham chiếu thống nhất.",
        outcomes: [
            "Sales tra cứu giá nhanh hơn và có dữ liệu nhất quán",
            "Admin quản lý cost, fabric, shipping, packaging và COGS",
            "Có import/export Excel, audit history và quản trị dữ liệu giá",
        ],
        metrics: { delivery: 88, adoption: 82, quality: 87 },
    },
    {
        id: "in-label-pdf",
        name: "In Label PDF",
        category: "Warehouse Utility",
        status: "running",
        quarter: "Warehouse",
        impact: "Medium",
        effort: "Medium",
        owner: "Warehouse Operations",
        duration: "Docker / 5003",
        stack: ["React", "Vite", "Express", "Odoo JSON-RPC", "PDF"],
        summary:
            "Công cụ in label PDF cho phiếu nhập kho, đồng thời hỗ trợ tra cứu phiếu, in thông tin người nhận, QC batch và báo cáo ABC doanh số.",
        outcomes: [
            "Tăng tốc thao tác in label và xử lý phiếu nhập kho",
            "Kết nối dữ liệu Odoo trực tiếp qua backend Express",
            "Bổ sung luồng QC batch và báo cáo bán hàng phục vụ vận hành",
        ],
        metrics: { delivery: 90, adoption: 78, quality: 84 },
    },
    {
        id: "auto-workflow",
        name: "Auto Workflow",
        category: "Automation Hub",
        status: "running",
        quarter: "Automation",
        impact: "High",
        effort: "Medium",
        owner: "Automation",
        duration: "Docker / 5050",
        stack: ["Flask", "Shopify", "Odoo", "Zalo ZNS", "Telegram"],
        summary:
            "Hub automation nội bộ điều phối các luồng Shopify, Odoo, Zalo, Telegram và scheduler, giúp logic vận hành nằm trong code dễ kiểm soát hơn.",
        outcomes: [
            "Tập trung hóa các tác vụ tự động hóa nội bộ",
            "Có delivery tracking, RFID reconciliation và auto-conducted scheduler",
            "Dễ kiểm soát logic nghiệp vụ hơn các automation rời rạc",
        ],
        metrics: { delivery: 84, adoption: 74, quality: 82 },
    },
    {
        id: "op-round-robin",
        name: "OP Round Robin",
        category: "Odoo Automation",
        status: "running",
        quarter: "Back Office",
        impact: "Medium",
        effort: "Medium",
        owner: "Operations",
        duration: "Worker",
        stack: ["Odoo", "Automation", "PDF", "Scheduler"],
        summary:
            "Worker tự động hóa cho Odoo, tập trung vào phân bổ OP cho quotation và xử lý pipeline bill, VAT, PDF hồ sơ chứng từ.",
        outcomes: [
            "Phân bổ OP tự động cho quotation",
            "Giảm thao tác thủ công trong pipeline chứng từ",
            "Kết nối với Bills Server để lưu trữ và tra cứu file bill",
        ],
        metrics: { delivery: 82, adoption: 72, quality: 79 },
    },
    {
        id: "bills-server",
        name: "Bills Archive / Bills Server",
        category: "Document Archive",
        status: "utility",
        quarter: "Documents",
        impact: "Medium",
        effort: "Low",
        owner: "Back Office",
        duration: "Docker / 8089",
        stack: ["Nginx", "Static File Server", "Windows Mount"],
        summary:
            "Lớp truy cập bill/chứng từ qua trình duyệt, phục vụ tra cứu và chia sẻ nội bộ từ thư mục lưu trữ C:\\Bills.",
        outcomes: [
            "Có lớp web serving nhẹ cho file chứng từ",
            "Hỗ trợ quy trình bill, VAT, phiếu giao nhận và báo giá",
            "Dễ host nội bộ, ít phụ thuộc và đơn giản khi vận hành",
        ],
        metrics: { delivery: 86, adoption: 70, quality: 78 },
    },
    {
        id: "calculate-curtain-size",
        name: "Curtain Size Calculator",
        category: "Production Tool",
        status: "running",
        quarter: "Manufacturing",
        impact: "Medium",
        effort: "Medium",
        owner: "Production",
        duration: "Docker / 5000",
        stack: ["Flask", "FastAPI", "Excel", "PDF"],
        summary:
            "Công cụ tính kích thước rèm và lượng vải cần đặt, hỗ trợ tính lẻ, xử lý Excel hàng loạt và chuyển PDF sản xuất sang layout Excel BON.",
        outcomes: [
            "Giảm lỗi tính thủ công cho kích thước rèm",
            "Tăng tốc xử lý file Excel sản phẩm rèm",
            "Chuẩn hóa output cho sản xuất và đặt vải",
        ],
        metrics: { delivery: 85, adoption: 76, quality: 81 },
    },
    {
        id: "visual-brief-builder",
        name: "Visual Content Production",
        category: "Marketing Tool",
        status: "running",
        quarter: "Creative",
        impact: "Medium",
        effort: "Medium",
        owner: "Marketing / Brand",
        duration: "Docker / 9001",
        stack: ["HTML", "CSS", "JavaScript", "Nginx", "Kie.ai"],
        summary:
            "Công cụ nội bộ giúp marketing tạo brief hình ảnh lifestyle theo brand rules, gửi yêu cầu tạo ảnh AI và theo dõi kết quả.",
        outcomes: [
            "Biến prompt thủ công thành quy trình thao tác được cho người không chuyên kỹ thuật",
            "Chuẩn hóa output theo brand visual rules",
            "Tăng tốc vòng lặp brief, tạo ảnh, rà ảnh và chỉnh ảnh",
        ],
        metrics: { delivery: 87, adoption: 79, quality: 83 },
    },
    {
        id: "tunnel-master",
        name: "Tunnel Master",
        category: "Infrastructure",
        status: "utility",
        quarter: "Network",
        impact: "High",
        effort: "Medium",
        owner: "Platform Operations",
        duration: "Docker",
        stack: ["Cloudflare Tunnel", "Docker", "Routing", "Internal Hosting"],
        summary:
            "Module quản lý Cloudflare Tunnel cho các app/service nội bộ, đưa service Docker local ra domain có kiểm soát mà không cần mở port router.",
        outcomes: [
            "Tập trung hóa quản trị tunnel cho nhiều service nội bộ",
            "Giảm rủi ro mở port trực tiếp trên router/firewall",
            "Hỗ trợ truy cập thử và chia sẻ app local qua domain có kiểm soát",
        ],
        metrics: { delivery: 88, adoption: 75, quality: 86 },
    },
    {
        id: "action-local-bridge",
        name: "Action Local Bridge",
        category: "Infrastructure",
        status: "utility",
        quarter: "Network",
        impact: "Low",
        effort: "Low",
        owner: "Platform Operations",
        duration: "Docker / 5504",
        stack: ["alpine/socat", "TCP Bridge", "Docker Network"],
        summary:
            "Container hạ tầng dùng socat để chuyển tiếp TCP traffic từ port bridge sang service action-product trong Docker network.",
        outcomes: [
            "Tách network bridge khỏi code nghiệp vụ chính",
            "Expose action-product qua shared tunnel path riêng",
            "Nhẹ, dễ triển khai và không cần database",
        ],
        metrics: { delivery: 90, adoption: 62, quality: 76 },
    },
];

const projectNarratives = {
    "bonario-product-hub": {
        what: "Bonario Product Hub là trung tâm vận hành sản phẩm nội bộ. Repo này gom các thao tác kiểm tra, cập nhật và theo dõi dữ liệu sản phẩm trên Odoo vào một giao diện chung.",
        operation:
            "Người dùng đăng nhập vào hub, chọn module nghiệp vụ như Checker, BOM, Pricelist, Description, Cambodia, Inventory, CRM hoặc Tracking. Frontend gọi backend Flask; backend xử lý qua service layer và đồng bộ dữ liệu với Odoo JSON-RPC.",
        features: [
            "Kiểm tra vendor, BOM, cost, pricelist, description và tag bất thường",
            "Tự động hóa BOM theo variant, size mapping, width formula và fabric component",
            "Quản lý sản phẩm Cambodia, description đa ngôn ngữ, inventory, CRM và báo cáo định kỳ",
            "Theo dõi Docker runtime, metrics, logs, alert và workflow scheduler",
        ],
        practicalUse:
            "Dùng như điểm thao tác chính cho vận hành sản phẩm, Supply Chain, sales/SC report owner và admin hệ thống.",
        businessValue:
            "Giảm thao tác thủ công trên Odoo, chuẩn hóa dữ liệu sản phẩm, gom nhiều luồng nghiệp vụ vào một nơi và giúp quản lý nhìn được tình trạng vận hành.",
        performance:
            "Tăng tốc các việc lặp lại như BOM, giá, mô tả và kiểm tra dữ liệu; đồng thời giảm rủi ro sai lệch nhờ audit log, workflow định kỳ và monitoring.",
    },
    "bonario-stock-management": {
        what: "Stock Onhand Management là hệ thống tra cứu tồn kho và kiểm kho hàng tháng. Repo này thay thế cách quản lý rời rạc bằng file hoặc thao tác thủ công.",
        operation:
            "Frontend cho người dùng chọn kho, tìm sản phẩm, xem tồn hệ thống từ Odoo qua backend proxy, tạo phiên kiểm kho theo tháng/kho và lưu số đếm thực tế vào PostgreSQL.",
        features: [
            "Tra cứu tồn kho theo kho, category và từ khóa",
            "Tạo phiên kiểm kho, nhập số lượng thực tế và tính chênh lệch",
            "Phân quyền admin/counter, audit log và lock/unlock/complete session",
            "Cập nhật tồn kho realtime, export CSV/Excel/PDF và có mobile app hỗ trợ kiểm kho",
        ],
        practicalUse:
            "Phục vụ nhân viên kiểm kho, admin quản lý session và team vận hành kho khi cần kiểm tra on-hand stock hoặc xử lý stocktake hàng tháng.",
        businessValue:
            "Chuẩn hóa quy trình kiểm kho, giảm rủi ro thất lạc dữ liệu, tạo nguồn dữ liệu tập trung và hỗ trợ nhiều người cùng làm việc.",
        performance:
            "Rút ngắn thời gian tra cứu, giảm nhập liệu lặp lại, giảm sai lệch giữa số đếm thực tế và số hệ thống nhờ lưu lịch sử phiên kiểm kho.",
    },
    "ord-price-lookup": {
        what: "ORD Price Lookup System là hệ thống tra cứu và quản trị giá sản phẩm nội thất ORD cho sales, admin và Supply Chain.",
        operation:
            "Sales tra cứu giá qua frontend; admin/SC cập nhật cost, fabric, shipping và packaging. Backend Flask lưu dữ liệu vào PostgreSQL, quản lý import/export và lịch sử thay đổi.",
        features: [
            "Tra cứu giá nhanh cho sales",
            "Quản lý cost, fabric, shipping, packaging và giá bán",
            "Import/export dữ liệu từ Excel và PostgreSQL",
            "Audit lịch sử thay đổi, phân quyền và quản trị cấu hình giá",
        ],
        practicalUse:
            "Dùng trong luồng báo giá và kiểm tra giá nội bộ, giúp sales có nguồn tra cứu thống nhất thay vì hỏi thủ công hoặc xem nhiều file.",
        businessValue:
            "Giảm sai lệch giá bán, tăng tốc phản hồi cho sales và giúp công ty kiểm soát COGS/giá bán có hệ thống.",
        performance:
            "Tăng hiệu suất tra cứu và cập nhật giá; giảm thời gian tổng hợp Excel, giảm lỗi do dữ liệu giá phân tán.",
    },
    "in-label-pdf": {
        what: "In Label PDF là công cụ nội bộ hỗ trợ in label PDF cho phiếu nhập kho. Repo này cũng mở rộng sang tra cứu phiếu, QC batch và báo cáo ABC doanh số.",
        operation:
            "Frontend React cho người dùng tra cứu phiếu nhập, backend Express gọi Odoo JSON-RPC để lấy dữ liệu và tạo các file PDF/label theo nghiệp vụ.",
        features: [
            "Tra cứu phiếu nhập kho từ Odoo",
            "In label PDF và phiếu thông tin người nhận",
            "Quản lý batch QC và luồng xử lý phiếu",
            "Bổ sung báo cáo ABC doanh số để phục vụ vận hành",
        ],
        practicalUse:
            "Dùng tại khâu kho/QC khi cần in label nhanh, lấy thông tin phiếu nhập và xử lý tài liệu phục vụ kiểm hàng.",
        businessValue:
            "Giảm thời gian thao tác trên Odoo và file thủ công, giúp kho xử lý phiếu nhập nhất quán hơn.",
        performance:
            "Tăng tốc in label, giảm lỗi copy dữ liệu, hỗ trợ xử lý batch tốt hơn trong cao điểm nhập hàng.",
    },
    "auto-workflow": {
        what: "Auto Workflow là hub tự động hóa nội bộ. Repo này thay thế một phần các workflow rời rạc kiểu webhook/n8n bằng code có kiểm soát.",
        operation:
            "Ứng dụng Flask nhận trigger hoặc chạy scheduler, sau đó điều phối logic giữa Shopify, Odoo, Zalo ZNS, Telegram và các tác vụ nội bộ.",
        features: [
            "Webhook và scheduler cho các tác vụ định kỳ",
            "Tích hợp Shopify, Odoo, Zalo ZNS và Telegram",
            "Theo dõi delivery, RFID reconciliation và scheduler tự động",
            "Tập trung hóa logic automation để dễ bảo trì",
        ],
        practicalUse:
            "Dùng cho các luồng automation vận hành cần chạy đều, gửi thông báo hoặc đồng bộ dữ liệu giữa nhiều hệ thống.",
        businessValue:
            "Giảm phụ thuộc vào thao tác thủ công, tránh workflow nằm rải rác và giúp logic nghiệp vụ được quản lý bằng code rõ ràng.",
        performance:
            "Tăng độ ổn định cho các tác vụ lặp lại, giảm thời gian theo dõi thủ công và giảm lỗi do quên chạy việc định kỳ.",
    },
    "op-round-robin": {
        what: "OP Round Robin là worker tự động hóa cho Odoo, tập trung vào phân bổ OP cho quotation và xử lý pipeline bill/VAT/chứng từ.",
        operation:
            "Worker kết nối Odoo, đọc quotation hoặc dữ liệu chứng từ, áp dụng logic phân bổ/đổi tên/xử lý PDF rồi ghi kết quả phục vụ back office.",
        features: [
            "Gán OP round-robin cho quotation",
            "Xử lý bill, VAT và xuất PDF hồ sơ chứng từ",
            "Tự động hóa các bước đặt tên và chuẩn hóa file",
            "Kết nối với Bills Server để lưu trữ và tra cứu",
        ],
        practicalUse:
            "Dùng trong back office để giảm thao tác lặp lại khi phân bổ OP và chuẩn hóa bộ hồ sơ chứng từ.",
        businessValue:
            "Giúp quy trình xử lý quotation và chứng từ đều hơn, giảm phụ thuộc vào phân bổ thủ công.",
        performance:
            "Tiết kiệm thời gian cho các tác vụ lặp lại, giảm lỗi khi xử lý nhiều bill/chứng từ cùng lúc.",
    },
    "bills-server": {
        what: "Bills Server là lớp truy cập bill/chứng từ qua web, phục vụ tra cứu và chia sẻ file nội bộ từ thư mục lưu trữ.",
        operation:
            "Nginx serve thư mục chứng từ qua HTTP nội bộ, giúp các file bill/VAT/phiếu giao nhận mở nhanh bằng trình duyệt.",
        features: [
            "Phục vụ file chứng từ qua web nội bộ",
            "Hỗ trợ tra cứu bill, VAT, phiếu giao nhận và báo giá",
            "Triển khai nhẹ bằng Nginx Alpine",
            "Kết hợp với các worker xử lý chứng từ khác",
        ],
        practicalUse:
            "Dùng như lớp truy cập nhanh cho file chứng từ thay vì phải mở trực tiếp folder trên máy/server.",
        businessValue:
            "Tăng tính sẵn sàng của dữ liệu chứng từ, giúp back office chia sẻ và kiểm tra file nhanh hơn.",
        performance:
            "Giảm thời gian tìm file và giảm phụ thuộc vào đường dẫn local, đặc biệt khi nhiều người cùng cần tra cứu.",
    },
    "calculate-curtain-size": {
        what: "Curtain Size Calculator là công cụ tính kích thước rèm và lượng vải cần order cho sản xuất.",
        operation:
            "Người dùng nhập thông tin rèm hoặc upload file Excel/PDF. Hệ thống Flask/FastAPI xử lý công thức, chuyển đổi dữ liệu và xuất layout Excel BON cho sản xuất.",
        features: [
            "Tính kích thước rèm lẻ từng bộ",
            "Xử lý Excel hàng loạt cho sản phẩm rèm",
            "Chuyển PDF kích thước sản xuất sang layout Excel BON",
            "Chuẩn hóa output phục vụ đặt vải và sản xuất",
        ],
        practicalUse:
            "Dùng khi cần tính nhanh kích thước rèm, chuẩn bị file sản xuất hoặc xử lý danh sách đơn hàng rèm số lượng lớn.",
        businessValue:
            "Giảm lỗi tính thủ công, tăng tốc chuẩn bị đơn sản xuất và hỗ trợ team sản xuất có format dữ liệu thống nhất.",
        performance:
            "Rút ngắn thời gian xử lý file Excel/PDF và giảm sai số khi tính lượng vải cần order.",
    },
    "visual-brief-builder": {
        what: "Visual Content Production là công cụ tạo brief hình ảnh lifestyle cho marketing/brand. Repo này giúp người không chuyên prompt vẫn tạo được yêu cầu tạo ảnh AI đúng brand.",
        operation:
            "Người dùng chọn category, use case, material, mood, ánh sáng, tỷ lệ ảnh và ảnh tham chiếu. App dựng prompt theo rulebook, gửi sang API sinh ảnh và theo dõi kết quả.",
        features: [
            "Brief builder cho người không chuyên kỹ thuật",
            "Hỗ trợ nhiều model tạo ảnh và tỷ lệ ảnh theo use case",
            "Ảnh tham chiếu, màn hình theo dõi kết quả và preset chỉnh ảnh",
            "Bước chỉnh wallpaper/curtain trên ảnh phòng đã chọn",
        ],
        practicalUse:
            "Dùng bởi marketing/brand để tạo brief, sinh option, rà ảnh và chỉnh ảnh lifestyle sản phẩm.",
        businessValue:
            "Chuẩn hóa hình ảnh theo brand rules, giảm lệch tone hình ảnh và tăng tốc vòng lặp sản xuất nội dung.",
        performance:
            "Giảm thời gian viết prompt thủ công, tăng tốc brief -> tạo ảnh -> chỉnh ảnh và giúp scale nội dung visual đều hơn.",
    },
    "tunnel-master": {
        what: "Tunnel Master là module quản lý Cloudflare Tunnel tập trung cho nhiều app nội bộ Bonario.",
        operation:
            "Module quản lý cấu hình tunnel/routing để đưa các service Docker local ra domain có kiểm soát, không cần mở port router trực tiếp.",
        features: [
            "Quản lý tunnel cho nhiều app nội bộ",
            "Đưa service local ra domain có kiểm soát",
            "Giảm nhu cầu mở port router/firewall trực tiếp",
            "Hỗ trợ truy cập thử và kiểm tra app từ bên ngoài mạng local",
        ],
        practicalUse:
            "Dùng khi cần đưa các app Docker local lên domain để người liên quan truy cập tạm thời từ bên ngoài mạng local.",
        businessValue:
            "Tăng tốc chia sẻ app nội bộ, giảm rủi ro cấu hình mạng thủ công và tạo nền tảng publish service nhất quán.",
        performance:
            "Rút ngắn thời gian mở truy cập app, giảm lỗi cấu hình từng app riêng lẻ và giúp kiểm soát routing tập trung.",
    },
    "action-local-bridge": {
        what: "Action Local Bridge là container hạ tầng nhỏ dùng socat để chuyển tiếp TCP traffic từ port bridge sang service action-product.",
        operation:
            "Container listen port 5504 và forward TCP traffic vào action-product:5004 trong Docker network, tách phần routing khỏi app chính.",
        features: [
            "TCP forwarding nhẹ bằng alpine/socat",
            "Tách bridge/network routing khỏi backend nghiệp vụ",
            "Chạy trong Docker network dùng chung",
            "Không cần database hoặc source app riêng",
        ],
        practicalUse:
            "Dùng để mở truy cập Product Hub qua một đường bridge/tunnel riêng mà không phải chỉnh code backend.",
        businessValue:
            "Giúp kiểm thử hoặc mở truy cập service linh hoạt hơn, giảm ảnh hưởng lên app chính khi thay đổi routing.",
        performance:
            "Thiết lập nhanh, ít tài nguyên, phù hợp vai trò utility infrastructure cho môi trường nội bộ.",
    },
};

window.reportProjects = window.reportProjects.map((project) => ({
    ...project,
    narrative: projectNarratives[project.id],
}));
