// Standalone JS Controller for Mobile Layout Design 1
document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation / Router
    const views = document.querySelectorAll('.mobile-spa-view');
    const navButtons = document.querySelectorAll('.bottom-nav-bar .nav-item-btn');
    const indicator = document.querySelector('.bottom-nav-indicator');

    const navigateToView = (targetId) => {
        views.forEach(v => v.classList.remove('active'));
        const activeView = document.getElementById(`mview-${targetId}`);
        if (activeView) activeView.classList.add('active');

        navButtons.forEach(btn => {
            if (btn.dataset.target === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Slide nav indicator bar
        const activeIdx = Array.from(navButtons).findIndex(btn => btn.dataset.target === targetId);
        if (indicator && activeIdx !== -1) {
            indicator.style.transform = `translateX(${activeIdx * 100}%)`;
        }
    };

    navButtons.forEach(btn => {
        btn.onclick = () => {
            navigateToView(btn.dataset.target);
        };
    });

    // Custom Profile button triggers
    const headerProfile = document.getElementById('btn-header-profile');
    if (headerProfile) {
        headerProfile.onclick = () => {
            navigateToView('profile');
        };
    }

    // Dynamic Database packages list
    const packagesDatabase = [
        { title: "Leh Ladakh Bike Expedition", category: "mountains", style: "adventure", duration: "6 Days", rating: "4.8", priceStr: "₹22,999", imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80", highlights: "6 Days bike trip crossing Khardung La pass with premium Royal Enfield bikes, fuel, and backup guides included." },
        { title: "Goa Beachfront Escape", category: "beaches", style: "couple", duration: "5 Days", rating: "4.9", priceStr: "₹14,999", imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80", highlights: "5 Days premium beach villa stay in North Goa with private dinners and airport transfers." },
        { title: "Kashmir Paradise Escape", category: "mountains", style: "nature", duration: "5 Days", rating: "4.8", priceStr: "₹18,999", imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", highlights: "5 Days floating hotel stay on Dal Lake with private Shikara tours and excursions to Gulmarg." },
        { title: "Manali Cedar Chalet", category: "mountains", style: "luxury", duration: "4 Days", rating: "4.7", priceStr: "₹12,999", imgUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80", highlights: "4 Days luxury wooden chalet stay in Solang Valley with private paragliding passes." },
        { title: "Varkala Cliffside Yoga", category: "beaches", style: "solo", duration: "4 Days", rating: "4.8", priceStr: "₹11,499", imgUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80", highlights: "4 Days sunrise yoga sessions, ayurvedic spa treatments, and cliff-side surfing lessons." }
    ];

    // Local Storage saved bookmark list
    let savedCollection = JSON.parse(localStorage.getItem('beacon_saved')) || [];

    const toggleSavedBookmark = (title) => {
        if (savedCollection.includes(title)) {
            savedCollection = savedCollection.filter(item => item !== title);
        } else {
            savedCollection.push(title);
        }
        localStorage.setItem('beacon_saved', JSON.stringify(savedCollection));
        renderSavedTabGrid();
        showToastNotice(savedCollection.includes(title) ? "Saved to Collection" : "Removed from Collection");
    };

    const showToastNotice = (msg) => {
        const toast = document.getElementById('mtoast-alert');
        if (toast) {
            toast.innerText = msg;
            toast.classList.add('active');
            setTimeout(() => toast.classList.remove('active'), 2200);
        }
    };

    // Compact Card renderer
    const formatCompactCard = (pkg) => {
        const isSaved = savedCollection.includes(pkg.title);
        return `
            <div class="compact-card" data-title="${pkg.title}">
                <div class="card-img-banner" style="background-image: url('${pkg.imgUrl}')">
                    <button type="button" class="card-fav-btn">${isSaved ? '❤️' : '♡'}</button>
                </div>
                <div class="card-details-info">
                    <div class="card-name-title">${pkg.title}</div>
                    <div class="card-meta-line">
                        <span>📍 ${pkg.category.toUpperCase()}</span>
                        <span>${pkg.duration}</span>
                    </div>
                    <div class="card-footer-line">
                        <span class="rating-badge">⭐ ${pkg.rating}</span>
                        <span class="price-tag">${pkg.priceStr}</span>
                    </div>
                </div>
            </div>
        `;
    };

    const bindCardInteractions = (container) => {
        container.querySelectorAll('.compact-card').forEach(card => {
            const title = card.dataset.title;
            const pkg = packagesDatabase.find(p => p.title === title);
            if (!pkg) return;

            // Click card details
            card.onclick = (e) => {
                if (e.target.classList.contains('card-fav-btn')) return;
                // Redirect to details preview
                showBottomPreview(pkg);
            };

            // Bookmark trigger
            const fav = card.querySelector('.card-fav-btn');
            if (fav) {
                fav.onclick = (e) => {
                    e.stopPropagation();
                    toggleSavedBookmark(pkg.title);
                    fav.innerText = savedCollection.includes(pkg.title) ? '❤️' : '♡';
                    fav.classList.add('pop-bounce');
                    setTimeout(() => fav.classList.remove('pop-bounce'), 300);
                };
            }

            // Long Press preview trigger
            let pressTimer = null;
            const startPress = () => {
                pressTimer = setTimeout(() => {
                    showBottomPreview(pkg);
                }, 500);
            };
            const endPress = () => {
                if (pressTimer) clearTimeout(pressTimer);
            };

            card.addEventListener('mousedown', startPress);
            card.addEventListener('touchstart', startPress);
            card.addEventListener('mouseup', endPress);
            card.addEventListener('touchend', endPress);
        });
    };

    // Immersive bottom sheet preview
    const backdrop = document.getElementById('mpreview-backdrop');
    const sheet = document.getElementById('mpreview-sheet');

    const showBottomPreview = (pkg) => {
        if (!sheet || !backdrop) return;
        document.getElementById('msheet-title').innerText = pkg.title;
        document.getElementById('msheet-desc').innerText = pkg.highlights;
        document.getElementById('msheet-price').innerText = pkg.priceStr;
        document.getElementById('msheet-meta').innerText = `⏱ ${pkg.duration} • ${pkg.category.toUpperCase()}`;

        backdrop.style.display = 'block';
        setTimeout(() => sheet.classList.add('active'), 50);
    };

    const hideBottomPreview = () => {
        if (!sheet || !backdrop) return;
        sheet.classList.remove('active');
        setTimeout(() => backdrop.style.display = 'none', 300);
    };

    if (backdrop) backdrop.onclick = hideBottomPreview;
    const closeBtn = document.getElementById('btn-msheet-close-view');
    if (closeBtn) closeBtn.onclick = hideBottomPreview;

    // Render Home rails
    const renderHomeRails = (filterCategory = 'all') => {
        const rails = ['mrail-recommended', 'mrail-trending', 'mrail-weekend', 'mrail-more'];
        rails.forEach(railId => {
            const rail = document.getElementById(railId);
            if (!rail) return;
            const scroll = rail.querySelector('.rail-cards-scroll');
            let list = [...packagesDatabase];

            if (railId === 'mrail-recommended') {
                list = packagesDatabase.slice(0, 3);
            } else if (railId === 'mrail-trending') {
                list = [...packagesDatabase].reverse().slice(0, 4);
            } else if (railId === 'mrail-weekend') {
                list = packagesDatabase.filter(p => p.duration.includes('4 Days') || p.duration.includes('3 Days'));
            }

            if (filterCategory !== 'all') {
                list = list.filter(p => p.category === filterCategory);
            }

            scroll.innerHTML = list.map(p => formatCompactCard(p)).join('');
            bindCardInteractions(scroll);
        });
    };

    // Render Saved Collection tab
    const renderSavedTabGrid = () => {
        const container = document.getElementById('mcollection-saved-grid');
        if (!container) return;
        
        const list = packagesDatabase.filter(p => savedCollection.includes(p.title));
        if (list.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:30px 0; color:var(--text-slate);">No saved packages yet. Explore Home and save items!</div>`;
            return;
        }
        
        container.innerHTML = list.map(p => formatCompactCard(p)).join('');
        bindCardInteractions(container);
    };

    // Category chips filter triggers
    const chips = document.querySelectorAll('.category-chip');
    chips.forEach(chip => {
        chip.onclick = () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderHomeRails(chip.dataset.filter);
        };
    });

    // Experiences Rail
    const renderExperiencesRail = () => {
        const rail = document.querySelector('#mrail-experiences .rail-cards-scroll');
        if (!rail) return;
        const list = [
            { title: "Trekking", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80", filter: "mountains" },
            { title: "Beach Escapes", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80", filter: "beaches" },
            { title: "Forest Trails", bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=200&q=80", filter: "forests" }
        ];
        rail.innerHTML = list.map(item => `
            <div class="experience-visual-item" data-filter="${item.filter}" style="background-image: url('${item.bg}')">
                <div class="experience-overlay-dark">
                    <div class="experience-title">${item.title}</div>
                </div>
            </div>
        `).join('');

        rail.querySelectorAll('.experience-visual-item').forEach(card => {
            card.onclick = () => {
                const filter = card.dataset.filter;
                const chip = document.querySelector(`.category-chip[data-filter="${filter}"]`);
                if (chip) chip.click();
            };
        });
    };

    // Destinations Rail
    const renderDestinationsRail = () => {
        const rail = document.querySelector('#mrail-destinations .rail-cards-scroll');
        if (!rail) return;
        const list = [
            { name: "Goa", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80" },
            { name: "Kashmir", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80" },
            { name: "Ladakh", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80" }
        ];
        rail.innerHTML = list.map(item => `
            <div class="destination-visual-item" data-query="${item.name}" style="background-image: url('${item.bg}')">
                <div class="destination-overlay-dark">
                    <div class="destination-name">${item.name}</div>
                </div>
            </div>
        `).join('');

        rail.querySelectorAll('.destination-visual-item').forEach(card => {
            card.onclick = () => {
                const q = card.dataset.query;
                const pkg = packagesDatabase.find(p => p.title.toLowerCase().includes(q.toLowerCase()));
                if (pkg) showBottomPreview(pkg);
            };
        });
    };

    // Hero Carousel Auto-rotator
    const renderFeaturedHero = () => {
        const carousel = document.getElementById('hero-carousel-wrap');
        if (!carousel) return;

        const list = packagesDatabase.slice(0, 3);
        let activeIdx = 0;

        const drawFeatured = () => {
            const pkg = list[activeIdx];
            const isSaved = savedCollection.includes(pkg.title);
            carousel.innerHTML = `
                <div class="hero-item active" style="background-image: url('${pkg.imgUrl}')">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <span class="hero-category">Featured Journey • ${pkg.category.toUpperCase()}</span>
                        <h2 class="hero-title">${pkg.title}</h2>
                        <div class="hero-meta">⏱ ${pkg.duration} &bull; ⭐ ${pkg.rating} Rating</div>
                        <div class="hero-price">Starting from <strong>${pkg.priceStr}</strong></div>
                        <div class="hero-buttons">
                            <button type="button" class="btn-hero-primary btn-carousel-view">View Package</button>
                            <button type="button" class="btn-hero-secondary btn-carousel-save">${isSaved ? '❤️ Saved' : '♡ Save'}</button>
                        </div>
                    </div>
                </div>
            `;

            carousel.querySelector('.btn-carousel-view').onclick = () => {
                showBottomPreview(pkg);
            };

            carousel.querySelector('.btn-carousel-save').onclick = () => {
                toggleSavedBookmark(pkg.title);
                drawFeatured();
            };
        };

        drawFeatured();

        // Auto transition every 6 seconds
        let rotationTimer = setInterval(() => {
            activeIdx = (activeIdx + 1) % list.length;
            drawFeatured();
        }, 6000);

        carousel.ontouchstart = () => {
            clearInterval(rotationTimer);
        };
    };

    // Planner search triggers
    const planBtn = document.getElementById('btn-mplan-submit');
    if (planBtn) {
        planBtn.onclick = () => {
            const dest = document.getElementById('mplan-dest').value.toLowerCase();
            const results = document.getElementById('mplan-results');
            const list = packagesDatabase.filter(p => p.title.toLowerCase().includes(dest));
            
            if (list.length === 0) {
                results.innerHTML = `<div style="color:var(--text-slate);">No match found. Try 'Ladakh' or 'Goa'</div>`;
                return;
            }
            results.innerHTML = `<h4 style="font-size:13px; margin-bottom:10px;">Strongest Matches</h4>` + list.map(p => formatCompactCard(p)).join('');
            bindCardInteractions(results);
        };
    }

    // Init Calls
    renderFeaturedHero();
    renderHomeRails('all');
    renderExperiencesRail();
    renderDestinationsRail();
    renderSavedTabGrid();
});
