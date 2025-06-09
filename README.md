# 🎬 YouTubeLayer: Seamless Video Collaboration & YouTube Publishing Platform

## Overview

This project is a **Proof of Concept (PoC)** for a collaborative platform that simplifies the video production and publishing workflow for YouTube channel owners and remote video editors.

The platform eliminates the manual, repetitive steps of file transfers and streamlines publishing directly to YouTube via an automated container task.

---

## 🚨 Problem Statement

Current workflows involve:
- Multiple uploads/downloads between cloud drives and local machines.
- High internet dependency for both parties.
- Manual uploading of final video to YouTube.

These steps are inefficient—especially with large video files and remote collaboration.

---

## ✅ Proposed Solution

A web platform where:
- Channel owners and video editors onboard and collaborate.
- Owners upload raw video files to assigned projects.
- Editors download, edit, and re-upload the final video.
- Owners review and publish the video to YouTube with **one click**.
- An automated AWS container handles the upload process.

---

## 🎯 PoC Goals

This PoC aims to validate:

- ✅ Uploading large video files to **AWS S3**.
- ✅ Triggering a containerized task using **AWS ECS/Fargate**.
- ✅ The container:
  - Pulls the video from S3.
  - Uploads it to YouTube via the **YouTube Data API**.
  - Terminates itself after completion.

---

## 🧱 Tech Stack

| Component        | Technology        |
|------------------|------------------|
| Frontend/Backend | Next.js          |
| Database         | MongoDB (Mongoose) |
| Storage          | AWS S3           |
| Compute          | AWS Fargate / ECS |
| Video Upload     | YouTube Data API |
| Auth             | OAuth 2.0        |

---

## 🔁 Architecture

```
+----------------+           +-------------------+           +-----------------------+
|  Channel Owner |---------> |     Web Platform  |---------> |     AWS S3 Bucket     |
+----------------+           |   (Next.js + API) |           +-----------------------+
                             |                   |
                             |                   |<---------+---------------------+
                             |                   |          |     Remote Editor   |
                             +-------------------+          +---------------------+
                                        |
                                        v
                            +--------------------------+
                            |   AWS ECS/Fargate Task   |
                            |  (Triggered on Publish)  |
                            +-----------+--------------+
                                        |
                                        v
                            +--------------------------+
                            |  YouTube Data API (v3)   |
                            |   Upload to YouTube      |
                            +--------------------------+
```

---

## 🧪 Success Criteria

The PoC is successful if:

- Users can upload raw and edited videos to S3 from the app.
- An API endpoint can spin up a container task on demand.
- The container fetches video from S3 and uploads it to YouTube.
- Upload status (success/failure) is logged.

---

## 🚫 Out of Scope (For PoC)

- Full UI/UX
- Real-time chat or comments
- Role-based access control
- Error handling & retries
- Notifications (email, webhook)

---

## 🚀 Future Scope

If successful, this PoC could evolve into a complete platform with:
- Revisions and version control
- Notification system (email, push)
- Payment gateway for freelance editors
- Analytics and performance tracking
- Role-based access and teams

---

## 👥 Target Audience

- **YouTube channel owners** who travel or outsource editing
- **Remote video editors** who work on freelance or contract basis
