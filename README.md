# Infinito Comics

Infinito Comics is a multi-application digital comics platform built around an original entertainment universe. The repository contains the public reader-facing website, an admin dashboard, a research portal, a foundation microsite, and a shared backend API. Together these applications support discovery, storytelling, character exploration, comic chapter publishing, memberships, support/donations, blogs/news, careers, research papers, foundation activities, feedback, and authenticated user workflows.

This README is intended to be a one-stop technical and product report for anyone joining, reviewing, scaling, or maintaining the project.

## Table of Contents

- [What Is Infinito Comics?](#what-is-infinito-comics)
- [What The Platform Does](#what-the-platform-does)
- [How The Platform Works](#how-the-platform-works)
- [Repository Structure](#repository-structure)
- [Applications In This Repository](#applications-in-this-repository)
- [Technology Stack](#technology-stack)
- [Why These Technologies Are Used](#why-these-technologies-are-used)
- [Technology Alternatives](#technology-alternatives)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Admin Architecture](#admin-architecture)
- [Research And Foundation Apps](#research-and-foundation-apps)
- [Data Models](#data-models)
- [API Surface](#api-surface)
- [Authentication And Authorization](#authentication-and-authorization)
- [File Upload And Media Handling](#file-upload-and-media-handling)
- [Payments And Memberships](#payments-and-memberships)
- [Email Workflows](#email-workflows)
- [End-To-End User Workflows](#end-to-end-user-workflows)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Build And Deployment](#build-and-deployment)
- [Scaling From 0 To 1](#scaling-from-0-to-1)
- [Current Engineering Notes](#current-engineering-notes)
- [Recommended Next Improvements](#recommended-next-improvements)

## What Is Infinito Comics?

Infinito Comics is a digital comics and fandom ecosystem. At its core, it gives users a place to explore comics, characters, stories, news, community activity, premium memberships, research material, and social/foundation initiatives connected to the Infinito brand.

From the current codebase, Infinito Comics is not just a static comic website. It is structured as a content platform with:

- A public web experience for readers and fans.
- A content management dashboard for admins.
- A backend API that stores users, content, media metadata, payments, careers, FAQs, blogs, and research papers.
- Separate brand experiences for research and foundation initiatives.
- Authentication, email verification, password reset, feedback, error reporting, support, and payment flows.

In simple terms: Infinito Comics is the main brand and product universe; this repository is the software system that lets the team publish, manage, monetize, and scale that universe online.

## What The Platform Does

The platform currently covers these product areas:

| Area | Description |
| --- | --- |
| Home and landing experience | Presents the Infinito Comics brand, character spotlights, comics, merch, foundation sections, premium plans, newsletters, fan favorites, and upcoming events. |
| User accounts | Supports signup, login, logout, email verification, password reset, profile-related user data, JWT authentication, and local session persistence. |
| Comics | Displays comics, cover images, banner images, authors, release years, and chapter lists. |
| Comic chapters | Stores and serves chapter information, chapter images, and chapter PDFs. |
| Characters | Manages detailed character biographies, powers, origin stories, images, relationships, appearance metadata, and comic references. |
| News and blogs | Publishes blog/news content for Infinito Comics and foundation-related categories. |
| Community | Provides pages for posts, fan art, events, galleries, and inner-circle style community content. |
| Infinito Ultimate | Presents membership plans, premium access, creator access, weekly comics, membership kits, and research plan screens. |
| Cart/payment flow | Provides a multi-step checkout-style flow and integrates with Razorpay for payment order creation and verification. |
| Support Us | Allows authenticated users to support the platform and view support statistics. |
| Careers and internships | Displays career opportunities and allows admin-side job creation/update/deletion. |
| Research portal | Provides research landing, research plan pages, paper browsing, reading, searching, and FAQ-based knowledge discovery. |
| Foundation site | Presents Infinito Foundation initiatives, events, collaborations, press/trust content, TEDx, E-summit, and archery association sections. |
| Admin dashboard | Gives internal users tools to manage users, FAQs, blogs, comics, chapters, characters, careers, timelines, research papers, and foundation/about timelines. |
| Feedback and error reporting | Lets authenticated users submit feedback and error reports. |
| Policy pages | Includes privacy policy, refund policy, terms of use, children privacy policy, and anti-harassment policy pages/PDF assets. |

## How The Platform Works

At a high level, the system works like this:

1. Users open the public `frontend` Vite React app.
2. The public app calls the backend API through Axios using `VITE_BASE_URL`.
3. The backend Express server receives requests, validates authentication when required, delegates business logic to controllers/services/repositories, and reads/writes MongoDB through Mongoose models.
4. Admin users use the `Admin` Vite app to create and manage content.
5. Uploaded media is accepted through Multer and pushed to AWS S3.
6. Payments are created and verified through Razorpay.
7. Emails such as verification and password reset are sent through Nodemailer/SMTP.
8. Research and Foundation apps run as separate React/Vite frontends and can request user data from the main app through `window.postMessage` when opened from the main platform.

The backend is the central source of truth. The frontend apps are specialized clients on top of the same API.

## Repository Structure

```text
InfinitoComicsProj/
  Admin/                 Admin dashboard React/Vite app
  backend/               Express API, MongoDB models, services, repositories
  Foundation/            Foundation-focused React/Vite app
  frontend/              Main public Infinito Comics React/Vite app
  Research/              Research portal React/Vite app
  package.json           Root dependency file
  README.md              Project documentation
```

Important backend folders:

```text
backend/src/
  config/                Server and database configuration
  constant/              Shared constants such as payment plan prices
  controller/            HTTP request/response handlers
  middleware/            Auth, admin auth, role checks, multer, reset token checks
  models/                Mongoose schemas
  repository/            Database access layer
  routes/                Express route definitions
  services/              Business logic layer
  utils/                 AWS S3, Razorpay, and email helpers
  index.js               Backend application entry point
```

Important frontend folders:

```text
frontend/src/
  components/            Shared visual and layout components
  constants/             Static page/content data
  pages/                 Route-level page modules
  redux/                 Redux Toolkit store and user slice
  services/              Axios API client functions
  shimmer/               Loading placeholder components
  utils/                 Environment constants and image URL helpers
```

## Applications In This Repository

### 1. Main Public Frontend

Path: `frontend/`

Purpose: The primary customer-facing Infinito Comics website.

Main routes include:

- `/`
- `/login`
- `/signup`
- `/verifyEmail`
- `/forgot-password`
- `/reset-password/:id/:token`
- `/characters`
- `/characters/biography`
- `/comics`
- `/comicChap/:comicId/chapters`
- `/news`
- `/news/:id`
- `/all-news`
- `/careers`
- `/careers/apply`
- `/community`
- `/support-us`
- `/ultimate`
- `/cart`
- `/games`
- `/aboutUS`
- `/Feedback`
- `/ErrorReport`
- `/privacy-policy`
- `/refund-policy`
- `/terms-of-use`
- `/children-privacy-policy`
- `/anti-harassment`

### 2. Backend API

Path: `backend/`

Purpose: Shared API server for users, admins, comics, characters, careers, research papers, payments, media upload, blogs, FAQs, support, timelines, feedback, and error reports.

The backend uses:

- Express for HTTP routing.
- MongoDB and Mongoose for persistence.
- JWT for authentication.
- bcrypt/bcryptjs for password hashing.
- Multer for multipart file intake.
- AWS S3 SDK for cloud media storage.
- Razorpay SDK for payment orders.
- Nodemailer for email delivery.

### 3. Admin Dashboard

Path: `Admin/`

Purpose: Internal content and operations dashboard.

Admin features visible in the code include:

- Admin login.
- User list.
- Blog creation.
- FAQ management.
- Comic management.
- Comic chapter dashboard.
- Character manager.
- Career/job management.
- Timeline management.
- Research paper management.
- About/foundation timeline management.

### 4. Research Portal

Path: `Research/`

Purpose: A dedicated research-focused user experience.

Research features include:

- Research home page.
- Research plans page.
- Browse papers page.
- Read research paper page.
- Research FAQs.
- Redux-based user state.
- Cross-window user handoff from the main app.

### 5. Foundation Site

Path: `Foundation/`

Purpose: A dedicated foundation/initiative-focused user experience.

Foundation features include:

- Foundation landing/home page.
- Banner section.
- Collaboration section.
- TEDx section.
- Press/trust section.
- E-summit section.
- Archery association section.
- Redux-based user state.
- Cross-window user handoff from the main app.

## Technology Stack

### Frontend

- React 18/19 depending on app.
- Vite 6.
- React Router DOM.
- Redux Toolkit and React Redux.
- Tailwind CSS.
- CSS modules/files and static assets.
- Axios.
- Framer Motion.
- React Slick and Slick Carousel.
- Lucide React.
- React Icons.
- React Hot Toast / React Toastify.
- React Hook Form.
- Headless UI in the main frontend.
- Shimmer/loading components.

### Admin

- React 18.
- Vite 6.
- React Router DOM.
- Tailwind CSS 3.
- Material UI and MUI date pickers.
- Ant Design.
- Formik and Yup.
- React Hook Form.
- React Dropzone.
- React Quill.
- UIW Markdown editor.
- SweetAlert2.
- Zustand.
- Axios.

### Backend

- Node.js.
- Express 5.
- MongoDB.
- Mongoose 8.
- CORS.
- body-parser.
- dotenv.
- JSON Web Tokens.
- bcrypt and bcryptjs.
- Multer.
- AWS SDK for S3.
- Nodemailer.
- Razorpay.
- UUID.
- Nodemon for development.

### Storage And Third-Party Services

- MongoDB for structured application data.
- AWS S3 for uploaded media/files.
- Razorpay for payment order creation and verification.
- SMTP email provider via Nodemailer.
- Browser localStorage for client-side user persistence.

## Why These Technologies Are Used

| Technology | Why It Fits This Project |
| --- | --- |
| React | The platform is UI-heavy, route-heavy, and component-driven. React makes it practical to build reusable pages, cards, forms, dashboards, and content sections. |
| Vite | Fast local development, simple builds, and modern ES module support. Useful for multiple independent apps in the same repo. |
| Tailwind CSS | Speeds up visual development and keeps styling close to components, especially for marketing/content-heavy pages. |
| Redux Toolkit | Provides shared client state for authenticated users and app-level data without manually wiring complex state logic. |
| React Router | Supports multi-page SPA navigation without full page reloads. |
| Axios | Standardizes HTTP calls to the backend and keeps API calls readable in service files. |
| Express | Lightweight API framework that fits CRUD-heavy products and can be organized gradually. |
| MongoDB | Flexible document model works well for evolving content types such as characters, comics, chapters, blogs, research papers, and timelines. |
| Mongoose | Adds schemas, validations, hooks, indexes, timestamps, and model methods on top of MongoDB. |
| JWT | Lets stateless API requests carry authentication identity through bearer tokens. |
| bcrypt | Hashes passwords before storage and prevents plain-text credential storage. |
| Multer | Handles multipart uploads before pushing files to S3. |
| AWS S3 | Durable object storage for uploaded images, PDFs, covers, banners, and media assets. |
| Razorpay | Provides payment infrastructure suitable for INR-based membership/support flows. |
| Nodemailer | Provides a simple SMTP-based email layer for verification and password reset workflows. |

## Technology Alternatives

The current stack is reasonable for a 0-to-1 product. Alternatives may be considered as the application grows.

| Current Choice | Alternatives | When To Consider Alternatives |
| --- | --- | --- |
| React + Vite | Next.js, Remix, Astro | If SEO, server-side rendering, image optimization, route-level data loading, or hybrid static/server pages become critical. |
| Tailwind CSS | CSS Modules, Sass, Styled Components, Chakra UI, MUI-only design system | If the team wants stricter design-system governance or fewer utility classes in JSX. |
| Redux Toolkit | Zustand, Jotai, TanStack Query, React Context | If most state becomes server cache rather than global client state. TanStack Query would be especially useful for API data fetching/caching. |
| Express | Fastify, NestJS, Hapi | If the backend needs stronger module boundaries, dependency injection, typed contracts, or higher throughput. |
| MongoDB/Mongoose | PostgreSQL + Prisma, MySQL, DynamoDB | If relational constraints, transactions, reporting queries, or strict schemas become dominant. |
| AWS S3 | Cloudinary, Firebase Storage, Supabase Storage | If the team wants built-in transformations, CDN handling, easier image moderation, or simplified setup. |
| Razorpay | Stripe, Cashfree, PayU | Depends on target geography, payment methods, subscriptions, and settlement needs. |
| JWT auth | Cookie sessions, Auth0, Clerk, Firebase Auth, NextAuth/Auth.js | If social login, MFA, enterprise auth, session revocation, or hosted identity becomes important. |
| Nodemailer | SendGrid, Amazon SES, Mailgun, Postmark | If deliverability, templates, analytics, retries, and production email monitoring matter. |

## Backend Architecture

The backend follows a layered architecture:

```text
HTTP request
  -> Express route
  -> Middleware
  -> Controller
  -> Service
  -> Repository
  -> Mongoose model
  -> MongoDB
```

### Entry Point

File: `backend/src/index.js`

Responsibilities:

- Creates the Express app.
- Loads server/database configuration.
- Configures CORS using allowed origins:
  - `FRONTEND_URL`
  - `ADMIN_URL`
  - `RESEARCH_URL`
  - `FOUNDATION_URL`
- Configures JSON/body parsing with a `50mb` limit.
- Mounts API route groups.
- Exposes a root health response.
- Starts the server and connects to MongoDB.

Mounted route groups:

```text
/api                  User, auth, feedback, error report, profile upload
/blog                 Blog/news
/research-papers      Research papers
/faq                  FAQs
/admin                Admin accounts
/timeline             Timeline events
/timeline/aboutUs     About/foundation timeline events
/career               Career/job posts
/support              Support-us records and statistics
/comic                Comics
/comicChap            Comic chapters
/character            Characters
/payment              Razorpay payment flows
```

### Config Layer

Files:

- `backend/src/config/server-config.js`
- `backend/src/config/database-config.js`

The config layer reads `.env` values through `dotenv` and centralizes secrets/URLs such as database URL, JWT settings, AWS credentials, SMTP credentials, Razorpay credentials, and frontend origins.

### Route Layer

Route files define HTTP methods and paths. They keep URL structure separate from business logic.

Examples:

- `user-routes.js` maps signup/login/update/delete/password reset/feedback/error report/upload routes.
- `comic-routes.js` maps comic CRUD routes.
- `comicChap-routes.js` maps nested chapter routes by comic ID.
- `research-paper-routes.js` maps research paper CRUD/search/read routes.
- `payment-routes.js` maps payment create/webhook/verify routes.

### Middleware Layer

Important middleware:

- `auth.js`: validates user JWT from `Authorization: Bearer <token>` and attaches the user document to `req.user`.
- `adminauth.js`: validates admin tokens for admin-protected operations.
- `roleCheck.js`: role-based access helper.
- `multer.js`: handles multipart form uploads.
- `verifyResettoken.js`: validates reset-password tokens.

### Controller Layer

Controllers translate HTTP requests into application operations. They parse request data, call services, and return HTTP responses.

Examples:

- `user-controller.js`
- `admin-controller.js`
- `comic-controller.js`
- `comicChap-controller.js`
- `character-controller.js`
- `payment-controller.js`
- `research-paper-controller.js`
- `blog-controller.js`

### Service Layer

Services contain business logic. This is where the application should decide how to create records, validate workflows, update related entities, and coordinate utilities like email, S3, or payment providers.

Examples:

- `user-service.js`
- `payment-service.js`
- `comic-service.js`
- `comicChap-service.js`
- `research-paper-service.js`
- `support-service.js`

### Repository Layer

Repositories isolate database operations. This keeps raw Mongoose queries away from controllers and makes future database changes easier.

Examples:

- `crud-repository.js`
- `user-repository.js`
- `comic-repository.js`
- `character-repository.js`
- `payment-repository.js`
- `research-paper-repository.js`

## Frontend Architecture

The main frontend is a Vite React single-page application.

### Routing

Routing is defined in `frontend/src/App.jsx` using `BrowserRouter`, `Routes`, and nested routes under the shared `Body` layout.

The app includes:

- Public routes.
- Auth pages.
- Content pages.
- Policy pages.
- Error pages.
- Comic chapter routes.
- Network error handling.

### State Management

Redux Toolkit is used through:

- `frontend/src/redux/appStore.js`
- `frontend/src/redux/userSlice.js`

The frontend stores user data in Redux and localStorage. The Research and Foundation apps can receive this user data through cross-window messaging.

### API Layer

The frontend keeps API calls in `frontend/src/services/`.

Examples:

- `userServices.js` handles login, signup, blogs, password reset, and verification.
- `ComicService.js` fetches comics and chapters.
- `CharacterServices.js` fetches character data.
- `CareerService.js` fetches job data.
- `supportUs.js` fetches support timeline/statistics and creates support records.
- `aboutUs.js` fetches about/foundation timeline stories.

### UX Features

The main frontend includes:

- Loading shimmer components.
- Network offline detection through browser `online/offline` events.
- Toast notifications.
- Static visual assets.
- Public policy pages.
- Dedicated not-found and network-error pages.

## Admin Architecture

The Admin app is also a Vite React SPA. It focuses on internal operations and content management.

Key admin modules:

- `Pages/Home`
- `Pages/UserList`
- `Pages/Blogs`
- `Pages/Faq`
- `Pages/Comic`
- `Pages/Characters`
- `Pages/career`
- `Pages/TimeLine`
- `Pages/Research`

Admin service files in `Admin/src/services/` call backend endpoints through Axios and `VITE_BASE_URL`.

The admin app uses a richer UI/form stack than the public frontend:

- MUI for structured dashboard components and date pickers.
- Ant Design for interface components.
- Formik/Yup and React Hook Form for form workflows.
- React Dropzone for file uploads.
- React Quill and Markdown editor for rich content editing.
- SweetAlert2 and toast libraries for confirmations and feedback.

## Research And Foundation Apps

Research and Foundation are separate Vite apps instead of route folders inside the main app. This allows the team to deploy them as separate experiences with different branding, routing, and base URLs.

### Cross-App User Handoff

The main frontend listens for messages from allowed origins:

- `RESEARCH_BASE_URL`
- `FOUNDATION_BASE_URL`

When Research/Foundation are opened with `?from=main` and have `window.opener`, they post `request-user` to the main app. The main app responds with serialized localStorage user data. The receiving app parses that data, stores it in Redux, and persists it locally.

This is a lightweight single-sign-on style bridge between separate frontends.

## Data Models

### User / Account

File: `backend/src/models/User.js`

Stores:

- Email.
- Hashed password.
- Name.
- Date of birth.
- Username.
- Newsletter preference.
- Email verification state and code.
- Membership state.
- Infinito Ultimate expiry.
- Infinito Ultimate Kit ownership.
- Membership type.

Important behavior:

- Passwords are hashed in a Mongoose `pre('save')` hook.
- Password comparison is available through `comparePassword`.

### Admin

File: `backend/src/models/Admin.js`

Stores administrator accounts used by the admin dashboard.

### Comic

File: `backend/src/models/Comics.js`

Stores:

- Cover image.
- Banner image.
- Title.
- Authors.
- Released year.
- Embedded chapter subdocuments.

Chapter subdocuments store:

- Chapter number.
- Chapter image.
- Title.
- Release date.
- Chapter PDF.

### Character

File: `backend/src/models/Character.js`

Stores rich biography and world-building data:

- Known/original name.
- Birth date.
- Place of origin.
- Characteristics.
- Interests.
- Weapons.
- Capabilities.
- Powers.
- Height, weight, age, species, eyes, hair.
- Limitations.
- Description.
- Creator/group/family/friends/enemies references.
- Comics appeared in.
- Storyline text/image.
- About text.
- Origin text/image.
- Main portrait and landscape images.
- Power images.
- Gender.

### Research Paper

File: `backend/src/models/ResearchPaper.js`

Stores structured academic-style papers:

- Title.
- Authors.
- Abstract.
- Keywords.
- Introduction.
- Related work.
- Methodology.
- Experimental results.
- Discussion.
- Conclusion.
- Acknowledgments.
- References.
- DOI.
- Publication date.
- Published status.
- Creator admin.
- Downloads.
- Views.

Important behavior:

- Text index on title, abstract, author names, and keywords.
- Virtual citation string.
- Auto-updated `lastUpdated` field.

### Payment

File: `backend/src/models/Payment.js`

Stores:

- Razorpay order ID.
- Payment ID.
- Signature.
- Amount.
- Currency.
- Status.
- Notes containing user ID, membership type, name, and email.

### Blog

File: `backend/src/models/Blog.js`

Stores:

- Title.
- Subject.
- Author name.
- Category.
- News/story blocks.
- Draft/published status.

### Other Models

Additional models include:

- `Career`
- `Faq`
- `Feedback`
- `ErrorReport`
- `SupportUs`
- `Timeline`

These support operational content, support-us flows, FAQ content, feedback, and timeline/about pages.

## API Surface

The backend exposes these major route groups.

### User And Authentication: `/api`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/signup` | Register user |
| POST | `/api/login` | Login user |
| POST | `/api/logout` | Logout endpoint |
| GET | `/api/getall` | Get all users |
| GET | `/api/getById` | Get user by query ID |
| PUT | `/api/update` | Update user |
| DELETE | `/api/delete` | Delete user |
| POST | `/api/change-password` | Change password |
| POST | `/api/verifyemail` | Verify email code |
| POST | `/api/forget-password` | Start forgot-password workflow |
| POST | `/api/forget-password/:id/:token` | Complete password reset |
| POST | `/api/upload` | Upload user image |
| POST | `/api/report` | Submit error report |
| GET | `/api/report` | Get error reports |
| POST | `/api/feedback` | Submit feedback |
| GET | `/api/feedback` | Get feedback |

### Admin: `/admin`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/admin/create` | Create admin |
| POST | `/admin/login` | Login admin |
| GET | `/admin/all` | Get admins |
| GET | `/admin/:id` | Get admin by ID |
| PUT | `/admin/:id` | Update admin |
| DELETE | `/admin/:id` | Delete admin |

### Blogs: `/blog`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/blog/createblog` | Create blog |
| GET | `/blog/getallblog` | Get all blogs |
| GET | `/blog/getById/:id` | Get blog by ID |
| PUT | `/blog/updateblog/:id` | Update blog |
| DELETE | `/blog/deleteblog/:id` | Delete blog |
| GET | `/blog/latestblog` | Get latest blogs |
| GET | `/blog/foundation-blogs` | Get foundation blogs |
| GET | `/blog/ic-blogs` | Get Infinito Comics blogs |

### Comics: `/comic`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/comic` | Get all comics |
| GET | `/comic/:id` | Get comic by ID |
| POST | `/comic` | Create comic with cover/banner uploads |
| PUT | `/comic/:id` | Update comic |
| DELETE | `/comic/:id` | Delete comic |

### Comic Chapters: `/comicChap`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/comicChap/:comicId/chapters` | Create chapter with image/PDF upload |
| GET | `/comicChap/:comicId/chapters` | Get chapters by comic |
| PUT | `/comicChap/:comicId/chapters/:chapterId` | Update chapter |
| DELETE | `/comicChap/:comicId/chapters/:chapterId` | Delete chapter |

### Characters: `/character`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/character/getAll` | Get all characters |
| GET | `/character/get/:id` | Get character by ID |
| GET | `/character/list` | Get compact character list |
| POST | `/character/create` | Create character with media fields |
| PATCH | `/character/update/:id` | Update character |
| DELETE | `/character/delete/:id` | Delete character |

### Research Papers: `/research-papers`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/research-papers` | Get all papers |
| GET | `/research-papers/search` | Search papers |
| GET | `/research-papers/:id` | Get paper |
| POST | `/research-papers` | Create paper |
| PUT | `/research-papers/:id` | Update paper |
| DELETE | `/research-papers/:id` | Delete paper |

### FAQs: `/faq`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/faq` | Get FAQs, optionally by category |
| POST | `/faq` | Create FAQ |
| PUT | `/faq/:id` | Update FAQ |
| DELETE | `/faq/:id` | Delete FAQ |

### Career: `/career`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/career/create` | Create career/job |
| GET | `/career/getall` | Get all careers/jobs |
| GET | `/career/getById/:id` | Get career/job |
| PUT | `/career/update/:id` | Update career/job |
| DELETE | `/career/delete/:id` | Delete career/job |

### Support: `/support`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/support/create` | Create support entry |
| GET | `/support/my-supports` | Get current user's support entries |
| GET | `/support/all` | Get all support entries |
| GET | `/support/gold-members` | Get gold members |
| GET | `/support/statistics` | Get support statistics |

### Timeline: `/timeline`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/timeline/getAll` | Get all timeline events |
| GET | `/timeline/:id` | Get event by ID |
| POST | `/timeline/create` | Create event |
| PUT | `/timeline/update/:id` | Update event |
| DELETE | `/timeline/delete/:id` | Delete event |

### About Timeline: `/timeline/aboutUs`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/timeline/aboutUs/getAllAbout` | Get about events |
| POST | `/timeline/aboutUs/createAbout` | Create about event |
| PUT | `/timeline/aboutUs/updateAbout/:id` | Update about event |
| DELETE | `/timeline/aboutUs/deleteAbout/:id` | Delete about event |

### Payments: `/payment`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/payment/create` | Create Razorpay order |
| GET | `/payment/webhook` | Payment webhook setup/check endpoint |
| GET | `/payment/verify` | Verify payment |

## Authentication And Authorization

### User Authentication

User auth is based on JWT.

Current flow:

1. User signs up through `/api/signup`.
2. Password is hashed with bcrypt before being stored.
3. User logs in through `/api/login`.
4. Backend returns a token/user payload.
5. Frontend stores user data in Redux/localStorage.
6. Protected API calls pass token as `Authorization: Bearer <token>`.
7. `authenticate` middleware verifies the token and loads the user from MongoDB.

### Admin Authentication

Admin auth uses a separate admin model and admin middleware. Several routes import and use `adminauthenticate`, especially research paper creation, timeline updates, chapter creation/update, blog mutations, character mutations, and about timeline mutations.

### Role Checks

`roleCheck.js` exists for role-based access. The codebase currently imports role/admin middleware in places, but some routes are not consistently protected. See [Current Engineering Notes](#current-engineering-notes).

## File Upload And Media Handling

Uploads are handled with:

- Multer for parsing multipart form data.
- Memory storage for uploaded file buffers.
- AWS S3 SDK for object storage.

Flow:

1. Client sends multipart form data.
2. Multer receives files into memory.
3. Controller/service sends file buffer, filename, and content type to `uploadToS3`.
4. S3 stores the object using a timestamped key.
5. Backend stores the public S3 URL in MongoDB.

Media-heavy entities include:

- Comics: cover and banner images.
- Chapters: chapter image and PDF.
- Characters: main images, landscape images, power images, story/origin images.
- Blogs/news: images.
- Timelines/about pages: images.
- User uploads: profile/avatar image.

## Payments And Memberships

Payment integration is built around Razorpay.

Payment constants:

```js
UltimateKit: 1999
Monthly: 129
HalfYear: 599
Annual: 999
```

Payment flow:

1. Authenticated user selects a plan or product.
2. Frontend calls `/payment/create`.
3. Backend creates a Razorpay order using configured Razorpay credentials.
4. Payment record is stored with order details and user notes.
5. Client completes payment through Razorpay.
6. Backend verifies payment through `/payment/verify`.
7. User membership fields are updated, such as:
   - `hasInfinitoUltimate`
   - `infinitoUltimateTo`
   - `hasInfinitoUltimateKit`
   - `membershipType`

## Email Workflows

Nodemailer is configured with SMTP values from `.env`.

Current email use cases:

- Email verification/OTP.
- Forgot password reset email.

The reset email includes a reset link and expiry messaging. The code currently contains some old brand text (`Schedula`) in the email template; it should be updated to Infinito Comics before production use.

## End-To-End User Workflows

### Signup And Email Verification

1. User opens `/signup`.
2. User completes multi-step signup pages.
3. Frontend calls `/api/signup`.
4. Backend creates user and hashes password.
5. Verification code can be sent/checked through `/api/verifyemail`.
6. User becomes verified after successful code validation.

### Login

1. User opens `/login`.
2. Frontend calls `/api/login`.
3. Backend validates email/password.
4. Backend issues JWT/user data.
5. Frontend stores user state in Redux/localStorage.

### Password Reset

1. User requests reset from `/forgot-password`.
2. Frontend calls `/api/forget-password`.
3. Backend creates reset token/link and sends email.
4. User opens `/reset-password/:id/:token`.
5. Frontend submits new password to `/api/forget-password/:id/:token`.
6. Middleware verifies reset token.
7. Backend updates password.

### Browse Comics

1. User opens `/comics`.
2. Frontend calls `/comic`.
3. Backend returns comic documents.
4. User opens chapter route.
5. Frontend calls `/comicChap/:comicId/chapters`.
6. Chapter image/PDF URLs are rendered for reading.

### Manage Comics As Admin

1. Admin logs in through Admin app.
2. Admin creates comic with cover/banner upload.
3. Backend receives multipart form data.
4. Media goes to S3.
5. Comic metadata and S3 URLs are stored in MongoDB.
6. Public frontend displays the newly created comic.

### Manage Characters As Admin

1. Admin enters character data and uploads images.
2. Backend validates and stores the character.
3. Public character pages consume `/character/getAll` and `/character/get/:id`.
4. Character biography pages render origin, powers, story, and profile metadata.

### Publish Blog/News

1. Admin creates a blog/news entry.
2. Blog can be saved as draft or published.
3. Frontend consumes latest, foundation, IC, all, and by-ID blog endpoints.
4. News pages render the article/story blocks.

### Browse Research

1. User opens Research app.
2. Research app requests paper list from `/research-papers`.
3. User searches or opens a paper by ID.
4. Backend returns structured paper fields.
5. Research app renders paper content and metadata.

### Support Us

1. Authenticated user opens support page.
2. Frontend loads timeline/statistics.
3. User submits support data with token.
4. Backend stores support entry against the user.
5. Statistics endpoints aggregate visible support metrics.

## Environment Variables

### Backend `.env`

Create `backend/.env`:

```env
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/infinito-comics
JWT_SECRET_KEY=replace_with_secure_secret
JWT_EXPIRY_DATE=7d

FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
RESEARCH_URL=http://localhost:5175
FOUNDATION_URL=http://localhost:5176

ACCESS_KEY=your_aws_access_key
SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_bucket_name
AWS_REGION=ap-south-1

EMAIL_ID=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
SMTP_PORT=465
SMTP_SERVER=smtp.example.com
FORGET_PASSWORD_EXPIRY=10m

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key
```

### Main Frontend `.env`

Create `frontend/.env`:

```env
VITE_BASE_URL=http://localhost:3000
VITE_RESEARCH_BASE_URL=http://localhost:5175
VITE_FOUNDATION_BASE_URL=http://localhost:5176
VITE_FRONTEND_BASE_URL=http://localhost:5173
```

### Admin `.env`

Create `Admin/.env`:

```env
VITE_BASE_URL=http://localhost:3000
```

### Research `.env`

Create `Research/.env`:

```env
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

Note: Vite normally exposes only variables prefixed with `VITE_`. The current Research app reads `import.meta.env.BACKEND_URL` and `import.meta.env.FRONTEND_URL`. For Vite convention, consider renaming these to `VITE_BACKEND_URL` and `VITE_FRONTEND_URL` in code and env files.

### Foundation `.env`

Create `Foundation/.env`:

```env
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

The same Vite env-prefix note applies to Foundation if it reads unprefixed env values.

## Local Setup

Prerequisites:

- Node.js.
- npm.
- MongoDB running locally or a MongoDB Atlas connection string.
- Optional AWS S3 credentials for real uploads.
- Optional Razorpay credentials for payment testing.
- Optional SMTP credentials for real email sending.

Install dependencies:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ../Admin && npm install
cd ../Research && npm install
cd ../Foundation && npm install
```

Run backend:

```bash
cd backend
npm run dev
```

Run main frontend:

```bash
cd frontend
npm run dev
```

Run admin:

```bash
cd Admin
npm run dev
```

Run research:

```bash
cd Research
npm run dev
```

Run foundation:

```bash
cd Foundation
npm run dev
```

If all apps are run at the same time, Vite will assign available ports. Make sure the backend CORS origins in `backend/.env` match the actual client URLs.

## Build And Deployment

Build frontend apps:

```bash
cd frontend
npm run build

cd ../Admin
npm run build

cd ../Research
npm run build

cd ../Foundation
npm run build
```

Preview production builds:

```bash
npm run preview
```

Backend production start currently has only a development script:

```json
"dev": "nodemon src/index.js"
```

Recommended production script:

```json
"start": "node src/index.js"
```

Typical deployment model:

- Backend API: Render, Railway, AWS EC2, ECS, Elastic Beanstalk, Azure App Service, or similar.
- MongoDB: MongoDB Atlas.
- Static frontends: Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront, or any static host.
- Media: AWS S3, ideally behind CloudFront/CDN for production.
- Secrets: platform secret manager or environment variables.

## Scaling From 0 To 1

This project is already structured like a 0-to-1 platform: it has multiple experiences, shared APIs, content management, authentication, media, payments, and specialized brand surfaces. The next phase is making the architecture production-hardened.

### Phase 0: Prototype

Goal: Prove the product experience.

What exists:

- React pages and flows.
- Static assets.
- Public content pages.
- Admin dashboard.
- API endpoints.
- MongoDB schemas.
- File upload.
- Payment and email integrations.

### Phase 1: Stable MVP

Goal: Make the platform reliable enough for real users.

Required work:

- Standardize environment variables across apps.
- Add backend `start` script.
- Add route-level validation.
- Add consistent admin protection to all mutation endpoints.
- Fix duplicate routes and route typos.
- Replace old placeholder email branding.
- Add API error shape conventions.
- Add seed/admin bootstrap strategy.
- Add basic tests for auth, payments, uploads, and content CRUD.

### Phase 2: Content Operations

Goal: Let non-engineers run the platform safely.

Recommended work:

- Add admin roles and permissions.
- Add draft/publish scheduling.
- Add media library.
- Add blog/research/comic preview before publishing.
- Add audit logs for admin actions.
- Add soft delete for important content.
- Add content version history.

### Phase 3: Performance And Reliability

Goal: Handle growth.

Recommended work:

- Add pagination to list endpoints.
- Add indexes for common queries.
- Add CDN in front of uploaded assets.
- Add response compression and cache headers.
- Add rate limiting to auth, upload, and payment endpoints.
- Add structured logging.
- Add centralized error handling middleware.
- Add monitoring and uptime checks.

### Phase 4: Product Scale

Goal: Turn the platform into a mature comics ecosystem.

Recommended work:

- Add personalized user libraries.
- Add reading progress.
- Add favorites/watchlists.
- Add membership-gated chapters.
- Add creator/admin analytics.
- Add comment/community moderation.
- Add newsletter integration.
- Add search across comics, characters, blogs, and research.
- Add SSR/SEO support for public content pages if organic discovery becomes important.

### Phase 5: Engineering Scale

Goal: Make the codebase easier for a larger team.

Recommended work:

- Convert to a formal monorepo with npm workspaces, pnpm, Turborepo, or Nx.
- Share UI components across apps.
- Share API client types.
- Add TypeScript.
- Add OpenAPI documentation.
- Add CI checks.
- Add unit/integration/E2E tests.
- Add staging and production environments.
- Add database migration/seed strategy.

## Current Engineering Notes

These notes reflect the repository as it exists now.

1. The root `package.json` contains shared dependencies but no scripts. Each app has its own scripts.
2. Some apps use React 19 while Admin uses React 18.
3. Main frontend has some duplicate route definitions in `frontend/src/App.jsx`.
4. Some routes import admin authentication but do not enforce it consistently. For example, comic create/update/delete currently have admin auth comments but the active routes do not require admin authentication.
5. `blog-routes.js` defines `/getById/:id` twice, mapped to different controller methods.
6. Research/Foundation env constants read unprefixed Vite env variables, which may not work as expected in standard Vite builds.
7. The password reset email template still references `Schedula`; it should be changed to Infinito Comics.
8. The backend root response contains encoding artifacts in the rocket emoji text.
9. Payment webhook route is currently a GET endpoint; most payment providers send POST webhooks with signatures. This should be reviewed before production.
10. There is no central backend error handler yet.
11. There is no test suite currently visible in the repository.
12. There are development log files at the repository root (`frontend-dev.log`, `frontend-dev.err.log`) that are untracked.

## Recommended Next Improvements

### Security

- Enforce admin auth on all admin-only mutations.
- Add request validation with Zod, Joi, Yup, or express-validator.
- Add rate limiting for auth, password reset, uploads, and payments.
- Add input sanitization for rich text fields.
- Store JWTs with safer browser handling if possible.
- Add CORS checks per environment.
- Use signed/private S3 URLs if paid content must be protected.
- Verify Razorpay signatures server-side.

### Maintainability

- Add TypeScript gradually, starting with backend models/services and shared API types.
- Add OpenAPI/Swagger documentation.
- Normalize response formats:

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

- Normalize error formats:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

- Create shared API clients for repeated Axios patterns.
- Add route constants to reduce hard-coded endpoint strings.

### Database

- Add pagination to list endpoints.
- Add indexes for common filters/searches.
- Add soft-delete fields where content should be restorable.
- Review model references for consistency. For example, Payment references `"User"` while the user model is registered as `"Account"`.

### Frontend

- Remove duplicate routes.
- Add protected route handling where required.
- Move repeated page layout logic into shared components.
- Consider TanStack Query for data fetching, caching, retries, and loading/error states.
- Improve cross-app auth by moving from `window.postMessage` handoff to a more formal auth/session strategy if these apps are deployed on related domains.

### DevOps

- Add `.env.example` files for each app.
- Add production backend start script.
- Add lint/build CI workflow.
- Add deployment documentation per environment.
- Add logging and monitoring.

## Summary

Infinito Comics is a multi-surface digital comics platform with a public website, admin dashboard, research portal, foundation microsite, and Express/MongoDB backend. It supports the core needs of a growing entertainment IP: publishing comics and chapters, managing characters, sharing news, running memberships, accepting support, publishing research, presenting foundation initiatives, and operating content through an admin interface.

The current codebase is a strong 0-to-1 foundation. The next engineering priority is hardening it for production through consistent authorization, cleaner configuration, validation, tests, standard response formats, deployment scripts, and scalable data/API patterns.
