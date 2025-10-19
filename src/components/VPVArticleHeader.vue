<template>
  <a class="return-text" :href="returnLinkValue">{{ returnTextValue }}</a>
  <header>
    <h1 v-if="!props.hideTitle" class="article-title">
      {{ frontmatter.title }}
    </h1>
    <p v-if="!props.hideSubtitle" class="article-subtitle">
      {{ frontmatter.subtitle }}
    </p>
    <VPVImage
      v-if="!props.hideFeatImage"
      :imageConfig="frontmatter.featured_image"
      :hideDescription="props.hideFeatImageDescription"
      defaultAlt="Featured Image"
      :enableBorder="true"
      :float="'none'"
      :width="props.featImageWidth"
      :height="props.featImageHeight"
      :aspectRatio="props.featImageAspectRatio"
      :maxWidth="props.featImageMaxWidth"
      :enableZoom="props.enableFeatImageZoom"
    />

    <div class="article-info">
      <div class="info-cards">
        <a
          v-if="!props.hideAuthor && author.name"
          class="author-section-link"
          :href="author.url"
        >
          <div class="author-section">
            <img
              v-if="author.avatar"
              :src="author.avatar"
              alt="Author's Avatar"
              class="author-avatar"
            />
            <div
              class="author-details"
              :class="{ 'no-avatar': !author.avatar }"
            >
              <span class="author-name">{{ author.name }}</span>
              <p class="author-description">{{ author.description }}</p>
            </div>
          </div>
        </a>
        <div v-if="hasMetaData" class="meta-data-card">
          <div class="meta-data">
            <p v-if="!props.hideDate && frontmatter.date">
              <strong>Date:</strong>
              {{ formatDate(frontmatter.date, { format: props.dateFormat || 'long' }) }}
            </p>
            <p v-if="!props.hideReadingTime && readingTime">
              <strong>Reading Time:</strong> {{ readingTime }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="
          (!props.hideCategory && frontmatter.category) ||
          (!props.hideTags && frontmatter.tags && frontmatter.tags.length > 0)
        "
        class="pills-container"
      >
        <div class="pills-content">
          <span
            v-if="!props.hideCategory && frontmatter.category"
            class="pill category-pill"
          >
            {{ frontmatter.category }}
          </span>
          <span
            v-if="!props.hideTags"
            v-for="tag in frontmatter.tags"
            :key="tag"
            class="pill"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import { useData } from "vitepress";
import { formatDate } from '@/utils/MyUtils';
import VPVImage from "./VPVImage.vue";

interface Props {
  returnLink?: string;
  returnText?: string;
  hideTitle?: boolean;
  hideSubtitle?: boolean;
  hideDate?: boolean;
  hideReadingTime?: boolean;
  hideAuthor?: boolean;
  hideCategory?: boolean;
  hideTags?: boolean;
  hideFeatImage?: boolean;
  hideFeatImageDescription?: boolean;
  authorsDataKey?: string;
  dateFormat?: string;
  featImageWidth?: string;
  featImageHeight?: string;
  featImageAspectRatio?: string;
  featImageMaxWidth?: string;
  enableFeatImageZoom?: boolean;
}

interface FeaturedImageConfig {
  image?: string;
  image_dark?: string;
  alt?: string;
  description?: string;
}

interface Frontmatter {
  title: string;
  subtitle?: string;
  featured_image?: FeaturedImageConfig;
  date?: string;
  reading_time?: number;
  category?: string;
  tags?: string[];
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

const { page } = useData();
const props = withDefaults(defineProps<Props>(), {
  featImageWidth: '100%',
  featImageHeight: 'auto',
  featImageAspectRatio: '16 / 9',
  featImageMaxWidth: '800px',
  enableFeatImageZoom: false,
});
const frontmatter = page.value.frontmatter as Frontmatter;

const authorsInjectKey = props.authorsDataKey || "authors";
const authors = inject<Record<string, Author>>(authorsInjectKey) || {};
const author = ref<Author>(authors[frontmatter.author || ""] || { name: "" });

const returnLinkValue = ref<string>(
  props.returnLink || frontmatter.returnLinkValue || "/"
);

const returnTextValue = ref<string>(
  "← " + (props.returnText || frontmatter.returnTextValue || "Back Home")
);

const readingTime = computed((): string | null => {
  if (frontmatter.reading_time) {
    const minutes = frontmatter.reading_time;
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  }
  return null;
});

const hasMetaData = computed((): boolean => {
  const hasDate = !props.hideDate && frontmatter.date;
  const hasReadingTime = !props.hideReadingTime && readingTime.value;

  return !!(hasDate || hasReadingTime);
});
</script>

<style lang="scss" scoped>
@use "../assets/main.scss" as main;

.return-text {
  display: block;
  margin-bottom: 2rem;
  color: var(--vp-c-text-3);
  text-decoration: none;
}

.article-title {
  font-size: 2em;
  margin-bottom: 1rem;
  text-align: center;
}

.article-subtitle {
  font-size: 1.2em;
  margin-bottom: 1rem;
  text-align: center;
}

.article-info {
  display: flex;
  flex-direction: column;
  margin: 1rem auto 2rem;
  max-width: 800px;
  gap: 1rem;
  border-radius: 18px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
  padding: 10px;
}

.info-cards {
  display: flex;
  gap: 1rem;
}

.author-section-link {
  text-decoration: none;
  color: inherit;
  display: block;
  flex: 1;
}

.author-section {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: var(--vp-c-bg);
  border-radius: 16px;
  border: 2px solid var(--vp-c-bg);
  transition: border-color 0.1s ease-in-out;
  height: 100%;
}

.author-section:hover {
  border-color: var(--vp-c-divider);
}

.meta-data-card {
  flex: 1;
  padding: 10px;
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-bg);
  border-radius: 16px;
  display: flex;
  align-items: center;
}

.meta-data-card:hover {
  border-color: var(--vp-c-divider);
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

  &.no-avatar {
    margin-left: 0;
  }
}

.author-name {
  font-weight: bold;
  font-size: 1.2em;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.author-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.meta-data {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}

.meta-data p {
  margin: 0;
}

.pills-container {
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--vp-c-bg-soft));
    pointer-events: none;
  }
}

.pills-content {
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
}

.pill {
  @include main.vpv-tag-card;
}

.category-pill {
  @include main.vpv-tag-card-branded;
}

@media (max-width: 500px) {
  .info-cards {
    flex-direction: column;
  }
}
</style>
