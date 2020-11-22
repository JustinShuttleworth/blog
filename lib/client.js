import * as contentful from 'contentful'

const space = process.env.REACT_APP_SPACE_ID
const accessToken = process.env.REACT_APP_ACCESS_TOKEN

const client = contentful.createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchEntries() {
  const entries = await client.getEntries({content_type: "blogPost"})
  if (entries.items) return entries.items
  console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchEntry(slug) {
  const entry = await client.getEntries({
    'content_type': 'blogPost',
    'sys.id': slug
  });
  const [item] = entry.items;

  return item;
}

export default { fetchEntries, fetchEntry }