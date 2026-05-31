// 1. MẢNG DỮ LIỆU ĐẦU VÀO
const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" }
];

// 2. KHỞI TẠO CÁC BIẾN TÍCH LŨY THỐNG KÊ
// Đếm số lượng sinh viên theo từng xếp loại
let countGioi = 0;
let countKha = 0;
let countTB = 0;
let countYeu = 0;

// Tìm sinh viên cao nhất / thấp nhất
let maxStudent = null;
let minStudent = null;

// Tích lũy điểm để tính trung bình môn toàn lớp
let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

// Thống kê theo giới tính (Bonus)
let totalMaleGPA = 0;
let countMale = 0;
let totalFemaleGPA = 0;
let countFemale = 0;

// Mảng mới để lưu kết quả sau khi tính toán để in bảng và xử lý logic tiếp theo
const processedStudents = [];

// ==========================================================================
// 3. XỬ LÝ DUYỆT MẢNG VÀ TÍNH TOÁN (CHỈ DÙNG VÒNG LẶP FOR VÀ IF/ELSE)
// ==========================================================================
for (let i = 0; i < students.length; i++) {
    const sv = students[i];

    // a. Tính điểm trung bình theo trọng số: Math (40%), Physics (30%), CS (30%)
    const gpa = (sv.math * 0.4) + (sv.physics * 0.3) + (sv.cs * 0.3);
    // Làm tròn 1 chữ số thập phân bằng phương pháp toán học để giữ kiểu dữ liệu Number
    const fixedGPA = Math.round(gpa * 10) / 10; 

    // b. Xếp loại sinh viên dựa trên điểm trung bình vừa tính
    let rank = "";
    if (fixedGPA >= 8.0) {
        rank = "Giỏi";
        countGioi++;
    } else if (fixedGPA >= 6.5) {
        rank = "Khá";
        countKha++;
    } else if (fixedGPA >= 5.0) {
        rank = "Trung bình";
        countTB++;
    } else {
        rank = "Yếu";
        countYeu++;
    }

    // Lưu thông tin đã xử lý vào mảng mới phục vụ cho việc in ấn và tìm kiếm
    const currentProcessed = {
        name: sv.name,
        gpa: fixedGPA,
        rank: rank,
        gender: sv.gender
    };
    processedStudents.push(currentProcessed);

    // c. Tìm sinh viên có điểm TB cao nhất và thấp nhất
    if (maxStudent === null || fixedGPA > maxStudent.gpa) {
        maxStudent = currentProcessed;
    }
    if (minStudent === null || fixedGPA < minStudent.gpa) {
        minStudent = currentProcessed;
    }

    // d. Tích lũy tổng điểm từng môn để tính trung bình lớp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;

    // e. Bonus: Tích lũy điểm và đếm theo giới tính
    if (sv.gender === "M") {
        totalMaleGPA += fixedGPA;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleGPA += fixedGPA;
        countFemale++;
    }
}

// ==========================================================================
// 4. IN KẾT QUẢ RA MÀN HÌNH CONSOLE
// ==========================================================================

// Yêu cầu 1: In bảng kết quả chuẩn định dạng
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < processedStudents.length; i++) {
    const sv = processedStudents[i];
    // Sử dụng hàm padEnd để căn khoảng cách các cột thẳng hàng như một cái bảng thật
    const sttStr = String(i + 1).padEnd(3);
    const nameStr = sv.name.padEnd(6);
    const gpaStr = String(sv.gpa.toFixed(1)).padEnd(4);
    const rankStr = sv.rank.padEnd(11);
    
    console.log(`| ${sttStr} | ${nameStr} | ${gpaStr} | ${rankStr} |`);
}

console.log("\n==================================================");

// Yêu cầu 2: Thống kê số lượng sinh viên mỗi xếp loại
console.log("📊 SỐ LƯỢNG SINH VIÊN THEO XẾP LOẠI:");
console.log(`- Giỏi:      ${countGioi} SV`);
console.log(`- Khá:       ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu:       ${countYeu} SV`);

console.log("\n==================================================");

// Yêu cầu 3: Sinh viên có điểm TB cao nhất và thấp nhất
console.log("🏆 DANH HIỆU THỦ KHOA & THẤP NHẤT:");
if (maxStudent) {
    console.log(`- Điểm TB cao nhất: ${maxStudent.name} (${maxStudent.gpa} - Loại ${maxStudent.rank})`);
}
if (minStudent) {
    console.log(`- Điểm TB thấp nhất: ${minStudent.name} (${minStudent.gpa} - Loại ${minStudent.rank})`);
}

console.log("\n==================================================");

// Yêu cầu 4: Điểm TB toàn lớp cho từng môn học
const avgMath = Math.round((totalMath / students.length) * 100) / 100;
const avgPhysics = Math.round((totalPhysics / students.length) * 100) / 100;
const avgCS = Math.round((totalCS / students.length) * 100) / 100;

console.log("📖 ĐIỂM TRUNG BÌNH TOÀN LỚP THEO TỪNG MÔN:");
console.log(`- Môn Toán (Math):   ${avgMath}`);
console.log(`- Môn Vật lý (Phys): ${avgPhysics}`);
console.log(`- Môn Tin học (CS):  ${avgCS}`);

console.log("\n==================================================");

// Bonus: Tính điểm trung bình theo giới tính
const avgMale = countMale > 0 ? Math.round((totalMaleGPA / countMale) * 100) / 100 : 0;
const avgFemale = countFemale > 0 ? Math.round((totalFemaleGPA / countFemale) * 100) / 100 : 0;

console.log("👫 ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH (BONUS):");
console.log(`- Nam (M): ${avgMale}`);
console.log(`- Nữ (F):  ${avgFemale}`);