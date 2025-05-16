export interface Article {
  id: string;
  title: string;
  category: string;
  description?: string;
  imageUrl: string;
  slug: string;
  publishedDate: string;
}

export interface CardProps {
  article: Article;
  priority?: boolean;
  className?: string;
} 