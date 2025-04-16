import React from "react";
import { BadgeHelp } from "lucide-react";
import Text from "../components/Text";
const HelpAndSupport = () => {
  return (
    <div className="w-full  max-w-4xl mx-auto h-screen overflow-hidden px-4 bg-[#F5E5D6] ">
      <Text text1={"HELP"} text2={"AND SUPPORT"} className="pt-20" />

      <section className="mb-4">
        <div className="text-2xl font-semibold text-amber-800 ">Welcome, Artist!</div>
        <span className="text-base leading-relaxed">
          We’re here to support you on your journey of sharing your art with the world. Whether you’re a seasoned artisan or just starting out, our platform provides the tools and visibility you need to showcase and sell your handcrafted creations.
        </span>
      </section>

      <section className="mb-4">
        <div className="text-xl font-semibold text-amber-800 ">Why Choose Us?</div>
        <ul className="list-disc list-inside text-base space-y-2">
          <li>Your art, your price — complete control over your listings.</li>
          <li>Dedicated support to help you get started and grow.</li>
          <li>Trusted by a growing community of buyers and creators.</li>
          <li>Secure and fast payment gateways integrated for smooth transactions.</li>
          <li>No hidden charges — transparency you can rely on.</li>
        </ul>
      </section>

      <section className="mb-4">
        <div className="text-xl font-semibold text-amber-800 ">Need Help?</div>
        <span className="text-base">
          If you have any questions or run into issues while uploading your art, setting prices, or managing orders, don’t worry — our team is here to help you every step of the way.
        </span>
        <div className=" p-4 border border-amber-800 rounded-md flex items-center gap-3">
          <BadgeHelp className="text-amber-800" />
          <span className="text-base">
            Contact us at <a href="mailto:support@artify.com" className="text-amber-800 underline">support@artify.com</a>
            &nbsp;or visit our FAQ section.
          </span>
        </div>
      </section>

      <section>
        <div className="text-xl font-semibold text-amber-800 ">A Platform You Can Trust</div>
        <span className="text-base">
          We are committed to creating a safe and trustworthy space for artists. All listings are verified, and customer support is available 24/7 to resolve any issues quickly and fairly. Your success is our mission.
        </span>
      </section>
    </div>
  );
};

export default HelpAndSupport;
