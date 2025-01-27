<template>
  <div class="lemmy-card">
    <!-- Top Row: User, Community, Lemmy Icon -->
    <div v-if="isPostLoaded">
      <!-- Top Row: User, Community, Lemmy Icon -->
      <div class="lemmy-card-header" v-if="!hideUser || !hideCommunity">
        <div class="lemmy-card-user-community" v-if="!hideUser || !hideCommunity">
          <div class="lemmy-user-info">
            <a
              v-if="!hideUser"
              @click.stop
              :href="userLink"
              class="lemmy-user-link"
              target="_blank"
            >
              <div class="lemmy-user-icon">
                <img
                  :src="creator.avatar || 'https://placehold.co/24'"
                  alt="User Avatar"
                  @error="handleUserImageError"
                />
              </div>
              <span class="lemmy-username">{{
                creator.display_name || creator.name
              }}</span>
            </a>
            <span v-if="!hideUser && !hideCommunity" class="lemmy-separator">in</span>
            <a
              v-if="!hideCommunity"
              @click.stop
              :href="communityLink"
              class="lemmy-community-link"
              target="_blank"
            >
              <span class="lemmy-community-name">{{ community.name }}</span>
            </a>
          </div>
        </div>
        <div class="lemmy-icon-container">
          <a :href="props.url" target="_blank" title="View post on Lemmy">
            <Icon icon="bi:link-45deg" class="lemmy-header-icon" width="24" height="24" />
          </a>
          <a :href="linkedInstanceURL" target="_blank">
            <Icon
              icon="simple-icons:lemmy"
              class="lemmy-header-icon"
              width="24"
              height="24"
            />
          </a>
        </div>
      </div>

      <!-- Title and Description -->
      <div class="lemmy-card-content">
        <h3 v-if="!hideTitle" class="lemmy-card-title" :style="titleLineClampStyle">
          {{ title }}
        </h3>
        <div
          v-if="imageURL && !hideBanner"
          class="lemmy-card-image"
          @click="navigateToPost"
          title="View post on Lemmy">
          <img :src="imageURL" alt="Post Image" @error="handlePostImageError" />
        </div>
        <p
          v-if="description && !hideExcerpt"
          class="lemmy-card-description"
          :style="excerptLineClampStyle"
        >
          {{ description }}
        </p>
      </div>

      <!-- Bottom Row: Score, Comments, Date -->
      <div class="lemmy-card-footer" v-if="!hideScore || !hideComments || !hideDate">
        <div
          class="lemmy-score"
          v-if="!hideScore"
          @click="navigateToPost"
          title="View post on Lemmy"
        >
          <div class="lemmy-footer-item">
            <Icon
              icon="mingcute:arrow-up-fill"
              class="lemmy-icon"
              width="24"
              height="24"
            />
            <span>{{ score }}</span>
          </div>
        </div>
        <div
          class="lemmy-comments"
          v-if="!hideComments"
          @click="navigateToPost"
          title="View post on Lemmy"
        >
          <div class="lemmy-footer-item">
            <Icon icon="mdi:comment-outline" class="lemmy-icon" width="24" height="24" />
            <span>{{ commentCount }}</span>
          </div>
        </div>
        <div class="lemmy-gap"></div>
        <div class="lemmy-post-date" v-if="!hideDate">
          <div class="lemmy-footer-item">{{ formattedDate }}</div>
        </div>
      </div>
    </div>
    <div v-else class="error-message-container">
      <div class="error-message">
        <a :href="props.url" target="_blank">This post</a> could not be loaded. It may have been deleted or removed.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";

interface PostData {
  post_view: {
    post: Post;
    creator: Creator;
    community: Community;
    counts: Counts;
  };
}

interface Post {
  id: number;
  name: string;
  url?: string;
  body: string;
  creator_id: number;
  community_id: number;
  published: string;
  thumbnail_url?: string;
  [key: string]: any;
}

interface Creator {
  display_name?: string;
  name: string;
  avatar?: string;
  actor_id: string;
}

interface Community {
  name: string;
  actor_id: string;
}

interface Counts {
  score: number;
  comments: number;
}

interface EmbedCardLemmyProps {
  url: string;
  hideUser?: boolean;
  hideCommunity?: boolean;
  hideTitle?: boolean;
  hideBanner?: boolean;
  hideExcerpt?: boolean;
  hideScore?: boolean;
  hideComments?: boolean;
  hideDate?: boolean;
  titleLines?: number;
  excerptLines?: number;
}

