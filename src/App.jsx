import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const LOGOS = [
  { name: 'Volkswagen', url: 'https://i.pinimg.com/736x/92/ae/d5/92aed5b705fadafe3a7d59cac0eca2dc.jpg' },
  { name: 'Samsung', url: 'https://i.pinimg.com/236x/49/55/f5/4955f570b6a593717a23b1bb20e38d98.jpg' },
  { name: 'Cisco', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
  { name: 'Vimeo', url: 'https://i.pinimg.com/236x/a5/be/37/a5be371df7f76ea443e7c904ba5cc8fc.jpg' },
  { name: 'P&G', url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg' },
  { name: 'Hewlett Packard Enterprise', url: 'https://i.pinimg.com/736x/f7/9e/02/f79e025b083a04b1554c5e540edc4ebf.jpg' },
  { name: 'Citi', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Citi.svg' },
  { name: 'Ericsson', url: 'https://i.pinimg.com/236x/6d/3c/37/6d3c37830bf484ba4675fe394f27fc0b.jpg' },
];

const SKILL_CAROUSEL_ITEMS = [
  { id: 1, title: 'Large Language Models', image: 'https://i.pinimg.com/236x/99/99/ba/9999baf792bd2abab3c27a14a9bbe42d.jpg' },
  { id: 2, title: 'Machine Learning', image: 'https://i.pinimg.com/736x/f3/27/bc/f327bc505f6d7e19a2b8ca4cdeb24650.jpg' },
  { id: 3, title: 'AI Agents', image: 'https://i.pinimg.com/1200x/a9/3c/3d/a93c3d8df3f4a22c4c6c9e01b5980d43.jpg' },
  { id: 4, title: 'Prompt Engineering', image: 'https://i.pinimg.com/1200x/42/97/8d/42978d2d8fca786df2318764ffc17871.jpg' },
  { id: 5, title: 'Microsoft Excel', image: 'https://i.pinimg.com/1200x/91/5d/0f/915d0f38018317c72ffee2ce09a7b621.jpg' }
];

const CATEGORIES = [
  { id: '1', name: 'Development', icon: '💻', count: '1,240 Courses' },
  { id: '2', name: 'Design & UX', icon: '🎨', count: '850 Courses' },
  { id: '3', name: 'AI & Data Science', icon: '🤖', count: '620 Courses' },
  { id: '4', name: 'Business', icon: '📈', count: '940 Courses' },
  { id: '5', name: 'Photography', icon: '📷', count: '410 Courses' },
  { id: '6', name: 'Marketing', icon: '🎯', count: '530 Courses' }
];

const BEST_SELLERS = [
  {
    id: 'bs1',
    title: 'Complete Web Development Bootcamp 2026',
    instructor: 'Dr. Angela Yu',
    rating: 4.8,
    reviews: '12,450',
    price: 89.99,
    originalPrice: 129.99,
    badge: 'Bestseller',
    image: 'https://i.pinimg.com/736x/ac/1f/82/ac1f82f0a5eb5a9bb629c5ab65bf0762.jpg'
  },
  {
    id: 'bs2',
    title: 'UI/UX Design Specialization: Figma to Code',
    instructor: 'Sarah Jenkins',
    rating: 4.9,
    reviews: '8,320',
    price: 69.99,
    originalPrice: 99.99,
    badge: 'Bestseller',
    image: 'https://i.pinimg.com/1200x/62/29/f6/6229f6df8b4d5941132c7f19db9e460b.jpg'
  },
  {
    id: 'bs3',
    title: 'Data Science & Machine Learning Masterclass',
    instructor: 'Prof. Michael Chen',
    rating: 4.7,
    reviews: '5,120',
    price: 94.99,
    originalPrice: 149.99,
    badge: 'Popular',
    image: 'https://i.pinimg.com/736x/51/f2/33/51f233f4e9ceab328fda4882eb6457ad.jpg'
  }
];

const NEW_ARRIVALS = [
  {
    id: 'na1',
    title: 'Generative AI & LLM Engineering with Python',
    instructor: 'Alex Rivera',
    rating: 5.0,
    reviews: '340',
    price: 79.99,
    originalPrice: 119.99,
    badge: 'NEW',
    image: 'https://i.pinimg.com/1200x/17/3e/e0/173ee0eb290de65a6797e654d3040586.jpg'
  },
  {
    id: 'na2',
    title: 'Modern Next.js 15 & React Server Components',
    instructor: 'David Miller',
    rating: 4.9,
    reviews: '510',
    price: 64.99,
    originalPrice: 89.99,
    badge: 'NEW',
    image: 'https://i.pinimg.com/736x/44/7a/27/447a275f0c8f2208de4b49eb45d96adc.jpg'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Shana',
    role: 'Frontend Developer @ TechCorp',
    comment: 'e-learn helped me switch careers in just 6 months. The interactive project modules are amazing!',
    avatar: 'https://i.pinimg.com/736x/0a/d1/93/0ad19309a59be71b028548801ac38353.jpg'
  },
  {
    id: 2,
    name: 'Vicky',
    role: 'Product Designer',
    comment: 'The quality of instructors on e-learn is superior to traditional platforms. Worth every penny.',
    avatar: 'https://i.pinimg.com/736x/0e/db/f3/0edbf38c0d27da9b9dd4cf8a95c850b7.jpg'
  }
];

const FAQS = [
  {
    q: 'How long do I get access to enrolled courses?',
    a: 'You get lifetime access to all purchased courses including future updates and downloadable resources.'
  },
  {
    q: 'Is there a money-back guarantee?',
    a: 'Yes, we offer a 30-day full refund guarantee if you are not satisfied with your purchase.'
  },
  {
    q: 'Do I get a certificate upon completion?',
    a: 'Yes, every completed course includes a verifiable digital certificate to share on LinkedIn or resumes.'
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.log('Autoplay error:', err));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-visible');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.aos-left-slide, .aos-right-slide, .aos-zoom, .aos-up');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const addToCart = (item) => {
    if (!cart.some((c) => c.id === item.id)) {
      setCart([...cart, item]);
      alert(`${item.title} added to cart!`);
    } else {
      alert('Item is already in your cart.');
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) return;

    const extractedName = signInEmail.split('@')[0];
    setUserName(extractedName.charAt(0).toUpperCase() + extractedName.slice(1));
    setIsLoggedIn(true);
    setIsSignInOpen(false);
    setSignInEmail('');
    setSignInPassword('');
    alert('Signed in successfully!');
  };

  const maxIndex = SKILL_CAROUSEL_ITEMS.length - 1;

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxIndex ? maxIndex : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  return (
    <div className="elearn-app">
      {/* 1. NAVBAR */}
      <nav className="navbar">
        <div className="container nav-flex">
          <div className="brand"> e-learn</div>
          
          <div className="nav-search">
            <input type="text" placeholder="Search for courses, skills..." />
          </div>

          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#categories" onClick={() => setIsMobileMenuOpen(false)}>Categories</a>
            <a href="#bestsellers" onClick={() => setIsMobileMenuOpen(false)}>Courses</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <button className="cart-btn">🛒 Cart ({cart.length})</button>
            {isLoggedIn ? (
              <span className="user-greeting">Hi, {userName}</span>
            ) : (
              <button className="login-btn" onClick={() => { setIsSignInOpen(true); setIsMobileMenuOpen(false); }}>
                Sign In
              </button>
            )}
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* SIGN IN MODAL */}
      {isSignInOpen && (
        <div className="modal-overlay" onClick={() => setIsSignInOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsSignInOpen(false)}>✕</button>
            <h2>Log in to your e-learn account</h2>
            <form onSubmit={handleSignInSubmit} className="signin-form">
              <label>
                Email
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="Enter password"
                  value={signInPassword}
                  onChange={(e) => setsignInPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="btn-primary signin-submit-btn">Log In</button>
            </form>
            <p className="modal-footer-text">
              Don't have an account? <a href="#signup" onClick={(e) => { e.preventDefault(); alert('Redirecting to Sign Up'); }}>Sign up</a>
            </p>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text aos-left-slide">
            <span className="hero-tag">Up to 40% Off</span>
            <h1>Master In-Demand Skills With e-learn</h1>
            <p>Access over 10,000+ interactive video courses taught by world-class industry professionals.</p>
            <div className="hero-actions">
              <a href="#bestsellers" className="btn-primary">Explore Courses</a>
              <a href="#about" className="btn-secondary">Learn More</a>
            </div>
          </div>

          <div className="hero-video-wrapper aos-right-slide">
            <video
              ref={videoRef}
              className="hero-video"
              autoPlay
              loop
              muted
              playsInline
              src="video1.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* UDEMY-STYLE SKILL CAROUSEL SECTION */}
      <section className="udemy-carousel-section section">
        <div className="container">
          <div className="udemy-carousel-wrapper">
            <div className="udemy-carousel-intro aos-left-slide">
              <h2>Learn essential career and life skills</h2>
              <p>e-learn helps you build in-demand skills fast and advance your career in a changing job market[cite: 2].</p>
            </div>

            <div className="udemy-slider-container aos-right-slide">
              <div 
                className="udemy-slider-track" 
                style={{ transform: `translateX(-${carouselIndex * 280}px)` }}
              >
                {SKILL_CAROUSEL_ITEMS.map((item) => (
                  <div className="udemy-card" key={item.id}>
                    <div className="udemy-card-img">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="udemy-card-footer">
                      <h3>{item.title}</h3>
                      <span className="arrow-icon">→</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="udemy-slider-controls">
                <button className="slider-arrow-btn" onClick={prevSlide} disabled={carouselIndex === 0}>‹</button>
             <div className="slider-pagination-dots">
  {[0, 1, 2, 3,4].map((dotIndex) => (
    <span 
      key={dotIndex} 
      className={`dot-pill ${carouselIndex === dotIndex ? 'active' : ''}`}
      onClick={() => setCarouselIndex(dotIndex)}
    ></span>
  ))}
</div>
                <button className="slider-arrow-btn" onClick={nextSlide} disabled={carouselIndex >= maxIndex}>›</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="section" id="categories">
        <div className="container">
          <h2 className="section-title aos-up">Shop by Category</h2>
          <div className="category-grid">
            {CATEGORIES.map((cat, idx) => (
              <div key={cat.id} className={`category-card hover-card {idx % 2 === 0 ? 'aos-zoom' : 'aos-up'}`}>
                <span className="cat-icon">{cat.icon}</span>
                <h3>{cat.name}</h3>
                <p>{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST-SELLING PRODUCTS */}
      <section className="section bg-light" id="bestsellers">
        <div className="container">
          <h2 className="section-title aos-up">Best-Selling Courses</h2>
          <div className="products-grid">
            {BEST_SELLERS.map((course, idx) => (
              <div key={course.id} className={`product-card hover-card ${idx === 0 ? 'aos-left-slide' : idx === 1 ? 'aos-zoom' : 'aos-right-slide'}`}>
                <div className="img-wrapper">
                  <img src={course.image} alt={course.title} />
                  <span className="badge">{course.badge}</span>
                </div>
                <div className="card-content">
                  <h3>{course.title}</h3>
                  <p className="instructor">By {course.instructor}</p>
                  <div className="rating"> {course.rating} ({course.reviews})</div>
                  <div className="price-row">
                    <span className="price">₹{course.price}</span>
                    <span className="old-price">₹{course.originalPrice}</span>
                  </div>
                  <button className="btn-add" onClick={() => addToCart(course)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="section">
        <div className="container">
          <h2 className="section-title aos-up">New Arrivals</h2>
          <div className="products-grid">
            {NEW_ARRIVALS.map((course, idx) => (
              <div key={course.id} className={`product-card hover-card ${idx % 2 === 0 ? 'aos-left-slide' : 'aos-right-slide'}`}>
                <div className="img-wrapper">
                  <img src={course.image} alt={course.title} />
                  <span className="badge new-badge">{course.badge}</span>
                </div>
                <div className="card-content">
                  <h3>{course.title}</h3>
                  <p className="instructor">By {course.instructor}</p>
                  <div className="rating"> {course.rating} ({course.reviews})</div>
                  <div className="price-row">
                    <span className="price">₹{course.price}</span>
                    <span className="old-price">₹{course.originalPrice}</span>
                  </div>
                  <button className="btn-add" onClick={() => addToCart(course)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED COLLECTIONS */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title aos-up">Featured Skill Bundles</h2>
          <div className="collections-grid">
            <div className="collection-card col-1 hover-card aos-left-slide">
              <h3>Full-Stack Web Mastery Bundle</h3>
              <p>5 Courses • 120 Hours of Content</p>
              <button className="btn-secondary">Explore Bundle</button>
            </div>
            <div className="collection-card col-2 hover-card aos-right-slide">
              <h3>AI & Machine Learning Career Path</h3>
              <p>4 Courses • Hands-on Projects</p>
              <button className="btn-secondary">Explore Bundle</button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROMOTIONAL BANNER */}
      <section className="promo-banner aos-zoom">
        <div className="container text-center">
          <h2>Limited Time Offer: Extra 20% Off All Courses</h2>
          <p>Use Coupon Code: <strong>ELEARN20</strong> at checkout</p>
        </div>
      </section>

      {/* 8. ABOUT OUR BRAND */}
      <section className="section" id="about">
        <div className="container brand-grid">
          <div className="brand-text aos-left-slide">
            <h2>About e-learn</h2>
            <p>We are dedicated to revolutionizing online education. e-learn delivers world-class interactive curricula directly to learners worldwide, building pathways to top tech careers.</p>
          </div>
          <div className="brand-stats aos-right-slide">
            <div className="stat-box"><strong>50M+</strong> <span>Students Enrolled</span></div>
            <div className="stat-box"><strong>10,000+</strong> <span>Expert Mentors</span></div>
            <div className="stat-box"><strong>180+</strong> <span>Countries Reached</span></div>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title aos-up">Why Learn With e-learn</h2>
          <div className="features-grid">
            <div className="feature-item hover-card aos-left-slide">
              <span>🎯</span>
              <h4>Learn at Your Pace</h4>
              <p>Lifetime access to video lectures and downloadable resources.</p>
            </div>
            <div className="feature-item hover-card aos-zoom">
              <span>👨‍🏫</span>
              <h4>Expert Instructors</h4>
              <p>Taught by real-world professionals and industry leaders.</p>
            </div>
            <div className="feature-item hover-card aos-zoom">
              <span>📜</span>
              <h4>Certificates</h4>
              <p>Earn shareable certificates upon course completion.</p>
            </div>
            <div className="feature-item hover-card aos-right-slide">
              <span>🛡️</span>
              <h4>Money-Back Guarantee</h4>
              <p>30-day refund window if you are not fully satisfied.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED COMPANIES INFINITE MARQUEE */}
      <section className="trusted-section aos-up">
        <div className="trusted-header">
          Trusted by over 17,000 companies and millions of learners around the world{' '}
          <a href="#business" className="business-link">Try e-learn Business →</a>
        </div>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...LOGOS, ...LOGOS].map((logo, index) => (
              <div className="logo-item" key={index}>
                <img src={logo.url} alt={logo.name} title={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PRODUCT HIGHLIGHTS */}
      <section className="section">
        <div className="container highlight-grid">
          <img src="https://i.pinimg.com/1200x/a0/ef/84/a0ef84603f9da5af7973a6715c54e3cf.jpg" alt="Highlight" className="aos-left-slide highlight-img" />
          <div className="aos-right-slide">
            <h2>Interactive Hands-On Learning</h2>
            <p>Every course features coding sandboxes, quizzes, and portfolio milestone projects to cement your practical mastery.</p>
            <p>Elearning content types
Varied formats and methods for delivering engaging and effective eLearning experiences
 
AI Overview

Like

Dislike
E-learning content encompasses digital materials like videos, quizzes, interactive modules, and simulations designed to engage learners and achieve specific learning outcomes.</p>
          </div>
        </div>
      </section>

      {/* 11. CUSTOMER REVIEWS */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title aos-up">What Our Students Say</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, idx) => (
              <div key={t.id} className={`testimonial-card hover-card ${idx === 0 ? 'aos-left-slide' : 'aos-right-slide'}`}>
                <p className="testimonial-comment">"{t.comment}"</p>
                <div className="user-info">
                  <img src={t.avatar} alt={t.name} className="user-avatar" />
                  <div className="user-details">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. SPECIAL OFFERS */}
      <section className="section">
        <div className="container text-center aos-zoom">
          <h2 className="section-title">Student & Team Discounts</h2>
          <p className="sub-heading">Get up to 50% off for verified university students or corporate enterprise licenses.</p>
        </div>
      </section>

      {/* 13. SOCIAL GALLERY */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title aos-up">Community Highlights</h2>
          <div className="social-grid">
            <img src="https://i.pinimg.com/736x/3c/f6/f5/3cf6f59c8294f723b34f357b77238ba8.jpg" alt="Social 1" className="hover-img aos-left-slide" />
            <img src="https://i.pinimg.com/736x/88/87/c0/8887c0522cf4f589a4c80d066bede148.jpg" alt="Social 2" className="hover-img aos-zoom" />
            <img src="https://i.pinimg.com/736x/4f/83/21/4f83217cd1c209fb010f1e2b07457adf.jpg" alt="Social 3" className="hover-img aos-zoom" />
            <img src="https://i.pinimg.com/736x/cf/b0/9a/cfb09a0b91b994480fb2f99c39a9a783.jpg" alt="Social 4" className="hover-img aos-right-slide" />
          </div>
        </div>
      </section>

      {/* 14. NEWSLETTER SUBSCRIPTION */}
      <section className="newsletter-section aos-up">
        <div className="container text-center">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest course releases, exclusive discounts, and tech insights sent directly to your inbox.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); setNewsletterEmail(''); }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>

      {/* 15. FAQ SECTION */}
      <section className="section" id="faq">
        <div className="container">
          <h2 className="section-title aos-up">Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item hover-card aos-zoom ${openFaq === idx ? 'faq-active' : ''}`} 
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && <p className="faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. CONTACT US */}
      <section className="section bg-light" id="contact">
        <div className="container">
          <h2 className="section-title aos-up">Contact Us</h2>
          <form className="contact-form aos-zoom" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="4" placeholder="Your Message" required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* 17. FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col aos-left-slide">
            <h3>🎓 e-learn</h3>
            <p>Empowering learners globally with world-class education.</p>
          </div>
          <div className="footer-col aos-up">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#categories">Categories</a></li>
              <li><a href="#bestsellers">Courses</a></li>
            </ul>
          </div>
          <div className="footer-col aos-right-slide">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>© 2026 e-learn, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}