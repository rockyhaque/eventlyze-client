# Eventlyze – Your Non Stop Event Planing Platform

This repository contains the frontend for the **Eventlyze - Event Planner & Participation System**, a secure and intuitive web platform designed for creating, managing, and participating in public and private events with optional registration fees. Built with Next.js and Tailwind CSS, the frontend provides a responsive, user-friendly interface that integrates seamlessly with the backend API to deliver a comprehensive event management experience.

**Live Link** ➡️ [https://eventlyze.vercel.app](https://eventlyze.vercel.app)

**Server Link** ➡️ [https://eventlyze-server.vercel.app](https://eventlyze-server.vercel.app)

**Backend Repository** ➡️ [https://github.com/rockyhaque/eventlyze-server](https://github.com/rockyhaque/eventlyze-server)

## `Code Storm` Team  Members

| 💼 Name              | 🆔 Student ID   | 📧 Email                                     |
|----------------------|----------------|----------------------------------------------|
| Md Rashed Ali        | `WEB8 - 3007`  | [tutorial.rashed@gmail.com](mailto:tutorial.rashed@gmail.com) |
| OMAR FARUK           | `WEB9 - 2616`  | [faruk2059@gmail.com](mailto:faruk2059@gmail.com) |
| Rasibul Islam        | `WEB8 - 1136`  | [rasibul179@gmail.com](mailto:rasibul179@gmail.com) |
| Md Nahiduzzaman      | `WEB9 - 4276`  | [nahiduzzaman964@gmail.com](mailto:nahiduzzaman964@gmail.com) |
| Md Sakib Al Hasan    | `WEB4 - 2247`  | [mdsakibalhasanprogrammer1@gmail.com](mailto:mdsakibalhasanprogrammer1@gmail.com) |
| MD Sohel Rana        | `WEB8 - 2867`  | [ranaot56@gmail.com](mailto:ranaot56@gmail.com) |
| Rakibul Haq Roky     | `WEB8 - 3916`  | [rockyhaque71@gmail.com](mailto:rockyhaque71@gmail.com) |

### Admin Credentials

**Email:** 
```
admin@gmail.com
```

**Password:**
```
admin123
```


🛠 **Tech Stack**

- **Next.js** – React Framework for Server-Side Rendering and Static Site Generation
- **Tailwind CSS** – Utility-First Styling Framework
- **Framer Motion** – Visual Animation 
- **Axios** – HTTP Client for API Communication
- **React Query** – Efficient Data Fetching and State Management
- **JWT** – Client-Side Authentication Handling
- **Vercel** – Deployment Platform

📦 **Features**

- **Responsive User Interface**:

  - Global navigation bar with links to Home, Events, Login/Signup, and Dashboard for seamless access.
  - Mobile-friendly design with adaptive layouts for desktops, tablets, and smartphones.
  - Accessible footer with links to About, Contact, Privacy Policy, and FAQ pages.

- **Event Discovery and Browsing**:

  - Homepage hero section highlighting an admin-selected featured event.
  - Interactive slider showcasing up to nine upcoming public events, with badges indicating free or paid status.
  - Events page with advanced filtering options (Public Free, Public Paid, Private Free, Private Paid) and a search bar for querying by event title or organizer.

- **Event Management**:

  - Create events with customizable fields: title, date/time, venue/link, description, visibility (public/private), and optional registration fee.
  - Edit or delete owned events with real-time updates reflected across the platform.
  - View payment statuses for paid events, including pending and completed transactions.

- **Participation Workflows**:

  - **Public Free Events**: Instant join functionality with automatic acceptance.
  - **Public Paid Events**: Integrated payment flow (via SSLCommerz/ShurjoPay) with pending approval status post-payment.
  - **Private Free Events**: Request-to-join feature with host approval required.
  - **Private Paid Events**: Request-to-join with payment processing, pending host approval.
  - **Invitations**: Hosts can send direct invitations to registered users; invitees receive dashboard notifications with a "Pay & Accept" option for paid events.

- **Participant Management**:

  - Hosts can approve or reject join requests for private or paid events.
  - Ban attendees from events to maintain community standards.
  - View participant lists with status indicators (approved, pending, banned).

- **User Dashboard**:

  - **My Events**: List of owned events with options for CRUD operations and participant management.
  - **Pending Invitations**: Accept or decline event invitations, with refund logic for paid events.
  - **My Reviews**: Write, edit, or delete event reviews within the post-event review period.
  - **Settings**: Update profile details, manage notification preferences, and configure account settings.

- **Reviews and Ratings**:
  - Post-event review system allowing attendees to rate and provide feedback.
  - Display of aggregated ratings and reviews on event details pages.
  - Edit- **Admin Controls**:
  - Moderation tools to monitor and delete inappropriate events or user accounts.
  - Admin dashboard with site-wide oversight, including event and user activity logs.

📁 **Project Setup**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rockyhaque/eventlyze-client.git
   cd event-planner-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**  
    Create a `.env` file in the root directory. Refer to `.env.example` for guidance:

   ```
   NEXT_PUBLIC_API_URL=https://event-planner-server.render.com
   NEXT_PUBLIC_PAYMENT_GATEWAY_PUBLIC_KEY=your_payment_gateway_public_key
   ```

   Refer to `.env.example` for additional configuration options.

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   The app will run at `http://localhost:3000`.

5. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

📋 **Additional Notes**

- **Testing**: Use the following admin credentials to test admin features:
  - **Email**: admin@eventplanner.com
  - **Password**: Admin123!
- **Deployment**: Deployed on Vercel. Configure environment variables in Vercel’s dashboard for production.
- **Styling**: Tailwind CSS is used for rapid, utility-first styling. Customize the `tailwind.config.js` file for additional theming.
- **Linting & Formatting**: ESLint and Prettier are configured for code consistency. Run `npm run lint` to check for issues.

📬 **Contact**  
For issues or inquiries, reach out to [Team Eventlyze](mailto:rockyhaque71@gmail.com). Thank you 💜
