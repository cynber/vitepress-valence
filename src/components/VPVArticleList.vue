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
  postsDataKey?: string; // backward compatibility
  authorsDataKey?: string;
  // card display options
  format?: "horizontal" | "vertical" | "debug";
  hideAuthor?: boolean;
  hideDate?: boolean;
  dateFormat?: string;
  hideImage?: boolean;
  hideCategory?: boolean;
  hideTags?: boolean;
  hideDomain?: boolean;
  disableLinks?: boolean;
  titleLines?: number;
  excerptLines?: number;
  maxCards?: number;
  // filtering & sorting
  sortOrder?: "ascending" | "descending";
  filterAuthors?: string | string[];
  excludeAuthors?: string[];
  filterCategories?: string[];
  excludeCategories?: string[];
  filterTags?: string[];
  excludeTags?: string[];
  excludeURLs?: string[];
  featuredOnly?: boolean;
  renderDrafts?: boolean;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
}

const props = defineProps<ArticleListProps>();
const dataKey = props.articlesDataKey || props.postsDataKey || 'postsData';
const injectedArticlesData = inject<Article[]>(dataKey, []);
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
    const frontmatter = article.frontmatter;
    
    // Filter out excluded URLs (simple comparison as requested)
    if (props.excludeURLs?.length) {
      const articleURL = article.url.replace(/\.html$/, "");
      const isExcluded = props.excludeURLs.some((excludeURL) => {
        const normalizedExcludeURL = excludeURL.replace(/\.html$/, "");
        return normalizedExcludeURL === articleURL;
      });
      if (isExcluded) return false;
    }
    
    // Filter out drafts (unless renderDrafts is true)
    if (!props.renderDrafts && frontmatter.status === 'draft') return false;
    
    // Featured only filter
    if (props.featuredOnly && !frontmatter.featured) return false;
    
    // Author filtering - support both string and array
    if (props.filterAuthors) {
      const authorsToFilter = Array.isArray(props.filterAuthors) 
        ? props.filterAuthors 
        : [props.filterAuthors];
      if (!authorsToFilter.includes(frontmatter.author || "")) return false;
    }
    
    // Exclude authors
    if (props.excludeAuthors?.length && 
        props.excludeAuthors.includes(frontmatter.author || "")) return false;
    
    // Category filtering
    if (props.filterCategories?.length && 
        !props.filterCategories.includes(frontmatter.category || "")) return false;
    
    // Exclude categories
    if (props.excludeCategories?.length && 
        props.excludeCategories.includes(frontmatter.category || "")) return false;
    
    // Tags filtering - check if article has ANY of the specified tags
    if (props.filterTags?.length) {
      const articleTags = frontmatter.tags || [];
      const hasMatchingTag = props.filterTags.some(tag => articleTags.includes(tag));
      if (!hasMatchingTag) return false;
    }
    
    // Exclude tags - exclude if article has ANY of the excluded tags
    if (props.excludeTags?.length) {
      const articleTags = frontmatter.tags || [];
      const hasExcludedTag = props.excludeTags.some(tag => articleTags.includes(tag));
      if (hasExcludedTag) return false;
    }
    
    // Date range filtering
    if (props.startDate || props.endDate) {
      const articleDate = new Date(frontmatter.date);
      if (props.startDate && articleDate < new Date(props.startDate)) return false;
      if (props.endDate && articleDate > new Date(props.endDate)) return false;
    }
    
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