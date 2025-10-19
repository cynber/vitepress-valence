/**
* Primary exports (recommended usage with Vpv namespace)
*/

// Card Components
export { default as VpvCardHorizontal } from './cards/HorizontalCard.vue'
export { default as VpvCardVertical } from './cards/VerticalCard.vue'

// Container Components
export { default as VpvContainerHorizontal } from './containers/HorizontalContainer.vue'
export { default as VpvContainerVertical } from './containers/VerticalContainer.vue'

// Article Components
export { default as VpvArticleHeader } from './VPVArticleHeader.vue'
export { default as VpvArticleList } from './VPVArticleList.vue'

// Table Components
export { default as VpvTableJSON } from './VPVJSONTable.vue'

// Image / Gallery Components
export { default as VpvImageGallery } from './VPVImageGallery.vue'
export { default as VpvImage } from './VPVImage.vue'

// Embed / Social Components
export { default as VpvEmbedLemmy } from './VPVEmbedLemmy.vue'
export { default as VpvEmbedMailchimp } from './VPVEmbedMailchimp.vue'


/**
* Legacy exports (maintained for backward compatibility)
*/
export { default as HorizontalCard } from './cards/HorizontalCard.vue'
export { default as VerticalCard } from './cards/VerticalCard.vue'
export { default as HorizontalContainer } from './containers/HorizontalContainer.vue'
export { default as VerticalContainer } from './containers/VerticalContainer.vue'
export { default as JSONTable } from './VPVJSONTable.vue'
export { default as ImageGallery } from './VPVImageGallery.vue'
export { default as EmbedLemmy } from './VPVEmbedLemmy.vue'
export { default as EmbedMailchimpSubscribe } from './VPVEmbedMailchimp.vue'

/**
* @deprecated Components scheduled for removal in v1.0.0
* These components are no longer maintained and will be removed in the next major version.
* Please migrate to their newer alternatives.
*/
export { default as BlogPostsVertical } from './deprecated/BlogPostsVertical.vue'
export { default as BlogPostsHorizontal } from './deprecated/BlogPostsHorizontal.vue'
export { default as BlogPostHeader } from './deprecated/BlogPostHeader.vue'
export { default as HeaderCard } from './deprecated/HeaderCard.vue'
export { default as BlogPostList } from './deprecated/BlogPostList.vue'