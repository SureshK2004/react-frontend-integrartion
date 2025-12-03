// components/myLearning.tsx
import React from "react";
import { BookOpen, Clock, CheckCircle, PlayCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  status: "yet-to-start" | "in-progress" | "completed";
  progress?: number;
  duration?: string;
  category?: string;
}

const MyLearning: React.FC = () => {
  // Mock data - replace with actual data from your API
  const learningStats = [
    {
      title: "Total Courses",
      value: "12",
      description: "All enrolled courses",
      iconColor: "bg-purple-500",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Yet to Start",
      value: "3",
      description: "Not started yet",
      iconColor: "bg-gray-500",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "In Progress",
      value: "5",
      description: "Currently learning",
      iconColor: "bg-blue-500",
      icon: <PlayCircle className="w-6 h-6" />
    },
    {
      title: "Completed",
      value: "4",
      description: "Finished courses",
      iconColor: "bg-green-500",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const courses: Course[] = [
    {
      id: "1",
      title: "Git Essentials",
      instructor: "Mathu",
      status: "in-progress",
      progress: 65,
      duration: "8 hours",
      category: "Development"
    },
    {
      id: "2",
      title: "React Fundamentals",
      instructor: "Sarah Johnson",
      status: "completed",
      progress: 100,
      duration: "12 hours",
      category: "Frontend"
    },
    {
      id: "3",
      title: "TypeScript Advanced",
      instructor: "Mike Chen",
      status: "yet-to-start",
      progress: 0,
      duration: "10 hours",
      category: "Programming"
    },
    {
      id: "4",
      title: "Node.js Backend",
      instructor: "Alex Rodriguez",
      status: "in-progress",
      progress: 30,
      duration: "15 hours",
      category: "Backend"
    },
    {
      id: "5",
      title: "UI/UX Design Principles",
      instructor: "Emma Wilson",
      status: "completed",
      progress: 100,
      duration: "6 hours",
      category: "Design"
    },
    {
      id: "6",
      title: "DevOps Fundamentals",
      instructor: "James Brown",
      status: "yet-to-start",
      progress: 0,
      duration: "14 hours",
      category: "Operations"
    }
  ];

  const getStatusIcon = (status: Course["status"]) => {
    switch (status) {
      case "yet-to-start":
        return <Clock className="w-4 h-4 text-gray-500" />;
      case "in-progress":
        return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "yet-to-start":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getProgressColor = (status: Course["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "yet-to-start":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Learning
        </h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {learningStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.iconColor} flex items-center justify-center`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Cards Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Courses
        </h3>
        
        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Course Header with Thumbnail */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-24 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white opacity-80" />
                </div>
              </div>
              
              {/* Course Content */}
              <div className="p-4 sm:p-6">
                {/* Course Title and Instructor */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    by {course.instructor}
                  </p>
                </div>

                {/* Course Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>{course.category}</span>
                  <span>{course.duration}</span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(course.status)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status === "yet-to-start" ? "Yet to Start" : 
                       course.status === "in-progress" ? "In Progress" : "Completed"}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.status)}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                    {course.status === "yet-to-start" ? "Start" : 
                     course.status === "in-progress" ? "Continue" : "Review"}
                  </button>
                  <button className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;