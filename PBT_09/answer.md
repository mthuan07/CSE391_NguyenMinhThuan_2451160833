# PHẦN A 

## CÂU A1 — DOM TREE VISUALIZATION & SELECTORS

### 1. Sơ đồ cây DOM Tree biểu diễn cấu trúc HTML:

document
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1
            │   │   └── #text: "Todo App"
            │   └── nav
            │       ├── a.active
            │       │   └── #text: "All"
            │       ├── a
            │       │   └── #text: "Active"
            │       └── a
            │           └── #text: "Completed"
            └── main
                ├── form#todoForm
                │   ├── input#todoInput
                │   └── button
                │       └── #text: "Add"
                └── ul#todoList
                    ├── li.todo-item
                    │   └── #text: "Learn HTML"
                    └── li.todo-item.completed
                        └── #text: "Learn CSS"

### 2. Viết câu lệnh querySelector / querySelectorAll cho từng yêu cầu:

* Chọn thẻ <h1>:
  const h1 = document.querySelector("h1");

* Chọn input trong form:
  const input = document.querySelector("#todoForm input");

* Chọn tất cả .todo-item:
  const items = document.querySelectorAll(".todo-item");

* Chọn link đang active:
  const activeLink = document.querySelector("nav a.active");

* Chọn <li> đầu tiên trong #todoList:
  const firstLi = document.querySelector("#todoList li:first-child");

* Chọn tất cả <a> bên trong <nav>:
  const navLinks = document.querySelectorAll("nav a");

---

## CÂU A2 — INNERHTML VS TEXTCONTENT (SECURITY & XSS)

### 1. Phân biệt bản chất:
* innerHTML: Đọc hoặc ghi nội dung dạng HTML thô (Raw HTML). Nếu ta truyền vào một chuỗi chữ chứa các thẻ định dạng, trình duyệt sẽ parse (biên dịch) các thẻ đó thành các phần tử DOM thật và hiển thị lên màn hình.
* textContent: Đọc hoặc ghi nội dung thuần dạng Văn bản thô (Plain Text). Nếu ta truyền vào một chuỗi chữ chứa thẻ HTML, trình duyệt sẽ giữ nguyên chữ đó, tự động mã hóa các dấu ngoặc nhọn và in trơ trọi ra màn hình chứ không hề biên dịch thành thẻ DOM.

### 2. Khi nào nên dùng từng loại?
* Dùng textContent khi: Bạn chỉ muốn thay đổi chữ hiển thị thông thường (Ví dụ: cập nhật tên sản phẩm, hiển thị số điểm, thông báo lỗi văn bản). Đây là giải pháp an toàn tuyệt đối và giúp tối ưu hiệu năng tốt hơn.
* Dùng innerHTML khi: Bạn thực sự muốn chèn hoặc vẽ cả một khối cấu trúc cấu trúc HTML phức tạp từ file JavaScript vào giao diện (Ví dụ: render một danh sách mảng dữ liệu thành các khối thẻ div lồng ảnh và nút bấm).

### 3. Câu hỏi bảo mật: Tại sao innerHTML gây ra lỗ hổng XSS (Cross-Site Scripting)?
Bởi vì innerHTML tin tưởng tuyệt đối vào chuỗi dữ liệu truyền vào mà không hề có bộ lọc. Nếu mã nguồn của bạn lấy dữ liệu do người dùng nhập từ ô input mà không kiểm duyệt (sanitize), kẻ tấn công có thể cố tình chèn vào một đoạn mã độc (như thẻ img kèm sự kiện onerror hoặc thẻ script). Khi bạn gán chuỗi này vào innerHTML, trình duyệt sẽ hiểu lầm đó là code hợp pháp của hệ thống và tự động thực thi đoạn mã JavaScript độc hại đó, dẫn đến nguy cơ bị đánh cắp cookie, session token hoặc chiếm quyền tài khoản.

### 4. Cách khắc phục lỗ hổng XSS:
Đối với các trường hợp chỉ hiển thị chuỗi văn bản thông thường, biện pháp sửa lỗi triệt để nhất là thay thế hoàn toàn innerHTML bằng textContent.

* Đoạn code sau khi sửa lỗi an toàn:
  const userInput = document.querySelector("#search").value;
  document.querySelector("#result").textContent = userInput; 
  // Lúc này, chuỗi mã độc sẽ bị coi là văn bản thô, hiển thị vô hại lên màn hình!

---

## CÂU A3 — EVENT BUBBLING (CƠ CHẾ SỰ KIỆN NỔ BỌT)

### 1. Trạng thái 1: Khi bấm vào button (Mặc định code giữ nguyên)
* Thứ tự in ra console.log:
  BUTTON
  INNER
  OUTER
* Giải thích chi tiết: Đây là cơ chế Event Bubbling (Nổi bọt sự kiện) mặc định của JavaScript. Khi một hành vi click xảy ra trên phần tử sâu nhất là #btn (Target), sự kiện sẽ được kích hoạt tại đó trước, sau đó giống như một bong bóng nước, sự kiện tiếp tục nổi bọt lan ngược lên trên, kích hoạt lần lượt các hàm lắng nghe sự kiện của các thẻ cha bao bọc nó là #inner và cuối cùng là #outer.

