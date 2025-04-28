# Locker Hub Web Portal

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-4E9A06?style=for-the-badge)](#license)


---

## 🧠 Project Overview

**Locker Hub Web Portal** is part of the **Smart Locker System** — a secure, interactive, and intelligent solution designed for modern locker management.

**Designed by:**  
Ashmandeep Kaur, Anshuman Sengar, Harshit Bhardwaj

---

## 🚀 Features at a Glance

### 🛡️ Authentication & Security
- Username and PIN login system.
- PINs encrypted using **SHA-256** with **hashlib**.
- Error handling for failed login attempts.
- **Change PIN** functionality.

### 📦 Locker Management
- **Shared** and **private** compartments.
- Locker status displayed as **Locked** or **Unlocked**.
- **Auto-door reset** after relocking.

### 🚨 Decoy Mode (Silent Alarm)
- **Fake Unlock** triggers a silent security alert.
- Voice feedback: "Decoy mode activated."
- Separate logging for decoy attempts.

### 📝 Access Logs
- Logs every locker action, including decoy and feedback events.
- Simple window interface to view access history.

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Python** | Scripting and backend logic |
| **Tkinter** | Graphical User Interface |
| **pyttsx3** | Text-to-Speech engine |
| **hashlib** | Encryption for PINs |
| **Vite** | Fast frontend development |
| **TailwindCSS** | Utility-first CSS framework |
| **TypeScript** | Typed JavaScript development |

---

## 🏃‍♂️ Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed (LTS recommended).

### 2. Install dependencies
```bash
npm install

```bash
npm run dev




