// Beacon Design 5 - Portal Layout Controller

window.addEventListener('error', (e) => {
    console.error("Global JS Error Captured in app.js:", e.message, "at", e.filename, ":", e.lineno);
});

window.showToast = (msg) => {
    const toast = document.getElementById('playground-toast');
    if (toast) {
        toast.innerText = msg;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 2200);
    } else {
        console.log("Toast:", msg);
    }
};


    // ========================================================
    // DYNAMIC WHATSAPP SHARING & DEEP LINKING
    // ========================================================
    // Global travel package dataset shared across scopes
    let allPackagesData = [];

    // ========================================================
    // DYNAMIC WHATSAPP SHARING & DEEP LINKING
    // ========================================================
    const findPackageByTitle = (title) => {
        if (!title) return null;
        const cleanTitle = title.toLowerCase().trim();
        let found = allPackagesData.find(p => p.title.toLowerCase() === cleanTitle);
        if (found) return found;
        found = allPackagesData.find(p => p.title.toLowerCase().includes(cleanTitle) || cleanTitle.includes(p.title.toLowerCase()));
        if (found) return found;
        const titleWords = cleanTitle.split(' ').filter(w => w.length > 2);
        if (titleWords.length > 0) {
            let maxMatches = 0;
            let bestPkg = null;
            allPackagesData.forEach(p => {
                const pTitleLower = p.title.toLowerCase();
                const matches = titleWords.filter(word => pTitleLower.includes(word)).length;
                if (matches > maxMatches) {
                    maxMatches = matches;
                    bestPkg = p;
                }
            });
            if (maxMatches >= 1) return bestPkg;
        }
        return null;
    };

    const getPackageSlug = (pkg) => {
        return pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const getWhatsAppMessageText = (pkg) => {
        const slug = getPackageSlug(pkg);
        const packageUrl = `${window.location.origin}/?package=${slug}`;
        
        const discountedPrice = pkg.priceStr || pkg.price;
        const basePriceNum = pkg.basePrice || Math.round(pkg.priceNum * 1.11);
        const discountPercent = Math.round(((basePriceNum - pkg.priceNum) / basePriceNum) * 100);
        const originalPriceStr = "₹" + basePriceNum.toLocaleString();
        
        const highlightsArray = pkg.highlights 
            ? pkg.highlights.split(',') 
            : ["Luxury Stays", "Guided Activities", "Transfers Included"];
        const formattedHighlights = highlightsArray.slice(0, 4).map(h => h.trim()).join(' • ');
        
        let discountLine = '';
        if (discountPercent > 0) {
            discountLine = `\n${discountPercent}% OFF • Original ${originalPriceStr}`;
        }
        
        return `*${pkg.title}*\n\n${pkg.duration} Days / ${pkg.duration - 1} Nights\n${pkg.location ? pkg.location.split(',')[0] : pkg.category.toUpperCase()}\n\nStarting from ${discountedPrice}/person${discountLine}\n\n${formattedHighlights}\n\nExplore complete itinerary, stays, activities, dates & more on Beacon:\n\n${packageUrl}`;
    };

    const generateSharePoster = (pkg, callback) => {
        const canvas = document.getElementById('share-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        const width = 600;
        const height = 800;
        canvas.width = width;
        canvas.height = height;
        
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const imgRatio = img.width / img.height;
            const canvasRatio = width / height;
            let sx, sy, sWidth, sHeight;
            if (imgRatio > canvasRatio) {
                sHeight = img.height;
                sWidth = img.height * canvasRatio;
                sx = (img.width - sWidth) / 2;
                sy = 0;
            } else {
                sWidth = img.width;
                sHeight = img.width / canvasRatio;
                sx = 0;
                sy = (img.height - sHeight) / 2;
            }
            ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
            
            // Gradient overlays
            const topGrad = ctx.createLinearGradient(0, 0, 0, 100);
            topGrad.addColorStop(0, 'rgba(7, 7, 28, 0.7)');
            topGrad.addColorStop(1, 'rgba(7, 7, 28, 0)');
            ctx.fillStyle = topGrad;
            ctx.fillRect(0, 0, width, 100);
            
            const bottomGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
            bottomGrad.addColorStop(0, 'rgba(7, 7, 28, 0)');
            bottomGrad.addColorStop(0.3, 'rgba(7, 7, 28, 0.5)');
            bottomGrad.addColorStop(0.7, 'rgba(7, 7, 28, 0.9)');
            bottomGrad.addColorStop(1, 'rgba(7, 7, 28, 0.98)');
            ctx.fillStyle = bottomGrad;
            ctx.fillRect(0, height * 0.55, width, height * 0.45);
            
            // Draw cyan border
            ctx.strokeStyle = '#00CBE0';
            ctx.lineWidth = 4;
            ctx.strokeRect(2, 2, width - 4, height - 4);
            
            // Crescent Moon Logo
            ctx.strokeStyle = '#00CBE0';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.arc(45, 45, 14, 0.2 * Math.PI, 1.6 * Math.PI);
            ctx.stroke();
            
            ctx.strokeStyle = '#00CBE0';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(56, 32);
            ctx.lineTo(62, 38);
            ctx.moveTo(62, 32);
            ctx.lineTo(56, 38);
            ctx.stroke();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 16px "Poppins", sans-serif';
            ctx.fillText('BEACON', 75, 47);
            ctx.fillStyle = '#00CBE0';
            ctx.font = '700 10px "Poppins", sans-serif';
            ctx.fillText('TRAVEL', 75, 58);
            
            // Gold Star Rating
            const ratingVal = pkg.rating.replace('⭐', '').trim();
            ctx.fillStyle = 'rgba(7, 7, 28, 0.75)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(width - 110, 25, 85, 38, 6);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = '#FFD700';
            ctx.font = '14px "Poppins", sans-serif';
            ctx.fillText('⭐', width - 100, 48);
            ctx.fillStyle = '#ffffff';
            ctx.font = '800 13px "Poppins", sans-serif';
            ctx.fillText(ratingVal, width - 78, 48);
            
            // Categories/Style
            const categoryTag = (pkg.style || pkg.category || 'FEATURED').toUpperCase();
            ctx.fillStyle = '#00CBE0';
            ctx.font = '800 11px "Poppins", sans-serif';
            ctx.fillText(categoryTag, 45, height - 145);
            
            // Destination Name
            const destName = (pkg.location ? pkg.location.split(',')[0] : pkg.category || 'JOURNEY').toUpperCase();
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 48px "Poppins", sans-serif';
            ctx.fillText(destName, 45, height - 90);
            
            // Title
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.font = '500 20px "Poppins", sans-serif';
            ctx.fillText(pkg.title, 45, height - 55);
            
            // CTA
            ctx.fillStyle = '#00CBE0';
            ctx.font = '800 10px "Poppins", sans-serif';
            ctx.fillText('EXPLORE THIS JOURNEY ON BEACON', 45, height - 25);
            
            const dataUrl = canvas.toDataURL('image/png');
            if (callback) callback(dataUrl);
        };
        img.onerror = () => {
            ctx.fillStyle = '#07071C';
            ctx.fillRect(0, 0, width, height);
            ctx.strokeStyle = '#00CBE0';
            ctx.lineWidth = 4;
            ctx.strokeRect(2, 2, width - 4, height - 4);
            
            ctx.fillStyle = '#fff';
            ctx.font = '900 28px "Poppins", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('BEACON TRAVEL', width / 2, height / 2 - 40);
            ctx.fillStyle = '#00CBE0';
            ctx.fillText(pkg.title.toUpperCase(), width / 2, height / 2 + 10);
            
            const dataUrl = canvas.toDataURL('image/png');
            if (callback) callback(dataUrl);
        };
        img.src = pkg.bg || pkg.imgUrl;
    };

    window.openShareSheet = (pkg) => {
        const modal = document.getElementById('beacon-share-sheet');
        if (!modal) return;
        
        const textPreview = document.getElementById('whatsapp-text-preview');
        const imgPreview = document.getElementById('share-image-preview');
        
        const msg = getWhatsAppMessageText(pkg);
        textPreview.innerText = msg;
        
        // Lock body scrolling
        document.body.classList.add('modal-open');
        
        // Show sheet
        modal.style.display = 'flex';
        
        // Render image
        generateSharePoster(pkg, (dataUrl) => {
            imgPreview.src = dataUrl;
        });
        
        // Block background scroll chaining on touch drag
        modal.ontouchmove = (e) => {
            if (e.target === modal) {
                e.preventDefault();
            }
        };
        
        // Bind actions
        const closeBtn = document.getElementById('btn-close-share-sheet');
        closeBtn.onclick = () => {
            document.body.classList.remove('modal-open');
            modal.style.display = 'none';
        };
        
        const whatsappBtn = document.getElementById('btn-share-whatsapp');
        whatsappBtn.onclick = () => {
            const canvas = document.getElementById('share-canvas');
            if (canvas) {
                try {
                    canvas.toBlob((blob) => {
                        if (blob) {
                            navigator.clipboard.write([
                                new ClipboardItem({ "image/png": blob })
                            ]).then(() => {
                                showToast("📋 Card image copied! Paste it in WhatsApp to attach.");
                                setTimeout(() => {
                                    const encoded = encodeURIComponent(msg);
                                    window.open('https://api.whatsapp.com/send?text=' + encoded, '_blank');
                                }, 1500);
                            }).catch(() => {
                                const encoded = encodeURIComponent(msg);
                                window.open('https://api.whatsapp.com/send?text=' + encoded, '_blank');
                            });
                        } else {
                            const encoded = encodeURIComponent(msg);
                            window.open('https://api.whatsapp.com/send?text=' + encoded, '_blank');
                        }
                    }, 'image/png');
                } catch (err) {
                    const encoded = encodeURIComponent(msg);
                    window.open('https://api.whatsapp.com/send?text=' + encoded, '_blank');
                }
            } else {
                const encoded = encodeURIComponent(msg);
                window.open('https://api.whatsapp.com/send?text=' + encoded, '_blank');
            }
        };
        
        // Copy link only button
        const copyLinkBtn = document.getElementById('btn-copy-share-link');
        if (copyLinkBtn) {
            copyLinkBtn.onclick = () => {
                const slug = getPackageSlug(pkg);
                const pkgUrl = `${window.location.origin}/?package=${slug}`;
                navigator.clipboard.writeText(pkgUrl).then(() => {
                    showToast("📋 Package URL copied to clipboard!");
                });
            };
        }
        
        // Copy full text button
        const copyBtn = document.getElementById('btn-copy-share-text');
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(msg).then(() => {
                showToast("📋 WhatsApp details text copied to clipboard!");
            });
        };
        
        const downloadBtn = document.getElementById('btn-download-share-card');
        downloadBtn.onclick = () => {
            const canvas = document.getElementById('share-canvas');
            if (canvas) {
                const url = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = `${getPackageSlug(pkg)}-share.png`;
                link.href = url;
                link.click();
                showToast("💾 Downloaded Travel Card!");
            }
        };
    };

    const handleDeepLinking = () => {
        const params = new URLSearchParams(window.location.search);
        const packageSlug = params.get('package');
        const hash = window.location.hash;
        
        let matchedPkg = null;
        if (packageSlug) {
            matchedPkg = allPackagesData.find(p => getPackageSlug(p) === packageSlug);
        } else if (hash && hash.startsWith('#package-')) {
            const slug = hash.replace('#package-', '');
            matchedPkg = allPackagesData.find(p => getPackageSlug(p) === slug || p.title.toLowerCase().includes(decodeURIComponent(slug).toLowerCase()));
        } else {
            const pathParts = window.location.pathname.split('/');
            const idx = pathParts.indexOf('package');
            if (idx !== -1 && pathParts[idx + 1]) {
                const slug = pathParts[idx + 1];
                matchedPkg = allPackagesData.find(p => getPackageSlug(p) === slug);
            }
        }
        
        if (matchedPkg) {
            setTimeout(() => {
                openPackageDetailsView(matchedPkg);
            }, 300);
        }
    };

document.addEventListener('DOMContentLoaded', () => {
    const renderPaymentsDashboard = () => {}; // Dummy to prevent ReferenceError since Payments view is removed


// Mock planner profiles for invoice header context matching GST states
    const mockPlanners = {
        agency: {
            name: "WanderGo Travels",
            legalName: "WanderGo Tour Operators Pvt Ltd",
            logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=150&q=80",
            address: "123 Example Road, Pune, Maharashtra - 411001",
            phone: "+91 99999 88888",
            email: "booking@wandergo.com",
            gstRegistered: true,
            gstin: "27ABCDE1234F1Z5"
        },
        freelancer: {
            name: "ROHAN TRAVEL EXPERIENCES",
            legalName: "Rohan Mehta Experiences",
            logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            address: "Pune, Maharashtra - 411038",
            phone: "+91 98765 43210",
            email: "rohan.experiences@planner.com",
            gstRegistered: false,
            gstin: ""
        }
    };

    // Ensure confirmed bookings have a receipt snapshot stored (Immutable receipts)
    const ensureReceiptSnapshot = (bk) => {
        if (bk.receiptSnapshot) return bk.receiptSnapshot;

        // Choose planner style (BC-2026-9921 defaults to agency with GST, others can vary)
        const planner = bk.id === "BC-2026-9921" ? mockPlanners.agency : mockPlanners.freelancer;
        
        // Build mock snapshot parameters
        const basePrice = bk.priceNum || 37000;
        const upgradesPrice = 3000;
        const mealsPrice = 550;
        const addonsPrice = 1000;
        const discount = 2000;
        
        const subtotal = basePrice + upgradesPrice + mealsPrice + addonsPrice - discount;
        const taxRate = planner.gstRegistered ? 0.05 : 0.0;
        const taxes = Math.round(subtotal * taxRate);
        const grandTotal = subtotal + taxes;

        bk.receiptSnapshot = {
            receiptNo: `BRC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
            bookingId: bk.id,
            paymentStatus: "PAID",
            paymentDate: "31 July 2026",
            bookingDate: "30 July 2026",
            utrId: "992100887321",
            verification: "Verified",
            planner: planner,
            customer: {
                name: "Aditya Kasod",
                phone: "+91 98765 43210",
                email: "aditya.kasod@example.com"
            },
            trip: {
                packageTitle: bk.packageTitle,
                destination: bk.id === "BC-2026-9921" ? "Kerala Backwaters" : "Munnar Hills",
                dates: bk.dateRange,
                duration: "5 Days / 4 Nights"
            },
            travellers: [
                { name: "Aditya Kasod", type: "Adult" },
                { name: "Riya Sharma", type: "Adult" },
                { name: "Aarav Sharma", type: "Child" },
                { name: "Myra Sharma", type: "Infant" }
            ],
            customizations: {
                stay: "Sea View Resort Upgrade",
                transport: "Airport Transfer Sedan Cab — Included",
                meals: [
                    { name: "Aditya Kasod", pref: "Vegetarian Throughout" },
                    { name: "Riya Sharma", pref: "Non-Veg Throughout" },
                    { name: "Aarav Sharma", pref: "Vegetarian Throughout" }
                ],
                addons: ["Beach Candlelight Dinner", "Airport lounge Lounge access"]
            },
            pricing: {
                basePrice,
                upgradesPrice,
                mealsPrice,
                addonsPrice,
                discount,
                subtotal,
                taxes,
                grandTotal
            }
        };

        // Write snapshot back to storage
        const bookingsList = JSON.parse(localStorage.getItem('beacon_bookings')) || [];
        const idx = bookingsList.findIndex(b => b.id === bk.id);
        if (idx !== -1) {
            bookingsList[idx] = bk;
            localStorage.setItem('beacon_bookings', JSON.stringify(bookingsList));
        }

        return bk.receiptSnapshot;
    };


    // Helper to replace text emojis on action buttons with inline SVGs
    const replaceCardButtonsWithSVG = () => {
        document.querySelectorAll('.card-favorite-btn').forEach(btn => {
            if (!btn.querySelector('svg')) {
                btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            }
        });
        document.querySelectorAll('.card-share-btn').forEach(btn => {
            if (!btn.querySelector('svg')) {
                btn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon><line x1="22" y1="2" x2="11" y2="13"></line></svg>`;
            }
        });
    };

    // Run SVG replacement immediately on load
    replaceCardButtonsWithSVG();

    // Helper to click all active tabs on load to populate the lists
    const filterAllPackages = () => {
        const activeTabs = document.querySelectorAll('.dest-tab.active, .exp-tab.active, .style-tab.active, .budget-tab.active, .seasonal-tab.active');
        activeTabs.forEach(tab => {
            tab.click();
        });
        replaceCardButtonsWithSVG();
    };

    // ----------------------------------------------------
    // 1. LIQUID GLASS HEADER ON SCROLL
    // ----------------------------------------------------
    const header = document.getElementById('liquid-glass-navigation');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ----------------------------------------------------
    // 2. HERO CAROUSEL / VIDEO SELECTOR (Remove Reel Button)
    // ----------------------------------------------------
    
    const dots = document.querySelectorAll('.hero5-dot');
    const heroTitle = document.getElementById('hero5-title');
    const heroTag = document.getElementById('hero5-tag');
    const heroDesc = document.getElementById('hero5-desc');

    const heroSlides = [
        {
            title: "Life Beyond Routine",
            tag: "Nature's Whispers",
            desc: "Handpicked journeys. Unforgettable experiences. Made for you.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
        },
        {
            title: "Discover Golden Sands",
            tag: "Coastal Paradises",
            desc: "Immerse yourself in crystal waters and scenic shorelines curated by travel vloggers.",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
        },
        {
            title: "Roam Hidden Valleys",
            tag: "Let's Explore The World",
            desc: "Zen gardens, mountain trails, and isolated lodges crafted for wellness seekers.",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80"
        }
    ];

    let currentIndex = 0;
    let autoPlayInterval;

    function goToSlide(idx) {
        dots.forEach(d => d.classList.remove('active'));
        if (dots[idx]) dots[idx].classList.add('active');
        
        const slide = heroSlides[idx];
        if (slide) {
            if (heroTitle) heroTitle.style.opacity = '0';
            if (heroTag) heroTag.style.opacity = '0';
            if (heroDesc) heroDesc.style.opacity = '0';

            // Instantly transition the background fallback photo
            const heroBanner = document.getElementById('hero5-banner');
            if (heroBanner) {
                heroBanner.style.backgroundImage = `url('${slide.image}')`;
            }

            setTimeout(() => {
                if (heroTitle) {
                    heroTitle.innerText = slide.title;
                    heroTitle.style.opacity = '1';
                }
                if (heroTag) {
                    heroTag.innerText = slide.tag;
                    heroTag.style.opacity = '1';
                }
                if (heroDesc) {
                    heroDesc.innerText = slide.desc;
                    heroDesc.style.opacity = '1';
                }
            }, 300);
        }
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % heroSlides.length;
            goToSlide(currentIndex);
        }, 10000); // 10 seconds auto-rotation
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentIndex = idx;
            goToSlide(idx);
            resetAutoPlay();
        });
    });

    // Start auto banner transitions
    startAutoPlay();

    // ----------------------------------------------------
    // 3. FAVORITES & SHARE TOAST TOGGLING
    // ----------------------------------------------------
    const showShareToast = (title) => {
        let toast = document.getElementById('share-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'share-toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #0ea5e9;
                color: #030712;
                padding: 12px 24px;
                border-radius: 30px;
                font-weight: 700;
                font-size: 13px;
                box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4);
                z-index: 10000;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            `;
            document.body.appendChild(toast);
        }
        toast.innerText = `🔗 Copied share link for "${title}"!`;
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
        }, 2500);
    };

    const bindInteractiveButtons = (container = document) => {
        const favButtons = container.querySelectorAll('.card-favorite-btn');
        favButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const icon = btn.innerText;
                if (icon === "♡") {
                    btn.innerText = "♥";
                    btn.style.color = "#ef4444";
                } else {
                    btn.innerText = "♡";
                    btn.style.color = "";
                }
            });
        });

        const shareButtons = container.querySelectorAll('.card-share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const card = btn.closest('.travel-card');
                const title = card ? card.querySelector('.card-title').innerText : btn.dataset.title || "Package";
                
                const dummyUrl = window.location.origin + window.location.pathname + "#package-" + encodeURIComponent(title);
                navigator.clipboard.writeText(dummyUrl).then(() => {
                    showShareToast(title);
                }).catch(() => {
                    showShareToast(title);
                });
            });
        });
    };
    bindInteractiveButtons();

    // ----------------------------------------------------
    // 4. DOCUMENTARY VIDEO PLAYBACK (16:9 Hover Plays)
    // ----------------------------------------------------


    // ----------------------------------------------------
    // 5. GENERIC TAB FILTER MANAGER (With stagger fades)
    // ----------------------------------------------------
    const setupFilterSection = (tabClass, gridId, dataMap, cardCreator) => {
        const tabs = document.querySelectorAll(tabClass);
        const grid = document.getElementById(gridId);
        
        if (!grid) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const category = tab.dataset.category;
                const items = dataMap[category] || [];

                
                grid.style.opacity = '0';
                setTimeout(() => {
                    grid.innerHTML = '';
                    items.forEach(item => {
                        grid.innerHTML += cardCreator(item);
                    });
                    
                    bindInteractiveButtons(grid);
                    replaceCardButtonsWithSVG();
                    
                    // Stagger entries
                    Array.from(grid.children).forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(15px)';
                        el.style.transition = 'all 0.4s ease-out';
                        
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    grid.style.opacity = '1';
                }, 250);
            });
        });
    };

    // Card Templates
    const standardCardCreator = (item) => `
        <div class="travel-card">
            <div class="card-img-wrap" style="background-image: url('${item.bg}')">
                ${item.visa ? `<span class="visa-badge">${item.visa}</span>` : ''}
                <button class="card-share-btn" data-title="${item.title}">🔗</button>
                <button class="card-favorite-btn">♡</button>
            </div>
            <div class="card-details">
                <div class="card-meta">
                    <span>📍 ${item.type}</span>
                    <span>${item.duration}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <div class="card-footer">
                    <div class="card-rating">⭐ ${item.rating}</div>
                    <div class="card-price">${item.price}</div>
                </div>
            </div>
        </div>
    `;

    const experienceCardCreator = (item) => `
        <div class="experience-card">
            <div class="experience-card-bg" style="background-image: url('${item.bg}')"></div>
            <div class="experience-content">
                <h3>${item.title}</h3>
                <span>${item.count}</span>
            </div>
        </div>
    `;

    // ----------------------------------------------------
    // DATA MAPPING DECLARATIONS
    // ----------------------------------------------------

    // Explore by Destination
    const destinationData = {
        "mountains": [
            { title: "Leh Ladakh Bike Expedition", type: "Mountain", duration: "6 Days", rating: "4.8", price: "₹22,999", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" },
            { title: "Manali Luxury Cedar Chalet", type: "Mountain", duration: "4 Days", rating: "4.7", price: "₹12,999", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" },
            { title: "Kedarnath Pilgrimage Trail Lodge", type: "Mountain", duration: "5 Days", rating: "4.8", price: "₹18,999", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Gulmarg Snow Igloo Couples Escape", type: "Mountain", duration: "4 Days", rating: "4.5", price: "₹15,999", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" }
        ],
        "beaches": [
            { title: "Goa Beachfront Honeymoon Villa", type: "Beach", duration: "5 Days", rating: "4.9", price: "₹14,999", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Varkala Cliffside Solo Backpacker", type: "Beach", duration: "4 Days", rating: "4.8", price: "₹11,499", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Havelock Island Beach Resort", type: "Beach", duration: "6 Days", rating: "4.9", price: "₹28,999", bg: "https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=400&q=80" },
            { title: "Gokarna Surf & Cliffs Expedition", type: "Beach", duration: "3 Days", rating: "4.6", price: "₹8,499", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" }
        ]
    };
    setupFilterSection('.dest-tab', 'destination-grid', destinationData, standardCardCreator);

    // Explore by Experience
    const experienceData = {
        "adventure": [
            { title: "Trekking Peaks", count: "6 Packages", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" },
            { title: "River Rafting Rapids", count: "8 Packages", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" },
            { title: "Bungee Jumping", count: "5 Packages", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Scuba Diving reefs", count: "8 Packages", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" }
        ],
        "nature": [
            { title: "Forest Safaris", count: "12 Packages", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Flower Valleys", count: "4 Packages", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" },
            { title: "Lake House Retreats", count: "7 Packages", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Bird Sanctuary", count: "3 Packages", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" }
        ]
    };
    setupFilterSection('.exp-tab', 'experience-grid', experienceData, experienceCardCreator);

    // Explore by Travel Style
    const styleData = {
        "style-group": [
            { title: "Solo Backpacking", count: "14 Packages", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Couple Getaways", count: "22 Packages", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Family Resorts", count: "18 Packages", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" },
            { title: "Friends Roadtrips", count: "10 Packages", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" }
        ]
    };
    setupFilterSection('.style-tab', 'style-grid', styleData, experienceCardCreator);

    // Budget Collections (Aligned with real packages)
    const budgetData = {
        "under-10k": [
            { title: "Varkala Cliffside Solo Backpacker", type: "Coastal", duration: "5 Days", rating: "4.6", price: "₹8,999", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Ooty Botanical Gardens Retreat", type: "Colonial", duration: "3 Days", rating: "4.7", price: "₹6,499", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Kasol Parvati Valley Solo Cabin", type: "Hills", duration: "4 Days", rating: "4.8", price: "₹7,999", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" },
            { title: "Coorg Coffee Estate Solo Villa", type: "Estate", duration: "3 Days", rating: "4.5", price: "₹9,999", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" }
        ],
        "under-5k": [
            { title: "Rishikesh Forest Yoga Ashram", type: "Weekend Escape", duration: "2 Days", rating: "4.4", price: "₹3,499", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Varanasi Ganges Twilight Ritual", type: "Trek", duration: "1 Day", rating: "4.5", price: "₹1,299", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" },
            { title: "Tirupati Balaji Darshan Family Package", type: "Drive", duration: "2 Days", rating: "4.6", price: "₹4,999", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" },
            { title: "Amritsar Golden Temple Solo Peace", type: "Adventure day", duration: "1 Day", rating: "4.7", price: "₹3,999", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" }
        ],
        "luxury": [
            { title: "Maldives Overwater Romantic Bungalow", type: "Luxury Escape", duration: "5 Days", rating: "4.9", price: "₹1,20,000", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Singapore Sentosa Island Family Fun", type: "Family Adventure", duration: "6 Days", rating: "4.8", price: "₹55,000", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Dubai Marina Yacht Luxury Suite", type: "Luxury Escape", duration: "5 Days", rating: "4.9", price: "₹68,000", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" },
            { title: "Ananda Himalayas Spiritual Wellness", type: "Spiritual Escape", duration: "7 Days", rating: "4.8", price: "₹75,000", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" }
        ],
        "premium": [
            { title: "Goa Beachfront Honeymoon Villa", type: "Premium Stay", duration: "5 Days", rating: "4.9", price: "₹28,000", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Gokarna Surf & Cliffs Expedition", type: "Adventure beach", duration: "4 Days", rating: "4.8", price: "₹28,000", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Havelock Island Beach Resort", type: "Premium Resort", duration: "6 Days", rating: "4.9", price: "₹28,000", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" },
            { title: "Leh Ladakh Bike Expedition", type: "Mountain Trail", duration: "6 Days", rating: "4.8", price: "₹22,999", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" }
        ]
    };
    setupFilterSection('.budget-tab', 'budget-grid', budgetData, standardCardCreator);

    // Seasonal Picks (Aligned with real packages)
    const seasonalData = {
        "monsoon": [
            { title: "Wayanad Treehouse Escape", type: "Monsoon", duration: "5 Days", rating: "4.9", price: "₹17,499", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" },
            { title: "Jim Corbett Wildlife Jeep Safari", type: "Monsoon", duration: "4 Days", rating: "4.8", price: "₹13,999", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Kabini Riverfront Luxury Lodge", type: "Monsoon", duration: "3 Days", rating: "4.7", price: "₹9,999", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Hemkund Sahib Alpine Trek", type: "Monsoon", duration: "2 Days", rating: "4.5", price: "₹4,899", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" }
        ],
        "winter": [
            { title: "Gulmarg Snow Igloo Couples Escape", type: "Winter Peaks", duration: "4 Days", rating: "4.5", price: "₹32,000", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" },
            { title: "Shimla Mall Road Family Suite", type: "Hills Retreat", duration: "5 Days", rating: "4.6", price: "₹18,000", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Leh Ladakh Bike Expedition", type: "High Altitude", duration: "6 Days", rating: "4.8", price: "₹22,999", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" },
            { title: "Manali Luxury Cedar Chalet", type: "Snow Chalet", duration: "4 Days", rating: "4.7", price: "₹24,000", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" }
        ],
        "summer": [
            { title: "Goa Beachfront Honeymoon Villa", type: "Beaches", duration: "5 Days", rating: "4.9", price: "₹28,000", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Marari Beach Family Oasis", type: "Coastal Oasis", duration: "4 Days", rating: "4.8", price: "₹22,000", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Gokarna Surf & Cliffs Expedition", type: "Adventure Beach", duration: "4 Days", rating: "4.8", price: "₹28,000", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" },
            { title: "Havelock Island Beach Resort", type: "Tropical Island", duration: "6 Days", rating: "4.9", price: "₹28,000", bg: "https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=400&q=80" }
        ],
        "spring": [
            { title: "Ooty Botanical Gardens Retreat", type: "Spring Hills", duration: "5 Days", rating: "4.6", price: "₹14,000", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
            { title: "Wayanad Treehouse Escape", type: "Nature retreat", duration: "5 Days", rating: "4.8", price: "₹18,000", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80" },
            { title: "Coorg Coffee Estate Solo Villa", type: "Estate retreat", duration: "4 Days", rating: "4.7", price: "₹16,000", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" },
            { title: "Ananda Himalayas Spiritual Wellness", type: "Spiritual retreat", duration: "7 Days", rating: "4.8", price: "₹75,000", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" }
        ]
    };
    setupFilterSection('.seasonal-tab', 'seasonal-grid', seasonalData, standardCardCreator);

    // ----------------------------------------------------
    // CURVED CAROUSEL FOR TRENDING PACKAGES
    // ----------------------------------------------------
    try {
        const trendingSection = document.querySelector('.curved-trending-section');
        const trendingCards = document.querySelectorAll('.trending-curved-card');
        const prevTrendBtn = document.querySelector('.trending-nav-btn.prev');
        const nextTrendBtn = document.querySelector('.trending-nav-btn.next');

        if (trendingCards.length > 0) {
            let currentIndexTrend = 0;
            const totalTrend = trendingCards.length;

            const arrangeTrendCarousel = () => {
                trendingCards.forEach((card, index) => {
                    const theta = (index - currentIndexTrend) * (2 * Math.PI / totalTrend);
                    
                    const radiusX = 320;
                    const radiusY = 30; // curve depth mapping
                    const tz = Math.cos(theta); // depth from -1 to 1
                    
                    const tx = Math.sin(theta) * radiusX;
                    const ty = (1 - tz) * radiusY;
                    const rz = Math.sin(theta) * -15; // smooth card tilt rotation
                    
                    const scale = 0.88 + tz * 0.12; // 1.0 at front, 0.76 at back
                    const zIndex = Math.round((tz + 1) * 10);
                    const blur = (1 - tz) * 2;
                    const opacity = tz < -0.5 ? Math.max(0, (tz + 1) * 2) : 1; // fade out back cards

                    card.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rz}deg) scale(${scale})`;
                    card.style.zIndex = zIndex;
                    card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
                    card.style.opacity = opacity;

                    const isFocused = (index === (currentIndexTrend % totalTrend + totalTrend) % totalTrend);
                    if (isFocused) {
                        card.classList.add('center-focus');
                        const bgUrl = card.style.backgroundImage;
                        if (trendingSection && bgUrl) {
                            trendingSection.style.backgroundImage = bgUrl;
                            trendingSection.style.backgroundSize = 'cover';
                            trendingSection.style.backgroundPosition = 'center';
                            trendingSection.style.transition = 'background-image 0.8s ease-in-out';
                        }
                    } else {
                        card.classList.remove('center-focus');
                    }
                });
            };

            if (prevTrendBtn && nextTrendBtn) {
                prevTrendBtn.addEventListener('click', () => {
                    currentIndexTrend = (currentIndexTrend - 1 + totalTrend) % totalTrend;
                    arrangeTrendCarousel();
                });
                nextTrendBtn.addEventListener('click', () => {
                    currentIndexTrend = (currentIndexTrend + 1) % totalTrend;
                    arrangeTrendCarousel();
                });
            }

            arrangeTrendCarousel();

            // Wheel Scroll Interception
            const wrapper = document.querySelector('.trending-carousel-wrapper');
            if (wrapper) {
                let lastScrollTime = 0;
                wrapper.addEventListener('wheel', (e) => {
                    const isOverCard = e.target.closest('.trending-curved-card');
                    if (!isOverCard) {
                        return; // Let the page scroll up/down normally
                    }

                    // Unconditionally intercept page scroll to prevent any page vertical movement
                    e.preventDefault();

                    const now = Date.now();
                    // Throttle wheel inputs (700ms) to ensure smooth pacing
                    if (now - lastScrollTime < 700) {
                        return;
                    }

                    if (Math.abs(e.deltaY) > 3) {
                        lastScrollTime = now;
                        if (e.deltaY > 0) {
                            currentIndexTrend = (currentIndexTrend + 1) % totalTrend;
                        } else {
                            currentIndexTrend = (currentIndexTrend - 1 + totalTrend) % totalTrend;
                        }
                        arrangeTrendCarousel();
                    }
                }, { passive: false });
            }
        }
    } catch (err) {
        console.error("Curved Trending Carousel Error: ", err);
    }

    // ----------------------------------------------------
    // BESPOKE DISTANCE TAG CALCULATOR SIMULATION
    // ----------------------------------------------------
    try {
        const distanceTags = document.querySelectorAll('.bespoke-distance-tag');
        distanceTags.forEach(tag => {
            setTimeout(() => {
                const baseDist = tag.dataset.base;
                const timeVal = tag.dataset.time;
                const textEl = tag.querySelector('.tag-text');
                const dotEl = tag.querySelector('.pulse-dot');
                
                if (textEl) {
                    textEl.innerText = `📍 Nearby: ${timeVal} drive (${baseDist} km)`;
                }
                tag.classList.remove('calculating');
                tag.classList.add('calculated');
                if (dotEl) {
                    dotEl.style.animation = 'none';
                    dotEl.style.backgroundColor = '#10b981'; // Green dot when ready!
                }
            }, 1800 + Math.random() * 800); // Random stagger offset
        });
    } catch (e) {
        console.error("Bespoke Distance Calculator Error: ", e);
    }

    // ----------------------------------------------------
    // EXPLORE BY PLANNERS DYNAMIC SEARCH & FILTER
    // ----------------------------------------------------
    try {
        const searchInput = document.getElementById('planner-search-input');
        const searchBtn = document.getElementById('planner-search-btn');
        const plannerCards = document.querySelectorAll('.planner-card');
        const suggestChips = document.querySelectorAll('.suggest-chip');

        const filterPlanners = (query) => {
            const cleanQuery = query.toLowerCase().trim();
            plannerCards.forEach(card => {
                const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';
                if (cleanQuery === '' || tags.includes(cleanQuery)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        };

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                filterPlanners(e.target.value);
            });
        }

        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => {
                filterPlanners(searchInput.value);
                const plannersSection = document.getElementById('explore-planners');
                if (plannersSection) {
                    plannersSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }

        suggestChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const term = chip.innerText.trim();
                if (searchInput) {
                    searchInput.value = term;
                }
                filterPlanners(term);
                const plannersSection = document.getElementById('explore-planners');
                if (plannersSection) {
                    plannersSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    } catch (err) {
        console.error("Planner Search Error: ", err);
    }

    // ----------------------------------------------------
    // EXPLORE BY PLANNERS 3D FLOATING & PARALLAX
    // ----------------------------------------------------
    try {
        const plannerCards = document.querySelectorAll('.planner-card');
        plannerCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                
                // Tilt rotation calculations
                const angleX = (yc - y) / 10; 
                const angleY = (x - xc) / 8;
                
                card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
                
                // Layered parallax shifts
                const avatar = card.querySelector('.planner-avatar');
                const name = card.querySelector('.planner-name');
                const specialty = card.querySelector('.planner-specialty');
                const desc = card.querySelector('.planner-desc');
                const footer = card.querySelector('.planner-footer');
                
                if (avatar) avatar.style.transform = `translate3d(${(x - xc)/15}px, ${(y - yc)/15}px, 40px)`;
                if (name) name.style.transform = `translate3d(${(x - xc)/22}px, ${(y - yc)/22}px, 30px)`;
                if (specialty) specialty.style.transform = `translate3d(${(x - xc)/22}px, ${(y - yc)/22}px, 30px)`;
                if (desc) desc.style.transform = `translate3d(${(x - xc)/32}px, ${(y - yc)/32}px, 20px)`;
                if (footer) footer.style.transform = `translate3d(${(x - xc)/40}px, ${(y - yc)/40}px, 10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `rotateX(0deg) rotateY(0deg)`;
                
                const parallaxElements = card.querySelectorAll('.planner-avatar, .planner-name, .planner-specialty, .planner-desc, .planner-footer');
                parallaxElements.forEach(el => {
                    el.style.transform = `translate3d(0, 0, 0)`;
                    el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
                });
                
                setTimeout(() => {
                    parallaxElements.forEach(el => {
                        el.style.transition = '';
                    });
                }, 500);
            });
        });
    } catch (err) {
        console.error("Planner 3D Parallax Error: ", err);
    }

    // ----------------------------------------------------
    // PROGRAMMATIC BOOKMARK SAVE BUTTON INJECTION
    // ----------------------------------------------------
    try {
        const favButtons = document.querySelectorAll('.card-favorite-btn');
        favButtons.forEach(fav => {
            const parent = fav.parentElement;
            if (parent && !parent.querySelector('.card-save-btn')) {
                // Find card title from siblings or parent
                const cardDetails = parent.parentElement.querySelector('.card-details') || parent.parentElement.querySelector('.trending-card-info') || parent.parentElement.querySelector('.bespoke-details');
                const cardTitleEl = cardDetails ? (cardDetails.querySelector('.card-title') || cardDetails.querySelector('.bespoke-title')) : null;
                const title = cardTitleEl ? cardTitleEl.innerText.trim() : 'Premium Journey';

                const saveBtn = document.createElement('button');
                saveBtn.className = 'card-save-btn';
                saveBtn.dataset.title = title;
                saveBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`;
                
                parent.insertBefore(saveBtn, fav);
            }
        });
    } catch (err) {
        console.error("Save Button Injection Error: ", err);
    }

    // ----------------------------------------------------
    // SAVED PACKAGES ENGINE (LOCALSTORAGE + SYNC)
    // ----------------------------------------------------
    let savedList = JSON.parse(localStorage.getItem('beacon_saved_packages')) || [];

    const toggleSave = (title) => {
        const index = savedList.indexOf(title);
        if (index > -1) {
            savedList.splice(index, 1);
            showToast(`✓ Removed from My Collection`);
        } else {
            savedList.push(title);
            showToast(`✓ Saved to My Collection`);
        }
        localStorage.setItem('beacon_saved_packages', JSON.stringify(savedList));
        updateSavedProfileGrid();
        syncSaveButtonStates();
        
        // Refresh Collection panels if they are active
        if (typeof renderSavedTab === 'function') {
            renderSavedTab();
        }
        if (typeof renderCompareTab === 'function') {
            renderCompareTab();
        }
    };

    const syncSaveButtonStates = () => {
        const saveBtns = document.querySelectorAll('.card-save-btn, .card-favorite-btn');
        saveBtns.forEach(btn => {
            let title = btn.dataset.title;
            if (!title) {
                const parent = btn.closest('.travel-card') || btn.closest('.trending-curved-card') || btn.closest('.bespoke-card');
                const titleEl = parent ? (parent.querySelector('.card-title') || parent.querySelector('.bespoke-title')) : null;
                title = titleEl ? titleEl.innerText.trim() : null;
            }
            if (!title) return;
            
            if (savedList.includes(title)) {
                btn.classList.add('active');
                const svgPath = btn.querySelector('svg path');
                if (svgPath) {
                    svgPath.style.fill = '#00CBE0';
                }
            } else {
                btn.classList.remove('active');
                const svgPath = btn.querySelector('svg path');
                if (svgPath) {
                    svgPath.style.fill = 'none';
                }
            }
        });
    };

    // Body Event Delegation for save actions
    document.body.addEventListener('click', (e) => {
        const saveBtn = e.target.closest('.card-save-btn');
        if (saveBtn) {
            e.preventDefault();
            e.stopPropagation();
            const title = saveBtn.dataset.title;
            toggleSave(title);
            return;
        }

        const favBtn = e.target.closest('.card-favorite-btn');
        if (favBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get card title
            const parentCard = favBtn.closest('.travel-card') || favBtn.closest('.trending-curved-card') || favBtn.closest('.bespoke-card');
            const titleEl = parentCard ? (parentCard.querySelector('.card-title') || parentCard.querySelector('.bespoke-title')) : null;
            const title = favBtn.dataset.title || (titleEl ? titleEl.innerText.trim() : 'Premium Journey');
            
            // Animate heart click (scale pop)
            favBtn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                favBtn.style.transform = '';
            }, 200);

            toggleSave(title);
            return;
        }

        const shareBtn = e.target.closest('.card-share-btn');
        if (shareBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const title = shareBtn.dataset.title || 'Premium Journey';
            const matchedPkg = allPackagesData.find(p => p.title === title);
            if (matchedPkg) {
                openShareSheet(matchedPkg);
            } else {
                showToast("Cannot find package info.");
            }
            return;
        }
    });

    // ----------------------------------------------------
    // SPA TAB VIEW ROUTER ENGINE
    // ----------------------------------------------------
    let currentViewId = 'home';
    let previousViewId = 'home';
    let activeDetailsPkg = null;
    let viewScrollPositions = {};

    const navigateTo = (viewId, skipScrollRestore = false) => {
        // Save current scroll position before transitioning
        if (currentViewId) {
            viewScrollPositions[currentViewId] = window.scrollY;
        }
        
        // Track the previous view only when exiting regular nav pages to detail pages
        if (viewId !== 'package-details' && viewId !== 'planner-profile' && viewId !== 'mobile-booking' && viewId !== 'receipt-viewer' && viewId !== currentViewId) {
            previousViewId = currentViewId;
        }

        // Hide/Show mobile bottom navigation globally based on active view and screen width
        const mobNavGlobal = document.querySelector('.mobile-bottom-nav');
        if (mobNavGlobal) {
            const isMobile = window.innerWidth < 768;
            if (isMobile && (viewId === 'home' || viewId === 'planner' || viewId === 'collection' || viewId === 'trips' || viewId === 'profile')) {
                mobNavGlobal.style.display = 'flex';
            } else {
                mobNavGlobal.style.display = 'none';
            }
        }

        const views = document.querySelectorAll('.spa-view');
        views.forEach(v => {
            v.classList.remove('active-view');
        });
        const activeView = document.getElementById(`view-${viewId}`);
        if (activeView) {
            activeView.classList.add('active-view');
        }
        
        // Update nav active link states
        const navLinks = document.querySelectorAll('.nav-link-item');
        navLinks.forEach(link => {
            if (link.dataset.target === viewId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Animate mobile bottom navigation active indicator bar
        const mobileNavLinks = document.querySelectorAll('.mobile-bottom-nav .nav-link-item');
        const activeNavIdx = Array.from(mobileNavLinks).findIndex(link => link.dataset.target === viewId);
        const navIndicator = document.querySelector('.mobile-nav-indicator');
        if (navIndicator && activeNavIdx !== -1) {
            navIndicator.style.transform = `translateX(${activeNavIdx * 100}%)`;
        }

        if (viewId === 'collection') {
            if (typeof renderSavedTab === 'function') renderSavedTab();
            if (typeof initCollectionPage === 'function') initCollectionPage();
        }
        if (viewId === 'payments') {
            if (typeof renderPaymentsDashboard === 'function') renderPaymentsDashboard();
        }
        if (viewId === 'enquiries') {
            if (typeof window.clearEnquiryNotifications === 'function') {
                window.clearEnquiryNotifications();
            }
        }

        currentViewId = viewId;
        if (window.checkStickyCtaVisibility) window.checkStickyCtaVisibility();

        // Restore scroll coordinate or scroll to top
        if (skipScrollRestore) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
            const savedScroll = viewScrollPositions[viewId] || 0;
            window.scrollTo({ top: savedScroll, behavior: 'instant' });
        }
    };

    const navLinks = document.querySelectorAll('.nav-link-item');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            navigateTo(target);
        });
    });

    // Redirect logo clicks to home view
    const logoLinks = document.querySelectorAll('.logo5');
    logoLinks.forEach(logoLink => {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    });

    // Home page search redirection to Trip Planner page
    const handleHomeSearchRedirect = (val) => {
        if (!val) return;
        navigateTo('planner');
        
        // Reset planner fields before setting
        const destInput = document.getElementById('match-destination');
        const durSelect = document.getElementById('match-duration');
        const budgetSlider = document.getElementById('match-budget-slider');
        const budgetReadout = document.getElementById('match-budget-readout');
        const tripStyleChips = document.querySelectorAll('#match-trip-styles .multi-chip');
        const prefChecks = document.querySelectorAll('input[name="match-pref"]');
        const findBtn = document.getElementById('find-my-trip-btn');

        if (destInput) destInput.value = '';
        if (durSelect) durSelect.value = 'all';
        if (budgetSlider) {
            budgetSlider.value = 300000;
            if (budgetReadout) budgetReadout.innerText = '₹3,00,000+';
        }
        tripStyleChips.forEach(c => c.classList.remove('active'));
        prefChecks.forEach(c => c.checked = false);

        const clean = val.toLowerCase().trim();

        // 1. Budget check
        const budgetMatch = clean.match(/under\s*₹?\s*(\d+)/) || clean.match(/budget\s*of\s*₹?\s*(\d+)/) || clean.match(/₹?\s*(\d+)/);
        if (budgetMatch) {
            const rawVal = budgetMatch[1];
            const parsedBudget = parseInt(rawVal);
            if (parsedBudget >= 5000 && budgetSlider) {
                budgetSlider.value = parsedBudget;
                if (budgetReadout) budgetReadout.innerText = `₹${parsedBudget.toLocaleString()}`;
            }
        }

        // 2. Duration check
        const durationMatch = clean.match(/(\d+)\s*day/);
        if (durationMatch && durSelect) {
            const days = parseInt(durationMatch[1]);
            if (days <= 2) durSelect.value = 'weekend';
            else if (days >= 3 && days <= 5) durSelect.value = 'short';
            else if (days >= 6 && days <= 8) durSelect.value = 'medium';
            else if (days >= 10) durSelect.value = 'long';
        } else if (clean.includes('weekend') && durSelect) {
            durSelect.value = 'weekend';
        }

        // 3. Travel Styles check
        const styles = ['solo', 'couple', 'honeymoon', 'friends', 'family', 'adventure', 'luxury', 'spiritual', 'backpacking', 'nature'];
        styles.forEach(style => {
            if (clean.includes(style)) {
                tripStyleChips.forEach(chip => {
                    if (chip.dataset.style === style) {
                        chip.classList.add('active');
                    }
                });
            }
        });

        // 4. Destination match
        const isBud = budgetMatch;
        const isDur = durationMatch || clean.includes('day') || clean.includes('weekend');
        const isStyle = styles.some(st => clean.includes(st));
        
        if (!isBud && !isDur && !isStyle && destInput) {
            destInput.value = val.charAt(0).toUpperCase() + val.slice(1);
        }

        // Trigger AI Matchmaker search
        setTimeout(() => {
            if (findBtn) findBtn.click();
        }, 300);
    };

    const homeSearchInput = document.getElementById('panel-search-input');
    const homeSearchBtn = document.getElementById('panel-search-submit-btn');
    const homeSuggestChips = document.querySelectorAll('.popular-chip');
    const panelVoiceBtn = document.getElementById('panel-voice-btn');

    if (homeSearchBtn && homeSearchInput) {
        homeSearchBtn.addEventListener('click', () => {
            const val = homeSearchInput.value.trim();
            handleHomeSearchRedirect(val);
        });

        homeSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const val = homeSearchInput.value.trim();
                handleHomeSearchRedirect(val);
            }
        });
    }

    homeSuggestChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Strip emojis from chip text e.g. "🏝️ Goa" -> "Goa"
            const val = chip.innerText.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
            handleHomeSearchRedirect(val);
        });
    });

    if (panelVoiceBtn) {
        panelVoiceBtn.addEventListener('click', () => {
            showToast("🎙️ Active Listening... Speak your destination or budget!");
            panelVoiceBtn.classList.add('active-listen-glow');
            setTimeout(() => {
                panelVoiceBtn.classList.remove('active-listen-glow');
                const val = "Honeymoon under ₹50,000";
                if (homeSearchInput) homeSearchInput.value = val;
                handleHomeSearchRedirect(val);
            }, 2500);
        });
    }

    // View Modes
    const viewModeTabs = document.querySelectorAll('.view-mode-tab');
    const searchModeContainers = document.querySelectorAll('.search-mode-container');
    const compareTabBtn = document.getElementById('compare-tab-btn');

    // Load planner-created packages from localStorage and translate them
    const getPlannerPackages = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('beacon_planner_packages')) || [];
            return saved.filter(p => p.status === 'published').map(p => {
                const priceNum = p.priceNum || (p.price ? (p.price > 10000 ? p.price : p.price * 85) : 25000);
                const durationVal = typeof p.duration === 'number' ? p.duration : parseInt(p.duration) || 5;
                return {
                    title: p.title,
                    imgUrl: p.image || p.imgUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
                    priceStr: p.priceStr || ("₹" + priceNum.toLocaleString()),
                    priceNum: priceNum,
                    duration: durationVal,
                    category: p.category || (p.destination && p.destination.toLowerCase()) || "beaches",
                    rating: "⭐ " + (p.rating || 5.0),
                    reviews: p.reviews || 12,
                    style: p.style || "couple",
                    experiences: p.experiences || "sightseeing",
                    transport: p.transport || "flight",
                    accommodation: p.accommodation || "resort",
                    offers: p.offers || "cancellation",
                    highlights: p.highlights || p.description || "Beautiful travel package created by our planner partners.",
                    meals: p.meals || "Breakfast Included",
                    sightseeing: p.sightseeing || p.destination || "Local sightseeing tours",
                    transfers: p.transfers || "Airport pickup & drop cabs",
                    cancellation: p.cancellation || "Free cancellation within 24 hours",
                    hotelName: p.hotelName || "Luxury Resort Accommodations",
                    hotelAddress: p.hotelAddress || p.destination || "Premium partner property",
                    latitude: p.lat || p.latitude || 5.69,
                    longitude: p.lng || p.longitude || 73.31,
                    inclusions: Array.isArray(p.inclusions) ? p.inclusions.join(', ') : (p.inclusions || "Stay, transfers, dinners"),
                    exclusions: Array.isArray(p.exclusions) ? p.exclusions.join(', ') : (p.exclusions || "Flight fares, Personal shopping"),
                    bookingsCount: p.bookings || 0,
                    isPlannerAdded: true
                };
            });
        } catch (e) {
            console.error("Failed to parse planner packages", e);
            return [];
        }
    };

    // Rich hardcoded travel package search dataset
    let defaultPackages = [
        {
            title: "Goa Beachfront Honeymoon Villa",
            imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹28,000",
            priceNum: 28000,
            duration: 5,
            category: "beaches",
            rating: "⭐ 4.9",
            reviews: 142,
            style: "couple",
            experiences: "watersports",
            transport: "flight",
            accommodation: "resort",
            offers: "cancellation",
            highlights: "Private beach access, candlelit dinner, sunset yacht cruise",
            meals: "All Inclusive",
            sightseeing: "Calangute Beach, Fort Aguada, Dudhsagar Falls",
            transfers: "Airport private cab",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Soneva Jani Resort & Villas",
            hotelAddress: "Medhufaru Island, Noonu Atoll, Maldives",
            latitude: 5.69,
            longitude: 73.31,
            inclusions: "Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",
            exclusions: "Water sports gear rentals, Personal shopping, Travel insurance",
            bookingsCount: 24
        },
        {
            title: "Marari Beach Family Oasis",
            imgUrl: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹22,000",
            priceNum: 22000,
            duration: 4,
            category: "beaches",
            rating: "⭐ 4.8",
            reviews: 98,
            style: "family",
            experiences: "cultural",
            transport: "train",
            accommodation: "resort",
            offers: "emi",
            highlights: "Beachside volleyball, family organic garden tour, traditional cooking class",
            meals: "Full Board",
            sightseeing: "Marari beach, Alleppey backwaters, Arthunkal Church",
            transfers: "Station shuttle",
            cancellation: "Free cancellation within 48 hours",
            hotelName: "Soneva Jani Resort & Villas",
            hotelAddress: "Medhufaru Island, Noonu Atoll, Maldives",
            latitude: 5.69,
            longitude: 73.31,
            inclusions: "Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",
            exclusions: "Water sports gear rentals, Personal shopping, Travel insurance",
            bookingsCount: 24
        },
        {
            title: "Gokarna Surf & Cliffs Expedition",
            imgUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹12,500",
            priceNum: 12500,
            duration: 3,
            category: "beaches",
            rating: "⭐ 4.7",
            reviews: 115,
            style: "adventure",
            experiences: "adventure",
            transport: "bus",
            accommodation: "homestay",
            offers: "instant",
            highlights: "Professional surfing lessons, beach trekking, cliffside camping",
            meals: "Breakfast",
            sightseeing: "Om Beach, Half Moon Beach, Paradise Beach",
            transfers: "Local guide driver",
            cancellation: "Non-refundable promo",
            hotelName: "Soneva Jani Resort & Villas",
            hotelAddress: "Medhufaru Island, Noonu Atoll, Maldives",
            latitude: 5.69,
            longitude: 73.31,
            inclusions: "Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",
            exclusions: "Water sports gear rentals, Personal shopping, Travel insurance",
            bookingsCount: 24
        },
        {
            title: "Havelock Island Beach Resort",
            imgUrl: "https://images.unsplash.com/photo-1589979482837-e74f2e145060?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹75,000",
            priceNum: 75000,
            duration: 5,
            category: "beaches",
            rating: "⭐ 5.0",
            reviews: 64,
            style: "luxury",
            experiences: "scuba",
            transport: "flight",
            accommodation: "villa",
            offers: "cancellation",
            highlights: "Private villa pool, scuba diving certification, coral reef exploration",
            meals: "All Inclusive",
            sightseeing: "Radhanagar Beach, Elephant Beach, Kalapathar Beach",
            transfers: "Private jetty transfer",
            cancellation: "Free cancellation within 7 days",
            hotelName: "Soneva Jani Resort & Villas",
            hotelAddress: "Medhufaru Island, Noonu Atoll, Maldives",
            latitude: 5.69,
            longitude: 73.31,
            inclusions: "Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",
            exclusions: "Water sports gear rentals, Personal shopping, Travel insurance",
            bookingsCount: 24
        },
        {
            title: "Puri Beach Temple Sanctuary",
            imgUrl: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹9,500",
            priceNum: 9500,
            duration: 3,
            category: "beaches",
            rating: "⭐ 4.6",
            reviews: 82,
            style: "spiritual",
            experiences: "temple",
            transport: "train",
            accommodation: "hotel",
            offers: "instant",
            highlights: "Special VIP darshan slot, beach arati viewing, temple prasad meals",
            meals: "Full Board",
            sightseeing: "Jagannath Temple, Puri Beach, Konark Sun Temple",
            transfers: "Station cab transfer",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Soneva Jani Resort & Villas",
            hotelAddress: "Medhufaru Island, Noonu Atoll, Maldives",
            latitude: 5.69,
            longitude: 73.31,
            inclusions: "Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",
            exclusions: "Water sports gear rentals, Personal shopping, Travel insurance",
            bookingsCount: 24
        },
        {
            title: "Varkala Cliffside Solo Backpacker",
            imgUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹6,800",
            priceNum: 6800,
            duration: 4,
            category: "beaches",
            rating: "⭐ 4.8",
            reviews: 73,
            style: "solo",
            experiences: "backwaters",
            transport: "train",
            accommodation: "hostel",
            offers: "instant",
            highlights: "Cliffside hostel stay, daily morning yoga, cafe crawling vouchers",
            meals: "Breakfast",
            sightseeing: "Varkala Beach, Janardhana Swami Temple, Edava Beach",
            transfers: "Self-driven scooter",
            cancellation: "Non-refundable promo",
            hotelName: "Soneva Jani Resort & Villas",
            hotelAddress: "Medhufaru Island, Noonu Atoll, Maldives",
            latitude: 5.69,
            longitude: 73.31,
            inclusions: "Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",
            exclusions: "Water sports gear rentals, Personal shopping, Travel insurance",
            bookingsCount: 24
        },
        {
            title: "Gulmarg Snow Igloo Couples Escape",
            imgUrl: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹42,000",
            priceNum: 42000,
            duration: 5,
            category: "mountains",
            rating: "⭐ 4.9",
            reviews: 110,
            style: "couple",
            experiences: "snow",
            transport: "flight",
            accommodation: "villa",
            offers: "cancellation",
            highlights: "Stay in luxury heated snow igloo, private Gondola ride, ski lesson",
            meals: "Half Board",
            sightseeing: "Gulmarg Gondola, Apharwat Peak, Strawberry Valley",
            transfers: "Airport private 4x4",
            cancellation: "Free cancellation within 5 days",
            hotelName: "Khyber Mountain Resort & Spa",
            hotelAddress: "Gulmarg Ski Slopes Road, Kashmir, India",
            latitude: 34.05,
            longitude: 74.38,
            inclusions: "Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",
            exclusions: "Ski equipment rental, Mountain pass permits, Tips & Gratuities",
            bookingsCount: 18
        },
        {
            title: "Shimla Mall Road Family Suite",
            imgUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹18,500",
            priceNum: 18500,
            duration: 4,
            category: "mountains",
            rating: "⭐ 4.7",
            reviews: 154,
            style: "family",
            experiences: "snow",
            transport: "train",
            accommodation: "hotel",
            offers: "emi",
            highlights: "Toy train ride ticket, heritage walk tour, bonfire night",
            meals: "Breakfast",
            sightseeing: "The Ridge, Jakhoo Temple, Kufri Fun World",
            transfers: "Station shuttle",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Khyber Mountain Resort & Spa",
            hotelAddress: "Gulmarg Ski Slopes Road, Kashmir, India",
            latitude: 34.05,
            longitude: 74.38,
            inclusions: "Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",
            exclusions: "Ski equipment rental, Mountain pass permits, Tips & Gratuities",
            bookingsCount: 18
        },
        {
            title: "Leh Ladakh Bike Expedition",
            imgUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹32,000",
            priceNum: 32000,
            duration: 7,
            category: "mountains",
            rating: "⭐ 4.9",
            reviews: 235,
            style: "adventure",
            experiences: "adventure",
            transport: "selfdrive",
            accommodation: "camp",
            offers: "cancellation",
            highlights: "Royal Enfield rental, high mountain pass crossings, lake camping",
            meals: "All Inclusive",
            sightseeing: "Pangong Lake, Khardung La, Nubra Valley",
            transfers: "Backup vehicle mechanic",
            cancellation: "Free cancellation within 7 days",
            hotelName: "Khyber Mountain Resort & Spa",
            hotelAddress: "Gulmarg Ski Slopes Road, Kashmir, India",
            latitude: 34.05,
            longitude: 74.38,
            inclusions: "Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",
            exclusions: "Ski equipment rental, Mountain pass permits, Tips & Gratuities",
            bookingsCount: 18
        },
        {
            title: "Manali Luxury Cedar Chalet",
            imgUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹65,000",
            priceNum: 65000,
            duration: 5,
            category: "mountains",
            rating: "⭐ 4.9",
            reviews: 88,
            style: "luxury",
            experiences: "snow",
            transport: "flight",
            accommodation: "villa",
            offers: "cancellation",
            highlights: "Private cedar forest chalet, hot spring baths, fine dining dining",
            meals: "All Inclusive",
            sightseeing: "Solang Valley, Hadimba Temple, Jogini Waterfall",
            transfers: "Airport private cab",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Khyber Mountain Resort & Spa",
            hotelAddress: "Gulmarg Ski Slopes Road, Kashmir, India",
            latitude: 34.05,
            longitude: 74.38,
            inclusions: "Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",
            exclusions: "Ski equipment rental, Mountain pass permits, Tips & Gratuities",
            bookingsCount: 18
        },
        {
            title: "Kedarnath Pilgrimage Trail Lodge",
            imgUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹11,500",
            priceNum: 11500,
            duration: 4,
            category: "mountains",
            rating: "⭐ 4.8",
            reviews: 210,
            style: "spiritual",
            experiences: "temple",
            transport: "train",
            accommodation: "hotel",
            offers: "instant",
            highlights: "Pre-booked helper/pony slots, biometric pass, special puja booking",
            meals: "Full Board",
            sightseeing: "Kedarnath Temple, Bhairav Temple, Gauri Kund",
            transfers: "Trek start shuttle",
            cancellation: "Non-refundable promo",
            hotelName: "Khyber Mountain Resort & Spa",
            hotelAddress: "Gulmarg Ski Slopes Road, Kashmir, India",
            latitude: 34.05,
            longitude: 74.38,
            inclusions: "Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",
            exclusions: "Ski equipment rental, Mountain pass permits, Tips & Gratuities",
            bookingsCount: 18
        },
        {
            title: "Kasol Parvati Valley Solo Cabin",
            imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹7,500",
            priceNum: 7500,
            duration: 3,
            category: "mountains",
            rating: "⭐ 4.7",
            reviews: 128,
            style: "solo",
            experiences: "nature",
            transport: "bus",
            accommodation: "homestay",
            offers: "instant",
            highlights: "Wood cabin riverside, trek guiding to Chalal, cafe vouchers",
            meals: "Breakfast",
            sightseeing: "Parvati River, Manikaran Sahib, Tosh Village",
            transfers: "Self-driven scooter",
            cancellation: "Non-refundable promo",
            hotelName: "Khyber Mountain Resort & Spa",
            hotelAddress: "Gulmarg Ski Slopes Road, Kashmir, India",
            latitude: 34.05,
            longitude: 74.38,
            inclusions: "Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",
            exclusions: "Ski equipment rental, Mountain pass permits, Tips & Gratuities",
            bookingsCount: 18
        },
        {
            title: "Wayanad Treehouse Escape",
            imgUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹24,000",
            priceNum: 24000,
            duration: 3,
            category: "nature",
            rating: "⭐ 4.8",
            reviews: 92,
            style: "couple",
            experiences: "forest",
            transport: "flight",
            accommodation: "resort",
            offers: "cancellation",
            highlights: "Luxury high-rise treehouse stay, private forest walk, waterfall bath",
            meals: "Breakfast",
            sightseeing: "Edakkal Caves, Banasura Sagar Dam, Chembra Peak",
            transfers: "Airport private cab",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Kabini Riverfront Safari Villas",
            hotelAddress: "Kabini Reservoir Road, Nagarhole, Karnataka, India",
            latitude: 11.92,
            longitude: 76.27,
            inclusions: "Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",
            exclusions: "Camera equipment fees, Personal laundry, Night safaris",
            bookingsCount: 15
        },
        {
            title: "Ooty Botanical Gardens Retreat",
            imgUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹14,000",
            priceNum: 14000,
            duration: 4,
            category: "nature",
            rating: "⭐ 4.6",
            reviews: 138,
            style: "family",
            experiences: "lakes",
            transport: "train",
            accommodation: "hotel",
            offers: "emi",
            highlights: "Private boat ride in Ooty lake, pine forest walk, tea factory tour",
            meals: "Breakfast",
            sightseeing: "Ooty Lake, Doddabetta Peak, Rose Garden",
            transfers: "Station shuttle",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Kabini Riverfront Safari Villas",
            hotelAddress: "Kabini Reservoir Road, Nagarhole, Karnataka, India",
            latitude: 11.92,
            longitude: 76.27,
            inclusions: "Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",
            exclusions: "Camera equipment fees, Personal laundry, Night safaris",
            bookingsCount: 15
        },
        {
            title: "Jim Corbett Wildlife Jeep Safari",
            imgUrl: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹16,500",
            priceNum: 16500,
            duration: 3,
            category: "nature",
            rating: "⭐ 4.7",
            reviews: 182,
            style: "adventure",
            experiences: "wildlife",
            transport: "bus",
            accommodation: "resort",
            offers: "instant",
            highlights: "Two jungle jeep safaris, expert naturalist guide, river rafting",
            meals: "Full Board",
            sightseeing: "Corbett Tiger Reserve, Garjiya Devi Temple, Corbett Falls",
            transfers: "Resort shuttle",
            cancellation: "Free cancellation within 48 hours",
            hotelName: "Kabini Riverfront Safari Villas",
            hotelAddress: "Kabini Reservoir Road, Nagarhole, Karnataka, India",
            latitude: 11.92,
            longitude: 76.27,
            inclusions: "Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",
            exclusions: "Camera equipment fees, Personal laundry, Night safaris",
            bookingsCount: 15
        },
        {
            title: "Kabini Riverfront Luxury Lodge",
            imgUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹85,000",
            priceNum: 85000,
            duration: 5,
            category: "nature",
            rating: "⭐ 5.0",
            reviews: 46,
            style: "luxury",
            experiences: "wildlife",
            transport: "flight",
            accommodation: "villa",
            offers: "cancellation",
            highlights: "Private pool cottage, boat safari, premium tiger tracking guides",
            meals: "All Inclusive",
            sightseeing: "Kabini River, Nagarhole National Park, Backwaters",
            transfers: "Airport private cab",
            cancellation: "Free cancellation within 7 days",
            hotelName: "Kabini Riverfront Safari Villas",
            hotelAddress: "Kabini Reservoir Road, Nagarhole, Karnataka, India",
            latitude: 11.92,
            longitude: 76.27,
            inclusions: "Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",
            exclusions: "Camera equipment fees, Personal laundry, Night safaris",
            bookingsCount: 15
        },
        {
            title: "Rishikesh Forest Yoga Ashram",
            imgUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹8,000",
            priceNum: 8000,
            duration: 5,
            category: "nature",
            rating: "⭐ 4.8",
            reviews: 194,
            style: "spiritual",
            experiences: "cultural",
            transport: "train",
            accommodation: "homestay",
            offers: "instant",
            highlights: "Daily yoga classes, organic vegan diet, meditation hall, forest walks",
            meals: "All Inclusive",
            sightseeing: "Triveni Ghat, Laxman Jhula, Beatles Ashram",
            transfers: "Station shuttle",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Kabini Riverfront Safari Villas",
            hotelAddress: "Kabini Reservoir Road, Nagarhole, Karnataka, India",
            latitude: 11.92,
            longitude: 76.27,
            inclusions: "Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",
            exclusions: "Camera equipment fees, Personal laundry, Night safaris",
            bookingsCount: 15
        },
        {
            title: "Coorg Coffee Estate Solo Villa",
            imgUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹10,500",
            priceNum: 10500,
            duration: 4,
            category: "nature",
            rating: "⭐ 4.7",
            reviews: 84,
            style: "solo",
            experiences: "forest",
            transport: "train",
            accommodation: "homestay",
            offers: "instant",
            highlights: "Stay inside working coffee plantation, hiking trail guides, bonfire",
            meals: "Breakfast",
            sightseeing: "Abbey Falls, Raja's Seat, Dubare Elephant Camp",
            transfers: "Self-driven scooter",
            cancellation: "Non-refundable promo",
            hotelName: "Kabini Riverfront Safari Villas",
            hotelAddress: "Kabini Reservoir Road, Nagarhole, Karnataka, India",
            latitude: 11.92,
            longitude: 76.27,
            inclusions: "Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",
            exclusions: "Camera equipment fees, Personal laundry, Night safaris",
            bookingsCount: 15
        },
        {
            title: "Varanasi Ganges Twilight Ritual",
            imgUrl: "https://images.unsplash.com/photo-1561361062-856c4ab3d997?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹15,000",
            priceNum: 15000,
            duration: 3,
            category: "spiritual",
            rating: "⭐ 4.9",
            reviews: 230,
            style: "couple",
            experiences: "temple",
            transport: "flight",
            accommodation: "hotel",
            offers: "cancellation",
            highlights: "Private boat for Ganga Arati, early morning subah-e-banaras tour",
            meals: "Breakfast",
            sightseeing: "Kashi Vishwanath Temple, Dashashwamedh Ghat, Sarnath",
            transfers: "Airport private cab",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Ganges Meditation Ashram & Residency",
            hotelAddress: "Triveni Ghat Road, Rishikesh, Uttarakhand, India",
            latitude: 30.08,
            longitude: 78.26,
            inclusions: "Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",
            exclusions: "Personal pooja offerings, Temple donations, Personal shopping",
            bookingsCount: 32
        },
        {
            title: "Tirupati Balaji Darshan Family Package",
            imgUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹12,000",
            priceNum: 12000,
            duration: 3,
            category: "spiritual",
            rating: "⭐ 4.8",
            reviews: 312,
            style: "family",
            experiences: "temple",
            transport: "train",
            accommodation: "hotel",
            offers: "instant",
            highlights: "Confirmed Special Entry Darshan Tickets, laddu prasadam, local temples",
            meals: "Full Board",
            sightseeing: "Tirumala Venkateswara Temple, Padmavathi Temple, Kapila Theertham",
            transfers: "Station private cab",
            cancellation: "Non-refundable promo",
            hotelName: "Ganges Meditation Ashram & Residency",
            hotelAddress: "Triveni Ghat Road, Rishikesh, Uttarakhand, India",
            latitude: 30.08,
            longitude: 78.26,
            inclusions: "Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",
            exclusions: "Personal pooja offerings, Temple donations, Personal shopping",
            bookingsCount: 32
        },
        {
            title: "Hemkund Sahib Alpine Trek",
            imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹18,000",
            priceNum: 18000,
            duration: 5,
            category: "spiritual",
            rating: "⭐ 4.8",
            reviews: 76,
            style: "adventure",
            experiences: "adventure",
            transport: "train",
            accommodation: "hotel",
            offers: "emi",
            highlights: "Guided alpine trek, stay at base camp, scenic mountain photography",
            meals: "Full Board",
            sightseeing: "Hemkund Sahib, Valley of Flowers, Joshimath",
            transfers: "Trek start shuttle",
            cancellation: "Free cancellation within 48 hours",
            hotelName: "Ganges Meditation Ashram & Residency",
            hotelAddress: "Triveni Ghat Road, Rishikesh, Uttarakhand, India",
            latitude: 30.08,
            longitude: 78.26,
            inclusions: "Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",
            exclusions: "Personal pooja offerings, Temple donations, Personal shopping",
            bookingsCount: 32
        },
        {
            title: "Ananda Himalayas Spiritual Wellness",
            imgUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹1,20,000",
            priceNum: 120000,
            duration: 5,
            category: "spiritual",
            rating: "⭐ 5.0",
            reviews: 34,
            style: "luxury",
            experiences: "spa",
            transport: "flight",
            accommodation: "resort",
            offers: "cancellation",
            highlights: "Palace estate stay, personalized wellness consult, luxury spa therapies",
            meals: "All Inclusive",
            sightseeing: "Rishikesh ghats, Haridwar arati, Himalayan trails",
            transfers: "Airport private cab",
            cancellation: "Free cancellation within 14 days",
            hotelName: "Ganges Meditation Ashram & Residency",
            hotelAddress: "Triveni Ghat Road, Rishikesh, Uttarakhand, India",
            latitude: 30.08,
            longitude: 78.26,
            inclusions: "Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",
            exclusions: "Personal pooja offerings, Temple donations, Personal shopping",
            bookingsCount: 32
        },
        {
            title: "Haridwar Meditation & Yoga Ashram",
            imgUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹6,500",
            priceNum: 6500,
            duration: 4,
            category: "spiritual",
            rating: "⭐ 4.7",
            reviews: 142,
            style: "spiritual",
            experiences: "cultural",
            transport: "train",
            accommodation: "homestay",
            offers: "instant",
            highlights: "Ashram meditation halls, ganga river dip escort, daily sat-sang talks",
            meals: "All Inclusive",
            sightseeing: "Har Ki Pauri, Mansa Devi Temple, Chandi Devi Temple",
            transfers: "Station shuttle",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Ganges Meditation Ashram & Residency",
            hotelAddress: "Triveni Ghat Road, Rishikesh, Uttarakhand, India",
            latitude: 30.08,
            longitude: 78.26,
            inclusions: "Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",
            exclusions: "Personal pooja offerings, Temple donations, Personal shopping",
            bookingsCount: 32
        },
        {
            title: "Amritsar Golden Temple Solo Peace",
            imgUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹5,500",
            priceNum: 5500,
            duration: 2,
            category: "spiritual",
            rating: "⭐ 4.9",
            reviews: 119,
            style: "solo",
            experiences: "cultural",
            transport: "train",
            accommodation: "hotel",
            offers: "instant",
            highlights: "Night darshan entry, Langar kitchen service volunteer slot, Wagah border",
            meals: "Breakfast",
            sightseeing: "Golden Temple, Jallianwala Bagh, Wagah Border",
            transfers: "Station cab transfer",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Ganges Meditation Ashram & Residency",
            hotelAddress: "Triveni Ghat Road, Rishikesh, Uttarakhand, India",
            latitude: 30.08,
            longitude: 78.26,
            inclusions: "Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",
            exclusions: "Personal pooja offerings, Temple donations, Personal shopping",
            bookingsCount: 32
        },
        {
            title: "Maldives Overwater Romantic Bungalow",
            imgUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹1,35,000",
            priceNum: 135000,
            duration: 5,
            category: "international",
            rating: "⭐ 5.0",
            reviews: 167,
            style: "couple",
            experiences: "scuba",
            transport: "flight",
            accommodation: "resort",
            offers: "cancellation",
            highlights: "Overwater villa stay, private sea access, couples lagoon massage",
            meals: "All Inclusive",
            sightseeing: "Male Atoll, Coral Reefs, Sandbank picnic",
            transfers: "Speedboat private return",
            cancellation: "Free cancellation within 7 days",
            hotelName: "Ubud Hanging Gardens Resort",
            hotelAddress: "Payangan, Ubud, Bali, Indonesia",
            latitude: -8.5,
            longitude: 115.26,
            inclusions: "International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",
            exclusions: "Tourist Visa fees, Departure taxes, Personal shopping",
            bookingsCount: 42
        },
        {
            title: "Singapore Sentosa Island Family Fun",
            imgUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹88,000",
            priceNum: 88000,
            duration: 6,
            category: "international",
            rating: "⭐ 4.8",
            reviews: 142,
            style: "family",
            experiences: "city",
            transport: "flight",
            accommodation: "hotel",
            offers: "emi",
            highlights: "Universal Studios tickets, Gardens by the Bay passes, night safari",
            meals: "Breakfast",
            sightseeing: "Sentosa Island, Marina Bay Sands, Universal Studios",
            transfers: "Airport private shuttle",
            cancellation: "Free cancellation within 3 days",
            hotelName: "Ubud Hanging Gardens Resort",
            hotelAddress: "Payangan, Ubud, Bali, Indonesia",
            latitude: -8.5,
            longitude: 115.26,
            inclusions: "International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",
            exclusions: "Tourist Visa fees, Departure taxes, Personal shopping",
            bookingsCount: 42
        },
        {
            title: "Nepal Everest Base Camp Trek",
            imgUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹48,000",
            priceNum: 48000,
            duration: 7,
            category: "international",
            rating: "⭐ 4.9",
            reviews: 182,
            style: "adventure",
            experiences: "trekking",
            transport: "flight",
            accommodation: "hotel",
            offers: "cancellation",
            highlights: "Experienced Sherpa guides, hot tea-house stays, scenic mountain flight",
            meals: "All Inclusive",
            sightseeing: "Lukla Airport, Namche Bazaar, Everest Base Camp",
            transfers: "Airport heli pickup",
            cancellation: "Free cancellation within 10 days",
            hotelName: "Ubud Hanging Gardens Resort",
            hotelAddress: "Payangan, Ubud, Bali, Indonesia",
            latitude: -8.5,
            longitude: 115.26,
            inclusions: "International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",
            exclusions: "Tourist Visa fees, Departure taxes, Personal shopping",
            bookingsCount: 42
        },
        {
            title: "Dubai Marina Yacht Luxury Suite",
            imgUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹1,15,000",
            priceNum: 115000,
            duration: 4,
            category: "international",
            rating: "⭐ 4.9",
            reviews: 92,
            style: "luxury",
            experiences: "city",
            transport: "flight",
            accommodation: "hotel",
            offers: "cancellation",
            highlights: "Burj Khalifa 148th floor VIP slots, desert safari luxury dune dinner",
            meals: "Half Board",
            sightseeing: "Burj Khalifa, Palm Jumeirah, Dubai Mall",
            transfers: "Limousine return shuttle",
            cancellation: "Free cancellation within 5 days",
            hotelName: "Ubud Hanging Gardens Resort",
            hotelAddress: "Payangan, Ubud, Bali, Indonesia",
            latitude: -8.5,
            longitude: 115.26,
            inclusions: "International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",
            exclusions: "Tourist Visa fees, Departure taxes, Personal shopping",
            bookingsCount: 42
        },
        {
            title: "Bali Ubud Sacred Temples Retreat",
            imgUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹62,000",
            priceNum: 62000,
            duration: 6,
            category: "international",
            rating: "⭐ 4.8",
            reviews: 154,
            style: "spiritual",
            experiences: "temple",
            transport: "flight",
            accommodation: "resort",
            offers: "emi",
            highlights: "Sacred water purification ritual, private yoga classes, rice terrace walks",
            meals: "Breakfast",
            sightseeing: "Ubud Monkey Forest, Tanah Lot Temple, Tegallalang Rice Terraces",
            transfers: "Airport private cab",
            cancellation: "Free cancellation within 48 hours",
            hotelName: "Ubud Hanging Gardens Resort",
            hotelAddress: "Payangan, Ubud, Bali, Indonesia",
            latitude: -8.5,
            longitude: 115.26,
            inclusions: "International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",
            exclusions: "Tourist Visa fees, Departure taxes, Personal shopping",
            bookingsCount: 42
        },
        {
            title: "Thailand Solo Backpacking Explorer",
            imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            priceStr: "₹32,000",
            priceNum: 32000,
            duration: 7,
            category: "international",
            rating: "⭐ 4.7",
            reviews: 204,
            style: "solo",
            experiences: "beaches",
            transport: "flight",
            accommodation: "hostel",
            offers: "instant",
            highlights: "Island hopping tour, hostel welcome crawl, street food vouchers",
            meals: "Breakfast",
            sightseeing: "Bangkok Grand Palace, Phi Phi Islands, Chiang Mai Night Bazaar",
            transfers: "Local scooter rental",
            cancellation: "Free cancellation within 24 hours",
            hotelName: "Ubud Hanging Gardens Resort",
            hotelAddress: "Payangan, Ubud, Bali, Indonesia",
            latitude: -8.5,
            longitude: 115.26,
            inclusions: "International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",
            exclusions: "Tourist Visa fees, Departure taxes, Personal shopping",
            bookingsCount: 42
        }
    ];

    allPackagesData = [...getPlannerPackages(), ...defaultPackages];

    // Toggle different visual Search views (List, Map, Compare)
    viewModeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            viewModeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const mode = tab.dataset.mode;
            searchModeContainers.forEach(container => {
                container.classList.remove('active-mode');
                if (container.id === `search-${mode}-container`) {
                    container.classList.add('active-mode');
                }
            });

            if (mode === 'compare') {
                renderCompareViewTable();
            }
        });
    });

    // ----------------------------------------------------
    // ----------------------------------------------------
    // SECTION 2: TRIP MATCHMAKER (AI TRIP PLANNER) LOGIC
    // ----------------------------------------------------
    let currentMinBudget = 1000;
    let currentMaxBudget = 150000;
    const inputMin = document.getElementById('match-budget-min');
    const inputMax = document.getElementById('match-budget-max');
    const sliderTrack = document.getElementById('slider-track');
    const budgetReadout = document.getElementById('match-budget-readout');

    const startDateInput = document.getElementById('match-start-date');
    const endDateInput = document.getElementById('match-end-date');
    const durationSelect = document.getElementById('match-duration');

    const tripTypeCards = document.querySelectorAll('.trip-type-card');
    const expandPreferencesBtn = document.getElementById('expand-preferences-btn');
    const preferencesExpandedContent = document.getElementById('preferences-expanded-content');
    const findMyTripBtn = document.getElementById('find-my-trip-btn');
    
    const quickSearchInput = document.getElementById('quick-search-input');
    const quickSearchBtn = document.getElementById('quick-search-submit-btn');
    const quickChips = document.querySelectorAll('#quick-search-chips .category-chip');

    const aiMatchmakerResultsSection = document.getElementById('ai-matchmaker-results-section');
    const aiMatchmakerCardsGrid = document.getElementById('ai-matchmaker-cards-grid');

    // 1. AI Suggestion Prompts Rotator
    const prompts = [
        "✨ Tell me your dream destination.",
        "🏖 Looking for a relaxing beach holiday?",
        "⛰ Discover hidden mountain escapes.",
        "🎒 Planning a trip with friends?",
        "❤️ Find the perfect honeymoon package."
    ];
    let promptIndex = 0;
    const promptText = document.getElementById('ai-prompt-text');
    if (promptText) {
        setInterval(() => {
            promptText.classList.add('fade-out');
            setTimeout(() => {
                promptIndex = (promptIndex + 1) % prompts.length;
                promptText.innerText = prompts[promptIndex];
                promptText.classList.remove('fade-out');
                promptText.classList.add('fade-in');
                setTimeout(() => promptText.classList.remove('fade-in'), 400);
            }, 400);
        }, 4000);
    }

    // Helper: format value to Indian currency format
    const formatIndianCurrency = (val) => {
        if (val >= 150000) return "₹1,50,000+";
        return "₹" + val.toLocaleString('en-IN');
    };

    // 2. Slider Value Bubbles tracker positions
    // 2. Slider Value Bubbles tracker (Removed - inputs only)

    // 3. Live Matchmaker summary updates
    const updateLiveAISummary = () => {
        const destVal = document.getElementById('match-destination') ? document.getElementById('match-destination').value.trim() : '';
        const startVal = startDateInput ? startDateInput.value : '';
        const endVal = endDateInput ? endDateInput.value : '';
        const durationVal = durationSelect ? durationSelect.value : 'all';

        const minVal = currentMinBudget;
        const maxVal = currentMaxBudget;

        const selectedStyles = Array.from(tripTypeCards).filter(c => c.classList.contains('selected')).map(c => c.dataset.style);

        // Update destination summary
        const summaryDest = document.getElementById('summary-dest');
        if (summaryDest) {
            summaryDest.innerText = destVal ? destVal : "Anywhere";
        }

        // Update dates summary
        const summaryDates = document.getElementById('summary-dates');
        if (summaryDates) {
            if (startVal && endVal) {
                const formatOpt = { month: 'short', day: 'numeric' };
                const start = new Date(startVal).toLocaleDateString('en-US', formatOpt);
                const end = new Date(endVal).toLocaleDateString('en-US', formatOpt);
                summaryDates.innerText = `${start} - ${end}`;
            } else if (durationVal !== 'all') {
                summaryDates.innerText = `${durationVal} Days (approx)`;
            } else {
                summaryDates.innerText = "Flexible";
            }
        }

        // Update budget summary
        const summaryBudget = document.getElementById('summary-budget');
        if (summaryBudget) {
            if (minVal === 5000 && maxVal === 300000) {
                summaryBudget.innerText = "Any Budget";
            } else {
                summaryBudget.innerText = `₹${minVal.toLocaleString()} - ₹${maxVal.toLocaleString()}`;
            }
        }

        // Update styles summary
        const summaryType = document.getElementById('summary-type');
        if (summaryType) {
            if (selectedStyles.length > 0) {
                summaryType.innerText = selectedStyles.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
            } else {
                summaryType.innerText = "Flexible";
            }
        }

        // Calculate confidence match score
        let confidence = 60;
        if (destVal) confidence += 10;
        if (startVal && endVal) confidence += 10;
        else if (durationVal !== 'all') confidence += 5;
        if (minVal > 5000 || maxVal < 300000) confidence += 10;
        if (selectedStyles.length > 0) confidence += 10;

        confidence = Math.min(99, confidence);

        const summaryConfidence = document.getElementById('summary-confidence');
        const summaryConfidenceBar = document.getElementById('summary-confidence-bar');
        if (summaryConfidence) summaryConfidence.innerText = `${confidence}% Fit`;
        if (summaryConfidenceBar) summaryConfidenceBar.style.width = `${confidence}%`;
    };

    // Dual Budget Sync (Inputs & Slider)
    const syncBudgetInputsAndSlider = () => {
        if (!budgetReadout) return;

        if (inputMin && document.activeElement !== inputMin) {
            inputMin.value = currentMinBudget;
        }
        if (inputMax && document.activeElement !== inputMax) {
            inputMax.value = currentMaxBudget;
        }

        const maxFormatted = currentMaxBudget >= 150000 ? '₹1,50,000+' : formatIndianCurrency(currentMaxBudget);
        budgetReadout.innerHTML = `${formatIndianCurrency(currentMinBudget)} – ${maxFormatted}`;
        updateLiveAISummary();
        
        // Sync custom slider UI if visible
        const track = document.getElementById('budget-slider-track');
        const range = document.getElementById('budget-slider-range');
        const thumbMin = document.getElementById('budget-thumb-min');
        const thumbMax = document.getElementById('budget-thumb-max');
        const valMinText = document.getElementById('thumb-value-min');
        const valMaxText = document.getElementById('thumb-value-max');
        
        if (thumbMin && thumbMax && range) {
            const minVal = 1000;
            const maxVal = 150000;
            const pctMin = ((currentMinBudget - minVal) / (maxVal - minVal)) * 100;
            const pctMax = ((currentMaxBudget - minVal) / (maxVal - minVal)) * 100;
            
            thumbMin.style.left = `${pctMin}%`;
            thumbMax.style.left = `${pctMax}%`;
            
            range.style.left = `${pctMin}%`;
            range.style.width = `${pctMax - pctMin}%`;
            
            if (valMinText) valMinText.innerText = formatIndianCurrency(currentMinBudget);
            if (valMaxText) valMaxText.innerText = maxFormatted;
        }
    };

    if (inputMin && inputMax) {
        inputMin.addEventListener('change', () => {
            let val = parseInt(inputMin.value) || 1000;
            // Snap to nearest 2k step
            val = Math.round((val - 1000) / 2000) * 2000 + 1000;
            val = Math.max(1000, Math.min(val, currentMaxBudget - 2000));
            inputMin.value = val;
            currentMinBudget = val;
            syncBudgetInputsAndSlider();
        });
        inputMax.addEventListener('change', () => {
            let val = parseInt(inputMax.value) || 150000;
            // Snap to nearest 2k step
            val = Math.round((val - 1000) / 2000) * 2000 + 1000;
            val = Math.max(currentMinBudget + 2000, Math.min(val, 150000));
            inputMax.value = val;
            currentMaxBudget = val;
            syncBudgetInputsAndSlider();
        });
    }

    // Call dynamic tracker initial alignment
    syncBudgetInputsAndSlider();
    // ========================================================
    // MOBILE PRE-PLANNING & RESPONSIVE ACTIONS
    // ========================================================
    
    // Clear button on Destination control
    const destInputMobile = document.getElementById('match-destination');
    if (destInputMobile) {
        let clearBtn = document.getElementById('btn-clear-dest');
        if (!clearBtn) {
            clearBtn = document.createElement('span');
            clearBtn.id = 'btn-clear-dest';
            clearBtn.innerHTML = '&times;';
            clearBtn.style.cssText = 'color: var(--text-slate); font-size: 20px; font-weight: 800; cursor: pointer; display: none; margin-left: 6px; padding: 0 4px; line-height: 1;';
            destInputMobile.parentElement.appendChild(clearBtn);
            
            clearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                destInputMobile.value = '';
                destInputMobile.placeholder = 'Anywhere';
                clearBtn.style.display = 'none';
                updateLiveAISummary();
                if (typeof runAIPackageFiltering === 'function') {
                    runAIPackageFiltering(null, null, null);
                }
            });
        }
        
        const toggleClearBtn = () => {
            clearBtn.style.display = destInputMobile.value.length > 0 ? 'inline-block' : 'none';
        };
        destInputMobile.addEventListener('input', toggleClearBtn);
        destInputMobile.addEventListener('change', toggleClearBtn);
    }

    // Mobile flexible dates button
    const mFlexBtn = document.getElementById('btn-flexible-dates-mobile');
    const dFlexBtn = document.getElementById('btn-flexible-dates');
    if (mFlexBtn && dFlexBtn) {
        mFlexBtn.addEventListener('click', (e) => {
            dFlexBtn.click();
            mFlexBtn.classList.add('active');
            showToast("📅 Selected Flexible Dates");
        });
    }

    // Mobile Duration Chips Binding
    const mobileChips = document.querySelectorAll('.duration-chip-m');
    const hiddenDurSelect = document.getElementById('match-duration');
    if (mobileChips.length > 0 && hiddenDurSelect) {
        mobileChips.forEach(chip => {
            chip.addEventListener('click', () => {
                mobileChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                
                const val = chip.dataset.value;
                if (val === 'custom') {
                    const userVal = prompt("Enter custom duration (number of days):", "5");
                    const parsed = parseInt(userVal);
                    if (!isNaN(parsed) && parsed > 0) {
                        chip.innerText = `${parsed} Days`;
                        hiddenDurSelect.value = parsed;
                    } else {
                        chip.classList.remove('active');
                        document.querySelector('.duration-chip-m[data-value="all"]').classList.add('active');
                        hiddenDurSelect.value = 'all';
                    }
                } else {
                    const customChip = document.getElementById('duration-chip-m-custom');
                    if (customChip) customChip.innerText = "Custom";
                    hiddenDurSelect.value = val;
                }
                hiddenDurSelect.dispatchEvent(new Event('change'));
            });
        });
        
        // Sync mobile chips selection when dates picker changes value
        hiddenDurSelect.addEventListener('change', () => {
            const val = hiddenDurSelect.value;
            mobileChips.forEach(c => c.classList.remove('active'));
            const matched = Array.from(mobileChips).find(c => c.dataset.value === val);
            if (matched) {
                matched.classList.add('active');
            } else if (val !== 'all') {
                const customChip = document.getElementById('duration-chip-m-custom');
                if (customChip) {
                    customChip.classList.add('active');
                    customChip.innerText = `${val} Days`;
                }
            } else {
                document.querySelector('.duration-chip-m[data-value="all"]')?.classList.add('active');
            }
        });
    }

    // Custom range slider components coordination
    const initBudgetSliderDraggables = () => {
        const thumbMin = document.getElementById('budget-thumb-min');
        const thumbMax = document.getElementById('budget-thumb-max');
        if (!thumbMin || !thumbMax) return;
        
        const minLimit = 1000;
        const maxLimit = 150000;
        const stepSize = 2000;
        
        const getValueFromX = (clientX) => {
            const container = thumbMin.parentElement;
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            let pct = (clientX - rect.left) / width;
            pct = Math.max(0, Math.min(1, pct));
            const raw = minLimit + pct * (maxLimit - minLimit);
            const stepped = Math.round((raw - minLimit) / stepSize) * stepSize + minLimit;
            return Math.max(minLimit, Math.min(maxLimit, stepped));
        };
        
        const setupDrag = (thumb, type) => {
            const dragStart = (e) => {
                e.preventDefault();
                thumb.classList.add('dragging');
                
                const onDrag = (dragEv) => {
                    const cx = dragEv.touches ? dragEv.touches[0].clientX : dragEv.clientX;
                    const val = getValueFromX(cx);
                    if (type === 'min') {
                        currentMinBudget = Math.min(val, currentMaxBudget - stepSize);
                    } else {
                        currentMaxBudget = Math.max(val, currentMinBudget + stepSize);
                    }
                    syncBudgetInputsAndSlider();
                };
                
                const dragEnd = () => {
                    thumb.classList.remove('dragging');
                    document.removeEventListener('mousemove', onDrag);
                    document.removeEventListener('mouseup', dragEnd);
                    document.removeEventListener('touchmove', onDrag);
                    document.removeEventListener('touchend', dragEnd);
                };
                
                document.addEventListener('mousemove', onDrag);
                document.addEventListener('mouseup', dragEnd);
                document.addEventListener('touchmove', onDrag, { passive: false });
                document.addEventListener('touchend', dragEnd);
            };
            
            thumb.addEventListener('mousedown', dragStart);
            thumb.addEventListener('touchstart', dragStart, { passive: false });
        };
        
        setupDrag(thumbMin, 'min');
        setupDrag(thumbMax, 'max');
    };
    
    setTimeout(initBudgetSliderDraggables, 300);

    // Floating Sticky Bottom CTA toggle visibility
    const stickyCtaWrap = document.getElementById('planner-sticky-cta-wrap');
    const stickyCtaBtn = document.getElementById('btn-planner-sticky-cta');
    const mainCtaBtn = document.getElementById('find-my-trip-btn');
    
    if (stickyCtaWrap && stickyCtaBtn && mainCtaBtn) {
        stickyCtaBtn.addEventListener('click', () => {
            mainCtaBtn.click();
            stickyCtaBtn.style.transform = 'scale(0.98)';
            setTimeout(() => { stickyCtaBtn.style.transform = ''; }, 150);
        });
        
        window.checkStickyCtaVisibility = () => {
            if (currentViewId !== 'planner') {
                stickyCtaWrap.style.display = 'none';
                return;
            }
            
            const rect = mainCtaBtn.getBoundingClientRect();
            // Show only if main CTA button is scrolled out of viewport
            const isMainCtaVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            
            if (!isMainCtaVisible && window.scrollY > 150) {
                stickyCtaWrap.style.display = 'block';
            } else {
                stickyCtaWrap.style.display = 'none';
            }
        };
        
        window.addEventListener('scroll', window.checkStickyCtaVisibility);
    }


    // Dates to Duration select calculations
    const updateDurationFromDates = () => {
        if (!startDateInput || !endDateInput || !durationSelect) return;
        const startVal = startDateInput.value;
        const endVal = endDateInput.value;

        if (startVal && endVal) {
            const start = new Date(startVal);
            const end = new Date(endVal);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 2) {
                durationSelect.value = 'weekend';
            } else if (diffDays <= 3) {
                durationSelect.value = '2-3';
            } else if (diffDays <= 5) {
                durationSelect.value = '4-5';
            } else if (diffDays <= 7) {
                durationSelect.value = '6-7';
            } else if (diffDays <= 10) {
                durationSelect.value = '8-10';
            } else {
                durationSelect.value = '10+';
            }
        }
        updateLiveAISummary();
    };

    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', updateDurationFromDates);
        endDateInput.addEventListener('change', updateDurationFromDates);
    }
    if (durationSelect) {
        durationSelect.addEventListener('change', updateLiveAISummary);
    }
    
    const destInput = document.getElementById('match-destination');
    if (destInput) {
        destInput.addEventListener('input', updateLiveAISummary);
    }

    // Trip Type Card selection Multi-toggles
    tripTypeCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
            updateLiveAISummary();
        });
    });

    // Expand Advanced filters accordion
    if (expandPreferencesBtn && preferencesExpandedContent) {
        expandPreferencesBtn.addEventListener('click', () => {
            preferencesExpandedContent.classList.toggle('active');
            expandPreferencesBtn.querySelector('.arrow').innerText = preferencesExpandedContent.classList.contains('active') ? '▲' : '▼';
        });
    }

    // Category chips click instantly filters packages
    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const isActive = chip.classList.contains('active');
            quickChips.forEach(c => c.classList.remove('active'));
            
            if (isActive) {
                runAIPackageFiltering(null, null, null);
            } else {
                chip.classList.add('active');
                const category = chip.dataset.category;
                showToast(`🔎 Filtering category: ${chip.innerText}`);
                runAIPackageFiltering(category, null, null);
            }
        });
    });

    // Natural Language conversational search bar parser
    const parseNaturalLanguageSearch = (query) => {
        const q = query.toLowerCase().trim();
        if (!q) return;

        // Reset inputs
        if (document.getElementById('match-destination')) document.getElementById('match-destination').value = '';
        if (inputMin) inputMin.value = '';
        if (inputMax) inputMax.value = '';
        currentMinBudget = 1000;
        currentMaxBudget = 150000;
        if (durationSelect) durationSelect.value = 'all';
        if (startDateInput) startDateInput.value = '';
        if (endDateInput) endDateInput.value = '';
        tripTypeCards.forEach(c => c.classList.remove('selected'));
        quickChips.forEach(c => c.classList.remove('active'));

        // 1. Destination
        const destinations = ['goa', 'kashmir', 'maldives', 'bali', 'thailand', 'dharamshala', 'gokarna', 'munnar', 'jaisalmer', 'spiti', 'alleppey', 'ooty', 'pondicherry', 'hampi'];
        for (let dest of destinations) {
            if (q.includes(dest)) {
                if (document.getElementById('match-destination')) {
                    document.getElementById('match-destination').value = dest.charAt(0).toUpperCase() + dest.slice(1);
                }
                break;
            }
        }

        // 2. Budget
        const budgetRegex = /(?:under|below|less than|budget|₹)?\s?(\d+)(?:\s?(?:k|thousand|000))?/i;
        const matchBudget = q.match(budgetRegex);
        if (matchBudget) {
            let val = parseInt(matchBudget[1]);
            if (q.includes(matchBudget[1] + 'k') || q.includes(matchBudget[1] + ' k')) {
                val = val * 1000;
            } else if (val < 1000) {
                val = val * 1000;
            }
            if (val >= 1000 && val <= 150000) {
                currentMaxBudget = Math.max(currentMinBudget + 2000, val);
            }
        }

        // 3. Duration
        if (q.includes('weekend')) {
            if (durationSelect) durationSelect.value = 'weekend';
        } else {
            const daysRegex = /(\d+)\s?(?:day|night)/i;
            const matchDays = q.match(daysRegex);
            if (matchDays) {
                const days = parseInt(matchDays[1]);
                if (durationSelect) {
                    if (days <= 3) durationSelect.value = '2-3';
                    else if (days <= 5) durationSelect.value = '4-5';
                    else if (days <= 7) durationSelect.value = '6-7';
                    else if (days <= 10) durationSelect.value = '8-10';
                    else durationSelect.value = '10+';
                }
            }
        }

        // 4. Styles
        const styles = {
            couple: ['couple', 'romantic', 'honeymoon'],
            family: ['family', 'kids'],
            adventure: ['adventure', 'trek', 'hiking', 'rafting', 'thrill'],
            solo: ['solo', 'backpacking'],
            luxury: ['luxury', 'resort', 'premium', '5 star'],
            spiritual: ['spiritual', 'devotion', 'temple', 'peace']
        };
        for (let style in styles) {
            for (let keyword of styles[style]) {
                if (q.includes(keyword)) {
                    const card = document.querySelector(`.trip-type-card[data-style="${style}"]`);
                    if (card) card.classList.add('selected');
                    break;
                }
            }
        }

        syncBudgetInputsAndSlider();
        
        showToast("🔮 AI parsed search preferences!");
        runAIPackageFiltering(null, null, null);
    };

    if (quickSearchInput) {
        quickSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                parseNaturalLanguageSearch(quickSearchInput.value);
            }
        });
    }

    if (quickSearchBtn && quickSearchInput) {
        quickSearchBtn.addEventListener('click', () => {
            parseNaturalLanguageSearch(quickSearchInput.value);
        });
    }

    // Skeleton loader rotator configuration
    const loaderMessages = [
        "Finding hidden gems...",
        "Comparing thousands of packages...",
        "Checking seasonal prices...",
        "Finding the best value...",
        "Preparing your perfect journey..."
    ];
    let loaderInterval;

    const startLoaderAnimation = () => {
        const loader = document.getElementById('ai-searching-loader');
        const statusText = document.getElementById('searching-status-text');
        const resultsSection = document.getElementById('ai-matchmaker-results-section');

        if (!loader || !statusText || !resultsSection) return;

        resultsSection.style.display = 'none';
        loader.style.display = 'block';
        loader.scrollIntoView({ behavior: 'smooth', block: 'center' });

        let index = 0;
        statusText.innerText = loaderMessages[index];
        clearInterval(loaderInterval);
        loaderInterval = setInterval(() => {
            index = (index + 1) % loaderMessages.length;
            statusText.innerText = loaderMessages[index];
        }, 1500);
    };

    const stopLoaderAnimation = () => {
        const loader = document.getElementById('ai-searching-loader');
        if (loader) loader.style.display = 'none';
        clearInterval(loaderInterval);
    };

    // Flying card compare animation
    const triggerFlyToPlanner = (cardImgElement) => {
        const planner = document.querySelector('.matchmaker-card-glass');
        if (!cardImgElement || !planner) return;

        const startRect = cardImgElement.getBoundingClientRect();
        const endRect = planner.getBoundingClientRect();

        const fly = document.createElement('div');
        fly.className = 'flying-card-anim';
        fly.style.backgroundImage = cardImgElement.style.backgroundImage || '';
        fly.style.left = `${startRect.left + window.scrollX}px`;
        fly.style.top = `${startRect.top + window.scrollY}px`;
        fly.style.width = `${startRect.width}px`;
        fly.style.height = `${startRect.height}px`;

        document.body.appendChild(fly);

        fly.offsetWidth; // Force repaint

        fly.style.left = `${endRect.left + window.scrollX + (endRect.width / 2) - 30}px`;
        fly.style.top = `${endRect.top + window.scrollY + (endRect.height / 2) - 30}px`;
        fly.style.width = '60px';
        fly.style.height = '60px';
        fly.style.opacity = '0.1';

        // Glow effect
        setTimeout(() => {
            planner.style.boxShadow = '0 0 35px rgba(0, 203, 224, 0.7)';
            planner.style.transform = 'scale(1.01)';
            setTimeout(() => {
                planner.style.boxShadow = '';
                planner.style.transform = '';
            }, 600);
        }, 600);

        fly.addEventListener('transitionend', () => {
            fly.remove();
        });
    };

    // Update the list of compared packages directly in planner
    const updatePlannerCompareSummary = () => {
        const summaryContainer = document.getElementById('matchmaker-compare-summary');
        const summaryGrid = document.getElementById('compare-summary-grid');
        if (!summaryContainer || !summaryGrid) return;

        if (selectedComparePackages.length === 0) {
            summaryContainer.style.display = 'none';
            return;
        }

        summaryContainer.style.display = 'block';
        summaryGrid.innerHTML = '';

        selectedComparePackages.forEach(pkg => {
            const item = document.createElement('div');
            item.className = 'compare-summary-item';
            item.innerHTML = `
                <span><strong>${pkg.title}</strong></span>
                <span class="remove-btn" data-title="${pkg.title}">✕</span>
            `;

            item.querySelector('.remove-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                selectedComparePackages = selectedComparePackages.filter(p => p.title !== pkg.title);
                updatePlannerCompareSummary();
                updateCompareWidget();

                const checkbox = document.querySelector(`.card-compare-checkbox[data-title="${pkg.title}"]`);
                if (checkbox) checkbox.checked = false;
            });

            summaryGrid.appendChild(item);
        });
    };

    // AI Recommended Match Results renderer
    const renderAIRecommendedResults = (scoredMatches) => {
        if (!aiMatchmakerCardsGrid || !aiMatchmakerResultsSection) return;
        aiMatchmakerCardsGrid.innerHTML = '';

        if (scoredMatches.length === 0) {
            aiMatchmakerCardsGrid.innerHTML = `
                <div class="empty-results-fallback" style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
                    <p class="empty-saved-msg" style="margin-bottom:15px; font-size:15px;">We couldn't find an exact match, but here are some amazing alternatives.</p>
                    <button class="btn-toast" id="reset-match-filters-btn" style="background:var(--accent-cyan); color:var(--bg-dark); border:none; padding:8px 20px; border-radius:6px; font-weight:700; cursor:pointer;" data-msg="Resetting inputs...">View Flexible Options</button>
                </div>
            `;
            const resetBtn = document.getElementById('reset-match-filters-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (document.getElementById('match-destination')) document.getElementById('match-destination').value = '';
                    currentMinBudget = 1000;
                    currentMaxBudget = 150000;
                    syncBudgetInputsAndSlider();
                    runAIPackageFiltering(null, null, null);
                });
            }
            aiMatchmakerResultsSection.style.display = 'block';
            aiMatchmakerResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        scoredMatches.forEach(pkg => {
            const isCompared = selectedComparePackages.some(item => item.title === pkg.title);
            const card = document.createElement('div');
            card.className = 'travel-card';
            card.style.border = '1px solid rgba(0, 203, 224, 0.15)';
            card.innerHTML = `
                <div class="card-img-wrap" style="background-image: url('${pkg.imgUrl}')">
                    <button class="card-share-btn" data-title="${pkg.title}"><svg viewBox="0 0 24 24"><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon><line x1="22" y1="2" x2="11" y2="13"></line></svg></button>
                    <button class="card-favorite-btn" data-title="${pkg.title}"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
                </div>
                <div class="card-details">
                    <div class="card-meta">
                        <span>📍 ${pkg.category.toUpperCase()}</span>
                        <span>${pkg.duration} Days</span>
                    </div>
                    <h3 class="card-title">${pkg.title}</h3>
                    
                    <div class="ai-matchmaker-why-card">
                        <strong>💡 Why it matches:</strong> ${pkg.matchReason}
                    </div>

                    <p style="font-size:12px; color:var(--text-slate); margin-bottom:12px;">✨ Highlights: ${pkg.highlights}</p>

                    <div class="card-footer" style="padding-top:12px; border-top:1px solid rgba(255,255,255,0.05)">
                        <div class="card-rating">${pkg.rating}</div>
                        <div class="card-price">${pkg.priceStr}</div>
                    </div>
                    
                    <div class="card-actions-row" style="margin-top:15px; display:flex; gap:10px; flex-wrap: wrap;">
                        <label class="compare-checkbox-label" style="position:static; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); padding:6px 12px; border-radius:6px; flex:1; justify-content:center; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" class="card-compare-checkbox" data-title="${pkg.title}" ${isCompared ? 'checked' : ''}>
                            Compare Spec
                        </label>
                        <button class="btn-book-now btn-toast" style="flex:1.2; background:var(--accent-cyan); color:var(--bg-dark); border:none; border-radius:6px; font-size:11.5px; font-weight:800; padding:6px 12px; cursor:pointer;" data-msg="Directing to checkout page...">Book Now</button>
                    </div>
                </div>
            `;

            // Comparison Checkbox Event with fly animation
            const chk = card.querySelector('.card-compare-checkbox');
            chk.addEventListener('change', (e) => {
                e.stopPropagation();
                if (chk.checked) {
                    triggerFlyToPlanner(card.querySelector('.card-img-wrap'));
                }
                toggleComparePackage(pkg, chk.checked);
            });

            card.querySelector('.card-favorite-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSave(pkg.title);
            });

            const shareBtn = card.querySelector('.card-share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openShareSheet(pkg);
                });
            }
            
            const btnBookNow = card.querySelector('.btn-book-now');
            if (btnBookNow) {
                btnBookNow.addEventListener('click', (e) => {
                    e.stopPropagation();
                    initNewDraftBookingState(pkg);
                });
            }

            aiMatchmakerCardsGrid.appendChild(card);
        });

        aiMatchmakerResultsSection.style.display = 'block';
        aiMatchmakerResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        syncSaveButtonStates();
        replaceCardButtonsWithSVG();
    };

    // The unified AI filter processor
    const runAIPackageFiltering = (categoryChipValue, customMinBudget, customMaxBudget) => {
        const dest = document.getElementById('match-destination') ? document.getElementById('match-destination').value.toLowerCase().trim() : '';
        const durVal = durationSelect ? durationSelect.value : 'all';
        
        const minBudget = customMinBudget !== null && customMinBudget !== undefined ? customMinBudget : currentMinBudget;
        const maxBudget = customMaxBudget !== null && customMaxBudget !== undefined ? customMaxBudget : currentMaxBudget;

        const selectedStyles = Array.from(tripTypeCards).filter(c => c.classList.contains('selected')).map(c => c.dataset.style);
        const selectedPrefs = Array.from(document.querySelectorAll('input[name="match-pref"]:checked')).map(c => c.value);

        console.log("Filter Diagnostics - Start:", {
            dest: dest,
            durVal: durVal,
            minBudget: minBudget,
            maxBudget: maxBudget,
            selectedStyles: selectedStyles,
            categoryChipValue: categoryChipValue
        });

        startLoaderAnimation();

        setTimeout(() => {
            console.log("Filtering from total packages count:", allPackagesData.length);
            let matches = allPackagesData.filter(pkg => {
                // Check min/max budget range (allow 20% over max for flexible results)
                const budgetOk = !(pkg.priceNum > maxBudget * 1.2 || pkg.priceNum < minBudget * 0.8);
                if (!budgetOk) {
                    // console.log("Filtered out by budget:", pkg.title, pkg.priceNum);
                    return false;
                }

                // Destination filter
                if (dest !== '') {
                    const destOk = pkg.title.toLowerCase().includes(dest) || pkg.category.toLowerCase().includes(dest);
                    if (!destOk) {
                        // console.log("Filtered out by destination:", pkg.title);
                        return false;
                    }
                }

                // Category scroll chip filter
                if (categoryChipValue) {
                    if (categoryChipValue === 'budget') {
                        if (pkg.priceNum > 25000) return false;
                    } else if (categoryChipValue === 'international') {
                        const titleLower = pkg.title.toLowerCase();
                        if (!titleLower.includes('bali') && !titleLower.includes('maldives') && !titleLower.includes('thailand')) {
                            return false;
                        }
                    } else {
                        const keyword = categoryChipValue.toLowerCase();
                        if (!pkg.title.toLowerCase().includes(keyword) && 
                            !pkg.category.toLowerCase().includes(keyword) && 
                            !pkg.highlights.toLowerCase().includes(keyword) &&
                            pkg.style !== keyword) {
                            return false;
                        }
                    }
                }

                // Duration selector match
                if (durVal !== 'all') {
                    const numericDur = parseInt(durVal);
                    if (!isNaN(numericDur)) {
                        if (pkg.duration !== numericDur) {
                            // console.log("Filtered out by exact duration:", pkg.title, pkg.duration, "expected:", numericDur);
                            return false;
                        }
                    } else {
                        if (durVal === 'weekend' && pkg.duration > 2) return false;
                        if (durVal === '2-3' && (pkg.duration < 2 || pkg.duration > 3)) return false;
                        if (durVal === '4-5' && (pkg.duration < 4 || pkg.duration > 5)) return false;
                        if (durVal === '6-7' && (pkg.duration < 6 || pkg.duration > 7)) return false;
                        if (durVal === '8-10' && (pkg.duration < 8 || pkg.duration > 10)) return false;
                if (durVal === '8+' && pkg.duration < 8) return false;
                        if (durVal === '10+' && pkg.duration < 10) return false;
                    }
                }

                console.log("MATCH FOUND:", pkg.title, "Duration:", pkg.duration, "Price:", pkg.priceNum);
                return true;
            });

            console.log("Filtered matches count:", matches.length);


            let scoredMatches = matches.map(pkg => {
                let score = 96;

                // Budget range matching score
                if (pkg.priceNum > maxBudget) {
                    score -= 8;
                } else if (pkg.priceNum < minBudget) {
                    score -= 6;
                } else {
                    score += 2;
                }

                // Selected trip styles matching score
                let styleMatches = 0;
                selectedStyles.forEach(st => {
                    if (pkg.style === st || pkg.category.toLowerCase() === st) {
                        styleMatches++;
                    }
                });
                if (selectedStyles.length > 0 && styleMatches === 0) {
                    score -= 10;
                } else if (styleMatches > 0) {
                    score += styleMatches * 2;
                }

                // Advanced preferences checkboxes matching score
                let prefMatches = 0;
                selectedPrefs.forEach(pr => {
                    if (pkg.experiences === pr || pkg.category.toLowerCase() === pr || pkg.highlights.toLowerCase().includes(pr)) {
                        prefMatches++;
                    }
                });
                if (selectedPrefs.length > 0 && prefMatches === 0) {
                    score -= 8;
                } else if (prefMatches > 0) {
                    score += prefMatches * 2;
                }

                score = Math.max(70, Math.min(99, score));

                // Personalized explanation text
                let matchReason = `Perfect fit for your ₹${minBudget.toLocaleString()} - ₹${maxBudget.toLocaleString()} budget. `;
                if (styleMatches > 0) matchReason += `Matches your preferred ${selectedStyles.join('/')} styles. `;
                if (prefMatches > 0) matchReason += `Includes ${selectedPrefs.slice(0, 2).join(' & ')} options. `;
                matchReason += `Covers the requested ${pkg.duration}-day duration with a solid ${pkg.rating} rating.`;

                return { ...pkg, matchScore: score, matchReason: matchReason };
            });

            scoredMatches.sort((a, b) => b.matchScore - a.matchScore);

            stopLoaderAnimation();
            renderAIRecommendedResults(scoredMatches);
        }, 1500);
    };

    if (findMyTripBtn) {
        findMyTripBtn.addEventListener('click', () => {
            runAIPackageFiltering(null, null, null);
        });
    }

    let selectedComparePackages = [];
    const floatingCompareWidget = document.getElementById('floating-compare-widget');
    const compareSelectedCount = document.getElementById('compare-selected-count');
    const compareClearBtn = document.getElementById('compare-clear-btn');
    const compareNowBtn = document.getElementById('compare-now-btn');

    // Toggle Compare packages deck overlay
    const toggleComparePackage = (pkg, checked) => {
        if (checked) {
            if (selectedComparePackages.length >= 3) {
                showToast("⚠️ You can compare up to 3 packages only!");
                const boxes = document.querySelectorAll('.card-compare-checkbox');
                boxes.forEach(b => {
                    if (b.dataset.title === pkg.title) b.checked = false;
                });
                return;
            }
            if (!selectedComparePackages.some(item => item.title === pkg.title)) {
                selectedComparePackages.push(pkg);
            }
            showToast(`➕ Added "${pkg.title}" to compare list`);
        } else {
            selectedComparePackages = selectedComparePackages.filter(item => item.title !== pkg.title);
            showToast(`➖ Removed "${pkg.title}" from compare list`);
        }

        updatePlannerCompareSummary();
        updateCompareWidget();

        // Refresh collection UI in real-time
        if (typeof renderCompareTab === 'function') {
            renderCompareTab();
        }
        if (typeof renderSavedTab === 'function') {
            renderSavedTab();
        }
    };

    const updateCompareWidget = () => {
        if (!floatingCompareWidget || !compareSelectedCount) return;

        const count = selectedComparePackages.length;
        if (count >= 2) {
            floatingCompareWidget.classList.add('active');
            if (compareTabBtn) compareTabBtn.style.display = 'inline-block';
        } else {
            floatingCompareWidget.classList.remove('active');
            if (compareTabBtn) compareTabBtn.style.display = 'none';
        }

        compareSelectedCount.innerText = count;
    };

    if (compareClearBtn) {
        compareClearBtn.addEventListener('click', () => {
            selectedComparePackages = [];
            const checkboxes = document.querySelectorAll('.card-compare-checkbox');
            checkboxes.forEach(c => c.checked = false);
            updateCompareWidget();
            
            // Navigate back to matches list
            searchModeContainers.forEach(container => {
                container.classList.remove('active-mode');
                if (container.id === 'search-list-container') {
                    container.classList.add('active-mode');
                }
            });
            if (compareTabBtn) {
                compareTabBtn.classList.remove('active');
            }
        });
    }

    const compareBackBtn = document.getElementById('compare-back-to-list-btn');
    if (compareBackBtn) {
        compareBackBtn.addEventListener('click', () => {
            searchModeContainers.forEach(container => {
                container.classList.remove('active-mode');
                if (container.id === 'search-list-container') {
                    container.classList.add('active-mode');
                }
            });
            if (compareTabBtn) {
                compareTabBtn.classList.remove('active');
            }
        });
    }

    if (compareNowBtn) {
        compareNowBtn.addEventListener('click', () => {
            if (compareTabBtn) {
                compareTabBtn.click();
            }
        });
    }

    const renderCompareViewTable = () => {
        if (!compareMatrixTable) return;
        
        if (selectedComparePackages.length === 0) {
            compareMatrixTable.innerHTML = `<tr><td style="text-align: center; padding: 40px 0;">No packages selected for comparison. Go to List View and check at least 2 packages.</td></tr>`;
            return;
        }

        let bestValueIndex = 0;
        let bestValueScore = 0;
        selectedComparePackages.forEach((pkg, index) => {
            const parsedRating = parseFloat(pkg.rating.replace(/[^0-9.]/g, '')) || 4.0;
            const score = parsedRating / pkg.priceNum; 
            if (score > bestValueScore) {
                bestValueScore = score;
                bestValueIndex = index;
            }
        });

        let headers = `<th>Package Spec</th>`;
        selectedComparePackages.forEach((pkg, index) => {
            headers += `<th class="${index === bestValueIndex ? 'best-value-col' : ''}">
                ${index === bestValueIndex ? '<span class="compare-value-badge">BEST VALUE</span><br>' : ''}
                <strong>${pkg.title}</strong>
            </th>`;
        });

        const rows = [
            { label: "Starting Price", key: "priceStr" },
            { label: "Duration", key: "duration", format: (v) => `${v} Days` },
            { label: "Rating Score", key: "rating" },
            { label: "Reviews count", key: "reviews", format: (v) => `${v || 95} Travelers` },
            { label: "Accommodation", key: "accommodation", format: (v) => v ? v.toUpperCase() : "HOTEL" },
            { label: "Meals Included", key: "meals" },
            { label: "Sightseeing Tours", key: "sightseeing" },
            { label: "Airport Transfers", key: "transfers" },
            { label: "Cancellation Policy", key: "cancellation" },
            { label: "Highlights", key: "highlights" }
        ];

        let html = `<thead><tr>${headers}</tr></thead><tbody>`;
        
        rows.forEach(row => {
            html += `<tr><td class="spec-label">${row.label}</td>`;
            selectedComparePackages.forEach((pkg, index) => {
                const val = pkg[row.key];
                const displayVal = row.format ? row.format(val) : (val || "N/A");
                html += `<td class="${index === bestValueIndex ? 'best-value-col' : ''}">${displayVal}</td>`;
            });
            html += `</tr>`;
        });

        html += `</tbody>`;
        compareMatrixTable.innerHTML = html;
    };



    const updateSavedProfileGrid = () => {
        const savedGrid = document.getElementById('profile-saved-grid');
        if (!savedGrid) return;

        if (savedList.length === 0) {
            savedGrid.innerHTML = '<p class="empty-saved-msg" style="grid-column: 1/-1;">No saved packages yet. Click 🔖 on cards to save.</p>';
            return;
        }

        savedGrid.innerHTML = '';
        savedList.forEach(title => {
            const pkg = allPackagesData.find(p => p.title.trim() === title.trim()) || {
                title,
                imgUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                priceStr: '₹12,000',
                category: 'Retreat',
                duration: 4,
                rating: '⭐ 4.8'
            };

            const card = document.createElement('div');
            card.className = 'travel-card';
            card.innerHTML = `
                <div class="card-img-wrap" style="background-image: url('${pkg.imgUrl}')">
                    <button class="card-save-btn active" data-title="${pkg.title}"><svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></button>
                    <button class="card-share-btn" data-title="${pkg.title}"><svg viewBox="0 0 24 24"><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon><line x1="22" y1="2" x2="11" y2="13"></line></svg></button>
                </div>
                <div class="card-details">
                    <div class="card-meta">
                        <span>📍 ${pkg.category.toUpperCase()}</span>
                        <span>${pkg.duration} Days</span>
                    </div>
                    <h3 class="card-title" style="font-size: 13px;">${pkg.title}</h3>
                    <div class="card-footer" style="padding-top: 8px;">
                        <div class="card-rating" style="font-size: 10px;">${pkg.rating}</div>
                        <div class="card-price" style="font-size: 12px;">${pkg.priceStr}</div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                navigateTo('home');
                setTimeout(() => {
                    const originalCards = document.querySelectorAll('#view-home .travel-card, #view-home .trending-curved-card, #view-home .bespoke-card');
                    for (let orig of originalCards) {
                        const origTitle = orig.querySelector('.card-title') || orig.querySelector('.bespoke-title');
                        if (origTitle && origTitle.innerText.trim() === pkg.title.trim()) {
                            orig.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            break;
                        }
                    }
                }, 400);
            });

            savedGrid.appendChild(card);
        });
        replaceCardButtonsWithSVG();
    };

    // ----------------------------------------------------
    // ENQUIRIES INTERACTIVE WORKSPACE SWITCHER
    // ----------------------------------------------------
    const sidebarItems = document.querySelectorAll('.dashboard-sidebar-list .sidebar-item');
    const workspaces = document.querySelectorAll('.enquiry-workspace');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const id = item.dataset.enquiryId;
            workspaces.forEach(ws => {
                if (ws.id === `enquiry-ws-${id}`) {
                    ws.classList.add('active');
                } else {
                    ws.classList.remove('active');
                }
            });
        });
    });

    // Handle generic button toast messages
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toast');
        if (btn) {
            e.preventDefault();
            const msg = btn.dataset.msg;
            showToast(msg);
        }
    });

    // Pay now dynamic payment redirect simulator
    const payButtons = document.querySelectorAll('.action-pay-now');
    payButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast("💳 Redirecting to Secure Travel Payment Gateway...");
        });
    });

    // App Theme / Mode Selection logic
    const themeSelect = document.getElementById('user-theme-select');
    if (themeSelect) {
        const currentTheme = localStorage.getItem('beacon_theme') || 'light';
        themeSelect.value = currentTheme;
        if (currentTheme === 'light') {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        } else {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        }

        themeSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            localStorage.setItem('beacon_theme', selected);
            if (selected === 'light') {
                document.documentElement.classList.add('light-theme');
                document.documentElement.classList.remove('dark-theme');
                showToast("☀️ Switched to Light Theme!");
            } else {
                document.documentElement.classList.add('dark-theme');
                document.documentElement.classList.remove('light-theme');
                showToast("🌙 Switched to Dark Theme!");
            }
        });
    }

        // ----------------------------------------------------
    // CARD-TO-DETAIL NAVIGATION FLOW LOGIC (ENQUIRIES, BOOKINGS, TRIPS)
    // ----------------------------------------------------
    
    // Reset all sub-view navigations to grid mode on navbar transitions
    const resetCardDetailsNavs = () => {
        const eqGrid = document.getElementById('enquiries-cards-grid');
        const eqWS = document.getElementById('enquiries-detail-workspace');
        if (eqGrid && eqWS) {
            eqGrid.style.display = 'grid';
            eqWS.style.display = 'none';
        }

        const bkGrid = document.getElementById('bookings-cards-grid');
        const bkWs = document.getElementById('bookings-detail-workspace');
        if (bkGrid && bkWs) {
            bkGrid.style.display = 'grid';
            bkWs.style.display = 'none';
        }

        const trGrid = document.getElementById('trips-cards-grid');
        const trWs = document.getElementById('trips-detail-workspace');
        if (trGrid && trWs) {
            trGrid.style.display = 'grid';
            trWs.style.display = 'none';
        }
    };

    // Attach transitions reset to nav links
    const spaNavLinks = document.querySelectorAll('.nav-link-item');
    spaNavLinks.forEach(link => {
        link.addEventListener('click', resetCardDetailsNavs);
    });

    // 1. Enquiries Interactions
    const eqGrid = document.getElementById('enquiries-cards-grid');
    const eqWS = document.getElementById('enquiries-detail-workspace');
    const eqBack = document.getElementById('enquiry-back-btn');
    const eqViewBtns = document.querySelectorAll('.btn-view-enquiry');
    const eqCards = document.querySelectorAll('.enquiry-preview-card');

    if (eqGrid && eqWS) {
        eqCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // If user clicked the button itself, let button click handler run
                if (e.target.closest('.btn-view-enquiry')) return;
                const id = card.dataset.enquiryId;
                const btn = card.querySelector(`.btn-view-enquiry[data-enquiry-id="${id}"]`);
                if (btn) btn.click();
            });
        });

        eqViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.enquiryId;

                eqGrid.style.display = 'none';
                eqWS.style.display = 'block';

                // Select matching sidebar item
                const sidebarItems = document.querySelectorAll('#view-enquiries .sidebar-item');
                sidebarItems.forEach(item => {
                    if (item.dataset.enquiryId === id) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });

                // Show matching workspace thread
                const workspaces = document.querySelectorAll('#view-enquiries .enquiry-workspace');
                workspaces.forEach(ws => {
                    if (ws.id === `enquiry-ws-${id}`) {
                        ws.classList.add('active');
                    } else {
                        ws.classList.remove('active');
                    }
                });
            });
        });

        if (eqBack) {
            eqBack.addEventListener('click', () => {
                eqWS.style.display = 'none';
                eqGrid.style.display = 'grid';
            });
        }
    }

    // 2. Bookings Interactions
    const initBookingsStorage = () => {
        if (!localStorage.getItem('beacon_bookings')) {
            const defaults = [
                {
                    id: "BC-2026-9921",
                    packageTitle: "Alleppey Houseboats Retreat",
                    imgUrl: "https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=800&q=80",
                    price: "₹18,500",
                    dateRange: "Aug 15 - Aug 19, 2026",
                    status: "Confirmed",
                    accommodation: "Deluxe Houseboat Stay",
                    cancellation: "Free cancellation within 24 hours."
                },
                {
                    id: "BC-2026-9980",
                    packageTitle: "Munnar Tea Gardens Escapade",
                    imgUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
                    price: "₹14,200",
                    dateRange: "Sep 10 - Sep 14, 2026",
                    status: "Payment Pending",
                    accommodation: "Premium Tea Estate Resort",
                    cancellation: "Free cancellation within 24 hours."
                }
            ];
            localStorage.setItem('beacon_bookings', JSON.stringify(defaults));
        }
    };
    initBookingsStorage();

    const renderBookingsPage = () => {
        const bkGrid = document.getElementById('bookings-cards-grid');
        const bkWs = document.getElementById('bookings-detail-workspace');
        if (!bkGrid || !bkWs) return;

        const bookingsList = JSON.parse(localStorage.getItem('beacon_bookings')) || [];

        let cardsHtml = '';
        let workspaceHtml = '';

        bookingsList.forEach((bk) => {
            const isConfirmed = bk.status === 'Confirmed';
            const isPending = bk.status === '🟡 PAYMENT VERIFICATION PENDING';
            const isDraft = bk.status === 'draft';
            
            let statusTagClass = 'pending';
            if (isConfirmed) statusTagClass = 'confirmed';
            else if (isPending) statusTagClass = 'pending';
            else if (isDraft) statusTagClass = 'draft';
            
            if (isDraft) {
                cardsHtml += `
                    <div class="booking-preview-card" data-booking-id="${bk.id}" data-status="draft">
                        <div class="preview-card-banner" style="background-image: url('${bk.imgUrl}')">
                            <span class="preview-tag ${statusTagClass}" style="background:#f97316; color:#fff;">Draft (${bk.progress}%)</span>
                        </div>
                        <div class="preview-card-body">
                            <span class="preview-card-date">${bk.dateRange}</span>
                            <h3 class="preview-card-title">${bk.packageTitle}</h3>
                            <p class="preview-card-details">Booking ID: ${bk.id}</p>
                            
                            <!-- Custom Progress Bar -->
                            <div style="margin: 10px 0 15px 0;">
                                <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-slate); margin-bottom:4px;">
                                    <span>${bk.progressDesc}</span>
                                    <span>${bk.progress}%</span>
                                </div>
                                <div style="width:100%; height:6px; background:rgba(255,255,255,0.06); border-radius:3px; overflow:hidden;">
                                    <div style="width:${bk.progress}%; height:100%; background:var(--accent-cyan); box-shadow:0 0 8px var(--accent-cyan);"></div>
                                </div>
                            </div>
                            
                            <button class="btn-primary-sm btn-resume-draft" data-booking-id="${bk.id}" style="background:var(--accent-cyan) !important; color:var(--bg-dark) !important; font-weight:850; border:none; border-radius:4px; padding:6px 12px; cursor:pointer; outline:none; font-size:11px; width:100%;">Resume Customization</button>
                        </div>
                    </div>
                `;
            } else {
                cardsHtml += `
                    <div class="booking-preview-card" data-booking-id="${bk.id}" data-status="${bk.status}">
                        <div class="preview-card-banner" style="background-image: url('${bk.imgUrl}')">
                            <span class="preview-tag ${statusTagClass}" style="${isPending ? 'background:#eab308; color:#000;' : ''}">${bk.status}</span>
                        </div>
                        <div class="preview-card-body">
                            <span class="preview-card-date">${bk.dateRange}</span>
                            <h3 class="preview-card-title">${bk.packageTitle}</h3>
                            <p class="preview-card-details">Booking ID: ${bk.id}</p>
                            <button class="btn-primary-sm btn-view-booking" data-booking-id="${bk.id}" style="border:none; border-radius:4px; padding:6px 12px; cursor:pointer; outline:none; font-size:11px; width:100%;">Manage Booking</button>
                        </div>
                    </div>
                `;

                // Ensure receipt snapshot exists for confirmed booking
                if (isConfirmed) {
                    ensureReceiptSnapshot(bk);
                }

                workspaceHtml += `
<div class="booking-detailed-card booking-detail-view" id="booking-ws-${bk.id}" style="display: none; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; margin-top: 20px;">
<div class="booking-banner" style="background-image: url('${bk.imgUrl}'); height: 220px; background-size: cover; background-position: center; position: relative;">
<div class="booking-status-tag ${statusTagClass}" style="position: absolute; top: 20px; left: 20px; padding: 6px 12px; border-radius: 4px; font-weight: 800; font-size: 11px; text-transform: uppercase; ${isConfirmed ? 'background:#22c55e;' : isPending ? 'background:#eab308; color:#000;' : 'background:#ef4444;'}">${bk.status}</div>
${isConfirmed ? `<div class="booking-countdown" style="position: absolute; bottom: 20px; right: 20px; background: rgba(3,7,18,0.85); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); font-size: 11.5px; padding: 4px 10px; border-radius: 4px; font-weight: 750;">✈️ Departs in 18 Days</div>` : ''}
</div>
<div class="booking-body" style="padding: 30px;">

<!-- E-Receipt Actions for Confirmed bookings -->
${isConfirmed ? `
<!-- Desktop Receipt Action Bar -->
<div class="desktop-receipt-row" style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 12px 18px; border-radius: 10px; margin-bottom: 20px; box-sizing:border-box;">
    <div style="display: flex; align-items: center; gap: 8px;">
        <span style="color:#22c55e; font-weight:800; font-size:12.5px;">✓ CONFIRMED</span>
    </div>
    <button type="button" class="btn-view-ereceipt" data-booking-id="${bk.id}" style="background: rgba(0, 203, 224, 0.1); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); border-radius: 6px; padding: 6px 14px; font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 6px; outline:none; transition: all 0.2s;">
        🧾 E-Receipt
    </button>
    <span style="font-size:12.5px; color:var(--text-slate); font-weight:750;">✈️ Departs in 18 Days</span>
</div>

<!-- Mobile Receipt Action Card -->
<div class="mobile-receipt-card" style="display: none; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin-bottom: 20px; box-sizing:border-box; flex-direction:column; gap:10px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="color:#22c55e; font-weight:800; font-size:12px;">✓ CONFIRMED</span>
        <span style="font-size:11px; color:var(--text-slate); font-weight:750;">✈️ 18 Days</span>
    </div>
    <button type="button" class="btn-view-ereceipt btn-primary-large" data-booking-id="${bk.id}" style="width:100%; border-radius: 8px; padding: 10px; font-size:12.5px; font-weight:850; background:rgba(0, 203, 224, 0.1) !important; border: 1px solid var(--accent-cyan) !important; color:var(--accent-cyan) !important; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
        🧾 View Invoice E-Receipt
    </button>
</div>
` : ''}

<h2 style="font-size: 24px; font-weight: 900; color: #fff; margin: 0 0 5px 0;">${bk.packageTitle}</h2>
<p style="font-size: 13.5px; color: var(--text-slate); margin: 0 0 25px 0;">Booking ID: ${bk.id} &bull; Date Selected: ${bk.dateRange}</p>

<!-- Verification simulation warning bar if status is pending -->
${isPending ? `
<div style="background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.2); border-radius: 8px; padding: 15px; margin-bottom: 25px; box-sizing:border-box; display:flex; flex-direction:column; gap:10px;">
    <div style="display:flex; align-items:center; gap:8px; font-size:13px; color:#fff; font-weight:750;">
        <span style="color:#eab308; font-size:16px;">⚠️</span>
        <span>Payment Verification Pending</span>
    </div>
    <p style="font-size:12px; color:var(--text-slate); margin:0; line-height:1.5;">
        Your transaction details have been submitted. The travel partner is verifying the direct transfer. 
        Receipt documents will be unlocked immediately upon confirmation.
    </p>
    <div style="display:flex; justify-content: flex-end; margin-top:5px;">
        <button type="button" class="btn-approve-payment-simulator" data-booking-id="${bk.id}" style="background:rgba(34,197,94,0.15); border:1px solid #22c55e; color:#22c55e; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:800; cursor:pointer; outline:none; transition:all 0.2s;">
            🔧 Simulator: Approve Payment
        </button>
    </div>
</div>
` : ''}

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
<div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 20px; border-radius: 12px;">
<span style="font-size: 11px; color: var(--text-slate); text-transform: uppercase; font-weight: 700;">Duration</span>
<strong style="display: block; font-size: 16px; color: #fff; margin-top: 5px;">5 Days / 4 Nights</strong>
</div>
<div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 20px; border-radius: 12px;">
<span style="font-size: 11px; color: var(--text-slate); text-transform: uppercase; font-weight: 700;">Travellers</span>
<strong style="display: block; font-size: 16px; color: #fff; margin-top: 5px;">4 Passengers</strong>
</div>
<div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 20px; border-radius: 12px;">
<span style="font-size: 11px; color: var(--text-slate); text-transform: uppercase; font-weight: 700;">Total Price Paid</span>
<strong style="display: block; font-size: 16px; color: var(--accent-cyan); margin-top: 5px;">${bk.estimatedTotal ? "₹" + bk.estimatedTotal.toLocaleString() : '₹37,000'}</strong>
</div>
</div>

<div class="itinerary-mini-steps" style="display: flex; flex-direction: column; gap: 15px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 25px; margin-top: 25px;">
<h4 style="font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 10px;">📋 Pre-trip Milestones</h4>
<div class="step active" style="font-size: 12.5px; color: #fff; display: flex; align-items: center; gap: 10px;">✅ Payment Details Submitted</div>
<div class="step" style="font-size: 12.5px; color: var(--text-slate); display: flex; align-items: center; gap: 10px;">⏳ Verification by Planner</div>
<div class="step" style="font-size: 12.5px; color: var(--text-slate); display: flex; align-items: center; gap: 10px;">⏳ Booking Confirmed & Vouchers Shared</div>
</div>
</div>
</div>
`;
            }
        });

        bkGrid.innerHTML = cardsHtml;
        const existingBackBtnHtml = `
            <button class="btn-back-nav" id="booking-back-btn" style="margin-bottom: 24px; position: static; display: inline-flex; align-items: center; gap: 8px; background: transparent; border: none; color: var(--text-slate); font-weight: 700; cursor: pointer;">
                <span>←</span> Back to Bookings
            </button>
        `;
        bkWs.innerHTML = existingBackBtnHtml + workspaceHtml;

        const bkBack = document.getElementById('booking-back-btn');
        if (bkBack) {
            bkBack.addEventListener('click', () => {
                bkWs.style.display = 'none';
                bkGrid.style.display = 'grid';
            });
        }

        const bkCards = bkGrid.querySelectorAll('.booking-preview-card');
        bkCards.forEach(card => {
            const id = card.dataset.bookingId;
            const status = card.dataset.status;
            const btn = card.querySelector('.btn-view-booking, .btn-resume-draft');

            const openDetail = () => {
                if (status === 'draft') {
                    resumeMobileBooking(id);
                    return;
                }
                bkGrid.style.display = 'none';
                bkWs.style.display = 'block';

                const detailViews = bkWs.querySelectorAll('.booking-detailed-card');
                detailViews.forEach(view => {
                    if (view.id === `booking-ws-${id}`) {
                        view.style.display = 'block';
                    } else {
                        view.style.display = 'none';
                    }
                });
            };

            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-primary-sm')) return;
                openDetail();
            });

            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openDetail();
                });
            }
        });
        
        // Re-bind click listener on approve payment simulator inside renderBookingsPage
        const simBtns = bkWs.querySelectorAll('.btn-approve-payment-simulator');
        simBtns.forEach(sbtn => {
            sbtn.onclick = () => {
                const bId = sbtn.dataset.bookingId;
                approveBookingPaymentSimulation(bId);
            };
        });

        // Re-bind view ereceipt click listeners
        const rcBtns = bkWs.querySelectorAll('.btn-view-ereceipt');
        rcBtns.forEach(rbtn => {
            rbtn.onclick = () => {
                const bId = rbtn.dataset.bookingId;
                renderReceiptViewer(bId);
            };
        });
    };
    
    // ----------------------------------------------------
    // PLANNER REAL-TIME POPUP ALERTS SIMULATOR
    // ----------------------------------------------------
    const showPlannerRealTimePopup = (title, category, bookingId, amount, customerName, time, type, paymentAttemptId) => {
        // Exposed globally for demo verification
        const wrap = document.getElementById('planner-realtime-popup-wrap');
        if (!wrap) return;
        
        const popup = document.createElement('div');
        popup.className = `planner-popup-card ${type === 'started' ? 'in-progress' : 'verification-needed'}`;
        
        let titleIcon = type === 'started' ? '🔔' : '⚠️';
        let titleColor = type === 'started' ? 'var(--accent-cyan)' : '#eab308';
        
        popup.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <strong style="color:${titleColor}; font-size:12px; text-transform:uppercase; letter-spacing:1px; display:flex; align-items:center; gap:6px;">
                    ${titleIcon} ${title}
                </strong>
                <button type="button" class="close-popup-btn" style="background:transparent; border:none; color:var(--text-slate); cursor:pointer; font-size:14px; outline:none;">✕</button>
            </div>
            <div style="font-size:24px; font-weight:900; color:var(--accent-cyan); margin-bottom:10px;">${amount}</div>
            <p style="font-size:12.5px; color:var(--text-slate); margin:0 0 15px 0; line-height:1.5;">
                Customer <strong>${customerName}</strong> has ${type === 'started' ? 'started payment' : 'marked payment as completed'} for:<br>
                Booking: <strong>${bookingId}</strong><br>
                Time: <strong>${time}</strong>
            </p>
            <div style="display:flex; gap:10px;">
                ${type === 'verification' ? `
                    <button type="button" class="btn-popup-verify-received" style="flex:1.2; background:#22c55e; color:#fff; border:none; padding:8px 12px; border-radius:6px; font-size:11.5px; font-weight:800; cursor:pointer; outline:none;">✓ Received</button>
                    <button type="button" class="btn-popup-verify-not-received" style="flex:1.2; background:#ef4444; color:#fff; border:none; padding:8px 12px; border-radius:6px; font-size:11.5px; font-weight:800; cursor:pointer; outline:none;">✕ Not Received</button>
                ` : ''}
                <button type="button" class="btn-popup-view-booking" style="flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:8px 12px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; outline:none;">View Booking</button>
            </div>
        `;
        
        popup.querySelector('.close-popup-btn').onclick = () => {
            popup.classList.add('leaving');
            setTimeout(() => { popup.remove(); }, 300);
        };
        
        const viewBtn = popup.querySelector('.btn-popup-view-booking');
        if (viewBtn) {
            viewBtn.onclick = () => {
                navigateTo('payments');
                popup.classList.add('leaving');
                setTimeout(() => { popup.remove(); }, 300);
            };
        }
        
        if (type === 'verification') {
            const rcBtn = popup.querySelector('.btn-popup-verify-received');
            const nrcBtn = popup.querySelector('.btn-popup-verify-not-received');
            
            if (rcBtn) {
                rcBtn.onclick = () => {
                    openVerificationReviewModal(paymentAttemptId);
                    popup.remove();
                };
            }
            
            if (nrcBtn) {
                nrcBtn.onclick = () => {
                    popup.remove();
                    triggerPaymentNotReceived(paymentAttemptId);
                };
            }
        }
        
        wrap.appendChild(popup);
        
        setTimeout(() => {
            if (popup.parentElement) {
                popup.classList.add('leaving');
                setTimeout(() => { popup.remove(); }, 300);
            }
        }, 15000);
    };

    const triggerPaymentNotReceived = (paymentId) => {
        let attempts = JSON.parse(localStorage.getItem('beacon_payment_attempts')) || [];
        const idx = attempts.findIndex(x => x.id === paymentId);
        if (idx === -1) return;
        
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        attempts[idx].status = 'PAYMENT_REVIEW_REQUIRED';
        attempts[idx].history.push(`${timeStr} Planner marked payment as NOT received`);
        localStorage.setItem('beacon_payment_attempts', JSON.stringify(attempts));
        
        let bookings = JSON.parse(localStorage.getItem('beacon_bookings')) || [];
        const bkIdx = bookings.findIndex(b => b.id === attempts[idx].bookingId);
        if (bkIdx !== -1) {
            bookings[bkIdx].status = 'Payment Review Required';
            localStorage.setItem('beacon_bookings', JSON.stringify(bookings));
            renderBookingsPage();
        }
        
        showToast("⚠️ Payment review required flag set.");
        addBeaconNotification(`Payment review flagged: ${attempts[idx].amount}`, 'verification', attempts[idx].bookingId, attempts[idx].amount);
        renderPaymentsDashboard();
    };

    // ----------------------------------------------------
    // CHECKOUT DIRECT PAYMENT & VERIFICATION CONTROLLERS
    // ----------------------------------------------------
    const checkoutModal = document.getElementById('checkout-payment-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout-btn');
    const btnHavePaid = document.getElementById('btn-have-paid');
    const btnBackToQr = document.getElementById('btn-back-to-qr');
    const btnSubmitPayment = document.getElementById('btn-submit-payment');
    const step1 = document.getElementById('checkout-step-1');
    const step2 = document.getElementById('checkout-step-2');
    const utrInput = document.getElementById('checkout-utr-input');

    // Confirmation Modal Elements
    const directConfirmModal = document.getElementById('customer-direct-pay-confirm-modal');
    const btnDirectPayCancel = document.getElementById('btn-direct-pay-cancel');
    const btnDirectPayContinue = document.getElementById('btn-direct-pay-continue');

    // Customer Wait Verification Polling
    let waitInterval = null;
    const startCustomerWaitPolling = (bookingId, amount) => {
        if (waitInterval) clearInterval(waitInterval);
        
        const modal = document.getElementById('customer-wait-verification-modal');
        const contentEl = modal.querySelector('.payment-modal-content');
        
        modal.style.display = 'flex';
        
        // Reset waiting modal layout
        contentEl.innerHTML = `
            <div class="wait-spinner-wrap" style="margin-bottom: 25px;">
                <div class="wait-double-bounce"></div>
            </div>
            <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 19px; font-weight: 850;">Waiting for Planner Verification</h3>
            
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: left; font-size: 13.5px; line-height: 1.6;">
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-slate);">Submitted Status:</span>
                    <strong style="color: #eab308;">✓ Marked as Paid</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-slate);">Booking ID:</span>
                    <strong style="color: #fff;">${bookingId}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-slate);">Payable Amount:</span>
                    <strong style="color: var(--accent-cyan);">${amount}</strong>
                </div>
            </div>
            
            <p style="font-size: 12.5px; color: var(--text-slate); line-height: 1.6; margin-bottom: 25px;">
                ⏳ <strong id="wait-planner-name">${activeCheckoutPkg.planner || 'WanderWorld Travels'}</strong> is currently verifying your transfer. Please don't make another payment while verification is pending.
            </p>
            
            <div style="display: flex; gap: 10px;">
                <button type="button" class="btn-secondary-action" id="btn-wait-close" style="flex: 1; border-radius: 6px; padding: 10px; font-weight: 750; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; cursor: pointer; outline: none;">Close Window</button>
            </div>
        `;
        
        modal.querySelector('#btn-wait-close').onclick = () => {
            modal.style.display = 'none';
            clearInterval(waitInterval);
        };

        waitInterval = setInterval(() => {
            const attempts = JSON.parse(localStorage.getItem('beacon_payment_attempts')) || [];
            const a = attempts.find(x => x.bookingId === bookingId);
            if (a && a.status === 'PLANNER_CONFIRMED') {
                clearInterval(waitInterval);
                contentEl.innerHTML = `
                    <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
                    <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 20px; font-weight: 850;">✓ Payment Verified</h3>
                    <p style="font-size: 14px; color: var(--accent-cyan); font-weight: 700; margin-bottom: 15px;">${amount}</p>
                    
                    <p style="font-size: 13px; color: var(--text-slate); line-height: 1.6; margin-bottom: 25px;">
                        <strong>${activeCheckoutPkg.planner || 'WanderWorld Travels'}</strong> has confirmed receiving your payment.<br>
                        Booking <strong>#${bookingId}</strong> is now confirmed.
                    </p>
                    
                    <div style="display: flex; gap: 10px;">
                        <button type="button" class="btn-primary-large" id="btn-wait-view-booking" style="flex: 1; border-radius: 6px; padding: 12px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer; outline: none;">View Booking</button>
                    </div>
                `;
                
                modal.querySelector('#btn-wait-view-booking').onclick = () => {
                    modal.style.display = 'none';
                    renderBookingsPage();
                    navigateTo('bookings', true);
                };
            } else if (a && a.status === 'PAYMENT_REVIEW_REQUIRED') {
                clearInterval(waitInterval);
                contentEl.innerHTML = `
                    <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                    <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 20px; font-weight: 850;">Payment Verification Failed</h3>
                    <p style="font-size: 13px; color: var(--text-slate); line-height: 1.6; margin-bottom: 25px;">
                        The planner hasn't been able to locate your ${amount} payment for booking <strong>#${bookingId}</strong>.
                        Please check whether the transaction was successful in your payment app.
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
                        <button type="button" class="btn-primary-large id-btn-i-was-charged" style="border-radius: 6px; padding: 10px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer; outline: none;">I Was Charged (File Dispute)</button>
                        <button type="button" class="btn-secondary-action id-btn-try-again-pay" style="border-radius: 6px; padding: 10px; font-weight: 750; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; cursor: pointer; outline: none;">Try Payment Again</button>
                        <button type="button" class="btn-secondary-action id-btn-close-wait" style="border-radius: 6px; padding: 10px; font-weight: 750; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; cursor: pointer; outline: none;">Close</button>
                    </div>
               `;
               
               modal.querySelector('.id-btn-i-was-charged').onclick = () => {
                   showToast("🛡️ Dispute ticket filed with Support.");
                   modal.style.display = 'none';
               };
               modal.querySelector('.id-btn-try-again-pay').onclick = () => {
                   modal.style.display = 'none';
                   openCheckoutModal(activeCheckoutPkg);
               };
               modal.querySelector('.id-btn-close-wait').onclick = () => {
                   modal.style.display = 'none';
               };
            }
        }, 2000);
    };

    let activeCheckoutPkg = null;
    let activeBookingId = '';

    const openCheckoutModal = (pkg) => {
        activeCheckoutPkg = pkg;
        const randNum = Math.floor(10000 + Math.random() * 90000);
        activeBookingId = `BCN-2026-${randNum}`;

        const isFreelancer = pkg.style === 'couple' || pkg.category === 'beaches';
        let upiId = 'wanderworld@upi';
        let plannerName = 'WanderWorld Travels';
        if (isFreelancer) {
            upiId = localStorage.getItem('beacon_planner_upi') || 'rahul@upi';
            plannerName = localStorage.getItem('beacon_planner_business') || 'Rahul Mehta';
        } else {
            upiId = 'wanderlust@upi';
            plannerName = 'Wanderlust Travels';
        }

        // Direct Payment Confirmation Overlay Setup
        document.getElementById('direct-confirm-amount').innerText = pkg.priceStr;
        document.getElementById('direct-confirm-planner').innerText = plannerName;
        document.getElementById('direct-confirm-booking-id').innerText = activeBookingId;
        
        directConfirmModal.style.display = 'flex';

        btnDirectPayCancel.onclick = () => {
            directConfirmModal.style.display = 'none';
        };

        btnDirectPayContinue.onclick = () => {
            directConfirmModal.style.display = 'none';

            // Populate checkout modal
            document.getElementById('checkout-booking-id').innerText = activeBookingId;
            document.getElementById('checkout-package-title').innerText = pkg.title;
            document.getElementById('checkout-payable-amount').innerText = pkg.priceStr;
            document.getElementById('checkout-upi-display').innerText = upiId;
            document.getElementById('checkout-note-display').innerText = activeBookingId;

            const cleanAmt = pkg.priceStr.replace(/[^0-9]/g, '');
            const upiPayload = `upi://pay?pa=${upiId}&pn=BeaconTravel&am=${cleanAmt}&tn=${activeBookingId}&cu=INR`;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiPayload)}`;
            document.getElementById('checkout-qr-code').src = qrUrl;

            step1.style.display = 'block';
            step2.style.display = 'none';
            utrInput.value = '';
            checkoutModal.style.display = 'flex';

            // Create Payment Attempt (Backend registry simulator)
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const secTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            
            const newAttempt = {
                id: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
                bookingId: activeBookingId,
                plannerId: plannerName,
                customerName: "Rahul Sharma",
                packageName: pkg.title,
                amount: pkg.priceStr,
                status: "PAYMENT_INITIATED",
                created_at: timeStr,
                customer_marked_paid_at: null,
                planner_confirmed_at: null,
                utrId: "",
                history: [
                    `${secTimeStr} Booking created`,
                    `${secTimeStr} Customer initiated ${pkg.priceStr} payment`,
                    `${secTimeStr} Planner notification sent`
                ]
            };

            let attempts = JSON.parse(localStorage.getItem('beacon_payment_attempts')) || [];
            attempts.unshift(newAttempt);
            localStorage.setItem('beacon_payment_attempts', JSON.stringify(attempts));

            // Alert the planner: Alert A
            playDirectPaymentSound('started');
            speakDirectPaymentVoice(`Beacon payment alert. A payment of ${cleanAmt} rupees has been initiated.`);
            addBeaconNotification(`Payment initiated: ${pkg.priceStr}`, 'started', activeBookingId, pkg.priceStr);
            showPlannerRealTimePopup("🔔 PAYMENT IN PROGRESS", "Payment Started", activeBookingId, pkg.priceStr, "Rahul Sharma", timeStr, "started", newAttempt.id);
            
            renderPaymentsDashboard();
        };
    };

    if (checkoutModal) {
        if (closeCheckoutBtn) {
            closeCheckoutBtn.addEventListener('click', () => {
                checkoutModal.style.display = 'none';
            });
        }
        if (btnHavePaid) {
            btnHavePaid.addEventListener('click', () => {
                step1.style.display = 'none';
                step2.style.display = 'block';
            });
        }
        if (btnBackToQr) {
            btnBackToQr.addEventListener('click', () => {
                step2.style.display = 'none';
                step1.style.display = 'block';
            });
        }
        if (btnSubmitPayment) {
            btnSubmitPayment.addEventListener('click', () => {
                const utrVal = utrInput.value.trim();
                if (!utrVal || utrVal.length !== 12 || isNaN(utrVal)) {
                    showToast("❌ Please enter a valid 12-digit UPI UTR/Transaction ID");
                    return;
                }

                // Update attempts status: CUSTOMER_MARKED_PAID
                let attempts = JSON.parse(localStorage.getItem('beacon_payment_attempts')) || [];
                const attemptIdx = attempts.findIndex(a => a.bookingId === activeBookingId);
                const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const secTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                
                if (attemptIdx !== -1) {
                    attempts[attemptIdx].status = 'CUSTOMER_MARKED_PAID';
                    attempts[attemptIdx].customer_marked_paid_at = timeStr;
                    attempts[attemptIdx].utrId = utrVal;
                    attempts[attemptIdx].history.push(`${secTimeStr} Customer marked payment as completed`);
                    attempts[attemptIdx].history.push(`${secTimeStr} Planner verification alert sent`);
                    localStorage.setItem('beacon_payment_attempts', JSON.stringify(attempts));
                }

                const newBooking = {
                    id: activeBookingId,
                    packageTitle: activeCheckoutPkg.title,
                    imgUrl: activeCheckoutPkg.imgUrl,
                    price: activeCheckoutPkg.priceStr,
                    dateRange: "Sep 15 - Sep 19, 2026",
                    status: "🟡 PAYMENT VERIFICATION PENDING",
                    utrId: utrVal,
                    accommodation: activeCheckoutPkg.accommodation || "4★ Resort Stay",
                    cancellation: activeCheckoutPkg.cancellation || "Free cancellation within 24 hours."
                };

                let bookingsList = JSON.parse(localStorage.getItem('beacon_bookings')) || [];
                bookingsList.unshift(newBooking);
                localStorage.setItem('beacon_bookings', JSON.stringify(bookingsList));

                checkoutModal.style.display = 'none';
                showToast("✅ Payment details submitted! Verification pending.");

                // Alert the planner: Alert B
                const cleanAmt = activeCheckoutPkg.priceStr.replace(/[^0-9]/g, '');
                playDirectPaymentSound('verification');
                speakDirectPaymentVoice(`Beacon payment alert. The customer has marked a payment of ${cleanAmt} rupees as completed. Please check your account and confirm the payment.`);
                addBeaconNotification(`Payment verification required: ${activeCheckoutPkg.priceStr}`, 'verification', activeBookingId, activeCheckoutPkg.priceStr);
                
                if (attemptIdx !== -1) {
                    showPlannerRealTimePopup("⚠️ PAYMENT VERIFICATION REQUIRED", "Verification Needed", activeBookingId, activeCheckoutPkg.priceStr, "Rahul Sharma", timeStr, "verification", attempts[attemptIdx].id);
                }

                renderBookingsPage();
                renderPaymentsDashboard();
                
                // Open Customer Waiting modal with interval poller
                startCustomerWaitPolling(activeBookingId, activeCheckoutPkg.priceStr);
            });
        }
    }

    // ----------------------------------------------------
    // PLANNER CHIMES & REAL-TIME AUDIO SYNTHESIZERS
    // ----------------------------------------------------
    const initPlannerSettings = () => {
        if (!localStorage.getItem('beacon_planner_business')) {
            localStorage.setItem('beacon_planner_business', 'WanderWorld Travels');
        }
        if (!localStorage.getItem('beacon_planner_upi')) {
            localStorage.setItem('beacon_planner_upi', 'wanderworld@upi');
        }
        if (!localStorage.getItem('beacon_planner_mobile')) {
            localStorage.setItem('beacon_planner_mobile', '9876543210');
        }
        if (!localStorage.getItem('beacon_planner_sound')) {
            localStorage.setItem('beacon_planner_sound', 'on');
        }
        if (!localStorage.getItem('beacon_planner_voice')) {
            localStorage.setItem('beacon_planner_voice', 'on');
        }
        if (!localStorage.getItem('beacon_notifications')) {
            localStorage.setItem('beacon_notifications', JSON.stringify([]));
        }
    };
    initPlannerSettings();

    const playDirectPaymentSound = (type) => {
        if (localStorage.getItem('beacon_planner_sound') === 'off') return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            
            if (type === 'started') {
                // Tone A: Calm rising chime
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.35); // G5
                
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.4);
            } else if (type === 'verification') {
                // Tone B: Urgent dual-tone chime
                const playTone = (freq, delay, duration) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
                    gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration);
                    
                    osc.start(ctx.currentTime + delay);
                    osc.stop(ctx.currentTime + delay + duration);
                };
                playTone(659.25, 0, 0.18); // E5
                playTone(880.00, 0.12, 0.25); // A5
            }
        } catch (e) {
            console.error("AudioContext failed to initialize:", e);
        }
    };

    const speakDirectPaymentVoice = (text) => {
        if (localStorage.getItem('beacon_planner_voice') === 'off') return;
        try {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 1.0;
                utterance.pitch = 1.0;
                window.speechSynthesis.speak(utterance);
            }
        } catch (e) {
            console.error("SpeechSynthesis failed:", e);
        }
    };

    // ----------------------------------------------------
    // BEACON NOTIFICATION CENTER PIPELINE
    // ----------------------------------------------------
    const addBeaconNotification = (text, type, bookingId, amount) => {
        let list = JSON.parse(localStorage.getItem('beacon_notifications')) || [];
        const newAlert = {
            id: Date.now(),
            text: text,
            type: type,
            bookingId: bookingId,
            amount: amount,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        };
        list.unshift(newAlert);
        localStorage.setItem('beacon_notifications', JSON.stringify(list));
        
        renderNotifications();
        updateBellBadge();
        
        // Also fire PWA native notification fallback if window is hidden
        if (document.hidden && Notification.permission === 'granted') {
            try {
                new Notification(`Beacon Alert: ${text}`, {
                    body: `Ref: ${bookingId} • Amount: ${amount}`,
                    icon: 'favicon.ico'
                });
            } catch (err) {
                console.error("Native push failed:", err);
            }
        }
    };

    const renderNotifications = () => {
        const listEl = document.getElementById('notifications-list');
        if (!listEl) return;
        
        const list = JSON.parse(localStorage.getItem('beacon_notifications')) || [];
        if (list.length === 0) {
            listEl.innerHTML = `<div style="color: var(--text-slate); font-size: 12px; text-align: center; padding: 20px 0;">No new alerts.</div>`;
            return;
        }
        
        let html = '';
        list.forEach(alert => {
            let icon = '🟢';
            if (alert.type === 'started') icon = '🟠';
            else if (alert.type === 'verification') icon = '🔴';
            
            html += `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 6px; padding: 10px; font-size: 12px; transition: all 0.3s; ${alert.read ? '' : 'border-left: 3px solid var(--accent-cyan);'}">
                     <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                         <strong style="color: #fff;">${icon} ${alert.text}</strong>
                         <span style="font-size: 10px; color: var(--text-slate);">${alert.timestamp}</span>
                     </div>
                     <div style="color: var(--text-slate); font-size: 11px;">
                         Booking Ref: <strong>${alert.bookingId}</strong> • Amount: <strong>${alert.amount}</strong>
                     </div>
                </div>
            `;
        });
        listEl.innerHTML = html;
    };

    const updateBellBadge = () => {
        const badge = document.getElementById('notification-badge');
        if (!badge) return;
        
        const list = JSON.parse(localStorage.getItem('beacon_notifications')) || [];
        const unread = list.filter(a => !a.read).length;
        
        if (unread > 0) {
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    };

    // Toggle Notifications Dropdown
    const bellBtn = document.getElementById('notification-bell-btn');
    const bellPanel = document.getElementById('notifications-dropdown-panel');
    const markAllReadBtn = document.getElementById('btn-mark-all-read');

    if (bellBtn && bellPanel) {
        bellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const visible = bellPanel.style.display === 'block';
            bellPanel.style.display = visible ? 'none' : 'block';
            
            // Mark as read when opening
            if (!visible) {
                let list = JSON.parse(localStorage.getItem('beacon_notifications')) || [];
                list.forEach(a => a.read = true);
                localStorage.setItem('beacon_notifications', JSON.stringify(list));
                updateBellBadge();
                renderNotifications();
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!bellPanel.contains(e.target) && e.target !== bellBtn) {
                bellPanel.style.display = 'none';
            }
        });
    }

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            let list = JSON.parse(localStorage.getItem('beacon_notifications')) || [];
            list.forEach(a => a.read = true);
            localStorage.setItem('beacon_notifications', JSON.stringify(list));
            updateBellBadge();
            renderNotifications();
            showToast("✓ Marked all alerts as read");
        });
    }

    const requestPushPermission = (callback) => {
        const explainModal = document.getElementById('notification-explain-modal');
        const approveBtn = document.getElementById('btn-approve-notifications');
        const cancelBtn = document.getElementById('btn-cancel-notifications');
        const statusLabel = document.getElementById('push-permission-label');
        
        if (Notification.permission === 'granted') {
            if (statusLabel) statusLabel.innerText = "Enabled";
            if (callback) callback(true);
            return;
        }
        
        explainModal.style.display = 'flex';
        
        approveBtn.onclick = () => {
            explainModal.style.display = 'none';
            Notification.requestPermission().then(permission => {
                if (statusLabel) {
                    statusLabel.innerText = permission === 'granted' ? 'Enabled' : 'Disabled';
                }
                if (permission === 'granted') {
                    showToast("🔔 Direct Payment Alerts enabled!");
                    if (callback) callback(true);
                } else {
                    showToast("❌ Alerts permission denied.");
                    if (callback) callback(false);
                }
            });
        };
        
        cancelBtn.onclick = () => {
            explainModal.style.display = 'none';
            if (statusLabel) statusLabel.innerText = "Disabled";
            if (callback) callback(false);
        };
    };

    // Update Notification settings page labels
    const syncNotificationPermissionsUI = () => {
        const label = document.getElementById('push-permission-label');
        if (label) {
            if (Notification.permission === 'granted') {
                label.innerText = 'Enabled';
            } else if (Notification.permission === 'denied') {
                label.innerText = 'Disabled';
            } else {
                label.innerText = 'Not Requested';
            }
        }
    };

    // Planner Profile Settings Controller
    const plannerModeSelect = document.getElementById('planner-mode-select');
    const plannerFields = document.getElementById('planner-settings-fields');
    const plannerUpiInput = document.getElementById('planner-upi-id');
    const plannerNameInput = document.getElementById('planner-business-name');
    const plannerMobileInput = document.getElementById('planner-upi-mobile');
    const plannerSoundSelect = document.getElementById('planner-sound-toggle');
    const plannerVoiceSelect = document.getElementById('planner-voice-toggle');
    const savePlannerUpiBtn = document.getElementById('btn-save-planner-upi');

    const testChimeBtn = document.getElementById('btn-test-chime');
    const testVoiceBtn = document.getElementById('btn-test-voice');
    const requestPushBtn = document.getElementById('btn-request-push');

    if (plannerModeSelect && plannerFields) {
        const registered = localStorage.getItem('beacon_planner_registered') === 'yes';
        
        plannerModeSelect.value = registered ? 'yes' : 'no';
        plannerFields.style.display = registered ? 'block' : 'none';

        // Load values
        if (plannerNameInput) plannerNameInput.value = localStorage.getItem('beacon_planner_business') || 'WanderWorld Travels';
        if (plannerUpiInput) plannerUpiInput.value = localStorage.getItem('beacon_planner_upi') || 'wanderworld@upi';
        if (plannerMobileInput) plannerMobileInput.value = localStorage.getItem('beacon_planner_mobile') || '9876543210';
        if (plannerSoundSelect) plannerSoundSelect.value = localStorage.getItem('beacon_planner_sound') || 'on';
        if (plannerVoiceSelect) plannerVoiceSelect.value = localStorage.getItem('beacon_planner_voice') || 'on';

        syncNotificationPermissionsUI();

        plannerModeSelect.addEventListener('change', () => {
            const isYes = plannerModeSelect.value === 'yes';
            plannerFields.style.display = isYes ? 'block' : 'none';
            localStorage.setItem('beacon_planner_registered', isYes ? 'yes' : 'no');
            
            // If they opt in, suggest enabling browser alerts!
            if (isYes && Notification.permission !== 'granted') {
                setTimeout(() => {
                    requestPushPermission();
                }, 500);
            }
        });

        savePlannerUpiBtn.addEventListener('click', () => {
            const nameVal = plannerNameInput.value.trim();
            const upiVal = plannerUpiInput.value.trim();
            const mobileVal = plannerMobileInput.value.trim();
            
            if (!nameVal) {
                showToast("❌ Please enter a Payee/Business Name");
                return;
            }
            if (!upiVal || !upiVal.includes('@')) {
                showToast("❌ Please enter a valid UPI ID (e.g. name@bank)");
                return;
            }
            if (!mobileVal || mobileVal.length < 10) {
                showToast("❌ Please enter a valid mobile number");
                return;
            }

            localStorage.setItem('beacon_planner_business', nameVal);
            localStorage.setItem('beacon_planner_upi', upiVal);
            localStorage.setItem('beacon_planner_mobile', mobileVal);
            localStorage.setItem('beacon_planner_sound', plannerSoundSelect.value);
            localStorage.setItem('beacon_planner_voice', plannerVoiceSelect.value);

            showToast("💼 Planner settings saved successfully!");
        });

        if (testChimeBtn) {
            testChimeBtn.addEventListener('click', () => {
                showToast("🔔 Testing audio chimes...");
                playDirectPaymentSound('started');
                setTimeout(() => {
                    playDirectPaymentSound('verification');
                }, 800);
            });
        }

        if (testVoiceBtn) {
            testVoiceBtn.addEventListener('click', () => {
                showToast("🗣️ Testing voice announcement...");
                speakDirectPaymentVoice("Beacon payment alert. A payment of twelve thousand five hundred rupees has been initiated.");
            });
        }

        if (requestPushBtn) {
            requestPushBtn.addEventListener('click', () => {
                requestPushPermission();
            });
        }
    }

    renderBookingsPage();

    // 3. Completed Trips Interactions
    const trGrid = document.getElementById('trips-cards-grid');
    const trWs = document.getElementById('trips-detail-workspace');
    const trBack = document.getElementById('trip-back-btn');
    const trCards = document.querySelectorAll('.trip-preview-card');

    if (trGrid && trWs) {
        trCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.tripId;

                trGrid.style.display = 'none';
                trWs.style.display = 'block';

                // Display targeted detailed trip review card
                const detailViews = document.querySelectorAll('#view-trips .trip-detail-view');
                detailViews.forEach(view => {
                    if (view.id === `trip-ws-${id}`) {
                        view.style.display = 'block'; // Or flex depending on past-trip-card styling
                    } else {
                        view.style.display = 'none';
                    }
                });
            });
        });

        if (trBack) {
            trBack.addEventListener('click', () => {
                trWs.style.display = 'none';
                trGrid.style.display = 'grid';
            });
        }
    }

    
    // ----------------------------------------------------
    // PREMIUM WORKSPACE INTERACTIVE CARDS EVENT BINDINGS
    // ----------------------------------------------------

    // Helper: Dynamic autocomplete locations generator from real package data
    const getAutocompleteDestinations = () => {
        const locations = new Set();
        const defaultLocs = ["Goa", "Kashmir", "Maldives", "Bali", "Thailand", "Dharamshala", "Manali", "Kerala", "Sikkim", "Spiti", "Coorg", "Andaman"];
        defaultLocs.forEach(loc => locations.add(loc));

        if (typeof allPackagesData !== 'undefined' && Array.isArray(allPackagesData)) {
            allPackagesData.forEach(pkg => {
                const title = pkg.title;
                const keywords = ["goa", "kashmir", "maldives", "bali", "thailand", "dharamshala", "manali", "kerala", "sikkim", "spiti", "coorg", "andaman", "leh", "ladakh", "jaipur", "udaipur", "rajasthan", "agra", "rishikesh", "shimla"];
                keywords.forEach(word => {
                    if (title.toLowerCase().includes(word)) {
                        const cased = word.charAt(0).toUpperCase() + word.slice(1);
                        locations.add(cased);
                    }
                });
            });
        }
        return Array.from(locations);
    };

    // 1. Destination Autocomplete & Card Focus
    const destCardWrap = document.getElementById('destination-card-wrap');
    const suggestionsDropdown = document.getElementById('dest-suggestions-dropdown');

    if (destCardWrap && destInput && suggestionsDropdown) {
        const renderSuggestions = () => {
            const query = destInput.value.toLowerCase().trim();
            let destinations = getAutocompleteDestinations();
            
            // Add Anywhere option
            destinations = ["Anywhere", ...destinations];
            
            // If empty, show all default destinations, else filter by search query
            const filtered = query.length > 0 
                ? destinations.filter(dest => dest.toLowerCase().includes(query))
                : destinations;

            if (filtered.length > 0) {
                suggestionsDropdown.style.display = 'block';
                let html = '<div class="suggestion-header">Suggested Destinations</div>';
                filtered.forEach(dest => {
                    html += `<div class="suggestion-item" data-value="${dest}">📍 ${dest}</div>`;
                });
                suggestionsDropdown.innerHTML = html;

                // Re-bind suggestion clicks
                const suggestionItems = suggestionsDropdown.querySelectorAll('.suggestion-item');
                suggestionItems.forEach(item => {
                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const val = item.dataset.value;
                        if (val === 'Anywhere') {
                            destInput.value = '';
                            destInput.placeholder = 'Anywhere';
                        } else {
                            destInput.value = val;
                        }
                        suggestionsDropdown.style.display = 'none';
                        
                        // Fire search update
                        updateLiveAISummary();
                        if (typeof runAIPackageFiltering === 'function') {
                            runAIPackageFiltering(null, null, null);
                        }
                    });
                });
            } else {
                suggestionsDropdown.style.display = 'none';
            }
        };

        // Open suggestions on click card or input focus
        destCardWrap.addEventListener('click', (e) => {
            if (e.target.closest('.suggestion-item')) return;
            destInput.focus();
            renderSuggestions();
        });

        destInput.addEventListener('focus', () => {
            renderSuggestions();
        });

        // Filter suggestions dynamically on input typing
        destInput.addEventListener('input', () => {
            renderSuggestions();
        });

        // Dismiss dropdown on blur with delay to allow clicks to register
        destInput.addEventListener('blur', () => {
            setTimeout(() => {
                suggestionsDropdown.style.display = 'none';
            }, 250);
        });
    }

    // 2. Custom Date-Range Calendar Popover & Formatter
    const calPopover = document.getElementById('custom-calendar-popover');
    const calMobileOverlay = document.getElementById('calendar-mobile-overlay');
    const fromHalf = document.getElementById('dates-from-half');
    const toHalf = document.getElementById('dates-to-half');
    const fromValue = document.getElementById('dates-from-value');
    const toValue = document.getElementById('dates-to-value');
    const flexibleBtn = document.getElementById('btn-flexible-dates');
    const datesSummary = document.getElementById('dates-duration-summary');

    let selectedFromDate = null;
    let selectedToDate = null;
    let selectingMode = 'from'; // 'from' or 'to'
    let calMonth = new Date().getMonth();
    let calYear = new Date().getFullYear();

    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsListShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekdaysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const formatDateForDisplay = (date) => {
        if (!date) return "";
        const day = date.getDate();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthShort = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${monthShort} ${year}`;
    };

    const formatDateForInput = (date) => {
        if (!date) return "";
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const formatDatesCard = () => {
        if (!fromValue || !toValue) return;

        if (selectedFromDate) {
            fromValue.innerText = formatDateForDisplay(selectedFromDate);
            flexibleBtn.classList.remove('active');
        } else {
            fromValue.innerText = "Select Date";
        }

        if (selectedToDate) {
            toValue.innerText = formatDateForDisplay(selectedToDate);
            flexibleBtn.classList.remove('active');
        } else {
            toValue.innerText = "Select Date";
        }

        // Synchronize From and To label continuous blinking states
        const fromLabel = fromHalf ? fromHalf.querySelector('.dates-label') : null;
        const toLabel = toHalf ? toHalf.querySelector('.dates-label') : null;
        const isFlexibleActive = flexibleBtn && flexibleBtn.classList.contains('active');

        if (fromLabel) {
            if (!selectedFromDate && !isFlexibleActive) {
                fromLabel.classList.add('text-blink-continuous');
            } else {
                fromLabel.classList.remove('text-blink-continuous');
            }
        }

        if (toLabel) {
            if (selectedFromDate && !selectedToDate && !isFlexibleActive) {
                toLabel.classList.add('text-blink-continuous');
            } else {
                toLabel.classList.remove('text-blink-continuous');
            }
        }

        // Nights & Days Calculation
        if (selectedFromDate && selectedToDate && datesSummary) {
            const diffTime = selectedToDate.getTime() - selectedFromDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 0) {
                datesSummary.style.display = "block";
                datesSummary.innerHTML = `🛏 ${diffDays} Nights • ${diffDays + 1} Days`;
            } else {
                datesSummary.style.display = "none";
            }
        } else {
            if (datesSummary) datesSummary.style.display = "none";
        }
    };

    const renderCustomCalendar = () => {
        console.log("renderCustomCalendar running. calPopover:", calPopover, "Month:", calMonth, "Year:", calYear);
        if (!calPopover) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Header HTML
        let html = `
            <div class="cal-header">
                <button type="button" class="cal-nav-btn prev-month">←</button>
                <span class="cal-month-title">${monthsList[calMonth]} ${calYear}</span>
                <button type="button" class="cal-nav-btn next-month">→</button>
            </div>
            <div class="cal-weekdays">
        `;

        // Weekdays HTML
        weekdaysList.forEach(day => {
            html += `<span>${day}</span>`;
        });
        html += `</div><div class="cal-days">`;

        // Start of month day offsets
        const firstDay = new Date(calYear, calMonth, 1);
        let startOffset = (firstDay.getDay() + 6) % 7;

        for (let i = 0; i < startOffset; i++) {
            html += `<span class="cal-day disabled"></span>`;
        }

        // Days in month
        const totalDays = new Date(calYear, calMonth + 1, 0).getDate();

        for (let day = 1; day <= totalDays; day++) {
            const currentCellDate = new Date(calYear, calMonth, day);
            currentCellDate.setHours(0, 0, 0, 0);

            // Past dates disabled
            let isDisabled = currentCellDate < today;

            // Dates before From date disabled if selecting To date
            if (selectingMode === 'to' && selectedFromDate && currentCellDate < selectedFromDate) {
                isDisabled = true;
            }

            // CSS classes
            let classes = ["cal-day"];
            if (isDisabled) {
                classes.push("disabled");
            }

            if (selectedFromDate && currentCellDate.getTime() === selectedFromDate.getTime()) {
                classes.push("selected-from");
            } else if (selectedToDate && currentCellDate.getTime() === selectedToDate.getTime()) {
                classes.push("selected-to");
            } else if (selectedFromDate && selectedToDate && currentCellDate > selectedFromDate && currentCellDate < selectedToDate) {
                classes.push("selected-range");
            }

            if (currentCellDate.getTime() === today.getTime()) {
                classes.push("is-today");
            }

            html += `<span class="${classes.join(' ')}" data-day="${day}">${day}</span>`;
        }

        html += `</div>`;

        // Add Footer Actions (Clear & Done)
        html += `
            <div class="cal-footer">
                <button type="button" class="cal-btn-clear">Clear</button>
                <button type="button" class="cal-btn-done" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 6px 16px;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Done</span>
                </button>
            </div>
        `;

        calPopover.innerHTML = html;

        // Bind clicks to navigation buttons
        const prevBtn = calPopover.querySelector('.prev-month');
        const nextBtn = calPopover.querySelector('.next-month');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                calMonth--;
                if (calMonth < 0) {
                    calMonth = 11;
                    calYear--;
                }
                renderCustomCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                calMonth++;
                if (calMonth > 11) {
                    calMonth = 0;
                    calYear++;
                }
                renderCustomCalendar();
            });
        }

        const dayElements = calPopover.querySelectorAll('.cal-day:not(.disabled)');
        const calDaysContainer = calPopover.querySelector('.cal-days');

        // Hover range preview logic
        if (calDaysContainer && selectingMode === 'to' && selectedFromDate) {
            dayElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    const cellDay = parseInt(el.dataset.day);
                    const cellDate = new Date(calYear, calMonth, cellDay);
                    cellDate.setHours(0,0,0,0);
                    
                    if (cellDate >= selectedFromDate) {
                        dayElements.forEach(otherEl => {
                            const otherDay = parseInt(otherEl.dataset.day);
                            const otherDate = new Date(calYear, calMonth, otherDay);
                            otherDate.setHours(0,0,0,0);
                            
                            if (otherDate > selectedFromDate && otherDate <= cellDate) {
                                otherEl.classList.add('in-hover-range');
                            } else {
                                otherEl.classList.remove('in-hover-range');
                            }
                        });
                    }
                });
            });

            calDaysContainer.addEventListener('mouseleave', () => {
                dayElements.forEach(el => el.classList.remove('in-hover-range'));
            });
        }

        // Bind clicks to day elements
        dayElements.forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                const clickedDay = parseInt(el.dataset.day);
                const chosenDate = new Date(calYear, calMonth, clickedDay);
                chosenDate.setHours(0,0,0,0);

                if (selectingMode === 'from') {
                    selectedFromDate = chosenDate;
                    selectedToDate = null; // reset end date
                    selectingMode = 'to';
                    if (startDateInput) startDateInput.value = formatDateForInput(chosenDate);
                    if (endDateInput) endDateInput.value = "";
                    renderCustomCalendar();
                    formatDatesCard();
                } else {
                    selectedToDate = chosenDate;
                    if (endDateInput) endDateInput.value = formatDateForInput(chosenDate);
                    formatDatesCard();
                    closeCalendar();
                    updateDurationFromDates();
                }
            });
        });

        // Bind clicks to footer buttons
        const clearBtn = calPopover.querySelector('.cal-btn-clear');
        const doneBtn = calPopover.querySelector('.cal-btn-done');

        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                selectedFromDate = null;
                selectedToDate = null;
                selectingMode = 'from';
                if (startDateInput) startDateInput.value = "";
                if (endDateInput) endDateInput.value = "";
                formatDatesCard();
                renderCustomCalendar();
                updateDurationFromDates();
            });
        }

        if (doneBtn) {
            doneBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeCalendar();
                formatDatesCard();
                updateDurationFromDates();
            });
        }
    };

    const openCalendar = (mode) => {
        console.log("openCalendar called with mode:", mode);
        selectingMode = mode;
        if (calPopover) {
            console.log("Setting calPopover display to block");
            calPopover.style.display = 'block';
            setTimeout(() => calPopover.classList.add('active'), 10);
        } else {
            console.log("calPopover element is null!");
        }
        if (calMobileOverlay) {
            calMobileOverlay.style.display = 'block';
            setTimeout(() => calMobileOverlay.classList.add('active'), 10);
        }
        renderCustomCalendar();
    };

    const closeCalendar = () => {
        if (calPopover) {
            calPopover.classList.remove('active');
            setTimeout(() => {
                if (!calPopover.classList.contains('active')) {
                    calPopover.style.display = 'none';
                }
            }, 250);
        }
        if (calMobileOverlay) {
            calMobileOverlay.classList.remove('active');
            setTimeout(() => {
                if (!calMobileOverlay.classList.contains('active')) {
                    calMobileOverlay.style.display = 'none';
                }
            }, 250);
        }
    };

    // Card Half Click triggers
    if (fromHalf) {
        fromHalf.addEventListener('click', (e) => {
            console.log("FROM DATE CLICKED");
            e.stopPropagation();
            openCalendar('from');
        });
    }

    if (toHalf) {
        toHalf.addEventListener('click', (e) => {
            console.log("TO DATE CLICKED");
            e.stopPropagation();
            openCalendar('to');
        });
    }

    // Flexible dates click handler
    if (flexibleBtn) {
        flexibleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedFromDate = null;
            selectedToDate = null;
            selectingMode = 'from';
            if (startDateInput) startDateInput.value = "";
            if (endDateInput) endDateInput.value = "";
            
            // Mark visually as Flexible
            if (fromValue && toValue) {
                fromValue.innerText = "Flexible";
                toValue.innerText = "Flexible";
            }
            if (datesSummary) datesSummary.style.display = "none";
            flexibleBtn.classList.add('active');
            
            closeCalendar();
            updateDurationFromDates();
        });
    }

    // Click outside handler
    document.addEventListener('click', (e) => {
        if (calPopover && !calPopover.contains(e.target) && 
            (!fromHalf || !fromHalf.contains(e.target)) && 
            (!toHalf || !toHalf.contains(e.target))) {
            closeCalendar();
        }
    });

    // Escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCalendar();
            
            // 1. Close open modals or sheets first
            const checkoutModal = document.getElementById('checkout-payment-modal');
            if (checkoutModal && checkoutModal.style.display === 'flex') {
                checkoutModal.style.display = 'none';
                return;
            }
            
            const directConfirmModal = document.getElementById('customer-direct-pay-confirm-modal');
            if (directConfirmModal && directConfirmModal.style.display === 'flex') {
                directConfirmModal.style.display = 'none';
                return;
            }
            
            const waitModal = document.getElementById('customer-wait-verification-modal');
            if (waitModal && waitModal.style.display === 'flex') {
                waitModal.style.display = 'none';
                return;
            }
            
            const sheet = document.getElementById('price-breakdown-popup-sheet');
            if (sheet && sheet.style.display === 'block') {
                sheet.style.display = 'none';
                return;
            }
            
            // 2. View specific step-backs
            if (currentViewId === 'mobile-booking' && activeBookingState) {
                const step = activeBookingState.currentStep;
                const pkg = activeBookingState.pkg;
                if (step > 1) {
                    activeBookingState.currentStep -= 1;
                    autoSaveDraft();
                    renderMobileBookingWizard();
                } else {
                    // Return back to details view page
                    if (window.innerWidth < 768) {
                        navigateTo('package-details', true);
                        renderMobilePackageDetails(pkg);
                    } else {
                        openPackageDetailsView(pkg);
                    }
                }
            } else if (currentViewId === 'package-details') {
                // Return back to previous page (Home / Matchmaker results, etc.)
                navigateTo(previousViewId);
            } else if (currentViewId === 'receipt-viewer') {
                // Return to Bookings
                navigateTo('bookings', true);
            } else if (currentViewId === 'planner-profile' && activeDetailsPkg) {
                // Return back to package details
                navigateTo('package-details', true);
                if (window.innerWidth < 768) {
                    renderMobilePackageDetails(activeDetailsPkg);
                } else {
                    openPackageDetailsView(activeDetailsPkg);
                }
            } else if (currentViewId === 'enquiries') {
                const eqGrid = document.getElementById('enquiries-cards-grid');
                const eqWS = document.getElementById('enquiries-detail-workspace');
                if (eqWS && eqWS.style.display === 'block') {
                    eqWS.style.display = 'none';
                    if (eqGrid) eqGrid.style.display = 'grid';
                }
            } else if (currentViewId === 'bookings') {
                const bkGrid = document.getElementById('bookings-cards-grid');
                const bkWs = document.getElementById('bookings-detail-workspace');
                if (bkWs && bkWs.style.display === 'block') {
                    bkWs.style.display = 'none';
                    if (bkGrid) bkGrid.style.display = 'grid';
                }
            } else if (currentViewId === 'trips') {
                const trGrid = document.getElementById('trips-cards-grid');
                const trWs = document.getElementById('trips-detail-workspace');
                if (trWs && trWs.style.display === 'block') {
                    trWs.style.display = 'none';
                    if (trGrid) trGrid.style.display = 'grid';
                }
            }
        }
    });

    // Mobile overlay close trigger
    if (calMobileOverlay) {
        calMobileOverlay.addEventListener('click', closeCalendar);
    }

    // Initialize formatting
    formatDatesCard();

    // 3. Duration Selectable Chips
    const durationChips = document.querySelectorAll('.duration-chip');
    const durSelectInput = document.getElementById('match-duration');
    const flexibleChip = document.getElementById('duration-chip-flexible');

    if (durationChips.length > 0 && durSelectInput) {
        durationChips.forEach(chip => {
            chip.addEventListener('click', () => {
                if (chip === flexibleChip) {
                    if (!flexibleChip.querySelector('input')) {
                        durationChips.forEach(c => c.classList.remove('active'));
                        flexibleChip.classList.add('active');
                        
                        flexibleChip.innerHTML = '<input type="number" class="chip-num-input" placeholder="Any" min="1" max="90" style="width: 100%; height: 100%; border: none; background: transparent; color: inherit; text-align: center; font-weight: 800; outline: none; font-size: 11px;">';
                        const numIn = flexibleChip.querySelector('input');
                        numIn.focus();
                        
                        numIn.addEventListener('input', (e) => {
                            e.stopPropagation();
                            const val = numIn.value;
                            durSelectInput.value = val ? val : 'all';
                            durSelectInput.dispatchEvent(new Event('change'));
                        });

                        numIn.addEventListener('blur', () => {
                            setTimeout(() => {
                                if (!numIn.value) {
                                    flexibleChip.innerHTML = '<span>✏️</span> Customizer';
                                    durSelectInput.value = 'all';
                                    durSelectInput.dispatchEvent(new Event('change'));
                                } else {
                                    flexibleChip.innerHTML = `<span>✏️</span> ${numIn.value} Days`;
                                }
                            }, 200);
                        });
                    }
                } else {
                    if (flexibleChip && flexibleChip.querySelector('input')) {
                        flexibleChip.innerHTML = '<span>✏️</span> Customizer';
                    }
                    
                    durationChips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    
                    const val = chip.dataset.value;
                    durSelectInput.value = val;
                    durSelectInput.dispatchEvent(new Event('change'));
                }
            });
        });
    }

    // 4. Budget Scale Ticks snap clicks
    const scaleTicks = document.querySelectorAll('.budget-scale-ticks span');
    if (scaleTicks.length > 0) {
        scaleTicks.forEach(tick => {
            tick.addEventListener('click', (e) => {
                e.stopPropagation();
                const tickVal = parseInt(tick.dataset.val);
                if (isNaN(tickVal)) return;

                const distToMin = Math.abs(tickVal - currentMinBudget);
                const distToMax = Math.abs(tickVal - currentMaxBudget);

                if (distToMin < distToMax) {
                    currentMinBudget = Math.min(tickVal, currentMaxBudget - 2000);
                } else {
                    currentMaxBudget = Math.max(tickVal, currentMinBudget + 2000);
                }

                syncBudgetInputsAndSlider();
            });
        });
    }

    
    // ----------------------------------------------------
    // MY COLLECTION TABPANEL LOGIC & DATA RENDERING
    // ----------------------------------------------------

    const getChronologicalGroup = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const isToday = now.toDateString() === date.toDateString();
        if (isToday) {
            return 'Today';
        }
        
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = yesterday.toDateString() === date.toDateString();
        if (isYesterday) {
            return 'Yesterday';
        }
        
        return 'Earlier';
    };

    const formatTimeAgo = (timestamp) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return "Viewed just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `Viewed ${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `Viewed ${hours} hours ago`;
        return "Viewed yesterday";
    };

    const generateAIInsight = (pkgs) => {
        if (pkgs.length < 2) return "";
        
        let bestMatchPkg = pkgs[0];
        let cheapestPkg = pkgs[0];
        let highestRatingPkg = pkgs[0];
        
        pkgs.forEach(p => {
            if ((p.matchScore || 90) > (bestMatchPkg.matchScore || 90)) bestMatchPkg = p;
            if (p.priceNum < cheapestPkg.priceNum) cheapestPkg = p;
            const r1 = parseFloat(p.rating.replace(/[^0-9.]/g, '')) || 4.0;
            const r2 = parseFloat(highestRatingPkg.rating.replace(/[^0-9.]/g, '')) || 4.0;
            if (r1 > r2) highestRatingPkg = p;
        });
        
        let priceDiffText = "";
        const otherPrices = pkgs.filter(p => p.title !== cheapestPkg.title).map(p => p.priceNum);
        if (otherPrices.length > 0) {
            const avgOther = otherPrices.reduce((a, b) => a + b, 0) / otherPrices.length;
            const savings = Math.round(avgOther - cheapestPkg.priceNum);
            if (savings > 0) {
                priceDiffText = `"${cheapestPkg.title}" saves approximately ₹${savings.toLocaleString()} compared to other choices.`;
            }
        }
        
        return `
            <div style="font-size: 16px; margin-right: 12px; margin-top: 2px;">✨</div>
            <div>
                <strong style="color: var(--accent-cyan); display: block; font-size: 13px; font-weight: 800; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Beacon AI Insight</strong>
                <p style="font-size: 13px; line-height: 1.6; color: #fff; margin: 0;">
                    "${bestMatchPkg.title}" is your strongest overall match at ${bestMatchPkg.matchScore || 95}%. 
                    ${priceDiffText} 
                    "${highestRatingPkg.title}" stands out with the highest traveler rating of ${highestRatingPkg.rating}.
                </p>
            </div>
        `;
    };

    const recordRecentlyViewed = (pkg) => {
        let recentList = JSON.parse(localStorage.getItem('beacon_recent_views')) || [];
        recentList = recentList.filter(item => item.title !== pkg.title);
        recentList.unshift({
            title: pkg.title,
            viewedAt: Date.now()
        });
        recentList = recentList.slice(0, 15);
        localStorage.setItem('beacon_recent_views', JSON.stringify(recentList));
    };

    const renderSimilarPackages = (currentPkg) => {
        const recsGrid = document.getElementById('similar-packages-grid');
        if (!recsGrid) return;

        let similarList = allPackagesData.filter(p => p.title !== currentPkg.title);

        similarList.forEach(p => {
            let score = 0;
            if (p.category === currentPkg.category) score += 40;
            if (p.style === currentPkg.style) score += 25;
            const priceDiffRatio = Math.abs(p.priceNum - currentPkg.priceNum) / currentPkg.priceNum;
            if (priceDiffRatio <= 0.3) {
                score += Math.round((1 - priceDiffRatio) * 25);
            }
            if (Math.abs(p.duration - currentPkg.duration) <= 1) {
                score += 10;
            }
            p.similarityScore = score;
        });

        similarList.sort((a, b) => b.similarityScore - a.similarityScore);
        const top4 = similarList.slice(0, 4);

        let html = '';
        top4.forEach(p => {
            const matchPercent = Math.min(96, Math.max(78, Math.round(75 + p.similarityScore / 1.5)));
            const isSaved = savedList.includes(p.title);
            const isCompared = selectedComparePackages.some(item => item.title === p.title);
            
            let reasonText = "Popular choice";
            if (p.category === currentPkg.category) reasonText = "Same Destination";
            else if (p.style === currentPkg.style) reasonText = `Similar ${p.style}`;
            else if (Math.abs(p.priceNum - currentPkg.priceNum) / currentPkg.priceNum <= 0.15) reasonText = "Similar budget";
            
            html += `
                <div class="travel-card rec-travel-card" style="cursor: pointer; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; position: relative;">
                    <div style="background-image: url('${p.imgUrl}'); background-size: cover; background-position: center; height: 140px; width: 100%; position: relative;">
                        <span style="position: absolute; top: 12px; left: 12px; background: rgba(3, 7, 18, 0.85); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); font-size: 9px; font-weight: 850; padding: 2px 6px; border-radius: 4px;">${matchPercent}% MATCH</span>
                    </div>
                    <div style="padding: 15px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                <span style="font-size: 10px; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">📍 ${p.category.toUpperCase()}</span>
                                <span style="font-size: 9.5px; color: var(--text-slate); font-weight: 700;">${reasonText}</span>
                            </div>
                            <h4 class="card-title" style="font-size: 13px; font-weight: 800; color: #fff; margin: 0 0 6px 0; line-height: 1.4;">${p.title}</h4>
                            <span style="font-size: 11px; color: var(--text-slate); display: block; margin-bottom: 12px;">${p.duration} Days • ⭐ ${p.rating}</span>
                        </div>
                        
                        <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                            <strong style="font-size: 14px; color: var(--accent-cyan);">${p.priceStr}</strong>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <button type="button" class="btn-rec-save" style="background: transparent; border: none; font-size: 14px; cursor: pointer; color: ${isSaved ? 'var(--accent-cyan)' : 'var(--text-slate)'}; outline: none;">${isSaved ? '❤️' : '♡'}</button>
                                <button type="button" class="btn-rec-compare" style="background: transparent; border: none; font-size: 13px; cursor: pointer; color: ${isCompared ? 'var(--accent-cyan)' : 'var(--text-slate)'}; font-weight: 800; outline: none;">${isCompared ? '✓' : '+'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        recsGrid.innerHTML = html;

        const recCards = recsGrid.querySelectorAll('.rec-travel-card');
        recCards.forEach((card, idx) => {
            const targetPkg = top4[idx];
            
            card.addEventListener('click', (e) => {
                if (e.target.closest('button')) return;
                openPackageDetailsView(targetPkg);
            });

            const saveBtn = card.querySelector('.btn-rec-save');
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSave(targetPkg.title);
                const currentlySaved = savedList.includes(targetPkg.title);
                saveBtn.innerHTML = currentlySaved ? '❤️' : '♡';
                saveBtn.style.color = currentlySaved ? 'var(--accent-cyan)' : 'var(--text-slate)';
                
                const mainSaveToggle = document.querySelector(`.details-save-btn`);
                if (mainSaveToggle && targetPkg.title === currentPkg.title) {
                    mainSaveToggle.innerHTML = currentlySaved ? '❤️ Saved' : '♡ Save';
                }
            });

            const compBtn = card.querySelector('.btn-rec-compare');
            compBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isComp = selectedComparePackages.some(item => item.title === targetPkg.title);
                toggleComparePackage(targetPkg, !isComp);
                const currentlyCompared = selectedComparePackages.some(item => item.title === targetPkg.title);
                compBtn.innerHTML = currentlyCompared ? '✓' : '+';
                compBtn.style.color = currentlyCompared ? 'var(--accent-cyan)' : 'var(--text-slate)';
            });
        });
    };

    const openPlannerProfileView = (partnerData, currentPkg) => {
        const profileView = document.getElementById('view-planner-profile');
        if (!profileView) return;

        navigateTo('planner-profile', true);

        const isFreelancer = partnerData.name === "Rahul Mehta";
        const partnerPackages = allPackagesData.filter(p => {
            if (p.title === currentPkg.title) return false;
            if (isFreelancer) {
                return p.category === 'beaches' || p.style === 'couple';
            } else {
                return p.category === 'mountains' || p.category === 'nature' || p.category === 'spiritual';
            }
        }).slice(0, 4);

        let pkgCardsHtml = '';
        partnerPackages.forEach(p => {
            pkgCardsHtml += `
                <div class="travel-card" style="cursor: pointer; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
                    <div style="background-image: url('${p.imgUrl}'); background-size: cover; background-position: center; height: 160px; width: 100%;"></div>
                    <div style="padding: 15px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <span style="font-size: 10px; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">📍 ${p.category.toUpperCase()}</span>
                            <h5 class="card-title" style="font-size: 13px; font-weight: 800; color: #fff; margin: 4px 0; line-height: 1.4;">${p.title}</h5>
                            <span style="font-size: 11px; color: var(--text-slate);">${p.duration} Days • ⭐ ${p.rating}</span>
                        </div>
                        <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
                            <strong style="font-size: 14px; color: var(--accent-cyan);">${p.priceStr}</strong>
                        </div>
                    </div>
                </div>
            `;
        });

        if (partnerPackages.length === 0) {
            pkgCardsHtml = `<div style="grid-column: 1/-1; color: var(--text-slate); font-size: 12.5px; font-style: italic; padding: 20px 0;">No other packages currently listed by this partner.</div>`;
        }

        profileView.innerHTML = `
            <div class="details-back-bar">
                <button type="button" class="btn-profile-back" style="background: transparent; border: none; color: var(--text-slate); font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">← Back to ${currentPkg.title}</button>
            </div>
            
            <div class="details-container">
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">
                    <div>
                        <div style="background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 30px;">
                            <div class="partner-avatar" style="width: 100px; height: 100px; margin: 0 auto 15px auto; background-image: url('${partnerData.avatar}'); border-radius: 50%; background-size: cover; background-position: center; border: 2px solid var(--accent-cyan);"></div>
                            <h3 style="font-size: 20px; font-weight: 850; color: #fff; margin: 0 0 6px 0; display: flex; align-items: center; justify-content: center; gap: 6px;">${partnerData.name} <span style="font-size: 10px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 5px; border-radius: 3px; vertical-align: middle;">✓ VERIFIED</span></h3>
                            <span style="font-size: 12px; color: var(--text-slate); font-weight: 750; text-transform: uppercase;">${partnerData.type}</span>
                            
                            <div style="margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; display: flex; flex-direction: column; gap: 12px; text-align: left;">
                                <div>
                                    <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Office / Base Location</span>
                                    <strong style="font-size: 13px; color: #fff;">${partnerData.location}</strong>
                                </div>
                                <div>
                                    <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Languages Spoken</span>
                                    <strong style="font-size: 13px; color: #fff;">${partnerData.languages.join(', ')}</strong>
                                </div>
                                <div>
                                    <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Average response rate</span>
                                    <strong style="font-size: 13px; color: #22c55e;">${partnerData.responseRate} (Usually responds in 20 min)</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div style="background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; margin-bottom: 40px;">
                            <h4 style="font-size: 17px; font-weight: 800; color: #fff; margin: 0 0 15px 0; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">About Partner / Biography</h4>
                            <p style="font-size: 13.5px; line-height: 1.7; color: var(--text-slate); margin-bottom: 25px;">${partnerData.about} We coordinate verified luxury travel experiences directly on site to offer local expertise. Feel free to contact our support for customized modifications.</p>
                            
                            <h4 style="font-size: 17px; font-weight: 800; color: #fff; margin: 0 0 15px 0; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">Expertise & Certifications</h4>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 25px;">
                                ${partnerData.expertise.map(exp => `<span style="font-size: 11.5px; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.06); padding: 4px 12px; border-radius: 4px; font-weight: 700;">${exp}</span>`).join('')}
                            </div>
                            
                            <h4 style="font-size: 17px; font-weight: 800; color: #fff; margin: 0 0 15px 0; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">Track Record & Stats</h4>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                                <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; text-align: center;">
                                    <span style="font-size: 24px; font-weight: 850; color: var(--accent-cyan); display: block;">${partnerData.trips}</span>
                                    <span style="font-size: 10px; color: var(--text-slate); text-transform: uppercase;">Trips Guided</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; text-align: center;">
                                    <span style="font-size: 24px; font-weight: 850; color: var(--accent-cyan); display: block;">${partnerData.travelers}</span>
                                    <span style="font-size: 10px; color: var(--text-slate); text-transform: uppercase;">Travelers Hosted</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; text-align: center;">
                                    <span style="font-size: 24px; font-weight: 850; color: var(--accent-cyan); display: block;">${partnerData.destinations}</span>
                                    <span style="font-size: 10px; color: var(--text-slate); text-transform: uppercase;">Destinations covered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 30px;">
                    <h3 style="font-size: 18px; font-weight: 850; color: #fff; margin-bottom: 20px;">💼 Other Packages by this Travel Partner</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;" id="partner-packages-grid">
                        ${pkgCardsHtml}
                    </div>
                </div>
            </div>
        `;

        const backBtn = profileView.querySelector('.btn-profile-back');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                navigateTo('package-details', true);
        if (window.innerWidth < 768) {
            renderMobilePackageDetails(pkg);
            return;
        }
            });
        }

        const partnerCards = profileView.querySelectorAll('.travel-card');
        partnerCards.forEach((card, idx) => {
            card.addEventListener('click', () => {
                const targetPkg = partnerPackages[idx];
                if (targetPkg) {
                    openPackageDetailsView(targetPkg);
                }
            });
        });
    };

    const openPackageDetailsView = (pkg) => {
        activeDetailsPkg = pkg;
        recordRecentlyViewed(pkg);
        
        let prevName = 'My Collection';
        if (previousViewId === 'home') prevName = 'Home';
        else if (previousViewId === 'planner') prevName = 'Trip Planner';
        else if (previousViewId === 'collection') prevName = 'My Collection';

        const isSaved = savedList.includes(pkg.title);

        let travelDatesStr = "Daily Departures (Aug 2026 – Oct 2026)";
        const planStart = document.getElementById('match-start-date') ? document.getElementById('match-start-date').value : '';
        const planEnd = document.getElementById('match-end-date') ? document.getElementById('match-end-date').value : '';
        
        if (planStart && planEnd) {
            const parseAndFormat = (dateStr) => {
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const date = new Date(parts[0], parts[1] - 1, parts[2]);
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                }
                return dateStr;
            };
            travelDatesStr = `${parseAndFormat(planStart)} – ${parseAndFormat(planEnd)}`;
        } else {
            const today = new Date();
            const startMonth = today.toLocaleString('default', { month: 'short' });
            const endMonth = new Date(today.setMonth(today.getMonth() + 3)).toLocaleString('default', { month: 'short' });
            const currentYear = new Date().getFullYear();
            travelDatesStr = `Flexible (${startMonth} – ${endMonth} ${currentYear})`;
        }
        

        const isCompared = selectedComparePackages.some(item => item.title === pkg.title);

        const detailsView = document.getElementById('view-package-details');
        if (!detailsView) return;

        navigateTo('package-details', true);
        if (window.innerWidth < 768) {
            renderMobilePackageDetails(pkg);
            return;
        }

        const basePriceVal = pkg.basePrice || Math.round(pkg.priceNum * 1.11);
        const basePriceStr = "₹" + basePriceVal.toLocaleString();
        
        const incItems = pkg.inclusions ? pkg.inclusions.split(',').map(item => `<li>✓ ${item.trim()}</li>`).join('') : `
            <li>✓ Roundtrip Economy Flight</li>
            <li>✓ 4★ Hotel Stay (${pkg.accommodation || 'Hotel'})</li>
            <li>✓ Meals: ${pkg.meals || 'Breakfast Included'}</li>
            <li>✓ Transfer: ${pkg.transfers || 'Private Airport Transfer'}</li>
        `;
        const excItems = pkg.exclusions ? pkg.exclusions.split(',').map(item => `<li>✕ ${item.trim()}</li>`).join('') : `
            <li>✕ Personal expenses (Souvenirs, Laundry, Tips)</li>
            <li>✕ Visa Fees ${pkg.category === 'international' ? '(Required)' : '(Not Applicable)'}</li>
            <li>✕ Sightseeing entry tickets not listed in schedule</li>
            <li>✕ Travel & Medical Insurance</li>
        `;

        const isFreelancer = pkg.style === 'couple' || pkg.category === 'beaches';
        const partnerData = isFreelancer ? {
            name: "Rahul Mehta",
            type: "Freelance Trip Planner",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            rating: "4.9",
            reviews: 126,
            location: "Pune, Maharashtra",
            experience: "8 Years",
            trips: 342,
            responseRate: "98%",
            about: "I specialize in Goa, Kerala, and coastal honeymoon experiences. My goal is to customize every itinerary to fit your personal travel rhythm.",
            expertise: ["Goa", "Kerala", "Maldives", "Honeymoon", "Luxury", "Beach Trips"],
            languages: ["English", "Hindi", "Marathi"],
            travelers: "1,280+",
            destinations: 27
        } : {
            name: "Wanderlust Travels",
            type: "Travel Agency",
            avatar: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80",
            rating: "4.8",
            reviews: 892,
            location: "Mumbai, Maharashtra",
            experience: "Operating since 2014",
            trips: "2,800+",
            responseRate: "95%",
            about: "Wanderlust Travels is a premier destination management company. We guarantee verified stays, premium coordinates, and 24/7 on-trip assistance.",
            expertise: ["Himachal", "Kashmir", "Uttarakhand", "Safari", "Spiritual Tours"],
            languages: ["English", "Hindi", "Gujarati", "Punjabi"],
            travelers: "8,500+",
            destinations: 45
        };

        const dur = pkg.duration || 4;
        const activities = pkg.highlights ? pkg.highlights.split(',') : ["Explore local viewpoints", "Guided nature walk", "Leisure tour of surrounding villages"];
        const sights = pkg.sightseeing ? pkg.sightseeing.split(',') : ["Main square", "Local markets", "Scenic viewpoints"];
        
        let itineraryHtml = '';
        for (let day = 1; day <= dur; day++) {
            let dayTitle = "";
            let dayDesc = "";
            let dayTrans = "";
            let dayAct = "";
            let meals = [];
            
            if (day === 1) {
                dayTitle = "Arrival & Resort Check-in";
                dayTrans = "🚗 Private Airport Transfer Included";
                dayAct = "🌅 Sunset Beach Walk & Welcome Cocktail";
                dayDesc = `Arrive at the destination. Transfer to your premium resort and check in. Enjoy a refreshing evening sunset cocktail at the local beach lounge.`;
                meals = ["Dinner"];
            } else if (day === dur) {
                dayTitle = "Breakfast & Departure";
                dayTrans = "🚗 Private Airport Transfer Included";
                dayAct = "🍳 Morning leisure & final checkout";
                dayDesc = "Enjoy a delicious morning breakfast. Complete check-out formalities at the resort and board your private transfer back to the airport/station.";
                meals = ["Breakfast"];
            } else {
                const actIndex = (day - 2) % activities.length;
                const sightIndex = (day - 2) % sights.length;
                dayTitle = activities[actIndex] ? activities[actIndex].trim() : "Local Sightseeing Tour";
                dayTrans = "🚗 Local sightseeing private cab";
                dayAct = `🌊 Explore ${sights[sightIndex] ? sights[sightIndex].trim() : 'scenic highlights'}`;
                dayDesc = `Set out on an exciting sightseeing tour visiting ${sights[sightIndex] ? sights[sightIndex].trim() : 'scenic highlights'}. Accompanied by a local coordinator to guide you through primary spots.`;
                meals = ["Breakfast", "Lunch"];
                if (day % 2 === 0) meals.push("Dinner");
            }
            
            const mealBadges = meals.map(m => `<span style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: var(--text-slate); font-size: 11px; padding: 2px 8px; border-radius: 12px; margin-right: 6px; font-weight: 750;">${m}</span>`).join('');
            
            itineraryHtml += `
                <div class="itinerary-day-card" data-day="${day}">
                    <div class="itinerary-day-header">
                        <div class="itinerary-day-header-left">
                            <span class="day-badge">Day ${day}</span>
                            <span class="day-title-text">${dayTitle}</span>
                        </div>
                        <span class="day-arrow-indicator">▼</span>
                    </div>
                    <div class="itinerary-day-body">
                        <p style="font-size: 13px; color: var(--text-slate); line-height: 1.6; margin: 0 0 15px 0;">${dayDesc}</p>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <div style="font-size: 12.5px; color: var(--text-slate);">🚕 <strong>Transport:</strong><br>${dayTrans}</div>
                            <div style="font-size: 12.5px; color: var(--text-slate);">✨ <strong>Activities:</strong><br>${dayAct}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: var(--text-slate);">
                            <span>🍴 <strong>Meals:</strong></span>
                            <div>${mealBadges}</div>
                        </div>
                    </div>
                </div>
            `;
        }

        detailsView.innerHTML = `
            <div class="details-back-bar">
                <button type="button" class="btn-details-back" style="background: transparent; border: none; color: var(--text-slate); font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">← Back to ${prevName}</button>
            </div>
            
            <div class="details-container">
                <div class="details-hero-grid">
                    <div class="details-gallery-wrap">
                        <div class="gallery-primary-img" style="background-image: url('${pkg.imgUrl}')"></div>
                        <div class="gallery-thumbnails">
                            <div class="gallery-thumb active" style="background-image: url('${pkg.imgUrl}')"></div>
                            <div class="gallery-thumb" style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80')"></div>
                            <div class="gallery-thumb" style="background-image: url('https://images.unsplash.com/photo-1473116763269-255ea76e7c23?auto=format&fit=crop&w=150&q=80')"></div>
                            <div class="gallery-thumb" style="background-image: url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=150&q=80')"></div>
                        </div>
                    </div>
                    
                    <div class="details-info-panel">
                        <div class="details-info-header">
                            <div class="details-info-meta">
                                <span>📍 ${pkg.category.toUpperCase()}</span>
                                <span class="style-badge">${pkg.style.toUpperCase()}</span>
                            </div>
                            <h2 class="details-info-title" style="font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 10px 0;">${pkg.title}</h2>
                            <div class="details-info-rating">⭐ ${pkg.rating} <span style="color: var(--text-slate); font-weight: 500;">(${pkg.reviews || 88} reviews)</span></div>
                        </div>
                        
                        <div class="details-pricing-box">
                            <span class="price-label">Starting Price / Person</span>
                            <span class="price-value">${pkg.priceStr}</span>
                            <span style="display: block; font-size: 11.5px; color: var(--text-slate); margin-top: 4px;">✓ Taxes and transfers included</span>
                        </div>
                        
                        <div class="details-actions-deck">
                            <div class="action-buttons-row">
                                <button type="button" class="btn-secondary-action details-save-btn" style="padding: 12px; border-radius: 8px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 12.5px;">${isSaved ? '❤️ Saved' : '♡ Save'}</button>
                                <button type="button" class="btn-secondary-action details-compare-btn" style="padding: 12px; border-radius: 8px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 12.5px;">${isCompared ? '✓ Compared' : '+ Compare'}</button>
                                <button type="button" class="btn-secondary-action details-share-btn" style="padding: 12px; border-radius: 8px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 12.5px;">🔗 Share</button>
                            </div>
                            <button type="button" class="btn-secondary-action details-enquiry-btn" style="padding: 14px; border-radius: 8px; font-size: 13px; font-weight: 800; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.08);">Send Enquiry</button>
                            <button type="button" class="btn-primary-large details-book-btn" style="padding: 14px; border-radius: 8px; font-size: 13.5px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none;">Book Now</button>
                        </div>
                    </div>
                </div>

                <div class="quick-info-strip">
                    <div class="quick-info-card">
                        <span class="info-icon">⏱</span>
                        <span class="info-label">Duration</span>
                        <span class="info-val">${pkg.duration} Days</span>
                    </div>
                    <div class="quick-info-card">
                        <span class="info-icon">🏨</span>
                        <span class="info-label">Resort</span>
                        <span class="info-val">4★ ${pkg.accommodation || 'Hotel'}</span>
                    </div>
                    <div class="quick-info-card">
                        <span class="info-icon">🍴</span>
                        <span class="info-label">Meals</span>
                        <span class="info-val">Breakfast</span>
                    </div>
                    <div class="quick-info-card">
                        <span class="info-icon">🚗</span>
                        <span class="info-label">Transfers</span>
                        <span class="info-val">Private Cab</span>
                    </div>
                    <div class="quick-info-card">
                        <span class="info-icon">👥</span>
                        <span class="info-label">Style</span>
                        <span class="info-val">${pkg.style}</span>
                    </div>
                    <div class="quick-info-card">
                        <span class="info-icon">🛡</span>
                        <span class="info-label">Policies</span>
                        <span class="info-val">Flexible</span>
                    </div>
                </div>

                <div class="details-section-nav-wrap">
                    <div class="details-section-nav">
                        <button type="button" class="details-nav-item active" data-sec="overview">Overview</button>
                        <button type="button" class="details-nav-item" data-sec="itinerary">Itinerary</button>
                        <button type="button" class="details-nav-item" data-sec="stay">Stay</button>
                        <button type="button" class="details-nav-item" data-sec="transport">Transport</button>
                        <button type="button" class="details-nav-item" data-sec="meals">Meals</button>
                        <button type="button" class="details-nav-item" data-sec="activities">Activities</button>
                        <button type="button" class="details-nav-item" data-sec="inclusions">Inclusions</button>
                        <button type="button" class="details-nav-item" data-sec="partner">Planner</button>
                        <button type="button" class="details-nav-item" data-sec="reviews">Reviews</button>
                        <button type="button" class="details-nav-item" data-sec="policies">Policies</button>
                    </div>
                </div>

                <div class="details-section-block" id="sec-overview">
                    <h3 class="details-section-title"><span>✨</span> About This Journey</h3>
                    <p style="font-size: 13.5px; line-height: 1.7; color: var(--text-slate); margin-bottom: 25px;">${pkg.highlights || "Experience the best of local food, sightseeing, and scenic guides customized for your comfort. Spend relaxing days exploring the beauty of your destination."}</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                        <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 15px; border-radius: 8px;">
                            <strong style="display: block; font-size: 11px; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 4px;">Best For</strong>
                            <span style="font-size: 13px; color: #fff; font-weight: 700;">Couples & Families</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 15px; border-radius: 8px;">
                            <strong style="display: block; font-size: 11px; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 4px;">Travel Style</strong>
                            <span style="font-size: 13px; color: #fff; font-weight: 700;">Relaxed & Guided</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 15px; border-radius: 8px;">
                            <strong style="display: block; font-size: 11px; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 4px;">Best Season</strong>
                            <span style="font-size: 13px; color: #fff; font-weight: 700;">October – March</span>
                        </div>
                    </div>
                </div>

                <div class="details-section-block" id="sec-itinerary">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 class="details-section-title" style="margin: 0;"><span>🗺️</span> Travel Itinerary</h3>
                        <button type="button" class="btn-secondary-action btn-toggle-all-days" style="padding: 6px 12px; font-size: 11px; border-radius: 6px; font-weight: 800;">View All Days</button>
                    </div>
                    <div class="itinerary-timeline-wrap">
                        ${itineraryHtml}
                    </div>
                </div>

                <div class="details-section-block" id="sec-stay">
                    <h3 class="details-section-title"><span>🏨</span> Resort & Accommodations</h3>
                    <div class="stay-hotel-card">
                        <div class="stay-hotel-img" style="background-image: url('${pkg.imgUrl}')"></div>
                        <div class="stay-hotel-details">
                            <div>
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                                    <span style="font-size: 11px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 5px; border-radius: 3px;">★★★★</span>
                                    <span style="font-size: 11px; color: var(--text-slate); font-weight: 750;">Premium Resort Category</span>
                                </div>
                                <h4 style="font-size: 17px; font-weight: 850; color: #fff; margin: 0 0 6px 0;">${pkg.hotelName || 'Premium Resort Stay'}</h4>
                                <span style="font-size: 12px; color: var(--text-slate); display: block; margin-bottom: 12px;">📍 ${pkg.hotelAddress || 'Local Beachside Area'}</span>
                                <p style="font-size: 12.5px; color: var(--text-slate); line-height: 1.5; margin: 0;">Enjoy ocean view deluxe suites, high-speed Wi-Fi, swimming pool facilities, private breakfast settings, and immediate shore access.</p>
                            </div>
                            <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 15px;">
                                <span style="font-size: 11px; background: rgba(255,255,255,0.03); color: var(--text-slate); padding: 4px 10px; border-radius: 4px;">📶 Free Wi-Fi</span>
                                <span style="font-size: 11px; background: rgba(255,255,255,0.03); color: var(--text-slate); padding: 4px 10px; border-radius: 4px;">🏊 Pool access</span>
                                <span style="font-size: 11px; background: rgba(255,255,255,0.03); color: var(--text-slate); padding: 4px 10px; border-radius: 4px;">🍳 Breakfast</span>
                                <span style="font-size: 11px; background: rgba(255,255,255,0.03); color: var(--text-slate); padding: 4px 10px; border-radius: 4px;">🏖 Private Beach</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="details-section-block" id="sec-transport">
                    <h3 class="details-section-title"><span>🚗</span> Transport & Transfers</h3>
                    <div class="transport-info-grid">
                        <div class="transport-card">
                            <strong style="color: #fff; font-size: 13.5px; display: block; margin-bottom: 6px;">✈️ Flight Arrangements</strong>
                            <span style="font-size: 12px; color: var(--text-slate); line-height: 1.5; display: block;">Roundtrip economy class flight is fully managed and ticket references will be shared post enquiry approval.</span>
                        </div>
                        <div class="transport-card">
                            <strong style="color: #fff; font-size: 13.5px; display: block; margin-bottom: 6px;">🚗 Local Cab Transfers</strong>
                            <span style="font-size: 12px; color: var(--text-slate); line-height: 1.5; display: block;">Private luxury sedan/SUV transfers allocated for all pickups, drops, and sightseeing routes.</span>
                        </div>
                    </div>
                </div>

                <div class="details-section-block" id="sec-meals">
                    <h3 class="details-section-title"><span>🍴</span> Dining & Meal Plans</h3>
                    <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 20px;">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                            <div style="text-align: center; border-right: 1px solid rgba(255,255,255,0.05);">
                                <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Breakfast</span>
                                <span style="font-size: 13px; color: #22c55e; font-weight: 800;">✓ Included</span>
                            </div>
                            <div style="text-align: center; border-right: 1px solid rgba(255,255,255,0.05);">
                                <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Lunch</span>
                                <span style="font-size: 13px; color: var(--text-slate); font-weight: 800;">✕ Excluded</span>
                            </div>
                            <div style="text-align: center;">
                                <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Dinner</span>
                                <span style="font-size: 13px; color: #22c55e; font-weight: 800;">✓ Included</span>
                            </div>
                        </div>
                        <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                            <span style="font-size: 12px; color: var(--text-slate);">Dietary Options available:</span>
                            <span style="font-size: 11px; color: #fff; background: rgba(0,203,224,0.08); border: 1px solid rgba(0,203,224,0.2); padding: 2px 8px; border-radius: 4px;">Vegetarian</span>
                            <span style="font-size: 11px; color: #fff; background: rgba(0,203,224,0.08); border: 1px solid rgba(0,203,224,0.2); padding: 2px 8px; border-radius: 4px;">Vegan</span>
                            <span style="font-size: 11px; color: #fff; background: rgba(0,203,224,0.08); border: 1px solid rgba(0,203,224,0.2); padding: 2px 8px; border-radius: 4px;">Jain</span>
                        </div>
                    </div>
                </div>

                <div class="details-section-block" id="sec-activities">
                    <h3 class="details-section-title"><span>🏄</span> Experiences & Activities</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                        <div style="background: var(--card-bg); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 15px;">
                            <strong style="color: #fff; font-size: 13px; display: block; margin-bottom: 4px;">🌊 Guided Water Sports</strong>
                            <span style="font-size: 11px; background: rgba(34, 197, 94, 0.08); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.2); padding: 1px 5px; border-radius: 3px; font-weight: 700;">Included</span>
                        </div>
                        <div style="background: var(--card-bg); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 15px;">
                            <strong style="color: #fff; font-size: 13px; display: block; margin-bottom: 4px;">⛵ Sunset Yacht Ride</strong>
                            <span style="font-size: 11px; background: rgba(34, 197, 94, 0.08); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.2); padding: 1px 5px; border-radius: 3px; font-weight: 700;">Included</span>
                        </div>
                        <div style="background: var(--card-bg); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 15px;">
                            <strong style="color: #fff; font-size: 13px; display: block; margin-bottom: 4px;">🏛 Local Sightseeing permitting</strong>
                            <span style="font-size: 11px; background: rgba(34, 197, 94, 0.08); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.2); padding: 1px 5px; border-radius: 3px; font-weight: 700;">Included</span>
                        </div>
                    </div>
                </div>

                <div class="details-section-block" id="sec-inclusions">
                    <h3 class="details-section-title"><span>✓</span> Inclusions & Exclusions</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px;">
                        <div style="background: rgba(34, 197, 94, 0.01); border: 1px solid rgba(34, 197, 94, 0.1); border-radius: 12px; padding: 20px;">
                            <h4 style="color: #22c55e; font-weight: 800; font-size: 13.5px; margin: 0 0 15px 0;">✓ INCLUDED</h4>
                            <ul style="margin: 0; padding: 0; list-style: none; font-size: 12.5px; color: var(--text-slate); display: flex; flex-direction: column; gap: 8px;">
                                ${incItems}
                            </ul>
                        </div>
                        <div style="background: rgba(239, 68, 68, 0.01); border: 1px solid rgba(239, 68, 68, 0.1); border-radius: 12px; padding: 20px;">
                            <h4 style="color: #ef4444; font-weight: 800; font-size: 13.5px; margin: 0 0 15px 0;">✕ NOT INCLUDED</h4>
                            <ul style="margin: 0; padding: 0; list-style: none; font-size: 12.5px; color: var(--text-slate); display: flex; flex-direction: column; gap: 8px;">
                                ${excItems}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="details-section-block" id="sec-partner">
                    <h3 class="details-section-title"><span>🤝</span> Meet Your Travel Partner</h3>
                    <div class="partner-profile-card">
                        <div class="partner-profile-header">
                            <div class="partner-avatar" style="background-image: url('${partnerData.avatar}')"></div>
                            <div class="partner-name-col">
                                <h4>${partnerData.name} <span style="font-size: 10px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 5px; border-radius: 3px; vertical-align: middle;">✓ BEACON VERIFIED</span></h4>
                                <span style="font-size: 12px; color: var(--text-slate); font-weight: 700;">${partnerData.type}</span>
                                <div style="font-size: 11.5px; color: var(--text-slate); margin-top: 4px;">⭐ ${partnerData.rating} (${partnerData.reviews} Reviews) • 📍 ${partnerData.location}</div>
                            </div>
                        </div>
                        
                        <div class="partner-stats-grid">
                            <div class="partner-stat-item">
                                <span style="font-size: 10px; color: var(--text-slate); display: block; text-transform: uppercase;">Trips Completed</span>
                                <strong style="font-size: 14px; color: #fff;">${partnerData.trips}</strong>
                            </div>
                            <div class="partner-stat-item">
                                <span style="font-size: 10px; color: var(--text-slate); display: block; text-transform: uppercase;">Experience</span>
                                <strong style="font-size: 14px; color: #fff;">${partnerData.experience}</strong>
                            </div>
                            <div class="partner-stat-item">
                                <span style="font-size: 10px; color: var(--text-slate); display: block; text-transform: uppercase;">Response Rate</span>
                                <strong style="font-size: 14px; color: #fff;">${partnerData.responseRate}</strong>
                            </div>
                            <div class="partner-stat-item">
                                <span style="font-size: 10px; color: var(--text-slate); display: block; text-transform: uppercase;">Languages</span>
                                <strong style="font-size: 11.5px; color: #fff;">English, Hindi</strong>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="font-size: 12.5px; color: #fff; display: block; margin-bottom: 6px;">About</strong>
                            <p style="font-size: 12px; line-height: 1.6; color: var(--text-slate); margin: 0;">"${partnerData.about}"</p>
                        </div>
                        
                        <div style="margin-bottom: 25px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                            <span style="font-size: 12px; color: var(--text-slate);">Expertise:</span>
                            ${partnerData.expertise.map(exp => `<span style="font-size: 10px; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px; font-weight: 700;">${exp}</span>`).join('')}
                        </div>
                        
                        <button type="button" class="btn-primary-large btn-view-full-profile" style="padding: 10px 20px; font-size: 12px; font-weight: 800; border-radius: 6px; cursor: pointer; border: 1px solid var(--accent-cyan); background: transparent; color: var(--accent-cyan); transition: all 0.2s;">View Full Profile</button>
                    </div>
                </div>

                <div class="details-section-block" id="sec-reviews">
                    <h3 class="details-section-title"><span>⭐</span> Ratings & Guest Reviews</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px;">
                        <div style="text-align: center; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 25px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <span style="font-size: 38px; font-weight: 850; color: #fff; display: block; line-height: 1;">${pkg.rating.replace(/[^0-9.]/g, '')}</span>
                            <span style="color: var(--accent-cyan); font-size: 16px; margin: 5px 0;">★★★★★</span>
                            <span style="font-size: 12px; color: var(--text-slate); font-weight: 700;">Based on ${pkg.reviews || 88} traveler ratings</span>
                        </div>
                        <div>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-slate); margin-bottom: 2px;">
                                        <span>Planning & Support</span>
                                        <strong style="color: #fff;">4.9</strong>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.04); border-radius: 3px;"><div style="width: 98%; height: 100%; background: var(--accent-cyan); border-radius: 3px;"></div></div>
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-slate); margin-bottom: 2px;">
                                        <span>Stay & Resorts</span>
                                        <strong style="color: #fff;">4.8</strong>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.04); border-radius: 3px;"><div style="width: 96%; height: 100%; background: var(--accent-cyan); border-radius: 3px;"></div></div>
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-slate); margin-bottom: 2px;">
                                        <span>Value for Money</span>
                                        <strong style="color: #fff;">4.7</strong>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.04); border-radius: 3px;"><div style="width: 94%; height: 100%; background: var(--accent-cyan); border-radius: 3px;"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; display: flex; flex-direction: column; gap: 15px;">
                        <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <div>
                                    <strong style="color: #fff; font-size: 13px;">Vikram Shah</strong>
                                    <span style="font-size: 10px; font-weight: 800; color: #22c55e; background: rgba(34, 197, 94, 0.08); padding: 1px 5px; border-radius: 3px; margin-left: 8px;">✓ Verified Booking</span>
                                </div>
                                <span style="font-size: 11.5px; color: var(--text-slate);">2 weeks ago</span>
                            </div>
                            <p style="font-size: 12.5px; line-height: 1.5; color: var(--text-slate); margin: 0;">"Absolutely incredible experience. The resort coordination was flawless, and the private cab transfers were exceptionally professional. Strongly recommended."</p>
                        </div>
                    </div>
                </div>

                <div class="details-section-block" id="sec-policies">
                    <h3 class="details-section-title"><span>🛡</span> Terms & Cancellation Policies</h3>
                    <div style="display: flex; flex-direction: column;">
                        <div class="policy-accordion-card">
                            <div class="policy-accordion-header"><span>Cancellation Policy</span> <span>▼</span></div>
                            <div class="policy-accordion-body">${pkg.cancellation || 'Free cancellation within 24 hours of booking.'} 100% refund up to 30 days prior; 50% refund between 15-29 days; non-refundable within 14 days of departure.</div>
                        </div>
                        <div class="policy-accordion-card">
                            <div class="policy-accordion-header"><span>Payment Schedule</span> <span>▼</span></div>
                            <div class="policy-accordion-body">30% advance deposit required upon reservation. Balance due 14 days prior to travel.</div>
                        </div>
                        <div class="policy-accordion-card">
                            <div class="policy-accordion-header"><span>Travel Documents Required</span> <span>▼</span></div>
                            <div class="policy-accordion-body">Passport valid for at least 6 months (for international flights) or Government ID card is mandatory for local transit check-ins.</div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 50px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 40px;">
                    <div style="margin-bottom: 25px;">
                        <h3 style="font-size: 20px; font-weight: 850; color: #fff; margin: 0 0 4px 0;">✨ Similar Journeys You May Love</h3>
                        <p style="font-size: 12.5px; color: var(--text-slate); margin: 0;">More trips that match what you're looking for.</p>
                    </div>
                    <div class="similar-recommendations-grid" id="similar-packages-grid"></div>
                </div>
            </div>

            <div class="sticky-booking-bar">
                <div class="sticky-bar-price">
                    <span style="font-size: 11px; color: var(--text-slate); text-transform: uppercase;">Starting From</span>
                    <strong style="font-size: 18px; font-weight: 850; color: var(--accent-cyan);">${pkg.priceStr} <span style="font-size: 11px; color: #fff; font-weight: 500;">/ person</span></strong>
                </div>
                <div class="sticky-bar-actions">
                    <button type="button" class="btn-secondary-action details-save-btn" style="padding: 10px 16px; border-radius: 8px; font-weight: 800; font-size: 12.5px;">${isSaved ? '❤️ Saved' : '♡ Save'}</button>
                    <button type="button" class="btn-secondary-action details-compare-btn" style="padding: 10px 16px; border-radius: 8px; font-weight: 800; font-size: 12.5px;">${isCompared ? '✓ Compared' : '+ Compare'}</button>
                    <button type="button" class="btn-primary-large details-book-btn" style="padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 12.5px; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer;">Book Now</button>
                </div>
            </div>
        `;

        window.scrollTo({ top: 0, behavior: 'instant' });

        const backBtn = detailsView.querySelector('.btn-details-back');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                navigateTo(previousViewId);
            });
        }

        const dayCards = detailsView.querySelectorAll('.itinerary-day-card');
        dayCards.forEach(card => {
            const header = card.querySelector('.itinerary-day-header');
            header.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                if (isActive) {
                    card.classList.remove('active');
                } else {
                    card.classList.add('active');
                }
            });
        });

        const toggleAllDaysBtn = detailsView.querySelector('.btn-toggle-all-days');
        if (toggleAllDaysBtn) {
            toggleAllDaysBtn.addEventListener('click', () => {
                const anyInactive = Array.from(dayCards).some(c => !c.classList.contains('active'));
                dayCards.forEach(c => {
                    if (anyInactive) {
                        c.classList.add('active');
                    } else {
                        c.classList.remove('active');
                    }
                });
                toggleAllDaysBtn.innerText = anyInactive ? 'Collapse All Days' : 'View All Days';
            });
        }

        const policyCards = detailsView.querySelectorAll('.policy-accordion-card');
        policyCards.forEach(card => {
            const header = card.querySelector('.policy-accordion-header');
            header.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                policyCards.forEach(c => c.classList.remove('active'));
                if (!isActive) {
                    card.classList.add('active');
                }
            });
        });

        const thumbs = detailsView.querySelectorAll('.gallery-thumb');
        const mainImg = detailsView.querySelector('.gallery-primary-img');
        thumbs.forEach(t => {
            t.addEventListener('click', () => {
                thumbs.forEach(th => th.classList.remove('active'));
                t.classList.add('active');
                mainImg.style.backgroundImage = t.style.backgroundImage;
            });
        });

        const navItems = detailsView.querySelectorAll('.details-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const targetBlock = detailsView.querySelector(`#sec-${item.dataset.sec}`);
                if (targetBlock) {
                    targetBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        const scrollBlocks = detailsView.querySelectorAll('.details-section-block');
        const handleDetailsScroll = () => {
            if (currentViewId !== 'package-details') return;
            const scrollPos = window.scrollY + 150;
            scrollBlocks.forEach(block => {
                if (scrollPos >= block.offsetTop && scrollPos < (block.offsetTop + block.offsetHeight)) {
                    const secId = block.id.replace('sec-', '');
                    navItems.forEach(item => {
                        if (item.dataset.sec === secId) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
            });
        };
        window.addEventListener('scroll', handleDetailsScroll);

        const saveBtns = detailsView.querySelectorAll('.details-save-btn');
        const updateSaveButtons = () => {
            saveBtns.forEach(btn => {
                if (savedList.includes(pkg.title)) {
                    btn.innerHTML = '❤️ Saved';
                    btn.style.color = 'var(--accent-cyan)';
                    btn.style.borderColor = 'var(--accent-cyan)';
                } else {
                    btn.innerHTML = '♡ Save';
                    btn.style.color = '#fff';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }
            });
        };
        updateSaveButtons();
        saveBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleSave(pkg.title);
                updateSaveButtons();
            });
        });

        const compBtns = detailsView.querySelectorAll('.details-compare-btn');
        const updateCompareButtons = () => {
            compBtns.forEach(btn => {
                if (selectedComparePackages.some(item => item.title === pkg.title)) {
                    btn.innerHTML = '✓ Compared';
                    btn.style.color = 'var(--accent-cyan)';
                    btn.style.borderColor = 'var(--accent-cyan)';
                } else {
                    btn.innerHTML = '+ Compare';
                    btn.style.color = '#fff';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }
            });
        };
        updateCompareButtons();
        compBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const checkedState = !selectedComparePackages.some(item => item.title === pkg.title);
                toggleComparePackage(pkg, checkedState);
                updateCompareButtons();
            });
        });

        const shareBtn = detailsView.querySelector('.details-share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                openShareSheet(pkg);
            });
        }

        const enquiryBtns = detailsView.querySelectorAll('.details-enquiry-btn');
        enquiryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                showToast("📩 Redirecting to Enquiries page...");
                navigateTo('enquiries');
            });
        });

        const bookBtns = detailsView.querySelectorAll('.details-book-btn');
        bookBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                initNewDraftBookingState(pkg);
            });
        });

        const partnerProfileBtn = detailsView.querySelector('.btn-view-full-profile');
        if (partnerProfileBtn) {
            partnerProfileBtn.addEventListener('click', () => {
                openPlannerProfileView(partnerData, pkg);
            });
        }

        renderSimilarPackages(pkg);
    };

    const renderSavedTab = () => {
        const savedListContainer = document.getElementById('collection-saved-list');
        if (!savedListContainer) return;

        if (savedList.length === 0) {
            savedListContainer.innerHTML = `
                <div class="collection-empty-state">
                    <span class="empty-icon">📂</span>
                    <h4>Your travel wishlist starts here.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">Packages you save while browsing will appear in this collection.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Explore Packages</button>
                </div>
            `;
            return;
        }

        savedListContainer.innerHTML = '';
        savedList.forEach(title => {
            const pkg = allPackagesData.find(p => p.title.trim() === title.trim()) || {
                title,
                imgUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                priceStr: '₹14,999',
                priceNum: 14999,
                category: 'beaches',
                duration: 4,
                rating: '⭐ 4.8',
                style: 'family'
            };

            const isCompared = selectedComparePackages.some(item => item.title === pkg.title);

            const card = document.createElement('div');
            card.className = 'saved-card-horizontal';
            card.innerHTML = `
                <div class="card-img-col" style="background-image: url('${pkg.imgUrl}')"></div>
                <div class="card-details-col">
                    <div>
                        <div class="card-title-row">
                            <h4 class="card-title">${pkg.title}</h4>
                            <span class="partner-verified">✓ Verified Partner</span>
                        </div>
                        <div class="card-meta">
                            <span>📍 ${pkg.category.toUpperCase()}</span>
                            <span class="card-meta-dot"></span>
                            <span>${pkg.duration} Days</span>
                            <span class="card-meta-dot"></span>
                            <span>${pkg.rating}</span>
                        </div>
                        <div class="card-info-grid">
                            <div>👥 <strong>Trip Type:</strong> ${pkg.style || "Couple"}</div>
                            <div>🏢 <strong>Planner:</strong> Wanderlust Travels</div>
                        </div>
                    </div>
                    <div>
                        <span style="font-size: 11px; color: var(--text-slate);">Starting price per person</span>
                        <div style="font-size: 18px; font-weight: 800; color: var(--accent-cyan);">${pkg.priceStr}</div>
                    </div>
                </div>
                <div class="card-actions-col">
                    <button class="btn-action btn-secondary-action btn-add-compare">${isCompared ? 'Added to Compare' : 'Add to Compare'}</button>
                    <button class="btn-action btn-remove">Remove from Saved</button>
                </div>
            `;

            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-add-compare') || e.target.closest('.btn-remove')) {
                    return;
                }
                openPackageDetailsView(pkg);
            });

            const compareBtn = card.querySelector('.btn-add-compare');
            compareBtn.addEventListener('click', () => {
                const checkedState = !selectedComparePackages.some(item => item.title === pkg.title);
                toggleComparePackage(pkg, checkedState);
                compareBtn.innerText = checkedState ? 'Added to Compare' : 'Add to Compare';
                
                const chk = document.querySelector(`.card-compare-checkbox[data-title="${pkg.title}"]`);
                if (chk) chk.checked = checkedState;
            });

            card.querySelector('.btn-remove').addEventListener('click', () => {
                card.style.maxHeight = card.offsetHeight + 'px';
                card.style.transition = 'all 0.3s';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    toggleSave(pkg.title);
                }, 300);
            });

            savedListContainer.appendChild(card);
        });
    };

    const renderCompareTab = () => {
        const selectionGrid = document.getElementById('compare-selection-list');
        const triggerRow = document.getElementById('compare-trigger-row');
        const resultsView = document.getElementById('comparison-results-view');
        
        if (!selectionGrid) return;

        if (selectedComparePackages.length === 0) {
            selectionGrid.innerHTML = `
                <div class="collection-empty-state" style="grid-column: 1/-1;">
                    <span class="empty-icon">⚖️</span>
                    <h4>Add a few journeys and we'll help you choose.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">You can select up to 3 packages from wishlist or searches to compare side-by-side.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Explore Packages</button>
                </div>
            `;
            triggerRow.style.display = 'none';
            resultsView.style.display = 'none';
            return;
        }

        selectionGrid.innerHTML = '';
        triggerRow.style.display = 'block';

        selectedComparePackages.forEach(pkg => {
            const card = document.createElement('div');
            card.className = 'compare-selection-card selected';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <span class="card-title">${pkg.title}</span>
                <span class="compare-checkbox-indicator">✓</span>
            `;
            
            card.addEventListener('click', () => {
                toggleComparePackage(pkg, false);
                
                const chk = document.querySelector(`.card-compare-checkbox[data-title="${pkg.title}"]`);
                if (chk) chk.checked = false;
                
                renderCompareTab();
            });

            selectionGrid.appendChild(card);
        });

        if (selectedComparePackages.length >= 2) {
            runPackagesComparisonMatrix();
        } else {
            resultsView.style.display = 'none';
        }
    };

    const runPackagesComparisonMatrix = () => {
        const resultsView = document.getElementById('comparison-results-view');
        const matrixTable = document.getElementById('collection-compare-table');
        const insightCard = document.getElementById('ai-compare-insight-card');
        if (!matrixTable || !resultsView) return;

        resultsView.style.display = 'block';

        let bestMatchIdx = 0;
        let bestPriceIdx = 0;
        let bestRatedIdx = 0;

        let highestMatchScore = -1;
        let lowestPrice = Infinity;
        let highestRating = -1;

        selectedComparePackages.forEach((pkg, index) => {
            const parsedRating = parseFloat(pkg.rating.replace(/[^0-9.]/g, '')) || 4.5;
            pkg.matchScore = Math.round(90 + parsedRating * 2 - (pkg.priceNum / 150000) * 5);
            if (pkg.matchScore > highestMatchScore) {
                highestMatchScore = pkg.matchScore;
                bestMatchIdx = index;
            }

            if (pkg.priceNum < lowestPrice) {
                lowestPrice = pkg.priceNum;
                bestPriceIdx = index;
            }

            if (parsedRating > highestRating) {
                highestRating = parsedRating;
                bestRatedIdx = index;
            }
        });

        if (insightCard) {
            insightCard.innerHTML = generateAIInsight(selectedComparePackages);
        }

        let html = `<thead><tr><th class="matrix-header-col">Attributes</th>`;
        selectedComparePackages.forEach((pkg, idx) => {
            let badges = '';
            if (idx === bestMatchIdx) badges += `<span class="compare-badge-ribbon ribbon-best-match">Best Match</span><br>`;
            if (idx === bestPriceIdx) badges += `<span class="compare-badge-ribbon ribbon-best-price">Best Price</span><br>`;
            if (idx === bestRatedIdx) badges += `<span class="compare-badge-ribbon ribbon-best-rated">Best Rated</span><br>`;

            html += `<th style="vertical-align: bottom;">
                <div style="min-height: 50px;">${badges}</div>
                <div class="matrix-pkg-title" style="margin-top: 5px;">${pkg.title}</div>
            </th>`;
        });
        html += `</tr></thead><tbody>`;

        const rows = [
            { label: "Destination", key: "category", highlight: false, format: (val) => val.toUpperCase() },
            { label: "Price / Person", key: "priceStr", highlight: true },
            { label: "Duration", key: "duration", highlight: false, format: (val) => `${val} Days` },
            { label: "Rating", key: "rating", highlight: true },
            { label: "Hotel", key: "accommodation", highlight: false, format: (val) => val ? val.charAt(0).toUpperCase() + val.slice(1) : "4★ Accommodation" },
            { label: "Meals", key: "meals", highlight: false, format: (val) => val || "Breakfast Included" },
            { label: "Transportation", key: "transport", highlight: false, format: (val) => val ? val.charAt(0).toUpperCase() + val.slice(1) : "Private Cab" },
            { label: "Activities", key: "highlights", highlight: false, format: (val) => {
                const count = val ? val.split(',').length : 3;
                return `${count} Major Activities`;
            }},
            { label: "Flights", key: "transport", highlight: false, format: (val) => val === 'flight' ? "✓ Included" : "✕ Excluded" },
            { label: "Guide", key: "highlights", highlight: false, format: (val) => {
                const hasGuide = val && (val.toLowerCase().includes('guide') || val.toLowerCase().includes('naturalist'));
                return hasGuide ? "✓ Certified Guide" : "✓ Local Assist";
            }},
            { label: "Trip Type", key: "style", highlight: false, format: (val) => val ? val.charAt(0).toUpperCase() + val.slice(1) : "Family" },
            { label: "Cancellation Policy", key: "cancellation", highlight: false, format: (val) => val || "Free cancellation within 24 hours" },
            { label: "Planner / Company", key: "planner", highlight: false, format: (val) => val || "Wanderlust Travels" },
            { label: "Beacon Match %", key: "matchScore", highlight: true, format: (val) => `${val}% Match` }
        ];

        rows.forEach(row => {
            html += `<tr><td class="matrix-header-col">${row.label}</td>`;
            selectedComparePackages.forEach((pkg, index) => {
                const rawVal = pkg[row.key];
                const displayVal = row.format ? row.format(rawVal) : (rawVal || "N/A");
                html += `<td class="${row.highlight ? 'highlight-diff' : ''}">${displayVal}</td>`;
            });
            html += `</tr>`;
        });

        html += `<tr><td class="matrix-header-col" style="border-bottom: none;">Actions</td>`;
        selectedComparePackages.forEach(pkg => {
            html += `<td style="border-bottom: none;">
                <div style="display: flex; gap: 10px;">
                    <button type="button" class="btn-primary-large view-pkg-compare" data-title="${pkg.title}" style="padding: 8px 12px; font-size: 11px; flex: 1; border-radius: 6px; cursor: pointer;">View Package</button>
                    <button type="button" class="btn-secondary-action send-enquiry-compare" style="padding: 8px 12px; font-size: 11px; flex: 1; border-radius: 6px; cursor: pointer; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #fff;">Send Enquiry</button>
                </div>
            </td>`;
        });
        html += `</tr></tbody>`;

        matrixTable.innerHTML = html;

        matrixTable.querySelectorAll('.view-pkg-compare').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.dataset.title;
                const pkg = allPackagesData.find(p => p.title === title);
                if (pkg) openPackageDetailsView(pkg);
            });
        });

        matrixTable.querySelectorAll('.send-enquiry-compare').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast("📩 Redirecting to Enquiries page...");
                navigateTo('enquiries');
            });
        });
    };

    const renderRecentlyViewedTab = () => {
        const recentListContainer = document.getElementById('collection-recent-list');
        if (!recentListContainer) return;

        const recentList = JSON.parse(localStorage.getItem('beacon_recent_views')) || [];

        if (recentList.length === 0) {
            recentListContainer.innerHTML = `
                <div class="collection-empty-state">
                    <span class="empty-icon">⏳</span>
                    <h4>Trips you explore will appear here.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">Packages whose details you open will be cataloged here for quick review.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Start Exploring</button>
                </div>
            `;
            return;
        }

        recentListContainer.innerHTML = '';

        const groups = {
            'Today': [],
            'Yesterday': [],
            'Earlier': []
        };

        recentList.forEach(item => {
            const pkg = allPackagesData.find(p => p.title.trim() === item.title.trim());
            if (pkg) {
                const groupName = getChronologicalGroup(item.viewedAt);
                groups[groupName].push({
                    pkg,
                    timestamp: item.viewedAt
                });
            }
        });

        for (let groupName in groups) {
            const list = groups[groupName];
            if (list.length === 0) continue;

            const groupHeader = document.createElement('div');
            groupHeader.className = 'timeline-group-header';
            groupHeader.innerText = groupName;
            recentListContainer.appendChild(groupHeader);

            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'recent-timeline-cards';

            list.forEach(entry => {
                const pkg = entry.pkg;
                const isSaved = savedList.includes(pkg.title);

        let travelDatesStr = "Daily Departures (Aug 2026 – Oct 2026)";
        const planStart = document.getElementById('match-start-date') ? document.getElementById('match-start-date').value : '';
        const planEnd = document.getElementById('match-end-date') ? document.getElementById('match-end-date').value : '';
        
        if (planStart && planEnd) {
            const parseAndFormat = (dateStr) => {
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const date = new Date(parts[0], parts[1] - 1, parts[2]);
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                }
                return dateStr;
            };
            travelDatesStr = `${parseAndFormat(planStart)} – ${parseAndFormat(planEnd)}`;
        } else {
            const today = new Date();
            const startMonth = today.toLocaleString('default', { month: 'short' });
            const endMonth = new Date(today.setMonth(today.getMonth() + 3)).toLocaleString('default', { month: 'short' });
            const currentYear = new Date().getFullYear();
            travelDatesStr = `Flexible (${startMonth} – ${endMonth} ${currentYear})`;
        }
        

                const isCompared = selectedComparePackages.some(item => item.title === pkg.title);

                const card = document.createElement('div');
                card.className = 'saved-card-horizontal';
                card.innerHTML = `
                    <div class="card-img-col" style="background-image: url('${pkg.imgUrl}')"></div>
                    <div class="card-details-col">
                        <div>
                            <div class="card-title-row">
                                <h4 class="card-title">${pkg.title}</h4>
                                <span style="font-size: 11px; font-weight: 700; color: var(--accent-cyan);">${formatTimeAgo(entry.timestamp)}</span>
                            </div>
                            <div class="card-meta">
                                <span>📍 ${pkg.category.toUpperCase()}</span>
                                <span class="card-meta-dot"></span>
                                <span>${pkg.duration} Days</span>
                                <span class="card-meta-dot"></span>
                                <span>${pkg.rating}</span>
                            </div>
                            <p style="font-size: 12px; color: var(--text-slate); margin: 0 0 10px 0;">✨ Highlights: ${pkg.highlights}</p>
                        </div>
                        <div>
                            <div style="font-size: 16px; font-weight: 800; color: var(--accent-cyan);">${pkg.priceStr}</div>
                        </div>
                    </div>
                    <div class="card-actions-col">
                        <button class="btn-action btn-secondary-action btn-save">${isSaved ? 'Saved' : 'Save'}</button>
                        <button class="btn-action btn-secondary-action btn-add-compare">${isCompared ? 'Added to Compare' : 'Add to Compare'}</button>
                    </div>
                `;

                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.btn-save') || e.target.closest('.btn-add-compare')) {
                        return;
                    }
                    openPackageDetailsView(pkg);
                });

                const saveBtn = card.querySelector('.btn-save');
                saveBtn.addEventListener('click', () => {
                    toggleSave(pkg.title);
                    saveBtn.innerText = savedList.includes(pkg.title) ? 'Saved' : 'Save';
                    syncSaveButtonStates();
                });

                const compareBtn = card.querySelector('.btn-add-compare');
                compareBtn.addEventListener('click', () => {
                    const checkedState = !selectedComparePackages.some(item => item.title === pkg.title);
                    toggleComparePackage(pkg, checkedState);
                    compareBtn.innerText = checkedState ? 'Added to Compare' : 'Add to Compare';
                    
                    const chk = document.querySelector(`.card-compare-checkbox[data-title="${pkg.title}"]`);
                    if (chk) chk.checked = checkedState;
                });

                cardsContainer.appendChild(card);
            });

            recentListContainer.appendChild(cardsContainer);
        }
    };

    const initCollectionPage = () => {
        const tabs = document.querySelectorAll('.collection-tab');
        const panels = document.querySelectorAll('.collection-panel');
        const indicator = document.querySelector('.collection-tab-indicator');
        
        if (tabs.length === 0) return;

        const updateTabIndicator = (activeTab) => {
            if (indicator) {
                indicator.style.width = `${activeTab.offsetWidth}px`;
                indicator.style.left = `${activeTab.offsetLeft}px`;
            }
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                const targetPanel = document.getElementById(`collection-${tab.dataset.tab}-tab`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
                
                updateTabIndicator(tab);
                
                if (tab.dataset.tab === 'saved') renderSavedTab();
                else if (tab.dataset.tab === 'compare') renderCompareTab();
                else if (tab.dataset.tab === 'recent') renderRecentlyViewedTab();
            });
        });

        const activeTab = document.querySelector('.collection-tab.active');
        if (activeTab) {
            setTimeout(() => updateTabIndicator(activeTab), 100);
        }

        const runCompBtn = document.getElementById('btn-run-comparison');
        if (runCompBtn) {
            runCompBtn.addEventListener('click', () => {
                runPackagesComparisonMatrix();
            });
        }

        const clearHistoryBtn = document.getElementById('btn-clear-recent-history');
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to clear your recently viewed history?")) {
                    localStorage.removeItem('beacon_recent_views');
                    renderRecentlyViewedTab();
                    showToast("⏳ View history cleared.");
                }
            });
        }
    };

    // Card click delegation to record Recently Viewed views on click and open full screen details
    document.body.addEventListener('click', (e) => {
        
        if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.compare-checkbox-label') || e.target.closest('a') || e.target.closest('.remove-btn')) return;
        
        const travelCard = e.target.closest('.travel-card, .trending-curved-card, .bespoke-card, .saved-card-horizontal');
        if (travelCard) {
            
            const titleEl = travelCard.querySelector('.card-title, .bespoke-title');
            if (titleEl) {
                
                
                const title = titleEl.innerText.trim();
                let pkg = allPackagesData.find(p => p.title.trim() === title);
                
                // Smart Fallback Matchmaking for Category cards (e.g. Ladakh Valley -> Leh Ladakh Bike Expedition)
                if (!pkg) {
                    pkg = allPackagesData.find(p => p.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(p.title.toLowerCase()));
                }
                if (!pkg) {
                    const words = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
                    if (words.length > 0) {
                        pkg = allPackagesData.find(p => words.some(w => p.title.toLowerCase().includes(w)));
                    }
                }
                
                // Robust final fallback: if still not found, search closely or choose the first package in allPackagesData
                if (!pkg && allPackagesData.length > 0) {
                    const categoryTag = title.toLowerCase();
                    if (categoryTag.includes('beach') || categoryTag.includes('goa') || categoryTag.includes('island') || categoryTag.includes('coast') || categoryTag.includes('sea')) {
                        pkg = allPackagesData.find(p => p.category === 'beaches');
                    } else if (categoryTag.includes('mountain') || categoryTag.includes('peaks') || categoryTag.includes('valley') || categoryTag.includes('hills') || categoryTag.includes('trek') || categoryTag.includes('snow')) {
                        pkg = allPackagesData.find(p => p.category === 'mountains');
                    }
                    if (!pkg) {
                        pkg = allPackagesData[0];
                    }
                }
                
                if (pkg) {
                    openPackageDetailsView(pkg);
                } else {
                    console.warn("Could not find matching package for title:", title);
                }
            }
        }
    });

    // ----------------------------------------------------
    // MOBILE NETFLIX-STYLE HOME DISCOVERY MANAGER
    // ----------------------------------------------------
    const initMobileHomeDiscovery = () => {
        const discoveryEl = document.getElementById('mobile-home-discovery');
        if (!discoveryEl) return;

        // Static visual category list
        const experienceCategories = [
            { title: "Trekking", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80", filter: "mountains" },
            { title: "Camping", bg: "https://images.unsplash.com/photo-1478131148058-76f5597951c6?auto=format&fit=crop&w=300&q=80", filter: "mountains" },
            { title: "Road Trips", bg: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=300&q=80", filter: "mountains" },
            { title: "Beach Escapes", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", filter: "beaches" },
            { title: "Mountains", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80", filter: "mountains" },
            { title: "Backpacking", bg: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&w=300&q=80", filter: "mountains" },
            { title: "Adventure", bg: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=300&q=80", filter: "mountains" }
        ];

        // Static visual destinations list
        const destinationsDataList = [
            { name: "Goa", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", query: "Goa" },
            { name: "Kashmir", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80", query: "Kashmir" },
            { name: "Ladakh", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80", query: "Ladakh" },
            { name: "Kerala", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=300&q=80", query: "Kerala" },
            { name: "Himachal", bg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=80", query: "Manali" },
            { name: "Rajasthan", bg: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=300&q=80", query: "Rajasthan" }
        ];

        // Helper to format compact card markup
        const createCompactCardMarkup = (pkg) => {
            const isSaved = savedList.includes(pkg.title);

        let travelDatesStr = "Daily Departures (Aug 2026 – Oct 2026)";
        const planStart = document.getElementById('match-start-date') ? document.getElementById('match-start-date').value : '';
        const planEnd = document.getElementById('match-end-date') ? document.getElementById('match-end-date').value : '';
        
        if (planStart && planEnd) {
            const parseAndFormat = (dateStr) => {
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const date = new Date(parts[0], parts[1] - 1, parts[2]);
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                }
                return dateStr;
            };
            travelDatesStr = `${parseAndFormat(planStart)} – ${parseAndFormat(planEnd)}`;
        } else {
            const today = new Date();
            const startMonth = today.toLocaleString('default', { month: 'short' });
            const endMonth = new Date(today.setMonth(today.getMonth() + 3)).toLocaleString('default', { month: 'short' });
            const currentYear = new Date().getFullYear();
            travelDatesStr = `Flexible (${startMonth} – ${endMonth} ${currentYear})`;
        }
        

            const isLiked = localStorage.getItem('liked_' + pkg.title) === 'true';
            
            const favIconHtml = `<img src="save-icon.png" class="mobile-png-icon">`;
            const shareIconHtml = `<img src="share-icon.png" class="mobile-png-icon">`;
            const likeIconHtml = `<img src="like-icon.png" class="mobile-png-icon">`;
            
            const priceVal = pkg.priceStr || pkg.price;

            return `
                <div class="mobile-compact-card" data-title="${pkg.title}">
                    <div class="card-img" style="background-image: url('${pkg.bg || pkg.imgUrl}')">
                        <button type="button" class="mobile-card-like-btn ${isLiked ? 'active' : ''}">${likeIconHtml}</button>
                        <button type="button" class="mobile-card-share-btn">${shareIconHtml}</button>
                        <button type="button" class="mobile-card-fav-btn ${isSaved ? 'active' : ''}">${favIconHtml}</button>
                    </div>
                    <div class="card-info">
                        <div class="card-name">${pkg.title}</div>
                        <div class="card-meta-row">
                            <span>📍 ${pkg.type || pkg.category.toUpperCase()}</span>
                            <span>${pkg.duration}</span>
                        </div>
                        <div class="card-footer-row">
                            <span class="card-rating">⭐ ${pkg.rating}</span>
                            <span class="card-price">${priceVal}</span>
                        </div>
                    </div>
                </div>
            `;
        };

        // Helper to bind events inside scroll containers
        const bindCompactCardEvents = (container) => {
            container.querySelectorAll('.mobile-compact-card').forEach(card => {
                const title = card.dataset.title;
                const pkg = allPackagesData.find(p => p.title === title);
                if (!pkg) return;
                
                // Click card -> open details
                card.onclick = (e) => {
                    if (e.target.closest('.mobile-card-fav-btn') || e.target.closest('.mobile-card-share-btn') || e.target.closest('.mobile-card-like-btn')) return;
                    openPackageDetailsView(pkg);
                };
                
                // Like button trigger with pop bounce and Toast
                const likeBtn = card.querySelector('.mobile-card-like-btn');
                if (likeBtn) {
                    likeBtn.onclick = (e) => {
                        e.stopPropagation();
                        const isLiked = localStorage.getItem('liked_' + pkg.title) === 'true';
                        const newLiked = !isLiked;
                        localStorage.setItem('liked_' + pkg.title, newLiked ? 'true' : 'false');
                        
                        if (newLiked) {
                            likeBtn.classList.add('active');
                        } else {
                            likeBtn.classList.remove('active');
                        }
                        
                        likeBtn.classList.add('pop-bounce');
                        setTimeout(() => likeBtn.classList.remove('pop-bounce'), 300);
                        
                        window.showToast(newLiked ? "Liked package!" : "Unliked package");
                    };
                }
                
                // Share button trigger
                const shareBtn = card.querySelector('.mobile-card-share-btn');
                if (shareBtn) {
                    shareBtn.onclick = (e) => {
                        e.stopPropagation();
                        openShareSheet(pkg);
                    };
                }
                
                // Favorite button toggle with micro-bounce and Toast
                const favBtn = card.querySelector('.mobile-card-fav-btn');
                if (favBtn) {
                    favBtn.onclick = (e) => {
                        e.stopPropagation();
                        toggleSavedPackage(pkg.title);
                        const isSavedNow = savedList.includes(pkg.title);
                        
                        if (isSavedNow) {
                            favBtn.classList.add('active');
                        } else {
                            favBtn.classList.remove('active');
                        }
                        
                        // Bounce animation
                        favBtn.classList.add('pop-bounce');
                        setTimeout(() => favBtn.classList.remove('pop-bounce'), 300);
                        
                        // Show popup Toast
                        const pToast = document.getElementById('playground-toast');
                        if (pToast) {
                            pToast.innerText = isSavedNow ? 'Saved to My Collection' : 'Removed from Collection';
                            pToast.classList.add('active');
                            setTimeout(() => pToast.classList.remove('active'), 2200);
                        }
                        
                        updateSavedProfileGrid();
                        syncSaveButtonStates();
                    };
                }

                // Tactile Long-Press trigger for Quick Preview sheet
                let pressTimer = null;
                const startPress = (e) => {
                    pressTimer = setTimeout(() => {
                        const sheet = document.getElementById('playground-preview-sheet');
                        const backdrop = document.getElementById('playground-preview-backdrop');
                        const sheetTitle = document.getElementById('preview-sheet-title');
                        const sheetDesc = document.querySelector('#playground-preview-sheet p');
                        const sheetPrice = document.querySelector('#playground-preview-sheet span[style*="accent-cyan"]');
                        const sheetMeta = document.querySelector('#playground-preview-sheet span[style*="font-size: 12px"]');
                        const viewBtn = document.getElementById('btn-close-sheet-preview');
                        
                        if (sheet && backdrop) {
                            if (sheetTitle) sheetTitle.innerText = pkg.title;
                            if (sheetDesc) sheetDesc.innerText = pkg.highlights || pkg.description || "Experience the best of local food, sightseeing, and scenic guides customized for your comfort.";
                            if (sheetPrice) sheetPrice.innerText = pkg.price || pkg.priceStr;
                            if (sheetMeta) sheetMeta.innerText = `⏱ ${pkg.duration} • ${pkg.type || pkg.category.toUpperCase()}`;
                            
                            if (viewBtn) {
                                viewBtn.onclick = () => {
                                    sheet.classList.remove('active');
                                    setTimeout(() => backdrop.style.display = 'none', 300);
                                    openPackageDetailsView(pkg);
                                };
                            }
                            
                            backdrop.style.display = 'block';
                            setTimeout(() => sheet.classList.add('active'), 50);
                        }
                    }, 500);
                };

                const cancelPress = () => {
                    if (pressTimer) clearTimeout(pressTimer);
                };

                card.addEventListener('mousedown', startPress);
                card.addEventListener('touchstart', startPress);
                card.addEventListener('mouseup', cancelPress);
                card.addEventListener('touchend', cancelPress);
                card.addEventListener('mouseleave', cancelPress);
            });
        };

        // Populate category chips behavior
        const chips = discoveryEl.querySelectorAll('.mobile-chip');
        chips.forEach(chip => {
            chip.onclick = () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                
                const filter = chip.dataset.filter;
                // Filter the rails based on category!
                filterMobileRails(filter);
            };
        });

        // Filter rails method
        const filterMobileRails = (categoryFilter) => {
            const rails = ['rail-top-picks', 'rail-trending', 'rail-weekend', 'rail-adventure', 'rail-beaches', 'rail-more-journeys'];
            rails.forEach(railId => {
                const rail = document.getElementById(railId);
                if (!rail) return;
                const scroll = rail.querySelector('.rail-items-scroll');
                let list = [];
                if (railId === 'rail-top-picks') {
                    list = allPackagesData.slice(0, 3);
                } else if (railId === 'rail-trending') {
                    list = [...allPackagesData].reverse().slice(0, 4);
                } else if (railId === 'rail-weekend') {
                    list = allPackagesData.filter(p => parseInt(pkgDurationInt(p)) <= 4);
                } else if (railId === 'rail-adventure') {
                    list = allPackagesData.filter(p => p.style === 'adventure' || p.category === 'mountains' || p.experiences === 'trekking' || (p.title && p.title.toLowerCase().includes('expedition')));
                } else if (railId === 'rail-beaches') {
                    list = allPackagesData.filter(p => p.category === 'beaches' || p.experiences === 'beaches' || (p.title && p.title.toLowerCase().includes('beach')));
                } else {
                    list = allPackagesData.slice(2, 6);
                }

                if (categoryFilter !== 'all') {
                    list = list.filter(p => p.category === categoryFilter);
                }
                
                if (list.length === 0) {
                    rail.style.display = 'none';
                } else {
                    rail.style.display = 'block';
                    scroll.innerHTML = list.map(p => createCompactCardMarkup(p)).join('');
                    bindCompactCardEvents(scroll);
                }
            });
        };

        const pkgDurationInt = (p) => {
            if (p.duration === undefined || p.duration === null) return '5';
            return String(p.duration).replace(/[^0-9]/g, '') || '5';
        };

        // Render Hero Carousel
        const renderHeroCarousel = () => {
            const carousel = document.getElementById('mobile-featured-carousel');
            if (!carousel) return;
            
            const heroPkgs = [
                allPackagesData.find(p => p.title.includes("Ladakh")) || allPackagesData[0],
                allPackagesData.find(p => p.title.includes("Goa")) || allPackagesData[1],
                allPackagesData.find(p => p.title.includes("Kashmir")) || allPackagesData[2]
            ].filter(Boolean);

            let activeIdx = 0;
            const drawHero = () => {
                const pkg = heroPkgs[activeIdx];
                const isSaved = savedList.includes(pkg.title);

        let travelDatesStr = "Daily Departures (Aug 2026 – Oct 2026)";
        const planStart = document.getElementById('match-start-date') ? document.getElementById('match-start-date').value : '';
        const planEnd = document.getElementById('match-end-date') ? document.getElementById('match-end-date').value : '';
        
        if (planStart && planEnd) {
            const parseAndFormat = (dateStr) => {
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const date = new Date(parts[0], parts[1] - 1, parts[2]);
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                }
                return dateStr;
            };
            travelDatesStr = `${parseAndFormat(planStart)} – ${parseAndFormat(planEnd)}`;
        } else {
            const today = new Date();
            const startMonth = today.toLocaleString('default', { month: 'short' });
            const endMonth = new Date(today.setMonth(today.getMonth() + 3)).toLocaleString('default', { month: 'short' });
            const currentYear = new Date().getFullYear();
            travelDatesStr = `Flexible (${startMonth} – ${endMonth} ${currentYear})`;
        }
        

                carousel.innerHTML = `
                    <div class="hero-carousel-item" style="background-image: url('${pkg.bg || pkg.imgUrl}')">
                        <div class="hero-carousel-overlay"></div>
                        <div class="hero-carousel-content">
                            <span class="hero-carousel-tag">Featured Journey • ${pkg.type || pkg.category.toUpperCase()}</span>
                            <h2 class="hero-carousel-title">${pkg.title}</h2>
                            <div class="hero-carousel-meta">
                                <span>⏱ ${pkg.duration}</span> &bull; 
                                <span>⭐ ${pkg.rating} Rating</span>
                            </div>
                            <div class="hero-carousel-price">
                                Starting from <strong>${pkg.price || pkg.priceStr}</strong>
                            </div>
                            <div class="hero-carousel-buttons">
                                <button type="button" class="btn-primary-large btn-hero-view" style="flex: 2; padding: 10px 16px; border-radius: 8px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer; font-size: 13px; outline: none;">View Package</button>
                                <button type="button" class="btn-secondary-action btn-hero-save" style="flex: 1; padding: 10px; border-radius: 8px; font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px;">${isSaved ? '❤️ Saved' : '♡ Save'}</button>
                            </div>
                            
                            <!-- Pagination indicators -->
                            <div style="display: flex; gap: 6px; justify-content: center; margin-top: 15px;">
                                ${heroPkgs.map((_, i) => `<span class="carousel-dot" style="width: 6px; height: 6px; border-radius: 50%; background: ${i === activeIdx ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.3)'};"></span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;

                // Bind Carousel Actions
                carousel.querySelector('.btn-hero-view').onclick = () => {
                    openPackageDetailsView(pkg);
                };
                
                const saveBtn = carousel.querySelector('.btn-hero-save');
                saveBtn.onclick = () => {
                    toggleSavedPackage(pkg.title);
                    drawHero();
                    updateSavedProfileGrid();
                    syncSaveButtonStates();
                };
            };
            drawHero();

            // Simple swipe support
            let startX = 0;
            carousel.ontouchstart = (e) => { startX = e.touches[0].clientX; };
            carousel.ontouchend = (e) => {
                const diffX = e.changedTouches[0].clientX - startX;
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        activeIdx = (activeIdx - 1 + heroPkgs.length) % heroPkgs.length;
                    } else {
                        activeIdx = (activeIdx + 1) % heroPkgs.length;
                    }
                    drawHero();
                }
            };
        };

        // Render Experiences category visual cards
        const renderExperiencesRail = () => {
            const scroll = document.querySelector('#rail-experiences .rail-items-scroll');
            if (!scroll) return;
            scroll.innerHTML = experienceCategories.map(cat => `
                <div class="experience-visual-card" data-filter="${cat.filter}" style="background-image: url('${cat.bg}')">
                    <div class="experience-visual-overlay">
                        <div class="experience-visual-title">${cat.title}</div>
                    </div>
                </div>
            `).join('');
            
            scroll.querySelectorAll('.experience-visual-card').forEach(card => {
                card.onclick = () => {
                    const filter = card.dataset.filter;
                    const chip = discoveryEl.querySelector(`.mobile-chip[data-filter="${filter}"]`);
                    if (chip) chip.click();
                };
            });
        };

        // Render Destinations visual cards
        const renderDestinationsRail = () => {
            const scroll = document.querySelector('#rail-destinations .rail-items-scroll');
            if (!scroll) return;
            scroll.innerHTML = destinationsDataList.map(dest => `
                <div class="destination-visual-card" data-query="${dest.query}" style="background-image: url('${dest.bg}')">
                    <div class="destination-visual-overlay">
                        <div class="destination-visual-name">${dest.name}</div>
                    </div>
                </div>
            `).join('');

            scroll.querySelectorAll('.destination-visual-card').forEach(card => {
                card.onclick = () => {
                    const query = card.dataset.query;
                    // Filter package detail list or redirect to search
                    const pkg = allPackagesData.find(p => p.title.toLowerCase().includes(query.toLowerCase()));
                    if (pkg) openPackageDetailsView(pkg);
                };
            });
        };

        // Budget filters
        const renderBudgetRail = () => {
            const chips = document.querySelectorAll('.budget-chip-item');
            chips.forEach(chip => {
                chip.onclick = () => {
                    chips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    const min = parseInt(chip.dataset.min);
                    const max = parseInt(chip.dataset.max);
                    
                    // Open a package fitting this budget
                    const pkg = allPackagesData.find(p => {
                        const amt = parseInt(p.price.replace(/[^0-9]/g, '')) || 15000;
                        return amt >= min && amt <= max;
                    });
                    if (pkg) openPackageDetailsView(pkg);
                };
            });
        };

        // Bind planner CTA
        const btnPlan = document.getElementById('btn-mobile-trigger-planner');
        if (btnPlan) {
            btnPlan.onclick = () => {
                navigateTo('planner');
            };
        }

        // Render Continue Exploring rail (Recently Viewed)
        const renderContinueExploringRail = () => {
            const rail = document.getElementById('rail-continue-exploring');
            if (!rail) return;
            const scroll = rail.querySelector('.rail-items-scroll');
            const recent = JSON.parse(localStorage.getItem('beacon_recent_views')) || [];
            if (recent.length === 0) {
                rail.style.display = 'none';
                return;
            }
            rail.style.display = 'block';
            const pkgs = recent.map(item => allPackagesData.find(p => p.title === item.title)).filter(Boolean);
            scroll.innerHTML = pkgs.map(p => createCompactCardMarkup(p)).join('');
            bindCompactCardEvents(scroll);
        };

        // Render Because you liked...
        const renderBecauseYouLikedRail = () => {
            // Find category of last recently viewed
            const recent = JSON.parse(localStorage.getItem('beacon_recent_views')) || [];
            const lastSaved = savedList[0];
            let categoryToUse = '';
            let titleToUse = '';
            
            if (lastSaved) {
                const pkg = allPackagesData.find(p => p.title === lastSaved);
                if (pkg) {
                    categoryToUse = pkg.category;
                    titleToUse = pkg.title;
                }
            } else if (recent.length > 0) {
                const pkg = allPackagesData.find(p => p.title === recent[0].title);
                if (pkg) {
                    categoryToUse = pkg.category;
                    titleToUse = pkg.title;
                }
            }
            
            const existRail = document.getElementById('rail-because-liked');
            if (existRail) existRail.remove();
            
            if (!categoryToUse) return;

            const rail = document.createElement('div');
            rail.className = 'mobile-rail-section';
            rail.id = 'rail-because-liked';
            rail.innerHTML = `
                <div class="rail-header" style="padding: 0 16px; margin-bottom: 10px;">
                    <h4 style="font-size: 14px; font-weight: 800; color: #fff; margin: 0;">More Like ${titleToUse}</h4>
                </div>
                <div class="rail-items-scroll"></div>
            `;
            
            const scroll = rail.querySelector('.rail-items-scroll');
            const list = allPackagesData.filter(p => p.category === categoryToUse && p.title !== titleToUse);
            if (list.length === 0) return;
            
            scroll.innerHTML = list.map(p => createCompactCardMarkup(p)).join('');
            bindCompactCardEvents(scroll);
            
            // Insert before More Journeys
            const moreRail = document.getElementById('rail-more-journeys');
            if (moreRail) {
                moreRail.parentElement.insertBefore(rail, moreRail);
            }
        };

        // Run renders
        renderHeroCarousel();
        filterMobileRails('all');
        renderExperiencesRail();
        renderDestinationsRail();
        renderBudgetRail();
        renderContinueExploringRail();
        renderBecauseYouLikedRail();
    };

    // Initialize Page Data Scrapers
    setTimeout(() => {
        handleDeepLinking();
        filterAllPackages();
        updateSavedProfileGrid();
        syncSaveButtonStates();
        
        // ----------------------------------------------------
        // PLAYGROUND ANIMATIONS & INTERACTIVE MANAGER
        // ----------------------------------------------------
        const openPlayground = document.getElementById('btn-open-animation-playground');
        if (openPlayground) {
            openPlayground.onclick = () => {
                navigateTo('playground');
            };
        }

        const backPlayground = document.getElementById('btn-playground-back');
        if (backPlayground) {
            backPlayground.onclick = () => {
                navigateTo('profile');
            };
        }

        // Feature 1: Hero Carousel rotating demo
        const heroData = [
            { title: "Leh Ladakh Expedition", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" },
            { title: "Goa Beachfront Escape", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
            { title: "Kashmir Paradise Escape", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" }
        ];
        let heroIdx = 0;
        const miniHero = document.getElementById('playground-mini-hero');
        const miniHeroTitle = document.getElementById('playground-hero-title');
        
        let heroInterval = setInterval(() => {
            if (!miniHero) return;
            heroIdx = (heroIdx + 1) % heroData.length;
            miniHero.style.opacity = 0.5;
            setTimeout(() => {
                miniHero.style.backgroundImage = `url('${heroData[heroIdx].bg}')`;
                miniHeroTitle.innerText = heroData[heroIdx].title;
                miniHero.style.opacity = 1;
            }, 300);
        }, 6000);

        if (miniHero) {
            miniHero.ontouchstart = () => {
                clearInterval(heroInterval);
            };
        }

        // Feature 4: Heart bounce and Toast trigger
        const favBtn = document.getElementById('playground-fav-btn');
        const toast = document.getElementById('playground-toast');
        
        if (favBtn) {
            favBtn.onclick = () => {
                favBtn.classList.toggle('active');
                favBtn.classList.add('pop-bounce');
                setTimeout(() => favBtn.classList.remove('pop-bounce'), 300);
                
                const isActive = favBtn.classList.contains('active');
                favBtn.innerText = isActive ? '❤️' : '♡';
                
                if (toast) {
                    toast.innerText = isActive ? 'Saved to My Collection' : 'Removed from Collection';
                    toast.classList.add('active');
                    setTimeout(() => toast.classList.remove('active'), 2500);
                }
            };
        }

        // Feature 5: Category switch transition
        const chipBtns = document.querySelectorAll('.playground-chip-btn');
        const resultContainer = document.getElementById('playground-results-container');
        
        chipBtns.forEach(btn => {
            btn.onclick = () => {
                chipBtns.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                
                if (resultContainer) {
                    resultContainer.classList.add('fade-out');
                    setTimeout(() => {
                        if (filter === 'm') {
                            resultContainer.innerHTML = '🗻 Leh Ladakh Expedition &bull; Manali Cedar Chalet';
                        } else {
                            resultContainer.innerHTML = '🏝️ Goa Beachfront Escape &bull; Varkala Cliffside Yoga';
                        }
                        resultContainer.classList.remove('fade-out');
                    }, 200);
                }
            };
        });

        // Feature 7: Long press sheet overlay
        const pressCard = document.getElementById('btn-playground-longpress');
        const previewBackdrop = document.getElementById('playground-preview-backdrop');
        const previewSheet = document.getElementById('playground-preview-sheet');
        const closeSheet = document.getElementById('btn-close-sheet-preview');
        
        let pressTimer = null;
        if (pressCard) {
            // Touch Start / Mouse down
            const startPress = () => {
                pressTimer = setTimeout(() => {
                    if (previewSheet && previewBackdrop) {
                        previewBackdrop.style.display = 'block';
                        setTimeout(() => previewSheet.classList.add('active'), 50);
                    }
                }, 500);
            };

            // Touch End / Mouse Up
            const endPress = () => {
                if (pressTimer) clearTimeout(pressTimer);
            };

            pressCard.addEventListener('mousedown', startPress);
            pressCard.addEventListener('touchstart', startPress);
            pressCard.addEventListener('mouseup', endPress);
            pressCard.addEventListener('touchend', endPress);
        }

        if (closeSheet) {
            closeSheet.onclick = () => {
                if (previewSheet && previewBackdrop) {
                    previewSheet.classList.remove('active');
                    setTimeout(() => previewBackdrop.style.display = 'none', 300);
                }
            };
        }

        if (previewBackdrop) {
            previewBackdrop.onclick = () => {
                if (previewSheet) {
                    previewSheet.classList.remove('active');
                    setTimeout(() => previewBackdrop.style.display = 'none', 300);
                }
            };
        }

        // Feature 8: Blur-reveal load simulation
        const triggerLoad = document.getElementById('btn-trigger-progressive-load');
        const sharpImg = document.getElementById('sharp-img-test');
        
        if (triggerLoad && sharpImg) {
            triggerLoad.onclick = () => {
                sharpImg.classList.remove('loaded');
                setTimeout(() => {
                    sharpImg.classList.add('loaded');
                }, 800);
            };
        }

        initMobileHomeDiscovery();
    }, 500);

    // HELPER FOR MOBILE-FIRST NETFLIX PACKAGE DETAILS MOCKUP (DESIGN 1)
    const renderMobilePackageDetails = (pkg) => {
        activeDetailsPkg = pkg;
        const detailsView = document.getElementById('view-package-details');
        if (!detailsView) return;

        const isSaved = savedList.includes(pkg.title);
        const isCompared = selectedComparePackages.some(item => item.title === pkg.title);
        const basePriceVal = pkg.basePrice || Math.round(pkg.priceNum * 1.11);
        const basePriceStr = "₹" + basePriceVal.toLocaleString();

        const dur = pkg.duration || 4;
        const activities = pkg.highlights ? pkg.highlights.split(',') : ["Explore local viewpoints", "Guided nature walk", "Leisure tour of surrounding villages"];
        const sights = pkg.sightseeing ? pkg.sightseeing.split(',') : ["Main square", "Local markets", "Scenic viewpoints"];

        // 1. Build Itinerary Overview markup
        let itineraryHtml = '';
        for (let day = 1; day <= dur; day++) {
            let dayTitle = "";
            let dayDesc = "";
            let dayTrans = "";
            let dayAct = "";
            let dayMeals = "Breakfast Included";
            
            if (day === 1) {
                dayTitle = "Arrival & Resort Check-in";
                dayTrans = "Private Airport Transfer";
                dayAct = "Welcome dinner & sunset leisure";
                dayDesc = `Arrive at the destination. Private airport transfer directly to your premium resort for check-in. Relax and enjoy a welcome cocktail with sunset beach views.`;
                dayMeals = pkg.meals === 'All Inclusive' ? 'All Inclusive Meals' : 'Welcome Dinner Included';
            } else if (day === dur) {
                dayTitle = "Breakfast & Departure";
                dayTrans = "Private Airport Transfer";
                dayAct = "Morning beach walk & checkout";
                dayDesc = "Enjoy a delicious morning buffet breakfast. Complete checkout formalities and board your private cab to the airport with cherished memories.";
                dayMeals = "Breakfast Included";
            } else {
                const actIndex = (day - 2) % activities.length;
                const sightIndex = (day - 2) % sights.length;
                dayTitle = activities[actIndex] ? activities[actIndex].trim() : "Local Sightseeing Tour";
                dayTrans = "Private Cab local transfer";
                dayAct = `Explore ${sights[sightIndex] ? sights[sightIndex].trim() : 'scenic highlights'}`;
                dayDesc = `Set out on an exciting sightseeing tour visiting ${sights[sightIndex] ? sights[sightIndex].trim() : 'scenic highlights'} and popular local attractions.`;
                dayMeals = pkg.meals === 'All Inclusive' ? 'All Inclusive Meals' : 'Breakfast & Dinner Included';
            }

            itineraryHtml += `
                <div class="itinerary-day-card ${day === 1 ? 'active' : ''}" style="position: relative; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 12px; overflow: hidden; background: rgba(255,255,255,0.01);">
                    <!-- Glowing Dot in Timeline -->
                    <div class="timeline-dot-m ${day === 1 ? 'dot-solid' : 'dot-ring'}"></div>
                    <div class="itinerary-day-header" style="padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s;">
                        <div class="itinerary-day-header-left" style="display: flex; align-items: center; gap: 10px;">
                            <span class="day-badge" style="background: rgba(0, 203, 224, 0.1); color: var(--accent-cyan); font-weight: 800; font-size: 10.5px; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Day ${day}</span>
                            <span class="day-title-text" style="font-size: 13.5px; font-weight: 800; color: #fff;">${dayTitle}</span>
                        </div>
                        <span class="acc-arrow" style="font-size: 10px; color: var(--text-slate); transition: transform 0.2s;">▼</span>
                    </div>
                    <div class="itinerary-day-body" style="max-height: 0; overflow: hidden; transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s; padding: 0 16px; background: rgba(7, 10, 20, 0.4); border-top: 1px solid rgba(255,255,255,0.02);">
                        <p style="font-size:12.5px; color:var(--text-slate); line-height:1.6; margin: 12px 0;">${dayDesc}</p>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:6px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            <span>Transport: ${dayTrans}</span>
                        </div>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:6px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            <span>Activity: ${dayAct}</span>
                        </div>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:12px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            <span>Meals: ${dayMeals}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // 2. Fetch travel partner info dynamically
        const isFreelancer = pkg.style === 'couple' || pkg.category === 'beaches';
        const partnerData = isFreelancer ? {
            name: "Rahul Mehta",
            type: "Independent Local Guide",
            rating: "4.9",
            reviews: "94",
            trips: "120+",
            experience: "6 Years",
            responseRate: "98%",
            languages: ["English", "Hindi", "Kashmiri"],
            about: "Born and raised in Srinagar, Rahul has been guiding travelers across Kashmir valleys, lakes, and high ridges since 2018. Certified in wilderness rescue and first aid.",
            expertise: ["Trekking", "Cultural Tours", "Photography"],
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            location: "Srinagar, Jammu & Kashmir",
            tripsCount: 120,
            travelers: "850+",
            destinations: "12+"
        } : {
            name: "Wanderlust Travels",
            type: "Bespoke Tour Agency",
            rating: "4.85",
            reviews: "1,240",
            trips: "1,850+",
            experience: "12 Years",
            responseRate: "95%",
            languages: ["English", "Hindi", "Spanish"],
            about: "A premier local operator specializing in curated group departures, luxury escapes, and custom itineraries across scenic Himalayan routes and beach havens.",
            expertise: ["Luxury Trips", "Family Groups", "Honeymoon Planning"],
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
            location: "New Delhi, India",
            tripsCount: 1850,
            travelers: "12,400+",
            destinations: "45+"
        };

        // 3. Dynamic available dates string calculation
        let travelDatesStr = "Daily Departures (Aug 2026 – Oct 2026)";
        const planStart = document.getElementById('match-start-date') ? document.getElementById('match-start-date').value : '';
        const planEnd = document.getElementById('match-end-date') ? document.getElementById('match-end-date').value : '';
        
        if (planStart && planEnd) {
            const parseAndFormat = (dateStr) => {
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const date = new Date(parts[0], parts[1] - 1, parts[2]);
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                }
                return dateStr;
            };
            travelDatesStr = `${parseAndFormat(planStart)} – ${parseAndFormat(planEnd)}`;
        } else {
            const today = new Date();
            const startMonth = today.toLocaleString('default', { month: 'short' });
            const endMonth = new Date(today.setMonth(today.getMonth() + 3)).toLocaleString('default', { month: 'short' });
            const currentYear = new Date().getFullYear();
            travelDatesStr = `Flexible (${startMonth} – ${endMonth} ${currentYear})`;
        }

        // 4. Recommendation algorithm for Similar Trips Horizontal Cards
        const similarPackages = allPackagesData.filter(p => {
            if (p.title === pkg.title) return false;
            // Matches same category landscape or same trip style duration
            return p.category === pkg.category || p.style === pkg.style;
        }).slice(0, 4);

        let similarTripsHtml = '';
        similarPackages.forEach(sim => {
            const simSaved = savedList.includes(sim.title);
            similarTripsHtml += `
                <div class="similar-card-m" data-title="${sim.title}" style="flex: 0 0 65%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; cursor: pointer; scroll-snap-align: start;">
                    <div style="height: 100px; background-image: url('${sim.imgUrl}'); background-size: cover; background-position: center; position: relative;">
                        <button type="button" class="sim-fav-btn" data-title="${sim.title}" style="position: absolute; top: 8px; right: 8px; background: rgba(18,24,35,0.6); border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="${simSaved ? 'var(--accent-cyan)' : '#fff'}" stroke-width="2" fill="${simSaved ? 'var(--accent-cyan)' : 'none'}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                    <div style="padding: 10px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h5 style="margin: 0 0 4px 0; font-size: 12px; font-weight: 800; color: #fff; white-space: normal; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${sim.title}</h5>
                            <span style="font-size: 10px; color: var(--text-slate);">${sim.duration} Days • ${sim.style.toUpperCase()}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                            <strong style="font-size: 13px; color: var(--accent-cyan);">${sim.priceStr}</strong>
                            <span style="font-size: 10px; color: #fbbf24;">★ ${sim.rating.replace('⭐', '').trim()}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        // 5. Hide Mobile Bottom Nav
        const mobNav = document.querySelector('.mobile-bottom-nav');
        if (mobNav) mobNav.style.display = 'none';

        // 6. Build the entire fullscreen page markup
        detailsView.innerHTML = `
            <!-- Fullscreen Hero Image -->
            <div class="mobile-details-hero" style="background-image: url('${pkg.imgUrl}'); height: 50vh; background-size: cover; background-position: center; position: relative;">
                <div class="mobile-details-hero-overlay" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(7, 10, 20, 1) 0%, rgba(7, 10, 20, 0.4) 60%, rgba(0,0,0,0.3) 100%);"></div>
                <div class="mobile-details-hero-header" style="position: absolute; top: 24px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 10;">
                    <button type="button" class="btn-m-back" id="btn-details-m-back" style="background: rgba(18, 24, 35, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <div style="display:flex; gap:12px;">
                        <button type="button" class="btn-m-share" id="btn-details-m-share" style="background: rgba(18, 24, 35, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </button>
                        <button type="button" class="btn-m-fav ${isSaved ? 'active' : ''}" id="btn-details-m-fav" style="background: rgba(18, 24, 35, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s;">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="${isSaved ? 'var(--accent-cyan)' : '#fff'}" stroke-width="2" fill="${isSaved ? 'var(--accent-cyan)' : 'none'}" stroke-linecap="round" stroke-linejoin="round" class="heart-svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="mobile-details-hero-title-box" style="position: absolute; bottom: 20px; left: 16px; right: 16px; z-index: 10;">
                    <span class="mobile-details-badge" style="font-size: 9px; font-weight: 800; background: var(--accent-cyan); color: var(--bg-dark); padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 8px;">${pkg.category.toUpperCase()}</span>
                    <h2 style="font-size: 24px; font-weight: 900; color: #fff; line-height: 1.2; margin: 0 0 6px 0;">${pkg.title}</h2>
                    <div class="mobile-details-location" style="font-size: 12.5px; color: var(--text-slate); display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        ${pkg.hotelAddress || pkg.location || 'Srinagar, Kashmir'}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <span style="font-size: 11px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 4px 10px; font-weight: 700; color: #fff;">⏱ ${pkg.duration} Days</span>
                        <span style="font-size: 11px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 4px 10px; font-weight: 700; color: #fff;">👥 ${pkg.style === 'couple' ? 'Couple Friendly' : 'Family Trip'}</span>
                        <span style="font-size: 11px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 4px 10px; font-weight: 700; color: #fff;">🏨 ${pkg.accommodation === 'resort' ? 'Premium Resort' : 'Luxury Hotel'}</span>
                    </div>
                </div>
            </div>

            <!-- Page Scrolling Content Container -->
            <div class="mobile-details-scroll-content" style="padding: 16px 0; background: var(--bg-dark); box-sizing: border-box; width: 100%;">
                
                <!-- Package Summary Card -->
                <div class="mobile-summary-card" style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; margin: 0 16px 24px 16px; box-sizing: border-box;">
                    <div>
                        <div style="font-size: 15px; font-weight: 850; color: #fff; display: flex; align-items: center; gap: 6px;">
                            <span style="color: #fbbf24;">★</span> ${pkg.rating.replace('⭐', '').trim()}
                        </div>
                        <div style="font-size: 11px; color: var(--text-slate); margin-top: 2px;">${pkg.reviews || 124} Reviews</div>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 11px; color: var(--text-slate); text-transform: uppercase; display: block; margin-bottom: 2px;">Starting from</span>
                        <strong style="font-size: 20px; font-weight: 900; color: var(--accent-cyan);">${pkg.priceStr}</strong>
                        <span style="font-size: 11px; color: var(--text-slate); display: block;">per person</span>
                    </div>
                </div>

                <!-- About This Trip -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">About this trip</h3>
                    <p id="about-trip-text" style="font-size: 13px; line-height: 1.6; color: var(--text-slate); margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; transition: all 0.3s ease;">
                        Experience the gorgeous landscapes and pristine, top-rated destinations with the ${pkg.title}. Designed by expert travel planners to maximize comfort, featuring curated sightseeing guides, private airport transfers, premium accommodations at ${pkg.hotelName || 'resort highlights'}, and daily breakfast dining inclusions.
                    </p>
                    <button type="button" id="btn-about-read-more" style="background: none; border: none; color: var(--accent-cyan); font-weight: 800; font-size: 12px; margin-top: 8px; padding: 0; cursor: pointer; display: flex; align-items: center; gap: 4px; outline: none;">
                        Read More ↓
                    </button>
                </div>

                <!-- Highlights -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Highlights</h3>
                    <div class="highlights-grid-m" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 8px;">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" stroke-width="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                            <span style="font-size: 12px; font-weight: 700; color: #fff;">Resort Stay</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 8px;">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                            <span style="font-size: 12px; font-weight: 700; color: #fff;">Daily Breakfast</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 8px;">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" stroke-width="2" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            <span style="font-size: 12px; font-weight: 700; color: #fff;">Guided Tours</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 8px;">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" stroke-width="2" fill="none"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            <span style="font-size: 12px; font-weight: 700; color: #fff;">Cab Transfers</span>
                        </div>
                    </div>
                </div>

                <!-- Gallery -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0;">Gallery</h3>
                        <button type="button" id="btn-gallery-view-all" style="background: none; border: none; color: var(--accent-cyan); font-weight: 800; font-size: 12.5px; padding: 0; cursor: pointer; outline: none;">View All ></button>
                    </div>
                    <div class="gallery-scroll-m" style="display: flex; gap: 10px; overflow-x: auto; white-space: nowrap; padding-bottom: 6px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
                        <div class="gallery-item-m" style="flex: 0 0 75%; height: 130px; background-image: url('${pkg.imgUrl}'); background-size: cover; background-position: center; border-radius: 10px; scroll-snap-align: start; cursor: pointer;"></div>
                        <div class="gallery-item-m" style="flex: 0 0 75%; height: 130px; background-image: url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=300&q=80'); background-size: cover; background-position: center; border-radius: 10px; scroll-snap-align: start; cursor: pointer;"></div>
                        <div class="gallery-item-m" style="flex: 0 0 75%; height: 130px; background-image: url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=300&q=80'); background-size: cover; background-position: center; border-radius: 10px; scroll-snap-align: start; cursor: pointer;"></div>
                    </div>
                </div>

                <!-- Itinerary Overview (Accordion Timeline) -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">
                        <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0;">Itinerary Overview</h3>
                        <button type="button" id="btn-m-view-full-itinerary" style="background: none; border: none; color: var(--accent-cyan); font-weight: 800; font-size: 12.5px; padding: 0; cursor: pointer; outline: none;">View Full Itinerary ></button>
                    </div>
                    
                    <div style="position: relative; padding-left: 20px; margin-top: 15px;" id="mobile-details-accordion">
                        <!-- Connecting Line -->
                        <div style="position: absolute; left: 6px; top: 16px; bottom: 16px; width: 2px; background: rgba(255,255,255,0.06);"></div>
                        
                        ${itineraryHtml}
                    </div>
                </div>

                <!-- Best Time to Visit -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Best Time to Visit</h3>
                    <div style="display: flex; gap: 12px; padding: 15px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px;">
                        <div style="font-size: 20px; color: var(--accent-cyan); display: flex; align-items: center;">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </div>
                        <div>
                            <strong style="font-size: 13.5px; color: #fff; display: block;">Oct – Mar</strong>
                            <span style="font-size: 12px; color: var(--text-slate); margin-top: 4px; display: block; line-height: 1.5;">Pleasant weather, perfect for beach activities and sightseeing.</span>
                        </div>
                    </div>
                </div>

                <!-- Stay & Accommodation -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Stay & Accommodation</h3>
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 15px; box-sizing: border-box;">
                        <h4 style="font-size: 14.5px; font-weight: 800; color: #fff; margin: 0 0 4px 0;">${pkg.hotelName || 'Premium Beachside Resort'}</h4>
                        <span style="font-size: 11.5px; color: var(--text-slate); display: block; margin-bottom: 8px;">📍 ${pkg.hotelAddress || 'Mararikulam, Kerala'}</span>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span style="font-size: 10px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 5px; border-radius: 3px;">4★ Premium Stay</span>
                            <button type="button" id="btn-view-map-accommodation" style="background: none; border: none; color: var(--accent-cyan); font-weight: 800; font-size: 11.5px; padding: 0; cursor: pointer; text-decoration: underline; outline: none;">View on Google Maps ></button>
                        </div>
                        <p style="font-size: 12.5px; line-height: 1.5; color: var(--text-slate); margin: 0 0 12px 0;">Enjoy deluxe ocean suites with private balconies, pool access, free high-speed Wi-Fi, and immediate beach access.</p>
                        
                        <div style="display: flex; gap: 8px; overflow-x: auto;">
                            <div style="flex: 0 0 45%; height: 75px; background-image: url('${pkg.imgUrl}'); background-size: cover; background-position: center; border-radius: 6px;"></div>
                            <div style="flex: 0 0 45%; height: 75px; background-image: url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=200&q=80'); background-size: cover; background-position: center; border-radius: 6px;"></div>
                            <div style="flex: 0 0 45%; height: 75px; background-image: url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=200&q=80'); background-size: cover; background-position: center; border-radius: 6px;"></div>
                        </div>
                    </div>
                </div>

                <!-- Activities & Experiences -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Activities & Experiences</h3>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;">
                            <div>
                                <strong style="font-size: 13px; color: #fff; display: block;">Guided Backwater Cruise</strong>
                                <span style="font-size: 11.5px; color: var(--text-slate); margin-top: 2px; display: block;">Alleppey backwaters private shikara ride</span>
                            </div>
                            <span style="font-size: 10px; font-weight: 800; color: #22c55e; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.15); padding: 2px 6px; border-radius: 4px;">Included</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;">
                            <div>
                                <strong style="font-size: 13px; color: #fff; display: block;">Sunset Beach Walk & Cycling</strong>
                                <span style="font-size: 11.5px; color: var(--text-slate); margin-top: 2px; display: block;">Guided sunset viewpoints and local villages cycling</span>
                            </div>
                            <span style="font-size: 10px; font-weight: 800; color: #22c55e; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.15); padding: 2px 6px; border-radius: 4px;">Included</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;">
                            <div>
                                <strong style="font-size: 13px; color: #fff; display: block;">Water Sports Package</strong>
                                <span style="font-size: 11.5px; color: var(--text-slate); margin-top: 2px; display: block;">Jet ski, parasailing & speed boat ride</span>
                            </div>
                            <span style="font-size: 10px; font-weight: 800; color: var(--accent-cyan); background: rgba(0,203,224,0.08); border: 1px solid rgba(0,203,224,0.15); padding: 2px 6px; border-radius: 4px;">Optional Add-on</span>
                        </div>
                    </div>
                </div>

                <!-- Transport -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Transport</h3>
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 15px;">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
                                <span style="color: var(--text-slate);">Airport Pickup / Drop:</span>
                                <strong style="color: #fff;">Private sedan included</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
                                <span style="color: var(--text-slate);">Local Sightseeing Vehicle:</span>
                                <strong style="color: #fff;">Private cab transfers</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
                                <span style="color: var(--text-slate);">Flight Status:</span>
                                <strong style="color: var(--accent-cyan);">Not Included (Available as Add-on)</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Meals & Dining Informational Section (Package View) -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 4px 0;">Meals & Dining</h3>
                    <span style="font-size: 11px; color: var(--text-slate); display: block; margin-bottom: 12px;">Meal plan and availability included with this package.</span>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <!-- Breakfast Card -->
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                                    <span style="font-size: 13.5px; font-weight: 850; color: #fff;">Breakfast</span>
                                    <span style="font-size: 9.5px; font-weight: 800; color: #22c55e; background: rgba(34,197,94,0.08); padding: 1px 5px; border-radius: 3px; text-transform: uppercase;">Included</span>
                                </div>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 11.5px; color: var(--text-slate); line-height: 1.5;">
                                    <li>• Vegetarian (Veg Only)</li>
                                    <li>• Unlimited Buffet</li>
                                    <li>• Available: All Days</li>
                                </ul>
                            </div>
                            <div style="width: 55px; height: 55px; background-image: url('https://images.unsplash.com/photo-1496042399014-dc73c4f2bdf1?auto=format&fit=crop&w=100&q=80'); background-size: cover; background-position: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04);"></div>
                        </div>

                        <!-- Lunch Card -->
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                                    <span style="font-size: 13.5px; font-weight: 850; color: #fff;">Lunch</span>
                                    <span style="font-size: 9.5px; font-weight: 800; color: #22c55e; background: rgba(34,197,94,0.08); padding: 1px 5px; border-radius: 3px; text-transform: uppercase;">Included</span>
                                </div>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 11.5px; color: var(--text-slate); line-height: 1.5;">
                                    <li>• Vegetarian & Non-Vegetarian</li>
                                    <li>• Limited / Fixed Menu</li>
                                    <li>• Available: Day 1, Day 2, Day 3</li>
                                </ul>
                            </div>
                            <div style="width: 55px; height: 55px; background-image: url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'); background-size: cover; background-position: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04);"></div>
                        </div>

                        <!-- Dinner Card -->
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                                    <span style="font-size: 13.5px; font-weight: 850; color: #fff;">Dinner</span>
                                    <span style="font-size: 9.5px; font-weight: 800; color: #22c55e; background: rgba(34,197,94,0.08); padding: 1px 5px; border-radius: 3px; text-transform: uppercase;">Included</span>
                                </div>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 11.5px; color: var(--text-slate); line-height: 1.5;">
                                    <li>• Vegetarian & Non-Vegetarian</li>
                                    <li>• Unlimited Buffet</li>
                                    <li>• Available: All Days</li>
                                </ul>
                            </div>
                            <div style="width: 55px; height: 55px; background-image: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80'); background-size: cover; background-position: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04);"></div>
                        </div>
                    </div>

                    <div style="margin-top: 12px; display: flex; align-items: flex-start; gap: 6px;">
                        <span style="font-size: 12px; color: var(--text-slate); line-height: 1.4;">ⓘ Day-wise meal availability may vary. You can select your meal preferences during booking.</span>
                    </div>
                </div>

                <!-- Inclusions & Exclusions -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Inclusions</h3>
                    <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; font-size: 13px; line-height: 1.8; color: var(--text-slate);">
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--accent-cyan); font-weight: bold;">✓</span> 3 Nights resort accommodation</li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--accent-cyan); font-weight: bold;">✓</span> Daily breakfast at resort dining room</li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--accent-cyan); font-weight: bold;">✓</span> Private airport transfers in AC Sedan</li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--accent-cyan); font-weight: bold;">✓</span> Guided local backwater cruise tour</li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--accent-cyan); font-weight: bold;">✓</span> Applicable taxes & driver allowances</li>
                    </ul>

                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Exclusions</h3>
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px; line-height: 1.8; color: var(--text-slate);">
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef4444; font-weight: bold;">✕</span> Airfare or train fare to Cochin</li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef4444; font-weight: bold;">✕</span> Lunch and dinners not listed in schedule</li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef4444; font-weight: bold;">✕</span> Personal expenses (room service, tips)</li>
                        <li style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef4444; font-weight: bold;">✕</span> Optional water sports add-on packages</li>
                    </ul>
                </div>

                <!-- Trip Details -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Trip Details</h3>
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 15px;">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <span>Destination</span>
                                </div>
                                <strong style="color: #fff;">${pkg.location || 'Mararikulam, Kerala'}</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                                    <span>Trip Duration</span>
                                </div>
                                <strong style="color: #fff;">${pkg.duration} Days / ${pkg.duration - 1} Nights</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>Trip Type</span>
                                </div>
                                <strong style="color: #fff;">${pkg.style === 'couple' ? 'Couple Honeymoon' : 'Family Trip'}</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    <span>Best For</span>
                                </div>
                                <strong style="color: #fff;">${pkg.style === 'couple' ? 'Couples, Solo' : 'Families, Couples'}</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>
                                    <span>Accommodation</span>
                                </div>
                                <strong style="color: #fff;">4★ Beach Resort</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m-2.54-15.38c-3.72 4.35-8.94 5.66-6.19 15.58"></path></svg>
                                    <span>Meal Plan</span>
                                </div>
                                <strong style="color: #fff;">Breakfast Included</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                                    <span>Transport</span>
                                </div>
                                <strong style="color: #fff;">Private AC Sedan</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Travel Partner (Mobile Card) -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">🤝 Meet Your Travel Partner</h3>
                    <div class="partner-profile-card" style="padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; box-sizing: border-box;">
                        <div class="partner-profile-header" style="display: flex; gap: 12px; align-items: center; margin-bottom: 15px;">
                            <div class="partner-avatar" style="width: 50px; height: 50px; background-image: url('${partnerData.avatar}'); border-radius: 50%; background-size: cover; background-position: center; border: 1px solid var(--accent-cyan); flex-shrink: 0;"></div>
                            <div class="partner-name-col">
                                <h5 style="margin: 0; font-size: 14px; font-weight: 850; color: #fff; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                                    ${partnerData.name} 
                                    <span style="font-size: 8px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 4px; border-radius: 2px;">VERIFIED</span>
                                </h5>
                                <span style="font-size: 11px; color: var(--text-slate); font-weight: 700; display: block; margin-top: 2px;">${partnerData.type}</span>
                                <div style="font-size: 10.5px; color: var(--text-slate); margin-top: 2px;">⭐ ${partnerData.rating} (${partnerData.reviews} Reviews)</div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <p style="font-size: 12px; line-height: 1.5; color: var(--text-slate); margin: 0; font-style: italic;">"${partnerData.about}"</p>
                        </div>
                        
                        <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span style="font-size: 11px; color: var(--text-slate);">Expertise:</span>
                            ${partnerData.expertise.map(exp => `<span style="font-size: 9.5px; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; font-weight: 700;">${exp}</span>`).join('')}
                        </div>
                        
                        <button type="button" class="btn-view-full-profile" id="btn-m-view-partner-profile" style="width: 100%; padding: 10px; font-size: 12px; font-weight: 850; border-radius: 8px; cursor: pointer; border: 1px solid var(--accent-cyan); background: transparent; color: var(--accent-cyan); transition: all 0.2s; outline: none; text-align: center;">View Profile</button>
                    </div>
                </div>

                <!-- Reviews -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">
                        <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0;">Reviews (${pkg.reviews || 124})</h3>
                        <button type="button" id="btn-reviews-view-all" style="background: none; border: none; color: var(--accent-cyan); font-weight: 800; font-size: 12.5px; padding: 0; cursor: pointer; outline: none;">View All</button>
                    </div>
                    
                    <!-- Rating breakdown -->
                    <div style="display: flex; gap: 20px; align-items: center; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 15px; box-sizing: border-box; margin-bottom: 16px;">
                        <div style="text-align: center;">
                            <strong style="font-size: 28px; font-weight: 900; color: #fff; display: block; line-height: 1;">4.8</strong>
                            <div style="color: #fbbf24; font-size: 12px; margin-top: 4px; margin-bottom: 2px;">★★★★★</div>
                            <span style="font-size: 10px; color: var(--text-slate); text-transform: uppercase; font-weight: 700;">Excellent</span>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">
                                <span style="color: var(--text-slate); width: 22px;">5 ★</span>
                                <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                                    <div style="width: 86%; height: 100%; background: var(--accent-cyan);"></div>
                                </div>
                                <span style="color: var(--text-slate); width: 25px; text-align: right;">86%</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">
                                <span style="color: var(--text-slate); width: 22px;">4 ★</span>
                                <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                                    <div style="width: 10%; height: 100%; background: var(--accent-cyan);"></div>
                                </div>
                                <span style="color: var(--text-slate); width: 25px; text-align: right;">10%</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">
                                <span style="color: var(--text-slate); width: 22px;">3 ★</span>
                                <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                                    <div style="width: 3%; height: 100%; background: var(--accent-cyan);"></div>
                                </div>
                                <span style="color: var(--text-slate); width: 25px; text-align: right;">3%</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">
                                <span style="color: var(--text-slate); width: 22px;">2 ★</span>
                                <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                                    <div style="width: 1%; height: 100%; background: var(--accent-cyan);"></div>
                                </div>
                                <span style="color: var(--text-slate); width: 25px; text-align: right;">1%</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">
                                <span style="color: var(--text-slate); width: 22px;">1 ★</span>
                                <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                                    <div style="width: 0%; height: 100%; background: var(--accent-cyan);"></div>
                                </div>
                                <span style="color: var(--text-slate); width: 25px; text-align: right;">0%</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Verified Reviewer Card -->
                    <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 15px; box-sizing: border-box;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <div style="width: 36px; height: 36px; background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'); background-size: cover; border-radius: 50%;"></div>
                                <div>
                                    <strong style="font-size: 12.5px; color: #fff; display: flex; align-items: center; gap: 4px;">
                                        Rohit Sharma 
                                        <span style="font-size: 8px; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 4px; border-radius: 2px; font-weight: 800;">VERIFIED</span>
                                    </strong>
                                    <span style="font-size: 10.5px; color: var(--text-slate); display: block; margin-top: 1px;">2 weeks ago</span>
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="color: #fbbf24; font-size: 11px;">★★★★★</div>
                                <span style="font-size: 10px; color: var(--text-slate);">5 / 5 Rating</span>
                            </div>
                        </div>
                        <p style="font-size: 12px; line-height: 1.5; color: var(--text-slate); margin: 0 0 10px 0;">Amazing stay! The resort was absolutely beautiful and the staff was extremely friendly. The backwater shikara cruise was easily the highlight of our trip.</p>
                        <div style="display: flex; gap: 6px;">
                            <div style="width: 55px; height: 40px; background-image: url('${pkg.imgUrl}'); background-size: cover; border-radius: 4px;"></div>
                            <div style="width: 55px; height: 40px; background-image: url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=100&q=80'); background-size: cover; border-radius: 4px;"></div>
                            <div style="width: 55px; height: 40px; background-image: url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=100&q=80'); background-size: cover; border-radius: 4px;"></div>
                        </div>
                    </div>
                </div>

                <!-- Policies -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">Policies & Important Information</h3>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div class="policy-accordion-card-m" style="border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden;">
                            <div class="policy-header-m" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: rgba(255,255,255,0.01);">
                                <span style="font-size: 13px; font-weight: 750; color: #fff;">Cancellation Policy</span>
                                <span class="policy-arrow-m" style="font-size: 10px; color: var(--text-slate);">▶</span>
                            </div>
                            <div class="policy-body-m" style="display: none; padding: 12px 16px; font-size: 12px; line-height: 1.5; color: var(--text-slate); background: rgba(7, 10, 20, 0.4); border-top: 1px solid rgba(255,255,255,0.04);">
                                Full refund if cancelled up to 15 days before departure date. 50% refund between 7 to 14 days. No refunds within 7 days of departure.
                            </div>
                        </div>
                        <div class="policy-accordion-card-m" style="border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden;">
                            <div class="policy-header-m" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: rgba(255,255,255,0.01);">
                                <span style="font-size: 13px; font-weight: 750; color: #fff;">Payment Policy</span>
                                <span class="policy-arrow-m" style="font-size: 10px; color: var(--text-slate);">▶</span>
                            </div>
                            <div class="policy-body-m" style="display: none; padding: 12px 16px; font-size: 12px; line-height: 1.5; color: var(--text-slate); background: rgba(7, 10, 20, 0.4); border-top: 1px solid rgba(255,255,255,0.04);">
                                Secure your seat by paying a minimum deposit of 25% today. The remaining balance can be settled up to 10 days before your journey starts.
                            </div>
                        </div>
                        <div class="policy-accordion-card-m" style="border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden;">
                            <div class="policy-header-m" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: rgba(255,255,255,0.01);">
                                <span style="font-size: 13px; font-weight: 750; color: #fff;">Refund Policy</span>
                                <span class="policy-arrow-m" style="font-size: 10px; color: var(--text-slate);">▶</span>
                            </div>
                            <div class="policy-body-m" style="display: none; padding: 12px 16px; font-size: 12px; line-height: 1.5; color: var(--text-slate); background: rgba(7, 10, 20, 0.4); border-top: 1px solid rgba(255,255,255,0.04);">
                                Approved refunds are processed automatically back to your source account or original UPI ID within 5 to 7 business days.
                            </div>
                        </div>
                        <div class="policy-accordion-card-m" style="border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden;">
                            <div class="policy-header-m" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: rgba(255,255,255,0.01);">
                                <span style="font-size: 13px; font-weight: 750; color: #fff;">Travel Documents</span>
                                <span class="policy-arrow-m" style="font-size: 10px; color: var(--text-slate);">▶</span>
                            </div>
                            <div class="policy-body-m" style="display: none; padding: 12px 16px; font-size: 12px; line-height: 1.5; color: var(--text-slate); background: rgba(7, 10, 20, 0.4); border-top: 1px solid rgba(255,255,255,0.04);">
                                All travelers must carry valid government-issued Photo ID proofs (Aadhaar Card, Passport, or Voter ID). Double-check flight seat reference codes.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Similar Trips -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 120px; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">
                        <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0;">Similar Trips</h3>
                        <button type="button" id="btn-similar-view-all" style="background: none; border: none; color: var(--accent-cyan); font-weight: 800; font-size: 12.5px; padding: 0; cursor: pointer; outline: none;">View All</button>
                    </div>
                    <div class="similar-trips-scroll-m" style="display: flex; gap: 12px; overflow-x: auto; white-space: nowrap; padding-bottom: 10px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
                        ${similarTripsHtml}
                    </div>
                </div>
            </div>

            <!-- Sticky Booking Bar (Single Line Layout Override) -->
            <div class="mobile-details-sticky-bar" style="position: fixed; bottom: 0; left: 0; right: 0; height: 68px; background: rgba(7, 10, 20, 0.95); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; z-index: 10000; box-sizing: border-box;">
                <div style="display: flex; align-items: baseline; gap: 4px; white-space: nowrap;">
                    <strong style="font-size: 18px; font-weight: 900; color: var(--accent-cyan);">${pkg.priceStr}</strong>
                    <span style="font-size: 11px; color: var(--text-slate);">/ person (incl. taxes)</span>
                </div>
                <button type="button" class="btn-m-book-now" id="btn-m-book-now-sticky" style="background: var(--accent-cyan) !important; color: var(--bg-dark) !important; border: none; padding: 11px 18px; font-size: 13px; font-weight: 850; border-radius: 8px; cursor: pointer; outline: none; box-shadow: 0 4px 12px rgba(0, 203, 224, 0.2); transition: transform 0.1s ease; white-space: nowrap;">BOOK NOW →</button>
            </div>

            <!-- Full-Screen Swipeable Gallery Modal -->
            <div id="full-gallery-modal" style="display: none; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: #000; z-index: 30000; flex-direction: column; box-sizing: border-box;">
                <div style="padding: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 10;">
                    <button type="button" id="close-gallery-btn" style="background: rgba(255,255,255,0.15); border: none; color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 16px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; outline: none;">✕</button>
                    <span style="font-size: 14px; color: #fff; font-weight: 800;" id="gallery-index-label">1 / 3</span>
                    <div style="width: 36px;"></div>
                </div>
                <div id="gallery-swipe-wrap" style="flex: 1; display: flex; overflow-x: auto; white-space: nowrap; scroll-snap-type: x mandatory; align-items: center; -webkit-overflow-scrolling: touch; padding-bottom: 20px;">
                    <div style="flex: 0 0 100%; display: flex; justify-content: center; scroll-snap-align: center; box-sizing: border-box; padding: 0 10px;"><img src="${pkg.imgUrl}" style="max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 8px;"></div>
                    <div style="flex: 0 0 100%; display: flex; justify-content: center; scroll-snap-align: center; box-sizing: border-box; padding: 0 10px;"><img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80" style="max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 8px;"></div>
                    <div style="flex: 0 0 100%; display: flex; justify-content: center; scroll-snap-align: center; box-sizing: border-box; padding: 0 10px;"><img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80" style="max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 8px;"></div>
                </div>
            </div>

            <!-- Mobile Dates & Booking Configuration Sheet Drawer -->
            <div id="mobile-booking-drawer" style="display: none; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: var(--bg-dark); z-index: 20000; flex-direction: column; padding: 20px 16px; box-sizing: border-box; overflow-y: auto; animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px; margin-bottom: 20px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 850; color: #fff;">Booking Configuration</h3>
                    <button type="button" id="close-booking-drawer-btn" style="background: rgba(255,255,255,0.05); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; outline: none;">✕</button>
                </div>

                <!-- Select Available Dates -->
                <div style="margin-bottom: 20px;">
                    <label style="font-size: 11px; font-weight: 800; color: var(--text-slate); text-transform: uppercase; display: block; margin-bottom: 8px; letter-spacing: 0.5px;">Select Travel Date</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid var(--accent-cyan); background: rgba(0,203,224,0.05); border-radius: 8px; cursor: pointer;">
                            <span style="font-size: 13px; color: #fff; font-weight: 750;" id="m-book-date-1">15 Aug – 20 Aug 2026</span>
                            <input type="radio" name="m-book-date" value="date-1" checked style="accent-color: var(--accent-cyan);">
                        </label>
                        <label style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; cursor: pointer;">
                            <span style="font-size: 13px; color: var(--text-slate);" id="m-book-date-2">12 Sep – 17 Sep 2026</span>
                            <input type="radio" name="m-book-date" value="date-2" style="accent-color: var(--accent-cyan);">
                        </label>
                        <label style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; cursor: pointer;">
                            <span style="font-size: 13px; color: var(--text-slate);" id="m-book-date-3">08 Oct – 13 Oct 2026</span>
                            <input type="radio" name="m-book-date" value="date-3" style="accent-color: var(--accent-cyan);">
                        </label>
                    </div>
                </div>

                <!-- Traveller Count -->
                <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 8px;">
                    <div>
                        <strong style="font-size: 13px; color: #fff; display: block;">Number of Travellers</strong>
                        <span style="font-size: 11px; color: var(--text-slate); margin-top: 2px; display: block;">Min 1, Max 10</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <button type="button" id="btn-m-travellers-dec" style="width: 28px; height: 28px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; color: #fff; font-weight: 800; cursor: pointer; outline: none; display: flex; align-items: center; justify-content: center;">-</button>
                        <strong style="font-size: 15px; color: #fff; width: 16px; text-align: center;" id="m-travellers-count">2</strong>
                        <button type="button" id="btn-m-travellers-inc" style="width: 28px; height: 28px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; color: #fff; font-weight: 800; cursor: pointer; outline: none; display: flex; align-items: center; justify-content: center;">+</button>
                    </div>
                </div>

                <!-- Available Add-ons -->
                <div style="margin-bottom: 20px;">
                    <label style="font-size: 11px; font-weight: 800; color: var(--text-slate); text-transform: uppercase; display: block; margin-bottom: 8px; letter-spacing: 0.5px;">Optional Add-ons</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01); border-radius: 8px; cursor: pointer;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <input type="checkbox" id="m-addon-guide" style="accent-color: var(--accent-cyan); width: 16px; height: 16px;">
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 12.5px; color: #fff; font-weight: 700;">Private Tour Guide</span>
                                    <span style="font-size: 10px; color: var(--text-slate); margin-top: 1px;">Dedicated guide during sightseeing</span>
                                </div>
                            </div>
                            <strong style="font-size: 12px; color: var(--accent-cyan);">+₹3,500</strong>
                        </label>
                        <label style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01); border-radius: 8px; cursor: pointer;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <input type="checkbox" id="m-addon-meals" style="accent-color: var(--accent-cyan); width: 16px; height: 16px;">
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 12.5px; color: #fff; font-weight: 700;">Premium Meals Upgrade</span>
                                    <span style="font-size: 10px; color: var(--text-slate); margin-top: 1px;">Buffet Lunch & dinner plan</span>
                                </div>
                            </div>
                            <strong style="font-size: 12px; color: var(--accent-cyan);">+₹2,000 / traveler</strong>
                        </label>
                    </div>
                </div>

                <!-- Price Breakdown -->
                <div style="margin-bottom: 24px; padding: 15px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; box-sizing: border-box;">
                    <label style="font-size: 11px; font-weight: 800; color: var(--text-slate); text-transform: uppercase; display: block; margin-bottom: 10px; letter-spacing: 0.5px;">Price Breakdown</label>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12.5px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: var(--text-slate);">Base Price (${pkg.priceStr} × <span id="lbl-m-travellers-breakdown">2</span>):</span>
                            <span style="color: #fff;" id="breakdown-base-total">₹44,000</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: var(--text-slate);">Add-ons:</span>
                            <span style="color: #fff;" id="breakdown-addons-total">₹0</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: var(--text-slate);">GST / Taxes & Fees (5%):</span>
                            <span style="color: #fff;" id="breakdown-taxes-total">₹2,200</span>
                        </div>
                        <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px; margin-top: 4px; display: flex; justify-content: space-between; font-size: 14.5px; font-weight: 850;">
                            <span style="color: #fff;">Total Amount:</span>
                            <span style="color: var(--accent-cyan);" id="breakdown-grand-total">₹46,200</span>
                        </div>
                    </div>
                </div>

                <!-- Drawer CTA Button -->
                <button type="button" class="btn-primary-large" id="btn-m-confirm-booking-pay" style="width: 100%; padding: 14px; font-size: 14px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; border-radius: 8px; cursor: pointer; outline: none; box-shadow: 0 4px 15px rgba(0,203,224,0.3);">Confirm Booking & Pay</button>
            </div>
        `;

        // 7. Bind interactive actions
        // Back Button
        const mBackBtn = document.getElementById('btn-details-m-back');
        if (mBackBtn) {
            mBackBtn.onclick = () => {
                const navBack = document.querySelector('.mobile-bottom-nav');
                if (navBack && window.innerWidth < 768) navBack.style.display = 'flex';
                navigateTo(previousViewId);
            };
        }

        // Save toggle
        const mFavBtn = document.getElementById('btn-details-m-fav');
        if (mFavBtn) {
            mFavBtn.onclick = () => {
                toggleSavedPackage(pkg.title);
                const saved = savedList.includes(pkg.title);
                const heartSvg = mFavBtn.querySelector('.heart-svg');
                if (saved) {
                    mFavBtn.classList.add('active');
                    if (heartSvg) {
                        heartSvg.setAttribute('fill', 'var(--accent-cyan)');
                        heartSvg.setAttribute('stroke', 'var(--accent-cyan)');
                    }
                    showToast("❤️ Saved to My Collection");
                } else {
                    mFavBtn.classList.remove('active');
                    if (heartSvg) {
                        heartSvg.setAttribute('fill', 'none');
                        heartSvg.setAttribute('stroke', '#fff');
                    }
                    showToast("🤍 Removed from Collection");
                }
                mFavBtn.style.transform = 'scale(1.2)';
                setTimeout(() => mFavBtn.style.transform = '', 200);
                
                updateSavedProfileGrid();
                syncSaveButtonStates();
            };
        }

        // Share Sheets
        const mShareBtn = document.getElementById('btn-details-m-share');
        if (mShareBtn) {
            mShareBtn.onclick = () => {
                openShareSheet(pkg);
            };
        }

        // Expand "About This Trip" read more
        const readMoreBtn = document.getElementById('btn-about-read-more');
        const aboutText = document.getElementById('about-trip-text');
        if (readMoreBtn && aboutText) {
            readMoreBtn.addEventListener('click', () => {
                if (aboutText.style.display === 'block') {
                    aboutText.style.display = '-webkit-box';
                    readMoreBtn.innerHTML = 'Read More ↓';
                } else {
                    aboutText.style.display = 'block';
                    readMoreBtn.innerHTML = 'Read Less ↑';
                }
            });
        }

        // Bind Itinerary day accordions click toggling
        const mAccordion = document.getElementById('mobile-details-accordion');
        if (mAccordion) {
            mAccordion.querySelectorAll('.itinerary-day-header').forEach(header => {
                header.onclick = () => {
                    const card = header.parentElement;
                    const body = card.querySelector('.itinerary-day-body');
                    const arrow = card.querySelector('.acc-arrow');
                    
                    if (card.classList.contains('active')) {
                        card.classList.remove('active');
                        body.style.maxHeight = '0';
                        if (arrow) arrow.style.transform = '';
                    } else {
                        card.classList.add('active');
                        body.style.maxHeight = '300px';
                        if (arrow) arrow.style.transform = 'rotate(180deg)';
                    }
                };
            });
        }

        // View Full Itinerary accordion toggle
        const viewFullItineraryBtn = document.getElementById('btn-m-view-full-itinerary');
        if (viewFullItineraryBtn && mAccordion) {
            viewFullItineraryBtn.addEventListener('click', () => {
                const dayCards = mAccordion.querySelectorAll('.itinerary-day-card');
                const isAnyCollapsed = Array.from(dayCards).some(card => !card.classList.contains('active'));
                
                dayCards.forEach(card => {
                    const body = card.querySelector('.itinerary-day-body');
                    const arrow = card.querySelector('.acc-arrow');
                    
                    if (isAnyCollapsed) {
                        card.classList.add('active');
                        body.style.maxHeight = '300px';
                        if (arrow) arrow.style.transform = 'rotate(180deg)';
                    } else {
                        card.classList.remove('active');
                        body.style.maxHeight = '0';
                        if (arrow) arrow.style.transform = '';
                    }
                });
                
                if (isAnyCollapsed) {
                    viewFullItineraryBtn.innerHTML = 'Hide Full Itinerary ↑';
                } else {
                    viewFullItineraryBtn.innerHTML = 'View Full Itinerary >';
                }
            });
        }

        // Policies accordion rows click toggling
        const policyCards = document.querySelectorAll('.policy-accordion-card-m');
        policyCards.forEach(card => {
            const header = card.querySelector('.policy-header-m');
            const body = card.querySelector('.policy-body-m');
            const arrow = card.querySelector('.policy-arrow-m');
            if (header && body) {
                header.addEventListener('click', () => {
                    if (body.style.display === 'none') {
                        body.style.display = 'block';
                        if (arrow) arrow.style.transform = 'rotate(90deg)';
                        if (arrow) arrow.style.color = 'var(--accent-cyan)';
                    } else {
                        body.style.display = 'none';
                        if (arrow) arrow.style.transform = '';
                        if (arrow) arrow.style.color = '';
                    }
                });
            }
        });

        // Horizontal Gallery Images Modal open
        const galleryItems = document.querySelectorAll('.gallery-item-m');
        const galleryViewAll = document.getElementById('btn-gallery-view-all');
        const galleryModal = document.getElementById('full-gallery-modal');
        const closeGalleryBtn = document.getElementById('close-gallery-btn');
        const gallerySwipeWrap = document.getElementById('gallery-swipe-wrap');
        const galleryIndexLabel = document.getElementById('gallery-index-label');

        const openGallery = (idx = 0) => {
            if (galleryModal) {
                galleryModal.style.display = 'flex';
                if (gallerySwipeWrap) {
                    const width = gallerySwipeWrap.clientWidth;
                    gallerySwipeWrap.scrollTo({ left: idx * width, behavior: 'instant' });
                    if (galleryIndexLabel) galleryIndexLabel.innerText = `${idx + 1} / 3`;
                }
            }
        };

        galleryItems.forEach((item, idx) => {
            item.addEventListener('click', () => openGallery(idx));
        });
        if (galleryViewAll) {
            galleryViewAll.addEventListener('click', () => openGallery(0));
        }
        if (closeGalleryBtn) {
            closeGalleryBtn.onclick = () => {
                if (galleryModal) galleryModal.style.display = 'none';
            };
        }
        if (gallerySwipeWrap) {
            gallerySwipeWrap.addEventListener('scroll', () => {
                const width = gallerySwipeWrap.clientWidth;
                const idx = Math.round(gallerySwipeWrap.scrollLeft / width);
                if (galleryIndexLabel) galleryIndexLabel.innerText = `${idx + 1} / 3`;
            });
        }

        // Maps redirection
        const btnViewMap = document.getElementById('btn-view-map-accommodation');
        if (btnViewMap) {
            btnViewMap.addEventListener('click', () => {
                const addr = encodeURIComponent(pkg.hotelAddress || pkg.hotelName || 'Maldives');
                window.open(`https://www.google.com/maps/search/?api=1&query=${addr}`, '_blank');
            });
        }

        // Travel Partner view profile redirection
        const mPartnerProfileBtn = document.getElementById('btn-m-view-partner-profile');
        if (mPartnerProfileBtn) {
            mPartnerProfileBtn.addEventListener('click', () => {
                openPlannerProfileView(partnerData, pkg);
            });
        }

        // Similar package cards clicks
        const simCards = document.querySelectorAll('.similar-card-m');
        simCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.sim-fav-btn')) return;
                const title = card.dataset.title;
                const target = allPackagesData.find(p => p.title === title);
                if (target) renderMobilePackageDetails(target);
            });

            const favBtn = card.querySelector('.sim-fav-btn');
            if (favBtn) {
                favBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const title = favBtn.dataset.title;
                    toggleSavedPackage(title);
                    const saved = savedList.includes(title);
                    const svg = favBtn.querySelector('svg');
                    if (saved) {
                        svg.setAttribute('fill', 'var(--accent-cyan)');
                        svg.setAttribute('stroke', 'var(--accent-cyan)');
                        showToast("❤️ Saved to My Collection");
                    } else {
                        svg.setAttribute('fill', 'none');
                        svg.setAttribute('stroke', '#fff');
                        showToast("🤍 Removed from Collection");
                    }
                    updateSavedProfileGrid();
                    syncSaveButtonStates();
                });
            }
        });

        // 8. Sticky Booking Drawer & Configurations - Click Book Now triggers mobile customization SPA view!
        const bookSticky = document.getElementById('btn-m-book-now-sticky');
        if (bookSticky) {
            bookSticky.onclick = () => {
                // Initialize Draft Booking state
                initNewDraftBookingState(pkg);
            };
        }
        if (closeBookingDrawerBtn) {
            closeBookingDrawerBtn.onclick = () => {
                if (bookingDrawer) bookingDrawer.style.display = 'none';
            };
        }

        // Select dates configuration labels
        const bookRadios = document.getElementsByName('m-book-date');
        const bookDateLabel1 = document.getElementById('m-book-date-1');
        const bookDateLabel2 = document.getElementById('m-book-date-2');
        const bookDateLabel3 = document.getElementById('m-book-date-3');

        // Dynamically shift labels based on query dates
        if (bookDateLabel1) bookDateLabel1.innerText = travelDatesStr;
        
        const nextMonth = (offset) => {
            const d = new Date();
            d.setMonth(d.getMonth() + offset);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${d.getDate()} ${months[d.getMonth()]} – ${d.getDate() + 5} ${months[d.getMonth()]} ${d.getFullYear()}`;
        };
        if (bookDateLabel2) bookDateLabel2.innerText = nextMonth(1);
        if (bookDateLabel3) bookDateLabel3.innerText = nextMonth(2);

        // Traveller count controls
        const btnDec = document.getElementById('btn-m-travellers-dec');
        const btnInc = document.getElementById('btn-m-travellers-inc');
        const cntTravellers = document.getElementById('m-travellers-count');
        const lblBreakdownCount = document.getElementById('lbl-m-travellers-breakdown');

        let travellersCount = 2;

        const updateTravellerCount = (val) => {
            travellersCount = Math.max(1, Math.min(10, travellersCount + val));
            if (cntTravellers) cntTravellers.innerText = travellersCount;
            if (lblBreakdownCount) lblBreakdownCount.innerText = travellersCount;
            calcBookingTotal();
        };

        if (btnDec) btnDec.onclick = () => updateTravellerCount(-1);
        if (btnInc) btnInc.onclick = () => updateTravellerCount(1);

        // Add-ons check updates
        const addOnGuide = document.getElementById('m-addon-guide');
        const addOnMeals = document.getElementById('m-addon-meals');

        if (addOnGuide) addOnGuide.onchange = () => calcBookingTotal();
        if (addOnMeals) addOnMeals.onchange = () => calcBookingTotal();

        // Calculate booking breakdown pricing
        function calcBookingTotal() {
            const basePrice = pkg.priceNum || 22000;
            const baseTotal = basePrice * travellersCount;
            
            let addonsTotal = 0;
            if (addOnGuide && addOnGuide.checked) addonsTotal += 3500;
            if (addOnMeals && addOnMeals.checked) addonsTotal += (2000 * travellersCount);

            const taxesTotal = Math.round((baseTotal + addonsTotal) * 0.05);
            const grandTotal = baseTotal + addonsTotal + taxesTotal;

            const baseTotalEl = document.getElementById('breakdown-base-total');
            const addonsTotalEl = document.getElementById('breakdown-addons-total');
            const taxesTotalEl = document.getElementById('breakdown-taxes-total');
            const grandTotalEl = document.getElementById('breakdown-grand-total');

            if (baseTotalEl) baseTotalEl.innerText = "₹" + baseTotal.toLocaleString();
            if (addonsTotalEl) addonsTotalEl.innerText = "₹" + addonsTotal.toLocaleString();
            if (taxesTotalEl) taxesTotalEl.innerText = "₹" + taxesTotal.toLocaleString();
            if (grandTotalEl) grandTotalEl.innerText = "₹" + grandTotal.toLocaleString();
        }

        // Final Confirm Payment check trigger
        const btnConfirmPay = document.getElementById('btn-m-confirm-booking-pay');
        if (btnConfirmPay) {
            btnConfirmPay.onclick = () => {
                if (bookingDrawer) bookingDrawer.style.display = 'none';
                
                // Set calculated final amount payable dynamically
                const finalAmt = document.getElementById('breakdown-grand-total') ? document.getElementById('breakdown-grand-total').innerText : pkg.priceStr;
                
                // Setup active checkout state
                activeCheckoutPkg = pkg;
                const randNum = Math.floor(10000 + Math.random() * 90000);
                activeBookingId = `BCN-2026-${randNum}`;

                const isFreelancerCheck = pkg.style === 'couple' || pkg.category === 'beaches';
                let upiId = 'wanderworld@upi';
                let plannerName = 'WanderWorld Travels';
                if (isFreelancerCheck) {
                    upiId = localStorage.getItem('beacon_planner_upi') || 'rahul@upi';
                    plannerName = localStorage.getItem('beacon_planner_business') || 'Rahul Mehta';
                } else {
                    upiId = 'wanderlust@upi';
                    plannerName = 'Wanderlust Travels';
                }

                // Inject final calculated amounts to checkout modal
                const modalPayable = document.getElementById('checkout-payable-amount');
                const modalTitle = document.getElementById('checkout-package-title');
                const modalBookId = document.getElementById('checkout-booking-id');
                const modalUpi = document.getElementById('checkout-upi-display');
                const modalNote = document.getElementById('checkout-note-display');
                const qrImage = document.getElementById('checkout-qr-code');

                if (modalPayable) modalPayable.innerText = finalAmt;
                if (modalTitle) modalTitle.innerText = pkg.title;
                if (modalBookId) modalBookId.innerText = activeBookingId;
                if (modalUpi) modalUpi.innerText = upiId;
                if (modalNote) modalNote.innerText = activeBookingId;
                if (qrImage) {
                    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(plannerName)}&am=${finalAmt.replace(/[^\d]/g, '')}&tn=${activeBookingId}`;
                    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiString)}`;
                }

                // Show UPI payment check modal
                const checkoutModal = document.getElementById('checkout-payment-modal');
                if (checkoutModal) checkoutModal.style.display = 'flex';
            };
        }
    };;



    // ========================================================
    // BEACON MOBILE — BOOKING CUSTOMIZATION & MEALS SYSTEM
    // ========================================================
    let activeBookingState = null;

    // Helper to calculate total price breakdown dynamically
    
    // Re-synchronize traveler counts based on passenger profiles age & infant counter
    const syncTravellerCounts = () => {
        if (!activeBookingState) return;
        let adults = 0;
        let children = 0;
        let infants = activeBookingState.travellers.infants || 0;
        
        activeBookingState.passengerProfiles.forEach(p => {
            if (p.type === "Infant") return; // counted via counter
            
            const ageVal = parseInt(p.age);
            if (!isNaN(ageVal) && ageVal <= 12) {
                p.type = "Child";
                children++;
            } else {
                p.type = "Adult";
                adults++;
            }
        });
        
        activeBookingState.travellers.adults = adults;
        activeBookingState.travellers.children = children;
    };

    const calculateCheckoutTotals = () => {
        if (!activeBookingState) return { basePrice: 0, upgradesPrice: 0, mealsPrice: 0, addonsPrice: 0, discount: 0, subtotal: 0, taxes: 0, grandTotal: 0 };
        syncTravellerCounts();
        const pkg = activeBookingState.pkg;
        
        // Count travelers
        const adultCount = activeBookingState.travellers.adults || 0;
        const childCount = activeBookingState.travellers.children || 0;
        const infantCount = activeBookingState.travellers.infants || 0;
        
        // Base Package Prices: Adults ₹22,000, Children ₹15,000, Infants ₹0 (or dynamic package pricing)
        const baseAdultPrice = pkg.priceNum || 22000;
        const baseChildPrice = Math.round(baseAdultPrice * 0.68); // 15,000 on a 22,000 base
        
        const adultTotal = baseAdultPrice * adultCount;
        const childTotal = baseChildPrice * childCount;
        const infantTotal = 0;
        const basePrice = adultTotal + childTotal + infantTotal;

        // Customizations (Stay Upgrades)
        let upgradesPrice = 0;
        if (activeBookingState.stayUpgrades.includes("sea-view")) upgradesPrice += 3000;
        if (activeBookingState.stayUpgrades.includes("extra-bed")) upgradesPrice += (1200 * (pkg.duration || 4));
        if (activeBookingState.transportUpgrades.includes("suv")) upgradesPrice += 2000;
        if (activeBookingState.transportUpgrades.includes("pickup-vip")) upgradesPrice += 1500;

        // Meal Add-ons
        let mealsPrice = 0;
        if (activeBookingState.mealMode === "same") {
            // Option 1: Same Throughout Trip
            activeBookingState.passengerProfiles.forEach(p => {
                if (p.type === "Infant") return; // no meal selection
                const pref = activeBookingState.mealPreferences[p.id];
                if (pref === "Non-Veg") {
                    // Non-Veg add-ons: Day 1 Lunch +₹150, Day 1 Dinner +₹250, Day 2 Breakfast +₹150, Day 2 Dinner +₹250...
                    // Let's hardcode a standard charge representing meals
                    mealsPrice += 650;
                }
            });
        } else {
            // Option 2: Day-by-Day customize
            const days = pkg.duration || 4;
            for (let d = 1; d <= days; d++) {
                const dayConfig = activeBookingState.dayWiseMeals[d] || {};
                // Lunch Veg/Non-Veg options
                const lunchSelections = dayConfig["lunch"] || {};
                activeBookingState.passengerProfiles.forEach(p => {
                    const sel = lunchSelections[p.id];
                    if (sel === "Non-Vegetarian") mealsPrice += 150;
                });
                
                // Dinner Veg/Non-Veg options
                const dinnerSelections = dayConfig["dinner"] || {};
                activeBookingState.passengerProfiles.forEach(p => {
                    const sel = dinnerSelections[p.id];
                    if (sel === "Non-Vegetarian") mealsPrice += 250;
                });
            }
        }

        // Add-ons
        let addonsPrice = 0;
        if (activeBookingState.addOns.includes("scuba")) addonsPrice += (2500 * (adultCount + childCount));
        if (activeBookingState.addOns.includes("dinner")) addonsPrice += 3000;
        if (activeBookingState.addOns.includes("photos")) addonsPrice += 4000;

        // Discount
        const discount = 2000;

        // Math
        const subtotal = Math.max(0, basePrice + upgradesPrice + mealsPrice + addonsPrice - discount);
        const taxes = Math.round(subtotal * 0.05); // 5% GST
        const grandTotal = subtotal + taxes;

        return {
            basePrice,
            adultTotal,
            baseAdultPrice,
            childTotal,
            baseChildPrice,
            upgradesPrice,
            mealsPrice,
            addonsPrice,
            discount,
            subtotal,
            taxes,
            grandTotal
        };
    };

    // Auto save draft state helper
    const autoSaveDraft = () => {
        if (!activeBookingState) return;
        const bookingsList = JSON.parse(localStorage.getItem('beacon_bookings')) || [];
        const idx = bookingsList.findIndex(b => b.id === activeBookingState.bookingId);
        
        // Progress percentage calculation
        const progressPct = { 1: 20, 2: 45, 3: 65, 4: 85, 5: 95 }[activeBookingState.currentStep] || 10;
        
        let progressDesc = "Traveller profiles incomplete";
        if (activeBookingState.currentStep === 2) progressDesc = "Stay & transport selections pending";
        else if (activeBookingState.currentStep === 3) progressDesc = "Meals setup incomplete";
        else if (activeBookingState.currentStep === 4) progressDesc = "Trip add-ons config incomplete";
        else if (activeBookingState.currentStep === 5) progressDesc = "Review and confirm booking";

        const totals = calculateCheckoutTotals();

        const draftData = {
            id: activeBookingState.bookingId,
            packageTitle: activeBookingState.pkg.title,
            imgUrl: activeBookingState.pkg.imgUrl,
            dateRange: activeBookingState.travelDate || "12 Oct – 15 Oct 2026",
            status: "draft",
            progress: progressPct,
            progressDesc: progressDesc,
            travellersCount: activeBookingState.passengerProfiles.length,
            estimatedTotal: totals.grandTotal,
            state: activeBookingState // serialize complete wizard state
        };

        if (idx !== -1) {
            bookingsList[idx] = draftData;
        } else {
            bookingsList.push(draftData);
        }
        localStorage.setItem('beacon_bookings', JSON.stringify(bookingsList));
        
        // Re-render Bookings tab list
        renderBookingsPage();
    };

    // Initialize New Booking State when BOOK NOW clicked
    const initNewDraftBookingState = (pkg) => {
        const randNum = Math.floor(10000 + Math.random() * 90000);
        activeBookingState = {
            bookingId: `BCN-2026-${randNum}`,
            pkg: pkg,
            status: "draft",
            currentStep: 1,
            travelDate: "12 Oct – 15 Oct 2026",
            travellers: {
                adults: 1,
                children: 0,
                infants: 0
            },
            passengerProfiles: [
                { id: 1, type: "Adult", name: "Aditya Kasod", age: 21, gender: "Male", collapsed: true, isPrimary: true }
            ],
            stayUpgrades: [],
            transportUpgrades: [],
            mealMode: "same", // "same" or "daybyday"
            mealPreferences: {
                1: "Vegetarian",
                2: "Non-Veg",
                3: "Vegetarian",
                4: "No Meal"
            },
            dayWiseMeals: {
                1: { lunch: { 1: "Vegetarian", 2: "Vegetarian", 3: "Vegetarian" }, dinner: { 1: "Vegetarian", 2: "Vegetarian", 3: "Vegetarian" } },
                2: { breakfast: { 1: "Vegetarian", 2: "Vegetarian", 3: "Vegetarian" }, dinner: { 1: "Vegetarian", 2: "Vegetarian", 3: "Vegetarian" } },
                3: { lunch: { 1: "Vegetarian", 2: "Vegetarian", 3: "Vegetarian" }, dinner: { 1: "Vegetarian", 2: "Vegetarian", 3: "Vegetarian" } },
                4: { breakfast: { 1: "Vegetarian", 2: "Vegetarian", 3: "Vegetarian" } }
            },
            addOns: [],
            timestamp: Date.now()
        };
        
        autoSaveDraft();
        navigateTo('mobile-booking');
        renderMobileBookingWizard();
    };

    // Resume Incomplete Draft Booking from Bookings list
    const resumeMobileBooking = (bookingId) => {
        const bookingsList = JSON.parse(localStorage.getItem('beacon_bookings')) || [];
        const target = bookingsList.find(b => b.id === bookingId);
        if (target && target.state) {
            activeBookingState = target.state;
            navigateTo('mobile-booking');
            renderMobileBookingWizard();
        } else {
            showToast("⚠️ Could not restore draft booking state.");
        }
    };

    // Render mobile booking customization view step-by-step
    const renderMobileBookingWizard = () => {
        const bookingView = document.getElementById('view-mobile-booking');
        if (!bookingView || !activeBookingState) return;

        const pkg = activeBookingState.pkg;
        const step = activeBookingState.currentStep;
        const totals = calculateCheckoutTotals();

        // 1. Build Stepper Navigation Indicator Markup
        const stepsInfo = ["Travellers", "Stay", "Meals", "Add-ons", "Review"];
        let stepperHtml = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:12px 16px; border-radius:10px;">';
        stepsInfo.forEach((name, idx) => {
            const stepNum = idx + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            
            let numHtml = `<span style="width:20px; height:20px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--text-slate); color:var(--text-slate); background:transparent;">${stepNum}</span>`;
            if (isActive) {
                numHtml = `<span style="width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--accent-cyan); color:var(--bg-dark); background:var(--accent-cyan); box-shadow:0 0 6px var(--accent-cyan);">${stepNum}</span>`;
            } else if (isCompleted) {
                numHtml = `<span style="width:20px; height:20px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--accent-cyan); color:var(--accent-cyan); background:transparent;">✓</span>`;
            }
            
            stepperHtml += `
                <div style="display:flex; flex-direction:column; align-items:center; gap:4px; flex:1;">
                    ${numHtml}
                    <span style="font-size:8.5px; font-weight:800; color:${isActive ? 'var(--accent-cyan)' : 'var(--text-slate)'}; text-transform:uppercase;">${name}</span>
                </div>
            `;
            if (idx < stepsInfo.length - 1) {
                stepperHtml += `<div style="width:12px; height:1px; background:${step > stepNum ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)'}; margin-top:-14px;"></div>`;
            }
        });
        stepperHtml += '</div>';

        // 2. Build Core Step Content Markup
        let stepContentHtml = '';

        if (step === 1) {
            // STEP 1: WHO'S TRAVELLING? (Trip Mate Cards & Add Mate Customization list)
            const activeMatesCount = activeBookingState.passengerProfiles.length + activeBookingState.travellers.infants;
            stepContentHtml += `
                <div class="booking-wizard-step-section">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">WHO'S TRAVELLING?</h3>
                    <span style="font-size:11.5px; color:var(--text-slate); display:block; margin-bottom:15px;">Add everyone joining this journey.</span>

                    <!-- Travel Date Selector -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:20px;">
                        <label style="font-size:10.5px; font-weight:800; color:var(--text-slate); text-transform:uppercase; display:block; margin-bottom:6px;">Travel Date</label>
                        <select id="m-wizard-date-select" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:11px; border-radius:6px; color:#fff; font-size:12.5px; outline:none; height:44px;">
                            <option value="12 Oct – 15 Oct 2026" ${activeBookingState.travelDate === "12 Oct – 15 Oct 2026" ? "selected" : ""}>12 Oct – 15 Oct 2026</option>
                            <option value="18 Nov – 21 Nov 2026" ${activeBookingState.travelDate === "18 Nov – 21 Nov 2026" ? "selected" : ""}>18 Nov – 21 Nov 2026</option>
                            <option value="10 Dec – 13 Dec 2026" ${activeBookingState.travelDate === "10 Dec – 13 Dec 2026" ? "selected" : ""}>10 Dec – 13 Dec 2026</option>
                        </select>
                    </div>

                    <!-- Dynamic Profiles & Trip Mates List -->
                    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:15px;">
                        ${activeBookingState.passengerProfiles.map((p, idx) => {
                            if (p.type === "Infant") return ''; // Infants rendered separately in their counter card below
                            
                            if (p.collapsed) {
                                return `
                                    <!-- Collapsed Traveller Card -->
                                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:15px; display:flex; justify-content:space-between; align-items:center; box-sizing:border-box;">
                                        <div>
                                            <div style="font-size:11px; color:var(--text-slate); font-weight:800; display:flex; align-items:center; gap:4px; margin-bottom:4px; text-transform:uppercase;">
                                                <span>👤</span> ${p.isPrimary ? 'You' : `Trip Mate`}
                                            </div>
                                            <strong style="font-size:14px; color:#fff; display:block;">${p.name || 'Enter traveller\'s name'}</strong>
                                            <span style="font-size:11.5px; color:var(--text-slate); margin-top:2px; display:block;">${p.age ? `${p.age} years` : 'No Age'} • ${p.type}</span>
                                        </div>
                                        <button type="button" class="btn-edit-p-card" data-id="${p.id}" style="background:none; border:none; color:var(--accent-cyan); font-size:12.5px; font-weight:800; cursor:pointer; outline:none; padding:0;">Edit</button>
                                    </div>
                                `;
                            } else {
                                return `
                                    <!-- Expanded Traveller Form Card -->
                                    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--accent-cyan); border-radius:12px; padding:16px; box-sizing:border-box; position:relative;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.04); padding-bottom:8px;">
                                            <span style="font-size:11px; font-weight:800; color:var(--accent-cyan); text-transform:uppercase;">${p.isPrimary ? 'You' : `Traveller Details`}</span>
                                            <div style="display:flex; gap:10px;">
                                                ${!p.isPrimary ? `<button type="button" class="btn-delete-p-card" data-id="${p.id}" style="background:none; border:none; color:#fbbf24; font-size:11px; cursor:pointer; outline:none; font-weight:700;">Remove</button>` : ''}
                                                <button type="button" class="btn-collapse-p-card" data-id="${p.id}" style="background:none; border:none; color:var(--text-slate); font-size:11px; cursor:pointer; outline:none; font-weight:700;">Save</button>
                                            </div>
                                        </div>
                                        
                                        <div style="display:flex; flex-direction:column; gap:12px;">
                                            <div>
                                                <label style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:4px;">Full Name *</label>
                                                <input type="text" class="input-p-name" data-id="${p.id}" value="${p.name || ''}" placeholder="Enter traveller's name" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:10px 12px; border-radius:6px; color:#fff; font-size:13px; height:40px; box-sizing:border-box;">
                                            </div>
                                            <div style="display:flex; gap:12px;">
                                                <div style="flex:1;">
                                                    <label style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:4px;">Age</label>
                                                    <input type="number" class="input-p-age" data-id="${p.id}" value="${p.age || ''}" placeholder="number" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:10px 12px; border-radius:6px; color:#fff; font-size:13px; height:40px; box-sizing:border-box;">
                                                </div>
                                                <div style="flex:1;">
                                                    <label style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:4px;">Gender</label>
                                                    <select class="select-p-gender" data-id="${p.id}" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:8px; border-radius:6px; color:#fff; font-size:13px; height:40px; box-sizing:border-box;">
                                                        <option value="Male" ${p.gender === "Male" ? "selected" : ""}>Male</option>
                                                        <option value="Female" ${p.gender === "Female" ? "selected" : ""}>Female</option>
                                                        <option value="Other" ${p.gender === "Other" ? "selected" : ""}>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }
                        }).join('')}
                    </div>

                    <!-- ADD TRIP MATE BUTTON CARD -->
                    <button type="button" id="btn-add-trip-mate" style="width:100%; background:rgba(255,255,255,0.015); border:1px dashed rgba(255,255,255,0.1); border-radius:12px; padding:15px; display:flex; align-items:center; gap:12px; text-align:left; cursor:pointer; outline:none; margin-bottom:20px; box-sizing:border-box; min-height:55px;">
                        <span style="font-size:18px; color:var(--accent-cyan); font-weight:bold;">+</span>
                        <div>
                            <strong style="font-size:13.5px; color:#fff; display:block;">ADD TRIP MATE</strong>
                            <span style="font-size:11px; color:var(--text-slate); display:block; margin-top:2px;">Add another traveller</span>
                        </div>
                    </button>

                    <!-- INFANTS -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:20px; box-sizing:border-box;">
                        <h4 style="font-size:13px; font-weight:800; color:#fff; text-transform:uppercase; margin:0 0 4px 0;">INFANTS</h4>
                        <span style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:12px;">Travelling with infants? Under 2 years</span>
                        
                        <div style="display:flex; justify-content:center; align-items:center; gap:20px; margin-bottom:4px;">
                            <button type="button" class="btn-counter-m" id="btn-infant-dec" style="width:36px; height:36px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:50%; color:#fff; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; outline:none;">−</button>
                            <strong style="font-size:16px; color:#fff; min-width:20px; text-align:center;">${activeBookingState.travellers.infants}</strong>
                            <button type="button" class="btn-counter-m" id="btn-infant-inc" style="width:36px; height:36px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:50%; color:#fff; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; outline:none;">+</button>
                        </div>
                    </div>

                    <!-- TOTAL TRAVELLERS INDICATOR -->
                    <div style="text-align:center; font-size:13.5px; font-weight:850; color:var(--accent-cyan); margin-bottom:10px;">
                        ${activeMatesCount} Traveller${activeMatesCount > 1 ? 's' : ''}
                    </div>
                </div>
            `;
        } else if (step === 2) {
            // STEP 2: Stay & Transport
            stepContentHtml += `
                <div class="booking-wizard-step-section">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">Configure Stay & Transport</h3>
                    <span style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:15px;">Configure accommodation styles and transfer options.</span>

                    <!-- What's Included -->
                    <div style="background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.04); padding:15px; border-radius:12px; margin-bottom:20px;">
                        <h4 style="font-size:12px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 10px 0;">Included Stay & Cabs</h4>
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            <div style="display:flex; justify-content:space-between; font-size:12.5px;">
                                <span style="color:var(--text-slate);">Stay Inclusions:</span>
                                <strong style="color:#22c55e;">Deluxe Double Room (Included)</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:12.5px;">
                                <span style="color:var(--text-slate);">Airport Pickup:</span>
                                <strong style="color:#22c55e;">Private sedan included</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:12.5px;">
                                <span style="color:var(--text-slate);">Sightseeing cab:</span>
                                <strong style="color:#22c55e;">Private local transfers</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Available Upgrades (Price shown before selection) -->
                    <div style="margin-bottom:24px;">
                        <h4 style="font-size:12px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 12px 0;">Available Upgrades</h4>
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            <!-- Sea View Room -->
                            <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border: 1px solid ${activeBookingState.stayUpgrades.includes("sea-view") ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:10px; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <strong style="font-size:13px; color:#fff;">Sea View Resort Upgrade</strong>
                                    <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Get premium ocean-facing villas</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹3,000</strong>
                                    <input type="checkbox" class="cb-upgrade-stay" value="sea-view" ${activeBookingState.stayUpgrades.includes("sea-view") ? "checked" : ""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                                </div>
                            </label>

                            <!-- Extra Bed -->
                            <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border: 1px solid ${activeBookingState.stayUpgrades.includes("extra-bed") ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:10px; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <strong style="font-size:13px; color:#fff;">Extra Bed Rollaway</strong>
                                    <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Extra cot for older children</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹1,200/night</strong>
                                    <input type="checkbox" class="cb-upgrade-stay" value="extra-bed" ${activeBookingState.stayUpgrades.includes("extra-bed") ? "checked" : ""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                                </div>
                            </label>

                            <!-- SUV Cab -->
                            <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border: 1px solid ${activeBookingState.transportUpgrades.includes("suv") ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:10px; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <strong style="font-size:13px; color:#fff;">Private SUV Upgrade (Innova)</strong>
                                    <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Replaces sedan transfers with spacious SUV</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹2,000</strong>
                                    <input type="checkbox" class="cb-upgrade-trans" value="suv" ${activeBookingState.transportUpgrades.includes("suv") ? "checked" : ""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                                </div>
                            </label>

                            <!-- VIP Airport lounge lounge -->
                            <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border: 1px solid ${activeBookingState.transportUpgrades.includes("pickup-vip") ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:10px; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <strong style="font-size:13px; color:#fff;">VIP Meet & Greet Lounge</strong>
                                    <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Fast-track airport terminal pickup lounge</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹1,500</strong>
                                    <input type="checkbox" class="cb-upgrade-trans" value="pickup-vip" ${activeBookingState.transportUpgrades.includes("pickup-vip") ? "checked" : ""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            `;
        } else if (step === 3) {
            // STEP 3: Meals customization system (Trip Preference Mode selection)
            stepContentHtml += `
                <div class="booking-wizard-step-section">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">Meal Customization</h3>
                    <span style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:15px;">Choose how you want to manage meals for your travellers.</span>

                    <!-- Mode Toggle Selection Cards -->
                    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:24px;">
                        <!-- Option 1: Same Throughout Trip -->
                        <div class="meal-mode-card" data-mode="same" style="padding:15px; background:rgba(255,255,255,0.02); border:1px solid ${activeBookingState.mealMode === 'same' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:12px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition: border-color 0.2s;">
                            <div style="padding-right:10px;">
                                <strong style="font-size:13.5px; color:#fff; display:block; margin-bottom:4px;">Option 1: Same Throughout Trip</strong>
                                <span style="font-size:11px; color:var(--text-slate); line-height:1.4; display:block;">We'll apply each traveller's preferred meal type wherever available.</span>
                            </div>
                            <span style="width:18px; height:18px; border-radius:50%; border:2px solid ${activeBookingState.mealMode === 'same' ? 'var(--accent-cyan)' : 'var(--text-slate)'}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                ${activeBookingState.mealMode === 'same' ? '<span style="width:8px; height:8px; border-radius:50%; background:var(--accent-cyan);"></span>' : ''}
                            </span>
                        </div>

                        <!-- Option 2: Customize Day-by-Day -->
                        <div class="meal-mode-card" data-mode="daybyday" style="padding:15px; background:rgba(255,255,255,0.02); border:1px solid ${activeBookingState.mealMode === 'daybyday' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:12px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition: border-color 0.2s;">
                            <div style="padding-right:10px;">
                                <strong style="font-size:13.5px; color:#fff; display:block; margin-bottom:4px;">Option 2: Customize Day-by-Day</strong>
                                <span style="font-size:11px; color:var(--text-slate); line-height:1.4; display:block;">Choose meals individually for each day and traveller.</span>
                            </div>
                            <span style="width:18px; height:18px; border-radius:50%; border:2px solid ${activeBookingState.mealMode === 'daybyday' ? 'var(--accent-cyan)' : 'var(--text-slate)'}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                ${activeBookingState.mealMode === 'daybyday' ? '<span style="width:8px; height:8px; border-radius:50%; background:var(--accent-cyan);"></span>' : ''}
                            </span>
                        </div>
                    </div>

                    <!-- Inner Customizer Panels based on active mode -->
                    ${activeBookingState.mealMode === "same" ? `
                        <div style="background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:12px; box-sizing:border-box;">
                            <h4 style="font-size:12px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 15px 0;">Configure Preferences</h4>
                            
                            <div style="display:flex; flex-direction:column; gap:16px;">
                                ${activeBookingState.passengerProfiles.map((p, pIdx) => {
                                    if (p.type === "Infant") {
                                        return `
                                            <!-- Separate shaded card container for Infant -->
                                            <div style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.04); padding:14px; border-radius:12px; margin-bottom:12px;">
                                                <strong style="font-size:13px; color:#fff;">${p.name || `Infant ${pIdx}`}</strong>
                                                <span style="font-size:10.5px; color:var(--text-slate); display:block; margin-top:2px;">Infant • ${p.age} yr</span>
                                                <span style="font-size:11.5px; color:var(--accent-cyan); display:block; margin-top:8px; font-style:italic;">No meal selection required (Infants are not charged for meals).</span>
                                            </div>
                                        `;
                                    }
                                    
                                    const selectedPref = activeBookingState.mealPreferences[p.id] || "Vegetarian";
                                    return `
                                        <!-- Separate shaded card container per traveller -->
                                        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:12px; margin-bottom:12px; box-sizing:border-box;">
                                            <strong style="font-size:13px; color:#fff;">${p.name || `Traveller ${pIdx+1}`}</strong>
                                            <span style="font-size:10.5px; color:var(--text-slate); display:block; margin-top:2px;">${p.type} • ${p.age} yrs</span>
                                            
                                            <!-- Chips selectors (Selected states matches Screen 3 but uses warm amber instead of red for Non-Veg) -->
                                            <div style="display:flex; gap:8px; margin-top:10px;">
                                                <button type="button" class="btn-meal-chip" data-pid="${p.id}" data-val="Vegetarian" style="flex:1; border:1px solid ${selectedPref === 'Vegetarian' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)'}; background:${selectedPref === 'Vegetarian' ? 'rgba(0,203,224,0.08)' : 'rgba(255,255,255,0.02)'}; color:${selectedPref === 'Vegetarian' ? 'var(--accent-cyan)' : '#fff'}; font-size:11.5px; font-weight:800; padding:8px 6px; border-radius:6px; cursor:pointer; outline:none; transition:all 0.2s;">Veg</button>
                                                
                                                <button type="button" class="btn-meal-chip" data-pid="${p.id}" data-val="Non-Veg" style="flex:1; border:1px solid ${selectedPref === 'Non-Veg' ? '#fbbf24' : 'rgba(255,255,255,0.08)'}; background:${selectedPref === 'Non-Veg' ? 'rgba(251,191,36,0.08)' : 'rgba(255,255,255,0.02)'}; color:${selectedPref === 'Non-Veg' ? '#fbbf24' : '#fff'}; font-size:11.5px; font-weight:800; padding:8px 6px; border-radius:6px; cursor:pointer; outline:none; transition:all 0.2s;">Non-Veg</button>
                                                
                                                <button type="button" class="btn-meal-chip" data-pid="${p.id}" data-val="Jain" style="flex:1; border:1px solid ${selectedPref === 'Jain' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)'}; background:${selectedPref === 'Jain' ? 'rgba(0,203,224,0.08)' : 'rgba(255,255,255,0.02)'}; color:${selectedPref === 'Jain' ? 'var(--accent-cyan)' : '#fff'}; font-size:11.5px; font-weight:800; padding:8px 6px; border-radius:6px; cursor:pointer; outline:none; transition:all 0.2s;">Jain</button>
                                            </div>
                                            
                                            ${selectedPref === 'Non-Veg' ? `
                                                <div style="background:rgba(251,191,36,0.03); border:1px solid rgba(251,191,36,0.15); padding:8px 10px; border-radius:6px; margin-top:8px; font-size:11px; color:#fbbf24;">
                                                    ⚠️ Upgrades: Day 1 Lunch (+₹150) & Day 1 Dinner (+₹250) will apply. Total Add-on: +₹400 per day.
                                                </div>
                                            ` : `
                                                <span style="font-size:11px; color:var(--text-slate); margin-top:6px; display:block;">Will apply vegetarian / default option wherever available.</span>
                                            `}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : `
                        <!-- Customize Day-by-Day Accordions list (Interactive Dark Blue Shades) -->
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            ${[1,2,3,4].map(d => {
                                const dayConfig = activeBookingState.dayWiseMeals[d] || { lunch: {}, dinner: {} };
                                return `
                                    <div class="day-customize-accordion" style="border: 1px solid rgba(0, 203, 224, 0.12); border-radius: 10px; overflow:hidden; background: rgba(7, 24, 46, 0.4); margin-bottom: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
                                        <div class="day-customize-header" style="padding:12px 14px; background:rgba(0, 203, 224, 0.04); display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition: background 0.2s;">
                                            <span style="font-size:13.5px; font-weight:800; color:#fff;">Day ${d} — ${d === 1 ? 'Arrival' : d === 2 ? 'Sightseeing' : d === 3 ? 'Leisure' : 'Departure'}</span>
                                            <span style="font-size:10px; color:var(--text-slate);">Edit ▼</span>
                                        </div>
                                        <div class="day-customize-body" style="display:none; padding:12px 14px; background:rgba(7,10,20,0.4); border-top:1px solid rgba(255,255,255,0.04);">
                                            
                                            <!-- Breakfast -->
                                            <div style="margin-bottom:15px; border-bottom:1px solid rgba(255,255,255,0.02); padding-bottom:10px;">
                                                <strong style="font-size:12px; color:var(--accent-cyan); display:block; margin-bottom:4px; text-transform:uppercase;">Breakfast</strong>
                                                ${d === 1 ? `
                                                    <span style="font-size:11.5px; color:var(--text-slate);">Vegetarian (Veg Only). Only vegetarian option is available for Breakfast on Day 1.</span>
                                                ` : d === 4 ? `
                                                    <span style="font-size:11.5px; color:var(--text-slate);">Vegetarian (Veg Only). Buffet Breakfast included.</span>
                                                ` : `
                                                    <span style="font-size:11.5px; color:var(--text-slate);">Buffet Breakfast included (Veg / Non-Veg options available).</span>
                                                `}
                                            </div>

                                            <!-- Lunch -->
                                            <div style="margin-bottom:15px; border-bottom:1px solid rgba(255,255,255,0.02); padding-bottom:10px;">
                                                <strong style="font-size:12px; color:var(--accent-cyan); display:block; margin-bottom:4px; text-transform:uppercase;">Lunch</strong>
                                                ${(d === 2 || d === 4) ? `
                                                    <span style="font-size:11.5px; color:var(--text-slate); font-style:italic;">Not Included in package.</span>
                                                ` : `
                                                    <!-- Dropdown selectors per passenger -->
                                                    <div style="display:flex; flex-direction:column; gap:8px;">
                                                        ${activeBookingState.passengerProfiles.map(p => {
                                                            if (p.type === "Infant") return '';
                                                            const val = (dayConfig.lunch || {})[p.id] || "Vegetarian";
                                                            return `
                                                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                                                    <span style="font-size:11.5px; color:var(--text-slate);">${p.name}:</span>
                                                                    <select class="sel-day-meal-choice" data-day="${d}" data-meal="lunch" data-pid="${p.id}" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:4px 8px; border-radius:4px; color:#fff; font-size:11px;">
                                                                        <option value="Vegetarian" ${val === 'Vegetarian' ? 'selected' : ''}>Vegetarian (Included)</option>
                                                                        <option value="Non-Vegetarian" ${val === 'Non-Vegetarian' ? 'selected' : ''}>Non-Vegetarian (+₹150)</option>
                                                                        <option value="Jain" ${val === 'Jain' ? 'selected' : ''}>Jain (Included)</option>
                                                                    </select>
                                                                </div>
                                                            `;
                                                        }).join('')}
                                                    </div>
                                                `}
                                            </div>

                                            <!-- Dinner -->
                                            <div>
                                                <strong style="font-size:12px; color:var(--accent-cyan); display:block; margin-bottom:4px; text-transform:uppercase;">Dinner</strong>
                                                ${d === 4 ? `
                                                    <span style="font-size:11.5px; color:var(--text-slate); font-style:italic;">Not Included (Departure day).</span>
                                                ` : `
                                                    <div style="display:flex; flex-direction:column; gap:8px;">
                                                        ${activeBookingState.passengerProfiles.map(p => {
                                                            if (p.type === "Infant") return '';
                                                            const val = (dayConfig.dinner || {})[p.id] || "Vegetarian";
                                                            return `
                                                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                                                    <span style="font-size:11.5px; color:var(--text-slate);">${p.name}:</span>
                                                                    <select class="sel-day-meal-choice" data-day="${d}" data-meal="dinner" data-pid="${p.id}" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:4px 8px; border-radius:4px; color:#fff; font-size:11px;">
                                                                        <option value="Vegetarian" ${val === 'Vegetarian' ? 'selected' : ''}>Vegetarian (Included)</option>
                                                                        <option value="Non-Vegetarian" ${val === 'Non-Vegetarian' ? 'selected' : ''}>Non-Vegetarian (+₹250)</option>
                                                                        <option value="Jain" ${val === 'Jain' ? 'selected' : ''}>Jain (Included)</option>
                                                                    </select>
                                                                </div>
                                                            `;
                                                        }).join('')}
                                                    </div>
                                                `}
                                            </div>
                                            
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </div>
            `;
        } else if (step === 4) {
            // STEP 4: Add-ons
            stepContentHtml += `
                <div class="booking-wizard-step-section">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">Enhance Your Trip</h3>
                    <span style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:15px;">Enhance your vacation package with extra excursions and gear.</span>

                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <!-- Scuba Diving -->
                        <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border:1px solid ${activeBookingState.addOns.includes("scuba") ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:10px; cursor:pointer;">
                            <div style="display:flex; flex-direction:column; padding-right:10px;">
                                <strong style="font-size:13px; color:#fff;">Guided Scuba Diving</strong>
                                <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Complete gear + underwater video package</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹2,500/person</strong>
                                <input type="checkbox" class="cb-addon-trip" value="scuba" ${activeBookingState.addOns.includes("scuba") ? "checked" : ""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                            </div>
                        </label>

                        <!-- Candlelight dinner -->
                        <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border:1px solid ${activeBookingState.addOns.includes("dinner") ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:10px; cursor:pointer;">
                            <div style="display:flex; flex-direction:column; padding-right:10px;">
                                <strong style="font-size:13px; color:#fff;">Candlelight Beach Dinner</strong>
                                <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">4-course dining configuration right on shoreline</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹3,000/couple</strong>
                                <input type="checkbox" class="cb-addon-trip" value="dinner" ${activeBookingState.addOns.includes("dinner") ? "checked" : ""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                            </div>
                        </label>

                        <!-- Photographer -->
                        <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border:1px solid ${activeBookingState.addOns.includes("photos") ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)'}; border-radius:10px; cursor:pointer;">
                            <div style="display:flex; flex-direction:column; padding-right:10px;">
                                <strong style="font-size:13px; color:#fff;">Professional Photoshoot</strong>
                                <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">2-hour local photography crew session</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹4,000</strong>
                                <input type="checkbox" class="cb-addon-trip" value="photos" ${activeBookingState.addOns.includes("photos") ? "checked" : ""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                            </div>
                        </label>
                    </div>
                </div>
            `;
        } else if (step === 5) {
            // STEP 5: Review & Book (Complete Summary + Edit paths)
            stepContentHtml += `
                <div class="booking-wizard-step-section" style="padding-bottom:120px;">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">Review & Confirm</h3>
                    <span style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:15px;">Review your selections and details before completing checkout.</span>

                    <!-- Package Summary -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:16px; position:relative;">
                        <h4 style="font-size:11px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 6px 0;">Package Details</h4>
                        <strong style="font-size:14px; color:#fff; display:block; margin-bottom:4px;">${pkg.title}</strong>
                        <span style="font-size:12px; color:var(--text-slate); display:block;">${pkg.duration} Days / ${pkg.duration - 1} Nights</span>
                        <span style="font-size:12px; color:var(--accent-cyan); display:block; margin-top:4px;">Travel Dates: ${activeBookingState.travelDate}</span>
                    </div>

                    <!-- Passengers Summary -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:16px; position:relative;">
                        <button type="button" class="btn-jump-step" data-step="1" style="position:absolute; top:12px; right:12px; background:none; border:none; color:var(--accent-cyan); font-size:11px; font-weight:800; cursor:pointer;">Edit ></button>
                        <h4 style="font-size:11px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 8px 0;">Travellers</h4>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            ${activeBookingState.passengerProfiles.map(p => `
                                <div style="font-size:12.5px; color:#fff; display:flex; justify-content:space-between;">
                                    <span>${p.name}</span>
                                    <span style="color:var(--text-slate);">${p.type} (${p.age} yrs)</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Accommodation & Transport Summary -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:16px; position:relative;">
                        <button type="button" class="btn-jump-step" data-step="2" style="position:absolute; top:12px; right:12px; background:none; border:none; color:var(--accent-cyan); font-size:11px; font-weight:800; cursor:pointer;">Edit ></button>
                        <h4 style="font-size:11px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 8px 0;">Stay & Transfers</h4>
                        <div style="font-size:12.5px; color:#fff; display:flex; flex-direction:column; gap:6px;">
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:var(--text-slate);">Stay Option:</span>
                                <span>${activeBookingState.stayUpgrades.includes("sea-view") ? 'Sea View Resort (+₹3,000)' : 'Deluxe Room (Included)'}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:var(--text-slate);">Airport Transfers:</span>
                                <span>${activeBookingState.transportUpgrades.includes("pickup-vip") ? 'VIP Pickup (+₹1,500)' : 'Sedan Cab (Included)'}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:var(--text-slate);">Vehicles Upgrade:</span>
                                <span>${activeBookingState.transportUpgrades.includes("suv") ? 'Private SUV Innova (+₹2,000)' : 'Sedan Car (Included)'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Meals Summary -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:16px; position:relative;">
                        <button type="button" class="btn-jump-step" data-step="3" style="position:absolute; top:12px; right:12px; background:none; border:none; color:var(--accent-cyan); font-size:11px; font-weight:800; cursor:pointer;">Edit ></button>
                        <h4 style="font-size:11px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 8px 0;">Meals Customization</h4>
                        <div style="display:flex; flex-direction:column; gap:6px; font-size:12.5px;">
                            ${activeBookingState.passengerProfiles.map(p => {
                                if (p.type === "Infant") return `
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:var(--text-slate);">${p.name}:</span>
                                        <span>No meal required</span>
                                    </div>
                                `;
                                const pref = activeBookingState.mealMode === 'same' 
                                    ? (activeBookingState.mealPreferences[p.id] || "Vegetarian") + " Throughout"
                                    : "Custom Day-by-Day preferences";
                                return `
                                    <div style="display:flex; justify-content:space-between; color:#fff;">
                                        <span style="color:var(--text-slate);">${p.name}:</span>
                                        <span>${pref}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Final Pricing transparent table details breakdown -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:15px; box-sizing:border-box; margin-bottom:24px;">
                        <h4 style="font-size:11.5px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 12px 0; border-bottom:1px solid rgba(255,255,255,0.04); padding-bottom:6px;">Final Price Summary</h4>
                        
                        <div style="display:flex; flex-direction:column; gap:8px; font-size:12.5px; color:var(--text-slate);">
                            <!-- Dynamic Traveller Summary Rows -->
                            ${activeBookingState.travellers.adults > 0 ? `
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>${activeBookingState.travellers.adults} Adult${activeBookingState.travellers.adults > 1 ? 's' : ''} (${pkg.priceStr} × ${activeBookingState.travellers.adults})</span>
                                    <span>₹${totals.adultTotal.toLocaleString()}</span>
                                </div>
                            ` : ''}
                            ${activeBookingState.travellers.children > 0 ? `
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>${activeBookingState.travellers.children} Child${activeBookingState.travellers.children > 1 ? 'ren' : ''} (₹${(totals.baseChildPrice).toLocaleString()} base × ${activeBookingState.travellers.children})</span>
                                    <span>₹${totals.childTotal.toLocaleString()}</span>
                                </div>
                            ` : ''}
                            ${activeBookingState.travellers.infants > 0 ? `
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>${activeBookingState.travellers.infants} Infant${activeBookingState.travellers.infants > 1 ? 's' : ''}</span>
                                    <span>₹0</span>
                                </div>
                            ` : ''}
                            
                            <!-- Customizations -->
                            ${totals.upgradesPrice > 0 ? `
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Stay & Vehicle Customizations</span>
                                    <span>+₹${totals.upgradesPrice.toLocaleString()}</span>
                                </div>
                            ` : ''}
                            
                            <!-- Meal add-ons -->
                            ${totals.mealsPrice > 0 ? `
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Meal Add-ons (Non-Veg selections)</span>
                                    <span>+₹${totals.mealsPrice.toLocaleString()}</span>
                                </div>
                            ` : ''}

                            <!-- Add-ons -->
                            ${totals.addonsPrice > 0 ? `
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Activities & Gear Upgrades</span>
                                    <span>+₹${totals.addonsPrice.toLocaleString()}</span>
                                </div>
                            ` : ''}

                            <!-- Discount -->
                            <div style="display:flex; justify-content:space-between; color:#4ade80;">
                                <span>Package Discount</span>
                                <span>-₹${totals.discount.toLocaleString()}</span>
                            </div>

                            <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:8px; margin-top:4px; display:flex; justify-content:space-between; font-size:13.5px; color:#fff;">
                                <span>Subtotal</span>
                                <span>₹${totals.subtotal.toLocaleString()}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>Taxes & Fees (GST 5%)</span>
                                <span>₹${totals.taxes.toLocaleString()}</span>
                            </div>
                            <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:8px; margin-top:4px; display:flex; justify-content:space-between; font-size:16.5px; font-weight:900; color:var(--accent-cyan);">
                                <span>Total Booking Amount</span>
                                <span>₹${totals.grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // 3. Render final header, wizard contents and bottom sticky CTA bar
        bookingView.innerHTML = `
            <!-- Header bar -->
            <div style="padding:16px 16px 12px 16px; background:rgba(7,10,20,0.95); display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.06); position:sticky; top:0; z-index:100;">
                <button type="button" id="btn-m-wizard-back" style="background:none; border:none; color:var(--text-slate); font-size:18px; cursor:pointer; outline:none; padding:0;">←</button>
                <div>
                    <h2 style="margin:0; font-size:15px; font-weight:850; color:#fff;">Complete Your Booking</h2>
                    <span style="font-size:10px; color:var(--text-slate); display:block; margin-top:1px;">Booking ID: ${activeBookingState.bookingId}</span>
                </div>
            </div>

            <!-- Scrollable step wizard layout content -->
            <div style="padding: 16px; box-sizing:border-box; width:100%;">
                ${stepperHtml}
                ${stepContentHtml}
            </div>

            <!-- Bottom Sticky CTAs bar (Price only visible on last step - Step 5 Review) -->
            <div class="mobile-details-sticky-bar" style="position:fixed; bottom:0; left:0; right:0; height:72px; background:rgba(7, 10, 20, 0.95); backdrop-filter:blur(15px); -webkit-backdrop-filter:blur(15px); border-top:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center; padding:12px 16px; z-index:10000; box-sizing:border-box;">
                ${step < 5 ? `
                    <div style="display:flex; flex-direction:column; justify-content:center;">
                        <span style="font-size:10px; color:var(--accent-cyan); font-weight:800; text-transform:uppercase; letter-spacing:0.5px;">
                            ${step === 1 ? 'Trip Configuration' : step === 2 ? 'Stay & Transfers' : step === 3 ? 'Dining Preferences' : 'Activities & Add-ons'}
                        </span>
                        <span style="font-size:11px; color:var(--text-slate); margin-top:2px;">
                            ${step === 1 ? 'Specify dates & travellers' : step === 2 ? 'Select stay & vehicle upgrades' : step === 3 ? 'Choose dining options' : 'Add excursions & gear'}
                        </span>
                    </div>
                ` : `
                    <div id="m-sticky-total-expand-btn" style="cursor:pointer; display:flex; flex-direction:column; justify-content:center;">
                        <span style="font-size:10px; color:var(--text-slate); display:block; text-transform:uppercase; font-weight:750;">Total Price</span>
                        <strong style="font-size:18px; font-weight:900; color:var(--accent-cyan); display:flex; align-items:center; gap:4px; transition: color 0.15s ease;" id="lbl-sticky-wizard-total">₹${totals.grandTotal.toLocaleString()}</strong>
                    </div>
                `}
                <button type="button" class="btn-m-book-now" id="btn-m-wizard-continue" style="background:var(--accent-cyan) !important; color:var(--bg-dark) !important; border:none; padding:11px 20px; font-size:13.5px; font-weight:850; border-radius:8px; cursor:pointer; outline:none; box-shadow:0 4px 12px rgba(0, 203, 224, 0.2); white-space:nowrap; transition:all 0.2s;">
                    ${step === 5 ? 'Confirm & Pay' : 'Continue →'}
                </button>
            </div>

            <!-- Price Breakdown Dropdown details Popup sheet -->
            <div id="price-breakdown-popup-sheet" style="display:none; position:fixed; bottom:72px; left:0; right:0; background:rgba(7, 10, 20, 0.98); border-top:1px solid rgba(255,255,255,0.1); padding:20px 16px; border-radius:16px 16px 0 0; z-index:9999; box-sizing:border-box; animation:slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:10px; margin-bottom:15px;">
                    <strong style="font-size:13px; color:#fff; text-transform:uppercase;">Price Breakdown</strong>
                    <button type="button" id="btn-close-breakdown-popup" style="background:none; border:none; color:var(--text-slate); font-size:12px; cursor:pointer;">Close ✕</button>
                </div>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:12px; color:var(--text-slate);">
                    <div style="display:flex; justify-content:space-between;">
                        <span>Adult Base Packages (${pkg.priceStr} × ${activeBookingState.travellers.adults})</span>
                        <span style="color:#fff;">₹${totals.adultTotal.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Child Base Packages (₹15,000 × ${activeBookingState.travellers.children})</span>
                        <span style="color:#fff;">₹${totals.childTotal.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Customizations Upgrades:</span>
                        <span style="color:#fff;">+₹${totals.upgradesPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Meal Customization Add-ons:</span>
                        <span style="color:#fff;">+₹${totals.mealsPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Activities Add-ons:</span>
                        <span style="color:#fff;">+₹${totals.addonsPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; color:#4ade80;">
                        <span>Package Discount:</span>
                        <span>-₹${totals.discount.toLocaleString()}</span>
                    </div>
                    <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:6px; display:flex; justify-content:space-between; color:#fff;">
                        <span>Taxes & GST (5%):</span>
                        <span>₹${totals.taxes.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;

        // 4. Bind Stepper wizard action triggers
        // Back Navigation
        const wizardBack = document.getElementById('btn-m-wizard-back');
        if (wizardBack) {
            wizardBack.onclick = () => {
                if (step > 1) {
                    activeBookingState.currentStep -= 1;
                    autoSaveDraft();
                    renderMobileBookingWizard();
                } else {
                    // Return back to details view page
                    if (window.innerWidth < 768) {
                        navigateTo('package-details', true);
                        renderMobilePackageDetails(pkg);
                    } else {
                        openPackageDetailsView(pkg);
                    }
                }
            };
        }

        // Continue Button / Confirm Payment click
        const wizardContinue = document.getElementById('btn-m-wizard-continue');
        if (wizardContinue) {
            wizardContinue.onclick = () => {
                if (step < 5) {
                    activeBookingState.currentStep += 1;
                    autoSaveDraft();
                    renderMobileBookingWizard();
                } else {
                    // Confirm & Pay: Complete booking and transition to actual payment overlay modal
                    completeWizardDraftPayment();
                }
            };
        }

        // Stepper jump links in step 5 Review page
        const jumpLinks = document.querySelectorAll('.btn-jump-step');
        jumpLinks.forEach(lnk => {
            lnk.onclick = () => {
                const targetStep = parseInt(lnk.dataset.step);
                activeBookingState.currentStep = targetStep;
                autoSaveDraft();
                renderMobileBookingWizard();
            };
        });

        // Price breakdown popup sheets toggles
        const expandBtn = document.getElementById('m-sticky-total-expand-btn');
        const popupSheet = document.getElementById('price-breakdown-popup-sheet');
        const closePopupBtn = document.getElementById('btn-close-breakdown-popup');
        
        if (expandBtn && popupSheet) {
            expandBtn.onclick = () => {
                popupSheet.style.display = 'block';
            };
        }
        if (closePopupBtn && popupSheet) {
            closePopupBtn.onclick = () => {
                popupSheet.style.display = 'none';
            };
        }

        // Step 1: travel date dropdown selects
        const dateSelect = document.getElementById('m-wizard-date-select');
        if (dateSelect) {
            dateSelect.onchange = () => {
                activeBookingState.travelDate = dateSelect.value;
                autoSaveDraft();
            };
        }

        // Step 1: counter button triggers
        const setupCounter = (decId, incId, type) => {
            const decBtn = document.getElementById(decId);
            const incBtn = document.getElementById(incId);
            if (decBtn && incBtn) {
                decBtn.onclick = () => {
                    const minLimit = type === 'adults' ? 1 : 0;
                    if (activeBookingState.travellers[type] > minLimit) {
                        activeBookingState.travellers[type] -= 1;
                        rebuildPassengerProfilesArray();
                    }
                };
                incBtn.onclick = () => {
                    if (activeBookingState.travellers[type] < 10) {
                        activeBookingState.travellers[type] += 1;
                        rebuildPassengerProfilesArray();
                    }
                };
            }
        };
        // Infants counters triggers
        const btnInfDec = document.getElementById('btn-infant-dec');
        const btnInfInc = document.getElementById('btn-infant-inc');
        if (btnInfDec && btnInfInc) {
            btnInfDec.onclick = () => {
                if (activeBookingState.travellers.infants > 0) {
                    activeBookingState.travellers.infants -= 1;
                    // Remove last Infant profile if any
                    const infIdx = activeBookingState.passengerProfiles.map(x => x.type).lastIndexOf("Infant");
                    if (infIdx !== -1) {
                        activeBookingState.passengerProfiles.splice(infIdx, 1);
                    }
                    autoSaveDraft();
                    renderMobileBookingWizard();
                }
            };
            btnInfInc.onclick = () => {
                if (activeBookingState.travellers.infants < 5) {
                    activeBookingState.travellers.infants += 1;
                    // Add new Infant profile
                    const newId = Math.max(...activeBookingState.passengerProfiles.map(x => x.id), 0) + 1;
                    activeBookingState.passengerProfiles.push({
                        id: newId,
                        type: "Infant",
                        name: "",
                        age: 1,
                        gender: "Female",
                        collapsed: false
                    });
                    autoSaveDraft();
                    renderMobileBookingWizard();
                }
            };
        }

        // Add Trip Mate button action
        const addMateBtn = document.getElementById('btn-add-trip-mate');
        if (addMateBtn) {
            addMateBtn.onclick = () => {
                const nextId = Math.max(...activeBookingState.passengerProfiles.map(x => x.id), 0) + 1;
                // Add new Adult profile by default, collapse others
                activeBookingState.passengerProfiles.forEach(p => p.collapsed = true);
                activeBookingState.passengerProfiles.push({
                    id: nextId,
                    type: "Adult",
                    name: "",
                    age: "",
                    gender: "Male",
                    collapsed: false
                });
                autoSaveDraft();
                renderMobileBookingWizard();
            };
        }

        // Delete Trip Mate action
        const deletePClass = document.querySelectorAll('.btn-delete-p-card');
        deletePClass.forEach(btn => {
            btn.onclick = () => {
                const id = parseInt(btn.dataset.id);
                activeBookingState.passengerProfiles = activeBookingState.passengerProfiles.filter(x => x.id !== id);
                autoSaveDraft();
                renderMobileBookingWizard();
            };
        });

        // Dynamic rebuild profiles list
        function rebuildPassengerProfilesArray() {
            const adults = activeBookingState.travellers.adults || 0;
            const children = activeBookingState.travellers.children || 0;
            const infants = activeBookingState.travellers.infants || 0;
            
            const newProfiles = [];
            let pId = 1;
            
            // Re-allocate adults
            for (let i = 0; i < adults; i++) {
                const existing = activeBookingState.passengerProfiles.find(p => p.type === 'Adult' && p.id === pId);
                newProfiles.push({
                    id: pId,
                    type: "Adult",
                    name: existing ? existing.name : "",
                    age: existing ? existing.age : 25,
                    gender: existing ? existing.gender : "Male",
                    collapsed: true
                });
                pId++;
            }
            // Re-allocate children
            for (let i = 0; i < children; i++) {
                const existing = activeBookingState.passengerProfiles.find(p => p.type === 'Child' && p.id === pId);
                newProfiles.push({
                    id: pId,
                    type: "Child",
                    name: existing ? existing.name : "",
                    age: existing ? existing.age : 8,
                    gender: existing ? existing.gender : "Male",
                    extraBed: existing ? existing.extraBed : "No",
                    collapsed: true
                });
                pId++;
            }
            // Re-allocate infants
            for (let i = 0; i < infants; i++) {
                const existing = activeBookingState.passengerProfiles.find(p => p.type === 'Infant' && p.id === pId);
                newProfiles.push({
                    id: pId,
                    type: "Infant",
                    name: existing ? existing.name : "",
                    age: existing ? existing.age : 1,
                    gender: existing ? existing.gender : "Female",
                    collapsed: true
                });
                pId++;
            }
            
            // Expand the first empty one by default if all are empty
            if (newProfiles.length > 0) {
                newProfiles[0].collapsed = false;
            }
            
            activeBookingState.passengerProfiles = newProfiles;
            autoSaveDraft();
            renderMobileBookingWizard();
        }

        // Bind expanded passenger form field saves and edit toggles
        const editCardBtns = document.querySelectorAll('.btn-edit-p-card');
        editCardBtns.forEach(btn => {
            btn.onclick = () => {
                const id = parseInt(btn.dataset.id);
                activeBookingState.passengerProfiles.forEach(p => {
                    p.collapsed = (p.id !== id);
                });
                renderMobileBookingWizard();
            };
        });

        const collapseCardBtns = document.querySelectorAll('.btn-collapse-p-card');
        collapseCardBtns.forEach(btn => {
            btn.onclick = () => {
                const id = parseInt(btn.dataset.id);
                const target = activeBookingState.passengerProfiles.find(p => p.id === id);
                if (target) {
                    target.collapsed = true;
                    // Trigger instant save of form values
                    savePassengerFieldsValue(id);
                    autoSaveDraft();
                    renderMobileBookingWizard();
                }
            };
        });

        // Input changes trigger saves
        const namesInputs = document.querySelectorAll('.input-p-name');
        namesInputs.forEach(inp => {
            inp.onchange = () => {
                const id = parseInt(inp.dataset.id);
                const p = activeBookingState.passengerProfiles.find(x => x.id === id);
                if (p) p.name = inp.value;
                autoSaveDraft();
            };
        });
        const agesInputs = document.querySelectorAll('.input-p-age');
        agesInputs.forEach(inp => {
            inp.onchange = () => {
                const id = parseInt(inp.dataset.id);
                const p = activeBookingState.passengerProfiles.find(x => x.id === id);
                if (p) p.age = parseInt(inp.value) || 0;
                autoSaveDraft();
            };
        });
        const genderSelects = document.querySelectorAll('.select-p-gender');
        genderSelects.forEach(sel => {
            sel.onchange = () => {
                const id = parseInt(sel.dataset.id);
                const p = activeBookingState.passengerProfiles.find(x => x.id === id);
                if (p) p.gender = sel.value;
                autoSaveDraft();
            };
        });
        const bedSelects = document.querySelectorAll('.select-p-extrabed');
        bedSelects.forEach(sel => {
            sel.onchange = () => {
                const id = parseInt(sel.dataset.id);
                const p = activeBookingState.passengerProfiles.find(x => x.id === id);
                if (p) p.extraBed = sel.value;
                if (p && sel.value === "Yes") {
                    if (!activeBookingState.stayUpgrades.includes("extra-bed")) {
                        activeBookingState.stayUpgrades.push("extra-bed");
                    }
                }
                autoSaveDraft();
            };
        });

        function savePassengerFieldsValue(id) {
            const cardElement = document.querySelector(`.input-p-name[data-id="${id}"]`);
            if (cardElement) {
                const p = activeBookingState.passengerProfiles.find(x => x.id === id);
                if (p) {
                    const nameVal = cardElement.value;
                    const ageVal = parseInt(document.querySelector(`.input-p-age[data-id="${id}"]`).value) || 0;
                    const genderVal = document.querySelector(`.select-p-gender[data-id="${id}"]`).value;
                    
                    p.name = nameVal;
                    p.age = ageVal;
                    p.gender = genderVal;
                }
            }
        }

        // Step 2 Upgrades checkboxes clicks
        const cbStayUpgrades = document.querySelectorAll('.cb-upgrade-stay');
        cbStayUpgrades.forEach(cb => {
            cb.onchange = () => {
                const val = cb.value;
                if (cb.checked) {
                    if (!activeBookingState.stayUpgrades.includes(val)) activeBookingState.stayUpgrades.push(val);
                } else {
                    activeBookingState.stayUpgrades = activeBookingState.stayUpgrades.filter(x => x !== val);
                }
                animateStickyTotalChange();
                autoSaveDraft();
            };
        });
        const cbTransUpgrades = document.querySelectorAll('.cb-upgrade-trans');
        cbTransUpgrades.forEach(cb => {
            cb.onchange = () => {
                const val = cb.value;
                if (cb.checked) {
                    if (!activeBookingState.transportUpgrades.includes(val)) activeBookingState.transportUpgrades.push(val);
                } else {
                    activeBookingState.transportUpgrades = activeBookingState.transportUpgrades.filter(x => x !== val);
                }
                animateStickyTotalChange();
                autoSaveDraft();
            };
        });

        // Step 3: Meal modes cards toggles
        const mealModeCards = document.querySelectorAll('.meal-mode-card');
        mealModeCards.forEach(c => {
            c.onclick = () => {
                const mode = c.dataset.mode;
                activeBookingState.mealMode = mode;
                autoSaveDraft();
                renderMobileBookingWizard();
            };
        });

        // Meal preference chips selects (Option 1)
        const btnMealChips = document.querySelectorAll('.btn-meal-chip');
        btnMealChips.forEach(btn => {
            btn.onclick = () => {
                const pid = parseInt(btn.dataset.pid);
                const val = btn.dataset.val;
                
                activeBookingState.mealPreferences[pid] = val;
                
                // Show brief total bounce and update totals
                animateStickyTotalChange();
                autoSaveDraft();
                renderMobileBookingWizard();
            };
        });

        // Customize Day-by-Day Day accordion toggles
        const dayAccordions = document.querySelectorAll('.day-customize-accordion');
        dayAccordions.forEach(acc => {
            const header = acc.querySelector('.day-customize-header');
            const body = acc.querySelector('.day-customize-body');
            if (header && body) {
                header.onclick = () => {
                    const isOpen = body.style.display === 'block';
                    // Close others and remove active styling
                    dayAccordions.forEach(a => {
                        a.querySelector('.day-customize-body').style.display = 'none';
                        a.classList.remove('active-day-acc');
                    });
                    if (!isOpen) {
                        body.style.display = 'block';
                        acc.classList.add('active-day-acc');
                    }
                };
            }
        });

        // Day-wise choice dropdown selects (Option 2)
        const selMealChoices = document.querySelectorAll('.sel-day-meal-choice');
        selMealChoices.forEach(sel => {
            sel.onchange = () => {
                const dayNum = parseInt(sel.dataset.day);
                const mealType = sel.dataset.type || sel.dataset.meal; // lunch / dinner
                const pid = parseInt(sel.dataset.pid);
                
                if (!activeBookingState.dayWiseMeals[dayNum]) {
                    activeBookingState.dayWiseMeals[dayNum] = { lunch: {}, dinner: {} };
                }
                if (!activeBookingState.dayWiseMeals[dayNum][mealType]) {
                    activeBookingState.dayWiseMeals[dayNum][mealType] = {};
                }
                
                activeBookingState.dayWiseMeals[dayNum][mealType][pid] = sel.value;
                
                animateStickyTotalChange();
                autoSaveDraft();
            };
        });

        // Step 4: Add-on checkboxes clicks
        const cbAddons = document.querySelectorAll('.cb-addon-trip');
        cbAddons.forEach(cb => {
            cb.onchange = () => {
                const val = cb.value;
                if (cb.checked) {
                    if (!activeBookingState.addOns.includes(val)) activeBookingState.addOns.push(val);
                } else {
                    activeBookingState.addOns = activeBookingState.addOns.filter(x => x !== val);
                }
                animateStickyTotalChange();
                autoSaveDraft();
            };
        });

        // Animate total text updates smoothly
        function animateStickyTotalChange() {
            const labelTotal = document.getElementById('lbl-sticky-wizard-total');
            if (labelTotal) {
                const updatedTotals = calculateCheckoutTotals();
                labelTotal.style.color = '#ef4444'; // warm warning/change color
                labelTotal.classList.add('pop-bounce');
                setTimeout(() => {
                    labelTotal.innerText = "₹" + updatedTotals.grandTotal.toLocaleString();
                    labelTotal.style.color = 'var(--accent-cyan)';
                    labelTotal.classList.remove('pop-bounce');
                }, 200);
            }
        }
    };

    // Confirm Payment draft submittal wrapper
    const completeWizardDraftPayment = () => {
        if (!activeBookingState) return;
        const totals = calculateCheckoutTotals();
        
        // Mark draft state booking status to confirmed on payment trigger
        const bookingsList = JSON.parse(localStorage.getItem('beacon_bookings')) || [];
        const targetIdx = bookingsList.findIndex(b => b.id === activeBookingState.bookingId);
        
        if (targetIdx !== -1) {
            // Update draft status to Active / Payment verification pending
            bookingsList[targetIdx].status = "🟡 PAYMENT VERIFICATION PENDING";
            bookingsList[targetIdx].progress = 100;
            bookingsList[targetIdx].progressDesc = "Payment details submitted for verification";
            
            // Save state updates
            bookingsList[targetIdx].state.status = "🟡 PAYMENT VERIFICATION PENDING";
        }
        localStorage.setItem('beacon_bookings', JSON.stringify(bookingsList));
        
        // Refresh Bookings tab rendering
        renderBookingsPage();

        // Redirect passenger to the actual payment modal overlay
        const upiId = 'wanderworld@upi';
        const plannerName = 'WanderWorld Travels';
        const finalAmt = "₹" + totals.grandTotal.toLocaleString();
        
        const modalPayable = document.getElementById('checkout-payable-amount');
        const modalTitle = document.getElementById('checkout-package-title');
        const modalBookId = document.getElementById('checkout-booking-id');
        const modalUpi = document.getElementById('checkout-upi-display');
        const modalNote = document.getElementById('checkout-note-display');
        const qrImage = document.getElementById('checkout-qr-code');

        if (modalPayable) modalPayable.innerText = finalAmt;
        if (modalTitle) modalTitle.innerText = activeBookingState.pkg.title;
        if (modalBookId) modalBookId.innerText = activeBookingState.bookingId;
        if (modalUpi) modalUpi.innerText = upiId;
        if (modalNote) modalNote.innerText = activeBookingState.bookingId;
        if (qrImage) {
            const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(plannerName)}&am=${totals.grandTotal}&tn=${activeBookingState.bookingId}`;
            qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiString)}`;
        }

        // Show payment check modal
        const checkoutModal = document.getElementById('checkout-payment-modal');
        if (checkoutModal) checkoutModal.style.display = 'flex';
        
        // Exit booking customization wizard SPA view
        navigateTo('bookings', true);
    };



    // ========================================================
    // BEACON — E-RECEIPT SYSTEM & GENERATION ENGINE
    // ========================================================

    

    // Simulate Planner verifying payment details and confirming booking
    const approveBookingPaymentSimulation = (bookingId) => {
        const bookingsList = JSON.parse(localStorage.getItem('beacon_bookings')) || [];
        const bk = bookingsList.find(b => b.id === bookingId);
        if (bk) {
            bk.status = "Confirmed";
            ensureReceiptSnapshot(bk);
            localStorage.setItem('beacon_bookings', JSON.stringify(bookingsList));
            
            showToast("🎉 Payment verified! Booking Confirmed & Receipt generated.");
            
            // Re-render dashboard
            renderBookingsPage();
        }
    };

    // Render Clean Fullscreen Light-Mode Receipt Viewer
    const renderReceiptViewer = (bookingId) => {
        const bookingsList = JSON.parse(localStorage.getItem('beacon_bookings')) || [];
        const bk = bookingsList.find(b => b.id === bookingId);
        if (!bk || !bk.receiptSnapshot) {
            showToast("⚠️ Receipt snapshot details not available.");
            return;
        }

        const rc = bk.receiptSnapshot;
        const pl = rc.planner;
        const pr = rc.pricing;

        const viewerContainer = document.getElementById('view-receipt-viewer');
        if (!viewerContainer) return;

        // Load HTML template
        viewerContainer.innerHTML = `
            <!-- Top Controls Toolbar (Desktop/Mobile centered) -->
            <div style="background: #0f172a; color: #fff; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 10000; box-sizing: border-box;">
                <button type="button" id="btn-receipt-back" style="background: none; border: none; color: #94a3b8; font-size: 16px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 700; outline: none;">
                    ← Back
                </button>
                <strong style="font-size: 14.5px; font-weight: 850; letter-spacing: 0.5px;">E-Receipt</strong>
                <div style="display: flex; gap: 8px;">
                    <button type="button" id="btn-receipt-download" style="background: var(--accent-cyan); color: var(--bg-dark); border: none; border-radius: 4px; padding: 6px 12px; font-size: 12px; font-weight: 800; cursor: pointer; outline: none;">
                        Download PDF
                    </button>
                    <button type="button" id="btn-receipt-share" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; border-radius: 4px; padding: 6px 12px; font-size: 12px; font-weight: 750; cursor: pointer; outline: none;">
                        Share
                    </button>
                </div>
            </div>

            <!-- Receipt Document Frame Centered (Light Mode/Print design layout) -->
            <div style="padding: 24px 16px; display: flex; justify-content: center; box-sizing: border-box; background: #f8fafc; min-height: calc(100vh - 50px); overflow-y: auto;">
                <div id="receipt-invoice-document" style="background: #ffffff; color: #1e293b; border: 1px solid #e2e8f0; width: 100%; max-width: 680px; padding: 32px 24px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif;">
                    
                    <!-- 1. Header (Planner Company info) -->
                    <div style="text-align: center; margin-bottom: 24px;">
                        ${pl.logo ? `<img src="${pl.logo}" alt="Planner Logo" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1px solid #cbd5e1; margin-bottom: 10px;">` : ''}
                        <h1 style="font-size: 20px; font-weight: 900; margin: 0; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">${pl.name}</h1>
                        <span style="font-size: 11px; color: #64748b; font-style: italic; display: block; margin-top: 3px;">Creating journeys worth remembering</span>
                        
                        <div style="font-size: 11.5px; color: #475569; margin-top: 10px; line-height: 1.5;">
                            <span>${pl.address}</span><br>
                            <span>Phone: ${pl.phone} | Email: ${pl.email}</span>
                            ${pl.gstRegistered ? `<br><strong style="color: #0f172a; display:inline-block; margin-top:4px;">GSTIN: ${pl.gstin}</strong>` : ''}
                        </div>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">

                    <!-- 2. Document Title & Basic Info -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px; margin-bottom: 24px;">
                        <div>
                            <h2 style="font-size: 15px; font-weight: 900; color: #0f172a; text-transform: uppercase; margin: 0 0 6px 0;">
                                ${pl.gstRegistered ? 'TAX INVOICE / RECEIPT' : 'PAYMENT RECEIPT'}
                            </h2>
                            <div style="font-size: 11.5px; color: #475569; line-height: 1.45;">
                                <span>Receipt No: <strong>${rc.receiptNo}</strong></span><br>
                                <span>Booking ID: <strong>${rc.bookingId}</strong></span>
                            </div>
                        </div>
                        <div style="text-align: right; font-size: 11.5px; color: #475569; line-height: 1.45;">
                            <span>Payment Status: <strong style="color:#22c55e;">${rc.paymentStatus}</strong></span><br>
                            <span>Payment Date: ${rc.paymentDate}</span><br>
                            <span>Booking Date: ${rc.bookingDate}</span>
                        </div>
                    </div>

                    <!-- 3. Customer & Trip Details Row -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #f1f5f9;">
                        <div>
                            <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Billed / Booked For</h4>
                            <div style="font-size: 12px; color: #1e293b; line-height: 1.45;">
                                <strong style="color: #0f172a;">${rc.customer.name}</strong><br>
                                <span>Phone: ${rc.customer.phone}</span><br>
                                <span>Email: ${rc.customer.email}</span>
                            </div>
                        </div>
                        <div>
                            <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Trip Details</h4>
                            <div style="font-size: 12px; color: #1e293b; line-height: 1.45;">
                                <strong style="color: #0f172a;">${rc.trip.packageTitle}</strong><br>
                                <span>Destination: ${rc.trip.destination}</span><br>
                                <span>Dates: ${rc.trip.dates}</span><br>
                                <span>Duration: ${rc.trip.duration}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Travellers List -->
                    <div style="margin-bottom: 24px;">
                        <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Travellers</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">
                            ${rc.travellers.map((t, idx) => `
                                <div style="font-size: 12px; color: #1e293b;">
                                    <strong>${idx + 1}. ${t.name}</strong> (${t.type})
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 5. Customization Config Summary -->
                    <div style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; box-sizing:border-box;">
                        <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Booking Customization Snapshot</h4>
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px; color: #475569;">
                            <div style="display:flex; justify-content:space-between;">
                                <span>Stay Room Class:</span>
                                <strong style="color:#0f172a;">${rc.customizations.stay}</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>Vehicle Transport:</span>
                                <strong style="color:#0f172a;">${rc.customizations.transport}</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; flex-direction:column; gap:4px; border-top:1px dashed #e2e8f0; padding-top:6px;">
                                <span>Meal Preferences:</span>
                                <div style="display:flex; flex-direction:column; gap:2px; padding-left:10px; margin-top:2px;">
                                    ${rc.customizations.meals.map(m => `<span>• ${m.name}: <strong>${m.pref}</strong></span>`).join('')}
                                </div>
                            </div>
                            ${rc.customizations.addons.length > 0 ? `
                                <div style="display:flex; justify-content:space-between; border-top:1px dashed #e2e8f0; padding-top:6px;">
                                    <span>Selected Add-ons:</span>
                                    <strong style="color:#0f172a;">${rc.customizations.addons.join(', ')}</strong>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- 6. Billing Breakdown Invoice Table -->
                    <div style="margin-bottom: 24px;">
                        <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Price Breakdown</h4>
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
                            <thead>
                                <tr style="border-bottom: 2px solid #e2e8f0; color: #0f172a; font-weight: 900;">
                                    <th style="padding: 8px 4px; text-transform:uppercase;">Description</th>
                                    <th style="padding: 8px 4px; text-align: right; text-transform:uppercase;">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#475569;">Package Base Price (Travellers)</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#0f172a;">₹${pr.basePrice.toLocaleString()}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#475569;">Stay Upgrade Class</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#0f172a;">₹${pr.upgradesPrice.toLocaleString()}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#475569;">Additional Meal Charges (Non-Veg)</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#0f172a;">₹${pr.mealsPrice.toLocaleString()}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#475569;">Activities & Guided Excursions Add-ons</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#0f172a;">₹${pr.addonsPrice.toLocaleString()}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#22c55e;">Package Booking Discount</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#22c55e;">−₹${pr.discount.toLocaleString()}</td>
                                </tr>
                                
                                <!-- Subtotal row -->
                                <tr style="border-top: 1px solid #e2e8f0;">
                                    <td style="padding: 10px 4px 6px 4px; font-weight: 800; color:#0f172a;">Subtotal</td>
                                    <td style="padding: 10px 4px 6px 4px; text-align: right; font-weight: 800; color:#0f172a;">₹${pr.subtotal.toLocaleString()}</td>
                                </tr>

                                <!-- Taxes / GST if registered -->
                                ${pl.gstRegistered ? `
                                    <tr style="border-bottom: 1px solid #e2e8f0;">
                                        <td style="padding: 4px 4px 8px 4px; color:#475569;">GST Tax Breakup (CGST 2.5% + SGST 2.5%)</td>
                                        <td style="padding: 4px 4px 8px 4px; text-align: right; color:#0f172a;">₹${pr.taxes.toLocaleString()}</td>
                                    </tr>
                                ` : ''}

                                <!-- Total Paid -->
                                <tr style="border-top: 2px solid #0f172a; font-size: 14.5px; font-weight: 900;">
                                    <td style="padding: 12px 4px; color: #0f172a;">TOTAL PAID</td>
                                    <td style="padding: 12px 4px; text-align: right; color: var(--accent-cyan);">₹${pr.grandTotal.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- 7. Payment Verification details -->
                    <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 24px; font-size: 11.5px; color: #475569; line-height: 1.5; box-sizing:border-box;">
                        <h4 style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 6px 0; letter-spacing: 0.5px;">Transaction Reference</h4>
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <span>UPI Reference ID / UTR:</span>
                            <strong style="color:#0f172a;">${rc.utrId}</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <span>Verification Status:</span>
                            <strong style="color:#22c55e;">${rc.verification}</strong>
                        </div>
                        <span style="font-size:10px; color:#64748b; display:block; margin-top:6px; font-style:italic;">
                            "This receipt confirms payment recorded against the above Beacon booking. Package services are provided by the travel partner identified on this receipt."
                        </span>
                    </div>

                    <!-- 8. Planner contacts -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; margin-bottom: 30px; font-size: 11px; color:#64748b; line-height: 1.45;">
                        <strong style="color:#0f172a; text-transform:uppercase; font-size:10px; display:block; margin-bottom:4px;">Need help with your trip?</strong>
                        <span>Travel Partner: <strong>${pl.name}</strong></span><br>
                        <span>Support Contact: ${pl.phone} | ${pl.email}</span>
                    </div>

                    <!-- 9. Beacon platform footer -->
                    <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; text-align: center;">
                        <strong style="font-size: 14px; color: #0f172a; letter-spacing: 0.5px; display: block; text-transform: uppercase;">Beacon</strong>
                        <span style="font-size: 9px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-top: 2px;">Life Beyond Routine</span>
                        <span style="font-size: 9px; color: #94a3b8; display: block; margin-top: 1px;">Book • Explore • Experience</span>
                        <span style="font-size: 9.5px; color: #94a3b8; display: block; margin-top: 10px; font-style: italic;">Booked through Beacon.</span>
                    </div>

                </div>
            </div>
        `;

        navigateTo('receipt-viewer');

        // Bind back button
        const backBtn = document.getElementById('btn-receipt-back');
        if (backBtn) {
            backBtn.onclick = () => {
                navigateTo('bookings', true);
            };
        }

        // Bind download PDF button
        const dlBtn = document.getElementById('btn-receipt-download');
        if (dlBtn) {
            dlBtn.onclick = () => {
                downloadReceiptPDF(bookingId);
            };
        }

        // Bind share button
        const shBtn = document.getElementById('btn-receipt-share');
        if (shBtn) {
            shBtn.onclick = () => {
                shareReceiptDocument(rc);
            };
        }
    };

    // Load html2pdf dynamically on-demand and trigger download PDF
    const downloadReceiptPDF = (bookingId) => {
        const docElem = document.getElementById('receipt-invoice-document');
        if (!docElem) {
            // If viewer is not open, open it first
            renderReceiptViewer(bookingId);
            setTimeout(() => downloadReceiptPDF(bookingId), 100);
            return;
        }

        showToast("Generating PDF receipt, please wait...");

        // Load html2pdf bundle CDN dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
            const opt = {
                margin:       0.3,
                filename:     `Beacon_Receipt_${bookingId}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            window.html2pdf().from(docElem).set(opt).save().then(() => {
                showToast("✅ PDF Receipt downloaded successfully.");
            });
        };
        document.head.appendChild(script);
    };

    // Share Receipt action
    const shareReceiptDocument = (rc) => {
        if (navigator.share) {
            navigator.share({
                title: `Beacon Travel Receipt - ${rc.bookingId}`,
                text: `E-Receipt for booking ${rc.bookingId} (${rc.trip.packageTitle}). Billed to ${rc.customer.name}.`,
                url: window.location.href
            }).then(() => {
                showToast("✅ Shared receipt successfully.");
            }).catch((err) => {
                console.log("Sharing failed:", err);
            });
        } else {
            // Fallback: Copy link
            navigator.clipboard.writeText(window.location.href);
            showToast("📋 Link copied to clipboard to share.");
        }
    };

    // ----------------------------------------------------
    // ENQUIRIES REAL-TIME MESSAGING & NOTIFICATION DOT SIMULATOR
    // ----------------------------------------------------
    const enquiriesDot = document.querySelector('.enquiries-unread-dot');
    
    // Make these globally accessible or bindable
    window.clearEnquiryNotifications = () => {
        if (enquiriesDot) enquiriesDot.style.display = 'none';
        localStorage.setItem('beacon_unread_enquiry', 'false');
    };

    const showEnquiriesNotificationDot = () => {
        if (enquiriesDot) enquiriesDot.style.display = 'block';
        localStorage.setItem('beacon_unread_enquiry', 'true');
    };

    const simulatePlannerEnquiryMessage = () => {
        if (localStorage.getItem('beacon_enquiry_simulated') === 'true') return;

        const thread = document.querySelector('#enquiry-ws-1 .message-thread');
        if (!thread) return;

        const msg = document.createElement('div');
        msg.className = 'msg-bubble planner unread-msg';
        msg.style.borderLeft = '3px solid var(--accent-cyan)';
        msg.innerHTML = `
            <div class="msg-sender">Aarav Mehta</div>
            <p>Hi Aditya! I noticed you saved the Goa package as well. Would you like me to compare Spiti and Goa pricing options for you?</p>
            <span class="msg-time">Just now</span>
        `;
        thread.appendChild(msg);
        thread.scrollTop = thread.scrollHeight;

        showEnquiriesNotificationDot();
        showToast("📩 Aarav Mehta (Planner) sent a new message in Enquiries.");
        localStorage.setItem('beacon_enquiry_simulated', 'true');
    };

    const initEnquiriesUnreadStatus = () => {
        const isUnread = localStorage.getItem('beacon_unread_enquiry') === 'true';
        const isSimulated = localStorage.getItem('beacon_enquiry_simulated') === 'true';

        if (isUnread) {
            if (enquiriesDot) enquiriesDot.style.display = 'block';
            if (isSimulated) {
                const thread = document.querySelector('#enquiry-ws-1 .message-thread');
                if (thread && !thread.querySelector('.unread-msg')) {
                    const msg = document.createElement('div');
                    msg.className = 'msg-bubble planner unread-msg';
                    msg.style.borderLeft = '3px solid var(--accent-cyan)';
                    msg.innerHTML = `
                        <div class="msg-sender">Aarav Mehta</div>
                        <p>Hi Aditya! I noticed you saved the Goa package as well. Would you like me to compare Spiti and Goa pricing options for you?</p>
                        <span class="msg-time">Just now</span>
                    `;
                    thread.appendChild(msg);
                    thread.scrollTop = thread.scrollHeight;
                }
            }
        } else {
            setTimeout(simulatePlannerEnquiryMessage, 6000);
        }
    };

    const setupEnquiryChatComposer = () => {
        const workspace = document.getElementById('enquiry-ws-1');
        if (!workspace) return;

        const input = workspace.querySelector('.message-composer input');
        const sendBtn = workspace.querySelector('.message-composer button');
        const thread = workspace.querySelector('.message-thread');

        const sendReply = () => {
            const val = input.value.trim();
            if (!val) return;

            const userMsg = document.createElement('div');
            userMsg.className = 'msg-bubble user';
            userMsg.innerHTML = `
                <div class="msg-sender">You</div>
                <p>${val}</p>
                <span class="msg-time">Just now</span>
            `;
            thread.appendChild(userMsg);
            input.value = '';
            thread.scrollTop = thread.scrollHeight;

            setTimeout(() => {
                const autoResponse = document.createElement('div');
                autoResponse.className = 'msg-bubble planner';
                autoResponse.innerHTML = `
                    <div class="msg-sender">Aarav Mehta</div>
                    <p>Got it! I will update the itinerary details accordingly and get back to you shortly.</p>
                    <span class="msg-time">Just now</span>
                `;
                thread.appendChild(autoResponse);
                thread.scrollTop = thread.scrollHeight;
                showToast("📩 Aarav Mehta (Planner) replied to your message.");
            }, 2000);
        };

        if (sendBtn && input) {
            sendBtn.onclick = sendReply;
            input.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    sendReply();
                }
            };
        }
    };

    // Run Enquiries setup
    initEnquiriesUnreadStatus();
    setupEnquiryChatComposer();

    // ----------------------------------------------------
    // Traveller Operations & Change Request Workflows
    // ----------------------------------------------------
    function initTravellerOperationsExperience() {
        const tripUpdateCard = document.getElementById('trip-update-card');
        const btnAccept = document.getElementById('accept-trip-update');
        const btnDecline = document.getElementById('decline-trip-update');

        if (btnAccept) {
            btnAccept.addEventListener('click', () => {
                showToast("✅ Trip Update Accepted! Your booking details have been auto-updated to Himachal Expedition.");
                if (tripUpdateCard) {
                    tripUpdateCard.style.transition = 'all 0.4s ease';
                    tripUpdateCard.style.opacity = '0';
                    setTimeout(() => {
                        tripUpdateCard.style.display = 'none';
                    }, 400);
                }
                const activeBookingTitle = document.querySelector('.booking-detailed-card h3');
                if (activeBookingTitle) activeBookingTitle.textContent = "Himachal Expedition (Standard)";
                
                const previewTitle = document.querySelector('.booking-preview-card .preview-card-title');
                if (previewTitle) previewTitle.textContent = "Himachal Expedition (Standard)";
            });
        }

        if (btnDecline) {
            btnDecline.addEventListener('click', () => {
                showToast("❌ Trip Update Declined. The planner will contact you shortly.");
                if (tripUpdateCard) {
                    tripUpdateCard.style.transition = 'all 0.4s ease';
                    tripUpdateCard.style.opacity = '0';
                    setTimeout(() => {
                        tripUpdateCard.style.display = 'none';
                    }, 400);
                }
            });
        }

        const modal = document.getElementById('traveller-package-change-modal');
        const requestBtn = document.getElementById('request-change-pkg-btn');
        const closeBtn = document.getElementById('close-change-pkg-modal');
        const cancelBtn = document.getElementById('btn-cancel-pkg-change');
        const submitBtn = document.getElementById('btn-submit-pkg-change');
        
        let selectedDifference = 0;

        window.selectPackageChangeOpt = function(el, diff) {
            const options = document.querySelectorAll('.pkg-change-opt');
            options.forEach(opt => {
                opt.style.background = 'rgba(255,255,255,0.01)';
                opt.style.borderColor = 'rgba(255,255,255,0.08)';
            });
            el.style.background = 'rgba(0, 212, 255, 0.05)';
            el.style.borderColor = 'var(--accent-cyan)';
            selectedDifference = diff;
        };

        if (requestBtn && modal) {
            requestBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
            });
        }

        const closeModal = () => {
            if (modal) modal.style.display = 'none';
        };

        if (closeBtn) closeBtn.onclick = closeModal;
        if (cancelBtn) cancelBtn.onclick = closeModal;

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                showToast(`📨 Package Change Request submitted successfully! Price Difference: ${selectedDifference >= 0 ? '+' : ''}₹${selectedDifference}.`);
                closeModal();
            });
        }
    }

    // ----------------------------------------------------
    // 🛟 CUSTOMER SUPPORT CENTER ROUTING & INTERACTIVE LOGIC
    // ----------------------------------------------------
    function initCustomerSupportCenter() {
        const supportBtn = document.getElementById('btn-open-support-center');
        const backSupportBtn = document.getElementById('btn-back-from-support');
        const emergencyBtn = document.getElementById('btn-open-emergency-support');
        const closeEmergencyBtn = document.getElementById('close-support-emergency-btn');
        const emergencyModal = document.getElementById('support-emergency-modal');

        const triggerWizardBtn = document.getElementById('btn-trigger-raise-ticket');
        const chatOptionBtn = document.getElementById('btn-support-chat-option');
        const closeWizardBtn = document.getElementById('close-support-wizard-btn');
        const wizardModal = document.getElementById('support-ticket-wizard-modal');
        const wizardCategorySelect = document.getElementById('wizard-category');

        const tabMyTickets = document.getElementById('tab-my-tickets');

        // Navigation
        if (supportBtn) {
            supportBtn.addEventListener('click', () => {
                navigateTo('support-center');
            });
        }
        if (backSupportBtn) {
            backSupportBtn.addEventListener('click', () => {
                navigateTo('profile');
            });
        }

        // Emergency modal
        if (emergencyBtn && emergencyModal) {
            emergencyBtn.addEventListener('click', () => {
                emergencyModal.style.display = 'flex';
            });
        }
        if (closeEmergencyBtn && emergencyModal) {
            closeEmergencyBtn.addEventListener('click', () => {
                emergencyModal.style.display = 'none';
            });
        }

        // Tab selection
        const tabBtns = document.querySelectorAll('.support-tab-btn');
        const tabPanes = document.querySelectorAll('.support-pane-content');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.color = 'var(--text-slate)';
                    b.style.borderBottom = 'none';
                    b.style.fontWeight = '600';
                });
                btn.classList.add('active');
                btn.style.color = 'var(--accent-cyan)';
                btn.style.borderBottom = '2px solid var(--accent-cyan)';
                btn.style.fontWeight = '800';

                const targetId = btn.dataset.supportTarget;
                tabPanes.forEach(pane => {
                    if (pane.id === targetId) {
                        pane.style.display = 'block';
                    } else {
                        pane.style.display = 'none';
                    }
                });

                if (targetId === 'support-tickets-pane') {
                    renderCustomerTickets();
                }
            });
        });

        // FAQ Content
        const faqs = [
            { cat: 'Booking', q: 'How do I cancel my booking?', a: 'You can request cancellation directly from the "Trips" panel. Depending on the planner policies, refunds are calculated and credited back to your original source payee account.' },
            { cat: 'Payments', q: 'My transaction succeeded but booking is pending. What to do?', a: 'UPI syncs may experience latency during high replication loads. If status doesn\'t update in 10 minutes, raise a ticket or call direct SOS hotline.' },
            { cat: 'Refunds', q: 'How long does a refund credit take?', a: 'Refund actions are processed by the tour planner within 24 hours. The banking gateway standard routing takes 3 to 5 business days.' },
            { cat: 'Safety', q: 'What happens if a tour guide is unreachable?', a: 'Trigger the emergency hotline or WhatsApp Coordinator. Beacon administrators will track the group coordination using guide satellite telemetry.' }
        ];

        const kbCats = ['All', 'Booking', 'Payments', 'Refunds', 'Safety'];
        const catsWrap = document.getElementById('kb-categories-wrap');
        const faqsWrap = document.getElementById('kb-faqs-wrap');
        let selectedKbCat = 'All';

        const renderFaqs = () => {
            if (!faqsWrap) return;
            faqsWrap.innerHTML = '';
            
            const searchVal = document.getElementById('kb-search-input')?.value.toLowerCase() || '';

            const filtered = faqs.filter(faq => {
                const matchesCat = selectedKbCat === 'All' || faq.cat === selectedKbCat;
                const matchesSearch = faq.q.toLowerCase().includes(searchVal) || faq.a.toLowerCase().includes(searchVal);
                return matchesCat && matchesSearch;
            });

            filtered.forEach((faq, idx) => {
                const item = document.createElement('div');
                item.style.background = 'rgba(255,255,255,0.02)';
                item.style.border = '1px solid rgba(255,255,255,0.08)';
                item.style.borderRadius = '8px';
                item.style.overflow = 'hidden';
                
                item.innerHTML = `
                    <div class="faq-header" style="padding: 12px 15px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 13px; color: #fff;">
                        <span>Q: ${faq.q}</span>
                        <span class="faq-arrow" style="font-size: 10px; transition: transform 0.2s;">▼</span>
                    </div>
                    <div class="faq-body" style="display: none; padding: 12px 15px; border-t: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: var(--text-slate); line-height: 1.5; background: rgba(0,0,0,0.15);">
                        ${faq.a}
                    </div>
                `;

                const header = item.querySelector('.faq-header');
                const body = item.querySelector('.faq-body');
                const arrow = item.querySelector('.faq-arrow');

                header.addEventListener('click', () => {
                    const isOpen = body.style.display === 'block';
                    body.style.display = isOpen ? 'none' : 'block';
                    arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                });

                faqsWrap.appendChild(item);
            });
        };

        if (catsWrap) {
            catsWrap.innerHTML = '';
            kbCats.forEach(cat => {
                const chip = document.createElement('span');
                chip.innerText = cat;
                chip.style.padding = '5px 12px';
                chip.style.borderRadius = '20px';
                chip.style.fontSize = '11px';
                chip.style.fontWeight = '700';
                chip.style.cursor = 'pointer';
                chip.style.border = '1px solid rgba(255,255,255,0.08)';
                
                const updateChipStyle = () => {
                    if (selectedKbCat === cat) {
                        chip.style.background = 'var(--accent-cyan)';
                        chip.style.color = 'var(--bg-dark)';
                        chip.style.borderColor = 'var(--accent-cyan)';
                    } else {
                        chip.style.background = 'rgba(255,255,255,0.02)';
                        chip.style.color = '#fff';
                        chip.style.borderColor = 'rgba(255,255,255,0.08)';
                    }
                };

                updateChipStyle();

                chip.addEventListener('click', () => {
                    selectedKbCat = cat;
                    document.querySelectorAll('#kb-categories-wrap span').forEach(c => {
                        c.style.background = 'rgba(255,255,255,0.02)';
                        c.style.color = '#fff';
                        c.style.borderColor = 'rgba(255,255,255,0.08)';
                    });
                    chip.style.background = 'var(--accent-cyan)';
                    chip.style.color = 'var(--bg-dark)';
                    chip.style.borderColor = 'var(--accent-cyan)';
                    renderFaqs();
                });

                catsWrap.appendChild(chip);
            });
        }

        const kbSearch = document.getElementById('kb-search-input');
        if (kbSearch) {
            kbSearch.addEventListener('input', renderFaqs);
        }

        renderFaqs();

        // Ticket raising wizard
        const categories = [
            'Booking Issue', 'Payment Issue', 'Refund Request', 
            'Package Change', 'Cancellation', 'Planner Complaint', 
            'Safety Concern', 'General Question', 'Other'
        ];

        if (wizardCategorySelect) {
            wizardCategorySelect.innerHTML = '';
            categories.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.innerText = cat;
                wizardCategorySelect.appendChild(opt);
            });
        }

        let wizardPriority = 'Low';
        let wizardStep = 1;

        const openWizard = () => {
            if (wizardModal) {
                wizardStep = 1;
                updateWizardPane();
                wizardModal.style.display = 'flex';
            }
        };

        if (triggerWizardBtn) triggerWizardBtn.addEventListener('click', openWizard);
        if (chatOptionBtn) chatOptionBtn.addEventListener('click', openWizard);
        
        if (closeWizardBtn && wizardModal) {
            closeWizardBtn.addEventListener('click', () => {
                wizardModal.style.display = 'none';
            });
        }

        // Priority click selectors
        const priorityBtns = document.querySelectorAll('.priority-select-btn');
        priorityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                priorityBtns.forEach(b => {
                    b.style.background = 'rgba(255,255,255,0.02)';
                    b.style.borderColor = 'rgba(255,255,255,0.08)';
                    b.style.color = '#fff';
                });
                btn.style.background = 'rgba(0, 203, 224, 0.05)';
                btn.style.borderColor = 'var(--accent-cyan)';
                btn.style.color = 'var(--accent-cyan)';
                wizardPriority = btn.dataset.priority;

                const warning = document.getElementById('critical-priority-warning');
                if (warning) {
                    warning.style.display = wizardPriority === 'Critical' ? 'block' : 'none';
                }
            });
        });

        const updateWizardPane = () => {
            const label = document.getElementById('wizard-step-label');
            if (label) label.innerText = `Step ${wizardStep} of 4: Setup details`;

            document.querySelectorAll('.wizard-pane').forEach((p, idx) => {
                p.style.display = (idx + 1 === wizardStep) ? 'block' : 'none';
            });

            if (wizardStep === 4) {
                const sub = document.getElementById('wizard-subject')?.value || '';
                const cat = document.getElementById('wizard-category')?.value || '';
                
                const rSub = document.getElementById('review-subject');
                const rCat = document.getElementById('review-cat');
                const rPri = document.getElementById('review-priority');

                if (rSub) rSub.innerText = sub;
                if (rCat) rCat.innerText = cat;
                if (rPri) rPri.innerText = wizardPriority;
            }
        };

        // Next / Back handlers
        document.getElementById('btn-wizard-next-1')?.addEventListener('click', () => { wizardStep = 2; updateWizardPane(); });
        document.getElementById('btn-wizard-back-2')?.addEventListener('click', () => { wizardStep = 1; updateWizardPane(); });
        document.getElementById('btn-wizard-next-2')?.addEventListener('click', () => { wizardStep = 3; updateWizardPane(); });
        document.getElementById('btn-wizard-back-3')?.addEventListener('click', () => { wizardStep = 2; updateWizardPane(); });
        document.getElementById('btn-wizard-next-3')?.addEventListener('click', () => {
            const sub = document.getElementById('wizard-subject')?.value || '';
            const desc = document.getElementById('wizard-desc')?.value || '';
            if (!sub.trim() || !desc.trim()) {
                alert('Please enter Subject and Description details.');
                return;
            }
            wizardStep = 4;
            updateWizardPane();
        });
        document.getElementById('btn-wizard-back-4')?.addEventListener('click', () => { wizardStep = 3; updateWizardPane(); });

        // Tickets storage database
        let customerTickets = [
            {
                id: 'BCN-SUP-2026-000201',
                subject: 'Double charged on Kashmir Honeymoon booking',
                category: 'Payment Issue',
                priority: 'High',
                status: 'In Progress',
                createdDate: '2026-07-31 10:20 AM',
                description: 'I initiated two transactions due to first one returning a network gateway error. Both payments are success in my bank diary.',
                timeline: [
                    { status: 'Ticket Created', date: '2026-07-31 10:20 AM', by: 'You' },
                    { status: 'Assigned', date: '2026-07-31 10:30 AM', by: 'System' },
                    { status: 'In Progress', date: '2026-07-31 11:00 AM', by: 'Siddharth Roy' }
                ],
                conversations: [
                    { sender: 'Traveler', message: 'Hello, I paid twice. Please verify refund options.', time: '10:20 AM' },
                    { sender: 'Support', message: 'Hi Aditya, checking logs. Yes, we see two duplicate UPI credits. Initiating refund for the duplicate transaction.', time: '11:00 AM' }
                ]
            }
        ];

        let activeTicketId = null;

        // Submit Ticket handler
        document.getElementById('btn-wizard-submit')?.addEventListener('click', () => {
            const sub = document.getElementById('wizard-subject').value;
            const desc = document.getElementById('wizard-desc').value;
            const cat = document.getElementById('wizard-category').value;
            const bkgId = document.getElementById('wizard-bkg-id').value;

            const newTicket = {
                id: `BCN-SUP-2026-000${202 + customerTickets.length}`,
                subject: sub,
                category: cat,
                priority: wizardPriority,
                status: 'Open',
                createdDate: 'Just now',
                description: desc,
                timeline: [
                    { status: 'Ticket Created', date: 'Just now', by: 'You' }
                ],
                conversations: [
                    { sender: 'Traveler', message: desc, time: 'Just now' }
                ]
            };

            customerTickets.push(newTicket);
            if (wizardModal) wizardModal.style.display = 'none';

            // Reset inputs
            document.getElementById('wizard-subject').value = '';
            document.getElementById('wizard-desc').value = '';
            document.getElementById('wizard-bkg-id').value = '';

            showToast(`🎫 Ticket ${newTicket.id} created successfully!`);
            
            // Route to My Tickets pane
            if (tabMyTickets) {
                tabMyTickets.click();
            }
        });

        const renderCustomerTickets = () => {
            const container = document.getElementById('customer-tickets-container');
            if (!container) return;
            container.innerHTML = '';

            customerTickets.forEach(ticket => {
                const card = document.createElement('div');
                card.style.background = (activeTicketId === ticket.id) ? 'rgba(0, 203, 224, 0.05)' : 'rgba(255,255,255,0.01)';
                card.style.border = (activeTicketId === ticket.id) ? '2.5px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.08)';
                card.style.borderRadius = '8px';
                card.style.padding = '12px';
                card.style.cursor = 'pointer';
                card.style.textAlign = 'left';

                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-family: monospace; font-size: 10px; color: var(--accent-cyan); font-weight: 700;">${ticket.id}</span>
                        <span style="font-size: 9px; font-weight: 800; background: rgba(255,255,255,0.05); padding: 1px 6px; border-radius: 4px; color: ${ticket.priority === 'Critical' ? '#ef4444' : '#fff'};">${ticket.priority}</span>
                    </div>
                    <h5 style="font-size: 12px; font-weight: 800; color: #fff; margin: 0 0 4px 0; line-clamp: 1; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${ticket.subject}</h5>
                    <div style="font-size: 10px; color: var(--text-slate);">Status: <strong style="color: #fff;">${ticket.status}</strong></div>
                `;

                card.addEventListener('click', () => {
                    activeTicketId = ticket.id;
                    renderCustomerTickets();
                    openChatWorkspace(ticket);
                });

                container.appendChild(card);
            });
        };

        const openChatWorkspace = (ticket) => {
            const placeholder = document.getElementById('customer-chat-placeholder');
            const ws = document.getElementById('customer-chat-workspace');
            if (placeholder) placeholder.style.display = 'none';
            if (ws) ws.style.display = 'block';

            document.getElementById('active-chat-id').innerText = ticket.id;
            document.getElementById('active-chat-subject').innerText = ticket.subject;
            
            const statusEl = document.getElementById('active-chat-status');
            if (statusEl) {
                statusEl.innerText = ticket.status;
                statusEl.style.background = ticket.status === 'Resolved' || ticket.status === 'Closed' ? '#10b981' : '#f59e0b';
                statusEl.style.color = '#fff';
            }

            // Timeline progress
            const trace = document.getElementById('customer-timeline-trace');
            if (trace) {
                trace.innerHTML = '';
                ticket.timeline.forEach(step => {
                    const stepNode = document.createElement('span');
                    stepNode.innerText = `✓ ${step.status} (${step.date.includes('AM') || step.date.includes('PM') ? step.date.split(' ')[1] : step.date})`;
                    stepNode.style.background = 'rgba(255,255,255,0.05)';
                    stepNode.style.padding = '2px 6px';
                    stepNode.style.borderRadius = '4px';
                    trace.appendChild(stepNode);
                });
            }

            // Chat messages
            const msgBox = document.getElementById('customer-chat-messages');
            if (msgBox) {
                msgBox.innerHTML = '';
                ticket.conversations.forEach(msg => {
                    const bubble = document.createElement('div');
                    const isSupport = msg.sender === 'Support';
                    bubble.style.maxWidth = '80%';
                    bubble.style.padding = '8px 12px';
                    bubble.style.borderRadius = '10px';
                    bubble.style.fontSize = '12px';
                    bubble.style.lineHeight = '1.4';
                    
                    if (isSupport) {
                        bubble.style.background = 'rgba(0, 203, 224, 0.08)';
                        bubble.style.border = '1px solid rgba(0, 203, 224, 0.15)';
                        bubble.style.alignSelf = 'flex-start';
                        bubble.style.color = '#fff';
                        bubble.innerHTML = `<span style="font-size: 8px; color: var(--accent-cyan); display: block; font-weight: 800; margin-bottom: 2px;">Support Coordinator</span>${msg.message}`;
                    } else {
                        bubble.style.background = 'rgba(255,255,255,0.04)';
                        bubble.style.border = '1px solid rgba(255,255,255,0.08)';
                        bubble.style.alignSelf = 'flex-end';
                        bubble.style.color = '#fff';
                        bubble.innerHTML = `<span style="font-size: 8px; color: var(--text-slate); display: block; font-weight: 800; margin-bottom: 2px;">You</span>${msg.message}`;
                    }
                    msgBox.appendChild(bubble);
                });
                msgBox.scrollTop = msgBox.scrollHeight;
            }

            // Lock input if closed
            const replyInput = document.getElementById('customer-reply-input');
            const replyBtn = document.getElementById('btn-send-customer-reply');
            if (replyInput && replyBtn) {
                if (ticket.status === 'Closed') {
                    replyInput.disabled = true;
                    replyInput.placeholder = '🚫 Ticket is Closed';
                    replyBtn.disabled = true;
                } else {
                    replyInput.disabled = false;
                    replyInput.placeholder = 'Type message reply...';
                    replyBtn.disabled = false;
                }
            }
        };

        // Send reply handler
        document.getElementById('btn-send-customer-reply')?.addEventListener('click', () => {
            const input = document.getElementById('customer-reply-input');
            if (!input || !input.value.trim() || !activeTicketId) return;

            const text = input.value;
            input.value = '';

            const activeTicket = customerTickets.find(t => t.id === activeTicketId);
            if (!activeTicket) return;

            activeTicket.conversations.push({
                sender: 'Traveler',
                message: text,
                time: 'Just now'
            });

            openChatWorkspace(activeTicket);

            // Simulate support reply
            setTimeout(() => {
                activeTicket.conversations.push({
                    sender: 'Support',
                    message: 'Hello, we have received your update. The support operations desk has queued this for verification.',
                    time: 'Just now'
                });
                openChatWorkspace(activeTicket);
                showToast('🔔 New message from support team.');
            }, 1500);
        });

        // CSAT system hooks
        const csatStars = document.querySelectorAll('.csat-star-btn');
        let selectedCsatRating = 5;
        csatStars.forEach(star => {
            star.addEventListener('click', () => {
                selectedCsatRating = parseInt(star.dataset.star);
                csatStars.forEach(s => {
                    const rating = parseInt(s.dataset.star);
                    s.style.opacity = rating <= selectedCsatRating ? '1' : '0.3';
                });
            });
        });

        document.getElementById('btn-submit-csat')?.addEventListener('click', () => {
            const modal = document.getElementById('support-csat-modal');
            if (modal) modal.style.display = 'none';
            showToast('🌟 Thank you for rating Beacon Support experience!');
            document.getElementById('csat-comment-input').value = '';
        });

        window.triggerCsatDialog = function() {
            const modal = document.getElementById('support-csat-modal');
            if (modal) modal.style.display = 'flex';
        };
        window.triggerTestAlarm = (type = 'started') => {
            const amount = "₹12,500";
            const bookingId = "BCN-2026-TESTALARM";
            const customerName = "Rahul Sharma";
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const attemptId = `PAY-${Math.floor(10000 + Math.random() * 90000)}`;

            if (type === 'started') {
                playDirectPaymentSound('started');
                speakDirectPaymentVoice(`Beacon payment alert. A payment of twelve thousand five hundred rupees has been initiated.`);
                addBeaconNotification(`Payment initiated: ${amount}`, 'started', bookingId, amount);
                showPlannerRealTimePopup("🔔 PAYMENT IN PROGRESS", "Payment Started", bookingId, amount, customerName, timeStr, "started", attemptId);
            } else {
                playDirectPaymentSound('verification');
                speakDirectPaymentVoice(`Beacon payment alert. The customer has marked a payment of twelve thousand five hundred rupees as completed. Please check your account and confirm the payment.`);
                addBeaconNotification(`Payment verification required: ${amount}`, 'verification', bookingId, amount);
                showPlannerRealTimePopup("⚠️ PAYMENT VERIFICATION REQUIRED", "Verification Needed", bookingId, amount, customerName, timeStr, "verification", attemptId);
            }
            showToast(`🔔 Test Alarm (${type}) triggered!`);
        };
    }

    initCustomerSupportCenter();
    initTravellerOperationsExperience();

    // Check if test_alarm parameter is in URL, trigger automatically after 2s
    const urlParams = new URLSearchParams(window.location.search);
    const testAlarmType = urlParams.get('test_alarm');
    if (testAlarmType === 'started' || testAlarmType === 'verification') {
        setTimeout(() => {
            window.triggerTestAlarm(testAlarmType);
        }, 2000);
    }

});