### 2. Trạng thái 2: Khi bỏ comment dòng lệnh e.stopPropagation(); ở nút button
* Thứ tự in ra console.log mới:
  BUTTON
* Giải thích chi tiết: Hàm e.stopPropagation() có nhiệm vụ chặn đứng hành vi nổi bọt của sự kiện ngay lập tức. Khi click vào nút bấm, hàm xử lý của nút bấm chạy xong và gặp câu lệnh này, bong bóng sự kiện sẽ bị bóp vỡ ngay tại chỗ, không cho phép lan truyền ngược lên các thẻ cha #inner và #outer nữa. Do đó, màn hình lúc này duy nhất chỉ in ra chữ BUTTON.

# PHẦN C 

## CÂU C1 

Đoạn mã đề bài cung cấp chứa tổng công 8 lỗi nghiêm trọng khiến ứng dụng không thể hoạt động ổn định hoặc gây tràn bộ nhớ. Dưới đây là danh sách bóc tách chi tiết:

### 1. Danh sách 8 lỗi, giải thích và cách sửa:

* Lỗi 1: Sai tên sự kiện tại nút Decrement ("onclick")
  - Giải thích: Hàm addEventListener nhận tên sự kiện ở dạng chuẩn, bỏ tiền tố "on". Viết "onclick" sẽ khiến sự kiện không bao giờ được kích hoạt khi click chuột.
  - Cách sửa: Đổi tên sự kiện thành "click".

* Lỗi 2: Ghi đè sai giá trị vào biến đối tượng DOM tại nút Reset (countDisplay = count)
  - Giải thích: Lệnh countDisplay = count cố tình gán một số thực (Number) đè lên biến hằng số đang lưu đối tượng phần tử DOM (countDisplay). Hành vi này sẽ gây ra lỗi hệ thống nghiêm trọng TypeError: Assignment to constant variable và làm sập ứng dụng.
  - Cách sửa: Sửa thành countDisplay.textContent = count;

* Lỗi 3: Gán sai kiểu dữ liệu rỗng cho innerHTML tại nút Reset (historyList.innerHTML = null)
  - Giải thích: Gán giá trị null vào thuộc tính innerHTML tuy vẫn xóa được chữ tạm thời trên màn hình nhưng không chuẩn kỹ thuật, dễ khiến trình duyệt hiểu lầm thành một chuỗi chữ có nội dung là "null".
  - Cách sửa: Đổi thành chuỗi rỗng tiêu chuẩn historyList.innerHTML = "";

* Lỗi 4: Rò rỉ bộ nhớ khi xóa lịch sử (Memory Leak / Dangling Event Listener)
  - Giải thích: Khi tạo thẻ li trong nút Increment, code đi gán trực tiếp một sự kiện click lẻ tẻ lên từng thẻ li đó. Khi hàm deleteHistory thực thi lệnh xóa thẻ li ra khỏi giao diện DOM, hàm lắng nghe sự kiện của thẻ đó vẫn nằm cô độc lại trong bộ nhớ RAM (gọi là sự kiện treo), lâu dần người dùng click nhiều sẽ gây hiện tượng tràn bộ nhớ và ngốn RAM dữ dội.
  - Cách sửa: Loại bỏ hàm lắng nghe sự kiện cục bộ trên thẻ li. Thay vào đó, áp dụng kỹ thuật Event Delegation (Ủy quyền sự kiện) bằng cách lắng nghe duy nhất tại một nơi là thẻ cha #history.

* Lỗi 5: Gọi sai hàm chức năng xóa phần tử tại nút Clear All (item.remove)
  - Giải thích: Phương thức .remove() là một hàm chức năng cốt lõi của phần tử DOM, bắt buộc phải có cặp ngoặc đơn () đi liền phía sau để ra lệnh thực thi kích hoạt. Viết item.remove trơ trọi chỉ giống như gọi tên một biến văn bản chứ không hề chạy lệnh xóa.
  - Cách sửa: Sửa đổi thành item.remove();

* Lỗi 6: Lỗi sai kiểu dữ liệu toán học khi khôi phục từ LocalStorage (count = localStorage.getItem)
  - Giải thích: Mọi dữ liệu bốc từ kho localStorage ra mặc định đều bị biến thành kiểu Chuỗi chữ (String). Nếu Thuận lấy ra chuỗi chữ "5", ở lượt bấm nút kế tiếp, phép toán count++ sẽ hiểu nhầm thành hành vi nối chuỗi, làm kết quả nhảy bậy thành "51" thay vì tăng lên số 6.
  - Cách sửa: Ép kiểu chuỗi về số nguyên chuẩn bằng cách bọc hàm Number(): count = Number(localStorage.getItem("count")) || 0;

