<script setup>
import { inject, computed } from "vue";

const props = defineProps({
  posts: {
    type: Array,
    required: false,
  },
  renderDrafts: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: [Date, String],
    default: null,
  },
  endDate: {
    type: [Date, String],
    default: null,
  },
});

const injectedPostsData = inject("postsData", []);

// Use the provided posts prop or the injected postsData
const posts = computed(() => props.posts || injectedPostsData);

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const { frontmatter } = post;

    if (!props.renderDrafts && frontmatter.draft) {
      return false;
    }

    const postDate = new Date(frontmatter.date);

    if (props.startDate && postDate < new Date(props.startDate)) {
      return false;
    }
    if (props.endDate && postDate > new Date(props.endDate)) {
      return false;
    }

    return true;
  });
});
</script>

<template>
  <ul>
    <li v-for="post in filteredPosts" :key="post.url">
      <a :href="post.url">
        {{ new Date(post.frontmatter.date).toLocaleDateString() }} -
        {{ post.frontmatter.title }}
      </a>
    </li>
  </ul>
</template>
