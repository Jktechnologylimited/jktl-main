"use client";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import type { Testimonial } from "@/hooks/useSiteContent";

// Static example testimonials -- no live API call. Swap for the useTestimonials()
// hook once the backend/content layer is reconnected.
const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "Their team delivered an amazing platform that transformed our online presence and increased our leads significantly.",
    author_name: "Example Client", author_role: "CEO", company: "Example Company",
    avatar_url: "", rating: 5,
  },
  {
    id: "2",
    quote: "Professional, responsive and highly skilled. Our new system looks great and performs even better.",
    author_name: "Example Client", author_role: "Managing Partner", company: "Example Co.",
    avatar_url: "", rating: 5,
  },
  {
    id: "3",
    quote: "Our operations have improved since we launched. The team was a pleasure to work with from start to finish.",
    author_name: "Example Client", author_role: "Founder", company: "Example Business",
    avatar_url: "", rating: 5,
  },
];

export default function HomeTestimonials() {
  return <TestimonialsCarousel testimonials={TESTIMONIALS} />;
}
