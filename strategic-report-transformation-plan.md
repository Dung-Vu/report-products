# Kế hoạch cải tổ — Bonario Impact Report (v2)

> Viết lại hoàn toàn. Không giữ lại cấu trúc cũ.

---

## 1. Định nghĩa thành công

**Người xem:** Giám đốc công ty — không cần biết kỹ thuật, cần biết giá trị.

**Mục tiêu của report:** Trả lời 3 câu hỏi mà giám đốc đang thật sự nghĩ:
1. Người này đang làm gì ngoài việc code theo yêu cầu?
2. Những thứ đã làm đang giúp ích gì thật sự cho công ty?
3. Có đủ lý do để giao thêm trách nhiệm không?

**Cảm giác khi xem xong:** "Ổn thật, không phải bốc phét." — Không phải ấn tượng vì fancy, mà ấn tượng vì rõ ràng, có cơ sở và trình bày khéo.

**Ngôn ngữ:** Tiếng Việt. Tiếng Anh chỉ cho thuật ngữ kỹ thuật/kinh doanh.

---

## 2. Nguyên tắc số liệu

Mỗi con số phải được gán nhãn rõ. Không viết số trần không có nguồn.

| Nhãn | Ý nghĩa |
|---|---|
| **Verified** | Có nguồn từ Odoo, database, Docker log, file system, audit log |
| **Estimated** | Có công thức + assumption rõ ràng, đã được xác nhận |
| **Narrative** | Nhận định định tính, không gán số tiền/số người |

**Quan trọng về giá trị quy đổi nhân sự:** Chưa có benchmark lương thật của công ty và chưa đo được thời gian trước/sau cho từng tác vụ. Vì vậy **không claim "tương đương X người"** trong lần này. Chỉ viết "hỗ trợ/thay thế việc của các vai trò" với danh sách cụ thể.

---

## 3. Số liệu đã xác minh (Verified)

Kỳ tính từ `22/09/2025`. Nguồn: app logs, Cloudflare Analytics, local DB, Docker inspect và các aggregate Odoo chỉ khi số đó gắn trực tiếp với repo đang kể.

### Usage signals trực tiếp từ repo/tool

| Chỉ số | Số | Nguồn |
|---|---|---|
| Tra cứu giá & tồn kho | 1,837 | PostgreSQL search_audit + Cloudflare stock.bonstu.site |
| Tính vải / SC production | 250 | Cloudflare curtain subdomain + app logs |
| Runtime ổn định | 8 service | Docker runtime / health status |

### Odoo aggregate còn giữ vì liên quan trực tiếp repo đang kể

| Chỉ số | Số | Nguồn |
|---|---|---|
| Product templates tạo mới | 6,677 | Odoo product.template search_count |
| BOM tạo mới | 3,539 | Odoo mrp.bom search_count |
| Posted vendor bills | 2,709 | Odoo account.move read_group |

### Hệ thống đang chạy (Docker runtime)

11 service đang up tại thời điểm xác minh:
`action-product` · `bonario-frontend/backend/postgres` · `testupdateproduct` (3 container) · `in-label-pdf` · `calculate-curtain-size` (2 container) · `ordinaire-brief-builder` · `op-round-robin` · `bills-server` · `bonario-master-tunnel` · `action-local-bridge` · `auto-workflow`

### Adoption trace (local database — verified)

| Hệ thống | Bằng chứng sử dụng | Ghi chú |
|---|---|---|
| ORD Price Lookup | **478 search audit** — queries có timestamp | Đây là số lần người khác (sales/SC) thật sự tra cứu — meaningful nhất |
| Product Hub | 104 audit actions, 50/50 workflow history success, daily_scan ~800 issues | Automation đang chạy thật, không phải test |
| Stock Management | **43 audit log** — operations thật | Bỏ "6 users" — tài khoản tạo không chứng minh gì. Audit log = hành động thật |
| In Label PDF | 1 QC batch, 10 QC items | Nhỏ — chỉ dùng làm narrative, không claim adoption lớn |
| Bills archive | **983 PDF + 13 JPG** trong `C:\Bills` | Volume chứng từ thật đang được phục vụ |

