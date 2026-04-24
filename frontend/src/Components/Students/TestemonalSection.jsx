import React from "react";
import { dummyTestimonial, assets } from "../../assets/assets";

const TestimonialSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">

      <h2 className="text-3xl font-medium text-gray-800">
        Testimonials
      </h2>

      <p className="md:text-base text-gray-500 mt-2">
        Hear from our learners as they share their journey of transformation,
        success, and how our platform has made a difference in their lives.
      </p>

      {/*  cards centered */}
      <div className="max-w-6xl mx-auto mt-14 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">

          {dummyTestimonial.map((testimonial, index) => {
            return (
              <div
                key={index}
                className="text-sm text-left border border-gray-300 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />

                  <div>
                    <h1 className="text-lg font-medium text-gray-700">
                      {testimonial.name}
                    </h1>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="px-5 pt-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        className="w-5 h-5"
                        src={
                          i < Math.floor(testimonial.rating)
                            ? assets.star
                            : assets.star_blank
                        }
                        alt="star rating"
                      />
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <p className="mt-4 px-5 text-gray-500 leading-relaxed">
                  {testimonial.feedback}
                </p>

                <a href="#" className="text-blue-500 underline px-5">Read more</a>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};

export default TestimonialSection;