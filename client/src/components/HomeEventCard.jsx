"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useState, useEffect } from "react";
function HomeEventCard() {
  const [events, setEvents] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const GetEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`, {
          method: 'GET',
          headers: {
            'Content-Type': "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const result = await response.json();
        setEvents(result);
      } catch (error) {
        console.error("There was an error:", error);
      }
    };

    GetEvents();
  }, []);



  const cards = events.map((event, index) => (
    <Card key={event.id} card={event} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Events by Code Cell RCOE
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p
              className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Join us for an exciting event hosted by Code Cell!
              </span>{" "}
              Discover new skills, engage in hands-on learning, and connect with like-minded peers. Our events range from tech talks and hackathons to workshops on the latest in tech.
            </p>
            <Image
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Event example image"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain" />
          </div>
        );
      })}
    </>
  );
};



export default HomeEventCard;
