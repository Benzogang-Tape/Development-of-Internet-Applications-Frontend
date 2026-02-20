// Переключатель режима: true — Tauri build (прямые запросы по IP), false — dev/web (через proxy)
export const target_tauri = false;

// IP-адрес бэкенда в локальной сети (замените YOUR_IP на реальный адрес)
export const api_proxy_addr = "http://192.168.1.70:8080";

// Адрес API: в Tauri — напрямую по IP, в web — через proxy dev-сервера
export const dest_api = target_tauri ? api_proxy_addr + "/api" : "/api";

// Base path для роутера: в Tauri — корень, в web — путь для GitHub Pages
export const dest_root = target_tauri ? "" : "/Development-of-Internet-Applications-Frontend/";
