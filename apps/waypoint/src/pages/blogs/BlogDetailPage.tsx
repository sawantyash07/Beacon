import { useParams } from 'react-router-dom';
export default function BlogDetailPage() {
  const { id } = useParams();
  return <div className="min-h-screen pt-32 pb-20"><div className="max-w-7xl mx-auto px-4"><h1 className="text-4xl font-bold text-navy">Blog Detail: {id}</h1></div></div>
}
