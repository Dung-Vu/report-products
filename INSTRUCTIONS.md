# Hướng dẫn thiết lập Dự án và Tích hợp Component Sparkles

Tài liệu này hướng dẫn cách thiết lập một dự án React hỗ trợ TypeScript, Tailwind CSS và shadcn CLI, đồng thời giải thích cách tích hợp component `Sparkles` vào dự án của bạn.

---

## 1. Thiết lập dự án React với TypeScript & Tailwind CSS

Nếu dự án của bạn là Vanilla JS và bạn muốn chuyển đổi sang React, bạn nên khởi tạo một dự án mới bằng **Vite** hoặc **Next.js**. Dưới đây là các bước khởi tạo dự án React + TypeScript sử dụng Vite:

### Bước 1: Khởi tạo dự án Vite
Chạy lệnh sau trong Terminal:
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

### Bước 2: Cài đặt Tailwind CSS
1. Cài đặt Tailwind và các công cụ hỗ trợ:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
2. Cập nhật file cấu hình `tailwind.config.js` để quét các file React:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```
3. Thêm các directive của Tailwind vào file CSS chính của bạn (ví dụ: `src/index.css`):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

---

## 2. Thiết lập shadcn/ui

shadcn/ui không phải là một thư viện component thông thường mà bạn cài đặt qua npm. Thay vào đó, nó là một tập hợp các component mẫu mà bạn sao chép trực tiếp vào mã nguồn của mình để toàn quyền chỉnh sửa.

### Bước 1: Khởi chạy shadcn CLI
Trong thư mục dự án (đã có sẵn Tailwind), chạy lệnh cấu hình sau:
```bash
npx shadcn@latest init
```

CLI sẽ hỏi bạn một số cấu hình:
- **Style**: Default hoặc New York.
- **Base color**: Slate, Zinc, v.v.
- **CSS variables**: Có sử dụng biến CSS cho màu sắc không (nên chọn Yes).
- **Paths**:
  - Alias cho components: `@/components`
  - Alias cho utils: `@/lib/utils`
  - Vị trí của CSS file chính: `src/index.css` (hoặc `app/globals.css` nếu dùng Next.js)

### Tầm quan trọng của thư mục `/components/ui`
Khi chạy shadcn CLI, nó sẽ tạo ra thư mục `/components/ui` (hoặc `src/components/ui`) làm đường dẫn mặc định cho tất cả các component nguyên bản (Primitives) như Button, Input, Modal, v.v.
- **Tính modular và tái sử dụng**: Giúp tổ chức rõ ràng giữa các component dùng chung nền tảng (nằm trong `/components/ui`) và các component nghiệp vụ phức tạp (nằm ở ngoài `/components`).
- **Tương thích với CLI**: Khi chạy `npx shadcn@latest add button`, CLI sẽ tự động tải mã nguồn của component Button và lưu trực tiếp vào thư mục `/components/ui/button.tsx`. Việc tuân thủ cấu trúc này giúp bạn dễ dàng chạy lệnh tải các component khác mà không cần cấu hình thủ công phức tạp.

---

## 3. Cài đặt các thư viện phụ trợ cho Sparkles

Để chạy component `SparklesCore`, bạn cần cài đặt các package npm sau:
```bash
npm install framer-motion @tsparticles/slim @tsparticles/react @tsparticles/engine
```

- **`framer-motion`**: Thư viện dùng để thực hiện các hoạt ảnh chuyển động mượt mà (như hiệu ứng fade-in khi các hạt được load xong).
- **`@tsparticles/react`, `@tsparticles/slim`, `@tsparticles/engine`**: Bộ thư viện tsParticles hiệu năng cao dành cho React, phiên bản `slim` giúp giảm thiểu kích thước bundle bằng cách chỉ load các tính năng cơ bản của hạt.

---

## 4. Tích hợp Component Sparkles

### Thư mục chứa component
* **Component lõi**: `/components/ui/sparkles.tsx` (Chứa logic cấu hình hạt, kích thước, mật độ và tốc độ).
* **Demo sử dụng**: `/components/ui/demo.tsx` (Chứa các kịch bản demo: `SparklesPreview`, `SparklesPreviewDark`, `SparklesPreviewColorful`).

### Hàm tiện ích `cn`
Trong component `sparkles.tsx` có sử dụng hàm `cn` để gộp class CSS:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
Hãy chắc chắn rằng bạn đã định nghĩa hàm này trong file `lib/utils.ts` (đã được tạo tự động nếu bạn chạy shadcn CLI init).