const props = defineProps<EmbedCardLemmyProps>();

const title = ref("Loading...");
const description = ref("");

const creator = ref<Creator>({
  display_name: "",
  name: "",
  avatar: "",
  actor_id: "",
});

const community = ref<Community>({
  name: "",
  actor_id: "",
});

const linkedInstanceURL = new URL(props.url).origin;

const published = ref("");
const imageURL = ref<string | null>(null);
const score = ref(0);
const commentCount = ref(0);
var externalLinkImage = false;

const formattedDate = computed(() => {
  if (!published.value) return "";
  const date = new Date(published.value);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
});

const userLink = computed(() => {
  try {
    const userURL = new URL(creator.value.actor_id);
    return `${userURL.origin}/u/${creator.value.name}`;
  } catch (error) {
    console.error("Invalid creator actor_id URL:", creator.value.actor_id);
    return "#";
  }
});

const communityLink = computed(() => {
  try {
    const communityURL = new URL(community.value.actor_id);
    return `${communityURL.origin}/c/${community.value.name}`;
  } catch (error) {
    console.error("Invalid community actor_id URL:", community.value.actor_id);
    return "#";
  }
});

const isPostLoaded = computed(() => {
  return (
    title.value !== "Loading..." &&
    title.value !== "Post not found or invalid data." &&
    title.value !== "Error loading post."
  );
});

const navigateToPost = () => {
  window.open(props.url, '_blank');
};

function parseURL(urlString: string) {
  try {
    const url = new URL(urlString);

    const instanceURL = `${url.protocol}//${url.host}`;
    const pathParts = url.pathname.split("/").filter(Boolean);

    let postID = "";

    if (pathParts[0] === "post") {
      if (pathParts[1] === "id") {
        postID = pathParts[2];
      } else {
        postID = pathParts[1];
      }
    } else if (pathParts[0] === "comment") {
      if (pathParts[1] === "id") {
        postID = pathParts[2];
      }
    }

    return { instanceURL, postID };
  } catch (error) {
    console.error("Error parsing URL:", error);
    return { instanceURL: "", postID: "" };
  }
}

async function fetchOGImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    const ogImage = doc
      .querySelector("meta[property='og:image']")
      ?.getAttribute("content");
    return ogImage || null;
  } catch (error) {
    console.error("Failed to fetch OG Image:", error);
    return null;
  }
}

