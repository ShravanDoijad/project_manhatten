// Home.jsx (or Home.jsx)

import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'animate.css/animate.min.css'; // Animate.css
import '../assets/css/Home.css'; // Your custom CSS (style.css)
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import handGirl from '../assets/Images/handgirl.jpg';
import flower from '../assets/Images/flower.jpg';
import back from '../assets/Images/back.jpg';
import cus1 from '../assets/Images/cus1.jpg';
import cus2 from '../assets/Images/cus2.jpg';
import cus3 from '../assets/Images/cus3.jpg';
import back1 from '../assets/Images/back1.jpg';
import ourCollection from '../assets/Images/ourcollection.jpg';
import img1 from '../assets/Images/img1.jpeg';
import img2 from '../assets/Images/img2.jpeg';
import img3 from '../assets/Images/img3.jpeg';
import img4 from '../assets/Images/img4.jpeg';
import product5 from '../assets/Images/product5.jpg';
import img6 from '../assets/Images/img6.jpg';
import aboutus from "../assets/Images/aboutus.jpg"
import webicon1 from '../assets/Images/webicon1.jpg';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    
        gsap.from('.craft-title', {
          opacity: 0,
          x: -100,
          duration: 1.5,
          scrollTrigger: {
            trigger: '.craft-title',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
    
        gsap.from('.btn-custom', {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: '.btn-custom',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
    
        gsap.from('.custom-card', {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: '.custom-card',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
    
        gsap.from('.img-custom', {
          
          y: 50,
          duration: 1.5,
          scrollTrigger: {
            trigger: '.img-custom',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
    
        gsap.from('.flower-overlay', {
          
          y: 50,
          duration: 1.5,
          scrollTrigger: {
            trigger: '.flower-overlay',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
    
        gsap.from('.marquee-text', {
          x: '100%',
          duration: 15,
          repeat: -1,
          ease: 'linear',
        });
    
        gsap.from('.product-card', {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.products-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
    
        gsap.from('.about-section h1, .about-section p, .about-list, .about-img', {
          opacity: 0,
          y: 50,
          duration: 1.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      }, []);
  return (
    <div className='relative w-full'>
     

      <div className="container-fluid img-fluid container-backimage pt-28">
        <main className="container">
          <section id="home">
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 mt-4 text-center">
                    <h2 className="craft-title wow animate__animated animate__fadeInLeft" data-wow-duration="1.5s">
                      <span className="text-head">Unleash Your Creativity With Handmade Craft</span>
                    </h2>
                    <p className="mt-3">
                      Discover the charm of handmade crafts, created with love by talented local artisans.
                      Each piece is unique, carrying a story of tradition, skill, and passion.
                      Support local artists and bring home something truly special!
                    </p>
                    <div className="btn-container">
                      <button className="btn btn-custom mt-3 wow animate__animated animate__fadeInUp" data-wow-delay="0.3s">
                        View Our Collection
                      </button>
                    </div>
                    <div className="card wow animate__animated animate__fadeInUp mt-4 p-3 custom-card">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <img src={back} className="img-fluid rounded card-img-custom" alt="Back Image" />
                        </div>
                        <div className="col-md-8 text-center">
                          <div className="customer-row">
                            <img src={cus1} className="customer-img" alt="Customer 1" />
                            <img src={cus2} className="customer-img" alt="Customer 2" />
                            <img src={cus3} className="customer-img" alt="Customer 3" />
                            <div className="add-more">+</div>
                          </div>
                          <h4 className="text-center mb-3">Our Happy Customers</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex flex-column align-items-center img-container">
                    <img src={handGirl} className="rounded-bottom img-fluid img-custom wow animate__animated animate__bounceInUp" data-wow-duration="1.5s" data-wow-delay="0s" alt="Hand Girl" />
                    <img src={flower} className="img-fluid flower-overlay wow animate__animated animate__bounceInUp" alt="Flower" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <div className="row marquee-container">
          <div className="col-12">
            <div className="marquee-text wow animate__animated animate__fadeInRight" data-wow-duration="2s">
              <span>✨ Creative Masterpiece ✨ Elegant Handmade ✨ Handmade Creation ✨</span>
            </div>
          </div>
        </div>
      </div>
      <section id="products" className="products-section">
        <h1 className="text-center craft-title mb-4 wow animate__animated animate__fadeInUp">Our Collection</h1>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="card product-card">
                <img src={img1} className="card-img-top wow animate__animated animate__fadeInUp" alt="Product 1" />
                <div className="card-body text-center">
                  <h5 className="card-title">Tagine Pot</h5>
                  <p className="card-text">Rs.289</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card product-card">
                <img src={img2} className="card-img-top wow animate__animated animate__fadeInUp" alt="Product 2" />
                <div className="card-body text-center">
                  <h5 className="card-title">Boho Decor</h5>
                  <p className="card-text">Rs.999</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card product-card">
                <img src={img3} className="card-img-top wow animate__animated animate__fadeInUp" alt="Product 3" />
                <div className="card-body text-center">
                  <h5 className="card-title">Canvas Bag</h5>
                  <p className="card-text">Rs.636</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card product-card">
                <img src={img4} className="card-img-top wow animate__animated animate__fadeInUp" alt="Product 4" />
                <div className="card-body text-center">
                  <h5 className="card-title">Handmade Pot</h5>
                  <p className="card-text">Rs.200</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card product-card">
                <img src={product5} className="card-img-top wow animate__animated animate__fadeInUp" alt="Product 5" />
                <div className="card-body text-center">
                  <h5 className="card-title">Handmade Craft</h5>
                  <p className="card-text">Rs.220</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card product-card">
                <img src={img6} className="card-img-top wow animate__animated animate__fadeInUp" alt="Product 6" />
                <div className="card-body text-center">
                  <h5 className="card-title">Handmade wall hanger</h5>
                  <p className="card-text">Rs.500</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button className="btn btn-dark see-more-btn">See More</button>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="about-section py-5">
        <div className="container">
          <h1 className="text-center craft-title mb-4 wow animate__animated animate__fadeInUp">About Us</h1>
          <div className="row">
            <div className="col-md-6 wow animate__animated animate__fadeInLeft" data-wow-duration="1.5s">
              <h1 className="text-center" style={{ color: 'rgb(122, 44, 44)' }}>Empowering Local Artisans, One Craft at a Time</h1>
              <p>
                ArtisanHaven is an online marketplace dedicated to showcasing and selling handmade products crafted by talented local artisans.
                We bridge the gap between skilled creators and customers who appreciate unique, high-quality craftsmanship.
              </p>
              <ul className="about-list">
                <li><strong>🌿 Handmade & Sustainable</strong><br /> Every item tells a story and supports sustainable practices.</li>
                <li><strong>🛍️ Unique Creations</strong><br /> Discover one-of-a-kind products made with love.</li>
                <li><strong>🤝 Supporting Artisans</strong> <br />Directly contribute to the livelihood of local craftsmen.</li>
              </ul>
            </div>
            <div className="col-md-6 text-center wow animate__animated animate__fadeInRight" data-wow-duration="1.5s">
              <img src={aboutus} className="img-fluid rounded about-img" alt="About Us" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;