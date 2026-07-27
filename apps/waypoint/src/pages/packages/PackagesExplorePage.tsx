import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPackages } from '@/services/api';
import { Skeleton } from '@/components/ui/Skeleton';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, MapPin, Clock, Star, Users, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { packages as mockPackages } from '@/data/mockData';

export default function PackagesExplorePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        const data = await fetchPackages(search);
        if (data && data.length > 0) {
          setItems(data);
        } else {
          // fallback to mock if DB is empty
          setItems(search ? mockPackages.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.destination.toLowerCase().includes(search.toLowerCase())) : mockPackages);
        }
      } catch (err) {
        console.error(err);
        setItems(search ? mockPackages.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.destination.toLowerCase().includes(search.toLowerCase())) : mockPackages);
      } finally {
        setLoading(false);
      }
    };
    
    const timeout = setTimeout(() => {
      loadPackages();
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-page">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-4">Explore Travel Packages</h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Find and book your next adventure from our curated list of premium travel experiences.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16 relative">
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by destination, name, or keywords..."
            className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg border-border"
          />
          <Search className="w-6 h-6 text-muted absolute left-4 top-4" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-[400px] rounded-[20px]" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((pkg) => (
              <div key={pkg.id} className="group relative h-full">
                <Link
                  to={`/packages/${pkg.id}`}
                  className="block glass rounded-[20px] overflow-hidden border border-border/50 hover:border-teal/30 transition-all duration-300 hover:shadow-xl relative h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img
                      src={pkg.image || pkg.images?.[0]?.url || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-navy/80 backdrop-blur-sm text-cyan text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-cyan/20">
                        <MapPin className="w-3 h-3" /> {pkg.destination}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-muted text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {pkg.rating || 4.8}
                      </div>
                    </div>

                    <h3 className="text-navy font-bold text-lg mb-2 line-clamp-2">{pkg.title}</h3>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Users className="w-3.5 h-3.5 text-teal" /> {pkg.bookings || 0} booked
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted mb-1">Starting from</p>
                        <p className="text-xl font-bold text-teal">{formatCurrency(pkg.price)}</p>
                      </div>
                      
                      <button className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted">No packages found matching your search.</p>
            <Button className="mt-6" variant="outline" onClick={() => setSearch('')}>Clear Search</Button>
          </div>
        )}
      </div>
    </div>
  );
}
