import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, Star, Check, ArrowLeft, Heart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function PackageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const loadPackage = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(`${API_URL}/packages/${id}`);
        if (!res.ok) throw new Error('Failed to fetch package');
        const data = await res.json();
        setPkg(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPackage();
  }, [id]);

  const handleBook = () => {
    if (!user) {
      toast.error('Please log in to book a package');
      navigate('/login');
      return;
    }
    navigate(`/booking/${id}`);
  };

  const toggleWishlist = () => {
    if (!user) {
      toast.error('Please log in to add to wishlist');
      navigate('/login');
      return;
    }
    setWishlisted(!wishlisted);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    // Implement API call for wishlist here
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-page">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="w-32 h-10 mb-8" />
          <Skeleton className="w-full h-[500px] rounded-[24px] mb-8" />
          <Skeleton className="w-1/2 h-12 mb-4" />
          <Skeleton className="w-full h-32" />
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy mb-4">Package Not Found</h1>
          <Link to="/packages"><Button glow>Browse Packages</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-page">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/packages" className="inline-flex items-center text-teal hover:text-cyan transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Packages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="relative h-[400px] sm:h-[500px] rounded-[24px] overflow-hidden shadow-2xl">
              <img 
                src={pkg.image || pkg.images?.[0]?.url || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'} 
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={toggleWishlist}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all ${wishlisted ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white/80 text-navy hover:bg-white backdrop-blur-md'}`}
              >
                <Heart className={`w-6 h-6 ${wishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            <section>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-navy/10 text-navy text-sm font-bold px-4 py-2 rounded-full flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> {pkg.destination}
                </span>
                <span className="bg-navy/10 text-navy text-sm font-bold px-4 py-2 rounded-full flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> {pkg.duration || `${pkg.days} days / ${pkg.nights} nights`}
                </span>
                {pkg.rating && (
                  <span className="bg-amber-400/20 text-amber-600 text-sm font-bold px-4 py-2 rounded-full flex items-center">
                    <Star className="w-4 h-4 mr-2 fill-amber-500 text-amber-500" /> {pkg.rating}
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-6">{pkg.title}</h1>
              <p className="text-muted leading-relaxed text-lg whitespace-pre-wrap">
                {pkg.description || 'Experience the best of ' + pkg.destination + ' with our curated travel package.'}
              </p>
            </section>

            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-navy mb-6">Itinerary</h2>
                <div className="space-y-6">
                  {pkg.itinerary.map((day: any, i: number) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold shrink-0">
                          Day {day.day}
                        </div>
                        {i < pkg.itinerary.length - 1 && <div className="w-px h-full bg-border mt-4" />}
                      </div>
                      <div className="pb-8">
                        <h3 className="text-xl font-bold text-navy mb-2">{day.title}</h3>
                        <p className="text-muted">{day.activities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <section className="glass p-6 rounded-[24px] border border-border/50">
                  <h3 className="text-xl font-bold text-navy mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {pkg.inclusions.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <div>
            <div className="glass rounded-[24px] p-8 border border-border/50 shadow-xl sticky top-32">
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-muted mb-2">Price per person</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-teal">{formatCurrency(pkg.price)}</span>
                  {pkg.discount > 0 && (
                    <span className="text-lg text-muted line-through mb-1">
                      {formatCurrency(pkg.price * (1 + pkg.discount / 100))}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted">
                  <span>Duration</span>
                  <span className="font-semibold text-navy">{pkg.duration || `${pkg.days} days / ${pkg.nights} nights`}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Max Travelers</span>
                  <span className="font-semibold text-navy">{pkg.maxTravelers || 10}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Availability</span>
                  <span className="font-semibold text-green-600">Available</span>
                </div>
              </div>

              <Button onClick={handleBook} size="lg" className="w-full text-lg h-14" glow>
                Book Now
              </Button>
              <p className="text-center text-xs text-muted mt-4">No credit card required yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
