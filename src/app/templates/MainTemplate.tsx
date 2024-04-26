import { PostInterface } from "../../interfaces/interfaces";
import CountryFlagsComponent from "../components/CountryFlagsComponent";
import { useState, useEffect } from "react";
import '@justinribeiro/lite-tiktok';

interface MainTemplateProps {
  posts: PostInterface[];
}

const MainTemplate = ({ posts }: MainTemplateProps) => {
  const [visiblePosts, setVisiblePosts] = useState<PostInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom && !isLoading) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const nextPagePosts = posts?.slice(
        visiblePosts.length,
        visiblePosts.length + 10
      );
      setTimeout(() => {
        setVisiblePosts((prevPosts) => [...prevPosts, ...nextPagePosts]);
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-10 bg-gray-900 flex flex-col justify-center items-center">
      <div className="w-full  bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
            {posts?.length} TikTok Trending Videos
          </h1>
          <CountryFlagsComponent />
        </div>

        
        <div className="grid gap-6">
          {visiblePosts?.map((post, index) => (
            <div
              key={index}
              className="bg-gray-100 pt-10  rounded-lg flex-rap  flex flex-col sm:flex-row"
            >
              <div className=" rounded-md  aspect-h-9 w-full">
                <Lite-tiktok  videoid={post.videoId} autoload></Lite-tiktok>
              </div>
              <div className="sm:w-2/3 overflow-hidden">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.authorName}
                </h2>
                <p className="text-gray-700 mb-4">
                  Description: {post.description}
                </p>
                <a
                  href={post.videoLink}
                  className="text-blue-500 hover:underline"
                >
                  Voir sur TikTok
                </a>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <p className="text-gray-600">Chargement en cours...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainTemplate;
