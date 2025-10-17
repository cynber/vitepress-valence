<template>
  <div class="article-list-container">
    <!-- Debug Format -->
    <div v-if="format === 'debug'">
      <pre>{{ JSON.stringify(displayedArticles, null, 2) }}</pre>
    </div>
    <!-- Dynamic Card Rendering -->
    <component :is="containerComponent">
      <component
        v-for="article in displayedArticles"
        :key="article.url"
        :is="selectedCardComponent"
        v-bind="getCardProps(article)"
      />
    </component>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { formatDate } from '@/utils/MyUtils';
import HorizontalCard from "./cards/HorizontalCard.vue";
import VerticalCard from "./cards/VerticalCard.vue";
import HorizontalContainer from "./containers/HorizontalContainer.vue";
import VerticalContainer from "./containers/VerticalContainer.vue";

interface Article {
  url: string;
  frontmatter: {
    // New format fields
    title: string;
    subtitle?: string;
    summary?: string;
    date: string;
    author?: string;
    category?: string;
    tags?: string[];
    featured_image?: {
      image: string;
      image_dark?: string;
      alt?: string;
      description?: string;
    };
    status?: string;
    featured?: boolean;
    
    // Old format fields for backward compatibility
    excerpt?: string;
    banner?: string;
  };
}

interface Author {
  name: string;
  url?: string;
  avatar?: string;
  description?: string;
  [key: string]: any;
}

interface ArticleListProps {
  articles?: Article[];
  articlesDataKey?: string;
  authorsDataKey?: string;
  format?: "horizontal" | "vertical" | "debug";
  hideAuthor?: boolean;
  hideDate?: boolean;
  hideImage?: boolean;
  hideCategory?: boolean;
  hideTags?: boolean;
  hideDomain?: boolean;
  disableLinks?: boolean;
  titleLines?: number;
  excerptLines?: number;
  maxCards?: number;
  sortOrder?: "ascending" | "descending";
  filterAuthors?: string;
  excludeURLs?: string[];
  dateFormat?: string;
}

const props = defineProps<ArticleListProps>();

const injectedArticlesData = inject<Article[]>(props.articlesDataKey || 'postsData', []);
const authors = inject<Record<string, Author>>(props.authorsDataKey || 'authors', {});

const articles = computed(() => props.articles || injectedArticlesData);

// Card & Container selection
const selectedCardComponent = computed(() => {
  switch (props.format) {
    case "horizontal":
      return HorizontalCard;
    case "vertical":
      return VerticalCard;
    default:
      return VerticalCard;
  }
});

const containerComponent = computed(() => {
  switch (props.format) {
    case "horizontal":
      return HorizontalContainer;
    case "vertical":
      return VerticalContainer;
    default:
      return VerticalContainer;
  }
});

// Article filtering and sorting logic
const displayedArticles = computed(() => {
  let filteredArticles = articles.value.filter(article => {
    // Filter out excluded URLs
    if (props.excludeURLs?.includes(article.url)) return false;
    
    // Filter by author if specified
    if (props.filterAuthors && article.frontmatter.author !== props.filterAuthors) return false;
    
    // Filter out drafts (default to 'published' if status not specified)
    if (article.frontmatter.status === 'draft') return false;
    
    return true;
  });

  // Sort articles
  if (props.sortOrder === 'ascending') {
    filteredArticles.sort((a, b) => new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime());
  } else {
    filteredArticles.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  }

  // Limit results
  if (props.maxCards) {
    filteredArticles = filteredArticles.slice(0, props.maxCards);
  }

  return filteredArticles;
});

function getAuthorName(authorKey: string): string {
  if (!authorKey) return "";
  return authors[authorKey]?.name || authorKey;
}

function getExcerpt(article: Article): string {
  return article.frontmatter.summary || article.frontmatter.excerpt || "";
}

function getImage(article: Article): string | undefined {
  if (article.frontmatter.featured_image?.image) {
    return article.frontmatter.featured_image.image;
  }
  return article.frontmatter.banner;
}

function getImageDark(article: Article): string | undefined {
  return article.frontmatter.featured_image?.image_dark;
}

function getCardProps(article: Article) {
  return {
    title: article.frontmatter.title,
    excerpt: getExcerpt(article),
    url: article.url,
    hideDomain: props.hideDomain,
    isExternal: false,
    author: getAuthorName(article.frontmatter.author || ""),
    date: formatDate(article.frontmatter.date, { format: props.dateFormat || 'long' }),
    image: getImage(article),
    image_dark: getImageDark(article),
    category: article.frontmatter.category,
    tags: article.frontmatter.tags || [],
    hideAuthor: props.hideAuthor,
    hideDate: props.hideDate,
    hideImage: props.hideImage,
    hideCategory: props.hideCategory,
    hideTags: props.hideTags,
    disableLinks: props.disableLinks,
    titleLines: props.titleLines,
    excerptLines: props.excerptLines,
  };
}
</script>

<style scoped>
.article-list-container {
  padding: 1rem 0;
}
</style>