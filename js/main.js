const postPage = new Vue({
  el: '#page',
  data() {
    return {
      views: 0,
      likes: 0,
      scrollY: 0,
      overTop: false
    }
  },
  mounted() {
    // this.fetchStats()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    fetchStats() {
      const grideaIdMeta = document.querySelector('meta[name="gridea:post_id"]')
      const postId = grideaIdMeta && grideaIdMeta.content
      if (!postId) {
        return
      }

      fetch(`//web.gridea.dev/api/post-stats?id=${postId}`).then((e) => {
        return e.json()
      }).then(response => {
        this.views = response.views || 0
        this.likes = response.likes || 0
      }).catch(error => {
        console.log('Error', error)
      })
    },
    likePost() {
      this.likes += 1
      const postId = document.querySelector('meta[name="gridea:post_id"]').content

      fetch(`//web.gridea.dev/api/like-post`, {
        body: JSON.stringify({
          postId,
        }),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then((e) => {
        return e.json()
      }).then(response => {
        console.log('Success liked')
      }).catch(error => {
        console.log('Error', error)
      })
    },
    handleScroll(e) {
      this.overTop = document.querySelector('#sticky-bar').getBoundingClientRect().top < 64
    },
  }
})
