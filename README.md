# Bonario Impact Report

Static report nội bộ để trình bày tác động vận hành của 11 hệ thống Bonario.

Repo hiện tại không phải dashboard CRUD kiểu cũ. Bản đang dùng là một report
cinematic 4 scene viết bằng HTML/CSS/vanilla JS, mở trực tiếp trong browser.

## Current Structure

- `scene-0`: hook mở đầu.
- `scene-1`: counter output + usage signals từ log/database/Cloudflare.
- `scene-2`: system map 7 nhóm nghiệp vụ, click mở side panel chi tiết.
- `scene-3`: close statement + roadmap.
- Dot navigation chỉ hiện từ scene 2 trở đi.
- `impactEvidence` đã được nối vào UI để hiện source/proof thay vì nằm chết trong data.

## Run

Mở [index.html](./index.html) trực tiếp trong browser.

Không cần `npm install`.

## Files

- `index.html`: shell static.
- `app.js`: render 4 scene, interaction, side panel, counter animation.
- `styles.css`: toàn bộ layout, motion, responsive styling.
- `data/impact-projects.js`: narrative ngắn cho 11 project đang đưa lên report.
- `data/impact-evidence.js`: bằng chứng verified, usage signals, adoption, runtime.
- `data/projects.js`: narrative dài hơn theo từng project, hiện chưa phải nguồn render chính.
- `*.md`: hồ sơ từng project, plan, script trình bày, review prompt.

## Data Contract

### `window.impactProjects`

Nguồn chính cho UI story.

Expected fields:

- `id`
- `name`
- `chapter`
- `hook`
- `problem`
- `built`
- `verifiedMetrics[]`

### `window.impactEvidence`

Nguồn proof/evidence.

Expected sections:

- `period`
- `companyScale[]`: hiện dùng làm usage signal cards để giữ tương thích với app runtime.
- `repoRelevantOdoo[]`: Odoo aggregates còn giữ vì liên quan trực tiếp repo, không render thành usage card chính.
- `runtime[]`
- `adoption{}`
- `costModel`
- `roleEquivalents[]`

### `window.reportProjects`

Dataset narrative chi tiết hơn theo từng project. Hữu ích cho sync nội dung,
nhưng app hiện tại không render dataset này ra scene chính.

## Notes

- Số liệu plan/script phải bám `data/impact-evidence.js` và `data/impact-projects.js`.
- Nếu refresh số Odoo/Docker, cập nhật data trước rồi mới sửa script/presentation.
- Không đưa secret, customer line data, hoặc credential vào report.
