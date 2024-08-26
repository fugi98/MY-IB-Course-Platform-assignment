'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaChevronDown, FaChevronUp, FaExpand, FaSearchPlus, FaSearchMinus, FaBars } from 'react-icons/fa';
import { useLocalStorage } from 'react-use';
import { Button } from '@/components/ui/button';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import { Evaluation } from '@/types';
import { createPdfWithLoremIpsum } from '@/app/utils/createPdf';
import useStore from '@/app/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Component } from '@/components/component/component';


const dummyEvaluation: Evaluation = {
  overallScore: 13,
  remark: "Good",
  date: "12 Jul 2024",
  criteriaA: 7,
  criteriaB: 5,
  criteriaC: 3,
  criteriaAStrengths: [
    "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
    "Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively."
  ],
  criteriaBStrengths: ["Strength B1", "Strength B2"],
  criteriaCStrengths: ["Strength C1", "Strength C2"],
  criteriaAImprovements: [
    "Demonstrates a good understanding of the prescribed title and the associated knowledge questions.",
    "Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively."
  ],
  criteriaBImprovements: ["Improvement B1", "Improvement B2"],
  criteriaCImprovements: ["Improvement C1", "Improvement C2"]
};

export default function EvaluationDisplay({ onBack }: { onBack: () => void }) {
  const [expandedCriteria, setExpandedCriteria] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [storedResults, setStoredResults] = useLocalStorage<Evaluation | null>('evaluationResults', null);
  const coursework = useStore((state) => state.courseworks);
  const [isPdfExpanded, setIsPdfExpanded] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string>('');
  const [zoom, setZoom] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [showMessage, setShowMessage] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleIconClick = (link: string) => {
    router.push(link);
  };


useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  handleResize();

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);



