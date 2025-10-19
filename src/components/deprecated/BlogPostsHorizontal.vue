<template>
  <div class="featured-posts-container">
    <!-- Debug Format -->
    <div v-if="false">
      <pre>{{ JSON.stringify(displayedPosts, null, 2) }}</pre>
    </div>

    <!-- Featured Posts Cards -->
    <div class="cards-wrapper">
      <div v-for="post in displayedPosts" :key="post.url" class="featured-post-card">
        <a :href="post.url" class="card-link">
          <div class="card-image">
            <img
              v-if="post.frontmatter.banner"
              :src="post.frontmatter.banner"
              alt="Banner Image"
            />
          </div>
          <div class="card-info">
            <h3 class="post-title">{{ post.frontmatter.title }}</h3>
            <div class="post-meta">
              <span class="post-date">{{ formatDate(post.frontmatter.date) }}</span>
              <span v-if="post.frontmatter.author" class="post-author">
                by {{ getAuthorName(post.frontmatter.author) }}
              </span>
            </div>
            <div class="post-tags">
              <span v-if="post.frontmatter.category" class="tag">
                {{ post.frontmatter.category }}
              </span>
            </div>
            <p class="post-excerpt">{{ post.frontmatter.excerpt }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from "vue";
import { useDeprecationWarning } from '../../utils/MyUtils';

onMounted(() => {
  useDeprecationWarning('BlogPostsHorizontal', 'ArticleList', 'v1.0.0');
});

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
});

const injectedPostsData = inject("postsData", []);
const authors = inject("authors", {});

const posts = computed(() => props.posts || injectedPostsData);

const sortedPosts = computed(() => {
  const sorted = [...posts.value];
  sorted.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    if (props.sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
  return sorted;
});

const filteredPosts = computed(() => {
  return sortedPosts.value.filter((post) => {
    const { frontmatter } = post;

    // Filter by featured
    if (props.featuredOnly && !frontmatter.featured) {
      return false;
    }

    // Render drafts
    if (!props.renderDrafts && frontmatter.draft) {
      return false;
    }

    const postDate = new Date(frontmatter.date);

    // Date range filtering
    if (props.startDate && postDate < new Date(props.startDate)) {
      return false;
    }
    if (props.endDate && postDate > new Date(props.endDate)) {
      return false;
    }

    // Filter authors
    if (
      props.filterAuthors.length > 0 &&
      !props.filterAuthors.includes(frontmatter.author)
    ) {
      return false;
    }

    // Exclude authors
    if (
      props.excludeAuthors.length > 0 &&
      props.excludeAuthors.includes(frontmatter.author)
    ) {
      return false;
    }

    // Filter categories
    if (
      props.filterCategories.length > 0 &&
      !props.filterCategories.includes(frontmatter.category)
    ) {
      return false;
    }

    // Exclude categories
    if (
      props.excludeCategories.length > 0 &&
      props.excludeCategories.includes(frontmatter.category)
    ) {
      return false;
    }

    // Exclude URLs
    if (props.excludeURLs.length > 0) {
      const postURL = post.url.replace(/\.html$/, "");
      const isExcluded = props.excludeURLs.some((excludeURL) => {
        const normalizedExcludeURL = excludeURL.replace(/\.html$/, "");
        return normalizedExcludeURL === postURL;
      });
      if (isExcluded) {
        return false;
      }
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
</script>

<style scoped>
.featured-posts-container {
  padding: 1rem 0;
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 16px;
  justify-content: center;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
}

.featured-post-card {
  background-color: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out,
    transform 0.2s ease-in-out;
  flex: 1 1 300px;
  min-width: 300px;
  max-width: calc(33.333% - 1rem);
}

.featured-post-card:hover {
  border-color: var(--vp-c-border);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.post-title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.post-meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.post-tags {
  margin-bottom: 0.75rem;
}

.tag {
  display: inline-block;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  margin-right: 0.5rem;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.featured-post-card:hover .tag {
  background-color: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-border);
}

.post-excerpt {
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

@media screen and (max-width: 1024px) {
  .featured-post-card {
    max-width: calc(50% - 1rem);
  }
}

@media screen and (max-width: 650px) {
  .featured-post-card {
    flex: 1 1 100%;
    max-width: 100%;
    min-width: unset;
  }

  .cards-wrapper {
    gap: 1rem;
  }
}
</style>
