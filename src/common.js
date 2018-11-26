import axios from 'axios';
import config from './config';

export default {
  fetchItems: itemIds => {
    let itemRequests = [];
    
    for (let itemId of itemIds) {
      let itemRequest = axios.get(config.urls.item(itemId));
      itemRequests.push(itemRequest);
    }
    
    return axios.all(itemRequests);
  }
}
