## Câu A1

## 1. Inline CSS

Viết CSS trực tiếp trong thẻ HTML bằng thuộc tính `style`.

Ví dụ:

```html
<p style="color: red;">Hello CSS</p>
```

Ưu điểm:
- Nhanh
- Dễ test nhanh một style nhỏ

Nhược điểm:
- Code khó bảo trì
- Lặp code nhiều
- Không tách riêng giao diện và nội dung

Khi nên dùng:
- Test nhanh
- Style nhỏ, tạm thời


---

## 2. Internal CSS

Viết CSS trong thẻ `<style>` bên trong file HTML.

Ví dụ:

```html
<head>
    <style>
        p {
            color: blue;
        }
    </style>
</head>
```

Ưu điểm:
- Quản lý CSS tập trung hơn inline
- Không cần file riêng

Nhược điểm:
- File HTML dễ dài và rối
- Không tái sử dụng cho nhiều trang

Khi nên dùng:
- Website nhỏ
- Trang demo hoặc bài thực hành


---

## 3. External CSS

Viết CSS trong file `.css` riêng và liên kết bằng `<link>`.

Ví dụ:

```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

File `style.css`:

```css
p {
    color: green;
}
```

Ưu điểm:
- Code sạch
- Dễ bảo trì
- Tái sử dụng cho nhiều trang
- Chuẩn thực tế khi làm project

Nhược điểm:
- Cần quản lý thêm file CSS

Khi nên dùng:
- Hầu hết project thực tế
- Website nhiều trang


---

## Câu hỏi thêm

Nếu cùng một element có cả Inline, Internal và External CSS cùng áp dụng thì:

Inline CSS sẽ thắng.

Ví dụ:

```html
<p style="color:red;">Hello</p>
```

```css
p {
    color: blue;
}
```

Kết quả cuối cùng:
- chữ màu đỏ

Lý do:
- Inline CSS có độ ưu tiên (specificity) cao hơn Internal và External CSS.
- Thứ tự ưu tiên thường là:

```text
Inline > Internal > External
```

## Câu A2

1. `h1`  
→ Chọn: `ShopTLU`


2. `.price`  
→ Chọn:
- `25.990.000đ`
- `45.990.000đ`


3. `#app header`  
→ Chọn toàn bộ thẻ `<header>` bên trong `id="app"` gồm:
- `ShopTLU`
- `Home`
- `Products`
- `About`


4. `nav a:first-child`  
→ Chọn: `Home`


5. `.product.featured h2`  
→ Chọn: `MacBook Pro`


6. `article > p`  
→ Chọn:
- `25.990.000đ`
- `Mô tả sản phẩm...`
- `45.990.000đ`
- `Mô tả sản phẩm...`

(Vì selector chọn mọi thẻ `<p>` là con trực tiếp của `<article>`)


7. `a[href="/"]`  
→ Chọn: `Home`


8. `.top-bar.dark h1`  
→ Chọn: `ShopTLU`

