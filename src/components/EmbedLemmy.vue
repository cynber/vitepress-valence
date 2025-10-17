<template>
  <VerticalContainer
    :title="headerTitle"
    :date="headerDate"
    :header-link="headerLink"
    :title-lines="headerTitleLines"
    :hide-header="!showTitleCard"
  >
    <EmbedCardLemmy
      v-for="(link, index) in links"
      :key="index"
      :url="link"
      :dateFormat="dateFormat"
      :hideUser="hideUser"
      :hideCommunity="hideCommunity"
      :hideTitle="hideTitle"
      :hideBanner="hideBanner"
      :hideExcerpt="hideExcerpt"
      :hideScore="hideScore"
      :hideComments="hideComments"
      :hideDate="hideDate"
      :titleLines="titleLines"
      :excerptLines="excerptLines"
    />
  </VerticalContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import VerticalContainer from "./containers/VerticalContainer.vue";
import EmbedCardLemmy from "./cards/EmbedCardLemmy.vue";

interface EmbedLemmyProps {
  headerTitle?: string;
  headerTitleLines?: number;
  headerLink?: string;
  headerDate?: string;
  links: string[];
  hideUser?: boolean;
  hideCommunity?: boolean;
  hideTitle?: boolean;
  hideBanner?: boolean;
  hideExcerpt?: boolean;
  hideScore?: boolean;
  hideComments?: boolean;
  hideDate?: boolean;
  titleLines?: number;
  excerptLines?: number;
  dateFormat?: string;
}

const props = withDefaults(defineProps<EmbedLemmyProps>(), {
  headerTitle: '',
  headerDate: '',
});

const showTitleCard = computed(() => {
  return !!(props.headerTitle || props.headerDate || props.headerLink);
});

const {
  links,
  hideUser,
  hideCommunity,
  hideTitle,
  hideBanner,
  hideExcerpt,
  hideScore,
  hideComments,
  hideDate,
  titleLines,
  excerptLines,
} = props;
</script>