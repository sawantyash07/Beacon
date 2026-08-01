(function(){const j=document.createElement("link").relList;if(j&&j.supports&&j.supports("modulepreload"))return;for(const B of document.querySelectorAll('link[rel="modulepreload"]'))w(B);new MutationObserver(B=>{for(const C of B)if(C.type==="childList")for(const V of C.addedNodes)V.tagName==="LINK"&&V.rel==="modulepreload"&&w(V)}).observe(document,{childList:!0,subtree:!0});function J(B){const C={};return B.integrity&&(C.integrity=B.integrity),B.referrerPolicy&&(C.referrerPolicy=B.referrerPolicy),B.crossOrigin==="use-credentials"?C.credentials="include":B.crossOrigin==="anonymous"?C.credentials="omit":C.credentials="same-origin",C}function w(B){if(B.ep)return;B.ep=!0;const C=J(B);fetch(B.href,C)}})();window.addEventListener("error",P=>{console.error("Global JS Error Captured in app.js:",P.message,"at",P.filename,":",P.lineno)});window.showToast=P=>{const j=document.getElementById("playground-toast");j?(j.innerText=P,j.classList.add("active"),setTimeout(()=>{j.classList.remove("active")},2200)):console.log("Toast:",P)};let A=[];const gt=P=>P.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),Qo=P=>{const j=gt(P),J=`${window.location.origin}/?package=${j}`,w=P.priceStr||P.price,B=P.basePrice||Math.round(P.priceNum*1.11),C=Math.round((B-P.priceNum)/B*100),V="₹"+B.toLocaleString(),xe=(P.highlights?P.highlights.split(","):["Luxury Stays","Guided Activities","Transfers Included"]).slice(0,4).map(G=>G.trim()).join(" • ");let we="";return C>0&&(we=`
${C}% OFF • Original ${V}`),`*${P.title}*

${P.duration} Days / ${P.duration-1} Nights
${P.location?P.location.split(",")[0]:P.category.toUpperCase()}

Starting from ${w}/person${we}

${xe}

Explore complete itinerary, stays, activities, dates & more on Beacon:

${J}`},Zo=(P,j)=>{const J=document.getElementById("share-canvas");if(!J)return;const w=J.getContext("2d"),B=600,C=800;J.width=B,J.height=C;const V=new Image;V.crossOrigin="anonymous",V.onload=()=>{const le=V.width/V.height,xe=B/C;let we,G,te,Q;le>xe?(Q=V.height,te=V.height*xe,we=(V.width-te)/2,G=0):(te=V.width,Q=V.width/xe,we=0,G=(V.height-Q)/2),w.drawImage(V,we,G,te,Q,0,0,B,C);const Qe=w.createLinearGradient(0,0,0,100);Qe.addColorStop(0,"rgba(7, 7, 28, 0.7)"),Qe.addColorStop(1,"rgba(7, 7, 28, 0)"),w.fillStyle=Qe,w.fillRect(0,0,B,100);const De=w.createLinearGradient(0,C*.55,0,C);De.addColorStop(0,"rgba(7, 7, 28, 0)"),De.addColorStop(.3,"rgba(7, 7, 28, 0.5)"),De.addColorStop(.7,"rgba(7, 7, 28, 0.9)"),De.addColorStop(1,"rgba(7, 7, 28, 0.98)"),w.fillStyle=De,w.fillRect(0,C*.55,B,C*.45),w.strokeStyle="#00CBE0",w.lineWidth=4,w.strokeRect(2,2,B-4,C-4),w.strokeStyle="#00CBE0",w.lineWidth=3.5,w.beginPath(),w.arc(45,45,14,.2*Math.PI,1.6*Math.PI),w.stroke(),w.strokeStyle="#00CBE0",w.lineWidth=2.5,w.beginPath(),w.moveTo(56,32),w.lineTo(62,38),w.moveTo(62,32),w.lineTo(56,38),w.stroke(),w.fillStyle="#ffffff",w.font='900 16px "Poppins", sans-serif',w.fillText("BEACON",75,47),w.fillStyle="#00CBE0",w.font='700 10px "Poppins", sans-serif',w.fillText("TRAVEL",75,58);const Et=P.rating.replace("⭐","").trim();w.fillStyle="rgba(7, 7, 28, 0.75)",w.strokeStyle="rgba(255, 255, 255, 0.1)",w.lineWidth=1,w.beginPath(),w.roundRect(B-110,25,85,38,6),w.fill(),w.stroke(),w.fillStyle="#FFD700",w.font='14px "Poppins", sans-serif',w.fillText("⭐",B-100,48),w.fillStyle="#ffffff",w.font='800 13px "Poppins", sans-serif',w.fillText(Et,B-78,48);const Tt=(P.style||P.category||"FEATURED").toUpperCase();w.fillStyle="#00CBE0",w.font='800 11px "Poppins", sans-serif',w.fillText(Tt,45,C-145);const Me=(P.location?P.location.split(",")[0]:P.category||"JOURNEY").toUpperCase();w.fillStyle="#ffffff",w.font='900 48px "Poppins", sans-serif',w.fillText(Me,45,C-90),w.fillStyle="rgba(255, 255, 255, 0.85)",w.font='500 20px "Poppins", sans-serif',w.fillText(P.title,45,C-55),w.fillStyle="#00CBE0",w.font='800 10px "Poppins", sans-serif',w.fillText("EXPLORE THIS JOURNEY ON BEACON",45,C-25);const ut=J.toDataURL("image/png");j&&j(ut)},V.onerror=()=>{w.fillStyle="#07071C",w.fillRect(0,0,B,C),w.strokeStyle="#00CBE0",w.lineWidth=4,w.strokeRect(2,2,B-4,C-4),w.fillStyle="#fff",w.font='900 28px "Poppins", sans-serif',w.textAlign="center",w.fillText("BEACON TRAVEL",B/2,C/2-40),w.fillStyle="#00CBE0",w.fillText(P.title.toUpperCase(),B/2,C/2+10);const le=J.toDataURL("image/png");j&&j(le)},V.src=P.bg||P.imgUrl};window.openShareSheet=P=>{const j=document.getElementById("beacon-share-sheet");if(!j)return;const J=document.getElementById("whatsapp-text-preview"),w=document.getElementById("share-image-preview"),B=Qo(P);J.innerText=B,document.body.classList.add("modal-open"),j.style.display="flex",Zo(P,G=>{w.src=G}),j.ontouchmove=G=>{G.target===j&&G.preventDefault()};const C=document.getElementById("btn-close-share-sheet");C.onclick=()=>{document.body.classList.remove("modal-open"),j.style.display="none"};const V=document.getElementById("btn-share-whatsapp");V.onclick=()=>{const G=document.getElementById("share-canvas");if(G)try{G.toBlob(te=>{if(te)navigator.clipboard.write([new ClipboardItem({"image/png":te})]).then(()=>{showToast("📋 Card image copied! Paste it in WhatsApp to attach."),setTimeout(()=>{const Q=encodeURIComponent(B);window.open("https://api.whatsapp.com/send?text="+Q,"_blank")},1500)}).catch(()=>{const Q=encodeURIComponent(B);window.open("https://api.whatsapp.com/send?text="+Q,"_blank")});else{const Q=encodeURIComponent(B);window.open("https://api.whatsapp.com/send?text="+Q,"_blank")}},"image/png")}catch{const Q=encodeURIComponent(B);window.open("https://api.whatsapp.com/send?text="+Q,"_blank")}else{const te=encodeURIComponent(B);window.open("https://api.whatsapp.com/send?text="+te,"_blank")}};const le=document.getElementById("btn-copy-share-link");le&&(le.onclick=()=>{const G=gt(P),te=`${window.location.origin}/?package=${G}`;navigator.clipboard.writeText(te).then(()=>{showToast("📋 Package URL copied to clipboard!")})});const xe=document.getElementById("btn-copy-share-text");xe.onclick=()=>{navigator.clipboard.writeText(B).then(()=>{showToast("📋 WhatsApp details text copied to clipboard!")})};const we=document.getElementById("btn-download-share-card");we.onclick=()=>{const G=document.getElementById("share-canvas");if(G){const te=G.toDataURL("image/png"),Q=document.createElement("a");Q.download=`${gt(P)}-share.png`,Q.href=te,Q.click(),showToast("💾 Downloaded Travel Card!")}}};const en=()=>{const j=new URLSearchParams(window.location.search).get("package"),J=window.location.hash;let w=null;if(j)w=A.find(B=>gt(B)===j);else if(J&&J.startsWith("#package-")){const B=J.replace("#package-","");w=A.find(C=>gt(C)===B||C.title.toLowerCase().includes(decodeURIComponent(B).toLowerCase()))}else{const B=window.location.pathname.split("/"),C=B.indexOf("package");if(C!==-1&&B[C+1]){const V=B[C+1];w=A.find(le=>gt(le)===V)}}w&&setTimeout(()=>{openPackageDetailsView(w)},300)};document.addEventListener("DOMContentLoaded",()=>{const P={agency:{name:"WanderGo Travels",legalName:"WanderGo Tour Operators Pvt Ltd",logo:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=150&q=80",address:"123 Example Road, Pune, Maharashtra - 411001",phone:"+91 99999 88888",email:"booking@wandergo.com",gstRegistered:!0,gstin:"27ABCDE1234F1Z5"},freelancer:{name:"ROHAN TRAVEL EXPERIENCES",legalName:"Rohan Mehta Experiences",logo:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",address:"Pune, Maharashtra - 411038",phone:"+91 98765 43210",email:"rohan.experiences@planner.com",gstRegistered:!1,gstin:""}},j=e=>{if(e.receiptSnapshot)return e.receiptSnapshot;const t=e.id==="BC-2026-9921"?P.agency:P.freelancer,a=e.priceNum||37e3,o=3e3,n=550,s=1e3,i=2e3,d=a+o+n+s-i,c=t.gstRegistered?.05:0,g=Math.round(d*c),u=d+g;e.receiptSnapshot={receiptNo:`BRC-2026-${Math.floor(1e5+Math.random()*9e5)}`,bookingId:e.id,paymentStatus:"PAID",paymentDate:"31 July 2026",bookingDate:"30 July 2026",utrId:"992100887321",verification:"Verified",planner:t,customer:{name:"Aditya Kasod",phone:"+91 98765 43210",email:"aditya.kasod@example.com"},trip:{packageTitle:e.packageTitle,destination:e.id==="BC-2026-9921"?"Kerala Backwaters":"Munnar Hills",dates:e.dateRange,duration:"5 Days / 4 Nights"},travellers:[{name:"Aditya Kasod",type:"Adult"},{name:"Riya Sharma",type:"Adult"},{name:"Aarav Sharma",type:"Child"},{name:"Myra Sharma",type:"Infant"}],customizations:{stay:"Sea View Resort Upgrade",transport:"Airport Transfer Sedan Cab — Included",meals:[{name:"Aditya Kasod",pref:"Vegetarian Throughout"},{name:"Riya Sharma",pref:"Non-Veg Throughout"},{name:"Aarav Sharma",pref:"Vegetarian Throughout"}],addons:["Beach Candlelight Dinner","Airport lounge Lounge access"]},pricing:{basePrice:a,upgradesPrice:o,mealsPrice:n,addonsPrice:s,discount:i,subtotal:d,taxes:g,grandTotal:u}};const r=JSON.parse(localStorage.getItem("beacon_bookings"))||[],b=r.findIndex(m=>m.id===e.id);return b!==-1&&(r[b]=e,localStorage.setItem("beacon_bookings",JSON.stringify(r))),e.receiptSnapshot},J=()=>{document.querySelectorAll(".card-favorite-btn").forEach(e=>{e.querySelector("svg")||(e.innerHTML='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>')}),document.querySelectorAll(".card-share-btn").forEach(e=>{e.querySelector("svg")||(e.innerHTML='<svg viewBox="0 0 24 24"><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon><line x1="22" y1="2" x2="11" y2="13"></line></svg>')})};J();const w=()=>{document.querySelectorAll(".dest-tab.active, .exp-tab.active, .style-tab.active, .budget-tab.active, .seasonal-tab.active").forEach(t=>{t.click()}),J()},B=document.getElementById("liquid-glass-navigation");B&&window.addEventListener("scroll",()=>{window.scrollY>80?B.classList.add("scrolled"):B.classList.remove("scrolled")});const C=document.querySelectorAll(".hero5-dot"),V=document.getElementById("hero5-title"),le=document.getElementById("hero5-tag"),xe=document.getElementById("hero5-desc"),we=[{title:"Life Beyond Routine",tag:"Nature's Whispers",desc:"Handpicked journeys. Unforgettable experiences. Made for you.",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"},{title:"Discover Golden Sands",tag:"Coastal Paradises",desc:"Immerse yourself in crystal waters and scenic shorelines curated by travel vloggers.",image:"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"},{title:"Roam Hidden Valleys",tag:"Let's Explore The World",desc:"Zen gardens, mountain trails, and isolated lodges crafted for wellness seekers.",image:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80"}];let G=0,te;function Q(e){C.forEach(a=>a.classList.remove("active")),C[e]&&C[e].classList.add("active");const t=we[e];if(t){V&&(V.style.opacity="0"),le&&(le.style.opacity="0"),xe&&(xe.style.opacity="0");const a=document.getElementById("hero5-banner");a&&(a.style.backgroundImage=`url('${t.image}')`),setTimeout(()=>{V&&(V.innerText=t.title,V.style.opacity="1"),le&&(le.innerText=t.tag,le.style.opacity="1"),xe&&(xe.innerText=t.desc,xe.style.opacity="1")},300)}}function Qe(){te=setInterval(()=>{G=(G+1)%we.length,Q(G)},1e4)}function De(){clearInterval(te),Qe()}C.forEach((e,t)=>{e.addEventListener("click",()=>{G=t,Q(t),De()})}),Qe();const Et=e=>{let t=document.getElementById("share-toast");t||(t=document.createElement("div"),t.id="share-toast",t.style.cssText=`
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
            `,document.body.appendChild(t)),t.innerText=`🔗 Copied share link for "${e}"!`,t.style.opacity="1",t.style.transform="translateY(0)",setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)"},2500)},Tt=(e=document)=>{e.querySelectorAll(".card-favorite-btn").forEach(o=>{o.addEventListener("click",n=>{n.stopPropagation(),n.preventDefault(),o.innerText==="♡"?(o.innerText="♥",o.style.color="#ef4444"):(o.innerText="♡",o.style.color="")})}),e.querySelectorAll(".card-share-btn").forEach(o=>{o.addEventListener("click",n=>{n.stopPropagation(),n.preventDefault();const s=o.closest(".travel-card"),i=s?s.querySelector(".card-title").innerText:o.dataset.title||"Package",d=window.location.origin+window.location.pathname+"#package-"+encodeURIComponent(i);navigator.clipboard.writeText(d).then(()=>{Et(i)}).catch(()=>{Et(i)})})})};Tt();const Me=(e,t,a,o)=>{const n=document.querySelectorAll(e),s=document.getElementById(t);s&&n.forEach(i=>{i.addEventListener("click",()=>{n.forEach(g=>g.classList.remove("active")),i.classList.add("active");const d=i.dataset.category,c=a[d]||[];s.style.opacity="0",setTimeout(()=>{s.innerHTML="",c.forEach(g=>{s.innerHTML+=o(g)}),Tt(s),J(),Array.from(s.children).forEach((g,u)=>{g.style.opacity="0",g.style.transform="translateY(15px)",g.style.transition="all 0.4s ease-out",setTimeout(()=>{g.style.opacity="1",g.style.transform="translateY(0)"},u*100)}),s.style.opacity="1"},250)})})},ut=e=>`
        <div class="travel-card">
            <div class="card-img-wrap" style="background-image: url('${e.bg}')">
                ${e.visa?`<span class="visa-badge">${e.visa}</span>`:""}
                <button class="card-share-btn" data-title="${e.title}">🔗</button>
                <button class="card-favorite-btn">♡</button>
            </div>
            <div class="card-details">
                <div class="card-meta">
                    <span>📍 ${e.type}</span>
                    <span>${e.duration}</span>
                </div>
                <h3 class="card-title">${e.title}</h3>
                <div class="card-footer">
                    <div class="card-rating">⭐ ${e.rating}</div>
                    <div class="card-price">${e.price}</div>
                </div>
            </div>
        </div>
    `,xa=e=>`
        <div class="experience-card">
            <div class="experience-card-bg" style="background-image: url('${e.bg}')"></div>
            <div class="experience-content">
                <h3>${e.title}</h3>
                <span>${e.count}</span>
            </div>
        </div>
    `;Me(".dest-tab","destination-grid",{mountains:[{title:"Leh Ladakh Bike Expedition",type:"Mountain",duration:"6 Days",rating:"4.8",price:"₹22,999",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Manali Luxury Cedar Chalet",type:"Mountain",duration:"4 Days",rating:"4.7",price:"₹12,999",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Kedarnath Pilgrimage Trail Lodge",type:"Mountain",duration:"5 Days",rating:"4.8",price:"₹18,999",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Gulmarg Snow Igloo Couples Escape",type:"Mountain",duration:"4 Days",rating:"4.5",price:"₹15,999",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"}],beaches:[{title:"Goa Beachfront Honeymoon Villa",type:"Beach",duration:"5 Days",rating:"4.9",price:"₹14,999",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Varkala Cliffside Solo Backpacker",type:"Beach",duration:"4 Days",rating:"4.8",price:"₹11,499",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Havelock Island Beach Resort",type:"Beach",duration:"6 Days",rating:"4.9",price:"₹28,999",bg:"https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=400&q=80"},{title:"Gokarna Surf & Cliffs Expedition",type:"Beach",duration:"3 Days",rating:"4.6",price:"₹8,499",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"}]},ut),Me(".exp-tab","experience-grid",{adventure:[{title:"Trekking Peaks",count:"6 Packages",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"River Rafting Rapids",count:"8 Packages",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Bungee Jumping",count:"5 Packages",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Scuba Diving reefs",count:"8 Packages",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"}],nature:[{title:"Forest Safaris",count:"12 Packages",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Flower Valleys",count:"4 Packages",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Lake House Retreats",count:"7 Packages",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Bird Sanctuary",count:"3 Packages",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}]},xa),Me(".style-tab","style-grid",{"style-group":[{title:"Solo Backpacking",count:"14 Packages",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Couple Getaways",count:"22 Packages",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Family Resorts",count:"18 Packages",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Friends Roadtrips",count:"10 Packages",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"}]},xa),Me(".budget-tab","budget-grid",{"under-10k":[{title:"Varkala Cliffside Solo Backpacker",type:"Coastal",duration:"5 Days",rating:"4.6",price:"₹8,999",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Ooty Botanical Gardens Retreat",type:"Colonial",duration:"3 Days",rating:"4.7",price:"₹6,499",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Kasol Parvati Valley Solo Cabin",type:"Hills",duration:"4 Days",rating:"4.8",price:"₹7,999",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Coorg Coffee Estate Solo Villa",type:"Estate",duration:"3 Days",rating:"4.5",price:"₹9,999",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"}],"under-5k":[{title:"Rishikesh Forest Yoga Ashram",type:"Weekend Escape",duration:"2 Days",rating:"4.4",price:"₹3,499",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Varanasi Ganges Twilight Ritual",type:"Trek",duration:"1 Day",rating:"4.5",price:"₹1,299",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Tirupati Balaji Darshan Family Package",type:"Drive",duration:"2 Days",rating:"4.6",price:"₹4,999",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Amritsar Golden Temple Solo Peace",type:"Adventure day",duration:"1 Day",rating:"4.7",price:"₹3,999",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"}],luxury:[{title:"Maldives Overwater Romantic Bungalow",type:"Luxury Escape",duration:"5 Days",rating:"4.9",price:"₹1,20,000",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Singapore Sentosa Island Family Fun",type:"Family Adventure",duration:"6 Days",rating:"4.8",price:"₹55,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Dubai Marina Yacht Luxury Suite",type:"Luxury Escape",duration:"5 Days",rating:"4.9",price:"₹68,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Ananda Himalayas Spiritual Wellness",type:"Spiritual Escape",duration:"7 Days",rating:"4.8",price:"₹75,000",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}],premium:[{title:"Goa Beachfront Honeymoon Villa",type:"Premium Stay",duration:"5 Days",rating:"4.9",price:"₹28,000",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Gokarna Surf & Cliffs Expedition",type:"Adventure beach",duration:"4 Days",rating:"4.8",price:"₹28,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Havelock Island Beach Resort",type:"Premium Resort",duration:"6 Days",rating:"4.9",price:"₹28,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Leh Ladakh Bike Expedition",type:"Mountain Trail",duration:"6 Days",rating:"4.8",price:"₹22,999",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}]},ut),Me(".seasonal-tab","seasonal-grid",{monsoon:[{title:"Wayanad Treehouse Escape",type:"Monsoon",duration:"5 Days",rating:"4.9",price:"₹17,499",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Jim Corbett Wildlife Jeep Safari",type:"Monsoon",duration:"4 Days",rating:"4.8",price:"₹13,999",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Kabini Riverfront Luxury Lodge",type:"Monsoon",duration:"3 Days",rating:"4.7",price:"₹9,999",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Hemkund Sahib Alpine Trek",type:"Monsoon",duration:"2 Days",rating:"4.5",price:"₹4,899",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}],winter:[{title:"Gulmarg Snow Igloo Couples Escape",type:"Winter Peaks",duration:"4 Days",rating:"4.5",price:"₹32,000",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Shimla Mall Road Family Suite",type:"Hills Retreat",duration:"5 Days",rating:"4.6",price:"₹18,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Leh Ladakh Bike Expedition",type:"High Altitude",duration:"6 Days",rating:"4.8",price:"₹22,999",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Manali Luxury Cedar Chalet",type:"Snow Chalet",duration:"4 Days",rating:"4.7",price:"₹24,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"}],summer:[{title:"Goa Beachfront Honeymoon Villa",type:"Beaches",duration:"5 Days",rating:"4.9",price:"₹28,000",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Marari Beach Family Oasis",type:"Coastal Oasis",duration:"4 Days",rating:"4.8",price:"₹22,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Gokarna Surf & Cliffs Expedition",type:"Adventure Beach",duration:"4 Days",rating:"4.8",price:"₹28,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Havelock Island Beach Resort",type:"Tropical Island",duration:"6 Days",rating:"4.9",price:"₹28,000",bg:"https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=400&q=80"}],spring:[{title:"Ooty Botanical Gardens Retreat",type:"Spring Hills",duration:"5 Days",rating:"4.6",price:"₹14,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Wayanad Treehouse Escape",type:"Nature retreat",duration:"5 Days",rating:"4.8",price:"₹18,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Coorg Coffee Estate Solo Villa",type:"Estate retreat",duration:"4 Days",rating:"4.7",price:"₹16,000",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Ananda Himalayas Spiritual Wellness",type:"Spiritual retreat",duration:"7 Days",rating:"4.8",price:"₹75,000",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}]},ut);try{const e=document.querySelector(".curved-trending-section"),t=document.querySelectorAll(".trending-curved-card"),a=document.querySelector(".trending-nav-btn.prev"),o=document.querySelector(".trending-nav-btn.next");if(t.length>0){let n=0;const s=t.length,i=()=>{t.forEach((c,g)=>{const u=(g-n)*(2*Math.PI/s),r=320,b=30,m=Math.cos(u),v=Math.sin(u)*r,y=(1-m)*b,h=Math.sin(u)*-15,T=.88+m*.12,k=Math.round((m+1)*10),L=(1-m)*2,E=m<-.5?Math.max(0,(m+1)*2):1;if(c.style.transform=`translate3d(${v}px, ${y}px, 0) rotate(${h}deg) scale(${T})`,c.style.zIndex=k,c.style.filter=L>0?`blur(${L}px)`:"none",c.style.opacity=E,g===(n%s+s)%s){c.classList.add("center-focus");const U=c.style.backgroundImage;e&&U&&(e.style.backgroundImage=U,e.style.backgroundSize="cover",e.style.backgroundPosition="center",e.style.transition="background-image 0.8s ease-in-out")}else c.classList.remove("center-focus")})};a&&o&&(a.addEventListener("click",()=>{n=(n-1+s)%s,i()}),o.addEventListener("click",()=>{n=(n+1)%s,i()})),i();const d=document.querySelector(".trending-carousel-wrapper");if(d){let c=0;d.addEventListener("wheel",g=>{if(!g.target.closest(".trending-curved-card"))return;g.preventDefault();const r=Date.now();r-c<700||Math.abs(g.deltaY)>3&&(c=r,g.deltaY>0?n=(n+1)%s:n=(n-1+s)%s,i())},{passive:!1})}}}catch(e){console.error("Curved Trending Carousel Error: ",e)}try{document.querySelectorAll(".bespoke-distance-tag").forEach(t=>{setTimeout(()=>{const a=t.dataset.base,o=t.dataset.time,n=t.querySelector(".tag-text"),s=t.querySelector(".pulse-dot");n&&(n.innerText=`📍 Nearby: ${o} drive (${a} km)`),t.classList.remove("calculating"),t.classList.add("calculated"),s&&(s.style.animation="none",s.style.backgroundColor="#10b981")},1800+Math.random()*800)})}catch(e){console.error("Bespoke Distance Calculator Error: ",e)}try{const e=document.getElementById("planner-search-input"),t=document.getElementById("planner-search-btn"),a=document.querySelectorAll(".planner-card"),o=document.querySelectorAll(".suggest-chip"),n=s=>{const i=s.toLowerCase().trim();a.forEach(d=>{const c=d.dataset.tags?d.dataset.tags.toLowerCase():"";i===""||c.includes(i)?(d.style.display="flex",setTimeout(()=>{d.style.opacity="1",d.style.transform="scale(1)"},50)):(d.style.opacity="0",d.style.transform="scale(0.95)",setTimeout(()=>{d.style.display="none"},300))})};e&&e.addEventListener("input",s=>{n(s.target.value)}),t&&e&&t.addEventListener("click",()=>{n(e.value);const s=document.getElementById("explore-planners");s&&s.scrollIntoView({behavior:"smooth",block:"center"})}),o.forEach(s=>{s.addEventListener("click",()=>{const i=s.innerText.trim();e&&(e.value=i),n(i);const d=document.getElementById("explore-planners");d&&d.scrollIntoView({behavior:"smooth",block:"center"})})})}catch(e){console.error("Planner Search Error: ",e)}try{document.querySelectorAll(".planner-card").forEach(t=>{t.addEventListener("mousemove",a=>{const o=t.getBoundingClientRect(),n=a.clientX-o.left,s=a.clientY-o.top,i=o.width/2,d=o.height/2,c=(d-s)/10,g=(n-i)/8;t.style.transform=`rotateX(${c}deg) rotateY(${g}deg)`;const u=t.querySelector(".planner-avatar"),r=t.querySelector(".planner-name"),b=t.querySelector(".planner-specialty"),m=t.querySelector(".planner-desc"),v=t.querySelector(".planner-footer");u&&(u.style.transform=`translate3d(${(n-i)/15}px, ${(s-d)/15}px, 40px)`),r&&(r.style.transform=`translate3d(${(n-i)/22}px, ${(s-d)/22}px, 30px)`),b&&(b.style.transform=`translate3d(${(n-i)/22}px, ${(s-d)/22}px, 30px)`),m&&(m.style.transform=`translate3d(${(n-i)/32}px, ${(s-d)/32}px, 20px)`),v&&(v.style.transform=`translate3d(${(n-i)/40}px, ${(s-d)/40}px, 10px)`)}),t.addEventListener("mouseleave",()=>{t.style.transform="rotateX(0deg) rotateY(0deg)";const a=t.querySelectorAll(".planner-avatar, .planner-name, .planner-specialty, .planner-desc, .planner-footer");a.forEach(o=>{o.style.transform="translate3d(0, 0, 0)",o.style.transition="transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"}),setTimeout(()=>{a.forEach(o=>{o.style.transition=""})},500)})})}catch(e){console.error("Planner 3D Parallax Error: ",e)}try{document.querySelectorAll(".card-favorite-btn").forEach(t=>{const a=t.parentElement;if(a&&!a.querySelector(".card-save-btn")){const o=a.parentElement.querySelector(".card-details")||a.parentElement.querySelector(".trending-card-info")||a.parentElement.querySelector(".bespoke-details"),n=o?o.querySelector(".card-title")||o.querySelector(".bespoke-title"):null,s=n?n.innerText.trim():"Premium Journey",i=document.createElement("button");i.className="card-save-btn",i.dataset.title=s,i.innerHTML='<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',a.insertBefore(i,t)}})}catch(e){console.error("Save Button Injection Error: ",e)}let _=JSON.parse(localStorage.getItem("beacon_saved_packages"))||[];const qe=e=>{const t=_.indexOf(e);t>-1?(_.splice(t,1),showToast("✓ Removed from My Collection")):(_.push(e),showToast("✓ Saved to My Collection")),localStorage.setItem("beacon_saved_packages",JSON.stringify(_)),ot(),Ce(),typeof We=="function"&&We(),typeof lt=="function"&&lt()},Ce=()=>{document.querySelectorAll(".card-save-btn, .card-favorite-btn").forEach(t=>{let a=t.dataset.title;if(!a){const o=t.closest(".travel-card")||t.closest(".trending-curved-card")||t.closest(".bespoke-card"),n=o?o.querySelector(".card-title")||o.querySelector(".bespoke-title"):null;a=n?n.innerText.trim():null}if(a)if(_.includes(a)){t.classList.add("active");const o=t.querySelector("svg path");o&&(o.style.fill="#00CBE0")}else{t.classList.remove("active");const o=t.querySelector("svg path");o&&(o.style.fill="none")}})};document.body.addEventListener("click",e=>{const t=e.target.closest(".card-save-btn");if(t){e.preventDefault(),e.stopPropagation();const n=t.dataset.title;qe(n);return}const a=e.target.closest(".card-favorite-btn");if(a){e.preventDefault(),e.stopPropagation();const n=a.closest(".travel-card")||a.closest(".trending-curved-card")||a.closest(".bespoke-card"),s=n?n.querySelector(".card-title")||n.querySelector(".bespoke-title"):null,i=a.dataset.title||(s?s.innerText.trim():"Premium Journey");a.style.transform="scale(1.3)",setTimeout(()=>{a.style.transform=""},200),qe(i);return}const o=e.target.closest(".card-share-btn");if(o){e.preventDefault(),e.stopPropagation();const n=o.dataset.title||"Premium Journey",s=A.find(i=>i.title===n);s?openShareSheet(s):showToast("Cannot find package info.");return}});let ce="home",Ne="home",ft=null,va={};const O=(e,t=!1)=>{ce&&(va[ce]=window.scrollY),e!=="package-details"&&e!=="planner-profile"&&e!=="mobile-booking"&&e!=="receipt-viewer"&&e!==ce&&(Ne=ce);const a=document.querySelector(".mobile-bottom-nav");a&&(window.innerWidth<768&&(e==="home"||e==="planner"||e==="collection"||e==="trips"||e==="profile")?a.style.display="flex":a.style.display="none"),document.querySelectorAll(".spa-view").forEach(g=>{g.classList.remove("active-view")});const n=document.getElementById(`view-${e}`);n&&n.classList.add("active-view"),document.querySelectorAll(".nav-link-item").forEach(g=>{g.dataset.target===e?g.classList.add("active"):g.classList.remove("active")});const i=document.querySelectorAll(".mobile-bottom-nav .nav-link-item"),d=Array.from(i).findIndex(g=>g.dataset.target===e),c=document.querySelector(".mobile-nav-indicator");if(c&&d!==-1&&(c.style.transform=`translateX(${d*100}%)`),e==="collection"&&(typeof We=="function"&&We(),typeof ao=="function"&&ao()),e==="enquiries"&&typeof window.clearEnquiryNotifications=="function"&&window.clearEnquiryNotifications(),ce=e,window.checkStickyCtaVisibility&&window.checkStickyCtaVisibility(),t)window.scrollTo({top:0,behavior:"instant"});else{const g=va[e]||0;window.scrollTo({top:g,behavior:"instant"})}};document.querySelectorAll(".nav-link-item").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.target;O(a)})});const It=e=>{if(!e)return;O("planner");const t=document.getElementById("match-destination"),a=document.getElementById("match-duration"),o=document.getElementById("match-budget-slider"),n=document.getElementById("match-budget-readout"),s=document.querySelectorAll("#match-trip-styles .multi-chip"),i=document.querySelectorAll('input[name="match-pref"]'),d=document.getElementById("find-my-trip-btn");t&&(t.value=""),a&&(a.value="all"),o&&(o.value=3e5,n&&(n.innerText="₹3,00,000+")),s.forEach(y=>y.classList.remove("active")),i.forEach(y=>y.checked=!1);const c=e.toLowerCase().trim(),g=c.match(/under\s*₹?\s*(\d+)/)||c.match(/budget\s*of\s*₹?\s*(\d+)/)||c.match(/₹?\s*(\d+)/);if(g){const y=g[1],h=parseInt(y);h>=5e3&&o&&(o.value=h,n&&(n.innerText=`₹${h.toLocaleString()}`))}const u=c.match(/(\d+)\s*day/);if(u&&a){const y=parseInt(u[1]);y<=2?a.value="weekend":y>=3&&y<=5?a.value="short":y>=6&&y<=8?a.value="medium":y>=10&&(a.value="long")}else c.includes("weekend")&&a&&(a.value="weekend");const r=["solo","couple","honeymoon","friends","family","adventure","luxury","spiritual","backpacking","nature"];r.forEach(y=>{c.includes(y)&&s.forEach(h=>{h.dataset.style===y&&h.classList.add("active")})});const b=g,m=u||c.includes("day")||c.includes("weekend"),v=r.some(y=>c.includes(y));!b&&!m&&!v&&t&&(t.value=e.charAt(0).toUpperCase()+e.slice(1)),setTimeout(()=>{d&&d.click()},300)},Ze=document.getElementById("panel-search-input"),wa=document.getElementById("panel-search-submit-btn"),go=document.querySelectorAll(".popular-chip"),Bt=document.getElementById("panel-voice-btn");wa&&Ze&&(wa.addEventListener("click",()=>{const e=Ze.value.trim();It(e)}),Ze.addEventListener("keypress",e=>{if(e.key==="Enter"){const t=Ze.value.trim();It(t)}})),go.forEach(e=>{e.addEventListener("click",()=>{const t=e.innerText.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,"").trim();It(t)})}),Bt&&Bt.addEventListener("click",()=>{showToast("🎙️ Active Listening... Speak your destination or budget!"),Bt.classList.add("active-listen-glow"),setTimeout(()=>{Bt.classList.remove("active-listen-glow");const e="Honeymoon under ₹50,000";Ze&&(Ze.value=e),It(e)},2500)});const ka=document.querySelectorAll(".view-mode-tab"),Ft=document.querySelectorAll(".search-mode-container"),Se=document.getElementById("compare-tab-btn"),uo=()=>{try{return(JSON.parse(localStorage.getItem("beacon_planner_packages"))||[]).filter(t=>t.status==="published").map(t=>{const a=t.priceNum||(t.price?t.price>1e4?t.price:t.price*85:25e3),o=typeof t.duration=="number"?t.duration:parseInt(t.duration)||5;return{title:t.title,imgUrl:t.image||t.imgUrl||"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",priceStr:t.priceStr||"₹"+a.toLocaleString(),priceNum:a,duration:o,category:t.category||t.destination&&t.destination.toLowerCase()||"beaches",rating:"⭐ "+(t.rating||5),reviews:t.reviews||12,style:t.style||"couple",experiences:t.experiences||"sightseeing",transport:t.transport||"flight",accommodation:t.accommodation||"resort",offers:t.offers||"cancellation",highlights:t.highlights||t.description||"Beautiful travel package created by our planner partners.",meals:t.meals||"Breakfast Included",sightseeing:t.sightseeing||t.destination||"Local sightseeing tours",transfers:t.transfers||"Airport pickup & drop cabs",cancellation:t.cancellation||"Free cancellation within 24 hours",hotelName:t.hotelName||"Luxury Resort Accommodations",hotelAddress:t.hotelAddress||t.destination||"Premium partner property",latitude:t.lat||t.latitude||5.69,longitude:t.lng||t.longitude||73.31,inclusions:Array.isArray(t.inclusions)?t.inclusions.join(", "):t.inclusions||"Stay, transfers, dinners",exclusions:Array.isArray(t.exclusions)?t.exclusions.join(", "):t.exclusions||"Flight fares, Personal shopping",bookingsCount:t.bookings||0,isPlannerAdded:!0}})}catch(e){return console.error("Failed to parse planner packages",e),[]}};let fo=[{title:"Goa Beachfront Honeymoon Villa",imgUrl:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",priceStr:"₹28,000",priceNum:28e3,duration:5,category:"beaches",rating:"⭐ 4.9",reviews:142,style:"couple",experiences:"watersports",transport:"flight",accommodation:"resort",offers:"cancellation",highlights:"Private beach access, candlelit dinner, sunset yacht cruise",meals:"All Inclusive",sightseeing:"Calangute Beach, Fort Aguada, Dudhsagar Falls",transfers:"Airport private cab",cancellation:"Free cancellation within 24 hours",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Marari Beach Family Oasis",imgUrl:"https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=600&q=80",priceStr:"₹22,000",priceNum:22e3,duration:4,category:"beaches",rating:"⭐ 4.8",reviews:98,style:"family",experiences:"cultural",transport:"train",accommodation:"resort",offers:"emi",highlights:"Beachside volleyball, family organic garden tour, traditional cooking class",meals:"Full Board",sightseeing:"Marari beach, Alleppey backwaters, Arthunkal Church",transfers:"Station shuttle",cancellation:"Free cancellation within 48 hours",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Gokarna Surf & Cliffs Expedition",imgUrl:"https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",priceStr:"₹12,500",priceNum:12500,duration:3,category:"beaches",rating:"⭐ 4.7",reviews:115,style:"adventure",experiences:"adventure",transport:"bus",accommodation:"homestay",offers:"instant",highlights:"Professional surfing lessons, beach trekking, cliffside camping",meals:"Breakfast",sightseeing:"Om Beach, Half Moon Beach, Paradise Beach",transfers:"Local guide driver",cancellation:"Non-refundable promo",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Havelock Island Beach Resort",imgUrl:"https://images.unsplash.com/photo-1589979482837-e74f2e145060?auto=format&fit=crop&w=600&q=80",priceStr:"₹75,000",priceNum:75e3,duration:5,category:"beaches",rating:"⭐ 5.0",reviews:64,style:"luxury",experiences:"scuba",transport:"flight",accommodation:"villa",offers:"cancellation",highlights:"Private villa pool, scuba diving certification, coral reef exploration",meals:"All Inclusive",sightseeing:"Radhanagar Beach, Elephant Beach, Kalapathar Beach",transfers:"Private jetty transfer",cancellation:"Free cancellation within 7 days",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Puri Beach Temple Sanctuary",imgUrl:"https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",priceStr:"₹9,500",priceNum:9500,duration:3,category:"beaches",rating:"⭐ 4.6",reviews:82,style:"spiritual",experiences:"temple",transport:"train",accommodation:"hotel",offers:"instant",highlights:"Special VIP darshan slot, beach arati viewing, temple prasad meals",meals:"Full Board",sightseeing:"Jagannath Temple, Puri Beach, Konark Sun Temple",transfers:"Station cab transfer",cancellation:"Free cancellation within 24 hours",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Varkala Cliffside Solo Backpacker",imgUrl:"https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",priceStr:"₹6,800",priceNum:6800,duration:4,category:"beaches",rating:"⭐ 4.8",reviews:73,style:"solo",experiences:"backwaters",transport:"train",accommodation:"hostel",offers:"instant",highlights:"Cliffside hostel stay, daily morning yoga, cafe crawling vouchers",meals:"Breakfast",sightseeing:"Varkala Beach, Janardhana Swami Temple, Edava Beach",transfers:"Self-driven scooter",cancellation:"Non-refundable promo",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Gulmarg Snow Igloo Couples Escape",imgUrl:"https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=600&q=80",priceStr:"₹42,000",priceNum:42e3,duration:5,category:"mountains",rating:"⭐ 4.9",reviews:110,style:"couple",experiences:"snow",transport:"flight",accommodation:"villa",offers:"cancellation",highlights:"Stay in luxury heated snow igloo, private Gondola ride, ski lesson",meals:"Half Board",sightseeing:"Gulmarg Gondola, Apharwat Peak, Strawberry Valley",transfers:"Airport private 4x4",cancellation:"Free cancellation within 5 days",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Shimla Mall Road Family Suite",imgUrl:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",priceStr:"₹18,500",priceNum:18500,duration:4,category:"mountains",rating:"⭐ 4.7",reviews:154,style:"family",experiences:"snow",transport:"train",accommodation:"hotel",offers:"emi",highlights:"Toy train ride ticket, heritage walk tour, bonfire night",meals:"Breakfast",sightseeing:"The Ridge, Jakhoo Temple, Kufri Fun World",transfers:"Station shuttle",cancellation:"Free cancellation within 24 hours",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Leh Ladakh Bike Expedition",imgUrl:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",priceStr:"₹32,000",priceNum:32e3,duration:7,category:"mountains",rating:"⭐ 4.9",reviews:235,style:"adventure",experiences:"adventure",transport:"selfdrive",accommodation:"camp",offers:"cancellation",highlights:"Royal Enfield rental, high mountain pass crossings, lake camping",meals:"All Inclusive",sightseeing:"Pangong Lake, Khardung La, Nubra Valley",transfers:"Backup vehicle mechanic",cancellation:"Free cancellation within 7 days",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Manali Luxury Cedar Chalet",imgUrl:"https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",priceStr:"₹65,000",priceNum:65e3,duration:5,category:"mountains",rating:"⭐ 4.9",reviews:88,style:"luxury",experiences:"snow",transport:"flight",accommodation:"villa",offers:"cancellation",highlights:"Private cedar forest chalet, hot spring baths, fine dining dining",meals:"All Inclusive",sightseeing:"Solang Valley, Hadimba Temple, Jogini Waterfall",transfers:"Airport private cab",cancellation:"Free cancellation within 24 hours",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Kedarnath Pilgrimage Trail Lodge",imgUrl:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",priceStr:"₹11,500",priceNum:11500,duration:4,category:"mountains",rating:"⭐ 4.8",reviews:210,style:"spiritual",experiences:"temple",transport:"train",accommodation:"hotel",offers:"instant",highlights:"Pre-booked helper/pony slots, biometric pass, special puja booking",meals:"Full Board",sightseeing:"Kedarnath Temple, Bhairav Temple, Gauri Kund",transfers:"Trek start shuttle",cancellation:"Non-refundable promo",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Kasol Parvati Valley Solo Cabin",imgUrl:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",priceStr:"₹7,500",priceNum:7500,duration:3,category:"mountains",rating:"⭐ 4.7",reviews:128,style:"solo",experiences:"nature",transport:"bus",accommodation:"homestay",offers:"instant",highlights:"Wood cabin riverside, trek guiding to Chalal, cafe vouchers",meals:"Breakfast",sightseeing:"Parvati River, Manikaran Sahib, Tosh Village",transfers:"Self-driven scooter",cancellation:"Non-refundable promo",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Wayanad Treehouse Escape",imgUrl:"https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80",priceStr:"₹24,000",priceNum:24e3,duration:3,category:"nature",rating:"⭐ 4.8",reviews:92,style:"couple",experiences:"forest",transport:"flight",accommodation:"resort",offers:"cancellation",highlights:"Luxury high-rise treehouse stay, private forest walk, waterfall bath",meals:"Breakfast",sightseeing:"Edakkal Caves, Banasura Sagar Dam, Chembra Peak",transfers:"Airport private cab",cancellation:"Free cancellation within 24 hours",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Ooty Botanical Gardens Retreat",imgUrl:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",priceStr:"₹14,000",priceNum:14e3,duration:4,category:"nature",rating:"⭐ 4.6",reviews:138,style:"family",experiences:"lakes",transport:"train",accommodation:"hotel",offers:"emi",highlights:"Private boat ride in Ooty lake, pine forest walk, tea factory tour",meals:"Breakfast",sightseeing:"Ooty Lake, Doddabetta Peak, Rose Garden",transfers:"Station shuttle",cancellation:"Free cancellation within 24 hours",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Jim Corbett Wildlife Jeep Safari",imgUrl:"https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",priceStr:"₹16,500",priceNum:16500,duration:3,category:"nature",rating:"⭐ 4.7",reviews:182,style:"adventure",experiences:"wildlife",transport:"bus",accommodation:"resort",offers:"instant",highlights:"Two jungle jeep safaris, expert naturalist guide, river rafting",meals:"Full Board",sightseeing:"Corbett Tiger Reserve, Garjiya Devi Temple, Corbett Falls",transfers:"Resort shuttle",cancellation:"Free cancellation within 48 hours",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Kabini Riverfront Luxury Lodge",imgUrl:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",priceStr:"₹85,000",priceNum:85e3,duration:5,category:"nature",rating:"⭐ 5.0",reviews:46,style:"luxury",experiences:"wildlife",transport:"flight",accommodation:"villa",offers:"cancellation",highlights:"Private pool cottage, boat safari, premium tiger tracking guides",meals:"All Inclusive",sightseeing:"Kabini River, Nagarhole National Park, Backwaters",transfers:"Airport private cab",cancellation:"Free cancellation within 7 days",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Rishikesh Forest Yoga Ashram",imgUrl:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",priceStr:"₹8,000",priceNum:8e3,duration:5,category:"nature",rating:"⭐ 4.8",reviews:194,style:"spiritual",experiences:"cultural",transport:"train",accommodation:"homestay",offers:"instant",highlights:"Daily yoga classes, organic vegan diet, meditation hall, forest walks",meals:"All Inclusive",sightseeing:"Triveni Ghat, Laxman Jhula, Beatles Ashram",transfers:"Station shuttle",cancellation:"Free cancellation within 24 hours",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Coorg Coffee Estate Solo Villa",imgUrl:"https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",priceStr:"₹10,500",priceNum:10500,duration:4,category:"nature",rating:"⭐ 4.7",reviews:84,style:"solo",experiences:"forest",transport:"train",accommodation:"homestay",offers:"instant",highlights:"Stay inside working coffee plantation, hiking trail guides, bonfire",meals:"Breakfast",sightseeing:"Abbey Falls, Raja's Seat, Dubare Elephant Camp",transfers:"Self-driven scooter",cancellation:"Non-refundable promo",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Varanasi Ganges Twilight Ritual",imgUrl:"https://images.unsplash.com/photo-1561361062-856c4ab3d997?auto=format&fit=crop&w=600&q=80",priceStr:"₹15,000",priceNum:15e3,duration:3,category:"spiritual",rating:"⭐ 4.9",reviews:230,style:"couple",experiences:"temple",transport:"flight",accommodation:"hotel",offers:"cancellation",highlights:"Private boat for Ganga Arati, early morning subah-e-banaras tour",meals:"Breakfast",sightseeing:"Kashi Vishwanath Temple, Dashashwamedh Ghat, Sarnath",transfers:"Airport private cab",cancellation:"Free cancellation within 24 hours",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Tirupati Balaji Darshan Family Package",imgUrl:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",priceStr:"₹12,000",priceNum:12e3,duration:3,category:"spiritual",rating:"⭐ 4.8",reviews:312,style:"family",experiences:"temple",transport:"train",accommodation:"hotel",offers:"instant",highlights:"Confirmed Special Entry Darshan Tickets, laddu prasadam, local temples",meals:"Full Board",sightseeing:"Tirumala Venkateswara Temple, Padmavathi Temple, Kapila Theertham",transfers:"Station private cab",cancellation:"Non-refundable promo",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Hemkund Sahib Alpine Trek",imgUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",priceStr:"₹18,000",priceNum:18e3,duration:5,category:"spiritual",rating:"⭐ 4.8",reviews:76,style:"adventure",experiences:"adventure",transport:"train",accommodation:"hotel",offers:"emi",highlights:"Guided alpine trek, stay at base camp, scenic mountain photography",meals:"Full Board",sightseeing:"Hemkund Sahib, Valley of Flowers, Joshimath",transfers:"Trek start shuttle",cancellation:"Free cancellation within 48 hours",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Ananda Himalayas Spiritual Wellness",imgUrl:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",priceStr:"₹1,20,000",priceNum:12e4,duration:5,category:"spiritual",rating:"⭐ 5.0",reviews:34,style:"luxury",experiences:"spa",transport:"flight",accommodation:"resort",offers:"cancellation",highlights:"Palace estate stay, personalized wellness consult, luxury spa therapies",meals:"All Inclusive",sightseeing:"Rishikesh ghats, Haridwar arati, Himalayan trails",transfers:"Airport private cab",cancellation:"Free cancellation within 14 days",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Haridwar Meditation & Yoga Ashram",imgUrl:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",priceStr:"₹6,500",priceNum:6500,duration:4,category:"spiritual",rating:"⭐ 4.7",reviews:142,style:"spiritual",experiences:"cultural",transport:"train",accommodation:"homestay",offers:"instant",highlights:"Ashram meditation halls, ganga river dip escort, daily sat-sang talks",meals:"All Inclusive",sightseeing:"Har Ki Pauri, Mansa Devi Temple, Chandi Devi Temple",transfers:"Station shuttle",cancellation:"Free cancellation within 24 hours",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Amritsar Golden Temple Solo Peace",imgUrl:"https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=600&q=80",priceStr:"₹5,500",priceNum:5500,duration:2,category:"spiritual",rating:"⭐ 4.9",reviews:119,style:"solo",experiences:"cultural",transport:"train",accommodation:"hotel",offers:"instant",highlights:"Night darshan entry, Langar kitchen service volunteer slot, Wagah border",meals:"Breakfast",sightseeing:"Golden Temple, Jallianwala Bagh, Wagah Border",transfers:"Station cab transfer",cancellation:"Free cancellation within 24 hours",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Maldives Overwater Romantic Bungalow",imgUrl:"https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",priceStr:"₹1,35,000",priceNum:135e3,duration:5,category:"international",rating:"⭐ 5.0",reviews:167,style:"couple",experiences:"scuba",transport:"flight",accommodation:"resort",offers:"cancellation",highlights:"Overwater villa stay, private sea access, couples lagoon massage",meals:"All Inclusive",sightseeing:"Male Atoll, Coral Reefs, Sandbank picnic",transfers:"Speedboat private return",cancellation:"Free cancellation within 7 days",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Singapore Sentosa Island Family Fun",imgUrl:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",priceStr:"₹88,000",priceNum:88e3,duration:6,category:"international",rating:"⭐ 4.8",reviews:142,style:"family",experiences:"city",transport:"flight",accommodation:"hotel",offers:"emi",highlights:"Universal Studios tickets, Gardens by the Bay passes, night safari",meals:"Breakfast",sightseeing:"Sentosa Island, Marina Bay Sands, Universal Studios",transfers:"Airport private shuttle",cancellation:"Free cancellation within 3 days",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Nepal Everest Base Camp Trek",imgUrl:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",priceStr:"₹48,000",priceNum:48e3,duration:7,category:"international",rating:"⭐ 4.9",reviews:182,style:"adventure",experiences:"trekking",transport:"flight",accommodation:"hotel",offers:"cancellation",highlights:"Experienced Sherpa guides, hot tea-house stays, scenic mountain flight",meals:"All Inclusive",sightseeing:"Lukla Airport, Namche Bazaar, Everest Base Camp",transfers:"Airport heli pickup",cancellation:"Free cancellation within 10 days",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Dubai Marina Yacht Luxury Suite",imgUrl:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",priceStr:"₹1,15,000",priceNum:115e3,duration:4,category:"international",rating:"⭐ 4.9",reviews:92,style:"luxury",experiences:"city",transport:"flight",accommodation:"hotel",offers:"cancellation",highlights:"Burj Khalifa 148th floor VIP slots, desert safari luxury dune dinner",meals:"Half Board",sightseeing:"Burj Khalifa, Palm Jumeirah, Dubai Mall",transfers:"Limousine return shuttle",cancellation:"Free cancellation within 5 days",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Bali Ubud Sacred Temples Retreat",imgUrl:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",priceStr:"₹62,000",priceNum:62e3,duration:6,category:"international",rating:"⭐ 4.8",reviews:154,style:"spiritual",experiences:"temple",transport:"flight",accommodation:"resort",offers:"emi",highlights:"Sacred water purification ritual, private yoga classes, rice terrace walks",meals:"Breakfast",sightseeing:"Ubud Monkey Forest, Tanah Lot Temple, Tegallalang Rice Terraces",transfers:"Airport private cab",cancellation:"Free cancellation within 48 hours",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Thailand Solo Backpacking Explorer",imgUrl:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",priceStr:"₹32,000",priceNum:32e3,duration:7,category:"international",rating:"⭐ 4.7",reviews:204,style:"solo",experiences:"beaches",transport:"flight",accommodation:"hostel",offers:"instant",highlights:"Island hopping tour, hostel welcome crawl, street food vouchers",meals:"Breakfast",sightseeing:"Bangkok Grand Palace, Phi Phi Islands, Chiang Mai Night Bazaar",transfers:"Local scooter rental",cancellation:"Free cancellation within 24 hours",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42}];A=[...uo(),...fo],ka.forEach(e=>{e.addEventListener("click",()=>{ka.forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.mode;Ft.forEach(a=>{a.classList.remove("active-mode"),a.id===`search-${t}-container`&&a.classList.add("active-mode")}),t==="compare"&&xo()})});let ne=1e3,ie=15e4;const Be=document.getElementById("match-budget-min"),Le=document.getElementById("match-budget-max");document.getElementById("slider-track");const Sa=document.getElementById("match-budget-readout"),ue=document.getElementById("match-start-date"),se=document.getElementById("match-end-date"),W=document.getElementById("match-duration"),Lt=document.querySelectorAll(".trip-type-card"),jt=document.getElementById("expand-preferences-btn"),Ut=document.getElementById("preferences-expanded-content"),Ea=document.getElementById("find-my-trip-btn"),mt=document.getElementById("quick-search-input"),Ta=document.getElementById("quick-search-submit-btn"),Ht=document.querySelectorAll("#quick-search-chips .category-chip"),yt=document.getElementById("ai-matchmaker-results-section"),$t=document.getElementById("ai-matchmaker-cards-grid"),Ia=["✨ Tell me your dream destination.","🏖 Looking for a relaxing beach holiday?","⛰ Discover hidden mountain escapes.","🎒 Planning a trip with friends?","❤️ Find the perfect honeymoon package."];let Ot=0;const et=document.getElementById("ai-prompt-text");et&&setInterval(()=>{et.classList.add("fade-out"),setTimeout(()=>{Ot=(Ot+1)%Ia.length,et.innerText=Ia[Ot],et.classList.remove("fade-out"),et.classList.add("fade-in"),setTimeout(()=>et.classList.remove("fade-in"),400)},400)},4e3);const Gt=e=>e>=15e4?"₹1,50,000+":"₹"+e.toLocaleString("en-IN"),Re=()=>{const e=document.getElementById("match-destination")?document.getElementById("match-destination").value.trim():"",t=ue?ue.value:"",a=se?se.value:"",o=W?W.value:"all",n=ne,s=ie,i=Array.from(Lt).filter(v=>v.classList.contains("selected")).map(v=>v.dataset.style),d=document.getElementById("summary-dest");d&&(d.innerText=e||"Anywhere");const c=document.getElementById("summary-dates");if(c)if(t&&a){const v={month:"short",day:"numeric"},y=new Date(t).toLocaleDateString("en-US",v),h=new Date(a).toLocaleDateString("en-US",v);c.innerText=`${y} - ${h}`}else o!=="all"?c.innerText=`${o} Days (approx)`:c.innerText="Flexible";const g=document.getElementById("summary-budget");g&&(n===5e3&&s===3e5?g.innerText="Any Budget":g.innerText=`₹${n.toLocaleString()} - ₹${s.toLocaleString()}`);const u=document.getElementById("summary-type");u&&(i.length>0?u.innerText=i.map(v=>v.charAt(0).toUpperCase()+v.slice(1)).join(", "):u.innerText="Flexible");let r=60;e&&(r+=10),t&&a?r+=10:o!=="all"&&(r+=5),(n>5e3||s<3e5)&&(r+=10),i.length>0&&(r+=10),r=Math.min(99,r);const b=document.getElementById("summary-confidence"),m=document.getElementById("summary-confidence-bar");b&&(b.innerText=`${r}% Fit`),m&&(m.style.width=`${r}%`)},Ve=()=>{if(!Sa)return;Be&&document.activeElement!==Be&&(Be.value=ne),Le&&document.activeElement!==Le&&(Le.value=ie);const e=ie>=15e4?"₹1,50,000+":Gt(ie);Sa.innerHTML=`${Gt(ne)} – ${e}`,Re(),document.getElementById("budget-slider-track");const t=document.getElementById("budget-slider-range"),a=document.getElementById("budget-thumb-min"),o=document.getElementById("budget-thumb-max"),n=document.getElementById("thumb-value-min"),s=document.getElementById("thumb-value-max");if(a&&o&&t){const c=(ne-1e3)/149e3*100,g=(ie-1e3)/149e3*100;a.style.left=`${c}%`,o.style.left=`${g}%`,t.style.left=`${c}%`,t.style.width=`${g-c}%`,n&&(n.innerText=Gt(ne)),s&&(s.innerText=e)}};Be&&Le&&(Be.addEventListener("change",()=>{let e=parseInt(Be.value)||1e3;e=Math.round((e-1e3)/2e3)*2e3+1e3,e=Math.max(1e3,Math.min(e,ie-2e3)),Be.value=e,ne=e,Ve()}),Le.addEventListener("change",()=>{let e=parseInt(Le.value)||15e4;e=Math.round((e-1e3)/2e3)*2e3+1e3,e=Math.max(ne+2e3,Math.min(e,15e4)),Le.value=e,ie=e,Ve()})),Ve();const Fe=document.getElementById("match-destination");if(Fe){let e=document.getElementById("btn-clear-dest");e||(e=document.createElement("span"),e.id="btn-clear-dest",e.innerHTML="&times;",e.style.cssText="color: var(--text-slate); font-size: 20px; font-weight: 800; cursor: pointer; display: none; margin-left: 6px; padding: 0 4px; line-height: 1;",Fe.parentElement.appendChild(e),e.addEventListener("click",a=>{a.stopPropagation(),Fe.value="",Fe.placeholder="Anywhere",e.style.display="none",Re(),typeof $e=="function"&&$e(null,null,null)}));const t=()=>{e.style.display=Fe.value.length>0?"inline-block":"none"};Fe.addEventListener("input",t),Fe.addEventListener("change",t)}const _t=document.getElementById("btn-flexible-dates-mobile"),Ba=document.getElementById("btn-flexible-dates");_t&&Ba&&_t.addEventListener("click",e=>{Ba.click(),_t.classList.add("active"),showToast("📅 Selected Flexible Dates")});const bt=document.querySelectorAll(".duration-chip-m"),je=document.getElementById("match-duration");bt.length>0&&je&&(bt.forEach(e=>{e.addEventListener("click",()=>{bt.forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.value;if(t==="custom"){const a=prompt("Enter custom duration (number of days):","5"),o=parseInt(a);!isNaN(o)&&o>0?(e.innerText=`${o} Days`,je.value=o):(e.classList.remove("active"),document.querySelector('.duration-chip-m[data-value="all"]').classList.add("active"),je.value="all")}else{const a=document.getElementById("duration-chip-m-custom");a&&(a.innerText="Custom"),je.value=t}je.dispatchEvent(new Event("change"))})}),je.addEventListener("change",()=>{var a;const e=je.value;bt.forEach(o=>o.classList.remove("active"));const t=Array.from(bt).find(o=>o.dataset.value===e);if(t)t.classList.add("active");else if(e!=="all"){const o=document.getElementById("duration-chip-m-custom");o&&(o.classList.add("active"),o.innerText=`${e} Days`)}else(a=document.querySelector('.duration-chip-m[data-value="all"]'))==null||a.classList.add("active")})),setTimeout(()=>{const e=document.getElementById("budget-thumb-min"),t=document.getElementById("budget-thumb-max");if(!e||!t)return;const a=1e3,o=15e4,n=2e3,s=d=>{const g=e.parentElement.getBoundingClientRect(),u=g.width;let r=(d-g.left)/u;r=Math.max(0,Math.min(1,r));const b=a+r*(o-a),m=Math.round((b-a)/n)*n+a;return Math.max(a,Math.min(o,m))},i=(d,c)=>{const g=u=>{u.preventDefault(),d.classList.add("dragging");const r=m=>{const v=m.touches?m.touches[0].clientX:m.clientX,y=s(v);c==="min"?ne=Math.min(y,ie-n):ie=Math.max(y,ne+n),Ve()},b=()=>{d.classList.remove("dragging"),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",b),document.removeEventListener("touchmove",r),document.removeEventListener("touchend",b)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",b),document.addEventListener("touchmove",r,{passive:!1}),document.addEventListener("touchend",b)};d.addEventListener("mousedown",g),d.addEventListener("touchstart",g,{passive:!1})};i(e,"min"),i(t,"max")},300);const zt=document.getElementById("planner-sticky-cta-wrap"),Ct=document.getElementById("btn-planner-sticky-cta"),Wt=document.getElementById("find-my-trip-btn");zt&&Ct&&Wt&&(Ct.addEventListener("click",()=>{Wt.click(),Ct.style.transform="scale(0.98)",setTimeout(()=>{Ct.style.transform=""},150)}),window.checkStickyCtaVisibility=()=>{if(ce!=="planner"){zt.style.display="none";return}const e=Wt.getBoundingClientRect();!(e.top>=0&&e.bottom<=window.innerHeight)&&window.scrollY>150?zt.style.display="block":zt.style.display="none"},window.addEventListener("scroll",window.checkStickyCtaVisibility));const tt=()=>{if(!ue||!se||!W)return;const e=ue.value,t=se.value;if(e&&t){const a=new Date(e),o=new Date(t),n=Math.abs(o-a),s=Math.ceil(n/(1e3*60*60*24));s<=2?W.value="weekend":s<=3?W.value="2-3":s<=5?W.value="4-5":s<=7?W.value="6-7":s<=10?W.value="8-10":W.value="10+"}Re()};ue&&se&&(ue.addEventListener("change",tt),se.addEventListener("change",tt)),W&&W.addEventListener("change",Re);const ke=document.getElementById("match-destination");ke&&ke.addEventListener("input",Re),Lt.forEach(e=>{e.addEventListener("click",()=>{e.classList.toggle("selected"),Re()})}),jt&&Ut&&jt.addEventListener("click",()=>{Ut.classList.toggle("active"),jt.querySelector(".arrow").innerText=Ut.classList.contains("active")?"▲":"▼"}),Ht.forEach(e=>{e.addEventListener("click",()=>{const t=e.classList.contains("active");if(Ht.forEach(a=>a.classList.remove("active")),t)$e(null,null,null);else{e.classList.add("active");const a=e.dataset.category;showToast(`🔎 Filtering category: ${e.innerText}`),$e(a,null,null)}})});const La=e=>{const t=e.toLowerCase().trim();if(!t)return;document.getElementById("match-destination")&&(document.getElementById("match-destination").value=""),Be&&(Be.value=""),Le&&(Le.value=""),ne=1e3,ie=15e4,W&&(W.value="all"),ue&&(ue.value=""),se&&(se.value=""),Lt.forEach(i=>i.classList.remove("selected")),Ht.forEach(i=>i.classList.remove("active"));const a=["goa","kashmir","maldives","bali","thailand","dharamshala","gokarna","munnar","jaisalmer","spiti","alleppey","ooty","pondicherry","hampi"];for(let i of a)if(t.includes(i)){document.getElementById("match-destination")&&(document.getElementById("match-destination").value=i.charAt(0).toUpperCase()+i.slice(1));break}const o=/(?:under|below|less than|budget|₹)?\s?(\d+)(?:\s?(?:k|thousand|000))?/i,n=t.match(o);if(n){let i=parseInt(n[1]);(t.includes(n[1]+"k")||t.includes(n[1]+" k")||i<1e3)&&(i=i*1e3),i>=1e3&&i<=15e4&&(ie=Math.max(ne+2e3,i))}if(t.includes("weekend"))W&&(W.value="weekend");else{const i=/(\d+)\s?(?:day|night)/i,d=t.match(i);if(d){const c=parseInt(d[1]);W&&(c<=3?W.value="2-3":c<=5?W.value="4-5":c<=7?W.value="6-7":c<=10?W.value="8-10":W.value="10+")}}const s={couple:["couple","romantic","honeymoon"],family:["family","kids"],adventure:["adventure","trek","hiking","rafting","thrill"],solo:["solo","backpacking"],luxury:["luxury","resort","premium","5 star"],spiritual:["spiritual","devotion","temple","peace"]};for(let i in s)for(let d of s[i])if(t.includes(d)){const c=document.querySelector(`.trip-type-card[data-style="${i}"]`);c&&c.classList.add("selected");break}Ve(),showToast("🔮 AI parsed search preferences!"),$e(null,null,null)};mt&&mt.addEventListener("keypress",e=>{e.key==="Enter"&&La(mt.value)}),Ta&&mt&&Ta.addEventListener("click",()=>{La(mt.value)});const Jt=["Finding hidden gems...","Comparing thousands of packages...","Checking seasonal prices...","Finding the best value...","Preparing your perfect journey..."];let Yt;const mo=()=>{const e=document.getElementById("ai-searching-loader"),t=document.getElementById("searching-status-text"),a=document.getElementById("ai-matchmaker-results-section");if(!e||!t||!a)return;a.style.display="none",e.style.display="block",e.scrollIntoView({behavior:"smooth",block:"center"});let o=0;t.innerText=Jt[o],clearInterval(Yt),Yt=setInterval(()=>{o=(o+1)%Jt.length,t.innerText=Jt[o]},1500)},yo=()=>{const e=document.getElementById("ai-searching-loader");e&&(e.style.display="none"),clearInterval(Yt)},bo=e=>{const t=document.querySelector(".matchmaker-card-glass");if(!e||!t)return;const a=e.getBoundingClientRect(),o=t.getBoundingClientRect(),n=document.createElement("div");n.className="flying-card-anim",n.style.backgroundImage=e.style.backgroundImage||"",n.style.left=`${a.left+window.scrollX}px`,n.style.top=`${a.top+window.scrollY}px`,n.style.width=`${a.width}px`,n.style.height=`${a.height}px`,document.body.appendChild(n),n.offsetWidth,n.style.left=`${o.left+window.scrollX+o.width/2-30}px`,n.style.top=`${o.top+window.scrollY+o.height/2-30}px`,n.style.width="60px",n.style.height="60px",n.style.opacity="0.1",setTimeout(()=>{t.style.boxShadow="0 0 35px rgba(0, 203, 224, 0.7)",t.style.transform="scale(1.01)",setTimeout(()=>{t.style.boxShadow="",t.style.transform=""},600)},600),n.addEventListener("transitionend",()=>{n.remove()})},$a=()=>{const e=document.getElementById("matchmaker-compare-summary"),t=document.getElementById("compare-summary-grid");if(!(!e||!t)){if(q.length===0){e.style.display="none";return}e.style.display="block",t.innerHTML="",q.forEach(a=>{const o=document.createElement("div");o.className="compare-summary-item",o.innerHTML=`
                <span><strong>${a.title}</strong></span>
                <span class="remove-btn" data-title="${a.title}">✕</span>
            `,o.querySelector(".remove-btn").addEventListener("click",n=>{n.stopPropagation(),q=q.filter(i=>i.title!==a.title),$a(),Xt();const s=document.querySelector(`.card-compare-checkbox[data-title="${a.title}"]`);s&&(s.checked=!1)}),t.appendChild(o)})}},ho=e=>{if(!(!$t||!yt)){if($t.innerHTML="",e.length===0){$t.innerHTML=`
                <div class="empty-results-fallback" style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
                    <p class="empty-saved-msg" style="margin-bottom:15px; font-size:15px;">We couldn't find an exact match, but here are some amazing alternatives.</p>
                    <button class="btn-toast" id="reset-match-filters-btn" style="background:var(--accent-cyan); color:var(--bg-dark); border:none; padding:8px 20px; border-radius:6px; font-weight:700; cursor:pointer;" data-msg="Resetting inputs...">View Flexible Options</button>
                </div>
            `;const t=document.getElementById("reset-match-filters-btn");t&&t.addEventListener("click",()=>{document.getElementById("match-destination")&&(document.getElementById("match-destination").value=""),ne=1e3,ie=15e4,Ve(),$e(null,null,null)}),yt.style.display="block",yt.scrollIntoView({behavior:"smooth",block:"start"});return}e.forEach(t=>{const a=q.some(d=>d.title===t.title),o=document.createElement("div");o.className="travel-card",o.style.border="1px solid rgba(0, 203, 224, 0.15)",o.innerHTML=`
                <div class="card-img-wrap" style="background-image: url('${t.imgUrl}')">
                    <button class="card-share-btn" data-title="${t.title}"><svg viewBox="0 0 24 24"><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon><line x1="22" y1="2" x2="11" y2="13"></line></svg></button>
                    <button class="card-favorite-btn" data-title="${t.title}"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
                </div>
                <div class="card-details">
                    <div class="card-meta">
                        <span>📍 ${t.category.toUpperCase()}</span>
                        <span>${t.duration} Days</span>
                    </div>
                    <h3 class="card-title">${t.title}</h3>
                    
                    <div class="ai-matchmaker-why-card">
                        <strong>💡 Why it matches:</strong> ${t.matchReason}
                    </div>

                    <p style="font-size:12px; color:var(--text-slate); margin-bottom:12px;">✨ Highlights: ${t.highlights}</p>

                    <div class="card-footer" style="padding-top:12px; border-top:1px solid rgba(255,255,255,0.05)">
                        <div class="card-rating">${t.rating}</div>
                        <div class="card-price">${t.priceStr}</div>
                    </div>
                    
                    <div class="card-actions-row" style="margin-top:15px; display:flex; gap:10px; flex-wrap: wrap;">
                        <label class="compare-checkbox-label" style="position:static; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); padding:6px 12px; border-radius:6px; flex:1; justify-content:center; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" class="card-compare-checkbox" data-title="${t.title}" ${a?"checked":""}>
                            Compare Spec
                        </label>
                        <button class="btn-book-now btn-toast" style="flex:1.2; background:var(--accent-cyan); color:var(--bg-dark); border:none; border-radius:6px; font-size:11.5px; font-weight:800; padding:6px 12px; cursor:pointer;" data-msg="Directing to checkout page...">Book Now</button>
                    </div>
                </div>
            `;const n=o.querySelector(".card-compare-checkbox");n.addEventListener("change",d=>{d.stopPropagation(),n.checked&&bo(o.querySelector(".card-img-wrap")),at(t,n.checked)}),o.querySelector(".card-favorite-btn").addEventListener("click",d=>{d.stopPropagation(),qe(t.title)});const s=o.querySelector(".card-share-btn");s&&s.addEventListener("click",d=>{d.stopPropagation(),openShareSheet(t)});const i=o.querySelector(".btn-book-now");i&&i.addEventListener("click",d=>{d.stopPropagation(),ba(t)}),$t.appendChild(o)}),yt.style.display="block",yt.scrollIntoView({behavior:"smooth",block:"start"}),Ce(),J()}},$e=(e,t,a)=>{const o=document.getElementById("match-destination")?document.getElementById("match-destination").value.toLowerCase().trim():"",n=W?W.value:"all",s=t??ne,i=a??ie,d=Array.from(Lt).filter(g=>g.classList.contains("selected")).map(g=>g.dataset.style),c=Array.from(document.querySelectorAll('input[name="match-pref"]:checked')).map(g=>g.value);console.log("Filter Diagnostics - Start:",{dest:o,durVal:n,minBudget:s,maxBudget:i,selectedStyles:d,categoryChipValue:e}),mo(),setTimeout(()=>{console.log("Filtering from total packages count:",A.length);let g=A.filter(r=>{if(!!(r.priceNum>i*1.2||r.priceNum<s*.8)||o!==""&&!(r.title.toLowerCase().includes(o)||r.category.toLowerCase().includes(o)))return!1;if(e)if(e==="budget"){if(r.priceNum>25e3)return!1}else if(e==="international"){const m=r.title.toLowerCase();if(!m.includes("bali")&&!m.includes("maldives")&&!m.includes("thailand"))return!1}else{const m=e.toLowerCase();if(!r.title.toLowerCase().includes(m)&&!r.category.toLowerCase().includes(m)&&!r.highlights.toLowerCase().includes(m)&&r.style!==m)return!1}if(n!=="all"){const m=parseInt(n);if(isNaN(m)){if(n==="weekend"&&r.duration>2||n==="2-3"&&(r.duration<2||r.duration>3)||n==="4-5"&&(r.duration<4||r.duration>5)||n==="6-7"&&(r.duration<6||r.duration>7)||n==="8-10"&&(r.duration<8||r.duration>10)||n==="8+"&&r.duration<8||n==="10+"&&r.duration<10)return!1}else if(r.duration!==m)return!1}return console.log("MATCH FOUND:",r.title,"Duration:",r.duration,"Price:",r.priceNum),!0});console.log("Filtered matches count:",g.length);let u=g.map(r=>{let b=96;r.priceNum>i?b-=8:r.priceNum<s?b-=6:b+=2;let m=0;d.forEach(h=>{(r.style===h||r.category.toLowerCase()===h)&&m++}),d.length>0&&m===0?b-=10:m>0&&(b+=m*2);let v=0;c.forEach(h=>{(r.experiences===h||r.category.toLowerCase()===h||r.highlights.toLowerCase().includes(h))&&v++}),c.length>0&&v===0?b-=8:v>0&&(b+=v*2),b=Math.max(70,Math.min(99,b));let y=`Perfect fit for your ₹${s.toLocaleString()} - ₹${i.toLocaleString()} budget. `;return m>0&&(y+=`Matches your preferred ${d.join("/")} styles. `),v>0&&(y+=`Includes ${c.slice(0,2).join(" & ")} options. `),y+=`Covers the requested ${r.duration}-day duration with a solid ${r.rating} rating.`,{...r,matchScore:b,matchReason:y}});u.sort((r,b)=>b.matchScore-r.matchScore),yo(),ho(u)},1500)};Ea&&Ea.addEventListener("click",()=>{$e(null,null,null)});let q=[];const Kt=document.getElementById("floating-compare-widget"),za=document.getElementById("compare-selected-count"),Ca=document.getElementById("compare-clear-btn"),Pa=document.getElementById("compare-now-btn"),at=(e,t)=>{if(t){if(q.length>=3){showToast("⚠️ You can compare up to 3 packages only!"),document.querySelectorAll(".card-compare-checkbox").forEach(o=>{o.dataset.title===e.title&&(o.checked=!1)});return}q.some(a=>a.title===e.title)||q.push(e),showToast(`➕ Added "${e.title}" to compare list`)}else q=q.filter(a=>a.title!==e.title),showToast(`➖ Removed "${e.title}" from compare list`);$a(),Xt(),typeof lt=="function"&&lt(),typeof We=="function"&&We()},Xt=()=>{if(!Kt||!za)return;const e=q.length;e>=2?(Kt.classList.add("active"),Se&&(Se.style.display="inline-block")):(Kt.classList.remove("active"),Se&&(Se.style.display="none")),za.innerText=e};Ca&&Ca.addEventListener("click",()=>{q=[],document.querySelectorAll(".card-compare-checkbox").forEach(t=>t.checked=!1),Xt(),Ft.forEach(t=>{t.classList.remove("active-mode"),t.id==="search-list-container"&&t.classList.add("active-mode")}),Se&&Se.classList.remove("active")});const Aa=document.getElementById("compare-back-to-list-btn");Aa&&Aa.addEventListener("click",()=>{Ft.forEach(e=>{e.classList.remove("active-mode"),e.id==="search-list-container"&&e.classList.add("active-mode")}),Se&&Se.classList.remove("active")}),Pa&&Pa.addEventListener("click",()=>{Se&&Se.click()});const xo=()=>{if(!compareMatrixTable)return;if(q.length===0){compareMatrixTable.innerHTML='<tr><td style="text-align: center; padding: 40px 0;">No packages selected for comparison. Go to List View and check at least 2 packages.</td></tr>';return}let e=0,t=0;q.forEach((s,i)=>{const c=(parseFloat(s.rating.replace(/[^0-9.]/g,""))||4)/s.priceNum;c>t&&(t=c,e=i)});let a="<th>Package Spec</th>";q.forEach((s,i)=>{a+=`<th class="${i===e?"best-value-col":""}">
                ${i===e?'<span class="compare-value-badge">BEST VALUE</span><br>':""}
                <strong>${s.title}</strong>
            </th>`});const o=[{label:"Starting Price",key:"priceStr"},{label:"Duration",key:"duration",format:s=>`${s} Days`},{label:"Rating Score",key:"rating"},{label:"Reviews count",key:"reviews",format:s=>`${s||95} Travelers`},{label:"Accommodation",key:"accommodation",format:s=>s?s.toUpperCase():"HOTEL"},{label:"Meals Included",key:"meals"},{label:"Sightseeing Tours",key:"sightseeing"},{label:"Airport Transfers",key:"transfers"},{label:"Cancellation Policy",key:"cancellation"},{label:"Highlights",key:"highlights"}];let n=`<thead><tr>${a}</tr></thead><tbody>`;o.forEach(s=>{n+=`<tr><td class="spec-label">${s.label}</td>`,q.forEach((i,d)=>{const c=i[s.key],g=s.format?s.format(c):c||"N/A";n+=`<td class="${d===e?"best-value-col":""}">${g}</td>`}),n+="</tr>"}),n+="</tbody>",compareMatrixTable.innerHTML=n},ot=()=>{const e=document.getElementById("profile-saved-grid");if(e){if(_.length===0){e.innerHTML='<p class="empty-saved-msg" style="grid-column: 1/-1;">No saved packages yet. Click 🔖 on cards to save.</p>';return}e.innerHTML="",_.forEach(t=>{const a=A.find(n=>n.title.trim()===t.trim())||{title:t,imgUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",priceStr:"₹12,000",category:"Retreat",duration:4,rating:"⭐ 4.8"},o=document.createElement("div");o.className="travel-card",o.innerHTML=`
                <div class="card-img-wrap" style="background-image: url('${a.imgUrl}')">
                    <button class="card-save-btn active" data-title="${a.title}"><svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></button>
                    <button class="card-share-btn" data-title="${a.title}"><svg viewBox="0 0 24 24"><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon><line x1="22" y1="2" x2="11" y2="13"></line></svg></button>
                </div>
                <div class="card-details">
                    <div class="card-meta">
                        <span>📍 ${a.category.toUpperCase()}</span>
                        <span>${a.duration} Days</span>
                    </div>
                    <h3 class="card-title" style="font-size: 13px;">${a.title}</h3>
                    <div class="card-footer" style="padding-top: 8px;">
                        <div class="card-rating" style="font-size: 10px;">${a.rating}</div>
                        <div class="card-price" style="font-size: 12px;">${a.priceStr}</div>
                    </div>
                </div>
            `,o.addEventListener("click",()=>{O("home"),setTimeout(()=>{const n=document.querySelectorAll("#view-home .travel-card, #view-home .trending-curved-card, #view-home .bespoke-card");for(let s of n){const i=s.querySelector(".card-title")||s.querySelector(".bespoke-title");if(i&&i.innerText.trim()===a.title.trim()){s.scrollIntoView({behavior:"smooth",block:"center"});break}}},400)}),e.appendChild(o)}),J()}},Da=document.querySelectorAll(".dashboard-sidebar-list .sidebar-item"),vo=document.querySelectorAll(".enquiry-workspace");Da.forEach(e=>{e.addEventListener("click",()=>{Da.forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.enquiryId;vo.forEach(a=>{a.id===`enquiry-ws-${t}`?a.classList.add("active"):a.classList.remove("active")})})}),document.body.addEventListener("click",e=>{const t=e.target.closest(".btn-toast");if(t){e.preventDefault();const a=t.dataset.msg;showToast(a)}}),document.querySelectorAll(".action-pay-now").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),showToast("💳 Redirecting to Secure Travel Payment Gateway...")})});const Qt=document.getElementById("user-theme-select");if(Qt){const e=localStorage.getItem("beacon_theme")||"dark";Qt.value=e,e==="light"?document.documentElement.classList.add("light-theme"):document.documentElement.classList.remove("light-theme"),Qt.addEventListener("change",t=>{const a=t.target.value;localStorage.setItem("beacon_theme",a),a==="light"?(document.documentElement.classList.add("light-theme"),showToast("☀️ Switched to Light Theme!")):(document.documentElement.classList.remove("light-theme"),showToast("🌙 Switched to Dark Theme!"))})}const wo=()=>{const e=document.getElementById("enquiries-cards-grid"),t=document.getElementById("enquiries-detail-workspace");e&&t&&(e.style.display="grid",t.style.display="none");const a=document.getElementById("bookings-cards-grid"),o=document.getElementById("bookings-detail-workspace");a&&o&&(a.style.display="grid",o.style.display="none");const n=document.getElementById("trips-cards-grid"),s=document.getElementById("trips-detail-workspace");n&&s&&(n.style.display="grid",s.style.display="none")};document.querySelectorAll(".nav-link-item").forEach(e=>{e.addEventListener("click",wo)});const Zt=document.getElementById("enquiries-cards-grid"),ea=document.getElementById("enquiries-detail-workspace"),Ma=document.getElementById("enquiry-back-btn"),ko=document.querySelectorAll(".btn-view-enquiry"),So=document.querySelectorAll(".enquiry-preview-card");Zt&&ea&&(So.forEach(e=>{e.addEventListener("click",t=>{if(t.target.closest(".btn-view-enquiry"))return;const a=e.dataset.enquiryId,o=e.querySelector(`.btn-view-enquiry[data-enquiry-id="${a}"]`);o&&o.click()})}),ko.forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const a=e.dataset.enquiryId;Zt.style.display="none",ea.style.display="block",document.querySelectorAll("#view-enquiries .sidebar-item").forEach(s=>{s.dataset.enquiryId===a?s.classList.add("active"):s.classList.remove("active")}),document.querySelectorAll("#view-enquiries .enquiry-workspace").forEach(s=>{s.id===`enquiry-ws-${a}`?s.classList.add("active"):s.classList.remove("active")})})}),Ma&&Ma.addEventListener("click",()=>{ea.style.display="none",Zt.style.display="grid"})),(()=>{if(!localStorage.getItem("beacon_bookings")){const e=[{id:"BC-2026-9921",packageTitle:"Alleppey Houseboats Retreat",imgUrl:"https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=800&q=80",price:"₹18,500",dateRange:"Aug 15 - Aug 19, 2026",status:"Confirmed",accommodation:"Deluxe Houseboat Stay",cancellation:"Free cancellation within 24 hours."},{id:"BC-2026-9980",packageTitle:"Munnar Tea Gardens Escapade",imgUrl:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",price:"₹14,200",dateRange:"Sep 10 - Sep 14, 2026",status:"Payment Pending",accommodation:"Premium Tea Estate Resort",cancellation:"Free cancellation within 24 hours."}];localStorage.setItem("beacon_bookings",JSON.stringify(e))}})();const Ue=()=>{const e=document.getElementById("bookings-cards-grid"),t=document.getElementById("bookings-detail-workspace");if(!e||!t)return;const a=JSON.parse(localStorage.getItem("beacon_bookings"))||[];let o="",n="";a.forEach(u=>{const r=u.status==="Confirmed",b=u.status==="🟡 PAYMENT VERIFICATION PENDING",m=u.status==="draft";let v="pending";r?v="confirmed":b?v="pending":m&&(v="draft"),m?o+=`
                    <div class="booking-preview-card" data-booking-id="${u.id}" data-status="draft">
                        <div class="preview-card-banner" style="background-image: url('${u.imgUrl}')">
                            <span class="preview-tag ${v}" style="background:#f97316; color:#fff;">Draft (${u.progress}%)</span>
                        </div>
                        <div class="preview-card-body">
                            <span class="preview-card-date">${u.dateRange}</span>
                            <h3 class="preview-card-title">${u.packageTitle}</h3>
                            <p class="preview-card-details">Booking ID: ${u.id}</p>
                            
                            <!-- Custom Progress Bar -->
                            <div style="margin: 10px 0 15px 0;">
                                <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-slate); margin-bottom:4px;">
                                    <span>${u.progressDesc}</span>
                                    <span>${u.progress}%</span>
                                </div>
                                <div style="width:100%; height:6px; background:rgba(255,255,255,0.06); border-radius:3px; overflow:hidden;">
                                    <div style="width:${u.progress}%; height:100%; background:var(--accent-cyan); box-shadow:0 0 8px var(--accent-cyan);"></div>
                                </div>
                            </div>
                            
                            <button class="btn-primary-sm btn-resume-draft" data-booking-id="${u.id}" style="background:var(--accent-cyan) !important; color:var(--bg-dark) !important; font-weight:850; border:none; border-radius:4px; padding:6px 12px; cursor:pointer; outline:none; font-size:11px; width:100%;">Resume Customization</button>
                        </div>
                    </div>
                `:(o+=`
                    <div class="booking-preview-card" data-booking-id="${u.id}" data-status="${u.status}">
                        <div class="preview-card-banner" style="background-image: url('${u.imgUrl}')">
                            <span class="preview-tag ${v}" style="${b?"background:#eab308; color:#000;":""}">${u.status}</span>
                        </div>
                        <div class="preview-card-body">
                            <span class="preview-card-date">${u.dateRange}</span>
                            <h3 class="preview-card-title">${u.packageTitle}</h3>
                            <p class="preview-card-details">Booking ID: ${u.id}</p>
                            <button class="btn-primary-sm btn-view-booking" data-booking-id="${u.id}" style="border:none; border-radius:4px; padding:6px 12px; cursor:pointer; outline:none; font-size:11px; width:100%;">Manage Booking</button>
                        </div>
                    </div>
                `,r&&j(u),n+=`
<div class="booking-detailed-card booking-detail-view" id="booking-ws-${u.id}" style="display: none; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; margin-top: 20px;">
<div class="booking-banner" style="background-image: url('${u.imgUrl}'); height: 220px; background-size: cover; background-position: center; position: relative;">
<div class="booking-status-tag ${v}" style="position: absolute; top: 20px; left: 20px; padding: 6px 12px; border-radius: 4px; font-weight: 800; font-size: 11px; text-transform: uppercase; ${r?"background:#22c55e;":b?"background:#eab308; color:#000;":"background:#ef4444;"}">${u.status}</div>
${r?'<div class="booking-countdown" style="position: absolute; bottom: 20px; right: 20px; background: rgba(3,7,18,0.85); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); font-size: 11.5px; padding: 4px 10px; border-radius: 4px; font-weight: 750;">✈️ Departs in 18 Days</div>':""}
</div>
<div class="booking-body" style="padding: 30px;">

<!-- E-Receipt Actions for Confirmed bookings -->
${r?`
<!-- Desktop Receipt Action Bar -->
<div class="desktop-receipt-row" style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 12px 18px; border-radius: 10px; margin-bottom: 20px; box-sizing:border-box;">
    <div style="display: flex; align-items: center; gap: 8px;">
        <span style="color:#22c55e; font-weight:800; font-size:12.5px;">✓ CONFIRMED</span>
    </div>
    <button type="button" class="btn-view-ereceipt" data-booking-id="${u.id}" style="background: rgba(0, 203, 224, 0.1); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); border-radius: 6px; padding: 6px 14px; font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 6px; outline:none; transition: all 0.2s;">
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
    <button type="button" class="btn-view-ereceipt btn-primary-large" data-booking-id="${u.id}" style="width:100%; border-radius: 8px; padding: 10px; font-size:12.5px; font-weight:850; background:rgba(0, 203, 224, 0.1) !important; border: 1px solid var(--accent-cyan) !important; color:var(--accent-cyan) !important; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
        🧾 View Invoice E-Receipt
    </button>
</div>
`:""}

<h2 style="font-size: 24px; font-weight: 900; color: #fff; margin: 0 0 5px 0;">${u.packageTitle}</h2>
<p style="font-size: 13.5px; color: var(--text-slate); margin: 0 0 25px 0;">Booking ID: ${u.id} &bull; Date Selected: ${u.dateRange}</p>

<!-- Verification simulation warning bar if status is pending -->
${b?`
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
        <button type="button" class="btn-approve-payment-simulator" data-booking-id="${u.id}" style="background:rgba(34,197,94,0.15); border:1px solid #22c55e; color:#22c55e; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:800; cursor:pointer; outline:none; transition:all 0.2s;">
            🔧 Simulator: Approve Payment
        </button>
    </div>
</div>
`:""}

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
<strong style="display: block; font-size: 16px; color: var(--accent-cyan); margin-top: 5px;">${u.estimatedTotal?"₹"+u.estimatedTotal.toLocaleString():"₹37,000"}</strong>
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
`)}),e.innerHTML=o;const s=`
            <button class="btn-back-nav" id="booking-back-btn" style="margin-bottom: 24px; position: static; display: inline-flex; align-items: center; gap: 8px; background: transparent; border: none; color: var(--text-slate); font-weight: 700; cursor: pointer;">
                <span>←</span> Back to Bookings
            </button>
        `;t.innerHTML=s+n;const i=document.getElementById("booking-back-btn");i&&i.addEventListener("click",()=>{t.style.display="none",e.style.display="grid"}),e.querySelectorAll(".booking-preview-card").forEach(u=>{const r=u.dataset.bookingId,b=u.dataset.status,m=u.querySelector(".btn-view-booking, .btn-resume-draft"),v=()=>{if(b==="draft"){Uo(r);return}e.style.display="none",t.style.display="block",t.querySelectorAll(".booking-detailed-card").forEach(h=>{h.id===`booking-ws-${r}`?h.style.display="block":h.style.display="none"})};u.addEventListener("click",y=>{y.target.closest(".btn-primary-sm")||v()}),m&&m.addEventListener("click",y=>{y.stopPropagation(),v()})}),t.querySelectorAll(".btn-approve-payment-simulator").forEach(u=>{u.onclick=()=>{const r=u.dataset.bookingId;Oo(r)}}),t.querySelectorAll(".btn-view-ereceipt").forEach(u=>{u.onclick=()=>{const r=u.dataset.bookingId;oo(r)}})},qa=(e,t,a,o,n,s,i,d)=>{if(ce!=="payments"){console.log("Suppressing planner popup alert for user:",e);return}const c=document.getElementById("planner-realtime-popup-wrap");if(!c)return;const g=document.createElement("div");g.className=`planner-popup-card ${i==="started"?"in-progress":"verification-needed"}`;let u=i==="started"?"🔔":"⚠️",r=i==="started"?"var(--accent-cyan)":"#eab308";g.innerHTML=`
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <strong style="color:${r}; font-size:12px; text-transform:uppercase; letter-spacing:1px; display:flex; align-items:center; gap:6px;">
                    ${u} ${e}
                </strong>
                <button type="button" class="close-popup-btn" style="background:transparent; border:none; color:var(--text-slate); cursor:pointer; font-size:14px; outline:none;">✕</button>
            </div>
            <div style="font-size:24px; font-weight:900; color:var(--accent-cyan); margin-bottom:10px;">${o}</div>
            <p style="font-size:12.5px; color:var(--text-slate); margin:0 0 15px 0; line-height:1.5;">
                Customer <strong>${n}</strong> has ${i==="started"?"started payment":"marked payment as completed"} for:<br>
                Booking: <strong>${a}</strong><br>
                Time: <strong>${s}</strong>
            </p>
            <div style="display:flex; gap:10px;">
                ${i==="verification"?`
                    <button type="button" class="btn-popup-verify-received" style="flex:1.2; background:#22c55e; color:#fff; border:none; padding:8px 12px; border-radius:6px; font-size:11.5px; font-weight:800; cursor:pointer; outline:none;">✓ Received</button>
                    <button type="button" class="btn-popup-verify-not-received" style="flex:1.2; background:#ef4444; color:#fff; border:none; padding:8px 12px; border-radius:6px; font-size:11.5px; font-weight:800; cursor:pointer; outline:none;">✕ Not Received</button>
                `:""}
                <button type="button" class="btn-popup-view-booking" style="flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:8px 12px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; outline:none;">View Booking</button>
            </div>
        `,g.querySelector(".close-popup-btn").onclick=()=>{g.classList.add("leaving"),setTimeout(()=>{g.remove()},300)};const b=g.querySelector(".btn-popup-view-booking");if(b&&(b.onclick=()=>{O("payments"),g.classList.add("leaving"),setTimeout(()=>{g.remove()},300)}),i==="verification"){const m=g.querySelector(".btn-popup-verify-received"),v=g.querySelector(".btn-popup-verify-not-received");m&&(m.onclick=()=>{openVerificationReviewModal(d),g.remove()}),v&&(v.onclick=()=>{g.remove(),Eo(d)})}c.appendChild(g),setTimeout(()=>{g.parentElement&&(g.classList.add("leaving"),setTimeout(()=>{g.remove()},300))},15e3)},Eo=e=>{let t=JSON.parse(localStorage.getItem("beacon_payment_attempts"))||[];const a=t.findIndex(i=>i.id===e);if(a===-1)return;const o=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});t[a].status="PAYMENT_REVIEW_REQUIRED",t[a].history.push(`${o} Planner marked payment as NOT received`),localStorage.setItem("beacon_payment_attempts",JSON.stringify(t));let n=JSON.parse(localStorage.getItem("beacon_bookings"))||[];const s=n.findIndex(i=>i.id===t[a].bookingId);s!==-1&&(n[s].status="Payment Review Required",localStorage.setItem("beacon_bookings",JSON.stringify(n)),Ue()),showToast("⚠️ Payment review required flag set."),ia(`Payment review flagged: ${t[a].amount}`,"verification",t[a].bookingId,t[a].amount)},Pt=document.getElementById("checkout-payment-modal"),Na=document.getElementById("close-checkout-btn"),Ra=document.getElementById("btn-have-paid"),Va=document.getElementById("btn-back-to-qr"),Fa=document.getElementById("btn-submit-payment"),ta=document.getElementById("checkout-step-1"),aa=document.getElementById("checkout-step-2"),ja=document.getElementById("checkout-utr-input"),oa=document.getElementById("customer-direct-pay-confirm-modal"),To=document.getElementById("btn-direct-pay-cancel"),Io=document.getElementById("btn-direct-pay-continue");let nt=null;const Bo=(e,t)=>{nt&&clearInterval(nt);const a=document.getElementById("customer-wait-verification-modal"),o=a.querySelector(".payment-modal-content");a.style.display="flex",o.innerHTML=`
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
                    <strong style="color: #fff;">${e}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-slate);">Payable Amount:</span>
                    <strong style="color: var(--accent-cyan);">${t}</strong>
                </div>
            </div>
            
            <p style="font-size: 12.5px; color: var(--text-slate); line-height: 1.6; margin-bottom: 25px;">
                ⏳ <strong id="wait-planner-name">${de.planner||"WanderWorld Travels"}</strong> is currently verifying your transfer. Please don't make another payment while verification is pending.
            </p>
            
            <div style="display: flex; gap: 10px;">
                <button type="button" class="btn-secondary-action" id="btn-wait-close" style="flex: 1; border-radius: 6px; padding: 10px; font-weight: 750; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; cursor: pointer; outline: none;">Close Window</button>
            </div>
        `,a.querySelector("#btn-wait-close").onclick=()=>{a.style.display="none",clearInterval(nt)},nt=setInterval(()=>{const s=(JSON.parse(localStorage.getItem("beacon_payment_attempts"))||[]).find(i=>i.bookingId===e);s&&s.status==="PLANNER_CONFIRMED"?(clearInterval(nt),o.innerHTML=`
                    <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
                    <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 20px; font-weight: 850;">✓ Payment Verified</h3>
                    <p style="font-size: 14px; color: var(--accent-cyan); font-weight: 700; margin-bottom: 15px;">${t}</p>
                    
                    <p style="font-size: 13px; color: var(--text-slate); line-height: 1.6; margin-bottom: 25px;">
                        <strong>${de.planner||"WanderWorld Travels"}</strong> has confirmed receiving your payment.<br>
                        Booking <strong>#${e}</strong> is now confirmed.
                    </p>
                    
                    <div style="display: flex; gap: 10px;">
                        <button type="button" class="btn-primary-large" id="btn-wait-view-booking" style="flex: 1; border-radius: 6px; padding: 12px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer; outline: none;">View Booking</button>
                    </div>
                `,a.querySelector("#btn-wait-view-booking").onclick=()=>{a.style.display="none",Ue(),O("bookings",!0)}):s&&s.status==="PAYMENT_REVIEW_REQUIRED"&&(clearInterval(nt),o.innerHTML=`
                    <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                    <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 20px; font-weight: 850;">Payment Verification Failed</h3>
                    <p style="font-size: 13px; color: var(--text-slate); line-height: 1.6; margin-bottom: 25px;">
                        The planner hasn't been able to locate your ${t} payment for booking <strong>#${e}</strong>.
                        Please check whether the transaction was successful in your payment app.
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
                        <button type="button" class="btn-primary-large id-btn-i-was-charged" style="border-radius: 6px; padding: 10px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer; outline: none;">I Was Charged (File Dispute)</button>
                        <button type="button" class="btn-secondary-action id-btn-try-again-pay" style="border-radius: 6px; padding: 10px; font-weight: 750; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; cursor: pointer; outline: none;">Try Payment Again</button>
                        <button type="button" class="btn-secondary-action id-btn-close-wait" style="border-radius: 6px; padding: 10px; font-weight: 750; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; cursor: pointer; outline: none;">Close</button>
                    </div>
               `,a.querySelector(".id-btn-i-was-charged").onclick=()=>{showToast("🛡️ Dispute ticket filed with Support."),a.style.display="none"},a.querySelector(".id-btn-try-again-pay").onclick=()=>{a.style.display="none",Lo(de)},a.querySelector(".id-btn-close-wait").onclick=()=>{a.style.display="none"})},2e3)};let de=null,ae="";const Lo=e=>{de=e,ae=`BCN-2026-${Math.floor(1e4+Math.random()*9e4)}`;const a=e.style==="couple"||e.category==="beaches";let o="wanderworld@upi",n="WanderWorld Travels";a?(o=localStorage.getItem("beacon_planner_upi")||"rahul@upi",n=localStorage.getItem("beacon_planner_business")||"Rahul Mehta"):(o="wanderlust@upi",n="Wanderlust Travels"),document.getElementById("direct-confirm-amount").innerText=e.priceStr,document.getElementById("direct-confirm-planner").innerText=n,document.getElementById("direct-confirm-booking-id").innerText=ae,oa.style.display="flex",To.onclick=()=>{oa.style.display="none"},Io.onclick=()=>{oa.style.display="none",document.getElementById("checkout-booking-id").innerText=ae,document.getElementById("checkout-package-title").innerText=e.title,document.getElementById("checkout-payable-amount").innerText=e.priceStr,document.getElementById("checkout-upi-display").innerText=o,document.getElementById("checkout-note-display").innerText=ae;const s=e.priceStr.replace(/[^0-9]/g,""),i=`upi://pay?pa=${o}&pn=BeaconTravel&am=${s}&tn=${ae}&cu=INR`,d=`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(i)}`;document.getElementById("checkout-qr-code").src=d,ta.style.display="block",aa.style.display="none",ja.value="",Pt.style.display="flex";const c=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),g=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),u={id:`PAY-${Math.floor(1e4+Math.random()*9e4)}`,bookingId:ae,plannerId:n,customerName:"Rahul Sharma",packageName:e.title,amount:e.priceStr,status:"PAYMENT_INITIATED",created_at:c,customer_marked_paid_at:null,planner_confirmed_at:null,utrId:"",history:[`${g} Booking created`,`${g} Customer initiated ${e.priceStr} payment`,`${g} Planner notification sent`]};let r=JSON.parse(localStorage.getItem("beacon_payment_attempts"))||[];r.unshift(u),localStorage.setItem("beacon_payment_attempts",JSON.stringify(r)),At("started"),na(`Beacon payment alert. A payment of ${s} rupees has been initiated.`),ia(`Payment initiated: ${e.priceStr}`,"started",ae,e.priceStr),qa("🔔 PAYMENT IN PROGRESS","Payment Started",ae,e.priceStr,"Rahul Sharma",c,"started",u.id)}};Pt&&(Na&&Na.addEventListener("click",()=>{Pt.style.display="none"}),Ra&&Ra.addEventListener("click",()=>{ta.style.display="none",aa.style.display="block"}),Va&&Va.addEventListener("click",()=>{aa.style.display="none",ta.style.display="block"}),Fa&&Fa.addEventListener("click",()=>{const e=ja.value.trim();if(!e||e.length!==12||isNaN(e)){showToast("❌ Please enter a valid 12-digit UPI UTR/Transaction ID");return}let t=JSON.parse(localStorage.getItem("beacon_payment_attempts"))||[];const a=t.findIndex(c=>c.bookingId===ae),o=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),n=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});a!==-1&&(t[a].status="CUSTOMER_MARKED_PAID",t[a].customer_marked_paid_at=o,t[a].utrId=e,t[a].history.push(`${n} Customer marked payment as completed`),t[a].history.push(`${n} Planner verification alert sent`),localStorage.setItem("beacon_payment_attempts",JSON.stringify(t)));const s={id:ae,packageTitle:de.title,imgUrl:de.imgUrl,price:de.priceStr,dateRange:"Sep 15 - Sep 19, 2026",status:"🟡 PAYMENT VERIFICATION PENDING",utrId:e,accommodation:de.accommodation||"4★ Resort Stay",cancellation:de.cancellation||"Free cancellation within 24 hours."};let i=JSON.parse(localStorage.getItem("beacon_bookings"))||[];i.unshift(s),localStorage.setItem("beacon_bookings",JSON.stringify(i)),Pt.style.display="none",showToast("✅ Payment details submitted! Verification pending.");const d=de.priceStr.replace(/[^0-9]/g,"");At("verification"),na(`Beacon payment alert. The customer has marked a payment of ${d} rupees as completed. Please check your account and confirm the payment.`),ia(`Payment verification required: ${de.priceStr}`,"verification",ae,de.priceStr),a!==-1&&qa("⚠️ PAYMENT VERIFICATION REQUIRED","Verification Needed",ae,de.priceStr,"Rahul Sharma",o,"verification",t[a].id),Ue(),Bo(ae,de.priceStr)})),(()=>{localStorage.getItem("beacon_planner_business")||localStorage.setItem("beacon_planner_business","WanderWorld Travels"),localStorage.getItem("beacon_planner_upi")||localStorage.setItem("beacon_planner_upi","wanderworld@upi"),localStorage.getItem("beacon_planner_mobile")||localStorage.setItem("beacon_planner_mobile","9876543210"),localStorage.getItem("beacon_planner_sound")||localStorage.setItem("beacon_planner_sound","on"),localStorage.getItem("beacon_planner_voice")||localStorage.setItem("beacon_planner_voice","on"),localStorage.getItem("beacon_notifications")||localStorage.setItem("beacon_notifications",JSON.stringify([]))})();const At=e=>{if(localStorage.getItem("beacon_planner_sound")!=="off")try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const a=new t;if(e==="started"){const o=a.createOscillator(),n=a.createGain();o.connect(n),n.connect(a.destination),o.type="sine",o.frequency.setValueAtTime(523.25,a.currentTime),o.frequency.exponentialRampToValueAtTime(783.99,a.currentTime+.35),n.gain.setValueAtTime(.15,a.currentTime),n.gain.exponentialRampToValueAtTime(.01,a.currentTime+.4),o.start(a.currentTime),o.stop(a.currentTime+.4)}else if(e==="verification"){const o=(n,s,i)=>{const d=a.createOscillator(),c=a.createGain();d.connect(c),c.connect(a.destination),d.type="triangle",d.frequency.setValueAtTime(n,a.currentTime+s),c.gain.setValueAtTime(.2,a.currentTime+s),c.gain.exponentialRampToValueAtTime(.01,a.currentTime+s+i),d.start(a.currentTime+s),d.stop(a.currentTime+s+i)};o(659.25,0,.18),o(880,.12,.25)}}catch(t){console.error("AudioContext failed to initialize:",t)}},na=e=>{if(localStorage.getItem("beacon_planner_voice")!=="off")try{if("speechSynthesis"in window){window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.rate=1,t.pitch=1,window.speechSynthesis.speak(t)}}catch(t){console.error("SpeechSynthesis failed:",t)}},ia=(e,t,a,o)=>{let n=JSON.parse(localStorage.getItem("beacon_notifications"))||[];const s={id:Date.now(),text:e,type:t,bookingId:a,amount:o,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),read:!1};if(n.unshift(s),localStorage.setItem("beacon_notifications",JSON.stringify(n)),sa(),ra(),document.hidden&&Notification.permission==="granted")try{new Notification(`Beacon Alert: ${e}`,{body:`Ref: ${a} • Amount: ${o}`,icon:"favicon.ico"})}catch(i){console.error("Native push failed:",i)}},sa=()=>{const e=document.getElementById("notifications-list");if(!e)return;const t=JSON.parse(localStorage.getItem("beacon_notifications"))||[];if(t.length===0){e.innerHTML='<div style="color: var(--text-slate); font-size: 12px; text-align: center; padding: 20px 0;">No new alerts.</div>';return}let a="";t.forEach(o=>{let n="🟢";o.type==="started"?n="🟠":o.type==="verification"&&(n="🔴"),a+=`
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 6px; padding: 10px; font-size: 12px; transition: all 0.3s; ${o.read?"":"border-left: 3px solid var(--accent-cyan);"}">
                     <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                         <strong style="color: #fff;">${n} ${o.text}</strong>
                         <span style="font-size: 10px; color: var(--text-slate);">${o.timestamp}</span>
                     </div>
                     <div style="color: var(--text-slate); font-size: 11px;">
                         Booking Ref: <strong>${o.bookingId}</strong> • Amount: <strong>${o.amount}</strong>
                     </div>
                </div>
            `}),e.innerHTML=a},ra=()=>{const e=document.getElementById("notification-badge");if(!e)return;(JSON.parse(localStorage.getItem("beacon_notifications"))||[]).filter(o=>!o.read).length>0?e.style.display="block":e.style.display="none"},la=document.getElementById("notification-bell-btn"),ht=document.getElementById("notifications-dropdown-panel"),Ua=document.getElementById("btn-mark-all-read");la&&ht&&(la.addEventListener("click",e=>{e.stopPropagation();const t=ht.style.display==="block";if(ht.style.display=t?"none":"block",!t){let a=JSON.parse(localStorage.getItem("beacon_notifications"))||[];a.forEach(o=>o.read=!0),localStorage.setItem("beacon_notifications",JSON.stringify(a)),ra(),sa()}}),document.addEventListener("click",e=>{!ht.contains(e.target)&&e.target!==la&&(ht.style.display="none")})),Ua&&Ua.addEventListener("click",()=>{let e=JSON.parse(localStorage.getItem("beacon_notifications"))||[];e.forEach(t=>t.read=!0),localStorage.setItem("beacon_notifications",JSON.stringify(e)),ra(),sa(),showToast("✓ Marked all alerts as read")});const Ha=e=>{const t=document.getElementById("notification-explain-modal"),a=document.getElementById("btn-approve-notifications"),o=document.getElementById("btn-cancel-notifications"),n=document.getElementById("push-permission-label");if(Notification.permission==="granted"){n&&(n.innerText="Enabled");return}t.style.display="flex",a.onclick=()=>{t.style.display="none",Notification.requestPermission().then(s=>{n&&(n.innerText=s==="granted"?"Enabled":"Disabled"),s==="granted"?showToast("🔔 Direct Payment Alerts enabled!"):showToast("❌ Alerts permission denied.")})},o.onclick=()=>{t.style.display="none",n&&(n.innerText="Disabled")}},$o=()=>{const e=document.getElementById("push-permission-label");e&&(Notification.permission==="granted"?e.innerText="Enabled":Notification.permission==="denied"?e.innerText="Disabled":e.innerText="Not Requested")},Dt=document.getElementById("planner-mode-select"),ca=document.getElementById("planner-settings-fields"),da=document.getElementById("planner-upi-id"),pa=document.getElementById("planner-business-name"),ga=document.getElementById("planner-upi-mobile"),ua=document.getElementById("planner-sound-toggle"),fa=document.getElementById("planner-voice-toggle"),zo=document.getElementById("btn-save-planner-upi"),Oa=document.getElementById("btn-test-chime"),Ga=document.getElementById("btn-test-voice"),_a=document.getElementById("btn-request-push");if(Dt&&ca){const e=localStorage.getItem("beacon_planner_registered")==="yes";Dt.value=e?"yes":"no",ca.style.display=e?"block":"none",pa&&(pa.value=localStorage.getItem("beacon_planner_business")||"WanderWorld Travels"),da&&(da.value=localStorage.getItem("beacon_planner_upi")||"wanderworld@upi"),ga&&(ga.value=localStorage.getItem("beacon_planner_mobile")||"9876543210"),ua&&(ua.value=localStorage.getItem("beacon_planner_sound")||"on"),fa&&(fa.value=localStorage.getItem("beacon_planner_voice")||"on"),$o(),Dt.addEventListener("change",()=>{const t=Dt.value==="yes";ca.style.display=t?"block":"none",localStorage.setItem("beacon_planner_registered",t?"yes":"no"),t&&Notification.permission!=="granted"&&setTimeout(()=>{Ha()},500)}),zo.addEventListener("click",()=>{const t=pa.value.trim(),a=da.value.trim(),o=ga.value.trim();if(!t){showToast("❌ Please enter a Payee/Business Name");return}if(!a||!a.includes("@")){showToast("❌ Please enter a valid UPI ID (e.g. name@bank)");return}if(!o||o.length<10){showToast("❌ Please enter a valid mobile number");return}localStorage.setItem("beacon_planner_business",t),localStorage.setItem("beacon_planner_upi",a),localStorage.setItem("beacon_planner_mobile",o),localStorage.setItem("beacon_planner_sound",ua.value),localStorage.setItem("beacon_planner_voice",fa.value),showToast("💼 Planner settings saved successfully!")}),Oa&&Oa.addEventListener("click",()=>{showToast("🔔 Testing audio chimes..."),At("started"),setTimeout(()=>{At("verification")},800)}),Ga&&Ga.addEventListener("click",()=>{showToast("🗣️ Testing voice announcement..."),na("Beacon payment alert. A payment of twelve thousand five hundred rupees has been initiated.")}),_a&&_a.addEventListener("click",()=>{Ha()})}Ue();const ma=document.getElementById("trips-cards-grid"),ya=document.getElementById("trips-detail-workspace"),Wa=document.getElementById("trip-back-btn"),Co=document.querySelectorAll(".trip-preview-card");ma&&ya&&(Co.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tripId;ma.style.display="none",ya.style.display="block",document.querySelectorAll("#view-trips .trip-detail-view").forEach(o=>{o.id===`trip-ws-${t}`?o.style.display="block":o.style.display="none"})})}),Wa&&Wa.addEventListener("click",()=>{ya.style.display="none",ma.style.display="grid"}));const Po=()=>{const e=new Set;return["Goa","Kashmir","Maldives","Bali","Thailand","Dharamshala","Manali","Kerala","Sikkim","Spiti","Coorg","Andaman"].forEach(a=>e.add(a)),typeof A<"u"&&Array.isArray(A)&&A.forEach(a=>{const o=a.title;["goa","kashmir","maldives","bali","thailand","dharamshala","manali","kerala","sikkim","spiti","coorg","andaman","leh","ladakh","jaipur","udaipur","rajasthan","agra","rishikesh","shimla"].forEach(s=>{if(o.toLowerCase().includes(s)){const i=s.charAt(0).toUpperCase()+s.slice(1);e.add(i)}})}),Array.from(e)},Ja=document.getElementById("destination-card-wrap"),He=document.getElementById("dest-suggestions-dropdown");if(Ja&&ke&&He){const e=()=>{const t=ke.value.toLowerCase().trim();let a=Po();a=["Anywhere",...a];const o=t.length>0?a.filter(n=>n.toLowerCase().includes(t)):a;if(o.length>0){He.style.display="block";let n='<div class="suggestion-header">Suggested Destinations</div>';o.forEach(i=>{n+=`<div class="suggestion-item" data-value="${i}">📍 ${i}</div>`}),He.innerHTML=n,He.querySelectorAll(".suggestion-item").forEach(i=>{i.addEventListener("click",d=>{d.stopPropagation();const c=i.dataset.value;c==="Anywhere"?(ke.value="",ke.placeholder="Anywhere"):ke.value=c,He.style.display="none",Re(),typeof $e=="function"&&$e(null,null,null)})})}else He.style.display="none"};Ja.addEventListener("click",t=>{t.target.closest(".suggestion-item")||(ke.focus(),e())}),ke.addEventListener("focus",()=>{e()}),ke.addEventListener("input",()=>{e()}),ke.addEventListener("blur",()=>{setTimeout(()=>{He.style.display="none"},250)})}const Z=document.getElementById("custom-calendar-popover"),ze=document.getElementById("calendar-mobile-overlay"),it=document.getElementById("dates-from-half"),st=document.getElementById("dates-to-half"),xt=document.getElementById("dates-from-value"),vt=document.getElementById("dates-to-value"),Oe=document.getElementById("btn-flexible-dates"),Pe=document.getElementById("dates-duration-summary");let ee=null,ve=null,Ge="from",fe=new Date().getMonth(),Ee=new Date().getFullYear();const Ao=["January","February","March","April","May","June","July","August","September","October","November","December"],Do=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Ya=e=>{if(!e)return"";const t=e.getDate(),o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()],n=e.getFullYear();return`${t} ${o} ${n}`},Ka=e=>{if(!e)return"";const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${o}`},wt=()=>{if(!xt||!vt)return;ee?(xt.innerText=Ya(ee),Oe.classList.remove("active")):xt.innerText="Select Date",ve?(vt.innerText=Ya(ve),Oe.classList.remove("active")):vt.innerText="Select Date";const e=it?it.querySelector(".dates-label"):null,t=st?st.querySelector(".dates-label"):null,a=Oe&&Oe.classList.contains("active");if(e&&(!ee&&!a?e.classList.add("text-blink-continuous"):e.classList.remove("text-blink-continuous")),t&&(ee&&!ve&&!a?t.classList.add("text-blink-continuous"):t.classList.remove("text-blink-continuous")),ee&&ve&&Pe){const o=ve.getTime()-ee.getTime(),n=Math.ceil(o/(1e3*60*60*24));n>0?(Pe.style.display="block",Pe.innerHTML=`🛏 ${n} Nights • ${n+1} Days`):Pe.style.display="none"}else Pe&&(Pe.style.display="none")},kt=()=>{if(console.log("renderCustomCalendar running. calPopover:",Z,"Month:",fe,"Year:",Ee),!Z)return;const e=new Date;e.setHours(0,0,0,0);let t=`
            <div class="cal-header">
                <button type="button" class="cal-nav-btn prev-month">←</button>
                <span class="cal-month-title">${Ao[fe]} ${Ee}</span>
                <button type="button" class="cal-nav-btn next-month">→</button>
            </div>
            <div class="cal-weekdays">
        `;Do.forEach(r=>{t+=`<span>${r}</span>`}),t+='</div><div class="cal-days">';let o=(new Date(Ee,fe,1).getDay()+6)%7;for(let r=0;r<o;r++)t+='<span class="cal-day disabled"></span>';const n=new Date(Ee,fe+1,0).getDate();for(let r=1;r<=n;r++){const b=new Date(Ee,fe,r);b.setHours(0,0,0,0);let m=b<e;Ge==="to"&&ee&&b<ee&&(m=!0);let v=["cal-day"];m&&v.push("disabled"),ee&&b.getTime()===ee.getTime()?v.push("selected-from"):ve&&b.getTime()===ve.getTime()?v.push("selected-to"):ee&&ve&&b>ee&&b<ve&&v.push("selected-range"),b.getTime()===e.getTime()&&v.push("is-today"),t+=`<span class="${v.join(" ")}" data-day="${r}">${r}</span>`}t+="</div>",t+=`
            <div class="cal-footer">
                <button type="button" class="cal-btn-clear">Clear</button>
                <button type="button" class="cal-btn-done" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 6px 16px;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Done</span>
                </button>
            </div>
        `,Z.innerHTML=t;const s=Z.querySelector(".prev-month"),i=Z.querySelector(".next-month");s&&s.addEventListener("click",r=>{r.stopPropagation(),fe--,fe<0&&(fe=11,Ee--),kt()}),i&&i.addEventListener("click",r=>{r.stopPropagation(),fe++,fe>11&&(fe=0,Ee++),kt()});const d=Z.querySelectorAll(".cal-day:not(.disabled)"),c=Z.querySelector(".cal-days");c&&Ge==="to"&&ee&&(d.forEach(r=>{r.addEventListener("mouseenter",()=>{const b=parseInt(r.dataset.day),m=new Date(Ee,fe,b);m.setHours(0,0,0,0),m>=ee&&d.forEach(v=>{const y=parseInt(v.dataset.day),h=new Date(Ee,fe,y);h.setHours(0,0,0,0),h>ee&&h<=m?v.classList.add("in-hover-range"):v.classList.remove("in-hover-range")})})}),c.addEventListener("mouseleave",()=>{d.forEach(r=>r.classList.remove("in-hover-range"))})),d.forEach(r=>{r.addEventListener("click",b=>{b.stopPropagation();const m=parseInt(r.dataset.day),v=new Date(Ee,fe,m);v.setHours(0,0,0,0),Ge==="from"?(ee=v,ve=null,Ge="to",ue&&(ue.value=Ka(v)),se&&(se.value=""),kt(),wt()):(ve=v,se&&(se.value=Ka(v)),wt(),rt(),tt())})});const g=Z.querySelector(".cal-btn-clear"),u=Z.querySelector(".cal-btn-done");g&&g.addEventListener("click",r=>{r.stopPropagation(),ee=null,ve=null,Ge="from",ue&&(ue.value=""),se&&(se.value=""),wt(),kt(),tt()}),u&&u.addEventListener("click",r=>{r.stopPropagation(),rt(),wt(),tt()})},Xa=e=>{console.log("openCalendar called with mode:",e),Ge=e,Z?(console.log("Setting calPopover display to block"),Z.style.display="block",setTimeout(()=>Z.classList.add("active"),10)):console.log("calPopover element is null!"),ze&&(ze.style.display="block",setTimeout(()=>ze.classList.add("active"),10)),kt()},rt=()=>{Z&&(Z.classList.remove("active"),setTimeout(()=>{Z.classList.contains("active")||(Z.style.display="none")},250)),ze&&(ze.classList.remove("active"),setTimeout(()=>{ze.classList.contains("active")||(ze.style.display="none")},250))};it&&it.addEventListener("click",e=>{console.log("FROM DATE CLICKED"),e.stopPropagation(),Xa("from")}),st&&st.addEventListener("click",e=>{console.log("TO DATE CLICKED"),e.stopPropagation(),Xa("to")}),Oe&&Oe.addEventListener("click",e=>{e.stopPropagation(),ee=null,ve=null,Ge="from",ue&&(ue.value=""),se&&(se.value=""),xt&&vt&&(xt.innerText="Flexible",vt.innerText="Flexible"),Pe&&(Pe.style.display="none"),Oe.classList.add("active"),rt(),tt()}),document.addEventListener("click",e=>{Z&&!Z.contains(e.target)&&(!it||!it.contains(e.target))&&(!st||!st.contains(e.target))&&rt()}),document.addEventListener("keydown",e=>{if(e.key==="Escape"){rt();const t=document.getElementById("checkout-payment-modal");if(t&&t.style.display==="flex"){t.style.display="none";return}const a=document.getElementById("customer-direct-pay-confirm-modal");if(a&&a.style.display==="flex"){a.style.display="none";return}const o=document.getElementById("customer-wait-verification-modal");if(o&&o.style.display==="flex"){o.style.display="none";return}const n=document.getElementById("price-breakdown-popup-sheet");if(n&&n.style.display==="block"){n.style.display="none";return}if(ce==="mobile-booking"&&p){const s=p.currentStep,i=p.pkg;s>1?(p.currentStep-=1,K(),ye()):window.innerWidth<768?(O("package-details",!0),ct(i)):me(i)}else if(ce==="package-details")O(Ne);else if(ce==="receipt-viewer")O("bookings",!0);else if(ce==="planner-profile"&&ft)O("package-details",!0),window.innerWidth<768?ct(ft):me(ft);else if(ce==="enquiries"){const s=document.getElementById("enquiries-cards-grid"),i=document.getElementById("enquiries-detail-workspace");i&&i.style.display==="block"&&(i.style.display="none",s&&(s.style.display="grid"))}else if(ce==="bookings"){const s=document.getElementById("bookings-cards-grid"),i=document.getElementById("bookings-detail-workspace");i&&i.style.display==="block"&&(i.style.display="none",s&&(s.style.display="grid"))}else if(ce==="trips"){const s=document.getElementById("trips-cards-grid"),i=document.getElementById("trips-detail-workspace");i&&i.style.display==="block"&&(i.style.display="none",s&&(s.style.display="grid"))}}}),ze&&ze.addEventListener("click",rt),wt();const Mt=document.querySelectorAll(".duration-chip"),_e=document.getElementById("match-duration"),Te=document.getElementById("duration-chip-flexible");Mt.length>0&&_e&&Mt.forEach(e=>{e.addEventListener("click",()=>{if(e===Te){if(!Te.querySelector("input")){Mt.forEach(a=>a.classList.remove("active")),Te.classList.add("active"),Te.innerHTML='<input type="number" class="chip-num-input" placeholder="Any" min="1" max="90" style="width: 100%; height: 100%; border: none; background: transparent; color: inherit; text-align: center; font-weight: 800; outline: none; font-size: 11px;">';const t=Te.querySelector("input");t.focus(),t.addEventListener("input",a=>{a.stopPropagation();const o=t.value;_e.value=o||"all",_e.dispatchEvent(new Event("change"))}),t.addEventListener("blur",()=>{setTimeout(()=>{t.value?Te.innerHTML=`<span>✏️</span> ${t.value} Days`:(Te.innerHTML="<span>✏️</span> Customizer",_e.value="all",_e.dispatchEvent(new Event("change")))},200)})}}else{Te&&Te.querySelector("input")&&(Te.innerHTML="<span>✏️</span> Customizer"),Mt.forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.value;_e.value=t,_e.dispatchEvent(new Event("change"))}})});const Qa=document.querySelectorAll(".budget-scale-ticks span");Qa.length>0&&Qa.forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const a=parseInt(e.dataset.val);if(isNaN(a))return;const o=Math.abs(a-ne),n=Math.abs(a-ie);o<n?ne=Math.min(a,ie-2e3):ie=Math.max(a,ne+2e3),Ve()})});const Mo=e=>{const t=new Date,a=new Date(e);if(t.toDateString()===a.toDateString())return"Today";const n=new Date(t);return n.setDate(t.getDate()-1),n.toDateString()===a.toDateString()?"Yesterday":"Earlier"},qo=e=>{const t=Math.floor((Date.now()-e)/1e3);if(t<60)return"Viewed just now";const a=Math.floor(t/60);if(a<60)return`Viewed ${a} minutes ago`;const o=Math.floor(a/60);return o<24?`Viewed ${o} hours ago`:"Viewed yesterday"},No=e=>{if(e.length<2)return"";let t=e[0],a=e[0],o=e[0];e.forEach(i=>{(i.matchScore||90)>(t.matchScore||90)&&(t=i),i.priceNum<a.priceNum&&(a=i);const d=parseFloat(i.rating.replace(/[^0-9.]/g,""))||4,c=parseFloat(o.rating.replace(/[^0-9.]/g,""))||4;d>c&&(o=i)});let n="";const s=e.filter(i=>i.title!==a.title).map(i=>i.priceNum);if(s.length>0){const i=s.reduce((c,g)=>c+g,0)/s.length,d=Math.round(i-a.priceNum);d>0&&(n=`"${a.title}" saves approximately ₹${d.toLocaleString()} compared to other choices.`)}return`
            <div style="font-size: 16px; margin-right: 12px; margin-top: 2px;">✨</div>
            <div>
                <strong style="color: var(--accent-cyan); display: block; font-size: 13px; font-weight: 800; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Beacon AI Insight</strong>
                <p style="font-size: 13px; line-height: 1.6; color: #fff; margin: 0;">
                    "${t.title}" is your strongest overall match at ${t.matchScore||95}%. 
                    ${n} 
                    "${o.title}" stands out with the highest traveler rating of ${o.rating}.
                </p>
            </div>
        `},Ro=e=>{let t=JSON.parse(localStorage.getItem("beacon_recent_views"))||[];t=t.filter(a=>a.title!==e.title),t.unshift({title:e.title,viewedAt:Date.now()}),t=t.slice(0,15),localStorage.setItem("beacon_recent_views",JSON.stringify(t))},Vo=e=>{const t=document.getElementById("similar-packages-grid");if(!t)return;let a=A.filter(i=>i.title!==e.title);a.forEach(i=>{let d=0;i.category===e.category&&(d+=40),i.style===e.style&&(d+=25);const c=Math.abs(i.priceNum-e.priceNum)/e.priceNum;c<=.3&&(d+=Math.round((1-c)*25)),Math.abs(i.duration-e.duration)<=1&&(d+=10),i.similarityScore=d}),a.sort((i,d)=>d.similarityScore-i.similarityScore);const o=a.slice(0,4);let n="";o.forEach(i=>{const d=Math.min(96,Math.max(78,Math.round(75+i.similarityScore/1.5))),c=_.includes(i.title),g=q.some(r=>r.title===i.title);let u="Popular choice";i.category===e.category?u="Same Destination":i.style===e.style?u=`Similar ${i.style}`:Math.abs(i.priceNum-e.priceNum)/e.priceNum<=.15&&(u="Similar budget"),n+=`
                <div class="travel-card rec-travel-card" style="cursor: pointer; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; position: relative;">
                    <div style="background-image: url('${i.imgUrl}'); background-size: cover; background-position: center; height: 140px; width: 100%; position: relative;">
                        <span style="position: absolute; top: 12px; left: 12px; background: rgba(3, 7, 18, 0.85); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); font-size: 9px; font-weight: 850; padding: 2px 6px; border-radius: 4px;">${d}% MATCH</span>
                    </div>
                    <div style="padding: 15px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                <span style="font-size: 10px; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">📍 ${i.category.toUpperCase()}</span>
                                <span style="font-size: 9.5px; color: var(--text-slate); font-weight: 700;">${u}</span>
                            </div>
                            <h4 class="card-title" style="font-size: 13px; font-weight: 800; color: #fff; margin: 0 0 6px 0; line-height: 1.4;">${i.title}</h4>
                            <span style="font-size: 11px; color: var(--text-slate); display: block; margin-bottom: 12px;">${i.duration} Days • ⭐ ${i.rating}</span>
                        </div>
                        
                        <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                            <strong style="font-size: 14px; color: var(--accent-cyan);">${i.priceStr}</strong>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <button type="button" class="btn-rec-save" style="background: transparent; border: none; font-size: 14px; cursor: pointer; color: ${c?"var(--accent-cyan)":"var(--text-slate)"}; outline: none;">${c?"❤️":"♡"}</button>
                                <button type="button" class="btn-rec-compare" style="background: transparent; border: none; font-size: 13px; cursor: pointer; color: ${g?"var(--accent-cyan)":"var(--text-slate)"}; font-weight: 800; outline: none;">${g?"✓":"+"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            `}),t.innerHTML=n,t.querySelectorAll(".rec-travel-card").forEach((i,d)=>{const c=o[d];i.addEventListener("click",r=>{r.target.closest("button")||me(c)});const g=i.querySelector(".btn-rec-save");g.addEventListener("click",r=>{r.stopPropagation(),qe(c.title);const b=_.includes(c.title);g.innerHTML=b?"❤️":"♡",g.style.color=b?"var(--accent-cyan)":"var(--text-slate)";const m=document.querySelector(".details-save-btn");m&&c.title===e.title&&(m.innerHTML=b?"❤️ Saved":"♡ Save")});const u=i.querySelector(".btn-rec-compare");u.addEventListener("click",r=>{r.stopPropagation();const b=q.some(v=>v.title===c.title);at(c,!b);const m=q.some(v=>v.title===c.title);u.innerHTML=m?"✓":"+",u.style.color=m?"var(--accent-cyan)":"var(--text-slate)"})})},Za=(e,t)=>{const a=document.getElementById("view-planner-profile");if(!a)return;O("planner-profile",!0);const o=e.name==="Rahul Mehta",n=A.filter(c=>c.title===t.title?!1:o?c.category==="beaches"||c.style==="couple":c.category==="mountains"||c.category==="nature"||c.category==="spiritual").slice(0,4);let s="";n.forEach(c=>{s+=`
                <div class="travel-card" style="cursor: pointer; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
                    <div style="background-image: url('${c.imgUrl}'); background-size: cover; background-position: center; height: 160px; width: 100%;"></div>
                    <div style="padding: 15px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <span style="font-size: 10px; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">📍 ${c.category.toUpperCase()}</span>
                            <h5 class="card-title" style="font-size: 13px; font-weight: 800; color: #fff; margin: 4px 0; line-height: 1.4;">${c.title}</h5>
                            <span style="font-size: 11px; color: var(--text-slate);">${c.duration} Days • ⭐ ${c.rating}</span>
                        </div>
                        <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
                            <strong style="font-size: 14px; color: var(--accent-cyan);">${c.priceStr}</strong>
                        </div>
                    </div>
                </div>
            `}),n.length===0&&(s='<div style="grid-column: 1/-1; color: var(--text-slate); font-size: 12.5px; font-style: italic; padding: 20px 0;">No other packages currently listed by this partner.</div>'),a.innerHTML=`
            <div class="details-back-bar">
                <button type="button" class="btn-profile-back" style="background: transparent; border: none; color: var(--text-slate); font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">← Back to ${t.title}</button>
            </div>
            
            <div class="details-container">
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">
                    <div>
                        <div style="background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 30px;">
                            <div class="partner-avatar" style="width: 100px; height: 100px; margin: 0 auto 15px auto; background-image: url('${e.avatar}'); border-radius: 50%; background-size: cover; background-position: center; border: 2px solid var(--accent-cyan);"></div>
                            <h3 style="font-size: 20px; font-weight: 850; color: #fff; margin: 0 0 6px 0; display: flex; align-items: center; justify-content: center; gap: 6px;">${e.name} <span style="font-size: 10px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 5px; border-radius: 3px; vertical-align: middle;">✓ VERIFIED</span></h3>
                            <span style="font-size: 12px; color: var(--text-slate); font-weight: 750; text-transform: uppercase;">${e.type}</span>
                            
                            <div style="margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; display: flex; flex-direction: column; gap: 12px; text-align: left;">
                                <div>
                                    <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Office / Base Location</span>
                                    <strong style="font-size: 13px; color: #fff;">${e.location}</strong>
                                </div>
                                <div>
                                    <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Languages Spoken</span>
                                    <strong style="font-size: 13px; color: #fff;">${e.languages.join(", ")}</strong>
                                </div>
                                <div>
                                    <span style="font-size: 11px; color: var(--text-slate); display: block; text-transform: uppercase;">Average response rate</span>
                                    <strong style="font-size: 13px; color: #22c55e;">${e.responseRate} (Usually responds in 20 min)</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div style="background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; margin-bottom: 40px;">
                            <h4 style="font-size: 17px; font-weight: 800; color: #fff; margin: 0 0 15px 0; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">About Partner / Biography</h4>
                            <p style="font-size: 13.5px; line-height: 1.7; color: var(--text-slate); margin-bottom: 25px;">${e.about} We coordinate verified luxury travel experiences directly on site to offer local expertise. Feel free to contact our support for customized modifications.</p>
                            
                            <h4 style="font-size: 17px; font-weight: 800; color: #fff; margin: 0 0 15px 0; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">Expertise & Certifications</h4>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 25px;">
                                ${e.expertise.map(c=>`<span style="font-size: 11.5px; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.06); padding: 4px 12px; border-radius: 4px; font-weight: 700;">${c}</span>`).join("")}
                            </div>
                            
                            <h4 style="font-size: 17px; font-weight: 800; color: #fff; margin: 0 0 15px 0; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">Track Record & Stats</h4>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                                <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; text-align: center;">
                                    <span style="font-size: 24px; font-weight: 850; color: var(--accent-cyan); display: block;">${e.trips}</span>
                                    <span style="font-size: 10px; color: var(--text-slate); text-transform: uppercase;">Trips Guided</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; text-align: center;">
                                    <span style="font-size: 24px; font-weight: 850; color: var(--accent-cyan); display: block;">${e.travelers}</span>
                                    <span style="font-size: 10px; color: var(--text-slate); text-transform: uppercase;">Travelers Hosted</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; text-align: center;">
                                    <span style="font-size: 24px; font-weight: 850; color: var(--accent-cyan); display: block;">${e.destinations}</span>
                                    <span style="font-size: 10px; color: var(--text-slate); text-transform: uppercase;">Destinations covered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 30px;">
                    <h3 style="font-size: 18px; font-weight: 850; color: #fff; margin-bottom: 20px;">💼 Other Packages by this Travel Partner</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;" id="partner-packages-grid">
                        ${s}
                    </div>
                </div>
            </div>
        `;const i=a.querySelector(".btn-profile-back");i&&i.addEventListener("click",()=>{if(O("package-details",!0),window.innerWidth<768){ct(pkg);return}}),a.querySelectorAll(".travel-card").forEach((c,g)=>{c.addEventListener("click",()=>{const u=n[g];u&&me(u)})})},me=e=>{ft=e,Ro(e);let t="My Collection";Ne==="home"?t="Home":Ne==="planner"?t="Trip Planner":Ne==="collection"&&(t="My Collection");const a=_.includes(e.title),o=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",n=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(o&&n){const l=f=>{const x=f.split("-");if(x.length===3){const z=new Date(x[0],x[1]-1,x[2]),re=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${z.getDate()} ${re[z.getMonth()]} ${z.getFullYear()}`}return f};`${l(o)}${l(n)}`}else{const l=new Date;l.toLocaleString("default",{month:"short"}),new Date(l.setMonth(l.getMonth()+3)).toLocaleString("default",{month:"short"}),new Date().getFullYear()}const s=q.some(l=>l.title===e.title),i=document.getElementById("view-package-details");if(!i)return;if(O("package-details",!0),window.innerWidth<768){ct(e);return}""+(e.basePrice||Math.round(e.priceNum*1.11)).toLocaleString();const c=e.inclusions?e.inclusions.split(",").map(l=>`<li>✓ ${l.trim()}</li>`).join(""):`
            <li>✓ Roundtrip Economy Flight</li>
            <li>✓ 4★ Hotel Stay (${e.accommodation||"Hotel"})</li>
            <li>✓ Meals: ${e.meals||"Breakfast Included"}</li>
            <li>✓ Transfer: ${e.transfers||"Private Airport Transfer"}</li>
        `,g=e.exclusions?e.exclusions.split(",").map(l=>`<li>✕ ${l.trim()}</li>`).join(""):`
            <li>✕ Personal expenses (Souvenirs, Laundry, Tips)</li>
            <li>✕ Visa Fees ${e.category==="international"?"(Required)":"(Not Applicable)"}</li>
            <li>✕ Sightseeing entry tickets not listed in schedule</li>
            <li>✕ Travel & Medical Insurance</li>
        `,r=e.style==="couple"||e.category==="beaches"?{name:"Rahul Mehta",type:"Freelance Trip Planner",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",rating:"4.9",reviews:126,location:"Pune, Maharashtra",experience:"8 Years",trips:342,responseRate:"98%",about:"I specialize in Goa, Kerala, and coastal honeymoon experiences. My goal is to customize every itinerary to fit your personal travel rhythm.",expertise:["Goa","Kerala","Maldives","Honeymoon","Luxury","Beach Trips"],languages:["English","Hindi","Marathi"],travelers:"1,280+",destinations:27}:{name:"Wanderlust Travels",type:"Travel Agency",avatar:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80",rating:"4.8",reviews:892,location:"Mumbai, Maharashtra",experience:"Operating since 2014",trips:"2,800+",responseRate:"95%",about:"Wanderlust Travels is a premier destination management company. We guarantee verified stays, premium coordinates, and 24/7 on-trip assistance.",expertise:["Himachal","Kashmir","Uttarakhand","Safari","Spiritual Tours"],languages:["English","Hindi","Gujarati","Punjabi"],travelers:"8,500+",destinations:45},b=e.duration||4,m=e.highlights?e.highlights.split(","):["Explore local viewpoints","Guided nature walk","Leisure tour of surrounding villages"],v=e.sightseeing?e.sightseeing.split(","):["Main square","Local markets","Scenic viewpoints"];let y="";for(let l=1;l<=b;l++){let f="",x="",z="",re="",he=[];if(l===1)f="Arrival & Resort Check-in",z="🚗 Private Airport Transfer Included",re="🌅 Sunset Beach Walk & Welcome Cocktail",x="Arrive at the destination. Transfer to your premium resort and check in. Enjoy a refreshing evening sunset cocktail at the local beach lounge.",he=["Dinner"];else if(l===b)f="Breakfast & Departure",z="🚗 Private Airport Transfer Included",re="🍳 Morning leisure & final checkout",x="Enjoy a delicious morning breakfast. Complete check-out formalities at the resort and board your private transfer back to the airport/station.",he=["Breakfast"];else{const Ke=(l-2)%m.length,Xe=(l-2)%v.length;f=m[Ke]?m[Ke].trim():"Local Sightseeing Tour",z="🚗 Local sightseeing private cab",re=`🌊 Explore ${v[Xe]?v[Xe].trim():"scenic highlights"}`,x=`Set out on an exciting sightseeing tour visiting ${v[Xe]?v[Xe].trim():"scenic highlights"}. Accompanied by a local coordinator to guide you through primary spots.`,he=["Breakfast","Lunch"],l%2===0&&he.push("Dinner")}const Nt=he.map(Ke=>`<span style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: var(--text-slate); font-size: 11px; padding: 2px 8px; border-radius: 12px; margin-right: 6px; font-weight: 750;">${Ke}</span>`).join("");y+=`
                <div class="itinerary-day-card" data-day="${l}">
                    <div class="itinerary-day-header">
                        <div class="itinerary-day-header-left">
                            <span class="day-badge">Day ${l}</span>
                            <span class="day-title-text">${f}</span>
                        </div>
                        <span class="day-arrow-indicator">▼</span>
                    </div>
                    <div class="itinerary-day-body">
                        <p style="font-size: 13px; color: var(--text-slate); line-height: 1.6; margin: 0 0 15px 0;">${x}</p>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <div style="font-size: 12.5px; color: var(--text-slate);">🚕 <strong>Transport:</strong><br>${z}</div>
                            <div style="font-size: 12.5px; color: var(--text-slate);">✨ <strong>Activities:</strong><br>${re}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: var(--text-slate);">
                            <span>🍴 <strong>Meals:</strong></span>
                            <div>${Nt}</div>
                        </div>
                    </div>
                </div>
            `}i.innerHTML=`
            <div class="details-back-bar">
                <button type="button" class="btn-details-back" style="background: transparent; border: none; color: var(--text-slate); font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">← Back to ${t}</button>
            </div>
            
            <div class="details-container">
                <div class="details-hero-grid">
                    <div class="details-gallery-wrap">
                        <div class="gallery-primary-img" style="background-image: url('${e.imgUrl}')"></div>
                        <div class="gallery-thumbnails">
                            <div class="gallery-thumb active" style="background-image: url('${e.imgUrl}')"></div>
                            <div class="gallery-thumb" style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80')"></div>
                            <div class="gallery-thumb" style="background-image: url('https://images.unsplash.com/photo-1473116763269-255ea76e7c23?auto=format&fit=crop&w=150&q=80')"></div>
                            <div class="gallery-thumb" style="background-image: url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=150&q=80')"></div>
                        </div>
                    </div>
                    
                    <div class="details-info-panel">
                        <div class="details-info-header">
                            <div class="details-info-meta">
                                <span>📍 ${e.category.toUpperCase()}</span>
                                <span class="style-badge">${e.style.toUpperCase()}</span>
                            </div>
                            <h2 class="details-info-title" style="font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 10px 0;">${e.title}</h2>
                            <div class="details-info-rating">⭐ ${e.rating} <span style="color: var(--text-slate); font-weight: 500;">(${e.reviews||88} reviews)</span></div>
                        </div>
                        
                        <div class="details-pricing-box">
                            <span class="price-label">Starting Price / Person</span>
                            <span class="price-value">${e.priceStr}</span>
                            <span style="display: block; font-size: 11.5px; color: var(--text-slate); margin-top: 4px;">✓ Taxes and transfers included</span>
                        </div>
                        
                        <div class="details-actions-deck">
                            <div class="action-buttons-row">
                                <button type="button" class="btn-secondary-action details-save-btn" style="padding: 12px; border-radius: 8px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 12.5px;">${a?"❤️ Saved":"♡ Save"}</button>
                                <button type="button" class="btn-secondary-action details-compare-btn" style="padding: 12px; border-radius: 8px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 12.5px;">${s?"✓ Compared":"+ Compare"}</button>
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
                        <span class="info-val">${e.duration} Days</span>
                    </div>
                    <div class="quick-info-card">
                        <span class="info-icon">🏨</span>
                        <span class="info-label">Resort</span>
                        <span class="info-val">4★ ${e.accommodation||"Hotel"}</span>
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
                        <span class="info-val">${e.style}</span>
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
                    <p style="font-size: 13.5px; line-height: 1.7; color: var(--text-slate); margin-bottom: 25px;">${e.highlights||"Experience the best of local food, sightseeing, and scenic guides customized for your comfort. Spend relaxing days exploring the beauty of your destination."}</p>
                    
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
                        ${y}
                    </div>
                </div>

                <div class="details-section-block" id="sec-stay">
                    <h3 class="details-section-title"><span>🏨</span> Resort & Accommodations</h3>
                    <div class="stay-hotel-card">
                        <div class="stay-hotel-img" style="background-image: url('${e.imgUrl}')"></div>
                        <div class="stay-hotel-details">
                            <div>
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                                    <span style="font-size: 11px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 5px; border-radius: 3px;">★★★★</span>
                                    <span style="font-size: 11px; color: var(--text-slate); font-weight: 750;">Premium Resort Category</span>
                                </div>
                                <h4 style="font-size: 17px; font-weight: 850; color: #fff; margin: 0 0 6px 0;">${e.hotelName||"Premium Resort Stay"}</h4>
                                <span style="font-size: 12px; color: var(--text-slate); display: block; margin-bottom: 12px;">📍 ${e.hotelAddress||"Local Beachside Area"}</span>
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
                                ${c}
                            </ul>
                        </div>
                        <div style="background: rgba(239, 68, 68, 0.01); border: 1px solid rgba(239, 68, 68, 0.1); border-radius: 12px; padding: 20px;">
                            <h4 style="color: #ef4444; font-weight: 800; font-size: 13.5px; margin: 0 0 15px 0;">✕ NOT INCLUDED</h4>
                            <ul style="margin: 0; padding: 0; list-style: none; font-size: 12.5px; color: var(--text-slate); display: flex; flex-direction: column; gap: 8px;">
                                ${g}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="details-section-block" id="sec-partner">
                    <h3 class="details-section-title"><span>🤝</span> Meet Your Travel Partner</h3>
                    <div class="partner-profile-card">
                        <div class="partner-profile-header">
                            <div class="partner-avatar" style="background-image: url('${r.avatar}')"></div>
                            <div class="partner-name-col">
                                <h4>${r.name} <span style="font-size: 10px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 5px; border-radius: 3px; vertical-align: middle;">✓ BEACON VERIFIED</span></h4>
                                <span style="font-size: 12px; color: var(--text-slate); font-weight: 700;">${r.type}</span>
                                <div style="font-size: 11.5px; color: var(--text-slate); margin-top: 4px;">⭐ ${r.rating} (${r.reviews} Reviews) • 📍 ${r.location}</div>
                            </div>
                        </div>
                        
                        <div class="partner-stats-grid">
                            <div class="partner-stat-item">
                                <span style="font-size: 10px; color: var(--text-slate); display: block; text-transform: uppercase;">Trips Completed</span>
                                <strong style="font-size: 14px; color: #fff;">${r.trips}</strong>
                            </div>
                            <div class="partner-stat-item">
                                <span style="font-size: 10px; color: var(--text-slate); display: block; text-transform: uppercase;">Experience</span>
                                <strong style="font-size: 14px; color: #fff;">${r.experience}</strong>
                            </div>
                            <div class="partner-stat-item">
                                <span style="font-size: 10px; color: var(--text-slate); display: block; text-transform: uppercase;">Response Rate</span>
                                <strong style="font-size: 14px; color: #fff;">${r.responseRate}</strong>
                            </div>
                            <div class="partner-stat-item">
                                <span style="font-size: 10px; color: var(--text-slate); display: block; text-transform: uppercase;">Languages</span>
                                <strong style="font-size: 11.5px; color: #fff;">English, Hindi</strong>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="font-size: 12.5px; color: #fff; display: block; margin-bottom: 6px;">About</strong>
                            <p style="font-size: 12px; line-height: 1.6; color: var(--text-slate); margin: 0;">"${r.about}"</p>
                        </div>
                        
                        <div style="margin-bottom: 25px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                            <span style="font-size: 12px; color: var(--text-slate);">Expertise:</span>
                            ${r.expertise.map(l=>`<span style="font-size: 10px; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px; font-weight: 700;">${l}</span>`).join("")}
                        </div>
                        
                        <button type="button" class="btn-primary-large btn-view-full-profile" style="padding: 10px 20px; font-size: 12px; font-weight: 800; border-radius: 6px; cursor: pointer; border: 1px solid var(--accent-cyan); background: transparent; color: var(--accent-cyan); transition: all 0.2s;">View Full Profile</button>
                    </div>
                </div>

                <div class="details-section-block" id="sec-reviews">
                    <h3 class="details-section-title"><span>⭐</span> Ratings & Guest Reviews</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px;">
                        <div style="text-align: center; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 25px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <span style="font-size: 38px; font-weight: 850; color: #fff; display: block; line-height: 1;">${e.rating.replace(/[^0-9.]/g,"")}</span>
                            <span style="color: var(--accent-cyan); font-size: 16px; margin: 5px 0;">★★★★★</span>
                            <span style="font-size: 12px; color: var(--text-slate); font-weight: 700;">Based on ${e.reviews||88} traveler ratings</span>
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
                            <div class="policy-accordion-body">${e.cancellation||"Free cancellation within 24 hours of booking."} 100% refund up to 30 days prior; 50% refund between 15-29 days; non-refundable within 14 days of departure.</div>
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
                    <strong style="font-size: 18px; font-weight: 850; color: var(--accent-cyan);">${e.priceStr} <span style="font-size: 11px; color: #fff; font-weight: 500;">/ person</span></strong>
                </div>
                <div class="sticky-bar-actions">
                    <button type="button" class="btn-secondary-action details-save-btn" style="padding: 10px 16px; border-radius: 8px; font-weight: 800; font-size: 12.5px;">${a?"❤️ Saved":"♡ Save"}</button>
                    <button type="button" class="btn-secondary-action details-compare-btn" style="padding: 10px 16px; border-radius: 8px; font-weight: 800; font-size: 12.5px;">${s?"✓ Compared":"+ Compare"}</button>
                    <button type="button" class="btn-primary-large details-book-btn" style="padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 12.5px; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer;">Book Now</button>
                </div>
            </div>
        `,window.scrollTo({top:0,behavior:"instant"});const h=i.querySelector(".btn-details-back");h&&h.addEventListener("click",()=>{O(Ne)});const T=i.querySelectorAll(".itinerary-day-card");T.forEach(l=>{l.querySelector(".itinerary-day-header").addEventListener("click",()=>{l.classList.contains("active")?l.classList.remove("active"):l.classList.add("active")})});const k=i.querySelector(".btn-toggle-all-days");k&&k.addEventListener("click",()=>{const l=Array.from(T).some(f=>!f.classList.contains("active"));T.forEach(f=>{l?f.classList.add("active"):f.classList.remove("active")}),k.innerText=l?"Collapse All Days":"View All Days"});const L=i.querySelectorAll(".policy-accordion-card");L.forEach(l=>{l.querySelector(".policy-accordion-header").addEventListener("click",()=>{const x=l.classList.contains("active");L.forEach(z=>z.classList.remove("active")),x||l.classList.add("active")})});const E=i.querySelectorAll(".gallery-thumb"),$=i.querySelector(".gallery-primary-img");E.forEach(l=>{l.addEventListener("click",()=>{E.forEach(f=>f.classList.remove("active")),l.classList.add("active"),$.style.backgroundImage=l.style.backgroundImage})});const U=i.querySelectorAll(".details-nav-item");U.forEach(l=>{l.addEventListener("click",()=>{U.forEach(x=>x.classList.remove("active")),l.classList.add("active");const f=i.querySelector(`#sec-${l.dataset.sec}`);f&&f.scrollIntoView({behavior:"smooth",block:"start"})})});const pe=i.querySelectorAll(".details-section-block"),R=()=>{if(ce!=="package-details")return;const l=window.scrollY+150;pe.forEach(f=>{if(l>=f.offsetTop&&l<f.offsetTop+f.offsetHeight){const x=f.id.replace("sec-","");U.forEach(z=>{z.dataset.sec===x?z.classList.add("active"):z.classList.remove("active")})}})};window.addEventListener("scroll",R);const N=i.querySelectorAll(".details-save-btn"),H=()=>{N.forEach(l=>{_.includes(e.title)?(l.innerHTML="❤️ Saved",l.style.color="var(--accent-cyan)",l.style.borderColor="var(--accent-cyan)"):(l.innerHTML="♡ Save",l.style.color="#fff",l.style.borderColor="rgba(255, 255, 255, 0.08)")})};H(),N.forEach(l=>{l.addEventListener("click",()=>{qe(e.title),H()})});const F=i.querySelectorAll(".details-compare-btn"),X=()=>{F.forEach(l=>{q.some(f=>f.title===e.title)?(l.innerHTML="✓ Compared",l.style.color="var(--accent-cyan)",l.style.borderColor="var(--accent-cyan)"):(l.innerHTML="+ Compare",l.style.color="#fff",l.style.borderColor="rgba(255, 255, 255, 0.08)")})};X(),F.forEach(l=>{l.addEventListener("click",()=>{const f=!q.some(x=>x.title===e.title);at(e,f),X()})});const ge=i.querySelector(".details-share-btn");ge&&ge.addEventListener("click",()=>{openShareSheet(e)}),i.querySelectorAll(".details-enquiry-btn").forEach(l=>{l.addEventListener("click",()=>{showToast("📩 Redirecting to Enquiries page..."),O("enquiries")})}),i.querySelectorAll(".details-book-btn").forEach(l=>{l.addEventListener("click",()=>{ba(e)})});const be=i.querySelector(".btn-view-full-profile");be&&be.addEventListener("click",()=>{Za(r,e)}),Vo(e)},We=()=>{const e=document.getElementById("collection-saved-list");if(e){if(_.length===0){e.innerHTML=`
                <div class="collection-empty-state">
                    <span class="empty-icon">📂</span>
                    <h4>Your travel wishlist starts here.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">Packages you save while browsing will appear in this collection.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Explore Packages</button>
                </div>
            `;return}e.innerHTML="",_.forEach(t=>{const a=A.find(i=>i.title.trim()===t.trim())||{title:t,imgUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",priceStr:"₹14,999",priceNum:14999,category:"beaches",duration:4,rating:"⭐ 4.8",style:"family"},o=q.some(i=>i.title===a.title),n=document.createElement("div");n.className="saved-card-horizontal",n.innerHTML=`
                <div class="card-img-col" style="background-image: url('${a.imgUrl}')"></div>
                <div class="card-details-col">
                    <div>
                        <div class="card-title-row">
                            <h4 class="card-title">${a.title}</h4>
                            <span class="partner-verified">✓ Verified Partner</span>
                        </div>
                        <div class="card-meta">
                            <span>📍 ${a.category.toUpperCase()}</span>
                            <span class="card-meta-dot"></span>
                            <span>${a.duration} Days</span>
                            <span class="card-meta-dot"></span>
                            <span>${a.rating}</span>
                        </div>
                        <div class="card-info-grid">
                            <div>👥 <strong>Trip Type:</strong> ${a.style||"Couple"}</div>
                            <div>🏢 <strong>Planner:</strong> Wanderlust Travels</div>
                        </div>
                    </div>
                    <div>
                        <span style="font-size: 11px; color: var(--text-slate);">Starting price per person</span>
                        <div style="font-size: 18px; font-weight: 800; color: var(--accent-cyan);">${a.priceStr}</div>
                    </div>
                </div>
                <div class="card-actions-col">
                    <button class="btn-action btn-secondary-action btn-add-compare">${o?"Added to Compare":"Add to Compare"}</button>
                    <button class="btn-action btn-remove">Remove from Saved</button>
                </div>
            `,n.style.cursor="pointer",n.addEventListener("click",i=>{i.target.closest(".btn-add-compare")||i.target.closest(".btn-remove")||me(a)});const s=n.querySelector(".btn-add-compare");s.addEventListener("click",()=>{const i=!q.some(c=>c.title===a.title);at(a,i),s.innerText=i?"Added to Compare":"Add to Compare";const d=document.querySelector(`.card-compare-checkbox[data-title="${a.title}"]`);d&&(d.checked=i)}),n.querySelector(".btn-remove").addEventListener("click",()=>{n.style.maxHeight=n.offsetHeight+"px",n.style.transition="all 0.3s",n.style.opacity="0",n.style.transform="scale(0.95)",setTimeout(()=>{qe(a.title)},300)}),e.appendChild(n)})}},lt=()=>{const e=document.getElementById("compare-selection-list"),t=document.getElementById("compare-trigger-row"),a=document.getElementById("comparison-results-view");if(e){if(q.length===0){e.innerHTML=`
                <div class="collection-empty-state" style="grid-column: 1/-1;">
                    <span class="empty-icon">⚖️</span>
                    <h4>Add a few journeys and we'll help you choose.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">You can select up to 3 packages from wishlist or searches to compare side-by-side.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Explore Packages</button>
                </div>
            `,t.style.display="none",a.style.display="none";return}e.innerHTML="",t.style.display="block",q.forEach(o=>{const n=document.createElement("div");n.className="compare-selection-card selected",n.style.cursor="pointer",n.innerHTML=`
                <span class="card-title">${o.title}</span>
                <span class="compare-checkbox-indicator">✓</span>
            `,n.addEventListener("click",()=>{at(o,!1);const s=document.querySelector(`.card-compare-checkbox[data-title="${o.title}"]`);s&&(s.checked=!1),lt()}),e.appendChild(n)}),q.length>=2?eo():a.style.display="none"}},eo=()=>{const e=document.getElementById("comparison-results-view"),t=document.getElementById("collection-compare-table"),a=document.getElementById("ai-compare-insight-card");if(!t||!e)return;e.style.display="block";let o=0,n=0,s=0,i=-1,d=1/0,c=-1;q.forEach((r,b)=>{const m=parseFloat(r.rating.replace(/[^0-9.]/g,""))||4.5;r.matchScore=Math.round(90+m*2-r.priceNum/15e4*5),r.matchScore>i&&(i=r.matchScore,o=b),r.priceNum<d&&(d=r.priceNum,n=b),m>c&&(c=m,s=b)}),a&&(a.innerHTML=No(q));let g='<thead><tr><th class="matrix-header-col">Attributes</th>';q.forEach((r,b)=>{let m="";b===o&&(m+='<span class="compare-badge-ribbon ribbon-best-match">Best Match</span><br>'),b===n&&(m+='<span class="compare-badge-ribbon ribbon-best-price">Best Price</span><br>'),b===s&&(m+='<span class="compare-badge-ribbon ribbon-best-rated">Best Rated</span><br>'),g+=`<th style="vertical-align: bottom;">
                <div style="min-height: 50px;">${m}</div>
                <div class="matrix-pkg-title" style="margin-top: 5px;">${r.title}</div>
            </th>`}),g+="</tr></thead><tbody>",[{label:"Destination",key:"category",highlight:!1,format:r=>r.toUpperCase()},{label:"Price / Person",key:"priceStr",highlight:!0},{label:"Duration",key:"duration",highlight:!1,format:r=>`${r} Days`},{label:"Rating",key:"rating",highlight:!0},{label:"Hotel",key:"accommodation",highlight:!1,format:r=>r?r.charAt(0).toUpperCase()+r.slice(1):"4★ Accommodation"},{label:"Meals",key:"meals",highlight:!1,format:r=>r||"Breakfast Included"},{label:"Transportation",key:"transport",highlight:!1,format:r=>r?r.charAt(0).toUpperCase()+r.slice(1):"Private Cab"},{label:"Activities",key:"highlights",highlight:!1,format:r=>`${r?r.split(",").length:3} Major Activities`},{label:"Flights",key:"transport",highlight:!1,format:r=>r==="flight"?"✓ Included":"✕ Excluded"},{label:"Guide",key:"highlights",highlight:!1,format:r=>r&&(r.toLowerCase().includes("guide")||r.toLowerCase().includes("naturalist"))?"✓ Certified Guide":"✓ Local Assist"},{label:"Trip Type",key:"style",highlight:!1,format:r=>r?r.charAt(0).toUpperCase()+r.slice(1):"Family"},{label:"Cancellation Policy",key:"cancellation",highlight:!1,format:r=>r||"Free cancellation within 24 hours"},{label:"Planner / Company",key:"planner",highlight:!1,format:r=>r||"Wanderlust Travels"},{label:"Beacon Match %",key:"matchScore",highlight:!0,format:r=>`${r}% Match`}].forEach(r=>{g+=`<tr><td class="matrix-header-col">${r.label}</td>`,q.forEach((b,m)=>{const v=b[r.key],y=r.format?r.format(v):v||"N/A";g+=`<td class="${r.highlight?"highlight-diff":""}">${y}</td>`}),g+="</tr>"}),g+='<tr><td class="matrix-header-col" style="border-bottom: none;">Actions</td>',q.forEach(r=>{g+=`<td style="border-bottom: none;">
                <div style="display: flex; gap: 10px;">
                    <button type="button" class="btn-primary-large view-pkg-compare" data-title="${r.title}" style="padding: 8px 12px; font-size: 11px; flex: 1; border-radius: 6px; cursor: pointer;">View Package</button>
                    <button type="button" class="btn-secondary-action send-enquiry-compare" style="padding: 8px 12px; font-size: 11px; flex: 1; border-radius: 6px; cursor: pointer; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #fff;">Send Enquiry</button>
                </div>
            </td>`}),g+="</tr></tbody>",t.innerHTML=g,t.querySelectorAll(".view-pkg-compare").forEach(r=>{r.addEventListener("click",()=>{const b=r.dataset.title,m=A.find(v=>v.title===b);m&&me(m)})}),t.querySelectorAll(".send-enquiry-compare").forEach(r=>{r.addEventListener("click",()=>{showToast("📩 Redirecting to Enquiries page..."),O("enquiries")})})},to=()=>{const e=document.getElementById("collection-recent-list");if(!e)return;const t=JSON.parse(localStorage.getItem("beacon_recent_views"))||[];if(t.length===0){e.innerHTML=`
                <div class="collection-empty-state">
                    <span class="empty-icon">⏳</span>
                    <h4>Trips you explore will appear here.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">Packages whose details you open will be cataloged here for quick review.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Start Exploring</button>
                </div>
            `;return}e.innerHTML="";const a={Today:[],Yesterday:[],Earlier:[]};t.forEach(o=>{const n=A.find(s=>s.title.trim()===o.title.trim());if(n){const s=Mo(o.viewedAt);a[s].push({pkg:n,timestamp:o.viewedAt})}});for(let o in a){const n=a[o];if(n.length===0)continue;const s=document.createElement("div");s.className="timeline-group-header",s.innerText=o,e.appendChild(s);const i=document.createElement("div");i.className="recent-timeline-cards",n.forEach(d=>{const c=d.pkg,g=_.includes(c.title),u=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",r=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(u&&r){const h=T=>{const k=T.split("-");if(k.length===3){const L=new Date(k[0],k[1]-1,k[2]),E=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${L.getDate()} ${E[L.getMonth()]} ${L.getFullYear()}`}return T};`${h(u)}${h(r)}`}else{const h=new Date;h.toLocaleString("default",{month:"short"}),new Date(h.setMonth(h.getMonth()+3)).toLocaleString("default",{month:"short"}),new Date().getFullYear()}const b=q.some(h=>h.title===c.title),m=document.createElement("div");m.className="saved-card-horizontal",m.innerHTML=`
                    <div class="card-img-col" style="background-image: url('${c.imgUrl}')"></div>
                    <div class="card-details-col">
                        <div>
                            <div class="card-title-row">
                                <h4 class="card-title">${c.title}</h4>
                                <span style="font-size: 11px; font-weight: 700; color: var(--accent-cyan);">${qo(d.timestamp)}</span>
                            </div>
                            <div class="card-meta">
                                <span>📍 ${c.category.toUpperCase()}</span>
                                <span class="card-meta-dot"></span>
                                <span>${c.duration} Days</span>
                                <span class="card-meta-dot"></span>
                                <span>${c.rating}</span>
                            </div>
                            <p style="font-size: 12px; color: var(--text-slate); margin: 0 0 10px 0;">✨ Highlights: ${c.highlights}</p>
                        </div>
                        <div>
                            <div style="font-size: 16px; font-weight: 800; color: var(--accent-cyan);">${c.priceStr}</div>
                        </div>
                    </div>
                    <div class="card-actions-col">
                        <button class="btn-action btn-secondary-action btn-save">${g?"Saved":"Save"}</button>
                        <button class="btn-action btn-secondary-action btn-add-compare">${b?"Added to Compare":"Add to Compare"}</button>
                    </div>
                `,m.style.cursor="pointer",m.addEventListener("click",h=>{h.target.closest(".btn-save")||h.target.closest(".btn-add-compare")||me(c)});const v=m.querySelector(".btn-save");v.addEventListener("click",()=>{qe(c.title),v.innerText=_.includes(c.title)?"Saved":"Save",Ce()});const y=m.querySelector(".btn-add-compare");y.addEventListener("click",()=>{const h=!q.some(k=>k.title===c.title);at(c,h),y.innerText=h?"Added to Compare":"Add to Compare";const T=document.querySelector(`.card-compare-checkbox[data-title="${c.title}"]`);T&&(T.checked=h)}),i.appendChild(m)}),e.appendChild(i)}},ao=()=>{const e=document.querySelectorAll(".collection-tab"),t=document.querySelectorAll(".collection-panel"),a=document.querySelector(".collection-tab-indicator");if(e.length===0)return;const o=d=>{a&&(a.style.width=`${d.offsetWidth}px`,a.style.left=`${d.offsetLeft}px`)};e.forEach(d=>{d.addEventListener("click",()=>{e.forEach(g=>g.classList.remove("active")),t.forEach(g=>g.classList.remove("active")),d.classList.add("active");const c=document.getElementById(`collection-${d.dataset.tab}-tab`);c&&c.classList.add("active"),o(d),d.dataset.tab==="saved"?We():d.dataset.tab==="compare"?lt():d.dataset.tab==="recent"&&to()})});const n=document.querySelector(".collection-tab.active");n&&setTimeout(()=>o(n),100);const s=document.getElementById("btn-run-comparison");s&&s.addEventListener("click",()=>{eo()});const i=document.getElementById("btn-clear-recent-history");i&&i.addEventListener("click",()=>{confirm("Are you sure you want to clear your recently viewed history?")&&(localStorage.removeItem("beacon_recent_views"),to(),showToast("⏳ View history cleared."))})};document.body.addEventListener("click",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest(".compare-checkbox-label")||e.target.closest("a")||e.target.closest(".remove-btn"))return;const t=e.target.closest(".travel-card, .trending-curved-card, .bespoke-card, .saved-card-horizontal");if(t){const a=t.querySelector(".card-title, .bespoke-title");if(a){const o=a.innerText.trim();let n=A.find(s=>s.title.trim()===o);if(n||(n=A.find(s=>s.title.toLowerCase().includes(o.toLowerCase())||o.toLowerCase().includes(s.title.toLowerCase()))),!n){const s=o.toLowerCase().split(/\s+/).filter(i=>i.length>3);s.length>0&&(n=A.find(i=>s.some(d=>i.title.toLowerCase().includes(d))))}if(!n&&A.length>0){const s=o.toLowerCase();s.includes("beach")||s.includes("goa")||s.includes("island")||s.includes("coast")||s.includes("sea")?n=A.find(i=>i.category==="beaches"):(s.includes("mountain")||s.includes("peaks")||s.includes("valley")||s.includes("hills")||s.includes("trek")||s.includes("snow"))&&(n=A.find(i=>i.category==="mountains")),n||(n=A[0])}n?me(n):console.warn("Could not find matching package for title:",o)}}});const Fo=()=>{const e=document.getElementById("mobile-home-discovery");if(!e)return;const t=[{title:"Trekking",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Camping",bg:"https://images.unsplash.com/photo-1478131148058-76f5597951c6?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Road Trips",bg:"https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Beach Escapes",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",filter:"beaches"},{title:"Mountains",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Backpacking",bg:"https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Adventure",bg:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=300&q=80",filter:"mountains"}],a=[{name:"Goa",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",query:"Goa"},{name:"Kashmir",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",query:"Kashmir"},{name:"Ladakh",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80",query:"Ladakh"},{name:"Kerala",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=300&q=80",query:"Kerala"},{name:"Himachal",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=80",query:"Manali"},{name:"Rajasthan",bg:"https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=300&q=80",query:"Rajasthan"}],o=y=>{const h=_.includes(y.title),T=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",k=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(T&&k){const R=N=>{const H=N.split("-");if(H.length===3){const F=new Date(H[0],H[1]-1,H[2]),X=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${F.getDate()} ${X[F.getMonth()]} ${F.getFullYear()}`}return N};`${R(T)}${R(k)}`}else{const R=new Date;R.toLocaleString("default",{month:"short"}),new Date(R.setMonth(R.getMonth()+3)).toLocaleString("default",{month:"short"}),new Date().getFullYear()}const L=localStorage.getItem("liked_"+y.title)==="true",E='<img src="save-icon.png" class="mobile-png-icon">',$='<img src="share-icon.png" class="mobile-png-icon">',U='<img src="like-icon.png" class="mobile-png-icon">',pe=y.priceStr||y.price;return`
                <div class="mobile-compact-card" data-title="${y.title}">
                    <div class="card-img" style="background-image: url('${y.bg||y.imgUrl}')">
                        <button type="button" class="mobile-card-like-btn ${L?"active":""}">${U}</button>
                        <button type="button" class="mobile-card-share-btn">${$}</button>
                        <button type="button" class="mobile-card-fav-btn ${h?"active":""}">${E}</button>
                    </div>
                    <div class="card-info">
                        <div class="card-name">${y.title}</div>
                        <div class="card-meta-row">
                            <span>📍 ${y.type||y.category.toUpperCase()}</span>
                            <span>${y.duration}</span>
                        </div>
                        <div class="card-footer-row">
                            <span class="card-rating">⭐ ${y.rating}</span>
                            <span class="card-price">${pe}</span>
                        </div>
                    </div>
                </div>
            `},n=y=>{y.querySelectorAll(".mobile-compact-card").forEach(h=>{const T=h.dataset.title,k=A.find(N=>N.title===T);if(!k)return;h.onclick=N=>{N.target.closest(".mobile-card-fav-btn")||N.target.closest(".mobile-card-share-btn")||N.target.closest(".mobile-card-like-btn")||me(k)};const L=h.querySelector(".mobile-card-like-btn");L&&(L.onclick=N=>{N.stopPropagation();const F=!(localStorage.getItem("liked_"+k.title)==="true");localStorage.setItem("liked_"+k.title,F?"true":"false"),F?L.classList.add("active"):L.classList.remove("active"),L.classList.add("pop-bounce"),setTimeout(()=>L.classList.remove("pop-bounce"),300),window.showToast(F?"Liked package!":"Unliked package")});const E=h.querySelector(".mobile-card-share-btn");E&&(E.onclick=N=>{N.stopPropagation(),openShareSheet(k)});const $=h.querySelector(".mobile-card-fav-btn");$&&($.onclick=N=>{N.stopPropagation(),toggleSavedPackage(k.title);const H=_.includes(k.title);H?$.classList.add("active"):$.classList.remove("active"),$.classList.add("pop-bounce"),setTimeout(()=>$.classList.remove("pop-bounce"),300);const F=document.getElementById("playground-toast");F&&(F.innerText=H?"Saved to My Collection":"Removed from Collection",F.classList.add("active"),setTimeout(()=>F.classList.remove("active"),2200)),ot(),Ce()});let U=null;const pe=N=>{U=setTimeout(()=>{const H=document.getElementById("playground-preview-sheet"),F=document.getElementById("playground-preview-backdrop"),X=document.getElementById("preview-sheet-title"),ge=document.querySelector("#playground-preview-sheet p"),Je=document.querySelector('#playground-preview-sheet span[style*="accent-cyan"]'),Ye=document.querySelector('#playground-preview-sheet span[style*="font-size: 12px"]'),be=document.getElementById("btn-close-sheet-preview");H&&F&&(X&&(X.innerText=k.title),ge&&(ge.innerText=k.highlights||k.description||"Experience the best of local food, sightseeing, and scenic guides customized for your comfort."),Je&&(Je.innerText=k.price||k.priceStr),Ye&&(Ye.innerText=`⏱ ${k.duration} • ${k.type||k.category.toUpperCase()}`),be&&(be.onclick=()=>{H.classList.remove("active"),setTimeout(()=>F.style.display="none",300),me(k)}),F.style.display="block",setTimeout(()=>H.classList.add("active"),50))},500)},R=()=>{U&&clearTimeout(U)};h.addEventListener("mousedown",pe),h.addEventListener("touchstart",pe),h.addEventListener("mouseup",R),h.addEventListener("touchend",R),h.addEventListener("mouseleave",R)})},s=e.querySelectorAll(".mobile-chip");s.forEach(y=>{y.onclick=()=>{s.forEach(T=>T.classList.remove("active")),y.classList.add("active");const h=y.dataset.filter;i(h)}});const i=y=>{["rail-top-picks","rail-trending","rail-weekend","rail-adventure","rail-beaches","rail-more-journeys"].forEach(T=>{const k=document.getElementById(T);if(!k)return;const L=k.querySelector(".rail-items-scroll");let E=[];T==="rail-top-picks"?E=A.slice(0,3):T==="rail-trending"?E=[...A].reverse().slice(0,4):T==="rail-weekend"?E=A.filter($=>parseInt(d($))<=4):T==="rail-adventure"?E=A.filter($=>$.style==="adventure"||$.category==="mountains"||$.experiences==="trekking"||$.title&&$.title.toLowerCase().includes("expedition")):T==="rail-beaches"?E=A.filter($=>$.category==="beaches"||$.experiences==="beaches"||$.title&&$.title.toLowerCase().includes("beach")):E=A.slice(2,6),y!=="all"&&(E=E.filter($=>$.category===y)),E.length===0?k.style.display="none":(k.style.display="block",L.innerHTML=E.map($=>o($)).join(""),n(L))})},d=y=>y.duration===void 0||y.duration===null?"5":String(y.duration).replace(/[^0-9]/g,"")||"5",c=()=>{const y=document.getElementById("mobile-featured-carousel");if(!y)return;const h=[A.find(E=>E.title.includes("Ladakh"))||A[0],A.find(E=>E.title.includes("Goa"))||A[1],A.find(E=>E.title.includes("Kashmir"))||A[2]].filter(Boolean);let T=0;const k=()=>{const E=h[T],$=_.includes(E.title),U=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",pe=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(U&&pe){const N=H=>{const F=H.split("-");if(F.length===3){const X=new Date(F[0],F[1]-1,F[2]),ge=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${X.getDate()} ${ge[X.getMonth()]} ${X.getFullYear()}`}return H};`${N(U)}${N(pe)}`}else{const N=new Date;N.toLocaleString("default",{month:"short"}),new Date(N.setMonth(N.getMonth()+3)).toLocaleString("default",{month:"short"}),new Date().getFullYear()}y.innerHTML=`
                    <div class="hero-carousel-item" style="background-image: url('${E.bg||E.imgUrl}')">
                        <div class="hero-carousel-overlay"></div>
                        <div class="hero-carousel-content">
                            <span class="hero-carousel-tag">Featured Journey • ${E.type||E.category.toUpperCase()}</span>
                            <h2 class="hero-carousel-title">${E.title}</h2>
                            <div class="hero-carousel-meta">
                                <span>⏱ ${E.duration}</span> &bull; 
                                <span>⭐ ${E.rating} Rating</span>
                            </div>
                            <div class="hero-carousel-price">
                                Starting from <strong>${E.price||E.priceStr}</strong>
                            </div>
                            <div class="hero-carousel-buttons">
                                <button type="button" class="btn-primary-large btn-hero-view" style="flex: 2; padding: 10px 16px; border-radius: 8px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer; font-size: 13px; outline: none;">View Package</button>
                                <button type="button" class="btn-secondary-action btn-hero-save" style="flex: 1; padding: 10px; border-radius: 8px; font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px;">${$?"❤️ Saved":"♡ Save"}</button>
                            </div>
                            
                            <!-- Pagination indicators -->
                            <div style="display: flex; gap: 6px; justify-content: center; margin-top: 15px;">
                                ${h.map((N,H)=>`<span class="carousel-dot" style="width: 6px; height: 6px; border-radius: 50%; background: ${H===T?"var(--accent-cyan)":"rgba(255,255,255,0.3)"};"></span>`).join("")}
                            </div>
                        </div>
                    </div>
                `,y.querySelector(".btn-hero-view").onclick=()=>{me(E)};const R=y.querySelector(".btn-hero-save");R.onclick=()=>{toggleSavedPackage(E.title),k(),ot(),Ce()}};k();let L=0;y.ontouchstart=E=>{L=E.touches[0].clientX},y.ontouchend=E=>{const $=E.changedTouches[0].clientX-L;Math.abs($)>50&&($>0?T=(T-1+h.length)%h.length:T=(T+1)%h.length,k())}},g=()=>{const y=document.querySelector("#rail-experiences .rail-items-scroll");y&&(y.innerHTML=t.map(h=>`
                <div class="experience-visual-card" data-filter="${h.filter}" style="background-image: url('${h.bg}')">
                    <div class="experience-visual-overlay">
                        <div class="experience-visual-title">${h.title}</div>
                    </div>
                </div>
            `).join(""),y.querySelectorAll(".experience-visual-card").forEach(h=>{h.onclick=()=>{const T=h.dataset.filter,k=e.querySelector(`.mobile-chip[data-filter="${T}"]`);k&&k.click()}}))},u=()=>{const y=document.querySelector("#rail-destinations .rail-items-scroll");y&&(y.innerHTML=a.map(h=>`
                <div class="destination-visual-card" data-query="${h.query}" style="background-image: url('${h.bg}')">
                    <div class="destination-visual-overlay">
                        <div class="destination-visual-name">${h.name}</div>
                    </div>
                </div>
            `).join(""),y.querySelectorAll(".destination-visual-card").forEach(h=>{h.onclick=()=>{const T=h.dataset.query,k=A.find(L=>L.title.toLowerCase().includes(T.toLowerCase()));k&&me(k)}}))},r=()=>{const y=document.querySelectorAll(".budget-chip-item");y.forEach(h=>{h.onclick=()=>{y.forEach(E=>E.classList.remove("active")),h.classList.add("active");const T=parseInt(h.dataset.min),k=parseInt(h.dataset.max),L=A.find(E=>{const $=parseInt(E.price.replace(/[^0-9]/g,""))||15e3;return $>=T&&$<=k});L&&me(L)}})},b=document.getElementById("btn-mobile-trigger-planner");b&&(b.onclick=()=>{O("planner")});const m=()=>{const y=document.getElementById("rail-continue-exploring");if(!y)return;const h=y.querySelector(".rail-items-scroll"),T=JSON.parse(localStorage.getItem("beacon_recent_views"))||[];if(T.length===0){y.style.display="none";return}y.style.display="block";const k=T.map(L=>A.find(E=>E.title===L.title)).filter(Boolean);h.innerHTML=k.map(L=>o(L)).join(""),n(h)},v=()=>{const y=JSON.parse(localStorage.getItem("beacon_recent_views"))||[],h=_[0];let T="",k="";if(h){const R=A.find(N=>N.title===h);R&&(T=R.category,k=R.title)}else if(y.length>0){const R=A.find(N=>N.title===y[0].title);R&&(T=R.category,k=R.title)}const L=document.getElementById("rail-because-liked");if(L&&L.remove(),!T)return;const E=document.createElement("div");E.className="mobile-rail-section",E.id="rail-because-liked",E.innerHTML=`
                <div class="rail-header" style="padding: 0 16px; margin-bottom: 10px;">
                    <h4 style="font-size: 14px; font-weight: 800; color: #fff; margin: 0;">More Like ${k}</h4>
                </div>
                <div class="rail-items-scroll"></div>
            `;const $=E.querySelector(".rail-items-scroll"),U=A.filter(R=>R.category===T&&R.title!==k);if(U.length===0)return;$.innerHTML=U.map(R=>o(R)).join(""),n($);const pe=document.getElementById("rail-more-journeys");pe&&pe.parentElement.insertBefore(E,pe)};c(),i("all"),g(),u(),r(),m(),v()};setTimeout(()=>{en(),w(),ot(),Ce();const e=document.getElementById("btn-open-animation-playground");e&&(e.onclick=()=>{O("playground")});const t=document.getElementById("btn-playground-back");t&&(t.onclick=()=>{O("profile")});const a=[{title:"Leh Ladakh Expedition",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Goa Beachfront Escape",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Kashmir Paradise Escape",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"}];let o=0;const n=document.getElementById("playground-mini-hero"),s=document.getElementById("playground-hero-title");let i=setInterval(()=>{n&&(o=(o+1)%a.length,n.style.opacity=.5,setTimeout(()=>{n.style.backgroundImage=`url('${a[o].bg}')`,s.innerText=a[o].title,n.style.opacity=1},300))},6e3);n&&(n.ontouchstart=()=>{clearInterval(i)});const d=document.getElementById("playground-fav-btn"),c=document.getElementById("playground-toast");d&&(d.onclick=()=>{d.classList.toggle("active"),d.classList.add("pop-bounce"),setTimeout(()=>d.classList.remove("pop-bounce"),300);const k=d.classList.contains("active");d.innerText=k?"❤️":"♡",c&&(c.innerText=k?"Saved to My Collection":"Removed from Collection",c.classList.add("active"),setTimeout(()=>c.classList.remove("active"),2500))});const g=document.querySelectorAll(".playground-chip-btn"),u=document.getElementById("playground-results-container");g.forEach(k=>{k.onclick=()=>{g.forEach(E=>E.classList.remove("active")),k.classList.add("active");const L=k.dataset.filter;u&&(u.classList.add("fade-out"),setTimeout(()=>{L==="m"?u.innerHTML="🗻 Leh Ladakh Expedition &bull; Manali Cedar Chalet":u.innerHTML="🏝️ Goa Beachfront Escape &bull; Varkala Cliffside Yoga",u.classList.remove("fade-out")},200))}});const r=document.getElementById("btn-playground-longpress"),b=document.getElementById("playground-preview-backdrop"),m=document.getElementById("playground-preview-sheet"),v=document.getElementById("btn-close-sheet-preview");let y=null;if(r){const k=()=>{y=setTimeout(()=>{m&&b&&(b.style.display="block",setTimeout(()=>m.classList.add("active"),50))},500)},L=()=>{y&&clearTimeout(y)};r.addEventListener("mousedown",k),r.addEventListener("touchstart",k),r.addEventListener("mouseup",L),r.addEventListener("touchend",L)}v&&(v.onclick=()=>{m&&b&&(m.classList.remove("active"),setTimeout(()=>b.style.display="none",300))}),b&&(b.onclick=()=>{m&&(m.classList.remove("active"),setTimeout(()=>b.style.display="none",300))});const h=document.getElementById("btn-trigger-progressive-load"),T=document.getElementById("sharp-img-test");h&&T&&(h.onclick=()=>{T.classList.remove("loaded"),setTimeout(()=>{T.classList.add("loaded")},800)}),Fo()},500);const ct=e=>{ft=e;const t=document.getElementById("view-package-details");if(!t)return;const a=_.includes(e.title);q.some(S=>S.title===e.title),""+(e.basePrice||Math.round(e.priceNum*1.11)).toLocaleString();const n=e.duration||4,s=e.highlights?e.highlights.split(","):["Explore local viewpoints","Guided nature walk","Leisure tour of surrounding villages"],i=e.sightseeing?e.sightseeing.split(","):["Main square","Local markets","Scenic viewpoints"];let d="";for(let S=1;S<=n;S++){let I="",D="",M="",Y="",oe="Breakfast Included";if(S===1)I="Arrival & Resort Check-in",M="Private Airport Transfer",Y="Welcome dinner & sunset leisure",D="Arrive at the destination. Private airport transfer directly to your premium resort for check-in. Relax and enjoy a welcome cocktail with sunset beach views.",oe=e.meals==="All Inclusive"?"All Inclusive Meals":"Welcome Dinner Included";else if(S===n)I="Breakfast & Departure",M="Private Airport Transfer",Y="Morning beach walk & checkout",D="Enjoy a delicious morning buffet breakfast. Complete checkout formalities and board your private cab to the airport with cherished memories.",oe="Breakfast Included";else{const Ae=(S-2)%s.length,Ie=(S-2)%i.length;I=s[Ae]?s[Ae].trim():"Local Sightseeing Tour",M="Private Cab local transfer",Y=`Explore ${i[Ie]?i[Ie].trim():"scenic highlights"}`,D=`Set out on an exciting sightseeing tour visiting ${i[Ie]?i[Ie].trim():"scenic highlights"} and popular local attractions.`,oe=e.meals==="All Inclusive"?"All Inclusive Meals":"Breakfast & Dinner Included"}d+=`
                <div class="itinerary-day-card ${S===1?"active":""}" style="position: relative; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 12px; overflow: hidden; background: rgba(255,255,255,0.01);">
                    <!-- Glowing Dot in Timeline -->
                    <div class="timeline-dot-m ${S===1?"dot-solid":"dot-ring"}"></div>
                    <div class="itinerary-day-header" style="padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s;">
                        <div class="itinerary-day-header-left" style="display: flex; align-items: center; gap: 10px;">
                            <span class="day-badge" style="background: rgba(0, 203, 224, 0.1); color: var(--accent-cyan); font-weight: 800; font-size: 10.5px; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Day ${S}</span>
                            <span class="day-title-text" style="font-size: 13.5px; font-weight: 800; color: #fff;">${I}</span>
                        </div>
                        <span class="acc-arrow" style="font-size: 10px; color: var(--text-slate); transition: transform 0.2s;">▼</span>
                    </div>
                    <div class="itinerary-day-body" style="max-height: 0; overflow: hidden; transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s; padding: 0 16px; background: rgba(7, 10, 20, 0.4); border-top: 1px solid rgba(255,255,255,0.02);">
                        <p style="font-size:12.5px; color:var(--text-slate); line-height:1.6; margin: 12px 0;">${D}</p>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:6px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            <span>Transport: ${M}</span>
                        </div>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:6px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            <span>Activity: ${Y}</span>
                        </div>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:12px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            <span>Meals: ${oe}</span>
                        </div>
                    </div>
                </div>
            `}const g=e.style==="couple"||e.category==="beaches"?{name:"Rahul Mehta",type:"Independent Local Guide",rating:"4.9",reviews:"94",trips:"120+",responseRate:"98%",languages:["English","Hindi","Kashmiri"],about:"Born and raised in Srinagar, Rahul has been guiding travelers across Kashmir valleys, lakes, and high ridges since 2018. Certified in wilderness rescue and first aid.",expertise:["Trekking","Cultural Tours","Photography"],avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",location:"Srinagar, Jammu & Kashmir",travelers:"850+",destinations:"12+"}:{name:"Wanderlust Travels",type:"Bespoke Tour Agency",rating:"4.85",reviews:"1,240",trips:"1,850+",responseRate:"95%",languages:["English","Hindi","Spanish"],about:"A premier local operator specializing in curated group departures, luxury escapes, and custom itineraries across scenic Himalayan routes and beach havens.",expertise:["Luxury Trips","Family Groups","Honeymoon Planning"],avatar:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",location:"New Delhi, India",travelers:"12,400+",destinations:"45+"};let u="Daily Departures (Aug 2026 – Oct 2026)";const r=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",b=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(r&&b){const S=I=>{const D=I.split("-");if(D.length===3){const M=new Date(D[0],D[1]-1,D[2]),Y=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${M.getDate()} ${Y[M.getMonth()]} ${M.getFullYear()}`}return I};u=`${S(r)} – ${S(b)}`}else{const S=new Date,I=S.toLocaleString("default",{month:"short"}),D=new Date(S.setMonth(S.getMonth()+3)).toLocaleString("default",{month:"short"}),M=new Date().getFullYear();u=`Flexible (${I} – ${D} ${M})`}const m=A.filter(S=>S.title===e.title?!1:S.category===e.category||S.style===e.style).slice(0,4);let v="";m.forEach(S=>{const I=_.includes(S.title);v+=`
                <div class="similar-card-m" data-title="${S.title}" style="flex: 0 0 65%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; cursor: pointer; scroll-snap-align: start;">
                    <div style="height: 100px; background-image: url('${S.imgUrl}'); background-size: cover; background-position: center; position: relative;">
                        <button type="button" class="sim-fav-btn" data-title="${S.title}" style="position: absolute; top: 8px; right: 8px; background: rgba(18,24,35,0.6); border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="${I?"var(--accent-cyan)":"#fff"}" stroke-width="2" fill="${I?"var(--accent-cyan)":"none"}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                    <div style="padding: 10px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h5 style="margin: 0 0 4px 0; font-size: 12px; font-weight: 800; color: #fff; white-space: normal; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${S.title}</h5>
                            <span style="font-size: 10px; color: var(--text-slate);">${S.duration} Days • ${S.style.toUpperCase()}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                            <strong style="font-size: 13px; color: var(--accent-cyan);">${S.priceStr}</strong>
                            <span style="font-size: 10px; color: #fbbf24;">★ ${S.rating.replace("⭐","").trim()}</span>
                        </div>
                    </div>
                </div>
            `});const y=document.querySelector(".mobile-bottom-nav");y&&(y.style.display="none"),t.innerHTML=`
            <!-- Fullscreen Hero Image -->
            <div class="mobile-details-hero" style="background-image: url('${e.imgUrl}'); height: 50vh; background-size: cover; background-position: center; position: relative;">
                <div class="mobile-details-hero-overlay" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(7, 10, 20, 1) 0%, rgba(7, 10, 20, 0.4) 60%, rgba(0,0,0,0.3) 100%);"></div>
                <div class="mobile-details-hero-header" style="position: absolute; top: 24px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 10;">
                    <button type="button" class="btn-m-back" id="btn-details-m-back" style="background: rgba(18, 24, 35, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <div style="display:flex; gap:12px;">
                        <button type="button" class="btn-m-share" id="btn-details-m-share" style="background: rgba(18, 24, 35, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </button>
                        <button type="button" class="btn-m-fav ${a?"active":""}" id="btn-details-m-fav" style="background: rgba(18, 24, 35, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s;">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="${a?"var(--accent-cyan)":"#fff"}" stroke-width="2" fill="${a?"var(--accent-cyan)":"none"}" stroke-linecap="round" stroke-linejoin="round" class="heart-svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="mobile-details-hero-title-box" style="position: absolute; bottom: 20px; left: 16px; right: 16px; z-index: 10;">
                    <span class="mobile-details-badge" style="font-size: 9px; font-weight: 800; background: var(--accent-cyan); color: var(--bg-dark); padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 8px;">${e.category.toUpperCase()}</span>
                    <h2 style="font-size: 24px; font-weight: 900; color: #fff; line-height: 1.2; margin: 0 0 6px 0;">${e.title}</h2>
                    <div class="mobile-details-location" style="font-size: 12.5px; color: var(--text-slate); display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        ${e.hotelAddress||e.location||"Srinagar, Kashmir"}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <span style="font-size: 11px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 4px 10px; font-weight: 700; color: #fff;">⏱ ${e.duration} Days</span>
                        <span style="font-size: 11px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 4px 10px; font-weight: 700; color: #fff;">👥 ${e.style==="couple"?"Couple Friendly":"Family Trip"}</span>
                        <span style="font-size: 11px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 4px 10px; font-weight: 700; color: #fff;">🏨 ${e.accommodation==="resort"?"Premium Resort":"Luxury Hotel"}</span>
                    </div>
                </div>
            </div>

            <!-- Page Scrolling Content Container -->
            <div class="mobile-details-scroll-content" style="padding: 16px 0; background: var(--bg-dark); box-sizing: border-box; width: 100%;">
                
                <!-- Package Summary Card -->
                <div class="mobile-summary-card" style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; margin: 0 16px 24px 16px; box-sizing: border-box;">
                    <div>
                        <div style="font-size: 15px; font-weight: 850; color: #fff; display: flex; align-items: center; gap: 6px;">
                            <span style="color: #fbbf24;">★</span> ${e.rating.replace("⭐","").trim()}
                        </div>
                        <div style="font-size: 11px; color: var(--text-slate); margin-top: 2px;">${e.reviews||124} Reviews</div>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 11px; color: var(--text-slate); text-transform: uppercase; display: block; margin-bottom: 2px;">Starting from</span>
                        <strong style="font-size: 20px; font-weight: 900; color: var(--accent-cyan);">${e.priceStr}</strong>
                        <span style="font-size: 11px; color: var(--text-slate); display: block;">per person</span>
                    </div>
                </div>

                <!-- About This Trip -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0 0 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">About this trip</h3>
                    <p id="about-trip-text" style="font-size: 13px; line-height: 1.6; color: var(--text-slate); margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; transition: all 0.3s ease;">
                        Experience the gorgeous landscapes and pristine, top-rated destinations with the ${e.title}. Designed by expert travel planners to maximize comfort, featuring curated sightseeing guides, private airport transfers, premium accommodations at ${e.hotelName||"resort highlights"}, and daily breakfast dining inclusions.
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
                        <div class="gallery-item-m" style="flex: 0 0 75%; height: 130px; background-image: url('${e.imgUrl}'); background-size: cover; background-position: center; border-radius: 10px; scroll-snap-align: start; cursor: pointer;"></div>
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
                        
                        ${d}
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
                        <h4 style="font-size: 14.5px; font-weight: 800; color: #fff; margin: 0 0 4px 0;">${e.hotelName||"Premium Beachside Resort"}</h4>
                        <span style="font-size: 11.5px; color: var(--text-slate); display: block; margin-bottom: 8px;">📍 ${e.hotelAddress||"Mararikulam, Kerala"}</span>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span style="font-size: 10px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 5px; border-radius: 3px;">4★ Premium Stay</span>
                            <button type="button" id="btn-view-map-accommodation" style="background: none; border: none; color: var(--accent-cyan); font-weight: 800; font-size: 11.5px; padding: 0; cursor: pointer; text-decoration: underline; outline: none;">View on Google Maps ></button>
                        </div>
                        <p style="font-size: 12.5px; line-height: 1.5; color: var(--text-slate); margin: 0 0 12px 0;">Enjoy deluxe ocean suites with private balconies, pool access, free high-speed Wi-Fi, and immediate beach access.</p>
                        
                        <div style="display: flex; gap: 8px; overflow-x: auto;">
                            <div style="flex: 0 0 45%; height: 75px; background-image: url('${e.imgUrl}'); background-size: cover; background-position: center; border-radius: 6px;"></div>
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
                                <strong style="color: #fff;">${e.location||"Mararikulam, Kerala"}</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                                    <span>Trip Duration</span>
                                </div>
                                <strong style="color: #fff;">${e.duration} Days / ${e.duration-1} Nights</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>Trip Type</span>
                                </div>
                                <strong style="color: #fff;">${e.style==="couple"?"Couple Honeymoon":"Family Trip"}</strong>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px;">
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--text-slate);">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    <span>Best For</span>
                                </div>
                                <strong style="color: #fff;">${e.style==="couple"?"Couples, Solo":"Families, Couples"}</strong>
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
                            <div class="partner-avatar" style="width: 50px; height: 50px; background-image: url('${g.avatar}'); border-radius: 50%; background-size: cover; background-position: center; border: 1px solid var(--accent-cyan); flex-shrink: 0;"></div>
                            <div class="partner-name-col">
                                <h5 style="margin: 0; font-size: 14px; font-weight: 850; color: #fff; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                                    ${g.name} 
                                    <span style="font-size: 8px; font-weight: 800; color: var(--bg-dark); background: var(--accent-cyan); padding: 1px 4px; border-radius: 2px;">VERIFIED</span>
                                </h5>
                                <span style="font-size: 11px; color: var(--text-slate); font-weight: 700; display: block; margin-top: 2px;">${g.type}</span>
                                <div style="font-size: 10.5px; color: var(--text-slate); margin-top: 2px;">⭐ ${g.rating} (${g.reviews} Reviews)</div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <p style="font-size: 12px; line-height: 1.5; color: var(--text-slate); margin: 0; font-style: italic;">"${g.about}"</p>
                        </div>
                        
                        <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span style="font-size: 11px; color: var(--text-slate);">Expertise:</span>
                            ${g.expertise.map(S=>`<span style="font-size: 9.5px; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; font-weight: 700;">${S}</span>`).join("")}
                        </div>
                        
                        <button type="button" class="btn-view-full-profile" id="btn-m-view-partner-profile" style="width: 100%; padding: 10px; font-size: 12px; font-weight: 850; border-radius: 8px; cursor: pointer; border: 1px solid var(--accent-cyan); background: transparent; color: var(--accent-cyan); transition: all 0.2s; outline: none; text-align: center;">View Profile</button>
                    </div>
                </div>

                <!-- Reviews -->
                <div class="mobile-details-section" style="padding: 0 16px; margin-bottom: 24px; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px;">
                        <h3 style="font-size: 15px; font-weight: 850; color: #fff; margin: 0;">Reviews (${e.reviews||124})</h3>
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
                            <div style="width: 55px; height: 40px; background-image: url('${e.imgUrl}'); background-size: cover; border-radius: 4px;"></div>
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
                        ${v}
                    </div>
                </div>
            </div>

            <!-- Sticky Booking Bar (Single Line Layout Override) -->
            <div class="mobile-details-sticky-bar" style="position: fixed; bottom: 0; left: 0; right: 0; height: 68px; background: rgba(7, 10, 20, 0.95); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; z-index: 10000; box-sizing: border-box;">
                <div style="display: flex; align-items: baseline; gap: 4px; white-space: nowrap;">
                    <strong style="font-size: 18px; font-weight: 900; color: var(--accent-cyan);">${e.priceStr}</strong>
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
                    <div style="flex: 0 0 100%; display: flex; justify-content: center; scroll-snap-align: center; box-sizing: border-box; padding: 0 10px;"><img src="${e.imgUrl}" style="max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 8px;"></div>
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
                            <span style="color: var(--text-slate);">Base Price (${e.priceStr} × <span id="lbl-m-travellers-breakdown">2</span>):</span>
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
        `;const h=document.getElementById("btn-details-m-back");h&&(h.onclick=()=>{const S=document.querySelector(".mobile-bottom-nav");S&&window.innerWidth<768&&(S.style.display="flex"),O(Ne)});const T=document.getElementById("btn-details-m-fav");T&&(T.onclick=()=>{toggleSavedPackage(e.title);const S=_.includes(e.title),I=T.querySelector(".heart-svg");S?(T.classList.add("active"),I&&(I.setAttribute("fill","var(--accent-cyan)"),I.setAttribute("stroke","var(--accent-cyan)")),showToast("❤️ Saved to My Collection")):(T.classList.remove("active"),I&&(I.setAttribute("fill","none"),I.setAttribute("stroke","#fff")),showToast("🤍 Removed from Collection")),T.style.transform="scale(1.2)",setTimeout(()=>T.style.transform="",200),ot(),Ce()});const k=document.getElementById("btn-details-m-share");k&&(k.onclick=()=>{openShareSheet(e)});const L=document.getElementById("btn-about-read-more"),E=document.getElementById("about-trip-text");L&&E&&L.addEventListener("click",()=>{E.style.display==="block"?(E.style.display="-webkit-box",L.innerHTML="Read More ↓"):(E.style.display="block",L.innerHTML="Read Less ↑")});const $=document.getElementById("mobile-details-accordion");$&&$.querySelectorAll(".itinerary-day-header").forEach(S=>{S.onclick=()=>{const I=S.parentElement,D=I.querySelector(".itinerary-day-body"),M=I.querySelector(".acc-arrow");I.classList.contains("active")?(I.classList.remove("active"),D.style.maxHeight="0",M&&(M.style.transform="")):(I.classList.add("active"),D.style.maxHeight="300px",M&&(M.style.transform="rotate(180deg)"))}});const U=document.getElementById("btn-m-view-full-itinerary");U&&$&&U.addEventListener("click",()=>{const S=$.querySelectorAll(".itinerary-day-card"),I=Array.from(S).some(D=>!D.classList.contains("active"));S.forEach(D=>{const M=D.querySelector(".itinerary-day-body"),Y=D.querySelector(".acc-arrow");I?(D.classList.add("active"),M.style.maxHeight="300px",Y&&(Y.style.transform="rotate(180deg)")):(D.classList.remove("active"),M.style.maxHeight="0",Y&&(Y.style.transform=""))}),I?U.innerHTML="Hide Full Itinerary ↑":U.innerHTML="View Full Itinerary >"}),document.querySelectorAll(".policy-accordion-card-m").forEach(S=>{const I=S.querySelector(".policy-header-m"),D=S.querySelector(".policy-body-m"),M=S.querySelector(".policy-arrow-m");I&&D&&I.addEventListener("click",()=>{D.style.display==="none"?(D.style.display="block",M&&(M.style.transform="rotate(90deg)"),M&&(M.style.color="var(--accent-cyan)")):(D.style.display="none",M&&(M.style.transform=""),M&&(M.style.color=""))})});const R=document.querySelectorAll(".gallery-item-m"),N=document.getElementById("btn-gallery-view-all"),H=document.getElementById("full-gallery-modal"),F=document.getElementById("close-gallery-btn"),X=document.getElementById("gallery-swipe-wrap"),ge=document.getElementById("gallery-index-label"),Je=(S=0)=>{if(H&&(H.style.display="flex",X)){const I=X.clientWidth;X.scrollTo({left:S*I,behavior:"instant"}),ge&&(ge.innerText=`${S+1} / 3`)}};R.forEach((S,I)=>{S.addEventListener("click",()=>Je(I))}),N&&N.addEventListener("click",()=>Je(0)),F&&(F.onclick=()=>{H&&(H.style.display="none")}),X&&X.addEventListener("scroll",()=>{const S=X.clientWidth,I=Math.round(X.scrollLeft/S);ge&&(ge.innerText=`${I+1} / 3`)});const Ye=document.getElementById("btn-view-map-accommodation");Ye&&Ye.addEventListener("click",()=>{const S=encodeURIComponent(e.hotelAddress||e.hotelName||"Maldives");window.open(`https://www.google.com/maps/search/?api=1&query=${S}`,"_blank")});const be=document.getElementById("btn-m-view-partner-profile");be&&be.addEventListener("click",()=>{Za(g,e)}),document.querySelectorAll(".similar-card-m").forEach(S=>{S.addEventListener("click",D=>{if(D.target.closest(".sim-fav-btn"))return;const M=S.dataset.title,Y=A.find(oe=>oe.title===M);Y&&ct(Y)});const I=S.querySelector(".sim-fav-btn");I&&I.addEventListener("click",D=>{D.stopPropagation();const M=I.dataset.title;toggleSavedPackage(M);const Y=_.includes(M),oe=I.querySelector("svg");Y?(oe.setAttribute("fill","var(--accent-cyan)"),oe.setAttribute("stroke","var(--accent-cyan)"),showToast("❤️ Saved to My Collection")):(oe.setAttribute("fill","none"),oe.setAttribute("stroke","#fff"),showToast("🤍 Removed from Collection")),ot(),Ce()})});const f=document.getElementById("btn-m-book-now-sticky");f&&(f.onclick=()=>{ba(e)}),closeBookingDrawerBtn&&(closeBookingDrawerBtn.onclick=()=>{bookingDrawer&&(bookingDrawer.style.display="none")}),document.getElementsByName("m-book-date");const x=document.getElementById("m-book-date-1"),z=document.getElementById("m-book-date-2"),re=document.getElementById("m-book-date-3");x&&(x.innerText=u);const he=S=>{const I=new Date;I.setMonth(I.getMonth()+S);const D=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${I.getDate()} ${D[I.getMonth()]} – ${I.getDate()+5} ${D[I.getMonth()]} ${I.getFullYear()}`};z&&(z.innerText=he(1)),re&&(re.innerText=he(2));const Nt=document.getElementById("btn-m-travellers-dec"),Ke=document.getElementById("btn-m-travellers-inc"),Xe=document.getElementById("m-travellers-count"),io=document.getElementById("lbl-m-travellers-breakdown");let pt=2;const so=S=>{pt=Math.max(1,Math.min(10,pt+S)),Xe&&(Xe.innerText=pt),io&&(io.innerText=pt),ha()};Nt&&(Nt.onclick=()=>so(-1)),Ke&&(Ke.onclick=()=>so(1));const Rt=document.getElementById("m-addon-guide"),Vt=document.getElementById("m-addon-meals");Rt&&(Rt.onchange=()=>ha()),Vt&&(Vt.onchange=()=>ha());function ha(){const I=(e.priceNum||22e3)*pt;let D=0;Rt&&Rt.checked&&(D+=3500),Vt&&Vt.checked&&(D+=2e3*pt);const M=Math.round((I+D)*.05),Y=I+D+M,oe=document.getElementById("breakdown-base-total"),Ae=document.getElementById("breakdown-addons-total"),Ie=document.getElementById("breakdown-taxes-total"),St=document.getElementById("breakdown-grand-total");oe&&(oe.innerText="₹"+I.toLocaleString()),Ae&&(Ae.innerText="₹"+D.toLocaleString()),Ie&&(Ie.innerText="₹"+M.toLocaleString()),St&&(St.innerText="₹"+Y.toLocaleString())}const ro=document.getElementById("btn-m-confirm-booking-pay");ro&&(ro.onclick=()=>{bookingDrawer&&(bookingDrawer.style.display="none");const S=document.getElementById("breakdown-grand-total")?document.getElementById("breakdown-grand-total").innerText:e.priceStr;de=e,ae=`BCN-2026-${Math.floor(1e4+Math.random()*9e4)}`;const D=e.style==="couple"||e.category==="beaches";let M="wanderworld@upi",Y="WanderWorld Travels";D?(M=localStorage.getItem("beacon_planner_upi")||"rahul@upi",Y=localStorage.getItem("beacon_planner_business")||"Rahul Mehta"):(M="wanderlust@upi",Y="Wanderlust Travels");const oe=document.getElementById("checkout-payable-amount"),Ae=document.getElementById("checkout-package-title"),Ie=document.getElementById("checkout-booking-id"),St=document.getElementById("checkout-upi-display"),lo=document.getElementById("checkout-note-display"),co=document.getElementById("checkout-qr-code");if(oe&&(oe.innerText=S),Ae&&(Ae.innerText=e.title),Ie&&(Ie.innerText=ae),St&&(St.innerText=M),lo&&(lo.innerText=ae),co){const Xo=`upi://pay?pa=${M}&pn=${encodeURIComponent(Y)}&am=${S.replace(/[^\d]/g,"")}&tn=${ae}`;co.src=`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(Xo)}`}const po=document.getElementById("checkout-payment-modal");po&&(po.style.display="flex")})};let p=null;const jo=()=>{if(!p)return;let e=0,t=0;p.travellers.infants,p.passengerProfiles.forEach(a=>{if(a.type==="Infant")return;const o=parseInt(a.age);!isNaN(o)&&o<=12?(a.type="Child",t++):(a.type="Adult",e++)}),p.travellers.adults=e,p.travellers.children=t},qt=()=>{if(!p)return{basePrice:0,upgradesPrice:0,mealsPrice:0,addonsPrice:0,discount:0,subtotal:0,taxes:0,grandTotal:0};jo();const e=p.pkg,t=p.travellers.adults||0,a=p.travellers.children||0;p.travellers.infants;const o=e.priceNum||22e3,n=Math.round(o*.68),s=o*t,i=n*a,c=s+i+0;let g=0;p.stayUpgrades.includes("sea-view")&&(g+=3e3),p.stayUpgrades.includes("extra-bed")&&(g+=1200*(e.duration||4)),p.transportUpgrades.includes("suv")&&(g+=2e3),p.transportUpgrades.includes("pickup-vip")&&(g+=1500);let u=0;if(p.mealMode==="same")p.passengerProfiles.forEach(h=>{if(h.type==="Infant")return;p.mealPreferences[h.id]==="Non-Veg"&&(u+=650)});else{const h=e.duration||4;for(let T=1;T<=h;T++){const k=p.dayWiseMeals[T]||{},L=k.lunch||{};p.passengerProfiles.forEach($=>{L[$.id]==="Non-Vegetarian"&&(u+=150)});const E=k.dinner||{};p.passengerProfiles.forEach($=>{E[$.id]==="Non-Vegetarian"&&(u+=250)})}}let r=0;p.addOns.includes("scuba")&&(r+=2500*(t+a)),p.addOns.includes("dinner")&&(r+=3e3),p.addOns.includes("photos")&&(r+=4e3);const b=2e3,m=Math.max(0,c+g+u+r-b),v=Math.round(m*.05),y=m+v;return{basePrice:c,adultTotal:s,baseAdultPrice:o,childTotal:i,baseChildPrice:n,upgradesPrice:g,mealsPrice:u,addonsPrice:r,discount:b,subtotal:m,taxes:v,grandTotal:y}},K=()=>{if(!p)return;const e=JSON.parse(localStorage.getItem("beacon_bookings"))||[],t=e.findIndex(i=>i.id===p.bookingId),a={1:20,2:45,3:65,4:85,5:95}[p.currentStep]||10;let o="Traveller profiles incomplete";p.currentStep===2?o="Stay & transport selections pending":p.currentStep===3?o="Meals setup incomplete":p.currentStep===4?o="Trip add-ons config incomplete":p.currentStep===5&&(o="Review and confirm booking");const n=qt(),s={id:p.bookingId,packageTitle:p.pkg.title,imgUrl:p.pkg.imgUrl,dateRange:p.travelDate||"12 Oct – 15 Oct 2026",status:"draft",progress:a,progressDesc:o,travellersCount:p.passengerProfiles.length,estimatedTotal:n.grandTotal,state:p};t!==-1?e[t]=s:e.push(s),localStorage.setItem("beacon_bookings",JSON.stringify(e)),Ue()},ba=e=>{p={bookingId:`BCN-2026-${Math.floor(1e4+Math.random()*9e4)}`,pkg:e,status:"draft",currentStep:1,travelDate:"12 Oct – 15 Oct 2026",travellers:{adults:1,children:0,infants:0},passengerProfiles:[{id:1,type:"Adult",name:"Aditya Kasod",age:21,gender:"Male",collapsed:!0,isPrimary:!0}],stayUpgrades:[],transportUpgrades:[],mealMode:"same",mealPreferences:{1:"Vegetarian",2:"Non-Veg",3:"Vegetarian",4:"No Meal"},dayWiseMeals:{1:{lunch:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"},dinner:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"}},2:{breakfast:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"},dinner:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"}},3:{lunch:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"},dinner:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"}},4:{breakfast:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"}}},addOns:[],timestamp:Date.now()},K(),O("mobile-booking"),ye()},Uo=e=>{const a=(JSON.parse(localStorage.getItem("beacon_bookings"))||[]).find(o=>o.id===e);a&&a.state?(p=a.state,O("mobile-booking"),ye()):showToast("⚠️ Could not restore draft booking state.")},ye=()=>{const e=document.getElementById("view-mobile-booking");if(!e||!p)return;const t=p.pkg,a=p.currentStep,o=qt(),n=["Travellers","Stay","Meals","Add-ons","Review"];let s='<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:12px 16px; border-radius:10px;">';n.forEach((l,f)=>{const x=f+1,z=a===x,re=a>x;let he=`<span style="width:20px; height:20px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--text-slate); color:var(--text-slate); background:transparent;">${x}</span>`;z?he=`<span style="width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--accent-cyan); color:var(--bg-dark); background:var(--accent-cyan); box-shadow:0 0 6px var(--accent-cyan);">${x}</span>`:re&&(he='<span style="width:20px; height:20px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--accent-cyan); color:var(--accent-cyan); background:transparent;">✓</span>'),s+=`
                <div style="display:flex; flex-direction:column; align-items:center; gap:4px; flex:1;">
                    ${he}
                    <span style="font-size:8.5px; font-weight:800; color:${z?"var(--accent-cyan)":"var(--text-slate)"}; text-transform:uppercase;">${l}</span>
                </div>
            `,f<n.length-1&&(s+=`<div style="width:12px; height:1px; background:${a>x?"var(--accent-cyan)":"rgba(255,255,255,0.08)"}; margin-top:-14px;"></div>`)}),s+="</div>";let i="";if(a===1){const l=p.passengerProfiles.length+p.travellers.infants;i+=`
                <div class="booking-wizard-step-section">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">WHO'S TRAVELLING?</h3>
                    <span style="font-size:11.5px; color:var(--text-slate); display:block; margin-bottom:15px;">Add everyone joining this journey.</span>

                    <!-- Travel Date Selector -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:20px;">
                        <label style="font-size:10.5px; font-weight:800; color:var(--text-slate); text-transform:uppercase; display:block; margin-bottom:6px;">Travel Date</label>
                        <select id="m-wizard-date-select" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:11px; border-radius:6px; color:#fff; font-size:12.5px; outline:none; height:44px;">
                            <option value="12 Oct – 15 Oct 2026" ${p.travelDate==="12 Oct – 15 Oct 2026"?"selected":""}>12 Oct – 15 Oct 2026</option>
                            <option value="18 Nov – 21 Nov 2026" ${p.travelDate==="18 Nov – 21 Nov 2026"?"selected":""}>18 Nov – 21 Nov 2026</option>
                            <option value="10 Dec – 13 Dec 2026" ${p.travelDate==="10 Dec – 13 Dec 2026"?"selected":""}>10 Dec – 13 Dec 2026</option>
                        </select>
                    </div>

                    <!-- Dynamic Profiles & Trip Mates List -->
                    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:15px;">
                        ${p.passengerProfiles.map((f,x)=>f.type==="Infant"?"":f.collapsed?`
                                    <!-- Collapsed Traveller Card -->
                                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:15px; display:flex; justify-content:space-between; align-items:center; box-sizing:border-box;">
                                        <div>
                                            <div style="font-size:11px; color:var(--text-slate); font-weight:800; display:flex; align-items:center; gap:4px; margin-bottom:4px; text-transform:uppercase;">
                                                <span>👤</span> ${f.isPrimary?"You":"Trip Mate"}
                                            </div>
                                            <strong style="font-size:14px; color:#fff; display:block;">${f.name||"Enter traveller's name"}</strong>
                                            <span style="font-size:11.5px; color:var(--text-slate); margin-top:2px; display:block;">${f.age?`${f.age} years`:"No Age"} • ${f.type}</span>
                                        </div>
                                        <button type="button" class="btn-edit-p-card" data-id="${f.id}" style="background:none; border:none; color:var(--accent-cyan); font-size:12.5px; font-weight:800; cursor:pointer; outline:none; padding:0;">Edit</button>
                                    </div>
                                `:`
                                    <!-- Expanded Traveller Form Card -->
                                    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--accent-cyan); border-radius:12px; padding:16px; box-sizing:border-box; position:relative;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.04); padding-bottom:8px;">
                                            <span style="font-size:11px; font-weight:800; color:var(--accent-cyan); text-transform:uppercase;">${f.isPrimary?"You":"Traveller Details"}</span>
                                            <div style="display:flex; gap:10px;">
                                                ${f.isPrimary?"":`<button type="button" class="btn-delete-p-card" data-id="${f.id}" style="background:none; border:none; color:#fbbf24; font-size:11px; cursor:pointer; outline:none; font-weight:700;">Remove</button>`}
                                                <button type="button" class="btn-collapse-p-card" data-id="${f.id}" style="background:none; border:none; color:var(--text-slate); font-size:11px; cursor:pointer; outline:none; font-weight:700;">Save</button>
                                            </div>
                                        </div>
                                        
                                        <div style="display:flex; flex-direction:column; gap:12px;">
                                            <div>
                                                <label style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:4px;">Full Name *</label>
                                                <input type="text" class="input-p-name" data-id="${f.id}" value="${f.name||""}" placeholder="Enter traveller's name" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:10px 12px; border-radius:6px; color:#fff; font-size:13px; height:40px; box-sizing:border-box;">
                                            </div>
                                            <div style="display:flex; gap:12px;">
                                                <div style="flex:1;">
                                                    <label style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:4px;">Age</label>
                                                    <input type="number" class="input-p-age" data-id="${f.id}" value="${f.age||""}" placeholder="number" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:10px 12px; border-radius:6px; color:#fff; font-size:13px; height:40px; box-sizing:border-box;">
                                                </div>
                                                <div style="flex:1;">
                                                    <label style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:4px;">Gender</label>
                                                    <select class="select-p-gender" data-id="${f.id}" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:8px; border-radius:6px; color:#fff; font-size:13px; height:40px; box-sizing:border-box;">
                                                        <option value="Male" ${f.gender==="Male"?"selected":""}>Male</option>
                                                        <option value="Female" ${f.gender==="Female"?"selected":""}>Female</option>
                                                        <option value="Other" ${f.gender==="Other"?"selected":""}>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join("")}
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
                            <strong style="font-size:16px; color:#fff; min-width:20px; text-align:center;">${p.travellers.infants}</strong>
                            <button type="button" class="btn-counter-m" id="btn-infant-inc" style="width:36px; height:36px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:50%; color:#fff; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; outline:none;">+</button>
                        </div>
                    </div>

                    <!-- TOTAL TRAVELLERS INDICATOR -->
                    <div style="text-align:center; font-size:13.5px; font-weight:850; color:var(--accent-cyan); margin-bottom:10px;">
                        ${l} Traveller${l>1?"s":""}
                    </div>
                </div>
            `}else a===2?i+=`
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
                            <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border: 1px solid ${p.stayUpgrades.includes("sea-view")?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:10px; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <strong style="font-size:13px; color:#fff;">Sea View Resort Upgrade</strong>
                                    <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Get premium ocean-facing villas</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹3,000</strong>
                                    <input type="checkbox" class="cb-upgrade-stay" value="sea-view" ${p.stayUpgrades.includes("sea-view")?"checked":""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                                </div>
                            </label>

                            <!-- Extra Bed -->
                            <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border: 1px solid ${p.stayUpgrades.includes("extra-bed")?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:10px; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <strong style="font-size:13px; color:#fff;">Extra Bed Rollaway</strong>
                                    <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Extra cot for older children</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹1,200/night</strong>
                                    <input type="checkbox" class="cb-upgrade-stay" value="extra-bed" ${p.stayUpgrades.includes("extra-bed")?"checked":""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                                </div>
                            </label>

                            <!-- SUV Cab -->
                            <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border: 1px solid ${p.transportUpgrades.includes("suv")?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:10px; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <strong style="font-size:13px; color:#fff;">Private SUV Upgrade (Innova)</strong>
                                    <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Replaces sedan transfers with spacious SUV</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹2,000</strong>
                                    <input type="checkbox" class="cb-upgrade-trans" value="suv" ${p.transportUpgrades.includes("suv")?"checked":""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                                </div>
                            </label>

                            <!-- VIP Airport lounge lounge -->
                            <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border: 1px solid ${p.transportUpgrades.includes("pickup-vip")?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:10px; cursor:pointer;">
                                <div style="display:flex; flex-direction:column;">
                                    <strong style="font-size:13px; color:#fff;">VIP Meet & Greet Lounge</strong>
                                    <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Fast-track airport terminal pickup lounge</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹1,500</strong>
                                    <input type="checkbox" class="cb-upgrade-trans" value="pickup-vip" ${p.transportUpgrades.includes("pickup-vip")?"checked":""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            `:a===3?i+=`
                <div class="booking-wizard-step-section">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">Meal Customization</h3>
                    <span style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:15px;">Choose how you want to manage meals for your travellers.</span>

                    <!-- Mode Toggle Selection Cards -->
                    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:24px;">
                        <!-- Option 1: Same Throughout Trip -->
                        <div class="meal-mode-card" data-mode="same" style="padding:15px; background:rgba(255,255,255,0.02); border:1px solid ${p.mealMode==="same"?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:12px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition: border-color 0.2s;">
                            <div style="padding-right:10px;">
                                <strong style="font-size:13.5px; color:#fff; display:block; margin-bottom:4px;">Option 1: Same Throughout Trip</strong>
                                <span style="font-size:11px; color:var(--text-slate); line-height:1.4; display:block;">We'll apply each traveller's preferred meal type wherever available.</span>
                            </div>
                            <span style="width:18px; height:18px; border-radius:50%; border:2px solid ${p.mealMode==="same"?"var(--accent-cyan)":"var(--text-slate)"}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                ${p.mealMode==="same"?'<span style="width:8px; height:8px; border-radius:50%; background:var(--accent-cyan);"></span>':""}
                            </span>
                        </div>

                        <!-- Option 2: Customize Day-by-Day -->
                        <div class="meal-mode-card" data-mode="daybyday" style="padding:15px; background:rgba(255,255,255,0.02); border:1px solid ${p.mealMode==="daybyday"?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:12px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition: border-color 0.2s;">
                            <div style="padding-right:10px;">
                                <strong style="font-size:13.5px; color:#fff; display:block; margin-bottom:4px;">Option 2: Customize Day-by-Day</strong>
                                <span style="font-size:11px; color:var(--text-slate); line-height:1.4; display:block;">Choose meals individually for each day and traveller.</span>
                            </div>
                            <span style="width:18px; height:18px; border-radius:50%; border:2px solid ${p.mealMode==="daybyday"?"var(--accent-cyan)":"var(--text-slate)"}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                ${p.mealMode==="daybyday"?'<span style="width:8px; height:8px; border-radius:50%; background:var(--accent-cyan);"></span>':""}
                            </span>
                        </div>
                    </div>

                    <!-- Inner Customizer Panels based on active mode -->
                    ${p.mealMode==="same"?`
                        <div style="background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:12px; box-sizing:border-box;">
                            <h4 style="font-size:12px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 15px 0;">Configure Preferences</h4>
                            
                            <div style="display:flex; flex-direction:column; gap:16px;">
                                ${p.passengerProfiles.map((l,f)=>{if(l.type==="Infant")return`
                                            <!-- Separate shaded card container for Infant -->
                                            <div style="background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.04); padding:14px; border-radius:12px; margin-bottom:12px;">
                                                <strong style="font-size:13px; color:#fff;">${l.name||`Infant ${f}`}</strong>
                                                <span style="font-size:10.5px; color:var(--text-slate); display:block; margin-top:2px;">Infant • ${l.age} yr</span>
                                                <span style="font-size:11.5px; color:var(--accent-cyan); display:block; margin-top:8px; font-style:italic;">No meal selection required (Infants are not charged for meals).</span>
                                            </div>
                                        `;const x=p.mealPreferences[l.id]||"Vegetarian";return`
                                        <!-- Separate shaded card container per traveller -->
                                        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:12px; margin-bottom:12px; box-sizing:border-box;">
                                            <strong style="font-size:13px; color:#fff;">${l.name||`Traveller ${f+1}`}</strong>
                                            <span style="font-size:10.5px; color:var(--text-slate); display:block; margin-top:2px;">${l.type} • ${l.age} yrs</span>
                                            
                                            <!-- Chips selectors (Selected states matches Screen 3 but uses warm amber instead of red for Non-Veg) -->
                                            <div style="display:flex; gap:8px; margin-top:10px;">
                                                <button type="button" class="btn-meal-chip" data-pid="${l.id}" data-val="Vegetarian" style="flex:1; border:1px solid ${x==="Vegetarian"?"var(--accent-cyan)":"rgba(255,255,255,0.08)"}; background:${x==="Vegetarian"?"rgba(0,203,224,0.08)":"rgba(255,255,255,0.02)"}; color:${x==="Vegetarian"?"var(--accent-cyan)":"#fff"}; font-size:11.5px; font-weight:800; padding:8px 6px; border-radius:6px; cursor:pointer; outline:none; transition:all 0.2s;">Veg</button>
                                                
                                                <button type="button" class="btn-meal-chip" data-pid="${l.id}" data-val="Non-Veg" style="flex:1; border:1px solid ${x==="Non-Veg"?"#fbbf24":"rgba(255,255,255,0.08)"}; background:${x==="Non-Veg"?"rgba(251,191,36,0.08)":"rgba(255,255,255,0.02)"}; color:${x==="Non-Veg"?"#fbbf24":"#fff"}; font-size:11.5px; font-weight:800; padding:8px 6px; border-radius:6px; cursor:pointer; outline:none; transition:all 0.2s;">Non-Veg</button>
                                                
                                                <button type="button" class="btn-meal-chip" data-pid="${l.id}" data-val="Jain" style="flex:1; border:1px solid ${x==="Jain"?"var(--accent-cyan)":"rgba(255,255,255,0.08)"}; background:${x==="Jain"?"rgba(0,203,224,0.08)":"rgba(255,255,255,0.02)"}; color:${x==="Jain"?"var(--accent-cyan)":"#fff"}; font-size:11.5px; font-weight:800; padding:8px 6px; border-radius:6px; cursor:pointer; outline:none; transition:all 0.2s;">Jain</button>
                                            </div>
                                            
                                            ${x==="Non-Veg"?`
                                                <div style="background:rgba(251,191,36,0.03); border:1px solid rgba(251,191,36,0.15); padding:8px 10px; border-radius:6px; margin-top:8px; font-size:11px; color:#fbbf24;">
                                                    ⚠️ Upgrades: Day 1 Lunch (+₹150) & Day 1 Dinner (+₹250) will apply. Total Add-on: +₹400 per day.
                                                </div>
                                            `:`
                                                <span style="font-size:11px; color:var(--text-slate); margin-top:6px; display:block;">Will apply vegetarian / default option wherever available.</span>
                                            `}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:`
                        <!-- Customize Day-by-Day Accordions list (Interactive Dark Blue Shades) -->
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            ${[1,2,3,4].map(l=>{const f=p.dayWiseMeals[l]||{lunch:{},dinner:{}};return`
                                    <div class="day-customize-accordion" style="border: 1px solid rgba(0, 203, 224, 0.12); border-radius: 10px; overflow:hidden; background: rgba(7, 24, 46, 0.4); margin-bottom: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
                                        <div class="day-customize-header" style="padding:12px 14px; background:rgba(0, 203, 224, 0.04); display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition: background 0.2s;">
                                            <span style="font-size:13.5px; font-weight:800; color:#fff;">Day ${l} — ${l===1?"Arrival":l===2?"Sightseeing":l===3?"Leisure":"Departure"}</span>
                                            <span style="font-size:10px; color:var(--text-slate);">Edit ▼</span>
                                        </div>
                                        <div class="day-customize-body" style="display:none; padding:12px 14px; background:rgba(7,10,20,0.4); border-top:1px solid rgba(255,255,255,0.04);">
                                            
                                            <!-- Breakfast -->
                                            <div style="margin-bottom:15px; border-bottom:1px solid rgba(255,255,255,0.02); padding-bottom:10px;">
                                                <strong style="font-size:12px; color:var(--accent-cyan); display:block; margin-bottom:4px; text-transform:uppercase;">Breakfast</strong>
                                                ${l===1?`
                                                    <span style="font-size:11.5px; color:var(--text-slate);">Vegetarian (Veg Only). Only vegetarian option is available for Breakfast on Day 1.</span>
                                                `:l===4?`
                                                    <span style="font-size:11.5px; color:var(--text-slate);">Vegetarian (Veg Only). Buffet Breakfast included.</span>
                                                `:`
                                                    <span style="font-size:11.5px; color:var(--text-slate);">Buffet Breakfast included (Veg / Non-Veg options available).</span>
                                                `}
                                            </div>

                                            <!-- Lunch -->
                                            <div style="margin-bottom:15px; border-bottom:1px solid rgba(255,255,255,0.02); padding-bottom:10px;">
                                                <strong style="font-size:12px; color:var(--accent-cyan); display:block; margin-bottom:4px; text-transform:uppercase;">Lunch</strong>
                                                ${l===2||l===4?`
                                                    <span style="font-size:11.5px; color:var(--text-slate); font-style:italic;">Not Included in package.</span>
                                                `:`
                                                    <!-- Dropdown selectors per passenger -->
                                                    <div style="display:flex; flex-direction:column; gap:8px;">
                                                        ${p.passengerProfiles.map(x=>{if(x.type==="Infant")return"";const z=(f.lunch||{})[x.id]||"Vegetarian";return`
                                                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                                                    <span style="font-size:11.5px; color:var(--text-slate);">${x.name}:</span>
                                                                    <select class="sel-day-meal-choice" data-day="${l}" data-meal="lunch" data-pid="${x.id}" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:4px 8px; border-radius:4px; color:#fff; font-size:11px;">
                                                                        <option value="Vegetarian" ${z==="Vegetarian"?"selected":""}>Vegetarian (Included)</option>
                                                                        <option value="Non-Vegetarian" ${z==="Non-Vegetarian"?"selected":""}>Non-Vegetarian (+₹150)</option>
                                                                        <option value="Jain" ${z==="Jain"?"selected":""}>Jain (Included)</option>
                                                                    </select>
                                                                </div>
                                                            `}).join("")}
                                                    </div>
                                                `}
                                            </div>

                                            <!-- Dinner -->
                                            <div>
                                                <strong style="font-size:12px; color:var(--accent-cyan); display:block; margin-bottom:4px; text-transform:uppercase;">Dinner</strong>
                                                ${l===4?`
                                                    <span style="font-size:11.5px; color:var(--text-slate); font-style:italic;">Not Included (Departure day).</span>
                                                `:`
                                                    <div style="display:flex; flex-direction:column; gap:8px;">
                                                        ${p.passengerProfiles.map(x=>{if(x.type==="Infant")return"";const z=(f.dinner||{})[x.id]||"Vegetarian";return`
                                                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                                                    <span style="font-size:11.5px; color:var(--text-slate);">${x.name}:</span>
                                                                    <select class="sel-day-meal-choice" data-day="${l}" data-meal="dinner" data-pid="${x.id}" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:4px 8px; border-radius:4px; color:#fff; font-size:11px;">
                                                                        <option value="Vegetarian" ${z==="Vegetarian"?"selected":""}>Vegetarian (Included)</option>
                                                                        <option value="Non-Vegetarian" ${z==="Non-Vegetarian"?"selected":""}>Non-Vegetarian (+₹250)</option>
                                                                        <option value="Jain" ${z==="Jain"?"selected":""}>Jain (Included)</option>
                                                                    </select>
                                                                </div>
                                                            `}).join("")}
                                                    </div>
                                                `}
                                            </div>
                                            
                                        </div>
                                    </div>
                                `}).join("")}
                        </div>
                    `}
                </div>
            `:a===4?i+=`
                <div class="booking-wizard-step-section">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">Enhance Your Trip</h3>
                    <span style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:15px;">Enhance your vacation package with extra excursions and gear.</span>

                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <!-- Scuba Diving -->
                        <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border:1px solid ${p.addOns.includes("scuba")?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:10px; cursor:pointer;">
                            <div style="display:flex; flex-direction:column; padding-right:10px;">
                                <strong style="font-size:13px; color:#fff;">Guided Scuba Diving</strong>
                                <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">Complete gear + underwater video package</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹2,500/person</strong>
                                <input type="checkbox" class="cb-addon-trip" value="scuba" ${p.addOns.includes("scuba")?"checked":""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                            </div>
                        </label>

                        <!-- Candlelight dinner -->
                        <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border:1px solid ${p.addOns.includes("dinner")?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:10px; cursor:pointer;">
                            <div style="display:flex; flex-direction:column; padding-right:10px;">
                                <strong style="font-size:13px; color:#fff;">Candlelight Beach Dinner</strong>
                                <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">4-course dining configuration right on shoreline</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹3,000/couple</strong>
                                <input type="checkbox" class="cb-addon-trip" value="dinner" ${p.addOns.includes("dinner")?"checked":""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                            </div>
                        </label>

                        <!-- Photographer -->
                        <label style="display:flex; align-items:center; justify-content:space-between; padding:14px; background:rgba(255,255,255,0.02); border:1px solid ${p.addOns.includes("photos")?"var(--accent-cyan)":"rgba(255,255,255,0.05)"}; border-radius:10px; cursor:pointer;">
                            <div style="display:flex; flex-direction:column; padding-right:10px;">
                                <strong style="font-size:13px; color:#fff;">Professional Photoshoot</strong>
                                <span style="font-size:10.5px; color:var(--text-slate); margin-top:2px;">2-hour local photography crew session</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                <strong style="font-size:12.5px; color:var(--accent-cyan);">+₹4,000</strong>
                                <input type="checkbox" class="cb-addon-trip" value="photos" ${p.addOns.includes("photos")?"checked":""} style="accent-color:var(--accent-cyan); width:16px; height:16px;">
                            </div>
                        </label>
                    </div>
                </div>
            `:a===5&&(i+=`
                <div class="booking-wizard-step-section" style="padding-bottom:120px;">
                    <h3 style="font-size:16px; font-weight:850; color:#fff; margin:0 0 4px 0;">Review & Confirm</h3>
                    <span style="font-size:11px; color:var(--text-slate); display:block; margin-bottom:15px;">Review your selections and details before completing checkout.</span>

                    <!-- Package Summary -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:16px; position:relative;">
                        <h4 style="font-size:11px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 6px 0;">Package Details</h4>
                        <strong style="font-size:14px; color:#fff; display:block; margin-bottom:4px;">${t.title}</strong>
                        <span style="font-size:12px; color:var(--text-slate); display:block;">${t.duration} Days / ${t.duration-1} Nights</span>
                        <span style="font-size:12px; color:var(--accent-cyan); display:block; margin-top:4px;">Travel Dates: ${p.travelDate}</span>
                    </div>

                    <!-- Passengers Summary -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:16px; position:relative;">
                        <button type="button" class="btn-jump-step" data-step="1" style="position:absolute; top:12px; right:12px; background:none; border:none; color:var(--accent-cyan); font-size:11px; font-weight:800; cursor:pointer;">Edit ></button>
                        <h4 style="font-size:11px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 8px 0;">Travellers</h4>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            ${p.passengerProfiles.map(l=>`
                                <div style="font-size:12.5px; color:#fff; display:flex; justify-content:space-between;">
                                    <span>${l.name}</span>
                                    <span style="color:var(--text-slate);">${l.type} (${l.age} yrs)</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <!-- Accommodation & Transport Summary -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:16px; position:relative;">
                        <button type="button" class="btn-jump-step" data-step="2" style="position:absolute; top:12px; right:12px; background:none; border:none; color:var(--accent-cyan); font-size:11px; font-weight:800; cursor:pointer;">Edit ></button>
                        <h4 style="font-size:11px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 8px 0;">Stay & Transfers</h4>
                        <div style="font-size:12.5px; color:#fff; display:flex; flex-direction:column; gap:6px;">
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:var(--text-slate);">Stay Option:</span>
                                <span>${p.stayUpgrades.includes("sea-view")?"Sea View Resort (+₹3,000)":"Deluxe Room (Included)"}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:var(--text-slate);">Airport Transfers:</span>
                                <span>${p.transportUpgrades.includes("pickup-vip")?"VIP Pickup (+₹1,500)":"Sedan Cab (Included)"}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:var(--text-slate);">Vehicles Upgrade:</span>
                                <span>${p.transportUpgrades.includes("suv")?"Private SUV Innova (+₹2,000)":"Sedan Car (Included)"}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Meals Summary -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-bottom:16px; position:relative;">
                        <button type="button" class="btn-jump-step" data-step="3" style="position:absolute; top:12px; right:12px; background:none; border:none; color:var(--accent-cyan); font-size:11px; font-weight:800; cursor:pointer;">Edit ></button>
                        <h4 style="font-size:11px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 8px 0;">Meals Customization</h4>
                        <div style="display:flex; flex-direction:column; gap:6px; font-size:12.5px;">
                            ${p.passengerProfiles.map(l=>{if(l.type==="Infant")return`
                                    <div style="display:flex; justify-content:space-between;">
                                        <span style="color:var(--text-slate);">${l.name}:</span>
                                        <span>No meal required</span>
                                    </div>
                                `;const f=p.mealMode==="same"?(p.mealPreferences[l.id]||"Vegetarian")+" Throughout":"Custom Day-by-Day preferences";return`
                                    <div style="display:flex; justify-content:space-between; color:#fff;">
                                        <span style="color:var(--text-slate);">${l.name}:</span>
                                        <span>${f}</span>
                                    </div>
                                `}).join("")}
                        </div>
                    </div>

                    <!-- Final Pricing transparent table details breakdown -->
                    <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:15px; box-sizing:border-box; margin-bottom:24px;">
                        <h4 style="font-size:11.5px; font-weight:800; color:var(--text-slate); text-transform:uppercase; margin:0 0 12px 0; border-bottom:1px solid rgba(255,255,255,0.04); padding-bottom:6px;">Final Price Summary</h4>
                        
                        <div style="display:flex; flex-direction:column; gap:8px; font-size:12.5px; color:var(--text-slate);">
                            <!-- Dynamic Traveller Summary Rows -->
                            ${p.travellers.adults>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>${p.travellers.adults} Adult${p.travellers.adults>1?"s":""} (${t.priceStr} × ${p.travellers.adults})</span>
                                    <span>₹${o.adultTotal.toLocaleString()}</span>
                                </div>
                            `:""}
                            ${p.travellers.children>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>${p.travellers.children} Child${p.travellers.children>1?"ren":""} (₹${o.baseChildPrice.toLocaleString()} base × ${p.travellers.children})</span>
                                    <span>₹${o.childTotal.toLocaleString()}</span>
                                </div>
                            `:""}
                            ${p.travellers.infants>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>${p.travellers.infants} Infant${p.travellers.infants>1?"s":""}</span>
                                    <span>₹0</span>
                                </div>
                            `:""}
                            
                            <!-- Customizations -->
                            ${o.upgradesPrice>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Stay & Vehicle Customizations</span>
                                    <span>+₹${o.upgradesPrice.toLocaleString()}</span>
                                </div>
                            `:""}
                            
                            <!-- Meal add-ons -->
                            ${o.mealsPrice>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Meal Add-ons (Non-Veg selections)</span>
                                    <span>+₹${o.mealsPrice.toLocaleString()}</span>
                                </div>
                            `:""}

                            <!-- Add-ons -->
                            ${o.addonsPrice>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Activities & Gear Upgrades</span>
                                    <span>+₹${o.addonsPrice.toLocaleString()}</span>
                                </div>
                            `:""}

                            <!-- Discount -->
                            <div style="display:flex; justify-content:space-between; color:#4ade80;">
                                <span>Package Discount</span>
                                <span>-₹${o.discount.toLocaleString()}</span>
                            </div>

                            <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:8px; margin-top:4px; display:flex; justify-content:space-between; font-size:13.5px; color:#fff;">
                                <span>Subtotal</span>
                                <span>₹${o.subtotal.toLocaleString()}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>Taxes & Fees (GST 5%)</span>
                                <span>₹${o.taxes.toLocaleString()}</span>
                            </div>
                            <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:8px; margin-top:4px; display:flex; justify-content:space-between; font-size:16.5px; font-weight:900; color:var(--accent-cyan);">
                                <span>Total Booking Amount</span>
                                <span>₹${o.grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);e.innerHTML=`
            <!-- Header bar -->
            <div style="padding:16px 16px 12px 16px; background:rgba(7,10,20,0.95); display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.06); position:sticky; top:0; z-index:100;">
                <button type="button" id="btn-m-wizard-back" style="background:none; border:none; color:var(--text-slate); font-size:18px; cursor:pointer; outline:none; padding:0;">←</button>
                <div>
                    <h2 style="margin:0; font-size:15px; font-weight:850; color:#fff;">Complete Your Booking</h2>
                    <span style="font-size:10px; color:var(--text-slate); display:block; margin-top:1px;">Booking ID: ${p.bookingId}</span>
                </div>
            </div>

            <!-- Scrollable step wizard layout content -->
            <div style="padding: 16px; box-sizing:border-box; width:100%;">
                ${s}
                ${i}
            </div>

            <!-- Bottom Sticky CTAs bar (Price only visible on last step - Step 5 Review) -->
            <div class="mobile-details-sticky-bar" style="position:fixed; bottom:0; left:0; right:0; height:72px; background:rgba(7, 10, 20, 0.95); backdrop-filter:blur(15px); -webkit-backdrop-filter:blur(15px); border-top:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center; padding:12px 16px; z-index:10000; box-sizing:border-box;">
                ${a<5?`
                    <div style="display:flex; flex-direction:column; justify-content:center;">
                        <span style="font-size:10px; color:var(--accent-cyan); font-weight:800; text-transform:uppercase; letter-spacing:0.5px;">
                            ${a===1?"Trip Configuration":a===2?"Stay & Transfers":a===3?"Dining Preferences":"Activities & Add-ons"}
                        </span>
                        <span style="font-size:11px; color:var(--text-slate); margin-top:2px;">
                            ${a===1?"Specify dates & travellers":a===2?"Select stay & vehicle upgrades":a===3?"Choose dining options":"Add excursions & gear"}
                        </span>
                    </div>
                `:`
                    <div id="m-sticky-total-expand-btn" style="cursor:pointer; display:flex; flex-direction:column; justify-content:center;">
                        <span style="font-size:10px; color:var(--text-slate); display:block; text-transform:uppercase; font-weight:750;">Total Price</span>
                        <strong style="font-size:18px; font-weight:900; color:var(--accent-cyan); display:flex; align-items:center; gap:4px; transition: color 0.15s ease;" id="lbl-sticky-wizard-total">₹${o.grandTotal.toLocaleString()}</strong>
                    </div>
                `}
                <button type="button" class="btn-m-book-now" id="btn-m-wizard-continue" style="background:var(--accent-cyan) !important; color:var(--bg-dark) !important; border:none; padding:11px 20px; font-size:13.5px; font-weight:850; border-radius:8px; cursor:pointer; outline:none; box-shadow:0 4px 12px rgba(0, 203, 224, 0.2); white-space:nowrap; transition:all 0.2s;">
                    ${a===5?"Confirm & Pay":"Continue →"}
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
                        <span>Adult Base Packages (${t.priceStr} × ${p.travellers.adults})</span>
                        <span style="color:#fff;">₹${o.adultTotal.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Child Base Packages (₹15,000 × ${p.travellers.children})</span>
                        <span style="color:#fff;">₹${o.childTotal.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Customizations Upgrades:</span>
                        <span style="color:#fff;">+₹${o.upgradesPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Meal Customization Add-ons:</span>
                        <span style="color:#fff;">+₹${o.mealsPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Activities Add-ons:</span>
                        <span style="color:#fff;">+₹${o.addonsPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; color:#4ade80;">
                        <span>Package Discount:</span>
                        <span>-₹${o.discount.toLocaleString()}</span>
                    </div>
                    <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:6px; display:flex; justify-content:space-between; color:#fff;">
                        <span>Taxes & GST (5%):</span>
                        <span>₹${o.taxes.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;const d=document.getElementById("btn-m-wizard-back");d&&(d.onclick=()=>{a>1?(p.currentStep-=1,K(),ye()):window.innerWidth<768?(O("package-details",!0),ct(t)):me(t)});const c=document.getElementById("btn-m-wizard-continue");c&&(c.onclick=()=>{a<5?(p.currentStep+=1,K(),ye()):Ho()}),document.querySelectorAll(".btn-jump-step").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.step);p.currentStep=f,K(),ye()}});const u=document.getElementById("m-sticky-total-expand-btn"),r=document.getElementById("price-breakdown-popup-sheet"),b=document.getElementById("btn-close-breakdown-popup");u&&r&&(u.onclick=()=>{r.style.display="block"}),b&&r&&(b.onclick=()=>{r.style.display="none"});const m=document.getElementById("m-wizard-date-select");m&&(m.onchange=()=>{p.travelDate=m.value,K()});const v=document.getElementById("btn-infant-dec"),y=document.getElementById("btn-infant-inc");v&&y&&(v.onclick=()=>{if(p.travellers.infants>0){p.travellers.infants-=1;const l=p.passengerProfiles.map(f=>f.type).lastIndexOf("Infant");l!==-1&&p.passengerProfiles.splice(l,1),K(),ye()}},y.onclick=()=>{if(p.travellers.infants<5){p.travellers.infants+=1;const l=Math.max(...p.passengerProfiles.map(f=>f.id),0)+1;p.passengerProfiles.push({id:l,type:"Infant",name:"",age:1,gender:"Female",collapsed:!1}),K(),ye()}});const h=document.getElementById("btn-add-trip-mate");h&&(h.onclick=()=>{const l=Math.max(...p.passengerProfiles.map(f=>f.id),0)+1;p.passengerProfiles.forEach(f=>f.collapsed=!0),p.passengerProfiles.push({id:l,type:"Adult",name:"",age:"",gender:"Male",collapsed:!1}),K(),ye()}),document.querySelectorAll(".btn-delete-p-card").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.id);p.passengerProfiles=p.passengerProfiles.filter(x=>x.id!==f),K(),ye()}}),document.querySelectorAll(".btn-edit-p-card").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.id);p.passengerProfiles.forEach(x=>{x.collapsed=x.id!==f}),ye()}}),document.querySelectorAll(".btn-collapse-p-card").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(z=>z.id===f);x&&(x.collapsed=!0,R(f),K(),ye())}}),document.querySelectorAll(".input-p-name").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(z=>z.id===f);x&&(x.name=l.value),K()}}),document.querySelectorAll(".input-p-age").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(z=>z.id===f);x&&(x.age=parseInt(l.value)||0),K()}}),document.querySelectorAll(".select-p-gender").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(z=>z.id===f);x&&(x.gender=l.value),K()}}),document.querySelectorAll(".select-p-extrabed").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(z=>z.id===f);x&&(x.extraBed=l.value),x&&l.value==="Yes"&&(p.stayUpgrades.includes("extra-bed")||p.stayUpgrades.push("extra-bed")),K()}});function R(l){const f=document.querySelector(`.input-p-name[data-id="${l}"]`);if(f){const x=p.passengerProfiles.find(z=>z.id===l);if(x){const z=f.value,re=parseInt(document.querySelector(`.input-p-age[data-id="${l}"]`).value)||0,he=document.querySelector(`.select-p-gender[data-id="${l}"]`).value;x.name=z,x.age=re,x.gender=he}}}document.querySelectorAll(".cb-upgrade-stay").forEach(l=>{l.onchange=()=>{const f=l.value;l.checked?p.stayUpgrades.includes(f)||p.stayUpgrades.push(f):p.stayUpgrades=p.stayUpgrades.filter(x=>x!==f),be(),K()}}),document.querySelectorAll(".cb-upgrade-trans").forEach(l=>{l.onchange=()=>{const f=l.value;l.checked?p.transportUpgrades.includes(f)||p.transportUpgrades.push(f):p.transportUpgrades=p.transportUpgrades.filter(x=>x!==f),be(),K()}}),document.querySelectorAll(".meal-mode-card").forEach(l=>{l.onclick=()=>{const f=l.dataset.mode;p.mealMode=f,K(),ye()}}),document.querySelectorAll(".btn-meal-chip").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.pid),x=l.dataset.val;p.mealPreferences[f]=x,be(),K(),ye()}});const ge=document.querySelectorAll(".day-customize-accordion");ge.forEach(l=>{const f=l.querySelector(".day-customize-header"),x=l.querySelector(".day-customize-body");f&&x&&(f.onclick=()=>{const z=x.style.display==="block";ge.forEach(re=>{re.querySelector(".day-customize-body").style.display="none",re.classList.remove("active-day-acc")}),z||(x.style.display="block",l.classList.add("active-day-acc"))})}),document.querySelectorAll(".sel-day-meal-choice").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.day),x=l.dataset.type||l.dataset.meal,z=parseInt(l.dataset.pid);p.dayWiseMeals[f]||(p.dayWiseMeals[f]={lunch:{},dinner:{}}),p.dayWiseMeals[f][x]||(p.dayWiseMeals[f][x]={}),p.dayWiseMeals[f][x][z]=l.value,be(),K()}}),document.querySelectorAll(".cb-addon-trip").forEach(l=>{l.onchange=()=>{const f=l.value;l.checked?p.addOns.includes(f)||p.addOns.push(f):p.addOns=p.addOns.filter(x=>x!==f),be(),K()}});function be(){const l=document.getElementById("lbl-sticky-wizard-total");if(l){const f=qt();l.style.color="#ef4444",l.classList.add("pop-bounce"),setTimeout(()=>{l.innerText="₹"+f.grandTotal.toLocaleString(),l.style.color="var(--accent-cyan)",l.classList.remove("pop-bounce")},200)}}},Ho=()=>{if(!p)return;const e=qt(),t=JSON.parse(localStorage.getItem("beacon_bookings"))||[],a=t.findIndex(m=>m.id===p.bookingId);a!==-1&&(t[a].status="🟡 PAYMENT VERIFICATION PENDING",t[a].progress=100,t[a].progressDesc="Payment details submitted for verification",t[a].state.status="🟡 PAYMENT VERIFICATION PENDING"),localStorage.setItem("beacon_bookings",JSON.stringify(t)),Ue();const o="wanderworld@upi",n="WanderWorld Travels",s="₹"+e.grandTotal.toLocaleString(),i=document.getElementById("checkout-payable-amount"),d=document.getElementById("checkout-package-title"),c=document.getElementById("checkout-booking-id"),g=document.getElementById("checkout-upi-display"),u=document.getElementById("checkout-note-display"),r=document.getElementById("checkout-qr-code");if(i&&(i.innerText=s),d&&(d.innerText=p.pkg.title),c&&(c.innerText=p.bookingId),g&&(g.innerText=o),u&&(u.innerText=p.bookingId),r){const m=`upi://pay?pa=${o}&pn=${encodeURIComponent(n)}&am=${e.grandTotal}&tn=${p.bookingId}`;r.src=`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(m)}`}const b=document.getElementById("checkout-payment-modal");b&&(b.style.display="flex"),O("bookings",!0)},Oo=e=>{const t=JSON.parse(localStorage.getItem("beacon_bookings"))||[],a=t.find(o=>o.id===e);a&&(a.status="Confirmed",j(a),localStorage.setItem("beacon_bookings",JSON.stringify(t)),showToast("🎉 Payment verified! Booking Confirmed & Receipt generated."),Ue())},oo=e=>{const a=(JSON.parse(localStorage.getItem("beacon_bookings"))||[]).find(u=>u.id===e);if(!a||!a.receiptSnapshot){showToast("⚠️ Receipt snapshot details not available.");return}const o=a.receiptSnapshot,n=o.planner,s=o.pricing,i=document.getElementById("view-receipt-viewer");if(!i)return;i.innerHTML=`
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
                        ${n.logo?`<img src="${n.logo}" alt="Planner Logo" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1px solid #cbd5e1; margin-bottom: 10px;">`:""}
                        <h1 style="font-size: 20px; font-weight: 900; margin: 0; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">${n.name}</h1>
                        <span style="font-size: 11px; color: #64748b; font-style: italic; display: block; margin-top: 3px;">Creating journeys worth remembering</span>
                        
                        <div style="font-size: 11.5px; color: #475569; margin-top: 10px; line-height: 1.5;">
                            <span>${n.address}</span><br>
                            <span>Phone: ${n.phone} | Email: ${n.email}</span>
                            ${n.gstRegistered?`<br><strong style="color: #0f172a; display:inline-block; margin-top:4px;">GSTIN: ${n.gstin}</strong>`:""}
                        </div>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">

                    <!-- 2. Document Title & Basic Info -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px; margin-bottom: 24px;">
                        <div>
                            <h2 style="font-size: 15px; font-weight: 900; color: #0f172a; text-transform: uppercase; margin: 0 0 6px 0;">
                                ${n.gstRegistered?"TAX INVOICE / RECEIPT":"PAYMENT RECEIPT"}
                            </h2>
                            <div style="font-size: 11.5px; color: #475569; line-height: 1.45;">
                                <span>Receipt No: <strong>${o.receiptNo}</strong></span><br>
                                <span>Booking ID: <strong>${o.bookingId}</strong></span>
                            </div>
                        </div>
                        <div style="text-align: right; font-size: 11.5px; color: #475569; line-height: 1.45;">
                            <span>Payment Status: <strong style="color:#22c55e;">${o.paymentStatus}</strong></span><br>
                            <span>Payment Date: ${o.paymentDate}</span><br>
                            <span>Booking Date: ${o.bookingDate}</span>
                        </div>
                    </div>

                    <!-- 3. Customer & Trip Details Row -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #f1f5f9;">
                        <div>
                            <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Billed / Booked For</h4>
                            <div style="font-size: 12px; color: #1e293b; line-height: 1.45;">
                                <strong style="color: #0f172a;">${o.customer.name}</strong><br>
                                <span>Phone: ${o.customer.phone}</span><br>
                                <span>Email: ${o.customer.email}</span>
                            </div>
                        </div>
                        <div>
                            <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Trip Details</h4>
                            <div style="font-size: 12px; color: #1e293b; line-height: 1.45;">
                                <strong style="color: #0f172a;">${o.trip.packageTitle}</strong><br>
                                <span>Destination: ${o.trip.destination}</span><br>
                                <span>Dates: ${o.trip.dates}</span><br>
                                <span>Duration: ${o.trip.duration}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Travellers List -->
                    <div style="margin-bottom: 24px;">
                        <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Travellers</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">
                            ${o.travellers.map((u,r)=>`
                                <div style="font-size: 12px; color: #1e293b;">
                                    <strong>${r+1}. ${u.name}</strong> (${u.type})
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <!-- 5. Customization Config Summary -->
                    <div style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; box-sizing:border-box;">
                        <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Booking Customization Snapshot</h4>
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px; color: #475569;">
                            <div style="display:flex; justify-content:space-between;">
                                <span>Stay Room Class:</span>
                                <strong style="color:#0f172a;">${o.customizations.stay}</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>Vehicle Transport:</span>
                                <strong style="color:#0f172a;">${o.customizations.transport}</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; flex-direction:column; gap:4px; border-top:1px dashed #e2e8f0; padding-top:6px;">
                                <span>Meal Preferences:</span>
                                <div style="display:flex; flex-direction:column; gap:2px; padding-left:10px; margin-top:2px;">
                                    ${o.customizations.meals.map(u=>`<span>• ${u.name}: <strong>${u.pref}</strong></span>`).join("")}
                                </div>
                            </div>
                            ${o.customizations.addons.length>0?`
                                <div style="display:flex; justify-content:space-between; border-top:1px dashed #e2e8f0; padding-top:6px;">
                                    <span>Selected Add-ons:</span>
                                    <strong style="color:#0f172a;">${o.customizations.addons.join(", ")}</strong>
                                </div>
                            `:""}
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
                                    <td style="padding: 8px 4px; text-align: right; color:#0f172a;">₹${s.basePrice.toLocaleString()}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#475569;">Stay Upgrade Class</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#0f172a;">₹${s.upgradesPrice.toLocaleString()}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#475569;">Additional Meal Charges (Non-Veg)</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#0f172a;">₹${s.mealsPrice.toLocaleString()}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#475569;">Activities & Guided Excursions Add-ons</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#0f172a;">₹${s.addonsPrice.toLocaleString()}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 4px; color:#22c55e;">Package Booking Discount</td>
                                    <td style="padding: 8px 4px; text-align: right; color:#22c55e;">−₹${s.discount.toLocaleString()}</td>
                                </tr>
                                
                                <!-- Subtotal row -->
                                <tr style="border-top: 1px solid #e2e8f0;">
                                    <td style="padding: 10px 4px 6px 4px; font-weight: 800; color:#0f172a;">Subtotal</td>
                                    <td style="padding: 10px 4px 6px 4px; text-align: right; font-weight: 800; color:#0f172a;">₹${s.subtotal.toLocaleString()}</td>
                                </tr>

                                <!-- Taxes / GST if registered -->
                                ${n.gstRegistered?`
                                    <tr style="border-bottom: 1px solid #e2e8f0;">
                                        <td style="padding: 4px 4px 8px 4px; color:#475569;">GST Tax Breakup (CGST 2.5% + SGST 2.5%)</td>
                                        <td style="padding: 4px 4px 8px 4px; text-align: right; color:#0f172a;">₹${s.taxes.toLocaleString()}</td>
                                    </tr>
                                `:""}

                                <!-- Total Paid -->
                                <tr style="border-top: 2px solid #0f172a; font-size: 14.5px; font-weight: 900;">
                                    <td style="padding: 12px 4px; color: #0f172a;">TOTAL PAID</td>
                                    <td style="padding: 12px 4px; text-align: right; color: var(--accent-cyan);">₹${s.grandTotal.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- 7. Payment Verification details -->
                    <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 24px; font-size: 11.5px; color: #475569; line-height: 1.5; box-sizing:border-box;">
                        <h4 style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 6px 0; letter-spacing: 0.5px;">Transaction Reference</h4>
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <span>UPI Reference ID / UTR:</span>
                            <strong style="color:#0f172a;">${o.utrId}</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <span>Verification Status:</span>
                            <strong style="color:#22c55e;">${o.verification}</strong>
                        </div>
                        <span style="font-size:10px; color:#64748b; display:block; margin-top:6px; font-style:italic;">
                            "This receipt confirms payment recorded against the above Beacon booking. Package services are provided by the travel partner identified on this receipt."
                        </span>
                    </div>

                    <!-- 8. Planner contacts -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; margin-bottom: 30px; font-size: 11px; color:#64748b; line-height: 1.45;">
                        <strong style="color:#0f172a; text-transform:uppercase; font-size:10px; display:block; margin-bottom:4px;">Need help with your trip?</strong>
                        <span>Travel Partner: <strong>${n.name}</strong></span><br>
                        <span>Support Contact: ${n.phone} | ${n.email}</span>
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
        `,O("receipt-viewer");const d=document.getElementById("btn-receipt-back");d&&(d.onclick=()=>{O("bookings",!0)});const c=document.getElementById("btn-receipt-download");c&&(c.onclick=()=>{no(e)});const g=document.getElementById("btn-receipt-share");g&&(g.onclick=()=>{Go(o)})},no=e=>{const t=document.getElementById("receipt-invoice-document");if(!t){oo(e),setTimeout(()=>no(e),100);return}showToast("Generating PDF receipt, please wait...");const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",a.onload=()=>{const o={margin:.3,filename:`Beacon_Receipt_${e}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}};window.html2pdf().from(t).set(o).save().then(()=>{showToast("✅ PDF Receipt downloaded successfully.")})},document.head.appendChild(a)},Go=e=>{navigator.share?navigator.share({title:`Beacon Travel Receipt - ${e.bookingId}`,text:`E-Receipt for booking ${e.bookingId} (${e.trip.packageTitle}). Billed to ${e.customer.name}.`,url:window.location.href}).then(()=>{showToast("✅ Shared receipt successfully.")}).catch(t=>{console.log("Sharing failed:",t)}):(navigator.clipboard.writeText(window.location.href),showToast("📋 Link copied to clipboard to share."))},dt=document.querySelector(".enquiries-unread-dot");window.clearEnquiryNotifications=()=>{dt&&(dt.style.display="none"),localStorage.setItem("beacon_unread_enquiry","false")};const _o=()=>{dt&&(dt.style.display="block"),localStorage.setItem("beacon_unread_enquiry","true")},Wo=()=>{if(localStorage.getItem("beacon_enquiry_simulated")==="true")return;const e=document.querySelector("#enquiry-ws-1 .message-thread");if(!e)return;const t=document.createElement("div");t.className="msg-bubble planner unread-msg",t.style.borderLeft="3px solid var(--accent-cyan)",t.innerHTML=`
            <div class="msg-sender">Aarav Mehta</div>
            <p>Hi Aditya! I noticed you saved the Goa package as well. Would you like me to compare Spiti and Goa pricing options for you?</p>
            <span class="msg-time">Just now</span>
        `,e.appendChild(t),e.scrollTop=e.scrollHeight,_o(),showToast("📩 Aarav Mehta (Planner) sent a new message in Enquiries."),localStorage.setItem("beacon_enquiry_simulated","true")},Jo=()=>{const e=localStorage.getItem("beacon_unread_enquiry")==="true",t=localStorage.getItem("beacon_enquiry_simulated")==="true";if(e){if(dt&&(dt.style.display="block"),t){const a=document.querySelector("#enquiry-ws-1 .message-thread");if(a&&!a.querySelector(".unread-msg")){const o=document.createElement("div");o.className="msg-bubble planner unread-msg",o.style.borderLeft="3px solid var(--accent-cyan)",o.innerHTML=`
                        <div class="msg-sender">Aarav Mehta</div>
                        <p>Hi Aditya! I noticed you saved the Goa package as well. Would you like me to compare Spiti and Goa pricing options for you?</p>
                        <span class="msg-time">Just now</span>
                    `,a.appendChild(o),a.scrollTop=a.scrollHeight}}}else setTimeout(Wo,6e3)},Yo=()=>{const e=document.getElementById("enquiry-ws-1");if(!e)return;const t=e.querySelector(".message-composer input"),a=e.querySelector(".message-composer button"),o=e.querySelector(".message-thread"),n=()=>{const s=t.value.trim();if(!s)return;const i=document.createElement("div");i.className="msg-bubble user",i.innerHTML=`
                <div class="msg-sender">You</div>
                <p>${s}</p>
                <span class="msg-time">Just now</span>
            `,o.appendChild(i),t.value="",o.scrollTop=o.scrollHeight,setTimeout(()=>{const d=document.createElement("div");d.className="msg-bubble planner",d.innerHTML=`
                    <div class="msg-sender">Aarav Mehta</div>
                    <p>Got it! I will update the itinerary details accordingly and get back to you shortly.</p>
                    <span class="msg-time">Just now</span>
                `,o.appendChild(d),o.scrollTop=o.scrollHeight,showToast("📩 Aarav Mehta (Planner) replied to your message.")},2e3)};a&&t&&(a.onclick=n,t.onkeydown=s=>{s.key==="Enter"&&n()})};Jo(),Yo();function Ko(){const e=document.getElementById("trip-update-card"),t=document.getElementById("accept-trip-update"),a=document.getElementById("decline-trip-update");t&&t.addEventListener("click",()=>{showToast("✅ Trip Update Accepted! Your booking details have been auto-updated to Himachal Expedition."),e&&(e.style.transition="all 0.4s ease",e.style.opacity="0",setTimeout(()=>{e.style.display="none"},400));const u=document.querySelector(".booking-detailed-card h3");u&&(u.textContent="Himachal Expedition (Standard)");const r=document.querySelector(".booking-preview-card .preview-card-title");r&&(r.textContent="Himachal Expedition (Standard)")}),a&&a.addEventListener("click",()=>{showToast("❌ Trip Update Declined. The planner will contact you shortly."),e&&(e.style.transition="all 0.4s ease",e.style.opacity="0",setTimeout(()=>{e.style.display="none"},400))});const o=document.getElementById("traveller-package-change-modal"),n=document.getElementById("request-change-pkg-btn"),s=document.getElementById("close-change-pkg-modal"),i=document.getElementById("btn-cancel-pkg-change"),d=document.getElementById("btn-submit-pkg-change");let c=0;window.selectPackageChangeOpt=function(u,r){document.querySelectorAll(".pkg-change-opt").forEach(m=>{m.style.background="rgba(255,255,255,0.01)",m.style.borderColor="rgba(255,255,255,0.08)"}),u.style.background="rgba(0, 212, 255, 0.05)",u.style.borderColor="var(--accent-cyan)",c=r},n&&o&&n.addEventListener("click",u=>{u.preventDefault(),o.style.display="flex"});const g=()=>{o&&(o.style.display="none")};s&&(s.onclick=g),i&&(i.onclick=g),d&&d.addEventListener("click",()=>{showToast(`📨 Package Change Request submitted successfully! Price Difference: ${c>=0?"+":""}₹${c}.`),g()})}Ko()});
