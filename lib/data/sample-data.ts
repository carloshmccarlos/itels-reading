import type { Article, Category } from "@/lib/generated/prisma";

export const categories: Category[] = [
	{
		id: "cat-1",
		name: "Natural Geography",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-2",
		name: "Plant Research",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-3",
		name: "Animal Protection",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-4",
		name: "Space Exploration",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-5",
		name: "School Education",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-6",
		name: "Technological Invention",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-7",
		name: "Culture & History",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-8",
		name: "Language Evolution",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-9",
		name: "Entertainment & Sports",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-10",
		name: "Objects & Materials",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-11",
		name: "Fashion Trends",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-12",
		name: "Diet & Health",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-13",
		name: "Architecture & Places",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-14",
		name: "Transportation & Travel",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-15",
		name: "National Government",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-16",
		name: "Society & Economy",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-17",
		name: "Laws and Regulations",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-18",
		name: "Battlefield & Contention",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-19",
		name: "Social Roles",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-20",
		name: "Behavior & Actions",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-21",
		name: "Physical & Mental Health",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "cat-22",
		name: "Time & Date",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export const articles: Article[] = [
	{
		id: "art-1",
		title: "Scientists Discover New Method to Predict Solar Flares",
		imageUrl: "/content-image/1.png",
		date: new Date("2024-03-20"),
		content:
			"A groundbreaking study reveals a new technique using artificial intelligence to predict dangerous solar flares up to 24 hours before they occur, potentially revolutionizing space weather forecasting. The research, conducted by an international team of scientists at the Solar Dynamics Observatory, combines machine learning algorithms with traditional solar physics to achieve unprecedented accuracy in flare prediction. Solar flares, sudden bursts of radiation from the sun's surface, can have significant impacts on Earth's technology infrastructure, affecting satellite communications, power grids, and GPS systems. The new AI model analyzes patterns in the sun's magnetic field and surface activity, processing data from multiple solar observation satellites in real-time. What makes this breakthrough particularly significant is its ability to identify subtle patterns that human observers might miss, leading to a 40% improvement in prediction accuracy compared to previous methods. The system can now detect the early warning signs of solar flares up to 24 hours in advance, giving critical infrastructure operators more time to prepare for potential disruptions. The research team spent three years developing and training the AI model using historical data from over 10,000 solar flares. The model considers various factors including magnetic field strength, sunspot configurations, and plasma flow patterns. This advancement comes at a crucial time as we approach the peak of the current solar cycle, when solar activity is expected to be at its highest. The implications of this technology extend beyond Earth, as it will be crucial for protecting astronauts and equipment during future deep space missions. NASA has already expressed interest in implementing this system for their Artemis program and future Mars missions. The team is now working on making the prediction system even more precise and reducing the false alarm rate, which currently stands at about 15%. They're also developing a user-friendly interface that will allow space weather forecasters to easily interpret the AI's predictions and communicate potential risks to relevant stakeholders.",
		description: "New AI technique revolutionizes solar flare prediction",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-4",
	},
	{
		id: "art-2",
		title: "Breakthrough in Quantum Computing Achieves New Milestone",
		imageUrl: "/content-image/2.png",
		date: new Date("2024-03-19"),
		content:
			"Researchers have successfully demonstrated quantum supremacy in a new class of quantum computers, solving complex problems that would take traditional supercomputers thousands of years. This breakthrough, achieved by a team at the Quantum Computing Research Institute, represents a significant leap forward in the field of quantum computing. The team's quantum processor, featuring 128 qubits with unprecedented stability and coherence times, successfully solved a complex optimization problem in just 200 seconds - a task that would require the world's most powerful supercomputer approximately 10,000 years to complete. The key to this achievement lies in the team's innovative approach to quantum error correction and qubit stability. They developed a new method of maintaining quantum coherence using a combination of cryogenic cooling and electromagnetic shielding, allowing the qubits to maintain their quantum state for significantly longer periods. The processor also implements a novel architecture that reduces cross-talk between qubits, a major challenge in quantum computing. This breakthrough has immediate implications for fields such as cryptography, drug discovery, and climate modeling. In cryptography, the new system can factor large numbers exponentially faster than classical computers, potentially revolutionizing current encryption methods. For pharmaceutical research, the quantum computer can simulate molecular interactions with unprecedented accuracy, accelerating the drug discovery process. The team's next goal is to scale up the system to 1,000 qubits while maintaining the current level of stability and error correction. They're also working on developing quantum algorithms specifically designed to take advantage of their processor's unique architecture. This development marks a crucial step toward practical quantum computing applications, though experts note that widespread commercial use is still several years away. The research team has made their findings and some of their quantum algorithms open-source, encouraging collaboration across the scientific community to further advance the field.",
		description:
			"Quantum computing breakthrough shows unprecedented capabilities",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-5",
	},
	{
		id: "art-3",
		title: "Ancient Human Footprints Rewrite History of Americas",
		imageUrl: "/content-image/3.png",
		date: new Date("2024-03-18"),
		content:
			"New archaeological findings in New Mexico suggest humans arrived in North America thousands of years earlier than previously thought, challenging existing migration theories. The discovery of well-preserved human footprints in White Sands National Park has been dated to approximately 23,000 years ago, pushing back the timeline of human presence in the Americas by at least 7,000 years. The footprints, preserved in ancient lakebed sediments, were discovered during a routine survey of the park's paleontological resources. Using advanced dating techniques including radiocarbon dating of associated plant material and optically stimulated luminescence dating of the surrounding sediments, researchers have established a firm timeline for these ancient tracks. The footprints tell a fascinating story of daily life during the last Ice Age. They show evidence of adults and children walking together, some tracks indicating running or hunting behavior. The presence of children's footprints suggests that these were not just exploratory expeditions but established communities. This discovery challenges the long-held 'Clovis First' theory, which suggested that humans first entered the Americas via the Bering Land Bridge around 16,000 years ago. The new evidence indicates that humans were present in North America during the Last Glacial Maximum, when ice sheets covered much of the continent. This timing suggests that early humans may have used different migration routes or strategies than previously thought. The research team, led by Dr. Matthew Bennett of Bournemouth University, has documented over 60 distinct trackways, providing unprecedented insight into the behavior and social structure of these early Americans. The footprints show evidence of group movement patterns, suggesting organized hunting or gathering activities. The discovery has significant implications for our understanding of human adaptation to extreme environments, as these early Americans would have had to survive in harsh Ice Age conditions. The team is now using advanced 3D modeling techniques to create detailed digital records of the footprints before they potentially erode away. They're also conducting additional excavations in the surrounding area to search for associated artifacts and evidence of habitation sites.",
		description: "Archaeological discovery challenges human migration timeline",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-1",
	},
	{
		id: "art-4",
		title: "Revolutionary Battery Technology Promises Week-Long Phone Charge",
		imageUrl: "/content-image/4.png",
		date: new Date("2024-03-17"),
		content:
			"A new type of lithium-sulfur battery technology could extend smartphone battery life to over a week, while being more environmentally friendly than current solutions. Developed by researchers at the Advanced Battery Research Center, this breakthrough technology addresses two major challenges in current battery design: energy density and environmental impact. The new battery architecture uses a novel sulfur-based cathode material combined with a specially engineered lithium anode, achieving an energy density nearly three times that of conventional lithium-ion batteries. The key innovation lies in the development of a unique nanostructured carbon matrix that prevents the common 'polysulfide shuttle' effect, which has historically limited the lifespan of lithium-sulfur batteries. The research team has also developed a new electrolyte formulation that significantly reduces the formation of dendrites, the needle-like structures that can cause short circuits in lithium batteries. This advancement not only extends battery life but also improves safety and reduces the risk of thermal runaway. The environmental benefits of this technology are substantial. Sulfur is an abundant, non-toxic element that can be sourced as a byproduct of industrial processes, making it much more sustainable than the cobalt and nickel used in traditional lithium-ion batteries. The manufacturing process also requires less energy and produces fewer greenhouse gas emissions. Early testing shows that smartphones equipped with these batteries can maintain a full charge for up to 8 days under normal usage conditions, a significant improvement over the current 1-2 day average. The batteries also demonstrate excellent performance in extreme temperatures, maintaining 80% of their capacity at temperatures as low as -20°C and as high as 60°C. The research team has successfully scaled up the technology to produce prototype batteries in standard smartphone sizes, and they're currently working with several major electronics manufacturers to integrate the technology into consumer devices. The first commercial applications are expected to hit the market within the next two years. Beyond smartphones, this technology has potential applications in electric vehicles, where it could extend range by up to 50%, and in grid storage systems, where its high energy density and environmental benefits could revolutionize renewable energy storage. The team is now focusing on further improving the battery's cycle life and reducing production costs to make the technology commercially viable.",
		description: "New battery technology extends device life significantly",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-5",
	},
	{
		id: "art-5",
		title: "Ocean Cleanup Project Shows Promising Results",
		imageUrl: "/content-image/5.png",
		date: new Date("2024-03-16"),
		content:
			"The latest ocean cleanup initiative has successfully removed over 100,000 tons of plastic from the Pacific Ocean, showing promising results for marine ecosystem recovery. This ambitious project, led by the Ocean Cleanup Foundation, has deployed a fleet of specially designed autonomous systems that work together to collect and process marine debris. The system uses a combination of advanced sensors, artificial intelligence, and passive collection methods to efficiently target and remove plastic waste while minimizing impact on marine life. The cleanup operation focuses on the Great Pacific Garbage Patch, an area of concentrated marine debris located between Hawaii and California. The project's innovative approach includes a network of floating barriers that use ocean currents to passively collect plastic waste, combined with AI-powered drones that identify and map debris concentrations. The collected plastic is then processed on specialized vessels that sort, clean, and prepare the material for recycling. The environmental impact of this cleanup effort has been significant. Initial studies show a 40% reduction in plastic concentration in the targeted areas, leading to visible improvements in marine ecosystem health. Scientists have observed increased biodiversity in cleaned areas, with particular benefits to species that were previously threatened by plastic entanglement or ingestion. The project has also developed new recycling technologies that can process ocean plastic into high-quality materials suitable for manufacturing new products. This circular economy approach helps fund the cleanup operation while reducing the demand for new plastic production. The success of this initiative has inspired similar projects in other ocean garbage patches around the world. The team is now working on scaling up the operation and developing more efficient collection methods. They're also focusing on preventing plastic from entering the ocean in the first place by working with coastal communities to improve waste management systems. The project's data collection efforts have provided valuable insights into the sources and patterns of ocean plastic pollution, helping to inform policy decisions and prevention strategies. The team is currently developing a global monitoring system that will track plastic pollution in real-time, enabling more targeted cleanup efforts and better understanding of the problem's scope.",
		description: "Major progress in ocean plastic cleanup initiative",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-7",
	},
	{
		id: "art-6",
		title: "AI System Masters Complex Mathematical Proofs",
		imageUrl: "/content-image/6.png",
		date: new Date("2024-03-15"),
		content:
			"A new artificial intelligence system has demonstrated the ability to solve complex mathematical theorems and generate proofs that have eluded mathematicians for decades. Developed by researchers at the Mathematical Sciences Institute, this breakthrough represents a significant advancement in the field of automated theorem proving. The AI system, named 'ProofMaster,' combines deep learning with symbolic reasoning to tackle mathematical problems that were previously considered too complex for automated systems. The system's architecture includes a novel neural network design that can understand and manipulate mathematical concepts at a high level of abstraction. ProofMaster has already solved several long-standing mathematical conjectures, including a variant of the Collatz conjecture and a complex problem in algebraic geometry that had remained unsolved for over 30 years. The system's success lies in its ability to combine different proof strategies and recognize patterns that human mathematicians might miss. It can generate proofs that are not only correct but also elegant and insightful, often revealing new mathematical relationships in the process. The AI's approach to problem-solving is particularly innovative. Instead of brute-force computation, it uses a combination of pattern recognition, logical reasoning, and creative problem-solving strategies similar to those employed by human mathematicians. The system can also explain its reasoning process in natural language, making its proofs accessible to human mathematicians. This capability has led to several unexpected discoveries and new mathematical insights. The research team has made the system's proofs and reasoning process transparent, allowing mathematicians to verify and learn from its methods. The implications of this technology extend beyond pure mathematics. The system's ability to handle complex logical reasoning has applications in computer science, physics, and engineering. It's already being used to verify the correctness of complex software systems and to help solve problems in quantum computing. The team is now working on expanding the system's capabilities to handle more abstract mathematical concepts and to collaborate more effectively with human mathematicians. They're also developing tools that will allow the AI to learn from mathematical literature and to contribute to mathematical research in a more integrated way.",
		description: "AI breakthrough in mathematical theorem solving",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-5",
	},
	{
		id: "art-7",
		title: "New Species of Deep-Sea Creatures Found in Pacific",
		imageUrl: "/content-image/7.png",
		date: new Date("2024-03-14"),
		content:
			"Marine biologists have discovered previously unknown species of bioluminescent creatures living in the deepest parts of the Pacific Ocean, expanding our understanding of deep-sea life. The expedition, led by the Deep Ocean Research Institute, utilized advanced remotely operated vehicles (ROVs) equipped with high-resolution cameras and specialized sampling equipment to explore the Mariana Trench and surrounding areas. The team discovered over 20 new species, including a particularly fascinating bioluminescent jellyfish that displays a unique pattern of light emission never before observed in marine organisms. The discovery was made possible by a new generation of deep-sea exploration technology that can withstand the extreme pressures found at depths of over 10,000 meters. The ROVs were equipped with sensitive light sensors and DNA sampling capabilities, allowing researchers to study the creatures in their natural habitat without disturbing their delicate ecosystem. Among the most remarkable findings is a new species of anglerfish that uses a complex system of bioluminescent lures to attract prey. Unlike previously known anglerfish, this species can change the color and intensity of its lure, potentially to attract different types of prey or communicate with other members of its species. The researchers also discovered a new type of deep-sea coral that forms extensive colonies at depths previously thought to be inhospitable to such organisms. These corals host a diverse community of associated species, including several new types of crustaceans and mollusks. The expedition's findings have significant implications for our understanding of deep-sea biodiversity and evolution. The newly discovered species show remarkable adaptations to their extreme environment, including pressure-resistant body structures and unique metabolic processes that allow them to survive in complete darkness and near-freezing temperatures. The research team is particularly interested in the bioluminescent properties of these creatures, which could have applications in medical imaging and environmental monitoring. They're currently studying the chemical compounds responsible for the bioluminescence, which could lead to new developments in biotechnology. The discovery also highlights the importance of protecting deep-sea ecosystems, which are increasingly threatened by deep-sea mining and climate change. The team is working with international conservation organizations to develop protection strategies for these newly discovered habitats. They're also developing a comprehensive database of deep-sea species to better understand and monitor these fragile ecosystems.",
		description: "Discovery of new deep-sea species in Pacific Ocean",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-3",
	},
	{
		id: "art-8",
		title: "Climate Change Affecting Bird Migration Patterns",
		imageUrl: "/content-image/8.png",
		date: new Date("2024-03-13"),
		content:
			"Recent studies show significant changes in bird migration patterns across continents, raising concerns about the impact of climate change on wildlife behavior. A comprehensive study conducted by the Global Bird Migration Research Consortium has tracked the movements of over 100,000 birds across 200 species using advanced GPS tracking technology and citizen science data. The research reveals that many bird species are altering their migration timing, routes, and destinations in response to changing environmental conditions. The study, which spans a 20-year period, shows that spring migrations are occurring earlier by an average of 2.3 days per decade, while fall migrations are being delayed by approximately 1.5 days per decade. These shifts are particularly pronounced in species that rely on specific environmental cues, such as temperature and day length, to initiate their migrations. The research team has documented several concerning trends, including the shortening of migration distances for some species and the complete abandonment of traditional migration routes by others. Some birds are now wintering in areas that were previously too cold, while others are failing to reach their traditional breeding grounds due to changing weather patterns. The study also reveals that these changes are having cascading effects on ecosystems. For example, birds that arrive too early at their breeding grounds may find insufficient food resources, while those that arrive too late may miss optimal breeding conditions. The research team has developed a sophisticated computer model that can predict how different bird species might respond to various climate change scenarios. This model takes into account factors such as temperature changes, precipitation patterns, and habitat availability. The findings have important implications for conservation efforts. The team is working with wildlife agencies to identify critical habitats that need protection and to develop strategies for helping bird populations adapt to changing conditions. They're also studying the potential for assisted migration in cases where natural adaptation might not be possible. The research has led to the development of new conservation guidelines that consider the dynamic nature of bird migration patterns in a changing climate.",
		description: "Climate change impacts bird migration behavior",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-7",
	},
	{
		id: "art-9",
		title: "Breakthrough in Alzheimer's Treatment Shows Promise",
		imageUrl: "/content-image/9.png",
		date: new Date("2024-03-12"),
		content:
			"Clinical trials of a new drug combination have shown unprecedented success in slowing the progression of Alzheimer's disease in early-stage patients. The breakthrough treatment, developed by researchers at the Neurodegenerative Disease Research Center, combines a novel antibody therapy with a targeted gene therapy approach. The results of the Phase III clinical trials, involving over 1,000 patients across 50 medical centers worldwide, show a 40% reduction in cognitive decline compared to standard treatments. The new approach targets multiple aspects of the disease simultaneously, addressing both the accumulation of beta-amyloid plaques and the tau protein tangles that are characteristic of Alzheimer's. The treatment protocol involves a combination of monthly antibody infusions and a one-time gene therapy injection that helps protect neurons from damage. The antibody component specifically targets and clears beta-amyloid plaques, while the gene therapy component enhances the brain's natural ability to repair damaged neural connections. The clinical trials showed particularly promising results in patients who received the treatment in the early stages of the disease. These patients maintained their cognitive abilities for significantly longer periods than those receiving standard care, and many showed improvements in memory and daily functioning. The treatment also demonstrated a good safety profile, with manageable side effects that were primarily related to the immune system's response to the therapy. The research team has developed a comprehensive monitoring system that uses advanced brain imaging and biomarker analysis to track the treatment's effectiveness in individual patients. This personalized approach allows for adjustments to the treatment protocol based on each patient's response. The breakthrough has significant implications for the future of Alzheimer's treatment. The team is now working on developing a more convenient delivery method for the therapy and exploring ways to make the treatment more accessible to patients worldwide. They're also studying the potential application of similar approaches to other neurodegenerative diseases, such as Parkinson's and Huntington's disease. The research has led to the development of new diagnostic tools that can identify Alzheimer's at earlier stages, when the treatment is most effective.",
		description: "New treatment shows promise for Alzheimer's patients",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-6",
	},
	{
		id: "art-10",
		title: "Mars Rover Makes Surprising Discovery About Ancient Water",
		imageUrl: "/content-image/10.png",
		date: new Date("2024-03-11"),
		content:
			"NASA's latest Mars rover has uncovered evidence suggesting that liquid water existed on the red planet much more recently than previously believed. The Perseverance rover's advanced scientific instruments have detected mineral deposits and geological features that indicate the presence of flowing water as recently as 100,000 years ago. This discovery, made in the Jezero Crater region, challenges the long-held belief that Mars became completely dry billions of years ago. The rover's findings include the discovery of hydrated minerals and sedimentary structures that could only have formed in the presence of liquid water. The research team has also found evidence of ancient river deltas and lake beds that show signs of multiple wet and dry periods. The discovery was made possible by Perseverance's sophisticated suite of instruments, including a ground-penetrating radar system and a high-resolution camera capable of detecting microscopic mineral formations. The rover's ability to analyze samples in situ has provided unprecedented insights into the planet's geological history. The findings suggest that Mars may have experienced periodic episodes of water activity, possibly due to changes in the planet's orbit or volcanic activity. This has significant implications for our understanding of Mars' climate history and the potential for past life on the planet. The research team is particularly interested in the discovery of certain types of clay minerals that are known to preserve organic matter on Earth. These minerals could potentially contain evidence of past microbial life, if it existed. The rover has collected several core samples from these promising locations, which will be returned to Earth by a future mission for detailed analysis. The discovery has also provided valuable information for planning future human missions to Mars. The presence of relatively recent water activity suggests that there might be accessible water resources beneath the planet's surface, which could be crucial for sustaining human presence on Mars. The team is now developing new strategies for exploring these potential water sources and studying their implications for Mars' habitability.",
		description: "Mars rover finds evidence of recent water activity",
		createdAt: new Date(),
		updatedAt: new Date(),
		categoryId: "cat-4",
	},
];

// Helper function to get article by slu
