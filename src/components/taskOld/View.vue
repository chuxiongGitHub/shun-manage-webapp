<template lang="pug">
  .view
    app-tool-bar
    app-table
    app-page(style="margin-top:10px")
</template>
<script>
import AppTable from './Table'
import AppToolBar from './ToolBar'
import AppPage from './Page'
export default {
  components: { AppTable, AppToolBar, AppPage }
}
</script>

