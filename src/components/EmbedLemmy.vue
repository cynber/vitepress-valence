<!-- EmbedLemmy.vue -->
<template>
  <VerticalContainer>
    <div class="lemmy-card">
      <!-- Top Row: User, Community, Date -->
      <div class="lemmy-card-header">
        <div class="lemmy-card-user-community">
          <div class="lemmy-user-info">
            <a :href="userLink" class="lemmy-user-link">
              <div class="lemmy-user-icon">
                <img :src="creator.avatar" alt="User Avatar" />
              </div>
              <span class="lemmy-username">{{
                creator.display_name || creator.name
              }}</span>
            </a>
            <span class="lemmy-separator">in</span>
            <a :href="communityLink" class="lemmy-community-link">
              <span class="lemmy-community-name">{{ community.name }}</span>
            </a>
          </div>
        </div>
        <div class="lemmy-post-date">{{ formattedDate }}</div>
      </div>

      <!-- Image Section -->
      <div v-if="imageURL" class="lemmy-card-image">
        <img :src="imageURL" alt="Post Image" />
      </div>

      <!-- Title and Description -->
      <div class="lemmy-card-content">
        <h3 class="lemmy-card-title">{{ title }}</h3>
        <p class="lemmy-card-description">{{ description }}</p>
      </div>

      <!-- Bottom Row: Score and Comments -->
      <div class="lemmy-card-footer">
        <div class="lemmy-score">
          <Icon icon="icon-park-solid:up-two" class="lemmy-icon" />
          <span>{{ score }}</span>
        </div>
        <div class="lemmy-comments">
          <Icon icon="mdi:comment" class="lemmy-icon" />
          <span>{{ commentCount }}</span>
        </div>
      </div>
    </div>
  </VerticalContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import VerticalContainer from "./containers/VerticalContainer.vue";
import { Icon } from "@iconify/vue";

interface PostData {
  post_view: {
    post: {
      id: number;
      name: string;
      url?: string;
      body: string;
      creator_id: number;
      community_id: number;
      published: string;
      thumbnail_url?: string;
      [key: string]: any;
    };
    creator: {
      display_name?: string;
      name: string;
      avatar: string;
      actor_id: string;
      [key: string]: any;
    };
    community: {
      name: string;
      actor_id: string;
      [key: string]: any;
    };
    counts: {
      score: number;
      comments: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
}

interface EmbedLemmyProps {
  url: string;
}

const props = defineProps<EmbedLemmyProps>();

// Reactive variables
const title = ref("Loading...");
const description = ref("");
type Creator = {
  display_name?: string;
  name: string;
  avatar: string;
  actor_id: string;
};

const creator = ref<Creator>({
  display_name: "",
  name: "",
  avatar: "",
  actor_id: "",
});

const community = ref({
  name: "",
  actor_id: "",
});
const published = ref("");
const imageURL = ref<string | null>(null);
const score = ref(0);
const commentCount = ref(0);

// Compute the formatted date
const formattedDate = computed(() => {
  if (!published.value) return "";
  const date = new Date(published.value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Compute user and community links
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

// Function to parse the provided URL and extract the instance URL and post ID
function parseURL(urlString: string) {
  try {
    const url = new URL(urlString);

    const instanceURL = `${url.protocol}//${url.host}`;
    const pathParts = url.pathname.split("/").filter(Boolean);

    let postID = "";
    if (pathParts[0] === "post") {
      postID = pathParts[1];
    } else if (pathParts[0] === "post" && pathParts[1] === "id") {
      postID = pathParts[2];
    }

    return { instanceURL, postID };
  } catch (error) {
    console.error("Error parsing URL:", error);
    return { instanceURL: "", postID: "" };
  }
}

// Function to fetch post data from the Lemmy API
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
      imageURL.value = post.url || post.thumbnail_url || null;
      score.value = postView.counts.score;
      commentCount.value = postView.counts.comments;
    } else {
      title.value = "Post not found or invalid data.";
      console.error("Invalid data structure:", data);
    }
  } catch (error) {
    title.value = "Error loading post.";
    console.error("Error fetching post data:", error);
  }
}

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
  background-color: #222222;
  border-radius: 16px;
  border: 1px solid #4f4f4f;
  padding: 1rem;
  margin: 1rem auto;
  color: #dee2e6;
  display: flex;
  flex-direction: column;
  max-width: 400px; /* Adjusted for vertical layout */
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out,
    transform 0.2s ease-in-out;
}

.dark .lemmy-card {
  background-color: #222222;
  border-color: #4f4f4f;
  color: #dee2e6;
}

.lemmy-card:hover {
  border-color: #4f4f4f;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.lemmy-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
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
  color: #3498db;
  font-weight: bold;
}

.dark .lemmy-username {
  color: #3498db;
}

.lemmy-separator {
  margin: 0 0.25rem;
  color: #dee2e6;
}

.dark .lemmy-separator {
  color: #dee2e6;
}

.lemmy-community-name {
  color: #629b8d;
  font-weight: normal;
}

.dark .lemmy-community-name {
  color: #629b8d;
}

.lemmy-post-date {
  font-size: 0.85rem;
  color: #dee2e6;
}

.dark .lemmy-post-date {
  color: #dee2e6;
}

.lemmy-card-image {
  margin-bottom: 0.75rem;
  max-height: 200px; /* Adjust as needed */
  overflow: hidden;
  border-radius: 8px;
}

.lemmy-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lemmy-card-content {
  flex: 1;
  margin-bottom: 0.75rem;
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

.dark .lemmy-card-title {
  /* Same styles as light mode */
}

.lemmy-card-description {
  font-size: 1rem;
  color: #dee2e6;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark .lemmy-card-description {
  color: #dee2e6;
}

.lemmy-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lemmy-score,
.lemmy-comments {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1rem;
  color: #dee2e6;
}

.dark .lemmy-score,
.dark .lemmy-comments {
  color: #dee2e6;
}

.lemmy-icon {
  color: #3498db;
}

.dark .lemmy-icon {
  color: #3498db;
}

/* Responsive Design */
@media screen and (max-width: 500px) {
  .lemmy-card {
    max-width: 100%;
    margin: 1rem;
  }
}
</style>
