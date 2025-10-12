<template>
  <a class="return-text" :href="returnLinkValue">{{ returnTextValue }}</a>
  <header class="post-header">
    <h1 v-if="!props.hideTitle" class="post-title">{{ frontmatter.title }}</h1>
    <img
      v-if="!props.hideBanner && frontmatter.banner"
      :src="frontmatter.banner"
      alt="Banner Image"
      class="banner-image"
    />
    <div class="post-info">
      <div v-if="!props.hideAuthor && author.name" class="author-section">
        <img 
          v-if="author.avatar" 
          :src="author.avatar" 
          alt="Author's Avatar" 
          class="author-avatar" 
        />
        <div class="author-details">
          <a 
            v-if="author.url" 
            :href="author.url" 
            class="author-name"
          >
            {{ author.name }}
          </a>
          <span 
            v-else 
            class="author-name author-name--no-link"
          >
            {{ author.name }}
          </span>
          <p class="author-description">{{ author.description }}</p>
        </div>
      </div>
      <div class="meta-data">
        <p v-if="!props.hideDate && frontmatter.date">
          {{
            new Date(frontmatter.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <p v-if="!props.hideCategory && frontmatter.category">
          Category: {{ frontmatter.category }}
        </p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useData } from "vitepress";

interface Props {
  returnLink?: string;
  returnText?: string;
  hideTitle?: boolean;
  hideDate?: boolean;
  hideAuthor?: boolean;
  hideCategory?: boolean;
  hideBanner?: boolean;
  authorsDataKey?: string;
}

interface Frontmatter {
  title: string;
  banner?: string;
  date?: string;
  category?: string;
  author?: string;
  returnLinkValue?: string;
  returnTextValue?: string;
}

interface Author {
  name: string;
  avatar?: string;
  url?: string;
  description?: string;
}

const props = defineProps<Props>();
const authorsInjectKey = props.authorsDataKey || "authors";
const authors = inject<Record<string, Author>>(authorsInjectKey) || {};
const { page } = useData();
const frontmatter = page.value.frontmatter as Frontmatter;
const author = ref<Author>(authors[frontmatter.author || ""] || { name: "" });
const returnLinkValue = ref<string>(
  props.returnLink || frontmatter.returnLinkValue || "/"
);
const returnTextValue = ref<string>(
  "← " + (props.returnText || frontmatter.returnTextValue || "Back Home")
);
</script>

<style scoped>
.return-text {
  display: block;
  margin-bottom: 2rem;
  color: var(--vp-c-text-3);
  text-decoration: none;
}

.banner-image {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 8px;
  margin: 0 auto 2rem;
  display: block;
}

.post-title {
  font-size: 2em;
  margin-bottom: 2rem;
  text-align: center;
}

.post-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 2rem;
  max-width: 800px;
  flex-wrap: wrap;
}

.author-section {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.author-details {
  text-align: left;
}

.author-name {
  font-weight: bold;
  font-size: 1.2em;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.author-name:hover {
  color: var(--vp-c-brand-1);
}

.author-name--no-link {
  cursor: default;
}

.author-name--no-link:hover {
  color: var(--vp-c-text-1);
}

.author-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.meta-data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--vp-c-text-2);
  font-size: 0.9em;
  margin-left: 1rem;
}

.meta-data p {
  margin: 0;
}
</style>