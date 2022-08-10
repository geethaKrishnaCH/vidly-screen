export function filter(items, field, value) {
  if (value === 'all') {
    return items;
  }
  const keys = field.split(".")
  
  return items.filter(item => {
    keys.forEach(key => {
      item = item[key]
    });
    return item === value;
  });
}