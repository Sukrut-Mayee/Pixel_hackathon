document.addEventListener('DOMContentLoaded', function () {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Loader Elements
    const loaderPage = document.getElementById('loader-page');
    const loaderCounter = document.getElementById('loader-counter');
    const loadingBar = document.getElementById('loading-bar');
    
    // The main homepage content container
    const mainHomepage = document.getElementById('main-homepage');
    
    // Get references to elements for animation
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    const headerLeftList = document.querySelector('.header-left-list');

    // Get reference to the global background element
    const headerBg = document.getElementById('header-bg');

    // Modal elements
    const mountainModalOverlay = document.getElementById('mountain-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalMountainTitle = document.getElementById('modal-mountain-title');
    const modalMountainDescription = document.getElementById('modal-mountain-description');

    // Get the main grid container (where continent sections will be added)
    const mountainCardsGrid = document.getElementById('mountain-cards-grid');

    // Navigation button
    const nextSectionBtn = document.getElementById('next-section-btn');

    // Array to store all scrollable section elements (header, intro, continent sections, footer)
    let scrollableSections = [];
    let currentSectionIndex = 0;

    // State variable: Stores the CLASS SUFFIX of the image that was last clicked, for persistence.
    // Initialized to 'default' so it's always the fallback.
    let currentSelectedMountainImageClassSuffix = 'default'; 

    // Comprehensive data for all mountains and special carousel entry
    const allMountainsData = [
        // Asia
        {
            name: "Mount Everest",
            description: "Mount Everest, Earth's highest mountain above sea level, is located in the Mahalangur Himal sub-range of the Himalayas. Its peak is **8,848.86 metres (29,031.7 ft)** above sea level. It is a majestic and challenging peak, attracting climbers from all over the world. The first confirmed ascent was by Tenzing Norgay and Edmund Hillary in 1953. Climbing Everest presents extreme hazards suchs as altitude sickness, weather, and wind, but it remains a pinnacle of mountaineering achievement.",
            image: "./images/mountain-2.jpg",
            tag: "Himalayas",
            elevation: "8,848.86 m",
            headerImageSuffix: "2",
            continent: "Asia",
            type: "mountain",
            size: "large" // Make this one larger
        },
        // Carousel for Asia - placed after Mount Everest for layout
        {
            name: "Asia Highlights", // Name for the carousel, not a mountain
            type: "carousel",
            continent: "Asia",
            size: "wide", // Changed to 'wide' to make it span 2 columns
            images: [
                { src: "./images/asia-highlight-1.jpg", alt: "Annapurna Massif" },
                { src: "./images/asia-highlight-2.jpg", alt: "Mount Everest Base Camp" },
                { src: "./images/asia-highlight-3.jpg", alt: "Himalayan Peaks" }
            ]
        },
        {
            name: "K2",
            description: "K2, also known as Mount Godwin Austen, is the second-highest mountain in the world, with a peak elevation of **8,611 metres (28,251 ft)** above sea level. It is located in the Karakoram mountain range on the border between Pakistan and China. K2 is renowned for its extreme difficulty and high fatality rate among climbers, earning it the nickname 'Savage Mountain'.",
            image: "./images/mountain-5.jpg",
            tag: "Karakoram",
            elevation: "8,611 m",
            headerImageSuffix: "5",
            continent: "Asia",
            type: "mountain",
            size: "normal"
        },
        {
            name: "Mount Fuji",
            description: "Mount Fuji is Japan's highest mountain, an active stratovolcano located on the island of Honshu. Standing at **3,776.24 meters (12,389 ft)**, it is a sacred mountain and an iconic symbol of Japan, often depicted in art and photography. It is one of Japan's 'Three Holy Mountains' and has been a pilgrimage site for centuries. The climbing season typically runs from early July to mid-September, attracting hundreds of thousands of climbers annually.",
            image: "./images/mountain-4.jpg",
            tag: "Honshu",
            elevation: "3,776 m",
            headerImageSuffix: "4",
            continent: "Asia",
            type: "mountain",
            size: "normal"
        },
        {
            name: "Puncak Jaya",
            description: "Puncak Jaya, also known as Carstensz Pyramid, is the highest mountain in Indonesia, on the island of New Guinea, with an elevation of **4,884 metres (16,024 ft)**. It is the highest peak of the Sudirman Range and the highest island peak in the world. It is one of the more technically challenging climbs among the Seven Summits.",
            image: "./images/mountain-12.jpg",
            tag: "Sudirman Range",
            elevation: "4,884 m",
            headerImageSuffix: "12",
            continent: "Asia",
            type: "mountain",
            size: "normal"
        },
        // Europe
        {
            name: "Mont Blanc",
            description: "Mont Blanc is the highest mountain in the Alps and Western Europe, rising **4,808.7 metres (15,777 ft)** above sea level. It is located between France and Italy and is a popular destination for mountaineering, hiking, and skiing. Its majestic presence dominates the skyline of the Chamonix Valley.",
            image: "./images/mountain-9.jpg",
            tag: "Alps",
            elevation: "4,808 m",
            headerImageSuffix: "9",
            continent: "Europe",
            type: "mountain",
            size: "large" // Make this one larger
        },
        // Carousel for Europe
        {
            name: "Europe Highlights",
            type: "carousel",
            continent: "Europe",
            size: "wide",
            images: [
                { src: "./images/europe-highlight-1.jpg", alt: "Dolomites, Italy" },
                { src: "./images/europe-highlight-2.jpg", alt: "Swiss Alps Panorama" },
                { src: "./images/europe-highlight-3.jpg", alt: "Pyrenees Sunset" }
            ]
        },
        {
            name: "Matterhorn",
            description: "The Matterhorn is a majestic and iconic mountain in the Alps, straddling the border between Switzerland and Italy. Its pyramid-like peak stands at **4,478 metres (14,692 ft)**, making it one of the highest summits in the Alps. It is famous for its distinctive shape and challenging climbs, attracting mountaineers and tourists alike to its picturesque surroundings.",
            image: "./images/mountain-3.jpg",
            tag: "Alps",
            elevation: "4,478 m",
            headerImageSuffix: "3",
            continent: "Europe",
            type: "mountain",
            size: "normal"
        },
        {
            name: "Mount Elbrus",
            description: "Mount Elbrus is the highest mountain in Europe and the tenth-most prominent peak in the world, with an elevation of **5,642 metres (18,510 ft)** above sea level. Located in the Caucasus Mountains in Southern Russia, it is a dormant volcano. Elbrus is a popular destination for mountaineering and skiing, offering stunning views and a relatively accessible high-altitude experience.",
            image: "./images/mountain-8.jpg",
            tag: "Caucasus",
            elevation: "5,642 m",
            headerImageSuffix: "8",
            continent: "Europe",
            type: "mountain",
            size: "normal"
        },
        // Africa
        {
            name: "Mount Kilimanjaro",
            description: "Mount Kilimanjaro is Africa's highest mountain and the world's highest free-standing mountain, rising **5,895 metres (19,341 ft)** above sea level. Located in Tanzania, it is a dormant volcano composed of three distinct cones. Kilimanjaro is a popular trekking destination, offering various routes to its summit, and its diverse ecosystems range from rainforest to alpine desert.",
            image: "./images/mountain-6.jpg",
            tag: "Eastern Rift",
            elevation: "5,895 m",
            headerImageSuffix: "6",
            continent: "Africa",
            type: "mountain",
            size: "large" // Make this one larger
        },
        // Carousel for Africa
        {
            name: "Africa Highlights",
            type: "carousel",
            continent: "Africa",
            size: "wide",
            images: [
                { src: "./images/africa-highlight-1.jpg", alt: "Table Mountain" },
                { src: "./images/africa-highlight-2.jpg", alt: "Simien Mountains" },
                { src: "./images/africa-highlight-3.jpg", alt: "Drakensberg Peaks" }
            ]
        },
        {
            name: "Mount Kenya",
            description: "Mount Kenya is the second highest mountain in Africa and the highest mountain in Kenya, rising **5,199 metres (17,057 ft)** above sea level. It is an extinct stratovolcano, characterized by its jagged peaks and glacial valleys. The area around Mount Kenya is a national park and a UNESCO World Heritage Site, known for its unique afro-alpine flora and diverse wildlife.",
            image: "./images/mountain-13.jpg", 
            tag: "Kenya",
            elevation: "5,199 m",
            headerImageSuffix: "13",
            continent: "Africa",
            type: "mountain",
            size: "normal"
        },
        {
            name: "Mount Toubkal",
            description: "Mount Toubkal is the highest peak in the Atlas Mountains and North Africa, reaching **4,167 metres (13,671 ft)** above sea level. Located in southwestern Morocco, it is a popular trekking destination, especially during spring and summer. The summit offers panoramic views of the High Atlas mountain range and the surrounding plains.",
            image: "./images/mountain-14.jpg", 
            tag: "Atlas Mountains",
            elevation: "4,167 m",
            headerImageSuffix: "14",
            continent: "Africa",
            type: "mountain",
            size: "normal"
        },
        // Americas (Combined North and South America)
        {
            name: "Denali",
            description: "Denali, formerly known as Mount McKinley, is the highest mountain peak in North America, with a summit elevation of **6,190 metres (20,310 ft)** above sea level. It is located in the Alaska Range, it is the centerpiece of Denali National Park and Preserve. Denali is known for its extreme cold, harsh weather conditions, and significant vertical relief, making it a challenging climb for even experienced mountaineers.",
            image: "./images/mountain-1.jpg",
            tag: "Alaska Range",
            elevation: "6,190 m",
            headerImageSuffix: "1",
            continent: "Americas",
            type: "mountain",
            size: "large" // Make this one larger
        },
        // Carousel for Americas
        {
            name: "Americas Highlights",
            type: "carousel",
            continent: "Americas",
            size: "wide",
            images: [
                { src: "./images/americas-highlight-1.jpg", alt: "Patagonia Peaks" },
                { src: "./images/americas-highlight-2.jpg", alt: "Rocky Mountains" },
                { src: "./images/americas-highlight-3.jpg", alt: "Andes Range" }
            ]
        },
        {
            name: "Mount Logan",
            description: "Mount Logan is the highest mountain in Canada and the second-highest peak in North America, reaching **5,959 metres (19,551 ft)** above sea level. It is located in Kluane National Park and Reserve in Yukon. Known for its massive size and glacial activity, Mount Logan is part of the Saint Elias Mountains and presents a formidable challenge to climbers due to its remote location and severe weather.",
            image: "./images/mountain-7.jpg",
            tag: "St. Elias Mountains",
            elevation: "5,959 m",
            headerImageSuffix: "7",
            continent: "Americas",
            type: "mountain",
            size: "normal"
        },
        {
            name: "Mount Rainier",
            description: "Mount Rainier is a large active stratovolcano in the Cascade Range of the Pacific Northwest, located in Washington state. It stands at **4,392 metres (14,411 ft)** above sea level, making it the highest peak in the state. The mountain is heavily glaciated and is a popular destination for mountaineering, hiking, and winter sports.",
            image: "./images/mountain-15.jpg", 
            tag: "Cascade Range",
            elevation: "4,392 m",
            headerImageSuffix: "15",
            continent: "Americas",
            type: "mountain",
            size: "normal"
        },
        {
            name: "Mount Aconcagua",
            description: "Mount Aconcagua is the highest mountain in the Americas, the highest outside Asia, and the highest in both the Southern and Western Hemispheres. Located in the Andes mountain range in Argentina, its summit is **6,961 metres (22,838 ft)** above sea level. It is a popular peak for non-technical high-altitude climbing, though its extreme altitude and challenging weather conditions still require significant preparation and experience. It is often used by climbers as a training ground for Himalayan peaks.",
            image: "./images/mountain-10.jpg",
            tag: "Andes",
            elevation: "6,961 m",
            headerImageSuffix: "10",
            continent: "Americas",
            type: "mountain",
            size: "large" // Make this one larger
        },
        {
            name: "Mount Cotopaxi",
            description: "Mount Cotopaxi is an active stratovolcano in the Andes Mountains, located in Ecuador. It is one of the world's highest active volcanoes, with a summit elevation of **5,897 metres (19,347 ft)**. Its perfectly symmetrical cone shape, capped with a glacier, makes it a visually striking landmark and a challenging climb for experienced mountaineers.",
            image: "./images/mountain-16.jpg", 
            tag: "Andes",
            elevation: "5,897 m",
            headerImageSuffix: "16",
            continent: "Americas",
            type: "mountain",
            size: "normal"
        }
    ];

    // Convert allMountainsData into the mountainData object structure for modal lookup
    // Filter out carousel entries as they don't have descriptions in the same way
    const mountainData = allMountainsData.filter(item => item.type === "mountain").reduce((acc, mountain) => {
        acc[mountain.name] = { description: mountain.description };
        return acc;
    }, {});

    // Images to preload (all images used in the site, including carousel images)
    const imagesToPreload = [];
    allMountainsData.forEach(item => {
        if (item.type === "mountain") {
            imagesToPreload.push(item.image);
        } else if (item.type === "carousel") {
            item.images.forEach(img => imagesToPreload.push(img.src));
        }
    });
    // Add loader video to preload list
    imagesToPreload.push('images/Drone Shot.mp4');

    // Helper function to update background classes
    function updateHeaderBackground(classSuffix) {
        // Dynamically create a list of all possible header-bg-X classes
        const allBgClasses = allMountainsData.filter(item => item.type === "mountain").map(m => `header-bg-${m.headerImageSuffix}`).join(' ');
        headerBg.classList.remove('header-bg-default', ...allBgClasses.split(' '));
        
        if (classSuffix === 'default') {
            headerBg.classList.add('header-bg-default');
        } else {
            headerBg.classList.add(`header-bg-${classSuffix}`);
        }
    }

    // Function to create a single mountain card HTML element
    function createMountainCardElement(mountain) {
        const card = document.createElement('div');
        card.classList.add('mountain-card', 'js-fade-in'); // Add fade-in class
        card.setAttribute('data-mountain-name', mountain.name);

        // Add size class if specified
        if (mountain.size) {
            card.classList.add(mountain.size);
        }

        // Determine the appropriate tag class based on the mountain's tag
        const tagClassMap = {
            'himalayas': 'blue',
            'karakoram': 'purple',
            'alps': 'green',
            'honshu': 'red',
            'alaskarange': 'amber',
            'easternrift': 'sky',
            'st.eliasmountains': 'red', 
            'caucasus': 'green', 
            'andes': 'purple', 
            'kenya': 'blue', 
            'atlasmountains': 'purple', 
            'cascaderange': 'amber', 
            'ellsworthmountains': 'blue', 
            'sudirmanrange': 'amber' 
        };
        const normalizedTag = mountain.tag.replace(/\s/g, '').toLowerCase();
        const tagClassName = tagClassMap[normalizedTag] || 'blue'; // Default to blue if not found

        card.innerHTML = `
            <div class="mountain-image">
                <img src="${mountain.image}" alt="${mountain.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/5A6A7D/FFFFFF?text=${encodeURIComponent(mountain.name)}';">
            </div>
            <div class="card-content">
                <h3 class="card-title">${mountain.name}</h3>
                <p class="card-text">${mountain.description.split('.')[0]}.</p> <!-- Show only first sentence -->
                <div class="card-footer">
                    <span class="tag tag-${tagClassName}">${mountain.tag}</span>
                    <span class="elevation">${mountain.elevation}</span>
                </div>
            </div>
        `;

        // Add click listener for the dynamically created card to show the modal
        card.addEventListener('click', () => {
            const mountainName = card.getAttribute('data-mountain-name');
            const data = mountainData[mountainName];

            // Extract the image suffix for the clicked card's image
            const mountainDetails = allMountainsData.find(m => m.name === mountainName && m.type === "mountain"); // Ensure it's a mountain type
            const clickedImageClassSuffix = mountainDetails ? mountainDetails.headerImageSuffix : 'default';

            currentSelectedMountainImageClassSuffix = clickedImageClassSuffix;
            updateHeaderBackground(clickedImageClassSuffix);

            if (data) {
                modalMountainTitle.textContent = mountainName;
                modalMountainDescription.innerHTML = data.description;
                
                mountainModalOverlay.classList.add('visible');
                headerBg.classList.add('header-bg-blurred');
            }
        });

        return card;
    }

    // Function to create a carousel element
    function createCarouselElement(carouselData) {
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel-card', 'js-fade-in'); // Use carousel-card class
        carouselContainer.setAttribute('data-carousel-name', carouselData.name);
        if (carouselData.size) {
            carouselContainer.classList.add(carouselData.size);
        }

        let currentSlide = 0;
        const images = carouselData.images;

        const carouselImageWrapper = document.createElement('div');
        carouselImageWrapper.classList.add('carousel-image-wrapper');
        const carouselImage = document.createElement('img');
        carouselImage.classList.add('carousel-image');
        carouselImage.src = images[currentSlide].src;
        carouselImage.alt = images[currentSlide].alt;
        carouselImage.onerror = function() { this.onerror=null; this.src='https://placehold.co/400x400/5A6A7D/FFFFFF?text=Image+Error'; };
        carouselImageWrapper.appendChild(carouselImage);
        carouselContainer.appendChild(carouselImageWrapper);

        // Navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.classList.add('carousel-nav-btn', 'prev');
        prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>';
        carouselContainer.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.classList.add('carousel-nav-btn', 'next');
        nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>';
        carouselContainer.appendChild(nextBtn);

        // Pagination dots
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('carousel-dots');
        const dots = [];

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function showSlide(index) {
            currentSlide = (index + images.length) % images.length;
            carouselImage.src = images[currentSlide].src;
            carouselImage.alt = images[currentSlide].alt;
            updateDots();
        }

        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
        carouselContainer.appendChild(dotsContainer);

        updateDots(); // Initialize dots

        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

        return carouselContainer;
    }


    // Function to load and append all mountain cards, categorized by continent
    function loadAllMountainsCategorized() {
        // Clear existing content
        mountainCardsGrid.innerHTML = ''; 

        // Group mountains and carousels by continent
        const itemsByContinent = allMountainsData.reduce((acc, item) => {
            if (!acc[item.continent]) {
                acc[item.continent] = [];
            }
            acc[item.continent].push(item);
            return acc;
        }, {});

        // Define a preferred order for continents
        const continentOrder = ["Asia", "Europe", "Africa", "Americas"]; 

        // Add the main sections to the scrollableSections array
        // Clear scrollableSections array before re-populating it
        scrollableSections = [];
        currentSectionIndex = 0; // Reset index

        scrollableSections.push(document.getElementById('header-section'));
        scrollableSections.push(document.getElementById('intro-section')); 

        continentOrder.forEach((continentName, index) => {
            const itemsInContinent = itemsByContinent[continentName];
            if (itemsInContinent && itemsInContinent.length > 0) {
                const continentSection = document.createElement('div');
                continentSection.classList.add('continent-section');
                continentSection.id = `${continentName.toLowerCase()}-mountains-section`; 
                
                const continentTitle = document.createElement('h2');
                continentTitle.classList.add('continent-title');
                continentTitle.textContent = `${continentName} Mountains`;
                continentSection.appendChild(continentTitle);

                const continentGrid = document.createElement('div');
                continentGrid.classList.add('continent-grid');
                
                itemsInContinent.forEach(item => {
                    let element;
                    if (item.type === "mountain") {
                        element = createMountainCardElement(item);
                    } else if (item.type === "carousel") {
                        element = createCarouselElement(item);
                    }
                    if (element) {
                        continentGrid.appendChild(element);
                        // Add new element to the observer for fade-in effect
                        observer.observe(element);
                    }
                });
                continentSection.appendChild(continentGrid);
                mountainCardsGrid.appendChild(continentSection);

                // Add this dynamically created continent section to the scrollableSections array
                scrollableSections.push(continentSection);
            }
        });

        // Add the footer to the scrollableSections array
        scrollableSections.push(document.getElementById('footer-section'));
    }

    // Function to preload images
    function preloadImages(imageUrls, callback) {
        let loadedCount = 0;
        const totalImages = imageUrls.length;

        if (totalImages === 0) {
            callback();
            return;
        }

        imageUrls.forEach(url => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    callback(); // All images loaded
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${url}`);
                loadedCount++; // Still count as loaded to avoid blocking
                if (loadedCount === totalImages) {
                    callback();
                }
            };
            img.src = url;
        });
    }

    // Handle the transition from the loader to the main page
    function handleTransition() {
        // Start the loader's fade-out animation
        loaderPage.classList.add('fade-out'); // This triggers the 2s opacity transition

        // After the loader's fade-out completes, hide it and show the main homepage
        setTimeout(() => {
            loaderPage.style.display = 'none'; // Hide loader after its transition
            mainHomepage.style.opacity = 1; // This will now transition due to CSS below
            document.body.style.overflow = 'auto'; // Re-enable body scrolling

            // Trigger header animations after main page is visible
            setTimeout(() => {
                if (mainTitle) mainTitle.classList.add('animate-in');
            }, 500); // Title floats in after 0.5s

            setTimeout(() => {
                if (subtitle) subtitle.classList.add('animate-in');
            }, 800); // Subtitle floats in after 0.8s

            setTimeout(() => {
                if (headerLeftList) headerLeftList.classList.add('animate-in');
            }, 1200); // Left list fades in after 1.2s
            
        }, 2050); // Slightly more than 2 seconds to ensure loader fade-out completes
    }

    // The multi-phase counter for a smoother, more aesthetic countdown
    function runCounter() {
        const phases = [
            { start: 0, end: 70, duration: 2000 },
            { start: 70, end: 90, duration: 2500 },
            { start: 90, end: 100, duration: 3500 }
        ];
        
        let currentPhase = 0;
        let startTimestamp = null;
        let startPercentage = 0;

        function animate(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;

            const progress = timestamp - startTimestamp;
            const currentPhaseData = phases[currentPhase];

            const currentDuration = currentPhaseData.duration;
            const progressRatio = Math.min(progress / currentDuration, 1);
            
            const currentPercentage = startPercentage + (currentPhaseData.end - startPercentage) * progressRatio;
            
            loaderCounter.textContent = `${Math.floor(currentPercentage)}%`;
            loadingBar.style.width = `${currentPercentage}%`;

            if (progressRatio === 1) {
                if (currentPhase < phases.length - 1) {
                    currentPhase++;
                    startTimestamp = null;
                    startPercentage = currentPhaseData.end;
                    requestAnimationFrame(animate);
                } else {
                    handleTransition();
                }
            } else {
                requestAnimationFrame(animate);
            }
        }
        
        // Start the counter
        requestAnimationFrame(animate);
    }
    
    // Set the default background image via class immediately on DOMContentLoaded
    updateHeaderBackground(currentSelectedMountainImageClassSuffix);

    // Preload images before starting the counter
    preloadImages(imagesToPreload, () => {
        runCounter();
        // Load all mountains after loader is done
        loadAllMountainsCategorized(); 
    });

    // Mountain background change on hover and click for pop-up (for header list)
    const mountainBoxes = document.querySelectorAll('.mountain-box');

    mountainBoxes.forEach(box => {
        box.addEventListener('mouseover', () => {
            const mountainName = box.getAttribute('data-mountain-name');
            const mountainDetails = allMountainsData.find(m => m.name === mountainName && m.type === "mountain"); // Ensure it's a mountain type
            const newImageClassSuffix = mountainDetails ? mountainDetails.headerImageSuffix : 'default';
            
            updateHeaderBackground(newImageClassSuffix);
            
            if (!mountainModalOverlay.classList.contains('visible')) {
                headerBg.classList.remove('header-bg-blurred'); 
            }
        });

        box.addEventListener('mouseout', () => {
            if (mountainModalOverlay.classList.contains('visible')) {
                return;
            }

            updateHeaderBackground(currentSelectedMountainImageClassSuffix); 
            
            headerBg.classList.remove('header-bg-blurred');
        });

        box.addEventListener('click', () => {
            const mountainName = box.getAttribute('data-mountain-name');
            const mountainDetails = allMountainsData.find(m => m.name === mountainName && m.type === "mountain"); // Ensure it's a mountain type
            const clickedImageClassSuffix = mountainDetails ? mountainDetails.headerImageSuffix : 'default';
            
            const data = mountainData[mountainName];

            currentSelectedMountainImageClassSuffix = clickedImageClassSuffix; 
            updateHeaderBackground(clickedImageClassSuffix);

            if (data) {
                modalMountainTitle.textContent = mountainName;
                modalMountainDescription.innerHTML = data.description;
                
                mountainModalOverlay.classList.add('visible');
                headerBg.classList.add('header-bg-blurred');
            }
        });
    });

    // Close modal functionality
    modalCloseBtn.addEventListener('click', () => {
        mountainModalOverlay.classList.remove('visible');
        headerBg.classList.remove('header-bg-blurred');
        
        currentSelectedMountainImageClassSuffix = 'default';
        updateHeaderBackground('default'); 
    });

    // Fade-in-on-scroll functionality (existing code, now observes all elements)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);


    // Smooth scroll to next section logic
    function scrollToNextSection() {
        currentSectionIndex++;
        if (currentSectionIndex >= scrollableSections.length) {
            currentSectionIndex = 0; // Loop back to the first section (header)
        }
        scrollableSections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    }

    // Event listener for the "Next Section" button
    if (nextSectionBtn) {
        nextSectionBtn.addEventListener('click', scrollToNextSection);
    }

    // Optional: Add keyboard navigation (arrow down/up)
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault(); // Prevent default scroll behavior
            scrollToNextSection();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault(); // Prevent default scroll behavior
            currentSectionIndex--;
            if (currentSectionIndex < 0) {
                currentSectionIndex = scrollableSections.length - 1; // Loop back to the last section
            }
            scrollableSections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Optional: Update currentSectionIndex based on scroll position (for more robust navigation)
    // This is more complex and might involve an IntersectionObserver on each section
    // For now, the button and arrow keys provide explicit control.
});
