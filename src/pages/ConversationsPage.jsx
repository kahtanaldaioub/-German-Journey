import React, { useState } from 'react';
import { conversations } from '../data/conversations';


const speakGerman = (text, onEnd) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

const speakConversation = (lines) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  let index = 0;
  const speakNext = () => {
    if (index >= lines.length) return;
    speakGerman(lines[index].german, () => {
      index++;
      setTimeout(speakNext, 500);
    });
  };
  speakNext();
};

const PronounceButton = ({ word }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleClick = (e) => {
    e.stopPropagation();
    if (!window.speechSynthesis) {
      alert("Your browser doesn't support speech synthesis.");
      return;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    speakGerman(word, () => setIsPlaying(false));
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: isPlaying ? '#7c3aed' : '#f3e8ff',
        border: 'none',
        borderRadius: '30px',
        padding: '6px 14px',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s ease',
        color: isPlaying ? 'white' : '#7c3aed',
        boxShadow: isPlaying ? '0 2px 8px rgba(124, 58, 237, 0.3)' : 'none',
      }}
      aria-label="Pronounce"
    >
      <span>{isPlaying ? '🔊' : '🔈'}</span>
      <span>{isPlaying ? 'Playing...' : 'Pronounce'}</span>
    </button>
  );
};

const ConversationsPage = () => {
  const [openId, setOpenId] = useState(null);
  const [playingConversationId, setPlayingConversationId] = useState(null);

  const handlePlayConversation = (e, convId, lines) => {
    e.stopPropagation();
    if (playingConversationId === convId) {
      window.speechSynthesis.cancel();
      setPlayingConversationId(null);
    } else {
      window.speechSynthesis.cancel();
      setPlayingConversationId(convId);
      speakConversation(lines);
      const totalDuration = lines.length * 0.5 * 1000 + (lines.length - 1) * 500;
      setTimeout(() => setPlayingConversationId(null), totalDuration);
    }
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '30px 20px',
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
       <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-3">
          
          💬 German Conversations
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Tap to open • Click 🔊 to hear the whole dialogue
        </p>
      </div>

      {conversations.map(conv => (
        <div
          key={conv.id}
          style={{
            marginBottom: '20px',
            borderRadius: '20px',
            background: 'white',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.2s ease',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            onClick={() => setOpenId(openId === conv.id ? null : conv.id)}
            style={{
              padding: '20px 24px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s',
              background: openId === conv.id ? '#faf9ff' : 'white',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#faf9ff'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = openId === conv.id ? '#faf9ff' : 'white'}
          >
            <div>
              <div style={{
                fontWeight: '700',
                fontSize: '1.25rem',
                color: '#1f2937',
                marginBottom: '4px'
              }}>
                {conv.title}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                letterSpacing: '0.3px'
              }}>
                {conv.titleEn}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button
                onClick={(e) => handlePlayConversation(e, conv.id, conv.lines)}
                style={{
                  background: playingConversationId === conv.id ? '#7c3aed' : '#f3e8ff',
                  border: 'none',
                  borderRadius: '40px',
                  width: '44px',
                  height: '44px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  transform: playingConversationId === conv.id ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: playingConversationId === conv.id ? '0 4px 12px rgba(124, 58, 237, 0.3)' : 'none',
                }}
                aria-label="Play conversation"
              >
                <span style={{
                  fontSize: '20px',
                  color: playingConversationId === conv.id ? 'white' : '#7c3aed'
                }}>
                  {playingConversationId === conv.id ? '⏹️' : '🔊'}
                </span>
              </button>
              <div style={{
                fontSize: '20px',
                color: '#9ca3af',
                transform: openId === conv.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                ▼
              </div>
            </div>
          </div>

          {openId === conv.id && (
            <div style={{
              borderTop: '1px solid #f0e7fe',
              padding: '20px 24px',
              background: 'linear-gradient(135deg, #fefefe, #fbfaff)',
            }}>
              {conv.lines.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: idx === conv.lines.length - 1 ? 0 : '16px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #f0e7fe',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)'}
                >
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '80px',
                      fontWeight: '600',
                      color: '#7c3aed',
                      fontSize: '0.9rem',
                      background: '#f3e8ff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      textAlign: 'center',
                      display: 'inline-block',
                    }}>
                      {line.speaker}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}>
                        <span style={{
                          fontSize: '1rem',
                          color: '#1f2937',
                          fontWeight: '500',
                          lineHeight: 1.4,
                        }}>
                          {line.german}
                        </span>
                        <PronounceButton word={line.german} />
                      </div>
                      <div style={{
                        fontSize: '0.85rem',
                        color: '#6b7280',
                        marginTop: '10px',
                        paddingTop: '8px',
                        borderTop: '1px dashed #e5e7eb',
                      }}>
                        → {line.english}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{
                fontSize: '12px',
                textAlign: 'center',
                color: '#a78bfa',
                marginTop: '20px',
                padding: '10px',
                background: '#f3e8ff',
                borderRadius: '30px',
              }}>
                💡 Tap any "Pronounce" button to hear a single sentence
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConversationsPage;