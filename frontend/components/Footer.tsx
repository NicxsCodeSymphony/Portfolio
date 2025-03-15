
export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="#" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                YourName
              </a>
              <p className="text-gray-400 text-sm mt-1">Musician & Full Stack Developer</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} All Rights Reserved
              </p>
              <div className="flex justify-center md:justify-end space-x-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  