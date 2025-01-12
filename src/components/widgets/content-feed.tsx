import { useState, useEffect } from "react";

interface DevToPost {
  title: string;
  url: string;
  user: {
    name: string;
  };
  readable_publish_date: string;
  cover_image: string;
  social_image: string;
}

interface ProductHuntProduct {
  node: {
    name: string;
    tagline: string;
    url: string;
    votesCount: number;
    thumbnail: {
      url: string;
    };
  };
}

interface ContentFeedProps {
  type: 'products' | 'posts';
}

export function ContentFeed({ type }: ContentFeedProps) {
  const [devToPosts, setDevToPosts] = useState<DevToPost[]>([]);
  const [productHuntProducts, setProductHuntProducts] = useState<ProductHuntProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevToPosts = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?top=7');
        if (!response.ok) throw new Error('Failed to fetch Dev.to posts');
        const data = await response.json();
        setDevToPosts(data.slice(0, 3));
      } catch (err) {
        setError('Failed to load Dev.to posts');
        console.error(err);
      }
    };

    const fetchProductHuntProducts = async () => {
      try {
        const query = `
          query {
            posts(first: 3, order: RANKING) {
              edges {
                node {
                  name
                  tagline
                  url
                  votesCount
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        `;

        const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sQwwHMdN5IYxkS4tL8NsebCQJnMUvokMQNIgNRAcEqU',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) throw new Error('Failed to fetch Product Hunt products');
        const data = await response.json();
        setProductHuntProducts(data.data.posts.edges);
      } catch (err) {
        setError('Failed to load Product Hunt products');
        console.error(err);
      }
    };

    const fetchContent = async () => {
      setLoading(true);
      if (type === 'posts') {
        await fetchDevToPosts();
      } else {
        await fetchProductHuntProducts();
      }
      setLoading(false);
    };

    fetchContent();
  }, [type]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-20 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (type === 'products') {
    return (
      <>
        {productHuntProducts.map((product, index) => (
          <a
            key={index}
            href={product.node.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-4">
              {product.node.thumbnail?.url && (
                <img 
                  src={product.node.thumbnail.url} 
                  alt={product.node.name}
                  className="w-16 h-16 rounded-lg object-cover bg-background"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate text-base">
                  {product.node.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.node.tagline}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ▲ {product.node.votesCount} votes
                </p>
              </div>
            </div>
          </a>
        ))}
      </>
    );
  }

  return (
    <>
      {devToPosts.map((post, index) => (
        <a
          key={index}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-4">
            {(post.cover_image || post.social_image) && (
              <img 
                src={post.cover_image || post.social_image}
                alt={post.title}
                className="w-16 h-16 rounded-lg object-cover bg-background"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-base mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                By {post.user.name} • {post.readable_publish_date}
              </p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
} 