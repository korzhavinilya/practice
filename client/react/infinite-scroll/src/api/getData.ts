export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function getPostQuery(post = 1): Promise<Post> {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${post}`).then(
    (response) => response.json()
  );
}
