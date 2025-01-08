<template>
  <div class="blog-post-list-container">
    <!-- Debug Format -->
    <div v-if="format === 'debug'">
      <pre>{{ JSON.stringify(filteredPosts, null, 2) }}</pre>
    </div>

    <!-- Vertical Cards Format -->
    <div v-else-if="format === 'verticalCards'" class="cards-container">
      <div v-for="post in filteredPosts" :key="post.url" class="post-card">
        <a :href="post.url" class="card-link">
          <div class="card-content">
            <div class="card-info">
              <div class="post-title">{{ post.frontmatter.title }}</div>
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
              <div class="post-excerpt">{{ post.frontmatter.excerpt }}</div>
            </div>
            <div class="card-image" v-if="post.frontmatter.banner">
              <img :src="post.frontmatter.banner" alt="Banner Image" />
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

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
  format: {
    type: String,
    default: "verticalCards",
    validator: (value) => ["debug", "verticalCards"].includes(value),
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

    return true;
  });
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
.blog-post-list-container {
  padding: 1rem 0;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
}

.post-card {
  background-color: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out,
    transform 0.2s ease-in-out;
}

.post-card:hover {
  border-color: var(--vp-c-border);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 10px;
}

.card-info {
  flex: 1;
  min-width: 0;
  padding: 10px;
}

.card-image {
  flex: 0 0 45%;
  aspect-ratio: 16/9;
  margin: 10px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

@media screen and (max-width: 768px) {
  .card-content {
    flex-direction: column;
  }
  .card-image {
    flex: 0 0 auto;
    width: calc(100% - 20px);
    margin: 10px;
  }
}

.post-title {
  font-size: 1.5rem;
  margin: 0;
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
  margin-top: 0.5rem;
}

.post-tags {
  margin-top: 0.5rem;
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

.post-card:hover .tag {
  background-color: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-border);
}

.post-excerpt {
  margin-top: 1rem;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
