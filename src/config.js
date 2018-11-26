const baseUrl = 'https://hacker-news.firebaseio.com/v0/'

export default {
  nbTopStories: 10,
  nbTopComments: 20,
  urls: {
    item: id => baseUrl + 'item/' + id + '.json',
    topstories: baseUrl + 'topstories.json'
  }
}
