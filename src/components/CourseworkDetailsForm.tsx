export default function MyCoursework() {
  const courseworks = [
    {
      title: "How does the temperature of a Copper...",
      subject: "Physics HL",
      readTime: "18 min read",
      wordCount: "2388 words",
      score: "7/7",
      language: "English",
    },
    {
      title: "How does the temperature of a Copper...",
      subject: "Physics HL",
      readTime: "20 min read",
      wordCount: "2588 words",
      score: "7/7",
      language: "English",
    },
    // Add more placeholder items as needed
  ];

  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl">My Coursework</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courseworks.map((coursework, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-16 h-20 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg">{coursework.title}</h3>
              <div className="mt-2 flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>{coursework.subject}</span>
                <span>•</span>
                <span>{coursework.readTime}</span>
                <span>•</span>
                <span>{coursework.wordCount}</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-yellow-500 text-xs sm:text-sm">★</span>
                <span className="text-sm sm:text-base font-semibold">{coursework.score}</span>
                <span className="text-xs sm:text-sm text-gray-500">{coursework.language}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="text-sm sm:text-base text-purple-600 hover:underline">View all</button>
      </div>
    </div>
  );
}
