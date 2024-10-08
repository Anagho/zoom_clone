'use client'

import MeetingTypeList from "@/components/MeetingTypeList";
import { useHasUpcomingMeeting } from "@/hooks/useHasUpcomingMeeting";
import { useEffect, useState } from "react";

const Home = () => {
  // Initial time and date when the component first mounts
  const initialTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const initialDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date());

  // State variables to store the current time and date
  const [time, setTime] = useState(initialTime);
  const [date, setDate] = useState(initialDate);

  // Using the custom hook to check for upcoming meetings
  const { hasUpcomingMeeting, isLoading, nextMeetingTime } =
    useHasUpcomingMeeting();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now)
      );
      console.log("Time Updated:", now); // Debugging line
    };

    // Initial update
    updateDateTime();

    // Update time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            {hasUpcomingMeeting
              ? `Upcoming Meeting at: ${nextMeetingTime}`
              : "No Upcoming Meetings"}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
