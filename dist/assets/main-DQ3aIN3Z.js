(function(){const J=document.createElement("link").relList;if(J&&J.supports&&J.supports("modulepreload"))return;for(const z of document.querySelectorAll('link[rel="modulepreload"]'))S(z);new MutationObserver(z=>{for(const M of z)if(M.type==="childList")for(const _ of M.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&S(_)}).observe(document,{childList:!0,subtree:!0});function ee(z){const M={};return z.integrity&&(M.integrity=z.integrity),z.referrerPolicy&&(M.referrerPolicy=z.referrerPolicy),z.crossOrigin==="use-credentials"?M.credentials="include":z.crossOrigin==="anonymous"?M.credentials="omit":M.credentials="same-origin",M}function S(z){if(z.ep)return;z.ep=!0;const M=ee(z);fetch(z.href,M)}})();window.addEventListener("error",D=>{console.error("Global JS Error Captured in app.js:",D.message,"at",D.filename,":",D.lineno)});window.showToast=D=>{const J=document.getElementById("playground-toast");J?(J.innerText=D,J.classList.add("active"),setTimeout(()=>{J.classList.remove("active")},2200)):console.log("Toast:",D)};let q=[];const vt=D=>D.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),eo=D=>{const J=vt(D),ee=`${window.location.origin}/?package=${J}`,S=D.priceStr||D.price,z=D.basePrice||Math.round(D.priceNum*1.11),M=Math.round((z-D.priceNum)/z*100),_="₹"+z.toLocaleString(),Te=(D.highlights?D.highlights.split(","):["Luxury Stays","Guided Activities","Transfers Included"]).slice(0,4).map(K=>K.trim()).join(" • ");let $e="";return M>0&&($e=`
${M}% OFF • Original ${_}`),`*${D.title}*

${D.duration} Days / ${D.duration-1} Nights
${D.location?D.location.split(",")[0]:D.category.toUpperCase()}

Starting from ${S}/person${$e}

${Te}

Explore complete itinerary, stays, activities, dates & more on Beacon:

${ee}`},to=(D,J)=>{const ee=document.getElementById("share-canvas");if(!ee)return;const S=ee.getContext("2d"),z=600,M=800;ee.width=z,ee.height=M;const _=new Image;_.crossOrigin="anonymous",_.onload=()=>{const he=_.width/_.height,Te=z/M;let $e,K,de,ne;he>Te?(ne=_.height,de=_.height*Te,$e=(_.width-de)/2,K=0):(de=_.width,ne=_.width/Te,$e=0,K=(_.height-ne)/2),S.drawImage(_,$e,K,de,ne,0,0,z,M);const st=S.createLinearGradient(0,0,0,100);st.addColorStop(0,"rgba(7, 7, 28, 0.7)"),st.addColorStop(1,"rgba(7, 7, 28, 0)"),S.fillStyle=st,S.fillRect(0,0,z,100);const Ge=S.createLinearGradient(0,M*.55,0,M);Ge.addColorStop(0,"rgba(7, 7, 28, 0)"),Ge.addColorStop(.3,"rgba(7, 7, 28, 0.5)"),Ge.addColorStop(.7,"rgba(7, 7, 28, 0.9)"),Ge.addColorStop(1,"rgba(7, 7, 28, 0.98)"),S.fillStyle=Ge,S.fillRect(0,M*.55,z,M*.45),S.strokeStyle="#00CBE0",S.lineWidth=4,S.strokeRect(2,2,z-4,M-4),S.strokeStyle="#00CBE0",S.lineWidth=3.5,S.beginPath(),S.arc(45,45,14,.2*Math.PI,1.6*Math.PI),S.stroke(),S.strokeStyle="#00CBE0",S.lineWidth=2.5,S.beginPath(),S.moveTo(56,32),S.lineTo(62,38),S.moveTo(62,32),S.lineTo(56,38),S.stroke(),S.fillStyle="#ffffff",S.font='900 16px "Poppins", sans-serif',S.fillText("BEACON",75,47),S.fillStyle="#00CBE0",S.font='700 10px "Poppins", sans-serif',S.fillText("TRAVEL",75,58);const Mt=D.rating.replace("⭐","").trim();S.fillStyle="rgba(7, 7, 28, 0.75)",S.strokeStyle="rgba(255, 255, 255, 0.1)",S.lineWidth=1,S.beginPath(),S.roundRect(z-110,25,85,38,6),S.fill(),S.stroke(),S.fillStyle="#FFD700",S.font='14px "Poppins", sans-serif',S.fillText("⭐",z-100,48),S.fillStyle="#ffffff",S.font='800 13px "Poppins", sans-serif',S.fillText(Mt,z-78,48);const Dt=(D.style||D.category||"FEATURED").toUpperCase();S.fillStyle="#00CBE0",S.font='800 11px "Poppins", sans-serif',S.fillText(Dt,45,M-145);const _e=(D.location?D.location.split(",")[0]:D.category||"JOURNEY").toUpperCase();S.fillStyle="#ffffff",S.font='900 48px "Poppins", sans-serif',S.fillText(_e,45,M-90),S.fillStyle="rgba(255, 255, 255, 0.85)",S.font='500 20px "Poppins", sans-serif',S.fillText(D.title,45,M-55),S.fillStyle="#00CBE0",S.font='800 10px "Poppins", sans-serif',S.fillText("EXPLORE THIS JOURNEY ON BEACON",45,M-25);const wt=ee.toDataURL("image/png");J&&J(wt)},_.onerror=()=>{S.fillStyle="#07071C",S.fillRect(0,0,z,M),S.strokeStyle="#00CBE0",S.lineWidth=4,S.strokeRect(2,2,z-4,M-4),S.fillStyle="#fff",S.font='900 28px "Poppins", sans-serif',S.textAlign="center",S.fillText("BEACON TRAVEL",z/2,M/2-40),S.fillStyle="#00CBE0",S.fillText(D.title.toUpperCase(),z/2,M/2+10);const he=ee.toDataURL("image/png");J&&J(he)},_.src=D.bg||D.imgUrl};window.openShareSheet=D=>{const J=document.getElementById("beacon-share-sheet");if(!J)return;const ee=document.getElementById("whatsapp-text-preview"),S=document.getElementById("share-image-preview"),z=eo(D);ee.innerText=z,document.body.classList.add("modal-open"),J.style.display="flex",to(D,K=>{S.src=K}),J.ontouchmove=K=>{K.target===J&&K.preventDefault()};const M=document.getElementById("btn-close-share-sheet");M.onclick=()=>{document.body.classList.remove("modal-open"),J.style.display="none"};const _=document.getElementById("btn-share-whatsapp");_.onclick=()=>{const K=document.getElementById("share-canvas");if(K)try{K.toBlob(de=>{if(de)navigator.clipboard.write([new ClipboardItem({"image/png":de})]).then(()=>{showToast("📋 Card image copied! Paste it in WhatsApp to attach."),setTimeout(()=>{const ne=encodeURIComponent(z);window.open("https://api.whatsapp.com/send?text="+ne,"_blank")},1500)}).catch(()=>{const ne=encodeURIComponent(z);window.open("https://api.whatsapp.com/send?text="+ne,"_blank")});else{const ne=encodeURIComponent(z);window.open("https://api.whatsapp.com/send?text="+ne,"_blank")}},"image/png")}catch{const ne=encodeURIComponent(z);window.open("https://api.whatsapp.com/send?text="+ne,"_blank")}else{const de=encodeURIComponent(z);window.open("https://api.whatsapp.com/send?text="+de,"_blank")}};const he=document.getElementById("btn-copy-share-link");he&&(he.onclick=()=>{const K=vt(D),de=`${window.location.origin}/?package=${K}`;navigator.clipboard.writeText(de).then(()=>{showToast("📋 Package URL copied to clipboard!")})});const Te=document.getElementById("btn-copy-share-text");Te.onclick=()=>{navigator.clipboard.writeText(z).then(()=>{showToast("📋 WhatsApp details text copied to clipboard!")})};const $e=document.getElementById("btn-download-share-card");$e.onclick=()=>{const K=document.getElementById("share-canvas");if(K){const de=K.toDataURL("image/png"),ne=document.createElement("a");ne.download=`${vt(D)}-share.png`,ne.href=de,ne.click(),showToast("💾 Downloaded Travel Card!")}}};const ao=()=>{const J=new URLSearchParams(window.location.search).get("package"),ee=window.location.hash;let S=null;if(J)S=q.find(z=>vt(z)===J);else if(ee&&ee.startsWith("#package-")){const z=ee.replace("#package-","");S=q.find(M=>vt(M)===z||M.title.toLowerCase().includes(decodeURIComponent(z).toLowerCase()))}else{const z=window.location.pathname.split("/"),M=z.indexOf("package");if(M!==-1&&z[M+1]){const _=z[M+1];S=q.find(he=>vt(he)===_)}}S&&setTimeout(()=>{openPackageDetailsView(S)},300)};document.addEventListener("DOMContentLoaded",()=>{const D={agency:{name:"WanderGo Travels",legalName:"WanderGo Tour Operators Pvt Ltd",logo:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=150&q=80",address:"123 Example Road, Pune, Maharashtra - 411001",phone:"+91 99999 88888",email:"booking@wandergo.com",gstRegistered:!0,gstin:"27ABCDE1234F1Z5"},freelancer:{name:"ROHAN TRAVEL EXPERIENCES",legalName:"Rohan Mehta Experiences",logo:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",address:"Pune, Maharashtra - 411038",phone:"+91 98765 43210",email:"rohan.experiences@planner.com",gstRegistered:!1,gstin:""}},J=e=>{if(e.receiptSnapshot)return e.receiptSnapshot;const t=e.id==="BC-2026-9921"?D.agency:D.freelancer,a=e.priceNum||37e3,n=3e3,o=550,s=1e3,i=2e3,d=a+n+o+s-i,c=t.gstRegistered?.05:0,g=Math.round(d*c),u=d+g;e.receiptSnapshot={receiptNo:`BRC-2026-${Math.floor(1e5+Math.random()*9e5)}`,bookingId:e.id,paymentStatus:"PAID",paymentDate:"31 July 2026",bookingDate:"30 July 2026",utrId:"992100887321",verification:"Verified",planner:t,customer:{name:"Aditya Kasod",phone:"+91 98765 43210",email:"aditya.kasod@example.com"},trip:{packageTitle:e.packageTitle,destination:e.id==="BC-2026-9921"?"Kerala Backwaters":"Munnar Hills",dates:e.dateRange,duration:"5 Days / 4 Nights"},travellers:[{name:"Aditya Kasod",type:"Adult"},{name:"Riya Sharma",type:"Adult"},{name:"Aarav Sharma",type:"Child"},{name:"Myra Sharma",type:"Infant"}],customizations:{stay:"Sea View Resort Upgrade",transport:"Airport Transfer Sedan Cab — Included",meals:[{name:"Aditya Kasod",pref:"Vegetarian Throughout"},{name:"Riya Sharma",pref:"Non-Veg Throughout"},{name:"Aarav Sharma",pref:"Vegetarian Throughout"}],addons:["Beach Candlelight Dinner","Airport lounge Lounge access"]},pricing:{basePrice:a,upgradesPrice:n,mealsPrice:o,addonsPrice:s,discount:i,subtotal:d,taxes:g,grandTotal:u}};const r=JSON.parse(localStorage.getItem("beacon_bookings"))||[],h=r.findIndex(m=>m.id===e.id);return h!==-1&&(r[h]=e,localStorage.setItem("beacon_bookings",JSON.stringify(r))),e.receiptSnapshot},ee=()=>{document.querySelectorAll(".card-favorite-btn").forEach(e=>{e.querySelector("svg")||(e.innerHTML='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>')}),document.querySelectorAll(".card-share-btn").forEach(e=>{e.querySelector("svg")||(e.innerHTML='<svg viewBox="0 0 24 24"><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon><line x1="22" y1="2" x2="11" y2="13"></line></svg>')})};ee();const S=()=>{document.querySelectorAll(".dest-tab.active, .exp-tab.active, .style-tab.active, .budget-tab.active, .seasonal-tab.active").forEach(t=>{t.click()}),ee()},z=document.getElementById("liquid-glass-navigation");z&&window.addEventListener("scroll",()=>{window.scrollY>80?z.classList.add("scrolled"):z.classList.remove("scrolled")});const M=document.querySelectorAll(".hero5-dot"),_=document.getElementById("hero5-title"),he=document.getElementById("hero5-tag"),Te=document.getElementById("hero5-desc"),$e=[{title:"Life Beyond Routine",tag:"Nature's Whispers",desc:"Handpicked journeys. Unforgettable experiences. Made for you.",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"},{title:"Discover Golden Sands",tag:"Coastal Paradises",desc:"Immerse yourself in crystal waters and scenic shorelines curated by travel vloggers.",image:"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"},{title:"Roam Hidden Valleys",tag:"Let's Explore The World",desc:"Zen gardens, mountain trails, and isolated lodges crafted for wellness seekers.",image:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80"}];let K=0,de;function ne(e){M.forEach(a=>a.classList.remove("active")),M[e]&&M[e].classList.add("active");const t=$e[e];if(t){_&&(_.style.opacity="0"),he&&(he.style.opacity="0"),Te&&(Te.style.opacity="0");const a=document.getElementById("hero5-banner");a&&(a.style.backgroundImage=`url('${t.image}')`),setTimeout(()=>{_&&(_.innerText=t.title,_.style.opacity="1"),he&&(he.innerText=t.tag,he.style.opacity="1"),Te&&(Te.innerText=t.desc,Te.style.opacity="1")},300)}}function st(){de=setInterval(()=>{K=(K+1)%$e.length,ne(K)},1e4)}function Ge(){clearInterval(de),st()}M.forEach((e,t)=>{e.addEventListener("click",()=>{K=t,ne(t),Ge()})}),st();const Mt=e=>{let t=document.getElementById("share-toast");t||(t=document.createElement("div"),t.id="share-toast",t.style.cssText=`
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
            `,document.body.appendChild(t)),t.innerText=`🔗 Copied share link for "${e}"!`,t.style.opacity="1",t.style.transform="translateY(0)",setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(10px)"},2500)},Dt=(e=document)=>{e.querySelectorAll(".card-favorite-btn").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),o.preventDefault(),n.innerText==="♡"?(n.innerText="♥",n.style.color="#ef4444"):(n.innerText="♡",n.style.color="")})}),e.querySelectorAll(".card-share-btn").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation(),o.preventDefault();const s=n.closest(".travel-card"),i=s?s.querySelector(".card-title").innerText:n.dataset.title||"Package",d=window.location.origin+window.location.pathname+"#package-"+encodeURIComponent(i);navigator.clipboard.writeText(d).then(()=>{Mt(i)}).catch(()=>{Mt(i)})})})};Dt();const _e=(e,t,a,n)=>{const o=document.querySelectorAll(e),s=document.getElementById(t);s&&o.forEach(i=>{i.addEventListener("click",()=>{o.forEach(g=>g.classList.remove("active")),i.classList.add("active");const d=i.dataset.category,c=a[d]||[];s.style.opacity="0",setTimeout(()=>{s.innerHTML="",c.forEach(g=>{s.innerHTML+=n(g)}),Dt(s),ee(),Array.from(s.children).forEach((g,u)=>{g.style.opacity="0",g.style.transform="translateY(15px)",g.style.transition="all 0.4s ease-out",setTimeout(()=>{g.style.opacity="1",g.style.transform="translateY(0)"},u*100)}),s.style.opacity="1"},250)})})},wt=e=>`
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
    `,Ea=e=>`
        <div class="experience-card">
            <div class="experience-card-bg" style="background-image: url('${e.bg}')"></div>
            <div class="experience-content">
                <h3>${e.title}</h3>
                <span>${e.count}</span>
            </div>
        </div>
    `;_e(".dest-tab","destination-grid",{mountains:[{title:"Leh Ladakh Bike Expedition",type:"Mountain",duration:"6 Days",rating:"4.8",price:"₹22,999",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Manali Luxury Cedar Chalet",type:"Mountain",duration:"4 Days",rating:"4.7",price:"₹12,999",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Kedarnath Pilgrimage Trail Lodge",type:"Mountain",duration:"5 Days",rating:"4.8",price:"₹18,999",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Gulmarg Snow Igloo Couples Escape",type:"Mountain",duration:"4 Days",rating:"4.5",price:"₹15,999",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"}],beaches:[{title:"Goa Beachfront Honeymoon Villa",type:"Beach",duration:"5 Days",rating:"4.9",price:"₹14,999",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Varkala Cliffside Solo Backpacker",type:"Beach",duration:"4 Days",rating:"4.8",price:"₹11,499",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Havelock Island Beach Resort",type:"Beach",duration:"6 Days",rating:"4.9",price:"₹28,999",bg:"https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=400&q=80"},{title:"Gokarna Surf & Cliffs Expedition",type:"Beach",duration:"3 Days",rating:"4.6",price:"₹8,499",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"}]},wt),_e(".exp-tab","experience-grid",{adventure:[{title:"Trekking Peaks",count:"6 Packages",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"River Rafting Rapids",count:"8 Packages",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Bungee Jumping",count:"5 Packages",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Scuba Diving reefs",count:"8 Packages",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"}],nature:[{title:"Forest Safaris",count:"12 Packages",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Flower Valleys",count:"4 Packages",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Lake House Retreats",count:"7 Packages",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Bird Sanctuary",count:"3 Packages",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}]},Ea),_e(".style-tab","style-grid",{"style-group":[{title:"Solo Backpacking",count:"14 Packages",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Couple Getaways",count:"22 Packages",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Family Resorts",count:"18 Packages",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Friends Roadtrips",count:"10 Packages",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"}]},Ea),_e(".budget-tab","budget-grid",{"under-10k":[{title:"Varkala Cliffside Solo Backpacker",type:"Coastal",duration:"5 Days",rating:"4.6",price:"₹8,999",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Ooty Botanical Gardens Retreat",type:"Colonial",duration:"3 Days",rating:"4.7",price:"₹6,499",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Kasol Parvati Valley Solo Cabin",type:"Hills",duration:"4 Days",rating:"4.8",price:"₹7,999",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Coorg Coffee Estate Solo Villa",type:"Estate",duration:"3 Days",rating:"4.5",price:"₹9,999",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"}],"under-5k":[{title:"Rishikesh Forest Yoga Ashram",type:"Weekend Escape",duration:"2 Days",rating:"4.4",price:"₹3,499",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Varanasi Ganges Twilight Ritual",type:"Trek",duration:"1 Day",rating:"4.5",price:"₹1,299",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Tirupati Balaji Darshan Family Package",type:"Drive",duration:"2 Days",rating:"4.6",price:"₹4,999",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Amritsar Golden Temple Solo Peace",type:"Adventure day",duration:"1 Day",rating:"4.7",price:"₹3,999",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"}],luxury:[{title:"Maldives Overwater Romantic Bungalow",type:"Luxury Escape",duration:"5 Days",rating:"4.9",price:"₹1,20,000",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Singapore Sentosa Island Family Fun",type:"Family Adventure",duration:"6 Days",rating:"4.8",price:"₹55,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Dubai Marina Yacht Luxury Suite",type:"Luxury Escape",duration:"5 Days",rating:"4.9",price:"₹68,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Ananda Himalayas Spiritual Wellness",type:"Spiritual Escape",duration:"7 Days",rating:"4.8",price:"₹75,000",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}],premium:[{title:"Goa Beachfront Honeymoon Villa",type:"Premium Stay",duration:"5 Days",rating:"4.9",price:"₹28,000",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Gokarna Surf & Cliffs Expedition",type:"Adventure beach",duration:"4 Days",rating:"4.8",price:"₹28,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Havelock Island Beach Resort",type:"Premium Resort",duration:"6 Days",rating:"4.9",price:"₹28,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Leh Ladakh Bike Expedition",type:"Mountain Trail",duration:"6 Days",rating:"4.8",price:"₹22,999",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}]},wt),_e(".seasonal-tab","seasonal-grid",{monsoon:[{title:"Wayanad Treehouse Escape",type:"Monsoon",duration:"5 Days",rating:"4.9",price:"₹17,499",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Jim Corbett Wildlife Jeep Safari",type:"Monsoon",duration:"4 Days",rating:"4.8",price:"₹13,999",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Kabini Riverfront Luxury Lodge",type:"Monsoon",duration:"3 Days",rating:"4.7",price:"₹9,999",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Hemkund Sahib Alpine Trek",type:"Monsoon",duration:"2 Days",rating:"4.5",price:"₹4,899",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}],winter:[{title:"Gulmarg Snow Igloo Couples Escape",type:"Winter Peaks",duration:"4 Days",rating:"4.5",price:"₹32,000",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Shimla Mall Road Family Suite",type:"Hills Retreat",duration:"5 Days",rating:"4.6",price:"₹18,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Leh Ladakh Bike Expedition",type:"High Altitude",duration:"6 Days",rating:"4.8",price:"₹22,999",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Manali Luxury Cedar Chalet",type:"Snow Chalet",duration:"4 Days",rating:"4.7",price:"₹24,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"}],summer:[{title:"Goa Beachfront Honeymoon Villa",type:"Beaches",duration:"5 Days",rating:"4.9",price:"₹28,000",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Marari Beach Family Oasis",type:"Coastal Oasis",duration:"4 Days",rating:"4.8",price:"₹22,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Gokarna Surf & Cliffs Expedition",type:"Adventure Beach",duration:"4 Days",rating:"4.8",price:"₹28,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Havelock Island Beach Resort",type:"Tropical Island",duration:"6 Days",rating:"4.9",price:"₹28,000",bg:"https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=400&q=80"}],spring:[{title:"Ooty Botanical Gardens Retreat",type:"Spring Hills",duration:"5 Days",rating:"4.6",price:"₹14,000",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},{title:"Wayanad Treehouse Escape",type:"Nature retreat",duration:"5 Days",rating:"4.8",price:"₹18,000",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80"},{title:"Coorg Coffee Estate Solo Villa",type:"Estate retreat",duration:"4 Days",rating:"4.7",price:"₹16,000",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"},{title:"Ananda Himalayas Spiritual Wellness",type:"Spiritual retreat",duration:"7 Days",rating:"4.8",price:"₹75,000",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"}]},wt);try{const e=document.querySelector(".curved-trending-section"),t=document.querySelectorAll(".trending-curved-card"),a=document.querySelector(".trending-nav-btn.prev"),n=document.querySelector(".trending-nav-btn.next");if(t.length>0){let o=0;const s=t.length,i=()=>{t.forEach((c,g)=>{const u=(g-o)*(2*Math.PI/s),r=320,h=30,m=Math.cos(u),v=Math.sin(u)*r,y=(1-m)*h,b=Math.sin(u)*-15,I=.88+m*.12,E=Math.round((m+1)*10),P=(1-m)*2,T=m<-.5?Math.max(0,(m+1)*2):1;if(c.style.transform=`translate3d(${v}px, ${y}px, 0) rotate(${b}deg) scale(${I})`,c.style.zIndex=E,c.style.filter=P>0?`blur(${P}px)`:"none",c.style.opacity=T,g===(o%s+s)%s){c.classList.add("center-focus");const j=c.style.backgroundImage;e&&j&&(e.style.backgroundImage=j,e.style.backgroundSize="cover",e.style.backgroundPosition="center",e.style.transition="background-image 0.8s ease-in-out")}else c.classList.remove("center-focus")})};a&&n&&(a.addEventListener("click",()=>{o=(o-1+s)%s,i()}),n.addEventListener("click",()=>{o=(o+1)%s,i()})),i();const d=document.querySelector(".trending-carousel-wrapper");if(d){let c=0;d.addEventListener("wheel",g=>{if(!g.target.closest(".trending-curved-card"))return;g.preventDefault();const r=Date.now();r-c<700||Math.abs(g.deltaY)>3&&(c=r,g.deltaY>0?o=(o+1)%s:o=(o-1+s)%s,i())},{passive:!1})}}}catch(e){console.error("Curved Trending Carousel Error: ",e)}try{document.querySelectorAll(".bespoke-distance-tag").forEach(t=>{setTimeout(()=>{const a=t.dataset.base,n=t.dataset.time,o=t.querySelector(".tag-text"),s=t.querySelector(".pulse-dot");o&&(o.innerText=`📍 Nearby: ${n} drive (${a} km)`),t.classList.remove("calculating"),t.classList.add("calculated"),s&&(s.style.animation="none",s.style.backgroundColor="#10b981")},1800+Math.random()*800)})}catch(e){console.error("Bespoke Distance Calculator Error: ",e)}try{const e=document.getElementById("planner-search-input"),t=document.getElementById("planner-search-btn"),a=document.querySelectorAll(".planner-card"),n=document.querySelectorAll(".suggest-chip"),o=s=>{const i=s.toLowerCase().trim();a.forEach(d=>{const c=d.dataset.tags?d.dataset.tags.toLowerCase():"";i===""||c.includes(i)?(d.style.display="flex",setTimeout(()=>{d.style.opacity="1",d.style.transform="scale(1)"},50)):(d.style.opacity="0",d.style.transform="scale(0.95)",setTimeout(()=>{d.style.display="none"},300))})};e&&e.addEventListener("input",s=>{o(s.target.value)}),t&&e&&t.addEventListener("click",()=>{o(e.value);const s=document.getElementById("explore-planners");s&&s.scrollIntoView({behavior:"smooth",block:"center"})}),n.forEach(s=>{s.addEventListener("click",()=>{const i=s.innerText.trim();e&&(e.value=i),o(i);const d=document.getElementById("explore-planners");d&&d.scrollIntoView({behavior:"smooth",block:"center"})})})}catch(e){console.error("Planner Search Error: ",e)}try{document.querySelectorAll(".planner-card").forEach(t=>{t.addEventListener("mousemove",a=>{const n=t.getBoundingClientRect(),o=a.clientX-n.left,s=a.clientY-n.top,i=n.width/2,d=n.height/2,c=(d-s)/10,g=(o-i)/8;t.style.transform=`rotateX(${c}deg) rotateY(${g}deg)`;const u=t.querySelector(".planner-avatar"),r=t.querySelector(".planner-name"),h=t.querySelector(".planner-specialty"),m=t.querySelector(".planner-desc"),v=t.querySelector(".planner-footer");u&&(u.style.transform=`translate3d(${(o-i)/15}px, ${(s-d)/15}px, 40px)`),r&&(r.style.transform=`translate3d(${(o-i)/22}px, ${(s-d)/22}px, 30px)`),h&&(h.style.transform=`translate3d(${(o-i)/22}px, ${(s-d)/22}px, 30px)`),m&&(m.style.transform=`translate3d(${(o-i)/32}px, ${(s-d)/32}px, 20px)`),v&&(v.style.transform=`translate3d(${(o-i)/40}px, ${(s-d)/40}px, 10px)`)}),t.addEventListener("mouseleave",()=>{t.style.transform="rotateX(0deg) rotateY(0deg)";const a=t.querySelectorAll(".planner-avatar, .planner-name, .planner-specialty, .planner-desc, .planner-footer");a.forEach(n=>{n.style.transform="translate3d(0, 0, 0)",n.style.transition="transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"}),setTimeout(()=>{a.forEach(n=>{n.style.transition=""})},500)})})}catch(e){console.error("Planner 3D Parallax Error: ",e)}try{document.querySelectorAll(".card-favorite-btn").forEach(t=>{const a=t.parentElement;if(a&&!a.querySelector(".card-save-btn")){const n=a.parentElement.querySelector(".card-details")||a.parentElement.querySelector(".trending-card-info")||a.parentElement.querySelector(".bespoke-details"),o=n?n.querySelector(".card-title")||n.querySelector(".bespoke-title"):null,s=o?o.innerText.trim():"Premium Journey",i=document.createElement("button");i.className="card-save-btn",i.dataset.title=s,i.innerHTML='<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',a.insertBefore(i,t)}})}catch(e){console.error("Save Button Injection Error: ",e)}let X=JSON.parse(localStorage.getItem("beacon_saved_packages"))||[];const We=e=>{const t=X.indexOf(e);t>-1?(X.splice(t,1),showToast("✓ Removed from My Collection")):(X.push(e),showToast("✓ Saved to My Collection")),localStorage.setItem("beacon_saved_packages",JSON.stringify(X)),pt(),Ue(),typeof ot=="function"&&ot(),typeof bt=="function"&&bt()},Ue=()=>{document.querySelectorAll(".card-save-btn, .card-favorite-btn").forEach(t=>{let a=t.dataset.title;if(!a){const n=t.closest(".travel-card")||t.closest(".trending-curved-card")||t.closest(".bespoke-card"),o=n?n.querySelector(".card-title")||n.querySelector(".bespoke-title"):null;a=o?o.innerText.trim():null}if(a)if(X.includes(a)){t.classList.add("active");const n=t.querySelector("svg path");n&&(n.style.fill="#00CBE0")}else{t.classList.remove("active");const n=t.querySelector("svg path");n&&(n.style.fill="none")}})};document.body.addEventListener("click",e=>{const t=e.target.closest(".card-save-btn");if(t){e.preventDefault(),e.stopPropagation();const o=t.dataset.title;We(o);return}const a=e.target.closest(".card-favorite-btn");if(a){e.preventDefault(),e.stopPropagation();const o=a.closest(".travel-card")||a.closest(".trending-curved-card")||a.closest(".bespoke-card"),s=o?o.querySelector(".card-title")||o.querySelector(".bespoke-title"):null,i=a.dataset.title||(s?s.innerText.trim():"Premium Journey");a.style.transform="scale(1.3)",setTimeout(()=>{a.style.transform=""},200),We(i);return}const n=e.target.closest(".card-share-btn");if(n){e.preventDefault(),e.stopPropagation();const o=n.dataset.title||"Premium Journey",s=q.find(i=>i.title===o);s?openShareSheet(s):showToast("Cannot find package info.");return}});let ve="home",Je="home",kt=null,Ia={};const Y=(e,t=!1)=>{ve&&(Ia[ve]=window.scrollY),e!=="package-details"&&e!=="planner-profile"&&e!=="mobile-booking"&&e!=="receipt-viewer"&&e!==ve&&(Je=ve);const a=document.querySelector(".mobile-bottom-nav");a&&(window.innerWidth<768&&(e==="home"||e==="planner"||e==="collection"||e==="trips"||e==="profile")?a.style.display="flex":a.style.display="none"),document.querySelectorAll(".spa-view").forEach(g=>{g.classList.remove("active-view")});const o=document.getElementById(`view-${e}`);o&&o.classList.add("active-view"),document.querySelectorAll(".nav-link-item").forEach(g=>{g.dataset.target===e?g.classList.add("active"):g.classList.remove("active")});const i=document.querySelectorAll(".mobile-bottom-nav .nav-link-item"),d=Array.from(i).findIndex(g=>g.dataset.target===e),c=document.querySelector(".mobile-nav-indicator");if(c&&d!==-1&&(c.style.transform=`translateX(${d*100}%)`),e==="collection"&&(typeof ot=="function"&&ot(),typeof rn=="function"&&rn()),e==="enquiries"&&typeof window.clearEnquiryNotifications=="function"&&window.clearEnquiryNotifications(),ve=e,window.checkStickyCtaVisibility&&window.checkStickyCtaVisibility(),t)window.scrollTo({top:0,behavior:"instant"});else{const g=Ia[e]||0;window.scrollTo({top:g,behavior:"instant"})}};document.querySelectorAll(".nav-link-item").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.target;Y(a)})});const qt=e=>{if(!e)return;Y("planner");const t=document.getElementById("match-destination"),a=document.getElementById("match-duration"),n=document.getElementById("match-budget-slider"),o=document.getElementById("match-budget-readout"),s=document.querySelectorAll("#match-trip-styles .multi-chip"),i=document.querySelectorAll('input[name="match-pref"]'),d=document.getElementById("find-my-trip-btn");t&&(t.value=""),a&&(a.value="all"),n&&(n.value=3e5,o&&(o.innerText="₹3,00,000+")),s.forEach(y=>y.classList.remove("active")),i.forEach(y=>y.checked=!1);const c=e.toLowerCase().trim(),g=c.match(/under\s*₹?\s*(\d+)/)||c.match(/budget\s*of\s*₹?\s*(\d+)/)||c.match(/₹?\s*(\d+)/);if(g){const y=g[1],b=parseInt(y);b>=5e3&&n&&(n.value=b,o&&(o.innerText=`₹${b.toLocaleString()}`))}const u=c.match(/(\d+)\s*day/);if(u&&a){const y=parseInt(u[1]);y<=2?a.value="weekend":y>=3&&y<=5?a.value="short":y>=6&&y<=8?a.value="medium":y>=10&&(a.value="long")}else c.includes("weekend")&&a&&(a.value="weekend");const r=["solo","couple","honeymoon","friends","family","adventure","luxury","spiritual","backpacking","nature"];r.forEach(y=>{c.includes(y)&&s.forEach(b=>{b.dataset.style===y&&b.classList.add("active")})});const h=g,m=u||c.includes("day")||c.includes("weekend"),v=r.some(y=>c.includes(y));!h&&!m&&!v&&t&&(t.value=e.charAt(0).toUpperCase()+e.slice(1)),setTimeout(()=>{d&&d.click()},300)},rt=document.getElementById("panel-search-input"),Ta=document.getElementById("panel-search-submit-btn"),un=document.querySelectorAll(".popular-chip"),Nt=document.getElementById("panel-voice-btn");Ta&&rt&&(Ta.addEventListener("click",()=>{const e=rt.value.trim();qt(e)}),rt.addEventListener("keypress",e=>{if(e.key==="Enter"){const t=rt.value.trim();qt(t)}})),un.forEach(e=>{e.addEventListener("click",()=>{const t=e.innerText.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,"").trim();qt(t)})}),Nt&&Nt.addEventListener("click",()=>{showToast("🎙️ Active Listening... Speak your destination or budget!"),Nt.classList.add("active-listen-glow"),setTimeout(()=>{Nt.classList.remove("active-listen-glow");const e="Honeymoon under ₹50,000";rt&&(rt.value=e),qt(e)},2500)});const Ba=document.querySelectorAll(".view-mode-tab"),Wt=document.querySelectorAll(".search-mode-container"),Ce=document.getElementById("compare-tab-btn"),fn=()=>{try{return(JSON.parse(localStorage.getItem("beacon_planner_packages"))||[]).filter(t=>t.status==="published").map(t=>{const a=t.priceNum||(t.price?t.price>1e4?t.price:t.price*85:25e3),n=typeof t.duration=="number"?t.duration:parseInt(t.duration)||5;return{title:t.title,imgUrl:t.image||t.imgUrl||"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",priceStr:t.priceStr||"₹"+a.toLocaleString(),priceNum:a,duration:n,category:t.category||t.destination&&t.destination.toLowerCase()||"beaches",rating:"⭐ "+(t.rating||5),reviews:t.reviews||12,style:t.style||"couple",experiences:t.experiences||"sightseeing",transport:t.transport||"flight",accommodation:t.accommodation||"resort",offers:t.offers||"cancellation",highlights:t.highlights||t.description||"Beautiful travel package created by our planner partners.",meals:t.meals||"Breakfast Included",sightseeing:t.sightseeing||t.destination||"Local sightseeing tours",transfers:t.transfers||"Airport pickup & drop cabs",cancellation:t.cancellation||"Free cancellation within 24 hours",hotelName:t.hotelName||"Luxury Resort Accommodations",hotelAddress:t.hotelAddress||t.destination||"Premium partner property",latitude:t.lat||t.latitude||5.69,longitude:t.lng||t.longitude||73.31,inclusions:Array.isArray(t.inclusions)?t.inclusions.join(", "):t.inclusions||"Stay, transfers, dinners",exclusions:Array.isArray(t.exclusions)?t.exclusions.join(", "):t.exclusions||"Flight fares, Personal shopping",bookingsCount:t.bookings||0,isPlannerAdded:!0}})}catch(e){return console.error("Failed to parse planner packages",e),[]}};let mn=[{title:"Goa Beachfront Honeymoon Villa",imgUrl:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",priceStr:"₹28,000",priceNum:28e3,duration:5,category:"beaches",rating:"⭐ 4.9",reviews:142,style:"couple",experiences:"watersports",transport:"flight",accommodation:"resort",offers:"cancellation",highlights:"Private beach access, candlelit dinner, sunset yacht cruise",meals:"All Inclusive",sightseeing:"Calangute Beach, Fort Aguada, Dudhsagar Falls",transfers:"Airport private cab",cancellation:"Free cancellation within 24 hours",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Marari Beach Family Oasis",imgUrl:"https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=600&q=80",priceStr:"₹22,000",priceNum:22e3,duration:4,category:"beaches",rating:"⭐ 4.8",reviews:98,style:"family",experiences:"cultural",transport:"train",accommodation:"resort",offers:"emi",highlights:"Beachside volleyball, family organic garden tour, traditional cooking class",meals:"Full Board",sightseeing:"Marari beach, Alleppey backwaters, Arthunkal Church",transfers:"Station shuttle",cancellation:"Free cancellation within 48 hours",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Gokarna Surf & Cliffs Expedition",imgUrl:"https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",priceStr:"₹12,500",priceNum:12500,duration:3,category:"beaches",rating:"⭐ 4.7",reviews:115,style:"adventure",experiences:"adventure",transport:"bus",accommodation:"homestay",offers:"instant",highlights:"Professional surfing lessons, beach trekking, cliffside camping",meals:"Breakfast",sightseeing:"Om Beach, Half Moon Beach, Paradise Beach",transfers:"Local guide driver",cancellation:"Non-refundable promo",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Havelock Island Beach Resort",imgUrl:"https://images.unsplash.com/photo-1589979482837-e74f2e145060?auto=format&fit=crop&w=600&q=80",priceStr:"₹75,000",priceNum:75e3,duration:5,category:"beaches",rating:"⭐ 5.0",reviews:64,style:"luxury",experiences:"scuba",transport:"flight",accommodation:"villa",offers:"cancellation",highlights:"Private villa pool, scuba diving certification, coral reef exploration",meals:"All Inclusive",sightseeing:"Radhanagar Beach, Elephant Beach, Kalapathar Beach",transfers:"Private jetty transfer",cancellation:"Free cancellation within 7 days",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Puri Beach Temple Sanctuary",imgUrl:"https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80",priceStr:"₹9,500",priceNum:9500,duration:3,category:"beaches",rating:"⭐ 4.6",reviews:82,style:"spiritual",experiences:"temple",transport:"train",accommodation:"hotel",offers:"instant",highlights:"Special VIP darshan slot, beach arati viewing, temple prasad meals",meals:"Full Board",sightseeing:"Jagannath Temple, Puri Beach, Konark Sun Temple",transfers:"Station cab transfer",cancellation:"Free cancellation within 24 hours",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Varkala Cliffside Solo Backpacker",imgUrl:"https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",priceStr:"₹6,800",priceNum:6800,duration:4,category:"beaches",rating:"⭐ 4.8",reviews:73,style:"solo",experiences:"backwaters",transport:"train",accommodation:"hostel",offers:"instant",highlights:"Cliffside hostel stay, daily morning yoga, cafe crawling vouchers",meals:"Breakfast",sightseeing:"Varkala Beach, Janardhana Swami Temple, Edava Beach",transfers:"Self-driven scooter",cancellation:"Non-refundable promo",hotelName:"Soneva Jani Resort & Villas",hotelAddress:"Medhufaru Island, Noonu Atoll, Maldives",latitude:5.69,longitude:73.31,inclusions:"Roundtrip Flights, Premium Beach Resort, Daily Breakfast & Dinner, Private Airport Transfers",exclusions:"Water sports gear rentals, Personal shopping, Travel insurance",bookingsCount:24},{title:"Gulmarg Snow Igloo Couples Escape",imgUrl:"https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=600&q=80",priceStr:"₹42,000",priceNum:42e3,duration:5,category:"mountains",rating:"⭐ 4.9",reviews:110,style:"couple",experiences:"snow",transport:"flight",accommodation:"villa",offers:"cancellation",highlights:"Stay in luxury heated snow igloo, private Gondola ride, ski lesson",meals:"Half Board",sightseeing:"Gulmarg Gondola, Apharwat Peak, Strawberry Valley",transfers:"Airport private 4x4",cancellation:"Free cancellation within 5 days",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Shimla Mall Road Family Suite",imgUrl:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",priceStr:"₹18,500",priceNum:18500,duration:4,category:"mountains",rating:"⭐ 4.7",reviews:154,style:"family",experiences:"snow",transport:"train",accommodation:"hotel",offers:"emi",highlights:"Toy train ride ticket, heritage walk tour, bonfire night",meals:"Breakfast",sightseeing:"The Ridge, Jakhoo Temple, Kufri Fun World",transfers:"Station shuttle",cancellation:"Free cancellation within 24 hours",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Leh Ladakh Bike Expedition",imgUrl:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",priceStr:"₹32,000",priceNum:32e3,duration:7,category:"mountains",rating:"⭐ 4.9",reviews:235,style:"adventure",experiences:"adventure",transport:"selfdrive",accommodation:"camp",offers:"cancellation",highlights:"Royal Enfield rental, high mountain pass crossings, lake camping",meals:"All Inclusive",sightseeing:"Pangong Lake, Khardung La, Nubra Valley",transfers:"Backup vehicle mechanic",cancellation:"Free cancellation within 7 days",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Manali Luxury Cedar Chalet",imgUrl:"https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",priceStr:"₹65,000",priceNum:65e3,duration:5,category:"mountains",rating:"⭐ 4.9",reviews:88,style:"luxury",experiences:"snow",transport:"flight",accommodation:"villa",offers:"cancellation",highlights:"Private cedar forest chalet, hot spring baths, fine dining dining",meals:"All Inclusive",sightseeing:"Solang Valley, Hadimba Temple, Jogini Waterfall",transfers:"Airport private cab",cancellation:"Free cancellation within 24 hours",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Kedarnath Pilgrimage Trail Lodge",imgUrl:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",priceStr:"₹11,500",priceNum:11500,duration:4,category:"mountains",rating:"⭐ 4.8",reviews:210,style:"spiritual",experiences:"temple",transport:"train",accommodation:"hotel",offers:"instant",highlights:"Pre-booked helper/pony slots, biometric pass, special puja booking",meals:"Full Board",sightseeing:"Kedarnath Temple, Bhairav Temple, Gauri Kund",transfers:"Trek start shuttle",cancellation:"Non-refundable promo",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Kasol Parvati Valley Solo Cabin",imgUrl:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",priceStr:"₹7,500",priceNum:7500,duration:3,category:"mountains",rating:"⭐ 4.7",reviews:128,style:"solo",experiences:"nature",transport:"bus",accommodation:"homestay",offers:"instant",highlights:"Wood cabin riverside, trek guiding to Chalal, cafe vouchers",meals:"Breakfast",sightseeing:"Parvati River, Manikaran Sahib, Tosh Village",transfers:"Self-driven scooter",cancellation:"Non-refundable promo",hotelName:"Khyber Mountain Resort & Spa",hotelAddress:"Gulmarg Ski Slopes Road, Kashmir, India",latitude:34.05,longitude:74.38,inclusions:"Roundtrip Transport, Luxury Alpine Chalet, All Meals Included, Experienced Trek Coordinator",exclusions:"Ski equipment rental, Mountain pass permits, Tips & Gratuities",bookingsCount:18},{title:"Wayanad Treehouse Escape",imgUrl:"https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80",priceStr:"₹24,000",priceNum:24e3,duration:3,category:"nature",rating:"⭐ 4.8",reviews:92,style:"couple",experiences:"forest",transport:"flight",accommodation:"resort",offers:"cancellation",highlights:"Luxury high-rise treehouse stay, private forest walk, waterfall bath",meals:"Breakfast",sightseeing:"Edakkal Caves, Banasura Sagar Dam, Chembra Peak",transfers:"Airport private cab",cancellation:"Free cancellation within 24 hours",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Ooty Botanical Gardens Retreat",imgUrl:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",priceStr:"₹14,000",priceNum:14e3,duration:4,category:"nature",rating:"⭐ 4.6",reviews:138,style:"family",experiences:"lakes",transport:"train",accommodation:"hotel",offers:"emi",highlights:"Private boat ride in Ooty lake, pine forest walk, tea factory tour",meals:"Breakfast",sightseeing:"Ooty Lake, Doddabetta Peak, Rose Garden",transfers:"Station shuttle",cancellation:"Free cancellation within 24 hours",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Jim Corbett Wildlife Jeep Safari",imgUrl:"https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",priceStr:"₹16,500",priceNum:16500,duration:3,category:"nature",rating:"⭐ 4.7",reviews:182,style:"adventure",experiences:"wildlife",transport:"bus",accommodation:"resort",offers:"instant",highlights:"Two jungle jeep safaris, expert naturalist guide, river rafting",meals:"Full Board",sightseeing:"Corbett Tiger Reserve, Garjiya Devi Temple, Corbett Falls",transfers:"Resort shuttle",cancellation:"Free cancellation within 48 hours",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Kabini Riverfront Luxury Lodge",imgUrl:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",priceStr:"₹85,000",priceNum:85e3,duration:5,category:"nature",rating:"⭐ 5.0",reviews:46,style:"luxury",experiences:"wildlife",transport:"flight",accommodation:"villa",offers:"cancellation",highlights:"Private pool cottage, boat safari, premium tiger tracking guides",meals:"All Inclusive",sightseeing:"Kabini River, Nagarhole National Park, Backwaters",transfers:"Airport private cab",cancellation:"Free cancellation within 7 days",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Rishikesh Forest Yoga Ashram",imgUrl:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",priceStr:"₹8,000",priceNum:8e3,duration:5,category:"nature",rating:"⭐ 4.8",reviews:194,style:"spiritual",experiences:"cultural",transport:"train",accommodation:"homestay",offers:"instant",highlights:"Daily yoga classes, organic vegan diet, meditation hall, forest walks",meals:"All Inclusive",sightseeing:"Triveni Ghat, Laxman Jhula, Beatles Ashram",transfers:"Station shuttle",cancellation:"Free cancellation within 24 hours",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Coorg Coffee Estate Solo Villa",imgUrl:"https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",priceStr:"₹10,500",priceNum:10500,duration:4,category:"nature",rating:"⭐ 4.7",reviews:84,style:"solo",experiences:"forest",transport:"train",accommodation:"homestay",offers:"instant",highlights:"Stay inside working coffee plantation, hiking trail guides, bonfire",meals:"Breakfast",sightseeing:"Abbey Falls, Raja's Seat, Dubare Elephant Camp",transfers:"Self-driven scooter",cancellation:"Non-refundable promo",hotelName:"Kabini Riverfront Safari Villas",hotelAddress:"Kabini Reservoir Road, Nagarhole, Karnataka, India",latitude:11.92,longitude:76.27,inclusions:"Forest Lodge Stay, Daily Breakfast & Lunch, Naturalist Guide, Safari Jeep Permits",exclusions:"Camera equipment fees, Personal laundry, Night safaris",bookingsCount:15},{title:"Varanasi Ganges Twilight Ritual",imgUrl:"https://images.unsplash.com/photo-1561361062-856c4ab3d997?auto=format&fit=crop&w=600&q=80",priceStr:"₹15,000",priceNum:15e3,duration:3,category:"spiritual",rating:"⭐ 4.9",reviews:230,style:"couple",experiences:"temple",transport:"flight",accommodation:"hotel",offers:"cancellation",highlights:"Private boat for Ganga Arati, early morning subah-e-banaras tour",meals:"Breakfast",sightseeing:"Kashi Vishwanath Temple, Dashashwamedh Ghat, Sarnath",transfers:"Airport private cab",cancellation:"Free cancellation within 24 hours",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Tirupati Balaji Darshan Family Package",imgUrl:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",priceStr:"₹12,000",priceNum:12e3,duration:3,category:"spiritual",rating:"⭐ 4.8",reviews:312,style:"family",experiences:"temple",transport:"train",accommodation:"hotel",offers:"instant",highlights:"Confirmed Special Entry Darshan Tickets, laddu prasadam, local temples",meals:"Full Board",sightseeing:"Tirumala Venkateswara Temple, Padmavathi Temple, Kapila Theertham",transfers:"Station private cab",cancellation:"Non-refundable promo",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Hemkund Sahib Alpine Trek",imgUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",priceStr:"₹18,000",priceNum:18e3,duration:5,category:"spiritual",rating:"⭐ 4.8",reviews:76,style:"adventure",experiences:"adventure",transport:"train",accommodation:"hotel",offers:"emi",highlights:"Guided alpine trek, stay at base camp, scenic mountain photography",meals:"Full Board",sightseeing:"Hemkund Sahib, Valley of Flowers, Joshimath",transfers:"Trek start shuttle",cancellation:"Free cancellation within 48 hours",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Ananda Himalayas Spiritual Wellness",imgUrl:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",priceStr:"₹1,20,000",priceNum:12e4,duration:5,category:"spiritual",rating:"⭐ 5.0",reviews:34,style:"luxury",experiences:"spa",transport:"flight",accommodation:"resort",offers:"cancellation",highlights:"Palace estate stay, personalized wellness consult, luxury spa therapies",meals:"All Inclusive",sightseeing:"Rishikesh ghats, Haridwar arati, Himalayan trails",transfers:"Airport private cab",cancellation:"Free cancellation within 14 days",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Haridwar Meditation & Yoga Ashram",imgUrl:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",priceStr:"₹6,500",priceNum:6500,duration:4,category:"spiritual",rating:"⭐ 4.7",reviews:142,style:"spiritual",experiences:"cultural",transport:"train",accommodation:"homestay",offers:"instant",highlights:"Ashram meditation halls, ganga river dip escort, daily sat-sang talks",meals:"All Inclusive",sightseeing:"Har Ki Pauri, Mansa Devi Temple, Chandi Devi Temple",transfers:"Station shuttle",cancellation:"Free cancellation within 24 hours",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Amritsar Golden Temple Solo Peace",imgUrl:"https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=600&q=80",priceStr:"₹5,500",priceNum:5500,duration:2,category:"spiritual",rating:"⭐ 4.9",reviews:119,style:"solo",experiences:"cultural",transport:"train",accommodation:"hotel",offers:"instant",highlights:"Night darshan entry, Langar kitchen service volunteer slot, Wagah border",meals:"Breakfast",sightseeing:"Golden Temple, Jallianwala Bagh, Wagah Border",transfers:"Station cab transfer",cancellation:"Free cancellation within 24 hours",hotelName:"Ganges Meditation Ashram & Residency",hotelAddress:"Triveni Ghat Road, Rishikesh, Uttarakhand, India",latitude:30.08,longitude:78.26,inclusions:"Ashram/Hotel Stay, Traditional Sattvik Meals, Special VIP Darshan tickets, Yoga sessions",exclusions:"Personal pooja offerings, Temple donations, Personal shopping",bookingsCount:32},{title:"Maldives Overwater Romantic Bungalow",imgUrl:"https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",priceStr:"₹1,35,000",priceNum:135e3,duration:5,category:"international",rating:"⭐ 5.0",reviews:167,style:"couple",experiences:"scuba",transport:"flight",accommodation:"resort",offers:"cancellation",highlights:"Overwater villa stay, private sea access, couples lagoon massage",meals:"All Inclusive",sightseeing:"Male Atoll, Coral Reefs, Sandbank picnic",transfers:"Speedboat private return",cancellation:"Free cancellation within 7 days",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Singapore Sentosa Island Family Fun",imgUrl:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",priceStr:"₹88,000",priceNum:88e3,duration:6,category:"international",rating:"⭐ 4.8",reviews:142,style:"family",experiences:"city",transport:"flight",accommodation:"hotel",offers:"emi",highlights:"Universal Studios tickets, Gardens by the Bay passes, night safari",meals:"Breakfast",sightseeing:"Sentosa Island, Marina Bay Sands, Universal Studios",transfers:"Airport private shuttle",cancellation:"Free cancellation within 3 days",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Nepal Everest Base Camp Trek",imgUrl:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",priceStr:"₹48,000",priceNum:48e3,duration:7,category:"international",rating:"⭐ 4.9",reviews:182,style:"adventure",experiences:"trekking",transport:"flight",accommodation:"hotel",offers:"cancellation",highlights:"Experienced Sherpa guides, hot tea-house stays, scenic mountain flight",meals:"All Inclusive",sightseeing:"Lukla Airport, Namche Bazaar, Everest Base Camp",transfers:"Airport heli pickup",cancellation:"Free cancellation within 10 days",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Dubai Marina Yacht Luxury Suite",imgUrl:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",priceStr:"₹1,15,000",priceNum:115e3,duration:4,category:"international",rating:"⭐ 4.9",reviews:92,style:"luxury",experiences:"city",transport:"flight",accommodation:"hotel",offers:"cancellation",highlights:"Burj Khalifa 148th floor VIP slots, desert safari luxury dune dinner",meals:"Half Board",sightseeing:"Burj Khalifa, Palm Jumeirah, Dubai Mall",transfers:"Limousine return shuttle",cancellation:"Free cancellation within 5 days",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Bali Ubud Sacred Temples Retreat",imgUrl:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",priceStr:"₹62,000",priceNum:62e3,duration:6,category:"international",rating:"⭐ 4.8",reviews:154,style:"spiritual",experiences:"temple",transport:"flight",accommodation:"resort",offers:"emi",highlights:"Sacred water purification ritual, private yoga classes, rice terrace walks",meals:"Breakfast",sightseeing:"Ubud Monkey Forest, Tanah Lot Temple, Tegallalang Rice Terraces",transfers:"Airport private cab",cancellation:"Free cancellation within 48 hours",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42},{title:"Thailand Solo Backpacking Explorer",imgUrl:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",priceStr:"₹32,000",priceNum:32e3,duration:7,category:"international",rating:"⭐ 4.7",reviews:204,style:"solo",experiences:"beaches",transport:"flight",accommodation:"hostel",offers:"instant",highlights:"Island hopping tour, hostel welcome crawl, street food vouchers",meals:"Breakfast",sightseeing:"Bangkok Grand Palace, Phi Phi Islands, Chiang Mai Night Bazaar",transfers:"Local scooter rental",cancellation:"Free cancellation within 24 hours",hotelName:"Ubud Hanging Gardens Resort",hotelAddress:"Payangan, Ubud, Bali, Indonesia",latitude:-8.5,longitude:115.26,inclusions:"International Flights, Overwater Luxury Villa, Daily Breakfast, Private Airport Transfers",exclusions:"Tourist Visa fees, Departure taxes, Personal shopping",bookingsCount:42}];q=[...fn(),...mn],Ba.forEach(e=>{e.addEventListener("click",()=>{Ba.forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.mode;Wt.forEach(a=>{a.classList.remove("active-mode"),a.id===`search-${t}-container`&&a.classList.add("active-mode")}),t==="compare"&&vn()})});let me=1e3,ye=15e4;const Re=document.getElementById("match-budget-min"),Ve=document.getElementById("match-budget-max");document.getElementById("slider-track");const La=document.getElementById("match-budget-readout"),we=document.getElementById("match-start-date"),be=document.getElementById("match-end-date"),Q=document.getElementById("match-duration"),Rt=document.querySelectorAll(".trip-type-card"),Jt=document.getElementById("expand-preferences-btn"),Yt=document.getElementById("preferences-expanded-content"),$a=document.getElementById("find-my-trip-btn"),St=document.getElementById("quick-search-input"),za=document.getElementById("quick-search-submit-btn"),Kt=document.querySelectorAll("#quick-search-chips .category-chip"),Et=document.getElementById("ai-matchmaker-results-section"),Vt=document.getElementById("ai-matchmaker-cards-grid"),Ca=["✨ Tell me your dream destination.","🏖 Looking for a relaxing beach holiday?","⛰ Discover hidden mountain escapes.","🎒 Planning a trip with friends?","❤️ Find the perfect honeymoon package."];let Xt=0;const lt=document.getElementById("ai-prompt-text");lt&&setInterval(()=>{lt.classList.add("fade-out"),setTimeout(()=>{Xt=(Xt+1)%Ca.length,lt.innerText=Ca[Xt],lt.classList.remove("fade-out"),lt.classList.add("fade-in"),setTimeout(()=>lt.classList.remove("fade-in"),400)},400)},4e3);const Qt=e=>e>=15e4?"₹1,50,000+":"₹"+e.toLocaleString("en-IN"),Ye=()=>{const e=document.getElementById("match-destination")?document.getElementById("match-destination").value.trim():"",t=we?we.value:"",a=be?be.value:"",n=Q?Q.value:"all",o=me,s=ye,i=Array.from(Rt).filter(v=>v.classList.contains("selected")).map(v=>v.dataset.style),d=document.getElementById("summary-dest");d&&(d.innerText=e||"Anywhere");const c=document.getElementById("summary-dates");if(c)if(t&&a){const v={month:"short",day:"numeric"},y=new Date(t).toLocaleDateString("en-US",v),b=new Date(a).toLocaleDateString("en-US",v);c.innerText=`${y} - ${b}`}else n!=="all"?c.innerText=`${n} Days (approx)`:c.innerText="Flexible";const g=document.getElementById("summary-budget");g&&(o===5e3&&s===3e5?g.innerText="Any Budget":g.innerText=`₹${o.toLocaleString()} - ₹${s.toLocaleString()}`);const u=document.getElementById("summary-type");u&&(i.length>0?u.innerText=i.map(v=>v.charAt(0).toUpperCase()+v.slice(1)).join(", "):u.innerText="Flexible");let r=60;e&&(r+=10),t&&a?r+=10:n!=="all"&&(r+=5),(o>5e3||s<3e5)&&(r+=10),i.length>0&&(r+=10),r=Math.min(99,r);const h=document.getElementById("summary-confidence"),m=document.getElementById("summary-confidence-bar");h&&(h.innerText=`${r}% Fit`),m&&(m.style.width=`${r}%`)},Ke=()=>{if(!La)return;Re&&document.activeElement!==Re&&(Re.value=me),Ve&&document.activeElement!==Ve&&(Ve.value=ye);const e=ye>=15e4?"₹1,50,000+":Qt(ye);La.innerHTML=`${Qt(me)} – ${e}`,Ye(),document.getElementById("budget-slider-track");const t=document.getElementById("budget-slider-range"),a=document.getElementById("budget-thumb-min"),n=document.getElementById("budget-thumb-max"),o=document.getElementById("thumb-value-min"),s=document.getElementById("thumb-value-max");if(a&&n&&t){const c=(me-1e3)/149e3*100,g=(ye-1e3)/149e3*100;a.style.left=`${c}%`,n.style.left=`${g}%`,t.style.left=`${c}%`,t.style.width=`${g-c}%`,o&&(o.innerText=Qt(me)),s&&(s.innerText=e)}};Re&&Ve&&(Re.addEventListener("change",()=>{let e=parseInt(Re.value)||1e3;e=Math.round((e-1e3)/2e3)*2e3+1e3,e=Math.max(1e3,Math.min(e,ye-2e3)),Re.value=e,me=e,Ke()}),Ve.addEventListener("change",()=>{let e=parseInt(Ve.value)||15e4;e=Math.round((e-1e3)/2e3)*2e3+1e3,e=Math.max(me+2e3,Math.min(e,15e4)),Ve.value=e,ye=e,Ke()})),Ke();const Xe=document.getElementById("match-destination");if(Xe){let e=document.getElementById("btn-clear-dest");e||(e=document.createElement("span"),e.id="btn-clear-dest",e.innerHTML="&times;",e.style.cssText="color: var(--text-slate); font-size: 20px; font-weight: 800; cursor: pointer; display: none; margin-left: 6px; padding: 0 4px; line-height: 1;",Xe.parentElement.appendChild(e),e.addEventListener("click",a=>{a.stopPropagation(),Xe.value="",Xe.placeholder="Anywhere",e.style.display="none",Ye(),typeof je=="function"&&je(null,null,null)}));const t=()=>{e.style.display=Xe.value.length>0?"inline-block":"none"};Xe.addEventListener("input",t),Xe.addEventListener("change",t)}const Zt=document.getElementById("btn-flexible-dates-mobile"),Pa=document.getElementById("btn-flexible-dates");Zt&&Pa&&Zt.addEventListener("click",e=>{Pa.click(),Zt.classList.add("active"),showToast("📅 Selected Flexible Dates")});const It=document.querySelectorAll(".duration-chip-m"),Qe=document.getElementById("match-duration");It.length>0&&Qe&&(It.forEach(e=>{e.addEventListener("click",()=>{It.forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.value;if(t==="custom"){const a=prompt("Enter custom duration (number of days):","5"),n=parseInt(a);!isNaN(n)&&n>0?(e.innerText=`${n} Days`,Qe.value=n):(e.classList.remove("active"),document.querySelector('.duration-chip-m[data-value="all"]').classList.add("active"),Qe.value="all")}else{const a=document.getElementById("duration-chip-m-custom");a&&(a.innerText="Custom"),Qe.value=t}Qe.dispatchEvent(new Event("change"))})}),Qe.addEventListener("change",()=>{var a;const e=Qe.value;It.forEach(n=>n.classList.remove("active"));const t=Array.from(It).find(n=>n.dataset.value===e);if(t)t.classList.add("active");else if(e!=="all"){const n=document.getElementById("duration-chip-m-custom");n&&(n.classList.add("active"),n.innerText=`${e} Days`)}else(a=document.querySelector('.duration-chip-m[data-value="all"]'))==null||a.classList.add("active")})),setTimeout(()=>{const e=document.getElementById("budget-thumb-min"),t=document.getElementById("budget-thumb-max");if(!e||!t)return;const a=1e3,n=15e4,o=2e3,s=d=>{const g=e.parentElement.getBoundingClientRect(),u=g.width;let r=(d-g.left)/u;r=Math.max(0,Math.min(1,r));const h=a+r*(n-a),m=Math.round((h-a)/o)*o+a;return Math.max(a,Math.min(n,m))},i=(d,c)=>{const g=u=>{u.preventDefault(),d.classList.add("dragging");const r=m=>{const v=m.touches?m.touches[0].clientX:m.clientX,y=s(v);c==="min"?me=Math.min(y,ye-o):ye=Math.max(y,me+o),Ke()},h=()=>{d.classList.remove("dragging"),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",h),document.removeEventListener("touchmove",r),document.removeEventListener("touchend",h)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",h),document.addEventListener("touchmove",r,{passive:!1}),document.addEventListener("touchend",h)};d.addEventListener("mousedown",g),d.addEventListener("touchstart",g,{passive:!1})};i(e,"min"),i(t,"max")},300);const jt=document.getElementById("planner-sticky-cta-wrap"),Ft=document.getElementById("btn-planner-sticky-cta"),ea=document.getElementById("find-my-trip-btn");jt&&Ft&&ea&&(Ft.addEventListener("click",()=>{ea.click(),Ft.style.transform="scale(0.98)",setTimeout(()=>{Ft.style.transform=""},150)}),window.checkStickyCtaVisibility=()=>{if(ve!=="planner"){jt.style.display="none";return}const e=ea.getBoundingClientRect();!(e.top>=0&&e.bottom<=window.innerHeight)&&window.scrollY>150?jt.style.display="block":jt.style.display="none"},window.addEventListener("scroll",window.checkStickyCtaVisibility));const ct=()=>{if(!we||!be||!Q)return;const e=we.value,t=be.value;if(e&&t){const a=new Date(e),n=new Date(t),o=Math.abs(n-a),s=Math.ceil(o/(1e3*60*60*24));s<=2?Q.value="weekend":s<=3?Q.value="2-3":s<=5?Q.value="4-5":s<=7?Q.value="6-7":s<=10?Q.value="8-10":Q.value="10+"}Ye()};we&&be&&(we.addEventListener("change",ct),be.addEventListener("change",ct)),Q&&Q.addEventListener("change",Ye);const ze=document.getElementById("match-destination");ze&&ze.addEventListener("input",Ye),Rt.forEach(e=>{e.addEventListener("click",()=>{e.classList.toggle("selected"),Ye()})}),Jt&&Yt&&Jt.addEventListener("click",()=>{Yt.classList.toggle("active"),Jt.querySelector(".arrow").innerText=Yt.classList.contains("active")?"▲":"▼"}),Kt.forEach(e=>{e.addEventListener("click",()=>{const t=e.classList.contains("active");if(Kt.forEach(a=>a.classList.remove("active")),t)je(null,null,null);else{e.classList.add("active");const a=e.dataset.category;showToast(`🔎 Filtering category: ${e.innerText}`),je(a,null,null)}})});const Aa=e=>{const t=e.toLowerCase().trim();if(!t)return;document.getElementById("match-destination")&&(document.getElementById("match-destination").value=""),Re&&(Re.value=""),Ve&&(Ve.value=""),me=1e3,ye=15e4,Q&&(Q.value="all"),we&&(we.value=""),be&&(be.value=""),Rt.forEach(i=>i.classList.remove("selected")),Kt.forEach(i=>i.classList.remove("active"));const a=["goa","kashmir","maldives","bali","thailand","dharamshala","gokarna","munnar","jaisalmer","spiti","alleppey","ooty","pondicherry","hampi"];for(let i of a)if(t.includes(i)){document.getElementById("match-destination")&&(document.getElementById("match-destination").value=i.charAt(0).toUpperCase()+i.slice(1));break}const n=/(?:under|below|less than|budget|₹)?\s?(\d+)(?:\s?(?:k|thousand|000))?/i,o=t.match(n);if(o){let i=parseInt(o[1]);(t.includes(o[1]+"k")||t.includes(o[1]+" k")||i<1e3)&&(i=i*1e3),i>=1e3&&i<=15e4&&(ye=Math.max(me+2e3,i))}if(t.includes("weekend"))Q&&(Q.value="weekend");else{const i=/(\d+)\s?(?:day|night)/i,d=t.match(i);if(d){const c=parseInt(d[1]);Q&&(c<=3?Q.value="2-3":c<=5?Q.value="4-5":c<=7?Q.value="6-7":c<=10?Q.value="8-10":Q.value="10+")}}const s={couple:["couple","romantic","honeymoon"],family:["family","kids"],adventure:["adventure","trek","hiking","rafting","thrill"],solo:["solo","backpacking"],luxury:["luxury","resort","premium","5 star"],spiritual:["spiritual","devotion","temple","peace"]};for(let i in s)for(let d of s[i])if(t.includes(d)){const c=document.querySelector(`.trip-type-card[data-style="${i}"]`);c&&c.classList.add("selected");break}Ke(),showToast("🔮 AI parsed search preferences!"),je(null,null,null)};St&&St.addEventListener("keypress",e=>{e.key==="Enter"&&Aa(St.value)}),za&&St&&za.addEventListener("click",()=>{Aa(St.value)});const ta=["Finding hidden gems...","Comparing thousands of packages...","Checking seasonal prices...","Finding the best value...","Preparing your perfect journey..."];let aa;const yn=()=>{const e=document.getElementById("ai-searching-loader"),t=document.getElementById("searching-status-text"),a=document.getElementById("ai-matchmaker-results-section");if(!e||!t||!a)return;a.style.display="none",e.style.display="block",e.scrollIntoView({behavior:"smooth",block:"center"});let n=0;t.innerText=ta[n],clearInterval(aa),aa=setInterval(()=>{n=(n+1)%ta.length,t.innerText=ta[n]},1500)},bn=()=>{const e=document.getElementById("ai-searching-loader");e&&(e.style.display="none"),clearInterval(aa)},hn=e=>{const t=document.querySelector(".matchmaker-card-glass");if(!e||!t)return;const a=e.getBoundingClientRect(),n=t.getBoundingClientRect(),o=document.createElement("div");o.className="flying-card-anim",o.style.backgroundImage=e.style.backgroundImage||"",o.style.left=`${a.left+window.scrollX}px`,o.style.top=`${a.top+window.scrollY}px`,o.style.width=`${a.width}px`,o.style.height=`${a.height}px`,document.body.appendChild(o),o.offsetWidth,o.style.left=`${n.left+window.scrollX+n.width/2-30}px`,o.style.top=`${n.top+window.scrollY+n.height/2-30}px`,o.style.width="60px",o.style.height="60px",o.style.opacity="0.1",setTimeout(()=>{t.style.boxShadow="0 0 35px rgba(0, 203, 224, 0.7)",t.style.transform="scale(1.01)",setTimeout(()=>{t.style.boxShadow="",t.style.transform=""},600)},600),o.addEventListener("transitionend",()=>{o.remove()})},Ma=()=>{const e=document.getElementById("matchmaker-compare-summary"),t=document.getElementById("compare-summary-grid");if(!(!e||!t)){if(F.length===0){e.style.display="none";return}e.style.display="block",t.innerHTML="",F.forEach(a=>{const n=document.createElement("div");n.className="compare-summary-item",n.innerHTML=`
                <span><strong>${a.title}</strong></span>
                <span class="remove-btn" data-title="${a.title}">✕</span>
            `,n.querySelector(".remove-btn").addEventListener("click",o=>{o.stopPropagation(),F=F.filter(i=>i.title!==a.title),Ma(),oa();const s=document.querySelector(`.card-compare-checkbox[data-title="${a.title}"]`);s&&(s.checked=!1)}),t.appendChild(n)})}},xn=e=>{if(!(!Vt||!Et)){if(Vt.innerHTML="",e.length===0){Vt.innerHTML=`
                <div class="empty-results-fallback" style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
                    <p class="empty-saved-msg" style="margin-bottom:15px; font-size:15px;">We couldn't find an exact match, but here are some amazing alternatives.</p>
                    <button class="btn-toast" id="reset-match-filters-btn" style="background:var(--accent-cyan); color:var(--bg-dark); border:none; padding:8px 20px; border-radius:6px; font-weight:700; cursor:pointer;" data-msg="Resetting inputs...">View Flexible Options</button>
                </div>
            `;const t=document.getElementById("reset-match-filters-btn");t&&t.addEventListener("click",()=>{document.getElementById("match-destination")&&(document.getElementById("match-destination").value=""),me=1e3,ye=15e4,Ke(),je(null,null,null)}),Et.style.display="block",Et.scrollIntoView({behavior:"smooth",block:"start"});return}e.forEach(t=>{const a=F.some(d=>d.title===t.title),n=document.createElement("div");n.className="travel-card",n.style.border="1px solid rgba(0, 203, 224, 0.15)",n.innerHTML=`
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
            `;const o=n.querySelector(".card-compare-checkbox");o.addEventListener("change",d=>{d.stopPropagation(),o.checked&&hn(n.querySelector(".card-img-wrap")),dt(t,o.checked)}),n.querySelector(".card-favorite-btn").addEventListener("click",d=>{d.stopPropagation(),We(t.title)});const s=n.querySelector(".card-share-btn");s&&s.addEventListener("click",d=>{d.stopPropagation(),openShareSheet(t)});const i=n.querySelector(".btn-book-now");i&&i.addEventListener("click",d=>{d.stopPropagation(),ka(t)}),Vt.appendChild(n)}),Et.style.display="block",Et.scrollIntoView({behavior:"smooth",block:"start"}),Ue(),ee()}},je=(e,t,a)=>{const n=document.getElementById("match-destination")?document.getElementById("match-destination").value.toLowerCase().trim():"",o=Q?Q.value:"all",s=t??me,i=a??ye,d=Array.from(Rt).filter(g=>g.classList.contains("selected")).map(g=>g.dataset.style),c=Array.from(document.querySelectorAll('input[name="match-pref"]:checked')).map(g=>g.value);console.log("Filter Diagnostics - Start:",{dest:n,durVal:o,minBudget:s,maxBudget:i,selectedStyles:d,categoryChipValue:e}),yn(),setTimeout(()=>{console.log("Filtering from total packages count:",q.length);let g=q.filter(r=>{if(!!(r.priceNum>i*1.2||r.priceNum<s*.8)||n!==""&&!(r.title.toLowerCase().includes(n)||r.category.toLowerCase().includes(n)))return!1;if(e)if(e==="budget"){if(r.priceNum>25e3)return!1}else if(e==="international"){const m=r.title.toLowerCase();if(!m.includes("bali")&&!m.includes("maldives")&&!m.includes("thailand"))return!1}else{const m=e.toLowerCase();if(!r.title.toLowerCase().includes(m)&&!r.category.toLowerCase().includes(m)&&!r.highlights.toLowerCase().includes(m)&&r.style!==m)return!1}if(o!=="all"){const m=parseInt(o);if(isNaN(m)){if(o==="weekend"&&r.duration>2||o==="2-3"&&(r.duration<2||r.duration>3)||o==="4-5"&&(r.duration<4||r.duration>5)||o==="6-7"&&(r.duration<6||r.duration>7)||o==="8-10"&&(r.duration<8||r.duration>10)||o==="8+"&&r.duration<8||o==="10+"&&r.duration<10)return!1}else if(r.duration!==m)return!1}return console.log("MATCH FOUND:",r.title,"Duration:",r.duration,"Price:",r.priceNum),!0});console.log("Filtered matches count:",g.length);let u=g.map(r=>{let h=96;r.priceNum>i?h-=8:r.priceNum<s?h-=6:h+=2;let m=0;d.forEach(b=>{(r.style===b||r.category.toLowerCase()===b)&&m++}),d.length>0&&m===0?h-=10:m>0&&(h+=m*2);let v=0;c.forEach(b=>{(r.experiences===b||r.category.toLowerCase()===b||r.highlights.toLowerCase().includes(b))&&v++}),c.length>0&&v===0?h-=8:v>0&&(h+=v*2),h=Math.max(70,Math.min(99,h));let y=`Perfect fit for your ₹${s.toLocaleString()} - ₹${i.toLocaleString()} budget. `;return m>0&&(y+=`Matches your preferred ${d.join("/")} styles. `),v>0&&(y+=`Includes ${c.slice(0,2).join(" & ")} options. `),y+=`Covers the requested ${r.duration}-day duration with a solid ${r.rating} rating.`,{...r,matchScore:h,matchReason:y}});u.sort((r,h)=>h.matchScore-r.matchScore),bn(),xn(u)},1500)};$a&&$a.addEventListener("click",()=>{je(null,null,null)});let F=[];const na=document.getElementById("floating-compare-widget"),Da=document.getElementById("compare-selected-count"),qa=document.getElementById("compare-clear-btn"),Na=document.getElementById("compare-now-btn"),dt=(e,t)=>{if(t){if(F.length>=3){showToast("⚠️ You can compare up to 3 packages only!"),document.querySelectorAll(".card-compare-checkbox").forEach(n=>{n.dataset.title===e.title&&(n.checked=!1)});return}F.some(a=>a.title===e.title)||F.push(e),showToast(`➕ Added "${e.title}" to compare list`)}else F=F.filter(a=>a.title!==e.title),showToast(`➖ Removed "${e.title}" from compare list`);Ma(),oa(),typeof bt=="function"&&bt(),typeof ot=="function"&&ot()},oa=()=>{if(!na||!Da)return;const e=F.length;e>=2?(na.classList.add("active"),Ce&&(Ce.style.display="inline-block")):(na.classList.remove("active"),Ce&&(Ce.style.display="none")),Da.innerText=e};qa&&qa.addEventListener("click",()=>{F=[],document.querySelectorAll(".card-compare-checkbox").forEach(t=>t.checked=!1),oa(),Wt.forEach(t=>{t.classList.remove("active-mode"),t.id==="search-list-container"&&t.classList.add("active-mode")}),Ce&&Ce.classList.remove("active")});const Ra=document.getElementById("compare-back-to-list-btn");Ra&&Ra.addEventListener("click",()=>{Wt.forEach(e=>{e.classList.remove("active-mode"),e.id==="search-list-container"&&e.classList.add("active-mode")}),Ce&&Ce.classList.remove("active")}),Na&&Na.addEventListener("click",()=>{Ce&&Ce.click()});const vn=()=>{if(!compareMatrixTable)return;if(F.length===0){compareMatrixTable.innerHTML='<tr><td style="text-align: center; padding: 40px 0;">No packages selected for comparison. Go to List View and check at least 2 packages.</td></tr>';return}let e=0,t=0;F.forEach((s,i)=>{const c=(parseFloat(s.rating.replace(/[^0-9.]/g,""))||4)/s.priceNum;c>t&&(t=c,e=i)});let a="<th>Package Spec</th>";F.forEach((s,i)=>{a+=`<th class="${i===e?"best-value-col":""}">
                ${i===e?'<span class="compare-value-badge">BEST VALUE</span><br>':""}
                <strong>${s.title}</strong>
            </th>`});const n=[{label:"Starting Price",key:"priceStr"},{label:"Duration",key:"duration",format:s=>`${s} Days`},{label:"Rating Score",key:"rating"},{label:"Reviews count",key:"reviews",format:s=>`${s||95} Travelers`},{label:"Accommodation",key:"accommodation",format:s=>s?s.toUpperCase():"HOTEL"},{label:"Meals Included",key:"meals"},{label:"Sightseeing Tours",key:"sightseeing"},{label:"Airport Transfers",key:"transfers"},{label:"Cancellation Policy",key:"cancellation"},{label:"Highlights",key:"highlights"}];let o=`<thead><tr>${a}</tr></thead><tbody>`;n.forEach(s=>{o+=`<tr><td class="spec-label">${s.label}</td>`,F.forEach((i,d)=>{const c=i[s.key],g=s.format?s.format(c):c||"N/A";o+=`<td class="${d===e?"best-value-col":""}">${g}</td>`}),o+="</tr>"}),o+="</tbody>",compareMatrixTable.innerHTML=o},pt=()=>{const e=document.getElementById("profile-saved-grid");if(e){if(X.length===0){e.innerHTML='<p class="empty-saved-msg" style="grid-column: 1/-1;">No saved packages yet. Click 🔖 on cards to save.</p>';return}e.innerHTML="",X.forEach(t=>{const a=q.find(o=>o.title.trim()===t.trim())||{title:t,imgUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",priceStr:"₹12,000",category:"Retreat",duration:4,rating:"⭐ 4.8"},n=document.createElement("div");n.className="travel-card",n.innerHTML=`
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
            `,n.addEventListener("click",()=>{Y("home"),setTimeout(()=>{const o=document.querySelectorAll("#view-home .travel-card, #view-home .trending-curved-card, #view-home .bespoke-card");for(let s of o){const i=s.querySelector(".card-title")||s.querySelector(".bespoke-title");if(i&&i.innerText.trim()===a.title.trim()){s.scrollIntoView({behavior:"smooth",block:"center"});break}}},400)}),e.appendChild(n)}),ee()}},Va=document.querySelectorAll(".dashboard-sidebar-list .sidebar-item"),wn=document.querySelectorAll(".enquiry-workspace");Va.forEach(e=>{e.addEventListener("click",()=>{Va.forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.enquiryId;wn.forEach(a=>{a.id===`enquiry-ws-${t}`?a.classList.add("active"):a.classList.remove("active")})})}),document.body.addEventListener("click",e=>{const t=e.target.closest(".btn-toast");if(t){e.preventDefault();const a=t.dataset.msg;showToast(a)}}),document.querySelectorAll(".action-pay-now").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),showToast("💳 Redirecting to Secure Travel Payment Gateway...")})});const ia=document.getElementById("user-theme-select");if(ia){const e=localStorage.getItem("beacon_theme")||"dark";ia.value=e,e==="light"?document.documentElement.classList.add("light-theme"):document.documentElement.classList.remove("light-theme"),ia.addEventListener("change",t=>{const a=t.target.value;localStorage.setItem("beacon_theme",a),a==="light"?(document.documentElement.classList.add("light-theme"),showToast("☀️ Switched to Light Theme!")):(document.documentElement.classList.remove("light-theme"),showToast("🌙 Switched to Dark Theme!"))})}const kn=()=>{const e=document.getElementById("enquiries-cards-grid"),t=document.getElementById("enquiries-detail-workspace");e&&t&&(e.style.display="grid",t.style.display="none");const a=document.getElementById("bookings-cards-grid"),n=document.getElementById("bookings-detail-workspace");a&&n&&(a.style.display="grid",n.style.display="none");const o=document.getElementById("trips-cards-grid"),s=document.getElementById("trips-detail-workspace");o&&s&&(o.style.display="grid",s.style.display="none")};document.querySelectorAll(".nav-link-item").forEach(e=>{e.addEventListener("click",kn)});const sa=document.getElementById("enquiries-cards-grid"),ra=document.getElementById("enquiries-detail-workspace"),ja=document.getElementById("enquiry-back-btn"),Sn=document.querySelectorAll(".btn-view-enquiry"),En=document.querySelectorAll(".enquiry-preview-card");sa&&ra&&(En.forEach(e=>{e.addEventListener("click",t=>{if(t.target.closest(".btn-view-enquiry"))return;const a=e.dataset.enquiryId,n=e.querySelector(`.btn-view-enquiry[data-enquiry-id="${a}"]`);n&&n.click()})}),Sn.forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const a=e.dataset.enquiryId;sa.style.display="none",ra.style.display="block",document.querySelectorAll("#view-enquiries .sidebar-item").forEach(s=>{s.dataset.enquiryId===a?s.classList.add("active"):s.classList.remove("active")}),document.querySelectorAll("#view-enquiries .enquiry-workspace").forEach(s=>{s.id===`enquiry-ws-${a}`?s.classList.add("active"):s.classList.remove("active")})})}),ja&&ja.addEventListener("click",()=>{ra.style.display="none",sa.style.display="grid"})),(()=>{if(!localStorage.getItem("beacon_bookings")){const e=[{id:"BC-2026-9921",packageTitle:"Alleppey Houseboats Retreat",imgUrl:"https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=800&q=80",price:"₹18,500",dateRange:"Aug 15 - Aug 19, 2026",status:"Confirmed",accommodation:"Deluxe Houseboat Stay",cancellation:"Free cancellation within 24 hours."},{id:"BC-2026-9980",packageTitle:"Munnar Tea Gardens Escapade",imgUrl:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",price:"₹14,200",dateRange:"Sep 10 - Sep 14, 2026",status:"Payment Pending",accommodation:"Premium Tea Estate Resort",cancellation:"Free cancellation within 24 hours."}];localStorage.setItem("beacon_bookings",JSON.stringify(e))}})();const Ze=()=>{const e=document.getElementById("bookings-cards-grid"),t=document.getElementById("bookings-detail-workspace");if(!e||!t)return;const a=JSON.parse(localStorage.getItem("beacon_bookings"))||[];let n="",o="";a.forEach(u=>{const r=u.status==="Confirmed",h=u.status==="🟡 PAYMENT VERIFICATION PENDING",m=u.status==="draft";let v="pending";r?v="confirmed":h?v="pending":m&&(v="draft"),m?n+=`
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
                `:(n+=`
                    <div class="booking-preview-card" data-booking-id="${u.id}" data-status="${u.status}">
                        <div class="preview-card-banner" style="background-image: url('${u.imgUrl}')">
                            <span class="preview-tag ${v}" style="${h?"background:#eab308; color:#000;":""}">${u.status}</span>
                        </div>
                        <div class="preview-card-body">
                            <span class="preview-card-date">${u.dateRange}</span>
                            <h3 class="preview-card-title">${u.packageTitle}</h3>
                            <p class="preview-card-details">Booking ID: ${u.id}</p>
                            <button class="btn-primary-sm btn-view-booking" data-booking-id="${u.id}" style="border:none; border-radius:4px; padding:6px 12px; cursor:pointer; outline:none; font-size:11px; width:100%;">Manage Booking</button>
                        </div>
                    </div>
                `,r&&J(u),o+=`
<div class="booking-detailed-card booking-detail-view" id="booking-ws-${u.id}" style="display: none; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; margin-top: 20px;">
<div class="booking-banner" style="background-image: url('${u.imgUrl}'); height: 220px; background-size: cover; background-position: center; position: relative;">
<div class="booking-status-tag ${v}" style="position: absolute; top: 20px; left: 20px; padding: 6px 12px; border-radius: 4px; font-weight: 800; font-size: 11px; text-transform: uppercase; ${r?"background:#22c55e;":h?"background:#eab308; color:#000;":"background:#ef4444;"}">${u.status}</div>
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
${h?`
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
`)}),e.innerHTML=n;const s=`
            <button class="btn-back-nav" id="booking-back-btn" style="margin-bottom: 24px; position: static; display: inline-flex; align-items: center; gap: 8px; background: transparent; border: none; color: var(--text-slate); font-weight: 700; cursor: pointer;">
                <span>←</span> Back to Bookings
            </button>
        `;t.innerHTML=s+o;const i=document.getElementById("booking-back-btn");i&&i.addEventListener("click",()=>{t.style.display="none",e.style.display="grid"}),e.querySelectorAll(".booking-preview-card").forEach(u=>{const r=u.dataset.bookingId,h=u.dataset.status,m=u.querySelector(".btn-view-booking, .btn-resume-draft"),v=()=>{if(h==="draft"){Hn(r);return}e.style.display="none",t.style.display="block",t.querySelectorAll(".booking-detailed-card").forEach(b=>{b.id===`booking-ws-${r}`?b.style.display="block":b.style.display="none"})};u.addEventListener("click",y=>{y.target.closest(".btn-primary-sm")||v()}),m&&m.addEventListener("click",y=>{y.stopPropagation(),v()})}),t.querySelectorAll(".btn-approve-payment-simulator").forEach(u=>{u.onclick=()=>{const r=u.dataset.bookingId;Gn(r)}}),t.querySelectorAll(".btn-view-ereceipt").forEach(u=>{u.onclick=()=>{const r=u.dataset.bookingId;ln(r)}})},Ut=(e,t,a,n,o,s,i,d)=>{const c=document.getElementById("planner-realtime-popup-wrap");if(!c)return;const g=document.createElement("div");g.className=`planner-popup-card ${i==="started"?"in-progress":"verification-needed"}`;let u=i==="started"?"🔔":"⚠️",r=i==="started"?"var(--accent-cyan)":"#eab308";g.innerHTML=`
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <strong style="color:${r}; font-size:12px; text-transform:uppercase; letter-spacing:1px; display:flex; align-items:center; gap:6px;">
                    ${u} ${e}
                </strong>
                <button type="button" class="close-popup-btn" style="background:transparent; border:none; color:var(--text-slate); cursor:pointer; font-size:14px; outline:none;">✕</button>
            </div>
            <div style="font-size:24px; font-weight:900; color:var(--accent-cyan); margin-bottom:10px;">${n}</div>
            <p style="font-size:12.5px; color:var(--text-slate); margin:0 0 15px 0; line-height:1.5;">
                Customer <strong>${o}</strong> has ${i==="started"?"started payment":"marked payment as completed"} for:<br>
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
        `,g.querySelector(".close-popup-btn").onclick=()=>{g.classList.add("leaving"),setTimeout(()=>{g.remove()},300)};const h=g.querySelector(".btn-popup-view-booking");if(h&&(h.onclick=()=>{Y("payments"),g.classList.add("leaving"),setTimeout(()=>{g.remove()},300)}),i==="verification"){const m=g.querySelector(".btn-popup-verify-received"),v=g.querySelector(".btn-popup-verify-not-received");m&&(m.onclick=()=>{openVerificationReviewModal(d),g.remove()}),v&&(v.onclick=()=>{g.remove(),In(d)})}c.appendChild(g),setTimeout(()=>{g.parentElement&&(g.classList.add("leaving"),setTimeout(()=>{g.remove()},300))},15e3)},In=e=>{let t=JSON.parse(localStorage.getItem("beacon_payment_attempts"))||[];const a=t.findIndex(i=>i.id===e);if(a===-1)return;const n=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});t[a].status="PAYMENT_REVIEW_REQUIRED",t[a].history.push(`${n} Planner marked payment as NOT received`),localStorage.setItem("beacon_payment_attempts",JSON.stringify(t));let o=JSON.parse(localStorage.getItem("beacon_bookings"))||[];const s=o.findIndex(i=>i.id===t[a].bookingId);s!==-1&&(o[s].status="Payment Review Required",localStorage.setItem("beacon_bookings",JSON.stringify(o)),Ze()),showToast("⚠️ Payment review required flag set."),Bt(`Payment review flagged: ${t[a].amount}`,"verification",t[a].bookingId,t[a].amount)},Ht=document.getElementById("checkout-payment-modal"),Fa=document.getElementById("close-checkout-btn"),Ua=document.getElementById("btn-have-paid"),Ha=document.getElementById("btn-back-to-qr"),Oa=document.getElementById("btn-submit-payment"),la=document.getElementById("checkout-step-1"),ca=document.getElementById("checkout-step-2"),Ga=document.getElementById("checkout-utr-input"),da=document.getElementById("customer-direct-pay-confirm-modal"),Tn=document.getElementById("btn-direct-pay-cancel"),Bn=document.getElementById("btn-direct-pay-continue");let gt=null;const Ln=(e,t)=>{gt&&clearInterval(gt);const a=document.getElementById("customer-wait-verification-modal"),n=a.querySelector(".payment-modal-content");a.style.display="flex",n.innerHTML=`
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
                ⏳ <strong id="wait-planner-name">${xe.planner||"WanderWorld Travels"}</strong> is currently verifying your transfer. Please don't make another payment while verification is pending.
            </p>
            
            <div style="display: flex; gap: 10px;">
                <button type="button" class="btn-secondary-action" id="btn-wait-close" style="flex: 1; border-radius: 6px; padding: 10px; font-weight: 750; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; cursor: pointer; outline: none;">Close Window</button>
            </div>
        `,a.querySelector("#btn-wait-close").onclick=()=>{a.style.display="none",clearInterval(gt)},gt=setInterval(()=>{const s=(JSON.parse(localStorage.getItem("beacon_payment_attempts"))||[]).find(i=>i.bookingId===e);s&&s.status==="PLANNER_CONFIRMED"?(clearInterval(gt),n.innerHTML=`
                    <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
                    <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 20px; font-weight: 850;">✓ Payment Verified</h3>
                    <p style="font-size: 14px; color: var(--accent-cyan); font-weight: 700; margin-bottom: 15px;">${t}</p>
                    
                    <p style="font-size: 13px; color: var(--text-slate); line-height: 1.6; margin-bottom: 25px;">
                        <strong>${xe.planner||"WanderWorld Travels"}</strong> has confirmed receiving your payment.<br>
                        Booking <strong>#${e}</strong> is now confirmed.
                    </p>
                    
                    <div style="display: flex; gap: 10px;">
                        <button type="button" class="btn-primary-large" id="btn-wait-view-booking" style="flex: 1; border-radius: 6px; padding: 12px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer; outline: none;">View Booking</button>
                    </div>
                `,a.querySelector("#btn-wait-view-booking").onclick=()=>{a.style.display="none",Ze(),Y("bookings",!0)}):s&&s.status==="PAYMENT_REVIEW_REQUIRED"&&(clearInterval(gt),n.innerHTML=`
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
               `,a.querySelector(".id-btn-i-was-charged").onclick=()=>{showToast("🛡️ Dispute ticket filed with Support."),a.style.display="none"},a.querySelector(".id-btn-try-again-pay").onclick=()=>{a.style.display="none",$n(xe)},a.querySelector(".id-btn-close-wait").onclick=()=>{a.style.display="none"})},2e3)};let xe=null,pe="";const $n=e=>{xe=e,pe=`BCN-2026-${Math.floor(1e4+Math.random()*9e4)}`;const a=e.style==="couple"||e.category==="beaches";let n="wanderworld@upi",o="WanderWorld Travels";a?(n=localStorage.getItem("beacon_planner_upi")||"rahul@upi",o=localStorage.getItem("beacon_planner_business")||"Rahul Mehta"):(n="wanderlust@upi",o="Wanderlust Travels"),document.getElementById("direct-confirm-amount").innerText=e.priceStr,document.getElementById("direct-confirm-planner").innerText=o,document.getElementById("direct-confirm-booking-id").innerText=pe,da.style.display="flex",Tn.onclick=()=>{da.style.display="none"},Bn.onclick=()=>{da.style.display="none",document.getElementById("checkout-booking-id").innerText=pe,document.getElementById("checkout-package-title").innerText=e.title,document.getElementById("checkout-payable-amount").innerText=e.priceStr,document.getElementById("checkout-upi-display").innerText=n,document.getElementById("checkout-note-display").innerText=pe;const s=e.priceStr.replace(/[^0-9]/g,""),i=`upi://pay?pa=${n}&pn=BeaconTravel&am=${s}&tn=${pe}&cu=INR`,d=`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(i)}`;document.getElementById("checkout-qr-code").src=d,la.style.display="block",ca.style.display="none",Ga.value="",Ht.style.display="flex";const c=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),g=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),u={id:`PAY-${Math.floor(1e4+Math.random()*9e4)}`,bookingId:pe,plannerId:o,customerName:"Rahul Sharma",packageName:e.title,amount:e.priceStr,status:"PAYMENT_INITIATED",created_at:c,customer_marked_paid_at:null,planner_confirmed_at:null,utrId:"",history:[`${g} Booking created`,`${g} Customer initiated ${e.priceStr} payment`,`${g} Planner notification sent`]};let r=JSON.parse(localStorage.getItem("beacon_payment_attempts"))||[];r.unshift(u),localStorage.setItem("beacon_payment_attempts",JSON.stringify(r)),ut("started"),Tt(`Beacon payment alert. A payment of ${s} rupees has been initiated.`),Bt(`Payment initiated: ${e.priceStr}`,"started",pe,e.priceStr),Ut("🔔 PAYMENT IN PROGRESS","Payment Started",pe,e.priceStr,"Rahul Sharma",c,"started",u.id)}};Ht&&(Fa&&Fa.addEventListener("click",()=>{Ht.style.display="none"}),Ua&&Ua.addEventListener("click",()=>{la.style.display="none",ca.style.display="block"}),Ha&&Ha.addEventListener("click",()=>{ca.style.display="none",la.style.display="block"}),Oa&&Oa.addEventListener("click",()=>{const e=Ga.value.trim();if(!e||e.length!==12||isNaN(e)){showToast("❌ Please enter a valid 12-digit UPI UTR/Transaction ID");return}let t=JSON.parse(localStorage.getItem("beacon_payment_attempts"))||[];const a=t.findIndex(c=>c.bookingId===pe),n=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),o=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});a!==-1&&(t[a].status="CUSTOMER_MARKED_PAID",t[a].customer_marked_paid_at=n,t[a].utrId=e,t[a].history.push(`${o} Customer marked payment as completed`),t[a].history.push(`${o} Planner verification alert sent`),localStorage.setItem("beacon_payment_attempts",JSON.stringify(t)));const s={id:pe,packageTitle:xe.title,imgUrl:xe.imgUrl,price:xe.priceStr,dateRange:"Sep 15 - Sep 19, 2026",status:"🟡 PAYMENT VERIFICATION PENDING",utrId:e,accommodation:xe.accommodation||"4★ Resort Stay",cancellation:xe.cancellation||"Free cancellation within 24 hours."};let i=JSON.parse(localStorage.getItem("beacon_bookings"))||[];i.unshift(s),localStorage.setItem("beacon_bookings",JSON.stringify(i)),Ht.style.display="none",showToast("✅ Payment details submitted! Verification pending.");const d=xe.priceStr.replace(/[^0-9]/g,"");ut("verification"),Tt(`Beacon payment alert. The customer has marked a payment of ${d} rupees as completed. Please check your account and confirm the payment.`),Bt(`Payment verification required: ${xe.priceStr}`,"verification",pe,xe.priceStr),a!==-1&&Ut("⚠️ PAYMENT VERIFICATION REQUIRED","Verification Needed",pe,xe.priceStr,"Rahul Sharma",n,"verification",t[a].id),Ze(),Ln(pe,xe.priceStr)})),(()=>{localStorage.getItem("beacon_planner_business")||localStorage.setItem("beacon_planner_business","WanderWorld Travels"),localStorage.getItem("beacon_planner_upi")||localStorage.setItem("beacon_planner_upi","wanderworld@upi"),localStorage.getItem("beacon_planner_mobile")||localStorage.setItem("beacon_planner_mobile","9876543210"),localStorage.getItem("beacon_planner_sound")||localStorage.setItem("beacon_planner_sound","on"),localStorage.getItem("beacon_planner_voice")||localStorage.setItem("beacon_planner_voice","on"),localStorage.getItem("beacon_notifications")||localStorage.setItem("beacon_notifications",JSON.stringify([]))})();const ut=e=>{if(localStorage.getItem("beacon_planner_sound")!=="off")try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const a=new t;if(e==="started"){const n=a.createOscillator(),o=a.createGain();n.connect(o),o.connect(a.destination),n.type="sine",n.frequency.setValueAtTime(523.25,a.currentTime),n.frequency.exponentialRampToValueAtTime(783.99,a.currentTime+.35),o.gain.setValueAtTime(.15,a.currentTime),o.gain.exponentialRampToValueAtTime(.01,a.currentTime+.4),n.start(a.currentTime),n.stop(a.currentTime+.4)}else if(e==="verification"){const n=(o,s,i)=>{const d=a.createOscillator(),c=a.createGain();d.connect(c),c.connect(a.destination),d.type="triangle",d.frequency.setValueAtTime(o,a.currentTime+s),c.gain.setValueAtTime(.2,a.currentTime+s),c.gain.exponentialRampToValueAtTime(.01,a.currentTime+s+i),d.start(a.currentTime+s),d.stop(a.currentTime+s+i)};n(659.25,0,.18),n(880,.12,.25)}}catch(t){console.error("AudioContext failed to initialize:",t)}},Tt=e=>{if(localStorage.getItem("beacon_planner_voice")!=="off")try{if("speechSynthesis"in window){window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.rate=1,t.pitch=1,window.speechSynthesis.speak(t)}}catch(t){console.error("SpeechSynthesis failed:",t)}},Bt=(e,t,a,n)=>{let o=JSON.parse(localStorage.getItem("beacon_notifications"))||[];const s={id:Date.now(),text:e,type:t,bookingId:a,amount:n,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),read:!1};if(o.unshift(s),localStorage.setItem("beacon_notifications",JSON.stringify(o)),pa(),ga(),document.hidden&&Notification.permission==="granted")try{new Notification(`Beacon Alert: ${e}`,{body:`Ref: ${a} • Amount: ${n}`,icon:"favicon.ico"})}catch(i){console.error("Native push failed:",i)}},pa=()=>{const e=document.getElementById("notifications-list");if(!e)return;const t=JSON.parse(localStorage.getItem("beacon_notifications"))||[];if(t.length===0){e.innerHTML='<div style="color: var(--text-slate); font-size: 12px; text-align: center; padding: 20px 0;">No new alerts.</div>';return}let a="";t.forEach(n=>{let o="🟢";n.type==="started"?o="🟠":n.type==="verification"&&(o="🔴"),a+=`
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 6px; padding: 10px; font-size: 12px; transition: all 0.3s; ${n.read?"":"border-left: 3px solid var(--accent-cyan);"}">
                     <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                         <strong style="color: #fff;">${o} ${n.text}</strong>
                         <span style="font-size: 10px; color: var(--text-slate);">${n.timestamp}</span>
                     </div>
                     <div style="color: var(--text-slate); font-size: 11px;">
                         Booking Ref: <strong>${n.bookingId}</strong> • Amount: <strong>${n.amount}</strong>
                     </div>
                </div>
            `}),e.innerHTML=a},ga=()=>{const e=document.getElementById("notification-badge");if(!e)return;(JSON.parse(localStorage.getItem("beacon_notifications"))||[]).filter(n=>!n.read).length>0?e.style.display="block":e.style.display="none"},ua=document.getElementById("notification-bell-btn"),Lt=document.getElementById("notifications-dropdown-panel"),_a=document.getElementById("btn-mark-all-read");ua&&Lt&&(ua.addEventListener("click",e=>{e.stopPropagation();const t=Lt.style.display==="block";if(Lt.style.display=t?"none":"block",!t){let a=JSON.parse(localStorage.getItem("beacon_notifications"))||[];a.forEach(n=>n.read=!0),localStorage.setItem("beacon_notifications",JSON.stringify(a)),ga(),pa()}}),document.addEventListener("click",e=>{!Lt.contains(e.target)&&e.target!==ua&&(Lt.style.display="none")})),_a&&_a.addEventListener("click",()=>{let e=JSON.parse(localStorage.getItem("beacon_notifications"))||[];e.forEach(t=>t.read=!0),localStorage.setItem("beacon_notifications",JSON.stringify(e)),ga(),pa(),showToast("✓ Marked all alerts as read")});const Wa=e=>{const t=document.getElementById("notification-explain-modal"),a=document.getElementById("btn-approve-notifications"),n=document.getElementById("btn-cancel-notifications"),o=document.getElementById("push-permission-label");if(Notification.permission==="granted"){o&&(o.innerText="Enabled");return}t.style.display="flex",a.onclick=()=>{t.style.display="none",Notification.requestPermission().then(s=>{o&&(o.innerText=s==="granted"?"Enabled":"Disabled"),s==="granted"?showToast("🔔 Direct Payment Alerts enabled!"):showToast("❌ Alerts permission denied.")})},n.onclick=()=>{t.style.display="none",o&&(o.innerText="Disabled")}},zn=()=>{const e=document.getElementById("push-permission-label");e&&(Notification.permission==="granted"?e.innerText="Enabled":Notification.permission==="denied"?e.innerText="Disabled":e.innerText="Not Requested")},Ot=document.getElementById("planner-mode-select"),fa=document.getElementById("planner-settings-fields"),ma=document.getElementById("planner-upi-id"),ya=document.getElementById("planner-business-name"),ba=document.getElementById("planner-upi-mobile"),ha=document.getElementById("planner-sound-toggle"),xa=document.getElementById("planner-voice-toggle"),Cn=document.getElementById("btn-save-planner-upi"),Ja=document.getElementById("btn-test-chime"),Ya=document.getElementById("btn-test-voice"),Ka=document.getElementById("btn-request-push");if(Ot&&fa){const e=localStorage.getItem("beacon_planner_registered")==="yes";Ot.value=e?"yes":"no",fa.style.display=e?"block":"none",ya&&(ya.value=localStorage.getItem("beacon_planner_business")||"WanderWorld Travels"),ma&&(ma.value=localStorage.getItem("beacon_planner_upi")||"wanderworld@upi"),ba&&(ba.value=localStorage.getItem("beacon_planner_mobile")||"9876543210"),ha&&(ha.value=localStorage.getItem("beacon_planner_sound")||"on"),xa&&(xa.value=localStorage.getItem("beacon_planner_voice")||"on"),zn(),Ot.addEventListener("change",()=>{const t=Ot.value==="yes";fa.style.display=t?"block":"none",localStorage.setItem("beacon_planner_registered",t?"yes":"no"),t&&Notification.permission!=="granted"&&setTimeout(()=>{Wa()},500)}),Cn.addEventListener("click",()=>{const t=ya.value.trim(),a=ma.value.trim(),n=ba.value.trim();if(!t){showToast("❌ Please enter a Payee/Business Name");return}if(!a||!a.includes("@")){showToast("❌ Please enter a valid UPI ID (e.g. name@bank)");return}if(!n||n.length<10){showToast("❌ Please enter a valid mobile number");return}localStorage.setItem("beacon_planner_business",t),localStorage.setItem("beacon_planner_upi",a),localStorage.setItem("beacon_planner_mobile",n),localStorage.setItem("beacon_planner_sound",ha.value),localStorage.setItem("beacon_planner_voice",xa.value),showToast("💼 Planner settings saved successfully!")}),Ja&&Ja.addEventListener("click",()=>{showToast("🔔 Testing audio chimes..."),ut("started"),setTimeout(()=>{ut("verification")},800)}),Ya&&Ya.addEventListener("click",()=>{showToast("🗣️ Testing voice announcement..."),Tt("Beacon payment alert. A payment of twelve thousand five hundred rupees has been initiated.")}),Ka&&Ka.addEventListener("click",()=>{Wa()})}Ze();const va=document.getElementById("trips-cards-grid"),wa=document.getElementById("trips-detail-workspace"),Xa=document.getElementById("trip-back-btn"),Pn=document.querySelectorAll(".trip-preview-card");va&&wa&&(Pn.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tripId;va.style.display="none",wa.style.display="block",document.querySelectorAll("#view-trips .trip-detail-view").forEach(n=>{n.id===`trip-ws-${t}`?n.style.display="block":n.style.display="none"})})}),Xa&&Xa.addEventListener("click",()=>{wa.style.display="none",va.style.display="grid"}));const An=()=>{const e=new Set;return["Goa","Kashmir","Maldives","Bali","Thailand","Dharamshala","Manali","Kerala","Sikkim","Spiti","Coorg","Andaman"].forEach(a=>e.add(a)),typeof q<"u"&&Array.isArray(q)&&q.forEach(a=>{const n=a.title;["goa","kashmir","maldives","bali","thailand","dharamshala","manali","kerala","sikkim","spiti","coorg","andaman","leh","ladakh","jaipur","udaipur","rajasthan","agra","rishikesh","shimla"].forEach(s=>{if(n.toLowerCase().includes(s)){const i=s.charAt(0).toUpperCase()+s.slice(1);e.add(i)}})}),Array.from(e)},Qa=document.getElementById("destination-card-wrap"),et=document.getElementById("dest-suggestions-dropdown");if(Qa&&ze&&et){const e=()=>{const t=ze.value.toLowerCase().trim();let a=An();a=["Anywhere",...a];const n=t.length>0?a.filter(o=>o.toLowerCase().includes(t)):a;if(n.length>0){et.style.display="block";let o='<div class="suggestion-header">Suggested Destinations</div>';n.forEach(i=>{o+=`<div class="suggestion-item" data-value="${i}">📍 ${i}</div>`}),et.innerHTML=o,et.querySelectorAll(".suggestion-item").forEach(i=>{i.addEventListener("click",d=>{d.stopPropagation();const c=i.dataset.value;c==="Anywhere"?(ze.value="",ze.placeholder="Anywhere"):ze.value=c,et.style.display="none",Ye(),typeof je=="function"&&je(null,null,null)})})}else et.style.display="none"};Qa.addEventListener("click",t=>{t.target.closest(".suggestion-item")||(ze.focus(),e())}),ze.addEventListener("focus",()=>{e()}),ze.addEventListener("input",()=>{e()}),ze.addEventListener("blur",()=>{setTimeout(()=>{et.style.display="none"},250)})}const se=document.getElementById("custom-calendar-popover"),Fe=document.getElementById("calendar-mobile-overlay"),ft=document.getElementById("dates-from-half"),mt=document.getElementById("dates-to-half"),$t=document.getElementById("dates-from-value"),zt=document.getElementById("dates-to-value"),tt=document.getElementById("btn-flexible-dates"),He=document.getElementById("dates-duration-summary");let re=null,Be=null,at="from",ke=new Date().getMonth(),Pe=new Date().getFullYear();const Mn=["January","February","March","April","May","June","July","August","September","October","November","December"],Dn=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Za=e=>{if(!e)return"";const t=e.getDate(),n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()],o=e.getFullYear();return`${t} ${n} ${o}`},en=e=>{if(!e)return"";const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${n}`},Ct=()=>{if(!$t||!zt)return;re?($t.innerText=Za(re),tt.classList.remove("active")):$t.innerText="Select Date",Be?(zt.innerText=Za(Be),tt.classList.remove("active")):zt.innerText="Select Date";const e=ft?ft.querySelector(".dates-label"):null,t=mt?mt.querySelector(".dates-label"):null,a=tt&&tt.classList.contains("active");if(e&&(!re&&!a?e.classList.add("text-blink-continuous"):e.classList.remove("text-blink-continuous")),t&&(re&&!Be&&!a?t.classList.add("text-blink-continuous"):t.classList.remove("text-blink-continuous")),re&&Be&&He){const n=Be.getTime()-re.getTime(),o=Math.ceil(n/(1e3*60*60*24));o>0?(He.style.display="block",He.innerHTML=`🛏 ${o} Nights • ${o+1} Days`):He.style.display="none"}else He&&(He.style.display="none")},Pt=()=>{if(console.log("renderCustomCalendar running. calPopover:",se,"Month:",ke,"Year:",Pe),!se)return;const e=new Date;e.setHours(0,0,0,0);let t=`
            <div class="cal-header">
                <button type="button" class="cal-nav-btn prev-month">←</button>
                <span class="cal-month-title">${Mn[ke]} ${Pe}</span>
                <button type="button" class="cal-nav-btn next-month">→</button>
            </div>
            <div class="cal-weekdays">
        `;Dn.forEach(r=>{t+=`<span>${r}</span>`}),t+='</div><div class="cal-days">';let n=(new Date(Pe,ke,1).getDay()+6)%7;for(let r=0;r<n;r++)t+='<span class="cal-day disabled"></span>';const o=new Date(Pe,ke+1,0).getDate();for(let r=1;r<=o;r++){const h=new Date(Pe,ke,r);h.setHours(0,0,0,0);let m=h<e;at==="to"&&re&&h<re&&(m=!0);let v=["cal-day"];m&&v.push("disabled"),re&&h.getTime()===re.getTime()?v.push("selected-from"):Be&&h.getTime()===Be.getTime()?v.push("selected-to"):re&&Be&&h>re&&h<Be&&v.push("selected-range"),h.getTime()===e.getTime()&&v.push("is-today"),t+=`<span class="${v.join(" ")}" data-day="${r}">${r}</span>`}t+="</div>",t+=`
            <div class="cal-footer">
                <button type="button" class="cal-btn-clear">Clear</button>
                <button type="button" class="cal-btn-done" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 6px 16px;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Done</span>
                </button>
            </div>
        `,se.innerHTML=t;const s=se.querySelector(".prev-month"),i=se.querySelector(".next-month");s&&s.addEventListener("click",r=>{r.stopPropagation(),ke--,ke<0&&(ke=11,Pe--),Pt()}),i&&i.addEventListener("click",r=>{r.stopPropagation(),ke++,ke>11&&(ke=0,Pe++),Pt()});const d=se.querySelectorAll(".cal-day:not(.disabled)"),c=se.querySelector(".cal-days");c&&at==="to"&&re&&(d.forEach(r=>{r.addEventListener("mouseenter",()=>{const h=parseInt(r.dataset.day),m=new Date(Pe,ke,h);m.setHours(0,0,0,0),m>=re&&d.forEach(v=>{const y=parseInt(v.dataset.day),b=new Date(Pe,ke,y);b.setHours(0,0,0,0),b>re&&b<=m?v.classList.add("in-hover-range"):v.classList.remove("in-hover-range")})})}),c.addEventListener("mouseleave",()=>{d.forEach(r=>r.classList.remove("in-hover-range"))})),d.forEach(r=>{r.addEventListener("click",h=>{h.stopPropagation();const m=parseInt(r.dataset.day),v=new Date(Pe,ke,m);v.setHours(0,0,0,0),at==="from"?(re=v,Be=null,at="to",we&&(we.value=en(v)),be&&(be.value=""),Pt(),Ct()):(Be=v,be&&(be.value=en(v)),Ct(),yt(),ct())})});const g=se.querySelector(".cal-btn-clear"),u=se.querySelector(".cal-btn-done");g&&g.addEventListener("click",r=>{r.stopPropagation(),re=null,Be=null,at="from",we&&(we.value=""),be&&(be.value=""),Ct(),Pt(),ct()}),u&&u.addEventListener("click",r=>{r.stopPropagation(),yt(),Ct(),ct()})},tn=e=>{console.log("openCalendar called with mode:",e),at=e,se?(console.log("Setting calPopover display to block"),se.style.display="block",setTimeout(()=>se.classList.add("active"),10)):console.log("calPopover element is null!"),Fe&&(Fe.style.display="block",setTimeout(()=>Fe.classList.add("active"),10)),Pt()},yt=()=>{se&&(se.classList.remove("active"),setTimeout(()=>{se.classList.contains("active")||(se.style.display="none")},250)),Fe&&(Fe.classList.remove("active"),setTimeout(()=>{Fe.classList.contains("active")||(Fe.style.display="none")},250))};ft&&ft.addEventListener("click",e=>{console.log("FROM DATE CLICKED"),e.stopPropagation(),tn("from")}),mt&&mt.addEventListener("click",e=>{console.log("TO DATE CLICKED"),e.stopPropagation(),tn("to")}),tt&&tt.addEventListener("click",e=>{e.stopPropagation(),re=null,Be=null,at="from",we&&(we.value=""),be&&(be.value=""),$t&&zt&&($t.innerText="Flexible",zt.innerText="Flexible"),He&&(He.style.display="none"),tt.classList.add("active"),yt(),ct()}),document.addEventListener("click",e=>{se&&!se.contains(e.target)&&(!ft||!ft.contains(e.target))&&(!mt||!mt.contains(e.target))&&yt()}),document.addEventListener("keydown",e=>{if(e.key==="Escape"){yt();const t=document.getElementById("checkout-payment-modal");if(t&&t.style.display==="flex"){t.style.display="none";return}const a=document.getElementById("customer-direct-pay-confirm-modal");if(a&&a.style.display==="flex"){a.style.display="none";return}const n=document.getElementById("customer-wait-verification-modal");if(n&&n.style.display==="flex"){n.style.display="none";return}const o=document.getElementById("price-breakdown-popup-sheet");if(o&&o.style.display==="block"){o.style.display="none";return}if(ve==="mobile-booking"&&p){const s=p.currentStep,i=p.pkg;s>1?(p.currentStep-=1,ae(),Ee()):window.innerWidth<768?(Y("package-details",!0),ht(i)):Se(i)}else if(ve==="package-details")Y(Je);else if(ve==="receipt-viewer")Y("bookings",!0);else if(ve==="planner-profile"&&kt)Y("package-details",!0),window.innerWidth<768?ht(kt):Se(kt);else if(ve==="enquiries"){const s=document.getElementById("enquiries-cards-grid"),i=document.getElementById("enquiries-detail-workspace");i&&i.style.display==="block"&&(i.style.display="none",s&&(s.style.display="grid"))}else if(ve==="bookings"){const s=document.getElementById("bookings-cards-grid"),i=document.getElementById("bookings-detail-workspace");i&&i.style.display==="block"&&(i.style.display="none",s&&(s.style.display="grid"))}else if(ve==="trips"){const s=document.getElementById("trips-cards-grid"),i=document.getElementById("trips-detail-workspace");i&&i.style.display==="block"&&(i.style.display="none",s&&(s.style.display="grid"))}}}),Fe&&Fe.addEventListener("click",yt),Ct();const Gt=document.querySelectorAll(".duration-chip"),nt=document.getElementById("match-duration"),Ae=document.getElementById("duration-chip-flexible");Gt.length>0&&nt&&Gt.forEach(e=>{e.addEventListener("click",()=>{if(e===Ae){if(!Ae.querySelector("input")){Gt.forEach(a=>a.classList.remove("active")),Ae.classList.add("active"),Ae.innerHTML='<input type="number" class="chip-num-input" placeholder="Any" min="1" max="90" style="width: 100%; height: 100%; border: none; background: transparent; color: inherit; text-align: center; font-weight: 800; outline: none; font-size: 11px;">';const t=Ae.querySelector("input");t.focus(),t.addEventListener("input",a=>{a.stopPropagation();const n=t.value;nt.value=n||"all",nt.dispatchEvent(new Event("change"))}),t.addEventListener("blur",()=>{setTimeout(()=>{t.value?Ae.innerHTML=`<span>✏️</span> ${t.value} Days`:(Ae.innerHTML="<span>✏️</span> Customizer",nt.value="all",nt.dispatchEvent(new Event("change")))},200)})}}else{Ae&&Ae.querySelector("input")&&(Ae.innerHTML="<span>✏️</span> Customizer"),Gt.forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.value;nt.value=t,nt.dispatchEvent(new Event("change"))}})});const an=document.querySelectorAll(".budget-scale-ticks span");an.length>0&&an.forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const a=parseInt(e.dataset.val);if(isNaN(a))return;const n=Math.abs(a-me),o=Math.abs(a-ye);n<o?me=Math.min(a,ye-2e3):ye=Math.max(a,me+2e3),Ke()})});const qn=e=>{const t=new Date,a=new Date(e);if(t.toDateString()===a.toDateString())return"Today";const o=new Date(t);return o.setDate(t.getDate()-1),o.toDateString()===a.toDateString()?"Yesterday":"Earlier"},Nn=e=>{const t=Math.floor((Date.now()-e)/1e3);if(t<60)return"Viewed just now";const a=Math.floor(t/60);if(a<60)return`Viewed ${a} minutes ago`;const n=Math.floor(a/60);return n<24?`Viewed ${n} hours ago`:"Viewed yesterday"},Rn=e=>{if(e.length<2)return"";let t=e[0],a=e[0],n=e[0];e.forEach(i=>{(i.matchScore||90)>(t.matchScore||90)&&(t=i),i.priceNum<a.priceNum&&(a=i);const d=parseFloat(i.rating.replace(/[^0-9.]/g,""))||4,c=parseFloat(n.rating.replace(/[^0-9.]/g,""))||4;d>c&&(n=i)});let o="";const s=e.filter(i=>i.title!==a.title).map(i=>i.priceNum);if(s.length>0){const i=s.reduce((c,g)=>c+g,0)/s.length,d=Math.round(i-a.priceNum);d>0&&(o=`"${a.title}" saves approximately ₹${d.toLocaleString()} compared to other choices.`)}return`
            <div style="font-size: 16px; margin-right: 12px; margin-top: 2px;">✨</div>
            <div>
                <strong style="color: var(--accent-cyan); display: block; font-size: 13px; font-weight: 800; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Beacon AI Insight</strong>
                <p style="font-size: 13px; line-height: 1.6; color: #fff; margin: 0;">
                    "${t.title}" is your strongest overall match at ${t.matchScore||95}%. 
                    ${o} 
                    "${n.title}" stands out with the highest traveler rating of ${n.rating}.
                </p>
            </div>
        `},Vn=e=>{let t=JSON.parse(localStorage.getItem("beacon_recent_views"))||[];t=t.filter(a=>a.title!==e.title),t.unshift({title:e.title,viewedAt:Date.now()}),t=t.slice(0,15),localStorage.setItem("beacon_recent_views",JSON.stringify(t))},jn=e=>{const t=document.getElementById("similar-packages-grid");if(!t)return;let a=q.filter(i=>i.title!==e.title);a.forEach(i=>{let d=0;i.category===e.category&&(d+=40),i.style===e.style&&(d+=25);const c=Math.abs(i.priceNum-e.priceNum)/e.priceNum;c<=.3&&(d+=Math.round((1-c)*25)),Math.abs(i.duration-e.duration)<=1&&(d+=10),i.similarityScore=d}),a.sort((i,d)=>d.similarityScore-i.similarityScore);const n=a.slice(0,4);let o="";n.forEach(i=>{const d=Math.min(96,Math.max(78,Math.round(75+i.similarityScore/1.5))),c=X.includes(i.title),g=F.some(r=>r.title===i.title);let u="Popular choice";i.category===e.category?u="Same Destination":i.style===e.style?u=`Similar ${i.style}`:Math.abs(i.priceNum-e.priceNum)/e.priceNum<=.15&&(u="Similar budget"),o+=`
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
            `}),t.innerHTML=o,t.querySelectorAll(".rec-travel-card").forEach((i,d)=>{const c=n[d];i.addEventListener("click",r=>{r.target.closest("button")||Se(c)});const g=i.querySelector(".btn-rec-save");g.addEventListener("click",r=>{r.stopPropagation(),We(c.title);const h=X.includes(c.title);g.innerHTML=h?"❤️":"♡",g.style.color=h?"var(--accent-cyan)":"var(--text-slate)";const m=document.querySelector(".details-save-btn");m&&c.title===e.title&&(m.innerHTML=h?"❤️ Saved":"♡ Save")});const u=i.querySelector(".btn-rec-compare");u.addEventListener("click",r=>{r.stopPropagation();const h=F.some(v=>v.title===c.title);dt(c,!h);const m=F.some(v=>v.title===c.title);u.innerHTML=m?"✓":"+",u.style.color=m?"var(--accent-cyan)":"var(--text-slate)"})})},nn=(e,t)=>{const a=document.getElementById("view-planner-profile");if(!a)return;Y("planner-profile",!0);const n=e.name==="Rahul Mehta",o=q.filter(c=>c.title===t.title?!1:n?c.category==="beaches"||c.style==="couple":c.category==="mountains"||c.category==="nature"||c.category==="spiritual").slice(0,4);let s="";o.forEach(c=>{s+=`
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
            `}),o.length===0&&(s='<div style="grid-column: 1/-1; color: var(--text-slate); font-size: 12.5px; font-style: italic; padding: 20px 0;">No other packages currently listed by this partner.</div>'),a.innerHTML=`
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
        `;const i=a.querySelector(".btn-profile-back");i&&i.addEventListener("click",()=>{if(Y("package-details",!0),window.innerWidth<768){ht(pkg);return}}),a.querySelectorAll(".travel-card").forEach((c,g)=>{c.addEventListener("click",()=>{const u=o[g];u&&Se(u)})})},Se=e=>{kt=e,Vn(e);let t="My Collection";Je==="home"?t="Home":Je==="planner"?t="Trip Planner":Je==="collection"&&(t="My Collection");const a=X.includes(e.title),n=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",o=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(n&&o){const l=f=>{const x=f.split("-");if(x.length===3){const A=new Date(x[0],x[1]-1,x[2]),ie=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${A.getDate()} ${ie[A.getMonth()]} ${A.getFullYear()}`}return f};`${l(n)}${l(o)}`}else{const l=new Date;l.toLocaleString("default",{month:"short"}),new Date(l.setMonth(l.getMonth()+3)).toLocaleString("default",{month:"short"}),new Date().getFullYear()}const s=F.some(l=>l.title===e.title),i=document.getElementById("view-package-details");if(!i)return;if(Y("package-details",!0),window.innerWidth<768){ht(e);return}""+(e.basePrice||Math.round(e.priceNum*1.11)).toLocaleString();const c=e.inclusions?e.inclusions.split(",").map(l=>`<li>✓ ${l.trim()}</li>`).join(""):`
            <li>✓ Roundtrip Economy Flight</li>
            <li>✓ 4★ Hotel Stay (${e.accommodation||"Hotel"})</li>
            <li>✓ Meals: ${e.meals||"Breakfast Included"}</li>
            <li>✓ Transfer: ${e.transfers||"Private Airport Transfer"}</li>
        `,g=e.exclusions?e.exclusions.split(",").map(l=>`<li>✕ ${l.trim()}</li>`).join(""):`
            <li>✕ Personal expenses (Souvenirs, Laundry, Tips)</li>
            <li>✕ Visa Fees ${e.category==="international"?"(Required)":"(Not Applicable)"}</li>
            <li>✕ Sightseeing entry tickets not listed in schedule</li>
            <li>✕ Travel & Medical Insurance</li>
        `,r=e.style==="couple"||e.category==="beaches"?{name:"Rahul Mehta",type:"Freelance Trip Planner",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",rating:"4.9",reviews:126,location:"Pune, Maharashtra",experience:"8 Years",trips:342,responseRate:"98%",about:"I specialize in Goa, Kerala, and coastal honeymoon experiences. My goal is to customize every itinerary to fit your personal travel rhythm.",expertise:["Goa","Kerala","Maldives","Honeymoon","Luxury","Beach Trips"],languages:["English","Hindi","Marathi"],travelers:"1,280+",destinations:27}:{name:"Wanderlust Travels",type:"Travel Agency",avatar:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80",rating:"4.8",reviews:892,location:"Mumbai, Maharashtra",experience:"Operating since 2014",trips:"2,800+",responseRate:"95%",about:"Wanderlust Travels is a premier destination management company. We guarantee verified stays, premium coordinates, and 24/7 on-trip assistance.",expertise:["Himachal","Kashmir","Uttarakhand","Safari","Spiritual Tours"],languages:["English","Hindi","Gujarati","Punjabi"],travelers:"8,500+",destinations:45},h=e.duration||4,m=e.highlights?e.highlights.split(","):["Explore local viewpoints","Guided nature walk","Leisure tour of surrounding villages"],v=e.sightseeing?e.sightseeing.split(","):["Main square","Local markets","Scenic viewpoints"];let y="";for(let l=1;l<=h;l++){let f="",x="",A="",ie="",ue=[];if(l===1)f="Arrival & Resort Check-in",A="🚗 Private Airport Transfer Included",ie="🌅 Sunset Beach Walk & Welcome Cocktail",x="Arrive at the destination. Transfer to your premium resort and check in. Enjoy a refreshing evening sunset cocktail at the local beach lounge.",ue=["Dinner"];else if(l===h)f="Breakfast & Departure",A="🚗 Private Airport Transfer Included",ie="🍳 Morning leisure & final checkout",x="Enjoy a delicious morning breakfast. Complete check-out formalities at the resort and board your private transfer back to the airport/station.",ue=["Breakfast"];else{const qe=(l-2)%m.length,B=(l-2)%v.length;f=m[qe]?m[qe].trim():"Local Sightseeing Tour",A="🚗 Local sightseeing private cab",ie=`🌊 Explore ${v[B]?v[B].trim():"scenic highlights"}`,x=`Set out on an exciting sightseeing tour visiting ${v[B]?v[B].trim():"scenic highlights"}. Accompanied by a local coordinator to guide you through primary spots.`,ue=["Breakfast","Lunch"],l%2===0&&ue.push("Dinner")}const it=ue.map(qe=>`<span style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: var(--text-slate); font-size: 11px; padding: 2px 8px; border-radius: 12px; margin-right: 6px; font-weight: 750;">${qe}</span>`).join("");y+=`
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
                            <div style="font-size: 12.5px; color: var(--text-slate);">🚕 <strong>Transport:</strong><br>${A}</div>
                            <div style="font-size: 12.5px; color: var(--text-slate);">✨ <strong>Activities:</strong><br>${ie}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: var(--text-slate);">
                            <span>🍴 <strong>Meals:</strong></span>
                            <div>${it}</div>
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
        `,window.scrollTo({top:0,behavior:"instant"});const b=i.querySelector(".btn-details-back");b&&b.addEventListener("click",()=>{Y(Je)});const I=i.querySelectorAll(".itinerary-day-card");I.forEach(l=>{l.querySelector(".itinerary-day-header").addEventListener("click",()=>{l.classList.contains("active")?l.classList.remove("active"):l.classList.add("active")})});const E=i.querySelector(".btn-toggle-all-days");E&&E.addEventListener("click",()=>{const l=Array.from(I).some(f=>!f.classList.contains("active"));I.forEach(f=>{l?f.classList.add("active"):f.classList.remove("active")}),E.innerText=l?"Collapse All Days":"View All Days"});const P=i.querySelectorAll(".policy-accordion-card");P.forEach(l=>{l.querySelector(".policy-accordion-header").addEventListener("click",()=>{const x=l.classList.contains("active");P.forEach(A=>A.classList.remove("active")),x||l.classList.add("active")})});const T=i.querySelectorAll(".gallery-thumb"),C=i.querySelector(".gallery-primary-img");T.forEach(l=>{l.addEventListener("click",()=>{T.forEach(f=>f.classList.remove("active")),l.classList.add("active"),C.style.backgroundImage=l.style.backgroundImage})});const j=i.querySelectorAll(".details-nav-item");j.forEach(l=>{l.addEventListener("click",()=>{j.forEach(x=>x.classList.remove("active")),l.classList.add("active");const f=i.querySelector(`#sec-${l.dataset.sec}`);f&&f.scrollIntoView({behavior:"smooth",block:"start"})})});const le=i.querySelectorAll(".details-section-block"),U=()=>{if(ve!=="package-details")return;const l=window.scrollY+150;le.forEach(f=>{if(l>=f.offsetTop&&l<f.offsetTop+f.offsetHeight){const x=f.id.replace("sec-","");j.forEach(A=>{A.dataset.sec===x?A.classList.add("active"):A.classList.remove("active")})}})};window.addEventListener("scroll",U);const R=i.querySelectorAll(".details-save-btn"),G=()=>{R.forEach(l=>{X.includes(e.title)?(l.innerHTML="❤️ Saved",l.style.color="var(--accent-cyan)",l.style.borderColor="var(--accent-cyan)"):(l.innerHTML="♡ Save",l.style.color="#fff",l.style.borderColor="rgba(255, 255, 255, 0.08)")})};G(),R.forEach(l=>{l.addEventListener("click",()=>{We(e.title),G()})});const H=i.querySelectorAll(".details-compare-btn"),Z=()=>{H.forEach(l=>{F.some(f=>f.title===e.title)?(l.innerHTML="✓ Compared",l.style.color="var(--accent-cyan)",l.style.borderColor="var(--accent-cyan)"):(l.innerHTML="+ Compare",l.style.color="#fff",l.style.borderColor="rgba(255, 255, 255, 0.08)")})};Z(),H.forEach(l=>{l.addEventListener("click",()=>{const f=!F.some(x=>x.title===e.title);dt(e,f),Z()})});const oe=i.querySelector(".details-share-btn");oe&&oe.addEventListener("click",()=>{openShareSheet(e)}),i.querySelectorAll(".details-enquiry-btn").forEach(l=>{l.addEventListener("click",()=>{showToast("📩 Redirecting to Enquiries page..."),Y("enquiries")})}),i.querySelectorAll(".details-book-btn").forEach(l=>{l.addEventListener("click",()=>{ka(e)})});const ge=i.querySelector(".btn-view-full-profile");ge&&ge.addEventListener("click",()=>{nn(r,e)}),jn(e)},ot=()=>{const e=document.getElementById("collection-saved-list");if(e){if(X.length===0){e.innerHTML=`
                <div class="collection-empty-state">
                    <span class="empty-icon">📂</span>
                    <h4>Your travel wishlist starts here.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">Packages you save while browsing will appear in this collection.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Explore Packages</button>
                </div>
            `;return}e.innerHTML="",X.forEach(t=>{const a=q.find(i=>i.title.trim()===t.trim())||{title:t,imgUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",priceStr:"₹14,999",priceNum:14999,category:"beaches",duration:4,rating:"⭐ 4.8",style:"family"},n=F.some(i=>i.title===a.title),o=document.createElement("div");o.className="saved-card-horizontal",o.innerHTML=`
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
                    <button class="btn-action btn-secondary-action btn-add-compare">${n?"Added to Compare":"Add to Compare"}</button>
                    <button class="btn-action btn-remove">Remove from Saved</button>
                </div>
            `,o.style.cursor="pointer",o.addEventListener("click",i=>{i.target.closest(".btn-add-compare")||i.target.closest(".btn-remove")||Se(a)});const s=o.querySelector(".btn-add-compare");s.addEventListener("click",()=>{const i=!F.some(c=>c.title===a.title);dt(a,i),s.innerText=i?"Added to Compare":"Add to Compare";const d=document.querySelector(`.card-compare-checkbox[data-title="${a.title}"]`);d&&(d.checked=i)}),o.querySelector(".btn-remove").addEventListener("click",()=>{o.style.maxHeight=o.offsetHeight+"px",o.style.transition="all 0.3s",o.style.opacity="0",o.style.transform="scale(0.95)",setTimeout(()=>{We(a.title)},300)}),e.appendChild(o)})}},bt=()=>{const e=document.getElementById("compare-selection-list"),t=document.getElementById("compare-trigger-row"),a=document.getElementById("comparison-results-view");if(e){if(F.length===0){e.innerHTML=`
                <div class="collection-empty-state" style="grid-column: 1/-1;">
                    <span class="empty-icon">⚖️</span>
                    <h4>Add a few journeys and we'll help you choose.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">You can select up to 3 packages from wishlist or searches to compare side-by-side.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Explore Packages</button>
                </div>
            `,t.style.display="none",a.style.display="none";return}e.innerHTML="",t.style.display="block",F.forEach(n=>{const o=document.createElement("div");o.className="compare-selection-card selected",o.style.cursor="pointer",o.innerHTML=`
                <span class="card-title">${n.title}</span>
                <span class="compare-checkbox-indicator">✓</span>
            `,o.addEventListener("click",()=>{dt(n,!1);const s=document.querySelector(`.card-compare-checkbox[data-title="${n.title}"]`);s&&(s.checked=!1),bt()}),e.appendChild(o)}),F.length>=2?on():a.style.display="none"}},on=()=>{const e=document.getElementById("comparison-results-view"),t=document.getElementById("collection-compare-table"),a=document.getElementById("ai-compare-insight-card");if(!t||!e)return;e.style.display="block";let n=0,o=0,s=0,i=-1,d=1/0,c=-1;F.forEach((r,h)=>{const m=parseFloat(r.rating.replace(/[^0-9.]/g,""))||4.5;r.matchScore=Math.round(90+m*2-r.priceNum/15e4*5),r.matchScore>i&&(i=r.matchScore,n=h),r.priceNum<d&&(d=r.priceNum,o=h),m>c&&(c=m,s=h)}),a&&(a.innerHTML=Rn(F));let g='<thead><tr><th class="matrix-header-col">Attributes</th>';F.forEach((r,h)=>{let m="";h===n&&(m+='<span class="compare-badge-ribbon ribbon-best-match">Best Match</span><br>'),h===o&&(m+='<span class="compare-badge-ribbon ribbon-best-price">Best Price</span><br>'),h===s&&(m+='<span class="compare-badge-ribbon ribbon-best-rated">Best Rated</span><br>'),g+=`<th style="vertical-align: bottom;">
                <div style="min-height: 50px;">${m}</div>
                <div class="matrix-pkg-title" style="margin-top: 5px;">${r.title}</div>
            </th>`}),g+="</tr></thead><tbody>",[{label:"Destination",key:"category",highlight:!1,format:r=>r.toUpperCase()},{label:"Price / Person",key:"priceStr",highlight:!0},{label:"Duration",key:"duration",highlight:!1,format:r=>`${r} Days`},{label:"Rating",key:"rating",highlight:!0},{label:"Hotel",key:"accommodation",highlight:!1,format:r=>r?r.charAt(0).toUpperCase()+r.slice(1):"4★ Accommodation"},{label:"Meals",key:"meals",highlight:!1,format:r=>r||"Breakfast Included"},{label:"Transportation",key:"transport",highlight:!1,format:r=>r?r.charAt(0).toUpperCase()+r.slice(1):"Private Cab"},{label:"Activities",key:"highlights",highlight:!1,format:r=>`${r?r.split(",").length:3} Major Activities`},{label:"Flights",key:"transport",highlight:!1,format:r=>r==="flight"?"✓ Included":"✕ Excluded"},{label:"Guide",key:"highlights",highlight:!1,format:r=>r&&(r.toLowerCase().includes("guide")||r.toLowerCase().includes("naturalist"))?"✓ Certified Guide":"✓ Local Assist"},{label:"Trip Type",key:"style",highlight:!1,format:r=>r?r.charAt(0).toUpperCase()+r.slice(1):"Family"},{label:"Cancellation Policy",key:"cancellation",highlight:!1,format:r=>r||"Free cancellation within 24 hours"},{label:"Planner / Company",key:"planner",highlight:!1,format:r=>r||"Wanderlust Travels"},{label:"Beacon Match %",key:"matchScore",highlight:!0,format:r=>`${r}% Match`}].forEach(r=>{g+=`<tr><td class="matrix-header-col">${r.label}</td>`,F.forEach((h,m)=>{const v=h[r.key],y=r.format?r.format(v):v||"N/A";g+=`<td class="${r.highlight?"highlight-diff":""}">${y}</td>`}),g+="</tr>"}),g+='<tr><td class="matrix-header-col" style="border-bottom: none;">Actions</td>',F.forEach(r=>{g+=`<td style="border-bottom: none;">
                <div style="display: flex; gap: 10px;">
                    <button type="button" class="btn-primary-large view-pkg-compare" data-title="${r.title}" style="padding: 8px 12px; font-size: 11px; flex: 1; border-radius: 6px; cursor: pointer;">View Package</button>
                    <button type="button" class="btn-secondary-action send-enquiry-compare" style="padding: 8px 12px; font-size: 11px; flex: 1; border-radius: 6px; cursor: pointer; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #fff;">Send Enquiry</button>
                </div>
            </td>`}),g+="</tr></tbody>",t.innerHTML=g,t.querySelectorAll(".view-pkg-compare").forEach(r=>{r.addEventListener("click",()=>{const h=r.dataset.title,m=q.find(v=>v.title===h);m&&Se(m)})}),t.querySelectorAll(".send-enquiry-compare").forEach(r=>{r.addEventListener("click",()=>{showToast("📩 Redirecting to Enquiries page..."),Y("enquiries")})})},sn=()=>{const e=document.getElementById("collection-recent-list");if(!e)return;const t=JSON.parse(localStorage.getItem("beacon_recent_views"))||[];if(t.length===0){e.innerHTML=`
                <div class="collection-empty-state">
                    <span class="empty-icon">⏳</span>
                    <h4>Trips you explore will appear here.</h4>
                    <p style="margin-bottom: 20px; font-size: 13px; color: var(--text-slate);">Packages whose details you open will be cataloged here for quick review.</p>
                    <button class="btn-explore-link" onclick="document.querySelector('[data-target=\\'home\\']').click()">Start Exploring</button>
                </div>
            `;return}e.innerHTML="";const a={Today:[],Yesterday:[],Earlier:[]};t.forEach(n=>{const o=q.find(s=>s.title.trim()===n.title.trim());if(o){const s=qn(n.viewedAt);a[s].push({pkg:o,timestamp:n.viewedAt})}});for(let n in a){const o=a[n];if(o.length===0)continue;const s=document.createElement("div");s.className="timeline-group-header",s.innerText=n,e.appendChild(s);const i=document.createElement("div");i.className="recent-timeline-cards",o.forEach(d=>{const c=d.pkg,g=X.includes(c.title),u=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",r=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(u&&r){const b=I=>{const E=I.split("-");if(E.length===3){const P=new Date(E[0],E[1]-1,E[2]),T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${P.getDate()} ${T[P.getMonth()]} ${P.getFullYear()}`}return I};`${b(u)}${b(r)}`}else{const b=new Date;b.toLocaleString("default",{month:"short"}),new Date(b.setMonth(b.getMonth()+3)).toLocaleString("default",{month:"short"}),new Date().getFullYear()}const h=F.some(b=>b.title===c.title),m=document.createElement("div");m.className="saved-card-horizontal",m.innerHTML=`
                    <div class="card-img-col" style="background-image: url('${c.imgUrl}')"></div>
                    <div class="card-details-col">
                        <div>
                            <div class="card-title-row">
                                <h4 class="card-title">${c.title}</h4>
                                <span style="font-size: 11px; font-weight: 700; color: var(--accent-cyan);">${Nn(d.timestamp)}</span>
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
                        <button class="btn-action btn-secondary-action btn-add-compare">${h?"Added to Compare":"Add to Compare"}</button>
                    </div>
                `,m.style.cursor="pointer",m.addEventListener("click",b=>{b.target.closest(".btn-save")||b.target.closest(".btn-add-compare")||Se(c)});const v=m.querySelector(".btn-save");v.addEventListener("click",()=>{We(c.title),v.innerText=X.includes(c.title)?"Saved":"Save",Ue()});const y=m.querySelector(".btn-add-compare");y.addEventListener("click",()=>{const b=!F.some(E=>E.title===c.title);dt(c,b),y.innerText=b?"Added to Compare":"Add to Compare";const I=document.querySelector(`.card-compare-checkbox[data-title="${c.title}"]`);I&&(I.checked=b)}),i.appendChild(m)}),e.appendChild(i)}},rn=()=>{const e=document.querySelectorAll(".collection-tab"),t=document.querySelectorAll(".collection-panel"),a=document.querySelector(".collection-tab-indicator");if(e.length===0)return;const n=d=>{a&&(a.style.width=`${d.offsetWidth}px`,a.style.left=`${d.offsetLeft}px`)};e.forEach(d=>{d.addEventListener("click",()=>{e.forEach(g=>g.classList.remove("active")),t.forEach(g=>g.classList.remove("active")),d.classList.add("active");const c=document.getElementById(`collection-${d.dataset.tab}-tab`);c&&c.classList.add("active"),n(d),d.dataset.tab==="saved"?ot():d.dataset.tab==="compare"?bt():d.dataset.tab==="recent"&&sn()})});const o=document.querySelector(".collection-tab.active");o&&setTimeout(()=>n(o),100);const s=document.getElementById("btn-run-comparison");s&&s.addEventListener("click",()=>{on()});const i=document.getElementById("btn-clear-recent-history");i&&i.addEventListener("click",()=>{confirm("Are you sure you want to clear your recently viewed history?")&&(localStorage.removeItem("beacon_recent_views"),sn(),showToast("⏳ View history cleared."))})};document.body.addEventListener("click",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest(".compare-checkbox-label")||e.target.closest("a")||e.target.closest(".remove-btn"))return;const t=e.target.closest(".travel-card, .trending-curved-card, .bespoke-card, .saved-card-horizontal");if(t){const a=t.querySelector(".card-title, .bespoke-title");if(a){const n=a.innerText.trim();let o=q.find(s=>s.title.trim()===n);if(o||(o=q.find(s=>s.title.toLowerCase().includes(n.toLowerCase())||n.toLowerCase().includes(s.title.toLowerCase()))),!o){const s=n.toLowerCase().split(/\s+/).filter(i=>i.length>3);s.length>0&&(o=q.find(i=>s.some(d=>i.title.toLowerCase().includes(d))))}if(!o&&q.length>0){const s=n.toLowerCase();s.includes("beach")||s.includes("goa")||s.includes("island")||s.includes("coast")||s.includes("sea")?o=q.find(i=>i.category==="beaches"):(s.includes("mountain")||s.includes("peaks")||s.includes("valley")||s.includes("hills")||s.includes("trek")||s.includes("snow"))&&(o=q.find(i=>i.category==="mountains")),o||(o=q[0])}o?Se(o):console.warn("Could not find matching package for title:",n)}}});const Fn=()=>{const e=document.getElementById("mobile-home-discovery");if(!e)return;const t=[{title:"Trekking",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Camping",bg:"https://images.unsplash.com/photo-1478131148058-76f5597951c6?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Road Trips",bg:"https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Beach Escapes",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",filter:"beaches"},{title:"Mountains",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Backpacking",bg:"https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?auto=format&fit=crop&w=300&q=80",filter:"mountains"},{title:"Adventure",bg:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=300&q=80",filter:"mountains"}],a=[{name:"Goa",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",query:"Goa"},{name:"Kashmir",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",query:"Kashmir"},{name:"Ladakh",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80",query:"Ladakh"},{name:"Kerala",bg:"https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=300&q=80",query:"Kerala"},{name:"Himachal",bg:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=80",query:"Manali"},{name:"Rajasthan",bg:"https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=300&q=80",query:"Rajasthan"}],n=y=>{const b=X.includes(y.title),I=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",E=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(I&&E){const U=R=>{const G=R.split("-");if(G.length===3){const H=new Date(G[0],G[1]-1,G[2]),Z=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${H.getDate()} ${Z[H.getMonth()]} ${H.getFullYear()}`}return R};`${U(I)}${U(E)}`}else{const U=new Date;U.toLocaleString("default",{month:"short"}),new Date(U.setMonth(U.getMonth()+3)).toLocaleString("default",{month:"short"}),new Date().getFullYear()}const P=localStorage.getItem("liked_"+y.title)==="true",T='<img src="save-icon.png" class="mobile-png-icon">',C='<img src="share-icon.png" class="mobile-png-icon">',j='<img src="like-icon.png" class="mobile-png-icon">',le=y.priceStr||y.price;return`
                <div class="mobile-compact-card" data-title="${y.title}">
                    <div class="card-img" style="background-image: url('${y.bg||y.imgUrl}')">
                        <button type="button" class="mobile-card-like-btn ${P?"active":""}">${j}</button>
                        <button type="button" class="mobile-card-share-btn">${C}</button>
                        <button type="button" class="mobile-card-fav-btn ${b?"active":""}">${T}</button>
                    </div>
                    <div class="card-info">
                        <div class="card-name">${y.title}</div>
                        <div class="card-meta-row">
                            <span>📍 ${y.type||y.category.toUpperCase()}</span>
                            <span>${y.duration}</span>
                        </div>
                        <div class="card-footer-row">
                            <span class="card-rating">⭐ ${y.rating}</span>
                            <span class="card-price">${le}</span>
                        </div>
                    </div>
                </div>
            `},o=y=>{y.querySelectorAll(".mobile-compact-card").forEach(b=>{const I=b.dataset.title,E=q.find(R=>R.title===I);if(!E)return;b.onclick=R=>{R.target.closest(".mobile-card-fav-btn")||R.target.closest(".mobile-card-share-btn")||R.target.closest(".mobile-card-like-btn")||Se(E)};const P=b.querySelector(".mobile-card-like-btn");P&&(P.onclick=R=>{R.stopPropagation();const H=!(localStorage.getItem("liked_"+E.title)==="true");localStorage.setItem("liked_"+E.title,H?"true":"false"),H?P.classList.add("active"):P.classList.remove("active"),P.classList.add("pop-bounce"),setTimeout(()=>P.classList.remove("pop-bounce"),300),window.showToast(H?"Liked package!":"Unliked package")});const T=b.querySelector(".mobile-card-share-btn");T&&(T.onclick=R=>{R.stopPropagation(),openShareSheet(E)});const C=b.querySelector(".mobile-card-fav-btn");C&&(C.onclick=R=>{R.stopPropagation(),toggleSavedPackage(E.title);const G=X.includes(E.title);G?C.classList.add("active"):C.classList.remove("active"),C.classList.add("pop-bounce"),setTimeout(()=>C.classList.remove("pop-bounce"),300);const H=document.getElementById("playground-toast");H&&(H.innerText=G?"Saved to My Collection":"Removed from Collection",H.classList.add("active"),setTimeout(()=>H.classList.remove("active"),2200)),pt(),Ue()});let j=null;const le=R=>{j=setTimeout(()=>{const G=document.getElementById("playground-preview-sheet"),H=document.getElementById("playground-preview-backdrop"),Z=document.getElementById("preview-sheet-title"),oe=document.querySelector("#playground-preview-sheet p"),Me=document.querySelector('#playground-preview-sheet span[style*="accent-cyan"]'),De=document.querySelector('#playground-preview-sheet span[style*="font-size: 12px"]'),ge=document.getElementById("btn-close-sheet-preview");G&&H&&(Z&&(Z.innerText=E.title),oe&&(oe.innerText=E.highlights||E.description||"Experience the best of local food, sightseeing, and scenic guides customized for your comfort."),Me&&(Me.innerText=E.price||E.priceStr),De&&(De.innerText=`⏱ ${E.duration} • ${E.type||E.category.toUpperCase()}`),ge&&(ge.onclick=()=>{G.classList.remove("active"),setTimeout(()=>H.style.display="none",300),Se(E)}),H.style.display="block",setTimeout(()=>G.classList.add("active"),50))},500)},U=()=>{j&&clearTimeout(j)};b.addEventListener("mousedown",le),b.addEventListener("touchstart",le),b.addEventListener("mouseup",U),b.addEventListener("touchend",U),b.addEventListener("mouseleave",U)})},s=e.querySelectorAll(".mobile-chip");s.forEach(y=>{y.onclick=()=>{s.forEach(I=>I.classList.remove("active")),y.classList.add("active");const b=y.dataset.filter;i(b)}});const i=y=>{["rail-top-picks","rail-trending","rail-weekend","rail-adventure","rail-beaches","rail-more-journeys"].forEach(I=>{const E=document.getElementById(I);if(!E)return;const P=E.querySelector(".rail-items-scroll");let T=[];I==="rail-top-picks"?T=q.slice(0,3):I==="rail-trending"?T=[...q].reverse().slice(0,4):I==="rail-weekend"?T=q.filter(C=>parseInt(d(C))<=4):I==="rail-adventure"?T=q.filter(C=>C.style==="adventure"||C.category==="mountains"||C.experiences==="trekking"||C.title&&C.title.toLowerCase().includes("expedition")):I==="rail-beaches"?T=q.filter(C=>C.category==="beaches"||C.experiences==="beaches"||C.title&&C.title.toLowerCase().includes("beach")):T=q.slice(2,6),y!=="all"&&(T=T.filter(C=>C.category===y)),T.length===0?E.style.display="none":(E.style.display="block",P.innerHTML=T.map(C=>n(C)).join(""),o(P))})},d=y=>y.duration===void 0||y.duration===null?"5":String(y.duration).replace(/[^0-9]/g,"")||"5",c=()=>{const y=document.getElementById("mobile-featured-carousel");if(!y)return;const b=[q.find(T=>T.title.includes("Ladakh"))||q[0],q.find(T=>T.title.includes("Goa"))||q[1],q.find(T=>T.title.includes("Kashmir"))||q[2]].filter(Boolean);let I=0;const E=()=>{const T=b[I],C=X.includes(T.title),j=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",le=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(j&&le){const R=G=>{const H=G.split("-");if(H.length===3){const Z=new Date(H[0],H[1]-1,H[2]),oe=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${Z.getDate()} ${oe[Z.getMonth()]} ${Z.getFullYear()}`}return G};`${R(j)}${R(le)}`}else{const R=new Date;R.toLocaleString("default",{month:"short"}),new Date(R.setMonth(R.getMonth()+3)).toLocaleString("default",{month:"short"}),new Date().getFullYear()}y.innerHTML=`
                    <div class="hero-carousel-item" style="background-image: url('${T.bg||T.imgUrl}')">
                        <div class="hero-carousel-overlay"></div>
                        <div class="hero-carousel-content">
                            <span class="hero-carousel-tag">Featured Journey • ${T.type||T.category.toUpperCase()}</span>
                            <h2 class="hero-carousel-title">${T.title}</h2>
                            <div class="hero-carousel-meta">
                                <span>⏱ ${T.duration}</span> &bull; 
                                <span>⭐ ${T.rating} Rating</span>
                            </div>
                            <div class="hero-carousel-price">
                                Starting from <strong>${T.price||T.priceStr}</strong>
                            </div>
                            <div class="hero-carousel-buttons">
                                <button type="button" class="btn-primary-large btn-hero-view" style="flex: 2; padding: 10px 16px; border-radius: 8px; font-weight: 850; background: var(--accent-cyan); color: var(--bg-dark); border: none; cursor: pointer; font-size: 13px; outline: none;">View Package</button>
                                <button type="button" class="btn-secondary-action btn-hero-save" style="flex: 1; padding: 10px; border-radius: 8px; font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px;">${C?"❤️ Saved":"♡ Save"}</button>
                            </div>
                            
                            <!-- Pagination indicators -->
                            <div style="display: flex; gap: 6px; justify-content: center; margin-top: 15px;">
                                ${b.map((R,G)=>`<span class="carousel-dot" style="width: 6px; height: 6px; border-radius: 50%; background: ${G===I?"var(--accent-cyan)":"rgba(255,255,255,0.3)"};"></span>`).join("")}
                            </div>
                        </div>
                    </div>
                `,y.querySelector(".btn-hero-view").onclick=()=>{Se(T)};const U=y.querySelector(".btn-hero-save");U.onclick=()=>{toggleSavedPackage(T.title),E(),pt(),Ue()}};E();let P=0;y.ontouchstart=T=>{P=T.touches[0].clientX},y.ontouchend=T=>{const C=T.changedTouches[0].clientX-P;Math.abs(C)>50&&(C>0?I=(I-1+b.length)%b.length:I=(I+1)%b.length,E())}},g=()=>{const y=document.querySelector("#rail-experiences .rail-items-scroll");y&&(y.innerHTML=t.map(b=>`
                <div class="experience-visual-card" data-filter="${b.filter}" style="background-image: url('${b.bg}')">
                    <div class="experience-visual-overlay">
                        <div class="experience-visual-title">${b.title}</div>
                    </div>
                </div>
            `).join(""),y.querySelectorAll(".experience-visual-card").forEach(b=>{b.onclick=()=>{const I=b.dataset.filter,E=e.querySelector(`.mobile-chip[data-filter="${I}"]`);E&&E.click()}}))},u=()=>{const y=document.querySelector("#rail-destinations .rail-items-scroll");y&&(y.innerHTML=a.map(b=>`
                <div class="destination-visual-card" data-query="${b.query}" style="background-image: url('${b.bg}')">
                    <div class="destination-visual-overlay">
                        <div class="destination-visual-name">${b.name}</div>
                    </div>
                </div>
            `).join(""),y.querySelectorAll(".destination-visual-card").forEach(b=>{b.onclick=()=>{const I=b.dataset.query,E=q.find(P=>P.title.toLowerCase().includes(I.toLowerCase()));E&&Se(E)}}))},r=()=>{const y=document.querySelectorAll(".budget-chip-item");y.forEach(b=>{b.onclick=()=>{y.forEach(T=>T.classList.remove("active")),b.classList.add("active");const I=parseInt(b.dataset.min),E=parseInt(b.dataset.max),P=q.find(T=>{const C=parseInt(T.price.replace(/[^0-9]/g,""))||15e3;return C>=I&&C<=E});P&&Se(P)}})},h=document.getElementById("btn-mobile-trigger-planner");h&&(h.onclick=()=>{Y("planner")});const m=()=>{const y=document.getElementById("rail-continue-exploring");if(!y)return;const b=y.querySelector(".rail-items-scroll"),I=JSON.parse(localStorage.getItem("beacon_recent_views"))||[];if(I.length===0){y.style.display="none";return}y.style.display="block";const E=I.map(P=>q.find(T=>T.title===P.title)).filter(Boolean);b.innerHTML=E.map(P=>n(P)).join(""),o(b)},v=()=>{const y=JSON.parse(localStorage.getItem("beacon_recent_views"))||[],b=X[0];let I="",E="";if(b){const U=q.find(R=>R.title===b);U&&(I=U.category,E=U.title)}else if(y.length>0){const U=q.find(R=>R.title===y[0].title);U&&(I=U.category,E=U.title)}const P=document.getElementById("rail-because-liked");if(P&&P.remove(),!I)return;const T=document.createElement("div");T.className="mobile-rail-section",T.id="rail-because-liked",T.innerHTML=`
                <div class="rail-header" style="padding: 0 16px; margin-bottom: 10px;">
                    <h4 style="font-size: 14px; font-weight: 800; color: #fff; margin: 0;">More Like ${E}</h4>
                </div>
                <div class="rail-items-scroll"></div>
            `;const C=T.querySelector(".rail-items-scroll"),j=q.filter(U=>U.category===I&&U.title!==E);if(j.length===0)return;C.innerHTML=j.map(U=>n(U)).join(""),o(C);const le=document.getElementById("rail-more-journeys");le&&le.parentElement.insertBefore(T,le)};c(),i("all"),g(),u(),r(),m(),v()};setTimeout(()=>{ao(),S(),pt(),Ue();const e=document.getElementById("btn-open-animation-playground");e&&(e.onclick=()=>{Y("playground")});const t=document.getElementById("btn-playground-back");t&&(t.onclick=()=>{Y("profile")});const a=[{title:"Leh Ladakh Expedition",bg:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80"},{title:"Goa Beachfront Escape",bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},{title:"Kashmir Paradise Escape",bg:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"}];let n=0;const o=document.getElementById("playground-mini-hero"),s=document.getElementById("playground-hero-title");let i=setInterval(()=>{o&&(n=(n+1)%a.length,o.style.opacity=.5,setTimeout(()=>{o.style.backgroundImage=`url('${a[n].bg}')`,s.innerText=a[n].title,o.style.opacity=1},300))},6e3);o&&(o.ontouchstart=()=>{clearInterval(i)});const d=document.getElementById("playground-fav-btn"),c=document.getElementById("playground-toast");d&&(d.onclick=()=>{d.classList.toggle("active"),d.classList.add("pop-bounce"),setTimeout(()=>d.classList.remove("pop-bounce"),300);const E=d.classList.contains("active");d.innerText=E?"❤️":"♡",c&&(c.innerText=E?"Saved to My Collection":"Removed from Collection",c.classList.add("active"),setTimeout(()=>c.classList.remove("active"),2500))});const g=document.querySelectorAll(".playground-chip-btn"),u=document.getElementById("playground-results-container");g.forEach(E=>{E.onclick=()=>{g.forEach(T=>T.classList.remove("active")),E.classList.add("active");const P=E.dataset.filter;u&&(u.classList.add("fade-out"),setTimeout(()=>{P==="m"?u.innerHTML="🗻 Leh Ladakh Expedition &bull; Manali Cedar Chalet":u.innerHTML="🏝️ Goa Beachfront Escape &bull; Varkala Cliffside Yoga",u.classList.remove("fade-out")},200))}});const r=document.getElementById("btn-playground-longpress"),h=document.getElementById("playground-preview-backdrop"),m=document.getElementById("playground-preview-sheet"),v=document.getElementById("btn-close-sheet-preview");let y=null;if(r){const E=()=>{y=setTimeout(()=>{m&&h&&(h.style.display="block",setTimeout(()=>m.classList.add("active"),50))},500)},P=()=>{y&&clearTimeout(y)};r.addEventListener("mousedown",E),r.addEventListener("touchstart",E),r.addEventListener("mouseup",P),r.addEventListener("touchend",P)}v&&(v.onclick=()=>{m&&h&&(m.classList.remove("active"),setTimeout(()=>h.style.display="none",300))}),h&&(h.onclick=()=>{m&&(m.classList.remove("active"),setTimeout(()=>h.style.display="none",300))});const b=document.getElementById("btn-trigger-progressive-load"),I=document.getElementById("sharp-img-test");b&&I&&(b.onclick=()=>{I.classList.remove("loaded"),setTimeout(()=>{I.classList.add("loaded")},800)}),Fn()},500);const ht=e=>{kt=e;const t=document.getElementById("view-package-details");if(!t)return;const a=X.includes(e.title);F.some(w=>w.title===e.title),""+(e.basePrice||Math.round(e.priceNum*1.11)).toLocaleString();const o=e.duration||4,s=e.highlights?e.highlights.split(","):["Explore local viewpoints","Guided nature walk","Leisure tour of surrounding villages"],i=e.sightseeing?e.sightseeing.split(","):["Main square","Local markets","Scenic viewpoints"];let d="";for(let w=1;w<=o;w++){let k="",N="",V="",te="",fe="Breakfast Included";if(w===1)k="Arrival & Resort Check-in",V="Private Airport Transfer",te="Welcome dinner & sunset leisure",N="Arrive at the destination. Private airport transfer directly to your premium resort for check-in. Relax and enjoy a welcome cocktail with sunset beach views.",fe=e.meals==="All Inclusive"?"All Inclusive Meals":"Welcome Dinner Included";else if(w===o)k="Breakfast & Departure",V="Private Airport Transfer",te="Morning beach walk & checkout",N="Enjoy a delicious morning buffet breakfast. Complete checkout formalities and board your private cab to the airport with cherished memories.",fe="Breakfast Included";else{const Oe=(w-2)%s.length,Ne=(w-2)%i.length;k=s[Oe]?s[Oe].trim():"Local Sightseeing Tour",V="Private Cab local transfer",te=`Explore ${i[Ne]?i[Ne].trim():"scenic highlights"}`,N=`Set out on an exciting sightseeing tour visiting ${i[Ne]?i[Ne].trim():"scenic highlights"} and popular local attractions.`,fe=e.meals==="All Inclusive"?"All Inclusive Meals":"Breakfast & Dinner Included"}d+=`
                <div class="itinerary-day-card ${w===1?"active":""}" style="position: relative; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 12px; overflow: hidden; background: rgba(255,255,255,0.01);">
                    <!-- Glowing Dot in Timeline -->
                    <div class="timeline-dot-m ${w===1?"dot-solid":"dot-ring"}"></div>
                    <div class="itinerary-day-header" style="padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s;">
                        <div class="itinerary-day-header-left" style="display: flex; align-items: center; gap: 10px;">
                            <span class="day-badge" style="background: rgba(0, 203, 224, 0.1); color: var(--accent-cyan); font-weight: 800; font-size: 10.5px; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Day ${w}</span>
                            <span class="day-title-text" style="font-size: 13.5px; font-weight: 800; color: #fff;">${k}</span>
                        </div>
                        <span class="acc-arrow" style="font-size: 10px; color: var(--text-slate); transition: transform 0.2s;">▼</span>
                    </div>
                    <div class="itinerary-day-body" style="max-height: 0; overflow: hidden; transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s; padding: 0 16px; background: rgba(7, 10, 20, 0.4); border-top: 1px solid rgba(255,255,255,0.02);">
                        <p style="font-size:12.5px; color:var(--text-slate); line-height:1.6; margin: 12px 0;">${N}</p>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:6px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            <span>Transport: ${V}</span>
                        </div>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:6px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            <span>Activity: ${te}</span>
                        </div>
                        <div style="font-size:11.5px; color:var(--text-slate); margin-bottom:12px; display: flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            <span>Meals: ${fe}</span>
                        </div>
                    </div>
                </div>
            `}const g=e.style==="couple"||e.category==="beaches"?{name:"Rahul Mehta",type:"Independent Local Guide",rating:"4.9",reviews:"94",trips:"120+",responseRate:"98%",languages:["English","Hindi","Kashmiri"],about:"Born and raised in Srinagar, Rahul has been guiding travelers across Kashmir valleys, lakes, and high ridges since 2018. Certified in wilderness rescue and first aid.",expertise:["Trekking","Cultural Tours","Photography"],avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",location:"Srinagar, Jammu & Kashmir",travelers:"850+",destinations:"12+"}:{name:"Wanderlust Travels",type:"Bespoke Tour Agency",rating:"4.85",reviews:"1,240",trips:"1,850+",responseRate:"95%",languages:["English","Hindi","Spanish"],about:"A premier local operator specializing in curated group departures, luxury escapes, and custom itineraries across scenic Himalayan routes and beach havens.",expertise:["Luxury Trips","Family Groups","Honeymoon Planning"],avatar:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",location:"New Delhi, India",travelers:"12,400+",destinations:"45+"};let u="Daily Departures (Aug 2026 – Oct 2026)";const r=document.getElementById("match-start-date")?document.getElementById("match-start-date").value:"",h=document.getElementById("match-end-date")?document.getElementById("match-end-date").value:"";if(r&&h){const w=k=>{const N=k.split("-");if(N.length===3){const V=new Date(N[0],N[1]-1,N[2]),te=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${V.getDate()} ${te[V.getMonth()]} ${V.getFullYear()}`}return k};u=`${w(r)} – ${w(h)}`}else{const w=new Date,k=w.toLocaleString("default",{month:"short"}),N=new Date(w.setMonth(w.getMonth()+3)).toLocaleString("default",{month:"short"}),V=new Date().getFullYear();u=`Flexible (${k} – ${N} ${V})`}const m=q.filter(w=>w.title===e.title?!1:w.category===e.category||w.style===e.style).slice(0,4);let v="";m.forEach(w=>{const k=X.includes(w.title);v+=`
                <div class="similar-card-m" data-title="${w.title}" style="flex: 0 0 65%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; cursor: pointer; scroll-snap-align: start;">
                    <div style="height: 100px; background-image: url('${w.imgUrl}'); background-size: cover; background-position: center; position: relative;">
                        <button type="button" class="sim-fav-btn" data-title="${w.title}" style="position: absolute; top: 8px; right: 8px; background: rgba(18,24,35,0.6); border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="${k?"var(--accent-cyan)":"#fff"}" stroke-width="2" fill="${k?"var(--accent-cyan)":"none"}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                    <div style="padding: 10px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h5 style="margin: 0 0 4px 0; font-size: 12px; font-weight: 800; color: #fff; white-space: normal; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${w.title}</h5>
                            <span style="font-size: 10px; color: var(--text-slate);">${w.duration} Days • ${w.style.toUpperCase()}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                            <strong style="font-size: 13px; color: var(--accent-cyan);">${w.priceStr}</strong>
                            <span style="font-size: 10px; color: #fbbf24;">★ ${w.rating.replace("⭐","").trim()}</span>
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
                            ${g.expertise.map(w=>`<span style="font-size: 9.5px; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; font-weight: 700;">${w}</span>`).join("")}
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
        `;const b=document.getElementById("btn-details-m-back");b&&(b.onclick=()=>{const w=document.querySelector(".mobile-bottom-nav");w&&window.innerWidth<768&&(w.style.display="flex"),Y(Je)});const I=document.getElementById("btn-details-m-fav");I&&(I.onclick=()=>{toggleSavedPackage(e.title);const w=X.includes(e.title),k=I.querySelector(".heart-svg");w?(I.classList.add("active"),k&&(k.setAttribute("fill","var(--accent-cyan)"),k.setAttribute("stroke","var(--accent-cyan)")),showToast("❤️ Saved to My Collection")):(I.classList.remove("active"),k&&(k.setAttribute("fill","none"),k.setAttribute("stroke","#fff")),showToast("🤍 Removed from Collection")),I.style.transform="scale(1.2)",setTimeout(()=>I.style.transform="",200),pt(),Ue()});const E=document.getElementById("btn-details-m-share");E&&(E.onclick=()=>{openShareSheet(e)});const P=document.getElementById("btn-about-read-more"),T=document.getElementById("about-trip-text");P&&T&&P.addEventListener("click",()=>{T.style.display==="block"?(T.style.display="-webkit-box",P.innerHTML="Read More ↓"):(T.style.display="block",P.innerHTML="Read Less ↑")});const C=document.getElementById("mobile-details-accordion");C&&C.querySelectorAll(".itinerary-day-header").forEach(w=>{w.onclick=()=>{const k=w.parentElement,N=k.querySelector(".itinerary-day-body"),V=k.querySelector(".acc-arrow");k.classList.contains("active")?(k.classList.remove("active"),N.style.maxHeight="0",V&&(V.style.transform="")):(k.classList.add("active"),N.style.maxHeight="300px",V&&(V.style.transform="rotate(180deg)"))}});const j=document.getElementById("btn-m-view-full-itinerary");j&&C&&j.addEventListener("click",()=>{const w=C.querySelectorAll(".itinerary-day-card"),k=Array.from(w).some(N=>!N.classList.contains("active"));w.forEach(N=>{const V=N.querySelector(".itinerary-day-body"),te=N.querySelector(".acc-arrow");k?(N.classList.add("active"),V.style.maxHeight="300px",te&&(te.style.transform="rotate(180deg)")):(N.classList.remove("active"),V.style.maxHeight="0",te&&(te.style.transform=""))}),k?j.innerHTML="Hide Full Itinerary ↑":j.innerHTML="View Full Itinerary >"}),document.querySelectorAll(".policy-accordion-card-m").forEach(w=>{const k=w.querySelector(".policy-header-m"),N=w.querySelector(".policy-body-m"),V=w.querySelector(".policy-arrow-m");k&&N&&k.addEventListener("click",()=>{N.style.display==="none"?(N.style.display="block",V&&(V.style.transform="rotate(90deg)"),V&&(V.style.color="var(--accent-cyan)")):(N.style.display="none",V&&(V.style.transform=""),V&&(V.style.color=""))})});const U=document.querySelectorAll(".gallery-item-m"),R=document.getElementById("btn-gallery-view-all"),G=document.getElementById("full-gallery-modal"),H=document.getElementById("close-gallery-btn"),Z=document.getElementById("gallery-swipe-wrap"),oe=document.getElementById("gallery-index-label"),Me=(w=0)=>{if(G&&(G.style.display="flex",Z)){const k=Z.clientWidth;Z.scrollTo({left:w*k,behavior:"instant"}),oe&&(oe.innerText=`${w+1} / 3`)}};U.forEach((w,k)=>{w.addEventListener("click",()=>Me(k))}),R&&R.addEventListener("click",()=>Me(0)),H&&(H.onclick=()=>{G&&(G.style.display="none")}),Z&&Z.addEventListener("scroll",()=>{const w=Z.clientWidth,k=Math.round(Z.scrollLeft/w);oe&&(oe.innerText=`${k+1} / 3`)});const De=document.getElementById("btn-view-map-accommodation");De&&De.addEventListener("click",()=>{const w=encodeURIComponent(e.hotelAddress||e.hotelName||"Maldives");window.open(`https://www.google.com/maps/search/?api=1&query=${w}`,"_blank")});const ge=document.getElementById("btn-m-view-partner-profile");ge&&ge.addEventListener("click",()=>{nn(g,e)}),document.querySelectorAll(".similar-card-m").forEach(w=>{w.addEventListener("click",N=>{if(N.target.closest(".sim-fav-btn"))return;const V=w.dataset.title,te=q.find(fe=>fe.title===V);te&&ht(te)});const k=w.querySelector(".sim-fav-btn");k&&k.addEventListener("click",N=>{N.stopPropagation();const V=k.dataset.title;toggleSavedPackage(V);const te=X.includes(V),fe=k.querySelector("svg");te?(fe.setAttribute("fill","var(--accent-cyan)"),fe.setAttribute("stroke","var(--accent-cyan)"),showToast("❤️ Saved to My Collection")):(fe.setAttribute("fill","none"),fe.setAttribute("stroke","#fff"),showToast("🤍 Removed from Collection")),pt(),Ue()})});const f=document.getElementById("btn-m-book-now-sticky");f&&(f.onclick=()=>{ka(e)}),closeBookingDrawerBtn&&(closeBookingDrawerBtn.onclick=()=>{bookingDrawer&&(bookingDrawer.style.display="none")}),document.getElementsByName("m-book-date");const x=document.getElementById("m-book-date-1"),A=document.getElementById("m-book-date-2"),ie=document.getElementById("m-book-date-3");x&&(x.innerText=u);const ue=w=>{const k=new Date;k.setMonth(k.getMonth()+w);const N=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${k.getDate()} ${N[k.getMonth()]} – ${k.getDate()+5} ${N[k.getMonth()]} ${k.getFullYear()}`};A&&(A.innerText=ue(1)),ie&&(ie.innerText=ue(2));const it=document.getElementById("btn-m-travellers-dec"),qe=document.getElementById("btn-m-travellers-inc"),B=document.getElementById("m-travellers-count"),L=document.getElementById("lbl-m-travellers-breakdown");let $=2;const O=w=>{$=Math.max(1,Math.min(10,$+w)),B&&(B.innerText=$),L&&(L.innerText=$),Ie()};it&&(it.onclick=()=>O(-1)),qe&&(qe.onclick=()=>O(1));const ce=document.getElementById("m-addon-guide"),W=document.getElementById("m-addon-meals");ce&&(ce.onchange=()=>Ie()),W&&(W.onchange=()=>Ie());function Ie(){const k=(e.priceNum||22e3)*$;let N=0;ce&&ce.checked&&(N+=3500),W&&W.checked&&(N+=2e3*$);const V=Math.round((k+N)*.05),te=k+N+V,fe=document.getElementById("breakdown-base-total"),Oe=document.getElementById("breakdown-addons-total"),Ne=document.getElementById("breakdown-taxes-total"),At=document.getElementById("breakdown-grand-total");fe&&(fe.innerText="₹"+k.toLocaleString()),Oe&&(Oe.innerText="₹"+N.toLocaleString()),Ne&&(Ne.innerText="₹"+V.toLocaleString()),At&&(At.innerText="₹"+te.toLocaleString())}const Le=document.getElementById("btn-m-confirm-booking-pay");Le&&(Le.onclick=()=>{bookingDrawer&&(bookingDrawer.style.display="none");const w=document.getElementById("breakdown-grand-total")?document.getElementById("breakdown-grand-total").innerText:e.priceStr;xe=e,pe=`BCN-2026-${Math.floor(1e4+Math.random()*9e4)}`;const N=e.style==="couple"||e.category==="beaches";let V="wanderworld@upi",te="WanderWorld Travels";N?(V=localStorage.getItem("beacon_planner_upi")||"rahul@upi",te=localStorage.getItem("beacon_planner_business")||"Rahul Mehta"):(V="wanderlust@upi",te="Wanderlust Travels");const fe=document.getElementById("checkout-payable-amount"),Oe=document.getElementById("checkout-package-title"),Ne=document.getElementById("checkout-booking-id"),At=document.getElementById("checkout-upi-display"),dn=document.getElementById("checkout-note-display"),pn=document.getElementById("checkout-qr-code");if(fe&&(fe.innerText=w),Oe&&(Oe.innerText=e.title),Ne&&(Ne.innerText=pe),At&&(At.innerText=V),dn&&(dn.innerText=pe),pn){const Zn=`upi://pay?pa=${V}&pn=${encodeURIComponent(te)}&am=${w.replace(/[^\d]/g,"")}&tn=${pe}`;pn.src=`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(Zn)}`}const gn=document.getElementById("checkout-payment-modal");gn&&(gn.style.display="flex")})};let p=null;const Un=()=>{if(!p)return;let e=0,t=0;p.travellers.infants,p.passengerProfiles.forEach(a=>{if(a.type==="Infant")return;const n=parseInt(a.age);!isNaN(n)&&n<=12?(a.type="Child",t++):(a.type="Adult",e++)}),p.travellers.adults=e,p.travellers.children=t},_t=()=>{if(!p)return{basePrice:0,upgradesPrice:0,mealsPrice:0,addonsPrice:0,discount:0,subtotal:0,taxes:0,grandTotal:0};Un();const e=p.pkg,t=p.travellers.adults||0,a=p.travellers.children||0;p.travellers.infants;const n=e.priceNum||22e3,o=Math.round(n*.68),s=n*t,i=o*a,c=s+i+0;let g=0;p.stayUpgrades.includes("sea-view")&&(g+=3e3),p.stayUpgrades.includes("extra-bed")&&(g+=1200*(e.duration||4)),p.transportUpgrades.includes("suv")&&(g+=2e3),p.transportUpgrades.includes("pickup-vip")&&(g+=1500);let u=0;if(p.mealMode==="same")p.passengerProfiles.forEach(b=>{if(b.type==="Infant")return;p.mealPreferences[b.id]==="Non-Veg"&&(u+=650)});else{const b=e.duration||4;for(let I=1;I<=b;I++){const E=p.dayWiseMeals[I]||{},P=E.lunch||{};p.passengerProfiles.forEach(C=>{P[C.id]==="Non-Vegetarian"&&(u+=150)});const T=E.dinner||{};p.passengerProfiles.forEach(C=>{T[C.id]==="Non-Vegetarian"&&(u+=250)})}}let r=0;p.addOns.includes("scuba")&&(r+=2500*(t+a)),p.addOns.includes("dinner")&&(r+=3e3),p.addOns.includes("photos")&&(r+=4e3);const h=2e3,m=Math.max(0,c+g+u+r-h),v=Math.round(m*.05),y=m+v;return{basePrice:c,adultTotal:s,baseAdultPrice:n,childTotal:i,baseChildPrice:o,upgradesPrice:g,mealsPrice:u,addonsPrice:r,discount:h,subtotal:m,taxes:v,grandTotal:y}},ae=()=>{if(!p)return;const e=JSON.parse(localStorage.getItem("beacon_bookings"))||[],t=e.findIndex(i=>i.id===p.bookingId),a={1:20,2:45,3:65,4:85,5:95}[p.currentStep]||10;let n="Traveller profiles incomplete";p.currentStep===2?n="Stay & transport selections pending":p.currentStep===3?n="Meals setup incomplete":p.currentStep===4?n="Trip add-ons config incomplete":p.currentStep===5&&(n="Review and confirm booking");const o=_t(),s={id:p.bookingId,packageTitle:p.pkg.title,imgUrl:p.pkg.imgUrl,dateRange:p.travelDate||"12 Oct – 15 Oct 2026",status:"draft",progress:a,progressDesc:n,travellersCount:p.passengerProfiles.length,estimatedTotal:o.grandTotal,state:p};t!==-1?e[t]=s:e.push(s),localStorage.setItem("beacon_bookings",JSON.stringify(e)),Ze()},ka=e=>{p={bookingId:`BCN-2026-${Math.floor(1e4+Math.random()*9e4)}`,pkg:e,status:"draft",currentStep:1,travelDate:"12 Oct – 15 Oct 2026",travellers:{adults:1,children:0,infants:0},passengerProfiles:[{id:1,type:"Adult",name:"Aditya Kasod",age:21,gender:"Male",collapsed:!0,isPrimary:!0}],stayUpgrades:[],transportUpgrades:[],mealMode:"same",mealPreferences:{1:"Vegetarian",2:"Non-Veg",3:"Vegetarian",4:"No Meal"},dayWiseMeals:{1:{lunch:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"},dinner:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"}},2:{breakfast:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"},dinner:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"}},3:{lunch:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"},dinner:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"}},4:{breakfast:{1:"Vegetarian",2:"Vegetarian",3:"Vegetarian"}}},addOns:[],timestamp:Date.now()},ae(),Y("mobile-booking"),Ee()},Hn=e=>{const a=(JSON.parse(localStorage.getItem("beacon_bookings"))||[]).find(n=>n.id===e);a&&a.state?(p=a.state,Y("mobile-booking"),Ee()):showToast("⚠️ Could not restore draft booking state.")},Ee=()=>{const e=document.getElementById("view-mobile-booking");if(!e||!p)return;const t=p.pkg,a=p.currentStep,n=_t(),o=["Travellers","Stay","Meals","Add-ons","Review"];let s='<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:12px 16px; border-radius:10px;">';o.forEach((l,f)=>{const x=f+1,A=a===x,ie=a>x;let ue=`<span style="width:20px; height:20px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--text-slate); color:var(--text-slate); background:transparent;">${x}</span>`;A?ue=`<span style="width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--accent-cyan); color:var(--bg-dark); background:var(--accent-cyan); box-shadow:0 0 6px var(--accent-cyan);">${x}</span>`:ie&&(ue='<span style="width:20px; height:20px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; border:1px solid var(--accent-cyan); color:var(--accent-cyan); background:transparent;">✓</span>'),s+=`
                <div style="display:flex; flex-direction:column; align-items:center; gap:4px; flex:1;">
                    ${ue}
                    <span style="font-size:8.5px; font-weight:800; color:${A?"var(--accent-cyan)":"var(--text-slate)"}; text-transform:uppercase;">${l}</span>
                </div>
            `,f<o.length-1&&(s+=`<div style="width:12px; height:1px; background:${a>x?"var(--accent-cyan)":"rgba(255,255,255,0.08)"}; margin-top:-14px;"></div>`)}),s+="</div>";let i="";if(a===1){const l=p.passengerProfiles.length+p.travellers.infants;i+=`
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
                                                        ${p.passengerProfiles.map(x=>{if(x.type==="Infant")return"";const A=(f.lunch||{})[x.id]||"Vegetarian";return`
                                                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                                                    <span style="font-size:11.5px; color:var(--text-slate);">${x.name}:</span>
                                                                    <select class="sel-day-meal-choice" data-day="${l}" data-meal="lunch" data-pid="${x.id}" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:4px 8px; border-radius:4px; color:#fff; font-size:11px;">
                                                                        <option value="Vegetarian" ${A==="Vegetarian"?"selected":""}>Vegetarian (Included)</option>
                                                                        <option value="Non-Vegetarian" ${A==="Non-Vegetarian"?"selected":""}>Non-Vegetarian (+₹150)</option>
                                                                        <option value="Jain" ${A==="Jain"?"selected":""}>Jain (Included)</option>
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
                                                        ${p.passengerProfiles.map(x=>{if(x.type==="Infant")return"";const A=(f.dinner||{})[x.id]||"Vegetarian";return`
                                                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                                                    <span style="font-size:11.5px; color:var(--text-slate);">${x.name}:</span>
                                                                    <select class="sel-day-meal-choice" data-day="${l}" data-meal="dinner" data-pid="${x.id}" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:4px 8px; border-radius:4px; color:#fff; font-size:11px;">
                                                                        <option value="Vegetarian" ${A==="Vegetarian"?"selected":""}>Vegetarian (Included)</option>
                                                                        <option value="Non-Vegetarian" ${A==="Non-Vegetarian"?"selected":""}>Non-Vegetarian (+₹250)</option>
                                                                        <option value="Jain" ${A==="Jain"?"selected":""}>Jain (Included)</option>
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
                                    <span>₹${n.adultTotal.toLocaleString()}</span>
                                </div>
                            `:""}
                            ${p.travellers.children>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>${p.travellers.children} Child${p.travellers.children>1?"ren":""} (₹${n.baseChildPrice.toLocaleString()} base × ${p.travellers.children})</span>
                                    <span>₹${n.childTotal.toLocaleString()}</span>
                                </div>
                            `:""}
                            ${p.travellers.infants>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>${p.travellers.infants} Infant${p.travellers.infants>1?"s":""}</span>
                                    <span>₹0</span>
                                </div>
                            `:""}
                            
                            <!-- Customizations -->
                            ${n.upgradesPrice>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Stay & Vehicle Customizations</span>
                                    <span>+₹${n.upgradesPrice.toLocaleString()}</span>
                                </div>
                            `:""}
                            
                            <!-- Meal add-ons -->
                            ${n.mealsPrice>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Meal Add-ons (Non-Veg selections)</span>
                                    <span>+₹${n.mealsPrice.toLocaleString()}</span>
                                </div>
                            `:""}

                            <!-- Add-ons -->
                            ${n.addonsPrice>0?`
                                <div style="display:flex; justify-content:space-between; color:#fff;">
                                    <span>Activities & Gear Upgrades</span>
                                    <span>+₹${n.addonsPrice.toLocaleString()}</span>
                                </div>
                            `:""}

                            <!-- Discount -->
                            <div style="display:flex; justify-content:space-between; color:#4ade80;">
                                <span>Package Discount</span>
                                <span>-₹${n.discount.toLocaleString()}</span>
                            </div>

                            <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:8px; margin-top:4px; display:flex; justify-content:space-between; font-size:13.5px; color:#fff;">
                                <span>Subtotal</span>
                                <span>₹${n.subtotal.toLocaleString()}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>Taxes & Fees (GST 5%)</span>
                                <span>₹${n.taxes.toLocaleString()}</span>
                            </div>
                            <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:8px; margin-top:4px; display:flex; justify-content:space-between; font-size:16.5px; font-weight:900; color:var(--accent-cyan);">
                                <span>Total Booking Amount</span>
                                <span>₹${n.grandTotal.toLocaleString()}</span>
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
                        <strong style="font-size:18px; font-weight:900; color:var(--accent-cyan); display:flex; align-items:center; gap:4px; transition: color 0.15s ease;" id="lbl-sticky-wizard-total">₹${n.grandTotal.toLocaleString()}</strong>
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
                        <span style="color:#fff;">₹${n.adultTotal.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Child Base Packages (₹15,000 × ${p.travellers.children})</span>
                        <span style="color:#fff;">₹${n.childTotal.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Customizations Upgrades:</span>
                        <span style="color:#fff;">+₹${n.upgradesPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Meal Customization Add-ons:</span>
                        <span style="color:#fff;">+₹${n.mealsPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Activities Add-ons:</span>
                        <span style="color:#fff;">+₹${n.addonsPrice.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; color:#4ade80;">
                        <span>Package Discount:</span>
                        <span>-₹${n.discount.toLocaleString()}</span>
                    </div>
                    <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:6px; display:flex; justify-content:space-between; color:#fff;">
                        <span>Taxes & GST (5%):</span>
                        <span>₹${n.taxes.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;const d=document.getElementById("btn-m-wizard-back");d&&(d.onclick=()=>{a>1?(p.currentStep-=1,ae(),Ee()):window.innerWidth<768?(Y("package-details",!0),ht(t)):Se(t)});const c=document.getElementById("btn-m-wizard-continue");c&&(c.onclick=()=>{a<5?(p.currentStep+=1,ae(),Ee()):On()}),document.querySelectorAll(".btn-jump-step").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.step);p.currentStep=f,ae(),Ee()}});const u=document.getElementById("m-sticky-total-expand-btn"),r=document.getElementById("price-breakdown-popup-sheet"),h=document.getElementById("btn-close-breakdown-popup");u&&r&&(u.onclick=()=>{r.style.display="block"}),h&&r&&(h.onclick=()=>{r.style.display="none"});const m=document.getElementById("m-wizard-date-select");m&&(m.onchange=()=>{p.travelDate=m.value,ae()});const v=document.getElementById("btn-infant-dec"),y=document.getElementById("btn-infant-inc");v&&y&&(v.onclick=()=>{if(p.travellers.infants>0){p.travellers.infants-=1;const l=p.passengerProfiles.map(f=>f.type).lastIndexOf("Infant");l!==-1&&p.passengerProfiles.splice(l,1),ae(),Ee()}},y.onclick=()=>{if(p.travellers.infants<5){p.travellers.infants+=1;const l=Math.max(...p.passengerProfiles.map(f=>f.id),0)+1;p.passengerProfiles.push({id:l,type:"Infant",name:"",age:1,gender:"Female",collapsed:!1}),ae(),Ee()}});const b=document.getElementById("btn-add-trip-mate");b&&(b.onclick=()=>{const l=Math.max(...p.passengerProfiles.map(f=>f.id),0)+1;p.passengerProfiles.forEach(f=>f.collapsed=!0),p.passengerProfiles.push({id:l,type:"Adult",name:"",age:"",gender:"Male",collapsed:!1}),ae(),Ee()}),document.querySelectorAll(".btn-delete-p-card").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.id);p.passengerProfiles=p.passengerProfiles.filter(x=>x.id!==f),ae(),Ee()}}),document.querySelectorAll(".btn-edit-p-card").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.id);p.passengerProfiles.forEach(x=>{x.collapsed=x.id!==f}),Ee()}}),document.querySelectorAll(".btn-collapse-p-card").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(A=>A.id===f);x&&(x.collapsed=!0,U(f),ae(),Ee())}}),document.querySelectorAll(".input-p-name").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(A=>A.id===f);x&&(x.name=l.value),ae()}}),document.querySelectorAll(".input-p-age").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(A=>A.id===f);x&&(x.age=parseInt(l.value)||0),ae()}}),document.querySelectorAll(".select-p-gender").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(A=>A.id===f);x&&(x.gender=l.value),ae()}}),document.querySelectorAll(".select-p-extrabed").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.id),x=p.passengerProfiles.find(A=>A.id===f);x&&(x.extraBed=l.value),x&&l.value==="Yes"&&(p.stayUpgrades.includes("extra-bed")||p.stayUpgrades.push("extra-bed")),ae()}});function U(l){const f=document.querySelector(`.input-p-name[data-id="${l}"]`);if(f){const x=p.passengerProfiles.find(A=>A.id===l);if(x){const A=f.value,ie=parseInt(document.querySelector(`.input-p-age[data-id="${l}"]`).value)||0,ue=document.querySelector(`.select-p-gender[data-id="${l}"]`).value;x.name=A,x.age=ie,x.gender=ue}}}document.querySelectorAll(".cb-upgrade-stay").forEach(l=>{l.onchange=()=>{const f=l.value;l.checked?p.stayUpgrades.includes(f)||p.stayUpgrades.push(f):p.stayUpgrades=p.stayUpgrades.filter(x=>x!==f),ge(),ae()}}),document.querySelectorAll(".cb-upgrade-trans").forEach(l=>{l.onchange=()=>{const f=l.value;l.checked?p.transportUpgrades.includes(f)||p.transportUpgrades.push(f):p.transportUpgrades=p.transportUpgrades.filter(x=>x!==f),ge(),ae()}}),document.querySelectorAll(".meal-mode-card").forEach(l=>{l.onclick=()=>{const f=l.dataset.mode;p.mealMode=f,ae(),Ee()}}),document.querySelectorAll(".btn-meal-chip").forEach(l=>{l.onclick=()=>{const f=parseInt(l.dataset.pid),x=l.dataset.val;p.mealPreferences[f]=x,ge(),ae(),Ee()}});const oe=document.querySelectorAll(".day-customize-accordion");oe.forEach(l=>{const f=l.querySelector(".day-customize-header"),x=l.querySelector(".day-customize-body");f&&x&&(f.onclick=()=>{const A=x.style.display==="block";oe.forEach(ie=>{ie.querySelector(".day-customize-body").style.display="none",ie.classList.remove("active-day-acc")}),A||(x.style.display="block",l.classList.add("active-day-acc"))})}),document.querySelectorAll(".sel-day-meal-choice").forEach(l=>{l.onchange=()=>{const f=parseInt(l.dataset.day),x=l.dataset.type||l.dataset.meal,A=parseInt(l.dataset.pid);p.dayWiseMeals[f]||(p.dayWiseMeals[f]={lunch:{},dinner:{}}),p.dayWiseMeals[f][x]||(p.dayWiseMeals[f][x]={}),p.dayWiseMeals[f][x][A]=l.value,ge(),ae()}}),document.querySelectorAll(".cb-addon-trip").forEach(l=>{l.onchange=()=>{const f=l.value;l.checked?p.addOns.includes(f)||p.addOns.push(f):p.addOns=p.addOns.filter(x=>x!==f),ge(),ae()}});function ge(){const l=document.getElementById("lbl-sticky-wizard-total");if(l){const f=_t();l.style.color="#ef4444",l.classList.add("pop-bounce"),setTimeout(()=>{l.innerText="₹"+f.grandTotal.toLocaleString(),l.style.color="var(--accent-cyan)",l.classList.remove("pop-bounce")},200)}}},On=()=>{if(!p)return;const e=_t(),t=JSON.parse(localStorage.getItem("beacon_bookings"))||[],a=t.findIndex(m=>m.id===p.bookingId);a!==-1&&(t[a].status="🟡 PAYMENT VERIFICATION PENDING",t[a].progress=100,t[a].progressDesc="Payment details submitted for verification",t[a].state.status="🟡 PAYMENT VERIFICATION PENDING"),localStorage.setItem("beacon_bookings",JSON.stringify(t)),Ze();const n="wanderworld@upi",o="WanderWorld Travels",s="₹"+e.grandTotal.toLocaleString(),i=document.getElementById("checkout-payable-amount"),d=document.getElementById("checkout-package-title"),c=document.getElementById("checkout-booking-id"),g=document.getElementById("checkout-upi-display"),u=document.getElementById("checkout-note-display"),r=document.getElementById("checkout-qr-code");if(i&&(i.innerText=s),d&&(d.innerText=p.pkg.title),c&&(c.innerText=p.bookingId),g&&(g.innerText=n),u&&(u.innerText=p.bookingId),r){const m=`upi://pay?pa=${n}&pn=${encodeURIComponent(o)}&am=${e.grandTotal}&tn=${p.bookingId}`;r.src=`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(m)}`}const h=document.getElementById("checkout-payment-modal");h&&(h.style.display="flex"),Y("bookings",!0)},Gn=e=>{const t=JSON.parse(localStorage.getItem("beacon_bookings"))||[],a=t.find(n=>n.id===e);a&&(a.status="Confirmed",J(a),localStorage.setItem("beacon_bookings",JSON.stringify(t)),showToast("🎉 Payment verified! Booking Confirmed & Receipt generated."),Ze())},ln=e=>{const a=(JSON.parse(localStorage.getItem("beacon_bookings"))||[]).find(u=>u.id===e);if(!a||!a.receiptSnapshot){showToast("⚠️ Receipt snapshot details not available.");return}const n=a.receiptSnapshot,o=n.planner,s=n.pricing,i=document.getElementById("view-receipt-viewer");if(!i)return;i.innerHTML=`
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
                        ${o.logo?`<img src="${o.logo}" alt="Planner Logo" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1px solid #cbd5e1; margin-bottom: 10px;">`:""}
                        <h1 style="font-size: 20px; font-weight: 900; margin: 0; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">${o.name}</h1>
                        <span style="font-size: 11px; color: #64748b; font-style: italic; display: block; margin-top: 3px;">Creating journeys worth remembering</span>
                        
                        <div style="font-size: 11.5px; color: #475569; margin-top: 10px; line-height: 1.5;">
                            <span>${o.address}</span><br>
                            <span>Phone: ${o.phone} | Email: ${o.email}</span>
                            ${o.gstRegistered?`<br><strong style="color: #0f172a; display:inline-block; margin-top:4px;">GSTIN: ${o.gstin}</strong>`:""}
                        </div>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">

                    <!-- 2. Document Title & Basic Info -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px; margin-bottom: 24px;">
                        <div>
                            <h2 style="font-size: 15px; font-weight: 900; color: #0f172a; text-transform: uppercase; margin: 0 0 6px 0;">
                                ${o.gstRegistered?"TAX INVOICE / RECEIPT":"PAYMENT RECEIPT"}
                            </h2>
                            <div style="font-size: 11.5px; color: #475569; line-height: 1.45;">
                                <span>Receipt No: <strong>${n.receiptNo}</strong></span><br>
                                <span>Booking ID: <strong>${n.bookingId}</strong></span>
                            </div>
                        </div>
                        <div style="text-align: right; font-size: 11.5px; color: #475569; line-height: 1.45;">
                            <span>Payment Status: <strong style="color:#22c55e;">${n.paymentStatus}</strong></span><br>
                            <span>Payment Date: ${n.paymentDate}</span><br>
                            <span>Booking Date: ${n.bookingDate}</span>
                        </div>
                    </div>

                    <!-- 3. Customer & Trip Details Row -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #f1f5f9;">
                        <div>
                            <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Billed / Booked For</h4>
                            <div style="font-size: 12px; color: #1e293b; line-height: 1.45;">
                                <strong style="color: #0f172a;">${n.customer.name}</strong><br>
                                <span>Phone: ${n.customer.phone}</span><br>
                                <span>Email: ${n.customer.email}</span>
                            </div>
                        </div>
                        <div>
                            <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Trip Details</h4>
                            <div style="font-size: 12px; color: #1e293b; line-height: 1.45;">
                                <strong style="color: #0f172a;">${n.trip.packageTitle}</strong><br>
                                <span>Destination: ${n.trip.destination}</span><br>
                                <span>Dates: ${n.trip.dates}</span><br>
                                <span>Duration: ${n.trip.duration}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Travellers List -->
                    <div style="margin-bottom: 24px;">
                        <h4 style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">Travellers</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">
                            ${n.travellers.map((u,r)=>`
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
                                <strong style="color:#0f172a;">${n.customizations.stay}</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span>Vehicle Transport:</span>
                                <strong style="color:#0f172a;">${n.customizations.transport}</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; flex-direction:column; gap:4px; border-top:1px dashed #e2e8f0; padding-top:6px;">
                                <span>Meal Preferences:</span>
                                <div style="display:flex; flex-direction:column; gap:2px; padding-left:10px; margin-top:2px;">
                                    ${n.customizations.meals.map(u=>`<span>• ${u.name}: <strong>${u.pref}</strong></span>`).join("")}
                                </div>
                            </div>
                            ${n.customizations.addons.length>0?`
                                <div style="display:flex; justify-content:space-between; border-top:1px dashed #e2e8f0; padding-top:6px;">
                                    <span>Selected Add-ons:</span>
                                    <strong style="color:#0f172a;">${n.customizations.addons.join(", ")}</strong>
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
                                ${o.gstRegistered?`
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
                            <strong style="color:#0f172a;">${n.utrId}</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <span>Verification Status:</span>
                            <strong style="color:#22c55e;">${n.verification}</strong>
                        </div>
                        <span style="font-size:10px; color:#64748b; display:block; margin-top:6px; font-style:italic;">
                            "This receipt confirms payment recorded against the above Beacon booking. Package services are provided by the travel partner identified on this receipt."
                        </span>
                    </div>

                    <!-- 8. Planner contacts -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; margin-bottom: 30px; font-size: 11px; color:#64748b; line-height: 1.45;">
                        <strong style="color:#0f172a; text-transform:uppercase; font-size:10px; display:block; margin-bottom:4px;">Need help with your trip?</strong>
                        <span>Travel Partner: <strong>${o.name}</strong></span><br>
                        <span>Support Contact: ${o.phone} | ${o.email}</span>
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
        `,Y("receipt-viewer");const d=document.getElementById("btn-receipt-back");d&&(d.onclick=()=>{Y("bookings",!0)});const c=document.getElementById("btn-receipt-download");c&&(c.onclick=()=>{cn(e)});const g=document.getElementById("btn-receipt-share");g&&(g.onclick=()=>{_n(n)})},cn=e=>{const t=document.getElementById("receipt-invoice-document");if(!t){ln(e),setTimeout(()=>cn(e),100);return}showToast("Generating PDF receipt, please wait...");const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",a.onload=()=>{const n={margin:.3,filename:`Beacon_Receipt_${e}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}};window.html2pdf().from(t).set(n).save().then(()=>{showToast("✅ PDF Receipt downloaded successfully.")})},document.head.appendChild(a)},_n=e=>{navigator.share?navigator.share({title:`Beacon Travel Receipt - ${e.bookingId}`,text:`E-Receipt for booking ${e.bookingId} (${e.trip.packageTitle}). Billed to ${e.customer.name}.`,url:window.location.href}).then(()=>{showToast("✅ Shared receipt successfully.")}).catch(t=>{console.log("Sharing failed:",t)}):(navigator.clipboard.writeText(window.location.href),showToast("📋 Link copied to clipboard to share."))},xt=document.querySelector(".enquiries-unread-dot");window.clearEnquiryNotifications=()=>{xt&&(xt.style.display="none"),localStorage.setItem("beacon_unread_enquiry","false")};const Wn=()=>{xt&&(xt.style.display="block"),localStorage.setItem("beacon_unread_enquiry","true")},Jn=()=>{if(localStorage.getItem("beacon_enquiry_simulated")==="true")return;const e=document.querySelector("#enquiry-ws-1 .message-thread");if(!e)return;const t=document.createElement("div");t.className="msg-bubble planner unread-msg",t.style.borderLeft="3px solid var(--accent-cyan)",t.innerHTML=`
            <div class="msg-sender">Aarav Mehta</div>
            <p>Hi Aditya! I noticed you saved the Goa package as well. Would you like me to compare Spiti and Goa pricing options for you?</p>
            <span class="msg-time">Just now</span>
        `,e.appendChild(t),e.scrollTop=e.scrollHeight,Wn(),showToast("📩 Aarav Mehta (Planner) sent a new message in Enquiries."),localStorage.setItem("beacon_enquiry_simulated","true")},Yn=()=>{const e=localStorage.getItem("beacon_unread_enquiry")==="true",t=localStorage.getItem("beacon_enquiry_simulated")==="true";if(e){if(xt&&(xt.style.display="block"),t){const a=document.querySelector("#enquiry-ws-1 .message-thread");if(a&&!a.querySelector(".unread-msg")){const n=document.createElement("div");n.className="msg-bubble planner unread-msg",n.style.borderLeft="3px solid var(--accent-cyan)",n.innerHTML=`
                        <div class="msg-sender">Aarav Mehta</div>
                        <p>Hi Aditya! I noticed you saved the Goa package as well. Would you like me to compare Spiti and Goa pricing options for you?</p>
                        <span class="msg-time">Just now</span>
                    `,a.appendChild(n),a.scrollTop=a.scrollHeight}}}else setTimeout(Jn,6e3)},Kn=()=>{const e=document.getElementById("enquiry-ws-1");if(!e)return;const t=e.querySelector(".message-composer input"),a=e.querySelector(".message-composer button"),n=e.querySelector(".message-thread"),o=()=>{const s=t.value.trim();if(!s)return;const i=document.createElement("div");i.className="msg-bubble user",i.innerHTML=`
                <div class="msg-sender">You</div>
                <p>${s}</p>
                <span class="msg-time">Just now</span>
            `,n.appendChild(i),t.value="",n.scrollTop=n.scrollHeight,setTimeout(()=>{const d=document.createElement("div");d.className="msg-bubble planner",d.innerHTML=`
                    <div class="msg-sender">Aarav Mehta</div>
                    <p>Got it! I will update the itinerary details accordingly and get back to you shortly.</p>
                    <span class="msg-time">Just now</span>
                `,n.appendChild(d),n.scrollTop=n.scrollHeight,showToast("📩 Aarav Mehta (Planner) replied to your message.")},2e3)};a&&t&&(a.onclick=o,t.onkeydown=s=>{s.key==="Enter"&&o()})};Yn(),Kn();function Xn(){const e=document.getElementById("trip-update-card"),t=document.getElementById("accept-trip-update"),a=document.getElementById("decline-trip-update");t&&t.addEventListener("click",()=>{showToast("✅ Trip Update Accepted! Your booking details have been auto-updated to Himachal Expedition."),e&&(e.style.transition="all 0.4s ease",e.style.opacity="0",setTimeout(()=>{e.style.display="none"},400));const u=document.querySelector(".booking-detailed-card h3");u&&(u.textContent="Himachal Expedition (Standard)");const r=document.querySelector(".booking-preview-card .preview-card-title");r&&(r.textContent="Himachal Expedition (Standard)")}),a&&a.addEventListener("click",()=>{showToast("❌ Trip Update Declined. The planner will contact you shortly."),e&&(e.style.transition="all 0.4s ease",e.style.opacity="0",setTimeout(()=>{e.style.display="none"},400))});const n=document.getElementById("traveller-package-change-modal"),o=document.getElementById("request-change-pkg-btn"),s=document.getElementById("close-change-pkg-modal"),i=document.getElementById("btn-cancel-pkg-change"),d=document.getElementById("btn-submit-pkg-change");let c=0;window.selectPackageChangeOpt=function(u,r){document.querySelectorAll(".pkg-change-opt").forEach(m=>{m.style.background="rgba(255,255,255,0.01)",m.style.borderColor="rgba(255,255,255,0.08)"}),u.style.background="rgba(0, 212, 255, 0.05)",u.style.borderColor="var(--accent-cyan)",c=r},o&&n&&o.addEventListener("click",u=>{u.preventDefault(),n.style.display="flex"});const g=()=>{n&&(n.style.display="none")};s&&(s.onclick=g),i&&(i.onclick=g),d&&d.addEventListener("click",()=>{showToast(`📨 Package Change Request submitted successfully! Price Difference: ${c>=0?"+":""}₹${c}.`),g()})}function Qn(){var ge,l,f,x,A,ie,ue,it,qe;const e=document.getElementById("btn-open-support-center"),t=document.getElementById("btn-back-from-support"),a=document.getElementById("btn-open-emergency-support"),n=document.getElementById("close-support-emergency-btn"),o=document.getElementById("support-emergency-modal"),s=document.getElementById("btn-trigger-raise-ticket"),i=document.getElementById("btn-support-chat-option"),d=document.getElementById("close-support-wizard-btn"),c=document.getElementById("support-ticket-wizard-modal"),g=document.getElementById("wizard-category"),u=document.getElementById("tab-my-tickets");e&&e.addEventListener("click",()=>{Y("support-center")}),t&&t.addEventListener("click",()=>{Y("profile")}),a&&o&&a.addEventListener("click",()=>{o.style.display="flex"}),n&&o&&n.addEventListener("click",()=>{o.style.display="none"});const r=document.querySelectorAll(".support-tab-btn"),h=document.querySelectorAll(".support-pane-content");r.forEach(B=>{B.addEventListener("click",()=>{r.forEach($=>{$.classList.remove("active"),$.style.color="var(--text-slate)",$.style.borderBottom="none",$.style.fontWeight="600"}),B.classList.add("active"),B.style.color="var(--accent-cyan)",B.style.borderBottom="2px solid var(--accent-cyan)",B.style.fontWeight="800";const L=B.dataset.supportTarget;h.forEach($=>{$.id===L?$.style.display="block":$.style.display="none"}),L==="support-tickets-pane"&&Z()})});const m=[{cat:"Booking",q:"How do I cancel my booking?",a:'You can request cancellation directly from the "Trips" panel. Depending on the planner policies, refunds are calculated and credited back to your original source payee account.'},{cat:"Payments",q:"My transaction succeeded but booking is pending. What to do?",a:"UPI syncs may experience latency during high replication loads. If status doesn't update in 10 minutes, raise a ticket or call direct SOS hotline."},{cat:"Refunds",q:"How long does a refund credit take?",a:"Refund actions are processed by the tour planner within 24 hours. The banking gateway standard routing takes 3 to 5 business days."},{cat:"Safety",q:"What happens if a tour guide is unreachable?",a:"Trigger the emergency hotline or WhatsApp Coordinator. Beacon administrators will track the group coordination using guide satellite telemetry."}],v=["All","Booking","Payments","Refunds","Safety"],y=document.getElementById("kb-categories-wrap"),b=document.getElementById("kb-faqs-wrap");let I="All";const E=()=>{var $;if(!b)return;b.innerHTML="";const B=(($=document.getElementById("kb-search-input"))==null?void 0:$.value.toLowerCase())||"";m.filter(O=>{const ce=I==="All"||O.cat===I,W=O.q.toLowerCase().includes(B)||O.a.toLowerCase().includes(B);return ce&&W}).forEach((O,ce)=>{const W=document.createElement("div");W.style.background="rgba(255,255,255,0.02)",W.style.border="1px solid rgba(255,255,255,0.08)",W.style.borderRadius="8px",W.style.overflow="hidden",W.innerHTML=`
                    <div class="faq-header" style="padding: 12px 15px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 13px; color: #fff;">
                        <span>Q: ${O.q}</span>
                        <span class="faq-arrow" style="font-size: 10px; transition: transform 0.2s;">▼</span>
                    </div>
                    <div class="faq-body" style="display: none; padding: 12px 15px; border-t: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: var(--text-slate); line-height: 1.5; background: rgba(0,0,0,0.15);">
                        ${O.a}
                    </div>
                `;const Ie=W.querySelector(".faq-header"),Le=W.querySelector(".faq-body"),w=W.querySelector(".faq-arrow");Ie.addEventListener("click",()=>{const k=Le.style.display==="block";Le.style.display=k?"none":"block",w.style.transform=k?"rotate(0deg)":"rotate(180deg)"}),b.appendChild(W)})};y&&(y.innerHTML="",v.forEach(B=>{const L=document.createElement("span");L.innerText=B,L.style.padding="5px 12px",L.style.borderRadius="20px",L.style.fontSize="11px",L.style.fontWeight="700",L.style.cursor="pointer",L.style.border="1px solid rgba(255,255,255,0.08)",(()=>{I===B?(L.style.background="var(--accent-cyan)",L.style.color="var(--bg-dark)",L.style.borderColor="var(--accent-cyan)"):(L.style.background="rgba(255,255,255,0.02)",L.style.color="#fff",L.style.borderColor="rgba(255,255,255,0.08)")})(),L.addEventListener("click",()=>{I=B,document.querySelectorAll("#kb-categories-wrap span").forEach(O=>{O.style.background="rgba(255,255,255,0.02)",O.style.color="#fff",O.style.borderColor="rgba(255,255,255,0.08)"}),L.style.background="var(--accent-cyan)",L.style.color="var(--bg-dark)",L.style.borderColor="var(--accent-cyan)",E()}),y.appendChild(L)}));const P=document.getElementById("kb-search-input");P&&P.addEventListener("input",E),E();const T=["Booking Issue","Payment Issue","Refund Request","Package Change","Cancellation","Planner Complaint","Safety Concern","General Question","Other"];g&&(g.innerHTML="",T.forEach(B=>{const L=document.createElement("option");L.value=B,L.innerText=B,g.appendChild(L)}));let C="Low",j=1;const le=()=>{c&&(j=1,R(),c.style.display="flex")};s&&s.addEventListener("click",le),i&&i.addEventListener("click",le),d&&c&&d.addEventListener("click",()=>{c.style.display="none"});const U=document.querySelectorAll(".priority-select-btn");U.forEach(B=>{B.addEventListener("click",()=>{U.forEach($=>{$.style.background="rgba(255,255,255,0.02)",$.style.borderColor="rgba(255,255,255,0.08)",$.style.color="#fff"}),B.style.background="rgba(0, 203, 224, 0.05)",B.style.borderColor="var(--accent-cyan)",B.style.color="var(--accent-cyan)",C=B.dataset.priority;const L=document.getElementById("critical-priority-warning");L&&(L.style.display=C==="Critical"?"block":"none")})});const R=()=>{var L,$;const B=document.getElementById("wizard-step-label");if(B&&(B.innerText=`Step ${j} of 4: Setup details`),document.querySelectorAll(".wizard-pane").forEach((O,ce)=>{O.style.display=ce+1===j?"block":"none"}),j===4){const O=((L=document.getElementById("wizard-subject"))==null?void 0:L.value)||"",ce=(($=document.getElementById("wizard-category"))==null?void 0:$.value)||"",W=document.getElementById("review-subject"),Ie=document.getElementById("review-cat"),Le=document.getElementById("review-priority");W&&(W.innerText=O),Ie&&(Ie.innerText=ce),Le&&(Le.innerText=C)}};(ge=document.getElementById("btn-wizard-next-1"))==null||ge.addEventListener("click",()=>{j=2,R()}),(l=document.getElementById("btn-wizard-back-2"))==null||l.addEventListener("click",()=>{j=1,R()}),(f=document.getElementById("btn-wizard-next-2"))==null||f.addEventListener("click",()=>{j=3,R()}),(x=document.getElementById("btn-wizard-back-3"))==null||x.addEventListener("click",()=>{j=2,R()}),(A=document.getElementById("btn-wizard-next-3"))==null||A.addEventListener("click",()=>{var $,O;const B=(($=document.getElementById("wizard-subject"))==null?void 0:$.value)||"",L=((O=document.getElementById("wizard-desc"))==null?void 0:O.value)||"";if(!B.trim()||!L.trim()){alert("Please enter Subject and Description details.");return}j=4,R()}),(ie=document.getElementById("btn-wizard-back-4"))==null||ie.addEventListener("click",()=>{j=3,R()});let G=[{id:"BCN-SUP-2026-000201",subject:"Double charged on Kashmir Honeymoon booking",category:"Payment Issue",priority:"High",status:"In Progress",createdDate:"2026-07-31 10:20 AM",description:"I initiated two transactions due to first one returning a network gateway error. Both payments are success in my bank diary.",timeline:[{status:"Ticket Created",date:"2026-07-31 10:20 AM",by:"You"},{status:"Assigned",date:"2026-07-31 10:30 AM",by:"System"},{status:"In Progress",date:"2026-07-31 11:00 AM",by:"Siddharth Roy"}],conversations:[{sender:"Traveler",message:"Hello, I paid twice. Please verify refund options.",time:"10:20 AM"},{sender:"Support",message:"Hi Aditya, checking logs. Yes, we see two duplicate UPI credits. Initiating refund for the duplicate transaction.",time:"11:00 AM"}]}],H=null;(ue=document.getElementById("btn-wizard-submit"))==null||ue.addEventListener("click",()=>{const B=document.getElementById("wizard-subject").value,L=document.getElementById("wizard-desc").value,$=document.getElementById("wizard-category").value;document.getElementById("wizard-bkg-id").value;const O={id:`BCN-SUP-2026-000${202+G.length}`,subject:B,category:$,priority:C,status:"Open",createdDate:"Just now",description:L,timeline:[{status:"Ticket Created",date:"Just now",by:"You"}],conversations:[{sender:"Traveler",message:L,time:"Just now"}]};G.push(O),c&&(c.style.display="none"),document.getElementById("wizard-subject").value="",document.getElementById("wizard-desc").value="",document.getElementById("wizard-bkg-id").value="",showToast(`🎫 Ticket ${O.id} created successfully!`),u&&u.click()});const Z=()=>{const B=document.getElementById("customer-tickets-container");B&&(B.innerHTML="",G.forEach(L=>{const $=document.createElement("div");$.style.background=H===L.id?"rgba(0, 203, 224, 0.05)":"rgba(255,255,255,0.01)",$.style.border=H===L.id?"2.5px solid var(--accent-cyan)":"1px solid rgba(255,255,255,0.08)",$.style.borderRadius="8px",$.style.padding="12px",$.style.cursor="pointer",$.style.textAlign="left",$.innerHTML=`
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-family: monospace; font-size: 10px; color: var(--accent-cyan); font-weight: 700;">${L.id}</span>
                        <span style="font-size: 9px; font-weight: 800; background: rgba(255,255,255,0.05); padding: 1px 6px; border-radius: 4px; color: ${L.priority==="Critical"?"#ef4444":"#fff"};">${L.priority}</span>
                    </div>
                    <h5 style="font-size: 12px; font-weight: 800; color: #fff; margin: 0 0 4px 0; line-clamp: 1; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${L.subject}</h5>
                    <div style="font-size: 10px; color: var(--text-slate);">Status: <strong style="color: #fff;">${L.status}</strong></div>
                `,$.addEventListener("click",()=>{H=L.id,Z(),oe(L)}),B.appendChild($)}))},oe=B=>{const L=document.getElementById("customer-chat-placeholder"),$=document.getElementById("customer-chat-workspace");L&&(L.style.display="none"),$&&($.style.display="block"),document.getElementById("active-chat-id").innerText=B.id,document.getElementById("active-chat-subject").innerText=B.subject;const O=document.getElementById("active-chat-status");O&&(O.innerText=B.status,O.style.background=B.status==="Resolved"||B.status==="Closed"?"#10b981":"#f59e0b",O.style.color="#fff");const ce=document.getElementById("customer-timeline-trace");ce&&(ce.innerHTML="",B.timeline.forEach(w=>{const k=document.createElement("span");k.innerText=`✓ ${w.status} (${w.date.includes("AM")||w.date.includes("PM")?w.date.split(" ")[1]:w.date})`,k.style.background="rgba(255,255,255,0.05)",k.style.padding="2px 6px",k.style.borderRadius="4px",ce.appendChild(k)}));const W=document.getElementById("customer-chat-messages");W&&(W.innerHTML="",B.conversations.forEach(w=>{const k=document.createElement("div"),N=w.sender==="Support";k.style.maxWidth="80%",k.style.padding="8px 12px",k.style.borderRadius="10px",k.style.fontSize="12px",k.style.lineHeight="1.4",N?(k.style.background="rgba(0, 203, 224, 0.08)",k.style.border="1px solid rgba(0, 203, 224, 0.15)",k.style.alignSelf="flex-start",k.style.color="#fff",k.innerHTML=`<span style="font-size: 8px; color: var(--accent-cyan); display: block; font-weight: 800; margin-bottom: 2px;">Support Coordinator</span>${w.message}`):(k.style.background="rgba(255,255,255,0.04)",k.style.border="1px solid rgba(255,255,255,0.08)",k.style.alignSelf="flex-end",k.style.color="#fff",k.innerHTML=`<span style="font-size: 8px; color: var(--text-slate); display: block; font-weight: 800; margin-bottom: 2px;">You</span>${w.message}`),W.appendChild(k)}),W.scrollTop=W.scrollHeight);const Ie=document.getElementById("customer-reply-input"),Le=document.getElementById("btn-send-customer-reply");Ie&&Le&&(B.status==="Closed"?(Ie.disabled=!0,Ie.placeholder="🚫 Ticket is Closed",Le.disabled=!0):(Ie.disabled=!1,Ie.placeholder="Type message reply...",Le.disabled=!1))};(it=document.getElementById("btn-send-customer-reply"))==null||it.addEventListener("click",()=>{const B=document.getElementById("customer-reply-input");if(!B||!B.value.trim()||!H)return;const L=B.value;B.value="";const $=G.find(O=>O.id===H);$&&($.conversations.push({sender:"Traveler",message:L,time:"Just now"}),oe($),setTimeout(()=>{$.conversations.push({sender:"Support",message:"Hello, we have received your update. The support operations desk has queued this for verification.",time:"Just now"}),oe($),showToast("🔔 New message from support team.")},1500))});const Me=document.querySelectorAll(".csat-star-btn");let De=5;Me.forEach(B=>{B.addEventListener("click",()=>{De=parseInt(B.dataset.star),Me.forEach(L=>{const $=parseInt(L.dataset.star);L.style.opacity=$<=De?"1":"0.3"})})}),(qe=document.getElementById("btn-submit-csat"))==null||qe.addEventListener("click",()=>{const B=document.getElementById("support-csat-modal");B&&(B.style.display="none"),showToast("🌟 Thank you for rating Beacon Support experience!"),document.getElementById("csat-comment-input").value=""}),window.triggerCsatDialog=function(){const B=document.getElementById("support-csat-modal");B&&(B.style.display="flex")},window.triggerTestAlarm=(B="started")=>{const L="₹12,500",$="BCN-2026-TESTALARM",O="Rahul Sharma",ce=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),W=`PAY-${Math.floor(1e4+Math.random()*9e4)}`;B==="started"?(ut("started"),Tt("Beacon payment alert. A payment of twelve thousand five hundred rupees has been initiated."),Bt(`Payment initiated: ${L}`,"started",$,L),Ut("🔔 PAYMENT IN PROGRESS","Payment Started",$,L,O,ce,"started",W)):(ut("verification"),Tt("Beacon payment alert. The customer has marked a payment of twelve thousand five hundred rupees as completed. Please check your account and confirm the payment."),Bt(`Payment verification required: ${L}`,"verification",$,L),Ut("⚠️ PAYMENT VERIFICATION REQUIRED","Verification Needed",$,L,O,ce,"verification",W)),showToast(`🔔 Test Alarm (${B}) triggered!`)}}Qn(),Xn();const Sa=new URLSearchParams(window.location.search).get("test_alarm");(Sa==="started"||Sa==="verification")&&setTimeout(()=>{window.triggerTestAlarm(Sa)},2e3)});
