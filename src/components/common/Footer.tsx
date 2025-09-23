import { Facebook, Twitter, Instagram, Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white px-40 py-28 sm:px-2 md:px-16 lg:px-30">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 mx-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">cyber</h2>
          <p className="text-sm text-gray-400 mb-6">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm cursor-pointer text-gray-400">
            <li>Bonus program</li>
            <li>Gift cards</li>
            <li>Credit and payment</li>
            <li>Service contracts</li>
            <li>Non-cash account</li>
            <li>Payment</li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-4">
            Assistance to the buyer
          </h3>
          <ul className="space-y-2 text-sm cursor-pointer text-gray-400">
            <li>Find an order</li>
            <li>Terms of delivery</li>
            <li>Exchange and return of goods</li>
            <li>Guarantee</li>
            <li>Frequently asked questions</li>
            <li>Terms of use of the site</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-8 mx-16 mt-12">
        <a href="#">
          <Twitter className="h-5 w-5 text-gray-400 hover:text-white" />
        </a>
        <a href="#">
          <Facebook className="h-5 w-5 text-gray-400 hover:text-white" />
        </a>
        <a href="#">
          <Music2 className="h-5 w-5 text-gray-400 hover:text-white" />
        </a>
        <a href="#">
          <Instagram className="h-5 w-5 text-gray-400 hover:text-white" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
