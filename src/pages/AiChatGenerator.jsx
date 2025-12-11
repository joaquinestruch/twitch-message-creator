import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header'
import '../App.css'
import './AiChat.css'
import { OpenAI } from "openai"
import { BADGE_ASSETS, emblestList, EMOTES } from '../utils/embleds'
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
  
  // ... SEO ...

  // Animation & Data State
  const [messagePool, setMessagePool] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState([]); 
  const [isStreaming, setIsStreaming] = useState(false);
  
  const [chatSpeed, setChatSpeed] = useState(Number(searchParams.get("speed")) || 500); 
  const [complexity, setComplexity] = useState(searchParams.get("complexity") || "simple"); 
  const [language, setLanguage] = useState(searchParams.get("lang") || "en"); 

  const [messageCount, setMessageCount] = useState(30);

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

  const handleGenerate = async () => {
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

        let complexityPrompt = "";
        if (complexity === "simple") {
            complexityPrompt = `Keep messages VERY short. mostly 1-3 words. Use emotes like ${availableEmotes}.`;
        } else if (complexity === "mixed") {
            complexityPrompt = `Mix short slang (50%) with short sentences. Use emotes frequently: ${availableEmotes}.`;
        } else if (complexity === "complex") {
            complexityPrompt = `Generate longer messages but still use emotes: ${availableEmotes}.`;
        }

        const langPrompt = language === 'es' ? 'Spanish (Argentina/Spain/Latin America mix)' : 'English (Internet/Twitch Slang)';

        const prompt = `You are a Twitch Chat Simulator. 
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

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-4o-mini",
        });

        const content = completion.choices[0].message.content;
        // Sanitize
        const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);

        // Pre-process badges and colors using OFFICIAL assets
        const processed = data.map(msg => {
            const badges = [];
            
            // Logic: Check if badge is ENABLED in state, then check if AI assigned it (or random chance override)
            
            // Logic: Check if badge is ENABLED in state
            
            if (enabledBadges.broadcaster && msg.username.toLowerCase() === channelName.toLowerCase()) {
                 badges.push(BADGE_ASSETS.BROADCASTER);
            }
            
            if (enabledBadges.moderator && msg.isMod) badges.push(BADGE_ASSETS.MODERATOR);
            
            // Partner/Verified (Purple Check)
            if (enabledBadges.verified) {
                // If AI marked as verified, or small random chance if enabled
                 if (msg.isVerified || Math.random() < 0.05) badges.push(BADGE_ASSETS.VERIFIED);
            }

            if (enabledBadges.vip && msg.isVip) badges.push(BADGE_ASSETS.VIP);
            
            if (enabledBadges.artist && Math.random() < 0.02) badges.push(BADGE_ASSETS.ARTIST);
            if (enabledBadges.dj && Math.random() < 0.01) badges.push(BADGE_ASSETS.DJ);

            // Subs / Prime / Turbo
            if (enabledBadges.subscriber && msg.isSub) badges.push(BADGE_ASSETS.SUBSCRIBER);
            if (enabledBadges.prime && msg.isPrime) badges.push(BADGE_ASSETS.PRIME_REAL); 
            if (enabledBadges.turbo && msg.isTurbo) badges.push(BADGE_ASSETS.TURBO); 

            // Randomly assign a color from the official palette
            const randomColor = colorsName[Math.floor(Math.random() * colorsName.length)];

            return { 
                ...msg, 
                badges,
                colorUsername: randomColor 
            };
        });

        setMessagePool(processed);
        setIsStreaming(true); // Auto-start

    } catch (err) {
        console.error(err);
        setError("Failed to generate. Try lowering message count.");
    } finally {
        setIsLoading(false);
    }
  };

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
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
        newText = newText.replace(regex, `<img src="${url}" class="chat-emote" style="height:24px; vertical-align:middle; margin:0 2px;" alt="${emote}" />`);
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
                <div className="controls-grid">
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
                        <select 
                            className="custom-input"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{cursor:'pointer'}}
                        >
                            <option value="es">Español (ES/LATAM)</option>
                            <option value="en">English (US/Global)</option>
                        </select>
                    </div>

                    <div className="control-group">
                        <label className="control-label">Complexity</label>
                        <select 
                            className="custom-input"
                            value={complexity}
                            onChange={(e) => setComplexity(e.target.value)}
                            style={{cursor:'pointer'}}
                        >
                            <option value="simple">Short / Spammy</option>
                            <option value="mixed">Mixed</option>
                            <option value="complex">Long / Chatty</option>
                        </select>
                    </div>

                    <div className="control-group" style={{gridColumn: '1 / -1'}}>
                        <label className="control-label">Allowed Badges</label>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '5px'}}>
                            {BADGES.map(badge => (
                                <label key={badge.id} style={{display: 'flex', alignItems: 'center', gap: '5px', color: '#efeff1', fontSize: '0.9rem', cursor: 'pointer'}}>
                                    <input 
                                        type="checkbox" 
                                        checked={enabledBadges[badge.id]} 
                                        onChange={() => toggleBadge(badge.id)}
                                        style={{accentColor: '#a970ff'}}
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

                <div style={{marginTop: '30px', display: 'flex', gap: '20px', justifyContent:'center'}}>
                    <button onClick={handleGenerate} disabled={isLoading} className="btn-primary" style={{maxWidth: '200px'}}>
                        {isLoading ? "Generating..." : "Generate New Chat"}
                    </button>
                    
                    {messagePool.length > 0 && (
                        <button onClick={toggleStream} className="btn-secondary" style={{maxWidth: '200px', background: isStreaming ? '#ff4f4d' : '#2f2f35'}}>
                            {isStreaming ? "⏹ Stop Stream" : "▶ Start Stream"}
                        </button>
                    )}

                     <button onClick={toggleObsMode} className="toggle-obs-btn">
                        Pop-out Chat (OBS Mode) ↗
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
                    
                    {visibleMessages.map((msg) => (
                        <div className="live-message" key={msg.uniqueId}>
                            <span className="timestamp">{msg.timestamp}</span>
                            
                            <span className="badge-container">
                                {msg.badges.map((b, i) => (
                                    <img key={i} src={b} className="chat-badge" alt="" />
                                ))}
                            </span>

                            <span className="chat-username" style={{color: msg.colorUsername}}>
                                {msg.username}
                            </span>
                            
                            <span className="colon-separator">:</span>
                            
                            <span className="chat-text" dangerouslySetInnerHTML={{__html: parseWithEmotes(msg.messageText)}}></span>
                        </div>
                    ))}
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
