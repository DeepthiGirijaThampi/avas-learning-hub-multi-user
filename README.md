<div align="center">
  <h1>Ava’s Learning Hub: Full-Stack Web Application</h1>
  <p>Personalized Learning Tracker with Secure Multi-User Support</p>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Full--Stack-Project-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Auth-JWT-red?style=for-the-badge" />
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=333333" />
  <img src="https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=333333" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/CSS-rebeccapurple?style=for-the-badge&logo=css&logoColor=white" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge" />
</div>

---

## Quick Links

[About](#about-the-project) •
[Features](#features) •
[Visuals](#key-visuals) •
[Wireframes](#wireframes) •
[Tech Stack](#tech-stack) •
[Installation](#installation) •
[Database](#database-design-erd) •
[API](#api-endpoints) •
[Future Features](#future-features)

---

## 💡 About the Project

Ava’s Learning Hub is a full-stack educational web application designed to help students organize, track, and reflect on their learning journey.

Users can create subjects, add units under each subject, track progress, and record reflections. The application supports secure multi-user functionality using JWT-based authentication, ensuring that each user has a personalized and protected learning space.

Built with a React frontend and a Java Spring Boot backend, the application uses RESTful APIs and a MySQL relational database.

---

## ✨ Features

### Core Functionality
- Create, update, and delete subjects  
- Add and manage units under each subject  
- Track learning progress  
- Add reflections for learning insights  

### Authentication & Security
- Secure login and registration using JWT  
- Protected API routes using Spring Security  
- User-specific data isolation  

---

## 📸 Key Visuals

### 🏠 Home Page
<img width="446" height="640" alt="Home" src="https://github.com/user-attachments/assets/694c03dd-550a-4cdb-9e33-927d8d3f8872" />

---
### 📝 Registration
<img width="450" height="644" alt="Register" src="https://github.com/user-attachments/assets/05c4118a-5590-4e26-a640-771439715be2" />

---
### 📚 Subjects
<img width="456" height="647" alt="Subjects" src="https://github.com/user-attachments/assets/e1bce256-797a-4bd7-862a-fb43681774b8" />

---
### 👤 Profile
<img width="1511" height="813" alt="Profile" src="https://github.com/user-attachments/assets/3e403c9f-7f19-4c27-8ec5-567992182afd" />

---

## 🧩 Wireframes

👉 [View Wireframes in Figma](https://www.figma.com/design/KlayXTegam4vxnN2PFFaqp/Ava-s-Learning-Hub--Wireframes--Copy-?node-id=0-1&p=f&t=FwMDb6xfDLazb1mI-0)

---

## 🛠️ Tech Stack

### Front End
- React  
- JavaScript  
- Vite  
- React Router  
- CSS  

### Back End & Database
- Java  
- Spring Boot  
- Spring Security  
- Hibernate / JPA  
- MySQL  

---

## 🚀 Installation

### Prerequisites
- Node.js  
- Java JDK  
- MySQL  

### Backend Setup

```bash
git clone https://github.com/DeepthiGirijaThampi/avas-learning-hub-multi-user.git
cd avas-learning-hub-multi-user
```

Configure database:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Run backend:

```bash
mvn spring-boot:run
```

### Frontend Setup

```bash
npm install
npm run dev
```

Open:
```
http://localhost:5173
```

---

## 🗄️ Database Design (ERD)

👉 [View ERD](https://dbdiagram.io/d/ERD-Unit2-Project-DeepthiGT-698f6f51bd82f5fce2ad5489)

---

## ⚙️ API Endpoints

> 🔐 Protected endpoints require a valid JWT in the Authorization header.

---

### Authentication 🔐

| HTTP Method | Endpoint | Description | Access |
|---|---|---|---|
| 🟡 POST | `/api/auth/register` | Register a new user | 🌍 Public |
| 🟡 POST | `/api/auth/login` | Login and receive JWT | 🌍 Public |

---

### Users 👤

| HTTP Method | Endpoint | Description | Access |
|---|---|---|---|
| 🟢 GET | `/api/users` | Get all users | 🔐 Protected |
| 🟢 GET | `/api/users/{id}` | Get user by ID | 🔐 Protected |
| 🟡 POST | `/api/users` | Create user | 🔐 Protected |
| 🔵 PUT | `/api/users/{id}` | Update user | 🔐 Protected |
| 🔴 DELETE | `/api/users/{id}` | Delete user | 🔐 Protected |

---

### Subjects 📚

| HTTP Method | Endpoint | Description | Access |
|---|---|---|---|
| 🟢 GET | `/api/subjects` | Get all subjects | 🔐 Protected |
| 🟢 GET | `/api/subjects/{id}` | Get subject by ID | 🔐 Protected |
| 🟢 GET | `/api/subjects/by-user/{userId}` | Get subjects by user | 🔐 Protected |
| 🟡 POST | `/api/subjects` | Create subject | 🔐 Protected |
| 🔵 PUT | `/api/subjects/{id}` | Update subject | 🔐 Protected |
| 🔴 DELETE | `/api/subjects/{id}` | Delete subject | 🔐 Protected |

---

### Units 🧩

| HTTP Method | Endpoint | Description | Access |
|---|---|---|---|
| 🟢 GET | `/api/units` | Get all units | 🔐 Protected |
| 🟢 GET | `/api/units/{id}` | Get unit by ID | 🔐 Protected |
| 🟢 GET | `/api/units/by-subject/{subjectId}` | Get units by subject | 🔐 Protected |
| 🟡 POST | `/api/units` | Create unit | 🔐 Protected |
| 🔵 PUT | `/api/units/{id}` | Update unit | 🔐 Protected |
| 🔴 DELETE | `/api/units/{id}` | Delete unit | 🔐 Protected |

---

### Reflections ✍️

| HTTP Method | Endpoint | Description | Access |
|---|---|---|---|
| 🟢 GET | `/api/reflections` | Get all reflections | 🔐 Protected |
| 🟢 GET | `/api/reflections/{id}` | Get reflection by ID | 🔐 Protected |
| 🟢 GET | `/api/reflections/by-user/{userId}` | Get by user | 🔐 Protected |
| 🟢 GET | `/api/reflections/by-subject/{subjectId}` | Get by subject | 🔐 Protected |
| 🟢 GET | `/api/reflections/by-user/{userId}/by-subject/{subjectId}` | Get by user & subject | 🔐 Protected |
| 🟡 POST | `/api/reflections` | Create reflection | 🔐 Protected |
| 🔵 PUT | `/api/reflections/{id}` | Update reflection | 🔐 Protected |
| 🔴 DELETE | `/api/reflections/{id}` | Delete reflection | 🔐 Protected |

---

## 🔮 Future Features

- Parent dashboard  
- Role-based access  
- Gamification  
- UI improvements  
- Deployment  

---

## 👩‍💻 Author

Deepthi Girija Thampi  
Full Stack Developer  