**Lưu ý về Stock Management:** Cần kiểm tra thêm audit_log có phân biệt được thao tác nào là production use vs. setup/test không (xem timestamp, user_id, action type). Nếu không phân biệt được thì chỉ dùng narrative.

---

## 4. UX Architecture — Quan trọng nhất

### Vấn đề của bản cũ

Bản cũ là **sequential slide deck**: 9 route hiện hết trên nav → người xem thấy toàn bộ cấu trúc từ đầu → không có gì để khám phá. Opening scene ném 3 option card ngay dưới hook → phá cảm giác cinematic.

### Flow mới: 4 scene, progressive reveal

```
Scene 1 — HOOK (full viewport)
  • Chỉ 1 headline + 1 sub-line + scroll indicator
  • Nav KHÔNG hiện ở scene này
  • Background gradient tĩnh hoặc subtle CSS animation (không JS phức tạp)
  • Scroll xuống → chuyển Scene 2

Scene 2 — SCALE (animated counters)
  • Nav fade-in từ top khi vào scene này
  • 4 số lớn, đếm từ 0 lên khi vào viewport (IntersectionObserver)
  • 1 đoạn context ngắn: đây là quy mô, đây là lý do cần hệ thống
  • CTA: "Xem những hệ thống đã xây" → Scene 3

Scene 3 — SYSTEM MAP (interactive)
  • 7 node trên grid, mỗi node = 1 nhóm công việc
  • Hover node: mô tả ngắn xuất hiện
  • Click node: slide-in panel từ phải, hiện project + bằng chứng
  • Panel đóng được, user tự khám phá thứ tự họ muốn
  • CTA: "Tổng kết" → Scene 4

Scene 4 — CLOSE / ĐỀ NGHỊ
  • 2–3 điểm kết luận ngắn gọn
  • Danh sách vai trò hỗ trợ (narrative, không có số người)
  • 1 câu kết đề nghị vai trò rộng hơn
```

### Mechanics cần implement (vanilla JS + CSS, không framework)

| Mechanic | Cách làm cụ thể |
|---|---|
| Nav ẩn Scene 1 | `body[data-scene="1"] .topbar { opacity: 0; pointer-events: none }` — toggle class khi scroll qua threshold |
| Animated counter | `IntersectionObserver` → khi `.stat-number` vào viewport, chạy `requestAnimationFrame` đếm từ 0 → target trong ~1.2s |
| Slide-in panel | Default `transform: translateX(100%)` → toggle `.is-open` → `transform: translateX(0)`, `transition: 380ms ease` |
| Scene transition | `opacity: 0 + translateY(20px)` → `opacity: 1 + translateY(0)`, duration 350ms |
| Node hover | CSS hover: `max-height` hoặc opacity transition, không JS |
| Scroll nav | Dot indicator (4 chấm) thay vì text route — nhỏ gọn, không tiết lộ cấu trúc |

### Điều KHÔNG làm

- Không giữ 9-route nav text cũ
- Không auto-scroll hay parallax JS phức tạp
- Không particle/3D effect
- Không mobile-breaking layout

---

## 4.5. Story Arc cá nhân — Đây là core narrative

Đây là phần bản cũ thiếu hoàn toàn. Không có hành trình cá nhân thì các hệ thống chỉ là danh sách kỹ thuật.

### Hành trình thật

```
Tốt nghiệp → chỉ biết FE
     ↓
2 năm bỏ IT học tiếng Hàn (dự định du học)
     ↓
Kế hoạch thay đổi, quay lại đi làm
     ↓
22/09/2025: Bắt đầu thử việc tại Bonario
— hầu như mất hết nền tảng kỹ thuật
— chưa biết Odoo, Docker, backend, database production
     ↓
8 tháng tự học trong khi làm
Backend (Flask/Python) · PostgreSQL · Docker · Odoo ERP
Automation · Webhook · Scheduler · AI integration
Infrastructure (Nginx, tunnel, reverse proxy)
     ↓
Hiện tại: 11 hệ thống production, đang chạy thật
```

### Tại sao điều này quan trọng cho report

Câu chuyện không phải là "em biết nhiều kỹ thuật". Câu chuyện là:
**Khả năng học → Khả năng tự thích nghi → Khả năng biến kiến thức thành sản phẩm chạy được.**

