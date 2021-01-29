<template>
  <div>
  
    <!-- 元々のテンプレート内のコードを全削除し、代わりにここから追加 -->
    <Item 
      v-for="work in works" 
      :key="work.sys.id"
      :work="work" 

    />
    <!-- ここまで追加 -->
    
  </div>
</template>

<script>
  import Item from '@/components/Item' // ここを追加

  import { createClient } from '~/plugins/contentful.js'
  const client = createClient()
  export default { 
    components: {
    Item
  },
    asyncData() {
      return Promise.all([
        client.getEntries({
          'content_type': 'work', // workタイプの記事データを全取得
          order: '-sys.createdAt' // 作成日時順に並べる
        })
      ]).then(([works]) => {
        return {
          works: works.items // 取得したデータを配列worksに入れる
        }
      }).catch(console.error)
    }
  }
  </script>