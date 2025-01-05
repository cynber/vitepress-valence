import BlogPostHeader from './BlogPostHeader.vue'
import JSONTable from './JSONTable.vue'

export { BlogPostHeader, JSONTable }

// For Vue plugin usage
export default {
  install: (app: any) => {
    app.component('BlogPostHeader', BlogPostHeader)
    app.component('JSONTable', JSONTable)
  }
}
