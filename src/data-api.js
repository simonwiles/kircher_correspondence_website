import volumesData from './data/volumes.json';
import itemsData from './data/items.json';

export const loadVolumes = () => {
  return volumesData;
};

export const loadVolumeById = (volumeId) => {
  return volumesData.find(v => v.volume_id === parseInt(volumeId, 10));
};

export const loadItems = () => {
  return itemsData;
};

export const loadItemsByVolume = (volumeId) => {
  return itemsData.filter(item => item.volume_id === parseInt(volumeId, 10));
};

export const loadItemByCanvas = (canvasLink) => {
  return itemsData.find(item => item.canvas_link === canvasLink);
};

export const searchItems = (query, options = {}) => {
  const { language, limit = 50, offset = 0 } = options;
  
  let results = [...itemsData];
  
  if (query) {
    const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 0);
    
    results = results.filter(item => {
      const searchableFields = [
        item.title_name,
        item.title_description,
        item.related_people,
        item.topics,
        item.location,
        item.modern_day_country,
        item.title_id
      ].filter(Boolean).map(f => f.toLowerCase());
      
      return searchTerms.every(term => 
        searchableFields.some(field => field.includes(term))
      );
    });
  }
  
  if (language) {
    results = results.filter(item => item.language === language);
  }
  
  results.sort((a, b) => a.item_id - b.item_id);
  
  return {
    results: results.slice(offset, offset + limit),
    total: results.length
  };
};

export const searchItemsByKeyword = (search, volumeId) => {
  if (!search || !volumeId) return [];
  
  const volumeItems = itemsData.filter(item => item.volume_id === parseInt(volumeId, 10));
  const searchTerm = search.toLowerCase();
  
  return volumeItems.filter(item => {
    const searchableFields = [
      item.title_name,
      item.related_folios,
      item.canvas_link
    ].filter(Boolean).map(f => f.toLowerCase());
    
    return searchableFields.some(field => field.includes(searchTerm));
  }).slice(0, 20);
};