Đây là thứ không thể thuê dễ dàng và không phải ai cũng có.

### Cách đưa vào report mà không "tự vỗ ngực"

Không kể trực tiếp. Để người xem tự suy ra từ timeline:
- Scene 1: Hook bắt đầu bằng sự tương phản (xem Mục 5.1)
- Scene 2 (Scale): Show quy mô Odoo trước → người xem hiểu context
- Scene 3 (System Map): Show 11 hệ thống đang chạy → người xem tự nhẩm "ai làm cái này?"
- Scene 4 (Close): Timeline nhỏ từ 22/09/2025 + câu kết im lặng

---

### Scene 1 — Hook

**Nguyên tắc:** Ít chữ nhất có thể. Không giải thích. Không option card.

**Hook đã chốt (Option A):**
```
"Hai năm không chạm một dòng code.
Tám tháng sau — 11 hệ thống đang chạy."
```

Sub-line (nhỏ hơn, fade in sau):
```
"Từ 22/09/2025 — Bonario."
```

Không cần gì thêm. Scroll indicator xuống Scene 2.

### Scene 2 — Scale (4 số Verified)

| Hiển thị | Nguồn |
|---|---|
| 1,837 lượt tra cứu giá & onhand | PostgreSQL + Cloudflare |
| 250 lượt truy cập repo tính vải | Cloudflare + app logs |
| 8 service up khoảng 7 ngày | Docker runtime / health status |
| 11 hệ thống đang chạy | Docker inspect |

**Context text (2–3 câu):** Đây là usage signal trực tiếp từ các repo/tool đang chạy, không phải số doanh thu hoặc quy mô chung của công ty. Mỗi số đại diện cho một lane khác nhau: tra cứu vận hành, giá trị cho SC và độ ổn định runtime.

### Scene 3 — 7 Node System Map

| # | Nhóm | Project |
|---|---|---|
| 1 | Dữ liệu sản phẩm | Product Hub |
| 2 | Sales / Giá | ORD Price Lookup |
| 3 | Kho / Stock | Stock Management + In Label PDF |
| 4 | Chứng từ | Bills Server + OP Round Robin |
| 5 | Tự động hóa | Auto Workflow |
| 6 | Hạ tầng | Tunnel Master + Action Local Bridge |
| 7 | Sản xuất / Creative | Curtain Size + Visual Brief Builder |

Khi click node → slide-in panel hiện:
- **Vấn đề** (2 câu)
- **Đã xây** (2 câu)
- **Bằng chứng** (chỉ Verified, không estimate)
- **Vai trò hỗ trợ** (Narrative — danh sách việc, không số người)

### Scene 4 — Close

**Nguyên tắc viết scene này:** Không xin vai trò. Không đề cập lương thưởng. Không đặt câu hỏi trực tiếp. Mục tiêu là để giám đốc tự đặt câu hỏi: *"Nếu người này không ở đây, ai đang làm những việc này?"*

3 điểm kết luận — viết theo kiểu statement, không phải đề nghị:
1. Từ FE + 2 năm không code → tự học lại từ đầu → 11 hệ thống đang chạy production
2. Biết tách số thật khỏi ước lượng — không vẽ đẹp, chỉ nói được phần đã làm được
3. Kết hợp AI không phải để claim nhiều hơn, mà để làm được nhiều hơn với ít người hơn

**Câu kết — không kết bằng đề nghị, kết bằng câu hỏi ngược:**
```
"Những hệ thống này không tự nhiên có. Và hiện tại, chỉ có một người biết cách vận hành,
mở rộng và sửa chúng khi cần. Sếp đang nghĩ gì?"
```
*Hoặc không cần câu kết — kết bằng silence: chỉ hiện logo + ngày bắt đầu 22/09/2025.*

---

## 6. Phân loại project

**Đưa vào report (11 project):**
Product Hub · Stock Management · ORD Price Lookup · In Label PDF · Auto Workflow · OP Round Robin · Bills Server · Curtain Size · Visual Brief Builder · Tunnel Master · Action Local Bridge

**Chỉ dùng làm bối cảnh/roadmap:** `create-account-odoo` (chưa hoàn tất)

