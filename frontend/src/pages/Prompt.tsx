import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from 'lucide-react';
import axios from 'axios';

interface PageBlock {
  id: number;
  name: string;
  subheading: string;
}

export default function PromptBuilder() {
  const [idea, setIdea] = useState('');
  const [uiType, setUiType] = useState('minimal');
  const [theme, setTheme] = useState('white');
  const [length, setLength] = useState([50]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [accordionOpen, setAccordionOpen] = useState('item-1');
  const [pages, setPages] = useState<PageBlock[]>([{ id: 1, name: '', subheading: '' }]);


  const addPage = () => {
    setPages([...pages, { id: Date.now(), name: '', subheading: '' }]);
  };

  const removePage = (id: number) => {
    setPages(pages.filter(p => p.id !== id));
  };

  const updatePage = (id: number, key: 'name' | 'subheading', value: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, [key]: value } : p));
  };

  const handleGenerate = async () => {
    if (!idea.trim() || pages.some(p => !p.name.trim() || !p.subheading.trim())) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/generate', {
        idea,
        uiType,
        theme,
        length: length[0],
        pages: pages.map(page => ({
          name: page.name,
          subheading: page.subheading
        }))
      });
      setPrompts(response.data.prompts);
      setAccordionOpen("")
      alert('Prompts generated successfully!');
      console.log('Generated prompts:', response.data.prompts);
    } catch (error) {
      console.error('Error generating prompts:', error);
      alert('Failed to generate prompts. Please try again later.');
    }
    console.log({ idea, uiType, length, pages });
  };

  return (
    <div className='h-screen w-screen flex items-center justify-center text-white'
    style={{
    background: "linear-gradient(to bottom, #1e293b, #3b3b58, #8c4b4a, #d47a4a, #f5a623)",
  }}>

    <div className="w-full max-w-3xl p-6 space-y-6 bg-[#222222] rounded-xl">
      <Accordion type="single" collapsible value={accordionOpen}
  onValueChange={setAccordionOpen}>
  <AccordionItem value="item-1">
      <div className="p-4 space-y-4">
        <div className={`flex items-center ${prompts.length > 0 ? 'justify-between' : 'justify-center'}`}>
        <div className="text-xl font-semibold">
            Prompt Generator
        </div>

          {prompts.length > 0 && (
            <AccordionTrigger className="ml-4" />
          )}
</div>

        <AccordionContent>
        <Input className='border border-transparent bg-[#3e3938] text-white'
          placeholder="Describe your app idea (e.g. portfolio website for a dev)"
          value={idea}
          onChange={e => setIdea(e.target.value)}
          />

        {idea.trim().length > 2 && (
          <div className=''>
        <div className="py-12 flex gap-4 items-center">
          <Select value={uiType} onValueChange={setUiType}>
            <SelectTrigger className="border-transparent bg-[#3e3938] w-[180px]">
              <SelectValue placeholder="UI Type" />
            </SelectTrigger>
            <SelectContent className='border-transparent bg-[#3e3938] text-white'>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
            </SelectContent>
          </Select>

           <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="border-transparent bg-[#3e3938] w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className='border-transparent bg-[#3e3938] text-white'>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="both dark and white">Both</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Prompt Length</label>
            <Slider min={10} max={100} step={5} value={length} onValueChange={setLength} className="text-red-500 w-[200px]" />
              {length[0]} 
          </div>
        </div>

        <div className="space-y-4 text-white">
          <h3 className="font-medium">Pages</h3>
          {pages.map((page) => (
            <div key={page.id} className="flex items-center gap-2">
              <Input
              className='border-transparent bg-[#3e3938]'
                placeholder="Page name (e.g. About)"
                value={page.name}
                onChange={e => updatePage(page.id, 'name', e.target.value)}
                />
              <Input
              className='border-transparent bg-[#3e3938]'
                placeholder="Subheading (e.g. Bio, Education)"
                value={page.subheading}
                onChange={e => updatePage(page.id, 'subheading', e.target.value)}
                />
              <Button variant="ghost" onClick={() => removePage(page.id)} size="icon">
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addPage} className="bg-background text-foreground flex items-center gap-1 text-sm ">
            <Plus className="w-2 h-4 " /> Add Page
          </Button>
        </div>
        </div>
        )}


        <Button onClick={handleGenerate} className="w-full mt-4 rounded-xl">Generate Prompt</Button>

        </AccordionContent>
      </div>
    </AccordionItem>
</Accordion>
<hr />
{prompts.length > 0 && (
  
  <div className='text-lg font-semibold text-center'>Generated prompt</div>
)}

        {Array.isArray(prompts) && prompts.length > 0 && (
          <div>
        
          <div className="p-4 border-b">
            <h4 className="font-semibold">Prompt</h4>
            <p>{prompts}</p>
          </div>
      </div>
        )}
    </div>
        </div>
  );
}
