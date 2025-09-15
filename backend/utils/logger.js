const fs = require('fs');
const path = require('path');

// Tentukan path ke file log di dalam direktori backend
const logFilePath = path.join(__dirname, '../activity.log');

// Buat stream penulisan. Bendera 'a' berarti 'append' (menambahkan, bukan menimpa)
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

/**
 * Memformat objek konteks menjadi string yang mudah dibaca.
 * @param {object} context - Data tambahan (JSON).
 * @returns {string} String konteks yang telah diformat.
 */
const formatContext = (context) => {
  if (!context || Object.keys(context).length === 0) {
    return ''; // Tidak ada konteks, kembalikan string kosong.
  }

  // Khusus untuk error FATAL, kita format secara berbeda agar stack trace terbaca
  if (context.errorStack) {
    return `\n    URL       : ${context.url}\n    Method    : ${context.method}\n    Pesan Error: ${context.errorMessage}\n    Stack Trace: ${context.errorStack}\n`;
  }

  // Untuk log INFO atau WARN, buat menjadi satu baris ringkas
  const contextString = Object.entries(context)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
  
  return ` | Konteks: (${contextString})`;
};

/**
 * Mencatat aktivitas ke file log dan konsol dengan format yang rapi.
 * @param {'INFO' | 'WARN' | 'ERROR' | 'FATAL'} level - Tingkat keparahan log.
 * @param {string} message - Pesan log utama dalam Bahasa Indonesia.
 * @param {object} context - Objek JSON untuk data kontekstual tambahan.
 */
const logActivity = (level, message, context = {}) => {
  // Gunakan format waktu lokal Indonesia (WIB)
  const timestamp = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const levelStr = level.toUpperCase().padEnd(5, ' '); // Membuat [INFO ] atau [WARN ] (rata kanan)
  
  const contextStr = formatContext(context);
  let logEntry;

  if (level.toUpperCase() === 'FATAL' && context.errorStack) {
    // Log FATAL dibuat multi-baris agar stack trace mudah dibaca
    logEntry = `[${timestamp}] [${levelStr}] ${message}${contextStr}----------------------------------------------------------------------\n`;
  } else {
    // Log standar (INFO, WARN) dibuat satu baris
    logEntry = `[${timestamp}] [${levelStr}] ${message}${contextStr}\n`;
  }

  // Tulis ke file activity.log
  logStream.write(logEntry);
  
  // Tampilkan juga di konsol server
  console.log(logEntry);
};

module.exports = { logActivity };