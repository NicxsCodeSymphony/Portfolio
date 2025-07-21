# Portfolio - Nico's Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 15 and React 19, showcasing professional experience, projects, and technical skills with smooth animations and a clean design.

## 🎯 Preview

This portfolio features a comprehensive showcase of Nico's professional journey, including:

- **Hero Section**: Personal introduction with 3+ years work experience
- **Tech Stack**: Dynamic display of technical skills and technologies
- **About**: Personal background and expertise
- **Work Experience**: Professional career highlights
- **Projects**: Showcase of notable projects and achievements
- **Testimonials**: Client and colleague feedback
- **Contact**: Easy-to-reach contact information

**Email**: nicxsician@gmail.com  
**Education**: Graduated Magna Cum Laude - Top 3 Overall

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Optimized for all device sizes
- **Interactive**: Scroll-triggered animations using Framer Motion
- **Fast Performance**: Built with Next.js 15 and React 19
- **Type Safe**: Full TypeScript implementation
- **API Integration**: Dynamic content loading with Axios
- **User Experience**: Back-to-top button and smooth navigation

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### Additional Tools

- **Axios** - HTTP client for API requests
- **React Icons** - Icon library
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
Portfolio/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── BackToTopButton.tsx
│   │   ├── Navbar.tsx
│   │   └── ScrollAnimation.tsx
│   ├── section/            # Main page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Work.tsx
│   │   ├── Project.tsx
│   │   ├── Testimonial.tsx
│   │   ├── Contact.tsx
│   │   └── Stacks.tsx
│   ├── services/           # API service functions
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── interfaces/         # TypeScript interfaces
├── assets/                 # Images and static assets
└── public/                 # Public static files
```

## 🎨 Key Sections

### Hero Section

- Personal introduction and branding
- Professional experience highlight (3+ years)
- Contact information display
- Graduate achievements (Magna Cum Laude)

### Tech Stack

- Dynamic technology showcase
- Color-coded skill indicators
- API-driven content updates

### Work Experience

- Professional career timeline
- Project highlights and achievements
- Skills and technologies used

### Projects

- Portfolio of notable projects
- Detailed project descriptions
- Technology implementations

### Testimonials

- Client and colleague feedback
- Professional recommendations
- Career validation

## 🔧 Customization

The portfolio is designed to be easily customizable:

- Update personal information in the Hero section
- Modify tech stack in `app/utils/stack.ts`
- Add new sections in the `app/section/` directory
- Customize colors and styling with Tailwind CSS

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile devices
- Various screen sizes and orientations

## ⚡ Performance Features

- **Next.js 15**: Latest optimizations and App Router
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loads
- **TypeScript**: Type safety and better development experience
- **Turbopack**: Fast development server

## 📄 License

This project is personal portfolio website. All rights reserved.

---

Built with ❤️ by Nico using modern web technologies
