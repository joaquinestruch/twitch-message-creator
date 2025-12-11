import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header'
import '../App.css'
import './AiChat.css'
import { OpenAI } from "openai"
import { BADGE_ASSETS, emblestList, EMOTES, BIT_ASSETS } from '../utils/embleds'
import { colorsName } from '../utils/colorsName'
import html2canvas from 'html2canvas'

// Badge Configuration
const BADGES = [
  { id: 'broadcaster', label: 'Broadcaster', index: 3 }, 
  { id: 'moderator', label: 'Moderator', index: 4 },
  { id: 'verified', label: 'Verified', index: 5 },
  { id: 'vip', label: 'VIP', index: 7 },
  { id: 'artist', label: 'Artist', index: 6 },
  { id: 'dj', label: 'DJ', index: 7 }, // Using 7 as generic slot if needed, or unique
  { id: 'subscriber', label: 'Subscriber', index: 0 },
  { id: 'prime', label: 'Prime', index: 8 },
  { id: 'turbo', label: 'Turbo', index: 1 },
];

function AiChatGenerator() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL params OR defaults
  const [channelName, setChannelName] = useState(searchParams.get("channel") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // SEO: Optimized for "Twitch Chat Simulator" & "Fake Chat Generator" & "Message Creator"
  useEffect(() => {
    const updateSeoMetadata = () => {
        // 1. Precise Title - Targeting "Message Creator" (#1 keyword)
        document.title = "Twitch Chat Simulator | AI Fake Stream Generator";
        
        // 2. Meta Description
        const descContent = "The best free Twitch Message Creator and Chat Generator. Create realistic fake chat logs, memes, and stream overlays instantly. Customizable badges, emotes, and usernames.";
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = descContent;

        // 3. Keywords
        const keywordsContent = "twitch message creator, twitch chat generator, twitch message generator, twitch chat maker, fake twitch chat, stream overlay, chat simulator";
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = "keywords";
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = keywordsContent;

        // 4. Open Graph (Social Sharing)
        const setOgTag = (property, content) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.content = content;
        };

        setOgTag('og:title', "Twitch Message Creator - Make Fake Chat Logs Instantly");
        setOgTag('og:description', "Create realistic Twitch chat messages and stream overlays. The ultimate Twitch Chat Maker for content creators.");
        setOgTag('og:type', "website");
        setOgTag('og:url', window.location.href);
    };

    updateSeoMetadata();
  }, []);

  // Animation & Data State
  const [messagePool, setMessagePool] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState([]); 
  const [isStreaming, setIsStreaming] = useState(false);
  
  const [chatSpeed, setChatSpeed] = useState(Number(searchParams.get("speed")) || 500); 
  const [complexity, setComplexity] = useState(searchParams.get("complexity") || "simple"); 
  const [language, setLanguage] = useState(searchParams.get("lang") || "en"); 

  const [messageCount, setMessageCount] = useState(30);

  // Manual Mode State
  const [mode, setMode] = useState("ai"); // 'ai' or 'manual'
  const [manualUsername, setManualUsername] = useState("Streamer");
  const [manualMessage, setManualMessage] = useState("");
  const [manualColor, setManualColor] = useState("#FF0000");
  const [manualBadges, setManualBadges] = useState({
      broadcaster: false, moderator: false, verified: false, vip: false, subscriber: true, prime: false
  });



  const handleAddManualMessage = () => {
      if (!manualMessage.trim()) return;
      
      const badges = [];
      if (manualBadges.broadcaster) badges.push(BADGE_ASSETS.BROADCASTER);
      if (manualBadges.moderator) badges.push(BADGE_ASSETS.MODERATOR);
      if (manualBadges.verified) badges.push(BADGE_ASSETS.VERIFIED);
      if (manualBadges.vip) badges.push(BADGE_ASSETS.VIP);
      if (manualBadges.subscriber) badges.push(BADGE_ASSETS.SUBSCRIBER);
      if (manualBadges.prime) badges.push(BADGE_ASSETS.PRIME_REAL);

      const newMessage = {
          uniqueId: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          username: manualUsername || "User",
          messageText: manualMessage,
          badges: badges,
          colorUsername: manualColor
      };

      setVisibleMessages(prev => [...prev, newMessage]);
      setManualMessage(""); 
      
      if (chatContainerRef.current) {
         requestAnimationFrame(() => chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight);
      }
  };

  // Sync State to URL Params
  useEffect(() => {
    const params = {};
    if (channelName) params.channel = channelName;
    if (chatSpeed !== 500) params.speed = chatSpeed;
    if (complexity !== "simple") params.complexity = complexity;
    if (language !== "en") params.lang = language;
    
    setSearchParams(params, { replace: true });
  }, [channelName, chatSpeed, complexity, language, setSearchParams]);

  // Badge Selection State (Default: Sub + VIP)
  const [enabledBadges, setEnabledBadges] = useState({
    subscriber: true,
    vip: true,
    moderator: false, 
    verified: false,
    broadcaster: false,
    prime: false,
    turbo: false,
    artist: false,
    dj: false
  });

  // UI Helper for toggle
  const toggleBadge = (id) => {
      setEnabledBadges(prev => ({...prev, [id]: !prev[id]}));
  };

  const chatContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const poolIndexRef = useRef(0);

  // Streaming Logic (Seamless Infinite Loop)
  useEffect(() => {
    if (isStreaming && messagePool.length > 0) {
        intervalRef.current = setInterval(() => {
            
            // Get next message
            const nextMsg = messagePool[poolIndexRef.current];
            
            // Time logic
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
            const uniqueId = crypto.randomUUID();

            const msgWithTime = { ...nextMsg, timestamp: timeStr, uniqueId };

            setVisibleMessages(prev => {
                // Keep DOM light: Max 50 messages, remove top one if exceeded
                const newList = [...prev, msgWithTime];
                if (newList.length > 50) return newList.slice(1); // Remove oldest
                return newList;
            });
            
            // Advance index, loop back seamlessly
            poolIndexRef.current = (poolIndexRef.current + 1) % messagePool.length;

        }, chatSpeed);
    } else {
        clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isStreaming, messagePool, chatSpeed]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (chatContainerRef.current) {
        requestAnimationFrame(() => {
             if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
             }
        });
    }
  }, [visibleMessages]);

  // unified generation logic
  const generateChat = async (scenarioType = null) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
        setError("Error: API Key not found. Check .env.local");
        return;
    }

    setIsLoading(true);
    setIsStreaming(false);
    setError(null);
    setVisibleMessages([]);
    poolIndexRef.current = 0;

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true 
        });

        // Construct list of available emotes for the AI
        const availableEmotes = Object.keys(EMOTES).join(", ");
        let prompt = "";

        if (scenarioType) {
            // SCENARIO MODE PROMPTS
            const scenarios = {
                jumpscare: `Generate 40 VERY PANICKED Twitch chat messages reacting to a JUMPSCARE.
                            Use caps lock, "WutFace", "monkaS", "monkaW", "WTF", "SCREAMER". 
                            Messages should be short, screaming, and chaotic.`,
                hype: `Generate 40 EXTREMELY HYPE Twitch chat messages.
                       Use "PogChamp", "LETS GO", "EZ", "Clap", "Winner", "GG". 
                       The streamer just did something amazing. High energy.`,
                toxic: `Generate 40 TOXIC/ROAST Twitch chat messages. 
                        Use "L", "Ratio", "Noob", "So bad", "???", "Cringe". 
                        The streamer failed or missed a shot. Mean but funny.`
            };
            prompt = `You are a Twitch Chat Simulator.
            ${scenarios[scenarioType]}
            Language: Keep it mostly English/Internet Slang but mix if needed.
            Use these emotes: ${availableEmotes}.
            Return ONLY a raw JSON array of objects: { "username": string, "messageText": string, "isVip": boolean, "isSub": boolean }`;
        } else {
            // STANDARD MODE PROMPT
            let complexityPrompt = "";
            if (complexity === "simple") {
                complexityPrompt = `Keep messages VERY short. mostly 1-3 words. Use emotes like ${availableEmotes}.`;
            } else if (complexity === "mixed") {
                complexityPrompt = `Mix short slang (50%) with short sentences. Use emotes frequently: ${availableEmotes}.`;
            } else if (complexity === "complex") {
                complexityPrompt = `Generate longer messages but still use emotes: ${availableEmotes}.`;
            }
    
            const langPrompt = language === 'es' ? 'Spanish (Argentina/Spain/Latin America mix)' : 'English (Internet/Twitch Slang)';
    
            prompt = `You are a Twitch Chat Simulator. 
            Generate ${messageCount} realistic twitch chat messages for channel: "${channelName}".
            Vibe: Hype, fast, spammy, reactions.
            Language: ${langPrompt}.
            Complexity Level: ${complexity}. ${complexityPrompt}
            
            IMPORTANT: Use specific emotes from this list freely: ${availableEmotes}.
            
            Return ONLY a raw JSON array of objects:
            - username: string (realistic nicks)
            - messageText: string
            - isVip: boolean (rare, < 5% chance)
            - isSub: boolean (common, ~20% chance)
            `;
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-4o-mini",
        });

        const content = completion.choices[0].message.content;
        const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);

        const processed = data.map(msg => {
            const badges = [];
            // Random Badges for AI
            if (enabledBadges.subscriber && (msg.isSub || Math.random() > 0.7)) badges.push(BADGE_ASSETS.SUBSCRIBER);
            if (enabledBadges.vip && (msg.isVip || Math.random() > 0.95)) badges.push(BADGE_ASSETS.VIP);
            if (enabledBadges.moderator && Math.random() > 0.98) badges.push(BADGE_ASSETS.MODERATOR);
            if (enabledBadges.verified && Math.random() > 0.99) badges.push(BADGE_ASSETS.VERIFIED);
            if (enabledBadges.prime && Math.random() > 0.9) badges.push(BADGE_ASSETS.PRIME_REAL);
            if (enabledBadges.broadcaster && Math.random() > 0.995) badges.push(BADGE_ASSETS.BROADCASTER);

            return {
                uniqueId: crypto.randomUUID(),
                username: msg.username,
                messageText: msg.messageText,
                badges: badges,
                colorUsername: colorsName[Math.floor(Math.random() * colorsName.length)]
            };
        });

        setMessagePool(processed);
        setIsStreaming(true);

    } catch (err) {
        console.error(err);
        setError("AI Generation failed. Check API Key or try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleGenerate = () => generateChat(null);
  const handleApplyPreset = (type) => generateChat(type);

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
  };
  
  // Event Logic
  const handleTriggerEvent = (type) => {
      let msgData = {};
      const base = {
          uniqueId: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          isEvent: true,
          eventType: type
      };

      switch(type) {
          case 'sub':
              msgData = { ...base, messageText: "Just subscribed with Prime! ", systemText: "subscribed with Prime." };
              break;
          case 'gift':
              msgData = { ...base, messageText: "gifted 5 Subs to the community! ", systemText: "gifted 5 Subs!" };
              break;
          case 'cheer':
              // Animated Bit Logic
              const bitUrl = BIT_ASSETS['10000']; // Use Red Gem for impact
              // We inject the HTML directly for the bit gem
              const bitHtml = `<img src="${bitUrl}" style="width:28px; vertical-align:middle; margin-right:4px;" alt="cheer10000"/> <span style="color:#ff383b; fontWeight:bold">cheer10000</span>`;
              
              msgData = { 
                  ...base, 
                  messageText: `cheered! ${bitHtml} WOW!`, 
                  systemText: "cheered 10000 bits!" 
              };
              break;
          case 'donation':
              msgData = { ...base, messageText: "donated $50.00! ", systemText: "donated $50.00!" };
              break;
          default: return;
      }
      
      // Use manual username or default
      msgData.username = manualUsername || "Anonymous";
      
      setVisibleMessages(prev => [...prev, msgData]);
      if (chatContainerRef.current) {
          requestAnimationFrame(() => chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight);
      }
  };

  const handleDownload = () => {
    const element = document.getElementById("ai-capture-zone");
    if (!element) return;
    
    html2canvas(element, {
        backgroundColor: null, 
        scale: 2,
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `chat_${channelName}_live.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
  };

  // OBS Mode State
  const [isObsMode, setIsObsMode] = useState(false);
  const [bgImage, setBgImage] = useState("/pepegif.gif"); // Default Pepe

  const toggleObsMode = () => {
    setIsObsMode(!isObsMode);
  };
  
  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        setBgImage(url);
    }
  };

  // Helper to replace text with emote images
  const parseWithEmotes = (text) => {
    if (!text) return "";
    let newText = text;
    Object.keys(EMOTES).forEach(emote => {
        const url = EMOTES[emote];
        // Replace whole word matches only
        const regex = new RegExp(`\\b${emote}\\b`, 'g'); 
        // Add onerror handler to revert to text if image fails
        const imgTag = `<img src="${url}" class="chat-emote" style="height:24px; vertical-align:middle; margin:0 2px;" alt="${emote}" onerror="this.style.display='none';this.after(document.createTextNode(this.alt));" />`;
        newText = newText.replace(regex, imgTag);
    });
    return newText;
  };

  return (
    <>
      <main className={`container-main ${isObsMode ? 'obs-active' : ''}`}>
        
        {/* LEFT SIDE: Stream Video + Controls */}
        <section className="stream-layout-left">
            {!isObsMode && <Header />}
            
            {/* Fake Video Player */}
            <div className="video-placeholder" style={{
                position: 'relative', 
                overflow: 'hidden',
                backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                backgroundSize: 'auto 60%', // Smaller sticker feel
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
                {/* Overlay Controls (Visible on Hover or always) */}
                <div style={{
                    position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                    display: 'flex', gap: '10px'
                }}>
                     <label className="btn-secondary" style={{
                         padding: '5px 10px', fontSize: '0.8rem', cursor: 'pointer', background: 'rgba(0,0,0,0.6)'
                     }}>
                        📷 Change BG
                        <input type="file" accept="image/*,video/*" hidden onChange={handleBgUpload} />
                     </label>
                     {bgImage && (
                        <button onClick={() => setBgImage(null)} className="btn-secondary" style={{
                            padding: '5px 10px', fontSize: '0.8rem', background: 'rgba(0,0,0,0.6)', color: '#ff4f4d'
                        }}>
                            ✕ Remove
                        </button>
                     )}
                </div>

                {!bgImage && (
                    <div style={{textAlign:'center', opacity: 0.3}}>
                        <div style={{fontSize: '4rem'}}>📹</div>
                        <h2>Stream Preview</h2>
                        <p>Live Chat Simulation</p>
                    </div>
                )}
            </div>

            {/* Controls Dashboard */}
            {!isObsMode && (
            <div className="controls-dashboard">
                {/* Mode Toggle Tabs */}
                <div className="mode-tabs">
                    <button 
                        className={`mode-tab-btn ${mode === 'ai' ? 'active' : ''}`}
                        onClick={() => setMode('ai')}
                    >
                        🤖 AI Generator
                    </button>
                    <button 
                        className={`mode-tab-btn ${mode === 'manual' ? 'active' : ''}`}
                        onClick={() => setMode('manual')}
                    >
                        ✍️ Manual Creator
                    </button>
                </div>

                {/* AI MODE CONTROLS */}
                {mode === 'ai' && (
                <div className="controls-grid">
                    {/* ... (AI Controls - keeping previous logical structure if needed, but simplified here for brevity if replace handles partials well. 
                         However, this Replace call targets the WHOLE dashboard container to ensure clean switch) 
                         Wait, the instruction says "Replace the inline-styled Manual Mode section". 
                         I will be careful to preserve the AI controls content.
                    */}
                    <div className="control-group">
                        <label className="control-label">Channel Name</label>
                        <input 
                            type="text" 
                            className="custom-input"
                            placeholder="e.g. xQc" 
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                    </div>
                    
                    <div className="control-group">
                        <label className="control-label">Message Count: {messageCount}</label>
                        <input 
                            type="range" min="10" max="100" step="10"
                            className="custom-slider"
                            value={messageCount}
                            onChange={(e) => setMessageCount(Number(e.target.value))}
                        />
                    </div>

                    <div className="control-group">
                        <label className="control-label">Language</label>
                        <select className="custom-input" value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="es">Español (ES/LATAM)</option>
                            <option value="en">English (US/Global)</option>
                        </select>
                    </div>

                    <div className="control-group">
                        <label className="control-label">Complexity</label>
                        <select className="custom-input" value={complexity} onChange={(e) => setComplexity(e.target.value)}>
                            <option value="simple">Short / Spammy</option>
                            <option value="mixed">Mixed</option>
                            <option value="complex">Long / Chatty</option>
                        </select>
                    </div>

                    {/* Scenario Presets Row */}
                    <div className="control-group" style={{gridColumn: '1 / -1'}}>
                        <label className="control-label" style={{color: '#00db84'}}>⚡ Quick Scenarios (Viral)</label>
                        <div style={{display: 'flex', gap: '10px', marginTop: '5px'}}>
                            <button 
                                onClick={() => handleApplyPreset('jumpscare')}
                                className="btn-secondary"
                                style={{fontSize:'0.8rem', padding:'6px 10px', background: '#3a3a3d'}}
                            >
                                😱 Jumpscare
                            </button>
                            <button 
                                onClick={() => handleApplyPreset('hype')}
                                className="btn-secondary"
                                style={{fontSize:'0.8rem', padding:'6px 10px', background: '#3a3a3d'}}
                            >
                                🎉 Hype Train
                            </button>
                            <button 
                                onClick={() => handleApplyPreset('toxic')}
                                className="btn-secondary"
                                style={{fontSize:'0.8rem', padding:'6px 10px', background: '#3a3a3d'}}
                            >
                                💀 Toxic/Roast
                            </button>
                        </div>
                    </div>

                    <div className="control-group" style={{gridColumn: '1 / -1'}}>
                        <label className="control-label">Allowed Badges (AI)</label>
                        <div className="badge-selector-group">
                            {BADGES.map(badge => (
                                <label key={badge.id} className={`badge-toggle-btn ${enabledBadges[badge.id] ? 'active' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={enabledBadges[badge.id]} 
                                        onChange={() => toggleBadge(badge.id)}
                                    />
                                    {badge.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="control-group">
                        <label className="control-label">Speed: {chatSpeed}ms</label>
                        <input 
                            type="range" min="100" max="2000" step="100"
                            className="custom-slider"
                            value={chatSpeed}
                            onChange={(e) => setChatSpeed(Number(e.target.value))}
                            style={{direction: 'rtl'}} 
                        />
                    </div>
                </div>
                )}

                {/* MANUAL MODE CONTROLS */}
                {mode === 'manual' && (
                <div className="controls-grid">
                    <div className="manual-grid-row" style={{gridColumn: '1 / -1'}}>
                        <div className="control-group" style={{flex: 1}}>
                             <label className="control-label">Username</label>
                             <input 
                                type="text" 
                                className="custom-input"
                                value={manualUsername}
                                onChange={(e) => setManualUsername(e.target.value)}
                             />
                        </div>
                        <div className="control-group">
                             <label className="control-label">Color</label>
                             <input 
                                type="color" 
                                className="manual-color-picker"
                                value={manualColor}
                                onChange={(e) => setManualColor(e.target.value)}
                             />
                        </div>
                    </div>
                    
                    <div className="control-group" style={{gridColumn: '1 / -1'}}>
                        <label className="control-label">Message</label>
                        <textarea 
                            className="custom-input" 
                            rows="2"
                            value={manualMessage}
                            onChange={(e) => setManualMessage(e.target.value)}
                            placeholder="Type a message (Kappa supported)..."
                            style={{resize: 'none', height: '60px'}}
                        ></textarea>
                    </div>

                    <div className="control-group" style={{gridColumn: '1 / -1'}}>
                        <label className="control-label">Stream Events (Fake)</label>
                        <div style={{display:'flex', gap:'5px', flexWrap:'wrap'}}>
                            <button onClick={() => handleTriggerEvent('sub')} className="btn-secondary" style={{fontSize:'0.75rem', padding:'5px', flex:'1'}}>⭐ New Sub</button>
                            <button onClick={() => handleTriggerEvent('gift')} className="btn-secondary" style={{fontSize:'0.75rem', padding:'5px', flex:'1'}}>🎁 Gift 5</button>
                            <button onClick={() => handleTriggerEvent('cheer')} className="btn-secondary" style={{fontSize:'0.75rem', padding:'5px', flex:'1'}}>💎 100 Bits</button>
                            <button onClick={() => handleTriggerEvent('donation')} className="btn-secondary" style={{fontSize:'0.75rem', padding:'5px', flex:'1'}}>💸 Donate $10</button>
                        </div>
                    </div>

                    <div className="control-group" style={{gridColumn: '1 / -1'}}>
                        <label className="control-label">Badges</label>
                        <div className="badge-selector-group">
                             {['subscriber', 'moderator', 'verified', 'vip', 'broadcaster', 'prime'].map(bid => (
                                 <label key={bid} className={`badge-toggle-btn ${manualBadges[bid] ? 'active' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={manualBadges[bid]} 
                                        onChange={() => setManualBadges(p => ({...p, [bid]: !p[bid]}))}
                                    />
                                    {bid.charAt(0).toUpperCase() + bid.slice(1)}
                                 </label>
                             ))}
                        </div>
                    </div>
                </div>
                )}

                <div className="manual-actions">
                    {mode === 'ai' ? (
                        <>
                        <button onClick={handleGenerate} disabled={isLoading} className="btn-primary">
                            {isLoading ? "Generating..." : "Generate New Chat"}
                        </button>
                        {messagePool.length > 0 && (
                            <button onClick={toggleStream} className="btn-secondary" style={{background: isStreaming ? '#ff4f4d' : '#2f2f35'}}>
                                {isStreaming ? "⏹ Stop Stream" : "▶ Start Stream"}
                            </button>
                        )}
                        </>
                    ) : ( 
                        <>
                        <button onClick={handleAddManualMessage} className="btn-primary" style={{background: '#00db84', color: '#000'}}>
                            + Add Message
                        </button>
                        <button onClick={() => setVisibleMessages([])} className="btn-secondary">
                            Clear Chat
                        </button>
                        </>
                    )}

                     <button onClick={handleDownload} className="btn-secondary" style={{width:'auto', background: '#2f2f35', border: '1px solid #4f4f56'}} title="Save Image">
                        📸 Save
                     </button>
                     <button onClick={toggleObsMode} className="toggle-obs-btn" style={{width:'auto'}}>
                        Pop-out ↗
                     </button>
                </div>
            </div>
            )}
        </section>


        {/* RIGHT SIDE: Chat Sidebar */}
        <div id="ai-capture-zone" className={`ai-chat-wrapper ${isObsMode ? 'obs-active' : ''}`}> 
            
            <div className="chat-header-gift">
                <img src="https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/1" alt="Gift" style={{height: '20px'}}/>
                <span style={{color: '#bf94ff', fontWeight: 'bold'}}>Anonymous</span>
                <span style={{color: '#dedee3', marginLeft: '5px'}}>gifted 5 Subs!</span>
            </div>

            <div className="chat-messages-container" ref={chatContainerRef}>
                <div className="chat-stream-inner">
                    {visibleMessages.length === 0 && !isStreaming && (
                         <div className="welcome-message" style={{textAlign:'center', marginTop:'50%'}}>
                            Waiting for stream...
                        </div>
                    )}
                    
                    {visibleMessages.map((msg, idx) => {
                        if (msg.isEvent) {
                             return (
                                <div key={msg.uniqueId || idx} className="chat-message-row event-notice" style={{
                                    background: '#1f1f23',
                                    borderLeft: '4px solid #a970ff',
                                    padding: '8px 10px',
                                    margin: '4px 0',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}>
                                    <span style={{fontWeight:'bold', color: '#fff'}}>{msg.username}</span> 
                                    <span style={{color: '#a970ff'}}> {msg.systemText}</span>
                                </div>
                             );
                        }
                        return (
                        <div className="live-message" key={msg.uniqueId || idx}>
                             <span className="timestamp">{msg.timestamp}</span>
                             
                             <span className="badge-container">
                                 {msg.badges?.map((b, i) => (
                                     <img key={i} src={b} className="chat-badge" alt="" />
                                 ))}
                             </span>

                             <span className="chat-username" style={{ color: msg.colorUsername }}>
                                 {msg.username}
                             </span>
                             <span className="colon-separator">:</span>

                             <span 
                                 className="chat-text"
                                 dangerouslySetInnerHTML={{ __html: parseWithEmotes(msg.messageText) }}
                             />
                        </div>
                    )})}
                </div>
            </div>
            
            <div style={{padding: '20px', borderTop: '1px solid #2f2f35'}}>
                <div style={{height: '40px', background:'#2f2f35', borderRadius:'4px', color:'#adadb8', display:'flex', alignItems:'center', paddingLeft:'10px', fontSize:'0.9rem'}}>
                    Send a message
                </div>
            </div>
        </div>

        {isObsMode && (
            <button 
                onClick={toggleObsMode} 
                style={{
                    position: 'fixed', top: '10px', left: '10px', opacity: 0.1, zIndex: 9999,
                    background: 'red', border: 'none', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.1}
            >
                EXIT OBS MODE
            </button>
        )}

      </main>


      {/* SEO Content Section */}
      <section style={{
          maxWidth: '1200px', margin: '40px auto', padding: '20px', color: '#adadb8', fontSize: '0.9rem', lineHeight: '1.6'
      }}>
          <h2 style={{color: '#a970ff', fontSize: '1.5rem', marginBottom:'10px'}}>About Twitch Chat Simulator</h2>
          <p>
              Welcome to the most realistic <strong>Twitch Chat Simulator</strong> and <strong>Fake Chat Generator</strong>. 
              Whether you are a streamer looking for a fake chat overlay for OBS, a video editor needing authentic chat logs for content, 
              or just want to prank your friends, our AI-powered tool generates high-quality, realistic Twitch messages instantly.
          </p>
          
          <h3 style={{color: '#efeff1', fontSize: '1.2rem', marginTop:'20px'}}>Features</h3>
          <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px'}}>
              <li><strong>AI-Powered Realism:</strong> Uses advanced AI to generate slang, reactions, and hype just like a real stream.</li>
              <li><strong>OBS Mode:</strong> Pop out the chat into a transparent window perfect for OBS overlays or Green Screen effects.</li>
              <li><strong>Customizable Badges:</strong> Toggle Verified, VIP, Moderator, Prime, and Subscriber badges.</li>
              <li><strong>Multi-Language Support:</strong> Generate chat in English or Spanish with region-specific slang.</li>
          </ul>

          <p style={{marginTop: '20px', fontSize: '0.8rem', opacity: 0.7}}>
              This tool is not affiliated with Twitch. It is a simulation tool for creative and entertainment purposes only.
          </p>
      </section>
    </>
  )
}

export default AiChatGenerator;
