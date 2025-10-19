<template>
  <div class="lemmy-card">
    <div v-if="isPostLoaded">
      <!-- Header -->
      <div class="lemmy-card-header" v-if="shouldShowHeader">
        <div class="lemmy-card-user-community">
          <div class="lemmy-user-info">
            <a
              v-if="!hideUser"
              @click.stop
              :href="userLink"
              title="User profile"
              class="lemmy-user-link"
              target="_blank"
            >
              <div class="lemmy-user-icon">
                <img
                  :src="creator.avatar || PLACEHOLDER_IMAGE"
                  alt="User Avatar"
                  @error="handleUserImageError"
                />
              </div>
              <span class="lemmy-username">{{
                creator.display_name || creator.name
              }}</span>
            </a>
            <span v-if="shouldShowSeparator" class="lemmy-separator">in</span>
            <a
              v-if="!hideCommunity"
              @click.stop
              :href="communityLink"
              title="Community"
              class="lemmy-community-link"
              target="_blank"
            >
              <span class="lemmy-community-name">{{ community.name }}</span>
            </a>
          </div>
        </div>
        <div class="lemmy-icon-container">
          <a :href="props.url" target="_blank" title="View post on Lemmy" class="lemmy-header-icon-link">
            <Icon icon="bi:link-45deg" class="lemmy-header-icon" :width="ICON_SIZE" :height="ICON_SIZE" />
          </a>
          <a :href="linkedInstanceURL" target="_blank" title="Instance" class="lemmy-header-icon-link">
            <Icon
              icon="simple-icons:lemmy"
              class="lemmy-header-icon"
              :width="ICON_SIZE"
              :height="ICON_SIZE"
            />
          </a>
        </div>
      </div>

      <!-- Content -->
      <div class="lemmy-card-content">
        <h3 
          v-if="!hideTitle" 
          class="lemmy-card-title clickable" 
          :style="titleLineClampStyle" 
          @click="navigateToPost" 
          title="View post on Lemmy"
        >
          {{ title }}
        </h3>
        <div
          v-if="imageURL && !hideBanner"
          class="lemmy-card-image clickable"
          @click="navigateToPost"
          title="View post on Lemmy"
        >
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

      <!-- Footer -->
      <div class="lemmy-card-footer" v-if="shouldShowFooter">
        <div
          v-if="!hideScore"
          class="lemmy-footer-section clickable"
          @click="navigateToPost"
          title="View post on Lemmy"
        >
          <div class="lemmy-footer-item">
            <Icon icon="mingcute:arrow-up-fill" class="lemmy-icon" :width="ICON_SIZE" :height="ICON_SIZE" />
            <span>{{ score }}</span>
          </div>
        </div>
        <div
          v-if="!hideComments"
          class="lemmy-footer-section clickable"
          @click="navigateToPost"
          title="View post on Lemmy"
        >
          <div class="lemmy-footer-item">
            <Icon icon="mdi:comment-outline" class="lemmy-icon" :width="ICON_SIZE" :height="ICON_SIZE" />
            <span>{{ commentCount }}</span>
          </div>
        </div>
        <div v-if="!hideDate" class="lemmy-footer-section lemmy-post-date">
          <div class="lemmy-footer-item">{{ formattedDate }}</div>
        </div>
      </div>
    </div>
    <div v-else class="error-message-container">
      <div class="error-message">
        This post could not be loaded. <br />
        It may have been deleted or removed. <br /><br />
        You can try viewing it <a :href="props.url" target="_blank">here</a>.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { formatDate } from "../../utils";

// Constants
const PLACEHOLDER_IMAGE = 'https://placehold.co/24';
const ICON_SIZE = 24;

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
  dateFormat?: string;
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

// Computed properties for conditional rendering
const shouldShowHeader = computed(() => !props.hideUser || !props.hideCommunity);
const shouldShowSeparator = computed(() => !props.hideUser && !props.hideCommunity);
const shouldShowFooter = computed(() => !props.hideScore || !props.hideComments || !props.hideDate);

