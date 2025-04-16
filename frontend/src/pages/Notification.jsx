import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import profile from "../assets/Images/Admin.png";
const Notification = () => {
  const [notification, setnotification] = useState([]);

  const getNotification = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/products/getNotification",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setnotification(data.notifications);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getNotification();
  }, []);

  if (!notification) {
    return (
      <div className="w-full font-medium text-center">
        No Notification Found
      </div>
    );
  }

  return (
    <div className="w-full ml-4 min-h-screen bg-[#F5E5D6]">
      <div className=" flex items-center gap-2 poppins-medium text-2xl">
        <Bell />
        Notification
      </div>
      <div className="flex flex-col gap-y-4 mt-10">
        {notification.map((item, index) => {
          return (
            <div
              className="w-full relative flex items-center gap-3 h-20 shadow-md bg-[#eee] group px-10"
              key={index}
            >
              <div className="bg-blue-400 h-20 w-0.5 absolute left-0 hidden  group-hover:block"></div>
              <div className="flex items-center gap-3 w-full">
                <div className="rounded-full w-12 h-12">
                  <img src={profile} alt="" />
                </div>
                <div>
                  <div className="">
                    Admin{" "}
                    <span className="text-[14px] text-gray-500">
                      reacted to your product
                    </span>
                  </div>
                  <span className="text-[14px]">{item.message}</span>
                </div>
              </div>
              <span className="text-gray-500 text-right">
                {new Date(item.date).toDateString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