async function fetchPostData(instanceURL: string, postID: string) {
  const apiURL = `${instanceURL}/api/v3/post?id=${postID}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PostData = await response.json();

    if (data && data.post_view) {
      const postView = data.post_view;
      const post = postView.post;
      title.value = post.name;
      description.value = post.body || "";
      creator.value = postView.creator;
      community.value = postView.community;
      published.value = post.published;
      imageURL.value = post.thumbnail_url || null;
      score.value = postView.counts.score;
      commentCount.value = postView.counts.comments;

      if (!imageURL.value && post.url && !post.body) {
        imageURL.value = await fetchOGImage(post.url);
        externalLinkImage = true;
      }
    } else {
      title.value = "Post not found or invalid data.";
      console.error("Invalid data structure:", data);
    }
  } catch (error) {
    title.value = "Error loading post.";
    console.error("Error fetching post data:", error);
  }
}

function handleUserImageError(event: Event) {
  (event.target as HTMLImageElement).src = "https://placehold.co/24";
}

function handlePostImageError(event: Event) {
  imageURL.value = null;
}

const titleLineClampStyle = computed(() => {
  const styles: Record<string, string | number> = {
    display: "-webkit-box",
    "-webkit-line-clamp": props.titleLines || 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    "text-overflow": "ellipsis",
  };
  return styles;
});

const excerptLineClampStyle = computed(() => {
  const styles: Record<string, string | number> = {
    display: "-webkit-box",
    "-webkit-line-clamp": props.excerptLines || 4,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    "text-overflow": "ellipsis",
  };
  return styles;
});

onMounted(() => {
  const { instanceURL, postID } = parseURL(props.url);
  if (instanceURL && postID) {
    fetchPostData(instanceURL, postID);
  } else {
    title.value = "Invalid URL.";
  }
});
</script>

<style scoped>
.lemmy-card {
  background-color: #fff; /* litely $body-bg */
  border-radius: 8px;
  border: 1px solid rgba(0, 168, 70, 0.5);
  padding: 1rem;
  margin: 1rem auto;
  color: #495057; /* litely $body-color */
  display: flex;
  flex-direction: column;
  max-width: 400px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  font-family: "Lato", sans-serif;
}

.dark .lemmy-card {
  background-color: #222; /* darkly $body-bg */
  border: 1px solid rgba(173, 181, 189, 0.5);
  color: #dee2e6; /* darkly $body-color */
}

.lemmy-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.dark .lemmy-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.lemmy-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  position: relative;
}

.lemmy-icon-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;
}

.lemmy-header-icon {
  color: rgba(0, 168, 70, 0.8);
  transition: color 0.2s ease-in-out;
}

.lemmy-header-icon:hover {
  color: rgba(0, 168, 70, 1);
}

.dark .lemmy-header-icon {
  color: rgba(173, 181, 189, 0.8);
}

.dark .lemmy-header-icon:hover {
  color: rgba(173, 181, 189, 1);
}

.lemmy-card-user-community {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.lemmy-user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.lemmy-user-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 0.4rem;
}

.lemmy-user-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lemmy-user-link,
.lemmy-community-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
}

.lemmy-username {
  color: #02bdc2;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
}

.dark .lemmy-username {
  color: #3498db; /* darkly $cyan */
}

.lemmy-separator {
  /* margin: 0 2px; */
  color: #6c757d; /* litely $gray-600 */
}

.dark .lemmy-separator {
  color: #888; /* darkly $gray-600 */
}

.lemmy-community-name {
  color: #f1641e;
  font-weight: normal;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
}

.dark .lemmy-community-name {
  color: #00bc8c; /* darkly $green */
}

.lemmy-user-link:hover .lemmy-username,
.lemmy-community-link:hover .lemmy-community-name {
  text-decoration: underline;
}

.lemmy-card-image {
  margin-bottom: 0.75rem;
  max-height: 200px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
}

.lemmy-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lemmy-card-content {
  flex: 1;
  /* margin-bottom: 0.75rem; */
}

.lemmy-card-title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lemmy-card-title:hover,
.lemmy-card-image:hover,
.lemmy-score:hover,
.lemmy-comments:hover {
  cursor: pointer;
}

.lemmy-card-description {
  font-size: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.5rem;
  background-color: #f8f9fa; /* litely $gray-100 */
  border: 1px solid #d2d3d4;
  border-radius: 8px;
}

.dark .lemmy-card-description {
  background-color: #303030; /* darkly $gray-800 */
  border: 1px solid #4f4f4f;
}

.lemmy-card-footer {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.lemmy-score,
.lemmy-comments,
.lemmy-post-date,
.lemmy-gap {
  flex: 1 1 25%;
  margin: 0 4px;
}

.lemmy-score,
.lemmy-comments {
  cursor: pointer;
}

.lemmy-post-date {
  color: rgba(0, 168, 70, 0.8);
}

.dark .lemmy-post-date {
  color: rgba(173, 181, 189, 0.8);
}

.lemmy-footer-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 1rem;
  color: #3a3e42;
  background-color: #f8f9fa;
  /* border: 1px solid #d2d3d4; */
  border-radius: 8px;
  padding: 6px 4px;
  height: 100%;
  box-sizing: border-box;
}

.dark .lemmy-footer-item {
  color: #dee2e6; /* darkly $body-color */
  background-color: #353535; /* darkly $gray-800 */
  /* border: 1px solid #4f4f4f; */
}

.lemmy-post-date .lemmy-footer-item {
  background-color: transparent;
}

.lemmy-score .lemmy-footer-item,
.lemmy-comments .lemmy-footer-item,
.lemmy-post-date .lemmy-footer-item {
  max-width: 100%;
}

.lemmy-icon {
  color: #00bc8c;
  margin-left: 4px;
}

.dark .lemmy-icon {
  color: #f1641e;
}

.error-message-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  color: #6c757d;
  text-align: center;
}

.dark .error-message {
  background-color: #303030;
  color: #888;
}

@media screen and (max-width: 500px) {
  .lemmy-card {
    max-width: 100%;
    margin: 1rem;
  }

  .lemmy-card-footer {
    flex-wrap: wrap;
  }

  .lemmy-score,
  .lemmy-comments,
  .lemmy-post-date,
  .lemmy-gap {
    flex: 1 1 50%;
    margin-top: 4px;
  }

  .lemmy-score:nth-child(n + 3),
  .lemmy-comments:nth-child(n + 3),
  .lemmy-post-date:nth-child(n + 3) {
    display: none;
  }
}
</style>
