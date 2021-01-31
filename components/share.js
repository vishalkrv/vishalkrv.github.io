import { Box, SimpleGrid } from "@chakra-ui/react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WorkplaceShareButton,
  WorkplaceIcon,
} from "react-share";

const ShareBtns = ({ title, link }) => {
  return (
    <SimpleGrid columns={5} spacing={1}>
      <LinkedinShareButton url={link} title={title}>
        <LinkedinIcon size={24} round={true}></LinkedinIcon>
      </LinkedinShareButton>
      <TwitterShareButton url={link} title={title}>
        <TwitterIcon size={24} round={true}></TwitterIcon>
      </TwitterShareButton>
      <WorkplaceShareButton url={link} title={title}>
        <WorkplaceIcon size={24} round={true}></WorkplaceIcon>
      </WorkplaceShareButton>
      <RedditShareButton url={link} title={title}>
        <RedditIcon size={24} round={true}></RedditIcon>
      </RedditShareButton>
      <FacebookShareButton url={link} title={title}>
        <FacebookIcon size={24} round={true}></FacebookIcon>
      </FacebookShareButton>
    </SimpleGrid>
  );
};

export default ShareBtns;
