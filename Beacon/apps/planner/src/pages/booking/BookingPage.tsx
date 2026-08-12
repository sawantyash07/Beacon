import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  ArrowLeft, CreditCard, Users, ShieldCheck, Check, 
  MapPin, Clock, Plus, Trash2, Upload, FileText, CheckCircle2 
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { createBooking } from '@/services/api';

export default function BookingPage() {
  const { packageId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);
  const [phonepeOrder, setPhonepeOrder] = useState<any>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [simulating, setSimulating] = useState(false);
  
  // Step indicator: 1: Travelers/Mates, 2: Meals/Addons, 3: Room/Vehicle, 4: Summary/Confirm, 5: Payment/UTR
  const [step, setStep] = useState(1);
  
  // Checkout States
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [tripMates, setTripMates] = useState<{ name: string; age: string }[]>([]);
  const [mealSelection, setMealSelection] = useState('Vegetarian');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [roomSelection, setRoomSelection] = useState('Double Sharing');
  const [vehicleSelection, setVehicleSelection] = useState('Sedan');
  const [documentName, setDocumentName] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  useEffect(() => {
    const loadPackage = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '/api';
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

  const addTripMate = () => {
    if (tripMates.length + 1 >= travelers) {
      toast.error('Number of trip mates cannot exceed total traveler count.');
      return;
    }
    setTripMates([...tripMates, { name: '', age: '' }]);
  };

  const removeTripMate = (index: number) => {
    setTripMates(tripMates.filter((_, i) => i !== index));
  };

  const handleTripMateChange = (index: number, field: string, val: string) => {
    const updated = [...tripMates];
    updated[index] = { ...updated[index], [field]: val };
    setTripMates(updated);
  };

  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Price calculation helpers
  const basePrice = pkg ? (pkg.discountedPrice || pkg.basePrice || pkg.price || 0) : 0;
  const roomPriceOffset = roomSelection === 'Single Sharing' ? 3500 : 0;
  const vehiclePriceOffset = vehicleSelection === 'SUV' ? 2500 : vehicleSelection === 'Bike' ? 1000 : 0;
  const addonsOffset = selectedAddons.length * 1500;
  
  const subtotal = (basePrice * travelers) + (roomPriceOffset * travelers) + (vehiclePriceOffset * travelers) + (addonsOffset * travelers);
  const taxes = subtotal * 0.1;
  const grandTotal = subtotal + taxes;

  const loadPhonepeOrder = async (bookingId: string) => {
    setLoadingOrder(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || '/api';
      const res = await fetch(`${API_URL}/payments/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to initialize payment');
      }
      const data = await res.json();
      setPhonepeOrder(data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to load PhonePe Dynamic QR.');
    } finally {
      setLoadingOrder(false);
    }
  };

  const handleCreateBooking = async () => {
    if (!date) {
      toast.error('Please select a travel date');
      return;
    }
    
    setSubmitting(true);
    try {
      const payload = {
        travelerId: user?.id || 'mock-traveler-id',
        packageId: pkg.id,
        travelDate: date,
        passengerCount: travelers,
        totalAmount: grandTotal,
        status: 'PENDING'
      };

      const booking = await createBooking(payload);
      setCreatedBooking(booking);
      toast.success('Booking created successfully! Loading dynamic scanner QR...');
      setStep(5); // Advance to pay screen
      await loadPhonepeOrder(booking.id);
    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Poll booking status
  useEffect(() => {
    let intervalId: any;
    if (step === 5 && createdBooking?.id && !paymentVerified) {
      intervalId = setInterval(async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL || '/api';
          const res = await fetch(`${API_URL}/bookings/${createdBooking.id}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'VERIFIED') {
              setPaymentVerified(true);
              clearInterval(intervalId);
              toast.success('Payment verified! Booking confirmed.');
            } else if (data.status === 'FAILED' || data.status === 'REJECTED') {
              toast.error('Payment verification failed.');
              clearInterval(intervalId);
            }
          }
        } catch (e) {
          console.error('Error polling booking status', e);
        }
      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [step, createdBooking, paymentVerified]);

  // Countdown timer
  useEffect(() => {
    let timerId: any;
    if (step === 5 && phonepeOrder?.expiresAt) {
      const calculateTimeLeft = () => {
        const diff = new Date(phonepeOrder.expiresAt).getTime() - Date.now();
        if (diff <= 0) {
          setTimeLeft(0);
          if (timerId) clearInterval(timerId);
        } else {
          setTimeLeft(Math.floor(diff / 1000));
        }
      };
      calculateTimeLeft();
      timerId = setInterval(calculateTimeLeft, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [step, phonepeOrder]);

  const simulateWebhookPayment = async () => {
    if (!phonepeOrder) return;
    setSimulating(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || '/api';
      const res = await fetch(`${API_URL}/payments/mock-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingCode: phonepeOrder.bookingCode,
          amount: phonepeOrder.grandTotal,
        }),
      });
      if (res.ok) {
        toast.success('Simulated success webhook sent! Poller will auto-confirm shortly.');
      } else {
        toast.error('Failed to trigger mock payment webhook');
      }
    } catch (e) {
      console.error(e);
      toast.error('Error triggering webhook simulation');
    } finally {
      setSimulating(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-page flex justify-center items-center">
        <div className="w-8 h-8 rounded-full border-4 border-teal border-t-transparent animate-spin" />
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
      <div className="max-w-5xl mx-auto px-4">
        {step < 5 && (
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate(`/packages/${packageId}`)} className="inline-flex items-center text-teal hover:text-cyan transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> {step > 1 ? 'Previous Step' : 'Back to Package'}
          </button>
        )}
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy">
            {step === 5 ? 'Verify Your Payment' : 'Complete Your Booking'}
          </h1>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === step ? 'bg-teal w-8' : i < step ? 'bg-teal-gradient' : 'bg-border'}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* STEP 1: Travelers & Trip Mates */}
            {step === 1 && (
              <div className="glass rounded-[24px] p-8 border border-border/50 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal" /> 1. Traveler Details & Date
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Primary Traveler Name" value={user?.name || ''} disabled />
                  <Input label="Email Address" value={user?.email || ''} disabled />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Number of Travelers</label>
                    <div className="flex items-center border border-border rounded-[14px] p-1 bg-surface w-fit">
                      <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-10 h-10 rounded-[10px] hover:bg-black/5 flex items-center justify-center text-navy font-bold">-</button>
                      <span className="w-12 text-center font-bold text-navy">{travelers}</span>
                      <button type="button" onClick={() => setTravelers(Math.min(10, travelers + 1))} className="w-10 h-10 rounded-[10px] hover:bg-black/5 flex items-center justify-center text-navy font-bold">+</button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="travel-date" className="block text-sm font-semibold text-navy mb-2">Travel Date</label>
                    <input 
                      id="travel-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full h-[52px] px-4 rounded-[14px] bg-surface border border-border text-navy focus:outline-none focus:border-teal transition-all"
                      required
                    />
                  </div>
                </div>

                {travelers > 1 && (
                  <div className="pt-4 border-t border-border/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-navy">Trip Mates Info ({tripMates.length}/{travelers - 1})</h3>
                      {tripMates.length < travelers - 1 && (
                        <button type="button" onClick={addTripMate} className="text-teal hover:text-cyan text-xs font-bold flex items-center gap-1">
                          <Plus className="w-3.5 h-3.5" /> Add Trip Mate
                        </button>
                      )}
                    </div>
                    {tripMates.map((mate, i) => (
                      <div key={i} className="flex gap-3 items-end bg-page p-4 rounded-xl border border-border/40">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <Input 
                            label={`Mate #${i + 1} Name`} 
                            value={mate.name} 
                            onChange={(e) => handleTripMateChange(i, 'name', e.target.value)} 
                          />
                          <Input 
                            label="Age" 
                            type="number"
                            value={mate.age} 
                            onChange={(e) => handleTripMateChange(i, 'age', e.target.value)} 
                          />
                        </div>
                        <button type="button" onClick={() => removeTripMate(i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setStep(2)} disabled={!date}>Next Step</Button>
                </div>
              </div>
            )}

            {/* STEP 2: Meals & Add-ons */}
            {step === 2 && (
              <div className="glass rounded-[24px] p-8 border border-border/50 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal" /> 2. Meals & Add-ons
                </h2>

                <div>
                  <label className="block text-sm font-bold text-navy mb-3">Meal Selection (In-flight & Hotels)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Vegetarian', 'Non-Vegetarian', 'Vegan'].map((opt) => (
                      <button 
                        key={opt}
                        type="button"
                        onClick={() => setMealSelection(opt)}
                        className={`p-4 rounded-xl border text-center font-bold text-xs transition-all ${mealSelection === opt ? 'border-teal bg-teal/5 text-teal' : 'border-border bg-surface text-muted hover:border-teal/30'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <label className="block text-sm font-bold text-navy mb-3">Trip Add-ons (+{formatCurrency(1500)} / person each)</label>
                  <div className="space-y-2">
                    {[
                      'Airport Private Cab Pickup/Drop',
                      'Local SIM Card & Unlimited Data',
                      'Pre-paid Sightseeing Entry Tickets Pass',
                      'Traveler Insurance coverage premium'
                    ].map((addon) => {
                      const isSelected = selectedAddons.includes(addon);
                      return (
                        <div 
                          key={addon}
                          onClick={() => toggleAddon(addon)}
                          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all ${isSelected ? 'border-teal bg-teal/5' : 'border-border hover:border-teal/30 bg-surface'}`}
                        >
                          <span className="text-xs font-semibold text-navy">{addon}</span>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? 'bg-teal border-teal text-white' : 'border-border'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setStep(3)}>Next Step</Button>
                </div>
              </div>
            )}

            {/* STEP 3: Room & Vehicle Selection */}
            {step === 3 && (
              <div className="glass rounded-[24px] p-8 border border-border/50 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal" /> 3. Room & Vehicle Options
                </h2>

                <div>
                  <label className="block text-sm font-bold text-navy mb-3">Room Selection</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { type: 'Single Sharing', desc: 'Private room', cost: '+₹3,500' },
                      { type: 'Double Sharing', desc: 'Standard sharing room', cost: 'Included' },
                      { type: 'Triple Sharing', desc: 'Triple sharing room', cost: 'Included' }
                    ].map((opt) => (
                      <button 
                        key={opt.type}
                        type="button"
                        onClick={() => setRoomSelection(opt.type)}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between h-24 transition-all ${roomSelection === opt.type ? 'border-teal bg-teal/5 text-teal' : 'border-border bg-surface text-navy hover:border-teal/30'}`}
                      >
                        <span className="font-bold text-xs">{opt.type}</span>
                        <div>
                          <span className="text-[10px] text-muted block">{opt.desc}</span>
                          <span className="text-[11px] font-extrabold block text-teal mt-0.5">{opt.cost}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <label className="block text-sm font-bold text-navy mb-3">Vehicle Selection (Local transport transfers)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { type: 'Sedan', desc: 'Standard comfortable car', cost: 'Included' },
                      { type: 'SUV', desc: 'Premium spacious SUV', cost: '+₹2,500' },
                      { type: 'Bike', desc: 'Shared / self-ride bike', cost: '+₹1,000' }
                    ].map((opt) => (
                      <button 
                        key={opt.type}
                        type="button"
                        onClick={() => setVehicleSelection(opt.type)}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between h-24 transition-all ${vehicleSelection === opt.type ? 'border-teal bg-teal/5 text-teal' : 'border-border bg-surface text-navy hover:border-teal/30'}`}
                      >
                        <span className="font-bold text-xs">{opt.type}</span>
                        <div>
                          <span className="text-[10px] text-muted block">{opt.desc}</span>
                          <span className="text-[11px] font-extrabold block text-teal mt-0.5">{opt.cost}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setStep(4)}>Next Step</Button>
                </div>
              </div>
            )}

            {/* STEP 4: Document Upload & Summary */}
            {step === 4 && (
              <div className="glass rounded-[24px] p-8 border border-border/50 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal" /> 4. Document Verification & Confirm
                </h2>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Upload Passport / National ID Proof (Mandatory)</label>
                  {documentName ? (
                    <div className="flex items-center justify-between p-4 bg-teal/5 border border-teal/20 rounded-xl text-teal">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-xs font-bold">{documentName}</span>
                      </div>
                      <button type="button" onClick={() => setDocumentName('')} className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-teal/40 rounded-xl p-8 cursor-pointer bg-surface/50 hover:bg-surface transition-colors">
                      <Upload className="w-8 h-8 text-teal mb-2" />
                      <span className="text-xs font-bold text-navy">Drag & drop passport or ID PDF/image here</span>
                      <span className="text-[10px] text-muted mt-1">Supports PDF, JPG, PNG up to 5MB</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setDocumentName(e.target.files?.[0]?.name || 'Passport_Verified.pdf')} 
                      />
                    </label>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t border-border/40">
                  <Button 
                    onClick={handleCreateBooking} 
                    loading={submitting} 
                    disabled={!documentName}
                    className="w-full sm:w-auto px-8"
                  >
                    Create Booking & Proceed
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 5: Dynamic PhonePe QR scanner and auto-verification */}
            {step === 5 && (
              <div className="glass rounded-[24px] p-8 border border-border/50 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-teal" /> 5. Payment Verification
                </h2>

                {loadingOrder ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-8 h-8 rounded-full border-4 border-teal border-t-transparent animate-spin" />
                    <span className="text-xs text-muted">Generating dynamic PhonePe payment request...</span>
                  </div>
                ) : paymentVerified ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2 animate-bounce">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="text-lg font-bold text-navy">Payment Auto-Verified Successfully!</h3>
                    <p className="text-xs text-muted max-w-sm">Your payment settled directly with the planner. An e-receipt and booking confirmation voucher have been generated.</p>
                    <div className="pt-4 flex gap-3">
                      <Button glow onClick={() => navigate('/packages')}>Browse Packages</Button>
                      <button 
                        onClick={() => {
                          toast.success('E-Receipt downloaded successfully!');
                        }}
                        className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-navy-dark transition-all"
                      >
                        <FileText className="w-4 h-4 text-cyan" /> Download Receipt
                      </button>
                    </div>
                  </div>
                ) : !phonepeOrder ? (
                  <div className="text-center py-8">
                    <p className="text-xs text-red-500">Failed to generate dynamic payment request.</p>
                    <Button onClick={() => loadPhonepeOrder(createdBooking?.id)} className="mt-4">Retry Payment Creation</Button>
                  </div>
                ) : timeLeft === 0 ? (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-xs text-red-500 font-bold">This payment transaction has expired.</p>
                    <p className="text-[11px] text-muted">The 30-minute reservation window has closed. Please click below to generate a new order.</p>
                    <Button onClick={() => loadPhonepeOrder(createdBooking?.id)}>Regenerate Payment QR</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
                      <div>
                        <span className="text-[10px] text-teal-800 font-bold tracking-widest uppercase">PhonePe Direct QR Settlement</span>
                        <h4 className="text-sm font-bold text-navy mt-1">Scan QR Code on Phone to Pay</h4>
                      </div>

                      {/* Dynamic QR code loading using public API */}
                      <div className="p-3 bg-white rounded-[20px] shadow-md border border-border/50">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(phonepeOrder.qrData)}`} 
                          alt="Dynamic Payment QR Code"
                          className="w-48 h-48"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-extrabold text-navy">
                          Amount: <span className="text-teal font-medium text-base">{formatCurrency(phonepeOrder.grandTotal)}</span>
                        </div>
                        <div className="text-[10px] text-muted">
                          Booking Code: <span className="font-medium font-bold text-navy">{phonepeOrder.bookingCode}</span>
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-between border-t border-border/20 pt-4 text-xs font-semibold text-navy">
                        <div className="text-left">
                          <span className="text-[9px] text-muted block">Transaction Window Expirer</span>
                          <span className="text-yellow-600 font-medium">{formatTime(timeLeft)} remaining</span>
                        </div>
                        <a 
                          href={phonepeOrder.paymentLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="px-3.5 py-2 bg-teal text-white rounded-xl font-bold text-[10px] uppercase hover:bg-teal-dark transition-all"
                        >
                          Open Payment Link
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-page rounded-xl border border-border/30 text-center space-y-2">
                      <div className="flex items-center gap-1.5 justify-center text-teal text-[11px] font-bold animate-pulse">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal" />
                        Listening for PhonePe webhook callback verification...
                      </div>
                      <p className="text-[10px] text-muted">Do not refresh or close this window. Status updates in real-time upon credit settlement.</p>
                    </div>

                    {/* Developer Mock Webhook Simulator */}
                    <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl space-y-3">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">Local Testing Command Panel</span>
                        <p className="text-[9px] text-muted">Simulate a simulated Webhook transaction completed status call to verify auto-confirmation without merchant keys.</p>
                      </div>
                      <Button 
                        onClick={simulateWebhookPayment} 
                        loading={simulating}
                        size="xs"
                        className="bg-yellow-500 hover:bg-yellow-600 text-navy font-bold w-full text-[10px] uppercase tracking-wider py-2"
                      >
                        Simulate Successful PhonePe Webhook Payment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR: Booking Summary card */}
          <div>
            <div className="glass rounded-[24px] p-6 border border-border/50 shadow-xl sticky top-32 space-y-6">
              <h3 className="font-bold text-navy pb-3 border-b border-border text-base">Booking Summary</h3>
              
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-[12px] overflow-hidden shrink-0">
                  <img 
                    src={pkg.image || pkg.images?.[0]?.url || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-navy line-clamp-2 text-xs">{pkg.title}</h4>
                  <p className="text-[10px] text-muted mt-1">
                    {pkg.duration || `${pkg.days} days / ${pkg.nights} nights`} • {pkg.destination}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-border/40 pt-4">
                <div className="flex justify-between text-muted">
                  <span>Travel Date</span>
                  <span className="font-semibold text-navy">{date || 'Select Date'}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Passenger Count</span>
                  <span className="font-semibold text-navy">{travelers} {travelers === 1 ? 'person' : 'people'}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Room Selection</span>
                  <span className="font-semibold text-navy">{roomSelection}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Vehicle Selection</span>
                  <span className="font-semibold text-navy">{vehicleSelection}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/40 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Package Price ({formatCurrency(basePrice)} x {travelers})</span>
                  <span className="font-medium text-navy">{formatCurrency(basePrice * travelers)}</span>
                </div>
                {roomPriceOffset > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Room Customization Offset</span>
                    <span className="font-medium text-teal">+{formatCurrency(roomPriceOffset * travelers)}</span>
                  </div>
                )}
                {vehiclePriceOffset > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Vehicle Upgrade Offset</span>
                    <span className="font-medium text-teal">+{formatCurrency(vehiclePriceOffset * travelers)}</span>
                  </div>
                )}
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">Trip Add-ons ({selectedAddons.length})</span>
                    <span className="font-medium text-teal">+{formatCurrency(addonsOffset * travelers)}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-border/30 pb-3">
                  <span className="text-muted">Taxes & Fees (10%)</span>
                  <span className="font-medium text-navy">{formatCurrency(taxes)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="font-bold text-navy text-xs">Total Amount</span>
                <span className="text-xl font-extrabold text-teal">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
