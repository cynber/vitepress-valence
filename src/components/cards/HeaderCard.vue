<template>
  <div class="top-bar">
    <div class="title-date-container">
      <component
        :is="link ? 'a' : 'span'"
        class="gallery-title"
        :href="link || undefined"
      >
        {{ title }}
      </component>
      <span
        v-if="formattedDateTime"
        class="gallery-date"
        v-html="formattedDateTime"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface TitleCardProps {
  title: string;
  date?: string;
  time?: string;
  titleLines?: number;
  link?: string;
  dateFormat?: "long" | "iso";
  dateTimeDescription?: string;
}

const props = withDefaults(defineProps<TitleCardProps>(), {
  titleLines: 2,
  date: "",
  time: "",
  dateFormat: "long",
});

const formattedDateTime = computed(() => {
  let datetime = "";

  // Handle date
  if (props.date) {
    const dateObj = new Date(props.date);
    if (!isNaN(dateObj.getTime())) {
      if (props.dateFormat === "iso") {
        // ISO format: YYYY-MM-DD
        datetime = dateObj.toISOString().split("T")[0];
      } else {
        // Long format: Month DD, YYYY
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

  // Handle time
  if (props.time) {
    const timeMatch = props.time.match(
      /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$/
    );
    if (timeMatch) {
      const [, hours, minutes] = timeMatch;
      const timeStr = `${hours.padStart(2, "0")}:${minutes}`;
      datetime = datetime ? `${datetime} at ${timeStr}` : timeStr;
    }
  }

  if (props.dateTimeDescription && datetime) {
    return `${props.dateTimeDescription} ${datetime}`;
  }

  return datetime;
});
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  margin: -8px -8px 0px -8px;
  width: calc(100% + 16px);
  box-sizing: border-box;
}

.title-date-container {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}

.gallery-title {
  font-weight: 500;
  color: var(--vp-c-text-1);
  display: -webkit-box;
  -webkit-line-clamp: var(--max-lines);
  line-clamp: var(--max-lines);
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  text-decoration: none;
}

a.gallery-title {
  cursor: pointer;
}

a.gallery-title:hover {
  color: var(--vp-c-brand);
  text-decoration: underline;
}

.gallery-date {
  font-size: 1rem;
  font-weight: normal;
  color: var(--vp-c-text-2);
  transition: color 0.3s ease-in-out;
  align-self: flex-end;
  margin-top: 4px;
}

@media (min-width: 768px) {
  .title-date-container {
    flex-direction: row;
    align-items: center;
  }

  .gallery-title {
    flex: 1;
    margin-right: 1rem;
  }

  .gallery-date {
    flex-shrink: 0;
    margin-top: 0;
  }
}
</style>
