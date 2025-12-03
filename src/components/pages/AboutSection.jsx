import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, Heart } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { number: '25', label: 'Years of Excellence', icon: <Star className="w-6 h-6" /> },
    { number: '150+', label: 'Luxury Rooms', icon: <Award className="w-6 h-6" /> },
    { number: '50k+', label: 'Happy Guests', icon: <Users className="w-6 h-6" /> },
    { number: '98%', label: 'Guest Satisfaction', icon: <Heart className="w-6 h-6" /> },
  ];

  const features = [
    '24/7 Luxury Concierge Service',
    'Award-Winning Spa & Wellness Center',
    'Michelin-Starred Restaurants',
    'Private Event Spaces',
    'Heated Infinity Pool',
    'State-of-the-Art Fitness Center',
  ];

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,169,126,0.05)_0%,transparent_50%)]"></div>
      </div>

      <div className="container-narrow relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-[600px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Luxury Hotel Interior"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Accent Image */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-luxury-gold/30 p-2 bg-black/50 backdrop-blur-xs">
                <img 
                  src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Hotel Detail"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -top-6 left-8 bg-luxury-gold text-black px-8 py-4">
                <div className="text-center">
                  <div className="text-4xl font-serif font-light">25</div>
                  <div className="text-xs tracking-widest uppercase">Years of Excellence</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section Title */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-luxury-gold"></div>
                <span className="text-luxury-gold text-sm tracking-widest uppercase font-light">
                  Our Story
                </span>
                <div className="h-px w-12 bg-luxury-gold"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-display-sm font-serif font-light mb-6">
                Where Luxury Meets
                <span className="block text-luxury-gold mt-2">Serenity</span>
              </h2>
              
              <p className="text-lg text-luxury-text-light mb-8 leading-relaxed font-light">
                Nestled in the heart of the city, Peaceful Hotel has been a beacon of luxury 
                and sophistication for over two decades. Our commitment to excellence, 
                attention to detail, and unparalleled service have made us a preferred 
                destination for discerning travelers worldwide.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-luxury-gold mt-2 flex-shrink-0"></div>
                  <span className="text-luxury-text-light">{feature}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="border-l-2 border-luxury-gold pl-6 py-4 my-8">
              <p className="text-xl font-serif italic text-luxury-text-light">
                "True luxury is not about extravagance, but about creating moments 
                that linger in memory long after the stay has ended."
              </p>
              <div className="mt-4">
                <div className="text-luxury-gold font-serif">Johnathan Wells</div>
                <div className="text-sm text-luxury-text-light">General Manager</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-luxury-gray-light">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-luxury-gold mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-serif font-light mb-1">{stat.number}</div>
                  <div className="text-xs text-luxury-text-light tracking-widest uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button className="btn-primary">
                Discover Our Story
              </button>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 pt-16 border-t border-luxury-gray-light"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-light mb-4">Guest Experiences</h3>
            <p className="text-luxury-text-light max-w-2xl mx-auto">
              Hear from our valued guests about their unforgettable stays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The attention to detail was extraordinary. Every aspect of our stay was perfect.",
                author: "Sarah Johnson",
                role: "Business Executive",
                rating: 5
              },
              {
                quote: "A truly transformative experience. The service redefined luxury for us.",
                author: "Michael Chen",
                role: "Travel Blogger",
                rating: 5
              },
              {
                quote: "From the spa to the dining, everything exceeded our expectations.",
                author: "Emma Rodriguez",
                role: "Honeymooner",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-luxury-gray/50 p-8 border border-luxury-gray-light">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-luxury-gold fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-luxury-text-light italic mb-6">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div>
                  <div className="text-luxury-gold font-serif">{testimonial.author}</div>
                  <div className="text-sm text-luxury-text-light">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Awards Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 pt-16 border-t border-luxury-gray-light"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-luxury-gold"></div>
              <span className="text-luxury-gold text-sm tracking-widest uppercase font-light">
                Awards & Recognition
              </span>
              <div className="h-px w-8 bg-luxury-gold"></div>
            </div>
            <h3 className="text-3xl font-serif font-light mb-4">Celebrating Excellence</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'Forbes Travel Guide', year: '2024' },
              { name: 'Travel + Leisure', year: '2023' },
              { name: 'Condé Nast', year: '2023' },
              { name: 'AAA Diamond', year: '2024' },
              { name: 'World Luxury', year: '2023' },
              { name: 'Hospitality Award', year: '2024' },
            ].map((award, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 border border-luxury-gold/30 mx-auto mb-4 flex items-center justify-center group-hover:border-luxury-gold transition-colors">
                  <Award className="w-8 h-8 text-luxury-gold/70 group-hover:text-luxury-gold transition-colors" />
                </div>
                <div className="text-sm text-luxury-gold mb-1">{award.name}</div>
                <div className="text-xs text-luxury-text-light">{award.year}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 border border-luxury-gold/10 -translate-x-32"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 border border-luxury-gold/5 translate-x-48"></div>
    </section>
  );
};

export default AboutSection;