const formattedDate = computed(() => {
  if (!published.value) return '';
  return formatDate(published.value, { format: props.dateFormat || 'iso' });
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
      postID = pathParts[1] === "id" ? pathParts[2] : pathParts[1];
    } else if (pathParts[0] === "comment" && pathParts[1] === "id") {
      postID = pathParts[2];
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
    const ogImage = doc.querySelector("meta[property='og:image']")?.getAttribute("content");
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

    if (data?.post_view) {
      const { post, creator: postCreator, community: postCommunity, counts } = data.post_view;
      title.value = post.name;
      description.value = post.body || "";
      creator.value = postCreator;
      community.value = postCommunity;
      published.value = post.published;
      imageURL.value = post.thumbnail_url || null;
      score.value = counts.score;
      commentCount.value = counts.comments;

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
  (event.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
}

function handlePostImageError(event: Event) {
  imageURL.value = null;
}

function createLineClampStyle(lines: number): Record<string, string | number> {
  return {
    display: "-webkit-box",
    "-webkit-line-clamp": lines.toString(),
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    "text-overflow": "ellipsis",
  };
};

const titleLineClampStyle = computed(() => createLineClampStyle(props.titleLines || 2));
const excerptLineClampStyle = computed(() => createLineClampStyle(props.excerptLines || 4));

onMounted(() => {
  const { instanceURL, postID } = parseURL(props.url);
  if (instanceURL && postID) {
    fetchPostData(instanceURL, postID);
  } else {
    title.value = "Invalid URL.";
  }
});
</script>

<style scoped lang="scss">
// Color variables
$light-bg: #fff;
$light-text: #495057;
$light-gray-100: #f8f9fa;
$light-gray-600: #6c757d;
$light-border: #d2d3d4;

$dark-bg: #222;
$dark-text: #dee2e6;
$dark-gray-800: #303030;
$dark-gray-600: #888;
$dark-border: #4f4f4f;

$primary-green: rgba(0, 168, 70, 0.8);
$primary-green-solid: #00bc8c;
$accent-orange: #f1641e;
$accent-cyan: #02bdc2;
$accent-blue: #3498db;

// Mixins
@mixin hover-border($color) {
  border: 1px solid transparent;
  &:hover {
    border: 1px solid $color;
  }
}

@mixin interactive-background($light-bg, $light-border, $dark-bg, $dark-border) {
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.5rem;
  
  &:hover {
    background-color: $light-bg;
    border: 1px solid $light-border;
  }
  
  .dark & {
    &:hover {
      background-color: $dark-bg;
      border: 1px solid $dark-border;
    }
  }
}

.lemmy-card {
  background-color: $light-bg;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  padding: 1rem;
  color: $light-text;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  min-height: 300px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  font-family: "Lato", sans-serif;

  .dark & {
    background-color: $dark-bg;
    border: 1px solid var(--vp-c-border);
    color: $dark-text;
  }

  > div {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
  }
}

.clickable {
  cursor: pointer;
}

.lemmy-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  position: relative;
}

.lemmy-card-user-community {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  border-radius: 8px;
  border: 1px solid transparent;
}

.lemmy-user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  overflow: hidden;
}

.lemmy-user-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 0.4rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.lemmy-user-link,
.lemmy-community-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
}

.lemmy-username,
.lemmy-community-name {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.lemmy-username {
  color: $accent-cyan;
  
  .dark & {
    color: $accent-blue;
  }
}

.lemmy-community-name {
  color: $accent-orange;
  
  .dark & {
    color: $primary-green-solid;
  }
}

.lemmy-separator {
  color: $light-gray-600;
  
  .dark & {
    color: $dark-gray-600;
  }
}

.lemmy-icon-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;
}

.lemmy-header-icon-link {
  @include interactive-background($light-gray-100, $light-border, $dark-gray-800, $dark-border);
}

.lemmy-header-icon {
  color: $primary-green;
  
  .dark & {
    color: rgba(173, 181, 189, 0.8);
  }
  
  .lemmy-header-icon-link:hover & {
    color: rgba(0, 168, 70, 1);
    
    .dark & {
      color: $dark-text;
    }
  }
}

.lemmy-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
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

.lemmy-card-image {
  margin-bottom: 0.75rem;
  max-height: 200px;
  overflow: hidden;
  border-radius: 8px;
  @include hover-border($light-border);
  position: relative;

  .dark & {
    @include hover-border($dark-border);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  background-color: $light-gray-100;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;

  .dark & {
    background-color: $dark-gray-800;
    border: 1px solid var(--vp-c-border);
  }
}

.lemmy-card-footer {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: auto;
  gap: 8px;
}

.lemmy-footer-section {
  flex: 1;
  
  &.lemmy-post-date {
    flex-shrink: 0;
    min-width: fit-content;
    color: $primary-green;
    
    .dark & {
      color: rgba(173, 181, 189, 0.8);
    }
    
    .lemmy-footer-item {
      background-color: transparent;
      border: 1px solid transparent;
      
      &:hover {
        border: 1px solid transparent;
      }
    }
  }
}

.lemmy-footer-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 1rem;
  color: #3a3e42;
  background-color: $light-gray-100;
  border: 1px solid $light-gray-100;
  border-radius: 8px;
  padding: 6px 4px;
  height: 100%;
  box-sizing: border-box;
  max-width: 100%;

  .dark & {
    color: $dark-text;
    background-color: #353535;
    border: 1px solid #353535;
  }

  &:hover {
    border: 1px solid $light-border;
    
    .dark & {
      border: 1px solid $dark-border;
    }
  }
}

.lemmy-icon {
  color: $primary-green-solid;
  margin-left: 4px;

  .dark & {
    color: $accent-orange;
  }
}

.error-message-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  background-color: $light-gray-100;
  padding: 16px;
  border-radius: 8px;
  color: $light-gray-600;
  text-align: center;

  .dark & {
    background-color: $dark-gray-800;
    color: $dark-gray-600;
  }
}

@media screen and (max-width: 500px) {
  .lemmy-card {
    max-width: 100%;
    margin: 1rem;
  }

  .lemmy-card-footer {
    flex-wrap: wrap;
  }

  .lemmy-footer-section:nth-child(n + 3) {
    display: none;
  }
}
</style>