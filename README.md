# ⚖️ Turn2Law

[![Live](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square)](https://turntwolaw.vercel.app)
![Built with](https://img.shields.io/badge/Built%20with-Next.js-000?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Styled%20With-Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success)
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
![Made with love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)

**Turn2Law** is a modern full-stack legal services platform built with **Next.js**, offering seamless access to:

> - **Legal Consultation**  
> - **Intelligent Lawyer Matchmaking**  
> - **Secure and Confidential Handling of Data**  
> - **24/7 AI-Powered Legal Support**  
> - **Affordable Subscription Plans**  
> - **Virtual Consultations**  
> - **Multilingual Assistance**

With a clean **UI/UX**, **fully responsive design**, and smooth animations, **Turn2Law** delivers a seamless experience across all devices—bringing fast, reliable, and accessible legal support to everyone.

---

## ✨ Features

### 🖥️ Frontend Features
- 🧭 **Dynamic Routing**: Optimized with Next.js App Router for SSR and SSG.
- 📱 **Responsive UI**: Styled using **Tailwind CSS** for clean, mobile-friendly designs.
- 🌀 **Interactive Animations**: Powered by **Framer Motion** for smooth transitions.
- 🎢 **Parallax-like Effect**: Scroll-based animations on the hero section using Framer Motion’s `useScroll` & `useTransform`.
- 🔔 **Toast Notifications**: Built with **React Hot Toast** for instant user feedback.
- 🧩 **Icon Pack**: Uses **Lucide Icons** for a modern and consistent interface.

### 🔧 Backend Features
- 🛡️ **Supabase Integration**: Handles authentication and backend-as-a-service operations.
- ⚙️ **Serverless API Routes**: Easily manage backend logic using Next.js built-in APIs.

### 🧑‍💻 Development Features
- ✅ **Code Quality**: Enforced with **ESLint** and **Prettier** for clean and consistent code.
- 🔐 **Environment Variables**: Securely store API keys and credentials.

---

## 🧰 Libraries and Technologies Used

| 🛠️ **Technology**     | 💡 **Purpose**                               |
|----------------------|----------------------------------------------|
| **Next.js**          | Full-stack React framework with SSR support |
| **Supabase**         | Authentication and backend as a service     |
| **React Hot Toast**  | Toast notifications                         |
| **Lucide Icons**     | Icon pack used in UI                        |
| **Framer Motion**    | Smooth animations and transitions           |
| **Tailwind CSS**     | Utility-first CSS styling                  |

---

## 📸 Screenshots

**HomePage**
> ![image](https://github.com/user-attachments/assets/4c829621-dfef-42f8-b028-1fe0aa307a04)

**Consultant**
> ![image](https://github.com/user-attachments/assets/265d130d-1efe-4915-936e-7f0b5233a855)

**ChatBot**
> ![image](https://github.com/user-attachments/assets/d41bb872-b941-40b3-a2d3-a4ab1dafe469)

**LogIn**
> ![image](https://github.com/user-attachments/assets/2eaed219-a56d-4c42-a730-2bc951e58d30)

**SignUp**
> ![image](https://github.com/user-attachments/assets/2f607202-3491-49bc-8ce9-a0998db1bd5d)

---

## ⚙️ Installation and Setup

### 📋 Prerequisites
Make sure the following are installed:
- **Node.js** (v16 or higher)
- **npm**

### 🚀 Steps to Run Locally
1. **Clone the repo**:
   ```bash
   git clone https://github.com/shashank-pd/turn2law.git
   cd turn2law
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add environment variables** in a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:  
   [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```plaintext
turn2law/
├── lib/                      # Custom libraries and helpers
│   └── supabaseClient.js     # Supabase configuration
├── public/                   # Static assets like images and fonts
├── src/                      # Application source code
│   ├── app/                  # Next.js App Router
│   └── components/           # Reusable UI components
├── .gitignore                # Ignored files in version control
├── eslint.config.mjs         # ESLint configuration
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
```

---

## 🤝 Contributing

Contributions are welcome!  

Here’s how you can help:

1. 🍴 Fork the repo  
2. 🛠️ Create a new branch:  
   ```bash
   git checkout -b feature/your-feature
   ```
3. 💾 Commit your changes:  
   ```bash
   git commit -m "Add your feature"
   ```
4. 📤 Push to GitHub:  
   ```bash
   git push origin feature/your-feature
   ```
5. 📬 Open a Pull Request

---

## 🔮 Future Enhancements

- 🌐 **Multilingual Support**  
  Make legal services accessible in multiple Indian and global languages for broader reach.

- 📅 **Improving Lawyer Appointment**  
  Allow users to reschedule, and cancel appointments with legal professionals seamlessly.

- 📄 **Smart Document Generation**  
  Auto-generate legal documents like contracts, affidavits, and agreements based on user input.

- 🧾 **Pricing & Payment History Section**  
  Enable users to track their legal service payments, view receipts, and manage subscriptions.

- 🌓 **Dark & Light Theme Support**  
  Enhance user experience with theme toggling based on user preference or system settings.

- 🔐 **Google Login Integration**  
  Simplify access with OAuth-based sign-in using Google accounts.

---
## 📄 License

This project is licensed under the **MIT License**.
