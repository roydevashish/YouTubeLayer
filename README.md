# 🎬 YouTubeLayer

**Tagline:** _Streamline your YouTube video editing and publishing._

YouTubeLayer is a web-based collaboration platform designed for YouTube channel owners and remote video editors to simplify and streamline the video editing and publishing workflow.

The platform allows channel owners to create video projects, upload raw video files, and assign tasks to editors. Editors can then access their assigned projects, download the raw files, edit them locally, and upload the final versions back for review. Once approved, the channel owner can publish the video to YouTube with a single click.

Whether you're a solo creator working with freelance editors or a growing content team, YouTubeLayer helps you manage projects efficiently, eliminate back-and-forths, and reduce publishing delays.

---

## 💡 Core Idea
YouTubeLayer is a collaboration platform for YouTube channel owners and remote video editors to streamline the editing and publishing process of YouTube videos.

---

## 🚀 Core Features
- Project creation and asset management  
- User roles and permissions (Owner vs Editor)  
- File upload/download system  
- Editor assignment  
- Video review  
- One-click publishing to YouTube via OAuth + YouTube Data API  

---

## 🌟 Features in v2
- Project management (edit and delete)
- Editor management (remove editor)
- Video management (remove video)

---

## 🐞 Known Bugs & Issues in v2
This is a list of the known bugs and issues identified in the **v2 release** of the **YouTubeLayer** platform.
<!-- No known issues currently -->

---

## 👥 User Roles

### 1. 👑 Channel Owner:
- Creates and manages video projects.  
- Uploads raw video files.  
- Assigns an editor to each project.  
- Reviews the edited video uploaded by the editor.  
- With a one-click action, uploads the final video to their YouTube channel.  

### 2. 🎞️ Remote Video Editor:
- Accesses assigned projects.  
- Downloads raw video files.  
- Edits the video locally.  
- Uploads the final edited video back to the platform for review.  

---

## 🔄 Workflow
1. Project Creation by the Channel Owner.  
2. Raw File Upload (video files).  
3. Editor Assignment to the project.  
4. Editor Workflow:  
    - Download raw video files.  
    - Edit video locally.  
    - Upload edited version.  
5. Review & Approval by the Channel Owner.  
6. One-Click Publish to YouTube (via YouTube Data API).  

---

## 🛠️ Tech Stack
- **Frontend/Backend:** Next.js  
- **Database:** MongoDB  
- **Cloud Infrastructure:** AWS (S3, ECR, ECS)  
- **Authentication:** Google OAuth 2.0  
- **Video Upload:** YouTube API  

---

## 🧱 Architecture Overview

```text
YouTubeLayer
│
├── Frontend/Backend (Next.js)
│
├── MongoDB (User/Project Data)
│
├── AWS S3 (Video Storage)
│
├── AWS ECR (Container Image)
│
├── AWS ECS (Runs YouTube Uploader Container)
│
└── YouTube API + Google OAuth (For publishing)
```

---

## ⚙️ Getting Started

### 1. 📥 Clone and Install

```bash
git clone https://github.com/roydevashish/youtubelayer.git

cd youtubelayer

npm install
```

### 2. ☁️ Infrastructure Setup
- Setup a MongoDB database  
- Setup [Resend](https://resend.com) to send email  
- Setup/generate a random secret for NextAuth  
- Setup AWS as per the below requirement:  
  - An IAM user with permissions for ECS, ECR, S3  
  - An S3 bucket for uploading raw and edited videos  
  - An ECR repository to host the container image  
  - An ECS cluster to run the container  
  - A task definition that spins the container to upload videos to YouTube  
- Setup Google OAuth at Google Cloud Platform for OAuth API Keys  

### 3. 🐳 Build and Publish Container Image to ECR
Create a `.env` file inside `/container` directory with:

```env
YT_AWS_ACCESS_KEY=
YT_AWS_SECRET_ACCESS_KEY=
YT_AWS_BUCKET=
YT_AWS_REGION=

OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_REDIRECT_URI=
```

- Build a container image from the files inside `/container`  
- Publish the container image to ECR  

### 4. 🔐 Setup Environment Variables

Create a `.env` file in the root directory with the following:

```env
MONGODB_URI=

RESEND_DOMAIN=
RESEND_API_KEY=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

YT_AWS_ACCESS_KEY=
YT_AWS_SECRET_ACCESS_KEY=
YT_AWS_BUCKET=
YT_AWS_REGION=
YT_AWS_TASK_DEFINITION=
YT_AWS_CLUSTER=
YT_AWS_CONTAINER_NAME=
YT_AWS_SECURITY_GROUP=
YT_AWS_SUBNET_1=
YT_AWS_SUBNET_2=
YT_AWS_SUBNET_3=

OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_REDIRECT_URI=
```

### 5. 🧪 Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📜 License

No license specified as of now.

---

## 🙋‍♂️ Maintainer

GitHub: [@roydevashish](https://github.com/roydevashish)
