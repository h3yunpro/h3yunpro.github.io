import { defineClientConfig } from 'vuepress/client'


import './theme/styles/custom.css'

import sql2api from './plugs/sql2api/sql2api.vue'
import schemaStructure from './plugs/schema_structure/schema_structure.vue'

export default defineClientConfig({
  enhance({ app }) {

    app.component('sql2api', sql2api)
    app.component('schemaStructure', schemaStructure)
  },
})
