import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ShareBtns = ({ title, link }) => {
  return (
    <div className="flex items-center space-x-2">
      <LinkedinShareButton url={link} title={title}>
        <LinkedinIcon size={26} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton url={link} title={title}>
        <TwitterIcon size={26} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={link} title={title}>
        <WhatsappIcon size={26} round={true} />
      </WhatsappShareButton>
      <RedditShareButton url={link} title={title}>
        <RedditIcon size={26} round={true} />
      </RedditShareButton>
      <FacebookShareButton url={link} title={title}>
        <FacebookIcon size={26} round={true} />
      </FacebookShareButton>
    </div>
  );
};

export default ShareBtns;
