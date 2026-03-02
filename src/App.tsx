/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import './types';
import { 
  Send, 
  Sparkles, 
  Image as ImageIcon, 
  Mail, 
  MessageSquare, 
  Loader2, 
  ChevronRight, 
  Copy, 
  Check,
  RefreshCw,
  X,
  Maximize2,
  Download
} from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCampaign, generateCampaignImage, CampaignContent, getAI } from './services/gemini';
import { cn } from './lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function App() {
  // Campaign State
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaign, setCampaign] = useState<CampaignContent | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! I\'m your Campaign Assistant. How can I help you refine your marketing strategy today?' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // API Key Check
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleGenerateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const result = await generateCampaign(prompt);
      setCampaign(result);
      
      // Automatically trigger image generation
      handleGenerateImage(result.imagePrompt);
    } catch (error) {
      console.error('Failed to generate campaign:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async (imagePrompt: string) => {
    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateCampaignImage(imagePrompt, imageSize);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [...chatMessages, userMsg].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are an expert marketing consultant. Help the user refine their email campaigns, suggest better subject lines, or answer questions about marketing best practices."
        }
      });

      const assistantMsg: ChatMessage = { 
        role: 'assistant', 
        content: response.text || "I'm sorry, I couldn't process that request." 
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please check your API key settings.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CampaignCraft</h1>
          <p className="text-gray-600 mb-8">To generate high-quality images and campaigns, please select your Google Cloud API key.</p>
          <button
            onClick={handleOpenKeySelector}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            Select API Key
          </button>
          <p className="mt-4 text-xs text-gray-400">
            Requires a paid Google Cloud project. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">Learn more</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">CampaignCraft <span className="text-indigo-600">AI</span></h1>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">Marketing Suite</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Templates</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Analytics</a>
          </nav>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultant</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <h2 className="text-3xl font-bold tracking-tight mb-4">What are we promoting?</h2>
              <p className="text-slate-500 mb-8">Describe your product, offer, or event. Our AI will craft the perfect email sequence and visuals.</p>
              
              <form onSubmit={handleGenerateCampaign} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Launching a new eco-friendly yoga mat collection with a 20% early bird discount..."
                    className="w-full h-48 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-lg leading-relaxed"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <select 
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value as any)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none"
                    >
                      <option value="1K">1K Quality</option>
                      <option value="2K">2K Quality</option>
                      <option value="4K">4K Quality</option>
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl",
                    isGenerating 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Crafting Campaign...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      <span>Generate Campaign</span>
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* Quick Tips */}
            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
              <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Pro Tip
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Include your target audience and the specific "Call to Action" you want them to take for better results.
              </p>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!campaign && !isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-[40px] bg-slate-50/50"
                >
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
                    <Mail className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400">Your campaign will appear here</h3>
                  <p className="text-slate-400 max-w-xs mt-2">Enter a prompt to start generating subject lines, copy, and professional visuals.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Campaign Header Card */}
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Email Draft
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="group relative">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1 block">Subject Line</label>
                        <div className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-indigo-200 transition-colors">
                          <p className="font-semibold text-lg">{campaign?.subjectLine || '...'}</p>
                          <button 
                            onClick={() => copyToClipboard(campaign?.subjectLine || '', 'subject')}
                            className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600"
                          >
                            {copiedField === 'subject' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="group relative">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1 block">Preview Text</label>
                        <div className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-indigo-200 transition-colors">
                          <p className="text-slate-600 italic">{campaign?.previewText || '...'}</p>
                          <button 
                            onClick={() => copyToClipboard(campaign?.previewText || '', 'preview')}
                            className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600"
                          >
                            {copiedField === 'preview' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Card */}
                  <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-indigo-600" />
                        <h3 className="font-bold">Campaign Visual</h3>
                      </div>
                      {generatedImage && (
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="aspect-video bg-slate-100 relative group">
                      {isGeneratingImage ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm z-10">
                          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                          <p className="text-sm font-bold text-slate-600">Generating {imageSize} Visual...</p>
                        </div>
                      ) : generatedImage ? (
                        <img 
                          src={generatedImage} 
                          alt="Campaign Visual" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                          <ImageIcon className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body Content Card */}
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl">Email Body</h3>
                      <button 
                        onClick={() => copyToClipboard(campaign?.bodyContent || '', 'body')}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-xl transition-all text-sm font-medium text-slate-600"
                      >
                        {copiedField === 'body' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        <span>Copy Markdown</span>
                      </button>
                    </div>
                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-p:text-slate-600">
                      <Markdown>{campaign?.bodyContent || ''}</Markdown>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Chatbot Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-full max-w-[400px] h-[600px] bg-white rounded-[32px] shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Marketing Consultant</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium text-indigo-100 uppercase tracking-wider">AI Powered</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div 
                    className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-indigo-600 text-white rounded-tr-none" 
                        : "bg-slate-100 text-slate-800 rounded-tl-none"
                    )}
                  >
                    <Markdown>{msg.content}</Markdown>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">
                    {msg.role === 'user' ? 'You' : 'Consultant'}
                  </span>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-6 border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for advice or refinements..."
                  className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="absolute right-2 top-2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all disabled:bg-slate-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
