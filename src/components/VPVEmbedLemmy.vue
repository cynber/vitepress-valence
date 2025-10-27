<template>
  <VerticalContainer
    :header-title="headerTitle"
    :header-subtitle="headerSubtitle"
    :header-date="headerDate"
    :header-link="headerLink"
    :header-title-lines="headerTitleLines"
    :header-subtitle-lines="headerSubtitleLines"
    :header-date-format="headerDateFormat"
    :header-date-prefix="headerDatePrefix"
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
  // Header props (matching ContainerHeader)
  headerTitle?: string;
  headerSubtitle?: string;
  headerDate?: string;
  headerDateFormat?: "long" | "short" | "iso" | string;
  headerDatePrefix?: string;
  headerLink?: string;
  headerTitleLines?: number;
  headerSubtitleLines?: number;
  
  // Embed content props
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
  headerTitleLines: 2,
  headerSubtitleLines: 1,
  headerDateFormat: "long",
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