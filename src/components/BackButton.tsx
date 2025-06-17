import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  return (
    <Link
      to="/features/school-erp"
      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-medium"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back to Menu</span>
    </Link>
  );
};
// add commit
export default BackButton;