**Không đưa vào:** `dashboard-project`, `dashboard-attendances` — chỉ đưa vào nếu chứng minh được đang dùng thật và có giá trị vận hành.

---

## 7. Phase implementation

### Phase 1 — UX Rebuild *(ưu tiên cao nhất)*

Viết lại `app.js` + `styles.css` theo 4-scene architecture.

- [ ] Xóa 9-route nav, thay bằng dot indicator 4 chấm
- [ ] `openingScene()`: full viewport, không option card, chỉ headline + sub
- [ ] Nav ẩn Scene 1, fade-in từ Scene 2
- [ ] `scaleScene()`: 4 số với animated counter (IntersectionObserver)
- [ ] `systemScene()`: 7 node grid + slide-in panel
- [ ] `closeScene()`: 3 điểm + câu đề nghị
- [ ] CSS transitions: scene, panel, counter
- [ ] Test mobile 390px + desktop 1280px

### Phase 2 — Content Cleanup

Cập nhật `data/impact-projects.js`.

- [ ] Rút mỗi project về: problem (2 câu) + built (2 câu) + verified metrics + roles (narrative)
- [ ] Xóa `estimatedImpact` dạng số khỏi project chưa có benchmark
- [ ] Rewrite `hook` cho từng project: 1 câu, chủ ngữ là hệ thống
- [ ] Xác nhận câu kết Scene 4 với user trước khi commit

### Phase 3 — QA

- [ ] Không lộ secret, tên khách hàng, employee data
- [ ] Mỗi số hiển thị đều có nhãn source (tooltip hoặc proof mode)
- [ ] Test desktop 1280px + mobile 390px
- [ ] Proof mode toggle hoạt động đúng

---

## 8. Metrics nên và không nên dùng

### Có giá trị kể chuyện (nên dùng)

| Metric | Tại sao có giá trị |
|---|---|
| **Lookup: 1,837 lượt tra cứu giá & onhand** | Gắn trực tiếp với nhu cầu phản hồi nhanh của sales/stock |
| **Curtain: 250 lượt truy cập repo tính vải** | Gắn trực tiếp với giá trị cho team SC |
| **Runtime: 8 service up khoảng 7 ngày** | Proof hệ thống đang ổn định dần, không chỉ chạy demo |
| **Docker: 11 service up** | Proof hệ thống đang sống — không phải demo |
| **Product Hub: 50/50 workflow success** | Automation chạy ổn định không cần can thiệp |
| **Bills: 983 PDF** | Volume công việc thật đang được hệ thống phục vụ |

### Không có giá trị / bỏ

| Metric | Tại sao bỏ |
|---|---|
| Stock Management: 6 users | Tài khoản tạo ≠ sử dụng thật. Không có timestamp truy cập |
| `sale_products_v2`: 226 | Chỉ là version khác của table cùng data — trùng lặp |
| `stocktake_sessions`: 0 | Số 0 không kể được gì tích cực |
| QC items: 10 | Quá nhỏ để claim adoption. Chỉ dùng narrative |

### Cần kiểm tra thêm (trước khi code)

- [ ] **Auto Workflow:** Có log nào cho thấy webhook/scheduler đã fire bao nhiêu lần không? File log, database counter, hay stdout từ Docker?
- [ ] **Product Hub:** `audit.db` hiện cho thấy 104 real user actions và 98 data updates đã phân loại. Nếu muốn kể adoption sâu hơn thì cần map tiếp theo action type và actor.
- [ ] **ORD Price Lookup:** 478 search audit có timestamp không? Nếu có, show được "đang được dùng đều đặn từ tháng X đến nay"
- [ ] **Bills Server:** Có access log (Nginx/Flask) cho thấy request count không? Khác với số file trong folder

---

## 9. Câu hỏi còn lại trước khi code

1. ~~Hook Scene 1~~ ✅ **Đã chốt Option A**
2. **Auto Workflow log:** Có log execution count không? (file log, DB counter, hay Docker stdout?)
3. **Product Hub audit.db:** 104 real user actions + 98 data updates cụ thể đang đại diện cho các thao tác nào? (để viết rõ adoption thay vì chỉ nói audit log)
4. **ORD search_audit:** Có timestamp column không? (để show usage pattern theo thời gian)

