<template>
  <div class="container-header">
    <div class="title-content">
      <component
        :is="link ? 'a' : 'span'"
        class="header-title"
        :href="link || undefined"
        :style="{ '--line-clamp-title': titleLines || 2 }"
      >
        {{ title }}
      </component>
      <span
        v-if="subtitle"
        class="header-subtitle"
        :style="{ '--line-clamp-subtitle': subtitleLines || 1 }"
      >
        {{ subtitle }}
      </span>
      <span
        v-if="formattedDateTime"
        class="header-date"
        v-html="formattedDateTime"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ContainerHeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
  link?: string;
  titleLines?: number;
  subtitleLines?: number;
  dateFormat?: "long" | "iso";
  description?: string;
}

const props = withDefaults(defineProps<ContainerHeaderProps>(), {
  titleLines: 2,
  subtitleLines: 1,
  dateFormat: "long",
});

const formattedDateTime = computed(() => {
  let datetime = "";

  if (props.date) {
    const dateObj = new Date(props.date);
    if (!isNaN(dateObj.getTime())) {
      if (props.dateFormat === "iso") {
        datetime = dateObj.toISOString().split("T")[0];
      } else {
        const dateOptions: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        datetime = dateObj.toLocaleDateString(undefined, dateOptions);
      }
    } else {
      datetime = props.date;
    }
  }

  if (props.description && datetime) {
    return `${props.description} ${datetime}`;
  }

  return datetime;
});
</script>

<style scoped>
.container-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--vp-c-bg);
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin: 0 0 0.25rem 0;
  width: 100%;
  box-sizing: border-box;
}

.title-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}

.header-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-title);
  line-clamp: var(--line-clamp-title);
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  text-decoration: none;
}

.header-subtitle {
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-subtitle);
  line-clamp: var(--line-clamp-subtitle);
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.header-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

a.header-title {
  cursor: pointer;
}

a.header-title:hover {
  color: var(--vp-c-brand);
  text-decoration: underline;
}
</style>