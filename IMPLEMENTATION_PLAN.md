# Project Implementation Plan: ঢাকাস্থ দেবহাটা উপজেলা সমিতি Website

## 🎯 Goal
Build a dynamic, content-heavy community website for "ঢাকাস্থ দেবহাটা উপজেলা সমিতি" focusing on transparency, member management, and event organization.

---

## 📅 Phases & Checklist

### Phase 1: Foundation & Backend (Strapi 5)
- [x] **Env Setup**: Configure `.env` for development and production readiness.
- [x] **Content Schema Implementation**:
    - [x] `Notice`: Title, Slug, Category (Enum), Content, Attachment, Dates, IsActive.
    - [x] `CommitteeMember`: Name, Designation, Photo, CommitteeType, Phone, Order.
    - [x] `Event`: Title, DateTime, Location, MapLink, RSVPDeadline, Description, IsActive.
    - [x] `EventRegistration`: Relation to Event, Name, Phone, Union, Guests, Status.
    - [x] `AdInquiry`: OrgName, ContactPerson, Phone, AdSize, Status.
    - [x] `MemberDirectory`: Name, FatherName, Union, Phone, Serial, IsVerified.
    - [x] `CorrectionRequest`: Relation to Member, SubmittedBy, CorrectData, Status.
- [ ] **Permissions**: Configure public/authenticated API access roles.
- [ ] **Custom Controllers**: Setup endpoints for RSVP and Correction requests.

### Phase 2: Frontend Foundation (Next.js 15)
- [ ] **Design System**: Implement Tailwind config with high-contrast, premium color palette.
- [ ] **Typography**: Configure `Hind Siliguri` and `Noto Serif Bengali`.
- [ ] **Layout Architecture**: Header, Footer (with Ticker), and SEO Meta wrapper.
- [ ] **Strapi Utility**: Create API wrapper for fetching with revalidation.

### Phase 3: Core Page Development (Informational)
- [x] **Home Page**: Hero Slider, Quick Actions grid, Latest Notices (3), Countdown.
- [x] **Notice Board**: List & Detail pages, PDF download, Social Sharing.
- [x] **Committee Page**: Segmented display by committee type.
- [x] **Contact Page**: Google Maps, Click-to-call, Contact Form.

### Phase 4: Critical Workflows (Interactive)
- [x] **Member Directory**: Search/Filter by Union/Name.
- [x] **Correction Loop**: Modal form on directory cards, success/reference ID.
- [x] **Events & RSVP**: Countdown, RSVP form with validation, status feedback.
- [x] **Smaranika Page**: Editorial board display, Ad collection pipeline.

### Phase 5: Polish, SEO & Performance
- [ ] **SEO**: Dynamic metadata for all routes (Notices, Events).
- [ ] **Performance**: Image optimization (`next/image`), Skeleton loaders.
- [ ] **Accessibility**: High contrast, screen-reader friendly Bengali text.
- [ ] **Final QA**: Mobile responsiveness and form validation checks.

---

## 🛠 Tech Stack
- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion.
- **Backend**: Strapi 5 (Headless).
- **Language**: Bengali (UTF-8).
- **Font**: Hind Siliguri / Noto Serif Bengali.
