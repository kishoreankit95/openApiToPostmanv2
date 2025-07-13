# 🧩 OpenAPI to Postman Converter

This is a full-stack application that allows users to upload an OpenAPI specification file (`.json`, `.yaml`, or `.yml`) and download its converted Postman collection. It consists of a **React frontend** and a **Node.js/Express backend** using the `openapi-to-postmanv2` library.

---

## 📦 Features

- Upload OpenAPI 2.0/3.0 specification files
- Convert them to a Postman v2 collection
- Automatically download the converted file
- Clean file upload and download handling
- Optional standalone CLI script for offline conversion

---

## 🖥️ Tech Stack

| Layer       | Technology       |
|-------------|------------------|
| Frontend    | React (with Axios) |
| Backend     | Node.js, Express  |
| File Upload | Multer            |
| Converter   | `openapi-to-postmanv2` |
| Styling     | Inline CSS (simple)  |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kishoreankit95/openApiToPostmanv2.git
cd openapi-to-postman-converterv2
