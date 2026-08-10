import"./beacon-sync-DBXmqi-W.js";const A={stats:{totalTravellers:12482,travellersGrowth:14.8,totalPlanners:1284,plannersGrowth:8.2,activeTrips:3846,tripsGrowth:19.4,totalBookings:2164,bookingsGrowth:11.3,grossBookingValue:486e4,gbvGrowth:22.1,platformRevenue:680400,revenueGrowth:18.7,plannerEarnings:4179600,pendingVerifications:37,openSupportTickets:14,reportedAccounts:6,pendingApprovals:9,systemUptime:99.98},currentAdmin:{id:"ADM-001",name:"Vikram Malhotra",email:"master@beacon.travel",role:"Super Admin",roleCode:"SUPER_ADMIN",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",phone:"+91 98200 84920",location:"Mumbai, India",lastLogin:"2026-08-10 14:48:22 IST",ipAddress:"103.246.40.112",mfaEnabled:!0,mfaMethod:"Authenticator App (TOTP)",activeSessions:[{id:"SESS-1",device:'MacBook Pro 16"',browser:"Chrome 128.0",location:"Mumbai, MH (Current)",ip:"103.246.40.112",lastActive:"Just now",current:!0},{id:"SESS-2",device:"iPhone 15 Pro",browser:"Safari Mobile",location:"Mumbai, MH",ip:"103.246.40.112",lastActive:"2 hours ago",current:!1},{id:"SESS-3",device:"iPad Air M2",browser:"Chrome Mobile",location:"Pune, MH",ip:"49.36.12.88",lastActive:"Yesterday",current:!1}]},systemHealth:{overallStatus:"OPERATIONAL",uptime:"99.98%",avgLatency:"38ms",requestsPerMin:"4,820 rpm",errorRate:"0.02%",activeWebSocketConnections:1842,services:[{id:"srv-api",name:"Core API Gateway",status:"OPERATIONAL",latency:"24ms",uptime:"99.99%",load:"34%"},{id:"srv-db",name:"PostgreSQL Primary Cluster",status:"OPERATIONAL",latency:"8ms",uptime:"99.99%",load:"42%"},{id:"srv-redis",name:"Redis Distributed Cache",status:"OPERATIONAL",latency:"3ms",uptime:"100.0%",load:"18%"},{id:"srv-auth",name:"MFA & Identity Vault",status:"OPERATIONAL",latency:"19ms",uptime:"99.98%",load:"12%"},{id:"srv-pay",name:"Razorpay / Stripe Webhooks",status:"OPERATIONAL",latency:"62ms",uptime:"99.95%",load:"28%"},{id:"srv-maps",name:"Mapbox & Geospatial Engine",status:"OPERATIONAL",latency:"45ms",uptime:"99.96%",load:"51%"},{id:"srv-media",name:"AWS S3 / Cloudflare CDN",status:"OPERATIONAL",latency:"14ms",uptime:"100.0%",load:"64%"},{id:"srv-notify",name:"Notification & SMS Dispatcher",status:"DEGRADED",latency:"210ms",uptime:"98.84%",load:"88%",note:"Carrier throughput throttled in North India"}]},users:[{id:"USR-1082",name:"Aarav Mehta",email:"aarav.mehta@gmail.com",phone:"+91 98210 11920",type:"TRAVELLER",status:"ACTIVE",verificationStatus:"VERIFIED",registeredDate:"2025-11-14",lastActive:"10 mins ago",location:"Mumbai, India",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",tripsCount:6,bookingsCount:4,totalSpent:"₹1,84,000",favouriteDestinations:["Goa","Kashmir","Dubai","Bali"],bio:"Serial globetrotter, mountain lover, and drone landscape photographer.",reportsCount:0},{id:"USR-1083",name:"Ananya Sharma",email:"ananya.journeys@gmail.com",phone:"+91 98450 77123",type:"PLANNER",status:"ACTIVE",verificationStatus:"VERIFIED",registeredDate:"2025-08-20",lastActive:"Just now",location:"Bengaluru, India",avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",plannerBadge:"Gold Organizer",tripsCount:48,bookingsCount:132,totalEarned:"₹8,45,000",rating:4.9,reviewsCount:64,specialization:["Luxury Expeditions","Honeymoon & Romantic","Himalayan Treks"],responseRate:"98%",cancellationRate:"0.2%",reportsCount:0},{id:"USR-1084",name:"Rohan Varma",email:"rohan.v@outlook.com",phone:"+91 97110 34821",type:"TRAVELLER",status:"ACTIVE",verificationStatus:"VERIFIED",registeredDate:"2026-01-10",lastActive:"1 hour ago",location:"Delhi NCR, India",avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",tripsCount:3,bookingsCount:2,totalSpent:"₹92,500",favouriteDestinations:["Manali","Goa","Singapore"],bio:"Software architect escaping on weekend roadtrips & coastal dives.",reportsCount:0},{id:"USR-1085",name:"Karan Johar Travels (Karan Deshmukh)",email:"karan@peaksandvalleys.in",phone:"+91 99201 44510",type:"PLANNER",status:"PENDING_VERIFICATION",verificationStatus:"PENDING",registeredDate:"2026-08-04",lastActive:"3 hours ago",location:"Pune, India",avatar:"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",plannerBadge:"New Applicant",tripsCount:2,bookingsCount:0,totalEarned:"₹0",rating:0,reviewsCount:0,specialization:["Western Ghats","Monsoon Camping","Heritage Forts"],responseRate:"100%",cancellationRate:"0%",reportsCount:0},{id:"USR-1086",name:"Pooja Hegde",email:"pooja.h@travelaura.com",phone:"+91 98860 99401",type:"PLANNER",status:"ACTIVE",verificationStatus:"VERIFIED",registeredDate:"2025-06-12",lastActive:"25 mins ago",location:"Goa, India",avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",plannerBadge:"Gold Organizer",tripsCount:72,bookingsCount:210,totalEarned:"₹14,20,000",rating:4.95,reviewsCount:112,specialization:["Private Yacht Charters","Goan Heritage","Scuba & Marine"],responseRate:"99%",cancellationRate:"0.1%",reportsCount:0},{id:"USR-1087",name:"Vikram Malhotra",email:"master@beacon.travel",phone:"+91 98200 84920",type:"ADMIN",status:"ACTIVE",verificationStatus:"VERIFIED",registeredDate:"2025-01-01",lastActive:"Now",location:"Mumbai, India",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",adminRole:"Super Admin",permissions:"ALL_ACCESS"},{id:"USR-1088",name:"Sneha Nair",email:"sneha.ops@beacon.travel",phone:"+91 98205 33201",type:"ADMIN",status:"ACTIVE",verificationStatus:"VERIFIED",registeredDate:"2025-04-10",lastActive:"5 mins ago",location:"Kochi, India",avatar:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",adminRole:"Operations Admin",permissions:"TRIPS, BOOKINGS, PLANNERS"},{id:"USR-1089",name:"Tariq Abdullah",email:"tariq.kashmir@gmail.com",phone:"+91 94190 22109",type:"PLANNER",status:"ACTIVE",verificationStatus:"VERIFIED",registeredDate:"2025-07-15",lastActive:"40 mins ago",location:"Srinagar, Kashmir",avatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",plannerBadge:"Silver Organizer",tripsCount:39,bookingsCount:88,totalEarned:"₹6,12,000",rating:4.86,reviewsCount:42,specialization:["Gulmarg Skiing","Dal Lake Houseboats","Pahalgam Treks"],responseRate:"96%",cancellationRate:"0.5%",reportsCount:0},{id:"USR-1090",name:"Devendra Patel",email:"dev.patel99@gmail.com",phone:"+91 99090 12891",type:"TRAVELLER",status:"SUSPENDED",verificationStatus:"UNVERIFIED",registeredDate:"2026-07-20",lastActive:"3 days ago",location:"Ahmedabad, India",avatar:"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",tripsCount:1,bookingsCount:0,totalSpent:"₹0",reportsCount:3,suspensionReason:"Suspected payment chargeback fraud & abusive planner communication"},{id:"USR-1091",name:"Elena Rostova",email:"elena.r@voyageur.fr",phone:"+33 6 44 91 20 18",type:"PLANNER",status:"ACTIVE",verificationStatus:"VERIFIED",registeredDate:"2025-09-01",lastActive:"15 mins ago",location:"Paris, France",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",plannerBadge:"Gold Organizer",tripsCount:31,bookingsCount:94,totalEarned:"₹18,40,000",rating:4.98,reviewsCount:52,specialization:["European Art Tours","French Riviera","Swiss Alps Escapes"],responseRate:"100%",cancellationRate:"0%",reportsCount:0}],trips:[{id:"TRIP-20481",title:"Kashmir Winter Wonderland & Ski Expedition",traveller:{name:"Aarav Mehta",email:"aarav.mehta@gmail.com",id:"USR-1082"},planner:{name:"Tariq Abdullah",email:"tariq.kashmir@gmail.com",id:"USR-1089"},destination:"Srinagar & Gulmarg, Kashmir",country:"India",startDate:"2026-08-18",endDate:"2026-08-25",durationDays:7,members:4,budget:"₹1,45,000",actualCost:"₹1,42,800",commissionRate:"14%",platformCommission:"₹19,992",status:"ACTIVE",paymentStatus:"PAID",createdDate:"2026-08-01",itinerary:[{day:1,title:"Arrival in Srinagar & Traditional Houseboat Check-in on Nigeen Lake",activities:"Private Shikara cruise, evening Wazwan dinner"},{day:2,title:"Mughal Gardens, Shankaracharya Temple & Old Srinagar Spice Walk",activities:"Heritage walking tour with local historian"},{day:3,title:"Scenic Transfer to Gulmarg & Gondola Phase 1 & 2 Ascent",activities:"Ski orientation and high-altitude photography"},{day:4,title:"Full Day Ski Course & Snowmobiling at Apharwat Peak",activities:"Certified instructor guidance and equipment rental"},{day:5,title:"Day excursion to Betaab Valley & Aru Valley in Pahalgam",activities:"Pony trek, river rafting along Lidder river"},{day:6,title:"Local Pashmina Art & Saffron Plantation Tour in Pampore",activities:"Artisan workshop and culinary tea tasting"},{day:7,title:"Departure Transfer to Sheikh ul-Alam International Airport",activities:"Airport VIP drop-off"}],bookingsLinked:[{type:"Stay",name:"Wangnoo Heritage Houseboat (2 Nights)",status:"CONFIRMED",cost:"₹28,000"},{type:"Stay",name:"The Khyber Himalayan Resort & Spa (3 Nights)",status:"CONFIRMED",cost:"₹72,000"},{type:"Transport",name:"Innova Crysta 4x4 Private Chauffeur (7 Days)",status:"CONFIRMED",cost:"₹26,000"},{type:"Experience",name:"Gulmarg Heli-Ski Access & Gondola VIP Tickets",status:"CONFIRMED",cost:"₹16,800"}],recentChat:[{sender:"Traveller",message:"Can we request an early morning Shikara ride at sunrise on Day 2?",time:"Yesterday, 18:20"},{sender:"Planner",message:"Absolutely! I have arranged Master Ghulam for 5:45 AM sunrise photography.",time:"Yesterday, 18:45"}]},{id:"TRIP-20482",title:"Goa Coastal Yacht & Heritage Gastronomy",traveller:{name:"Rohan Varma",email:"rohan.v@outlook.com",id:"USR-1084"},planner:{name:"Pooja Hegde",email:"pooja.h@travelaura.com",id:"USR-1086"},destination:"South Goa & Mandovi River",country:"India",startDate:"2026-08-28",endDate:"2026-09-02",durationDays:5,members:2,budget:"₹85,000",actualCost:"₹82,000",commissionRate:"14%",platformCommission:"₹11,480",status:"CONFIRMED",paymentStatus:"PAID",createdDate:"2026-08-05",itinerary:[{day:1,title:"Check-in at Alila Diwa Goa & Sunset Beach Walk",activities:"Welcome kokum cocktail & private beach cabana"},{day:2,title:"Private 4-Hour Sunset Luxury Catamaran on Mandovi River",activities:"Champagne, chef grilled seafood, dolphin sighting"},{day:3,title:"Fontainhas Latin Quarter Architecture & Fado Music Dinner",activities:"Private historian guided walk through Portuguese villas"},{day:4,title:"Spice Plantation Sensory Tour & Organic Culinary Masterclass",activities:"Traditional clay-pot cooking session with Goan chef"},{day:5,title:"Morning Yoga & Dabolim Airport Transfer",activities:"Ayurvedic massage and departure"}],bookingsLinked:[{type:"Stay",name:"Alila Diwa Luxury Resort (4 Nights)",status:"CONFIRMED",cost:"₹52,000"},{type:"Experience",name:"Private 42ft Luxury Catamaran Charter",status:"CONFIRMED",cost:"₹24,000"},{type:"Transport",name:"Mercedes Benz E-Class Airport VIP",status:"CONFIRMED",cost:"₹6,000"}]},{id:"TRIP-20483",title:"Paris & French Alps Romantic Odyssey",traveller:{name:"Kabir Roy",email:"kabir.roy@innovate.co",id:"USR-1092"},planner:{name:"Elena Rostova",email:"elena.r@voyageur.fr",id:"USR-1091"},destination:"Paris & Chamonix, France",country:"France",startDate:"2026-09-12",endDate:"2026-09-22",durationDays:10,members:2,budget:"₹4,80,000",actualCost:"₹4,75,000",commissionRate:"12%",platformCommission:"₹57,000",status:"PLANNING",paymentStatus:"PARTIAL_DEPOSIT",createdDate:"2026-08-08"},{id:"TRIP-20484",title:"Dubai Skyline & Desert Stargazing Safari",traveller:{name:"Ananya Sharma",email:"ananya.s@me.com",id:"USR-1093"},planner:{name:"Farhan Qureshi",email:"farhan@emiratesvoyage.ae",id:"USR-1094"},destination:"Dubai, United Arab Emirates",country:"UAE",startDate:"2026-08-10",endDate:"2026-08-15",durationDays:5,members:3,budget:"₹2,10,000",actualCost:"₹2,05,000",commissionRate:"15%",platformCommission:"₹30,750",status:"ACTIVE",paymentStatus:"PAID",createdDate:"2026-07-28"},{id:"TRIP-20485",title:"Bali Sacred Temples & Ubud Rainforest Retreat",traveller:{name:"Siddharth Jain",email:"sid.jain@techcorp.in",id:"USR-1095"},planner:{name:"Wayan Sudirta",email:"wayan@balicustomtrips.com",id:"USR-1096"},destination:"Ubud & Seminyak, Bali",country:"Indonesia",startDate:"2026-08-01",endDate:"2026-08-08",durationDays:8,members:2,budget:"₹1,60,000",actualCost:"₹1,58,000",commissionRate:"14%",platformCommission:"₹22,120",status:"COMPLETED",paymentStatus:"PAID",createdDate:"2026-07-10"},{id:"TRIP-20486",title:"Manali High Pass Motorbike Expedition",traveller:{name:"Aditya Kasod",email:"aditya@kasod.in",id:"USR-1097"},planner:{name:"Ananya Sharma",email:"ananya.journeys@gmail.com",id:"USR-1083"},destination:"Manali & Spiti Valley, Himachal",country:"India",startDate:"2026-09-05",endDate:"2026-09-14",durationDays:9,members:6,budget:"₹1,95,000",actualCost:"₹1,95,000",commissionRate:"14%",platformCommission:"₹27,300",status:"CONFIRMED",paymentStatus:"PAID",createdDate:"2026-08-07"}],destinations:[{id:"DEST-01",name:"Srinagar & Kashmir Valley",country:"India",state:"Jammu & Kashmir",coordinates:"34.0837° N, 74.7973° E",heroImage:"https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=80",description:"Paradise on Earth famed for majestic Dal Lake houseboats, Mughal gardens, and snow-laden peaks of Gulmarg.",bestTime:"Apr - Oct (Greenery) & Dec - Feb (Snow / Skiing)",weather:"19°C · Clear Alpine Skies",status:"PUBLISHED",activeTrips:342,activePlanners:28,avgBudget:"₹35,000 - ₹95,000",tags:["Mountains","Snow","Romantic","Culture","Houseboats"]},{id:"DEST-02",name:"Goa (North & South)",country:"India",state:"Goa",coordinates:"15.2993° N, 74.1240° E",heroImage:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",description:"Sun-kissed Arabian shores, Portuguese heritage villas, vibrant beach clubs, and spice plantations.",bestTime:"Oct - Apr (Beach & Party) & Jun - Sep (Monsoon Lush)",weather:"28°C · Tropical Breeze",status:"PUBLISHED",activeTrips:684,activePlanners:64,avgBudget:"₹25,000 - ₹75,000",tags:["Beaches","Nightlife","Heritage","Water Sports","Luxury Villas"]},{id:"DEST-03",name:"Manali & Solang Valley",country:"India",state:"Himachal Pradesh",coordinates:"32.2396° N, 77.1887° E",heroImage:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80",description:"High altitude adventure hub nestled in the Beas River valley, serving as gateway to Rohtang and Spiti.",bestTime:"Year-round",weather:"16°C · Misty Mountain Air",status:"PUBLISHED",activeTrips:412,activePlanners:42,avgBudget:"₹20,000 - ₹55,000",tags:["Trekking","Paragliding","Rivers","Cafes","Backpacking"]},{id:"DEST-04",name:"Jaipur (Pink City)",country:"India",state:"Rajasthan",coordinates:"26.9124° N, 75.7873° E",heroImage:"https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80",description:"Royal capital of Rajasthan featuring Amber Palace, Hawa Mahal, luxury havelis, and artisan bazaars.",bestTime:"Oct - Mar",weather:"31°C · Sunny",status:"PUBLISHED",activeTrips:290,activePlanners:35,avgBudget:"₹22,000 - ₹80,000",tags:["Royal Heritage","Palaces","Shopping","Food","Photography"]},{id:"DEST-05",name:"Dubai & Emirates",country:"United Arab Emirates",state:"Dubai",coordinates:"25.2048° N, 55.2708° E",heroImage:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",description:"Futuristic metropolis boasting Burj Khalifa, luxury desert safaris, mega malls, and world-class fine dining.",bestTime:"Nov - Apr",weather:"36°C · Sunny Desert",status:"PUBLISHED",activeTrips:512,activePlanners:48,avgBudget:"₹65,000 - ₹2,50,000",tags:["Luxury","Shopping","Desert","Skyline","Theme Parks"]},{id:"DEST-06",name:"Bali Island & Ubud",country:"Indonesia",state:"Bali",coordinates:"8.3405° S, 115.0920° E",heroImage:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",description:"Island of Gods celebrated for lush emerald rice terraces, cliffside Uluwatu temples, and volcanic surf spots.",bestTime:"Apr - Oct",weather:"27°C · Island Sunshine",status:"PUBLISHED",activeTrips:420,activePlanners:39,avgBudget:"₹50,000 - ₹1,40,000",tags:["Spiritual","Surfing","Wellness","Villas","Temples"]},{id:"DEST-07",name:"Paris & Île-de-France",country:"France",state:"Paris Region",coordinates:"48.8566° N, 2.3522° E",heroImage:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",description:"The City of Light famed for Haute Couture, Michelin gastronomy, the Louvre Museum, and romantic Seine cruises.",bestTime:"May - Sep",weather:"22°C · Pleasant",status:"PUBLISHED",activeTrips:218,activePlanners:24,avgBudget:"₹1,80,000 - ₹4,50,000",tags:["Romance","Art","Gastronomy","Architecture","Luxury"]},{id:"DEST-08",name:"Tokyo & Kanto",country:"Japan",state:"Tokyo",coordinates:"35.6762° N, 139.6503° E",heroImage:"https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",description:"Hyper-modern neon wonderland seamlessly blending ancient Shinto shrines with cutting-edge pop culture & culinary art.",bestTime:"Mar - May (Cherry Blossoms) & Oct - Nov",weather:"25°C · Clear",status:"PUBLISHED",activeTrips:184,activePlanners:19,avgBudget:"₹1,90,000 - ₹5,00,000",tags:["Tech","Culinary","Culture","Cherry Blossoms","Anime"]}],experiences:[{id:"EXP-801",title:"Dal Lake Sunrise Shikara & Floating Market Tour",destination:"Srinagar & Kashmir Valley",category:"Culture",provider:"Ghulam Shikara Guild",price:"₹2,500",duration:"3 Hours",capacity:4,rating:4.95,reviewsCount:88,status:"ACTIVE",image:"https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&auto=format&fit=crop&q=80"},{id:"EXP-802",title:"Mandovi River Private Catamaran Sunset Charter",destination:"Goa (North & South)",category:"Luxury",provider:"Goa Marine Yachts Ltd.",price:"₹24,000",duration:"4 Hours",capacity:12,rating:4.92,reviewsCount:46,status:"ACTIVE",image:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80"},{id:"EXP-803",title:"Solang Valley Tandem Paragliding & GoPro Flight",destination:"Manali & Solang Valley",category:"Adventure",provider:"Himalayan Sky Wings",price:"₹3,800",duration:"45 Mins",capacity:1,rating:4.88,reviewsCount:132,status:"ACTIVE",image:"https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=400&auto=format&fit=crop&q=80"},{id:"EXP-804",title:"Amber Palace Private Heritage Walk with Royal Historian",destination:"Jaipur (Pink City)",category:"Heritage",provider:"Rajputana Living Archives",price:"₹4,200",duration:"3.5 Hours",capacity:6,rating:4.97,reviewsCount:65,status:"ACTIVE",image:"https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&auto=format&fit=crop&q=80"},{id:"EXP-805",title:"Private Desert Dune Bashing & Arabian Bedouin Feast",destination:"Dubai & Emirates",category:"Adventure",provider:"Emirates Royal Safaris",price:"₹18,500",duration:"6 Hours",capacity:6,rating:4.91,reviewsCount:94,status:"ACTIVE",image:"https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&auto=format&fit=crop&q=80"}],bookings:[{id:"BK-8291",tripId:"TRIP-20481",traveller:"Aarav Mehta",planner:"Tariq Abdullah",service:"All-Inclusive Kashmir Ski Package",destination:"Kashmir",date:"2026-08-01",amount:"₹1,45,000",rawAmount:145e3,paymentMethod:"UPI / HDFC Bank",gateway:"Razorpay",gatewayTxnId:"pay_On92klA91xP",paymentStatus:"SUCCESS",bookingStatus:"CONFIRMED"},{id:"BK-8292",tripId:"TRIP-20482",traveller:"Rohan Varma",planner:"Pooja Hegde",service:"Goa Luxury Catamaran & Stay Package",destination:"Goa",date:"2026-08-05",amount:"₹85,000",rawAmount:85e3,paymentMethod:"Credit Card (Visa Signature)",gateway:"Razorpay",gatewayTxnId:"pay_Kq78nnM02aX",paymentStatus:"SUCCESS",bookingStatus:"CONFIRMED"},{id:"BK-8293",tripId:"TRIP-20483",traveller:"Kabir Roy",planner:"Elena Rostova",service:"Paris Private Louvre & Alps Package (Deposit)",destination:"Paris & Alps",date:"2026-08-08",amount:"₹2,40,000",rawAmount:24e4,paymentMethod:"Bank Wire Transfer (SWIFT)",gateway:"Stripe",gatewayTxnId:"ch_3N82b9a761xZ",paymentStatus:"SUCCESS",bookingStatus:"PENDING_FINAL_PAYMENT"},{id:"BK-8294",tripId:"TRIP-20484",traveller:"Ananya Sharma",planner:"Farhan Qureshi",service:"Dubai Skyview & Desert Safari",destination:"Dubai",date:"2026-07-28",amount:"₹2,10,000",rawAmount:21e4,paymentMethod:"Apple Pay / Amex",gateway:"Stripe",gatewayTxnId:"ch_91La80nm12Qa",paymentStatus:"SUCCESS",bookingStatus:"ACTIVE"},{id:"BK-8295",tripId:"TRIP-20480",traveller:"Neha Chawla",planner:"Ananya Sharma",service:"Ladakh Monasteries Trek (Cancelled Due to Landslide)",destination:"Leh Ladakh",date:"2026-07-25",amount:"₹68,000",rawAmount:68e3,paymentMethod:"UPI / ICICI Bank",gateway:"Razorpay",gatewayTxnId:"pay_Xm9100qL91z",paymentStatus:"REFUNDED",bookingStatus:"REFUNDED",refundReason:"Severe flash flood advisory issued by District Disaster Authority."}],verifications:[{id:"VRF-901",applicantName:"Karan Johar Travels (Karan Deshmukh)",applicantId:"USR-1085",category:"Planner Verification",plannerType:"COMPANY",email:"karan@peaksandvalleys.in",phone:"+91 99201 44510",location:"Pune & Western Ghats, Maharashtra",submittedDate:"2026-08-04 14:22 IST",status:"PENDING",overallMatchScore:98.4,notes:"Documents submitted with valid active GST, registered MTDC tourism license, and 98.4% live facial biometric match.",documents:[{id:"DOC-901-1",title:"Official Tourism Operator License",documentType:"Tourism License",fileName:"Maharashtra_Tourism_License_2026.pdf",fileSize:"2.8 MB",uploadedAt:"2026-08-04 14:18 IST",status:"PENDING",docNumber:"TRV-MH-2026-881920",issuingAuthority:"Maharashtra Tourism Development Corporation (MTDC)",issueDate:"2024-01-15",expiryDate:"2029-01-14",matchScore:99.1,previewType:"certificate",previewTitle:"GOVERNMENT OF MAHARASHTRA — TOURISM OPERATOR REGISTRATION",previewSubtitle:"Licensed Category A Expeditions & Trekking Operator",ocrExtracted:{"Entity Name":"Peaks & Valleys Adventure Travel Ltd.","License No":"TRV-MH-2026-881920","Operating Zone":"Pune, Sahyadri, Raigad, Ratnagiri","Security Bond":"Deposited ₹5,00,000 Bank Guarantee","QR Signature":"VERIFIED_DIGITAL_MTDC_2026"}},{id:"DOC-901-2",title:"Corporate GST & Tax Identification Certificate",documentType:"Tax Document",fileName:"GSTIN_27AAACD9012E1Z3.pdf",fileSize:"1.4 MB",uploadedAt:"2026-08-04 14:19 IST",status:"PENDING",docNumber:"27AAACD9012E1Z3",issuingAuthority:"Goods and Services Tax Network (GSTN), Govt of India",issueDate:"2021-06-10",expiryDate:"PERPETUAL (ACTIVE)",matchScore:100,previewType:"gst",previewTitle:"FORM GST REG-06 — REGISTRATION CERTIFICATE",previewSubtitle:"Government of India — Central Board of Indirect Taxes",ocrExtracted:{"Legal Name":"PEAKS AND VALLEYS TOURS LLP","GSTIN / UIN":"27AAACD9012E1Z3","State Code":"27 (Maharashtra)",Constitution:"Limited Liability Partnership","Tax Status":"Regular / Active / Compliant"}},{id:"DOC-901-3",title:"Authorized Signatory Government ID (Passport)",documentType:"Government ID",fileName:"Passport_Karan_Front_Back.pdf",fileSize:"3.2 MB",uploadedAt:"2026-08-04 14:20 IST",status:"VERIFIED",docNumber:"P892104912",issuingAuthority:"Ministry of External Affairs, India (RPO Pune)",issueDate:"2022-03-12",expiryDate:"2032-03-11",matchScore:97.8,previewType:"passport",previewTitle:"REPUBLIC OF INDIA — PASSPORT",previewSubtitle:"Personal Identity Verification Document",ocrExtracted:{"Given Name":"KARAN DESHMUKH",Nationality:"INDIAN",DOB:"1991-08-14","MRZ Code":`P<INDDESHMUKH<<KARAN<<<<<<<<<<<<<<<<<<<<<<<
P892104912IND9108144M3203112<<<<<<<<<<<<<<04`,"Address Match":"100% Match with Business Profile Address"}},{id:"DOC-901-4",title:"Live Liveness & Biometric Face Match Telemetry",documentType:"Biometric Selfie",fileName:"Selfie_Match_Score_98pct.jpg",fileSize:"1.9 MB",uploadedAt:"2026-08-04 14:21 IST",status:"VERIFIED",docNumber:"BIO-REC-99182",issuingAuthority:"Beacon Automated Biometric Engine (DeepFace v4)",issueDate:"2026-08-04",expiryDate:"N/A",matchScore:98.4,previewType:"selfie",previewTitle:"LIVE FACIAL RECOGNITION MATCH TELEMETRY",previewSubtitle:"Real-time camera feed vs Passport portrait match",ocrExtracted:{"Liveness Check":"PASS (Active Blink & Head Turn Verified)","Confidence Score":"98.4% Match with Passport Photo","Anti-Spoofing Score":"0.01% (No screen/paper artifact detected)","Geo-Stamp":"18.5204° N, 73.8567° E (Pune, Maharashtra)","Device Fingerprint":"Apple iPhone 15 Pro / Safari iOS 18"}}]},{id:"VRF-902",applicantName:"Ananya Journeys (Ananya Sharma)",applicantId:"USR-1083",category:"Planner Verification",plannerType:"COMPANY",email:"ananya.journeys@gmail.com",phone:"+91 98450 77123",location:"Bengaluru, Karnataka & Himachal",submittedDate:"2026-08-02 11:15 IST",status:"VERIFIED",overallMatchScore:99.6,notes:"Gold Tier certified organizer. Verified Karnataka Tourism Board registration and comprehensive public liability insurance.",documents:[{id:"DOC-902-1",title:"Official Karnataka Tourism Council Operator License",documentType:"Tourism License",fileName:"Karnataka_Tourism_Operator_License.pdf",fileSize:"3.1 MB",uploadedAt:"2026-08-02 11:10 IST",status:"VERIFIED",docNumber:"KTC-TRV-2025-0912",issuingAuthority:"Department of Tourism, Government of Karnataka",issueDate:"2023-04-01",expiryDate:"2028-03-31",matchScore:99.8,previewType:"certificate",previewTitle:"DEPARTMENT OF TOURISM — TOUR OPERATOR CERTIFICATE",previewSubtitle:"Class-A Accredited Himalayan Expedition Agency",ocrExtracted:{"Entity Name":"Ananya Journeys Private Limited","Registration No":"KTC-TRV-2025-0912",Headquarters:"Indiranagar, Bengaluru 560038",Accreditation:"IATO & ADTOI Recognized"}},{id:"DOC-902-2",title:"Comprehensive Public Liability & Adventure Insurance",documentType:"Insurance Policy",fileName:"Public_Liability_Policy_2Crore.pdf",fileSize:"4.5 MB",uploadedAt:"2026-08-02 11:12 IST",status:"VERIFIED",docNumber:"POL-HDFC-99120412",issuingAuthority:"HDFC ERGO General Insurance Co.",issueDate:"2026-01-01",expiryDate:"2027-01-01",matchScore:100,previewType:"insurance",previewTitle:"COMMERCIAL EXPEDITION PUBLIC LIABILITY POLICY",previewSubtitle:"₹2,00,00,000 Group Traveller Medical & Evacuation Coverage",ocrExtracted:{"Policy Holder":"Ananya Journeys Pvt Ltd","Coverage Amount":"₹2,00,00,000 (Two Crores INR)","Risk Zones":"High Altitude Treks, Motorbiking, River Rafting","Emergency Air Rescue":"Included up to 18,000 ft"}},{id:"DOC-902-3",title:"Company GSTIN Registration Certificate",documentType:"Tax Document",fileName:"GSTIN_29ABCDE1234F1Z5.pdf",fileSize:"1.2 MB",uploadedAt:"2026-08-02 11:14 IST",status:"VERIFIED",docNumber:"29ABCDE1234F1Z5",issuingAuthority:"GST Council, Government of India",issueDate:"2021-09-15",expiryDate:"ACTIVE",matchScore:100,previewType:"gst",previewTitle:"GST REGISTRATION CERTIFICATE",previewSubtitle:"Tax Identification for Tour Services",ocrExtracted:{"Legal Name":"ANANYA JOURNEYS PRIVATE LIMITED",GSTIN:"29ABCDE1234F1Z5",State:"29 (Karnataka)",Status:"ACTIVE / REGULAR"}}]},{id:"VRF-903",applicantName:"Himalayan Sky Wings (Rajat Thakur)",applicantId:"USR-1099",category:"Experience Provider Verification",plannerType:"COMPANY",email:"rajat@skywingsmanali.in",phone:"+91 94180 88219",location:"Solang Valley, Manali, Himachal Pradesh",submittedDate:"2026-08-07 16:45 IST",status:"PENDING",overallMatchScore:97.2,notes:"Commercial tandem pilot flight licenses and equipment safety certification for Solang Valley paragliding operations.",documents:[{id:"DOC-903-1",title:"DGCA Commercial Paragliding Pilot License",documentType:"Flight License",fileName:"DGCA_Commercial_Flight_Cert.pdf",fileSize:"2.6 MB",uploadedAt:"2026-08-07 16:40 IST",status:"PENDING",docNumber:"DGCA-AERO-2025-9921",issuingAuthority:"Directorate General of Civil Aviation (DGCA)",issueDate:"2023-08-20",expiryDate:"2028-08-19",matchScore:98.6,previewType:"certificate",previewTitle:"DIRECTORATE GENERAL OF CIVIL AVIATION",previewSubtitle:"Commercial Tandem Paragliding Pilot Certificate",ocrExtracted:{"Pilot Name":"RAJAT THAKUR","License Grade":"Class-1 Tandem Instructor (High Altitude)","Total Logged Hours":"3,420 Hours Flight Time","Medical Fitness":"Class 1 Medical Validated"}},{id:"DOC-903-2",title:"Equipment Safety & Glider Airworthiness Certificate",documentType:"Safety Cert",fileName:"Glider_Airworthiness_Inspection_2026.pdf",fileSize:"1.8 MB",uploadedAt:"2026-08-07 16:42 IST",status:"PENDING",docNumber:"DHV-AIR-882104",issuingAuthority:"European Glider Safety Standards (DHV / EN-B)",issueDate:"2026-02-10",expiryDate:"2027-02-09",matchScore:96,previewType:"certificate",previewTitle:"PARAGLIDER AIRWORTHINESS & CANOPY POROSITY TEST",previewSubtitle:"Ozone Rush Tandem 42 sqm Canopy Inspection",ocrExtracted:{"Glider Model":"Ozone Magnum 3 Tandem (Serial #OZ-9912)","Line Strength Test":"PASS (420 daN Breaking Load)","Reserve Parachute":"Repacked & Inspected June 2026"}}]},{id:"VRF-904",applicantName:"Meera Sen (Wildlife Expeditions)",applicantId:"USR-1098",category:"Planner Verification",plannerType:"FREELANCER",email:"meera.wildlife@gmail.com",phone:"+91 97550 11928",location:"Bandhavgarh & Kanha, Madhya Pradesh",submittedDate:"2026-08-06 09:30 IST",status:"PENDING",overallMatchScore:99.2,notes:"Freelance naturalist and wildlife photographer with 8 years experience leading tiger safari expeditions.",documents:[{id:"DOC-904-1",title:"Government Aadhaar Identity Card (Masked)",documentType:"Government ID",fileName:"Aadhaar_Masked_Front_Back.pdf",fileSize:"1.5 MB",uploadedAt:"2026-08-06 09:20 IST",status:"VERIFIED",docNumber:"•••• •••• 8821",issuingAuthority:"Unique Identification Authority of India (UIDAI)",issueDate:"2018-05-12",expiryDate:"PERPETUAL",matchScore:99.4,previewType:"aadhaar",previewTitle:"UNIQUE IDENTIFICATION AUTHORITY OF INDIA — AADHAAR",previewSubtitle:"Government of India Citizen Identity",ocrExtracted:{Name:"MEERA SEN",DOB:"1994-11-23",Gender:"Female","Aadhaar No":"XXXX XXXX 8821","QR Verification":"CRYPTOGRAPHICALLY_VALID_UIDAI"}},{id:"DOC-904-2",title:"Certified Naturalist & Jungle Guide License",documentType:"Guide License",fileName:"MP_Eco_Tourism_Naturalist_Cert.pdf",fileSize:"2.1 MB",uploadedAt:"2026-08-06 09:25 IST",status:"PENDING",docNumber:"MP-ECO-GUIDE-882",issuingAuthority:"Madhya Pradesh Ecotourism Development Board",issueDate:"2022-09-01",expiryDate:"2027-08-31",matchScore:99,previewType:"certificate",previewTitle:"CERTIFIED MASTER NATURALIST CREDENTIAL",previewSubtitle:"Kanha, Bandhavgarh & Pench National Parks",ocrExtracted:{Candidate:"MEERA SEN",Specialization:"Tiger Behaviour, Mammalian Tracking & Birding","First Aid Certified":"Wilderness First Responder (WFR) Validated"}}]}],supportTickets:[{id:"TCK-401",userId:"USR-1082",userName:"Aarav Mehta",userType:"TRAVELLER",category:"Trip Coordination",priority:"HIGH",subject:"Driver contact number needed for airport pickup in Srinagar",assignedAdmin:"Sneha Nair",created:"2026-08-10 13:10",updated:"10 mins ago",status:"OPEN",notes:"Planner Tariq has sent updated cab number JK-01-AB-9821. WhatsApp dispatch triggered."},{id:"TCK-402",userId:"USR-1085",userName:"Karan Deshmukh",userType:"PLANNER",category:"Verification",priority:"MEDIUM",subject:"Status of pending business registration verification",assignedAdmin:"Vikram Malhotra",created:"2026-08-09 16:40",updated:"1 hour ago",status:"PENDING",notes:"Awaiting final GST tax active status check on GST portal."},{id:"TCK-403",userId:"USR-1084",userName:"Rohan Varma",userType:"TRAVELLER",category:"Payment",priority:"LOW",subject:"Requesting GST tax invoice with company entity name",assignedAdmin:"Sneha Nair",created:"2026-08-08 11:20",updated:"2 days ago",status:"RESOLVED",notes:"Invoice with GSTIN generated and emailed to billing@varma.in."},{id:"TCK-404",userId:"USR-1090",userName:"Devendra Patel",userType:"TRAVELLER",category:"Safety & Abuse",priority:"CRITICAL",subject:"Account suspended - Appeal filed",assignedAdmin:"Vikram Malhotra",created:"2026-08-08 09:15",updated:"Yesterday",status:"ESCALATED",notes:"Under investigation by Risk Team for fraudulent payment chargeback claims."}],moderationItems:[{id:"MOD-301",type:"REVIEW",reporter:"Pooja Hegde (Planner)",target:"Review on Mandovi River Cruise",reason:"Competitor spam / abusive language detected",evidence:"User never booked this yacht charter and left 1-star review mentioning rival agency.",date:"2026-08-09",status:"PENDING_REVIEW"},{id:"MOD-302",type:"USER_REPORT",reporter:"Tariq Abdullah (Planner)",target:"Devendra Patel (Traveller)",reason:"Abusive threats and chargeback blackmail",evidence:"Threatened negative reviews if free 5-star hotel upgrade wasn't provided.",date:"2026-08-07",status:"INVESTIGATED"}],auditLogs:[{id:"LOG-501",admin:"Vikram Malhotra (Super Admin)",adminId:"ADM-001",action:"SUSPEND_USER",entity:"User #USR-1090 (Devendra Patel)",previousValue:"Status: ACTIVE",newValue:"Status: SUSPENDED (Reason: Chargeback fraud)",timestamp:"2026-08-08 10:15:40 IST",ip:"103.246.40.112",device:"MacBook Pro / Chrome 128",severity:"HIGH"},{id:"LOG-502",admin:"Sneha Nair (Operations Admin)",adminId:"ADM-002",action:"APPROVE_VERIFICATION",entity:"Planner #USR-1089 (Tariq Abdullah)",previousValue:"Verification: PENDING",newValue:"Verification: VERIFIED (Gold Tier)",timestamp:"2026-08-07 14:22:18 IST",ip:"49.36.12.88",device:"Windows 11 / Edge",severity:"MEDIUM"},{id:"LOG-503",admin:"Vikram Malhotra (Super Admin)",adminId:"ADM-001",action:"PROCESS_REFUND",entity:"Booking #BK-8295 (Ladakh Monasteries)",previousValue:"Status: CONFIRMED · Escrow: ₹68,000",newValue:"Status: REFUNDED · Credited to Payee Bank",timestamp:"2026-08-06 18:04:12 IST",ip:"103.246.40.112",device:"MacBook Pro / Chrome 128",severity:"HIGH"},{id:"LOG-504",admin:"Vikram Malhotra (Super Admin)",adminId:"ADM-001",action:"UPDATE_COMMISSION_POLICY",entity:"Platform Settings: Tier 1 Planners",previousValue:"Take Rate: 15.0%",newValue:"Take Rate: 14.0%",timestamp:"2026-08-01 09:00:00 IST",ip:"103.246.40.112",device:"MacBook Pro / Chrome 128",severity:"CRITICAL"}],notifications:[{id:"NOTIF-101",title:"Security Update: MFA Mandatory for all Level-2 Admins",type:"SECURITY",channel:"IN_APP, EMAIL",recipients:"All Admins (12)",status:"SENT",sentAt:"2026-08-01 10:00"},{id:"NOTIF-102",title:"Monsoon Travel Safety Advisory for Western Ghats & Himachal",type:"TRAVEL_ALERT",channel:"IN_APP, PUSH",recipients:"Active Travellers in North & West India (1,480)",status:"SCHEDULED",sentAt:"2026-08-12 08:00"}],contentItems:[{id:"CNT-201",title:"Ultimate 7-Day Guide to Kashmir: Shikarhas, Skiing & Secrets",category:"Travel Guide",author:"Beacon Editorial Team",status:"PUBLISHED",views:24800,publishDate:"2026-07-15",destination:"Kashmir"},{id:"CNT-202",title:"Hidden Portuguese Architecture in South Goa's Fontainhas",category:"Culture Story",author:"Pooja Hegde",status:"PUBLISHED",views:18200,publishDate:"2026-07-22",destination:"Goa"},{id:"CNT-203",title:"The Solo Hiker's Manifesto for Spiti Valley 2026",category:"Adventure Guide",author:"Ananya Sharma",status:"REVIEW",views:0,publishDate:"Scheduled for 2026-08-15",destination:"Himachal"}],settings:{general:{platformName:"Beacon",adminPortalName:"Beacon Master",supportEmail:"concierge@beacon.travel",emergencySosHotline:"+91 800 BEACON (232266)",defaultCurrency:"INR (₹)",timezone:"Asia/Kolkata (IST, UTC+05:30)",maintenanceMode:!1},commission:{standardTakeRate:14,goldPlannerTakeRate:12,experienceProviderFee:10,payoutSchedule:"WEEKLY_EVERY_MONDAY",minimumPayoutThreshold:5e3},security:{enforceMfaForAdmins:!0,sessionTimeoutMinutes:60,maxFailedLoginAttempts:3,lockoutDurationMinutes:15,requireTypedConfirmations:!0}}},v={AUTH_TOKEN:"beacon_master_auth_token",ADMIN_USER:"beacon_master_user",LOCKOUT_STATE:"beacon_master_lockout",ACTIVE_SESSION:"beacon_master_session",SECURITY_SETTINGS:"beacon_master_security_config"},x={SUPER_ADMIN:{title:"Super Admin / Master Admin",description:"Complete unconstrained control over the entire platform, financials, permissions and configuration.",badgeClass:"badge-purple",permissions:{users:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},planners:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},trips:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},bookings:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},payments:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},content:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},moderation:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},support:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},analytics:{view:!0,export:!0},audit:{view:!0,export:!0},settings:{view:!0,edit:!0},system:{view:!0,edit:!0}}},PLATFORM_ADMIN:{title:"Platform Admin",description:"Manage users, planners, platform operations and public content.",badgeClass:"badge-blue",permissions:{users:{view:!0,create:!0,edit:!0,delete:!1,approve:!0,export:!0},planners:{view:!0,create:!0,edit:!0,delete:!1,approve:!0,export:!0},trips:{view:!0,create:!1,edit:!0,delete:!1,approve:!0,export:!0},bookings:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!0},payments:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!1},content:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},moderation:{view:!0,create:!1,edit:!0,delete:!0,approve:!0,export:!0},support:{view:!0,create:!0,edit:!0,delete:!1,approve:!1,export:!0},analytics:{view:!0,export:!0},audit:{view:!0,export:!1},settings:{view:!0,edit:!1},system:{view:!0,edit:!1}}},OPERATIONS_ADMIN:{title:"Operations Admin",description:"Manage active trips, real-time bookings, planner coordination and traveller logistics.",badgeClass:"badge-cyan",permissions:{users:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!0},planners:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!0},trips:{view:!0,create:!0,edit:!0,delete:!1,approve:!0,export:!0},bookings:{view:!0,create:!0,edit:!0,delete:!1,approve:!0,export:!0},payments:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!1},content:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!1},moderation:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!1},support:{view:!0,create:!0,edit:!0,delete:!1,approve:!0,export:!0},analytics:{view:!0,export:!1},audit:{view:!1,export:!1},settings:{view:!1,edit:!1},system:{view:!0,edit:!1}}},FINANCE_ADMIN:{title:"Finance Admin",description:"Control escrow disbursements, commissions, refunds, payment gateways and tax reports.",badgeClass:"badge-green",permissions:{users:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!0},planners:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!0},trips:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!0},bookings:{view:!0,create:!1,edit:!0,delete:!1,approve:!0,export:!0},payments:{view:!0,create:!0,edit:!0,delete:!1,approve:!0,export:!0},content:{view:!1,create:!1,edit:!1,delete:!1,approve:!1,export:!1},moderation:{view:!1,create:!1,edit:!1,delete:!1,approve:!1,export:!1},support:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!1},analytics:{view:!0,export:!0},audit:{view:!0,export:!0},settings:{view:!0,edit:!1},system:{view:!1,edit:!1}}},SUPPORT_ADMIN:{title:"Support Admin",description:"Resolve traveller & planner inquiries, emergency SOS hotlines, and dispatch assistance.",badgeClass:"badge-amber",permissions:{users:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!1},planners:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!1},trips:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!1},bookings:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!1},payments:{view:!1,create:!1,edit:!1,delete:!1,approve:!1,export:!1},content:{view:!0,create:!1,edit:!1,delete:!1,approve:!1,export:!1},moderation:{view:!0,create:!0,edit:!0,delete:!1,approve:!1,export:!1},support:{view:!0,create:!0,edit:!0,delete:!1,approve:!0,export:!0},analytics:{view:!1,export:!1},audit:{view:!1,export:!1},settings:{view:!1,edit:!1},system:{view:!1,edit:!1}}},MODERATOR:{title:"Content Moderator",description:"Moderate user complaints, spam reviews, fake itineraries and enforce community guidelines.",badgeClass:"badge-red",permissions:{users:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!1},planners:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!1},trips:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!1},bookings:{view:!1,create:!1,edit:!1,delete:!1,approve:!1,export:!1},payments:{view:!1,create:!1,edit:!1,delete:!1,approve:!1,export:!1},content:{view:!0,create:!1,edit:!0,delete:!0,approve:!0,export:!1},moderation:{view:!0,create:!0,edit:!0,delete:!0,approve:!0,export:!0},support:{view:!0,create:!1,edit:!0,delete:!1,approve:!1,export:!1},analytics:{view:!1,export:!1},audit:{view:!1,export:!1},settings:{view:!1,edit:!1},system:{view:!1,edit:!1}}}};class S{constructor(){this.maxAttempts=3,this.lockoutDurationMinutes=15}getLockoutStatus(){const e=localStorage.getItem(v.LOCKOUT_STATE);if(!e)return{isLocked:!1,remainingSeconds:0,attempts:0};try{const t=JSON.parse(e),a=Date.now();return t.lockedUntil&&a<t.lockedUntil?{isLocked:!0,remainingSeconds:Math.ceil((t.lockedUntil-a)/1e3),attempts:t.attempts}:t.lockedUntil&&a>=t.lockedUntil?(localStorage.removeItem(v.LOCKOUT_STATE),{isLocked:!1,remainingSeconds:0,attempts:0}):{isLocked:!1,remainingSeconds:0,attempts:t.attempts||0}}catch{return{isLocked:!1,remainingSeconds:0,attempts:0}}}recordFailedAttempt(){const t=(this.getLockoutStatus().attempts||0)+1;if(t>=this.maxAttempts){const a=Date.now()+this.lockoutDurationMinutes*60*1e3;return localStorage.setItem(v.LOCKOUT_STATE,JSON.stringify({attempts:t,lockedUntil:a})),{isLocked:!0,remainingSeconds:this.lockoutDurationMinutes*60,attempts:t}}else return localStorage.setItem(v.LOCKOUT_STATE,JSON.stringify({attempts:t,lockedUntil:null})),{isLocked:!1,remainingSeconds:0,attempts:t}}resetAttempts(){localStorage.removeItem(v.LOCKOUT_STATE)}validateMasterCredentials(e,t){const a=this.getLockoutStatus();if(a.isLocked)return{success:!1,error:`Account is temporarily locked due to repeated failed attempts. Try again in ${Math.ceil(a.remainingSeconds/60)} minutes.`,locked:!0,remainingSeconds:a.remainingSeconds};const i=(e||"").trim().toLowerCase(),n=(t||"").trim();if(!((["master@beacon.travel","admin@beacon.travel","superadmin@beacon.travel"].includes(i)||i.endsWith("@beacon.travel")||i==="admin")&&(n==="BeaconMaster2026!"||n==="admin"||n==="password"||n.length>=6))){const c=this.recordFailedAttempt(),u=this.maxAttempts-c.attempts;return{success:!1,error:c.isLocked?`Account locked out for ${this.lockoutDurationMinutes} minutes.`:`Invalid master credentials. ${u} attempt(s) remaining before security lockout.`,locked:c.isLocked,attemptsLeft:Math.max(0,u)}}this.resetAttempts();let r="SUPER_ADMIN",d="Vikram Malhotra";return i.includes("ops")?(r="OPERATIONS_ADMIN",d="Sneha Nair"):i.includes("finance")&&(r="FINANCE_ADMIN",d="Rajesh Gupta"),{success:!0,requiresMfa:!0,pendingUser:{id:"ADM-001",name:d,email:i.includes("@")?i:"master@beacon.travel",role:x[r].title,roleCode:r,avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",mfaMethod:"TOTP_AUTHENTICATOR",phoneMasked:"+91 ••••• ••920",emailMasked:"m•••••@beacon.travel"}}}verifyMfaCode(e){const t=(e||"").trim();return t==="123456"||t==="000000"||t.length===6&&/^\d+$/.test(t)?{success:!0}:{success:!1,error:"Invalid 6-digit authentication code. Please check your authenticator app or request a new code."}}checkDeviceReputation(){return localStorage.getItem("beacon_master_known_device")?{isNewDevice:!1}:{isNewDevice:!0,deviceInfo:{device:"MacBook Pro / Windows PC",browser:navigator.userAgent.includes("Chrome")?"Google Chrome 128":"Web Browser",ip:"103.246.40.112",approxLocation:"Mumbai, Maharashtra, India",time:new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZoneName:"short"})}}}approveCurrentDevice(){localStorage.setItem("beacon_master_known_device","true")}createSession(e,t=!1){const a="bcn_mst_"+Math.random().toString(36).substring(2)+Date.now().toString(36),i={token:a,user:e,createdAt:Date.now(),expiresAt:Date.now()+60*60*1e3,rememberDevice:t};return localStorage.setItem(v.AUTH_TOKEN,a),localStorage.setItem(v.ADMIN_USER,JSON.stringify(e)),localStorage.setItem(v.ACTIVE_SESSION,JSON.stringify(i)),t&&this.approveCurrentDevice(),i}getCurrentSession(){const e=localStorage.getItem(v.AUTH_TOKEN),t=localStorage.getItem(v.ADMIN_USER),a=localStorage.getItem(v.ACTIVE_SESSION);if(!e||!t||!a)return null;try{const i=JSON.parse(a);return Date.now()>i.expiresAt?(this.destroySession(),null):i}catch{return this.destroySession(),null}}destroySession(){localStorage.removeItem(v.AUTH_TOKEN),localStorage.removeItem(v.ADMIN_USER),localStorage.removeItem(v.ACTIVE_SESSION)}hasPermission(e,t="view"){const a=this.getCurrentSession();if(!a||!a.user)return!1;const i=a.user.roleCode||"SUPER_ADMIN",n=x[i]||x.SUPER_ADMIN;return n.permissions[e]?!!n.permissions[e][t]:!1}}const y=new S;class b{static renderRevenueChart(e){const t=document.getElementById(e);if(!t)return;const a=[{month:"Feb",gmv:24.2,rev:3.38},{month:"Mar",gmv:28.5,rev:3.99},{month:"Apr",gmv:34,rev:4.76},{month:"May",gmv:39.8,rev:5.57},{month:"Jun",gmv:42.1,rev:5.89},{month:"Jul",gmv:45.4,rev:6.35},{month:"Aug (MTD)",gmv:48.6,rev:6.8}],i=60,n=600,o=220,s={top:20,right:20,bottom:35,left:45},l=n-s.left-s.right,r=o-s.top-s.bottom,d=p=>s.left+p/(a.length-1)*l,c=p=>s.top+r-p/i*r,u=a.map((p,h)=>`${d(h)},${c(p.gmv)}`).join(" "),g=`${d(0)},${c(0)} `+u+` ${d(a.length-1)},${c(0)}`,m=a.map((p,h)=>`${d(h)},${c(p.rev*5)}`).join(" ");let f=`
      <svg viewBox="0 0 ${n} ${o}" class="chart-svg" style="width: 100%; height: 100%; overflow: visible;">
        <defs>
          <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00CBD4" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#00CBD4" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        <g class="chart-grid">
          ${[0,15,30,45,60].map(p=>`
            <line x1="${s.left}" y1="${c(p)}" x2="${n-s.right}" y2="${c(p)}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3"/>
            <text x="${s.left-8}" y="${c(p)+4}" fill="#64748B" font-size="10" text-anchor="end" font-family="monospace">₹${p}L</text>
          `).join("")}
        </g>

        <!-- GMV Area & Line -->
        <polygon points="${g}" fill="url(#gmvGrad)"/>
        <polyline points="${u}" fill="none" stroke="#00CBD4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Revenue Line -->
        <polyline points="${m}" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5,5"/>

        <!-- Data Dots & X Axis Labels -->
        ${a.map((p,h)=>`
          <g class="chart-node" data-tooltip="${p.month}: GMV ₹${p.gmv}L | Net Rev ₹${p.rev}L">
            <circle cx="${d(h)}" cy="${c(p.gmv)}" r="4.5" fill="#0F172A" stroke="#00CBD4" stroke-width="2" class="node-circle"/>
            <circle cx="${d(h)}" cy="${c(p.rev*5)}" r="3.5" fill="#0F172A" stroke="#10B981" stroke-width="2" class="node-circle"/>
            <text x="${d(h)}" y="${o-10}" fill="#94A3B8" font-size="11" text-anchor="middle" font-weight="500">${p.month}</text>
          </g>
        `).join("")}
      </svg>
    `;t.innerHTML=f}static renderDestinationShareChart(e){const t=document.getElementById(e);if(!t)return;let i=`
      <div class="dest-bars-wrap">
        ${[{name:"Goa Coast",trips:684,pct:28,color:"#00CBD4"},{name:"Dubai & UAE",trips:512,pct:21,color:"#38BDF8"},{name:"Bali Temples",trips:420,pct:17,color:"#818CF8"},{name:"Manali Valley",trips:412,pct:16,color:"#F59E0B"},{name:"Kashmir Alpine",trips:342,pct:12,color:"#10B981"},{name:"Paris & Europe",trips:218,pct:6,color:"#EC4899"}].map(n=>`
          <div class="dest-bar-row">
            <div class="dest-bar-info">
              <span class="dest-name">${n.name}</span>
              <span class="dest-trips">${n.trips} active trips (${n.pct}%)</span>
            </div>
            <div class="dest-progress-track">
              <div class="dest-progress-fill" style="width: ${n.pct*3.2}%; background: ${n.color};"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `;t.innerHTML=i}static renderGeographicMap(e,t){const a=document.getElementById(e);if(!a)return;let n=`
      <div class="geo-map-container">
        <svg viewBox="0 0 1000 500" class="world-svg-layer">
          <!-- Simplified Elegant Continental Vectors -->
          <path class="landmass" d="M150,120 Q180,90 280,100 Q320,130 300,180 Q250,220 200,240 Q130,200 150,120 Z" />
          <path class="landmass" d="M250,260 Q320,270 340,350 Q310,440 260,450 Q230,360 250,260 Z" />
          <path class="landmass" d="M440,90 Q520,70 580,110 Q560,170 480,180 Q430,140 440,90 Z" />
          <path class="landmass" d="M460,200 Q540,210 560,300 Q520,400 460,400 Q430,300 460,200 Z" />
          <path class="landmass" d="M590,90 Q850,70 900,190 Q820,300 660,260 Q620,170 590,90 Z" />
          <path class="landmass" d="M780,340 Q880,330 890,410 Q830,460 770,420 Q750,370 780,340 Z" />
          
          <!-- Route Connections between Hubs -->
          <g class="map-routes">
            <path d="M668,241 Q550,200 485,162" stroke="rgba(0, 203, 212, 0.25)" stroke-width="1.5" stroke-dasharray="4,4" fill="none" class="route-line" />
            <path d="M668,241 Q640,220 612,207" stroke="rgba(0, 203, 212, 0.35)" stroke-width="1.5" stroke-dasharray="4,4" fill="none" class="route-line" />
            <path d="M668,241 Q740,260 795,290" stroke="rgba(0, 203, 212, 0.3)" stroke-width="1.5" stroke-dasharray="4,4" fill="none" class="route-line" />
            <path d="M668,241 Q780,240 860,190" stroke="rgba(0, 203, 212, 0.25)" stroke-width="1.5" stroke-dasharray="4,4" fill="none" class="route-line" />
          </g>

          <!-- Hotspot Pins -->
          ${[{id:"DEST-01",name:"Kashmir",country:"India",x:67.5,y:35.5,trips:342,planners:28,gmv:"₹4.8L"},{id:"DEST-02",name:"Goa",country:"India",x:66.8,y:48.2,trips:684,planners:64,gmv:"₹12.4L"},{id:"DEST-03",name:"Manali",country:"India",x:68.2,y:37,trips:412,planners:42,gmv:"₹6.1L"},{id:"DEST-04",name:"Jaipur",country:"India",x:67.2,y:40.5,trips:290,planners:35,gmv:"₹4.2L"},{id:"DEST-05",name:"Dubai",country:"UAE",x:61.2,y:41.5,trips:512,planners:48,gmv:"₹10.5L"},{id:"DEST-06",name:"Bali",country:"Indonesia",x:79.5,y:58,trips:420,planners:39,gmv:"₹7.8L"},{id:"DEST-07",name:"Paris",country:"France",x:48.5,y:32.5,trips:218,planners:24,gmv:"₹9.2L"},{id:"DEST-08",name:"Tokyo",country:"Japan",x:86,y:38,trips:184,planners:19,gmv:"₹6.4L"},{id:"DEST-09",name:"Singapore",country:"Singapore",x:76.5,y:52,trips:310,planners:27,gmv:"₹5.9L"},{id:"DEST-10",name:"London",country:"UK",x:46.5,y:30,trips:195,planners:21,gmv:"₹8.1L"}].map(o=>`
            <g class="geo-pin-group" transform="translate(${o.x*10}, ${o.y*5})" data-dest-id="${o.id}">
              <circle r="12" class="pin-pulse" fill="#00CBD4" fill-opacity="0.2"/>
              <circle r="5" class="pin-dot" fill="#00CBD4" stroke="#0F172A" stroke-width="2"/>
              <text x="8" y="4" class="pin-label">${o.name}</text>
            </g>
          `).join("")}
        </svg>

        <div class="map-legend-overlay">
          <div class="legend-badge">
            <span class="legend-dot active"></span> 10 Active Global Travel Hubs
          </div>
          <div class="legend-stats">
            <div><strong>3,846</strong> Active Itineraries</div>
            <div><strong>1,284</strong> Local Planners</div>
          </div>
        </div>
      </div>
    `;a.innerHTML=n,a.querySelectorAll(".geo-pin-group").forEach(o=>{o.addEventListener("click",()=>{const s=o.getAttribute("data-dest-id");t&&t(s)})})}static renderLatencySparkline(e){const t=document.getElementById(e);if(!t)return;const a=t.getContext("2d");if(!a)return;let i=[32,34,38,35,42,39,36,40,38,37,44,38,35,39,41,38];const n=()=>{a.clearRect(0,0,t.width,t.height);const o=t.width,s=t.height;a.beginPath(),a.strokeStyle="#10B981",a.lineWidth=2,a.lineJoin="round";const l=o/(i.length-1);i.forEach((r,d)=>{const c=s-(r-20)/40*s;d===0?a.moveTo(0,c):a.lineTo(d*l,c)}),a.stroke()};n(),setInterval(()=>{const o=Math.floor(34+Math.random()*12);i.push(o),i.shift(),n()},2500)}}class E{constructor(){this.data=JSON.parse(JSON.stringify(A)),this.currentRoute="dashboard",this.activeDrawer=null,this.searchQuery="",this.selectedTab="all",this.liveActivityTimer=null}init(){this.setupHashRouter(),this.setupGlobalKeyboardShortcuts(),this.startLiveActivityFeed(),this.render()}setupHashRouter(){window.addEventListener("hashchange",()=>{const a=window.location.hash.replace("#","")||"dashboard";this.navigateTo(a)});const e=window.location.pathname.replace(/\/$/,"");let t="dashboard";e.endsWith("/login")||e==="/login"?t="login":window.location.hash&&(t=window.location.hash.replace("#","")),this.currentRoute=t}navigateTo(e){this.currentRoute=e,window.location.hash=e,this.render(),window.scrollTo({top:0,behavior:"smooth"})}setupGlobalKeyboardShortcuts(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="k"&&(e.preventDefault(),this.openCommandPalette()),e.key==="Escape"&&this.closeAllModals()})}showToast(e,t="info"){const a=document.getElementById("master-toast-container")||(()=>{const o=document.createElement("div");return o.id="master-toast-container",o.className="toast-container",document.body.appendChild(o),o})(),i=document.createElement("div");i.className="master-toast";const n=t==="success"?"✅":t==="danger"?"⚠️":"ℹ️";i.innerHTML=`<span>${n}</span> <span>${e}</span>`,a.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(10px)",i.style.transition="0.3s ease",setTimeout(()=>i.remove(),300)},3500)}startLiveActivityFeed(){const e=[{text:"Rahul Sharma initiated booking for Kashmir Alpine Skiing",time:"Just now",badge:"TRIP"},{text:"Planner Pooja Hegde uploaded verified Goan Tourism License",time:"1 min ago",badge:"KYC"},{text:"Razorpay Webhook: Payment of ₹85,000 confirmed for #BK-8292",time:"2 mins ago",badge:"PAYMENT"},{text:"Support Admin Sneha Nair resolved Ticket #TCK-401 (Srinagar Chauffeur)",time:"4 mins ago",badge:"SUPPORT"},{text:"New Traveller Vikram Seth registered via iOS Companion App",time:"6 mins ago",badge:"USER"}];window.BeaconSync&&(window.BeaconSync.on("PLANNER_REMINDER",a=>{this.addLiveMonitoringItem(`Traveller ${a.travellerName} is customizing "${a.packageName}" (${a.guestsCount} guests, ${a.mealPreference||"Custom"} meals)`,"CUSTOMIZE")}),window.BeaconSync.on("PAYMENT_CLAIM_RECEIVED",a=>{this.addLiveMonitoringItem(`UPI Payment Submitted: ${a.amount} for ${a.packageName} (UTR: ${a.utrId})`,"UTR PAYMENT"),this.showToast(`💳 New UPI Payment Claim: ${a.amount} for #${a.bookingId}`,"info")}),window.BeaconSync.on("PAYMENT_VERIFIED",a=>{this.addLiveMonitoringItem(`Payment Verified by ${a.plannerName} for Booking #${a.bookingId}`,"VERIFIED"),this.showToast(`✅ Payment verified for Booking #${a.bookingId}`,"success")}),window.BeaconSync.on("ATTENDANCE_MARKED",a=>{this.addLiveMonitoringItem(`Day ${a.dayNum} Attendance Verified: ${a.travellerName} at destination`,"CHECK-IN")}));let t=0;this.liveActivityTimer=setInterval(()=>{if(e[t]){const a=e[t];this.addLiveMonitoringItem(a.text,a.badge,a.time),t=(t+1)%e.length}},14e3)}addLiveMonitoringItem(e,t="EVENT",a="Just now"){const i=document.getElementById("live-activity-stream-list");if(i){const n=document.createElement("div");n.className="activity-item-stream",n.style.cssText="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05); animation:fadeIn 0.4s ease;",n.innerHTML=`
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="status-pill active" style="font-size:10px;">${t}</span>
          <span style="font-size:12.5px; color:#E2E8F0;">${e}</span>
        </div>
        <span style="font-size:11px; color:#64748B; font-family:var(--font-mono);">${a}</span>
      `,i.prepend(n),i.children.length>7&&i.lastElementChild.remove()}}render(){const e=document.getElementById("master-app-root");if(!e)return;const t=y.getCurrentSession();if(!t&&this.currentRoute!=="login"){this.renderLoginPage(e);return}if(this.currentRoute==="login"){this.renderLoginPage(e);return}this.renderAppShell(e,t)}renderLoginPage(e){const t=y.getLockoutStatus(),a=y.checkDeviceReputation();e.innerHTML=`
      <div class="master-login-layout">
        <!-- Left Hero Panel -->
        <div class="login-hero-panel">
          <div class="login-hero-content">
            <a href="#" class="login-brand-logo">
              <img src="/Beacon-%20Logo.png" alt="Beacon Logo" onerror="this.src='https://via.placeholder.com/44x44/00CBD4/070B14?text=B'">
              <div class="login-brand-text">
                BEACON
                <span>MASTER CONTROL</span>
              </div>
            </a>
          </div>

          <div class="login-hero-headline">
            <h1>Navigate the world.<br><span class="cyan-glow-text">Manage the journey.</span></h1>
            <p>One secure, intelligent command center governing travellers, planners, bespoke itineraries, escrow finances, and system telemetry across the Beacon ecosystem.</p>
          </div>

          <div class="login-hero-telemetry">
            <div class="telemetry-item">
              <span class="value">12,482</span>
              <span class="label">Travellers</span>
            </div>
            <div class="telemetry-item" style="border-left: 1px solid var(--border-subtle); padding-left: 20px;">
              <span class="value">1,284</span>
              <span class="label">Planners</span>
            </div>
            <div class="telemetry-item" style="border-left: 1px solid var(--border-subtle); padding-left: 20px;">
              <span class="value">₹48.6L</span>
              <span class="label">Gross GMV</span>
            </div>
            <div class="telemetry-item" style="border-left: 1px solid var(--border-subtle); padding-left: 20px;">
              <span class="value" style="color: var(--beacon-green);">99.98%</span>
              <span class="label">System Health</span>
            </div>
          </div>
        </div>

        <!-- Right Authentication Panel -->
        <div class="login-auth-panel">
          <div class="login-auth-card" id="auth-card-container">
            ${this.getLoginFormHtml(t,a)}
          </div>
        </div>
      </div>
    `,this.attachLoginEventListeners()}getLoginFormHtml(e,t){return`
      <div class="auth-header">
        <span class="auth-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Master Administrator Access
        </span>
        <h2>Sign In to Beacon Master</h2>
        <p>Enter your administrative credentials to access command controls.</p>
      </div>

      ${t.isNewDevice?`
        <div class="security-alert-box warning">
          <span style="font-size:18px;">🛡️</span>
          <div>
            <strong>New Device Detected</strong><br>
            IP: ${t.deviceInfo.ip} (${t.deviceInfo.approxLocation}). MFA verification required.
          </div>
        </div>
      `:""}

      ${e.isLocked?`
        <div class="security-alert-box danger">
          <span style="font-size:18px;">🔒</span>
          <div>
            <strong>Account Temporarily Locked</strong><br>
            Security lockout active. Please wait ${Math.ceil(e.remainingSeconds/60)} minutes before trying again.
          </div>
        </div>
      `:""}

      <form id="master-login-form">
        <div class="form-group">
          <label>Administrator Email / ID</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input type="email" id="login-email" class="form-control" placeholder="master@beacon.travel" value="master@beacon.travel" required ${e.isLocked?"disabled":""}>
          </div>
        </div>

        <div class="form-group">
          <label>Master Security Key</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••••••" value="BeaconMaster2026!" required ${e.isLocked?"disabled":""}>
          </div>
        </div>

        <div class="form-extra-row">
          <label class="checkbox-label">
            <input type="checkbox" id="remember-device" checked>
            <span>Remember this device</span>
          </label>
          <a href="#" id="btn-forgot-credentials" class="forgot-link">Reset Key</a>
        </div>

        <button type="submit" class="btn-primary-master" id="btn-submit-login" ${e.isLocked?"disabled":""}>
          <span>Authenticate & Proceed to 2FA</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </form>

      <div class="security-seal-footer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>End-to-End Encrypted Session · ISO/IEC 27001 Certified Vault</span>
      </div>
    `}attachLoginEventListeners(){const e=document.getElementById("master-login-form");if(!e)return;e.addEventListener("submit",a=>{a.preventDefault();const i=document.getElementById("login-email").value,n=document.getElementById("login-password").value,o=document.getElementById("remember-device").checked,s=y.validateMasterCredentials(i,n);if(!s.success){this.showToast(s.error,"danger"),this.render();return}this.renderMfaScreen(s.pendingUser,o)});const t=document.getElementById("btn-forgot-credentials");t&&t.addEventListener("click",a=>{a.preventDefault(),alert("Master Administrator recovery requires hardware token or direct super-admin console reset. Security link dispatched to master backup recovery email.")})}renderMfaScreen(e,t){const a=document.getElementById("auth-card-container");if(!a)return;a.innerHTML=`
      <div class="auth-header">
        <span class="auth-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--beacon-green); border-color: rgba(16, 185, 129, 0.3);">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Password Verified
        </span>
        <h2>Two-Factor Verification</h2>
        <p>Enter the 6-digit security code generated by your Authenticator App or SMS for <strong>${e.emailMasked}</strong>.</p>
      </div>

      <div class="security-alert-box info">
        <span style="font-size:16px;">🔑</span>
        <div>Demo Key: Enter <strong>123456</strong> or your TOTP code to enter the command center.</div>
      </div>

      <form id="mfa-verify-form">
        <div class="otp-container">
          <input type="text" maxlength="1" class="otp-box" autofocus required>
          <input type="text" maxlength="1" class="otp-box" required>
          <input type="text" maxlength="1" class="otp-box" required>
          <input type="text" maxlength="1" class="otp-box" required>
          <input type="text" maxlength="1" class="otp-box" required>
          <input type="text" maxlength="1" class="otp-box" required>
        </div>

        <div class="resend-countdown-wrap">
          Didn't receive code? <button type="button" class="resend-btn" id="btn-resend-otp">Resend OTP via SMS</button>
        </div>

        <button type="submit" class="btn-primary-master" id="btn-confirm-mfa">
          <span>Authorize Master Session</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        <button type="button" class="btn-secondary-master" id="btn-back-to-login" style="width:100%; justify-content:center; margin-top:12px;">
          <span>Back to Credentials</span>
        </button>
      </form>
    `;const i=a.querySelectorAll(".otp-box");i.forEach((n,o)=>{n.addEventListener("input",s=>{s.target.value.length===1&&o<i.length-1&&i[o+1].focus()}),n.addEventListener("keydown",s=>{s.key==="Backspace"&&!s.target.value&&o>0&&i[o-1].focus()})}),i[0].addEventListener("paste",n=>{const o=n.clipboardData.getData("text").trim();o.length===6&&(o.split("").forEach((s,l)=>{i[l]&&(i[l].value=s)}),i[5].focus())}),document.getElementById("mfa-verify-form").addEventListener("submit",n=>{n.preventDefault();const o=Array.from(i).map(l=>l.value).join(""),s=y.verifyMfaCode(o||"123456");if(!s.success){this.showToast(s.error,"danger");return}y.createSession(e,t),this.showToast("Authenticated as Master Administrator. Command Center active.","success"),this.navigateTo("dashboard")}),document.getElementById("btn-back-to-login").addEventListener("click",()=>{this.render()}),document.getElementById("btn-resend-otp").addEventListener("click",()=>{this.showToast("New 6-digit OTP code dispatched to registered mobile number.","info")})}renderAppShell(e,t){const a=this.currentRoute;e.innerHTML=`
      <div class="master-app-shell">
        <!-- Sidebar Navigation -->
        <aside class="master-sidebar" id="master-sidebar">
          <div class="sidebar-brand-head">
            <a href="#dashboard" class="sidebar-logo">
              <img src="/Beacon-%20Logo.png" alt="Beacon" onerror="this.src='https://via.placeholder.com/32x32/00CBD4/070B14?text=B'">
              <div class="sidebar-logo-text">
                BEACON
                <span>MASTER CONTROL</span>
              </div>
            </a>
          </div>

          <div class="sidebar-nav">
            <!-- Overview -->
            <div>
              <div class="nav-group-title">Overview</div>
              <a href="#dashboard" class="nav-item-link ${a==="dashboard"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>Command Dashboard</span>
              </a>
            </div>

            <!-- People -->
            <div>
              <div class="nav-group-title">People & Roles</div>
              <a href="#users" class="nav-item-link ${a==="users"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>All Users</span>
                <span class="nav-item-badge badge-cyan">${this.data.stats.totalTravellers+this.data.stats.totalPlanners}</span>
              </a>
              <a href="#travellers" class="nav-item-link ${a==="travellers"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Travellers</span>
              </a>
              <a href="#planners" class="nav-item-link ${a==="planners"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>Trip Planners</span>
                <span class="nav-item-badge badge-cyan">${this.data.stats.totalPlanners}</span>
              </a>
              <a href="#verifications" class="nav-item-link ${a==="verifications"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>KYC Verifications</span>
                <span class="nav-item-badge badge-amber">${this.data.stats.pendingVerifications}</span>
              </a>
              <a href="#admins" class="nav-item-link ${a==="admins"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                <span>Admin RBAC</span>
              </a>
            </div>

            <!-- Travel -->
            <div>
              <div class="nav-group-title">Travel Ecosystem</div>
              <a href="#trips" class="nav-item-link ${a==="trips"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                <span>Trips & Itineraries</span>
                <span class="nav-item-badge badge-cyan">${this.data.stats.activeTrips}</span>
              </a>
              <a href="#destinations" class="nav-item-link ${a==="destinations"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Destinations</span>
              </a>
              <a href="#experiences" class="nav-item-link ${a==="experiences"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>Experiences</span>
              </a>
            </div>

            <!-- Commerce -->
            <div>
              <div class="nav-group-title">Commerce & Escrow</div>
              <a href="#bookings" class="nav-item-link ${a==="bookings"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Bookings</span>
                <span class="nav-item-badge badge-green">${this.data.stats.totalBookings}</span>
              </a>
              <a href="#payments" class="nav-item-link ${a==="payments"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <span>Financial Ledger</span>
              </a>
            </div>

            <!-- Operations -->
            <div>
              <div class="nav-group-title">Operations & Safety</div>
              <a href="#support" class="nav-item-link ${a==="support"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span>Support & SOS</span>
                <span class="nav-item-badge badge-red">${this.data.stats.openSupportTickets}</span>
              </a>
              <a href="#moderation" class="nav-item-link ${a==="moderation"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                <span>Moderation</span>
              </a>
              <a href="#notifications" class="nav-item-link ${a==="notifications"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span>Broadcasts</span>
              </a>
            </div>

            <!-- Intelligence & System -->
            <div>
              <div class="nav-group-title">Intelligence & Governance</div>
              <a href="#analytics" class="nav-item-link ${a==="analytics"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                <span>Analytics & Maps</span>
              </a>
              <a href="#audit-logs" class="nav-item-link ${a==="audit-logs"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <span>Immutable Audit Log</span>
              </a>
              <a href="#system-health" class="nav-item-link ${a==="system-health"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <span>System Health</span>
              </a>
              <a href="#settings" class="nav-item-link ${a==="settings"?"active":""}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                <span>Platform Settings</span>
              </a>
            </div>
          </div>

          <!-- Sidebar Footer Admin -->
          <div class="sidebar-footer">
            <div class="admin-mini-profile">
              <img src="${t.user.avatar}" alt="${t.user.name}" class="admin-mini-avatar">
              <div class="admin-mini-info">
                <div class="admin-mini-name">${t.user.name}</div>
                <div class="admin-mini-role">${t.user.role}</div>
              </div>
              <button class="btn-sidebar-logout" id="btn-logout" title="Sign Out">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Workspace -->
        <div class="master-main-wrapper">
          <!-- Topbar -->
          <header class="master-topbar">
            <div class="global-search-trigger" id="btn-trigger-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Search Beacon ecosystem...</span>
              <kbd>Ctrl K</kbd>
            </div>

            <div class="topbar-right-actions">
              <div class="system-status-indicator">
                <span class="live-beacon-pulse"></span>
                <span>Operational</span>
              </div>

              <button class="topbar-btn" id="btn-notification-bell" title="System Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span class="topbar-badge-dot"></span>
              </button>

              <button class="topbar-btn" id="btn-quick-sos-modal" title="Emergency Travel SOS" style="border-color: rgba(239,68,68,0.4); color: var(--beacon-red);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </button>
            </div>
          </header>

          <!-- Dynamic View Body -->
          <main class="master-content-body" id="master-view-container">
            ${this.getDynamicViewContent(a,t)}
          </main>
        </div>
      </div>

      <!-- Modals and Drawers Container -->
      <div id="master-modal-root"></div>
    `,this.attachShellEventListeners(),this.postRenderView(a)}attachShellEventListeners(){var e,t,a,i,n;(e=document.getElementById("btn-logout"))==null||e.addEventListener("click",()=>{this.openLogoutConfirmation()}),(t=document.getElementById("btn-trigger-search"))==null||t.addEventListener("click",()=>{this.openCommandPalette()}),(a=document.getElementById("btn-notification-bell"))==null||a.addEventListener("click",()=>{this.openNotificationsDrawer()}),(i=document.getElementById("btn-quick-sos-modal"))==null||i.addEventListener("click",()=>{this.navigateTo("support"),this.showToast("Emergency Support & SOS queue active.","info")}),(n=document.querySelector(".system-status-indicator"))==null||n.addEventListener("click",()=>{this.navigateTo("system-health"),this.showToast("System Telemetry & Live Sparklines Active.","info")})}getDynamicViewContent(e,t){switch(e){case"dashboard":return this.getDashboardViewHtml(t);case"users":case"travellers":return this.getUsersViewHtml(e);case"planners":return this.getPlannersViewHtml();case"verifications":return this.getVerificationsViewHtml();case"trips":return this.getTripsViewHtml();case"destinations":return this.getDestinationsViewHtml();case"experiences":return this.getExperiencesViewHtml();case"bookings":return this.getBookingsViewHtml();case"payments":return this.getPaymentsViewHtml();case"support":return this.getSupportViewHtml();case"moderation":return this.getModerationViewHtml();case"notifications":return this.getNotificationsViewHtml();case"analytics":return this.getAnalyticsViewHtml();case"audit-logs":return this.getAuditLogsViewHtml();case"system-health":return this.getSystemHealthViewHtml();case"admins":return this.getAdminsViewHtml();case"settings":return this.getSettingsViewHtml();default:return this.getDashboardViewHtml(t)}}postRenderView(e){e==="dashboard"?(b.renderRevenueChart("chart-gmv-revenue"),b.renderDestinationShareChart("chart-dest-share")):e==="analytics"?(b.renderRevenueChart("chart-analytics-revenue"),b.renderGeographicMap("chart-geo-world-map",t=>{this.openDestinationDetail(t)})):e==="system-health"&&b.renderLatencySparkline("canvas-latency-sparkline")}getDashboardViewHtml(e){const t=this.data.stats;return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Good morning, ${e.user.name}</h1>
          <p>Here is what is happening across the Beacon travel ecosystem today.</p>
        </div>
        <div class="page-actions-group">
          <button class="btn-secondary-master" onclick="window.masterApp.openExportModal('Executive KPI Summary')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Export Report</span>
          </button>
          <button class="btn-primary-master" style="width: auto; padding: 10px 18px;" onclick="window.masterApp.navigateTo('verifications')">
            <span>Review Verifications (${t.pendingVerifications})</span>
          </button>
        </div>
      </div>

      <!-- 8 Executive KPI Cards -->
      <div class="kpi-grid-master">
        <!-- Travellers -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Total Travellers</span>
            <div class="kpi-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
          </div>
          <div class="kpi-value">${t.totalTravellers.toLocaleString()}</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${t.travellersGrowth}%</span>
            <span class="trend-period">vs last month</span>
          </div>
        </div>

        <!-- Planners -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Verified Planners</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-purple); background: rgba(139,92,246,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
          </div>
          <div class="kpi-value">${t.totalPlanners.toLocaleString()}</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${t.plannersGrowth}%</span>
            <span class="trend-period">active organizers</span>
          </div>
        </div>

        <!-- Active Trips -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Active Trips</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-blue); background: rgba(2,132,199,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
            </div>
          </div>
          <div class="kpi-value">${t.activeTrips.toLocaleString()}</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${t.tripsGrowth}%</span>
            <span class="trend-period">in progress worldwide</span>
          </div>
        </div>

        <!-- Total Bookings -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Total Bookings</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-green); background: rgba(16,185,129,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
          </div>
          <div class="kpi-value">${t.totalBookings.toLocaleString()}</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${t.bookingsGrowth}%</span>
            <span class="trend-period">converted itineraries</span>
          </div>
        </div>

        <!-- Gross GMV -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Gross Booking Value</span>
            <div class="kpi-icon-wrap" style="color: #38BDF8; background: rgba(56,189,248,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
          </div>
          <div class="kpi-value">₹48.60L</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${t.gbvGrowth}%</span>
            <span class="trend-period">₹48,60,000 GMV</span>
          </div>
        </div>

        <!-- Net Platform Revenue -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Platform Take (14%)</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-green); background: rgba(16,185,129,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
          </div>
          <div class="kpi-value">₹6.80L</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${t.revenueGrowth}%</span>
            <span class="trend-period">net platform commission</span>
          </div>
        </div>

        <!-- Pending Verifications -->
        <div class="kpi-card-master" style="border-color: rgba(245,158,11,0.3);">
          <div class="kpi-top-row">
            <span class="kpi-label">Pending KYC Vault</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-amber); background: rgba(245,158,11,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
          </div>
          <div class="kpi-value" style="color: var(--beacon-amber);">${t.pendingVerifications}</div>
          <div class="kpi-bottom-row">
            <span class="status-pill pending" style="font-size: 10px;">Action Required</span>
            <span class="trend-period">3 submitted today</span>
          </div>
        </div>

        <!-- Open Support / SOS -->
        <div class="kpi-card-master" style="border-color: rgba(239,68,68,0.3);">
          <div class="kpi-top-row">
            <span class="kpi-label">Open SOS & Support</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-red); background: rgba(239,68,68,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
          </div>
          <div class="kpi-value" style="color: var(--beacon-red);">${t.openSupportTickets}</div>
          <div class="kpi-bottom-row">
            <span class="status-pill suspended" style="font-size: 10px;">1 Urgent SOS</span>
            <span class="trend-period">Srinagar Pickup</span>
          </div>
        </div>
      </div>

      <!-- Travel Ecosystem Flow Architecture -->
      <div class="ecosystem-graph-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <div>
            <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Beacon Travel Ecosystem Flow Architecture</h3>
            <p style="font-size:12px; color:var(--text-muted);">Real-time relationship pipeline connecting demand, bespoke planning, curation, escrow settlements, and traveller feedback.</p>
          </div>
          <span class="status-pill active">🟢 Live Telemetry Stream</span>
        </div>

        <div class="ecosystem-nodes-flow">
          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(0,203,212,0.1); color: var(--beacon-cyan);">👤</div>
            <div class="eco-node-title">Travellers</div>
            <div class="eco-node-count">12,482 Profiles</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(2,132,199,0.1); color: var(--beacon-blue);">🗺️</div>
            <div class="eco-node-title">Custom Trips</div>
            <div class="eco-node-count">3,846 Active</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(139,92,246,0.1); color: var(--beacon-purple);">🎖️</div>
            <div class="eco-node-title">Local Planners</div>
            <div class="eco-node-count">1,284 Verified</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(245,158,11,0.1); color: var(--beacon-amber);">✨</div>
            <div class="eco-node-title">Experiences</div>
            <div class="eco-node-count">840 Curated</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(16,185,129,0.1); color: var(--beacon-green);">💳</div>
            <div class="eco-node-title">Escrow Payments</div>
            <div class="eco-node-count">₹48.6L Secured</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(236,72,153,0.1); color: #EC4899;">⭐</div>
            <div class="eco-node-title">Reviews & Trust</div>
            <div class="eco-node-count">4.92 / 5.0 Avg</div>
          </div>
        </div>
      </div>

      <!-- Charts & Live Feed Section -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 30px;">
        <!-- Left: Revenue & GMV Chart -->
        <div class="table-card-master" style="padding: 24px; margin-bottom: 0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div>
              <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Gross Booking Value (GMV) vs Net Platform Revenue</h3>
              <p style="font-size:12px; color:var(--text-muted);">Monthly financial trajectory in Indian Rupees (Lakhs).</p>
            </div>
            <div style="display:flex; gap:12px; font-size:11px;">
              <span style="display:flex; align-items:center; gap:6px; color:var(--beacon-cyan); font-weight:600;"><span style="width:8px; height:8px; border-radius:50%; background:var(--beacon-cyan);"></span> Gross GMV</span>
              <span style="display:flex; align-items:center; gap:6px; color:var(--beacon-green); font-weight:600;"><span style="width:8px; height:8px; border-radius:50%; background:var(--beacon-green);"></span> Net Take (14%)</span>
            </div>
          </div>
          <div id="chart-gmv-revenue" style="height: 220px; width: 100%;"></div>
        </div>

        <!-- Right: Destination Market Share -->
        <div class="table-card-master" style="padding: 24px; margin-bottom: 0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div>
              <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Top Travel Hubs</h3>
              <p style="font-size:12px; color:var(--text-muted);">Active itinerary density by destination.</p>
            </div>
          </div>
          <div id="chart-dest-share"></div>
        </div>
      </div>

      <!-- Live Activity Stream & Recent Trips Grid -->
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px;">
        <!-- Live Real-Time Feed -->
        <div class="table-card-master" style="padding: 24px; margin-bottom: 0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
            <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Real-Time Beacon Activity Feed</h3>
            <span class="status-pill active" style="font-size:10px;">Live WebSockets</span>
          </div>
          <div id="live-activity-stream-list" style="display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="status-pill active" style="font-size:10px;">TRIP</span>
                <span style="font-size:12.5px; color:#E2E8F0;">Aarav Mehta confirmed booking for Kashmir Ski Expedition</span>
              </div>
              <span style="font-size:11px; color:#64748B; font-family:var(--font-mono);">10 mins ago</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="status-pill pending" style="font-size:10px;">KYC</span>
                <span style="font-size:12.5px; color:#E2E8F0;">Karan Deshmukh submitted Maharashtra Tourism Operator License</span>
              </div>
              <span style="font-size:11px; color:#64748B; font-family:var(--font-mono);">3 hours ago</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="status-pill active" style="font-size:10px;">PAYMENT</span>
                <span style="font-size:12.5px; color:#E2E8F0;">₹1,45,000 Escrow lock confirmed via Razorpay for #BK-8291</span>
              </div>
              <span style="font-size:11px; color:#64748B; font-family:var(--font-mono);">5 hours ago</span>
            </div>
          </div>
        </div>

        <!-- Quick Action Shortcuts -->
        <div class="table-card-master" style="padding: 24px; margin-bottom: 0;">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF; margin-bottom:16px;">Master Command Shortcuts</h3>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button class="btn-secondary-master" style="justify-content: flex-start; padding: 14px;" onclick="window.masterApp.navigateTo('verifications')">
              <span style="font-size:18px;">📄</span>
              <div style="text-align: left;">
                <div style="font-weight: 700; color: #FFF; font-size: 13px;">Approve KYC</div>
                <div style="font-size: 11px; color: var(--text-muted);">37 Pending Vault</div>
              </div>
            </button>

            <button class="btn-secondary-master" style="justify-content: flex-start; padding: 14px;" onclick="window.masterApp.navigateTo('trips')">
              <span style="font-size:18px;">✈️</span>
              <div style="text-align: left;">
                <div style="font-weight: 700; color: #FFF; font-size: 13px;">Inspect Trips</div>
                <div style="font-size: 11px; color: var(--text-muted);">3,846 Active</div>
              </div>
            </button>

            <button class="btn-secondary-master" style="justify-content: flex-start; padding: 14px;" onclick="window.masterApp.navigateTo('payments')">
              <span style="font-size:18px;">💰</span>
              <div style="text-align: left;">
                <div style="font-weight: 700; color: #FFF; font-size: 13px;">Disburse Escrow</div>
                <div style="font-size: 11px; color: var(--text-muted);">Weekly Monday Batch</div>
              </div>
            </button>

            <button class="btn-secondary-master" style="justify-content: flex-start; padding: 14px;" onclick="window.masterApp.navigateTo('system-health')">
              <span style="font-size:18px;">⚡</span>
              <div style="text-align: left;">
                <div style="font-weight: 700; color: #FFF; font-size: 13px;">System Health</div>
                <div style="font-size: 11px; color: var(--beacon-green);">99.98% Latency 38ms</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    `}getUsersViewHtml(e){const t=e==="travellers",a=this.data.users.filter(i=>t||this.selectedTab==="travellers"?i.type==="TRAVELLER":this.selectedTab==="planners"?i.type==="PLANNER":this.selectedTab==="admins"?i.type==="ADMIN":this.selectedTab==="suspended"?i.status==="SUSPENDED":this.selectedTab==="pending"?i.verificationStatus==="PENDING":!0).filter(i=>{if(!this.searchQuery)return!0;const n=this.searchQuery.toLowerCase();return i.name.toLowerCase().includes(n)||i.email.toLowerCase().includes(n)||i.id.toLowerCase().includes(n)});return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>${t?"Traveller Intelligence & Profiles":"Master User Management"}</h1>
          <p>Supervise travellers, planners, administrators, status governance, and granular dossiers.</p>
        </div>
        <div class="page-actions-group">
          <button class="btn-secondary-master" onclick="window.masterApp.openExportModal('Users Directory')">Export CSV</button>
        </div>
      </div>

      <div class="table-card-master">
        <div class="table-header-controls">
          ${t?"<div></div>":`
            <div class="table-tabs-nav">
              <button class="tab-btn ${this.selectedTab==="all"?"active":""}" onclick="window.masterApp.setUserTab('all')">All Users (${this.data.users.length})</button>
              <button class="tab-btn ${this.selectedTab==="travellers"?"active":""}" onclick="window.masterApp.setUserTab('travellers')">Travellers</button>
              <button class="tab-btn ${this.selectedTab==="planners"?"active":""}" onclick="window.masterApp.setUserTab('planners')">Planners</button>
              <button class="tab-btn ${this.selectedTab==="admins"?"active":""}" onclick="window.masterApp.setUserTab('admins')">Admins</button>
              <button class="tab-btn ${this.selectedTab==="suspended"?"active":""}" onclick="window.masterApp.setUserTab('suspended')">Suspended</button>
            </div>
          `}

          <input type="text" class="table-search-input" placeholder="Search by name, email, user ID..." value="${this.searchQuery}" oninput="window.masterApp.handleSearch(this.value)">
        </div>

        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>User / Identity</th>
                <th>Role / Type</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Location</th>
                <th>Trips / Volume</th>
                <th>Last Active</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${a.map(i=>`
                <tr>
                  <td>
                    <div class="user-cell-wrap">
                      <img src="${i.avatar}" alt="${i.name}" class="user-cell-avatar">
                      <div>
                        <div class="user-cell-name">${i.name}</div>
                        <div class="user-cell-email">${i.email} · ${i.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="status-pill ${i.type==="PLANNER"?"badge-purple":i.type==="ADMIN"?"badge-green":"badge-cyan"}">
                      ${i.type}
                    </span>
                  </td>
                  <td>
                    <span class="status-pill ${i.status.toLowerCase()}">
                      ${i.status}
                    </span>
                  </td>
                  <td>
                    <span class="status-pill ${i.verificationStatus.toLowerCase()}">
                      ${i.verificationStatus==="VERIFIED"?"✓ Verified":"Pending KYC"}
                    </span>
                  </td>
                  <td>${i.location||"India"}</td>
                  <td><strong>${i.tripsCount||0}</strong> trips ${i.totalSpent?`(${i.totalSpent})`:i.totalEarned?`(${i.totalEarned})`:""}</td>
                  <td>${i.lastActive}</td>
                  <td style="text-align: right;">
                    <div class="action-btn-group" style="justify-content: flex-end;">
                      <button class="btn-action-icon" title="View Dossier" onclick="window.masterApp.openUserDossier('${i.id}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      ${i.status==="ACTIVE"?`
                        <button class="btn-action-icon danger" title="Suspend User" onclick="window.masterApp.openDangerousActionModal('SUSPEND_USER', '${i.id}', '${i.name}')">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                        </button>
                      `:`
                        <button class="btn-action-icon" title="Reactivate Account" onclick="window.masterApp.reactivateUser('${i.id}')" style="color: var(--beacon-green);">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                      `}
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getPlannersViewHtml(){const e=this.data.users.filter(t=>t.type==="PLANNER");return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Trip Planner Management & Governance</h1>
          <p>Oversee verified tour organizers, Gold/Silver tier badges, commissions, response rates, and KYC compliance.</p>
        </div>
        <div class="page-actions-group">
          <button class="btn-primary-master" style="width:auto;" onclick="window.masterApp.navigateTo('verifications')">
            <span>Pending Approvals (${this.data.verifications.length})</span>
          </button>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Planner / Business</th>
                <th>Specialization</th>
                <th>Rating & Reviews</th>
                <th>Trips Organized</th>
                <th>Total Earned</th>
                <th>SLA Response</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(t=>`
                <tr>
                  <td>
                    <div class="user-cell-wrap">
                      <img src="${t.avatar}" alt="${t.name}" class="user-cell-avatar">
                      <div>
                        <div class="user-cell-name">${t.name}</div>
                        <div class="user-cell-email">${t.location} · <span style="color:var(--beacon-cyan);">${t.plannerBadge||"Planner"}</span></div>
                      </div>
                    </div>
                  </td>
                  <td>${(t.specialization||["Custom Tours"]).slice(0,2).join(", ")}</td>
                  <td>⭐ <strong>${t.rating||"New"}</strong> (${t.reviewsCount||0})</td>
                  <td><strong>${t.tripsCount||0}</strong> completed</td>
                  <td style="color: var(--beacon-green); font-weight:700;">${t.totalEarned||"₹0"}</td>
                  <td><span class="status-pill active">${t.responseRate||"100%"}</span></td>
                  <td><span class="status-pill ${t.status.toLowerCase()}">${t.status}</span></td>
                  <td style="text-align: right;">
                    <div class="action-btn-group" style="justify-content: flex-end;">
                      <button class="btn-secondary-master" style="padding: 6px 12px; font-size:11px;" onclick="window.masterApp.openPlannerDossier('${t.id}')">
                        Inspect Profile
                      </button>
                      <button class="btn-action-icon danger" title="Suspend Planner" onclick="window.masterApp.openDangerousActionModal('SUSPEND_PLANNER', '${t.id}', '${t.name}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getVerificationsViewHtml(){return this.activeScrutinyPlannerId?this.getPlannerScrutinyDossierHtml(this.activeScrutinyPlannerId):this.getPlannersVerificationQueueHtml()}getPlannersVerificationQueueHtml(){let e=this.data.verifications.length,t=0,a=0,i=0,n=0;this.data.verifications.forEach(r=>{n+=(r.documents||[]).length,r.status==="VERIFIED"?a++:r.status==="REJECTED"||(r.documents||[]).some(d=>d.status==="REJECTED")?i++:t++});const o=this.selectedQueueFilter||"ALL",s=(this.searchQuery||"").toLowerCase(),l=this.data.verifications.filter(r=>{const d=r.applicantName.toLowerCase().includes(s)||r.applicantId.toLowerCase().includes(s)||(r.location||"").toLowerCase().includes(s),c=r.status==="REJECTED"||(r.documents||[]).some(u=>u.status==="REJECTED");return o==="PENDING"?r.status==="PENDING"&&!c:o==="VERIFIED"?r.status==="VERIFIED":o==="REJECTED"?c:d});return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Identity & Business KYC Verification Vault</h1>
          <p>Planner Verification Queue: Inspect submitted credentials, review PDF documents, and grant package planning authorization.</p>
        </div>
        <div class="page-actions-group">
          <button class="btn-secondary-master" onclick="window.masterApp.simulatePlannerUpload()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>+ Simulate New Planner Submission</span>
          </button>
          <button class="btn-primary-master" style="width: auto; padding: 10px 18px;" onclick="window.masterApp.openExportModal('KYC Planners Queue')">
            <span>Export Verification Audit</span>
          </button>
        </div>
      </div>

      <!-- Vault Metric Telemetry Cards -->
      <div class="kyc-vault-header-stats">
        <div class="kyc-stat-box">
          <span class="kyc-stat-label">Total Planner Submissions</span>
          <div class="kyc-stat-val">${e} <span style="font-size: 13px; font-weight: normal; color: var(--text-muted);">${n} Documents</span></div>
        </div>
        <div class="kyc-stat-box" style="border-color: rgba(245,158,11,0.3);">
          <span class="kyc-stat-label">Pending Document Scrutiny</span>
          <div class="kyc-stat-val" style="color: var(--beacon-amber);">${t} <span style="font-size: 13px; font-weight: normal; color: var(--text-muted);">Awaiting Review</span></div>
        </div>
        <div class="kyc-stat-box" style="border-color: rgba(239,68,68,0.3);">
          <span class="kyc-stat-label">Rejections / Action Required</span>
          <div class="kyc-stat-val" style="color: var(--beacon-red);">${i} <span style="font-size: 13px; font-weight: normal; color: var(--text-muted);">Re-upload Dispatched</span></div>
        </div>
        <div class="kyc-stat-box" style="border-color: rgba(16,185,129,0.3);">
          <span class="kyc-stat-label">Fully Authorized & Verified</span>
          <div class="kyc-stat-val" style="color: var(--beacon-green);">${a} <span style="font-size: 13px; font-weight: normal; color: var(--text-muted);">Package Enabled</span></div>
        </div>
      </div>

      <!-- Filter Controls & Search -->
      <div class="table-card-master" style="padding: 16px 20px; margin-bottom: 24px;">
        <div class="table-header-controls" style="padding: 0; border-bottom: none;">
          <div class="table-tabs-nav">
            <button class="tab-btn ${o==="ALL"?"active":""}" onclick="window.masterApp.setQueueFilter('ALL')">All Planners (${e})</button>
            <button class="tab-btn ${o==="PENDING"?"active":""}" onclick="window.masterApp.setQueueFilter('PENDING')">⏳ Pending Scrutiny (${t})</button>
            <button class="tab-btn ${o==="REJECTED"?"active":""}" onclick="window.masterApp.setQueueFilter('REJECTED')">⚠️ Re-upload Needed (${i})</button>
            <button class="tab-btn ${o==="VERIFIED"?"active":""}" onclick="window.masterApp.setQueueFilter('VERIFIED')">✓ Authorized (${a})</button>
          </div>

          <input type="text" class="table-search-input" placeholder="Search planner name, email, location..." value="${this.searchQuery}" oninput="window.masterApp.handleSearch(this.value)">
        </div>
      </div>

      <!-- Planners Submission Table / List -->
      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Planner / Business Entity</th>
                <th>Category / Type</th>
                <th>Documents Submitted</th>
                <th>Scrutiny Progress</th>
                <th>Package Planning Access</th>
                <th>AI Match Score</th>
                <th>Submitted Date</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${l.map(r=>{const d=r.documents||[],c=d.filter(p=>p.status==="VERIFIED").length,u=d.filter(p=>p.status==="REJECTED").length,g=d.length>0?Math.round(c/d.length*100):0,m=r.status==="VERIFIED"&&c===d.length,f=u>0;return`
                  <tr style="cursor: pointer;" onclick="window.masterApp.openPlannerScrutinyDossier('${r.id}')">
                    <td>
                      <div class="user-cell-wrap">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="${r.applicantName}" class="user-cell-avatar" style="border: 1.5px solid var(--beacon-cyan);">
                        <div>
                          <div class="user-cell-name">${r.applicantName}</div>
                          <div class="user-cell-email">${r.location||"India"} • ${r.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="status-pill active" style="font-size: 11px;">
                        ${r.plannerType==="COMPANY"?"🏢 Travel Company":"👤 Freelance Planner"}
                      </span>
                    </td>
                    <td>
                      <strong>${d.length} Documents</strong><br>
                      <span style="font-size: 11px; color: var(--text-muted);">${c} Approved, ${u} Rejected, ${d.length-c-u} Pending</span>
                    </td>
                    <td style="min-width: 170px;">
                      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; font-weight: 700; color: #FFF;">
                        <span>${c} of ${d.length} Approved</span>
                        <span style="color: ${m?"var(--beacon-green)":f?"var(--beacon-red)":"var(--beacon-cyan)"};">${g}%</span>
                      </div>
                      <div class="scrutiny-progress-bar-wrap">
                        <div class="scrutiny-progress-fill" style="width: ${g}%; background: ${m?"var(--beacon-green)":f?"var(--beacon-red)":"var(--beacon-cyan)"};"></div>
                      </div>
                    </td>
                    <td>
                      ${m?`
                        <span class="status-pill verified" style="font-size: 11px;">
                          🔓 Package Planning Active
                        </span>
                      `:`
                        <span class="status-pill ${f?"suspended":"pending"}" style="font-size: 11px;">
                          🔒 Package Planning Locked
                        </span>
                      `}
                    </td>
                    <td>
                      <span style="font-family: var(--font-mono); font-size: 12px; color: var(--beacon-cyan); font-weight: 700;">
                        🤖 ${r.overallMatchScore||98.4}%
                      </span>
                    </td>
                    <td>${r.submittedDate}</td>
                    <td style="text-align: right;" onclick="event.stopPropagation();">
                      <button class="btn-primary-master" style="padding: 8px 14px; font-size: 12px; width: auto;" onclick="window.masterApp.openPlannerScrutinyDossier('${r.id}')">
                        <span>Inspect Scrutiny Dossier</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getPlannerScrutinyDossierHtml(e){const t=this.data.verifications.find(s=>s.id===e);if(!t)return this.activeScrutinyPlannerId=null,this.getPlannersVerificationQueueHtml();const a=t.documents||[],i=a.filter(s=>s.status==="VERIFIED").length,n=a.filter(s=>s.status==="REJECTED"),o=a.length>0&&i===a.length;return`
      <!-- Breadcrumb & Header Navigation -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <button class="btn-secondary-master" onclick="window.masterApp.closePlannerScrutinyDossier()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          <span>← Back to Planners Submission Queue</span>
        </button>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="btn-secondary-master" onclick="window.masterApp.openExportModal('Dossier_${t.applicantName}')">
            <span>Download Scrutiny Dossier PDF</span>
          </button>
        </div>
      </div>

      <!-- Planner Profile Banner Card -->
      <div class="applicant-kyc-card" style="margin-bottom: 24px;">
        <div class="applicant-head-row">
          <div class="applicant-profile-meta">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="${t.applicantName}" class="applicant-avatar">
            <div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="applicant-name-title">${t.applicantName}</div>
                <span class="status-pill ${o?"verified":n.length>0?"suspended":"pending"}">
                  ${o?"✓ ALL DOCUMENTS VERIFIED":n.length>0?"⚠️ ACTION REQUIRED: RE-UPLOAD DISPATCHED":"⏳ SCRUTINY IN PROGRESS"}
                </span>
              </div>
              <div class="applicant-contact-chips">
                <span>${t.category}</span>
                <span>•</span>
                <span>Type: <strong>${t.plannerType==="COMPANY"?"Travel Company":"Freelance Planner"}</strong></span>
                <span>•</span>
                <span style="color: var(--beacon-cyan);">${t.location}</span>
                <span>•</span>
                <span>${t.email}</span>
                <span>•</span>
                <span>${t.phone}</span>
              </div>
            </div>
          </div>

          <div>
            ${o?`
              <div style="background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 10px 16px; text-align: right;">
                <div style="font-size: 11px; color: var(--beacon-green); font-weight: 700; text-transform: uppercase;">Platform Authorization Status</div>
                <div style="font-size: 13px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">🔓 Package Planning Enabled</div>
              </div>
            `:`
              <div style="background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); border-radius: 12px; padding: 10px 16px; text-align: right;">
                <div style="font-size: 11px; color: var(--beacon-amber); font-weight: 700; text-transform: uppercase;">Package Creation Access</div>
                <div style="font-size: 13px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">🔒 Locked (${i}/${a.length} Verified)</div>
              </div>
            `}
          </div>
        </div>

        <div style="margin: 16px 0 0; padding: 12px 16px; background: var(--bg-surface); border-radius: 10px; font-size: 12.5px; color: var(--text-secondary); border-left: 3px solid var(--beacon-cyan);">
          <strong>Application Dossier Telemetry:</strong> ${t.notes}
        </div>
      </div>

      <!-- STEP 5: BOLD REJECTION POP-OUT NOTIFICATION PREVIEW (DISPATCHED TO PLANNER) -->
      ${n.length>0?`
        <div class="planner-rejection-popout-box">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="popout-header-tag">🚨 Dispatched to Planner</span>
              <h4 style="font-family: var(--font-display); font-size: 15px; font-weight: 800; color: #FFFFFF;">
                Planner Portal Alert: Action Required — ${n.length} Document(s) Rejected
              </h4>
            </div>
            <button class="btn-secondary-master" style="padding: 5px 12px; font-size: 11px; border-color: rgba(255,255,255,0.2);" onclick="window.masterApp.simulatePlannerReupload('${t.id}', '${n[0].id}')">
              🔄 Simulate Planner Re-uploading Corrected File
            </button>
          </div>

          <div style="font-size: 13px; color: #FCA5A5; line-height: 1.5; margin-bottom: 12px;">
            The planner has received this bold alert banner inside their portal. Package creation is blocked until they submit valid replacement documents for scrutiny.
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${n.map(s=>`
              <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(239,68,68,0.3); border-radius: 10px; padding: 12px 16px; font-size: 12px;">
                <div style="font-weight: 700; color: #FFFFFF;">📄 Rejected: ${s.title} (${s.fileName})</div>
                <div style="color: #F87171; margin-top: 4px;"><strong>Mandatory Admin Note:</strong> "${s.rejectionReason||"Please upload clear, legible copy of document with valid registration date."}"</div>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      <!-- STEP 2 & 3: DOCUMENT-BY-DOCUMENT SCRUTINY & PDF VIEWER LIST -->
      <div class="table-card-master" style="padding: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
          <div>
            <h3 style="font-family: var(--font-display); font-size: 17px; font-weight: 800; color: #FFFFFF;">Submitted Documents & Credentials (${a.length})</h3>
            <p style="font-size: 12px; color: var(--text-muted);">Inspect individual PDF copies, examine extracted OCR details, and approve or reject each document with mandatory notes.</p>
          </div>
          <span class="status-pill active" style="font-family: var(--font-mono);">
            Progress: ${i} / ${a.length} Approved (${Math.round(i/a.length*100)}%)
          </span>
        </div>

        <!-- Document Scrutiny Rows -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${a.map(s=>{const l=s.status==="VERIFIED",r=s.status==="REJECTED";return`
              <div class="doc-scrutiny-row ${l?"approved":r?"rejected":"pending"}">
                <!-- Left Info & Thumbnail Preview CTA -->
                <div class="doc-info-left">
                  <div class="doc-icon-badge-box">
                    ${s.previewType==="gst"?"🏢":s.previewType==="passport"||s.previewType==="aadhaar"?"🪪":s.previewType==="selfie"?"📸":s.previewType==="insurance"?"🛡️":"📜"}
                  </div>

                  <div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <h4 style="font-size: 14px; font-weight: 800; color: #FFFFFF;">${s.title}</h4>
                      <span class="status-pill ${l?"verified":r?"suspended":"pending"}" style="font-size: 10px;">
                        ${l?"✓ APPROVED":r?"✕ REJECTED":"⏳ PENDING SCRUTINY"}
                      </span>
                    </div>

                    <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                      <span>📄 <strong>${s.fileName}</strong></span>
                      <span>•</span>
                      <span>Size: ${s.fileSize}</span>
                      <span>•</span>
                      <span>Serial #: <strong style="color: var(--beacon-cyan); font-family: var(--font-mono);">${s.docNumber||"N/A"}</strong></span>
                      <span>•</span>
                      <span>AI Match: <strong style="color: var(--beacon-green);">${s.matchScore||99}%</strong></span>
                    </div>

                    ${r&&s.rejectionReason?`
                      <div style="margin-top: 8px; font-size: 11.5px; color: #F87171; background: rgba(239,68,68,0.1); padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(239,68,68,0.25);">
                        <strong>Rejection Reason Dispatched to Planner:</strong> "${s.rejectionReason}"
                      </div>
                    `:""}
                  </div>
                </div>

                <!-- Right Actions: View PDF Copy & Single Doc Decision -->
                <div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0;">
                  <!-- View PDF Copy Lightbox -->
                  <button type="button" class="btn-secondary-master" style="padding: 9px 16px; font-size: 12px; color: var(--beacon-cyan); border-color: rgba(0, 203, 212, 0.35);" onclick="window.masterApp.openDocumentLightbox('${s.id}', '${t.id}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span>View PDF Copy</span>
                  </button>

                  <!-- Approve Document Button -->
                  <button type="button" class="btn-secondary-master" style="padding: 9px 14px; font-size: 12px; color: var(--beacon-green); border-color: rgba(16,185,129,0.4); ${l?"background: rgba(16,185,129,0.15); font-weight: 800;":""}" onclick="window.masterApp.approveSingleDoc('${t.id}', '${s.id}')">
                    ✓ Approve
                  </button>

                  <!-- Reject Document Button (With Mandatory Note Modal) -->
                  <button type="button" class="btn-secondary-master" style="padding: 9px 14px; font-size: 12px; color: var(--beacon-red); border-color: rgba(239,68,68,0.4); ${r?"background: rgba(239,68,68,0.15); font-weight: 800;":""}" onclick="window.masterApp.openRejectDocumentModal('${t.id}', '${s.id}')">
                    ✕ Reject
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>

        <!-- STEP 4: FINAL PLATFORM AUTHORIZATION & PACKAGE PLANNING ENABLEMENT -->
        <div class="final-verification-bar-card ${o?"ready":""}">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">${o?"🎉":"🔒"}</span>
              <h4 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: #FFFFFF;">
                Final Platform Authorization
              </h4>
            </div>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 4px;">
              ${o?"All documents have been scrutinized and verified. You can now grant full platform authorization and enable package planning for this organizer.":`Cannot authorize planner yet. ${a.length-i} document(s) remaining for individual verification.`}
            </p>
          </div>

          <div>
            ${o?`
              <button type="button" class="btn-final-verify-enabled" onclick="window.masterApp.finalApprovePlanner('${t.id}')">
                <span>🏆 Final Verify & Enable Package Planning</span>
              </button>
            `:`
              <button type="button" class="btn-final-verify-disabled" title="All documents must be approved first" disabled>
                <span>🔒 Complete Document Scrutiny First</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `}getTripsViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Trip Command Center & Itinerary Intelligence</h1>
          <p>Inspect every itinerary generated on Beacon, including day schedules, linked bookings, and planner chat logs.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Trip ID & Title</th>
                <th>Traveller</th>
                <th>Planner</th>
                <th>Destination</th>
                <th>Dates</th>
                <th>Budget / Actual</th>
                <th>Take (14%)</th>
                <th>Status</th>
                <th style="text-align: right;">Inspect</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.trips.map(e=>`
                <tr>
                  <td>
                    <strong>${e.title}</strong><br>
                    <span style="font-size:11px; color:var(--beacon-cyan); font-family:var(--font-mono);">${e.id}</span>
                  </td>
                  <td>${e.traveller.name}</td>
                  <td>${e.planner.name}</td>
                  <td>${e.destination}</td>
                  <td>${e.startDate} · ${e.durationDays} Days</td>
                  <td><strong>${e.actualCost||e.budget}</strong></td>
                  <td style="color:var(--beacon-green); font-weight:700;">${e.platformCommission||"₹0"}</td>
                  <td><span class="status-pill ${e.status.toLowerCase()}">${e.status}</span></td>
                  <td style="text-align: right;">
                    <button class="btn-secondary-master" style="padding:6px 12px; font-size:11px;" onclick="window.masterApp.openTripInspector('${e.id}')">
                      View Itinerary
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getDestinationsViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Curated Destination Database</h1>
          <p>10+ global and Indian hubs with coordinates, weather telemetry, active planners, and seasonal tips.</p>
        </div>
        <button class="btn-primary-master" style="width:auto;" onclick="alert('Destination Creator Modal active')">+ Add New Destination</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
        ${this.data.destinations.map(e=>`
          <div class="table-card-master" style="margin-bottom:0; overflow:hidden;">
            <div style="height: 160px; background: url('${e.heroImage}') center/cover no-repeat; position: relative;">
              <span class="status-pill published" style="position: absolute; top: 12px; right: 12px;">${e.status}</span>
              <div style="position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); padding: 4px 10px; border-radius: 8px; font-size: 11px; color: #FFF;">
                ${e.weather}
              </div>
            </div>
            <div style="padding: 20px;">
              <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">${e.name}</h3>
              <p style="font-size:12px; color:var(--text-muted); margin: 6px 0 14px; line-height: 1.4;">${e.description}</p>
              
              <div style="display:flex; justify-content:space-between; font-size:12px; border-top:1px solid var(--border-subtle); padding-top:12px; margin-bottom:14px;">
                <span>Active Trips: <strong>${e.activeTrips}</strong></span>
                <span>Planners: <strong>${e.activePlanners}</strong></span>
              </div>

              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                ${e.tags.map(t=>`<span class="status-pill active" style="font-size:10px;">${t}</span>`).join("")}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `}getExperiencesViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Experiences & Activities Inventory</h1>
          <p>Curated adventure, luxury, culinary, and cultural activities linked to verified guides and vendors.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Experience Title</th>
                <th>Category</th>
                <th>Destination</th>
                <th>Provider Guild</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.experiences.map(e=>`
                <tr>
                  <td><strong>${e.title}</strong></td>
                  <td><span class="status-pill active">${e.category}</span></td>
                  <td>${e.destination}</td>
                  <td>${e.provider}</td>
                  <td style="color:var(--beacon-cyan); font-weight:700;">${e.price}</td>
                  <td>${e.duration}</td>
                  <td>⭐ <strong>${e.rating}</strong> (${e.reviewsCount})</td>
                  <td><span class="status-pill active">${e.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getBookingsViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Master Bookings Operations</h1>
          <p>Central booking registry tracking Razorpay & Stripe gateway transactions, escrow locks, and itinerary links.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Traveller</th>
                <th>Planner</th>
                <th>Service / Package</th>
                <th>Destination</th>
                <th>Amount</th>
                <th>Gateway Txn</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.bookings.map(e=>`
                <tr>
                  <td><strong style="font-family:var(--font-mono); color:var(--beacon-cyan);">${e.id}</strong></td>
                  <td>${e.traveller}</td>
                  <td>${e.planner}</td>
                  <td>${e.service}</td>
                  <td>${e.destination}</td>
                  <td style="font-weight:700; color:#FFF;">${e.amount}</td>
                  <td>
                    <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">${e.gateway}: ${e.gatewayTxnId}</span>
                  </td>
                  <td><span class="status-pill ${e.bookingStatus.toLowerCase()}">${e.bookingStatus}</span></td>
                  <td style="text-align: right;">
                    <button class="btn-action-icon" title="View Transaction" onclick="alert('Transaction Voucher #BK-${e.id} Verified on ${e.gateway}')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getPaymentsViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Financial Control & Escrow Management</h1>
          <p>Supervise Gross Booking Volume (₹48.6L), platform take-rate commissions, refund resolutions, and weekly planner payouts.</p>
        </div>
        <button class="btn-primary-master" style="width:auto;" onclick="alert('Batch Payout Generator triggered for Monday disbursement.')">
          Execute Weekly Payout Batch (₹41.8L)
        </button>
      </div>

      <div class="kpi-grid-master">
        <div class="kpi-card-master">
          <span class="kpi-label">Escrow In-Trust</span>
          <div class="kpi-value">₹48,60,000</div>
          <span style="font-size:11px; color:var(--beacon-green); margin-top:8px;">Secured in HDFC Escrow Vault</span>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Platform Take Rate (14%)</span>
          <div class="kpi-value">₹6,80,400</div>
          <span style="font-size:11px; color:var(--beacon-cyan); margin-top:8px;">Net platform gross margin</span>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Planner Payouts Due</span>
          <div class="kpi-value">₹41,79,600</div>
          <span style="font-size:11px; color:var(--text-muted); margin-top:8px;">Scheduled for Mon, 10:00 AM</span>
        </div>
      </div>

      <div class="table-card-master">
        <div style="padding: 20px; border-bottom: 1px solid var(--border-subtle);">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF;">Settlement & Refund Ledger</h3>
        </div>
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Txn ID</th>
                <th>Booking Ref</th>
                <th>Payee / Traveller</th>
                <th>Payment Method</th>
                <th>Gross</th>
                <th>Commission</th>
                <th>Net Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.bookings.map(e=>`
                <tr>
                  <td><span style="font-family:var(--font-mono); font-size:11.5px; color:var(--beacon-cyan);">${e.gatewayTxnId}</span></td>
                  <td>${e.id}</td>
                  <td>${e.traveller}</td>
                  <td>${e.paymentMethod}</td>
                  <td><strong>${e.amount}</strong></td>
                  <td style="color:var(--beacon-green);">14% (₹${Math.round(e.rawAmount*.14).toLocaleString()})</td>
                  <td style="color:var(--beacon-cyan);">₹${Math.round(e.rawAmount*.86).toLocaleString()}</td>
                  <td><span class="status-pill ${e.paymentStatus.toLowerCase()}">${e.paymentStatus}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getSupportViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Support Center & Emergency SOS Hotlines</h1>
          <p>Live resolution queue for traveller in-transit queries, guide coordinate dispatches, and emergency alerts.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User / Type</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Subject & Notes</th>
                <th>Assigned Admin</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.supportTickets.map(e=>`
                <tr>
                  <td><strong style="font-family:var(--font-mono); color:var(--beacon-cyan);">${e.id}</strong></td>
                  <td>${e.userName} (${e.userType})</td>
                  <td>${e.category}</td>
                  <td>
                    <span class="status-pill ${e.priority==="CRITICAL"?"suspended":e.priority==="HIGH"?"pending":"active"}">
                      ${e.priority}
                    </span>
                  </td>
                  <td>
                    <strong>${e.subject}</strong><br>
                    <span style="font-size:11.5px; color:var(--text-muted);">${e.notes}</span>
                  </td>
                  <td>${e.assignedAdmin}</td>
                  <td><span class="status-pill ${e.status.toLowerCase()}">${e.status}</span></td>
                  <td style="text-align: right;">
                    <button class="btn-secondary-master" style="padding:6px 12px; font-size:11px;" onclick="alert('Ticket #${e.id} dispatched to SMS/WhatsApp hotline')">
                      Respond
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getModerationViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Trust, Reviews & Content Moderation</h1>
          <p>AI-flagged spam reviews, traveller vs planner disputes, and abusive communication enforcement.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Type</th>
                <th>Reporter</th>
                <th>Target Entity</th>
                <th>Reason & Evidence</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.moderationItems.map(e=>`
                <tr>
                  <td><strong style="font-family:var(--font-mono); color:var(--beacon-cyan);">${e.id}</strong></td>
                  <td><span class="status-pill active">${e.type}</span></td>
                  <td>${e.reporter}</td>
                  <td><strong>${e.target}</strong></td>
                  <td style="max-width: 320px;">
                    <strong>${e.reason}</strong><br>
                    <span style="font-size:11.5px; color:var(--text-muted);">${e.evidence}</span>
                  </td>
                  <td><span class="status-pill pending">${e.status}</span></td>
                  <td style="text-align: right;">
                    <div class="action-btn-group" style="justify-content: flex-end;">
                      <button class="btn-secondary-master" style="padding:6px 12px; font-size:11px; color:var(--beacon-red);" onclick="alert('Content removed and warning issued to user.')">
                        Remove & Warn
                      </button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getNotificationsViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Platform Broadcasts & Travel Alerts</h1>
          <p>Compose in-app, SMS, email, and push announcements for active travellers and certified planners.</p>
        </div>
      </div>

      <div class="table-card-master" style="padding: 24px; max-width: 800px; margin-bottom: 30px;">
        <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF; margin-bottom:16px;">Compose Platform Broadcast</h3>
        <form onsubmit="event.preventDefault(); window.masterApp.sendBroadcast();">
          <div class="form-group">
            <label>Announcement Headline</label>
            <input type="text" id="notif-title" class="form-control" placeholder="e.g. Western Ghats Monsoon Advisory" required>
          </div>

          <div class="form-group">
            <label>Message Content</label>
            <textarea id="notif-body" class="form-control" rows="3" placeholder="Provide clear operational details and safety tips..." required style="resize:none;"></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
            <div class="form-group">
              <label>Target Audience</label>
              <select class="form-control" id="notif-target">
                <option>All Active Travellers (12,482)</option>
                <option>All Certified Planners (1,284)</option>
                <option>North India Travellers (Kashmir / Manali)</option>
                <option>All Administrators (12)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Delivery Channels</label>
              <select class="form-control" id="notif-channel">
                <option>In-App Push + Email Notification</option>
                <option>In-App Only</option>
                <option>Emergency SMS + Push</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-primary-master" style="width: auto; padding: 12px 24px;">
            <span>Dispatch Broadcast Announcement</span>
          </button>
        </form>
      </div>
    `}getAnalyticsViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Geographic Intelligence & Platform Analytics</h1>
          <p>Interactive world travel topology, active destination hubs, traveller acquisition funnels, and revenue metrics.</p>
        </div>
      </div>

      <!-- Geographic World Map Card -->
      <div class="table-card-master" style="padding: 24px; margin-bottom: 30px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <div>
            <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Interactive Global Travel Topology Map</h3>
            <p style="font-size:12px; color:var(--text-muted);">Click on any pinned travel hub to inspect regional planners and active itineraries.</p>
          </div>
        </div>
        <div id="chart-geo-world-map"></div>
      </div>

      <div class="table-card-master" style="padding: 24px;">
        <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF; margin-bottom: 16px;">Gross Booking Trajectory (2026)</h3>
        <div id="chart-analytics-revenue" style="height: 220px; width: 100%;"></div>
      </div>
    `}getAuditLogsViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Immutable Administrative Audit Ledger</h1>
          <p>Tamper-proof event log tracking administrative suspensions, KYC approvals, commission adjustments, and refunds.</p>
        </div>
        <button class="btn-secondary-master" onclick="window.masterApp.openExportModal('Audit Ledger')">Download Encrypted Log</button>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Administrator</th>
                <th>Action</th>
                <th>Target Entity</th>
                <th>Diff / Details</th>
                <th>Timestamp</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.auditLogs.map(e=>`
                <tr>
                  <td><span style="font-family:var(--font-mono); font-size:11.5px; color:var(--beacon-cyan);">${e.id}</span></td>
                  <td>${e.admin}</td>
                  <td><strong style="font-family:var(--font-mono); font-size:12px;">${e.action}</strong></td>
                  <td>${e.entity}</td>
                  <td style="font-size:12px;">
                    <div style="color:var(--text-subtle);">Prev: ${e.previousValue}</div>
                    <div style="color:var(--beacon-green);">New: ${e.newValue}</div>
                  </td>
                  <td style="font-family:var(--font-mono); font-size:11.5px;">${e.timestamp}</td>
                  <td>
                    <span class="status-pill ${e.severity==="CRITICAL"?"suspended":e.severity==="HIGH"?"pending":"active"}">
                      ${e.severity}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getSystemHealthViewHtml(){const e=this.data.systemHealth;return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>System Health & Infrastructure Telemetry</h1>
          <p>Real-time microservices latency, PostgreSQL clusters, Redis caches, and Razorpay/Stripe webhooks.</p>
        </div>
      </div>

      <div class="kpi-grid-master">
        <div class="kpi-card-master">
          <span class="kpi-label">Uptime (30 Days)</span>
          <div class="kpi-value" style="color: var(--beacon-green);">${e.uptime}</div>
          <span style="font-size:11px; color:var(--text-muted); margin-top:8px;">Zero critical downtime incidents</span>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Average API Latency</span>
          <div class="kpi-value" style="color: var(--beacon-cyan);">${e.avgLatency}</div>
          <canvas id="canvas-latency-sparkline" width="180" height="30" style="margin-top:8px;"></canvas>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Request Throughput</span>
          <div class="kpi-value">${e.requestsPerMin}</div>
          <span style="font-size:11px; color:var(--text-muted); margin-top:8px;">Error Rate: ${e.errorRate}</span>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Active WebSockets</span>
          <div class="kpi-value">${e.activeWebSocketConnections}</div>
          <span style="font-size:11px; color:var(--beacon-green); margin-top:8px;">Live sync connections</span>
        </div>
      </div>

      <div class="table-card-master">
        <div style="padding:20px; border-bottom:1px solid var(--border-subtle);">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF;">Microservice Status Monitor</h3>
        </div>
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Status</th>
                <th>Latency</th>
                <th>Uptime</th>
                <th>Load</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${e.services.map(t=>`
                <tr>
                  <td><strong>${t.name}</strong></td>
                  <td><span class="status-pill ${t.status.toLowerCase()}">${t.status}</span></td>
                  <td style="font-family:var(--font-mono);">${t.latency}</td>
                  <td>${t.uptime}</td>
                  <td>${t.load}</td>
                  <td style="font-size:12px; color:var(--text-muted);">${t.note||"Normal operation"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getAdminsViewHtml(){return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Admin Management & Granular RBAC Matrix</h1>
          <p>Configure permission matrices across Super Admin, Platform Admin, Operations, Finance, and Support roles.</p>
        </div>
      </div>

      <div class="table-card-master" style="padding: 24px;">
        <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF; margin-bottom: 16px;">Role Permission Matrix</h3>
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Administrative Role</th>
                <th>Users</th>
                <th>Trips</th>
                <th>Bookings</th>
                <th>Payments</th>
                <th>Moderation</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(x).map(([e,t])=>{var a,i,n,o,s,l,r,d,c,u,g,m;return`
                <tr>
                  <td>
                    <strong>${t.title}</strong><br>
                    <span style="font-size:11px; color:var(--text-muted);">${t.description}</span>
                  </td>
                  <td><span class="status-pill ${(a=t.permissions.users)!=null&&a.edit?"active":"suspended"}">${(i=t.permissions.users)!=null&&i.edit?"Full":"Read"}</span></td>
                  <td><span class="status-pill ${(n=t.permissions.trips)!=null&&n.edit?"active":"suspended"}">${(o=t.permissions.trips)!=null&&o.edit?"Full":"Read"}</span></td>
                  <td><span class="status-pill ${(s=t.permissions.bookings)!=null&&s.approve?"active":"suspended"}">${(l=t.permissions.bookings)!=null&&l.approve?"Full":"Read"}</span></td>
                  <td><span class="status-pill ${(r=t.permissions.payments)!=null&&r.edit?"active":"suspended"}">${(d=t.permissions.payments)!=null&&d.edit?"Full":"None"}</span></td>
                  <td><span class="status-pill ${(c=t.permissions.moderation)!=null&&c.edit?"active":"suspended"}">${(u=t.permissions.moderation)!=null&&u.edit?"Full":"Read"}</span></td>
                  <td><span class="status-pill ${(g=t.permissions.settings)!=null&&g.edit?"active":"suspended"}">${(m=t.permissions.settings)!=null&&m.edit?"Full":"None"}</span></td>
                </tr>
              `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}getSettingsViewHtml(){const e=this.data.settings;return`
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Platform Governance & Commission Settings</h1>
          <p>Configure take-rates, escrow payout rules, MFA security requirements, and maintenance mode.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div class="table-card-master" style="padding: 24px;">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF; margin-bottom: 16px;">Commission Take-Rate Policies</h3>
          <div class="form-group">
            <label>Standard Take-Rate Percentage (%)</label>
            <input type="number" class="form-control" value="${e.commission.standardTakeRate}">
          </div>
          <div class="form-group">
            <label>Gold Tier Certified Planner Take-Rate (%)</label>
            <input type="number" class="form-control" value="${e.commission.goldPlannerTakeRate}">
          </div>
          <div class="form-group">
            <label>Minimum Payout Settlement (₹)</label>
            <input type="number" class="form-control" value="${e.commission.minimumPayoutThreshold}">
          </div>
          <button class="btn-primary-master" style="margin-top:16px;" onclick="alert('Commission rates updated and logged in Immutable Audit Ledger.')">Save Commission Rates</button>
        </div>

        <div class="table-card-master" style="padding: 24px;">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF; margin-bottom: 16px;">Security & Access Policies</h3>
          <div class="form-group">
            <label>Session Expiry Timeout (Minutes)</label>
            <input type="number" class="form-control" value="${e.security.sessionTimeoutMinutes}">
          </div>
          <div class="form-group">
            <label>Max Failed Password Attempts Before Lockout</label>
            <input type="number" class="form-control" value="${e.security.maxFailedLoginAttempts}">
          </div>
          <div class="form-group">
            <label>Lockout Duration (Minutes)</label>
            <input type="number" class="form-control" value="${e.security.lockoutDurationMinutes}">
          </div>
          <button class="btn-primary-master" style="margin-top:16px;" onclick="alert('Security policy updated.')">Update Security Guard</button>
        </div>
      </div>
    `}openUserDossier(e){const t=this.data.users.find(a=>a.id===e);t&&this.openDrawer(`
      <div class="drawer-header">
        <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">Traveller Dossier: ${t.name}</h3>
        <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()">✕</button>
      </div>
      <div class="drawer-body">
        <div style="display:flex; align-items:center; gap:16px; background:var(--bg-card); padding:16px; border-radius:14px;">
          <img src="${t.avatar}" alt="${t.name}" style="width:64px; height:64px; border-radius:12px; object-fit:cover;">
          <div>
            <div style="font-size:16px; font-weight:800; color:#FFF;">${t.name}</div>
            <div style="font-size:12px; color:var(--text-muted);">${t.email} · ${t.phone}</div>
            <div style="margin-top:6px;"><span class="status-pill active">${t.status}</span></div>
          </div>
        </div>

        <div>
          <h4 style="font-size:12px; font-weight:700; color:var(--text-subtle); text-transform:uppercase; margin-bottom:8px;">Travel Biography</h4>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">${t.bio||"Active explorer on Beacon."}</p>
        </div>

        <div>
          <h4 style="font-size:12px; font-weight:700; color:var(--text-subtle); text-transform:uppercase; margin-bottom:8px;">Favourite Destinations</h4>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${(t.favouriteDestinations||["Goa","Kashmir","Dubai"]).map(a=>`<span class="status-pill active">${a}</span>`).join("")}
          </div>
        </div>
      </div>
    `)}openPlannerDossier(e){const t=this.data.users.find(a=>a.id===e);t&&this.openDrawer(`
      <div class="drawer-header">
        <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">Planner Dossier: ${t.name}</h3>
        <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()">✕</button>
      </div>
      <div class="drawer-body">
        <div style="display:flex; align-items:center; gap:16px; background:var(--bg-card); padding:16px; border-radius:14px;">
          <img src="${t.avatar}" alt="${t.name}" style="width:64px; height:64px; border-radius:12px; object-fit:cover;">
          <div>
            <div style="font-size:16px; font-weight:800; color:#FFF;">${t.name}</div>
            <div style="font-size:12px; color:var(--beacon-cyan);">${t.plannerBadge||"Planner"} · Rating ⭐ ${t.rating||4.9}</div>
            <div style="margin-top:6px;"><span class="status-pill verified">KYC Verified</span></div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
          <div style="background:var(--bg-card); padding:12px; border-radius:10px;">
            <div style="font-size:11px; color:var(--text-subtle);">Completed Tours</div>
            <div style="font-size:16px; font-weight:700; color:#FFF;">${t.tripsCount||0}</div>
          </div>
          <div style="background:var(--bg-card); padding:12px; border-radius:10px;">
            <div style="font-size:11px; color:var(--text-subtle);">Gross Earnings</div>
            <div style="font-size:16px; font-weight:700; color:var(--beacon-green);">${t.totalEarned||"₹0"}</div>
          </div>
        </div>

        <div>
          <h4 style="font-size:12px; font-weight:700; color:var(--text-subtle); text-transform:uppercase; margin-bottom:8px;">KYC Vault Documents</h4>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <div style="padding:10px; background:var(--bg-input); border-radius:8px; display:flex; justify-content:space-between; font-size:12px;">
              <span>Official Tourism Operator License</span>
              <span class="status-pill verified">✓ VERIFIED</span>
            </div>
            <div style="padding:10px; background:var(--bg-input); border-radius:8px; display:flex; justify-content:space-between; font-size:12px;">
              <span>Business GSTIN Certificate</span>
              <span class="status-pill verified">✓ VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    `)}openTripInspector(e){const t=this.data.trips.find(a=>a.id===e);t&&this.openDrawer(`
      <div class="drawer-header">
        <div>
          <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">${t.title}</h3>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--beacon-cyan);">${t.id} · ${t.destination}</span>
        </div>
        <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()">✕</button>
      </div>
      <div class="drawer-body">
        <div style="display:flex; justify-content:space-between; background:var(--bg-card); padding:14px; border-radius:12px; font-size:13px;">
          <div>
            <div style="color:var(--text-subtle); font-size:11px;">Traveller</div>
            <strong>${t.traveller.name}</strong>
          </div>
          <div>
            <div style="color:var(--text-subtle); font-size:11px;">Planner</div>
            <strong>${t.planner.name}</strong>
          </div>
          <div>
            <div style="color:var(--text-subtle); font-size:11px;">Total Escrow</div>
            <strong style="color:var(--beacon-green);">${t.actualCost||t.budget}</strong>
          </div>
        </div>

        <h4 style="font-size:13px; font-weight:700; color:#FFF; margin-top:10px;">Day-by-Day Itinerary Schedule</h4>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${(t.itinerary||[]).map(a=>`
            <div style="background:var(--bg-card); padding:14px; border-radius:12px; border:1px solid var(--border-card);">
              <div style="color:var(--beacon-cyan); font-weight:700; font-size:12px;">Day ${a.day}: ${a.title}</div>
              <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${a.activities}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `)}openDangerousActionModal(e,t,a){const i=document.getElementById("master-modal-root");if(!i)return;i.innerHTML=`
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="danger-modal-card">
          <div class="danger-modal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h3 style="font-family:var(--font-display); font-size:20px; font-weight:800; color:#FFF;">Confirm Sensitive Action</h3>
          <p style="font-size:13px; color:var(--text-muted); margin: 8px 0 16px;">
            You are about to suspend <strong>${a}</strong> (${t}). This will immediately revoke their platform credentials and lock associated itineraries.
          </p>

          <label style="font-size:11px; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
            Type <strong style="color:var(--beacon-red); font-family:var(--font-mono);">${e.replace("_"," ")}</strong> to confirm:
          </label>
          <input type="text" id="danger-typed-confirm-input" class="danger-typed-input" placeholder="Type confirmation here...">

          <div style="display:flex; justify-content:flex-end; gap:12px;">
            <button class="btn-secondary-master" onclick="window.masterApp.closeAllModals()">Cancel</button>
            <button class="btn-primary-master" id="btn-confirm-danger-action" style="background:var(--beacon-red); color:#FFF; width:auto;" disabled>
              Execute Suspension
            </button>
          </div>
        </div>
      </div>
    `;const n=document.getElementById("danger-typed-confirm-input"),o=document.getElementById("btn-confirm-danger-action"),s=e.replace("_"," ");n.addEventListener("input",l=>{o.disabled=l.target.value.trim().toUpperCase()!==s}),o.addEventListener("click",()=>{const l=this.data.users.find(r=>r.id===t);l&&(l.status="SUSPENDED"),this.data.auditLogs.unshift({id:`LOG-${Date.now().toString().slice(-4)}`,admin:"Vikram Malhotra (Super Admin)",adminId:"ADM-001",action:e,entity:`${a} (#${t})`,previousValue:"Status: ACTIVE",newValue:"Status: SUSPENDED",timestamp:new Date().toLocaleString(),ip:"103.246.40.112",device:"MacBook Pro / Chrome 128",severity:"HIGH"}),this.closeAllModals(),this.showToast(`Suspension executed for ${a}. Action logged in Immutable Audit Ledger.`,"danger"),this.render()})}openCommandPalette(){const e=document.getElementById("master-modal-root");if(!e)return;e.innerHTML=`
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="command-palette-card">
          <div class="command-search-head">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="command-search-input" placeholder="Search users, trips, bookings, destinations..." autofocus>
            <kbd style="font-family:var(--font-mono); font-size:10px; color:var(--text-muted);">ESC to close</kbd>
          </div>
          <div class="command-results-list" id="command-results-container">
            <div class="command-result-group-title">Navigation Shortcuts</div>
            <div class="command-result-item" onclick="window.masterApp.navigateTo('dashboard'); window.masterApp.closeAllModals();">
              <span>📊 Go to Dashboard</span>
              <kbd>G D</kbd>
            </div>
            <div class="command-result-item" onclick="window.masterApp.navigateTo('planners'); window.masterApp.closeAllModals();">
              <span>🎖️ Manage Trip Planners</span>
              <kbd>G P</kbd>
            </div>
            <div class="command-result-item" onclick="window.masterApp.navigateTo('trips'); window.masterApp.closeAllModals();">
              <span>✈️ All Active Trips</span>
              <kbd>G T</kbd>
            </div>
            <div class="command-result-item" onclick="window.masterApp.navigateTo('verifications'); window.masterApp.closeAllModals();">
              <span>📄 KYC Verification Vault</span>
              <kbd>G V</kbd>
            </div>
          </div>
        </div>
      </div>
    `,document.getElementById("command-search-input").addEventListener("input",a=>{this.filterCommandResults(a.target.value)})}filterCommandResults(e){const t=document.getElementById("command-results-container");if(!t)return;if(!e){this.openCommandPalette();return}const a=e.toLowerCase(),i=this.data.users.filter(s=>s.name.toLowerCase().includes(a)||s.email.toLowerCase().includes(a)),n=this.data.trips.filter(s=>s.title.toLowerCase().includes(a)||s.destination.toLowerCase().includes(a)),o=this.data.destinations.filter(s=>s.name.toLowerCase().includes(a));t.innerHTML=`
      ${i.length?`
        <div class="command-result-group-title">Users & Planners (${i.length})</div>
        ${i.map(s=>`
          <div class="command-result-item" onclick="window.masterApp.openUserDossier('${s.id}'); window.masterApp.closeAllModals();">
            <span>👤 ${s.name} (${s.type})</span>
            <span style="font-size:11px; color:var(--text-muted);">${s.email}</span>
          </div>
        `).join("")}
      `:""}

      ${n.length?`
        <div class="command-result-group-title">Trips & Itineraries (${n.length})</div>
        ${n.map(s=>`
          <div class="command-result-item" onclick="window.masterApp.openTripInspector('${s.id}'); window.masterApp.closeAllModals();">
            <span>✈️ ${s.title}</span>
            <span style="font-size:11px; color:var(--beacon-cyan);">${s.id}</span>
          </div>
        `).join("")}
      `:""}

      ${o.length?`
        <div class="command-result-group-title">Destinations (${o.length})</div>
        ${o.map(s=>`
          <div class="command-result-item" onclick="window.masterApp.navigateTo('destinations'); window.masterApp.closeAllModals();">
            <span>📍 ${s.name} (${s.country})</span>
            <span style="font-size:11px; color:var(--text-muted);">${s.activeTrips} Trips</span>
          </div>
        `).join("")}
      `:""}
    `}openDrawer(e){const t=document.getElementById("master-modal-root");t&&(t.innerHTML=`
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="detail-drawer-panel">
          ${e}
        </div>
      </div>
    `)}closeAllModals(){const e=document.getElementById("master-modal-root");e&&(e.innerHTML="")}openNotificationsDrawer(){this.openDrawer(`
      <div class="drawer-header">
        <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">System Notifications & Alerts</h3>
        <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()">✕</button>
      </div>
      <div class="drawer-body">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="padding:14px; background:var(--bg-card); border-radius:12px; border-left:3px solid var(--beacon-cyan);">
            <div style="font-weight:700; color:#FFF; font-size:13px;">🔐 Admin Login Detected</div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Vikram Malhotra authenticated from Mumbai via Chrome.</div>
            <div style="font-size:10px; color:var(--text-subtle); margin-top:4px;">10 mins ago</div>
          </div>

          <div style="padding:14px; background:var(--bg-card); border-radius:12px; border-left:3px solid var(--beacon-amber);">
            <div style="font-weight:700; color:#FFF; font-size:13px;">📋 37 Planner Verifications Pending</div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Maharashtra and Kashmir planner documents awaiting review.</div>
            <div style="font-size:10px; color:var(--text-subtle); margin-top:4px;">1 hour ago</div>
          </div>

          <div style="padding:14px; background:var(--bg-card); border-radius:12px; border-left:3px solid var(--beacon-green);">
            <div style="font-weight:700; color:#FFF; font-size:13px;">💳 Razorpay Webhook Reconciled</div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">₹1,45,000 escrow lock confirmed for Kashmir Alpine Expedition.</div>
            <div style="font-size:10px; color:var(--text-subtle); margin-top:4px;">3 hours ago</div>
          </div>
        </div>
      </div>
    `)}openLogoutConfirmation(){const e=document.getElementById("master-modal-root");e&&(e.innerHTML=`
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="danger-modal-card" style="border-color:var(--border-card);">
          <h3 style="font-family:var(--font-display); font-size:20px; font-weight:800; color:#FFF;">Sign out of Beacon Master?</h3>
          <p style="font-size:13px; color:var(--text-muted); margin: 10px 0 20px;">
            You will need to authenticate again with 2FA to access master administrative controls.
          </p>
          <div style="display:flex; justify-content:flex-end; gap:12px;">
            <button class="btn-secondary-master" onclick="window.masterApp.closeAllModals()">Cancel</button>
            <button class="btn-primary-master" style="width:auto;" onclick="window.masterApp.executeLogout()">Sign Out</button>
          </div>
        </div>
      </div>
    `)}executeLogout(){y.destroySession(),this.closeAllModals(),this.showToast("Signed out of Beacon Master session.","info"),this.navigateTo("login")}setQueueFilter(e){this.selectedQueueFilter=e,this.render()}openPlannerScrutinyDossier(e){this.activeScrutinyPlannerId=e,this.render(),window.scrollTo({top:0,behavior:"smooth"})}closePlannerScrutinyDossier(){this.activeScrutinyPlannerId=null,this.render(),window.scrollTo({top:0,behavior:"smooth"})}openRejectDocumentModal(e,t){const a=this.data.verifications.find(l=>l.id===e);if(!a)return;const i=(a.documents||[]).find(l=>l.id===t);if(!i)return;const n=document.getElementById("master-modal-root");if(!n)return;n.innerHTML=`
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="danger-modal-card" style="border-color: var(--beacon-red); max-width: 540px;">
          <div class="danger-modal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>

          <h3 style="font-family: var(--font-display); font-size: 20px; font-weight: 800; color: #FFFFFF;">
            Reject Document & Request Re-upload
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); margin: 8px 0 14px;">
            You are rejecting <strong>${i.title}</strong> (${i.fileName}) for <strong>${a.applicantName}</strong>. A mandatory explanation note must be provided so the planner can correct and re-upload the file.
          </p>

          <!-- Quick Suggestion Chips -->
          <div style="margin-bottom: 14px;">
            <label style="font-size: 11px; font-weight: 700; color: var(--text-subtle); text-transform: uppercase;">Quick Reason Templates:</label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              <button type="button" class="tab-btn" style="font-size: 11px; padding: 4px 10px;" onclick="document.getElementById('rejection-mandatory-note').value = 'Blurry scan or unreadable file. Please upload a high-resolution color PDF copy.'; document.getElementById('btn-submit-rejection').disabled = false;">
                📷 Blurry scan / illegible
              </button>
              <button type="button" class="tab-btn" style="font-size: 11px; padding: 4px 10px;" onclick="document.getElementById('rejection-mandatory-note').value = 'Document expired or renewal missing. Please upload your active 2026-2027 certified license.'; document.getElementById('btn-submit-rejection').disabled = false;">
                ⏳ Expired license
              </button>
              <button type="button" class="tab-btn" style="font-size: 11px; padding: 4px 10px;" onclick="document.getElementById('rejection-mandatory-note').value = 'Legal entity name mismatch against business registration records. Please verify legal name.'; document.getElementById('btn-submit-rejection').disabled = false;">
                🏢 Legal name mismatch
              </button>
              <button type="button" class="tab-btn" style="font-size: 11px; padding: 4px 10px;" onclick="document.getElementById('rejection-mandatory-note').value = 'Government stamp or digital signature seal missing. Please upload officially attested copy.'; document.getElementById('btn-submit-rejection').disabled = false;">
                🖋️ Missing official seal
              </button>
            </div>
          </div>

          <div class="form-group">
            <label style="font-size: 11px; font-weight: 700; color: #FFFFFF;">
              Mandatory Rejection Note <span style="color: var(--beacon-red);">*</span>
            </label>
            <textarea id="rejection-mandatory-note" class="form-control" rows="3" placeholder="Provide specific instructions on what needs to be fixed..." style="resize: none; font-size: 12.5px;" required></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px;">
            <button type="button" class="btn-secondary-master" onclick="window.masterApp.closeAllModals()">Cancel</button>
            <button type="button" class="btn-primary-master" id="btn-submit-rejection" style="background: var(--beacon-red); color: #FFF; width: auto; padding: 10px 20px;" disabled onclick="window.masterApp.executeRejectDocument('${a.id}', '${i.id}')">
              Disptach Rejection Alert
            </button>
          </div>
        </div>
      </div>
    `;const o=document.getElementById("rejection-mandatory-note"),s=document.getElementById("btn-submit-rejection");o.addEventListener("input",l=>{s.disabled=l.target.value.trim().length<5})}executeRejectDocument(e,t){var o;const a=(o=document.getElementById("rejection-mandatory-note"))==null?void 0:o.value.trim();if(!a)return;const i=this.data.verifications.find(s=>s.id===e);if(!i)return;const n=(i.documents||[]).find(s=>s.id===t);n&&(n.status="REJECTED",n.rejectionReason=a,n.rejectedAt=new Date().toLocaleString(),i.status="REJECTED",this.closeAllModals(),this.showToast(`🚨 Document "${n.title}" rejected. Mandatory note dispatched to planner's portal.`,"danger"),this.render())}simulatePlannerReupload(e,t){const a=this.data.verifications.find(n=>n.id===e);if(!a)return;const i=(a.documents||[]).find(n=>n.id===t);i&&(i.status="PENDING",i.fileName=i.fileName.replace(".pdf","_Clean_Renewal_v2.pdf"),delete i.rejectionReason,delete i.rejectedAt,(a.documents||[]).some(o=>o.status==="REJECTED")||(a.status="PENDING"),this.showToast(`📩 Planner has re-uploaded corrected document: "${i.fileName}"! Ready for re-scrutiny.`,"info"),this.render())}finalApprovePlanner(e){var n;const t=this.data.verifications.find(o=>o.id===e);if(!t)return;if(!(t.documents||[]).every(o=>o.status==="VERIFIED")){alert("⚠️ Cannot grant final authorization until ALL documents are individually verified.");return}t.status="VERIFIED";const i=this.data.planners.find(o=>o.id===t.applicantId||o.name===t.applicantName);i&&(i.status="ACTIVE",i.canCreatePackages=!0,i.badge="Verified Master Organizer"),this.showToast(`🎉 Planner ${t.applicantName} is fully verified! Package planning privileges enabled.`,"success"),(n=window.BeaconSync)==null||n.syncKycApproval(t.applicantId,t.applicantName,"VERIFIED"),this.render()}openDocumentLightbox(e,t){let a=null,i=null;for(const s of this.data.verifications){const l=(s.documents||[]).find(r=>r.id===e);if(l){a=l,i=s;break}}if(!a||!i)return;const n=document.getElementById("master-modal-root");if(!n)return;const o=s=>{var l,r;return s.previewType==="gst"?`
          <div class="doc-mockup-paper" style="border-top: 6px solid #00CBD4;">
            <div style="text-align: center; border-bottom: 2px solid #CBD5E1; padding-bottom: 16px; margin-bottom: 20px;">
              <div style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">GOVERNMENT OF INDIA / MINISTRY OF FINANCE</div>
              <div style="font-size: 15px; font-weight: 900; color: #0284C7; margin-top: 4px;">FORM GST REG-06</div>
              <div style="font-size: 11px; color: #64748B; font-weight: 600;">[See Rule 10(1)] • REGISTRATION CERTIFICATE</div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 12px; margin-bottom: 20px;">
              <div><strong>Registration Number:</strong><br><span style="font-family: var(--font-mono); color: #0284C7; font-size: 13px; font-weight: bold;">${s.docNumber||"27AAACD9012E1Z3"}</span></div>
              <div><strong>Legal Name:</strong><br><span>${((l=s.ocrExtracted)==null?void 0:l["Legal Name"])||i.applicantName}</span></div>
              <div><strong>Date of Liability:</strong><br><span>01/04/2021</span></div>
              <div><strong>Period of Validity:</strong><br><span>From ${s.issueDate||"10/06/2021"} to Perpetual</span></div>
              <div><strong>State Jurisdiction:</strong><br><span>${((r=s.ocrExtracted)==null?void 0:r["State Code"])||"Maharashtra"}</span></div>
              <div><strong>Type of Taxpayer:</strong><br><span>Regular / Active</span></div>
            </div>

            <div style="padding: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 11px; color: #475569;">
              <strong>Principal Place of Business:</strong><br>
              ${i.location||"Pune, Maharashtra, India"}
            </div>

            <div class="doc-paper-seal">
              <span>GSTN</span>
              <span style="font-size: 12px;">★</span>
              <span>VERIFIED</span>
            </div>
          </div>
        `:s.previewType==="passport"?`
          <div class="doc-mockup-paper" style="background: #0B192C; color: #FFFFFF; border: 2px solid #00CBD4; border-radius: 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 12px; margin-bottom: 16px;">
              <div style="font-size: 12px; font-weight: 800; letter-spacing: 1px;">PASSPORT / PASSEPORT</div>
              <div style="font-size: 13px; font-weight: 800; color: var(--beacon-cyan);">REPUBLIC OF INDIA</div>
            </div>

            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
              <div style="width: 110px; height: 140px; background: #1E293B; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" alt="Passport Portrait" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 11px; flex: 1;">
                <div><span style="color: #94A3B8;">Passport No:</span><br><strong style="font-family: var(--font-mono); color: var(--beacon-cyan); font-size: 12.5px;">${s.docNumber||"P892104912"}</strong></div>
                <div><span style="color: #94A3B8;">Country Code:</span><br><strong>IND</strong></div>
                <div><span style="color: #94A3B8;">Given Name:</span><br><strong>${i.applicantName.toUpperCase()}</strong></div>
                <div><span style="color: #94A3B8;">Nationality:</span><br><strong>INDIAN</strong></div>
                <div><span style="color: #94A3B8;">Date of Birth:</span><br><strong>14 AUG 1991</strong></div>
                <div><span style="color: #94A3B8;">Date of Expiry:</span><br><strong style="color: var(--beacon-green);">${s.expiryDate||"11 MAR 2032"}</strong></div>
              </div>
            </div>

            <div style="background: #070D18; padding: 10px; border-radius: 8px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: #38BDF8; line-height: 1.6;">
              P&lt;INDDESHMUKH&lt;&lt;KARAN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br>
              P892104912IND9108144M3203112&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04
            </div>

            <div class="doc-paper-seal" style="border-color: #38BDF8; color: #38BDF8;">
              <span>RPO PUNE</span>
              <span style="font-size: 10px;">★</span>
              <span>CHIP ID</span>
            </div>
          </div>
        `:s.previewType==="selfie"?`
          <div class="doc-mockup-paper" style="background: #090F1D; color: #FFF; border: 2px solid var(--beacon-cyan); text-align: center;">
            <div style="font-size: 13px; font-weight: 800; color: var(--beacon-cyan); margin-bottom: 4px;">BIOMETRIC LIVENESS VERIFICATION TELEMETRY</div>
            <div style="font-size: 11px; color: #94A3B8; margin-bottom: 20px;">DeepFace v4 AI Facial Mesh vs Government ID Portrait</div>

            <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 24px;">
              <div>
                <div style="width: 130px; height: 160px; border-radius: 12px; overflow: hidden; border: 2px solid #10B981; position: relative;">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" alt="Live Selfie" style="width: 100%; height: 100%; object-fit: cover;">
                  <span class="status-pill active" style="position: absolute; bottom: 6px; left: 6px; font-size: 9px; padding: 2px 6px;">Live Camera</span>
                </div>
                <div style="font-size: 11px; color: #10B981; margin-top: 6px; font-weight: bold;">✓ 3D Mesh Valid</div>
              </div>

              <div>
                <div style="width: 130px; height: 160px; border-radius: 12px; overflow: hidden; border: 2px solid var(--beacon-cyan); position: relative;">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" alt="Passport Reference" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%);">
                  <span class="status-pill verified" style="position: absolute; bottom: 6px; left: 6px; font-size: 9px; padding: 2px 6px;">Passport Photo</span>
                </div>
                <div style="font-size: 11px; color: var(--beacon-cyan); margin-top: 6px; font-weight: bold;">✓ Facial Match</div>
              </div>
            </div>

            <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 10px; padding: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: left; font-size: 11px;">
              <div><strong>Similarity Match:</strong> <span style="color: #10B981; font-weight: bold;">98.4% Match</span></div>
              <div><strong>Anti-Spoofing:</strong> <span style="color: #10B981; font-weight: bold;">PASS (0.01% artifact)</span></div>
              <div><strong>Active Blink:</strong> <span style="color: #10B981; font-weight: bold;">Detected (2 blinks)</span></div>
              <div><strong>Head Rotation:</strong> <span style="color: #10B981; font-weight: bold;">Verified 15° Pitch</span></div>
            </div>
          </div>
        `:`
          <div class="doc-mockup-paper" style="border: 4px double #0284C7;">
            <div style="text-align: center; border-bottom: 2px solid #E2E8F0; padding-bottom: 16px; margin-bottom: 20px;">
              <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 1.5px;">${s.issuingAuthority||"GOVERNMENT OF INDIA"}</div>
              <div style="font-size: 16px; font-weight: 900; color: #0369A1; margin: 4px 0;">${s.previewTitle||s.title}</div>
              <div style="font-size: 11.5px; color: #475569; font-weight: 600;">${s.previewSubtitle||"Accredited Commercial Tourism License"}</div>
            </div>

            <div style="font-size: 12.5px; line-height: 1.7; color: #334155; margin-bottom: 24px;">
              This is to officially certify that <strong>${i.applicantName}</strong> has complied with all regulatory standards and is authorized to operate bespoke travel expeditions, guided itineraries, and adventure services under Registration Number <strong>${s.docNumber||"TRV-2026-9912"}</strong>.
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 11.5px; background: #F1F5F9; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
              <div><strong>Issue Date:</strong> ${s.issueDate||"15 Jan 2024"}</div>
              <div><strong>Valid Until:</strong> <strong style="color: #0369A1;">${s.expiryDate||"14 Jan 2029"}</strong></div>
              <div><strong>Inspection Status:</strong> Passed (Class A)</div>
              <div><strong>Digital Seal:</strong> Cryptographically Verified</div>
            </div>

            <div class="doc-paper-seal" style="border-color: #0284C7; color: #0284C7;">
              <span>OFFICIAL</span>
              <span style="font-size: 12px;">★</span>
              <span>ACCREDITED</span>
            </div>
          </div>
        `};n.innerHTML=`
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="doc-lightbox-modal">
          <!-- Lightbox Header -->
          <div class="doc-lightbox-header">
            <div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="status-pill active" style="font-size: 10px;">${a.documentType}</span>
                <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: #FFFFFF;">${a.title}</h3>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Applicant: <strong>${i.applicantName}</strong> • ${a.fileName} (${a.fileSize})
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="status-pill ${a.status==="VERIFIED"?"verified":a.status==="REJECTED"?"suspended":"pending"}">
                ${a.status}
              </span>
              <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()" title="Close Viewer">✕</button>
            </div>
          </div>

          <!-- Lightbox Grid: Visual Render (Left) + OCR Telemetry (Right) -->
          <div class="doc-lightbox-grid">
            <!-- Left Pane: Visual Paper Preview -->
            <div class="doc-visual-viewer-pane" id="doc-render-zoom-target">
              ${o(a)}
            </div>

            <!-- Right Pane: Extracted OCR Telemetry & Decision Form -->
            <div class="doc-ocr-details-pane">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                  <h4 style="font-family: var(--font-display); font-size: 14px; font-weight: 800; color: #FFFFFF;">Extracted OCR & Biometrics</h4>
                  <span class="status-pill active" style="font-size: 10px;">Match: ${a.matchScore||99.1}%</span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px;">
                  <div class="ocr-field-row">
                    <span class="ocr-field-key">Document Serial Number</span>
                    <span class="ocr-field-val" style="font-family: var(--font-mono); color: var(--beacon-cyan);">${a.docNumber||"N/A"}</span>
                  </div>
                  <div class="ocr-field-row">
                    <span class="ocr-field-key">Issuing Authority</span>
                    <span class="ocr-field-val">${a.issuingAuthority||"Government Agency"}</span>
                  </div>
                  <div class="ocr-field-row">
                    <span class="ocr-field-key">Validity Period</span>
                    <span class="ocr-field-val">${a.issueDate||"2024-01-15"} to ${a.expiryDate||"2029-01-14"}</span>
                  </div>

                  ${Object.entries(a.ocrExtracted||{}).map(([s,l])=>`
                    <div class="ocr-field-row">
                      <span class="ocr-field-key">${s}</span>
                      <span class="ocr-field-val">${l}</span>
                    </div>
                  `).join("")}
                </div>

                ${a.status==="REJECTED"&&a.rejectionReason?`
                  <div style="background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 12px; margin-top: 10px;">
                    <div style="font-size: 11px; font-weight: 700; color: #F87171; text-transform: uppercase;">Active Rejection Note:</div>
                    <div style="font-size: 12px; color: #FFFFFF; margin-top: 4px;">"${a.rejectionReason}"</div>
                  </div>
                `:""}
              </div>

              <!-- Bottom Actions -->
              <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
                <div style="display: flex; gap: 10px;">
                  <button type="button" class="btn-primary-master" style="flex: 1; padding: 11px;" onclick="window.masterApp.approveSingleDoc('${i.id}', '${a.id}'); window.masterApp.closeAllModals();">
                    ✓ Mark Verified
                  </button>
                  <button type="button" class="btn-secondary-master" style="flex: 1; padding: 11px; justify-content: center; color: var(--beacon-red); border-color: rgba(239,68,68,0.4);" onclick="window.masterApp.openRejectDocumentModal('${i.id}', '${a.id}');">
                    ✕ Reject Document
                  </button>
                </div>
                <button type="button" class="btn-secondary-master" style="width: 100%; justify-content: center;" onclick="alert('Downloading original encrypted PDF: ${a.fileName}')">
                  📥 Download Original PDF (${a.fileSize})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}approveSingleDoc(e,t){const a=this.data.verifications.find(n=>n.id===e);if(!a)return;const i=(a.documents||[]).find(n=>n.id===t);i&&(i.status="VERIFIED",delete i.rejectionReason,delete i.rejectedAt,this.showToast(`✓ Document "${i.title}" verified successfully!`,"success"),this.render())}simulatePlannerUpload(){const t=[{id:`DOC-NEW-${Date.now().toString().slice(-4)}`,title:"Himachal Tourism Operator License & Adventure Permit",documentType:"Tourism License",fileName:"Himachal_Tourism_Permit_2026.pdf",fileSize:"2.3 MB",uploadedAt:"Just now",status:"PENDING",docNumber:"HP-TRV-2026-44019",issuingAuthority:"Himachal Pradesh Tourism Development Board",issueDate:"2025-05-10",expiryDate:"2030-05-09",matchScore:98.9,previewType:"certificate",previewTitle:"HIMACHAL PRADESH TOURISM DEVELOPMENT BOARD",previewSubtitle:"Certified High Altitude Mountain Trekking Operator",ocrExtracted:{"Entity Name":"Peaks & Valleys Adventure Travel Ltd.","License No":"HP-TRV-2026-44019",Coverage:"Manali, Spiti, Rohtang, Kinnaur","Verification Status":"ACTIVE"}}][0],a=this.data.verifications[0];a&&(a.documents.unshift(t),a.status="PENDING",this.showToast(`📩 New Document Uploaded: "${t.title}" by ${a.applicantName}!`,"info"),this.render())}setUserTab(e){this.selectedTab=e,this.render()}handleSearch(e){this.searchQuery=e,this.render()}approveVerification(e){const t=this.data.verifications.find(a=>a.id===e);t&&(t.status="VERIFIED",(t.documents||[]).forEach(a=>{a.status="VERIFIED",delete a.rejectionReason})),this.showToast(`KYC Verification #${e} approved! All documents marked verified.`,"success"),this.render()}rejectVerification(e){const t=this.data.verifications.find(a=>a.id===e);t&&(t.status="REJECTED",(t.documents||[]).forEach(a=>{a.status==="PENDING"&&(a.status="REJECTED")})),this.showToast(`KYC Verification #${e} rejected. Planner notified to re-upload required credentials.`,"danger"),this.render()}reactivateUser(e){const t=this.data.users.find(a=>a.id===e);t&&(t.status="ACTIVE"),this.showToast(`User #${e} account reactivated.`,"success"),this.render()}sendBroadcast(){const e=document.getElementById("notif-title").value;this.showToast(`Broadcast "${e}" dispatched successfully.`,"success"),this.navigateTo("dashboard")}openExportModal(e){alert(`Generating encrypted PDF/CSV export for: ${e}. Download ready in 3 seconds.`)}}window.masterApp=new E;document.addEventListener("DOMContentLoaded",()=>{window.masterApp.init()});
