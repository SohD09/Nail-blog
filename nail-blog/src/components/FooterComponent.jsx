import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <>
      <Footer
        container
        className="border mt-0 border-t-4 border-t-dark-pink rounded-none max-h-[30%] xl:max-h-[20%]"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-3">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white"
              >
                <span className="px-2 py-1 bg-gradient-to-r from-royal-blue to-dark-pink rounded-lg text-transparent bg-clip-text dark:text-white ">
                  Nailed
                  <span className="text-black dark:text-off-white">It.</span>
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="/about"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NailedIt.
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow Me" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://www.github.com/SohD09"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              href="#"
              by="NailedIt."
              year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="https://github.com/SohD09" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default FooterComponent;
