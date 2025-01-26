<!-- EmbedLemmy.vue -->
<template>
  <VerticalContainer>
    <div class="card">
      <h3 class="card-title">{{ title }}</h3>
    </div>
  </VerticalContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import VerticalContainer from "./containers/VerticalContainer.vue";

interface PostData {
  post_view: {
    post: {
      name: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

interface EmbedLemmyProps {
  url: string;
}

const props = defineProps<EmbedLemmyProps>();

const title = ref("Loading...");

onMounted(() => {
  const { instanceURL, postID } = parseURL(props.url);
  fetchPostData(instanceURL, postID);
});

function parseURL(urlString: string) {
  try {
    const url = new URL(urlString);

    const instanceURL = `${url.protocol}//${url.host}`;
    const pathParts = url.pathname.split("/").filter(Boolean); // Remove empty strings
    const postIndex = pathParts.findIndex((part) => part === "post");

    if (postIndex === -1 || postIndex + 1 >= pathParts.length) {
      console.error("Invalid Lemmy post URL format.");
      return { instanceURL: "", postID: "" };
    }

    const postID = pathParts[postIndex + 1];
    return { instanceURL, postID };
  } catch (error) {
    console.error("Error parsing URL:", error);
    return { instanceURL: "", postID: "" };
  }
}

async function fetchPostData(instanceURL: string, postID: string) {
  const apiURL = `${instanceURL}/api/v3/post?id=${postID}`;

  try {
    const response = await fetch(apiURL);
    const data: PostData = await response.json();

    if (data && data.post_view && data.post_view.post && data.post_view.post.name) {
      title.value = data.post_view.post.name;
    } else {
      title.value = "Post not found or invalid data.";
      console.error("Invalid data structure:", data);
    }
  } catch (error) {
    title.value = "Error loading post.";
    console.error("Error fetching post data:", error);
  }
}
</script>

<style scoped>
.card {
  background-color: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out,
    transform 0.2s ease-in-out;
  padding: 1rem;
  margin: 1rem;
}

.card:hover {
  border-color: var(--vp-c-border);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-title {
  font-size: 1.25rem;
  margin: 0;
  line-height: 1.2;
}
</style>
