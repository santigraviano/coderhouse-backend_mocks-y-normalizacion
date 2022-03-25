export const serializeItems = (data) => data.map(item => {
  item._id = item._id.toString()
  return item
})