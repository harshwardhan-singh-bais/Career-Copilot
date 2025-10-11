# Career Copilot - Premium Frontend

A visually premium, fully responsive frontend prototype for Career Copilot featuring glassmorphism design, smooth micro-interactions, and elegant gradients. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Design Features

- **Glassmorphism UI** with transparent glass cards and backdrop blur effects
- **Premium Gradients** with purple-to-blue primary gradient theme
- **Smooth Animations** powered by Framer Motion with custom easing
- **Responsive Design** with mobile-first approach and collapsible sidebar
- **Accessibility** compliant with ARIA labels, keyboard navigation, and proper focus management

## 🚀 Live Demo

The application is now running at [http://localhost:3000](http://localhost:3000)

## 📋 How to Demo

1. **Upload a sample resume** (Resume Analyzer)
   - Go to Resume Analyzer page
   - Drag & drop any PDF or DOCX file (mock upload)
   - View detailed analysis with strengths, improvements, and keyword suggestions

2. **Test job matching** (Job Match Scorer)
   - Paste any job description into the input field
   - Click "Calculate Match"
   - See animated match score ring and detailed insights

3. **Generate cover letter** (Cover Letter Generator)
   - Enter job details or use quick templates
   - Click "Generate Cover Letter"
   - Watch live typing animation and copy the result

## 🧱 Key Components

### Core UI Components
- **GlassCard** - Primary building block with glassmorphism effect
- **GradientButton** - Buttons with gradient backgrounds and animations
- **UploadBox** - Drag & drop file upload with preview
- **TextInput/Textarea** - Form inputs with glass styling
- **Toast** - Notification system with animations

### Specialized Components
- **ResultBox** - Displays AI output with typing animation and copy functionality
- **MatchScoreRing** - Circular progress ring for job match scores
- **Navbar** - Top navigation with logo and user menu
- **Sidebar** - Floating navigation sidebar with route highlighting
- **Footer** - Minimal footer with branding

### Pages
- **Dashboard** - Overview with utility cards and demo instructions
- **Resume Analyzer** - File upload and analysis results
- **Job Match Scorer** - Job description input and match scoring
- **Cover Letter Generator** - AI-powered cover letter creation

## 🎯 Design Tokens

### Colors
- **bg-1**: `#0a0a0f` (primary background)
- **bg-2**: `#14141c` (secondary background)
- **primary-gradient**: `linear-gradient(90deg,#7C3AED 0%,#4F46E5 100%)`
- **accent**: `#A78BFA` (glow effects)
- **text**: `#E5E7EB` (primary text)
- **muted-text**: `#9CA3AF` (secondary text)

### Typography
- **Font**: Geist (primary), fallbacks: Inter, system-ui
- **Sizes**: h1: 36px, h2: 28px, h3: 20px, body: 16px, small: 13px

### Animations
- **fast**: 180ms cubic-bezier(.2,.9,.2,1)
- **medium**: 320ms cubic-bezier(.2,.9,.2,1)
- **slow**: 520ms cubic-bezier(.2,.9,.2,1)

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful icon library
- **clsx & tailwind-merge** - Utility functions for className management

## 📱 Responsive Breakpoints

- **Mobile**: <640px - Sidebar becomes hamburger menu
- **Tablet**: >=640px - Collapsible sidebar, two-column layouts
- **Desktop**: >=1024px - Full sidebar visible, optimized layouts
- **XL**: >=1440px - Wide screen optimizations

## ♿ Accessibility Features

- **Keyboard Navigation** - All interactive elements are keyboard accessible
- **Screen Reader Support** - Proper ARIA labels and live regions
- **Focus Management** - Visible focus indicators and logical tab order
- **Color Contrast** - AA compliant text contrast ratios
- **Semantic HTML** - Proper heading hierarchy and landmark elements

## 🎭 Mock Data

The application uses realistic mock data for demonstrations:

- **Resume Analysis**: Structured feedback with strengths, improvements, and keywords
- **Job Matching**: 72% match score with detailed insights and recommendations
- **Cover Letter**: Professional template with personalization
- **All interactions** trigger appropriate toast notifications

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── ui/                # Reusable UI components
│   ├── pages/             # Page-specific components
│   ├── layout.tsx         # Main layout wrapper
│   └── animated-background.tsx
├── lib/
│   └── utils.ts           # Utility functions
└── globals.css            # Global styles and design tokens
```

## 🌟 Key Features

- ✅ **Production-grade visuals** with glassmorphism and premium gradients
- ✅ **Smooth micro-interactions** with Framer Motion animations
- ✅ **Fully responsive** mobile-first design
- ✅ **Accessible** with proper ARIA labels and keyboard navigation
- ✅ **Type-safe** with TypeScript throughout
- ✅ **Mock data integration** with realistic user flows
- ✅ **Performance optimized** with Next.js and Tailwind CSS
- ✅ **Componentized architecture** for easy backend integration

---

**Built with ❤️ by Career Copilot**
