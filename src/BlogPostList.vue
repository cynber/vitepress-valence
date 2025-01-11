<template>
  <div class="blog-post-list-container">
    <!-- Debug Format -->
    <div v-if="format === 'debug'">
      <pre>{{ JSON.stringify(displayedPosts, null, 2) }}</pre>
    </div>

    <!-- Dynamic Card Rendering -->
    <component :is="containerComponent" class="cards-container">
      <component
        v-for="post in displayedPosts"
        :key="post.url"
        :is="selectedCardComponent"
        v-bind="getCardProps(post)"
      />
    </component>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";
import HorizontalCard from "./cards/HorizontalCard.vue";
import VerticalCard from "./cards/VerticalCard.vue";
import HorizontalContainer from "./containers/HorizontalContainer.vue";
import VerticalContainer from "./containers/VerticalContainer.vue";

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
  format: {
    type: String,
    default: "vertical",
    validator: (value) => ["debug", "vertical", "horizontal"].includes(value),
  },
  sortOrder: {
    type: String,
    default: "desc",
    validator: (value) => ["asc", "desc"].includes(value),
  },
  featuredOnly: {
    type: Boolean,
    default: false,
  },
  filterAuthors: {
    type: Array,
    default: () => [],
  },
  excludeAuthors: {
    type: Array,
    default: () => [],
  },
  filterCategories: {
    type: Array,
    default: () => [],
  },
  excludeCategories: {
    type: Array,
    default: () => [],
  },
  excludeURLs: {
    type: Array,
    default: () => [],
  },
  maxCards: {
    type: Number,
    default: null,
  },
  hideAuthor: {
    type: Boolean,
    default: false,
  },
  hideDate: {
    type: Boolean,
    default: false,
  },
  hideImage: {
    type: Boolean,
    default: false,
  },
  hideCategory: {
    type: Boolean,
    default: false,
  },
  showDomain: {
    type: Boolean,
    default: false,
  },
  disableLinks: {
    type: Boolean,
    default: false,
  },
});

const injectedPostsData = inject("postsData", []);
const authors = inject("authors", {});

const posts = computed(() => props.posts || injectedPostsData);

// Card & Container selection
const selectedCardComponent = computed(() => {
  switch (props.format) {
    case "horizontal":
      return HorizontalCard;
    case "vertical":
    default:
      return VerticalCard;
  }
});

const containerComponent = computed(() => {
  switch (props.format) {
    case "horizontal":
      return HorizontalContainer;
    case "vertical":
    default:
      return VerticalContainer;
  }
});

const sortedPosts = computed(() => {
  const sorted = [...posts.value];
  sorted.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return props.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });
  return sorted;
});

const filteredPosts = computed(() => {
  return sortedPosts.value.filter((post) => {
    const { frontmatter } = post;

    if (props.featuredOnly && !frontmatter.featured) return false;
    if (!props.renderDrafts && frontmatter.draft) return false;

    const postDate = new Date(frontmatter.date);
    if (props.startDate && postDate < new Date(props.startDate)) return false;
    if (props.endDate && postDate > new Date(props.endDate)) return false;

    if (
      props.filterAuthors.length > 0 &&
      !props.filterAuthors.includes(frontmatter.author)
    )
      return false;
    if (
      props.excludeAuthors.length > 0 &&
      props.excludeAuthors.includes(frontmatter.author)
    )
      return false;

    if (
      props.filterCategories.length > 0 &&
      !props.filterCategories.includes(frontmatter.category)
    )
      return false;
    if (
      props.excludeCategories.length > 0 &&
      props.excludeCategories.includes(frontmatter.category)
    )
      return false;

    if (props.excludeURLs.length > 0) {
      const postURL = post.url.replace(/\.html$/, "");
      const isExcluded = props.excludeURLs.some((excludeURL) => {
        const normalizedExcludeURL = excludeURL.replace(/\.html$/, "");
        return normalizedExcludeURL === postURL;
      });
      if (isExcluded) return false;
    }

    return true;
  });
});

const displayedPosts = computed(() => {
  if (props.maxCards !== null && props.maxCards >= 0) {
    return filteredPosts.value.slice(0, props.maxCards);
  }
  return filteredPosts.value;
});

// Utility functions
function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getAuthorName(authorKey) {
  const author = authors[authorKey];
  return author ? author.name : authorKey;
}

function isExternalLink(url) {
  if (!url) return false;
  try {
    const link = new URL(url, window.location.origin);
    return link.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function getCardProps(post) {
  return {
    title: post.frontmatter.title,
    excerpt: post.frontmatter.excerpt,
    url: post.url,
    showDomain: props.showDomain,
    isExternal: isExternalLink(post.url),
    author: getAuthorName(post.frontmatter.author),
    date: formatDate(post.frontmatter.date),
    image: post.frontmatter.banner,
    category: post.frontmatter.category,
    hideAuthor: props.hideAuthor,
    hideDate: props.hideDate,
    hideImage: props.hideImage,
    hideCategory: props.hideCategory,
    disableLinks: props.disableLinks,
  };
}
</script>

<style scoped>
.blog-post-list-container {
  padding: 1rem 0;
}
</style>
