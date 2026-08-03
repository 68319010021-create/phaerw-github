// ฟังก์ชันสำหรับดึงข้อมูลสภาพอากาศตามวัตถุประสงค์
async function getWeather() {
  const lat = document.getElementById('lat').value;
  const lon = document.getElementById('lon').value;
  const resultDiv = document.getElementById('result');

  // ตรวจสอบความถูกต้องของข้อมูลนำเข้า
  if (!lat || !lon) {
    resultDiv.innerHTML = `<p class="error">กรุณากรอกทั้ง Latitude และ Longitude</p>`;
    return;
  }

  // กำหนด URL และใส่ Query Parameters (latitude, longitude, current_weather)
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  resultDiv.innerHTML = `<p>กำลังโหลดข้อมูล...</p>`;

  try {
    // 1. ส่ง Request ด้วย Fetch API + Async/Await
    const response = await fetch(apiUrl);

    // ตรวจสอบว่า HTTP Response สมบูรณ์หรือไม่
    if (!response.ok) {
      throw new Error(`เกิดข้อผิดพลาดจาก API (Status: ${response.status})`);
    }

    // 2. แปลงข้อมูลจาก JSON
    const data = await response.json();

    // 3. ประมวลผลและนำข้อมูลมาแสดงบน HTML
    displayWeather(data);

  } catch (error) {
    console.error("Fetch Error:", error);
    resultDiv.innerHTML = `<p class="error">ไม่สามารถดึงข้อมูลได้: ${error.message}</p>`;
  }
}

// ฟังก์ชันสำหรับนำข้อมูล JSON มาเรนเดอร์ใน DOM
function displayWeather(data) {
  const resultDiv = document.getElementById('result');
  const currentWeather = data.current_weather;

  resultDiv.innerHTML = `
    <div class="temp">${currentWeather.temperature} °C</div>
    <p>🍃 ความเร็วลม: <strong>${currentWeather.windspeed} km/h</strong></p>
    <p>🧭 ทิศทางลม: <strong>${currentWeather.winddirection}°</strong></p>
    <p><small>อัปเดตล่าสุด: ${currentWeather.time}</small></p>
  `;
}