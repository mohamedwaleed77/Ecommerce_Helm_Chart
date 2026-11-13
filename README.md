# Ecommerce_Helm_Chart

---
## ▶ Watch this video:
[![Watch the video](https://img.youtube.com/vi/yr_rd2v4taw/maxresdefault.jpg)](https://www.youtube.com/watch?v=yr_rd2v4taw)

## 🏗️ System Architecture & DevOps Infrastructure

### 🤏 Microservices Architecture *(YES, I still couldn't find a better emoji)*
- **Decoupled Services:** Isolated backend services (**User**, **Product**, **Cart**, and **Order**) alongside a React frontend, each containerized using Docker.
- **Self-Healing & Resilience:** Managed by Kubernetes to automatically restart failed containers and maintain desired state.
- **Startup Dependency Management:** Implemented **Init Containers** across microservices to verify database availability (via FQDN health checks) before startup, eliminating race conditions.

### ☸️ Kubernetes Orchestration & Helm
- **Cluster Provisioning:** Bootstrapped a multi-node Kubernetes cluster on AWS EC2 from scratch using `kubeadm`.
- **Modular Helm Charts:** Migrated raw YAML manifests into parameterized, reusable **Helm charts** for streamlined environment deployments.
- **Stateful Persistence:** Deployed **MongoDB** using Kubernetes **StatefulSets** and `volumeClaimTemplates` to ensure stable network identities and prevent data corruption.
- **Traffic Routing:** Configured **Nginx Ingress Controller** to route external HTTP traffic cleanly across frontend and backend microservices.
- **Serverless Trade-off Evaluation:** Implemented and tested **Knative Serving** (Kourier Ingress & Queue Proxy) for scale-to-zero capabilities in staging, later transitioning to standard Kubernetes Deployments in cloud production to eliminate cold-start latency and reduce control-plane overhead.

### ☁️ AWS Cloud Infrastructure & Security
- **Network Isolation:** Architected a custom **AWS VPC** isolating worker nodes inside **Private Subnets**, utilizing a **NAT Gateway** and custom Route Tables for secure outbound internet access (pulling container images/updates).
- **Zero-Bastion Access:** Secured node administration using **AWS Systems Manager (SSM)** and scoped **IAM Roles**, eliminating the need to expose SSH (port 22) to the public internet.
- **Load Balancing:** Exposed the cluster securely via an **AWS Application Load Balancer (ALB)** forwarding traffic directly to the Nginx Ingress NodePort.
- **Dynamic Cloud Storage:** Engineered persistent storage using **AWS EFS**, the **EFS CSI Driver**, and custom `StorageClasses` with isolated directory permissions and secured VPC NFS traffic.

### 🔄 Automated CI/CD Pipeline
- **Azure DevOps Integration:** Built automated CI pipelines triggered on Git commits to build, tag, and push multi-service Docker images directly to **Docker Hub**.

---

## ✨ Application Features (Full-Stack)

### 🌟 Bilingual Support (Arabic | English)
- Full internationalization powered by `i18next`.
- Global language state managed and synced across all components via **Redux**.

### ✅ User Authentication & Authorization
- Stateless **JWT-based** authentication with email confirmation flow.
- Role-Based Access Control (**RBAC**) distinguishing between Admin and regular users.
- Protected routes & authorization middlewares: unauthorized access to admin paths renders a `404` page, backed by strict server-side role verification.
- Authenticated user profile viewing and updating.

### 🛒 Product Catalog
- Browse products with images, descriptions, and pricing.
- Filter catalog by category and price range.
- Real-time stock availability tracking and user reviews.
- Pagination implemented (intentionally bypassed in views where Admins require full inventory visibility).

### 🧺 Shopping Cart
- Add, remove, and update item quantities dynamically.
- Real-time cart summary and total price calculation.
- User-specific cart persistence fetched securely from the database via JWT.

### 📦 Order Management
- End-to-end checkout workflow with shipping details and payment method selection.
- Detailed order summaries (items, quantities, total cost) and order history for logged-in users.
- **Stripe** payment interface integration.

### 🛠️ Admin Dashboard
- Full CRUD operations for managing products (add, edit, delete).
- Inventory and stock level tracking.
- User account management.

### 📱 Responsive Design
- Mobile-first, responsive UI styled with **Tailwind CSS**.

### 🔐 Application Security
- Password hashing using **bcrypt**.
- **CSRF protection** enforced via custom headers and tokens.
- Secure JWT validation middlewares.

---

## 🧰 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Redux, Tailwind CSS, i18next |
| **Backend** | Node.js, Express, REST APIs, JWT, bcrypt |
| **Database** | MongoDB (StatefulSet) |
| **Containers & Orchestration** | Docker, Kubernetes (`kubeadm`), Helm, Nginx Ingress, Knative (Evaluated) |
| **Cloud (AWS)** | EC2, VPC, Subnets, NAT Gateway, ALB, EFS (CSI Driver), IAM, SSM |
| **CI/CD** | Azure DevOps, Docker Hub, GitHub |