* Lỗi 7: Khôi phục HTML thô trực tiếp từ kho lưu trữ mà không kiểm duyệt dữ liệu rác
  - Giải thích: Việc lấy dữ liệu thô từ LocalStorage đổ thẳng vào historyList.innerHTML khi vừa load trang mà không phòng trừ trường hợp kho trống (trả về null) sẽ dễ khiến giao diện hiện chữ "null" hoặc gây lỗi hiển thị cấu trúc.
  - Cách sửa: Thêm điều kiện dự phòng chuỗi rỗng: historyList.innerHTML = localStorage.getItem("history") || "";

* Lỗi 8: Phép toán thay đổi innerHTML lãng phí hiệu năng (countDisplay.innerHTML = count)
  - Giải thích: Sử dụng thuộc tính innerHTML bắt trình duyệt phải khởi động bộ parse HTML để dịch một con số thô sang mã giao diện, vừa chậm tốc độ vừa tốn tài nguyên phần cứng.
  - Cách sửa: Thay thế toàn bộ sang thuộc tính textContent để tối ưu tốc độ render cho nhẹ.

### 2. Đoạn mã hoàn chỉnh sau khi được Refactor sạch lỗi:

const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    historyList.innerHTML = localStorage.getItem("history") || "";
});

---

## CÂU C2 

### 1. Tại sao bind event lên 1000 phần tử riêng lẻ là BAD PRACTICE?
* Lãng phí tài nguyên bộ nhớ (RAM): Mỗi một hàm xử lý sự kiện (EventListener) thực chất là một đối tượng Object chiếm một khoảng không gian vùng nhớ vật lý trên RAM. Việc tạo ra 1000 hàm giống hệt nhau cho 1000 phần tử riêng lẻ sẽ trực tiếp tiêu tốn dung lượng bộ nhớ của trình duyệt, dễ gây ra hiện tượng giật lag, đặc biệt là trên các thiết bị di động.
* Tốn công sức bảo trì dữ liệu: Khi có phần tử mới được thêm động vào danh sách, ta lại phải viết thêm mã lệnh để gắn sự kiện cho nó. Khi xóa phần tử, nếu quên hủy sự kiện sẽ tạo ra các lỗi rò rỉ bộ nhớ treo vô cùng nguy hiểm.

### 2. Event Delegation giải quyết bài toán này thế nào?
* Kỹ thuật Event Delegation tận dụng triệt để cơ chế Event Bubbling (Nổi bọt sự kiện) của JavaScript. Thay vì đi phát 1000 vé lắng nghe cho 1000 phần tử con, ta chỉ cần đóng đúng một chiếc đinh sự kiện duy nhất tại thẻ Cha chung bao bọc bên ngoài.
* Khi người dùng click vào bất kỳ thẻ con nào, sự kiện sẽ tự động nổi bọt lan truyền ngược lên thẻ Cha. Thẻ Cha chỉ cần dùng thuộc tính e.target để kiểm tra xem chính xác thẻ con nào vừa bị chạm trúng để xử lý hành động tương ứng. Cách này giúp giảm số lượng hàm lắng nghe từ 1000 xuống còn duy nhất 1 hàm, tiết kiệm 99.9% tài nguyên bộ nhớ RAM.

### 3. Phân tích lỗi Reflow của đoạn code đề bài và giải pháp:
Đoạn code gốc chạy vòng lặp và thực thi lệnh document.body.appendChild(div) liên tục 1000 lần lề giao diện. Mỗi một lần chèn lẻ tẻ như vậy, trình duyệt bắt buộc phải tạm dừng luồng xử lý để tính toán lại toàn bộ kích thước hình học, tọa độ, và dàn lại layout trực quan của trang web (gọi là hiện tượng Reflow). Bắt phần cứng máy tính phải Reflow 1000 lần liên tục là một thảm họa về mặt hiệu năng render.

### 4. Đoạn code sau khi được Refactor tối ưu bằng DocumentFragment:

const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    fragment.appendChild(div);   
}

document.body.appendChild(fragment);

### 5. Tại sao dùng DocumentFragment lại nhanh hơn vượt trội?
Bởi vì DocumentFragment bản chất là một kho chứa DOM ảo nằm hoàn toàn tách biệt trong bộ nhớ tạm của RAM, hoàn toàn không thuộc cây DOM hiển thị thực tế trên màn hình. 

Khi chúng ta thực hiện vòng lặp chèn 1000 thẻ div vào Fragment, trình duyệt hoàn toàn giữ nguyên giao diện tĩnh, không phải tốn một mili-giây nào để tính toán lại layout. Đến cuối cùng, câu lệnh duy nhất document.body.appendChild(fragment) đổ toàn bộ 1000 thẻ xuống cùng một lúc. Trình duyệt nhận diện đây là một tác vụ đơn lẻ, gom tất cả lại và chỉ thực hiện vẽ lại màn hình đúng 1 lần duy nhất, giúp tăng tốc độ xử lý nhanh hơn gấp hàng chục lần so với phương pháp cũ!