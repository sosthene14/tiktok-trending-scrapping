import MainTemplate from "../templates/MainTemplate";
import { useEffect, useState } from "react";
import { PostInterface } from "../../interfaces/interfaces";
import axios from 'axios';

export default function MainComponent() {
  const [data, setData] = useState<PostInterface[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_posts');
      console.log(response.data);
      return response.data.posts;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données des posts :', error);
      return [];
    }
  };

  const getPostsCached = async () => {
    try {
        const newPosts = await fetchPosts();
        return newPosts;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données des posts depuis le cache :', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPostsCached();
      setData(posts);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <MainTemplate posts={data} />
    </div>
  );
}
