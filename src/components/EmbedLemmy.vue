<template>
  <VerticalContainer>
    <EmbedCardLemmy
      v-for="(link, index) in links"
      :key="index"
      :url="link"
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
import { defineProps } from "vue";
import VerticalContainer from "./containers/VerticalContainer.vue";
import EmbedCardLemmy from "./cards/EmbedCardLemmy.vue";

interface EmbedLemmyProps {
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
}

const props = defineProps<EmbedLemmyProps>();

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
