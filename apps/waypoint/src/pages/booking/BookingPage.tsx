import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, CreditCard, Users, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export default function BookingPage() {
  const { packageId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState('');

  useEffect(() => {
    const loadPackage = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(`${API_URL}/packages/${packageId}`);
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
  }, [packageId]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error('Please select a travel date');
      return;
    }
    
    setSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      // Assume subagent built POST /bookings
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Usually pass token here
        },
        body: JSON.stringify({
          userId: user?.id,
          packageId: pkg.id,
          travelers,
          date,
          totalPrice: pkg.price * travelers,
          status: 'PENDING'
        }),
      });

      if (!res.ok) throw new Error('Failed to create booking');
      
      toast.success('Booking confirmed successfully!');
      navigate('/dashboard/bookings');
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-32 pb-20 bg-page flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-teal border-t-transparent animate-spin" /></div>;
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

  const totalPrice = pkg.price * travelers;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-page">
      <div className="max-w-5xl mx-auto px-4">
        <Link to={`/packages/${packageId}`} className="inline-flex items-center text-teal hover:text-cyan transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Package
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-[24px] p-8 border border-border/50 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal" /> Traveler Details
              </h2>
              <form id="booking-form" onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    label="Primary Traveler Name"
                    value={user?.name || ''}
                    disabled
                  />
                  <Input 
                    label="Email Address"
                    value={user?.email || ''}
                    disabled
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Number of Travelers</label>
                    <div className="flex items-center border border-border rounded-[14px] p-1 bg-surface w-fit">
                      <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-10 h-10 rounded-[10px] hover:bg-black/5 flex items-center justify-center text-navy font-bold">-</button>
                      <span className="w-12 text-center font-bold">{travelers}</span>
                      <button type="button" onClick={() => setTravelers(Math.min(10, travelers + 1))} className="w-10 h-10 rounded-[10px] hover:bg-black/5 flex items-center justify-center text-navy font-bold">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Travel Date</label>
                    <input 
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full h-[52px] px-4 rounded-[14px] bg-surface border border-border text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="glass rounded-[24px] p-8 border border-border/50 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal" /> Payment Information
              </h2>
              <div className="bg-teal/5 border border-teal/20 rounded-[16px] p-4 flex gap-4 mb-6">
                <ShieldCheck className="w-6 h-6 text-teal shrink-0" />
                <p className="text-sm text-teal-800">Your payment is secure. We use industry standard encryption to protect your personal information.</p>
              </div>
              <p className="text-muted text-sm mb-4">Note: This is a demo application. No actual payment will be processed.</p>
              <Input label="Card Number" placeholder="**** **** **** ****" maxLength={19} />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input label="Expiry Date" placeholder="MM/YY" maxLength={5} />
                <Input label="CVC" placeholder="***" maxLength={3} type="password" />
              </div>
            </div>
          </div>

          <div>
            <div className="glass rounded-[24px] p-6 border border-border/50 shadow-xl sticky top-32">
              <h3 className="font-bold text-navy mb-4 pb-4 border-b border-border">Booking Summary</h3>
              
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 rounded-[12px] overflow-hidden shrink-0">
                  <img src={pkg.image || pkg.images?.[0]?.url} alt={pkg.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-navy line-clamp-2 text-sm">{pkg.title}</h4>
                  <p className="text-xs text-muted mt-1">{pkg.duration || `${pkg.days} days / ${pkg.nights} nights`} • {pkg.destination}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">{formatCurrency(pkg.price)} x {travelers} travelers</span>
                  <span className="font-medium text-navy">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Taxes & Fees</span>
                  <span className="font-medium text-navy">{formatCurrency(totalPrice * 0.1)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-navy">Total</span>
                <span className="text-2xl font-bold text-teal">{formatCurrency(totalPrice * 1.1)}</span>
              </div>

              <Button 
                type="submit" 
                form="booking-form"
                size="lg" 
                className="w-full h-14 text-lg" 
                glow
                loading={submitting}
              >
                Confirm & Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
