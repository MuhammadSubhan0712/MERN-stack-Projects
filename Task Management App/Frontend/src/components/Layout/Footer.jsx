import React from 'react'

const Footer = () => {
  return (
    <>
     <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Task Manager: <abbr className="font-semibold" title="Muhammad Subhan Khan">MSK</abbr> All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <nav className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer