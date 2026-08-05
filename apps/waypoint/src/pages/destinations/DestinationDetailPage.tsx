import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/Skeleton';
import { MapPin, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now we might just fetch all and find the one, or the API might have findOne if the subagent finished.
    // Assuming backend subagent implements GET /destinations/:id
    const loadDestination = async () => {
      try {
        const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
        const res = await fetch(`${API_URL}/destinations/${id}`);
        if (!res.ok) throw new Error('Failed to fetch destination');
        const data = await res.json();
        setDestination(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-page">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="w-32 h-10 mb-8" />
          <Skeleton className="w-full h-[400px] rounded-[24px] mb-8" />
          <Skeleton className="w-1/2 h-12 mb-4" />
          <Skeleton className="w-full h-32" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy mb-4">Destination Not Found</h1>
          <Link to="/destinations"><Button glow>Back to Destinations</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-page">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/destinations" className="inline-flex items-center text-teal hover:text-cyan transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explore
        </Link>
        
        <div className="relative h-[400px] sm:h-[500px] rounded-[24px] overflow-hidden mb-12 shadow-2xl">
          <img 
            src={destination.gallery?.[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop'} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-teal text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                <MapPin className="w-3 h-3 inline mr-1" /> {destination.location}
              </span>
              {destination.reviews?.length > 0 && (
                <span className="bg-amber-400 text-navy text-xs font-bold px-3 py-1.5 rounded-full flex items-center">
                  <Star className="w-3 h-3 fill-navy mr-1" />
                  {(destination.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / destination.reviews.length).toFixed(1)}
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 shadow-sm">{destination.name}</h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl font-light">
              Best season: {destination.bestSeason} • Weather: {destination.weather}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">About this destination</h2>
              <p className="text-muted leading-relaxed text-lg">
                {destination.description || 'No description available for this destination yet.'}
              </p>
            </section>
            
            {destination.gallery?.length > 1 && (
              <section>
                <h2 className="text-2xl font-bold text-navy mb-4">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {destination.gallery.slice(1).map((img: string, i: number) => (
                    <div key={i} className="aspect-square rounded-[16px] overflow-hidden">
                      <img src={img} alt={`${destination.name} ${i+1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div>
            <div className="glass rounded-[24px] p-6 border border-border/50 shadow-xl sticky top-32">
              <h3 className="text-xl font-bold text-navy mb-6">Available Packages</h3>
              {destination.packages?.length > 0 ? (
                <div className="space-y-4">
                  {destination.packages.map((pkg: any) => (
                    <Link key={pkg.id} to={`/packages/${pkg.id}`} className="group block">
                      <div className="flex gap-4 p-3 rounded-[16px] hover:bg-white/50 transition-colors border border-transparent hover:border-border/50">
                        <div className="w-20 h-20 rounded-[12px] overflow-hidden shrink-0">
                          <img src={pkg.image || pkg.images?.[0]?.url || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070'} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-navy line-clamp-2 group-hover:text-teal transition-colors text-sm mb-1">{pkg.title || pkg.name}</h4>
                          <p className="text-teal font-bold">${pkg.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-sm text-center py-8">No packages currently available for this destination.</p>
              )}
              
              <Link to="/packages" className="block mt-6">
                <Button className="w-full" variant="outline">Browse all packages</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