useEffect(() => {
  setEvaluation(dummyEvaluation);
}, []);

  const toggleCriteria = (criteria: string) => {
    setExpandedCriteria(expandedCriteria === criteria ? null : criteria);
  };

  const handleZoomIn = () => setZoom((prevZoom) => prevZoom + 10);
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(10, prevZoom - 10)); // Prevent zoom out below 10%
  const toggleFullScreen = () => setIsFullScreen((prevState) => !prevState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Hide message after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const CongratulationMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg"
    >
      Congratulations on your good score!
    </motion.div>
  );

  const ImprovementMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg"
    >
      Keep working on your areas of improvement. You&apos;re making progress!
    </motion.div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto my-5">
      <div className="flex justify-between items-center mb-8">
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold md:hidden">
          Zu
        </div>
        <FaBars
          onClick={toggleSidebar}
          className={`text-2xl text-gray-600 md:hidden cursor-pointer transition-transform duration-300 ${sidebarOpen ? 'hidden' : 'block'}`}
        />
      </div>
      <main className={`flex-1 p-4 md:p-10 lg:p-12 ${isPdfExpanded ? 'flex-row lg:flex-col' : 'flex-col'}`}>
        <div className={`flex flex-col md:p-10 ${isPdfExpanded ? 'lg:flex-row' : 'md:flex-col'} gap-8`}>
          <div className={`w-full ${isPdfExpanded ? 'md:full' : 'md:w-full'} bg-white p-4 rounded-lg shadow`}>
            <h1 className='text-2xl text-gray-500 font-bold'><span className='bg-[#eceef1] rounded-full p-2'>IB Economic Paper.pdf</span></h1>
            {!isPdfExpanded ? (
              <div className="flex justify-center">
                <button
                  onClick={() => setIsPdfExpanded(true)}
                  className="py-2 px-4 bg-gray-100 text-black font-bold text-lg rounded-full"
                >
                  Expand & view your file
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <button onClick={toggleFullScreen} className="text-blue-500">
                      <FaExpand />
                    </button>
                    <button onClick={handleZoomIn} className="text-blue-500">
                      <FaSearchPlus />
                    </button>
                    <button onClick={handleZoomOut} className="text-blue-500">
                      <FaSearchMinus />
                    </button>
                  </div>
                  <button onClick={() => setIsPdfExpanded(false)} className="text-blue-500">
                    Collapse
                  </button>
                </div>
                <h2 className="text-xl text-center font-semibold">Lorem Ipsum</h2>
                <span className='text-gray-700 text-center text-sm'><i>&quot;Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...&quot;<br />
                &quot;There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...&quot;</i></span>
                <div className={`flex ${isPdfExpanded ? 'flex-col' : 'flex-col'} justify-center items-center`}>
                  <h3 className='text-lg font-semibold font-italic'><i>What is Lorem Ipsum?</i></h3>
                  <p className='text-gray-700'>
                    <strong>Lorem Ipsum</strong>  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  <h3 className='text-lg font-semibold '><i>Why do we use it?</i></h3>
                  <p className='text-gray-700'>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                  </p>
                  <h3 className='text-lg font-semibold'><i>Where does it come from?</i></h3>
                  <p className='text-gray-700'>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a line in section 1.10.32.
                    <br />
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from &quot;de Finibus Bonorum et Malorum&quot; by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className={`w-full ${isPdfExpanded ? 'md:full' : 'md:w-full'}`}>
            {evaluation && (
              <>
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold md:text-2xl">Overall Score</h3>
                      <p className="text-sm font-bold md:text-3xl">
                        Remark : <span className="text-green-500 md:text-sm">{evaluation.remark}</span>
                      </p>
                      <p className="text-gray-500">Evaluated on {evaluation.date}</p>
                    </div>
                    <div className="text-right relative">
                    <Component value={evaluation.overallScore} max={20} color="#3cc186" />
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                        {evaluation.overallScore}/20
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h3 className="text-2xl font-bold mb-6 md:text-sm">Criteria</h3>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-right relative">
                        <Component value={evaluation.criteriaA} max={20} color="#3cc186" />
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                          {evaluation.criteriaA}/20
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <h4 className="text-sm text-gray-500 font-bold">
                          Criterion A:
                        </h4>
                        <h3 className="text-sm font-bold md:text-lg">
                          Understanding Knowledge Question...
                        </h3>
                      </div>

                      <button onClick={() => toggleCriteria('A')}>
                        {expandedCriteria === 'A' ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {expandedCriteria === 'A' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-4"
                        >
                          <div className="mb-4">
                            <h5 className="font-bold">Strengths</h5>
                            <ul className="list-none border border-[#3cc186] rounded-md p-4">
                              {evaluation.criteriaAStrengths.map((strength, idx) => (
                                <li key={idx} className="flex items-start mb-2 last:mb-0">
                                  <span className=" inline-flex items-center justify-center bg-[#3cc186] text-white text-sm w-5 h-5 rounded-full mr-2 flex-shrink-0">✓</span>
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-bold">Improvements</h5>
                            <ul className="list-none p-4">
                              {evaluation.criteriaAImprovements.map((improvement, idx) => (
                                <li
                                  key={idx}
                                  className="relative pl-8 mb-2"
                                >
                                  <span
                                    className="absolute left-0 top-0 h-5 w-5 flex items-center justify-center rounded-full bg-yellow-500 text-white text-sm font-bold"
                                  >
                                    !
                                  </span>
                                  {improvement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h3 className="text-2xl font-bold mb-6 md:text-sm">Criteria</h3>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-right relative">
                        <Component value={evaluation.criteriaB} max={20} color="#eab308"/>
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                          {evaluation.criteriaB}/20
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <h4 className="text-sm text-gray-500 font-bold">
                          Criterion B:
                        </h4>
                        <h3 className="text-sm font-bold md:text-lg">
                          Understanding Knowledge Question...
                        </h3>
                      </div>
                      <button onClick={() => toggleCriteria('B')}>
                        {expandedCriteria === 'B' ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {expandedCriteria === 'B' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-4"
                        >
                          <div className="mb-4">
                            <h5 className="font-bold">Strengths</h5>
                            <ul className="list-disc list-inside">
                              {evaluation.criteriaBStrengths.map((strength, idx) => (
                                <li key={idx}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-bold">Improvements</h5>
                            <ul className="list-disc list-inside">
                              {evaluation.criteriaBImprovements.map((improvement, idx) => (
                                <li key={idx}>{improvement}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h3 className="text-2xl font-bold mb-6 md:text-sm">Criteria</h3>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-right relative">
                        <Component value={evaluation.criteriaC} max={20} color="#eab308" />
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                          {evaluation.criteriaC}/20
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <h4 className="text-sm text-gray-500 font-bold">
                          Criterion C:
                        </h4>
                        <h3 className="text-sm font-bold md:text-lg">
                          Understanding Knowledge Question...
                        </h3>
                      </div>
                      <button onClick={() => toggleCriteria('C')}>
                        {expandedCriteria === 'C' ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {expandedCriteria === 'C' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-4"
                        >
                          <div className="mb-4">
                            <h5 className="font-bold">Strengths</h5>
                            <ul className="list-disc list-inside">
                              {evaluation.criteriaCStrengths.map((strength, idx) => (
                                <li key={idx}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-bold">Improvements</h5>
                            <ul className="list-disc list-inside">
                              {evaluation.criteriaCImprovements.map((improvement, idx) => (
                                <li key={idx}>{improvement}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={onBack}>
            <FaChevronLeft /> Back to Dashboard
          </Button>
        </div>
      </main>

      {showMessage && (
        <>
          <CongratulationMessage />
          <ImprovementMessage />
        </>
      )}

      <LeftSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}         handleIconClick={handleIconClick} />
      <RightSidebar windowWidth={windowWidth} />
    </div>
  );
}
