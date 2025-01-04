<script setup>
import { ref } from "vue";
import { useData } from "vitepress";
import { data as authors } from "../../data/authors.data.js";

const { page } = useData();
const frontmatter = page.value.frontmatter;
const author = ref(authors[frontmatter.author] || {});

const returnLink = ref(frontmatter.returnLink || "/");
const returnText = ref(frontmatter.returnText || "← Back Home");
</script>

<template>
  <a class="return-text" :href="returnLink">{{ returnText }}</a>
  <header class="post-header">
    <h1 class="post-title">{{ frontmatter.title }}</h1>
    <img
      v-if="frontmatter.banner"
      :src="frontmatter.banner"
      alt="Banner Image"
      class="banner-image"
    />
    <div class="post-info">
      <div v-if="author.name" class="author-section">
        <img :src="author.avatar" alt="Author's Avatar" class="author-avatar" />
        <div class="author-details">
          <a :href="author.url" class="author-name">{{ author.name }}</a>
          <p class="author-description">{{ author.description }}</p>
        </div>
      </div>
      <div class="meta-data">
        <p v-if="frontmatter.date">
          {{
            new Date(frontmatter.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <p v-if="frontmatter.category">Category: {{ frontmatter.category }}</p>
      </div>
    </div>
  </header>
</template>

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
