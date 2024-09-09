import { rankContents } from "../services/feed/rankingService.js";
import { getTopInterests } from "../services/feed/interestService.js";
import { getFeedContents } from "../services/feed/feedContentsService.js";

const getFeed = async (userId, interactions) => {
  // TODO: Add logic to get the feed for the user
  // Get the interactions, extract posts and clips and pass to ranking service
  // Get the top scored contents from the ranking service
  // Pass the contents to the interest service
  // Get the top and common 6 interests from the interest service
  // Pass the interests to search interest service for querying
  // Get top 30 posts and 30 clips from the search interest service
  // Return the new contents to the feed

  const { posts, clips } = interactions;

  const rankedContents = await rankContents(posts, clips);

  const topNewInterests = await getTopInterests(rankedContents);

  const feedContents = await getFeedContents(topNewInterests);

  return feedContents;
};
