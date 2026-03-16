# Hot Reload - Tự động cập nhật khi đổi code

## Cách chạy với Hot Reload

**Quan trọng:** Tắt app đang chạy trước (Ctrl+C trong terminal).

### Cách 1: Từ Terminal
```bash
cd HuongVietSinh.Web
dotnet watch run
```

### Cách 2: Từ Cursor/VS Code
1. Nhấn **F5** hoặc **Run > Start Debugging**
2. Chọn **"Chạy với Hot Reload"**

### Cách 3: Chạy Task
1. **Ctrl+Shift+P** → gõ "Tasks: Run Task"
2. Chọn **"watch"**

---

## Khi đổi code sẽ thế nào?

| Loại file | Hành vi |
|-----------|---------|
| **Razor (.cshtml)** | Tự reload – chỉ cần **F5** trình duyệt |
| **C# (.cs)** | Tự reload – chỉ cần **F5** trình duyệt |
| **CSS, JS** | Đã có cache busting – **F5** để thấy thay đổi |

**Lưu ý:** Trình duyệt không tự refresh. Sau khi lưu code, nhấn **F5** để xem thay đổi.
